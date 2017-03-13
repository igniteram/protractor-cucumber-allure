"use strict";
var search = require("../pages/searchPage");
var { defineSupportCode } = require("cucumber");

defineSupportCode(function({ When, Then }) {
  When(/^I type "(.*?)"$/, function(text) {
    return search.searchTextBox.sendKeys(text);
  });

  Then(/^I click search button$/, function() {
    return search.searchButton.click();
  });
});
