# Configure device registration

Before {{product_name}} can assert anything about a device, the device has to be registered. Registration links a device to a user account and establishes the key the device uses to identify itself afterwards.

Devices are registered through the **Device Registration** step of a flow you design in the [Flow Builder]({{base_path}}/guides/flows/build-a-flow/). The step is available in the following flows:

- [Self registration]({{base_path}}/guides/flows/self-registration/) - The user signs themselves up and registers their device as part of creating the account, so the user has a registered device from their first sign-in.

- [Invited user registration]({{base_path}}/guides/flows/invited-user-registration/) - An administrator invites the user, and the user registers their device while accepting the invitation and setting up the account.

## Before you begin

{% if product_name == "WSO2 Identity Server" %}
- [Enable device management]({{base_path}}/guides/device-management/#enable-device-management). The **Device Registration** step and the **Basic + Device Registration** template appear in the Flow Builder only when the registration executor is enabled.

{% endif %}

- If you want to allow only compliant devices, [create a device assurance policy]({{base_path}}/guides/device-management/device-assurance-policies/#create-a-policy).

- Make sure your application can register a device. A native application registers the device directly while it runs the flow. See [Integrate device management in your app]({{base_path}}/guides/device-management/integrate-device-management-in-your-app/).

## How the step works

When the flow reaches the **Device Registration** step, {{product_name}} issues a one-time challenge. The application on the device signs the challenge with a key that it generates and keeps on the device, and sends the public key and the signature back. {{product_name}} verifies the signature and, if a policy is set on the step, evaluates the policy against the device attributes the application reports. A device that doesn't comply with the policy is refused, and the user sees which conditions failed.

The device is registered to the user only when the whole flow completes successfully.

!!! note "An authentication step must come first"
    The **Device Registration** step must come after a step that authenticates the user, such as an **Email OTP View**, **SMS OTP View**, **Magic Link View**, or **Passkey View**, or a sign-up with a social connection. This makes sure the device is linked to a user who has proven control of the account. The Flow Builder shows the following error when you save a flow that doesn't meet this requirement: `Device registration needs an authentication step, such as Email OTP, SMS OTP or Passkey, before it in the flow.`

## Add device registration to self-registration

You can start from the **Basic + Device Registration** template, or add the step to an existing flow.

### Use the template

The **Basic + Device Registration** template collects the user's details, verifies the email address, and registers the user's device.

1. On the {{product_name}} Console, go to **Flows**.

2. Click the **Self Registration** card.

3. Under **Starter Templates**, click the `+` icon next to **Basic + Device Registration** to load it onto the canvas.

    <!-- TODO: add screenshot - Basic + Device Registration template on the Flow Builder canvas -->

4. Optionally, [attach a device assurance policy](#attach-a-device-assurance-policy) to the **Device Registration** step.

5. Click **Save Draft**, and turn the toggle on the top-right corner **ON** to publish the flow.

### Add the step to an existing flow

1. On the {{product_name}} Console, go to **Flows** and click the **Self Registration** card.

2. From the **Steps** panel, drag and drop a **Device Registration** step onto the canvas.

3. Connect the step after an authentication step. For example, delete the connection from the **Email OTP View** to the **End** node, draw a connection from the **Email OTP View** to the **Device Registration** step, and then from the **Device Registration** step to the **End** node.

4. Optionally, [attach a device assurance policy](#attach-a-device-assurance-policy) to the step.

5. Click **Save Draft**, and turn the toggle on the top-right corner **ON** to publish the flow.

## Add device registration to invited user registration

1. On the {{product_name}} Console, go to **Flows** and click the **Invited User Registration** card.

2. From the **Steps** panel, drag and drop a **Device Registration** step onto the canvas.

3. Connect the step after an authentication step, such as an **Email OTP View**, **SMS OTP View**, or **Passkey View**. If the flow doesn't have one yet, add it from the **Steps** panel and place it before the **Device Registration** step.

4. Optionally, [attach a device assurance policy](#attach-a-device-assurance-policy) to the step.

5. Click **Save Draft**, and turn the toggle on the top-right corner **ON** to publish the flow.

## Attach a device assurance policy

Any flow can optionally enforce a [device assurance policy]({{base_path}}/guides/device-management/device-assurance-policies/) at registration time, so that non-compliant devices are refused at the point of registration rather than allowed in and blocked later.

1. In the Flow Builder, click the **Device Registration** step on the canvas.

2. In the properties panel on the right, select a policy from the **Device policy** list.

    <!-- TODO: add screenshot - Device Registration step properties with the Device policy list -->

3. Click **Save Draft**.

If you leave **Device policy** empty, any device can be registered. The device is identified, but nothing is asserted about how secure it is.

!!! tip
    Enforcing at registration is worth doing even when you also [enforce at login]({{base_path}}/guides/device-management/enforce-device-policy-at-login/). It gives the user a clear failure at a moment when they are already setting something up and expecting to follow instructions, rather than when they are trying to sign in to get work done.

## Troubleshooting

The following errors can occur at the **Device Registration** step.

<table>
    <thead>
        <tr>
            <th>Error code</th>
            <th>Cause</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>DR-60002</code></td>
            <td>The device signature is invalid. The application must sign the challenge from the current step with the private key that matches the public key it sends.</td>
        </tr>
        <tr>
            <td><code>DR-60004</code></td>
            <td>The device doesn't comply with the policy set on the step. The error lists the attributes that failed.</td>
        </tr>
        <tr>
            <td><code>DR-60005</code></td>
            <td>A policy is set on the step, but the application didn't send device data.</td>
        </tr>
        <tr>
            <td><code>DR-60006</code></td>
            <td>The user wasn't verified by an authentication step before the <b>Device Registration</b> step. Add an authentication step before it.</td>
        </tr>
        <tr>
            <td><code>DPM-60010</code></td>
            <td>The policy set on the step doesn't exist, for example because it was deleted. Select another policy on the step.</td>
        </tr>
    </tbody>
</table>
