public with sharing class bookSearchResultController {
    @AuraEnabled(cacheable=true)
    public static List<Book__c> getAllBooks(String selectedCategoryId){
        if(String.isEmpty(selectedCategoryId)){
            return [SELECT Id, Name, Author__r.Name, Category__c, Price__c, ISBN__c, PictureURL__c, Discount__c 
            FROM Book__c 
            WHERE Quantity__c > 0];
        } else {
            return [SELECT Id, Name, Author__r.Name, Category__c, Price__c, ISBN__c, PictureURL__c, Discount__c 
            FROM Book__c  
            WHERE Quantity__c > 0
            AND Category__c =: selectedCategoryId]; 
        }
    }
}
