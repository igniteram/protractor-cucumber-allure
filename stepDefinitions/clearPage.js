"use strict";
var search = require("../pages/searchPage");
var { defineSupportCode } = require("cucumber");

defineSupportCode(function({ Then }) {
  Then(/^I clear search textbox$/, function() {
    return search.searchTextBox.clear();
  });
});
