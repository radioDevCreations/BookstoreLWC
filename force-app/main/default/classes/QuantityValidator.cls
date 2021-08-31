public with sharing class QuantityValidator {
    @AuraEnabled
    public static Boolean validateQuantity(){
        List<Cart_Item__c> cartItems = cartController.getCartItems();
        if(cartItems.size() >= 0){
            for(Cart_Item__c cartItem: cartItems){
                Book__c bookQuantity = [SELECT Id, Quantity__c FROM Book__c WHERE Id =: cartItem.Book__r.Id];
                if(cartItem.Quantity__c <= bookQuantity.Quantity__c){
                    return true;
                } else {
                    return false;
                }
            }
        }
        return false;
    }
}