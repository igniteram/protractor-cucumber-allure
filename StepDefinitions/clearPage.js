/*jslint node: true*/
var searchPage = require('../Pages/searchPage');

var clearPage = function () {
    'use strict';
    var search = new searchPage();
    this.Then(/^I clear search textbox$/, function () {
        return search.clearText();
    });
};

module.exports = clearPage;
