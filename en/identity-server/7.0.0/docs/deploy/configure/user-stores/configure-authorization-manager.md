# Configure the Authorization Manager

This documentation explains how to set up a repository for storing
authorization information (role-based permissions) and how to change the
relevant configurations.

According to the default configuration in WSO2 products, the users,
roles and permissions are stored in the same repository (i.e., the
default embedded H2 database). However, you can change this
configuration in such a way that the users and roles are stored in one
repository (user store) and the permissions are stored in a separate
repository. A user store can be a typical RDBMS, an LDAP or an external
Active Directory. See [Manage user stores]({{base_path}}/guides/users/user-stores/) for 
information on how user stores are configured.

The repository that stores permissions should always be an RDBMS. The
Authorization Manager configuration in the deployment.toml file stored in
the `<IS_HOME>/repository/conf/` directory connects the system to this RDBMS.

Follow the instructions given below to set up and configure the
Authorization Manager.

----

## Step 1: Set up the repository

By default, the embedded H2 database is used for storing permissions.

Refer the [Work with Databases]({{base_path}}/deploy/configure/databases) for detailed information on
setting up databases and configuring datasources.

## Step 2: Update the user realm configurations

Once you have set up a new RDBMS and configured the datasource, the
`deployment.toml` file (user realm configuration) should
be updated as explained below.

### Set up the database connection

Update the datasource information using the
`data_source` element under
`realm_manager` . Given below are the properties
that are set by default.

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Property Name</p></th>
<th><p>Description</p></th>
<th>Mandatory/Optional</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>       [realm_manager] <br>       data_source=             </code></td>
<td><p>This is the jndi name of the datasource that is used for referring to the datasource. In the following example, the jndi name of the default datasource defined in the <code>               &lt;IS_HOME&gt;/repository/conf/datasources/master-datasources.xml              </code> file is linked from the <code>               user-mgt.xml              </code> file.</p></td>
<td>Mandatory</td>
</tr>
<tr class="even">
<td><pre><code>[realm_manager] <br>isCascadeDeleteEnabled=     </code></pre></td>
<td>This property is set to 'true' by default, which enables cascade delete for the UM_USER_PERMISSION and UM_ROLE_PERMISSION tables when a permission gets deleted from the UM_PERMISSION table. That is, if a record in the parent table is deleted, the corresponding records in the child table will be automatically deleted.</td>
<td>Mandatory</td>
</tr>
</tbody>
</table>

You can add more optional configurations using the
`<Property>` element:

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Property Name</p></th>
<th><p>Description</p></th>
<th>Mandatory/Optional</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>              testOnBorrow             </code></td>
<td><p>It is recommended to set this property to 'true' so that object connections will be validated before being borrowed from the JDBC pool. For this property to be effective, the <code>               validationQuery              </code> parameter in the <code>               &lt;PRODUCT_HOME&gt;/repository/conf/datasources/master-datasources.xml              </code> file should be a non-string value. This setting will avoid connection failures. See the section on performance tuning of WSO2 products for more information.</p></td>
<td>Optional</td>
</tr>
</tbody>
</table>

### Configure the authorization manager

To enable the authorization manager, configure the following properties in the `<IS_HOME>/repository/conf/deployment.toml` file.

```toml
[authorization_manager]
class = "org.wso2.carbon.user.core.authorization.JDBCAuthorizationManager"

[authorization_manager.properties]
AdminRoleManagementPermissions = "permission"
AuthorizationCacheEnabled = true
GetAllRolesOfUserEnabled = true
```

-   The
    `org.wso2.carbon.user.core.authorization.JDBCAuthorizationManager`
    class enables the Authorization Manager.
-   The `AdminRoleManagementPermissions` property
    sets the registry path where the authorization information
    (role-based permissions) are stored. Note that this links to the
    repository that you defined in **Step 1**.
-   It is recommended to enable the
    `GetAllRolesOfUserEnabled` property in
    `AuthorizationManager` as follows:  

    ``` toml
    [authorization_manager]
    GetAllRolesOfUserEnabled = true
    ```

    Although using the user store manager does not depend on this
    property, you must consider enabling this if there are any
    performance issues in your production environment. Enabling this
    property affects the performance when the user logs in. This depends
    on the users, roles, and permission stats.

-   By default, the rules linked to a permission (role name, action,
    resource) are not case sensitive. If you want to make them case
    sensitive, enable the following property.

    ``` toml
    [user_store]
    case_sensitive_authorization_rules = true
    ```
