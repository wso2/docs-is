# Role-based Permissions

Permission can be granted to a role at two levels:

- **Super tenant level:** A role with super tenant permissions is used for managing all the tenants in the system and also for managing the key features in the system which are applicable to all the tenants.

- **Tenant level:** A role with tenant-level permissions is only applicable to individual tenant spaces.

You need to first have roles created in your tenant with the required permissions. You can then assign the role to users.

Users with the `admin` role are granted all permissions by default. Let's see how to configure a user with `admin` permissions.

## Configure admin permissions for a user

!!! Note "Prerequisites"
    You need to [create a new user]({{base_path}}/guides/identity-lifecycles/admin-creation-workflow/) on the management console.

To configure admin permissions for a user:

1. On the Management Console, go to **Users and Roles > List > Users**.
2. Click **Assign Roles** to assign all administrative permissions for the created user.
    ![Assign roles to Alex]({{base_path}}/assets/img/guides/assign-roles.png)
3. Select **admin** and click **Update**.
    ![Assign login permissions to Alex]({{base_path}}/assets/img/guides/assign-login-permissions.png)

The user will be granted login permissions for the management console along with other admin permissions. See the complete list of [access permissions](#access-permissions) given below.

## Access permissions

The permissions navigator that you use to enable permissions for a role is divided into two categories (**Super Admin** permissions and **Admin** permissions), as shown below. However, note that there may be other categories of permissions enabled for a WSO2 product depending on the type of features that are installed in the product.

![]({{base_path}}/assets/img/fragments/role-permissions.png)

You can access the permissions navigator for a particular role by clicking **Permissions** as shown below.  

![]({{base_path}}/assets/img/fragments/permission-navigator.png)

By default, every WSO2 Identity Server comes with the default [user]({{base_path}}/references/concepts/user-management/users/) and [role]({{base_path}}/references/concepts/user-management/roles-and-permissions/).

- The **Admin** role has all the permissions in the system enabled by default. Therefore, this is a super tenant with all permissions enabled.

    !!! Tip
        You can change the default role name '**admin**' of the Administrative role as described [here]({{base_path}}/guides/identity-lifecycles/edit-delete-roles/)

You can create new users and roles and configure permissions for the roles using the management console. However, note that you cannot modify the permissions of the **Admin** role. The possibility of managing users, roles, and permissions is granted by the **User Management** permission.

## Permissions

The descriptions of permissions in the **Permissions** navigator are as follows:

- The **Login** permission defined under **Admin** permissions allows users to log in to the product's management console. Therefore, this is the primary permission required for using the management console.

- The following table describes the permissions at the **Super Tenant** level. These are also referred to as **Super Admin** permissions.

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
    <img src="{{base_path}}/assets/img/fragments/super-admin-config.png" /></td>
    <td>The <strong>Super Admin/Configuration</strong> permissions are used to grant permission to the key functions in a product server, which is common to all the tenants. In each WSO2 product, several configuration permissions will be available depending on the features installed in the product.<br />
    <br />
    <strong>- Feature Management</strong> permission ensures that a user can control the features installed in the product using the management console. That is, the <strong>Features</strong> option will be enabled under the <strong>Configure</strong> menu.<br />
    <strong>- Logging</strong> permission enables the possibility to configure server logging from the management console. That is, the <strong>Logging</strong> option will be enabled under the <strong>Configure</strong> menu.</td>
    </tr>
    <tr class="even">
    <td><strong>Management</strong> permissions:<br /> <img src="{{base_path}}/assets/img/fragments/management-permissions.png" /></td>
    <td><p>The <strong>Super Admin/Manage</strong> permissions are used for adding new tenants and monitoring them.</p>
    <p><strong>- Modify/Tenants</strong> permission enables the <strong>Add New Tenant</strong> option in the <strong>Configure</strong> menu of the management console, which allows users to add new tenants.<br />
    <strong>- Monitor/Tenants</strong> permission enables the <strong>View Tenants</strong> option in the <strong>Configure</strong> menu of the management console.</p></td>
    </tr>
    <tr class="odd">
    <td><strong>Server Admin</strong> permissions:<br />
    <img src="{{base_path}}/assets/img/fragments/server-admin-permissions.png" /></td>
    <td>Selecting the <strong>Server Admin</strong> permission enables the <strong>Shutdown/Restart</strong> option in the <strong>Main</strong> menu of the management console.</td>
    </tr>
    </tbody>
    </table>

- The following table describes the permissions at the **Tenant** level. These are also referred to as **Admin** permissions.

    !!! info  
        Note that when you select a node in the **Permissions** navigator, all the subordinate permissions that are listed under the selected node are also automatically enabled.

    !!! note
        Also, not all permissions in the permission tree are listed here. You can get the information related to them throughout the documentation wherever applicable.


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
    <p><strong>- User Store Management:</strong> This permission allows users to add new user stores and manage them with the management console. Note that only secondary user stores can be added using this option. See the topic on <a href="{{base_path}}/deploy/configure-user-stores/">user store management</a> for more details.<br />
    <strong>- Identity Providers:</strong> 
    <p>- All permissions listed under <strong>Admin</strong> in the permissions navigator are selected automatically.</p></td>
    </tr>
    <tr class="even">
    <td>Admin/Configure</td>
    <td>When the <strong>Admin/Configure</strong> permission node is selected, the following menus are enabled in the management console:<br />
    <strong><br />
    - Main</strong> menu <strong>/PAP:</strong> 
    - Main</strong> menu <strong>/PDP:</strong> 
    - Tools</strong> menu <strong>/Tryit (XACML):</strong>
    - All permissions listed under <strong>Configure</strong> in the permissions navigator are selected automatically.</td>
    </tr>
    <tr class="odd">
    <td>Admin/Configure/Security</td>
    <td>When the <strong>Admin/Configure/Security</strong> permission node is selected, the following menus are enabled in the <strong>Configure</strong> menu of the management console:<br />
    <br />
    <strong>- Claim Management:</strong> See the topic on <a href="{{base_path}}/guides/dialects/configure-claims/">claim management</a> for details on how to use this option.<br />
    <strong>- Keystores:</strong> See the topic on <a href="{{base_path}}/deploy/security/create-new-keystores/">keystores</a> for details on how to use this option. <strong><br />
    </strong> <strong>- Email Templates:</strong> See the topics on <a href="{{base_path}}/guides/tenants/customize-automated-mails/">email templates</a> for details on how to use this option.<br />
    <br />
    - This permission will also enable the <strong>Roles</strong> option under <strong>Configure/Users and Roles</strong> . See the topics on <a href="{{base_path}}/guides/identity-lifecycles/manage-user-overview/"></a>configuring Users, and <a href="{{base_path}}/guides/identity-lifecycles/manage-roles-overview/">roles</a> for more information.<br />
    <br />
    - Additionally, all permissions listed under <strong>Security</strong> in the permissions navigator are selected automatically.</td>
    </tr>
    <tr class="even">
    <td>Admin/Configure/Security/Identity Management/User Management</td>
    <td>This permission allows adding users from the management console. That is, the <strong>Users</strong> option will be enabled under <strong>Configure/Users and Roles</strong> .</td>
    </tr>
    <tr class="odd">
    <td>Admin/Configure/Security/Identity Management/Password Management</td>
    <td>This permission enables the <strong>Change Password</strong> option for the users listed in the <strong>User Management/Users and Roles/Users</strong> screen, which allows the logged-in user to change the passwords</td>
    </tr>
    <tr class="even">
    <td>Admin/Configure/Security/Identity Management/Profile Management</td>
    <td>This permission enables the <strong>User Profile</strong> option for the users listed in the <strong>User Management/Users and Roles/Users</strong> screen, which allows the logged-inuser to update user profiles.</td>
    </tr>
    <tr class="odd">
    <td>Admin/Manage</td>
    <td>When the <strong>Admin/Manage</strong> permission is selected, the following menus will be enabled in the management console:<br />
    <br />
    <strong>- Main</strong> menu <strong>/Service Providers:</strong> 
    <strong>- Tools</strong> menu <strong>/SAML:</strong> 
    <br />
    </strong> - Additionally, all permissions listed under <strong>Admin/Manage</strong> in the permissions navigator will be enabled automatically. <strong></strong></td>
    </tr>
    <tr class="even">
    <td>Admin/Manage/Resources/Browse</td>
    <td>This permission enables the <strong>Browse</strong> option under the <strong>Registry</strong> menu in the main navigator. This option allows users to browse the resources stored in the registry using the <strong>Registry</strong> tree navigator. <strong><br />
    </strong></td>
    </tr>
    <tr class="odd">
    <td>Admin/Manage/Search</td>
    <td>This permission enables the <strong>Search</strong> option under the <strong>Registry</strong> sub-menu in the <strong>Main</strong> menu. This option allows users to search for specific resources stored in the registry by filling in the search criteria. <strong><br />
    </strong></td>
    </tr>
    <tr class="even">
    <td>Admin/Monitor</td>
    <td>When the <strong>Admin/Monitor</strong> permission node is selected, the following menus are enabled in the management console:<br />
    <br />
    <strong>- Monitor</strong> menu <strong>/System Statistics:</strong> See the topic on <a href="{{base_path}}/deploy/monitor/system-statistics/">system statistics</a> for information on how to use this option.<br />
    <br />
    - Additionally, all permissions listed under <strong>Admin/Monitor</strong> in the permissions navigator will be enabled automatically.</td>
    </tr>
    <tr class="odd">
    <td>Admin/Monitor/Logs</td>
    <td>When the <strong>Admin/Monitor/Logs</strong> permission node is selected, the following menus are enabled in the management console:<br />
    <br />
    <strong>- Monitor</strong> menu <strong>/Application Logs</strong><br />
    <strong>- Monitor</strong> menu <strong>/System Logs</strong><br />
    <br />
    See the topic on <a href="{{base_path}}/deploy/monitor/monitor-logs/">system logs</a> for information on how to use these options.</td>
    </tr>
    </tbody>
    </table>

<!-- ## Manage role-based permissions using SOAP API

The following operations on permissions on roles are available through SOAP APIs.

### authorizeRole

<table>
<tr>
<th>Description</th>
<td>This operation authorizes the given role to perform the specified action on the given resource.</td>
</tr>
<tr>
<th>Input Parameters</th>
<td>
    <ul>
    <li><code>roleName</code>: This is the name of the role, e.g. <code>role1</code>.</li>
    <li><code>resourceId</code>: This is the resource path, e.g., <code>/permission/admin/login</code>.</li>
    <li><code>action</code>: This is the name of the action to be performed on the resource, e.g., <code>ui.execute</code>.</li>
    </ul>
</td>
</tr>
<tr>
<th>Request</th>
<td>
    <div style="width: 100%; display: block; overflow: auto;">
    <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ser="http://service.ws.um.carbon.wso2.org"&gt;
&lt;soapenv:Header/&gt;
&lt;soapenv:Body&gt;
&lt;ser:authorizeRole&gt;
&lt;!­­--Optional:­­--&gt;
&lt;ser:roleName&gt;role1&lt;/ser:roleName&gt;
&lt;!--­­Optional:­­--&gt;
&lt;ser:resourceId&gt;/permission/admin/login&lt;/ser:resourceId&gt;
&lt;!--­­Optional:­­--&gt;
&lt;ser:action&gt;ui.execute&lt;/ser:action&gt;
&lt;/ser:authorizeRole&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
</div>
</td>
</tr>
<tr>
<th>Response</th>
<td>No response on success</td>
</tr>
<tr>
<th>Error Codes</th>
<td>
    <ul>
    <li>Invalid data provided</li>
    <li>Error in connection rollback</li>
    <li>Error! DB error occurred while checking is existing system role for : <code>roleName</code> & tenant id : <code>tenantId</code></li>
    <li>Error! Error occurred while getting UI permission ID for resource id : <code>resourceId</code> & action : <code>action</code> </li>
    <li>Error! Error occurred while adding UI permission ID for resource id : <code>resourceId</code> & action : <code>action</code></li>
    <li>Error! Using sql : <code>sqlStmt</code></li>
    <li>Error! Error while authorizing role: roleName in permission tree for resource id: <code>resourceId</code> for action: <code>action</code></li>
    <li>Error! Error while denying role: roleName in permission tree for resource id: <code>resourceId</code> for action: <code>action</code></li>
    </ul>
</td>
</tr>
</table>

### clearAllRoleAuthorization

<table>
<tr>
<th>Description</th>
<td>This operation clears all authorizations of the role.</td>
</tr>
<tr>
<th>Input Parameters</th>
<td>
    <ul>
    <li><code>roleName</code>: This is the name of the role, e.g., <code>role1</code>.</li>
    </ul>
</td>
</tr>
<tr>
<th>Request</th>
<td>
    <div style="width: 100%; display: block; overflow: auto;">
    <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ser="http://service.ws.um.carbon.wso2.org"&gt;
&lt;soapenv:Header/&gt;
&lt;soapenv:Body&gt;
&lt;ser:clearAllRoleAuthorization&gt;
&lt;!­­--Optional:­­--&gt;
&lt;ser:roleName&gt;role1&lt;/ser:roleName>
&lt;/ser:clearAllRoleAuthorization&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
</div>
</td>
</tr>
<tr>
<th>Response</th>
<td>No response on success</td>
</tr>
<tr>
<th>Error Codes</th>
<td>
    <ul>
    <li>Error occurred while clearing role authorizations for role : <code>roleName</code></li>
    </ul>
</td>
</tr>
</table>

### clearResourceAuthorizations

<table>
<tr>
<th>Description</th>
<td>This operation clears all the authorizations for the given resource.</td>
</tr>
<tr>
<th>Input Parameters</th>
<td>
    <ul>
    <li><code>resourceId</code>: This is the resource path, e.g., <code>/permission/admin/login</code>.</li>
    </ul>
</td>
</tr>
<tr>
<th>Request</th>
<td>
    <div style="width: 100%; display: block; overflow: auto;">
    <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ser="http://service.ws.um.carbon.wso2.org"&gt;
&lt;soapenv:Header/&gt;
&lt;soapenv:Body&gt;
&lt;ser:clearResourceAuthorizations&gt;
&lt;!--­­Optional:­­--&gt;
&lt;ser:resourceId&gt;/permission/admin/login&lt;/ser:resourceId&gt;
&lt;/ser:clearResourceAuthorizations&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
</div>
</td>
</tr>
<tr>
<th>Response</th>
<td>No response on success</td>
</tr>
<tr>
<th>Error Codes</th>
<td>
    <ul>
    <li>Error occurred while clearing resource authorizations for resource id : <code>resourceId</code></li>
    </ul>
</td>
</tr>
</table>

### clearRoleActionOnAllResources

<table>
<tr>
<th>Description</th>
<td>This operation removes the authorization from the role to perform the specified action on all the resources.</td>
</tr>
<tr>
<th>Input Parameters</th>
<td>
    <ul>
    <li><code>action</code>: This is the action name of the action to be performed on the resource, e.g., <code>ui.execute</code>.</li>
    </ul>
</td>
</tr>
<tr>
<th>Request</th>
<td>
    <div style="width: 100%; display: block; overflow: auto;">
    <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ser="http://service.ws.um.carbon.wso2.org"&gt;
&lt;soapenv:Header/&gt;
&lt;soapenv:Body&gt;
&lt;ser:clearRoleActionOnAllResources&gt;
&lt;!--­­Optional:­­--&gt;
&lt;ser:action&gt;ui.execute&lt;/ser:action&gt;
&lt;/ser:clearRoleActionOnAllResources&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
</div>
</td>
</tr>
<tr>
<th>Response</th>
<td>No response on success</td>
</tr>
<tr>
<th>Error Codes</th>
<td>
    <ul>
    <li>Error occurred while clearing role action on all resources for role : <code>roleName</code> & action : <code>action</code></li>
    </ul>
</td>
</tr>
</table>

### clearRoleAuthorization

<table>
<tr>
<th>Description</th>
<td>This operation clears the authorization of the specified role to perform the given action on the resource.</td>
</tr>
<tr>
<th>Input Parameters</th>
<td>
    <ul>
    <li><code>roleName  </code>: This is the name of the role, e.g., <code>role1"</code>.</li>
    <li><code>resourceId</code>: This is the resource path e.g., <code>/permission/admin/login</code>.</li>
    <li><code>action</code>: This is the action name of the action to be performed on the resource, e.g., <code>ui.execute</code>.</li>
    </ul>
</td>
</tr>
<tr>
<th>Request</th>
<td>
    <div style="width: 100%; display: block; overflow: auto;">
    <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ser="http://service.ws.um.carbon.wso2.org"&gt;
&lt;soapenv:Header/&gt;
&lt;soapenv:Body&gt;
&lt;ser:clearRoleAuthorization&gt;
&lt;!­­--Optional:­­--&gt;
&lt;ser:roleName&gt;role1&lt;/ser:roleName&gt;
&lt;!--­­Optional:­­--&gt;
&lt;ser:resourceId&gt;/permission/admin/login&lt;/ser:resourceId>
&lt;!--­­Optional:­­--&gt;
&lt;ser:action&gt;ui.execute&lt;/ser:action&gt;
&lt;/ser:clearRoleAuthorization&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
</div>
</td>
</tr>
<tr>
<th>Response</th>
<td>No response on success</td>
</tr>
<tr>
<th>Error Codes</th>
<td>
    <ul>
    <li>Error occurred while clearing role authorizations for role : <code>roleName</code> + & resource id : <code>resourceId</code> & action : <code>action</code></li>
    </ul>
</td>
</tr>
</table>

### denyRole

<table>
<tr>
<th>Description</th>
<td>This operation removes the authorization of the role to perform the given action on the specified resource.</td>
</tr>
<tr>
<th>Input Parameters</th>
<td>
    <ul>
    <li><code>roleName  </code>: This is the name of the role, e.g., <code>role1</code>.</li>
    <li><code>resourceId</code>: This is the resource path, e.g., <code>/permission/admin/login</code>.</li>
    <li><code>action</code>: This is the action name of the action to be performed on the resource, e.g., <code>ui.execute</code>.</li>
    </ul>
</td>
</tr>
<tr>
<th>Request</th>
<td>
    <div style="width: 100%; display: block; overflow: auto;">
    <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ser="http://service.ws.um.carbon.wso2.org"&gt;
&lt;soapenv:Header/&gt;
&lt;soapenv:Body&gt;
&lt;ser:denyRole&gt;
&lt;!­­--Optional:­­--&gt;
&lt;ser:roleName&gt;role1&lt;/ser:roleName&gt;
&lt;!--­­Optional:­­--&gt;
&lt;ser:resourceId&gt;/permission/admin/login&lt;/ser:resourceId&gt;
&lt;!--­­Optional:­­--&gt;
&lt;ser:action&gt;ui.execute&lt;/ser:action&gt;
&lt;/ser:denyRole&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
</div>
</td>
</tr>
<tr>
<th>Response</th>
<td>No response on success</td>
</tr>
<tr>
<th>Error Codes</th>
<td>
    <ul>
    <li>Invalid data provided</li>
    </ul>
</td>
</tr>
</table>

### getAllowedRolesForResource

<table>
<tr>
<th>Description</th>
<td>This operation retrieves the list of authorized roles to perform the given action on the specified resource.</td>
</tr>
<tr>
<th>Input Parameters</th>
<td>
    <ul>
    <li><code>resourceId</code>: This is the resource path, e.g., <code>/permission/admin/login</code>.</li>
    <li><code>action</code>: This is the action name of the action to be performed on the resource, e.g., <code>ui.execute</code>.</li>
    </ul>
</td>
</tr>
<tr>
<th>Request</th>
<td>
    <div style="width: 100%; display: block; overflow: auto;">
    <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ser="http://service.ws.um.carbon.wso2.org"&gt;
&lt;soapenv:Header/&gt;
&lt;soapenv:Body&gt;
&lt;ser:getAllowedRolesForResource&gt;
&lt;!--­­Optional:­­--&gt;
&lt;ser:resourceId&gt;/permission/admin/login&lt;/ser:resourceId&gt;
&lt;!--­­Optional:­­--&gt;
&lt;ser:action&gt;ui.execute&lt;/ser:action&gt;
&lt;/ser:getAllowedRolesForResource&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
</div>
</td>
</tr>
<tr>
<th>Response</th>
<td>
    <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"&gt;
&lt;soapenv:Body&gt;
&lt;ns:getAllowedRolesForResourceResponse xmlns:ns="http://service.ws.um.carbon.wso2.org"
xmlns:ax2599="http://core.user.carbon.wso2.org/xsd"
xmlns:ax2600="http://api.user.carbon.wso2.org/xsd"&gt;
&lt;ns:return&gt;admin&lt;/ns:return&gt;
&lt;ns:return&gt;myrole&lt;/ns:return&gt;
&lt;/ns:getAllowedRolesForResourceResponse&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
</td>
</tr>
<tr>
<th>Error Codes</th>
<td>
    <ul>
    <li>Error loading authorizations. Please check the database. Error message is + <code>errorMessage</code></li>
    <li>Error! Error while authorizing role: <code>roleName</code> in permission tree for resource id: <code>resourceId</code> for action: <code>action</code></li>
    <li>Error! Error while denying role: <code>roleName</code> in permission tree for resource id: resourceId for action: <code>action</code></li>
    </ul>
</td>
</tr>
</table>

### getAllowedUIResourcesForUser

<table>
<tr>
<th>Description</th>
<td>This operation retrieves the list of UI resources in the specified root patch for which the user has authorization.</td>
</tr>
<tr>
<th>Input Parameters</th>
<td>
    <ul>
    <li><code>userName</code>: This is the username of the specific user, e.g., <code>admin</code>.</li>
    <li><code>permissionRootPath</code>: This is the permission root path.</li>
    </ul>
</td>
</tr>
<tr>
<th>Request</th>
<td>
    <div style="width: 100%; display: block; overflow: auto;">
    <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ser="http://service.ws.um.carbon.wso2.org"&gt;
&lt;soapenv:Header/&gt;
&lt;soapenv:Body&gt;
&lt;ser:getAllowedUIResourcesForUser&gt;
&lt;!--­­Optional:­­--&gt;
&lt;ser:userName&gt;admin&lt;/ser:userName&gt;
&lt;!--­­Optional:­­--&gt;
&lt;ser:permissionRootPath&gt;/&lt;/ser:permissionRootPath&gt;
&lt;/ser:getAllowedUIResourcesForUser&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
</div>
</td>
</tr>
<tr>
<th>Response</th>
<td>
    <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"&gt;
&lt;soapenv:Body&gt;
&lt;ns:getAllowedUIResourcesForUserResponse xmlns:ns="http://service.ws.um.carbon.wso2.org"
xmlns:ax2599="http://core.user.carbon.wso2.org/xsd"
xmlns:ax2600="http://api.user.carbon.wso2.org/xsd"&gt;
&lt;ns:return&gt;/permission&lt;/ns:return&gt;
&lt;ns:return&gt;/permission/admin/configure/&lt;/ns:return&gt;
&lt;ns:return&gt;/permission/admin/login/&lt;/ns:return&gt;
&lt;ns:return&gt;/permission/admin/manage/&lt;/ns:return&gt;
&lt;ns:return&gt;/permission/admin/monitor/&lt;/ns:return&gt;
&lt;ns:return&gt;/permission/protected/&lt;/ns:return&gt;
&lt;ns:return&gt;/permission/testlogin/&lt;/ns:return&gt;
&lt;/ns:getAllowedRolesForResourceResponse&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
</td>
</tr>
<tr>
<th>Error Codes</th>
<td>
    <ul>
    <li>Invalid Permission root path provided</li>
    <li>Error loading authorizations. Please check the database. Error message is <code>message</code></li>
    </ul>
</td>
</tr>
</table>

### isRoleAuthorized

<table>
<tr>
<th>Description</th>
<td>This operation checks whether the given role is authorized to perform the action on the specified resource.</td>
</tr>
<tr>
<th>Input Parameters</th>
<td>
    <ul>
    <li><code>roleName</code>: This is the name of the role, e.g., <code>role1</code>.</li>
    <li><code>resourceId</code>: This is the resource path, e.g., <code>/permission/admin/login</code>.</li>
    <li><code>action</code>: This is the action name of the action to be performed on the resource, e.g., <code>ui.execute</code>.</li>
    </ul>
</td>
</tr>
<tr>
<th>Request</th>
<td>
    <div style="width: 100%; display: block; overflow: auto;">
    <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ser="http://service.ws.um.carbon.wso2.org"&gt;
&lt;soapenv:Header/&gt;
&lt;soapenv:Body&gt;
&lt;ser:isRoleAuthorized&gt;
&lt;!­­--Optional:­­--&gt;
&lt;ser:roleName&gt;role1&lt;/ser:roleName&gt;
&lt;!--­­Optional:­­--&gt;
&lt;ser:resourceId&gt;/permission/admin/login&lt;/ser:resourceId&gt;
&lt;!--­­Optional:­­--&gt;
&lt;ser:action&gt;ui.execute&lt;/ser:action&gt;
&lt;/ser:isRoleAuthorized&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
</div>
</td>
</tr>
<tr>
<th>Response</th>
<td>
    <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"&gt;
&lt;soapenv:Body&gt;
&lt;ns:isRoleAuthorized xmlns:ns="http://service.ws.um.carbon.wso2.org"&gt;
&lt;ns:return&gt;false&lt;/ns:return&gt;
&lt;/ns:isRoleAuthorized&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
</td>
</tr>
<tr>
<th>Error Codes</th>
<td>
    <ul>
    <li>Error loading authorizations. Please check the database. Error message is + <code>errorMessage</code></li>
    </ul>
</td>
</tr>
</table>

-->

!!! info "Related topics"
    - [Concept: Roles and Permissions]({{base_path}}/references/concepts/user-management/roles-and-permissions)
    - [Guide: Edit/Delete Roles]({{base_path}}/guides/identity-lifecycles/edit-delete-roles)