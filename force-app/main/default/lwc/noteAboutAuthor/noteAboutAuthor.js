import { LightningElement, api } from 'lwc';

export default class NoteAboutAuthor extends LightningElement {
    @api book;

    get bookAuthorName() {
        try {
            return this.book.data.fields.Author__r.value.fields.Name.value;
        } catch (error) {
            console.log(error);
            return 'NA';
        }
    }

    get bookAuthorDescription() {
        try {
            return this.book.data.fields.Author__r.value.fields.Description__c.value;
        } catch (error) {
            console.log(error);
            return 'NA';
        }
    }
}