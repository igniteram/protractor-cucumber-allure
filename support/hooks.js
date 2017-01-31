/*jslint node: true*/
var Cucumber = require('cucumber');
var fs = require('fs');
var conf = require('../config/config').config;
var reporter = require('cucumber-html-reporter');
var report = require('cucumber-html-report');

var hooks = function () {
    "use strict";
    var jsonReports = process.cwd() + '/reports/json';
    var htmlReports = process.cwd() + '/reports/html';
    var targetJson = jsonReports + '/cucumber_report.json';

    this.registerHandler('BeforeFeature', { timeout: 10 * 1000 }, function (event) {
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

    var cucumberReportOptions = {
        source: targetJson,
        dest: htmlReports,
        name: 'cucumber_report.html',
        title: 'Cucumber Report'

    }
    var cucumberReporteroptions = {
        theme: 'bootstrap',
        jsonFile: jsonReports + '/cucumber_report.json',
        output: htmlReports + '/cucumber_reporter.html',
        reportSuiteAsScenarios: true
    };

    var JsonFormatter = Cucumber.Listener.JsonFormatter();
    JsonFormatter.log = function (string) {
        if (!fs.existsSync(jsonReports)) {
            fs.mkdirSync(jsonReports);
        }
        try {
            fs.writeFileSync(targetJson, string);
            reporter.generate(cucumberReporteroptions);  //invoke cucumber-html-reporter
            report.create(cucumberReportOptions).then(function () {  //invoke cucumber-html-report
            // creating two reports(optional) here, cucumber-html-report gives directory already exists as cucumber-html-reporter already creates the html dir!
            // suggestion- use either one of the reports based on your needs
                console.log('cucumber_report.html created successfully!');   
            }).catch(function (err) {
                if (err) {
                    console.error(err);
                }
            });
        }
        catch (err) {
            if (err) {
                console.log('Failed to save cucumber test results to json file.');
                console.log(err);
            }
        }
    };
    this.registerListener(JsonFormatter);
}
module.exports = hooks;