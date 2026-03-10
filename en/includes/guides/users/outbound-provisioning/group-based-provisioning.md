# Configure group-based outbound provisioning

This guide explains how to automatically provision users to an external system based on their group membership. With group-based provisioning, you control user access to external applications by assigning users to specific groups in your organization.

When group-based outbound provisioning is enabled, users in the specified group will be provisioned to the external system. When a user is added to the group, the user is automatically provisioned to the provisioning target. Conversely, when a user is removed from the group, the user is deprovisioned from the external system.

Follow the steps given below to configure group-based provisioning in {{product_name}}.

## Prerequisites

{% if product_name == "Asgardeo" or is_version > "7.2.0" %}
Before you begin, ensure you have set up outbound provisioning at the [organization level]({{base_path}}/guides/users/outbound-provisioning/provisioning-levels/org-level) or [application level]({{base_path}}/guides/users/outbound-provisioning/provisioning-levels/application-level).
{% else %}
Before you begin, ensure you have enabled [organization-level outbound provisioning]({{base_path}}/guides/users/outbound-provisioning/provisioning-levels/org-level).
{% endif %}

## Enable group-based provisioning

1. On the {{product_name}} Console, go to **Connections**.
2. Select the connection in which you configured the outbound connector and navigate to its **Outbound Provisioning** tab.
3. Select the required groups from the dropdown. 

    ![group-based provisioning]({{base_path}}/assets/img/guides/outbound-provisioning/outbound-provisioning.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Update** to save the changes.

## Try it out

1. On the {{product_name}} Console, [create a user]({{base_path}}/guides/users/manage-users/#onboard-single-user).
2. [Assign the created user to a group]({{base_path}}/guides/users/manage-groups/#assign-users-to-a-group) that you specified for outbound provisioning. The user will be provisioned to the external system automatically.
3. Remove the user from the group. The user will be deprovisioned from the external system automatically.
