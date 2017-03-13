"use strict";
var search = require("../pages/searchPage");
var { defineSupportCode } = require("cucumber");

defineSupportCode(function({ Given }) {
  Given(/^I am on google page$/, function() {
    return expect(browser.getTitle()).to.eventually.equal("Google");
  });
});
