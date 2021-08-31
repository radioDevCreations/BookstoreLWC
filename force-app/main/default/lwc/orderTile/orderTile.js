import { LightningElement, api, track } from 'lwc';

export default class OrderTile extends LightningElement {
    @api order;
    @api management;
    @track detailsShowed = {
        label: 'Show',
        value: false,
    };

    handleShowOrderDetailsClick(){
        this.detailsShowed.value = !this.detailsShowed.value;
        if(this.detailsShowed.label === 'Show'){
            this.detailsShowed.label = 'Hide';
        } else {
            this.detailsShowed.label = 'Show';
        }
        //console.log(this.detailsShowed);
    }
}