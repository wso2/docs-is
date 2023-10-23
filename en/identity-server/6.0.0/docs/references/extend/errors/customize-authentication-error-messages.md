# Customize Authentication Error Messages

WSO2 Identity Server has standard error messages for different authentication errors that are encountered. See [Error Codes and
Descriptions]({{base_path}}/references/extend/errors/error-codes-and-descriptions/) for more information on the standard error codes and descriptions of
those errors. There are three types of custom errors handled here:

-   Invalid credentials
-   Invalid user
-   Account lock

!!! note
    Account lock errors are returned only when account locking is enabled on the server. Refer [User Account Locking]({{base_path}}/guides/identity-lifecycles/lock-account/) document to enable account locking.
    

Add the following properties to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder to enable the authenticator to be able to customize error messages.

``` toml
[authentication.authenticator.basic.parameters]
showAuthFailureReason = true
```

The following query parameters are sent to the web application from authentication endpoint.

-   errorCode
-   failedUsername
-   remainingAttempts

The error messages can be customized based on these query parameters in the jsp files as in  `authenticationendpoint/login.jsp`.

If the `showAuthFailureReason` property is enabled, the user will be redirected to the `retry.do` page with the above mentioned query parameters during the authentication flow.

If you want to show the error message on the login page without redirecting the user to any other page, the following properties can be used to show the authentication error message on the login page.

```toml
[authentication.authenticator.basic.parameters]
showAuthFailureReason = true
showAuthFailureReasonOnLoginPage = true
```


