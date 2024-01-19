# Add Passkey login

Based on FIDO concepts, **Passkeys** are a replacement for traditional passwords that allows users to log in to applications using the following methods.
    <ul>
    <li><b>Roaming authenticators</b> - platform-independant FIDO2-supported hardware security keys such as YubiKey.</li>
    <li><b>Platform authenticators</b> - built-in biometrics bound to a single device such as fingerprint scanners or facial recognition features.</li>
    </ul>

Passkeys are phishing resistant and they provide an enhanced user experience as users are not required to manage and remember multiple passwords.

!!! note "What is FIDO2?"
    The FIDO Alliance, whose mission is to reduce the world's reliance on passwords, introduced its latest specifications, collectively called FIDO2. FIDO2 specifications are the World Wide Web Consortium's (W3C) Web Authentication specification (WebAuthn) and FIDO alliance's corresponding Client to Authenticator Protocol (CTAP). Learn more about [FIDO2](https://fidoalliance.org/fido2/){: target="#"}.

There are two types of passkeys based on how they are synchronized.

- **Single-Device Passkeys**

    These passkeys are bound to a single device and are not meant to be shared across multiple devices. Single-device passkeys are useful if you want to reduce the impact of an attack if the credentials are compromised.

- **Multi-Device Passkeys**

    These passkeys enable synchronization across multiple devices allowing users to log into an application from any device, even when their credentials are stored on another.

    Major vendors have already introduced their passkey implementations.

    - Apple users will find their passkeys synced across all devices that are signed into the same Apple ID and iCloud Keychain. Refer to the [Apple documentation](https://developer.apple.com/passkeys/){: target="#"} for more information.

    - Android users will have their passkeys synced across all devices linked to their Google account.  Refer to the [Google documentation](https://developers.google.com/identity/passkeys){: target="#"} for more information.

    If the devices do not sync through the cloud, a user can generate a QR code in the other device and scan it using the device that stores the passkeys to successfully log into the application.

    Refer to the [passkeys documentation](https://passkeys.dev/device-support/){: target="#"} to stay up-to-date with the device support for FIDO2 passkeys.

!!! info
    - {{ product_name }} uses the WebAuthn API to enable FIDO-based authentication for browsers that no longer support the u2f extension.
    - The following browser versions support the WebAuthn API by default:
        - Chrome 67 and above
        - Firefox 60 and above
        - Edge 17723 and above
    - Passkey login with platform authenticators will NOT work on the Firefox browser in macOS Catalina, Big Sur, and Monterey due to browser limitations.
    - Passkey login with roaming authenticators will NOT work on the Firefox browser as the browser doesn't support CTAP2 (Client to Authenticator Protocol 2) with PIN.

The following guide explains how you can enable log in with passkeys in your application.

## Prerequisites

- To get started, you need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

- You need to have a user account in {{ product_name }}. If you don't already have one, [create a user account]({{base_path}}/guides/users/manage-customers/#onboard-a-user) in {{ product_name }}.

## Enable passkey login

Follow the steps given below to enable login with passkeys for your application.

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the application to which you wish to add Passkey login.

3. Go to the **Sign-in Method** tab of the application and add Passkey login from your preferred editor:


    ---
    === "Classic Editor"
        - If you haven't already built a login flow for your application, select **Add Passkey Login** to build one.

            ![Configuring passkey login in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/passkey/add-fido-login.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

        - If you have an already built login flow, you can add Passkey as an additional authenticator for the first step.

            ![Customize the login flow]({{base_path}}/assets/img/guides/passwordless/passkey/fido-login-step.png){: style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    === "Visual Editor"
        To add passwordless login with Passkey using the Visual Editor:

        1. Switch to the **Visual Editor** tab and go to **Predefined Flows** > **Basic Flows** > **Add Passwordless login**.

        2. Select **Passkey**.

        3. Click **Confirm** to add passwordless login with Passkey to the sign-in flow.

            ![Configuring passkey login in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/passkey/add-fido-login-with-visual-editor.png){: style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    ---

4. Click **Update** to save your changes.

!!! note
    By default, a user is not required to enter the username during login with passkeys. Learn how you can change this behavior in the [configure passkey usernameless authentication](#configure-passkey-usernameless-authentication) section.


## Enable passkey progressive enrollment

With passkey progressive enrollment, users can enroll their passkeys on the fly when logging in, offering a blend of convenience and security.

Follow the steps given below to enable passkey progressive enrollment for your application.

1. On the {{ product_name }} Console, go to **Connections**.

2. Select the `Passkey` connection and go to its **Settings** tab.

3. Select the **Allow passkey progressive enrollment** checkbox.

    ![Enable passkey progressive enrollment in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/passkey/enable-passkey-progressive-enrollment.png){: width="500" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Click **Update** to save your changes.

5. Navigate back to **Applications** on the {{ product_name }} Console.

6. Select the application to which you have added Passkey login.

7. Go to the **Sign-in Method** tab of the application and add the passkey based adaptive script from your preferred editor.

    !!! note
        For the progressive enrollment adaptive script to function, you need to configure at least one additional authenticator to the first step of the authentication flow. Refer to [Passkey Progressive Enrollment]({{base_path}}/guides/authentication/conditional-auth/passkey-progressive-enrollment-based-template/) for more information.

    ---
    === "Classic Editor"
        To add the adaptive script using the Classic Editor:

        1. Enable the **Conditional Authentication** toggle located at the bottom of the editor.

        2. In the **Templates** section, go to **Passkey Enrollment** and click the **+** sign corresponding to the **Passkey Progressive Enrollment** template.
        
        3. Click **Confirm** to add the script.

            ![Add adaptive script with Classic Editor]({{base_path}}/assets/img/guides/passwordless/passkey/add-script-with-classic-editor.png){: style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    === "Visual Editor"
        To add the adaptive script using the Classic Editor:

        1. Switch to the **Visual Editor** tab and go to **Predefined Flows** > **Conditional Login Flows** > **Passkey Enrollment**.

        2. Click the **ADD** button corresponding to the **Passkey Progressive Enrollment** template.

        3. Click **Confirm** to add the script.

            ![Add adaptive script with Visual Editor]({{base_path}}/assets/img/guides/passwordless/passkey/add-script-with-visual-editor.png){: style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}
    ---

4. Click **Update** to save your changes.

!!! note
    - If progressive enrollment is disabled, users need to pre-register their passkeys from the MyAccount portal. Learn how to do so in [Register passkeys]({{base_path}}/guides/user-self-service/register-passkey/).

    - Passkey progressive enrollment can only be configured at the organizational level and cannot be modified at the application level.

## Configure passkey usernameless authentication

Usernameless authentication enhances user experience by eliminating the need for users to enter a username during login with passkeys. This is the default behavior in {{product_name}}. Follow the steps given below to configure passkey usernameless authentication for your application.

1. On the {{ product_name }} Console, go to **Connections**.

2. Select the **Passkey** connection.

3. Go to the **Settings** tab of the connection.

4. Select the **Allow passkey usernameless authentication** checkbox to enable usernameless authentication.

    !!! note
        If this option is disabled, users are prompted to enter the username during login with passkeys.

    ![Enable passkey usernameless authentication in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/passkey/enable-passkey-usernameless-authentication.png){: width="500" style="display: block; margin: 0 auto;border: 0.3px solid lightgrey;"}

5. Click **Update** to save your changes.

!!! note
    Passkey usernameless authentication can only be configured at the organizational level and cannot be modified at the application level.

## Try it out

The following guides let you try out a scenario where, passkey progressive enrollment is **enabled** and passkey usernameless authentication is **disabled**.

### Enroll a passkey

Follow the steps below to enroll a passkey on the fly during login.

1. Access the application URL.

2. Click **Login** to access the {{ product_name }} login page.

3. Select **Sign In With Passkey**.

    ![Sign In with passkey login in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/passkey/sign-in-with-passkey.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. To enroll a new passkey, enter your username and select **Create a passkey**.

    ![Create a passkey in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/passkey/create-passkey.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Enter the corresponding password for the user and click **Sign In**.

    ![Basic authenticator in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/passkey/basic-authenticator.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

6. Follow the instructions given by your browser or device to enroll the passkey.

    ![Create a passkey browser prompt in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/passkey/create-passkey-browser-prompt.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

7. Provide a name to uniquely identify your passkey.

    ![Rename passkey in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/passkey/rename-passkey.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

8. Click **Submit** to complete the enrollment. You'll be authenticated in the application.


### Sign in with passkey

Follow the steps below to use an enrolled passkey to sign in to an application.

1. Navigate to the login page of the application.

1. Click  **Login** to access the {{ product_name }} login page.

3. Select **Sign In With Passkey**.

4. Enter your username and select **Continue**.

5. Follow the browser/device instructions to log in with a passkey.

    ![Sign In with passkey browser prompt {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/passkey/sign-in-with-passkey-browser-prompt.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
