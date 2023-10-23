# Manage Users and Roles with SOAP APIs

!!! warning
    
    From 5.4.0 onwards, SCIM 2.0 REST APIs are supported out-of-the-box with
    WSO2 Identity Server and is recommended for user store management. For
    more information on using the SCIM 2.0 REST APIs instead of the SOAP
    service given below, see [SCIM 2.0 REST
    APIs]({{base_path}}/scim2-rest-apis/).
    

This section guides you through invoking and working with the
**RemoteUserStoreManagerService** and the operations you can work with
in this service.

---

## Invoking the admin service

`         RemoteUserStoreManagerService        ` is an admin service of
the WSO2 Carbon platform. As admin services are secured to prevent
anonymous invocations, you cannot view the WSDL of the admin service by
default. Follow the steps below to view and invoke it:

1.  Set the  below configuration in
    `           <IS_HOME>/repository/conf/deployment.toml          ` file.

    ``` 
    [admin_service.wsdl]
    enable = true
    ```

2.  Restart the Identity Server.
3.  If you have started the server in default configurations, use the
    following URL in your browser to see the WSDL of the admin service:
    <https://localhost:9443/services/RemoteUserStoreManagerService?wsdl>

For more information on WSO2 admin services and how to invoke an admin
service using either SoapUI or any other client program, see [Call Admin Services]({{base_path}}/apis/call-admin-services).

---

## Operations included in the API and sample requests

The following operations are available in the
**RemoteUserStoreManagerService**.

!!! note
    
    For the methods that have **profile name** as an input parameter, you
    can also pass null for the parameter so the default profile
    will then be considered instead.
    
---

### authenticate()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>authenticate</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Authenticate users against the user store</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Username</td>
<td>string</td>
<td>Provide the relevant user's username</td>
</tr>
<tr class="even">
<td>Credential</td>
<td>string</td>
<td>Provide the relevant user's password</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>A boolean parameter indicating if the user has been authenticated or not</td>
</tr>
</tbody>
</table>

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:authenticate>
         <!--Optional:-->
         <ser:userName>nilasini</ser:userName>
         <!--Optional:-->
         <ser:credential>admin</ser:credential>
      </ser:authenticate>
   </soapenv:Body>
</soapenv:Envelope>
```

---

### isReadOnly()

|                   |                                                                      |
|-------------------|----------------------------------------------------------------------|
| Method            | isReadOnly                                                           |
| Description       | Check whether the user store is read only                            |
| Input Parameters  | None                                                                 |
| Output Parameters | A boolean parameter indicating if the user store is read only or not |

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:isReadOnly/>
   </soapenv:Body>
</soapenv:Envelope>
```

### getUserClaimValue()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>getUserClaimValue</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Retrieve the value of the user property from the user profile</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Username</td>
<td>String</td>
<td>Username</td>
</tr>
<tr class="even">
<td>Claim</td>
<td>String</td>
<td>Name of the claim</td>
</tr>
<tr class="odd">
<td>Profile Name</td>
<td>String</td>
<td>Name of the user profile</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>Value of the claim as a string</td>
</tr>
</tbody>
</table>

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getUserClaimValue>
         <!--Optional:-->
         <ser:userName>nila@wso2support.com</ser:userName>
         <!--Optional:-->
         <ser:claim>http://wso2.org/claims/lastname</ser:claim>
         <!--Optional:-->
         <ser:profileName>?</ser:profileName>
      </ser:getUserClaimValue>
   </soapenv:Body>
