# Device assurance policies

A device assurance policy is a named set of conditions that a device must meet. You define the policy once and then reference it by name in two places: at [registration time]({{base_path}}/guides/device-management/configure-device-registration/) and at [login time]({{base_path}}/guides/device-management/enforce-device-policy-at-login/).

A policy is made up of one rule per platform. You do not write a single rule that covers every operating system. Instead, you write an Android rule, an iOS rule, a macOS rule, and a Windows rule, and {{product_name}} evaluates each one only against devices of that platform.

This design exists because the security attributes of an Android phone and a Windows laptop do not overlap. Asking a Windows machine whether it is jailbroken is meaningless.

## How a policy is structured

The following example shows a policy named `Corporate Device Policy` with a rule for each of the four platforms.

```text
Policy: "Corporate Device Policy"
 ├── android → rule: isRooted equals false AND lockScreen equals true AND diskEncryption equals true
 ├── ios     → rule: jailbreak equals false AND passcode equals true
 ├── macos   → rule: diskEncryption equals true AND secureEnclave equals true
 └── windows → rule: trustedPlatformModule equals true AND windowsHello equals true
```

When a device presents itself, {{product_name}} reads its `platform` attribute, picks the matching rule, and evaluates only that rule. If the device reports a platform that has no rule, no condition applies to it and the device passes.

!!! warning
    Leaving a platform out of a policy means devices on that platform are never checked. Add a rule for every platform you intend to enforce.

## Create a policy

Policies are created and managed from the {{product_name}} Console. Each policy needs the following:

<table>
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><b>Name</b></td>
            <td>A name that is unique within the organization. This is the name you reference from the registration flow and from the adaptive authentication script, so pick something stable. The name cannot be changed after you create the policy.</td>
        </tr>
        <tr>
            <td><b>Rules</b></td>
            <td>One rule per platform you want to cover. Leave a platform out entirely if you do not want to enforce anything on it.</td>
        </tr>
    </tbody>
</table>

When you build a rule, the Console offers only the attributes that apply to the platform whose rule you are editing. For the full set, see [Device attributes]({{base_path}}/guides/device-management/device-attributes/).
