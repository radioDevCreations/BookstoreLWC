import { LightningElement, track, wire } from 'lwc';
import messageChannel from "@salesforce/messageChannel/messageChannel__c";
import { MessageContext, subscribe, unsubscribe, APPLICATION_SCOPE } from 'lightning/messageService';

export default class CustomerOrderEditor extends LightningElement {

    @track selectedOrderId = null;
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

    handleSelectedOrderId(message){
        if(message){
            this.selectedOrderId = message.orderId;
        }
    }
}