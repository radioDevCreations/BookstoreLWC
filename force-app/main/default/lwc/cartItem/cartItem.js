import { LightningElement, api, track, wire } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import messageChannel from "@salesforce/messageChannel/messageChannel__c";
import { publish, MessageContext } from 'lightning/messageService';
import updateCartItemQuantity from '@salesforce/apex/cartController.updateCartItemQuantity';

export default class CartItem extends LightningElement {
    @api cartItem;
    @track cartItemQuantity = 1;
    @api editable = false;

    @wire(MessageContext) messageContext;

    handleDeleteFromCart(){
        deleteRecord(this.cartItem.Id)
        .then(() => {
            const messagePayload = {
                status: 'refresh',
            }
            publish(this.messageContext, messageChannel, messagePayload);
        });
    }

    @api
    handleUpdateQuantity(){
        const quantityInputValue = this.template.querySelector('lightning-input').value;
        const promise = updateCartItemQuantity({ cartItemId: this.cartItem.Id, newQuantity: quantityInputValue })
        return promise;
    }
}