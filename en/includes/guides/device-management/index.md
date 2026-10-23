# Device management

Device management lets you tie a user's account to the specific devices they use, and decide whether a device is trusted enough to be allowed in. A device registers itself with {{product_name}} once, and from then on it can prove that it is the same device on every request.

On top of that, you can define device assurance policies that check the security posture of a device — whether it is rooted, whether the screen is locked, whether the disk is encrypted — and block sign-in when the device does not meet your requirements.

Device management has two halves, and it helps to keep them separate:

- **Registration** - How a device first becomes known to {{product_name}} and gets linked to a user.

- **Assurance** - How you check, on every sign-in, that the device still meets your security requirements.

!!! note "Before you begin"
    Device registration is only supported in [app-native authentication]({{base_path}}/guides/authentication/app-native-authentication/). Your users must sign in through a native application rather than through a browser redirect. See [Configure device registration]({{base_path}}/guides/device-management/configure-device-registration/) to understand what this means for your rollout.

## Explore device management

The guides below start with policies, because a policy is the thing you reference everywhere else.

- [Device assurance policies]({{base_path}}/guides/device-management/device-assurance-policies/) - Define the conditions a device must meet, one rule per platform.

- [Device attributes]({{base_path}}/guides/device-management/device-attributes/) - Look up the attributes available on each platform and the values they can take.

- [Device attestation]({{base_path}}/guides/device-management/device-attestation/) - Verify that a device is genuine using the attestation services of Google and Apple.

- [Enforce a device policy at login]({{base_path}}/guides/device-management/enforce-device-policy-at-login/) - Check device posture on every sign-in with an adaptive authentication script.

- [Configure device registration]({{base_path}}/guides/device-management/configure-device-registration/) - Enroll devices through self-registration, invited user registration, or a dedicated registration flow.

- [View the devices of a user]({{base_path}}/guides/device-management/view-user-devices/) - Review the devices registered against a user account.
