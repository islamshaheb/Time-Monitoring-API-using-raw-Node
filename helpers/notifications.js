/**
 * /*
 * Title: Notifications Library
 * Description: Important functions for notifying users
 * Author: Mojahid
 * Date: 6.23.2021
 *
 * @format
 */
/* eslint-env node */

// dependencies
const https = require('https'); // as twilo want https we have to add htts
const querystring = require('querystring');
const { twilio } = require('./environments');

// module scaffolding
const notifications = {};

// send sms to user using twilio api
notifications.sendTwilioSms = (phone, msg, callback) => {
  // input validation
  const userPhone = typeof phone === 'string' && phone.trim().length === 11 ? phone.trim() : false;

  const userMsg =
    typeof msg === 'string' && msg.trim().length > 0 && msg.trim().length <= 1600
      ? msg.trim()
      : false;

  if (userPhone && userMsg) {
    // configure the request payload
    const payload = {
      From: twilio.fromPhone,
      To: `+88${userPhone}`,
      Body: userMsg,
    };

    // stringify the payload
    const stringifyPayload = querystring.stringify(payload); // It can be done using JSON.stringify also

    // configure the request details
    const requestDetails = {
      hostname: 'api.twilio.com',
      method: 'POST',
      path: `/2010-04-01/Accounts/${twilio.accountSid}/Messages.json`,
      auth: `${twilio.accountSid}:${twilio.authToken}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    // instantiate the request object
    const req = https.request(requestDetails, (res) => {
      // get the status of the sent request
      const status = res.statusCode;
      // callback successfully if the request went through
      if (status === 200 || status === 201) {
        callback(false);
      } else {
        callback(`Status code returned was ${status}`);
      }
    });

    req.on('error', (e) => {
      callback(e);
    });

    req.write(stringifyPayload);
    req.end();
  } else {
    callback('Given parameters were missing or invalid!');
  }
};

// export the module
module.exports = notifications;
