import { LightningElement, wire } from 'lwc';
import getCartItems from '@salesforce/apex/cartController.getCartItems';
import messageChannel from "@salesforce/messageChannel/messageChannel__c";
import { MessageContext, subscribe, unsubscribe, APPLICATION_SCOPE } from 'lightning/messageService';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';

export default class Cart extends NavigationMixin(LightningElement) {

    orders = [];

    subscription = null;

    @wire(MessageContext) messageContext;

    cartItemsDataResponse
    @wire(getCartItems)
    wiredCartItems(response){
        const {data, error} = response;
        this.cartItemsDataResponse = response;
        if(data){
            this.orders = [];
            data.forEach(item => {
                const cartItem = {};
                cartItem.Id = item.Id;
                cartItem.BookId = item.Book__r.Id;
                cartItem.Book_Name = item.Book__r.Name;
                cartItem.Book_Price = item.Book_Price__c;
                cartItem.Quantity = item.Quantity__c;
                cartItem.Total_Price = item.Total_Price__c;
                cartItem.Book_Category = item.Book__r.Category__r.Name;
                cartItem.Book_ISBN = item.Book__r.ISBN__c;
                this.orders.push(cartItem);
            });
        } else if (error) {
            this.showToast('ERROR', error.body.message, 'error');
        }
    };

    connectedCallback(){
            this.refresh({status: 'refresh'});
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

    

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    };

    refresh(message){
        if(message.status === 'refresh'){
            if(this.orders.length <= 1){
                this[NavigationMixin.Navigate]({
                    type: 'comm__namedPage',
                    attributes: {
                        apiName: 'products',
                    }
                });
            } 
            console.log('main refresh');
            refreshApex(this.cartItemsDataResponse);
        }

        if(message.status === 'buy'){
            if(this.orders.length >= 1){
                console.log('it happens');
                this[NavigationMixin.Navigate]({
                    type: 'comm__namedPage',
                    attributes: {
                        pageName: 'custom-orders',
                    }
                });
            }
            refreshApex(this.cartItemsDataResponse);
        }
    }
}