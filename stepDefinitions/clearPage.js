import GoogleSearch from '../pages/GoogleSearch';
import { defineSupportCode } from "cucumber";

// GoogleSearch page instance
const googleSearch = new GoogleSearch();

defineSupportCode(({ Then }) => {
    Then(/^I clear search textbox "([^"]*)"$/, (searchTextBox) => {
        googleSearch.setSearchTextBox(searchTextBox);
        return googleSearch.searchTextBox.clear();
    });
});

