Permissions can be granted to a role at two levels:

-   **Super tenant level:** A role with super tenant permissions is used
    for managing all the tenants in the system and also for managing the
    key features in the system, which are applicable to all the tenants.
-   **Tenant level:** A role with tenant level permissions is only
    applicable to individual tenant spaces.

The permissions navigator that you use to enable permissions for a role
is divided into these two categories (**Super Admin** permissions and
**Admin** permissions) as shown below. However, note that there may be
other categories of permissions enabled for a WSO2 product, depending on
the type of features that are installed in the product.

![](../../../assets/img/fragments/role-permissions.png)

You can access the permissions navigator for a particular role by
clicking **Permissions** as shown below.  

![](../../../assets/img/fragments/permission-navigator.png)

By default, every WSO2 Identity Server comes with the default [user](../../../references/concepts/user-management/users/) and
[role](../../../references/concepts/user-management/roles-and-permissions/).

-   The **Admin** role has all the permissions in the system enabled by
    default. Therefore, this is a super tenant, with all permissions
    enabled.
    
    !!! Tip 
        You can change the default role name '**admin**' of the Administrative role as described [here](../../../guides/identity-lifecycles/edit-delete-roles/)

You can create new users and roles and configure permissions for the
roles using the management console. However, note that you cannot modify
the permissions of the **Admin** role. The possibility of managing
users, roles and permissions is granted by the **User Management**
permission.

### How permissions control access to operations available on the management console
    
The descriptions of permissions in the **Permissions** navigator are as
follows:

-   The **Login** permission defined under **Admin** permissions allows
    users to log in to the management console of the product. Therefore,
    this is the primary permission required for using the management
    console.
    
-   The following table describes the permissions at **Super Tenant**
    level. These are also referred to as **Super Admin** permissions.

    <table>
    <colgroup>
    <col style="width: 50%" />
    <col style="width: 50%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th>Permission</th>
    <th>Description of UI menus enabled</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><strong>Configuration</strong> permissions:<br />
    <img src="../../../assets/img/fragments/super-admin-config.png" /></td>
    <td>The <strong>Super Admin/Configuration</strong> permissions are used to grant permission to the key functions in a product server, which are common to all the tenants. In each WSO2 product, several configuration permissions will be available depending on the type of features that are installed in the product.<br />
    <br />
    <strong>- Feature Management</strong> permission ensures that a user can control the features installed in the product using the management console. That is, the <strong>Features</strong> option will be enabled under the <strong>Configure</strong> menu.<br />
    <strong>- Logging</strong> permission enables the possibility to configure server logging from the management console. That is, the <strong>Logging</strong> option will be enabled under the <strong>Configure</strong> menu.</td>
    </tr>
    <tr class="even">
    <td><strong>Management</strong> permissions:<br /> <img src="../../../assets/img/fragments/management-permissions.png" /></td>
    <td><p>The <strong>Super Admin/Manage</strong> permissions are used for adding new tenants and monitoring them.</p>
    <p><strong>- Modify/Tenants</strong> permission enables the <strong>Add New Tenant</strong> option in the <strong>Configure</strong> menu of the management console, which allows users to add new tenants.<br />
    <strong>- Monitor/Tenants</strong> permission enables the <strong>View Tenants</strong> option in the <strong>Configure</strong> menu of the management console.</p></td>
    </tr>
    <tr class="odd">
    <td><strong>Server Admin</strong> permissions:<br />
    <img src="../../../assets/img/fragments/server-admin-permissions.png" /></td>
    <td>Selecting the <strong>Server Admin</strong> permission enables the <strong>Shutdown/Restart</strong> option in the <strong>Main</strong> menu of the management console.</td>
    </tr>
    </tbody>
    </table>

