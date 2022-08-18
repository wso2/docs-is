# Configure Security Key/Biometrics (FIDO) for two-factor authentication
This page guides you through configuring [two-factor authentication]({{base_path}}/references/concepts/authentication/intro-authentication#two-factor-authentication) for a web application using [Security Key/Biometrics (FIDO)]({{base_path}}/references/concepts/authentication/mfa-with-fido) as the second factor.

!!! info
    - WSO2 Identity Server uses the WebAuthn API to enable FIDO-based authentication for browsers that no longer support the u2f extension.
    - The following browser versions support the WebAuthn API by default:
        - Chrome 67 and above
        - Firefox 60 and above
        - Edge 17723 and above
    - FIDO2 passwordless login with platform authenticators will NOT work on the Firefox browser in macOS Catalina, Big Sur, and Monterey due to browser limitations.
    - FIDO2 passwordless login with roaming authenticators will NOT work on the Firefox browser as the browser doesn't support CTAP2 (Client to Authenticator Protocol 2) with PIN.

??? "Does your browser support your FIDO devices?"
    You can use the https://demo.yubico.com/webauthn-technical/registration site to check the browser support for FIDO devices.

## Set up Identity Server to use FIDO

Add the following configurations to the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.

- To define the origin URLs where the WSO2 Identity Server My Account will be hosted (e.g., `https://localhost:9443`).

    ```toml
    [fido.trusted]
    origins=["https://localhost:9443"]
    ```

- To configure the relevant server URL as the AppID if you are using a reverse proxy enabled setup.

    ```toml
    [authentication.authenticator.fido.parameters]
    app_id="https://hostname"
    ```

Save the configurations and restart the server.

## Enable FIDO for an SP

This section guides you on adding FIDO as a service provider's second authentication step.

### Prerequisites
- You need to [set up the sample]({{base_path}}/guides/adaptive-auth/adaptive-auth-overview/#set-up-the-sample) application.
- You need to have a FIDO2 security key registered in IS. Learn how to [register your FIDO security key]({{base_path}}/guides/my-account/enable-mfa-my-account).

### Configure FIDO as the second factor

To configure FIDO as the second authentication factor:

1. On the management console, go to **Main** > **Identity** > **Service Providers** > **List**.

2. Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3. Expand the **Local and Outbound Authentication Configuration** section and click **Advanced Configuration**.

4. Click **+ Add Authentication Step** twice to add two authentication steps.

5. Select the following authentication methods from the relevant dropdowns and click **+ Add Authenticator**.

    | Authentication step   | Local Authenticator   |
    |-----------------------|-----------------------|
    | First step    | `basic`   |
    | Second step   | `fido`|

6. Click **Update** to save the configurations.

You have successfully configured FIDO as the second factor of authentication.


## Try it out

1. Access the following sample Pickup Dispatch application URL: `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com`

2. Click **Login** and enter admin's credentials.

3. Depending on the FIDO biometric method configured, you will be prompted to enter a code, use the security key or use your fingerprint scanner.

4. Add your security key or biometrics and click **Continue**.

You will now be logged into the application successfully.

!!! info "Related topics"
    - [Concept: Two-Factor Authentication]({{base_path}}/references/concepts/authentication/intro-authentication#single-factor-authentication)
    - [Concept: FIDO]({{base_path}}/references/concepts/authentication/mfa-with-fido)
    - [Guide: Configure an Authentication Journey]({{base_path}}/guides/mfa/configure-authentication-journey)
