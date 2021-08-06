import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import bookstoreManager from "@salesforce/messageChannel/bookstoreManager__c";
import { publish, MessageContext } from 'lightning/messageService';

export default class BookPreview extends NavigationMixin(LightningElement) {

    @api book;
    @api supplies;
    @api customer;
    @api selectedMode;

    @wire(MessageContext) messageContext;

    fullPreview(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.book.data.fields.Id.value,
                objectApiName: 'Book__c',
                actionName: 'view',
            }
        });
    }

    get bookName() {
        try {
            return this.book.data.fields.Name.value;
        } catch (error) {
            console.log(error);
            return 'NA';
        }
    }

    get bookCategory() {
        try {
            return this.book.data.fields.Category__r.value.fields.Name.value;
        } catch (error) {
            console.log(error);
            return 'NA';
        }
    }

    get bookPrice() {
        try {
            return this.book.data.fields.Price__c.value + '\u20AC';
        } catch (error) {
            console.log(error);
            return 'NA';
        }
    }

    get bookISBN() {
        try {
            return this.book.data.fields.ISBN__c.value;
        } catch (error) {
            console.log(error);
            return 'NA';
        }
    }

    get bookPictureURL() {
        try {
            return this.book.data.fields.PictureURL__c.value;
        } catch (error) {
            console.log(error);
            return 'NA';
        }
    }

    get priceAfterDiscount(){
        try {
            if(this.book.data.fields.Price_After_Discount__c.value < this.book.data.fields.Price__c.value){
                return this.book.data.fields.Price_After_Discount__c.value;
            } else {
                return undefined;
            }
        } catch (error) {
            console.log(error);
            return 'NA';
        }
    }



    get bookDescription() {
            try {
                return this.book.data.fields.Description__c.value;
            } catch (error) {
                console.log(error);
                return 'Brak opisu';
            }
    }

    get bookAuthor() {
        try {
            return this.book.data.fields.Author__r.value.fields.Name.value;
        } catch (error) {
            console.log(error);
            return 'NA';
        }
    }

    handleChangeMode(event){
        event.preventDefault();

        this.selectedMode = event.target.value;

        const messagePayload = {
            suppliesManagerMode: this.selectedMode,
        }

        publish(this.messageContext, bookstoreManager, messagePayload);
    }

    get MODE_ADD(){
        return this.selectedMode === 'MODE_ADD';
    }
    get MODE_SEND(){
        return this.selectedMode === 'MODE_SEND';
    }
    get addButtonClass(){
        return this.selectedMode === 'MODE_ADD' ? 'active' : '';
    }
    get sendButtonClass(){
        return this.selectedMode === 'MODE_SEND' ? 'active' : '';
    }
}