</soapenv:Envelope>
```

---

### getUserList()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>getUserList</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Retrieve a list of all users</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Claim URI</td>
<td>String</td>
<td>The Claim URI of the claim</td>
</tr>
<tr class="even">
<td>Claim Value</td>
<td>String</td>
<td>The value of the claim</td>
</tr>
<tr class="odd">
<td>Profile Name</td>
<td>String</td>
<td>Name of the user profile</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>List of users with the specified claim.</td>
</tr>
</tbody>
</table>

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getUserList>
         <!--Optional:-->
         <ser:claimUri>http://wso2.org/claims/country</ser:claimUri>
         <!--Optional:-->
         <ser:claimValue>srilanka</ser:claimValue>
         <!--Optional:-->
         <ser:profile>default</ser:profile>
      </ser:getUserList>
   </soapenv:Body>
</soapenv:Envelope>
```

---

### getUserListOfRole()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>getUserListOfRole</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Retrieve a list of all users belonging to a role</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Role Name</td>
<td>String</td>
<td>Name of the role</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>List of usernames as a string array</td>
</tr>
</tbody>
</table>

``` java
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getUserListOfRole>
         <!--Optional:-->
         <ser:roleName>Engineer</ser:roleName>
      </ser:getUserListOfRole>
   </soapenv:Body>
</soapenv:Envelope>
```

!!! note
    
    This operation retrieves a list of all the users. The users
    assigned to the specified role will be indicated in the list. Users
    belonging to the role are shown as **selected = true** and users not
    belonging to the role are shown as **selected = false**.

---    

### updateCredential()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>updateCredential</td>
</tr>
<tr class="even">
<td>Description</td>
<td>This operation can be used by the user itself to update his/her own password</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Username</td>
<td>String</td>
<td>Username</td>
</tr>
<tr class="even">
<td>New Credential</td>
<td>String</td>
<td>The new password</td>
</tr>
<tr class="odd">
<td>Old Credential</td>
<td>String</td>
<td>The old password</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>None</td>
</tr>
</tbody>
</table>

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:updateCredential>
         <!--Optional:-->
         <ser:userName>nila@wso2support.com </ser:userName>
         <!--Optional:-->
         <ser:newCredential>admin</ser:newCredential>
         <!--Optional:-->
         <ser:oldCredential>nilasini</ser:oldCredential>
      </ser:updateCredential>
   </soapenv:Body>
</soapenv:Envelope>
```

---

###  getUserClaimValuesForClaims()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>getUserClaimValuesForClaims</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Retrieve the claim values of a user when given a set of claims and a user profile</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Username</td>
<td>String</td>
<td>Username</td>
</tr>
<tr class="even">
<td>Set of Claims</td>
<td>String</td>
<td>Name of the claim</td>
</tr>
<tr class="odd">
<td>Profile Name</td>
<td>String</td>
<td>Name of the user profile</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>Array of objects of type ClaimValue which contains the claim mapping between claim URI and claim value</td>
</tr>
</tbody>
</table>

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getUserClaimValuesForClaims>
         <!--Optional:-->
         <ser:userName>nila@wso2support.com </ser:userName>
         <!--Zero or more repetitions:-->
         <ser:claims>country</ser:claims>
         <!--Optional:-->
         <ser:profileName>nila@wso2support.com </ser:profileName>
      </ser:getUserClaimValuesForClaims>
   </soapenv:Body>
</soapenv:Envelope>
```

---

### deleteUserClaimValue()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>deleteUserClaimValue</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Delete a single user claim value</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Username</td>
<td>String</td>
<td>Username</td>
</tr>
<tr class="even">
<td>Profile Name</td>
<td>String</td>
<td>Name of the user profile</td>
</tr>
<tr class="odd">
<td>Claim URI</td>
<td>String</td>
<td>The claim URI of the claim</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>None</td>
</tr>
</tbody>
</table>

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:deleteUserClaimValue>
         <!--Optional:-->
         <ser:userName>nila@wso2support.com</ser:userName>
         <!--Optional:-->
         <ser:claimURI>http://wso2.org/claims/lastname</ser:claimURI>
         <!--Optional:-->
         <ser:profileName>nila@wso2support.com</ser:profileName>
      </ser:deleteUserClaimValue>
   </soapenv:Body>
