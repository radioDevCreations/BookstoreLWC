import { LightningElement, api } from 'lwc';

export default class OrderResume extends LightningElement {
    @api address;
    @api cartItems;

    get summaryPrice(){
        let sum = 0;
        this.cartItems.forEach(item => {
            sum += item.Book_Price;
        });
        return sum;
    }
}