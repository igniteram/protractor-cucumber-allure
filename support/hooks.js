/*jslint node: true*/
var Cucumber = require('cucumber');
var fs = require('fs');
var conf = require('../config/config').config;
var reporter = require('cucumber-html-reporter');
var CucumberHtmlReport = require('cucumber-html-report');

var hooks = function () {
    "use strict";
    var outputDir = './reports/';

    this.registerHandler('BeforeFeature',{timeout: 10*1000}, function (event) {
        return browser.get(conf.baseUrl);
    });

    this.After('Successfully Applied Hooks', function (scenario, callback) {
        if (scenario.isFailed()) {
            browser.takeScreenshot().then(function (base64png) {
                var decodedImage = new Buffer(base64png, 'base64').toString('binary');
                scenario.attach(decodedImage, 'image/png');
                callback();
            }, function (err) {
                return callback(err);
            });
        }
        callback();
    });

    var createHtmlReport = function (sourceJson) {
        var report = new CucumberHtmlReport({
            source: sourceJson
            , dest: outputDir
        });
        report.createReport();
    };

    var options = {
        theme: 'bootstrap'
        , jsonFile: 'reports/cucumber_report.json'
        , output: 'reports/cucumber_report.html'
        , reportSuiteAsScenarios: true
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
                reporter.generate(options);
            }
        });
    };
    this.registerListener(JsonFormatter);
}
module.exports = hooks;