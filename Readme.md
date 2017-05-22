### Protractor-Cucumber-Allure Setup Guide

 [![CircleCI](https://circleci.com/gh/igniteram/protractor-cucumber-allure/tree/circle-ci.svg?style=shield)](https://circleci.com/gh/igniteram/protractor-cucumber-allure/tree/circle-ci)
 [![Build Status](https://travis-ci.org/igniteram/protractor-cucumber-allure.svg?branch=master)](https://travis-ci.org/igniteram/protractor-cucumber-allure)
 [![dependencies](https://david-dm.org/igniteram/protractor-cucumber-allure.svg)](https://david-dm.org/igniteram/protractor-cucumber-allure)
 [![Code Climate](https://codeclimate.com/github/igniteram/protractor-cucumber-allure/badges/gpa.svg)](https://codeclimate.com/github/igniteram/protractor-cucumber-allure)

This project demonstrates the basic protractor-cucumber framework project setup with Jenkins CI and Allure Reports integration

### Features
* Crisp & Clear folder structures
* Page Object design pattern implementation
* DirectConnect capability for Chrome & Firefox browsers
* Extensive hooks implemented for BeforeFeature, AfterFeature, AfterScenarios etc.
* MultiCapabalities and Test Sharding example
* Screenshots on failure feature scenarios
* PosgreSQL database connection feature example
* Support for cucumber-html-reports
* Support for CI and Cucumber-Allure-Jenkins reports

### To Get Started

#### Pre-requisites
1.NodeJS installed globally in the system.
https://nodejs.org/en/download/

**Note** Min node version 6.9.x

2.Chrome or Firefox browsers installed.

3.Text Editor(Optional) installed-->Sublime/Visual Studio Code.

#### Run Scripts
* Clone the repository into a folder
* Go inside the folder and run following command from terminal/command prompt

 >  npm install 

* All the dependencies from package.json would be installed in node_modules folder.
* Following command will launch the browser and run the scripts

 >   npm test

#### Writing Features

>     
      Feature: To search allure reports in google
      @AllureScenario
      Scenario: Allure Reports Google
        Given I am on google page
        When I type "allure reports"
        Then I click search button
        Then I clear search textbox

#### Writing Step Definitions

>     
    var googleSearch = function () {
    "use strict";
    var search = require("../pages/searchPage");
    var { defineSupportCode } = require("cucumber");

    defineSupportCode(function({ Given }) {
        Given(/^I am on google page$/, function() {
            return expect(browser.getTitle()).to.eventually.equal("Google");
          });
    });
         
#### Writing Page Objects

>   
    function googleSearch() {
       this.searchTextBox = $("input[name='q']");
       this.searchButton = $("button[name='btnG']");
    }
    module.exports = new googleSearch();

#### Cucumber Hooks
Following method takes screenshot on failure of each scenario

>      
     defineSupportCode(function(After) {
        After(function(scenario) {
            if (scenario.isFailed()) {
                var attach = this.attach; // cucumber's world object has attach function which should be used
                    return browser.takeScreenshot().then(function(png) {
                var decodedImage = new Buffer(png, "base64");
                    return attach(decodedImage, "image/png");
                });
                }
            });
        });

#### CucumberOpts Tags
Following configuration shows to call specific tags from feature files

>     
    cucumberOpts: {
    strict: true,
    format: ["pretty"],
    require: ["../stepDefinitions/*.js", "../support/*.js"],
    tags: "(@AllureScenario or @CucumberScenario or @ProtractorScenario) and (not @DatabaseTest)" 
    }

#### Database Connection
PostgreSQL nodejs module has been integrated with this framework, database feature file elaborates the connection and how the query results are retrieved.

>     
    var pg = require('pg');
    var connectDB = function() {
    var conString = "postgres://username:password@localhost:5432/database_name";
    this.client = new pg.Client(conString);
    this.client.connect(function(err){
    if(err){
            return console.error('could not connect to postgres', err);
        }
    });
    };

#### HTML Reports
Currently this project has been integrated with two types of cucumber HTML reports just for demo, which are generated when you run `npm test` in the `reports` folder.
They can be customized according to user's specific needs-
* [cucumber-html-reporter](https://github.com/gkushang/cucumber-html-reporter)
* [cucumber-html-report](https://github.com/leinonen/cucumber-html-report)

![cucumberreporterscreen](https://raw.githubusercontent.com/igniteram/protractor-cucumber-allure/master/images/cucumberReporter.PNG)
![cucumberreportscreen](https://raw.githubusercontent.com/igniteram/protractor-cucumber-allure/master/images/cucumberReport.png)

#### Allure Reports

##### Caveat

These reports do not support latest **cucumber 2.0 version**, however they work with older **version cucumber 1.3.5 & less**. You would have to use the older cucumber syntax as well.

The reporter.js file in Support folder generates the target directory "Reports" in which the xml files are generated.For detail instructions on how it works, please refer the Allure-CucumberJS official repo : https://github.com/allure-framework/cucumberjs-allure-reporter

How to setup Jenkins and Allure framework : http://wiki.qatools.ru/display/AL/Allure+Jenkins+Plugin
>      
    var reporter = require('cucumberjs-allure-reporter');
     reporter.config(
     {
        targetDir:'./reports/'
     }
     );
    module.exports = reporter;

![allurereportscreen](https://raw.githubusercontent.com/igniteram/protractor-cucumber-allure/master/images/allureReport.png)
![alluregraphscreen](https://raw.githubusercontent.com/igniteram/protractor-cucumber-allure/master/images/allureReportGraph.png)

## Contributions
For contributors who want to improve this repo by contributing some code, reporting bugs, issues or improving documentation - PR's are highly welcome, please maintain the coding style , folder structure , detailed description of documentation and bugs/issues with examples if possible.
