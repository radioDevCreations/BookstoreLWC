import { LightningElement, api, track } from 'lwc';

export default class NewsSearchResult extends LightningElement {
    @api results;
    @api editable;

    @track currentPage = 1;
    resultsPerPage = 5;
    numberOfPages = 1;

    handleNext() {
        if(this.currentPage < this.numberOfPages){
            this.currentPage += 1;
        }
    }

    handlePrevious() {
        if(this.currentPage > 1){
            this.currentPage -= 1;
        }
    }

    handleFirst() {
        this.currentPage = 1;
    }

    handleLast() {
        this.currentPage = this.numberOfPages;
    }

    get newsFound(){
        return !!this.results;
    }

    get paginationActive(){
        return this.results && this.results.length > this.resultsPerPage;
    }

    get firstButtonAndPreviousButtonDisplayed() {
        return this.currentPage > 1;
    }
    get lastButtonAndNextButtonDisplayed() {
        return this.currentPage < this.numberOfPages;
    }

    get paginatedResults() {
        this.numberOfPages = this.results && Math.ceil(this.results.length / this.resultsPerPage);
        const begin = (this.currentPage - 1) * parseInt(this.resultsPerPage);
        const end = parseInt(begin) + parseInt(this.resultsPerPage);
        return this.results.slice(begin, end);
    } 
}