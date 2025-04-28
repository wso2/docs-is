
# Add Passwordless login with Push Notifications


Push notifications enable a secure and seamless passwordless authentication mechanism by allowing users to verify their identity with a simple tap on their registered mobile device. Instead of relying on traditional passwords or one-time passcodes, authentication requests are securely delivered via push notifications, ensuring real-time, user-friendly login.

This method enhances security by reducing the risk of phishing and credential-based attacks while offering a frictionless login experience. Users can authenticate from any trusted device with internet access, eliminating the need to remember or enter passwords.

To configure push notifications as a passwordless authentication mechanism in {{ product_name }}, follow the instructions below.


## Prerequisites

- To get started, you need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

- You need to configure a Push Provider in {{ product_name }}. If you haven't configured a Push Notification Provider yet, follow the instructions in the [Push Provider Configuration](#configuring-push-providers) guide.

- You need to have a user account in {{ product_name }}. If you don't already have one, [create a user account]({{base_path}}/guides/users/manage-users/#onboard-a-user) in {{ product_name }}.

- A push authenticator application is required for the purpose of recieving push notifications. Learn how to [build your own push authenticator app.]({{base_path}}/references/tutorials/build-your-own-push-authenticator-app)

- If push notification device progressive enrollment is disabled, [application users]({{base_path}}/guides/users/manage-users/#onboard-a-user) need to register their push notification devices via the My Account app prior to using push notification based login. Be sure to educate your users on how to [enroll push notification devices via My Account.]({{base_path}}/guides/user-self-service/register-push-notification-device/)


## Set up Push Notifications

{{ product_name }} has some default settings for Push Notifications, which are sufficient for most cases. If required, you can change the default settings, as explained below.

To update the default Push Notification settings:

1. On the {{ product_name }} Console, go to **Connections** and select **Push Notification**.
2. Update the following parameters in the **Settings** tab:

    ![Setup Push Notifications in {{ product_name }}]({{base_path}}/assets/img/guides/mfa/push/setup-push-auth.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    <table>
         <tr>
           <th style="width: 350px;">Field</th>
           <th>Description</th>
         </tr>
         <tr>
           <td><code>Enable number Challenge</code></td>
           <td>When enabled, users must confirm the number displayed in the application on their push authentication device to complete the sign in.</td>
         </tr>
         <tr>
           <td><code>Enable push notification device progressive enrollment</code></td>
           <td>
               When enabled, users may enroll their devices for push authentication at the moment they log in to the application.
           </td>
         </tr>
         <tr>
           <td><code>Push notification resend interval</code></td>
           <td>Specifies the time interval between the resend attempts. Also, the polling to identify user's response for the push notification will be ended once the timer is completed.</td>
         </tr>
         <tr>
           <td><code>Allowed push notification resend attempts</code></td>
           <td>The number of allowed push notification resend attempts. Once exceeded, the user will not be allowed to send any push notifications.</td>
         </tr>
    </table>

3. Once you update the Push Notification settings, click **Update**.

## Configuring Push Providers

To send push notifications from {{ product_name }}, you need to configure a Push Provider. {{ product_name }} supports **Firebase Cloud Messaging (FCM)** to send push notifications. With FCM, you can send push notifications to multiple platforms, including Android, iOS, and the web.

!!! note
    Firebase cloud messaging has the capability to send push notification to iOS devices through Apple Push Notification Service (APNs). However, you need to configure APNs separately to send push notifications to iOS devices.
    For more information, [click here](https://firebase.google.com/docs/cloud-messaging/ios/client).

Follow the below steps to configure FCM as your Push Provider:

1. On the {{ product_name }} Console, go to **Notification Channels** and select **Push Providers**.

    ![Notification channels page]({{base_path}}/assets/img/guides/mfa/push/push-providers-page.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Upload the service-account.json file that you downloaded from Firebase when you created your Firebase project.

    ![Configure Firebase]({{base_path}}/assets/img/guides/mfa/push/push-provider-configure-fcm.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Click **Update** to save your changes.

    ![Update Push Provider]({{base_path}}/assets/img/guides/mfa/push/push-provider-configured-fcm.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Enable push notifications login for an app

{% include "../../../guides/fragments/add-login/passwordless-login/add-push-auth-login.md" %}

## Enable push notification device progressive enrollment

This feature allows users to enroll their push notification devices seamlessly during the usual login flow, offering a blend of convenience and security. Follow the steps given below to enable **Push Notification Devices progressive enrollment** for your application.

1. On the {{ product_name }} Console, go to **Connections**.

2. Select the **Push Notification** connection.

3. Go to the **Settings** tab of the connection.

4. Enable the option for **Enable push notification device progressive enrollment** by checking its checkbox.

    ![Enable push notification device progressive enrollment in {{ product_name }}]({{base_path}}/assets/img/guides/mfa/push/enable-push-progressive-enrollment.png){: width="700" style="border: 0.3px solid lightgrey;"}

5. Click **Update** to save your changes.

6. [Add the push notification device progressive enrollment adaptive script]({{base_path}}/guides/authentication/conditional-auth/push-device-progressive-enrollment-based-template) to the login flow of the application.


!!! note
    Push notification device progressive enrollment can only be configured at the organizational level and cannot be modified at the application level.

## Try out Push Notification passwordless login flow with a user already enrolled with a device

In this section, we will guide you through the steps to authenticate using Push Notification passwordless login with a user who has already enrolled a push notification device.

1. Access the application URL.

2. Click **Login** to access the {{ product_name }} login page.

3. On the login page, enter your username and click **Continue**.

    ![Sign In with Push Notification in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/push/push-auth-login-page.png){: width="400" style="border: 0.3px solid lightgrey;"}

    This action redirects you to the Push Notification Wait page.

    ![Push Notification Wait page]({{base_path}}/assets/img/guides/passwordless/push/push-auth-wait-page.png){: width="400" style="border: 0.3px solid lightgrey;"}

4. You will receive a push notification on your registered device. Approve the authentication request from the registered device. Below shown page will be displayed and will be polling for the user's response.

5. Once you approve the authentication request, you will be successfully logged in to the application.


## Try out Push Notification passwordless login flow with a user not enrolled with a device

In this section, we will guide you through the steps to authenticate using Push Notification passwordless login with a user who has not enrolled a push notification device when progressive enrollment is enabled.

1. Access the application URL.

2. Click **Login** to access the {{ product_name }} login page.

3. On the login page, enter your username and click **Continue**.

4. Since you have not enrolled a push notification device, you will be shown the following page to get your consent to enroll a push notification device. Click on **Register** to enroll a push notification device.

    ![Push Notification Device Enrollment Consent]({{base_path}}/assets/img/guides/passwordless/push/push-device-enroll-consent.png){: width="400" style="border: 0.3px solid lightgrey;"}

5. Since this authentication flow has not authenticated the user yet, you will be prompted to enter the password of the user account. This is to ensure that the user is the legitimate owner of the account.

    ![Push Notification Password Verification]({{base_path}}/assets/img/guides/passwordless/push/push-device-enroll-password-verification.png){: width="400" style="border: 0.3px solid lightgrey;}

6. Click on **Sign In** to proceed.

7. If authentication is successful, you will be shown the following page to scan the QR code using your Push Authenticator App to enroll your device. Once the device is enrolled successfully, check the checkbox and click **Continue** to proceed with the authentication.

    ![Push Notification Device Enrollment]({{base_path}}/assets/img/guides/passwordless/push/push-auth-enroll-page.png){: width="400" style="border: 0.3px solid lightgrey;}

8. You will receive a push notification on your registered device. Approve the authentication request from the registered device.

9. Once you approve the authentication request, you will be successfully logged in to the application.

