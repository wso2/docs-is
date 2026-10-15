# Enforce a device policy at login

Registration decides whether a device is allowed to be registered. Login decides whether a device is allowed in today. These are separate checks on purpose. A phone that was compliant when it registered six months ago may have been rooted since, or may have fallen behind on operating system updates.

Login enforcement is done through a [conditional authentication]({{base_path}}/guides/authentication/conditional-auth/) script on the sign-in flow of the application. The script has access to the data reported by the device and can decide what to do with it: allow the sign-in, block it, or step up to an additional factor.

## Enforcement patterns

Because the decision sits in a script, you can be more nuanced than a simple pass or fail. The following patterns are common:

- **Hard block** - The device is non-compliant, so refuse the sign-in and tell the user what to fix.

- **Step up** - The device is non-compliant, so require an additional factor rather than refusing outright.

- **Sensitive applications only** - Enforce the policy on the finance application but not on the cafeteria menu application.

- **Grace period** - Warn users for a period before enforcing, so they have time to bring devices into line.

## Add the script

To enforce a policy on the login flow of an application:

1. On the {{product_name}} Console, click **Applications**.

2. Select the relevant application and go to its **Login Flow** tab.

3. Add the following script, replacing `Main Policy` with the name of your [device assurance policy]({{base_path}}/guides/device-management/device-assurance-policies/).

    ```js
    var onLoginRequest = function(context) {
        executeStep(1, {
            onSuccess: function(context) {
                var failedFields = isDevicePolicyCompliant(context, "Main Policy");
                if (failedFields) {
                    fail({
                        "errorCode": "DEVICE_NON_COMPLIANT",
                        "errorMessage": "Device policy failed for: " + failedFields
                    });
                }
            }
        });
    };
    ```

4. Click **Update** to confirm.

## How it works

`isDevicePolicyCompliant(context, policyName)` evaluates the named policy against the device that is making the request and returns the fields that failed. When the device satisfies every condition in the rule for its platform, the function returns nothing and the sign-in proceeds.

The example above passes the failed fields into the error message, so the user is told what to fix rather than being refused without explanation. To step up instead of blocking, call `executeStep` for an additional factor in place of `fail`.

!!! note
    The policy name in the script must match the name of the policy exactly. Since a policy name cannot be changed after creation, the reference stays valid once you have set it.
