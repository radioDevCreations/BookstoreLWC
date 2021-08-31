public with sharing class ordersController {
    @AuraEnabled(cacheable=true)
    public static List<Custom_Order__c> getAllOrders(){
        Id userId = UserInfo.getUserId();
        return [SELECT Id, Name, CreatedDate, Status__c, Summary_Price__c, Email__c, User__c, Street__c, City__c, Postal_Code__c, Province__c, Country__c
        FROM Custom_Order__c  
        WHERE User__c =: userId]; 
    }

    @AuraEnabled(cacheable=true)
    public static List<Custom_Order__c> getOrdersById(Id orderId){
        return [SELECT Id, Name, CreatedDate, Status__c, Summary_Price__c, Email__c, User__c, Street__c, City__c, Postal_Code__c, Province__c, Country__c
        FROM Custom_Order__c  
        WHERE Id =: orderId]; 
    }


    @AuraEnabled
    public static Id createOrder(String email, String street, String city, String postalCode, String province, String country, Decimal price){

        List<Cart_Item__c> cartItems = cartController.getCartItems();
        for(Cart_Item__c cartItem: cartItems){
            Book__c bookQuantity = [SELECT Id, Quantity__c FROM Book__c WHERE Id =: cartItem.Book__r.Id];
            bookQuantity.Quantity__c -= cartItem.Quantity__c;
            update bookQuantity;
        }

        Custom_Order__c order = new Custom_Order__c();
        order.User__c = UserInfo.getUserId();
        order.Summary_Price__c = price;
        order.Email__c = email;
        order.Street__c = street;
        order.City__c = city;
        order.Postal_Code__c = postalCode;
        order.Province__c = province;
        order.Country__c = country;

        insert order;
        return order.Id;
    }
}
