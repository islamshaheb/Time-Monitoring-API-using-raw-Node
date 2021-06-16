/**
 * /*
 * Title: Utilities
 * Description: Important utility functions
 * Author: Mojahid
 * Date: 6/15/2021
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

// create random string length
utilities.createRandomString = (strlength) => {
  let len;
  len = typeof strlength === 'number' && strlength > 0 ? strlength : false;
  if (len) {
    let output = '';
    const possibleChar = 'abcdefghijklmnopqrstuvwxyz1234567890';
    for (let i = 0; i < len; i++) {
      let currentRandomString = possibleChar.charAt(
        Math.floor(Math.random() * possibleChar.length)
      );
      output += currentRandomString;
    }
    return output;
  }
  return len;
};

// export module
module.exports = utilities;
