require("dotenv").config();
console.log("*** process.env.MNEMONIC: ", process.env.MNEMONIC);

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  process.env.MNEMONIC,
  process.env.RINKEBY_INFURA
);

// Create an instance of web3 by passing in the provider
// we will use this web3 instance to interact with the blockchain
const web3 = new Web3(provider);

// Deploy the code -- very similar to Inbox.test
const deploy = async () => {
  // Get a list of accounts
  const accounts = await web3.eth.getAccounts();
  console.log("attempting to deploy from account: ", accounts[0]);

  // Create the new contract
  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract Deployed to: ", result.options.address);
  provider.engine.stop();
};
deploy();
