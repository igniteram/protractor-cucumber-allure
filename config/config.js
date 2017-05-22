var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

exports.config = {
  seleniumAddress: "http://127.0.0.1:4444/wd/hub",
  baseUrl: "http://www.google.com",
  capabilities: {
    browserName: process.env.TEST_BROWSER_NAME || "chrome"
  },
  framework: "custom",
  frameworkPath: require.resolve("protractor-cucumber-framework"),
  specs: ["../features/*.feature"],
  exclude: "../features/database.feature",
  resultJsonOutputFile: "./reports/json/protractor_report.json",
  onPrepare: function() {
    browser.ignoreSynchronization = true;
    browser.manage().window().maximize();
    global.expect = chai.expect;
  },
  cucumberOpts: {
    strict: true,
    format: ["pretty"],
    require: ["../stepDefinitions/*.js", "../support/*.js"],
    tags: "(@AllureScenario or @CucumberScenario or @ProtractorScenario) and (not @DatabaseTest)" // @DatabaseTest scenario can be included when the username & password of DB have been configured in Support/database.js
  }
};
