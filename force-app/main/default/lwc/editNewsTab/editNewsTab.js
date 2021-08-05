import { LightningElement, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/News__c.Name';
import CONTENT_FIELD from '@salesforce/schema/News__c.Content__c';
import PUBLICATION_DATE_FIELD from '@salesforce/schema/News__c.Publication_Date__c';
import NEWS_OBJECT from '@salesforce/schema/News__c';

export default class EditBookTab extends LightningElement {

    @api newsId;
    @api objectApiName = NEWS_OBJECT;
    fields=[
        NAME_FIELD,
        CONTENT_FIELD,
        PUBLICATION_DATE_FIELD,
    ]

    handleAddNewBook(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                recordId: this.newsId,
                objectApiName: this.objectApiName,
                actionName: 'edit',
            }
        });
    }
}