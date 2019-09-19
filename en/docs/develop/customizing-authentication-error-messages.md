# Customizing Authentication Error Messages

WSO2 Identity Server has standard error messages for different
authentication errors that are encountered. See [Error Codes and
Descriptions](../../develop/error-codes-and-descriptions)
for more information on the standard error codes and descriptions of
those errors. There are three types of custom errors handled here:

-   Invalid credentials
-   Invalid User
-   Account Lock

!!! note
    Account Lock errors are returned only when account locking is
    enabled on the server. Refer [User Account Locking and Account
    Disabling](../../learn/user-account-locking-and-account-disabling)
    document to enable account locking.
    

Do the following to customize these error messages.

Enable the following parameter in the
`         <IS_HOME>/repository/conf/identity/application-authentication.xml        `
file if you need customized error messages.

``` xml
<AuthenticatorConfig name="BasicAuthenticator" enabled="true"> 
    <Parameter name="showAuthFailureReason">true</Parameter>
</AuthenticatorConfig>
```

The following query parameters are sent to the web application from authentication endpoint.

-   errorCode
-   failedUsername
-   remainingAttempts

The error messages can be customized based on these query parameters in the jsp files as in  `         authenticationendpoint/login.jsp        ` 