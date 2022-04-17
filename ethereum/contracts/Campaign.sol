pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    // Constructor - sets the manager and minimum contribution on the campaign
    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    // Allow the manager to create a new request
    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        // Check they are a valid approver and have not already voted
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        // Requiring that atleast half the approvers have approved it and its not already complete
        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        // Transfers the holding to the recipient and marks the request as complete
        request.recipient.transfer(request.value);
        request.complete = true;
    }

    // Helper function to get summary information in one call instead of multiple
    function getSummary() public view returns(uint, uint, uint, uint, address) {
        return (minimumContribution, this.balance, requests.length, approversCount, manager);
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}