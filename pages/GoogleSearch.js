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
    }//#lst-ib

    getSearchButton() {
        return this.searchButton;
    }

    setSearchButton(searchButton) {
        this.searchButton = $(searchButton);
    }//input[value='Google Search']
}

export default GoogleSearch;
