/**
 * /*
 * Title: User Handler
 * Description: Handler to handle user related routes
 * Author: Mojahid
 * Date: 6.13.2021
 *
 * @format
 */
/* eslint-env node */
// dependencies
const data = require('../../lib/data.js');
const { hash } = require('../../helpers/utilities');
const { parseJSON } = require('../../helpers/utilities');

// module scaffolding
const handler = {};
/*
Other name is also allowed
handler.userHandler = (requestProperties, callback) => {
  console.log(requestProperties);
  callback(200, {
    message: 'This is from Sample',
    phone: '01 from the terminal',
  });
};

module.exports = handler;
*/
handler.userHandler = (requestProperties, callback) => {
  const acceptedMethods = ['get', 'post', 'put', 'delete'];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._users[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handler._users = {};

// For post Request
handler._users.post = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === 'string' &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === 'string' &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const phone =
    typeof requestProperties.body.phone === 'string' &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties.body.password === 'string' &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  const tosAgreement =
    typeof requestProperties.body.tosAgreement === 'boolean' && requestProperties.body.tosAgreement
      ? requestProperties.body.tosAgreement
      : false;

  if (firstName && lastName && phone && password && tosAgreement) {
    // make sure that the user doesn't already exists, if there no need to insert user's data
    data.read('users', phone, (err1) => {
      if (err1) {
        const userObject = {
          // Usually object is like "firstName":"fistNmae"; as here two side is same we can write this way
          firstName,
          lastName,
          phone,
          //password,
          password: hash(password),
          tosAgreement,
        };
        // store the user to database
        data.create('users', phone, userObject, (err2) => {
          if (!err2) {
            callback(200, {
              message: 'User was created successfully!',
            });
          } else {
            callback(500, { error: 'Could not create user! ;(' });
            // Print to test are all data is coming correctly
            /*
            console.log(userObject.firstName);
            console.log(userObject.lastName);
            console.log(userObject.phone);
            console.log(userObject.password);
            console.log(userObject.tosAgreement);
            console.log(err2);
            */
          }
        });
      } else {
        callback(500, {
          error: 'There was a problem in server side!',
        });
      }
    });
  } else {
    callback(400, {
      error: 'You have a problem in your request',
    });
  }
};

// @TODO: Authentication
handler._users.get = (requestProperties, callback) => {
  // check the phone number if valid
  const phone =
    typeof requestProperties.queryStringObject.phone === 'string' &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone
      : false;
  if (phone) {
    // lookup the user
    data.read('users', phone, (err, u) => {
      const user = { ...parseJSON(u) };
      if (!err && user) {
        delete user.password;
        callback(200, user);
      } else {
        callback(404, {
          error: 'Requested user was not found!',
        });
      }
    });
  } else {
    callback(404, {
      error: 'Requested user was not found!',
    });
  }
};

// @TODO: Authentication
handler._users.put = (requestProperties, callback) => {
  // check the phone number if valid
  const phone =
    typeof requestProperties.body.phone === 'string' &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;
  console.log(phone);
  console.log(requestProperties.body.phone);
  const firstName =
    typeof requestProperties.body.firstName === 'string' &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === 'string' &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const password =
    typeof requestProperties.body.password === 'string' &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  if (phone) {
    if (firstName || lastName || password) {
      // loopkup the user
      data.read('users', phone, (err1, uData) => {
        const userData = { ...parseJSON(uData) };

        if (!err1 && userData) {
          if (firstName) {
            userData.firstName = firstName;
          }
          if (lastName) {
            userData.lastName = lastName;
          }
          if (password) {
            userData.password = hash(password);
          }

          console.log(firstName);
          console.log(lastName);
          console.log(phone);
          console.log(password);

          // store to database
          data.update('users', phone, userData, (err2) => {
            if (!err2) {
              callback(200, {
                message: 'User was updated successfully!',
              });
            } else {
              callback(500, {
                error: 'There was a problem in the server side!',
              });
            }
          });
        } else {
          callback(400, {
            error: 'You have a problem in your request!',
          });
        }
      });
    } else {
      callback(400, {
        error: 'You have a problem in your request!',
      });
    }
  } else {
    callback(400, {
      error: 'Invalid phone number. Please try again!',
    });
  }
};

// @TODO: Authentication
handler._users.delete = (requestProperties, callback) => {
  // check the phone number if valid
  const phone =
    typeof requestProperties.queryStringObject.phone === 'string' &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone
      : false;

  if (phone) {
    // lookup the user
    data.read('users', phone, (err1, userData) => {
      if (!err1 && userData) {
        data.delete('users', phone, (err2) => {
          if (!err2) {
            callback(200, {
              message: 'User was successfully deleted!',
            });
          } else {
            callback(500, {
              error: 'There was a server side error!',
            });
          }
        });
      } else {
        callback(500, {
          error: 'There was a server side error!',
        });
      }
    });
  } else {
    callback(400, {
      error: 'There was a problem in your request!',
    });
  }
};

module.exports = handler;
