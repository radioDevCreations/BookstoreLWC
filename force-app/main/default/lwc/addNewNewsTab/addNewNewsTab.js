import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class AddNewNewsTab extends NavigationMixin(LightningElement) {

    handleAddNews(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'News__c',
                actionName: 'new',
            },
            state: {
                nooverride: 1,
                navigationLocation: 'RELATED_LIST',

            }
        });
    }
}