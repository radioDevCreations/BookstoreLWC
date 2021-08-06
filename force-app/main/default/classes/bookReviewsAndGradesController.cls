public with sharing class bookReviewsAndGradesController {
    @AuraEnabled
    public static List<Book_Review__c> getReviews(String bookId){
        return [SELECT Id,
                    Name,
                    Review__c,
                    LastModifiedDate,
                    CreatedDate,
                    CreatedBy.Name,
                    CreatedBy.SmallPhotoUrl,
                    CreatedBy.CompanyName
               FROM Book_Review__c
               WHERE Book__c  =: bookId
               ORDER BY CreatedDate DESC];
    }
}