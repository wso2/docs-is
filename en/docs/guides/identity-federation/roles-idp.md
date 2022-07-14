# Configuring Roles for an Identity Provider

Role mapping is an important task when adding an identity provider to the Identity Server, as the roles of the Identity Server are different from the roles of the identity provider that you connect.

To configure the roles of the identity provider:

1. On the Management Console, go to **Main > Identity > Identity Providers** section.
2. Click **List**, select the identity provider you want to edit, and click on the corresponding **Edit** link.
3. Expand the **Role Configurations** tab, and click **Add Role Mapping**.
    ![Role Mapping]({{base_path}}/assets/img/guides/idp-role-mapping.png)
4. Enter the **Identity Provider Role** and map it to the **Local Role** available in the Identity Server.

    !!! info
        Read more on how to [create local roles]({{base_path}}/identity-lifecycles/add-user-roles.md) on Identity Server.

5. Enter the roles that you wish to provision on the **Identity Provider OutBound Provisioning Roles** field.

    ![idp-provisioning-role]({{base_path}}/assets/img/guides/idp-provisioning-role.png)

    !!! info
        All users who are assigned to this role will be provisioned from the Identity Server to the identity provider. You can provision users that have multiple roles by specifying the roles in a comma-separated list.  



!!! note
    The Federated IDP role claim value separator is used to separate multiple roles in the role claim value obtained from the Identity Provider. In order to configure the Federated IDP role claim value separator, add the following configuration to the `deployment.toml` file in `<carbon-home>/repository/conf` and restart the server.

    ``` xml
    [federated.idp]
    role_claim_value_attribute_separator=","
    ```
    
    If this is not configured and if the **no MulitAttributeSeparator** is configured, the default separator will be " **,,,** ".