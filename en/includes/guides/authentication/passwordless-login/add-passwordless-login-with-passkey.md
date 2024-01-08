# Add Passkey login

Passkey adds passwordless login to your applications, which allows users to replace traditional passwords with FIDO2-supported hardware security keys or built-in authenticators on their devices. This advanced technology also enables credentials to sync across multiple devices, allowing users to log into applications from any device, even if their credentials are stored on another. 

!!! note "What is FIDO2?"
    The FIDO Alliance, whose mission is to reduce the world's reliance on passwords, introduced its latest specifications, collectively called FIDO2. FIDO2 specifications are the World Wide Web Consortium's (W3C) Web Authentication specification (WebAuthn) and FIDO alliance's corresponding Client to Authenticator Protocol (CTAP).

Two key developments in this area are the concepts of **single-device passkeys** and **multi-device passkeys**, both aimed at reducing reliance on passwords and improving phishing resistance.

### Single-Device Passkey: 

A single-device passkey is a type of FIDO credential that is bound to a single device. This type of passkey is created and stored on the user's device, like a smartphone or a laptop, and is used for authenticating the user on that specific device. It leverages the device's built-in security features, such as biometrics or secure elements, to provide a high level of security. However, since the passkey is tied to a single device, it cannot be used for authentication if the user switches to a new device or loses the existing one.

###  Multi-Device Passkey:

