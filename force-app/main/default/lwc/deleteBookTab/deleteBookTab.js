import { LightningElement, api } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DeleteBookTab extends LightningElement {

    @api bookId;

    handleDeleteBook(){
        deleteRecord(this.bookId)
        .then(() => this.showToast('SUCCESS', 'Book successfully deleted!', 'success'))
        .catch(error => this.showToast('ERROR', error.body.message + 'XD', 'error'));
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }
}