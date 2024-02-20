# Outbound provisioning

Outbound provisioning is the process of adding users to external applications. You can configure outbound provisioning to occur at different levels.

- [Organization-level outbound provisioning]({{base_path}}/guides/users/outbound-provisioning/provisioning-levels/org-level) - At this level, users are provisioned to external applications at the time a user self registers to {{product_name}} or when an administrator adds a user account from the {{product_name}} Console.

- [IdP-level outbound provisioning]({{base_path}}/guides/users/outbound-provisioning/provisioning-levels/idp-level) - At this level, users are provisioned to external applications at the time a user logs in to an application using a [connection]({{base_path}}/guides/authentication/federated-login).

!!! note "Role-based provisioning"

    In addition to the above provisioning levels, you may provision users based on their assigned roles using [role-based provisioning]({{base_path}}/guides/users/outbound-provisioning/role-based-provisioning).

{{product_name}} supports provisioning users to the following outbound connectors.

- [Google]({{base_path}}/guides/users/outbound-provisioning/provisioning-connectors/google)
- [Salesforce]({{base_path}}/guides/users/outbound-provisioning/provisioning-connectors/salesforce)
- [SCIM2]({{base_path}}/guides/users/outbound-provisioning/provisioning-connectors/scim2)

When configuring a [Salesforce]({{base_path}}/guides/users/outbound-provisioning/provisioning-connectors/salesforce) or a [Google]({{base_path}}/guides/users/outbound-provisioning/provisioning-connectors/google) outbound connector, you can configure [provisioning-patterns]({base_path}). Provisioning patterns is a convenient way to set the username of a user so as to overcome scenarios such as provisioning users with same usernames belonging to different user stores in {{product_name}}.



