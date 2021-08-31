import { api, LightningElement } from 'lwc';
import ORDER_EMAIL from '@salesforce/schema/Custom_Order__c.Email__c';
import ORDER_CITY from '@salesforce/schema/Custom_Order__c.City__c';
import ORDER_COUNTRY from '@salesforce/schema/Custom_Order__c.Country__c';
import ORDER_POSTAL_CODE from '@salesforce/schema/Custom_Order__c.Postal_Code__c';
import ORDER_PROVINCE from '@salesforce/schema/Custom_Order__c.Province__c';
import ORDER_STREET from '@salesforce/schema/Custom_Order__c.Street__c';

import CUSTOM_ORDER from '@salesforce/schema/Custom_Order__c';

export default class EditOrderTab extends LightningElement {
    @api orderId;
    @api objectApiName = CUSTOM_ORDER;

    fields = [
        ORDER_EMAIL,
        ORDER_CITY,
        ORDER_COUNTRY,
        ORDER_POSTAL_CODE,
        ORDER_PROVINCE,
        ORDER_STREET,
    ];
}   