/*jslint node: true*/
var SearchPage = require('../Pages/searchPage');

var clearPage = function () {
    "use strict";
    var search = new SearchPage();

    this.Then(/^I clear search textbox$/, function () {

        return search.searchTextBox.clear();
    });
};

module.exports = clearPage;