Multi-device passkeys are a significant advancement in FIDO credentials, designed to address the limitations of single-device passkeys. These passkeys enable synchronization across multiple devices owned by the same user. This synchronization, typically managed by the device's operating system, securely transfers the cryptographic keys of the FIDO credential from one device to another. Such an approach not only enhances usability but also maintains high security standards, making it a practical choice for various consumer applications.
With the implementation of multi-device passkeys, users gain the flexibility to log into applications from any device, even when their credentials are stored on a different device. This is particularly useful when devices are synced through the cloud. For instance, Apple users will find their passkeys synced across all devices that are signed into the same Apple ID and iCloud Keychain. Android users, similarly, will have their passkeys synced across all devices linked to their Google account. Refer to the [Apple documentation](https://developer.apple.com/passkeys/) and [Google documentation](https://developers.google.com/identity/passkeys) for more information.

In scenarios where devices do not sync through the cloud, an alternative method involves using a device with passkeys to scan a QR code generated on the device from which the user intends to log in. For example, to log into a web application from a PC using FIDO2 credentials stored on a mobile device, a user can simply scan a QR code and select the relevant passkey on their mobile device for authentication. 

Refer to the [passkeys documentation](https://passkeys.dev/device-support/) to stay up-to-date with the device support for FIDO2 passkeys.

!!! info
    - {{ product_name }} uses the WebAuthn API to enable FIDO-based authentication for browsers that no longer support the u2f extension.
    - The following browser versions support the WebAuthn API by default:
        - Chrome 67 and above
        - Firefox 60 and above
        - Edge 17723 and above
    - Passkey login with [platform authenticators](https://developers.yubico.com/WebAuthn/WebAuthn_Developer_Guide/Platform_vs_Cross-Platform.html#:~:text=types%20of%20authenticators%3A-,Platform%20authenticators,-%2C%20also%20known%20as) will NOT work on the Firefox browser in macOS Catalina, Big Sur, and Monterey due to browser limitations.
    - Passkey login with [roaming authenticators](https://developers.yubico.com/WebAuthn/WebAuthn_Developer_Guide/Platform_vs_Cross-Platform.html#:~:text=Roaming%20authenticators) will NOT work on the Firefox browser as the browser doesn't support CTAP2 (Client to Authenticator Protocol 2) with PIN.


## Prerequisites

- To get started, you need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

- You need to have a user account in {{ product_name }}. If you don't already have one, [create a user account]({{base_path}}/guides/users/manage-customers/#onboard-a-user) in {{ product_name }}.

{{ admin_login_note}}

- If Passkey progressive enrollment is disabled, [application users]({{base_path}}/guides/users/manage-customers/#onboard-a-user) need to register their passkeys via the My Account app prior to using passkey login. Be sure to educate your users on how to [enroll a passkey via My Account.]({{base_path}}/guides/user-self-service/register-passkey/)

## Enable passkey login for an app

Follow the steps given below to enable **Passkey** login for your application.

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
    By default, the system supports passkey authentication without the need for a username. To activate username-based passkey authentication, please refer to the steps outlined in the section [Enable Passkey usernameless authentication](#enable-passkey-usernameless-authentication).


## Enable Passkey progressive enrollment

This feature allows users to enroll their passkey seamlessly during the usual login flow, offering a blend of convenience and security. Follow the steps given below to enable **Passkey** progressive enrollment for your application.

1. On the {{ product_name }} Console, go to **Connections**.

2. Select the `Passkey` connection.

3. Go to the **Settings** tab of the connection.

4. Enable the option for **Allow passkey progressive enrollment** by checking its checkbox.

    ![Enable passkey progressive enrollment in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/passkey/enable-passkey-progressive-enrollment.png){: width="500" style="border: 0.3px solid lightgrey;"}

5. Click **Update** to save your changes.

6. Navigate back to **Applications** on the {{ product_name }} Console.

7. Select the application to which you have added Passkey login.

8. Go to the **Sign-in Method** tab of the application and add a passkey based adaptive script from your preferred editor. Refer [Add Passkey Progressive Enrollment]({{base_path}}/guides/authentication/conditional-auth/passkey-progressive-enrollment-based-template/) for more information:


    ---
    === "Classic Editor"
        To add the adaptive script using the Classic Editor:

        1. Switch on the **Conditional Authentication** toggle located at the bottom of the editor.

        2. In the **Templates** section, go to **Passkey Enrollment** and  click on the **+** corresponding to the **Passkey Progressive Enrollment** template.
        
        3. Click **Confirm** to add the script.

            ![Add adaptive script with Classic Editor]({{base_path}}/assets/img/guides/passwordless/passkey/add-script-with-classic-editor.png){: style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    === "Visual Editor"
        To add the adaptive script using the Classic Editor:

        1. Switch to the **Visual Editor** tab and go to **Predefined Flows** > **Conditional Login Flows** > **Passkey Enrollment**.

        2. Click on the **ADD** corresponding to the **Passkey Progressive Enrollment** template.

        3. Click **Confirm** to add the script.

            ![Add adaptive script with Visual Editor]({{base_path}}/assets/img/guides/passwordless/passkey/add-script-with-visual-editor.png){: style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    ---

4. Click **Update** to save your changes.

!!! note
    Passkey progressive enrollment can only be configured at the organizational level and cannot be modified at the application level.

## Enable Passkey usernameless  authentication

This feature streamlines the login process by eliminating the need for usernames, enabling a faster and more secure authentication method. Follow the steps given below to enable **Passkey** usernameless authentication for your application.

1. On the {{ product_name }} Console, go to **Connections**.

2. Select the **Passkey** connection.

3. Go to the **Settings** tab of the connection.

4. Enable the option for **Allow passkey usernameless authentication** by checking its checkbox.

    ![Enable passkey usernameless authentication in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/passkey/enable-passkey-usernameless-authentication.png){: width="500" style="border: 0.3px solid lightgrey;"}

5. Click **Update** to save your changes.

!!! note
    Passkey usernameless authentication can only be configured at the organizational level and cannot be modified at the application level.

## Try it out

In this section, let’s try out the scenario where Passkey progressive enrollment is enabled and Passkey usernameless authentication is disabled. The following steps will guide you through enrolling a passkey on-the-fly and then using it to sign in.

**Step 1: Enroll a passkey**

1. Access the application URL.

2. Click **Login** to access the {{ product_name }} login page.

3. Select **Sign In With Passkey**.

    ![Sign In with passkey login in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/passkey/sign-in-with-passkey.png){: width="300" style="border: 0.3px solid lightgrey;"}

4. To enroll a new passkey, enter your username and select **Create a passkey**.

    ![Create a passkey in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/passkey/create-passkey.png){: width="300" style="border: 0.3px solid lightgrey;"}

5. Enter your username and password, then click **Sign In**.

    ![Basic authenticator in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/passkey/basic-authenticator.png){: width="300" style="border: 0.3px solid lightgrey;"}

6. Follow the instructions given by your browser or device to enroll the passkey.

    ![Create a passkey browser prompt in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/passkey/create-passkey-browser-prompt.png){: width="300" style="border: 0.3px solid lightgrey;"}

7. Enter a unique name to your passkey for identification.

    ![Rename passkey in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/passkey/rename-passkey.png){: width="300" style="border: 0.3px solid lightgrey;"}

8. Click **Submit** to complete the enrollment. You'll be authenticated in the application.


**Step 2: Sign in with the enrolled passkey**

1. Log out from the application.

2. Click **Login** to revisit the {{ product_name }} login page.

3. Select **Sign In With Passkey**.

4. Enter your username and select **Continue**.

5. Follow your browser's or device's instructions to log in using the Passkey.

    ![Sign In with passkey browser prompt {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/passkey/sign-in-with-passkey-browser-prompt.png){: width="300" style="border: 0.3px solid lightgrey;"}
