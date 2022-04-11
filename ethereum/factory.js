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
  "0xf1BAbb1F8A6E8da2EC4a83318708C6667B52E390"
);

export default instance;
