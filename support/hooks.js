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

    var createHtmlReport = function (sourceJson) {
        return report.create({
            source: sourceJson, 
            dest: htmlReports,
            name: 'cucumber_report.html',
            title:'Cucumber Report'

        })
    };

    var options = {
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
        var targetJson = jsonReports + '/cucumber_report.json';
        try {
            fs.writeFileSync(targetJson, string);
            createHtmlReport(targetJson).then(function () {
                console.log('cucumber_report.html created successfully!');
                return reporter.generate(options);   // creating two reports here, it is optional if one report is sufficient
            }).catch(function(err) {
                if(err) {
                    console.error(err);
                }
            });
            
        }
        catch(err) {
            if(err) {
                console.log('Failed to save cucumber test results to json file.');
                console.log(err);
            }
        }
    };
    this.registerListener(JsonFormatter);
}
module.exports = hooks;