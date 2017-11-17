import GoogleSearch from '../pages/GoogleSearch';
import Globals from '../support/Globals';
import { browser } from 'protractor';
import { When, Then } from "cucumber";

// Chai
const globals = new Globals();
const expect = globals.expect;

// GoogleSearch page instance
const googleSearch = new GoogleSearch();

When(/^I type "(.*?)"$/, (text) => {
    return googleSearch.searchTextBox.sendKeys(text);
});

Then(/^I click search button$/, () => {
    //Here performing keyboard enter as google's search button keeps on changing
    return browser.actions().sendKeys(protractor.Key.ENTER).perform();
});
