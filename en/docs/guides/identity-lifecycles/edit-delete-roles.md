# Edit or Delete a Role

This section guides you through editing or deleting a user role in WSO2 Identity Server.

----

## Edit or delete a role using the Management Console

{! fragments/edit-delete-role.md !}

---

## Edit or delete a role using SCIM 2.0 REST API

In SCIM 2.0, roles are considered as **groups.** You can edit or delete a
group using SCIM 2.0. For more information, see [SCIM 2.0 Rest APIs](../../../develop/apis/scim2-rest-apis).

----

## Update special role names
Even-though we can rename the role names using WSO2 Identity Server using one of the above methods, the two special roles
`admin` and `Internal/everyone` require a special way to update their names. You can use one of the following methods for this;

### Update role names before the first startup (recommended)

You can change the default role name before starting the WSO2 Identity
Server. To do this, change the properties in the `         <IS_HOME>/repository/conf/deployment.toml       ` file as shown below.
Change the value of `admin_role` to ` New role name`. 

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

### Update role names before the first startup (recommended)

If you have already updated the role names before the first startup of
the product, these steps are not necessary. The following steps guide
you through updating the role names after you have used the product for
some time.

1.  Make the configuration changes indicated in the above
        section.
2.  Do the following userstore level changes for existing users:  
       -   If you are connected to the
            `JDBCUserStoreManager`, update the
            `UM_USER_ROLE` table with the existing
            users and the new role names that you defined in place of the
            'admin' and 'everyone' roles. If you have changed the
            permissions of the 'everyone' role, update the
            `UM_ROLE_PERMISSION` table the
            permissions of the new role.

       -   If you are connected to the `ReadWriteLdapUserStoreManager`, populate the members of the previous admin role to the new
            role under **Groups**.

3.  After the changes have been made, restart the server.

!!! info 
    The schema can be located by referring to the data source
    defined in the `deployment.toml` file. The data source definition
    can also be found in the same file. 


!!! info "Related topics"
    - [Concept: Roles and Permissions](../../../references/concepts/user-management/roles-and-permissions)
    - [Guide: Add Roles](../add-user-roles)
    - [Guide: Role Based Permissions](../role-based-permissions/)

