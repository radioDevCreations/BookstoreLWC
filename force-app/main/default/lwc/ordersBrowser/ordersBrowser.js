import getAllOrders from '@salesforce/apex/ordersController.getAllOrders';
import { LightningElement, wire } from 'lwc';

export default class OrdersBrowser extends LightningElement {
    orders = [];

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
                orderItem.Summary_Price = order.Summary_Price__c;
                this.orders.push(orderItem);
            });
        } else if (error) {
            this.showToast('ERROR', error.body.message, 'error');
        }
    };

    get ordersFound(){
        !!this.orders.length;
    }
}