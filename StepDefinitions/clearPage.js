/*jslint node: true*/
var SearchPage = require('../Pages/searchPage');
var World = require('../Support/world');

var clearPage = function () {
    'use strict';
    var search = new SearchPage();
    World.setDefaultTimeout;
    this.Then(/^I clear search textbox$/, function () {
         
        return search.clearText();
    });
};

module.exports = clearPage;
