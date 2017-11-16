import GoogleSearch from '../pages/GoogleSearch';
import { Then } from "cucumber";

// GoogleSearch page instance
const googleSearch = new GoogleSearch();


Then(/^I clear search textbox$/, () => {
    return googleSearch.searchTextBox.clear();
});

