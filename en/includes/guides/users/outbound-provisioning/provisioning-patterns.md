# Provisioning Patterns

{{product_name}} uses provisioning patterns to build the username of the user account that will be provisioned in an external Identity Provider (IdP).

Take the example of two users having the same username being onboarded to two different user stores in {{product_name}}. During provisioning, the external IdP will not allow two users to have the same username. Provisioning patterns overcome this limitation by using the following four attributes to create the user ID.

- Username - UN

- User Domain -UD

- Tenant Domain -TD

- Identity Provider -IDP

When configuring [Salesforce]({{base_path}}/guides/users/outbound-provisioning/salesforce) and [Google]({{base_path}}/guides/users/outbound-provisioning/google) outbound provisioning connectors, you have the option to configure the **provisioning pattern** and the **provisioning separator**: the character that separates the different attributes of the provisioning pattern.

!!! tip

    If for an outbound connector

    - Provisioning pattern = `{UD, UN, TD, IDP}`

    - Provisioning separator =  `-` (hyphen)

    a user created with the username `user@provisioning.com`, in the `primary` userstore of the `super` tenant, the  user will be provisioned to an identity provider named `salesforce`, with the username,

    ```bash
    primary-user@provisioning.com-carbon.super-salesforce
    ```
