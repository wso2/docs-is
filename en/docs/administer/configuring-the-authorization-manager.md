# Configuring the Authorization Manager

According to the default configuration in WSO2 products, the Users,
Roles and Permissions are stored in the same repository (i.e., the
default, embedded H2 database). However, you can change this
configuration in such a way that the Users and Roles are stored in one
repository (User Store) and the Permissions are stored in a separate
repository. A user store can be a typical RDBMS, an LDAP or an external
Active Directory. For information on how the repositories for storing
information about users and roles are configured, see [Configuring User
Stores](../../learn/configuring-user-stores).

The repository that stores Permissions should always be an RDBMS. The
Authorization Manager configuration in the user-mgt.xml file (stored in
the `         <PRODUCT_HOME>/repository/conf/        ` directory)
connects the system to this RDBMS.

Follow the instructions given below to set up and configure the
Authorization Manager.

### Step 1: Setting up the repository

By default, the embedded H2 database is used for storing permissions.
You can change this as follows:

1.  Change the default H2 database or set up another RDBMS for storing
    permissions.
2.  When you set up an RDBMS for your system, it is necessary to create
    a corresponding datasource, which allows the system to connect to
    the database.
    -   If you are replacing the default H2 database with a new RDBMS,
        update the `            deployment.toml           ` file
        (stored in the
        `            <PRODUCT_HOME>/repository/conf/          `
        directory) with the relevant information.

For information on how you can set up a new RDBMS and configure it for
your system, see [Setting Up the Physical
Database](../../administer/setting-up-the-physical-database), and for information on
the purpose of defining datasources and how they are configured for a
product, see [Managing Datasources](../../administer/managing-datasources).

### Step 2: Updating the user realm configurations

Once you have set up a new RDBMS and configured the datasource, the
`         deployment.toml        ` file (user realm configuration) should
be updated as explained below.

#### Setting up the database connection

Update the datasource information using the
`         <Property>        ` element under
`         <Configuration>        ` . Given below are the properties that
are set by default.

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
<td><code>             dataSource            </code></td>
<td><p>This is the jndi name of the datasource that is used for referring to the datasource. In the following example, the jndi name of the default datasource file is linked from the <code>             deployment.toml           </code> file.</p></td>
<td>Mandatory</td>
</tr>
<tr class="even">
<td><pre><code>isCascadeDeleteEnabled</code></pre></td>
<td>This property is set to 'true' by default, which enables cascade delete for the UM_USER_PERMISSION and UM_ROLE_PERMISSION tables when a permission gets deleted from the UM_PERMISSION table. That is, if a record in the parent table is deleted the corresponding records in the child table will be automatically deleted.</td>
<td>Mandatory</td>
</tr>
</tbody>
</table>

You can add more optional configurations using the
`         <Property>        ` element:

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
<td><code>             testOnBorrow            </code></td>
<td><p>It is recommended to set this property to 'true' so that object connections will be validated before being borrowed from the JDBC pool. For this property to be effective, the <code>              validationQuery             </code> parameter in the <code>              &lt;PRODUCT_HOME&gt;/repository/conf/datasources/master-datasources.xml             </code> file should be a non-string value. This setting will avoid connection failures. See the section on performance tuning of WSO2 products for more information.</p></td>
<td>Optional</td>
</tr>
</tbody>
</table>

#### Configuring the Authorization Manager

Shown below is how the Authorization Manager is enabled in the
deployment.toml file.

``` xml
        [authorization_manager]
        class = "org.wso2.carbon.user.core.authorization.JDBCAuthorizationManager"
        [authorization_manager.properties]
        AdminRoleManagementPermissions = "/permission"
        AuthorizationCacheEnabled = true
```

-   The
    `          org.wso2.carbon.user.core.authorization.JDBCAuthorizationManager         `
    class enables the Authorization Manager for your product.
-   The `          AdminRoleManagementPermissions         ` property
    sets the registry path where the authorization information
    (role-based permissions) are stored. Note that this links to the
    repository that you defined in **Step 1**.
-   It is recommended to enable the
    `           GetAllRolesOfUserEnabled          ` property in the
    `           authorization_manager.properties          ` as follows:  

    ``` xml
        [authorization_manager.properties]
        GetAllRolesOfUserEnabled = true
    ```

    Although using the user store manager does not depend on this
    property, you must consider enabling this if there are any
    performance issues in your production environment. Enabling this
    property affects the performance when the user logs in. This depends
    on the users, roles and permission stats.

-   By default, the rules linked to a permission (role name, action,
    resource) are not case sensitive. If you want to make them case
    sensitive, enable the following property:

    ``` java
    [user_store]
    case_sensitive_authorization_rules = true
    ```
