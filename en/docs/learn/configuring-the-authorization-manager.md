# Configuring the Authorization Manager

User management functionality is provided by default in all WSO2
Carbon-based products and is configured in the
`         <PRODUCT_HOME>/repository/conf/deployment.toml       ` file.
This documentation explains how to set up a repository for storing
authorization information (role-based permissions) and how to change the
relevant configurations.

According to the default configuration in WSO2 products, the Users,
Roles and Permissions are stored in the same repository (i.e., the
default, embedded H2 database). However, you can change this
configuration in such a way that the Users and Roles are stored in one
repository (User Store) and the Permissions are stored in a separate
repository. A user store can be a typical RDBMS, an LDAP or an external
Active Directory. See the [related
topics](#related-topics) for    
information on how user stores are configured.

The repository that stores Permissions should always be an RDBMS. The
Authorization Manager configuration in the deployment.toml (stored in
the `          <PRODUCT_HOME>/repository/conf/         ` directory)
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
        update the type and URL in the `             deployment.toml            ` file
        (stored in the
        `             <PRODUCT_HOME>/repository/conf/           `
        directory) as shown below. The valid types are mysql,oracle,mssql,db2 and postgre.

        ```toml 
            [database.shared_db]
            type = "h2"
            url = "jdbc:h2:./repository/database/WSO2SHARED_DB;DB_CLOSE_ON_EXIT=FALSE;LOCK_TIMEOUT=60000"
            username = "wso2carbon"
            password = "wso2carbon"
        ```

Refer the [related
topics](#related-topics) for detailed
information on setting up databases and configuring datasources.  

### Step 2: Updating the user realm configurations

Once you have set up a new RDBMS and configured the datasource, the
`          deployment.toml         ` file (user realm configuration) should
be updated as explained below.

#### Setting up the database connection

Update the datasource information using the
`          data_source        ` element under
`          realm_manager       ` . Given below are the properties
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
<td><p>This is the jndi name of the datasource that is used for referring to the datasource. In the following example, the jndi name of the default datasource defined in the <code>               &lt;PRODUCT_HOME&gt;/repository/conf/datasources/master-datasources.xml              </code> file is linked from the <code>               user-mgt.xml              </code> file.</p></td>
<td>Mandatory</td>
</tr>
<tr class="even">
<td><pre><code>[realm_manager] <br>isCascadeDeleteEnabled=     </code></pre></td>
<td>This property is set to 'true' by default, which enables cascade delete for the UM_USER_PERMISSION and UM_ROLE_PERMISSION tables when a permission gets deleted from the UM_PERMISSION table. That is, if a record in the parent table is deleted the corresponding records in the child table will be automatically deleted.</td>
<td>Mandatory</td>
</tr>
</tbody>
</table>

You can add more optional configurations using the
`          <Property>         ` element:

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

#### Configuring the Authorization Manager

To enable the authorization manager, configure the following properties in the <PRODUCT_HOME>/repository/conf/deployment.toml file.

```xml
[authorization_manager]
class = "org.wso2.carbon.user.core.authorization.JDBCAuthorizationManager"
[authorization_manager.properties]
AdminRoleManagementPermissions = "permission"
AuthorizationCacheEnabled = true
GetAllRolesOfUserEnabled = true
```

-   The
    `           org.wso2.carbon.user.core.authorization.JDBCAuthorizationManager          `
    class enables the Authorization Manager for your product.
-   The `           AdminRoleManagementPermissions          ` property
    sets the registry path where the authorization information
    (role-based permissions) are stored. Note that this links to the
    repository that you defined in **Step 1**.
-   It is recommended to enable the
    `            GetAllRolesOfUserEnabled           ` property in the
    `            AuthorizationManager           ` as follows:  

    ``` java
        [authorization_manager]
        GetAllRolesOfUserEnabled = true
    ```

    Although using the user store manager does not depend on this
    property, you must consider enabling this if there are any
    performance issues in your production environment. Enabling this
    property affects the performance when the user logs in. This depends
    on the users, roles and permission stats.

-   By default, the rules linked to a permission (role name, action,
    resource) are not case sensitive. If you want to make them case
    sensitive, enable the following property:

    ``` java
        <Property name="CaseSensitiveAuthorizationRules">true</Property>
    ```

!!! info "Related Topics"

    -   [Configuring User Stores](../../learn/configuring-user-stores) : This topic
        explains how the repositories for storing information about Users
        and Roles are configured.
    -   [Setting up the Physical Database](#setting-up-the-repository) : This section
        explains how you can set up a new RDBMS and configure it for your
        system.
