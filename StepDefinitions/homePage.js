/*jslint node: true*/
var SearchPage = require('../Pages/searchPage');
var World = require('../Support/world');

var homePage = function () {
    'use strict';
   var search = new SearchPage(); 
   World.setDefaultTimeout;
    this.Given(/^I am on google page$/, function () {
        
        return World.expect(search.title()).to.eventually.equal('Google');
             
  });
};

module.exports = homePage;
