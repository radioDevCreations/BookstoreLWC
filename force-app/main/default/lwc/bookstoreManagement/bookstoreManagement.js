import { LightningElement, wire, track } from 'lwc';
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import USER_ID from "@salesforce/user/Id";
import USER_FIRST_NAME from "@salesforce/schema/User.FirstName";
import USER_LAST_NAME from "@salesforce/schema/User.LastName";
import { NavigationMixin } from "lightning/navigation";

import messageChannel from "@salesforce/messageChannel/messageChannel__c";
import { publish, MessageContext } from 'lightning/messageService';

export default class BookstoreManagement extends LightningElement {

    @track selectedTabValue;

    @wire(MessageContext) messageContext;

    @wire(getRecord, { recordId: USER_ID, fields: [USER_FIRST_NAME, USER_LAST_NAME] })
    user;


    handleTabChange(event){
        this.selectedTabValue = event.target.value;

        const messagePayload = {
            bookstoreManagementTab: this.selectedTabValue,
            from: 'bookstoreManagement',
        }

        //console.log(messagePayload.bookstoreManagementTab);

        publish(this.messageContext, messageChannel, messagePayload);
    }

    handleNavigateToUserPage(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: USER_ID,
                objectApiName: 'User',
                actionName: 'view',
            }
        });
    }

    get userFirstName() {
        return getFieldValue(this.user.data, USER_FIRST_NAME);
    }
    get userLastName() {
        return getFieldValue(this.user.data, USER_LAST_NAME);
    }
}