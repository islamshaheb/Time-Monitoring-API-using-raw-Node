/*
 *     Title: Monitoring System
 *     Data: 6.9.21
 *
 * @format
 */
/* eslint-env node */

//dependencies
const http = require('http');
// handleReqRes Must be the same as that file where we are exporting
const { handleReqRes } = require('./helpers/handleReqRes');
//const process = require('process');
const environment = require('./helpers/environments');
const data = require('./lib/data.js');
const { sendTwilioSms } = require('./helpers/notifications');

// //console.log(handleReqRes());
//// console.log('hi threre sdf ');
// // App object-module scaffoling

const app = {};

// @TODO remove later
sendTwilioSms('01955384162', 'Hello world', (err) => {
  console.log(`this is the error`, err);
});

// Check data is created or not (Testing file system)
data.update('test', 'addedFile', { Name: 'Mojahidul Islam', Age: '26' }, (err) => {
  console.log(err);
});
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
    console.log(`listening to port $ ${environment.port}`);
  });
};

// Handling request Response
app.handleReqRes = handleReqRes;
// Starting the server
app.createServer();
