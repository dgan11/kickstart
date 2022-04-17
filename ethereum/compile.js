const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');


// Delete the build folder if it exists
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// Read Campaign.sol form the contracts folder
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

console.log('output: ', output);

// Recreate the build folder
fs.ensureDirSync(buildPath);

for (let contract in output) {
  // Write out a json file to some path
  try {
    fs.outputJSONSync(
      path.resolve(buildPath, contract.replace(":", "") + ".json"),
      output[contract]
    );
  } catch (e) {
    console.log('Error in compile: ', e)
  }
}

console.log("compile.js finished");

/**
 * Run by 
 * 1. cd into `./ethereum`
 * 2. node compile.js
 */