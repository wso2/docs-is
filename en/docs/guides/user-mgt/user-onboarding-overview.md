# User Onboarding

WSO2 Identity Server supports multiple ways of on boarding users to the server.

* **Connecting a Userstore** : If you already have a user store in your current system, you can easily connect that
 user store to the identity server and allow users residing in that user store to be able to use the Identity Server
. Supported userstore types include 
    * [LDAP](connect-ldap-userstore.md) 
    * [Active Directory](connect-active-directory-userstore.md)
    * [Database](connect-database-userstore.md)
    * [Custom](connect-custom-userstore.md)

* **[Importing user accounts](user-bulk-import.md)** : If you already have an exported list of details of the users, you can perform a
 bulk
 import of those user accounts.
 
* **[Adding users from the portal](user-add.md)** : If you want to add users one-by-one, you can use the admin portal to do
 that 

* **[Adding users using API](../../develop/rest-api-reference)** : Use the SCIM protocol based APIs to add the users. 

* **[Enable Self Sign Up](user-sign-up.md)** : Enable the ability to users to sign themselves up to the Identity Server   
 