# Outbound provisioning

Outbound provisioning automatically provisions user accounts from {{product_name}} to external systems. When enabled, user lifecycle events—such as creation, updates, and deletion—are synchronized in real-time with connected applications.

## Provisioning levels

{{product_name}} lets you configure outbound provisioning to occur at the following levels:

- [Organization-level]({{base_path}}/guides/users/outbound-provisioning/provisioning-levels/org-level): Users are automatically provisioned to the external system when:
    - a user is provisioned in {{product_name}} over an API.
    - an administrator onboards a user from the {{product_name}} Console.
    - a user self-signs up from a {{product_name}} login page.
    - a user is JIT provisioned in {{product_name}}.

{% if product_name == "Asgardeo" or is_version > "7.2.0" %}
- [Application-level]({{base_path}}/guides/users/outbound-provisioning/provisioning-levels/application-level): Users are automatically provisioned to the external system when they interact with a specific application.

!!! info "Priority of provisioning levels"
    When application-level outbound provisioning is configured for a specific application, it takes priority over the organization-level configuration for that application. If an application does not have its own outbound provisioning configuration, the organization-level configuration is used as the fallback.
{% else %}
- [IdP-level]({{base_path}}/guides/users/outbound-provisioning/provisioning-levels/idp-level): Users are automatically provisioned to the external system when a user authenticates via [federated login]({{base_path}}/guides/authentication/federated-login).
{% endif %}

{% if product_name == "Asgardeo" or is_version > "7.2.0" %}
!!! note "Group-based provisioning"
    In addition to the above provisioning levels, you can refine your provisioning criteria by managing users based on their assigned groups using [group-based provisioning]({{base_path}}/guides/users/outbound-provisioning/group-based-provisioning).
{% else %}
!!! note "Role-based provisioning"
    In addition to the above provisioning levels, you can refine your provisioning criteria by managing users based on their assigned roles using [role-based provisioning]({{base_path}}/guides/users/outbound-provisioning/role-based-provisioning).
{% endif %}

## Outbound connectors

{{product_name}} supports provisioning users via the following outbound connectors:

- [Google]({{base_path}}/guides/users/outbound-provisioning/outbound-connectors/google)
- [Salesforce]({{base_path}}/guides/users/outbound-provisioning/outbound-connectors/salesforce)
- [SCIM2]({{base_path}}/guides/users/outbound-provisioning/outbound-connectors/scim2)

!!! note "Provisioning patterns"
    When configuring the [Salesforce]({{base_path}}/guides/users/outbound-provisioning/outbound-connectors/salesforce) or [Google]({{base_path}}/guides/users/outbound-provisioning/outbound-connectors/google) outbound connector, you can define [provisioning patterns]({{base_path}}/guides/users/outbound-provisioning/provisioning-patterns). Provisioning patterns help you enforce a unique username strategy when syncing accounts to these external environments.



