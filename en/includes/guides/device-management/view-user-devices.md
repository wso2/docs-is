# Manage the devices of a user

As an administrator, you can review, rename, and delete the devices registered to a user account from the {{product_name}} Console.

{% if product_name == "WSO2 Identity Server" %}
!!! note
    The **Devices** tab is available only when the device management APIs are enabled. See [Enable device management]({{base_path}}/guides/device-management/#enable-device-management).

{% endif %}

## View the devices of a user

To view the devices registered to a user:

1. On the {{product_name}} Console, go to **User Management** > **Users**.

2. Select a user and click **Edit**.

3. Go to the **Devices** tab.

    <!-- TODO: add screenshot - Devices tab of a user -->

The tab lists the devices registered to the user with the following details:

- **Device** - The name of the device, with the device model below it.
- **Status** - **Active** or **Inactive**. Only an active device can be used to sign in with device assurance.
- **Registered On** - The time the device was registered.

Use the tab to confirm that a user has registered a device, or to see how many devices a user has registered.

## Rename a device

1. On the **Devices** tab of the user, click the pencil icon next to the device.

2. Enter the new name in **Device Name** and click **Update**.

## Delete a device

Delete a device when it's lost, replaced, or no longer used by the user.

1. On the **Devices** tab of the user, click the trash icon next to the device.

2. Select the checkbox to confirm your action and click **Confirm**.

The device can no longer present itself at sign-in. The user needs to register the device again to use it for device assurance.

!!! note
    Users can also view and manage their own devices from the My Account portal. See [Manage registered devices]({{base_path}}/guides/user-self-service/manage-registered-devices/).

## Manage devices using the API

You can also list, view, rename, and delete devices with the [Device management API]({{base_path}}/apis/device-management-rest-api/). To list the devices of a specific user, call `GET /api/server/v1/devices?userId=<user-id>`.
