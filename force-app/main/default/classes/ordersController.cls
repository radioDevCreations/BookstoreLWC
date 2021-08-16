public with sharing class ordersController {
    @AuraEnabled(cacheable=true)
    public static List<Custom_Order__c> getAllOrders(){
        Id userId = UserInfo.getUserId();
        return [SELECT Id, Status__c, Summary_Price__c, Email__c, User__c
        FROM Custom_Order__c  
        WHERE User__c =: userId]; 
    }


    @AuraEnabled
    public static Id createOrder(String email, Decimal price){

        Custom_Order__c order = new Custom_Order__c();
        order.User__c = UserInfo.getUserId();
        order.Summary_Price__c = price;
        order.Email__c = email;

        insert order;
        return order.Id;
    }
}
