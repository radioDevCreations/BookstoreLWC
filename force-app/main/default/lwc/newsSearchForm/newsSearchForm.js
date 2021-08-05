import { LightningElement, track, wire} from 'lwc';
import getCategories from '@salesforce/apex/bookSearchFormController.getCategories';

export default class NewsSearchForm extends LightningElement {
    handleSearchboxChange(event){
        const keyword = event.detail.value;

        const searchByKeywordChangeEvent = new CustomEvent('searchbykeywordchange', {detail: keyword});
        this.dispatchEvent(searchByKeywordChangeEvent);
    }

}