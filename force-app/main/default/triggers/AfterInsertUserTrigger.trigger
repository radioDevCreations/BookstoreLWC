trigger AfterInsertUserTrigger on User (after insert) {
    if(Trigger.isAfter && Trigger.isInsert){
        UserTriggerHandler.sendConfirmationEmail(Trigger.New);
    }
}