/**
 * /*
 * Title: Utilities
 * Description: Important utility functions
 * Author: Sumit Saha ( Learn with Sumit )
 * Date: 11/21/2020
 *
 * @format
 */
/* eslint-env node */
// dependencies

// module scaffolding
const crypto = require('crypto');

const utilities = {};
const environments = require('./environments');

// parse JSON string to Object
utilities.parseJSON = (jsonString) => {
  let output;

  try {
    output = JSON.parse(jsonString);
  } catch {
    output = {};
  }

  return output;
};

// hash string (Used for Password but can be used for any string )
utilities.hash = (str) => {
  if (typeof str === 'string' && str.length > 0) {
    console.log(environments, process.env.NODE_ENV);
    const hash = crypto.createHmac('sha256', environments.secretKey).update(str).digest('hex');
    return hash;
  }
  return false;
};

// export module
module.exports = utilities;
