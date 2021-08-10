import { LightningElement, wire, track, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import messageChannel from "@salesforce/messageChannel/messageChannel__c";
import { MessageContext, subscribe, unsubscribe, APPLICATION_SCOPE } from 'lightning/messageService';

import BOOK_ID from '@salesforce/schema/Book__c.Id';
import BOOK_NAME from '@salesforce/schema/Book__c.Name';
import BOOK_CATEGORY from '@salesforce/schema/Book__c.Category__r.Name';
import BOOK_PRICE from '@salesforce/schema/Book__c.Price__c';
import BOOK_ISBN from '@salesforce/schema/Book__c.ISBN__c';
import BOOK_PICTURE_URL from '@salesforce/schema/Book__c.PictureURL__c';
import BOOK_PRICE_AFTER_DISCOUNT from '@salesforce/schema/Book__c.Price_After_Discount__c';
import BOOK_DESCRIPTION from '@salesforce/schema/Book__c.Description__c';
import BOOK_QUANTITY from '@salesforce/schema/Book__c.Quantity__c';
import BOOK_AUTHOR_NAME from '@salesforce/schema/Book__c.Author__r.Name';
import BOOK_AUTHOR_DESCRIPTION from '@salesforce/schema/Book__c.Author__r.Description__c';

const fields = [
    BOOK_ID,
    BOOK_NAME,
    BOOK_CATEGORY,
    BOOK_PRICE,
    BOOK_ISBN,
    BOOK_PICTURE_URL,
    BOOK_PRICE_AFTER_DISCOUNT,
    BOOK_DESCRIPTION,
    BOOK_QUANTITY,
    BOOK_AUTHOR_NAME,
    BOOK_AUTHOR_DESCRIPTION,
]

export default class SuppliesManagerDetails extends LightningElement {

    @track selectedBookId;
    @track selectedMode;
    subscription = null;

    @wire(MessageContext) messageContext;

    connectedCallback(){
        if(!this.subscription){
            subscribe(
                this.messageContext,
                messageChannel, 
                message => {
                this.handleSelectedBookId(message);
                },
                { scope: APPLICATION_SCOPE });
        }
    }

    disconnectedCallback(){
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    @wire(getRecord, { recordId: '$selectedBookId', fields })
    selectedBook;


    handleSelectedBookId(message){
        if(message){
            this.selectedBookId = message.bookId;
        }
    }

    get bookFound(){
        return !!this.selectedBook.data;
    }
}