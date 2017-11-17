import { browser } from 'protractor';

const EC = browser.ExpectedConditions;
/*
This class assists in waiting for non-angular page screen elements
 */
class ElementHelper {
	waitForPresent(ele) {
		return browser.wait(EC.presenceOf(ele));
	}
	waitForDisplay(ele) {
		return browser.wait(ele.isDisplayed);
	}
	waitForElement(ele) {
		this.waitForPresent(ele);
		this.waitForDisplay(ele);
	}
}

export default ElementHelper;
