/**
 * /*
 * Title: Environments
 * Description: Handle all Environment related things
 * Author: Mojahid
 * Date: 6.11.2021
 *
 * @format
 */

//depependecies
// Module Scaffolding
const environments = {};

environments.staging = {
  port: 3000,
  envName: 'staging',
  secretKey: 'hsjdhsdhsjdhjshdjshd',
  maxChecks: 5,
};

environments.production = {
  port: 5000,
  envName: 'production',
  secretKey: 'dfsfsfsgdfgfd',
};

// determine which environment was passed
// Defult value set as staging,if something gone wrong
const currentEnvironment =
  // eslint-disable-next-line no-undef
  typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
const environmentToExport =
  typeof environments[currentEnvironment] === 'object'
    ? environments[currentEnvironment]
    : environments.staging;

// export module
// eslint-disable-next-line no-undef
module.exports = environmentToExport;
