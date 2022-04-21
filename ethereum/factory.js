/**
 * Used to get the deployed instance of our factory contract
 * within other files here. So we don't have to always do 
 * this for each file that needs it.
 */

import web3 from "./web3";

// import the compile contract by passing its interface or abi
import CampaignFactory from './build/CampaignFactory.json';

// Create the contract instance
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xa5bB18ed57F3C55229e2C5D755c9c0b157aE6f97"
);

export default instance;
