import { LightningElement, api } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DeleteRecordTab extends LightningElement {

    @api recordId;
    @api label;

    handleDeleteRecord(){
        deleteRecord(this.recordId)
        .then(() => this.showToast('SUCCESS', 'Record successfully deleted!', 'success'))
        .catch(error => this.showToast('ERROR', error.body.message, 'error'));
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