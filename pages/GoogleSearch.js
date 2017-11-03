class GoogleSearch{
    constructor(){
        this.searchTextBox = $("searchTextBox");
        this.searchButton = $("searchButton");
    }

    getSearchTextBox() {
        return this.searchTextBox;
    }

    setSearchTextBox(searchTextBox) {
        this.searchTextBox = $(searchTextBox);
    }

    getSearchButton() {
        return this.searchButton;
    }

    setSearchButton(searchButton) {
        this.searchButton = $(searchButton);
    }
}

export default GoogleSearch;
