# Configure Push Provider

To send push notifications from {{ product_name }}, you need to configure a Push Provider. {{ product_name }} supports **Firebase Cloud Messaging (FCM)** to send push notifications. With FCM, you can send push notifications to multiple platforms, including Android, iOS, and the web.

!!! note
    Firebase cloud messaging has the capability to send push notification to iOS devices through Apple Push Notification Service (APNs). However, you need to configure APNs separately to send push notifications to iOS devices.
    For more information, [refer to the Firebase documentation](https://firebase.google.com/docs/cloud-messaging/ios/client).

Follow the below steps to configure FCM as your Push Provider:

1. On the {{ product_name }} Console, go to **Notification Channels** and select **Push Providers**.

   ![Notification channels page]({{base_path}}/assets/img/guides/mfa/push/push-providers-page.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Upload the service-account.json file that you downloaded from Firebase when you created your Firebase project.

   ![Configure Firebase]({{base_path}}/assets/img/guides/mfa/push/push-provider-configure-fcm.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Click **Update** to save your changes.

   ![Update Push Provider]({{base_path}}/assets/img/guides/mfa/push/push-provider-configured-fcm.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

