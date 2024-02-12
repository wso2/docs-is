# Configure role-based outbound provisioning

This guide explains how you can provision users to an external Identity Provider (IdP) based on the role to which the user is assigned in {{product_name}}. With role-based provisioning, the user, when assigned to a pre-configured user role, will be provisioned to the external IdP. When the user is removed from the role, the user will be removed from the external IdP.

## Configure the outbound connector

Follow the steps given below to configure role-based provisioning in {{product_name}}.

1. Follow the guides below to create an outbound connector of your choice.
            <ul>
                <li><a href="{{base_path}}/guides/authentication/outbound-provisioning/google">Google</a></li>
                <li><a href="{{base_path}}/guides/authentication/outbound-provisioning/salesforce">Salesforce</a></li>
                <li><a href="{{base_path}}/guides/authentication/outbound-provisioning/scim">SCIM2</a></li>
            </ul>

2. In the created connector, go to its **Outbound Provisioning** tab.

3. Under **Outbound Provisioning Roles**, select a role from the drowdown and click the **add** icon. You can add multiple roles by repeating this step.

    ![role-based provisioning]({{base_path}}/assets/img/guides/outbound-provisioning/role-based-provisioning.png){: width="700" style="border: 0.3px solid lightgrey;"}

4. Click **Update** to save the changes.

## Try it out

1. On the {{product_name}} Console, [create a user]({{base_path}}/guides/users/manage-users/#onboard-single-user).

2. [Assign the created user to a role]({{base_path}}/guides/users/manage-roles/#assign-users-to-a-role) that you configured in role-based provisioning.

    !!! info
        At this point, the user will be provisioned to the external IdP.

3. Remove the user from the role.

    !!! info
        The user will be removed from the external IdP.