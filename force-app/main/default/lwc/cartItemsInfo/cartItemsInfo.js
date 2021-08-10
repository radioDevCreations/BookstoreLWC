import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CartItemsInfo extends NavigationMixin(LightningElement) {
    @api clickable;
    @api text = 'Cart';
    numberOfItems = 5;


    handleNavigateToCartTab(){
        console.log('navigate')
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'Cart',
            }
        });
    }

    get title(){
        return `${this.text} (${this.numberOfItems})`;
    }
}