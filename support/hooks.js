"use strict";
var Cucumber = require("cucumber");
var { defineSupportCode } = require("cucumber");
var fs = require("fs");
var mkdirp = require("mkdirp");
var conf = require("../config/config").config;
var reporter = require("cucumber-html-reporter");
var report = require("cucumber-html-report");

var jsonReports = process.cwd() + "/reports/json";
var htmlReports = process.cwd() + "/reports/html";
var targetJson = jsonReports + "/cucumber_report.json";

defineSupportCode(function({ registerHandler, After, registerListener }) {
  registerHandler("BeforeFeature", { timeout: 10 * 1000 }, function() {
    return browser.get(conf.baseUrl);
  });

  After(function(scenario) {
    if (scenario.isFailed()) {
      var attach = this.attach; // cucumber's world object has attach function which should be used
      return browser.takeScreenshot().then(function(png) {
        var decodedImage = new Buffer(png, "base64");
        return attach(decodedImage, "image/png");
      });
    }
  });

  var cucumberReportOptions = {
    source: targetJson,
    dest: htmlReports,
    name: "cucumber_report.html",
    title: "Cucumber Report"
  };
  var cucumberReporteroptions = {
    theme: "bootstrap",
    jsonFile: targetJson,
    output: htmlReports + "/cucumber_reporter.html",
    reportSuiteAsScenarios: true
  };

  var logFn = string => {
    if (!fs.existsSync(jsonReports)) {
      mkdirp.sync(jsonReports);
    }
    try {
      fs.writeFileSync(targetJson, string);
      reporter.generate(cucumberReporteroptions); //invoke cucumber-html-reporter
      report
        .create(cucumberReportOptions)
        .then(function() {
          //invoke cucumber-html-report
          // creating two reports(optional) here, cucumber-html-report gives directory already exists as cucumber-html-reporter already creates the html dir!
          // suggestion- use either one of the reports based on your needs
          console.log("cucumber_report.html created successfully!");
        })
        .catch(function(err) {
          if (err) {
            console.error(err);
          }
        });
    } catch (err) {
      if (err) {
        console.log("Failed to save cucumber test results to json file.");
        console.log(err);
      }
    }
  };
  var jsonformatter = new Cucumber.JsonFormatter({
    log: logFn
  });
  registerListener(jsonformatter);
});
