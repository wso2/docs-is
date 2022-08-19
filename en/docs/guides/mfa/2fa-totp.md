# Configure TOTP for 2-Factor Authentication

This page guides you through configuring [two-factor authentication]({{base_path}}/references/concepts/authentication/intro-authentication#two-factor-authentication) for a web application using TOTP (Time-based One-Time Password) as the second factor.

!!! info
    For more information, see the [TOTP specification](https://tools.ietf.org/html/rfc6238).

----

## Prerequisites
- You need to [set up the sample]({{base_path}}/guides/adaptive-auth/adaptive-auth-overview/#set-up-the-sample) application.

## Configure TOTP as the second factor

To configure TOTP as the second authentication factor:

1. On the management console, go to **Main** > **Identity** > **Service Providers** > **List**.

2. Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3. Expand the **Local and Outbound Authentication Configuration** section and click **Advanced Configuration**.

4. Click **+ Add Authentication Step** twice to add two authentication steps.

5. Select the following authentication methods from the relevant dropdowns and click **+ Add Authenticator**.

    | Authentication step   | Local Authenticator   |
    |-----------------------|-----------------------|
    | First step    | `Username & Password`   |
    | Second step   | `TOTP`|

6. Click **Update** to save the configurations.

You have successfully configured TOTP as the second factor of authentication.

## Try it out

1. Access the following sample Pickup Dispatch application URL: `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com`

2. Click **Login** and enter admin's credentials.

3. Scan the QR code using an authenticator application (Example: [Google Authenticator Mobile Application](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en)), and click **Continue**

    !!! info
        The QR code will be displayed only at the first attempt. After you click **Continue**, the QR code will no longer be shown.

4. You will now be prompted to enter the TOTP code. The TOTP will be displayed on the authenticator application that you used to scan the QR.

    ![TOTP code]({{base_path}}/assets/img/samples/totp-code-verification.png)


5. Enter the TOTP and click **Continue**.

You will now be logged into the application successfully.

----

## Additional configurations

You can also add the following configurations to enhance your TOTP configurations.

### Send emails with TOTP

Optionally, you can set up the users to receive the TOTP code via email during the authentication flow.

To allow sending TOTP in an email:
1. Initially, [**configure email sending module**](../../../deploy/configure-email-sending).
2. Add the following configuration to the `deployment.toml` file.
    ```toml
    [authentication.authenticator.totp.parameters]
    allow_sending_verification_code_by_email=true
    ```
3. Save the configurations and restart the server.


!!! tip
    The email template used to send this email notification is the **TOTP** template.
    You can edit and customize the email template. For more information on how to do this, see [Customize Automated Emails]({{base_path}}/guides/tenants/customize-automated-mails).

----

!!! info "Related topics"
    - [Concept: Two-Factor Authentication]({{base_path}}/references/concepts/authentication/intro-authentication/#two-factor-authentication)
    - [Guide: Configure an Authentication Journey]({{base_path}}/guides/mfa/configure-authentication-journey)
