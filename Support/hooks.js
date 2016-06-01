/*jslint node: true*/
var Cucumber = require('cucumber');
var fs = require('fs');
var conf = require('../Config/config').config;

var hooks = function () {
    "use strict";
  var outputDir = './Reports/';

  this.registerHandler('BeforeFeature', function (event, callback) {
    browser.get(conf.baseUrl);

    callback();
  });

  this.After(function (scenario, callback) {
    if (scenario.isFailed()) {
      browser.takeScreenshot().then(function (base64png) {
        var decodedImage = new Buffer(base64png, 'base64').toString('binary');
        scenario.attach(decodedImage, 'image/png');
        callback();
      }, function (err) {
        callback(err);
      });
    } else {
      callback();
    }
  });

  this.registerHandler('AfterFeature', function (event, callback) {

    // Here all the feature methods and actions can be performed

    callback();
  });

  var createHtmlReport = function (sourceJson) {
    var CucumberHtmlReport = require('cucumber-html-report');
    var report = new CucumberHtmlReport({
      source: sourceJson,
      dest: outputDir
    });
    report.createReport();
  };

  var JsonFormatter = Cucumber.Listener.JsonFormatter();
  JsonFormatter.log = function (string) {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    var targetJson = outputDir + 'cucumber_report.json';
    fs.writeFile(targetJson, string, function (err) {
      if (err) {
        console.log('Failed to save cucumber test results to json file.');
        console.log(err);
      } else {
        createHtmlReport(targetJson);
      }
    });
  };

  this.registerListener(JsonFormatter);

}
module.exports = hooks;