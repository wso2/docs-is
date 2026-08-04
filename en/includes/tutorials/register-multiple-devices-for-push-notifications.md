# Register multiple devices for push notifications

{% set s_enable = 2 if is_version is defined else 1 %}
{% set s_register = 3 if is_version is defined else 2 %}
{% set s_signin = 4 if is_version is defined else 3 %}
{% set s_notify = 5 if is_version is defined else 4 %}
{% set s_tryout = 6 if is_version is defined else 5 %}
{% set token_anchor = "oauth-based-authentication" if is_version is defined else "step-3-request-an-access-token" %}
By default, a user can keep only one device registered for push notification based authentication. If the user replaces a phone or loses access to it, the user has to remove the old device before registering a new one.

With multiple device support, a user can keep several devices registered at the same time. When the user signs in, {{ product_name }} sends the push notification to every registered device, and the first device that responds completes the authentication.

In this tutorial, you will:

- Enable multiple device support for push authentication in {{ product_name }}.
- Set the maximum number of devices a user can register.
- Let users register additional devices, either through a self-service interface or during sign-in.
- Notify users by email or by push notification when a new device is registered.

## Prerequisites

- A [push notification provider]({{base_path}}/guides/notification-channels/configure-push-provider/) configured in {{ product_name }}.
- Push notification based login configured for an application. See [Add MFA with push notification]({{base_path}}/guides/authentication/mfa/add-push-auth-login/) or [Add passwordless login with push notification]({{base_path}}/guides/authentication/passwordless-login/add-passwordless-login-with-push-notification/).
- At least two mobile devices with a push authenticator app installed. To build one, see [Build your own push authenticator app]({{base_path}}/references/tutorials/build-your-own-push-authenticator-app/).
- A user account with a push device already registered. If your users register devices through the My Account portal, see [Enroll a push notification device]({{base_path}}/guides/user-self-service/register-push-notification-device/).

## How multi-device push authentication works

Keep the following behaviors in mind before you enable the feature:

- **All devices are notified.** When a user reaches the push authentication step, {{ product_name }} sends the notification to every device the user has registered.
- **The first response wins.** The first device that approves or denies the request decides the outcome. {{ product_name }} rejects responses that arrive later from other devices, and it also rejects a response from a device that was not notified.
- **A device limit applies.** Users can register devices up to the configured maximum. When the limit is reached, further registration attempts are rejected.

{% if is_version is defined %}
## Step 1: Verify the server-level configuration

Multiple device support and device registration notifications are available in {{ product_name }} by default. The following server-level configurations control whether the options appear in the Console and in the My Account portal, and set the upper bound for the device limit.

To change them, add the following section to the `<IS_HOME>/repository/conf/deployment.toml` file and restart the server:

```toml
[push_device_management]
multiple_device_support_enabled = true
device_registration_notifications_enabled = true
max_device_limit_per_user = 10
```

<table>
    <tr>
        <th style="width: 320px;">Property</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>multiple_device_support_enabled</code></td>
        <td>Makes the multiple device settings available in the Console and the My Account portal. Defaults to <code>true</code>. If you set this to <code>false</code>, {{ product_name }} behaves as if only single device registration is supported.</td>
    </tr>
    <tr>
        <td><code>device_registration_notifications_enabled</code></td>
        <td>Makes the device registration notification settings available in the Console. Defaults to <code>true</code>.</td>
    </tr>
    <tr>
        <td><code>max_device_limit_per_user</code></td>
        <td>The highest value an administrator can set as the maximum number of devices per user. Defaults to <code>10</code>.</td>
    </tr>
</table>

