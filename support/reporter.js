var reporter = require('cucumberjs-allure-reporter');
reporter.config(
{
    targetDir:'./reports/'
}
);
module.exports = reporter;