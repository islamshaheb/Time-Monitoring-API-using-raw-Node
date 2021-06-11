/** @format */

// dependecise
// we are not taking full moduler, we are taking one single part after destructure. We are taking only a class named StringDecoder
const { StringDecoder } = require('string_decoder');
const url = require('url');

//const routes = require('../routes.js');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');
//const { sampleHandler } = require('../handlers/routeHandlers/sampleHandler');

// module scaffolding
const handler = {};
handler.handleReqRes = (req, res) => {
  // response handle
  // request handle
  // get the url and parse it
  const parsedUrl = url.parse(req.url, true); // if false edditional link path will be ignored
  //console.log(parsedUrl); // full object
  const path = parsedUrl.pathname;
  const trimedPath = path.replace(/^\/|\/$/g, '');
  const method = req.method.toLowerCase(); // For finding method
  const queryStringObeject = parsedUrl.query; // As it can return multiple value,so it is taken in object
  const headersObject = req.headers; // Valid object retured.  Request related metadata is called headers
  const requestProperties = {
    parsedUrl,
    path,
    trimedPath,
    method,
    queryStringObeject,
    headersObject,
  };
  const decoder = new StringDecoder('utf-8');
  let realData = '';

  const chosenHandler = routes[trimedPath] ? routes[trimedPath] : notFoundHandler;

  // when data is coming in buffer
  req.on('data', (buffer) => {
    realData += decoder.write(buffer);
  });

  // when all buffer is arrived and no data is left
  req.on('end', () => {
    realData += decoder.end();
    chosenHandler(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === 'number' ? statusCode : 500;
      payload = typeof payload === 'object' ? payload : {};

      const payloadString = JSON.stringify(payload);

      // return the final response
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
};
// handler.test = (x) => {
//   const con = 'mujja';
//   console.log(x + con);
// };
module.exports = handler;
