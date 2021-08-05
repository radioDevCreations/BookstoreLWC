import { LightningElement, track, wire } from 'lwc';
import getAllNews from '@salesforce/apex/browseNewsPanelController.getAllNews';

export default class BrowseNewsPanel extends LightningElement {

    @track searchedKeyword = '';

    allNews;

    @wire(getAllNews)
    wiredNews({data, error}){
        if(data){
            this.allNews = []
            data.forEach(item => {
                const news = {};
                news.Id = item.Id;
                news.Name = item.Name;
                news.Content__c = item.Content__c;
                news.Publication_Date__c = item.Publication_Date__c;
                this.allNews.push(news);
            });
        } else if (error) {
            this.showToast('ERROR', error.body.message, 'error')
        }
    };
    
    handleSearchByKeywordChange(event){
        this.searchedKeyword = event.detail;
    }

    get filteredNews(){
        if(this.searchedKeyword.length){
            return this.allNews.filter(news => {
                return news.Name.toLowerCase().includes(this.searchedKeyword.toLowerCase()) 
                || news.Content__c.toLowerCase().includes(this.searchedKeyword.toLowerCase());
            });
        } else {
            return this.allNews;
        }
    }
    
}