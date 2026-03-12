# Configure group-based outbound provisioning

Group-based provisioning allows you to automatically provision users to external systems when they are added to a group and automatically deprovision when they are removed from a group. This guide explains how to configure group-based provisioning in {{product_name}}.

## Prerequisites

{% if product_name == "Asgardeo" or is_version > "7.2.0" %}
Before you begin, ensure you have [set up outbound provisioning]({{base_path}}/guides/users/outbound-provisioning/setup-outbound-provisioning) at the organization or application level.
{% else %}
Before you begin, ensure you have [set up outbound provisioning]({{base_path}}/guides/users/outbound-provisioning/setup-outbound-provisioning) at the organization level.
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
