trigger BeforeUpdateCustomOrderTrigger on Custom_Order__c (before update) {
    if (Trigger.isBefore) {
        for(Custom_Order__c updatedOrder : Trigger.New) {
            Custom_Order__c previousVersionOfOrder = Trigger.oldMap.get(updatedOrder.Id);
            if (updatedOrder.Status__c == 'Cancelled' && previousVersionOfOrder.Status__c != 'Cancelled') {
                List<Cart_Item__c> cartItems = [SELECT Custom_Order__c, Quantity__c, Book__r.Id FROM Cart_Item__c WHERE Custom_Order__c =: updatedOrder.Id];
                for(Cart_Item__c item : cartItems) {
                   Book__c book = [SELECT Id, Quantity__c FROM Book__c WHERE Id =: item.Book__r.Id];
                   book.Quantity__c += item.Quantity__c;
                   update book;
                }
            }
        } 
    }
}