</soapenv:Envelope>
```

---

### isExistingUser()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>isExistingUser</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Check whether a given user name exists in the system</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Username</td>
<td>String</td>
<td>Username</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>A Boolean parameter indicating whether the user exists or not</td>
</tr>
</tbody>
</table>

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:isExistingUser>
         <!--Optional:-->
         <ser:userName>nila@wso2support.com</ser:userName>
      </ser:isExistingUser>
   </soapenv:Body>
</soapenv:Envelope>
```

---

### deleteUserClaimValues()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>deleteUserClaimValues</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Delete many user claim values</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Username</td>
<td>String</td>
<td>Username</td>
</tr>
<tr class="even">
<td>Profile Name</td>
<td>String</td>
<td>Name of the user profile</td>
</tr>
<tr class="odd">
<td>Claims</td>
<td>String Array</td>
<td>The claims to be deleted</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>None</td>
</tr>
</tbody>
</table>

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:deleteUserClaimValues>
         <!--Optional:-->
         <ser:userName>nila@wso2support.com</ser:userName>
         <!--Zero or more repetitions:-->
         <ser:claims>http://wso2.org/claims/organization</ser:claims>
         <ser:claims>http://wso2.org/claims/country</ser:claims>
         <!--Optional:-->
         <ser:profileName>default</ser:profileName>
      </ser:deleteUserClaimValues>
   </soapenv:Body>
</soapenv:Envelope>
```

---

### updateCredentialByAdmin()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>updateCredentialByAdmin</td>
</tr>
<tr class="even">
<td>Description</td>
<td>This operation can be used by the admin to update a user's password</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Username</td>
<td>String</td>
<td>Username</td>
</tr>
<tr class="even">
<td>New Credential</td>
<td>String</td>
<td>The new password</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>None</td>
</tr>
</tbody>
</table>

``` xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soap:Header/>
   <soap:Body>
      <ser:updateCredentialByAdmin>
         <!--Optional:-->
         <ser:userName>nila@wso2support.com</ser:userName>
         <!--Optional:-->
         <ser:newCredential>admin</ser:newCredential>
      </ser:updateCredentialByAdmin>
   </soap:Body>
</soap:Envelope>
```

---

###  getRoleNames()

|                   |                                                   |
|-------------------|---------------------------------------------------|
| Method            | getRoleNames                                      |
| Description       | Get a list of all the roles created in the system |
| Input Parameters  | None                                              |
| Output Parameters | A string array of all the role names              |

``` xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soap:Header/>
   <soap:Body>
      <ser:getRoleNames/>
   </soap:Body>
</soap:Envelope>
```

---

### getAllProfileNames()

|                   |                                                           |
|-------------------|-----------------------------------------------------------|
| Method            | getAllProfileNames                                        |
| Description       | Get a list of all the profile names created in the system |
| Input Parameters  | None                                                      |
| Output Parameters | A string array of all the profile names                   |

``` xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soap:Header/>
   <soap:Body>
      <ser:getAllProfileNames/>
   </soap:Body>
</soap:Envelope>
```

--- 

### listUsers()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>listUsers</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Retrieves a list of user names upto a particular maximum limit</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="content-wrapper">
<div class="table-wrap">
<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Filter</td>
<td>String</td>
<td>A filter to filter out any users</td>
</tr>
<tr class="even">
<td>Max Item Limit</td>
<td>Integer</td>
<td><div class="content-wrapper">
<p>The max limit to the number of users returned in the list</p>
<div>
<ul>
<li>If the value given is below 0, it will be disregarded and the system configured limit will be taken instead.</li>
<li>If the value given is greater than the system configured limit, it will be disregarded and the system configured limit will be taken instead.</li>
</ul>
</div>
</div></td>
</tr>
</tbody>
</table>
</div>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>A filtered string array of all the user names</td>
</tr>
</tbody>
</table>

``` xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soap:Header/>
   <soap:Body>
      <ser:listUsers>
         <!--Optional:-->
         <ser:filter>*@wso2support.com</ser:filter>
         <!--Optional:-->
         <ser:maxItemLimit>10</ser:maxItemLimit>
      </ser:listUsers>
   </soap:Body>
