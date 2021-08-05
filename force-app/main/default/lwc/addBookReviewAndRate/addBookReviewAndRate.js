import { LightningElement, api, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/Book_Review__c.Name';
import REVIEW_FIELD from '@salesforce/schema/Book_Review__c.Review__c';
import RATE_FIELD from '@salesforce/schema/Book_Review__c.Rate__c';
import BOOK_FIELD from '@salesforce/schema/Book_Review__c.Book__c';
import REVIEW_OBJECT from '@salesforce/schema/Book_Review__c'

export default class AddBookReviewAndGrade extends LightningElement {

    @api bookId;

    @track stars = [
        {
            value: 1,
            checked: false,
            classValue: 'starr',
        },
        {
            value: 2,
            checked: false,
            classValue: 'starr',
        },
        {
            value: 3,
            checked: false,
            classValue: 'starr',
        },
        {
            value: 4,
            checked: false,
            classValue: 'starr',
        },
        {
            value: 5,
            checked: false,
            classValue: 'starr',
        }
    ];

    reviewTitle = '';
    reviewDescription = '';

    handleTitleChange(event){
        this.reviewTitle = event.target.value;
    }

    handleDescriptionChange(event){
        this.reviewDescription = event.target.value;
    }

    addReview(){
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.reviewTitle;
        fields[REVIEW_FIELD.fieldApiName] = this.reviewDescription;
        fields[RATE_FIELD.fieldApiName] = this.rate;
        fields[BOOK_FIELD.fieldApiName] = this.bookId;

        const recordInput  = {apiName : REVIEW_OBJECT.objectApiName, fields};

        createRecord(recordInput).then( bookReview => {
            this.showToast('SUCCESS', 'Review succesfully added. Thanks for your feedback!', 'success');
            const reviewAdded = new CustomEvent('newreviewadded');
            this.dispatchEvent(reviewAdded);
        }).catch( error => {
            this.showToast('ERROR', error.body.message, 'error');
        });
    }

    handleChooseRate(event){
        const chosenRate = event.target.dataset.value;

        this.stars.forEach(star => {
            if(star.value <= chosenRate){
                star.checked = true;
                star.classValue = 'fill-starr starr';
            } else {
                star.checked = false;
                star.classValue = 'starr';
            }
        });
        const goldenStars = this.stars.filter(star => {
            return star.checked === true;
        });
        return goldenStars.length;
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }

    get rate(){
        const goldenStars = this.stars.filter(star => {
            return star.checked === true;
        });
        return goldenStars.length+'';
    }

    get isRated(){
        const goldenStars = this.stars.filter(star => {
            return star.checked === true;
        });
        return goldenStars.length > 0;
    }
}