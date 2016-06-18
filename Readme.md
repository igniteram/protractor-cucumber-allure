###Protractor-Cucumber-Allure Setup Guide
This project demonstrates the basic protractor-cucumber framework project setup with Jenkins CI and Allure Reports integration

###Features
* Crisp & Clear folder structures
* Page Object design pattern implementation
* DirectConnect capability for Chrome & Firefox browsers
* Extensive hooks implemented for BeforeFeature, AfterFeature, AfterScenarios etc.
* Screenshots on failure feature scenarios
* PosgreSQL database connection feature example
* Support for cucumber-html-reports
* Support for CI and Cucumber-Allure-Jenkins reports

###To Get Started

####Pre-requisites
1.NodeJS installed globally in the system.
https://nodejs.org/en/download/

2.Chrome or Firefox browsers installed.

3.Text Editor(Optional) installed-->Sublime/Visual Studio Code.

####Run Scripts
* Clone the repository into a folder
* Go inside the folder and run following command from terminal/command prompt

 >  npm install 

* All the dependencies from package.json would be installed in node_modules folder.
* Following command will launch the browser and run the scripts

 >   npm test

####Writing Features
>     Feature: To search allure reports in google
      @AllureScenario
      Scenario: Allure Reports Google
        Given I am on google page
        When I type "allure reports"
        Then I click search button
        Then I clear search textbox

####Writing Step Definitions
>     var homePage = function () {
     'use strict';
    var search = new searchPage(); 
    this.Given(/^I am on google page$/, function () {
     return expect(search.title()).to.eventually.equal('Google');
       });
     };
         
####Writing Page Objects
>     var googleSearch = function () {
    "use strict";
    this.title = function () {
    return browser.driver.getTitle();
    }; 
    this.searchTextBox= function (text) {
        $("input[name='q']").sendKeys(text);
    };
    this.searchButton = $("button[name='btnG']");
    this.clearText= function () {
        $("input[name='q']").clear();
    };
    };

####Cucumber Hooks
Following method takes screenshot on failure of each scenario

>      this.After(function(scenario, callback) {
       if (scenario.isFailed()) {
       browser.takeScreenshot().then(function(base64png) {
       var decodedImage = new Buffer(base64png, 'base64').toString('binary');
       scenario.attach(decodedImage, 'image/png');
       callback();
       }, function(err) {
       callback(err);
       });
       } else {
       callback();
       }
       });

####CucumberOpts Tags
Following configuration shows to call specific tags from feature files

>     cucumberOpts: {
    monochrome: true,
    strict: true,
    plugin: ["pretty"],
    require: ['../StepDefinitions/*.js', '../Support/*.js'],
    tags: '@Regression,@ProtractorScenario,@AllureScenario'
    }

####Database Connection
PostgreSQL nodejs module has been integrated with this framework, database feature file elaborates the connection and how the query results are retrieved.

>     var pg = require('pg');
    var connectDB = function() {
    var conString = "postgres://username:password@localhost:5432/database_name";
    this.client = new pg.Client(conString);
    this.client.connect(function(err){
    if(err){
            return console.error('could not connect to postgres', err);
        }
    });
    };

####HTML Reports
Default cucumber HTML reports are generated which can be customized according to specific needs

![cucumberreportscreen](https://raw.githubusercontent.com/igniteram/protractor-cucumber-allure/master/Images/cucumberReport.png)

####Allure Reports
The reporter.js file in Support folder generates the target directory "Reports" in which the xml files are generated.For detail instructions on how it works, please refer the Allure-CucumberJS official repo : https://github.com/allure-framework/cucumberjs-allure-reporter

How to setup Jenkins and Allure framework : http://wiki.qatools.ru/display/AL/Allure+Jenkins+Plugin
>      var reporter = require('cucumberjs-allure-reporter');
     reporter.config(
     {
    targetDir:'./Reports/'
     }
     );
     module.exports = reporter;

![allurereportscreen](https://raw.githubusercontent.com/igniteram/protractor-cucumber-allure/master/Images/allureReport.png)
![alluregraphscreen](https://raw.githubusercontent.com/igniteram/protractor-cucumber-allure/master/Images/allureReportGraph.png)

##Contributions
For contributors who want to improve this repo by contributing some code, reporting bugs, issues or improving documentation - PR's are highly welcome, please maintain the coding style , folder structure , detailed description of documentation and bugs/issues with examples if possible.