</soap:Envelope>
```

---

### deleteRole()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>deleteRole</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Delete a given role name</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Role Name</td>
<td>String</td>
<td>Name of the role</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>None</td>
</tr>
</tbody>
</table>

``` xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soap:Header/>
   <soap:Body>
      <ser:deleteRole>
         <!--Optional:-->
         <ser:roleName>Engineer</ser:roleName>
      </ser:deleteRole>
   </soap:Body>
</soap:Envelope>
```

---

### deleteUser()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>deleteUser</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Delete a user</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Username</td>
<td>String</td>
<td>Username of the user</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>None</td>
</tr>
</tbody>
</table>

``` xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soap:Header/>
   <soap:Body>
      <ser:deleteUser>
         <!--Optional:-->
         <ser:userName>nila@wso2support.com</ser:userName>
      </ser:deleteUser>
   </soap:Body>
</soap:Envelope>
```

---

### getRoleListOfUser()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>getRoleListOfUser</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Get the list of roles that a particular user belongs to</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Username</td>
<td>String</td>
<td>Username of the user</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>A string array of the role names</td>
</tr>
</tbody>
</table>

``` xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soap:Header/>
   <soap:Body>
      <ser:getRoleListOfUser>
         <!--Optional:-->
         <ser:userName>nilasini@wso2support.com</ser:userName>
      </ser:getRoleListOfUser>
   </soap:Body>
</soap:Envelope>
```

---

### updateRoleName()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>updateRoleName</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Change the name of a particular role</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Role Name</td>
<td>String</td>
<td>Existing name of the role</td>
</tr>
<tr class="even">
<td>New Role Name</td>
<td>String</td>
<td>New name for the role</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>None</td>
</tr>
</tbody>
</table>

``` xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soap:Header/>
   <soap:Body>
      <ser:updateRoleName>
         <!--Optional:-->
         <ser:roleName>Doctor</ser:roleName>
         <!--Optional:-->
         <ser:newRoleName>Teacher</ser:newRoleName>
      </ser:updateRoleName>
   </soap:Body>
</soap:Envelope>
```

---

### isExistingRole()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>isExistingRole</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Check whether a given role exists</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Role Name</td>
<td>String</td>
<td>Name of the role</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>A Boolean parameter indicating whether the role exists or not</td>
</tr>
</tbody>
</table>

``` xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soap:Header/>
   <soap:Body>
      <ser:isExistingRole>
         <!--Optional:-->
         <ser:roleName>Teacher</ser:roleName>
      </ser:isExistingRole>
   </soap:Body>
</soap:Envelope>
```

---

### updateRoleListOfUser()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>updateRoleListOfUser</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Change the list of roles that a user belongs to</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Username</td>
<td>String</td>
<td>Username of User</td>
</tr>
<tr class="even">
<td>Deleted Roles</td>
<td>String Array</td>
<td>List of roles that are to be removed</td>
</tr>
<tr class="odd">
<td>New Roles</td>
<td>String Array</td>
<td>List of roles that are to be added</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>None</td>
</tr>
</tbody>
</table>

``` java
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soap:Header/>
   <soap:Body>
      <ser:updateRoleListOfUser>
         <!--Optional:-->
         <ser:userName>nila@wso2support.com</ser:userName>
         <!--Zero or more repetitions:-->
         <ser:deletedRoles>Teacher</ser:deletedRoles>
         <ser:deletedRoles>lecturer</ser:deletedRoles>
         <!--Zero or more repetitions:-->
         <ser:newRoles>doctor</ser:newRoles>
         <ser:newRoles>carpenter</ser:newRoles>
      </ser:updateRoleListOfUser>
   </soap:Body>
