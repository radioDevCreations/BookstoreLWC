import { LightningElement, api, wire, track } from 'lwc';
import getQuantity from '@salesforce/apex/suppliesManagerActionsController.getQuantity';
import messageChannel from "@salesforce/messageChannel/messageChannel__c";
import { MessageContext, subscribe, unsubscribe, APPLICATION_SCOPE, publish } from 'lightning/messageService';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import updateQuantity from '@salesforce/apex/suppliesManagerActionsController.updateQuantity';

export default class SuppliesManagerAdd extends LightningElement {

    @api bookId;
    @track bookQuantity;

    @wire(MessageContext) messageContext;

    subscription = null;
    @wire(MessageContext) messageContext;

    connectedCallback(){
            this.subscription = subscribe(
                this.messageContext,
                messageChannel, 
                message => {
                this.refresh(message);
                },
                { scope: APPLICATION_SCOPE });
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    bookQuantityResponse
    @wire(getQuantity, {selectedBookId: '$bookId'})
    wiredQuantity(response){
        const {data, error} = response;
        this.bookQuantityResponse = response;
        if(data){
            this.bookQuantity = data;
        } else if (error) {
            this.showToast('ERROR', error.body.message, 'error')
        }
    };

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }


    refresh(message){
        console.log('message');
        if(message.status === 'refresh'){
            refreshApex(this.bookQuantityResponse);
        }
    }

    handleAddSingleSupplyClick(){
        updateQuantity({selectedBookId: this.bookId, newQuantity: this.bookQuantity + 1})
        .then(() => {
            const messagePayload = {
                status: 'refresh',
            }
            publish(this.messageContext, messageChannel, messagePayload);
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleAddTenSuppliesClick(){
        updateQuantity({selectedBookId: this.bookId, newQuantity: this.bookQuantity + 10})
        .then(() => {
            const messagePayload = {
                status: 'refresh',
            }
            publish(this.messageContext, messageChannel, messagePayload);
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleAddSuppliesClick(){
        updateQuantity({selectedBookId: this.bookId, newQuantity: this.bookQuantity + this.operatingQuantity})
        .then(() => {
            const messagePayload = {
                status: 'refresh',
            }
            publish(this.messageContext, messageChannel, messagePayload);
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    handleOperatingQuantityChange(event){
        this.operatingQuantity = parseInt(event.target.value);
        //console.log(this.operatingQuantity);
    }
}