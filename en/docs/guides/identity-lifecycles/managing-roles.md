# Creating and Managing Roles

Roles contain permissions for users to manage the server. You can create different roles with various combinations of permissions and assign them to a user or a group of users. You can also edit and delete an existing user role.

WSO2 supports role-based authentication model where privileges of a user are based on the role it is attached to. By default, WSO2 Identity Server comes with the following roles:

- Admin - Provides full access to all features and controls. By default, the user "admin" is assigned to both the "Admin" and the "Everyone" roles. The Identity Server does not allow you to configure permissions assigned to the 'Admin' role.
- Internal/Everyone - Every new user is assigned to this role by default. It does not include any permission.
- System - This role is not visible for modification in the interface. 

If a user has several roles assigned, their permissions are added together.

WSO2 products has two types of roles. **External Roles** and **Internal
Roles**. Assume there are two userstores.

<table>
<thead>
<tr class="header">
<th><br />
</th>
<th><strong>Store-A</strong></th>
<th><strong>Store-B</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Users</td>
<td>user_A</td>
<td>user_B</td>
</tr>
<tr class="even">
<td>Roles</td>
<td>role_A</td>
<td>role_B</td>
</tr>
</tbody>
</table>

**External Roles :**  
These roles are stored in the userstores itself. Only users that belong to a userstore can be assigned to
external roles in that userstore.  
Example : user\_A can be assigned to role\_A while user\_B cannot be assigned to role\_A.

In userstores, users are assigned to **groups**. Within WSO2 IS, one user group is directly mapped to a role and permissions are assigned to the role.
  
**Internal Roles :**

These roles are stored in the WSO2 Identity Server database. Users in all userstores can be assigned to
these roles.

In the above example, both user\_A and user\_B can be assigned to the same internal role.

For internal roles, there are no mapped groups in the userstores. So we
directly assign users to these roles.

!!! info 
    **Internal/everyone :** This is a conceptual role that is used to group
    all the users (across the userstores) together. When a new user is created, the `internal everyone` role is automatically assigned to the user.

    **Application Role :** This role is used for special cases where an internal role is created for a single service provider (SP) application and only users that are assigned to this role can manage the relevant SP application.

---

## Adding a user role

### Adding a user role using the admin portal

{insert-fragment}

### Adding a user role using SCIM

In SCIM, creating a role is the same as creating a **group.** For more information, see
    [SCIM](insert-scim2-concept).

!!! note
    To create a group with users, the said users should already exist in the userstore.
    

Create a new group named **engineer** with the user 'Mark' as a member. The attributes you have to include in the cURL command are the `userID`, `username:password`.

**Request**

``` curl
curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} --data '{"displayName": {GROUP_NAME},"members": {MEMBERS_OF_THE_GROUP}}' --header "Content-Type:application/json" https://{IS_IP}:{IS_PORT}/wso2/scim2/Groups
```

``` tab="Sample Request"
curl -v -k --user admin:admin --data '{"displayName": "engineer","members": [{"value":"008bba85-451d-414b-87de-c03b5a1f4217","Mark": "Mark"}]}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim2/Groups
```

``` tab="Sample Response"
{"id":"7bac6a86-1f21-4937-9fb1-5be4a93ef469","schemas":["urn:ietf:params:scim:schemas:core:2.0:Group"],"displayName":"PRIMARY/engineer","members":[{"value":"008bba85-451d-414b-87de-c03b5a1f4217","display":"Mark"}],"meta":{"lastModified":"2020-04-26T18:31:57","created":"2020-04-26T18:31:57","location":"https://localhost:9443/scim2/Groups/7bac6a86-1f21-4937-9fb1-5be4a93ef469"}}
```

You receive a response with the payload as indicated above and a
response status `           201 CREATED          `.

---

## Updating role names
To make modifications to the role names, do one of the following:

### Updating role names before the first startup (recommended)

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

### Updating role names after the product is used for sometime (advanced configuration)

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

---

## Searching for roles

{insert-fragment}

---

## Editing or deleting a role

### Editing or deleting a role using the admin portal

{insert-fragment}

### Editing or deleting a role using SCIM

In SCIM roles are considered as **groups.** You can edit or delete a
group using SCIM. Please read more about
[SCIM](insert-scim2-concept) for further
details.