</soap:Envelope>
```

---

### getHybridRoles()

|                   |                                                                                                                         |
|-------------------|-------------------------------------------------------------------------------------------------------------------------|
| Method            | getHybridRoles                                                                                                          |
| Description       | Get the list of roles stored in the internal `             UserMgt            ` database irrespective of the user store |
| Input Parameters  | None                                                                                                                    |
| Output Parameters | A string array of all the roles                                                                                         |

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getHybridRoles/>
   </soapenv:Body>
</soapenv:Envelope>
```

---

### getUserClaimValues()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>getUserClaimValues</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Get a list of all claim information for a given user name and profile name</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Username</td>
<td>String</td>
<td>Username of User</td>
</tr>
<tr class="even">
<td>Profile Name</td>
<td>String</td>
<td>Name of the profile</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>Array of objects of type 'claim' which includes all the information of the claims</td>
</tr>
</tbody>
</table>

``` xml
soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soap:Header/>
   <soap:Body>
      <ser:getUserClaimValues>
         <!--Optional:-->
         <ser:userName>nila@wso2support.com</ser:userName>
         <!--Optional:-->
         <ser:profileName>default</ser:profileName>
      </ser:getUserClaimValues>
   </soap:Body>
</soap:Envelope>
```

---

### addUser()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>addUser</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Add a user to the user store</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Username</td>
<td>String</td>
<td>Username of the new user</td>
</tr>
<tr class="even">
<td>Credential</td>
<td>String</td>
<td>Password for the new user</td>
</tr>
<tr class="odd">
<td>Role List</td>
<td>String Array</td>
<td>List of roles that the user should be assigned to</td>
</tr>
<tr class="even">
<td>Claims</td>
<td>Claims Objects Array</td>
<td>Properties of the user (claim mapping) as a mapping</td>
</tr>
<tr class="odd">
<td>Profile Name</td>
<td>String</td>
<td>Name of the profile</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>None</td>
</tr>
</tbody>
</table>

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org" xmlns:xsd="http://common.mgt.user.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:addUser>
         <!--Optional:-->
         <ser:userName>nilasini</ser:userName>
         <!--Optional:-->
         <ser:credential>admin</ser:credential>
         <!--Zero or more repetitions:-->
         <ser:roleList>teacher</ser:roleList>
         <ser:roleList>Doctor</ser:roleList>
         <!--Zero or more repetitions:-->
         <ser:claims>
            <!--Optional:-->
            <xsd:claimURI>http://wso2.org/claims/country</xsd:claimURI>
            <!--Optional:-->
            <xsd:value>England</xsd:value>
         </ser:claims>
         <ser:claims>
            <!--Optional:-->
            <xsd:claimURI>http://wso2.org/claims/organization</xsd:claimURI>
            <!--Optional:-->
            <xsd:value>Intuit</xsd:value>
         </ser:claims>
         <!--Optional:-->
         <ser:profileName>default</ser:profileName>
         <!--Optional:-->
         <ser:requirePasswordChange>false</ser:requirePasswordChange>
      </ser:addUser>
   </soapenv:Body>
</soapenv:Envelope>
```

---

### addRole()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>addRole</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Add a role to the system</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Role Name</td>
<td>String</td>
<td>Name of the new role</td>
</tr>
<tr class="even">
<td>User List</td>
<td>String</td>
<td>List of users to be included to the role</td>
</tr>
<tr class="odd">
<td>Permissions</td>
<td>Permission Objects Array</td>
<td>Permissions to be assigned to the role</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>None</td>
</tr>
</tbody>
</table>

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org" xmlns:xsd="http://dao.service.ws.um.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:addRole>
         <!--Optional:-->
         <ser:roleName>hrManager</ser:roleName>
         <!--Zero or more repetitions:-->
         <ser:userList>nila@wso2support.com</ser:userList>
         <ser:userList>venilope</ser:userList>
         <ser:userList>pav@wso2support.com</ser:userList>
         <!--Zero or more repetitions:-->
         <ser:permissions>
            <!--Optional:-->
            <xsd:action>ui.execute</xsd:action>
            <!--Optional:-->
            <xsd:resourceId>/permission/admin/manage/identity</xsd:resourceId>
         </ser:permissions>
      </ser:addRole>
   </soapenv:Body>
</soapenv:Envelope>
```

