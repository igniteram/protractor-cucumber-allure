"use strict";
function googleSearch() {
  this.searchTextBox = $("input[name='q']");
  this.searchButton = $("button[name='btnG']");
}
module.exports = new googleSearch();
