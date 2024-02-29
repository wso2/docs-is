# Configure role-based outbound provisioning

This guide explains how you can automatically provision users in an outbound connector based on the role assigned to a user.

Follow the steps given below to configure role-based provisioning in {{product_name}}.

1. Enable [organization-level outbound provisioning]({{base_path}}/guides/users/outbound-provisioning/provisioning-levels/org-level).

2. Select the connection in which you configured the outbound connector and go to its **Outbound Provisioning** tab.

3. Under **Outbound Provisioning Roles**, select a role from the dropdown and click the **add** icon. You can add multiple roles by repeating this step.

    ![role-based provisioning]({{base_path}}/assets/img/guides/outbound-provisioning/role-based-provisioning.png){: width="700" style="border: 0.3px solid lightgrey;"}

4. Click **Update** to save the changes.

## Try it out

1. On the {{product_name}} Console, [create a user]({{base_path}}/guides/users/manage-users/#onboard-single-user).

2. [Assign the created user to a role]({{base_path}}/guides/users/manage-roles/#assign-users-to-a-role) that you specified for outbound provisioning. The user will be provisioned to the outbound connector.

3. Remove the user from the role. The user will be removed from the outbound connector.