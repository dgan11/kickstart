// Manually tell next to use our routes.js file 
// src: https://github.com/fridays/next-routes/blob/master/README.md
const { createServer } = require('http');
const next = require('next');

const app = next({
  dev: process.env.NODE_ENV !== 'production'
})

const routes = require('./routes');
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  createServer(handler).listen(3000, (err) => {
    if (err) throw err;
    console.log('Ready on localhost:3000')
  });
});
