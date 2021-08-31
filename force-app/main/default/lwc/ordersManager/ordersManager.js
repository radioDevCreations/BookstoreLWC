import { LightningElement, wire, track, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import messageChannel from "@salesforce/messageChannel/messageChannel__c";
import { MessageContext, subscribe, unsubscribe, APPLICATION_SCOPE } from 'lightning/messageService';

import ORDER_ID from '@salesforce/schema/Custom_Order__c.Id';
import ORDER_EMAIL from '@salesforce/schema/Custom_Order__c.Email__c';
import ORDER_CITY from '@salesforce/schema/Custom_Order__c.City__c';
import ORDER_COUNTRY from '@salesforce/schema/Custom_Order__c.Country__c';
import ORDER_NAME_ID from '@salesforce/schema/Custom_Order__c.Name';
import ORDER_POSTAL_CODE from '@salesforce/schema/Custom_Order__c.Postal_Code__c';
import ORDER_PROVINCE from '@salesforce/schema/Custom_Order__c.Province__c';
import ORDER_STATUS from '@salesforce/schema/Custom_Order__c.Status__c';
import ORDER_STREET from '@salesforce/schema/Custom_Order__c.Street__c';
import ORDER_SUMMARY_PRICE from '@salesforce/schema/Custom_Order__c.Summary_Price__c';
import ORDER_USER from '@salesforce/schema/Custom_Order__c.User__c';

const fields = [
    ORDER_ID,
    ORDER_NAME_ID,
    ORDER_EMAIL,
    ORDER_CITY,
    ORDER_COUNTRY,
    ORDER_POSTAL_CODE,
    ORDER_PROVINCE,
    ORDER_STATUS,
    ORDER_STREET,
    ORDER_SUMMARY_PRICE,
    ORDER_USER
];

export default class OrdersManager extends LightningElement {
    @api management;
    @track selectedOrderId;
    @track selectedTabValue;
    subscription = null;

    @wire(MessageContext) messageContext;

    connectedCallback(){
        if(!this.subscription){
            subscribe(
                this.messageContext,
                messageChannel, 
                message => {
                this.handleSelectedOrderId(message);
                },
                { scope: APPLICATION_SCOPE });
        }
    }

    disconnectedCallback(){
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    @wire(getRecord, { recordId: '$selectedOrderId', fields })
    selectedOrder;

    handleTabChange(event){
        this.selectedTabValue = event.target.value;
    }

    handleSelectedOrderId(message){
        if(message){
            this.selectedOrderId = message.orderId;
            this.selectedTabValue = message.orderManagerMode;
        }
    }

    get orderFound(){
        return !!this.selectedOrder.data;
    }
    get editable(){
        return this.selectedOrder.data.fields.Status__c.value === 'New';
    }
}