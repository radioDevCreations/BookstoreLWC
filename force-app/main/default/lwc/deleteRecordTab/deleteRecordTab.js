import { LightningElement, api, wire } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import messageChannel from "@salesforce/messageChannel/messageChannel__c";
import { publish, MessageContext } from 'lightning/messageService';

export default class DeleteRecordTab extends LightningElement {

    @api recordId;
    @api label;

    @wire(MessageContext) messageContext;

    handleDeleteRecord(){
        deleteRecord(this.recordId)
        .then(() => {
            this.showToast('SUCCESS', 'Record successfully deleted!', 'success');
            const messagePayload = {
                status: 'refresh',
            }
            publish(this.messageContext, messageChannel, messagePayload);
        })
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