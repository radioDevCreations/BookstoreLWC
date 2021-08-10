public with sharing class cartController {
    @AuraEnabled(cacheable=true)
    public static List<Cart_Item__c> getCartItems(List<String> selectedBooks){
        if(selectedBooks.isEmpty()){
            return null;
        } else {
            return [SELECT Id, Book__r.Id, Book_Price__c, Book__r.ISBN__c
            FROM Cart_Item__c  
            WHERE Book__r.Id IN :selectedBooks]; 
        }
    }
}
