# Role-based Permissions

The **User Management** module in WSO2 products enable role-based
access. With this functionality, the permissions enabled for a
particular role determines what that user can do using the management
console of a WSO2 product. Permissions can be granted to a role at two
levels:

-   **Super tenant level:** A role with super tenant permissions is used
    for managing all the tenants in the system and also for managing the
    key features in the system, which are applicable to all the tenants.
-   **Tenant level:** A role with tenant level permissions is only
    applicable to individual tenant spaces.

The permissions navigator that you use to enable permissions for a role
is divided into these two categories (**Super Admin** permissions, for
supper tenant level permission and **Admin** permissions, for tenant
level permission) as shown below. However, note that there may be other
categories of permissions enabled for a WSO2 product, depending on the
type of features that are installed in the product.

![]( ../../assets/img/using-wso2-identity-server/role-permissions.png)

You can access the permissions navigator for a particular role by
clicking **Permissions** as shown below.  
![]( ../../assets/img/103330369/103330396.png)

By default, every WSO2 product comes with the following User, Role and
Permissions configured:

-   The **Admin** user and **Admin** role is defined and linked to each
    other in the `           user-mgt.xml          ` file, stored in the
    `           <PRODUCT_HOME>/repository/conf/          ` directory as
    shown below.

    ``` java
    <AddAdmin>true</AddAdmin>
    <AdminRole>admin</AdminRole>
    <AdminUser>
         <UserName>admin</UserName>
         <Password>admin</Password>
    </AdminUser>
    ```

-   The **Admin** role has all the permissions in the system enabled by
    default. Therefore, this is a super tenant, with all permissions
    enabled.

You will be able to log in to the management console of the product with
the **Admin** user defined in the `         user-mgt.xml        ` file.
You can then create new users and roles, and configure permissions for
the roles using the management console. However, note that you cannot
modify the permissions of the **Admin** role. The possibility of
managing users, roles and permissions is granted by the **User
Management** permission. See the documentation on [configuring the user
realm](../../using-wso2-identity/server/configuring-the-realm) for more information.

### Description of role-based permissions

!!! note
    
    The descriptions that are given in this document only explain how
    permissions control access to operations available on the management
    console.
    

The descriptions of permissions in the **Permissions** navigator are as
follows:

-   The **Login** permission defined under **Admin** permissions allows
    users to log in to the management console of the product. Therefore,
    this is the primary permission required for using the management
    console.

<!-- -->

-   The following table describes the permissions at **Super Tenant**
    level. These are also referred to as **Super Admin** permissions.

    <table>
    <thead>
    <tr class="header">
    <th>Permission</th>
    <th>Description of UI menus enabled</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><div class="content-wrapper">
    <strong>Configuration</strong> permissions:<br />
    <img src=" ../../assets/img/using-wso2-identity-server/configuration-permissions.png" /><br />
    <br />
    <br />

    </div></td>
    <td>The <strong>Super Admin/Configuration</strong> permissions are used to grant permission to the key functions in a product server, which are common to all the tenants. In each WSO2 product, several configuration permissions will be available depending on the type of features that are installed in the product.<br />
    <ul>
        <li><strong>Feature Management</strong> permission ensures that a user can control the features installed in the product using the management console. That is, the <strong>Features</strong> option will be enabled under the <strong>Configure</strong> menu.</li>
        <li><strong>Logging</strong> permission enables the possibility to configure server logging from the management console. That is, the <strong>Logging</strong> option will be enabled under the <strong>Configure</strong> menu.</li>
    </ul>
    </td>
    </tr>
    <tr class="even">
    <td><div class="content-wrapper">
    <strong>Management</strong> permissions: <img src=" ../../assets/img/using-wso2-identity-server/management-permissions.png" />
    </div></td>
    <td>
    <p>The <strong>Super Admin/Manage</strong> permissions are used for adding new tenants and monitoring them.</p>
    <ul>
    <li><strong>Modify/Tenants</strong> permission enables the <strong>Add New Tenant</strong> option in the <strong>Configure</strong> menu of the management console, which allows users to add new tenants.</li>
    <li><strong>Monitor/Tenants</strong> permission enables the <strong>View Tenants</strong> option in the <strong>Configure</strong> menu of the management console.</li>
    </ul>
    </td>
    </tr>
    <tr class="odd">
    <td><div class="content-wrapper">
    <strong>Server Admin</strong> permissions:<br />
    <img src="../../assets/img/using-wso2-identity-server/server-admin-permissions.png" />
    </div></td>
    <td>Selecting the <strong>Server Admin</strong> permission enables the <strong>Shutdown/Restart</strong> option in the <strong>Main</strong> menu of the management console.</td>
    </tr>
    </tbody>
    </table>

