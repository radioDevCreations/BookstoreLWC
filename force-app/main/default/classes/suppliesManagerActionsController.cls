public with sharing class suppliesManagerActionsController {
    
    @AuraEnabled(cacheable=true)
    public static Decimal getQuantity(String selectedBookId){

        Book__c book = [SELECT Id, Quantity__c
        FROM Book__c
        WHERE Id =: selectedBookId
        LIMIT 1];

        return book.Quantity__c;
    }

    @AuraEnabled
    public static void updateQuantity(String selectedBookId, Decimal newQuantity){

                Book__c book = [SELECT Id, Quantity__c
                FROM Book__c
                WHERE Id =: selectedBookId];

                book.Quantity__c = newQuantity; 
                update book;
    }
}