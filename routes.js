// File to handle dynamic routing in next.js
const routes = require('next-routes')();

routes
  .add("/campaigns/new", "campaigns/new")
  .add('/campaigns/:address', '/campaigns/show') // ':' for wildcard

module.exports = routes;