import { LightningElement, api, track, wire } from 'lwc';
import getQuantity from '@salesforce/apex/suppliesManagerActionsController.getQuantity';
import updateQuantity from '@salesforce/apex/suppliesManagerActionsController.updateQuantity';

export default class SuppliesManagerSend extends LightningElement {
    @api bookId;
    @track bookQuantity;

    @track operatingQuantity;
    @wire(getQuantity, {selectedBookId: '$bookId'})
    wiredQuantity({data, error}){
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
        

    handleSendSingleSupplyClick(){
        updateQuantity({selectedBookId: this.bookId, newQuantity: this.bookQuantity - 1})
        .then(() => {
            
        })
        .catch(error => {
            console.log(error);
        });
    }
    handleSendTenSuppliesClick(){
        updateQuantity({selectedBookId: this.bookId, newQuantity: this.bookQuantity - 10})
        .then(() => {

        })
        .catch(error => {
            console.log(error);
        });
    }
    handleSendSuppliesClick(){
        updateQuantity({selectedBookId: this.bookId, newQuantity: this.bookQuantity - this.operatingQuantity})
        .then(() => {

        })
        .catch(error => {
            console.log(error);
        });
    }
    handleOperatingQuantityChange(event){
        this.operatingQuantity = parseInt(event.target.value);
        console.log(this.operatingQuantity);
    }
}