# Add FIDO2 login

FIDO2 adds passwordless login to your applications, which allows users to replace traditional passwords with FIDO2-supported hardware security keys or built-in authenticators on their devices.

There are two types of authenticators that you can use with FIDO2 passwordless authentication in {{ product_name }}.

- **Platform authenticators** (also known as `internal` authenticators): Authenticators like fingerprint scanners, TouchID, FaceID or Windows Hello which are bound to a particular device.
- **Roaming authenticators** (also known as `cross-platform` or `external` authenticators): Authenticators like hardware security keys which are external and not bound to any specific device.

!!! note "What is FIDO2?"
    The FIDO Alliance, whose mission is to reduce the world's reliance on passwords, introduced its latest specifications, collectively called FIDO2. FIDO2 specifications are the World Wide Web Consortium's (W3C) Web Authentication specification (WebAuthn) and FIDO alliance's corresponding Client to Authenticator Protocol (CTAP).

## Prerequisites

1. To get started, you need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

2. [Application users]({{base_path}}/get-started/create-asgardeo-account/#create-a-user) need to register their security keys/biometrics via the My Account app prior to using passwordless login. Be sure to educate your users on how to [register a security key/biometrics via My Account.]({{base_path}}/guides/user-self-service/register-security-key/)

## Enable passwordless login for an app

Follow the steps given below to enable **passwordless** login for your application.

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the application to which you wish to add FIDO login.

3. Go to the **Sign-in Method** tab of the application and add FIDO login from your preferred editor:


    ---
    === "Classic Editor"
        - If you haven't already built a login flow for your application, select **FIDO2** to build one.

            ![Configuring fido2 login in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/fido2/add-fido-login.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

        - If you have an already built login flow, you can add FIDO2 as an additional authenticator for the first step.

            ![Customize the login flow]({{base_path}}/assets/img/guides/passwordless/fido2/fido-login-step.png){: style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    === "Visual Editor"
        To add passwordless login with FIDO using the Visual Editor:

        1. Switch to the **Visual Editor** tab and go to **Predefined Flows** > **Basic Flows** > **Add Passwordless login**.

        2. Select `Username & Password + FIDO2`.

        3. Click **Confirm** to add passwordless login with FIDO to the sign-in flow.

            ![Configuring fido2 login in Asgardeo using the Visual Editor]({{base_path}}/assets/img/guides/passwordless/fido2/add-fido-login-with-visual-editor.png){: style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    ---

4. Click **Update** to save your changes.

## FIDO2 passkeys

A main drawback of classic FIDO2 passwordless authentication is that FIDO2 credentials are bound to a single device.

Passkeys resolve this issue by allowing FIDO2 credentials to sync across multiple devices. With passkeys, users can log in to applications from any device even if their credentials are stored in another.

**If your devices sync through the cloud**, major vendors have the following passkey implementations:

- If you are an Apple user, your passkeys will be synced across all the devices signed into the same Apple ID and iCloud Keychain. Refer to the [Apple documentation](https://developer.apple.com/passkeys/) for more information.

- If you are an Android user, your  passkeys will be synced across all the devices signed into your Google account. Refer to the [Google documentation](https://developers.google.com/identity/passkeys) for more information.

**If your devices do not sync through the cloud**, you can use your device with passkeys to scan a QR code generated in the device from which you are trying to log in.

- For example, if you want to log in to a web application from your PC, and your FIDO2 credentials are stored in a mobile device, you can scan a QR code and select the relevant passkey from the mobile device to log in.

Refer to the [passkeys documentation](https://passkeys.dev/device-support/) to stay up-to-date with the device support for FIDO2 passkeys.

## Try it out

!!! note
    - FIDO2 passwordless login with platform authenticators will NOT work on the Firefox browser in macOS Catalina, Big Sur and Monterey due to browser limitations.
    - FIDO2 passwordless login with roaming authenticators will NOT work on the Firefox browser as the browser doesn't support CTAP2 (Client to Authenticator Protocol 2) with PIN.

1. Access the application URL.
2. Click **Login** to open the {{ product_name }} login page.
3. On the {{ product_name }} login page, click **Sign In With Security Key**. You will be redirected to the FIDO2 login page.
  
    ![Sign In With Security Key in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/fido2/sign-in-with-security-key.png){: width="300" style="border: 0.3px solid lightgrey;"}

4. Follow the instructions given by your browser or device to login.
  
    ![Sign In With Security Key page in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/fido2/sign-in-with-security-key-page.png){: width="300" style="border: 0.3px solid lightgrey;"}