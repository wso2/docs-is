# Managing Permissions with APIs

The following section describes the [RemoteAuthorizationManager
API](https://localhost:9443/services/RemoteAuthorizationManagerService?wsdl)
and the operations that come with it.

Permissions can be assigned to user roles. The permission is an
**authorization** to perform a specific **action** on a **resource** .
For instance, a user role can have permission (i.e., **authorization** )
to add and delete (i.e., **actions** ) service providers (i.e., the
**resource** ). The following set of actions can be performed on a
resource.

-   get
-   add
-   delete
-   edit
-   login

-   man\_config
-   man\_lc\_config
-   man\_sec
-   up\_serv
-   man\_serv
-   man\_media

-   mon\_sys
-   del\_id
-   authorize
-   inv\_ser
-   ui\_execute

-   subscribe
-   publish
-   consume
-   change\_permission
-   browse

-   sqs\_send\_message
-   sqs\_receive\_message
-   sqs\_delete\_message
-   sqs\_change\_message\_visibility
-   sqs\_get\_queue\_attributes

The following operations are available in this API:

-   [authorizeRole](#ManagingPermissionswithAPIs-authorizeRole)
-   [clearAllRoleAuthorization](#ManagingPermissionswithAPIs-clearAllRoleAuthorization)
-   [clearResourceAuthorizations](#ManagingPermissionswithAPIs-clearResourceAuthorizations)
-   [clearRoleActionOnAllResources](#ManagingPermissionswithAPIs-clearRoleActionOnAllResources)
-   [clearRoleAuthorization](#ManagingPermissionswithAPIs-clearRoleAuthorization)
-   [denyRole](#ManagingPermissionswithAPIs-denyRole)
-   [getAllowedRolesForResource](#ManagingPermissionswithAPIs-getAllowedRolesForResource)
-   [getAllowedUIResourcesForUser](#ManagingPermissionswithAPIs-getAllowedUIResourcesForUser)
-   [isRoleAuthorized](#ManagingPermissionswithAPIs-isRoleAuthorized)

### authorizeRole

This function authorizes the given role to perform the specified action
on the given resource.

**Input parameters**

| Parameter  | Description                                                                        |
|------------|------------------------------------------------------------------------------------|
| roleName   | The name of the role (e.g., "role1")                                               |
| resourceId | The resource path (e.g., "/permission/admin/login")                                |
| action     | The action name of the action to be performed on the resource (e.g., "ui.execute") |

  
  

-   [**Request**](#958fc1ddca894fb7a4fed1bca41ce27a)
-   [**Response**](#d5a28adfce704fc88ad229e841d742c5)

``` xml
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

``` java
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

  
  

-   [**Request**](#d4dd969650d6440ea24b3a6578f845a9)
-   [**Response**](#919a3bbc06704386958635ad6a8e93fd)

``` xml
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

``` java
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

  
  

-   [**Request**](#e859efc8422b4b5b8864aa4842f7758e)
-   [**Response**](#d105204b8f6749a58b6da79de177325f)

``` xml
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

``` java
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

  
  

-   [**Request**](#58f2b8d0c6514e57a2d0e11a3542f2c1)
-   [**Response**](#a51d31be7cc443a994203d535cb0b2fd)

``` xml
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

``` java
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

  
  

-   [**Request**](#555ebceb8a684ce1be86da59372e97ca)
-   [**Response**](#c303cea46a46439e841f919e1cedefe0)

``` xml
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

``` java
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

  
  

-   [**Request**](#1e5d10e63cb14f8d8992e6371ddb6eb8)
-   [**Response**](#8316798806ab438a9e9cf599f07a7f23)

``` xml
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

``` java
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

  
  

-   [**Request**](#32d76dc691264bedaea604c14d86a021)
-   [**Response**](#e0ac4a10c212458db91878b539d96d36)

``` xml
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

``` xml
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

  
  

-   [**Request**](#80d86afc79984699ac2b000f2e608bdd)
-   [**Response**](#bd74feb0c4e64d158c33602229d18537)

``` xml
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

``` xml
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

  
  

-   [**Request**](#3ec4a61ef32443049b4f82cb9acb6ee8)
-   [**Response**](#a8267b7ca8804102858328a0c57ae2fb)

``` xml
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

``` xml
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
