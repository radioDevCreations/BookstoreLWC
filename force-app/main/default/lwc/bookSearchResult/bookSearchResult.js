import { LightningElement, wire, track, api } from 'lwc';
import getAllBooks from '@salesforce/apex/bookSearchResultController.getAllBooks';
import ShowToastEvent from 'lightning/platformShowToastEvent';

export default class BookSearchResults extends LightningElement {
    @api selectedCategoryId;
    @api searchedKeyword;

    allBooks;

    @wire(getAllBooks, {selectedCategoryId: '$selectedCategoryId'})
    wirdeBooks({data, error}){
        if(data){
            this.allBooks = []
            data.forEach(item => {
                const book = {};
                book.Id = item.Id;
                book.Name = item.Name;
                book.Author_Name = item.Author__r.Name;
                book.Category__c = item.Category__c;
                book.Price__c = item.Price__c;
                book.ISBN__c = item.ISBN__c;
                book.PictureURL__c = item.PictureURL__c;
                book.Discount__c = item.Discount__c;
                this.allBooks.push(book);
            });
        } else if (error) {
            this.showToast('ERROR', error.body.message, 'error')
        }
    };

    showToast(title, message, variant){
        const event = new ShowToastEvent({
            title,
            message,
            variant,
        });
        this.dispatchEvent(event);
    }

    get booksFound(){
        return !!this.allBooks;
    }


}