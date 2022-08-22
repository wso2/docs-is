# Configuring Multi-factor Authentication with Username and Password

This scenario involves obtaining the username first and validating that
before authenticating the user using the password.

## Scenario

Consider a scenario where you want to log in users' to your application by validating the username and authenticating the user using the password that the user enters.

## Prerequisites

- You need to [set up the sample]({{base_path}}/guides/adaptive-auth/adaptive-auth-overview/#set-up-the-sample) application.

## Configure username validation

To configure MFA using username and password:

1. On the management console, go to **Main** > **Identity** > **Service Providers** > **List**.

2. Click **Edit** on the service provider you have created.

3. Expand the **Local and Outbound Authentication Configuration** section and click **Advanced Configuration**.

    !!! info
        see [Configuring Local and Outbound Authentication for a Service Provider]({{base_path}}/learn/configuring-local-and-outbound-authentication-for-a-service-provider) for more information.

6. Click **Add Authentication Step** twice to add two authentication steps for the application.

7. Select the following authenticators from the **Local Authenticators** dropdown.

    | Authentication step   | Local authenticator |
    |---------------------|-----------------------|
    | First step    | `Identifier First`  |
    | Second step   | `basic`             |

    !!! note
        The `Identifier First` is not an authenticator, so having only the identifier in the authentication flow will fail the authentication. If there are no authenticators configured other than identifier, an error occurs when updating the service provider.

8. Click **Update** to save your configurations.

## Configure the server

By default, the username is not validated, and WSO2 Identity Server does not check whether it exists in the user store.

To enable username validation for applications:
1. Add the following code segment to `<IS_HOME>/repository/conf/deployment.toml` file to start validating the username.

``` toml
[authentication.authenticator.user_identifier]
name = "IdentifierExecutor"
enable = true

[authentication.authenticator.user_identifier.parameters]
validate_username = true
```

2. Restart the Identity Server.

## Try it out

1. Access the following sample PickUp application URL: `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com`
2. Click **Login**, and enter admin's username.  
3. On the next screen, enter admin's password and click **Continue**.
4. You will be successfully logged in to the application. Logout of the application.
5. Click **Login** again, and enter a username that is not registered on the IS.
6. Click **Continue**.

    You will get an error message a user with the username you entered is not registered on the IS.

    ![username validation error]({{base_path}}/assets/img/guides/mfa-username-validation-error.png)
