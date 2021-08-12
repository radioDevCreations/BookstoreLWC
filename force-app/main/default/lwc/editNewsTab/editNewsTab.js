import { LightningElement, api, wire } from 'lwc';
import NAME_FIELD from '@salesforce/schema/News__c.Name';
import CONTENT_FIELD from '@salesforce/schema/News__c.Content__c';
import PUBLICATION_DATE_FIELD from '@salesforce/schema/News__c.Publication_Date__c';
import NEWS_OBJECT from '@salesforce/schema/News__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import messageChannel from "@salesforce/messageChannel/messageChannel__c";
import { publish, MessageContext } from 'lightning/messageService';

export default class EditBookTab extends LightningElement {

    @api newsId;
    @api objectApiName = NEWS_OBJECT;
    fields=[
        NAME_FIELD,
        CONTENT_FIELD,
        PUBLICATION_DATE_FIELD,
    ];

    @wire(MessageContext) messageContext;

    handleEditSubmit(){
        this.showToast('SUCCESS', 'Record successfully edited!', 'success');
        const messagePayload = {
            status: 'refresh',
        }
        publish(this.messageContext, messageChannel, messagePayload);
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