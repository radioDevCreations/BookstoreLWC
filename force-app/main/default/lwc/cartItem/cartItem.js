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

    handleQuantityInputChange(event){
        this.cartItemQuantity = event.target.value;
    }

    handleUpdateQuantity(event){
        updateCartItemQuantity({ cartItemId: this.cartItem.Id, newQuantity: event.target.value });
    }
}