public with sharing class cartController {
    @AuraEnabled(cacheable=true)
    public static List<Cart_Item__c> getCartItems(){
        String userId = UserInfo.getUserId();
        return [SELECT Id, Book__r.Id, Book__r.Name, Book_Price__c, Book__r.ISBN__c, User__c
        FROM Cart_Item__c  
         WHERE User__c =: userId]; 
    }

    @AuraEnabled(cacheable=true)
    public static Integer getCartItemsNumber(){
        String userId = UserInfo.getUserId();
        List<Cart_Item__c> cartItems = [SELECT Id
        FROM Cart_Item__c  
        WHERE User__c =: userId];
         
        return cartItems.size(); 
    }

    @AuraEnabled
    public static void createCartItem(String selectedBookId, String selectedBookName, Decimal selectedBookPrice, Integer selectedBookQuantity){

        Cart_Item__c cartItem = new Cart_Item__c();
        cartItem.User__c = UserInfo.getUserId();
        cartItem.Book__c = selectedBookId;
        cartItem.Book_Name__c = selectedBookName;
        cartItem.Book_Price__c = selectedBookPrice;
        cartItem.Quantity__c = selectedBookQuantity;

        insert cartItem;
    }
}
