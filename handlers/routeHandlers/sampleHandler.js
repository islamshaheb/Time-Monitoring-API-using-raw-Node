/** @format */

// module scaffolding
const handler = {};

// Other name is also allowed
handler.sampleHandler = (requestProperties, callback) => {
  console.log(requestProperties);
  callback(200, {
    message: 'This is from Sample',
    phone: '01 from the terminal',
  });
};

module.exports = handler;
