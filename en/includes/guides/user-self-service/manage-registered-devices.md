# Manage registered devices

Users can view and manage the devices they have registered with {{product_name}} from the My Account portal. A device is registered when the user completes a registration flow that includes a **Device Registration** step. To learn more, see [Device management]({{base_path}}/guides/device-management/).

{% if product_name == "WSO2 Identity Server" %}
!!! note
    The devices section is available only when device management is enabled. See [Enable device management]({{base_path}}/guides/device-management/#enable-device-management).

{% endif %}

## View registered devices

1. Sign in to the My Account portal.

2. Go to **Security** > **Devices**. This section lists all the devices registered to the user, with the device name, the device model, the status, and the time each device was registered.

    <!-- TODO: add screenshot - Devices section in the My Account portal -->

## Rename a device

Rename a device to make it easier to recognize, for example `Work phone`.

1. In the **Devices** section, click the edit icon next to the device.

2. Enter a new name and click **Update**.

## Deactivate or activate a device

Deactivate a device that you don't want to use for a while, for example when it's temporarily misplaced. An inactive device stays registered to your account, but it can't be used to sign in to applications that check your device.

1. In the **Devices** section, select the device.

2. Click **Deactivate**. The status of the device changes to **Inactive**.

To use the device again, select it and click **Activate**. The status changes back to **Active**.

## Delete a device

Delete a device that is lost, replaced, or no longer used.

1. In the **Devices** section, click the delete icon next to the device.

2. Confirm the deletion.

The device is removed from the account and can no longer be used to sign in to applications that check your device. To use it again, it must be registered again.

!!! tip
    If a device is lost or stolen, delete it rather than deactivating it, and contact your administrator.

## Manage devices from your application

Developers can let users manage their devices from a business application with the [Device management API by user]({{base_path}}/apis/device-management-by-user-rest-api/) (`/api/users/v1/me/devices`). The API lets the signed-in user list their devices, rename a device, change its status between `ACTIVE` and `INACTIVE`, and delete a device. It acts only on the devices of the signed-in user.
