# Configuring Roles and Permissions for a Service Provider

WSO2 Identity Server allows you to configure and manage roles and permission for a service provider.

When you create a service provider, a corresponding application role is created by default.

For example, suppose you create a service provider named SP1. In that case, a corresponding application role is created for SP1 within WSO2 IS. That application role is assigned to the user who created the service provider. 
Therefore, only the user who creates the service provider can view or manage the service provider. Suppose you want to allow any other user to be able to view or manage a service provider. In that case, the user must be assigned the application role corresponding to the particular service provider.

!!! Tip "Application Role"
    A special case of an internal role that is created for a particular service provider application. Only users assigned the application role permission can manage the corresponding service provider application.

## Prerequisites

You need to [register a service provider]({{base_path}}/guides/applications/register-sp) on the Management Console.

## Configure roles and permissions for SP

To configure roles and define custom permission for a service provider:

1. On the Management Console, go to **Main > Identity > Service Providers**.
2. Click **List**, select the service provider you want to configure, and click on the corresponding **Edit** link.
3. Expand the **Role/Permission Configuration** section, and then expand the **Permissions** and the **Role Mapping** sections.

    ![role-mapping]({{base_path}}/assets/img/guides/role-mapping.png)

4. Click **Add Permission** and specify the service provider specific permission you want to add.

    !!! info
        - If you want to add another permission entry, click **Add Permission** again.
        - If you want to delete an entry, click **Delete**.

    Once you add/update service provider specific permission details, the permission details will be listed as available permission when adding roles via WSO2 IS.

5. Click **Add Role Mapping** and enter appropriate values for the **Local Role** and the **Service Provider Role**.

    !!! info
        - If you want to add another role mapping entry, click Add Role Mapping again
        - If you want to delete a role mapping entry, click Delete.

    !!! Tip
        When you add role mapping, you can map an exact role name available in WSO2 IS to a particular service provider role.

6. Click **Update** to save your configurations.

!!! info "Optional"
    Optionally, you can enable the following configuration in the `<IS_HOME>/repository/conf/deployment.toml` file to return only roles that you have mapped under this service provider. This allows responses such as ID tokens or SAML assertions to return only the list of mapped SP roles from the assigned roles instead of returning all user roles.

    ``` xml
    [sp_role_management]
    return_only_mapped_local_roles = true
    ```

Now that you have configured roles and permission for the service provider, you can assign the application role permission to any user. For information on assigning roles to a user, see [manage user roles]({{base_path}}/guides/identity-lifecycles/manage-roles-overview/).