public class CustomOrderTriggerHandler {
    
    public static void sendConfirmationEmail(List<Custom_Order__c> newRecordList ) {

        List<Messaging.SingleEmailMessage> emailList = new List<Messaging.SingleEmailMessage>();
        
        for(Custom_Order__c customOrder: newRecordList){

            List<Cart_Item__c> selectedCartItems = [SELECT Id, Book__r.Id, Book__r.Name, Book_Price__c, Total_Price__c, Book__r.Category__r.Name, Book__r.ISBN__c, User__c, Custom_Order__c, Quantity__c, Book__r.Author__r.Name
            FROM Cart_Item__c
            WHERE Custom_Order__c =: customOrder.Id];
        
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();

            mail.setSubject('Zamówienie w Bookstore');
            List<String> toAddress = new List<String>();
            toAddress.add(customOrder.Email__c);
            mail.setToAddresses( toAddress );
            mail.setSenderDisplayName('Bookstore');
            
            // EMAIL CONTENT
            String CONTENT_TITLE = 'bookstore';
            String CONTENT_GREETING = 'Przejęliśmy do realizacji Twoje zamówienie o numerze ' + customOrder.Name + '. Dziękujemy za wybór naszej księgarni. Poniżej znajdziesz zamówieone przez Ciebie produkty. W razie pytań prosimy o kontakt na adres';
            String CONTENT_EMAIL = 'radekrozmus@gmail.com';
            String CONTENT_FOOTER = 'Wiadomość została wygenerowana automatycznie. Nie odpowiadaj na ten mail.';

            //EMAIL BODY START
            String emailBodyStart = '<div><div style="font-size: 3em; color: #0174d3; text-transform: capitalize; text-align: center;">' + CONTENT_TITLE + '</div><br/>' + '<div style="text-align: justify;">' + CONTENT_GREETING + '</div>' + '<br/><div style="text-align: center; font-size: 1.2em">' + CONTENT_EMAIL + '</div><br/>';

            //EMAIL BODY MIDDLE
            String emailBodyMiddle = '<div style="padding: 10px;">';
            for(Cart_Item__c item: selectedCartItems)
            {
                String bookDiv = '<div style="border-bottom: 1px solid #eee;"><div style="font-size: 1.2em; line-height: 1.4;">' + item.Book__r.Name + '</div>';
                bookDiv += '<div style="line-height: 1.4;">' + item.Book__r.Author__r.Name + '</div>';
                bookDiv += '<div style="line-height: 1.4;">' + item.Book__r.Category__r.Name + '</div>';
                bookDiv += '<div style="line-height: 1.4;">Quantity: ' + item.Quantity__c + '</div>';
                bookDiv += '<div style="line-height: 1.4;">' + item.Total_Price__c + '&euro;</div></div>';
                emailBodyMiddle += bookDiv;
            }
            emailBodyMiddle += '<div style="font-size: 1.4em; padding-top: 4px; font-weight: 600; text-transform: uppercase;">Total: ' + customOrder.Summary_Price__c + '&euro;</div></div>';

            // EMAIL BODY END
            String emailBodyEnd = '<br/><div style="text-align: center;">' + CONTENT_FOOTER + '</div></div>';

            //CONCATENATION
            String emailBody = emailBodyStart + emailBodyMiddle + emailBodyEnd;
            mail.setHtmlBody(emailBody);
            emailList.add(mail);
        }
        
        try{
            List<Messaging.SendEmailResult> results =  Messaging.sendEmail(emailList, false); 
        }catch(System.Exception exc){
            System.debug('MAILING ERROR' + exc);
        }
    }
}