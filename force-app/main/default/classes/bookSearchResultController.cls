public with sharing class bookSearchResultController {
    @AuraEnabled(cacheable=true)
    public static List<Book__c> getAllBooks(){
        return [SELECT Id, Name, Author__c, Category__c, Price__c, ISBN__c FROM Book__c];
    }
}