--- 

### updateUserListOfRole()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>updateUserListOfRole</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Add/remove users that belong to a particular role</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Role Name</td>
<td>String</td>
<td>Name of the new role</td>
</tr>
<tr class="even">
<td>Deleted Users</td>
<td>String Array</td>
<td>List of users to be deleted from the role</td>
</tr>
<tr class="odd">
<td>New Users</td>
<td>String Array</td>
<td>List of users to be added to the role</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>None</td>
</tr>
</tbody>
</table>

``` java
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:updateRoleListOfUser>
         <!--Optional:-->
         <ser:userName>nila@wso2support.com</ser:userName>
         <!--Zero or more repetitions:-->
         <ser:deletedRoles>teacher</ser:deletedRoles>
         <ser:deletedRoles>Doctor</ser:deletedRoles>
         <!--Zero or more repetitions:-->
         <ser:newRoles>lecturer</ser:newRoles>
         <ser:newRoles>carpenter</ser:newRoles>
      </ser:updateRoleListOfUser>
   </soapenv:Body>
</soapenv:Envelope>
```

---

### setUserClaimValues()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>setUserClaimValues</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Update the claim values of a given user</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Username</td>
<td>String</td>
<td>Username</td>
</tr>
<tr class="even">
<td>Claims</td>
<td>String Array</td>
<td>Map of claim URIs and values</td>
</tr>
<tr class="odd">
<td>Profile Name</td>
<td>String</td>
<td>Name of the profile</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>None</td>
</tr>
</tbody>
</table>

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org" xmlns:xsd="http://common.mgt.user.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:setUserClaimValues>
         <!--Optional:-->
         <ser:userName>nila@wso2support.com</ser:userName>
         <!--Zero or more repetitions:-->
         <ser:claims>
            <!--Optional:-->
            <xsd:claimURI>http://wso2.org/claims/organization</xsd:claimURI>
            <!--Optional:-->
            <xsd:value>wso2</xsd:value>
         </ser:claims>
         <ser:claims>
            <!--Optional:-->
            <xsd:claimURI>http://wso2.org/claims/country</xsd:claimURI>
            <!--Optional:-->
            <xsd:value>srilanka</xsd:value>
         </ser:claims>
         <!--Optional:-->
         <ser:profileName>default</ser:profileName>
      </ser:setUserClaimValues>
   </soapenv:Body>
</soapenv:Envelope>
```

---  

### getTenantIdOfUser()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td><p>getTenantIdOfUser</p></td>
</tr>
<tr class="even">
<td>Description</td>
<td>Get the tenant ID of the tenant that a particular user belongs to</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Username</td>
<td>String</td>
<td>Username</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>The tenant ID as an integer</td>
</tr>
</tbody>
</table>

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getTenantIdofUser>
         <!--Optional:-->
         <ser:username>nila@wso2support.com</ser:username>
      </ser:getTenantIdofUser>
   </soapenv:Body>
</soapenv:Envelope>
```

---

### getProfileNames()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td><p>getProfileNames</p></td>
</tr>
<tr class="even">
<td>Description</td>
<td>Get all profile names of a user</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Username</td>
<td>String</td>
<td>Username</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Output Parameters</td>
<td>The profile names as a string array</td>
</tr>
</tbody>
</table>

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getProfileNames>
         <!--Optional:-->
         <ser:userName>nila@wso2support.com</ser:userName>
      </ser:getProfileNames>
   </soapenv:Body>
</soapenv:Envelope>
```
