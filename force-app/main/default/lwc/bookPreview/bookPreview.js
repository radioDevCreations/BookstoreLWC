import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class BookPreview extends NavigationMixin(LightningElement) {

    @api book;

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

    get bookPriceAfterDiscount() {
        try {
            return (this.book.data.fields.Price__c.value - this.book.data.fields.Discount__c.value) + '\u20AC';
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
}