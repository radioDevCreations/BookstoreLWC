public with sharing class bookstoreManagement {
    @AuraEnabled(cacheable=true)
    public static Map<String, String> getUserName(){
        String firstName = UserInfo.getFirstName();
        String lastName = UserInfo.getLastName();
        
        Map<String, String> usr = new Map<String, String>{'firstName' => firstName, 'lastName' => lastName};
        return usr;
    }
}