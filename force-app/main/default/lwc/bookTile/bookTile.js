import { LightningElement, api } from 'lwc';

export default class BookTile extends LightningElement {
    @api bookDetails;

    handleBuyButtonClick(){
        window.console.log('Book buyed');
    }
}