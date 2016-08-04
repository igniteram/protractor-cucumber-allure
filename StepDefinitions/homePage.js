/*jslint node: true*/
var SearchPage = require('../Pages/searchPage');

var homePage = function () {
    "use strict";
    var search = new SearchPage();
    
    this.Given(/^I am on google page$/, function () {

        return expect(browser.getTitle()).to.eventually.equal('Google');

    });
};

module.exports = homePage;