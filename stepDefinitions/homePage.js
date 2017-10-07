"use strict";
const search = require("../pages/searchPage");
const { Given } = require("cucumber");

  Given(/^I am on google page$/, function() {
    return expect(browser.getTitle()).to.eventually.equal("Google");
  });

  Given(/^I am on allure search page$/, function() {
    return expect(browser.getTitle()).to.eventually.equal("allure reports - Google Search");
  });

  Given(/^I am on cucumber search page$/, function() {
    return expect(browser.getTitle()).to.eventually.equal("cucumber - Google Search");
  });
