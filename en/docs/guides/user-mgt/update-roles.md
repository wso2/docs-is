# Updating role names
To make modifications to the role names, do one of the following:

## Updating role names before the first startup (recommended)

You can change the default role name before starting the WSO2 Identity
Server. To do this, change the properties in the
`         <IS_HOME>/repository/conf/deployment.toml       ` file as shown below.

Change the value of `         admin_role         ` to ` New role name   `. 

```toml
[super_admin]
username = "admin"
password = "admin"
create_admin_account = true
admin_role = "admin"
[realm_manager]
data_source = "jdbc/WSO2CarbonDB"
```
---

## Updating role names after the product is used for sometime (advanced configuration)

If you have already updated the role names before the first startup of
the product, these steps are not necessary. The following steps guide
you through updating the role names after you have used the product for
some time.

1.  Make the configuration changes indicated in the above
    section.
2.  Do the following user store level changes for existing users:  
    -   If you are connected to the
        `             JDBCUserStoreManager            `, update the
        `             UM_USER_ROLE            ` table with the existing
        users and the new role names that you defined in place of the
        'admin' and 'everyone' roles. If you have changed the
        permissions of the 'everyone' role, update the
        `             UM_ROLE_PERMISSION            ` table the
        permissions of the new role.

        !!! info 
            The schema can be located by referring to the data source
            defined in the `deployment.toml` file. The data source definition
            can also be found in the same file. 

    -   If you are connected to the
        `            ReadWriteLdapUserStoreManager,           `
        populate the members of the previous admin role to the new
        role under **Groups**.

3.  After the changes have been made, restart the server.

!!! info "Related Links"
    -   See [Role-based Permissions](insert-role-based-permissions)
        for more information.
    -   See [Permissions Required to Invoke Admin Services](insert-permissions-required-to-invoke-admin-services) for a
        complete list of permissions required to invoke admin services.
