"use strict";
const search = require("../pages/searchPage");
const { When, Then } = require("cucumber");

  When(/^I type "(.*?)"$/, function(text) {
    return search.searchTextBox.sendKeys(text);
  });

  Then(/^I click search button$/, function() {
  // Here performing keyboard enter as google's search button keeps on changing
    return browser.actions().sendKeys(protractor.Key.ENTER).perform();
  });
