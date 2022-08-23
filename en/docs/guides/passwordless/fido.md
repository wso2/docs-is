# Passwordless login using FIDO2

WSO2 Identity Server supports passwordless authentication using [FIDO2]({{base_path}}/references/concepts/authentication/mfa-with-fido), a phishing-proof passwordless authentication protocol developed as a joint effort between the FIDO Alliance and the World Wide Web Consortium (W3C).

The three major enablers of the FIDO2 flow are:

- The FIDO2 Authenticator
- The client or browser that operates as a mediator
- The WebAuthn Relying Party (WSO2 Identity Server)

There are two types of authenticators, which you can use with Asgardeo passwordless authentication.

- **Platform authenticators** (also known as internal authenticators): Authenticators like fingerprint scanners, TouchID, FaceID or Windows Hello which are bound to a particular device.
- **Roaming authenticators** (also known as cross-platform or external authenticators): Authenticators like hardware security keys which are external and not bound to any specific device.

You can configure FIDO2 passwordless login for your apps using two methods:

- **Security key/Biometrics**: An application user uses a FIDO2-supported authenticator to log in without entering a username or a password.

- [**MFA with Security key/Biometrics**]({{base_path}}/guides/mfa/2fa-fido.md): An application user enters a username and password first. IS authenticates the user with credentials and prompts the user to use a FIDO2-supported authenticator to log in.

??? "Does your browser support your Security Key/Biometrics (FIDO) devices?"
    You can use the https://demo.yubico.com/webauthn-technical/registration site to check the browser support for FIDO devices.

!!! info
    - WSO2 Identity Server uses the WebAuthn API to enable FIDO-based authentication for browsers that no longer support the u2f extension.
    - The following browser versions support the WebAuthn API by default:
        - Chrome 67 and above
        - Firefox 60 and above
        - Edge 17723 and above
    - FIDO2 passwordless login with platform authenticators will NOT work on the Firefox browser in macOS Catalina, Big Sur, and Monterey due to browser limitations.
    - FIDO2 passwordless login with roaming authenticators will NOT work on the Firefox browser as the browser doesn't support CTAP2 (Client to Authenticator Protocol 2) with PIN.

## Prerequisites

- Add the following configurations to the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory to define the origin URLs where the WSO2 Identity Server My Account will be hosted (e.g., `https://localhost:9443`).

    ```toml
    [fido.trusted]
    origins=["https://localhost:9443"]
    ```
- You need to [set up the sample]({{base_path}}/guides/adaptive-auth/adaptive-auth-overview/#set-up-the-sample) application.
- You need to have a FIDO2 security key registered in IS. Learn how to [register your FIDO security key]({{base_path}}/guides/my-account/enable-mfa-my-account).

## Configure Security Key/Biometrics (FIDO) as an authenticator

To configure Security Key/Biometrics as an authenticator:

1. On the management console, go to **Main** > **Identity** > **Service Providers** > **List**.

2. Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3. Expand the **Local and Outbound Authentication Configuration** section and click **Local Authenticator**.

4. Select `Security Key/Biometrics` from the list of local authenticators.

5. Click **Update** to save your configurations.

## Try it out

1. Access the following sample Pickup Dispatch application URL: `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com` and click **Login**.

2. Depending on the FIDO biometric method configured, you will be prompted to enter a code, use the security key or use your fingerprint scanner.

3. Add your security key or biometrics and click **Continue**.

You will now be logged into the application successfully.
