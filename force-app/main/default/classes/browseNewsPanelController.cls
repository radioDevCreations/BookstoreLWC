public with sharing class browseNewsPanelController {
        @AuraEnabled(cacheable=true)
        public static List<News__c> getAllNews(){
                return [SELECT Id, Name, Content__c, Publication_Date__c
                FROM News__c ORDER BY Publication_Date__c DESC];
        }
}