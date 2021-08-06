import { LightningElement, api, wire } from 'lwc';
import showDetails from "@salesforce/messageChannel/showDetails__c";
import { publish, MessageContext } from 'lightning/messageService';

export default class BookTile extends LightningElement {
    @api bookDetails;

    @wire(MessageContext) messageContext;

    get priceAfterDiscount(){
        if(this.bookDetails.Price_After_Discount__c < this.bookDetails.Price__c){
            return this.bookDetails.Price_After_Discount__c;
        } else {
            return undefined;
        }
    }

    handleShowDetailsButtonClick(event){
        event.preventDefault();
        const bookId = this.bookDetails.Id;

        const messagePayload = {
            bookId: bookId,
        }

        publish(this.messageContext, showDetails, messagePayload);
    }
}