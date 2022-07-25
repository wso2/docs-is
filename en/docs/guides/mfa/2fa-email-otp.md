# Configure email OTP for 2-Factor authentication

This page guides you through configuring [two-factor authentication]({{base_path}}/references/concepts/authentication/intro-authentication#two-factor-authentication) for a web application using email OTP as the second factor.

## Set up email OTP

Email OTP is not set up on the Identity Server by default. If required, you can set up the email OTP by configuring the email OTP adaptor and the email OTP provider.

This guide section helps you set up email OTP on the identity server.

### Configure the email adapter

{!./includes/configure-email-sending.md!}

### Configure the email OTP provider

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

2. Add the following email template to the `email-admin-config.xml` file found in the `<IS_HOME>/repository/conf/email`.

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

4. Save the configurations and restart the server.

## Enable email OTP for a SP

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

### Configure the email OTP authenticator

To configure the email OTP authenticator:

1. On the management console, go to **Identity Providers > List**.
2. Click on **Edit** corresponding to the `emailOTP` identity provider.
3. Expand **Federated Authenticators > Email OTP Configuration**.
4. Enable the email OTP authenticator by selecting the **Enable** option provided.

    ![enable email otp configuration]({{base_path}}/assets/img/guides/enable-email-otp-config.png)

    <!--!!! info
        other fields explained -->

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