import { LightningElement, track, wire } from 'lwc';
import messageChannel from "@salesforce/messageChannel/messageChannel__c";
import { MessageContext, subscribe, unsubscribe, APPLICATION_SCOPE } from 'lightning/messageService';

export default class BookstoreManager extends LightningElement {

    @track bookstoreManagementTab  = 'BOOK_EDITOR';

    @wire(MessageContext) messageContext;

    connectedCallback(){
        if(!this.subscription){
            subscribe(
                this.messageContext,
                messageChannel, 
                message => {
                this.handleSelectedManagerComponent(message);
                },
                { scope: APPLICATION_SCOPE });
        }
    }

    disconnectedCallback(){
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleSelectedManagerComponent(message){
        if(message && message.from === 'bookstoreManagement'){
                //console.log(message.bookstoreManagementTab);
                this.bookstoreManagementTab = message.bookstoreManagementTab;
            }
    }

    get bookEditorIsOpen(){
        return this.bookstoreManagementTab === 'BOOK_EDITOR';
    }

    get suppliesManagerIsOpen(){
        return this.bookstoreManagementTab === 'SUPPLIES_MANAGER';
    }

    get ordersManagerIsOpen(){
        return this.bookstoreManagementTab === 'ORDERS_MANAGER';
    }

    get newsEditorIsOpen(){
        return this.bookstoreManagementTab === 'NEWS_EDITOR';
    }
}