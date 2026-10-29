# Enforce a device policy at login

Registration decides whether a device is allowed to be registered. Login decides whether a device is allowed in today. These are separate checks on purpose. A phone that was compliant when it registered six months ago may have been rooted since, or may have fallen behind on operating system updates.

Login enforcement is done through a [conditional authentication]({{base_path}}/guides/authentication/conditional-auth/) script on the sign-in flow of the application. The script evaluates a [device assurance policy]({{base_path}}/guides/device-management/device-assurance-policies/) against the data reported by the device and decides what to do with the result: allow the sign-in, block it, or step up to an additional factor.

## Before you begin

{% if product_name == "WSO2 Identity Server" %}
- [Enable device management]({{base_path}}/guides/device-management/#enable-device-management) and [create a device assurance policy]({{base_path}}/guides/device-management/device-assurance-policies/#create-a-policy).
{% else %}
- [Create a device assurance policy]({{base_path}}/guides/device-management/device-assurance-policies/#create-a-policy).
{% endif %}

- Make sure your users have [registered their devices]({{base_path}}/guides/device-management/configure-device-registration/).

- Make sure your application sends a device token when it signs the user in. See [Send a device token at login]({{base_path}}/guides/device-management/integrate-device-management-in-your-app/#send-a-device-token-at-login).

## How the device presents itself

When the application starts a sign-in, it sends a short-lived device token signed with the key of the registered device:

- In the `X-Device-Token` header, when the application uses [app-native authentication]({{base_path}}/guides/authentication/app-native-authentication/).
- In the `device_token` parameter of the authorization request, when the application uses a redirect-based sign-in.

{{product_name}} identifies the registered device from the token, verifies the signature with the device's public key, and checks that the token is recent and hasn't been used before. If the token is valid and the device is **Active**, the device attributes carried in the token become available to the script. Otherwise, the sign-in continues without device data, and a policy evaluation reports that the device data is unavailable.

## Enforcement patterns

Because the decision sits in a script, you can be more nuanced than a simple pass or fail. The following patterns are common:

- **Hard block** - The device is non-compliant, so refuse the sign-in and tell the user what to fix.

- **Step up** - The device is non-compliant, so require an additional factor rather than refusing outright.

- **Sensitive applications only** - Add the script only to the applications that need it, for example a finance application but not a cafeteria menu application.

- **Grace period** - Log or warn about non-compliant devices for a period before enforcing, so users have time to bring their devices into line.

## Add the script

To enforce a policy on the login flow of an application:

1. On the {{product_name}} Console, go to **Applications**.

2. Select the relevant application and go to its **Login Flow** tab.

3. Add the following script in the script editor, replacing `<policy-id>` with the ID of your [device assurance policy]({{base_path}}/guides/device-management/device-assurance-policies/). To find the ID, open the policy in the Console and copy the last part of the URL.

    ```js
    var policyId = "<policy-id>";

    var onLoginRequest = function(context) {
        executeStep(1, {
            onSuccess: function(context) {
                var result = evaluateDevicePolicy(context, policyId);
                if (!result.compliant) {
                    var reason;
                    if (result.status == "NON_COMPLIANT") {
                        reason = "Device does not meet the policy: "
                            + Array.prototype.join.call(result.failedFields, ", ");
                    } else if (result.status == "INCOMPLETE_DEVICE_DATA") {
                        reason = "Device did not report: "
                            + Array.prototype.join.call(result.missingFields, ", ");
                    } else {
                        reason = "Device could not be verified: " + result.errorCode;
                    }
                    fail({
                        "errorCode": "device_non_compliant",
                        "errorMessage": reason
                    });
                }
            }
        });
    };
    ```

4. Click **Update** to confirm.

To step up instead of blocking, call `executeStep` for an additional factor in place of `fail`. For example, `executeStep(2);` where step 2 is a TOTP or passkey step.

## How it works

`evaluateDevicePolicy(context, policyId)` evaluates the policy with the given ID against the device that is making the request and returns a result object with the following properties.

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>compliant</code></td>
            <td><code>true</code> only when the status is <code>COMPLIANT</code>.</td>
        </tr>
        <tr>
            <td><code>status</code></td>
            <td>One of <code>COMPLIANT</code>, <code>NON_COMPLIANT</code>, <code>INCOMPLETE_DEVICE_DATA</code>, or <code>ERROR</code>. See <a href="{{base_path}}/guides/device-management/device-assurance-policies/#how-a-policy-is-evaluated">How a policy is evaluated</a>.</td>
        </tr>
        <tr>
            <td><code>failedFields</code></td>
            <td>The attributes whose values don't meet the rule of the device's platform.</td>
        </tr>
        <tr>
            <td><code>missingFields</code></td>
            <td>The attributes that the rule needs but the device didn't report.</td>
        </tr>
        <tr>
            <td><code>errorCode</code></td>
            <td>Set only when the status is <code>ERROR</code>:
                <ul>
                    <li><code>device_data_unavailable</code> - The request carried no valid device token, or the device isn't registered or isn't active.</li>
                    <li><code>policy_not_found</code> - No policy exists with the given ID.</li>
                    <li><code>policy_error</code> - The policy couldn't be evaluated, for example because the device data is invalid.</li>
                    <li><code>evaluation_error</code> - An unexpected error occurred during evaluation.</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

The example above passes the failed or missing attributes into the error message, so the user is told what to fix rather than being refused without explanation.

The device attributes are also available to the script as `context.deviceData`, if you want to make decisions on individual attributes, such as `context.deviceData.platform`.

!!! note
    The script references the policy by its ID, not its name. Policy IDs are unique to each organization, so update the ID if you copy the script to another organization or environment.

For the full list of functions available to conditional authentication scripts, see the [Conditional authentication API reference]({{base_path}}/references/conditional-auth/api-reference/#evaluate-device-policy).
