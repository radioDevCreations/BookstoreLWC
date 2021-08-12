import {LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

export default class CartContent extends LightningElement {
    @api orders;

    @track progressCurrentStep = 1;
    progressHasError = false;
   
    handlePreviousButtonClick(){
        this.progressCurrentStep -= 1;
    }

    handleNextButtonClick(){
        if(this.progressCurrentStep === 1){
            if(this.orders.length > 0){
                this.progressCurrentStep += 1;
            }
        } else if (this.progressCurrentStep === 2){
            const address =
                this.template.querySelector('lightning-input-address');
            const isValid = address.checkValidity();
            if(isValid) {
                this.progressCurrentStep += 1;
            } else {
                this.showToast('ERROR', 'Please complete all of the address fields before go to the next step!', 'error');
            }
        }
    }

    handleBuyButtonClick(){
        console.log('buy');
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    };

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