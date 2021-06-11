/** @format */

// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
  callback(404, {
    message: 'This is from Not found !',
  });
};

module.exports = handler;
