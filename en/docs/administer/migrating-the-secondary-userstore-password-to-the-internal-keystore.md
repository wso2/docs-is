# Migrating the Secondary Userstore Password to the Internal Keystore 

WSO2 Identity Server by default has one keystore. To mitigate security incidents it is advisable to maintain multiple keystores. For example, if one keystores gets compromised, you can continue with the other keystores that are intact. Mainly, you may maintain three keystores:

-	A keystore to store tokens, which is mentioned in the carbon.xml file.
-	An internal keystore to store internal critical data such as encrypted passwords. 
-	A keystore for Tomcat SSL connection, which is the secondary keystore of the WSO2 Identity Server.

Ideally, the internal keystore should be used for encrypting internal critical data. However, currently, the secondary userstore passwords are encrypted using the primary keystore, which is also used to sign and encrypt tokens. Thus, it is preferable to move the secondary userstore password encryption functionality from the primary keystore to the internal keystore.

![](../../assets/img/administer/keystore-migration.png)






