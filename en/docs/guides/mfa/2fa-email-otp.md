# Configure email OTP for 2-Factor authentication

This page guides you through configuring [two-factor authentication]({{base_path}}/references/concepts/authentication/intro-authentication#two-factor-authentication) for a web application using email OTP as the second factor.

## Set up email OTP

Email OTP is not set up on the Identity Server by default. If required, you can set up the email OTP by configuring the email OTP adaptor and the email OTP provider.

This guide section helps you set up email OTP on the identity server.

Setting up email OTP required the following two configurations to be made on the Identity Server:

- [**Configure email sending module**](../../../deploy/configure-email-sending)
- **Configure the email OTP provider**
    
    You can use any of the following methods to configure the email OTP provider:

    - Identity Server as the email OTP provider

        ??? "Configure Identity Server as the email OTP provider"
            To configure the email OTP provider on the IS:

            1. Add the following codes to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder:
                1. To avoid syntax errors.
                    ```toml
                    [server]
                    disable_addressing = true
                    ```
                2. To configure Email OTP:
                    ```toml
                    [authentication.authenticator.email_otp]
                    name ="EmailOTP"
                    enable=true

                    [authentication.authenticator.email_otp.parameters]
                    EMAILOTPAuthenticationEndpointURL = "https://localhost:9443/authenticationendpoint/email_otp.do"
                    EmailOTPAuthenticationEndpointErrorPage = "https://localhost:9443/authenticationendpoint/email_otp_error.do"
                    EmailAddressRequestPage = "https://localhost:9443/authenticationendpoint/email_capture.do"
                    usecase = "local"
                    secondaryUserstore = "primary"
                    EMAILOTPMandatory = false
                    sendOTPToFederatedEmailAttribute = false
                    federatedEmailAttributeKey = "email"
                    EmailOTPEnableByUserClaim = true
                    CaptureAndUpdateEmailAddress = true
                    showEmailAddressInUI = true
                    ```

            4. Save the configurations.

    - Gmail as the email OTP provider

        ??? "Configure Gmail as the email OTP provider"
            **Create a Gmail project**

            1. Log in to your Gmail account and go to [Google's developer console](https://console.developers.google.com).
            2. On the developer console, search for **Gmail API** and select **Gmail API** from the search result.
            3. Click **Enable**. Once enabled, you will be redirected to the developer console's API/Service details page.
            4. Go to the project list and click a **NEW PROJECT** to create a new project.
                ![project list]({{base_path}}/assets/img/guides/project-selection-gmail.png)

            5. Enter a **Project name** and click **Create**.
            6. Go to **Credentials**, click **+ CREATE CREDENTIALS**, and select **OAuth client ID**.
            7. Select **Web Application** as the application type
            8. Add `https://localhost:9443/commonauth` as the **Authorized redirect URIs** and click **CREATE**.
            
            On successful creation, the application's **Client ID** and the **Client Secret** will be displayed.

            !!! info
                Note down the application's client ID and the client secret you will need in the next section.

            ![oauth client id and secret]({{base_path}}/assets/img/guides/gmail-otp-client-details.png)
            
            

            **Obtain the access token**

            1. Add **SAML Tracer** extension to your browser and open it.
                - [SAML Tracer for Chrome](https://chrome.google.com/webstore/detail/saml-tracer/mpdajninpobndbfcldcmbpnnbhibjmch?hl=en)
                - [SAML Tracer for Firefox](https://addons.mozilla.org/en-US/firefox/addon/saml-tracer/)
            2. Access the following URL using a web browser. Replace the `<CLIENT_ID>` with the client ID of your Gmail application.
            ```http
            https://accounts.google.com/o/oauth2/auth?redirect_uri=https%3A%2F%2Flocalhost%3A9443%2Fcommonauth&response_type=code&client_id=<CLIENT_ID>&scope=http%3A%2F%2Fmail.google.com&approval_prompt=force&access_type=offline
            ```
            3. Select the Gmail account you wish to proceed with, and click **Continue**.
            4. Click **Continue** on the consent page while the SAML tracer application is running.
            5. Get the authorization code from SAML tracer.
                ![SAML tracer]({{base_path}}/assets/img/guides/saml-tracer-auth-code.png)
            6. Use the following `cURL` command to obtain the access token and the refresh token. Replace the `<CLIENT-ID>`, `<CLIENT_SECRET>` and the `<AUTHORIZATION_CODE>` with values obtained in earlier steps. 
                ```curl
                curl -v -X POST --basic -u <CLIENT-ID>:<CLIENT_SECRET> -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=authorization_code&code=<AUTHORIZATION_CODE>&redirect_uri=https://localhost:9443/commonauth" https://www.googleapis.com/oauth2/v3/token
                ```
            7. Take note of the access token and the refresh token.

            **Update IS configurations**

            1. Add the following codes to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder, and update the `<gmail_client_id>`, `<gmail_client_secret>`, `<refresh_token>` and `<mail_address>`.
                ```toml
                [authentication.authenticator.email_otp]
                name = "EmailOTP"
                enable= true

                [authentication.authenticator.email_otp.parameters]
                GmailClientId = "<gmail_client_id>"
                GmailClientSecret = "<gmail_client_secret>"
                GmailRefreshToken = "<refresh_token>"
                GmailEmailEndpoint = "https://www.googleapis.com/gmail/v1/users/<mail_address>/messages/send"
                accessTokenRequiredAPIs = "Gmail"
                GmailAuthTokenType = "Bearer"
                GmailTokenEndpoint = "https://www.googleapis.com/oauth2/v3/token"
                ```

            2. Save the configurations and restart the server.

- **Add the email template**

    After configuring the email OTP provider of your choice, you need to add an email template for email OTP.

    To configure the email template:

    1. Add the following email template to the `email-admin-config.xml` file found in the `<IS_HOME>/repository/conf/email`.
        ```xml
        <configuration type="EmailOTP" display="EmailOTP" locale="en_US" emailContentType="text/html">
            <targetEpr></targetEpr>
            <subject>WSO2 IS Email OTP</subject>
            <body>
                Hi,
                Please use this one-time password {OTPCode} to sign in to your application.
            </body>
            <footer>
                Best Regards,
                WSO2 Identity Server Team
                http://www.wso2.com
            </footer>
            <redirectPath></redirectPath>
        </configuration>
        ```

    2. Save the configurations and restart the server.

## Enable email OTP for an SP

To enable email OTP for MFA, you need to configure the email OTP as an authenticator and add it to the authentication flow of the application.

### Prerequisites
- You need to [set up the sample]({{base_path}}/guides/adaptive-auth/adaptive-auth-overview/#set-up-the-sample) application
- You need to [configure local claims]({{base_path}}/guides/applications/configure-claims-for-sp/#use-local-claim-dialect) for the application:
    1. On the management console, go to the application you created and click **Edit**
    2. Expand **Claim configuration**.
    3. Select `http://wso2.org/claims/emailaddress` as the **Subject Claim URI**.
    4. Click **Update** to save the configurations.
- You need to [update the User Profile]({{base_path}}/guides/identity-lifecycles/update-profile) of the users with an email address to which the user will receive the OTP.
- You need to [register an Identity Provider]({{base_path}}/guides/identity-federation/add-idp/) named `emailOTP`.

### Configure the Email OTP authenticator

To configure the Email OTP authenticator:

1. On the management console, go to **Identity Providers > List**.
2. Click on **Edit** corresponding to the `emailOTP` identity provider.
3. Expand **Federated Authenticators > Email OTP Configuration**.
4. Enable the Email OTP authenticator by selecting the **Enable** option provided.

    ![enable email otp configuration]({{base_path}}/assets/img/guides/enable-email-otp-config.png)

    !!! info
        - If you have configured an external email OTP provider, enter the provider's name in the **Email API**. Example: `Gmail` or `SendGrid`.
        - If you have used IS as the email OTP provider, you can leave this field blank.

5. Click **Update** to save the configurations.

### Configure email OTP as the second factor

To configure email OTP as the second authentication factor:

1. On the management console, go to **Main** > **Identity** > **Service Providers** > **List**.

2. Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3. Expand the **Local and Outbound Authentication Configuration** section and click **Advanced Configuration**.

4. You will be redirected to **Advanced Configuration**.

5. Click **+ Add Authentication Step** twice to add two authentication steps.

6. Select the following authentication methods from the relevant dropdowns and click **+ Add Authenticator**.

    | Authentication step   | Local Authenticator   | Federated Authenticator   |
    |-----------------------|-----------------------|----------------------|
    | First step    | `basic`   | N/A   |
    | Second step   | N/A   | `emailOTP`  |

7. Click **Update** to save the configurations.

## Try it out

1. Access the following sample Pickup Dispatch application URL: `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com`

2. Click **Login** and enter admin's credentials.

3. You will now be prompted to enter an email OTP code. The email OTP will be sent to the email address configured on the user's profile.

    ![email otp]({{base_path}}/assets/img/guides/email-otp.png)

4. Enter the email OTP received, and click **Continue**.

You will now be logged into the application successfully.
