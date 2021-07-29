import { LightningElement, wire, track } from 'lwc';
import getAllBooks from '@salesforce/apex/bookSearchResultController.getAllBooks';

export default class BookSearchResults extends LightningElement {

    @track allBooks;

    @wire(getAllBooks)
    wirdeBooks({data, error}){
        if(data){
            this.allBooks = []
            data.forEach(item => {
                const book = {};
                book.Id = item.Id;
                book.Name = item.Name;
                book.Author__c = item.Author__c;
                book.Category__c = item.Category__c;
                book.Price__c = item.Price__c;
                book.ISBN__c = item.ISBN__c;
                this.allBooks.push(book);
            });
        } else if (error) {
            console.log('ERROR during the books saving!');
        }
    };
}