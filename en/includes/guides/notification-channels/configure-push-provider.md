# Configure push provider

To use push notification-based authentication, you need to configure at least one push notification provider in {{ product_name }}. {{ support_platforms }}

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}

!!! note
    You can configure **multiple providers** and keep them active at the same time. During enrollment, the device will send the preferred push provider in the registration request. Once successfully registered, {{product_name}} will send push notifications via the device's registered push provider.

    You can also mark one provider as the **default push provider**.

The following list shows the platforms that each provider supports.

- **FCM**: Android, iOS (APNs), and web.
- **Amazon SNS**: Android, iOS (APNs), Amazon Fire OS (ADM), Baidu Cloud Push, Windows Phone (MPNS), and Windows (WNS).

{% endif %}

## Configure the push provider

1. On the {{ product_name }} Console, go to **Notification Channels** and select **Push Providers**.

      ![Notification channels page]({{base_path}}/assets/img/guides/mfa/push/push-providers-page.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Select the tab for the provider you want to configure and follow the steps in the relevant section below.

### Configure Firebase Cloud Messaging (FCM)

1. Select the **Firebase** tab.

2. Upload the `service-account.json` file that you downloaded from Firebase when you created your Firebase project.

      ![Configure Firebase]({{base_path}}/assets/img/guides/mfa/push/push-provider-configure-fcm.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Click **Update** to save your changes.

      ![Update Push Provider]({{base_path}}/assets/img/guides/mfa/push/push-provider-configured-fcm.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note
    Firebase Cloud Messaging can send push notifications to iOS devices through Apple Push Notification Service (APNs). However, you need to configure APNs separately to send push notifications to iOS devices. For more information, [refer to the Firebase documentation](https://firebase.google.com/docs/cloud-messaging/ios/client).

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}

### Configure Amazon Simple Notification Service (SNS)

1. In the AWS Management Console, create a platform application for each platform you plan to support (for example, FCM or APNs). For instructions, see [Mobile push notifications](https://docs.aws.amazon.com/sns/latest/dg/sns-mobile-application-as-subscriber.html) in the AWS documentation.

2. Create an IAM user and attach a policy that grants the following permissions. For guidance on creating IAM users and attaching policies, see the [AWS IAM documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html).

    - `sns:CreatePlatformEndpoint` — register devices with SNS
    - `sns:GetEndpointAttributes` — retrieve device endpoint details
    - `sns:SetEndpointAttributes` — update device endpoint registrations
    - `sns:DeleteEndpoint` — unregister devices from SNS
    - `sns:Publish` — send push notifications to device endpoints

    !!! note
        IAM users are global by default. If desired, you can limit the scope of these permissions to a specific AWS Region by defining the region in the policy's Resource ARN.

3. Select the **Amazon SNS** tab on the Push Providers page.

      ![Configure Amazon SNS]({{base_path}}/assets/img/guides/mfa/push/push-provider-configure-sns.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Enter the **AWS Access Key ID**, **AWS Secret Access Key**, and **AWS Region** of the IAM user you created.

5. Add the platform application ARN for each platform you created:

    1. Select the platform from the **Select Platform** dropdown.
    2. Paste the platform application ARN in the text field.
    3. Click **+ Add**.
    4. Repeat for each platform.

      ![Configure Amazon SNS Platform ARNs]({{base_path}}/assets/img/guides/mfa/push/push-provider-configure-sns-platforms.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

6. Click **Update** to save your changes.

!!! note
    Choose an **AWS region** where Amazon SNS is available and geographically close to **your {{ product_name }}** deployment. This reduces latency between {{ product_name }} and Amazon SNS.
    Because Amazon SNS acts as a push notification hub and the platform, such as FCM or APNs, delivers the final notification to the device, choosing a region close to your user base does not provide a significant latency advantage.

## Configure the default push provider

When a device does not specify a push provider in its registration request, {{ product_name }} registers the device with the default push provider. This is useful for maintaining backward compatibility with older versions of your authenticator application that do not include provider information in the registration payload.

To set a provider as the default:

1. Select the tab of the provider you want to set as the default.

2. Enable the **Default** toggle.

      ![Configure Default Push Provider]({{base_path}}/assets/img/guides/mfa/push/push-default-toggle.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! important
    Amazon SNS requires additional metadata, such as the `platform` field, in the registration request. For more information, see [Build your own push authenticator app]({{base_path}}/references/tutorials/build-your-own-push-authenticator-app/). Therefore, even if Amazon SNS is configured as the default provider, the registration payload must still include the required metadata.

!!! note
    If you configure **only one provider** and do not explicitly set a default provider, {{ product_name }} uses that provider for legacy registration payloads. In that case, {{ product_name }} registers the device with the configured provider. However, we recommend that you still mark the provider as the default if you need legacy payload support.

{% endif %}
