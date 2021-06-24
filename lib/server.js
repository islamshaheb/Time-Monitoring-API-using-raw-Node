/**
 * /*
 * Title: Server
 * Description: intial file tot start the node server and s
 * Author: Mojahid
 * Date: 6.24.2021
 *
 * @format
 */
/* eslint-env node */

//dependencies
const http = require('http');
const { handleReqRes } = require('../helpers/handleReqRes');

const server = {};

server.config = {
  port: 3000,
};

// create server
server.createServer = () => {
  const createServerVariable = http.createServer(server.handleReqRes);
  createServerVariable.listen(server.config.port, () => {
    console.log(`listening to port $ ${server.config.port}`);
  });
};

// Handling request Response
server.handleReqRes = handleReqRes;
// Starting the server
server.init = () => {
  server.createServer();
};

module.exports = server;
