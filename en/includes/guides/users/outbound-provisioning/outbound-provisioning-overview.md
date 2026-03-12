# Outbound provisioning

Outbound provisioning automatically provisions user accounts from {{product_name}} to external systems. When enabled, user lifecycle events such as creation, updates, and deletion are synchronized in real-time with connected applications.

## Provisioning levels

{{product_name}} lets you configure outbound provisioning at the following levels:

{% if product_name == "Asgardeo" or is_version > "7.2.0" %}
- [Organization-level]({{base_path}}/guides/users/outbound-provisioning/provisioning-levels/org-level): Organization-level outbound provisioning acts as the default provisioner for all applications. You can override this by configuring an **application-level** outbound provisioner. With organization-level outbound provisioning, users are automatically provisioned to external systems when:
    - a user is provisioned in {{product_name}} over an API.
    - an administrator onboards a user from the {{product_name}} Console.
    - a user self-signs up from a {{product_name}} login page.
    - a user is JIT provisioned in {{product_name}}.

- [Application-level]({{base_path}}/guides/users/outbound-provisioning/provisioning-levels/application-level): Application-level outbound provisioning is specific to an individual application. If an application does not have its own outbound provisioner configured, it defaults to the organization-level outbound provisioner. When application-level provisioning is enabled, users are automatically provisioned to the external system when:
    - a user is created using a token retrieved by the application.
    - a user is JIT provisioned through the application.
{% else %}
- [Organization-level]({{base_path}}/guides/users/outbound-provisioning/provisioning-levels/org-level): Users are automatically provisioned to the external system when:
    - a user is provisioned in {{product_name}} over an API.
    - an administrator onboards a user from the {{product_name}} Console.
    - a user self-signs up from a {{product_name}} login page.
    - a user is JIT provisioned in {{product_name}}.
{% endif %}

{% if product_name == "Asgardeo" or is_version > "7.2.0" %}
## Group-based provisioning

In addition to provisioning levels, you can refine your provisioning criteria by managing which users are provisioned based on their assigned groups. Group-based provisioning can be applied alongside both organization-level and application-level provisioning to further filter which users are provisioned based on group membership.

Learn more about [group-based provisioning]({{base_path}}/guides/users/outbound-provisioning/group-based-provisioning).
{% else %}
## Role-based provisioning

In addition to provisioning levels, you can refine your provisioning criteria by managing which users are provisioned based on their assigned roles.

Learn more about [role-based provisioning]({{base_path}}/guides/users/outbound-provisioning/role-based-provisioning).
{% endif %}

## Outbound connectors

{{product_name}} supports provisioning users via the following outbound connectors:

{% if product_name == "Asgardeo" %}
- [SCIM2]({{base_path}}/guides/users/outbound-provisioning/outbound-connectors/scim2)
{% else %}
- [Google]({{base_path}}/guides/users/outbound-provisioning/outbound-connectors/google)
- [Salesforce]({{base_path}}/guides/users/outbound-provisioning/outbound-connectors/salesforce)
- [SCIM2]({{base_path}}/guides/users/outbound-provisioning/outbound-connectors/scim2)
{% endif %}
