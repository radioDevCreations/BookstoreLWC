import { api, LightningElement } from 'lwc';
import ORDER_STATUS from '@salesforce/schema/Custom_Order__c.Status__c';
import CUSTOM_ORDER from '@salesforce/schema/Custom_Order__c';

export default class ChangeOrderStatusTab extends LightningElement {
    @api orderId;
    @api objectApiName = CUSTOM_ORDER;

    fields = [
        ORDER_STATUS,
    ];
}