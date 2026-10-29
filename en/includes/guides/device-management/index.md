# Device management

Device management lets you tie a user's account to the specific devices they use, and decide whether a device is trusted enough to be allowed in. A device registers itself with {{product_name}} once. From then on, it can prove that it is the same registered device whenever it signs in.

On top of that, you can define device assurance policies that check the security posture of a device, such as whether it is rooted, whether the screen is locked, or whether the disk is encrypted, and refuse registration or sign-in when the device does not meet your requirements.

Device management has two halves, and it helps to keep them separate:

- **Registration** - How a device first becomes known to {{product_name}} and gets linked to a user.

- **Assurance** - How you check that the device meets your security requirements, both when it registers and when it signs in.

## Key concepts

The following concepts are used throughout the device management guides.

### Registered device

A registered device is a device that is linked to a user account. During registration, the application on the device generates a key pair, keeps the private key on the device, and sends the public key to {{product_name}}. The device then proves possession of the private key by signing a challenge issued by {{product_name}}.

{{product_name}} stores the following details about each registered device:

- **Device name** - A display name for the device. By default, it is built from the username and the device model, for example `alex's Pixel 8`. Administrators and users can rename a device.

- **Device model** - The hardware model the device reported during registration, if any.

- **Status** - Either **Active** or **Inactive**. Only an active device can present itself at sign-in. An inactive device is treated as if no device information was sent, so a device policy that is enforced at login can't be satisfied by it.

- **Registered on** - The time the device was registered.

A user can have more than one registered device. When a user is deleted, all devices registered to that user are deleted as well.

### Device assurance policy

A [device assurance policy]({{base_path}}/guides/device-management/device-assurance-policies/) is a named set of conditions that a device must meet. A policy has separate rules for each platform: Android, iOS, macOS, and Windows. The conditions are built from [device attributes]({{base_path}}/guides/device-management/device-attributes/) that the device reports, such as `isRooted` or `diskEncryption`, and from [attestation]({{base_path}}/guides/device-management/device-attestation/) verdicts that {{product_name}} obtains from Google or Apple.

The same policy can be used in two places:

- **At registration** - Set the policy on the **Device Registration** step of a registration flow, so that only compliant devices can be registered. See [Configure device registration]({{base_path}}/guides/device-management/configure-device-registration/).

- **At login** - Evaluate the policy in the conditional authentication script of an application, and decide whether to allow the sign-in, block it, or ask for an additional factor. See [Enforce a device policy at login]({{base_path}}/guides/device-management/enforce-device-policy-at-login/).

## How it works

The following steps describe how a device is registered and how it is checked afterwards.

1. **Registration** - The user goes through a [self-registration]({{base_path}}/guides/flows/self-registration/) or [invited user registration]({{base_path}}/guides/flows/invited-user-registration/) flow that includes a **Device Registration** step after an authentication step, such as Email OTP. At that step, {{product_name}} issues a one-time challenge. The application on the device signs the challenge with the device key and, when a policy is set on the step, sends its device attributes in a token signed with the same key. {{product_name}} verifies the signature, evaluates the policy, and registers the device to the user when the flow completes.

2. **Login** - On later sign-ins, the application sends a short-lived device token, signed with the device key, in the `X-Device-Token` header (for [app-native authentication]({{base_path}}/guides/authentication/app-native-authentication/)) or in the `device_token` parameter (for redirect-based sign-in). {{product_name}} identifies the registered device from the token, verifies the signature, and rejects tokens that are expired or have already been used. The device attributes in the token are then available to the conditional authentication script of the application.

!!! note
    Only a native mobile or desktop application can hold a device key and sign with it.

{% if product_name == "WSO2 Identity Server" %}

## Enable device management

Device management is disabled by default. To enable it, add the following configuration to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` directory and restart {{product_name}}.

```toml
[device_management]
disable_apis = false
disable_registration_executor = false
```

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>disable_apis</code></td>
            <td>When set to <code>true</code> (default), the device management and policy management REST APIs are disabled. The Console pages for device assurance policies and user devices use these APIs, so set this to <code>false</code> to manage policies and devices.</td>
        </tr>
        <tr>
            <td><code>disable_registration_executor</code></td>
            <td>When set to <code>true</code> (default), the <b>Device Registration</b> step isn't available in the Flow Builder and the <b>Basic + Device Registration</b> template isn't shown. Set this to <code>false</code> to register devices through registration flows.</td>
        </tr>
    </tbody>
</table>

### Device token cleanup

To prevent replay, {{product_name}} records the identifier (`jti`) of every device token it accepts and rejects any token that is used again. A cleanup task removes expired records periodically. You can change its behavior with the following configuration in the `deployment.toml` file.

```toml
[device_token.cleanup]
enable_expired_jti_cleanup = true
clean_expired_jti_every = "1d"
```

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Default</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>enable_expired_jti_cleanup</code></td>
            <td>Whether the cleanup task runs.</td>
            <td><code>true</code></td>
        </tr>
        <tr>
            <td><code>clean_expired_jti_every</code></td>
            <td>How often the cleanup task runs.</td>
            <td><code>1d</code></td>
        </tr>
    </tbody>
</table>

{% endif %}

## Explore device management

The guides below start with policies, because a policy is the thing you reference everywhere else.

- [Device assurance policies]({{base_path}}/guides/device-management/device-assurance-policies/) - Define the conditions a device must meet, one rule per platform.

- [Device attributes]({{base_path}}/guides/device-management/device-attributes/) - Look up the attributes available on each platform and the values they can take.

- [Device attestation]({{base_path}}/guides/device-management/device-attestation/) - Verify that a device is genuine using the attestation services of Google and Apple.

- [Configure device registration]({{base_path}}/guides/device-management/configure-device-registration/) - Add the device registration step to self-registration and invited user registration flows.

- [Enforce a device policy at login]({{base_path}}/guides/device-management/enforce-device-policy-at-login/) - Check device posture on sign-in with a conditional authentication script.

- [Manage the devices of a user]({{base_path}}/guides/device-management/view-user-devices/) - Review, rename, and delete the devices registered to a user account.

- [Manage registered devices]({{base_path}}/guides/user-self-service/manage-registered-devices/) - Let users view and manage their own devices from the My Account portal.

- [Integrate device management in your app]({{base_path}}/guides/device-management/integrate-device-management-in-your-app/) - Register a device and send device tokens from your native application.

## APIs

You can also manage devices and device assurance policies programmatically.

- [Device management API]({{base_path}}/apis/device-management-rest-api/) - List, view, rename, and delete registered devices.

- [Device management API by user]({{base_path}}/apis/device-management-by-user-rest-api/) - Let the signed-in user list, view, rename, activate or deactivate, and delete their own devices.

- [Policy management API]({{base_path}}/apis/policy-management-rest-api/) - Create, view, update, and delete device assurance policies. Use `DEVICE` as the policy type.
