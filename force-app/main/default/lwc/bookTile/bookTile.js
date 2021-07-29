import { LightningElement, api } from 'lwc';

export default class BookTile extends LightningElement {
    @api bookDetails;

    get priceAfterDiscount(){
        if(this.bookDetails.Discount__c && this.bookDetails.Discount__c > 0){
            return this.bookDetails.Price__c - this.bookDetails.Discount__c;
        } else {
            return undefined;
        }
    }

    handleBuyButtonClick(){
        window.console.log('Book buyed');
    }
}