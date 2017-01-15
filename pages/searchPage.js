/*jslint node: true*/
var googleSearch = function () {
    "use strict";
    this.searchTextBox = $("input[name='q']");
    this.searchButton = $("button[name='btnG']");
};
module.exports = googleSearch;