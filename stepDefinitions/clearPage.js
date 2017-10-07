"use strict";
const search = require("../pages/searchPage");
const { Then } = require("cucumber");

  Then(/^I clear search textbox$/, function() {
    return search.searchTextBox.clear();
  });
