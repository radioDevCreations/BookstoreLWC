import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class AddNewBookTab extends NavigationMixin(LightningElement) {

    handleAddNewBook(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Book__c',
                actionName: 'new',
            }
        });
    }
}