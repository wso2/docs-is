# Configure Push Provider

To send push notifications from {{ product_name }}, you need to configure a Push Provider. {{ product_name }} supports **Firebase Cloud Messaging (FCM)** as the default push notification provider. With FCM, you can send push notifications to multiple platforms, including Android, iOS, and the web.

!!! note
    Firebase Cloud Messaging has the capability to send push notifications to iOS devices through Apple Push Notification Service (APNs). However, you need to configure APNs separately to send push notifications to iOS devices.
    For more information, [refer to the Firebase documentation](https://firebase.google.com/docs/cloud-messaging/ios/client).

## Configure FCM as the push provider

Follow the steps below to configure FCM as your push provider:

1. On the {{ product_name }} Console, go to **Notification Channels** and select **Push Providers**.

   ![Notification channels page]({{base_path}}/assets/img/guides/mfa/push/push-providers-page.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Upload the service-account.json file that you downloaded from Firebase when you created your Firebase project.

   ![Configure Firebase]({{base_path}}/assets/img/guides/mfa/push/push-provider-configure-fcm.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Click **Update** to save your changes.

   ![Update Push Provider]({{base_path}}/assets/img/guides/mfa/push/push-provider-configured-fcm.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Configure custom push providers

{{ product_name }} allows you to configure any push provider as an extension in addition to the default FCM provider. This is particularly useful when you need to support devices that don't have access to Google Play Services, such as Huawei devices that use Huawei Mobile Services (HMS) Push Kit.

### Extension mechanism

You can implement custom push providers by creating an extension that integrates with {{ product_name }}. This extension mechanism enables you to:

- Configure multiple active push providers simultaneously.
- Allow devices to specify which push provider to use during device registration.
- Support various push notification services beyond FCM, such as HMS Push Kit, APNs directly, or other custom push notification services.

### Prerequisites

Before implementing a custom push provider extension, ensure you have the following:

- Understanding of the {{ product_name }} extension architecture.
- Access to the push provider's API and SDK documentation.
- Required credentials and configuration files from your chosen push provider.

### Implementation steps

To configure a custom push provider as an extension:

1. **Create the extension implementation**:

   Develop a custom extension that implements the push provider interface required by {{ product_name }}. Your implementation should handle:

   - Authentication with the push provider service.
   - Message formatting and sending.
   - Error handling and retry logic.
   - Device token management.

2. **Configure the extension**:

   Register your custom push provider extension with {{ product_name }} by adding the necessary configuration to your deployment.

3. **Enable multiple push providers**:

   When multiple push providers are active, {{ product_name }} relies on the device registration process to determine which provider to use for each device. Ensure your mobile application includes the push provider identifier during device registration.

4. **Test the integration**:

   Verify that push notifications are successfully delivered through your custom provider by testing with devices that use the specific push service.

!!! tip
    When implementing custom push provider extensions, follow the same security practices as the default FCM integration, including secure storage of credentials and proper validation of push tokens.

!!! note
    For detailed guidance on implementing custom extensions in {{ product_name }}, refer to the extension development documentation specific to your {{ product_name }} version.

