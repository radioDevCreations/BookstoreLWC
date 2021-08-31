import { LightningElement, track, wire, api } from 'lwc';
import getAllNews from '@salesforce/apex/browseNewsPanelController.getAllNews';
import messageChannel from "@salesforce/messageChannel/messageChannel__c";
import { MessageContext, subscribe, unsubscribe, APPLICATION_SCOPE } from 'lightning/messageService';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BrowseNewsPanel extends LightningElement {

    @api editable;

    @track searchedKeyword = '';
    allNews;
    subscription = null;
    @wire(MessageContext) messageContext;

    connectedCallback(){
            this.subscription = subscribe(
                this.messageContext,
                messageChannel, 
                message => {
                this.refresh(message);
                },
                { scope: APPLICATION_SCOPE });
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    allNewsResponse
    @wire(getAllNews)
    wiredNews(response){
        const {data, error} = response;
        this.allNewsResponse = response;
        if(data){
            this.allNews = [];
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

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    };
    
    handleSearchByKeywordChange(event){
        this.searchedKeyword = event.detail;
    }

    refresh(message){
        //console.log(message);
        if(message.status === 'refresh'){
            refreshApex(this.allNewsResponse);
        }
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