import { LightningElement, track, wire } from 'lwc';
import showDetails from "@salesforce/messageChannel/showDetails__c";
import { MessageContext, subscribe, unsubscribe, APPLICATION_SCOPE } from 'lightning/messageService';

export default class SuppliesManagerActions extends LightningElement {
    @track mode;
    @track bookId;

    @wire(MessageContext) messageContext;

    connectedCallback(){
        if(!this.subscription){
            subscribe(
                this.messageContext,
                showDetails, 
                message => {
                this.handleSelectedMode(message);
                },
                { scope: APPLICATION_SCOPE });
        }
    }

    handleSelectedMode(message){
        this.mode = message.suppliesManagerMode;
        this.bookId = message.bookId;
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

    get titleLabel(){
        if(this.MODE_ADD) return 'Add Supplies';
        else if(this.MODE_SEND) return 'Send Supplies';
    }
}