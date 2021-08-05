import { LightningElement, api, wire} from 'lwc';
import showDetails from "@salesforce/messageChannel/showDetails__c";
import { publish, MessageContext } from 'lightning/messageService';

export default class NewsTile extends LightningElement {
    @api newsDetails;
    @api editable;

    @wire(MessageContext) messageContext;

    handleShowDetails(event){
        event.preventDefault();
        const newsId = this.newsDetails.Id;

        const messagePayload = {
            newsId: newsId,
        }

        publish(this.messageContext, showDetails, messagePayload);
    }
}