import { LightningElement, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import showDetails from "@salesforce/messageChannel/showDetails__c";
import { MessageContext, subscribe, unsubscribe, APPLICATION_SCOPE } from 'lightning/messageService';

import NEWS_ID from '@salesforce/schema/News__c.Id';
import NEWS_NAME from '@salesforce/schema/News__c.Name';
import NEWS_CONTENT from '@salesforce/schema/Book__c.News__c.Name';
import NEWS_PUBLICATION_DATE from '@salesforce/schema/News__c.Price__c';

const fields = [
    NEWS_ID,
    NEWS_NAME,
    NEWS_CATEGORY,
    NEWS_PRICE,
]

export default class NewsEditor extends LightningElement {

    @track selectedNewsId;
    @track selectedTabValue;
    subscription = null;

    @wire(MessageContext) messageContext;

    connectedCallback(){
        if(!this.subscription){
            subscribe(
                this.messageContext,
                showDetails, 
                message => {
                this.handleSelectedNewsId(message);
                },
                { scope: APPLICATION_SCOPE });
        }
    }

    disconnectedCallback(){
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    @wire(getRecord, { recordId: '$selectedNewsId', fields })
    selectedNews;

    handleTabChange(event){
        this.selectedTabValue = event.target.value;
    }

    handleSelectedNewsId(message){
        if(message){
        this.selectedNewsId = message.newsId;
        }
    }

    handleReviewAdded(){
        const newsReviewsComponent = this.template.querySelector('c-news-reviews-and-rates');
        if(newsReviewsComponent){
            newsReviewsComponent.getNewsReviews();
        }

        this.selectedTabValue = 'NEWS_REVIEWS_TAB';
    }

    get newsFound(){
        return !!this.selectedNews.data;
    }
}