!!! note
    These are deployment-wide settings. The per-tenant settings in [Step {{ s_enable }}](#step-{{ s_enable }}-enable-multiple-device-registration) decide whether users can actually register more than one device.
{% endif %}
## Step {{ s_enable }}: Enable multiple device registration

1. On the {{ product_name }} Console, go to **Connections** and select **Push Notification**.

2. Go to the **Settings** tab and scroll to the **Device management settings** section.

3. Select **Allow users to register multiple devices**.

4. In **Maximum number of push devices**, enter the number of devices a user can register. The value must be at least 2{% if is_version is defined %} and at most the `max_device_limit_per_user` value configured in [Step 1](#step-1-verify-the-server-level-configuration){% endif %}.

    ![Device management settings of the Push Notification connection in {{ product_name }}]({{base_path}}/assets/img/guides/mfa/push/push-device-management-settings.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Update**.

<table>
    <tr>
        <th style="width: 320px;">Field</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>Allow users to register multiple devices</code></td>
        <td>When enabled, users can enroll multiple devices for push authentication.</td>
    </tr>
    <tr>
        <td><code>Maximum number of push devices</code></td>
        <td>The maximum number of devices a user can keep registered at the same time.</td>
    </tr>
</table>

!!! note
    When you clear **Allow users to register multiple devices**, the device limit returns to one. Devices that users have already registered are not removed. Users with more devices than the new limit cannot register further devices until they remove the extra ones.

## Step {{ s_register }}: Register additional devices

Users can now register devices up to the configured limit. Registration works through the same interfaces as the first device:

- **The My Account portal** - the self-service portal that ships with {{ product_name }}.
- **Your own application** - any application that calls the [push device endpoints](#manage-the-configurations-using-the-rest-api) of the `/api/users/v1/me/push` API on behalf of the signed-in user.
- **The login flow** - if you enable progressive enrollment for multiple devices, as described in [Step {{ s_signin }}](#step-{{ s_signin }}-allow-users-to-register-additional-devices-during-sign-in).

Regardless of the interface, the registration sequence is the same: the user requests the registration data, scans the QR code with the push authenticator app, and the app completes the registration. {{ product_name }} accepts the new device as long as the user is below the configured limit.

To register a device through the My Account portal:

1. In the user's My Account portal, go to **Security** > **Additional Authentication**.

2. Click the **+** icon next to **Push Authenticator**.

3. Scan the QR code with the push authenticator app on the new device.

4. Click **Verify** to confirm the registration.

    The new device appears in the **Push Authenticator** section along with the devices that are already registered.

    ![Multiple push devices registered for a user in {{ product_name }}]({{base_path}}/assets/img/guides/mfa/push/push-multiple-devices-registered-myaccount.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

Repeat these steps for each device. When the user reaches the configured limit, the **+** icon is disabled and shows the hint `Maximum device limit of <limit> reached`.

![Push device limit reached in {{ product_name }}]({{base_path}}/assets/img/guides/mfa/push/push-device-limit-reached.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note
    The device limit is enforced by the server, not by the portal. If you build your own registration experience, a registration request beyond the limit is rejected with an error, so handle that response in your application. To register another device, the user must first remove one of the existing devices.

## Step {{ s_signin }}: Allow users to register additional devices during sign-in

{{ product_name }} already supports [push notification device progressive enrollment]({{base_path}}/guides/authentication/mfa/add-push-auth-login/#enable-push-notification-device-progressive-enrollment), which lets a user register a device while signing in, instead of registering it beforehand. However, that applies only to a user who has **no** device registered yet. A user who already has a device goes straight to the push notification page and has no way to add another device from there.

**Progressive enrollment for multiple devices extends this to users who already have a device.** With the option enabled, the push notification page also offers to register another device, so users can add one without leaving the login flow.

!!! warning
    A user who has the primary credentials can register a new push device during sign-in. If an attacker obtains those credentials, the attacker could enroll their own device and use it for future authentication attempts. Enable this option only if your use case requires it.

1. On the {{ product_name }} Console, go to **Connections** and select **Push Notification**.

2. Go to the **Settings** tab and scroll to the **Device management settings** section.

3. Select **Enable push notification device progressive enrollment**.

4. Make sure **Allow users to register multiple devices** is also selected.

    **Allow progressive enrollment for multiple devices** appears only when both of these options are enabled.

5. Select **Allow progressive enrollment for multiple devices**.

    {{ product_name }} prompts you to confirm the security risk. Select **I understand the security risk and want to enable this feature** and click **Confirm**.

    ![Enable progressive enrollment for multiple devices in {{ product_name }}]({{base_path}}/assets/img/guides/mfa/push/push-multiple-device-progressive-enrollment.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

6. Click **Update**.

Once enabled, a user who already has a registered device sees a **Register a new device** button on the push notification page during sign-in. The button takes the user to the QR code page, where **Cancel Registration** returns the user to the pending authentication request.

![Register a new device from the push notification page in {{ product_name }}]({{base_path}}/assets/img/guides/mfa/push/push-auth-wait-page-register-new-device.png){: width="400" style="border: 0.3px solid lightgrey;"}

!!! note
    **Allow progressive enrollment for multiple devices** is available only when both **Enable push notification device progressive enrollment** and **Allow users to register multiple devices** are enabled. Turning off either option also turns off this setting.

    The two settings cover different users: **Enable push notification device progressive enrollment** covers users with no device, and **Allow progressive enrollment for multiple devices** covers users who already have one.

## Step {{ s_notify }}: Notify users when a new device is registered

Because users can now keep several devices, it is useful to tell them whenever a new device is added to their account.

1. On the {{ product_name }} Console, go to **Connections** and select **Push Notification**.

2. Go to the **Settings** tab and scroll to the **Device management settings** section.

3. Select **Enable device registration notifications**.

4. Select the delivery channel:

    - **Notify via email** - sends an email to the user. This is the default channel.
    - **Notify via push notification** - sends a push notification to the devices the user has already registered.

    ![Device registration notification channels in {{ product_name }}]({{base_path}}/assets/img/guides/mfa/push/push-device-registration-notification-channels.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Update**.

The email notification uses the `Push Device Registration` email template. To customize it, go to **Email Templates** on the Console. The notification includes the device name, the device model, the registration time, and the IP address of the registration request.

## Step {{ s_tryout }}: Try it out

1. Register two devices for a user, as described in [Step {{ s_register }}](#step-{{ s_register }}-register-additional-devices).

2. Access the application and sign in with the user's username and password.

3. Observe that both devices receive the push notification.

4. Approve the request from one device.

    The user is signed in to the application. The request on the second device is no longer valid.

## Manage the configurations using the REST API

You can also manage these settings with the Configs REST API.

To retrieve the current configuration, [get an access token]({{base_path}}/apis/#{{ token_anchor }}) with the `internal_config_view` scope and run the following cURL command:

```curl
curl -X 'GET' \
'{{base_url}}/api/server/v1/configs/push-device-mgt' \
-H 'Authorization: Bearer <access_token>' \
-H 'Accept: application/json'
```

To update the configuration, [get an access token]({{base_path}}/apis/#{{ token_anchor }}) with the `internal_config_update` scope and run the following cURL command:

```curl
curl -X 'PUT' \
'{{base_url}}/api/server/v1/configs/push-device-mgt' \
-H 'Authorization: Bearer <access_token>' \
-H 'Content-Type: application/json' \
-d '{
    "enableMultipleDeviceEnrollment": true,
    "maximumDeviceLimit": 5,
    "enableDeviceRegistrationNotifications": true,
    "deviceRegistrationNotificationChannels": [
        "EMAIL"
    ]
}'
```

If you build your own registration experience instead of using the My Account portal, use the following endpoints of the `/api/users/v1/me/push` API:

<table>
    <tr>
        <th style="width: 320px;">Endpoint</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>GET /discovery-data</code></td>
        <td>Generates the discovery data for the device registration QR code. Called by your application for the signed-in user.</td>
    </tr>
    <tr>
        <td><code>POST /devices</code></td>
        <td>Registers a device. Called by the push authenticator app after it reads the discovery data. {{ product_name }} rejects the request if the user is already at the device limit.</td>
    </tr>
    <tr>
        <td><code>GET /devices</code></td>
        <td>Lists the devices registered for the user.</td>
    </tr>
    <tr>
        <td><code>DELETE /devices/{deviceId}</code></td>
        <td>Removes a registered device.</td>
    </tr>
    <tr>
        <td><code>POST /devices/{deviceId}/remove</code></td>
        <td>Removes a registered device from the device itself.</td>
    </tr>
</table>

## Troubleshoot

<table>
    <tr>
        <th style="width: 320px;">Symptom</th>
        <th>Cause</th>
    </tr>
    <tr>
        <td>The user sees the error <code>You have reached the maximum number of registered devices. Remove an existing device to enroll a new one.</code></td>
        <td>The user already has the maximum number of devices registered. The user must remove an existing device before registering another one.</td>
    </tr>
    {% if is_version is defined %}<tr>
        <td>The multiple device settings do not appear in the Console.</td>
        <td><code>multiple_device_support_enabled</code> is set to <code>false</code> in the <code>deployment.toml</code> file.</td>
    </tr>{% endif %}
    <tr>
        <td>A registration request is rejected although multiple device registration is enabled.</td>
        <td>The user has reached the configured device limit, or <b>Allow users to register multiple devices</b> is not enabled for the organization. In the My Account portal, this shows as a disabled <b>+</b> icon.</td>
    </tr>
    <tr>
        <td><b>Allow progressive enrollment for multiple devices</b> does not appear in the Console.</td>
        <td><b>Enable push notification device progressive enrollment</b> or <b>Allow users to register multiple devices</b> is not enabled. Both are required.</td>
    </tr>
    <tr>
        <td>The <b>Register a new device</b> button does not appear during sign-in.</td>
        <td><b>Allow progressive enrollment for multiple devices</b> is not enabled, or the user has reached the device limit.</td>
    </tr>
</table>
