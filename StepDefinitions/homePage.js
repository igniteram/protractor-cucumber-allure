/*jslint node: true*/
var searchPage = require('../Pages/searchPage');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

var homePage = function () {
    'use strict';
   var search = new searchPage(); 
  
    this.Given(/^I am on google page$/, function () {
     
        return expect(search.title()).to.eventually.equal('Google');
      
  });
};

module.exports = homePage;
