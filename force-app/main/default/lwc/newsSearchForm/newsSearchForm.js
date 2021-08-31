import { LightningElement, track, wire} from 'lwc';

export default class NewsSearchForm extends LightningElement {
    handleSearchboxChange(event){
        const keyword = event.detail.value;

        const searchByKeywordChangeEvent = new CustomEvent('searchbykeywordchange', {detail: keyword});
        this.dispatchEvent(searchByKeywordChangeEvent);
    }

}