-   The following table describes the permissions at **Tenant** level.
    These are also referred to as **Admin** permissions.

    !!! info  
        Note that when you select a node in the **Permissions** navigator,
        all the subordinate permissions that are listed under the selected
        node are also automatically enabled.

    !!! note
        Also, not all the permissions available in the permission tree are listed here. You can get the information related to them throughout the documentation wherever applicable.


    <table>
    <colgroup>
    <col style="width: 50%" />
    <col style="width: 50%" />
    </colgroup>
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
    <p><strong>- User Store Management:</strong> This permission allows users to add new user stores and manage them with the management console. Note that only secondary user stores can be added using this option. See the topic on <a href="../../../deploy/configure-user-stores/">user store management</a> for more details.<br />
    <strong>- Identity Providers:</strong> 
    <p>- All permissions listed under <strong>Admin</strong> in the permissions navigator are selected automatically.</p></td>
    </tr>
    <tr class="even">
    <td>Admin/Configure</td>
    <td>When the <strong>Admin/Configure</strong> permission node is selected, the following menus are enabled in the management console:<br />
    <strong><br />
    - Main</strong> menu <strong>/PAP:</strong> 
    - Main</strong> menu <strong>/PDP:</strong> 
    - Tools</strong> menu <strong>/Tryit (XACML):</strong>
    - All permissions listed under <strong>Configure</strong> in the permissions navigator are selected automatically.</td>
    </tr>
    <tr class="odd">
    <td>Admin/Configure/Security</td>
    <td>When the <strong>Admin/Configure/Security</strong> permission node is selected, the following menus are enabled in the <strong>Configure</strong> menu of the management console:<br />
    <br />
    <strong>- Claim Management:</strong> See the topic on <a href="../../../guides/dialects/configure-claims/">claim management</a> for details on how to use this option.<br />
    <strong>- Keystores:</strong> See the topic on <a href="../../../deploy/security/create-new-keystores/">keystores</a> for details on how to use this option. <strong><br />
    </strong> <strong>- Email Templates:</strong> See the topics on <a href="../../../guides/tenants/customize-automated-mails/">email templates</a> for details on how to use this option.<br />
    <br />
    - This permission will also enable the <strong>Roles</strong> option under <strong>Configure/Users and Roles</strong> . See the topics on <a href="../../../guides/identity-lifecycles/manage-user-overview/"></a>configuring Users, and <a href="../../../guides/identity-lifecycles/manage-roles-overview/">roles</a> for more information.<br />
    <br />
    - Additionally, all permissions listed under <strong>Security</strong> in the permissions navigator are selected automatically.</td>
    </tr>
    <tr class="even">
    <td>Admin/Configure/Security/Identity Management/User Management</td>
    <td>This permission enables the possibility to add users from the management console. That is, the <strong>Users</strong> option will be enabled under <strong>Configure/Users and Roles</strong> .</td>
    </tr>
    <tr class="odd">
    <td>Admin/Configure/Security/Identity Management/Password Management</td>
    <td>This permission enables the <strong>Change Password</strong> option for the users listed in the <strong>User Management/Users and Roles/Users</strong> screen, which allows the log in user to change the passwords</td>
    </tr>
    <tr class="even">
    <td>Admin/Configure/Security/Identity Management/Profile Management</td>
    <td>This permission enables the <strong>User Profile</strong> option for the users listed in the <strong>User Management/Users and Roles/Users</strong> screen, which allows the log in user to update user profiles.</td>
    </tr>
    <tr class="odd">
    <td>Admin/Manage</td>
    <td>When the <strong>Admin/Manage</strong> permission is selected, the following menus will be enabled in the management console:<br />
    <br />
    <strong>- Main</strong> menu <strong>/Service Providers:</strong> 
    <strong>- Tools</strong> menu <strong>/SAML:</strong> 
    <br />
    </strong> - Additionally, all permissions listed under <strong>Admin/Manage</strong> in the permissions navigator will be enabled automatically. <strong></strong></td>
    </tr>
    <tr class="even">
    <td>Admin/Manage/Resources/Browse</td>
    <td>This permission enables the <strong>Browse</strong> option under the <strong>Registry</strong> menu in the main navigator. This option allows users to browse the resources stored in the registry by using the <strong>Registry</strong> tree navigator. <strong><br />
    </strong></td>
    </tr>
    <tr class="odd">
    <td>Admin/Manage/Search</td>
    <td>This permission enables the <strong>Search</strong> option under the <strong>Registry</strong> sub menu in the <strong>Main</strong> menu. This option allows users to search for specific resources stored in the registry by filling in the search criteria. <strong><br />
    </strong></td>
    </tr>
    <tr class="even">
    <td>Admin/Monitor</td>
    <td>When the <strong>Admin/Monitor</strong> permission node is selected, the following menus are enabled in the management console:<br />
    <br />
    <strong>- Monitor</strong> menu <strong>/System Statistics:</strong> See the topic on <a href="../../../deploy/monitor/system-statistics/">system statistics</a> for information on how to use this option.<br />
    <br />
    - Additionally, all permissions listed under <strong>Admin/Monitor</strong> in the permissions navigator will be enabled automatically.</td>
    </tr>
    <tr class="odd">
    <td>Admin/Monitor/Logs</td>
    <td>When the <strong>Admin/Monitor/Logs</strong> permission node is selected, the following menus are enabled in the management console:<br />
    <br />
    <strong>- Monitor</strong> menu <strong>/Application Logs</strong><br />
    <strong>- Monitor</strong> menu <strong>/System Logs</strong><br />
    <br />
    See the topic on <a href="../../../deploy/monitor/monitor-logs/">system logs</a> for information on how to use these options.</td>
    </tr>
    </tbody>
    </table>
