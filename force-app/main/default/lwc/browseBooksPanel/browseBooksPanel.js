import { LightningElement, track, wire, api } from 'lwc';
import getAllAvailableBooks from '@salesforce/apex/browseBooksPanelController.getAllAvailableBooks';
import messageChannel from "@salesforce/messageChannel/messageChannel__c";
import { MessageContext, subscribe, unsubscribe, APPLICATION_SCOPE } from 'lightning/messageService';
import {refreshApex} from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BrowseBooksPanel extends LightningElement {
    @api management;
    @track selectedCategoryId = '';
    @track searchedKeyword = '';
    allBooks;
    subscription = null;
    @wire(MessageContext) messageContext;

    connectedCallback(){
            this.subscription = subscribe(
                this.messageContext,
                messageChannel, 
                message => {
                this.refresh(message);
                },
                { scope: APPLICATION_SCOPE });
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }


    allBooksResponse
    @wire(getAllAvailableBooks, {selectedCategoryId: '$selectedCategoryId'})
    wiredBooks(response){
        const {data, error} = response;
        this.allBooksResponse = response;
        if(data){
            this.allBooks = [];
            data.forEach(item => {
                const book = {};
                book.Id = item.Id;
                book.Name = item.Name;
                book.Author_Name = item.Author__r.Name;
                book.Category__c = item.Category__c;
                book.Price__c = item.Price__c;
                book.ISBN__c = item.ISBN__c;
                book.PictureURL__c = item.PictureURL__c;
                book.Price_After_Discount__c = item.Price_After_Discount__c;
                this.allBooks.push(book);
            });
        } else if (error) {
            this.showToast('ERROR', error.body.message, 'error')
        }
    };

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    };

    handleSelectBookCategory(event){
        this.selectedCategoryId = event.detail;
    }
    
    handleSearchByKeywordChange(event){
        this.searchedKeyword = event.detail;
    }

    refresh(message){
        //console.log(message);
        if(message.status === 'refresh'){
            refreshApex(this.allBooksResponse);
        }
    }

    get filteredBooks(){
        if(this.searchedKeyword.length){
            return this.allBooks.filter(book => {
                return book.Name.toLowerCase().includes(this.searchedKeyword.toLowerCase()) 
                || book.Author_Name.toLowerCase().includes(this.searchedKeyword.toLowerCase())
                || book.ISBN__c.toLowerCase().includes(this.searchedKeyword.toLowerCase());
            });
        } else {
            return this.allBooks;
        }
    }
}