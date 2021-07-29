import { LightningElement, track } from 'lwc';

export default class BrowseBooksPanel extends LightningElement {

    @track selectedCategoryId = '';
    @track searchedKeyword = '';

    handleSelectBookCategory(event){
        this.selectedCategoryId = event.detail;
    }
    handleSearchByKeywordChange(event){
        this.searchedKeyword = event.detail;
    }
} 