/*jslint node: true*/
var SearchPage = require('../Pages/searchPage');
var World = require('../Support/world');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

var homePage = function () {
    'use strict';
   var search = new SearchPage(); 
   this.setDefaultTimeout(60 * 1000);
    this.Given(/^I am on google page$/, function () {
     
        return expect(search.title()).to.eventually.equal('Google');
      
  });
};

module.exports = homePage;
