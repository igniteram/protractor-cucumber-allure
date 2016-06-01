var reporter = require('cucumberjs-allure-reporter');
reporter.config(
{
    targetDir:'./Reports/'
}
);
module.exports = reporter;