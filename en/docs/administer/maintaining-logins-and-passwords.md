# Maintaining Logins and Passwords

### Changing the super admin password

To change the default admin password, log in to the management console
with admin/admin credentials and use the **Change my password** option.

### Unlocking the admin user

To unlock an admin user who is locked due to an exceeding number of
login failures, restart the server using the `-DunlockAdmin` system property

### Recovering a password

Use `         <IS_HOME>/bin/chpasswd.sh        ` script.

### Login with an email address

You can configure WSO2 Identity Server to authenticate users using an email address instead of a username. Refer [Using Email Address as the Username](../../learn/using-email-address-as-the-username) section for configurations steps.


