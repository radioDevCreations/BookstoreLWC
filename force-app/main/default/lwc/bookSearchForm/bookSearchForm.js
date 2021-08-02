import { LightningElement, track, wire} from 'lwc';
import getCategories from '@salesforce/apex/bookSearchFormController.getCategories';

export default class BookSearchForm extends LightningElement {
    @track bookCategories;

    @wire(getCategories)
    wiredCategories({data, error}){
        if(data){
            this.bookCategories = [{value:'', label:'All Categories'}]
            data.forEach(item => {
                const bookCategory = {};
                bookCategory.label = item.Name;
                bookCategory.value = item.Id;
                this.bookCategories.push(bookCategory);
            });
        } else if (error) {
            console.log('ERROR during the category saving!');
        }
    };

    handleCategoryChange(event){
        const categoryId = event.detail.value;
        
        const selectedCategoryChangeEvent = new CustomEvent('selectedcategorychange', {detail: categoryId});
        this.dispatchEvent(selectedCategoryChangeEvent);
    }

    handleSearchboxChange(event){
        const keyword = event.detail.value;

        const searchByKeywordChangeEvent = new CustomEvent('searchbykeywordchange', {detail: keyword});
        this.dispatchEvent(searchByKeywordChangeEvent);
    }

}