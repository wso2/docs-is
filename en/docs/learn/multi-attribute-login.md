#  Multi Attribute Login

WSO2 Identity Server lets you configure multiple attributes as the login identifier. While username is the default login identifier, users can have the option to enter a mobile number, email address or any attribute of their choice.

The following section explains how to configure WSO2 identity server for multi-attribute login.

## Configuring WSO2 IS for Multi Attribute Login

1.  Log in to the [WSO2 Identity Server Management Console](`https://<IS_HOST>:<PORT>/carbon`) using your 
    tenant credentials.

    !!! info
        - The **admin** is the default administrative user in WSO2 Identity Server.
        - If you use multiple tenant domains, you need to configure multi attribute login for each tenent.

2.  Click **Main** > **Identity Providers** > **Resident** and expand the **Account Management** section.

3.  Expand **Multi Attribute Login** and select **Enable Multi Attribute Login**.

4.  Add claim URIs for claims that users are allowed to use as login identifiers.

    ![adding-claims-for-multi-attribute-login](../assets/img/learn/multi-attribute-login/adding-claims-for-multi-attribute-login.png)

5. Click **Update**

### Add Regular Expressions for Allowed Claims

Once you have configured WSO2 Identity Server for multi-attribute login, you need to provide regular expressions 
for the allowed claims.

Some claims have regex defined by default. If you need to define regex for a claim, follow the steps below.

1.  Open the WSO2 Identity Server management console. 
2.  In the **Main** menu, under **Claims**, click **List**.
3.  Select the claim you want to provide the regular expression for and click **Edit**.
4.  Enter the regex pattern under the **Regular Expression** field.
5.  Click **Update** to save the changes.

![adding-regex-pattern-to-claims](../assets/img/learn/multi-attribute-login/adding-regex-pattern-to-claim.png)

Here are a few examples of regex patterns.

| Claim URI                           | Example Regex pattern    |
|-------------------------------------|-----------------------------------------------------------------|
| http://wso2.org/claims/emailaddress | ^([a-zA-Z0–9_\.\-])+\@(([a-zA-Z0–9\-])+\.)+([a-zA-Z0–9]{2,4})+$ |
| http://wso2.org/claims/mobile       | ^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$ |
| http://wso2.org/claims/username     | ^[a-zA-Z0–9._-]{3,}$                                            |

You have now successfully set up WSO2 Identity Server to allow multi-attribute login.

## Using Multi Attribute login
When multi-attribute login is configured in WSO2 IS, application users can use any of the configured attributes to login. 

### Example: Allow users to use mobile number as a login identifier

1.  Configure Multi Attribute login for the claim `http://wso2.org/claims/mobile`.
2.  Go to the My Account URL: (`https://localhost:9443/myaccount`).
3.  Enter mobile number as the login identifier and click **Continue**.

    ![adding-regex-pattern-to-claims](../assets/img/learn/multi-attribute-login/login-with-mobile-number.png)

### Supported flows
This feature is supported by the following flows.

1.  Identifier first authenticator
2.  Basic Authenticator
3.  Request path authenticator
4.  Authentication REST APIs
5.  Oauth Password grant
6.  Password recovery flow

!!! Tip
    - **What happens if two users use the same value for a claim?** 

        Multi attribute login will not work for these users. Retaining uniqueness for claim values avoids this conflict.

    - **Using email address as login attribute for super tenant users**

        Super tenant users need to append the tenant domain 
        to the email address (Ex: `john@wso2.com@caron.super`) when logging into a SaaS application.

!!! info "Related Topics"
    See the [Configuring Uniqueness of Claims](../../learn/configuring-uniqueness-of-claims) topic for more information.
