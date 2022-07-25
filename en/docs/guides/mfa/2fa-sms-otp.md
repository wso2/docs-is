# Configure SMS OTP for two-factor authentication

This page guides you through configuring [two-factor authentication]({{base_path}}/references/concepts/authentication/intro-authentication#two-factor-authentication) for a web application using SMS OTP as the second factor.

## Set up SMS OTP provider
{!./includes/connect-sms-provider.md!}

## Enable SMS OTP for an SP

### Prerequisites
- You need to [set up the sample]({{base_path}}/guides/adaptive-auth/adaptive-auth-overview/#set-up-the-sample) application.
- You need to [configure local claims]({{base_path}}/guides/applications/configure-claims-for-sp/#use-local-claim-dialect) for the application:
    1. On the management console, go to the application you created and click **Edit**
    2. Expand **Claim configuration**.
    3. Select `http://wso2.org/claims/mobile` as the **Subject Claim URI**.
    4. Click **Update** to save the configurations.
- You need to [update the User Profile]({{base_path}}/guides/identity-lifecycles/update-profile) of the users with a mobile number to which the user will receive the OTP.
- You need to [register an Identity Provider]({{base_path}}/guides/identity-federation/add-idp/) named `smsOTP`.

### Configure the SMS OTP authenticator
To configure the email OTP authenticator:

1. On the management console, go to **Identity Providers > List**.
2. Click on **Edit** corresponding to the `smsOTP` identity provider.
3. Expand **Federated Authenticators > SMS OTP Configuration**.
4. Enable the email OTP authenticator by selecting the **Enable** option provided.
5. Enter **SMS URL**, **HTTP Method** (e.g., GET or POST), **HTTP Headers** and **HTTP Payload** information.

    !!! info
        - The above parameters depend on the service provider that you use.

        - If the text message and the phone number are passed as parameters in any field, include them as $ctx.num and $ctx.msg respectively.

        - Optionally, enter the HTTP response code the SMS service provider sends when the API is successfully called. Nexmo API and  Bulksms API send `200` as the code, while Clickatell and Plivo send 202. If this value is unknown, leave it blank, and the connector checks if the response is `200`, `201`, or `202`.

6. Click **Update** to save the configurations.

### Configure SMS OTP as the second factor

To configure SMS OTP as the second authentication factor:

1. On the management console, go to **Main** > **Identity** > **Service Providers** > **List**.

2. Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3. Expand the **Local and Outbound Authentication Configuration** section and click **Advanced Configuration**.

4. You will be redirected to **Advanced Configuration**.

5. Click **+ Add Authentication Step** twice to add two authentication steps.

6. Select the following authentication methods from the relevant dropdowns and click **+ Add Authenticator**.

    | Authentication step   | Local Authenticator   | Federated Authenticator   |
    |-----------------------|-----------------------|----------------------|
    | First step    | `basic`   | N/A   |
    | Second step   | N/A   | `smsOTP`  |

7. Click **Update** to save the configurations.

## Try it out

1. Access the following sample Pickup Dispatch application URL: `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com`

2. Click **Login** and enter admin's credentials.

3. You will now be prompted to enter an SMS OTP code. The SMS OTP will be sent to the mobile number configured on the user's profile.

    ![email otp]({{base_path}}/assets/img/guides/email-otp.png)

4. Enter the SMS OTP received and click **Continue**.

You will now be logged into the application successfully.

## Additional configurations

### Allow users to disable SMS OTP

To allow users to disable SMS OTP:

1. On the management console, go to **Claims > List**and select `http://wso2.org/claims`.
2. Click on **Edit** corresponding to the **Disable SMSOTP** claim
3. Select the **Supported By Default** checkbox to enable the Disable SMSOTP claim.
4. Click **Update** to save your changes.

!!! note "Verify if Disable SMSOTP is enabled for users"
    To verify whether the option is available for the users

    1. Go to the user profile of any user and check whether the **Disable SMSOTP** option is available.

    2. To disable SMS OTP in the user profile, enter **True** in the **Disable SMSOTP** field and click **Update**.

### Configure backup codes

Optionally, you can configure backup codes to be used when SMS OTP is disabled.

To configure backup SMS OTP codes:

1. On the management console, go to **Main > Identity > Claims > Add**.

2. Click **Add Local Claim**, and enter the following details:

	| Field name	| Value	|
	|---------------|-------|
	| Claim URI	| `http://wso2.org/claims/otpbackupcodes`	|
	| Display Name	| `backupotp`	|
	| Description	| Backup codes for SMS OTP	|
	| Mapped Attribute	| `postalcode`	|
	| Supported by Default	| Selected	|

	<img name='allow-to-use-back-up-codes' src='{{base_path}}/assets/img/guides/allow-to-use-back-up-codes.png' class='img-zoomable'/>

3. Click **Add** to add the new local claim.

#### Add backup codes for users

A backup code can have any number of digits, and you can define many backup codes as comma-separated values. For Example, `10300,21390`

1. On the Management Console, go to **Identity > Users and Roles > List > Users**.

2. Select the user you want to add backup codes for, and click **User Profile**.

3. Add the backup codes so that the user can disable SMS OTP by selecting **Disable SMS OTP** if required.

