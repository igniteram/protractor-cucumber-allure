###Protractor-Cucumber-Allure Setup Guide
This project demonstrates the basic protractor-cucumber framework project setup with Jenkins CI and Allure Reports integration

###Features
* Crisp & Clear protractor folder structures
* Page Object design pattern implementation
* DirectConnect capability for Chrome & Firefox browsers
* Extensive hooks implemented for BeforeFeature, AfterFeature, AfterScenarios etc.
* Screenshots on failure feature scenarios
* Support for cucumber-html-reports
* Support for CI and Cucumber-Allure-Jenkins reports

###To Get Started

####Pre-requisites
1.NodeJS installed globally in the system.

2.Chrome or Firefox browsers installed.

3.Text Editor(Optional) installed-->Sublime/Visual Studio Code.

####Run Scripts
* Clone the repository into a folder
* Go inside the folder and run "npm install" from terminal/command prompt
* All the dependencies from package.json would be installed.
* Run "npm test" from terminal/command prompt and you should see the browser doing the rest.

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
    this.searchButton = $("button[name='btnG1']");
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

####HTML Reports
Default cucumber HTML reports are generated which can be customized according to specific needs

![reportscreen](Images/cucumberReport.png?raw=true)