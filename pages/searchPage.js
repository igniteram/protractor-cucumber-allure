"use strict";
function googleSearch() {
  this.searchTextBox = $("#lst-ib");
  this.searchButton = $("input[value='Google Search']");
}
module.exports = new googleSearch();
