import {LightningElement, track, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import messageChannel from "@salesforce/messageChannel/messageChannel__c";
import { publish, MessageContext } from 'lightning/messageService';
import createOrder from '@salesforce/apex/ordersController.createOrder';
import validateQuantity from '@salesforce/apex/QuantityValidator.validateQuantity';
import assignCartItemsToOrder from '@salesforce/apex/cartController.assignCartItemsToOrder';

export default class CartContent extends LightningElement {
    @api orders;

    @track streetValue = ''; 
    @track cityValue = ''; 
    @track countryValue = ''; 
    @track provinceValue = ''; 
    @track postalCodeValue = '';
    @track address = {}; 

    @track progressCurrentStep = 1;
    progressHasError = false;
   
    @wire(MessageContext) messageContext;
    
    handlePreviousButtonClick(){
        this.progressCurrentStep -= 1;
    }

    handleNextButtonClick(){
        if(this.progressCurrentStep === 1){
            if(this.orders.length > 0){
                this.progressCurrentStep += 1;
                const promises = [];
                const items = this.template.querySelectorAll('c-cart-item')
                items.forEach(cartItem => promises.push(cartItem.handleUpdateQuantity()));
                Promise.all(promises).then(() => {
                    const messagePayload = {
                        status: 'update_quantity',
                    }
                    publish(this.messageContext, messageChannel, messagePayload);
                });
            }
        } else if (this.progressCurrentStep === 2){
            const address = this.template.querySelector('lightning-input-address');
            const email = this.template.querySelector('lightning-input');    
            const isValid = address.checkValidity();
            
            if(isValid && this.isEmailValid()) {
                const messagePayload = {
                    status: 'refresh',
                }
                publish(this.messageContext, messageChannel, messagePayload);
                this.address = address;
                this.address.email = email.value;
                this.progressCurrentStep += 1;
            } else {
                this.showToast('ERROR', 'Please complete all of the address fields before go to the next step!', 'error');
            }
        }
    }

    handleBuyButtonClick(){
        validateQuantity().then((validation) => {
        if(validation){
                let sum = 0;
                this.orders.forEach(item => {
                    sum += item.Total_Price;
                });
                createOrder({ 
                    email: this.address.email,
                    street: this.address.street,
                    city: this.address.city,
                    postalCode: this.address.postalCode,
                    province: this.address.province,
                    country: this.address.country,
                    price: sum,
                })
                .then(newOrderId => {
                    const ordersToModification = this.orders.map((item) => item.Id)
                    assignCartItemsToOrder({ cartItemsIds: ordersToModification, orderId: newOrderId })
                    .then(() => {
                        const messagePayload = {
                            status: 'buy',
                        }
                        publish(this.messageContext, messageChannel, messagePayload);
                    });
                });
            } else {
                console.log('validation should be passed');
            }
        });
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    };

    isEmailValid(){
        const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let email=this.template.querySelector("lightning-input");
        let emailVal=email.value;
        if(emailVal.match(emailRegex)){
            email.setCustomValidity("");
             email.reportValidity();
            return true;

        }else{
            email.setCustomValidity("You have entered an invalid format.");
            email.reportValidity();
        }
        return false;
    }

    get isLastStep(){
        return this.progressCurrentStep === 3;
    }

    get isSecondStep(){
        return this.progressCurrentStep === 2;
    }

    get isFirstStep(){
        return this.progressCurrentStep <= 1;
    }
    
    get step(){
        return this.progressCurrentStep+"";
    }
}