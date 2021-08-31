import getAllOrders from '@salesforce/apex/ordersController.getAllOrders';
import { LightningElement, wire, api } from 'lwc';
import messageChannel from "@salesforce/messageChannel/messageChannel__c";
import { MessageContext, subscribe, unsubscribe, APPLICATION_SCOPE } from 'lightning/messageService';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class OrdersBrowser extends LightningElement {
    @api management;
    orders = [];
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

    ordersResponse
    @wire(getAllOrders)
    wiredOrders(response){
        const {data, error} = response;
        this.ordersResponse = response;
        if(data){
            this.orders = [];
            data.forEach(order => {
                const orderItem = {};
                orderItem.Id = order.Id;
                orderItem.NameId = order.Name;
                orderItem.Email = order.Email__c;
                orderItem.Status = order.Status__c;
                orderItem.Street = order.Street__c;
                orderItem.City = order.City__c;
                orderItem.Postal_Code = order.Postal_Code__c;
                orderItem.Province = order.Province__c;
                orderItem.Country = order.Country__c;
                orderItem.Summary_Price = order.Summary_Price__c;
                orderItem.Created_Date = order.CreatedDate.slice(0, 10);
                this.orders.push(orderItem);
            });
        } else if (error) {
            this.showToast('ERROR', error.body.message, 'error');
        }
    };

    refresh(message){
        if(message.status === 'refresh'){
            refreshApex(this.ordersResponse);
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

    get ordersFound(){
        return !!this.orders.length;
    }
    get filteredOrders(){
        return this.orders;
    }
}