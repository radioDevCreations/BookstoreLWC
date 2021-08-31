import { LightningElement, api, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getCartItemsNumber from '@salesforce/apex/cartController.getCartItemsNumber';
import messageChannel from "@salesforce/messageChannel/messageChannel__c";
import { MessageContext, subscribe, unsubscribe, APPLICATION_SCOPE } from 'lightning/messageService';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

export default class CartItemsInfo extends NavigationMixin(LightningElement) {
    @api clickable;
    numberOfItems = 0;
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

    cartItemsNumberResponse
    @wire(getCartItemsNumber) 
    wiredCartItemsNumber(response){
        const {data, error} = response;
        this.cartItemsNumberResponse = response;
        if(data) {
            this.numberOfItems = data;
        } else if (error) {
            this.showToast('ERROR', error.body.message, 'error');
        }
    };

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    };

    handleNavigateToCartTab(){
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                pageName: 'cart'
            },
        });
    }

    refresh(message){
        if(message.status === 'refresh'){
            refreshApex(this.cartItemsNumberResponse);
        }
        if(message.status === 'buy'){
            refreshApex(this.cartItemsDataResponse);
        }
    }

    get title(){
        return `Cart (${this.numberOfItems})`;
    }
}