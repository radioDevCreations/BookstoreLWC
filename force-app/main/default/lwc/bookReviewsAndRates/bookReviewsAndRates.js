import { LightningElement, track, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getReviews from '@salesforce/apex/bookReviewsAndGradesController.getReviews';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BookOpinionsAndGrades extends NavigationMixin(LightningElement) {

    privateBookId;
    @track bookReviews = [];

    connectedCallback(){
        this.getBookReviews();
    }

    @api
    get bookId(){
        return this.privateBookId;
    }

    set bookId(value){
        this.privateBookId = value;
        this.getBookReviews();
    }

    @api
    getBookReviews(){
        getReviews({bookId : this.privateBookId}).then(reviews => {
            this.bookReviews = reviews;
            //console.log('reviews saved');
        }).catch((error) =>{
            this.showToast('ERROR', error.body.message, 'error');
        })
    }

    handleUserClick(event){
        const userId = event.target.getAttribute('data--userid');
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
              recordId: userId,
              objectApiName: "User",
              actionName: "view",
            }
          });
    }
    
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }

    get hasReviews(){
        if(this.bookReviews.length > 0){
            return true;
        }
        return false;
    }
}