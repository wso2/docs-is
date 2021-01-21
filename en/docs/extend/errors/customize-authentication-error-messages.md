# Customize Authentication Error Messages

WSO2 Identity Server has standard error messages for different authentication errors that are encountered. See [Error Codes and
Descriptions](../../../extend/errors/error-codes-and-descriptions) or more information on the standard error codes and descriptions of
those errors. There are three types of custom errors handled here:

-   Invalid credentials
-   Invalid User
-   Account Lock

!!! note
    Account lock errors are returned only when account locking is enabled on the server. Refer [User Account Locking](../../../guides/identity-lifecycles/lock-account/) document to enable account locking.
    

Add the following properties to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder and enable the authenticator to be able to customize error messages.

``` toml
[authentication.authenticator.basic.parameters]
showAuthFailureReason = true
```

The following query parameters are sent to the web application from authentication endpoint.

-   errorCode
-   failedUsername
-   remainingAttempts

The error messages can be customized based on these query parameters in the jsp files as in  `authenticationendpoint/login.jsp`.