<!-- -->

-   The following table describes the permissions at **Tenant** level.
    These are also referred to as **Admin** permissions.

    Note that when you select a node in the **Permissions** navigator,
    all the subordinate permissions that are listed under the selected
    node are also automatically enabled.

    !!! note
    
        All the permissions available in the permission tree are
        listed here. You can get the information related to them throughout
        the documentation wherever applicable.
    

    <table>
    <thead>
    <tr class="header">
    <th>Permission level</th>
    <th>Description of UI menus enabled</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Admin</td>
    <td><p>When the <strong>Admin</strong> permission node is selected, the following menus are enabled in the management console:</p>
    <ul>
    <li><strong>User Stores:</strong> This menu allows users to add new user stores and manage them with the management console. Note that only secondary user stores can be added using this option. See the topic on <a href="../../using-wso2-identity-server/configuring-user-stores">user store management</a> for more details.</li>
    <li><strong>Identity Providers:</strong> See the topic on <a  href="../../using-wso2-identity-server/adding-and-configuring-an-identity-provider">configuring with identity providers</a> for details on how to use this option.</li>
    </ul>
    <p>-Additionally, all permissions listed under <strong>Admin</strong> in the permissions navigatorare selected automatically.</p></td>
    </tr>
    <tr class="even">
    <td>Admin/Configure</td>
    <td><p>When the <strong>Admin/Configure</strong> permission node is selected, the following menus are enabled in the management console:</p>
    <ul>
    <li><strong>Main</strong> menu <strong>/PAP:</strong> See the topic on <a href="../../tutorials/working-with-entitlement">working with entitlement</a> for details on how to use this option.</li> 
    <li><strong>Main</strong> menu <strong>/PDP:</strong> See the topic on <a href="../../tutorials/working-with-entitlement">working with entitlement</a> for details on how to use this option.</li>
    <li><strong>Configure</strong> menu <strong>/Server Roles:</strong> See the topic on <a href="../../using-wso2-identity-server/server-roles">server roles</a> for more details.</li>
    <li><strong>Tools</strong> menu <strong>/Tryit (XACML):</strong> See the topic on <a href="../../using-wso2-identity-server/using-the-xacml-tryit-tool">working with the TryIt tool</a> for details on how to use this option.</li>
    </ul> 
    <p>Additionally, all permissions listed under <strong>Configure</strong> in the permissions navigatorare selected automatically.</p>
    </td>
    </tr>
    <tr class="odd">
    <td>Admin/Configure/Security</td>
    <td><p>When the <strong>Admin/Configure/Security</strong> permission node is selected, the following menus are enabled in the <strong>Configure</strong> menu of the management console:</p>
    <ul>
    <li><strong>Claim Management:</strong> See the topic on <a href="_Claim_Management_">claim management</a> for details on how to use this option.</li>
    <li><strong>Keystores:</strong> See the topic on <a href="#" class="unresolved">keystores</a> for details on how to use this option.</li>
    <li><strong>Service Principal (Kerberos KDC):</strong> See the topic on <a href="../../using-wso2-identity-server/configuring-inbound-authentication-for-a-service-provider">Configuring Inbound Authentication for a Service Provider</a> for details on how to use this option.</li>
    <li><strong>Email Templates:</strong> See the topics on <a href="../../using-wso2-identity-server/email-templates">email templates</a> for details on how to use this option.</li>
    <li>This permission will also enable the <strong>Roles</strong> option under <strong>Configure/Users and Roles</strong> . See the topic on <a href="../../using-wso2-identity-server/configuring-users-roles-and-permissions">configuring users, roles and permissions</a> for more information.</li>
    </ul>
    <p>Additionally, all permissions listed under <strong>Security</strong> in the permissions navigatorare selected automatically.</p>
    </td>
    </tr>
    <tr class="even">
    <td>Admin/Configure/Security/Identity Management/User Management</td>
    <td>This permission enables the possibility to add users from the management console. That is, the <strong>Users</strong> option will be enabled under <strong>Configure/Users and Roles</strong> .</td>
    </tr>
    <tr class="odd">
    <td>Admin/Configure/Security/Identity Management/Password Management</td>
    <td>This permission enables t he <strong>Change Password</strong> option for the users listed in the <strong>User Management/Users and Roles/Users</strong> screen, which allows thelog in user to change the passwords</td>
    </tr>
    <tr class="even">
    <td>Admin/Configure/Security/Identity Management/Profile Management</td>
    <td>This permission enables the <strong>User Profile</strong> option for the users listed in the <strong>User Management/Users and Roles/Users</strong> screen, which allows the log in user to update user profiles.</td>
    </tr>
    <tr class="odd">
    <td>Admin/Manage</td>
    <td><p>When the <strong>Admin/Manage</strong> permission is selected, the following menus will be enabled in the management console:</p>
    <ul>
    <li><strong>Main</strong> menu <strong>/Service Providers:</strong> See <a href="../../using-wso2-identity-server/adding-and-configuring-a-service-provider">Adding and Configuring a Service Provider</a> for details on how to use this option.</li>
    <li><strong>Tools</strong> menu <strong>/SAML:</strong> See the topic on <a href="../../using-wso2-identity-server/using-the-saml2-toolkit">working with the SAML tool kit</a> for more details.</li>
    </ul>
    <p>Additionally, all permissions listed under <strong>Admin/Manage</strong> in the permissions navigator will be enabled automatically.</p>
    </td>
    </tr>
    <tr class="even">
    <td>Admin/Manage/Resources/Browse</td>
    <td>This permission enables the <strong>Browse</strong> option under the <strong>Registr</strong> y menu in the main navigator. This option allows users to browse the resources stored in the registry by using the <strong>Registry</strong> tree navigator. <strong><br />
    </strong></td>
    </tr>
    <tr class="odd">
    <td>Admin/Manage/Search</td>
    <td>This permission enables the <strong>Search</strong> option under the <strong>Registry</strong> sub menu in the <strong>Main</strong> menu. This option allows users to search for specific resources stored in the registry by filling in the search criteria. <strong><br />
    </strong></td>
    </tr>
    <tr class="even">
    <td>Admin/Monitor</td>
    <td><p>When the <strong>Admin/Monitor</strong> permission node is selected, the following menus are enabled in the management console:</p>
    <ul>
    <li><strong>Monitor</strong> menu <strong>/System Statistics:</strong> See the topic on <a href="../../using-wso2-identity-server/system-statistics">system statistics</a> for information on how to use this option.</li>
    <li><strong>Monitor</strong> menu <strong>/SOAP Message Tracer:</strong> See the topic on the <a href="../../using-wso2-identity-server/soap-tracer">SOAP tracer</a> for information on how to use this option.</li>
    </ul>
    <p>Additionally, all permissions listed under <strong>Admin/Monitor</strong> in the permissions navigator will be enabled automatically.</td>
    </tr>
    <tr class="odd">
    <td>Admin/Monitor/Logs</td>
    <td><p>When the <strong>Admin/Monitor/Logs</strong> permission node is selected, the following menus are enabled in the management console:</p>
    <ul>
    <li><strong>Monitor</strong> menu <strong>/Application Logs</strong></li>
    <li><strong>Monitor</strong> menu <strong>/System Logs</strong> See the topic on <a href="../../using-wso2-identity-server/system-Logs">system logs</a> for information on how to use these options.</td>
    </tr>
    </tbody>
    </table>

!!! abstract "Related Topics"

    -   See [Configuring Roles and
        Permissions](../../using-wso2-identity-server/configuring-roles-and-permissions).
    -   See [Permissions Required to Invoke Admin
        Services](../../references/permissions-required-to-invoke-admin-services) for a
        complete list of permissions required to invoke admin services.
