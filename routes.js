/**
 * /*
 * Title: Routes For All Path
 * Description: Application Routes
 * Author: Mojahid
 * Date: Updated (13.6.2021)
 *
 * @format
 */
/* eslint-env node */
// dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');
const { userHandler } = require('./handlers/routeHandlers/userHandler');

const route = {
  sample: sampleHandler,
  user: userHandler,
};

module.exports = route;
