import { LightningElement, track, wire } from 'lwc';
import bookstoreManager from "@salesforce/messageChannel/bookstoreManager__c";
import { MessageContext, subscribe, unsubscribe, APPLICATION_SCOPE } from 'lightning/messageService';

export default class SuppliesManagerActions extends LightningElement {
    @track mode;

    @wire(MessageContext) messageContext;

    connectedCallback(){
        if(!this.subscription){
            subscribe(
                this.messageContext,
                bookstoreManager, 
                message => {
                this.handleSelectedMode(message);
                },
                { scope: APPLICATION_SCOPE });
        }
    }

    handleSelectedMode(message){
        this.mode = message.suppliesManagerMode;
    }

    disconnectedCallback(){
        unsubscribe(this.subscription);
        this.subscription = null;
    }


    get MODE_ADD(){
        return this.mode === 'MODE_ADD';
    }

    get MODE_SEND(){
        return this.mode === 'MODE_SEND';
    }

    get modeChosen(){
        return !!this.mode;
    }
}