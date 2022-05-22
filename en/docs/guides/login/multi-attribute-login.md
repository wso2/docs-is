# Multi-attribute login

WSO2 Identity Server can be configured to use multiple attributes as the login identifier. This is useful when you need to allow the users to login with their mobile number, email address, or any other preferred attribute without restricting to the username.

By default, WSO2 Identity server uses the username as the login identifier. The following section explains how to configure WSO2 identity server for multi attribute authentication.

## Enable multi-attribute Login

1.  Log in to the [management console](`https://<IS_HOST>:<PORT>/carbon`) with your tenant credentials.

    !!! info
        -   The default administrative in WSO2 Identity Server is `admin`.
        -   If you use multiple tenant domains, you need to configure the multi attribute login tenant-wise.

2.  Click **Main** > **Identity Providers** > **Resident** and expand the **Account Management** section.

3.  Expand **Multi Attribute Login** and select **Enable Multi Attribute Login**.

4.  Add claim URIs in the given text box to enable those claims for login.

    ![adding-claims-for-multi-attribute-login](../../assets/img/guides/adding-claims-for-multi-attribute-login.png)

5.  Add a regular expression for **Allowed Claims**.

    !!! Info
        Once you have configured WSO2 IS for multi-attribute login, you need to provide a regular expression for the allowed claims. Some claims have a default regex. If they don't, you need to provide it.

    1. Open the WSO2 Identity Server Management Console. 
    2. In the **Main** menu, click **List** under **Claims**.
    3. Select the claim you want to provide the regular expression for and click **Edit**.
    4. Enter the regex pattern under the **Regular Expression** field.
    5. Click **Update** to save the changes.

    ![adding-regex-pattern-to-claims](../../assets/img/guides/adding-regex-pattern-to-claim.png)

    Here are a few examples for regex patterns.

    | Claim URI                           | Example Regex pattern    |
    |-------------------------------------|-----------------------------------------------------------------|
    | http://wso2.org/claims/emailaddress | ^([a-zA-Z0–9_\.\-])+\@(([a-zA-Z0–9\-])+\.)+([a-zA-Z0–9]{2,4})+$ |
    | http://wso2.org/claims/mobile       | ^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$ |
    | http://wso2.org/claims/username     | ^[a-zA-Z0–9._-]{3,}$                                            |

You have now successfully set up WSO2 Identity Server to enable multi-attribute login.

## Try it

After configuring multi-attribute login in WSO2 IS, the users can use any of the configured attributes to login.

For example, let's allow users to use the mobile number as the login identifier.

1. Configure multi-attribute login for the `http://wso2.org/claims/mobile` claim.
2. Go to the My Account URL: (`https://localhost:9443/myaccount`).
3. Enter mobile number as the login identifier and click **Continue**.

    ![adding-regex-pattern-to-claims](../../assets/img/guides/login-with-mobile-number.png)

## Supported flows

You can use multi-attribute login using any of following flows:

1. Identifier-first authentication
2. Basic Authentication
3. Request-path authentication
4. Authentication REST APIs
5. Oauth Password grant
6. Password recovery flow

!!! Note
    -   If two users use the same value for the same claim, the multi-attribute login feature
    does not support those claims for those users. Retaining the uniqueness of claim values avoids this conflict.
    -   Super tenant users who are using the email address as a login attribute need to append the tenant domain to the email address (Ex: `john@wso2.com@caron.super`) when they log in to a SaaS application.

!!! info "Related Topics"
    See the [Configuring Uniqueness of Claims](../../dialects/configure-unique-claims) topic for more information.
