import Globals from '../support/Globals';
import { browser } from 'protractor';
import { Given } from "cucumber";

// Chai
const globals = new Globals();
const expect = globals.expect;

Given(/^I am on google page with title "(.*?)"$/, (title) => {
    return expect(browser.getTitle()).to.eventually.equal(title);
});

Given(/^I am on allure page with title "(.*?)"$/, (title) => {
    return expect(browser.getTitle()).to.eventually.equal(title);
});

Given(/^I am on cucumber page with title "(.*?)"$/, (title) => {
    return expect(browser.getTitle()).to.eventually.equal(title);
});
