/*jslint node: true*/
var googleSearch = function () {
    "use strict";
    this.title = function () {
        return browser.driver.getTitle();
    };
    this.searchTextBox = function (text) {
        $("input[name='q']").sendKeys(text);
    };
    this.searchButton = $("button[name='btnG']");
    this.clearText = function () {
        $("input[name='q']").clear();
    };
};
module.exports = googleSearch;