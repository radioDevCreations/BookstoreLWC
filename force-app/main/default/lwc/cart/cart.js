import { LightningElement, track } from 'lwc';

export default class Cart extends LightningElement {
    @track orders = [
        {
            id: 1,
            name: 'order1',
        },
        {
            id: 2,
            name: 'order2',
        },
        {
            id: 3,
            name: 'order3',
        },
    ];
}