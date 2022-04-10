const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

// Require both contracts and
const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddresses;
let campaignAddress;
let campaign;


beforeEach( async() => {
  accounts = await web3.eth.getAccounts();

  // Deploy an instance of our factory contract
  // ** this way without address when we deploy a new version of the contract
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface)) // create idea of contract
    .deploy({ data: compiledFactory.bytecode })    // deploy with bytecode on data property
    .send({ from: accounts[0], gas: '1000000' });  // send the transaction
  
  // Create a campaign using the factory -- saves us from typing
  await factory.methods.createCampaign('100')
    .send({ from: accounts[0], gas: '1000000' }); // wei
  
  // Everytime we send a trx we get nothing back except a receipt so have to 
  campaignAddresses = await factory.methods.getDeployedCampaigns().call();
  campaignAddress = campaignAddresses[0];
  
  // ** already deployed the contract and tell web3 it already exists
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),   // interface
    campaignAddress                           // address
  );
  
})

describe('Campaigns', () => {
  it('deploys a factory and campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('marks caller as the campaign manager', async () => {
    //Get method created for each public variable on the Contract
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it("Allows people to contribute to a campaign and marks them as approver", async () => {
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1]
    }); 

    // Since its a public mapping -- we have to look up a specific key
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    console.log('isContributor: ', isContributor);
    assert(isContributor);
  }); 

  it("Requires a minimum contribution", async () => {
    try {
      await campaign.methods.contribute().send({
        value: "1",
        from: accounts[1],
      });
      // Should fail immediately so should not hit the next line
      assert(false);
    } catch (e) {
      // Should result in an error
      assert(e)
    }
  });

  it("allows a manager to make a payment request", async () => {
    // Create the request
    await campaign.methods
      .createRequest(
        'Buy shoes',
        '100',
        accounts[1]
      )
      .send({
        from: accounts[0],
        gas: '1000000'
      });
    
    const request = await campaign.methods.requests(0).call();
    console.log('request: ', request);
    assert.equal('Buy shoes', request.description)
  });
  
  it("processes requests fully", async () => {
    // Contribute
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    })

    // Create a request
    await campaign.methods.createRequest("A", web3.utils.toWei('5', 'ether'), accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      });

    // Vote on the request
    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    // Finalize the campaign
    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    // Get the balance of accounts[1]
    let balance = await web3.eth.getBalance(accounts[1]); // string in wei
    balance = web3.utils.fromWei(balance, 'ether');
    balance = parseFloat(balance);
    console.log('balance: ', balance);
    assert(balance > 104);
  });


})



