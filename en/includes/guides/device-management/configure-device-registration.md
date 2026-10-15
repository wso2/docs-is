# Configure device registration

Before {{product_name}} can assert anything about a device, the device has to be registered. Registration links a device to a user account and establishes the credential the device uses to identify itself afterwards.

## App-native authentication is required

Registration requires the device to generate a cryptographic key pair, hold the private key in the secure hardware of the device, and sign a challenge with it. Only a native mobile or desktop application can do that. A browser-based redirect sign-in has no access to the key store of the device, so device registration cannot be offered in that case.

In practice, your application must be a native application using [app-native authentication]({{base_path}}/guides/authentication/app-native-authentication/) before any of this applies. Users who sign in through a standard browser redirect do not see a device registration step and cannot be enrolled.

## Registration flows

A device can be registered through three different flows. Which one you use depends on when in the lifecycle of the user you want the device enrolled. All three run inside app-native authentication.

### Self-registration

The user signs themselves up and registers their device as part of creating their account. Registration happens at the same moment the account is created, so the user has a trusted device from their first sign-in.

Use this when users onboard themselves through a public sign-up page. See [Self registration]({{base_path}}/guides/flows/self-registration/).

### Invited user registration

An administrator invites the user, the user accepts the invitation, and the device is registered as part of accepting it. The account already exists, and the invitation flow completes the setup, including enrolling the device.

Use this when access is granted by an administrator rather than requested by the user, which is the usual pattern inside an organization. See [Invited user registration]({{base_path}}/guides/flows/invited-user-registration/).

### Dedicated device registration flow

A standalone flow whose only purpose is registering a device against an account that already exists. The user authenticates as they normally would, then goes through device registration on its own.

Use this for the cases the other two flows do not cover, which in practice is most of the ongoing work:

- A user who already had an account before device assurance was introduced.

- A user who has replaced their phone.

- A user who needs a second device, such as a tablet alongside a phone, or a work laptop alongside both.

Most organizations end up using this flow far more than the other two once the initial rollout is done.

## Attach a policy to registration

Any of the three flows can optionally enforce a [device assurance policy]({{base_path}}/guides/device-management/device-assurance-policies/) at registration time. Set the policy name on the device registration step in the flow, and non-compliant devices are refused at the point of registration rather than allowed in and blocked later.

If you leave the policy name unset, the device is registered without any posture check. The device is identified, but nothing is asserted about how secure it is.

!!! tip
    Enforcing at registration is worth doing even when you also [enforce at login]({{base_path}}/guides/device-management/enforce-device-policy-at-login/). It gives the user a clear failure at a moment when they are already setting something up and expecting to follow instructions, rather than at the start of a working day when they are trying to get to work.
