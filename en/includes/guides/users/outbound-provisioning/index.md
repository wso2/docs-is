# Outbound provisioning

Outbound provisioning is the process of automatically provisioning user accounts to external systems.

## Provisioning levels

{{product_name}} lets you configure outbound provisioning to occur at the following levels.

- [Organization-level]({{base_path}}/guides/users/outbound-provisioning/provisioning-levels/org-level) - Users are automatically provisioned in an outbound connector at the time,
    - a user is provisioned in {{product_name}} over an API.
    - an administrator onboards a user from the {{product_name}} Console.
    - a user self signs up from a {{product_name}} login page.
    - a user is JIT provisioned in {{product_name}}.

- [IdP-level]({{base_path}}/guides/users/outbound-provisioning/provisioning-levels/idp-level) - Users are automatically provisioned in an outbound connector at the time a user uses [federated login]({{base_path}}/guides/authentication/federated-login).

!!! note "Role-based provisioning"

    In addition to the above provisioning levels, you may provision users based on their assigned roles using [role-based provisioning]({{base_path}}/guides/users/outbound-provisioning/role-based-provisioning).

## Outbound connectors

{{product_name}} supports the provisioning of users in the following outbound connectors.

- [Google]({{base_path}}/guides/users/outbound-provisioning/outbound-connectors/google)
- [Salesforce]({{base_path}}/guides/users/outbound-provisioning/outbound-connectors/salesforce)
- [SCIM2]({{base_path}}/guides/users/outbound-provisioning/outbound-connectors/scim2)

!!! note "Provisioning patterns"

    When configuring a [Salesforce]({{base_path}}/guides/users/outbound-provisioning/outbound-connectors/salesforce) or a [Google]({{base_path}}/guides/users/outbound-provisioning/outbound-connectors/google) outbound connector, you can configure [provisioning-patterns]({{base_path}}/guides/users/outbound-provisioning/provisioning-patterns). Provisioning patterns help you to set a unique username for a user when being provisioned in these connectors.



