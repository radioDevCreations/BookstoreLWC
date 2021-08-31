import { LightningElement, api, wire, track } from 'lwc';
import messageChannel from "@salesforce/messageChannel/messageChannel__c";
import { publish, MessageContext } from 'lightning/messageService';
import getCartItemsByOrderId from '@salesforce/apex/cartController.getCartItemsByOrderId';

export default class OrderDetails extends LightningElement {
    
    @api management;
    @api order;
    @track orderItems = [];

    @wire(MessageContext) messageContext;

    orderItemsResponse
    @wire(getCartItemsByOrderId, {customOrderId: '$order.Id'})
    wiredCartItems(response){
        const {data, error} = response;
        this.orderItemsResponse = response;
        if(data){
            this.orderItems = [];
            data.forEach(order => {
                const orderItem = {};
                orderItem.Id = order.Id;
                orderItem.BookId = order.Book__r.Id;
                orderItem.Book_Name = order.Book__r.Name;
                orderItem.Book_Price = order.Book_Price__c;
                orderItem.Book_Category = order.Book__r.Category__r.Name;
                orderItem.Book_ISBN = order.Book__r.ISBN__c;
                orderItem.Book_Quantity = order.Quantity__c;
                this.orderItems.push(orderItem);
            });
            //console.log(this.orderItems)
        } else if (error) {
            this.showToast('ERROR', error.body.message, 'error');
        }
    };

    selectThisOrderWithMode(event){
        const messagePayload = {
            orderId: this.order.Id,
            orderManagerMode: event.target.dataset.mode,
        }
        publish(this.messageContext, messageChannel, messagePayload);
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    };

    get itemsFound(){
        return !!this.orderItems.length;
    }
    get editable(){
        return this.order.Status === 'New';
    }
}