const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const reporter = require("cucumber-html-reporter");
const report = require("cucumber-html-report");
const htmlReports = process.cwd() + "/reports/html";
const targetJson = process.cwd() + "/reports/json/cucumber_report.json";

const cucumberReportOptions = {
  source: targetJson,
  dest: htmlReports,
  name: "cucumber_report.html",
  title: "Cucumber Report"
};
const cucumberReporteroptions = {
  theme: "bootstrap",
  jsonFile: targetJson,
  output: htmlReports + "/cucumber_reporter.html",
  reportSuiteAsScenarios: true
};

class Reporter {

  static createDirectory(dirName) {
    //Check if the directory exist
    if (!fs.existsSync(dirName)) {
      mkdirp.sync(dirName);
    }
    }

  static createHTMLReport() {

    try {
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
  }

  /**
   * Allure reports method, would work only with cucumber 1.3.x & less versions
   * Currently incompatible with latest cucumber 3.x version
   */

  static createAllureXML() {
    const allureReporter = require("cucumberjs-allure-reporter");
    const xmlReports = process.cwd() + "/reports/xml";
    Reporter.createDirectory(xmlReports);
    allureReporter.config({
      targetDir: xmlReports
    })
  }
}
module.exports = Reporter;