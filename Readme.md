Grider solidity 

Creating a crowdfunding type Web3 App

### Get Started
1. `npm install`
2. `npm run dev` (start also)

### Redeploying a Contract
1. `cd ethereum`
2. `node compile.js` -- delete and remake our "./ethereum/build" folder
3. `node deploy.js` -- redeploys and will log the new contractAddress
4. Replace the address in "./ethereum/contracts/factory.js"


### Why Next.js
React takes all JS code and serves it to the browser. NextJs does server side rendering -- Next tries to render all the JS code itself first and then sends the HTML to the browser (Note: this means a user does not even have to have a wallet connected on their browser to see blockchain data. TLDR; the data fetching logic happens on the server instead of the browser!)

