import { LightningElement, wire, track} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import getQuantity from '@salesforce/apex/suppliesManagerActionsController.getQuantity';
import messageChannel from "@salesforce/messageChannel/messageChannel__c";
import { MessageContext, subscribe, unsubscribe, APPLICATION_SCOPE} from 'lightning/messageService';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import BOOK_ID from '@salesforce/schema/Book__c.Id';
import BOOK_NAME from '@salesforce/schema/Book__c.Name';
import BOOK_CATEGORY from '@salesforce/schema/Book__c.Category__r.Name';
import BOOK_PRICE from '@salesforce/schema/Book__c.Price__c';
import BOOK_ISBN from '@salesforce/schema/Book__c.ISBN__c';
import BOOK_PICTURE_URL from '@salesforce/schema/Book__c.PictureURL__c';
import BOOK_PRICE_AFTER_DISCOUNT from '@salesforce/schema/Book__c.Price_After_Discount__c';
import BOOK_DESCRIPTION from '@salesforce/schema/Book__c.Description__c';
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
    BOOK_AUTHOR_NAME,
    BOOK_AUTHOR_DESCRIPTION,
]

export default class SuppliesManagerDetails extends LightningElement {

    @track selectedBookId;
    @track selectedMode;
    bookQuantity;
    @wire(MessageContext) messageContext;

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
    
    bookQuantityResponse
    @wire(getQuantity, {selectedBookId: '$selectedBookId'})
    wiredQuantity(response){
        const {data, error} = response;
        this.bookQuantityResponse = response;
        if(data){
            this.bookQuantity = data;
        } else if (error) {
            this.showToast('ERROR', error.body.message, 'error')
        }
    };

    @wire(getRecord, { recordId: '$selectedBookId', fields })
    selectedBook;

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }

    refresh(message){
        console.log('message');
        if(message.status === 'refresh'){
            refreshApex(this.bookQuantityResponse);
        }
    }


    handleSelectedBookId(message){
        if(message){
            this.selectedBookId = message.bookId;
        }
    }

    get bookFound(){
        return !!this.selectedBook.data;
    }

    get selectedBookWithQuantity(){
        if(!!this.selectedBook && !!this.bookQuantity){
            console.log({
                ...this.selectedBook,
                Quantity__c: this.bookQuantity,
            });
        }
        return null;
    }
}