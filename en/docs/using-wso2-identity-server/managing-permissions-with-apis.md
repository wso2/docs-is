# Managing Permissions with APIs

The following section describes the [RemoteAuthorizationManager
API](https://localhost:9443/services/RemoteAuthorizationManagerService?wsdl)
and the operations that come with it.

Permissions can be assigned to user roles. The permission is an
**authorization** to perform a specific **action** on a **resource**.
For instance, a user role can have permission (i.e., **authorization** )
to add and delete (i.e., **actions** ) service providers (i.e., the
**resource** ). The following set of actions can be performed on a
resource.

<table>
<tbody>
<tr>
<td>
<ul>
<li>get</li>
<li>add</li>
<li>delete</li>
<li>edit</li>
<li>login</li>
<ul>
</td>
<td>
<ul>
<li>man_config</li>
<li>man_lc_config</li>
<li>man_sec</li>
<li>up_serv</li>
<li>man_serv</li>
<li>man_media</li>
</ul>
</td>
<td>
<ul>
<li>mon_sys</li>
<li>del_id</li>
<li>authorize</li>
<li>inv_ser</li>
<li>ui_execute</li>
</ul>
</td>
<td>
<ul>
<li>subscribe</li>
<li>publish</li>
<li>consume</li>
<li>change_permission</li>
<li>browse</li>
</ul>
</td>
<td>
<ul>
<li>sqs_send_message</li>
<li>sqs_receive_message</li>
<li>sqs_delete_message</li>
<li>sqs_change_message_visibility</li>
<li>sqs_get_queue_attributes</li>
</ul>
</td>
</tr>
</tbody>
</table>

The following operations are available in this API:

### authorizeRole

This function authorizes the given role to perform the specified action
on the given resource.

**Input parameters**

| Parameter  | Description                                                                        |
|------------|------------------------------------------------------------------------------------|
| roleName   | The name of the role (e.g., "role1")                                               |
| resourceId | The resource path (e.g., "/permission/admin/login")                                |
| action     | The action name of the action to be performed on the resource (e.g., "ui.execute") |

  


``` xml tab="Request"
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ser="http://service.ws.um.carbon.wso2.org">
 <soapenv:Header/>
 <soapenv:Body>
  <ser:authorizeRole>
   <!­­--Optional:­­-->
   <ser:roleName>role1</ser:roleName>
   <!--­­Optional:­­-->
   <ser:resourceId>/permission/admin/login</ser:resourceId>
   <!--­­Optional:­­-->
   <ser:action>ui.execute</ser:action>
  </ser:authorizeRole>
 </soapenv:Body>
</soapenv:Envelope>
```

``` xml tab="Response"
No response on Success
```

**Error codes**

|                                                                                                                                                                       |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Invalid data provided                                                                                                                                                 |
| Error in connection rollback                                                                                                                                          |
| Error! DB error occurred while checking is existing system role for : `             roleName            ` & tenant id : `             tenantId            `           |
| Error! Error occurred while getting UI permission ID for resource id : `             resourceId            ` & action : `             action            `             |
| Error! Error occurred while adding UI permission ID for resource id : `             resourceId            ` & action : `             action            `              |
| Error! Using sql : `             sqlStmt            `                                                                                                                 |
| Error! Error while authorizing role: roleName in permission tree for resource id: `             resourceId            ` for action: `             action            ` |
| Error! Error while denying role: roleName in permission tree for resource id: `             resourceId            ` for action: `             action            `     |

### clearAllRoleAuthorization

This function clears all authorizations of the role.

**Input parameters**

| Parameter | Description                          |
|-----------|--------------------------------------|
| roleName  | The name of the role (e.g., "role1") |


``` xml tab="Request"
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ser="http://service.ws.um.carbon.wso2.org">
 <soapenv:Header/>
 <soapenv:Body>
  <ser:clearAllRoleAuthorization>
   <!­­--Optional:­­-->
   <ser:roleName>role1</ser:roleName>
  </ser:clearAllRoleAuthorization>
 </soapenv:Body>
</soapenv:Envelope>
```

```xml tab="Response"
No response on Success
```

**Error codes**

|                                                                                                  |
|--------------------------------------------------------------------------------------------------|
| Error occurred while clearing role authorizations for role : `             roleName            ` |

### clearResourceAuthorizations

This function clears all the authorizations for the given resource.

**Input parameters**

| Parameter  | Description                                         |
|------------|-----------------------------------------------------|
| resourceId | The resource path (e.g., "/permission/admin/login") |


``` xml tab="Request"
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ser="http://service.ws.um.carbon.wso2.org">
 <soapenv:Header/>
 <soapenv:Body>
  <ser:clearResourceAuthorizations>
   <!--­­Optional:­­-->
   <ser:resourceId>/permission/admin/login</ser:resourceId>
  </ser:clearResourceAuthorizations>
 </soapenv:Body>
</soapenv:Envelope>
```

``` xml tab="Response"
No response on Success
```

**Error codes**

|                                                                                                               |
|---------------------------------------------------------------------------------------------------------------|
| Error occurred while clearing resource authorizations for resource id : `             resourceId            ` |

### clearRoleActionOnAllResources

This function removes the authorization from the role to perform the
specified action on all the resources.

**Input parameters**

| Parameter | Description                                                                        |
|-----------|------------------------------------------------------------------------------------|
| action    | The action name of the action to be performed on the resource (e.g., "ui.execute") |

  
``` xml tab="Request"
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ser="http://service.ws.um.carbon.wso2.org">
 <soapenv:Header/>
 <soapenv:Body>
  <ser:clearRoleActionOnAllResources>
   <!--­­Optional:­­-->
   <ser:action>ui.execute</ser:action>
  </ser:clearRoleActionOnAllResources>
 </soapenv:Body>
</soapenv:Envelope>
```

``` xml tab="Response"
No response on Success
```

**Error codes**

|                                                                                                                                                        |
|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| Error occurred while clearing role action on all resources for role : `             roleName            ` & action : `             action            ` |

### clearRoleAuthorization

This function clear the authorization of the specified role to perform
the given action on the resource.

**Input parameters**

| Parameter  | Description                                                                        |
|------------|------------------------------------------------------------------------------------|
| roleName   | The name of the role (e.g., "role1")                                               |
| resourceId | The resource path (e.g., "/permission/admin/login")                                |
| action     | The action name of the action to be performed on the resource (e.g., "ui.execute") |

  
``` xml tab="Request"
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ser="http://service.ws.um.carbon.wso2.org">
 <soapenv:Header/>
 <soapenv:Body>
  <ser:clearRoleAuthorization>
   <!­­--Optional:­­-->
   <ser:roleName>role1</ser:roleName>
   <!--­­Optional:­­-->
   <ser:resourceId>/permission/admin/login</ser:resourceId>
   <!--­­Optional:­­-->
   <ser:action>ui.execute</ser:action>
  </ser:clearRoleAuthorization>
 </soapenv:Body>
</soapenv:Envelope>
```

``` xml tab="Response"
No response on Success
```

**Error codes**

|                                                                                                                                                                                                       |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Error occurred while clearing role authorizations for role : `             roleName            ` + & resource id : `             resourceId            ` & action : `             action            ` |

### denyRole

This function removes the authorization of the role to perform the given
action on the specified resource.

**Input parameters**

| Parameter  | Description                                                                        |
|------------|------------------------------------------------------------------------------------|
| roleName   | The name of the role (e.g., "role1")                                               |
| resourceId | The resource path (e.g., "/permission/admin/login")                                |
| action     | The action name of the action to be performed on the resource (e.g., "ui.execute") |

  
``` xml tab="Request"
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ser="http://service.ws.um.carbon.wso2.org">
 <soapenv:Header/>
 <soapenv:Body>
  <ser:denyRole>
   <!­­--Optional:­­-->
   <ser:roleName>role1</ser:roleName>
   <!--­­Optional:­­-->
   <ser:resourceId>/permission/admin/login</ser:resourceId>
   <!--­­Optional:­­-->
   <ser:action>ui.execute</ser:action>
  </ser:denyRole>
 </soapenv:Body>
</soapenv:Envelope>
```

``` xml tab="Response"
No response on Success
```

**Error codes**

|                       |
|-----------------------|
| Invalid data provided |

### getAllowedRolesForResource

This function retrieves the list of authorized roles to perform the
given action on the specified resource.

**Input parameters**

| Parameter  | Description                                                                        |
|------------|------------------------------------------------------------------------------------|
| resourceId | The resource path (e.g., "/permission/admin/login")                                |
| action     | The action name of the action to be performed on the resource (e.g., "ui.execute") |


```xml tab="Request"
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ser="http://service.ws.um.carbon.wso2.org">
 <soapenv:Header/>
 <soapenv:Body>
  <ser:getAllowedRolesForResource>
   <!--­­Optional:­­-->
   <ser:resourceId>/permission/admin/login</ser:resourceId>
   <!--­­Optional:­­-->
   <ser:action>ui.execute</ser:action>
  </ser:getAllowedRolesForResource>
 </soapenv:Body>
</soapenv:Envelope>
```

``` xml tab="Response"
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
 <soapenv:Body>
  <ns:getAllowedRolesForResourceResponse xmlns:ns="http://service.ws.um.carbon.wso2.org"
xmlns:ax2599="http://core.user.carbon.wso2.org/xsd"
xmlns:ax2600="http://api.user.carbon.wso2.org/xsd">
   <ns:return>admin</ns:return>
   <ns:return>myrole</ns:return>
  </ns:getAllowedRolesForResourceResponse>
 </soapenv:Body>
</soapenv:Envelope>
```

**Error codes**

|                                                                                                                                                                                                  |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Error loading authorizations. Please check the database. Error message is + `             errorMessage            `                                                                              |
| Error! Error while authorizing role: `             roleName            ` in permission tree for resource id: `             resourceId            ` for action: `             action            ` |
| Error! Error while denying role: `             roleName            ` in permission tree for resource id: resourceId for action: `             action            `                                |

### getAllowedUIResourcesForUser

This function retrieves the list of UI resources in the specified root
patch for which the user has authorization.

**Input parameters**

| Parameter          | Description                                       |
|--------------------|---------------------------------------------------|
| userName           | The username of the specific user (e.g., "admin") |
| permissionRootPath | The permission root path                          |


``` xml tab="Request"
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ser="http://service.ws.um.carbon.wso2.org">
 <soapenv:Header/>
 <soapenv:Body>
  <ser:getAllowedUIResourcesForUser>
   <!--­­Optional:­­-->
   <ser:userName>admin</ser:userName>
   <!--­­Optional:­­-->
   <ser:permissionRootPath>/</ser:permissionRootPath>
  </ser:getAllowedUIResourcesForUser>
 </soapenv:Body>
</soapenv:Envelope>
```

``` xml tab="Response"
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
 <soapenv:Body>
  <ns:getAllowedUIResourcesForUserResponse xmlns:ns="http://service.ws.um.carbon.wso2.org"
xmlns:ax2599="http://core.user.carbon.wso2.org/xsd"
xmlns:ax2600="http://api.user.carbon.wso2.org/xsd">
   <ns:return>/permission</ns:return>
   <ns:return>/permission/admin/configure/</ns:return>
   <ns:return>/permission/admin/login/</ns:return>
   <ns:return>/permission/admin/manage/</ns:return>
   <ns:return>/permission/admin/monitor/</ns:return>
   <ns:return>/permission/protected/</ns:return>
   <ns:return>/permission/testlogin/</ns:return>
  </ns:getAllowedRolesForResourceResponse>
 </soapenv:Body>
</soapenv:Envelope>
```

**Error codes**

|                                                                                                              |
|--------------------------------------------------------------------------------------------------------------|
| Invalid Permission root path provided                                                                        |
| Error loading authorizations. Please check the database. Error message is `             message            ` |

### isRoleAuthorized

This function checks whether the given role is authorized to perform the
action on the specified resource.

**Input parameters**

| Parameter  | Description                                                                        |
|------------|------------------------------------------------------------------------------------|
| roleName   | The name of the role (e.g., "role1")                                               |
| resourceId | The resource path (e.g., "/permission/admin/login")                                |
| action     | The action name of the action to be performed on the resource (e.g., "ui.execute") |


``` xml tab="Request"
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ser="http://service.ws.um.carbon.wso2.org">
 <soapenv:Header/>
 <soapenv:Body>
  <ser:isRoleAuthorized>
   <!­­--Optional:­­-->
   <ser:roleName>role1</ser:roleName>
   <!--­­Optional:­­-->
   <ser:resourceId>/permission/admin/login</ser:resourceId>
   <!--­­Optional:­­-->
   <ser:action>ui.execute</ser:action>
  </ser:isRoleAuthorized>
 </soapenv:Body>
</soapenv:Envelope>
```

``` xml tab="Response"
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
 <soapenv:Body>
  <ns:isRoleAuthorized xmlns:ns="http://service.ws.um.carbon.wso2.org">
   <ns:return>false</ns:return>
  </ns:isRoleAuthorized>
 </soapenv:Body>
</soapenv:Envelope>
```

**Error codes**

|                                                                                                                     |
|---------------------------------------------------------------------------------------------------------------------|
| Error loading authorizations. Please check the database. Error message is + `             errorMessage            ` |
