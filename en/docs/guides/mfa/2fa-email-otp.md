# Configure Email OTP for 2-Factor Authentication

This page guides you through configuring [two-factor authentication](../../../references/concepts/authentication/intro-authentication#two-factor-authentication) for a web application using email OTP as the second factor. 

----

## Configure the email adapter to send emails

{!fragments/configure-email-sending.md!}

## Configure the email OTP provider

2. Add the following property to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder to avoid syntax errors.

    ```toml
    [server]
    disable_addressing = true
    ```

3. Add the following email template to the `email-admin-config.xml` file found in the `<IS_HOME>/repository/conf/email` folder. 

    ```xml
    <configuration type="EmailOTP" display="EmailOTP" locale="en_US" emailContentType="text/html">
        <targetEpr></targetEpr>
        <subject>WSO2 IS Email OTP</subject>
        <body>
            Hi,
            Please use this one time password {OTPCode} to sign-in to your application.
        </body>
        <footer>
            Best Regards,
            WSO2 Identity Server Team
            http://www.wso2.com
        </footer>
        <redirectPath></redirectPath>
    </configuration>
    ```

4. Add the following configurations to the `deployment.toml` file to configure Email OTP. 

    ```toml
    [authentication.authenticator.email_otp]
    name ="EmailOTP"
    enable=true

    [authentication.authenticator.email_otp.parameters]
    EMAILOTPAuthenticationEndpointURL = "https://localhost:9443/emailotpauthenticationendpoint/emailotp.jsp"
    EmailOTPAuthenticationEndpointErrorPage = "https://localhost:9443/emailotpauthenticationendpoint/emailotpError.jsp"
    EmailAddressRequestPage = "https://localhost:9443/emailotpauthenticationendpoint/emailAddress.jsp"
    usecase = "local"
    secondaryUserstore = "primary"
    EMAILOTPMandatory = false
    sendOTPToFederatedEmailAttribute = false
    federatedEmailAttributeKey = "email"
    EmailOTPEnableByUserClaim = true
    CaptureAndUpdateEmailAddress = true
    showEmailAddressInUI = true
    tokenExpirationTime = 300000
    ```
    <!--!!! info
        For information on each of these configurations, see [Email OTP Configurations](../email-otp-config-advanced)-->

2. Restart the server once configurations are in place. 

----

{!fragments/register-an-identity-provider.md!}


4. Expand **EMAILOTP Authenticator Configuration** under **Federated Authenticators**.

5. Select the **Enable** and **Default** check boxes(If you are using Gmail or Sendgrid as the email OTP provider, provide values for Email API and Email fields as well).

6. Click **Register**.

----

## Register a service provider

{!fragments/register-a-service-provider.md!}

## Configure the service provider

You need to register the application as a service provider in WSO2 Identity Server.

### Claims

Configure claims for the service provider:

1. Expand **Claim configuration**.
 
2. Select `http://wso2.org/claims/emailaddress` as the **Subject Claim URI**.

### Authentication steps

Configure the multiple factor authentication steps for the service provider:

1. Expand **Local and Outbound Authentication Configuration**.

2. Click the **Advanced Configuration** radio button. 

3. Add the following authentication steps. 
    - **Step 1**
        1. Click **Add Authentication Step**.

        2. Select `basic` under **Local Authenticators** and click **Add Authenticator** to add the basic authentication as the first step.

            Adding basic authentication as a first step ensures that the first step of authentication will be done using the user's credentials that are configured with the WSO2 Identity Server.

    - **Step 2**
        1. Click **Add Authentication Step**.

        2. Select `emailotp` under **Federated Authenticators** and click **Add Authenticator** to add EMAIL OTP authentication as the second step.

            Adding EMAIL OTP as a second step adds another layer of authentication and security.
    
        <img name='sms-otp-authentication-steps' src='../../../assets/img/guides/sms-otp-authentication-steps.png' class='img-zoomable'/>

4. Click **Update** to save the changes.

----

## Add/update a user's email address

1. Click **Main** > **Identity** > **Users and Roles**.
 
2. Click **List** > **Users** to view existing users.

3. Click **User Profile** of the user you want to edit and update the email address.

----

## Allow users to disable Email OTP

1. Click **Main** > **Identity** > **Claims** > **Add**.

2. Click **Add Local Claim**.

3. Enter the following values.

    - **Claim URI**: http://wso2.org/claims/identity/emailotp_disabled
    - **Display Name** : DisableEmailOTP
    - **Description:** DisableEmailOTP
    - **Mapped Attribute (s)**: title
    - **Supported by Default**: checked

    ![disable-emailotp-claim](../../assets/img/guides/disable-emailotp-claim.png)

---

## Try it out

1. Log in to the configured service provider.

2. You will be redirected to the login page of WSO2 Identity Server. Enter user's credentials.

3. Next, you will receive a token to your email account. Enter the code to authenticate.  

    ![sample-email-otp](../../assets/img/guides/sample-email-otp.png)

4. If the authentication is successful, you will be redirected to the home page of the service provider.

You have successfully configured and logged in using 2-factor authentication.


!!! info "Related topics"
    - [Concept: Two-Factor Authentication](../../../references/concepts/authentication/intro-authentication/#two-factor-authentication)
    - [Guide: Configure an Authentication Journey](../configure-authentication-journey)
