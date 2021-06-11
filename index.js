/*
 *     Title: Monitoring System
 *     Data: 6.9.21
 *
 * @format
 */

//dependencies
const http = require('http');
// handleReqRes Must be the same as that file where we are exporting
const { handleReqRes } = require('./helpers/handleReqRes');
const process = require('process');
const environment = require('./helpers/environments');

// console.log(handleReqRes());
// console.log('hi threre sdf ');
// // App object-module scaffoling
const app = {};
// console.log(typeof app);
// Configuration section
app.config = {
  port: 3000,
};

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    // X can be any Name
    // console.log(`Environment variable is ${process.env.c}`);
    console.log(`listening to port ${environment.port}`);
  });
};

// Handling request Response
app.handleReqRes = handleReqRes;
// Starting the server
app.createServer();
