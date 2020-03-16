# Configure TOTP for 2-Factor Authentication

This page guides you through configuring [two-factor authentication](../../../concepts/authentication/intro-authentication#two-factor-authentication) for a web application using [TOTP - Time Based One Time Password](insertlink) as the second factor. 

!!! tip
    For more information, see the [TOTP specification](https://tools.ietf.org/html/rfc6238).

----

{!fragments/register-a-service-provider.md!}

4. Expand **Local and Outbound Authentication Configuration**.

5. Click the **Advanced Configuration** radio button. 

6. Add the following authentication steps. 
    - **Step 1**
        1. Click **Add Authentication Step**.

        2. Select `basic` under **Local Authenticators** and click **Add Authenticator** to add the basic authentication as the first step.

            Adding basic authentication as a first step ensures that the first step of authentication will be done using the user's credentials that are configured with the WSO2 Identity Server.

    - **Step 2**
        1. Click **Add Authentication Step**.

        2. Select `totp` under **Local Authenticators** and click **Add Authenticator** to add TOTP authentication as the second step.

            Adding TOTP as a second step adds another layer of authentication and security.
    
         <img name='totp-authentication-steps' src='../../../assets/img/guides/totp-authentication-steps.png' class='img-zoomable'/>

7. Click **Update** to save the changes.


You have successfully configured FIDO as the second factor of authentication. To test this out, see the [user portal help](insertlink).
You can use an application such as the [Google Authenticator Mobile Application](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en) to generate one time passwords (tokens).

----

## Disable TOTP authenticator

The  TOTP authenticator is enabled by default.

You can disable the  TOTP authenticator by adding the following configuration to the `deployment.toml` file in the
`<IS_HOME>/repository/conf` folder.

```toml
[authentication.authenticator.totp]
enable=false
```

----

## Send emails with TOTP

Optionally, you can set up TOTP so that users recieve an email consisting of the TOTP code during the authentication flow. 

1. [Configure email sending](../../../fragments/configure-email-sending) in WSO2 Identity Server. 

2. Click **Email Templates > Add** on the [management console](insertlink). 

3. Enter "TOTP" as the **Template Type Display Name** and click **Add**.

4. Enter the following email template details. 

    - **Template Type** : TOTP
    - **Email Template Locale**: English (United States)
    - **Content Type**: html
    - **Email Template Subject**:  Time-Based One Time Password
    - **Email Email Body**: 

        ```html
        Hi {{ user.claim.givenname}},
        Please use the token {{token}} as the password for your login.
        ```

    - **Email Footer**: 

        ```html
        Best Regards,
        Identity Server Team
        http://www.wso2.com
        ```

        !!! tip
            Note that you can change the template details accordingly however, you must include `{{token}}` in the email body as a placeholder for the TOTP token generated during the authentication flow.
