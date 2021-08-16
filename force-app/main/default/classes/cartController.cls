public with sharing class cartController {
    @AuraEnabled(cacheable=true)
    public static List<Cart_Item__c> getCartItems(){
        String userId = UserInfo.getUserId();
        return [SELECT Id, Book__r.Id, Book__r.Name, Book_Price__c, Book__r.Category__r.Name, Book__r.ISBN__c, User__c, Custom_Order__c
        FROM Cart_Item__c  
        WHERE User__c =: userId
        AND Custom_Order__c =: null]; 
    }

    @AuraEnabled(cacheable=true)
    public static Integer getCartItemsNumber(){
        String userId = UserInfo.getUserId();
        List<Cart_Item__c> cartItems = [SELECT Id
        FROM Cart_Item__c  
        WHERE User__c =: userId
        AND Custom_Order__c =: null];
         
        return cartItems.size(); 
    }

    @AuraEnabled
    public static void createCartItem(String selectedBookId, String selectedBookName, Decimal selectedBookPrice, Integer selectedBookQuantity, Id orderId){

        Cart_Item__c cartItem = new Cart_Item__c();
        cartItem.User__c = UserInfo.getUserId();
        cartItem.Book__c = selectedBookId;
        cartItem.Book_Name__c = selectedBookName;
        cartItem.Book_Price__c = selectedBookPrice;
        cartItem.Quantity__c = selectedBookQuantity;

        insert cartItem;
    }
    @AuraEnabled
    public static void assignCartItemsToOrder(List<Id> cartItemsIds, Id orderId){

        List<Cart_Item__c> cartItemsToModification = [SELECT Id, Custom_Order__c FROM Cart_Item__c WHERE Id IN :cartItemsIds];

        for(Cart_Item__c cartItem : cartItemsToModification){
            cartItem.Custom_Order__c = orderId;
        }

        update cartItemsToModification;
    }

    @AuraEnabled
    public static void updateCartItemQuantity(Id cartItemId, Integer newQuantity){

        Cart_Item__c cartItemToModification = [SELECT Id, Quantity__c FROM Cart_Item__c WHERE Id =: cartItemId];

        cartItemToModification.Quantity__c = newQuantity;

        update cartItemToModification;
    }
}
