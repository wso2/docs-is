# Device assurance policies

A device assurance policy is a named set of conditions that a device must meet. You define the policy once and then reference it by name in two places: at [registration time]({{base_path}}/guides/device-management/configure-device-registration/) and at [login time]({{base_path}}/guides/device-management/enforce-device-policy-at-login/).

A policy is made up of one rule per platform. You do not write a single rule that covers every operating system. Instead, you write an Android rule, an iOS rule, a macOS rule, and a Windows rule, and {{product_name}} evaluates each one only against devices of that platform.

This design exists because the security attributes of an Android phone and a Windows laptop do not overlap. Asking a Windows machine whether it is jailbroken is meaningless.

## How a policy is structured

The rule of a platform is made up of one or more condition groups:

- All conditions within a group must be met. They are combined with **And**.

- A device passes the rule when it meets **any** of the groups. Groups are combined with **Or**.

The following example shows a policy named `Corporate Device Policy` with a rule for each of the four platforms. The iOS rule has two groups, so an iOS device passes if it meets either of them.

```text
Policy: "Corporate Device Policy"
 ├── android → isRooted equals false AND lockScreen equals true AND diskEncryption equals true
 ├── ios     → (jailbreak equals false AND passcode equals true AND iosOsVersion greater than 17)
 │             OR (jailbreak equals false AND passcode equals true AND iosIntegrity equals true)
 ├── macos   → diskEncryption equals true AND secureEnclave equals true
 └── windows → trustedPlatformModule equals true AND windowsHello equals true
```

## How a policy is evaluated

When a device presents itself, {{product_name}} reads its `platform` attribute, picks the rule for that platform, and evaluates only that rule. The result is one of the following:

<table>
    <thead>
        <tr>
            <th>Result</th>
            <th>Meaning</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>COMPLIANT</code></td>
            <td>The device meets the rule of its platform, or the policy has no rule for its platform.</td>
        </tr>
        <tr>
            <td><code>NON_COMPLIANT</code></td>
            <td>The device reported the required attributes, but their values don't meet the rule. The attributes that failed are reported.</td>
        </tr>
        <tr>
            <td><code>INCOMPLETE_DEVICE_DATA</code></td>
            <td>The device didn't report one or more attributes that the rule needs, or didn't report its <code>platform</code>. The missing attributes are reported.</td>
        </tr>
    </tbody>
</table>

!!! warning
    If the device reports a platform that has no rule in the policy, no condition applies to it and the device is treated as compliant. Add a rule for every platform you support. If you want to block a platform entirely, enforce this in your conditional authentication script by checking the `platform` attribute, or add a rule for that platform that a device can't meet.

## Create a policy

To create a device assurance policy:

1. On the {{product_name}} Console, go to **Login & Registration**.

2. Under **Policy & Preference Management**, click **Device Assurance**.

    <!-- TODO: add screenshot - Device Assurance card on the Login & Registration page -->

3. Click **New Policy**.

4. In the **General** step, enter the following details and click **Next**.

    <table>
        <thead>
            <tr>
                <th>Field</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><b>Policy Name</b></td>
                <td>A name that is unique within the organization. This is the name you reference from the registration flow and from the conditional authentication script, so pick something stable. The name can't be changed after you create the policy.</td>
            </tr>
            <tr>
                <td><b>Platforms</b></td>
                <td>The platforms this policy applies to: <b>Android</b>, <b>iOS</b>, <b>macOS</b>, or <b>Windows</b>. Select at least one. You define the conditions for each selected platform in the next step.</td>
            </tr>
        </tbody>
    </table>

5. In the **Rules** step, select the tab of each platform and click **Add Rule**. For each condition, select an attribute, an operator, and a value. Use **And** to add a condition to the same group, and **Or** to add a new group. Click **Next** when every selected platform has at least one complete condition.

    <!-- TODO: add screenshot - Rules step of the device assurance policy wizard -->

    The Console offers only the attributes that apply to the platform whose rule you are editing. For the full set, see [Device attributes]({{base_path}}/guides/device-management/device-attributes/).

6. In the **Review** step, check the policy and click **Create**.

The policy is now listed under **Device Assurance Policies** and you can reference it by name from a [registration flow]({{base_path}}/guides/device-management/configure-device-registration/) or a [conditional authentication script]({{base_path}}/guides/device-management/enforce-device-policy-at-login/).

!!! note
{% if product_name == "WSO2 Identity Server" %}
    By default, a group can contain up to 15 conditions and a rule can contain up to 10 groups. To change these limits, add the following configuration to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` directory.

    ```toml
    [rules.device_policy]
    max_expressions_combined_with_and = 15
    max_rules_combined_with_or = 10
    ```
{% else %}
    A group can contain up to 15 conditions and a rule can contain up to 10 groups.
{% endif %}

## Edit a policy

To change the platforms or conditions of a policy:

1. On the {{product_name}} Console, go to **Login & Registration** > **Device Assurance**.

2. Select the policy. Its rules are shown in a separate tab for each platform.

3. Click **Edit**, update the **Platforms** in the **General** step or the conditions in the **Rules** step, and click **Update** in the **Review** step.

The new conditions apply to the next registration or sign-in that evaluates the policy. Devices that are already registered aren't re-evaluated until they sign in.

## Delete a policy

To delete a policy:

1. On the {{product_name}} Console, go to **Login & Registration** > **Device Assurance**.

2. Click the delete icon next to the policy.

3. Select the checkbox to confirm your action and click **Confirm**.

!!! warning
    Flows and conditional authentication scripts that reference a deleted policy can no longer evaluate it. Remove the policy from the **Device Registration** step of your registration flows and from your scripts before you delete it.

## Manage policies using the API

You can also manage device assurance policies with the [Policy management API]({{base_path}}/apis/policy-management-rest-api/). Use `DEVICE` as the policy type, and use the platform (`android`, `ios`, `macos`, or `windows`) as the target of each rule. To list the attributes and operators available for a platform, call `GET /api/server/v1/policies/metadata/rule?type=DEVICE&target=<platform>`.
