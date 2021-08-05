import { LightningElement, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Book__c.Name';
import PRICE_FIELD from '@salesforce/schema/Book__c.Price__c';
import PICTURE_URL_FIELD from '@salesforce/schema/Book__c.PictureURL__c';
import ISBN_FIELD from '@salesforce/schema/Book__c.ISBN__c';
import RELEASE_DATE_FIELD from '@salesforce/schema/Book__c.Release_Date__c';
import DISCOUNT_FIELD from '@salesforce/schema/Book__c.Discount__c';
import CATEGORY_FIELD from '@salesforce/schema/Book__c.Category__c';
import AUTHOR_FIELD from '@salesforce/schema/Book__c.Author__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Book__c.Description__c';
import BOOK_OBJECT from '@salesforce/schema/Book__c';

export default class EditBookTab extends LightningElement {

    @api bookId;
    @api objectApiName = BOOK_OBJECT;
    fields = [
        NAME_FIELD,
        PRICE_FIELD,
        PICTURE_URL_FIELD,
        ISBN_FIELD,
        RELEASE_DATE_FIELD,
        DISCOUNT_FIELD,
        CATEGORY_FIELD,
        AUTHOR_FIELD,
        DESCRIPTION_FIELD
    ]

    handleAddNewBook(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                recordId: this.bookId,
                objectApiName: this.objectApiName,
                actionName: 'edit',
            }
        });
    }
}