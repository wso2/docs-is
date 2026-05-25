# Provisioning patterns

{{product_name}} uses provisioning patterns to build the username of the user account when provisioning users to [Google]({{base_path}}/guides/users/outbound-provisioning/outbound-connectors/google) and [Salesforce]({{base_path}}/guides/users/outbound-provisioning/outbound-connectors/salesforce).

Consider two users with the same username onboarded to different user stores in {{product_name}}. During provisioning, an outbound connector may not allow duplicate usernames. Provisioning patterns resolve this limitation by using the following four attributes to create the user ID.

- Username - UN
- User Domain - UD
- Tenant Domain - TD
- Identity Provider - IDP

You have the option to configure the **provisioning pattern** and the **provisioning separator**: the character that separates the different attributes of the provisioning pattern.

!!! tip "Example"

    For an outbound connector, if you set:

    - Provisioning pattern = `{UD, UN, TD, IDP}`
    - Provisioning separator = `-` (hyphen)

    {{product_name}} provisions a user created with the username `user@provisioning.com` in the `primary` user store of the `super` tenant to the external system with this username:

    ```bash
    primary-user@provisioning.com-carbon.super-salesforce
    ```
