/*jslint node: true*/
var SearchPage = require('../Pages/searchPage');
var World = require('../Support/world');

var searchText = function () {
    'use strict';
    var search = new SearchPage();
    World.setDefaultTimeout;
    this.When(/^I type "(.*?)"$/, function (text) {
        return search.searchTextBox(text);
    });

    this.Then(/^I click search button$/, function () {
        return search.searchButton.click();
    });

};

module.exports = searchText;
