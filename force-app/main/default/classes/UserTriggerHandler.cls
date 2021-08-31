public with sharing class UserTriggerHandler {
    public static void sendConfirmationEmail(List<User> newRecordList ) {

        List<Messaging.SingleEmailMessage> emailList = new List<Messaging.SingleEmailMessage>();
        
        for(User newUser: newRecordList){
        
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();

            mail.setSubject('Utworzono nowe konto.');
            List<String> toAddress = new List<String>();
            toAddress.add(newUser.Email);
            mail.setToAddresses( toAddress );
            mail.setSenderDisplayName('Bookstore');
            
            // EMAIL CONTENT
            String CONTENT_TITLE = 'bookstore';
            String CONTENT_GREETING = 'Pomyślnie utworzono konto. ' + newUser.Name + ' witaj w rodzinie Bookstore!';
            String CONTENT_FOOTER = 'Wiadomość została wygenerowana automatycznie. Nie odpowiadaj na ten mail.';

            //EMAIL BODY START
            String emailBodyStart = '<div><div style="font-size: 3em; color: #0174d3; text-transform: capitalize; text-align: center;">' + CONTENT_TITLE + '</div><br/>' + '<div style="text-align: justify;">' + CONTENT_GREETING + '</div>' + '<br/><br/>';

            // EMAIL BODY END
            String emailBodyEnd = '<br/><div style="text-align: center;">' + CONTENT_FOOTER + '</div></div>';

            //CONCATENATION
            String emailBody = emailBodyStart + emailBodyEnd;
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
