/*jslint node: true*/
var searchPage = require('../Pages/searchPage');

var searchText = function () {
    'use strict';
    var search = new searchPage();
    this.When(/^I type "(.*?)"$/, function (text) {
        return search.searchTextBox(text);
    });

    this.Then(/^I click search button$/, function () {
        return search.searchButton.click();
    });

};

module.exports = searchText;
