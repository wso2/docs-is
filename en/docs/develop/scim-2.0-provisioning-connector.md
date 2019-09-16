# Configuring SCIM 2.0 Provisioning Connector

The SCIM (System for Cross-domain Identity Management) 2.0 provisioning
connector enables you to provision users using SCIM REST calls to the
WSO2 Identity Server.

This section provides instructions on how to configure the SCIM 2.0
connector with WSO2 Identity Server for identity provisioning.


### About SCIM 2.0

The System for Cross-domain Identity Management (SCIM) is a
specification that is designed to manage user identities in cloud-based
applications and services in a standardized way to enable
interoperability, security, and scalability. It is an emerging open
standard which provides RESTful APIs for easier, cheaper, and faster way
for creating, provisioning, and maintaining identities. The latest
version SCIM 2.0 was released as IETF RFC in September 2015.

### Deploy SCIM 2.0 connector with IS

!!! tip
    SCIM 2.0 is supported by default in WSO2 Identity Server
    version 5.4.0. If you are using WSO2 Identity Server 5.4.0 or a later
    version, see [SCIM 2.0 REST
    APIs](../../develop/using-the-scim-2.0-rest-apis) for
    instructions on how to use SCIM 2.0 OOTB.
    

The below instructions provide a step-by-step approach to deploy SCIM
2.0 connector with WSO2 Identity Server:

1.  Download the latest version of WSO2 Identity Server (IS) from
    [here](http://wso2.com/identity-and-access-management) and extract
    it to a folder. Extracted folder will hereafter be referred to as
    \<IS\_HOME\>.
2.  Download the SCIM 2.0 connector artifacts for WSO2 Identity Server
    from
    [here](https://store.wso2.com/store/assets/isconnector/details/d3e666a6-c26d-4cd2-ba92-d1b4d9c64a4f).

    ??? note "Expand to see what the SCIM 2.0 connector artifacts pack includes"
        -   charon-config.xml

        -   claim-config-diff.txt

        -   org.wso2.carbon.identity.scim2.common-1.1.1.jar

        -   org.wso2.charon3.core-3.0.7.jar

        -   README

        -   scim2-schema-extension.config

        -   scim2.war

3.  From the downloaded artifacts, place the
    `          org.wso2.charon.core-3.0.7.jar         ` file in the
    `          <IS_HOME>/repository/components/lib         ` folder.
4.  Place the
    `          org.wso2.carbon.identity.scim2.common-1.1.1.jar         `
    file in the
    `          <IS_HOME>/repository/components/dropins         ` folder.
5.  Place the `          scim2.war         ` in the
    `          <IS_HOME>/repository/deployment/server/webapps         `
    folder.
6.  Place the `          charon-config.xml         ` in the
    `          <IS_HOME>/repository/conf/identity         ` folder.
7.  Place the `          scim2-schema-extension.config         ` file in
    the `          <IS_HOME>/repository/conf         ` folder.
8.  Append the following entries to the
    `           <ResourceAccessControl></ResourceAccessControl>          `
    element of the `           identity.xml          ` file found in the
    `           <IS_HOME>/repository/conf/identity          ` folder.

    ``` java
        <Resource context="(.*)/scim2/Users" secured="true" http-method="POST">
            <Permissions>/permission/admin/manage/identity/usermgt/create</Permissions>
        </Resource>
        <Resource context="(.*)/scim2/Users" secured="true" http-method="GET">
            <Permissions>/permission/admin/manage/identity/usermgt/list</Permissions>
        </Resource>
        <Resource context="(.*)/scim2/Groups" secured="true" http-method="POST">
            <Permissions>/permission/admin/manage/identity/rolemgt/create</Permissions>
        </Resource>
        <Resource context="(.*)/scim2/Groups" secured="true" http-method="GET">
            <Permissions>/permission/admin/manage/identity/rolemgt/view</Permissions>
        </Resource>
        <Resource context="(.*)/scim2/Users/(.*)" secured="true" http-method="GET">
            <Permissions>/permission/admin/manage/identity/usermgt/view</Permissions>
        </Resource>
        <Resource context="(.*)/scim2/Users/(.*)" secured="true" http-method="PUT">
            <Permissions>/permission/admin/manage/identity/usermgt/update</Permissions>
        </Resource>
        <Resource context="(.*)/scim2/Users/(.*)" secured="true" http-method="PATCH">
            <Permissions>/permission/admin/manage/identity/usermgt/update</Permissions>
        </Resource>
        <Resource context="(.*)/scim2/Users/(.*)" secured="true" http-method="DELETE">
            <Permissions>/permission/admin/manage/identity/usermgt/delete</Permissions>
        </Resource>
        <Resource context="(.*)/scim2/Groups/(.*)" secured="true" http-method="GET">
            <Permissions>/permission/admin/manage/identity/rolemgt/view</Permissions>
        </Resource>
        <Resource context="(.*)/scim2/Groups/(.*)" secured="true" http-method="PUT">
            <Permissions>/permission/admin/manage/identity/rolemgt/update</Permissions>
        </Resource>
        <Resource context="(.*)/scim2/Groups/(.*)" secured="true" http-method="PATCH">
            <Permissions>/permission/admin/manage/identity/rolemgt/update</Permissions>
        </Resource>
        <Resource context="(.*)/scim2/Groups/(.*)" secured="true" http-method="DELETE">
            <Permissions>/permission/admin/manage/identity/rolemgt/delete</Permissions>
        </Resource>
        <Resource context="(.*)/scim2/Me" secured="true" http-method="GET">
            <Permissions>/permission/admin/login</Permissions>
        </Resource>
        <Resource context="(.*)/scim2/Me" secured="true" http-method="DELETE">
            <Permissions>/permission/admin/manage/identity/usermgt/delete</Permissions>
        </Resource>
        <Resource context="(.*)/scim2/Me" secured="true" http-method="PUT">
            <Permissions>/permission/admin/login</Permissions>
        </Resource>
        <Resource context="(.*)/scim2/Me" secured="true" http-method="PATCH">
            <Permissions>/permission/admin/login</Permissions>
        </Resource>
        <Resource context="(.*)/scim2/Me" secured="true" http-method="POST">
            <Permissions>/permission/admin/manage/identity/usermgt/create</Permissions>
        </Resource>
        <Resource context="/scim2/ServiceProviderConfig" secured="false" http-method="all">
            <Permissions></Permissions>
        </Resource>
        <Resource context="/scim2/ResourceType" secured="false" http-method="all">
            <Permissions></Permissions>
        </Resource>
        <Resource context="/scim2/Bulk" secured="true" http-method="all">
            <Permissions>/permission/admin/manage/identity/usermgt</Permissions>
        </Resource>
        <Resource context="(.*)/api/identity/oauth2/dcr/(.*)" secured="true" http-method="all">
            <Permissions>/permission/admin/manage/identity/applicationmgt</Permissions>
        </Resource>
    ```

9.  Disable the SCIM listener with the `           orderId=90          `
    parameter by setting the enable parameter to **false** in the
    `           identity.xml          ` file found in the
    `           <IS_HOME>/repository/conf/identity          ` folder.  
    Then, add the SCIM2 listener with the
    `           orderid=93          ` parameter to the
    `           identity.xml          ` file and ensure that the enable
    parameter is set to **true.**

    ``` java
        <EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener" name="org.wso2.carbon.identity.scim.common.listener.SCIMUserOperationListener" orderId="90" enable="false" />
    
        <!-- Enable the following SCIM2 event listener and disable the above SCIM event listener if SCIM2 is used. -->
    
        <EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener" name="org.wso2.carbon.identity.scim2.common.listener.SCIMUserOperationListener" orderId="93" enable="true" />
    ```

10. If you will be using the tenant endpoint, add the following property
    within the `           <TenantContextsToRewrite> <WebApp>          `
    tag of the `           identity.xml          ` file found in the
    `           <IS_HOME>/repository/conf/identity          ` folder.

    ``` java
        <Context>/scim2</Context>
    ```

11. Ensure that the following property is set to **true** to enable SCIM
    for the relevant userstore in the
    `           user-mgt.xml          ` file found in the
    `           <IS_HOME>/repository/conf/          ` folder.

    ``` java
        <Property name="SCIMEnabled">true</Property>
    ```

!!! note
    If you want to upgrade the SCIM 2.0 Connector in your existing IS pack,
    please refer [upgrade
    instructions.](../../develop/upgrading-an-authenticator)
    

### Configure claim dialects

Finally, you need to configure the claim dialects. You can use
**either** method 1 or method 2 for this purpose.

##### Method 1

If you want to configure the connector on a new WSO2 Identity Server
extract, follow the instructions given in the
`         claim-config-diff.txt        ` file that comes with the
connector artifacts pack.

##### Method 2

If you are configuring the connector on an existing WSO2 Identity
Server, add the claim dialects manually.

1.  Start the WSO2 IS and login to the management console.
2.  Navigate to **Claims\>Add** and click **Add Claim Dialect**. Add
    the following claim dialects through the WSO2 IS management
    console.  
    For more information on how to add a claim dialect, see [Adding
    Claim
    Dialects](../../learn/adding-claim-dialects)
    .  
    -   urn:ietf:params:scim:schemas:core:2.0
    -   urn:ietf:params:scim:schemas:core:2.0:User
    -   urn:ietf:params:scim:schemas:extension:enterprise:2.0:User
3.  Navigate to **Claims\>Add** and click **Add Local Claim**. Add the
    following claim:  
    -   **Claim URI:** <http://wso2.org/claims/resourceType>
    -   **Display Name:** Resource Type
    -   **Mapped Attribute(s):** ref
4.  Navigate to **Claims\>Add** and click **Add External Claim**. Add
    the claims listed in step ii) of the
    `          claim-config-diff.txt         ` file, which comes with
    the connector artifacts pack, to the relevant claim dialect.  
    For more information on adding a claim mapping through the
    management console, see [Adding Claim
    Mapping](../../learn/adding-claim-mapping#add-external-claim)
    .
5.  Ensure that the
    `                     urn:ietf:params:scim:schemas:core:2.0:User:emails.work          `
    is mapped to the <http://wso2.org/claims/emailaddress> claim.

Execute one of the following commands to start the Identity Server.

-   On Windows: `          <IS_HOME>/bin/wso2server.bat --run         `
-   On Linux/Mac OS: `          sh         `
    `          <IS_HOME>/bin/wso2server.sh         `

After the server has started up successfully, you can query the SCIM 2.0
REST endpoints. For simplicity, cURL commands are used here to send CRUD
requests to the SCIM 2.0 REST endpoints of WSO2 Identity Server.

!!! note "Extending the SCIM API"
    If you want to add any custom attributes, you can use the user schema
    extension in addition to core user schema. To add attributes with the
    user schema extension, do the following:
    
    1.  Enable the user schema extension by setting the
        `           <user-schema-extension-enabled>          ` property to
        **true** in the `           charon-config.xml          ` file that
        you placed in the
        `           <IS_HOME>/repository/conf/identity          ` folder.
    
        ``` java
        <Property name="user-schema-extension-enabled">true</Property>
        ```
    
    2.  Define the extension by adding attributes in the following format in
        the `           scim2-schema-extension.config          ` file that
        you placed in the `           <IS_HOME>/repository/conf/          `
        folder.
    
        ``` java
            {
            "attributeURI":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:askPassword",
            "attributeName":"askPassword",
            "dataType":"boolean",
            "multiValued":"false",
            "description":"Enable password change required notification in the user creation.",
            "required":"false",
            "caseExact":"false",
            "mutability":"readwrite",
            "returned":"default",
            "uniqueness":"none",
            "subAttributes":"null",
            "canonicalValues":[],
            "referenceTypes":[]
            }
        ```
    
    3.  Add the attribute names of the attributes that you added to the
        `           scim2-schema-extension.config          ` file as
        `                       subAttributes                     ` of the
        `           wso2Extension          ` attribute as seen in the code
        block below.
    
        ``` java
            {
            "attributeURI":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User",
            "attributeName":"EnterpriseUser",
            "dataType":"complex",
            "multiValued":"false",
            "description":"Enterprise User",
            "required":"false",
            "caseExact":"false",
            "mutability":"readWrite",
            "returned":"default",
            "uniqueness":"none",
            "subAttributes":"askPassword employeeNumber costCenter organization division department manager",
            "canonicalValues":[],
            "referenceTypes":["external"]
            }
        ```
    
    4.  Define a new claim dialect for the extension schema with the dialect
        URI you used in defining the extension. For more information on how
        to do this, see [Adding Claim
        Dialects](../../learn/adding-claim-dialects)
        .  
        The following code block shows an example of a claim dialect for the
        custom attributes given above.
    
        ``` java
            urn:ietf:params:scim:schemas:extension:enterprise:2.0:User
        ```
    
    5.  Once you add a custom attribute, add a claim mapping for the custom
        attribute.  
        To do this, open the `           claim-config.xml          ` file
        found in the `           <IS_HOME>/respository/conf          `
        folder, and add the claim with the relevant property values. The
        code block below shows an example of a claim mapping.
    
        ``` java
            <Claim>
                <ClaimURI>urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:askPassword</ClaimURI>
                <DisplayName>Ask Password</DisplayName>
                <AttributeID>postOfficeBox</AttributeID>
                <Description>Temporary claim to invoke email ask Password feature</Description>
                <Required />
                <DisplayOrder>1</DisplayOrder>
                <SupportedByDefault />
                <MappedLocalClaim>http://wso2.org/claims/identity/askPassword</MappedLocalClaim>
            </Claim>
        ```
    
    6.  Next, add the claim mapping in the relevant tenant through the
        management console. To do this, login using tenant credentails and
        map the claim.  
        For more information on adding a claim mapping through the
        management console, see [Adding Claim
        Mapping](../../learn/adding-claim-mapping#add-external-claim)
        .

        !!! info 
            It is recommended to configure through both the management console
            and the `            claim-config.xml           ` file because the
            configuration made in the config file will ensure that this claim is
            available for all tenants created in future but it needs to be
            mapped in the management console in order to map the claim for
            exisiting tenants.
        
### Try it out

Once you have successfully configured the SCIM 2.0 provisioning
connector with WSO2 Identity Server, you can test any SCIM 2.0 REST call
with WSO2 Identity Server using cURL commands.

The default permissions required to access each resource in SCIM 2.0 are
given below.

<table>
<thead>
<tr class="header">
<th>Endpoint</th>
<th>HTTP Method</th>
<th>Permission</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>/scim2/Users</td>
<td><pre><code>POST</code></pre></td>
<td><pre><code>/permission/admin/manage/identity/usermgt/create</code></pre></td>
</tr>
<tr class="even">
<td><pre><code>/scim2/Users</code></pre></td>
<td><pre><code>GET</code></pre></td>
<td><pre><code>/permission/admin/manage/identity/usermgt/list</code></pre></td>
</tr>
<tr class="odd">
<td><pre><code>/scim2/Groups</code></pre></td>
<td><pre><code>POST</code></pre></td>
<td><pre><code>/permission/admin/manage/identity/rolemgt/create</code></pre></td>
</tr>
<tr class="even">
<td><pre><code>/scim2/Groups</code></pre></td>
<td><pre><code>GET</code></pre></td>
<td><pre><code>/permission/admin/manage/identity/rolemgt/view</code></pre></td>
</tr>
<tr class="odd">
<td><pre><code>/scim2/Users/(.*)</code></pre></td>
<td><pre><code>GET</code></pre></td>
<td><pre><code>/permission/admin/manage/identity/usermgt/view</code></pre></td>
</tr>
<tr class="even">
<td><pre><code>/scim2/Users/(.*)</code></pre></td>
<td>PUT</td>
<td><pre><code>/permission/admin/manage/identity/usermgt/update</code></pre></td>
</tr>
<tr class="odd">
<td><pre><code>/scim2/Users/(.*)</code></pre></td>
<td>PATCH</td>
<td><pre><code>/permission/admin/manage/identity/usermgt/update</code></pre></td>
</tr>
<tr class="even">
<td><pre><code>/scim2/Users/(.*)</code></pre></td>
<td>DELETE</td>
<td><pre><code>/permission/admin/manage/identity/usermgt/delete</code></pre></td>
</tr>
<tr class="odd">
<td><pre><code>/scim2/Groups/(.*)</code></pre></td>
<td><pre><code>GET</code></pre></td>
<td><pre><code>/permission/admin/manage/identity/rolemgt/view</code></pre></td>
</tr>
<tr class="even">
<td><pre><code>/scim2/Groups/(.*)</code></pre></td>
<td>PUT</td>
<td><pre><code>/permission/admin/manage/identity/rolemgt/update</code></pre></td>
</tr>
<tr class="odd">
<td><pre><code>/scim2/Groups/(.*)</code></pre></td>
<td>PATCH</td>
<td><pre><code>/permission/admin/manage/identity/rolemgt/update</code></pre></td>
</tr>
<tr class="even">
<td><pre><code>/scim2/Groups/(.*)</code></pre></td>
<td>DELETE</td>
<td><pre><code>/permission/admin/manage/identity/rolemgt/delete</code></pre></td>
</tr>
<tr class="odd">
<td><pre><code>/scim2/Me</code></pre></td>
<td>GET</td>
<td><pre><code>/permission/admin/login</code></pre></td>
</tr>
<tr class="even">
<td><pre><code>/scim2/Me</code></pre></td>
<td>DELETE</td>
<td><pre><code>/permission/admin/login</code></pre></td>
</tr>
<tr class="odd">
<td><pre><code>/scim2/Me</code></pre></td>
<td>PUT</td>
<td><pre><code>/permission/admin/login</code></pre></td>
</tr>
<tr class="even">
<td><pre><code>/scim2/Me</code></pre></td>
<td>PATCH</td>
<td><pre><code>/permission/admin/login</code></pre></td>
</tr>
<tr class="odd">
<td><pre><code>/scim2/Me</code></pre></td>
<td>POST</td>
<td><pre><code>/permission/admin/manage/identity/usermgt/create</code></pre></td>
</tr>
<tr class="even">
<td><pre><code>/scim2/ServiceProviderConfig</code></pre></td>
<td>all</td>
<td>-</td>
</tr>
<tr class="odd">
<td><pre><code>/scim2/ResourceType</code></pre></td>
<td>all</td>
<td>-</td>
</tr>
<tr class="even">
<td><pre><code>/scim2/Bulk</code></pre></td>
<td>all</td>
<td><pre><code>/permission/admin/manage/identity/usermgt</code></pre></td>
</tr>
</tbody>
</table>

!!! tip "Tenant mode" 
    In order to provision resources to a different tenant, change the
    authorization header and the URL of the endpoint as seen below and use
    the commands given below.
    
    **authorization header**
    
    ``` java
    --user kim@test.com:kimpass
    ```

    **URL**

    ``` java
    /t/test.com/scim2
    ```

    If you are using a tenant endpoint for invoking, you can use a command
    similar to the following ('adding user' as an example) :

    **Request**

    ``` java
    curl -v -k --user kim@test.com:admin --data '{"schemas":[],"name":{"familyName":"jayawardana","givenName":"vindula"},"userName":"pavinaa","password":"vindula","emails":[{"primary":true,"value":"vindula_home.com","type":"home"},{"value":"vindula_work.com","type":"work"}]}' --header "Content-Type:application/json" https://localhost:9443/t/test.com/scim2/Users
    ```


####  /Users Endpoint

The following commands can be used to test the users endpoints.

**Create** User

Run the following command to create a user:

**Request**

``` java
curl -v -k --user admin:admin --data '{"schemas":[],"name":{"familyName":"jackson","givenName":"kim"},"userName":"kim","password":"kimwso2","emails":[{"primary":true,"value":"kim.jackson@gmail.com","type":"home"},{"value":"kim_j@wso2.com","type":"work"}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users
```

**Response**

``` java
{"emails":[{"type":"home","value":"kim.jackson@gmail.com","primary":true},{"type":"work","value":"kim_j@wso2.com"}],"meta":{"created":"2017-10-09T11:32:36Z","location":"https://localhost:9443/scim2/Users/8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","lastModified":"2017-10-09T11:32:36Z","resourceType":"User"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"name":{"familyName":"jackson","givenName":"kim"},"id":"8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","userName":"kim"}
```

**Get** User  
Run the following command to retrieve a particular user resource using
its unique ID (You will get this ID in the response to the
`         create user        ` request):

**Request**

``` java
curl -v -k --user admin:admin https://localhost:9443/scim2/Users/0032fd29-55a9-4fb9-be82-b1c97c073f02
```

**Response**

``` java
{"emails":[{"type":"work","value":"kim_j@wso2.com"},{"type":"home","value":"kim.jackson@gmail.com"}],"meta":{"created":"2017-10-09T11:32:36Z","location":"https://localhost:9443/scim2/Users/8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","lastModified":"2017-10-09T11:32:36Z","resourceType":"User"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"name":{"givenName":"kim","familyName":"jackson"},"id":"8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","userName":"kim"}
```

**Update** User

Run the following command to update the work and home email fields of
the user “kim”:

**Request**

``` java
curl -v -k --user admin:admin -X PUT -d '{"schemas":[],"name":{"familyName":"jackson","givenName":"kim"},"userName":"kim","emails":[{"value":"kim_j@wso2.com","type":"work"},{"value":"kim.jackson@gmail.com","type":"home"}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/0032fd29-55a9-4fb9-be82-b1c97c073f02
```

**Response**

``` java
{"emails":[{"type":"work","value":"kim_j@wso2.com"},{"type":"home","value":"kim.jackson@gmail.com"}],"meta":{"created":"2017-10-09T11:32:36Z","location":"https://localhost:9443/scim2/Users/8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","lastModified":"2017-10-09T11:35:29Z","resourceType":"User"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"name":{"givenName":"kim","familyName":"jackson"},"id":"8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","userName":"kim"}
```

**Delete** User

Run the following command to delete the user with the given unique ID:

**Request**

``` java
curl -v -k --user admin:admin -X DELETE https://localhost:9443/scim2/Users/b228b59d-db19-4064-b637-d33c31209fae -H "Accept: application/json"
```

**Response**

``` java
HTTP/1.1 204 No Content
```

**Patch** User

The following commands can be used to update a user using the unique ID
of the user.

**Patch** Add

Run the following command to add a nickname value to the user with the
given unique ID:

**Request**

``` java
curl -v -k --user admin:admin -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],"Operations":[{"op":"add","value":{"nickName":"shaggy"}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/92dbbfb8-867f-4fbc-afbf-a2bda12c09b1
```

**Response**

``` java
{"emails":[{"type":"work","value":"kim_j@wso2.com"},{"type":"home","value":"kim.jackson@gmail.com"}],"meta":{"created":"2017-10-09T11:32:36Z","location":"https://localhost:9443/scim2/Users/8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","lastModified":"2017-10-09T12:04:14Z","resourceType":"User"},"nickName":"shaggy","schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"name":{"givenName":"kim","familyName":"jackson"},"id":"8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","userName":"kim"}
```

**Patch** Remove

Run the following command to remove all email addresses from the user:

**Request**

``` java
curl -v -k --user admin:admin -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],"Operations":[{"op":"remove","path":"emails"}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/1819c1b4-e30e-41ca-b40c-48140fffffee
```

**Response**

``` java
{"meta":{"created":"2017-10-09T11:32:36Z","location":"https://localhost:9443/scim2/Users/8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","lastModified":"2017-10-09T13:43:02Z","resourceType":"User"},"nickName":"shaggy","schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"name":{"givenName":"kim","familyName":"jackson"},"id":"8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","userName":"kim"}
```

Run the following command to remove email addresses where type is equal
to 'home' from the user:

**Request**

``` java
curl -v -k --user admin:admin -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],"Operations":[{"op":"remove","path":"emails[type eq home]"}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/1819c1b4-e30e-41ca-b40c-48140fffffee
```

**Response**

``` java
{"emails":[{"type":"work","value":"kim_j@wso2.com"}],"meta":{"created":"2017-10-09T11:32:36Z","location":"https://localhost:9443/scim2/Users/8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","lastModified":"2017-10-09T13:45:19Z","resourceType":"User"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"name":{"givenName":"kim","familyName":"jackson"},"id":"8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","userName":"kim"}
```

**Patch** Replace

Run the following command to replace attribute values of the user:

**Request**

``` java
curl -v -k --user admin:admin -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],"Operations":[{"op":"replace","value":{"EnterpriseUser":{"employeeNumber":"113","manager":{"value":"Alex"}}},"nickName":"Al"}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/1819c1b4-e30e-41ca-b40c-48140fffffee
```

**Response**

``` java
{"emails":[{"type":"work","value":"kim_j@wso2.com"}],"meta":{"created":"2017-10-09T11:32:36Z","location":"https://localhost:9443/scim2/Users/8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","lastModified":"2017-10-09T13:47:43Z","resourceType":"User"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"EnterpriseUser":{"manager":{"value":"Alex"},"employeeNumber":"113"},"name":{"givenName":"kim","familyName":"jackson"},"id":"8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","userName":"kim"}
```

Run the following command to replace the value of the email addresses
where type is equal to 'work':

**Request**

``` java
curl -v -k --user admin:admin -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],"Operations":[{"op":"replace","path":"emails[type eq work].value","value":"kim.info@gmail.com"}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/1819c1b4-e30e-41ca-b40c-48140fffffee
```

**Response**

``` java
{"emails":[{"type":"work","value":"kim.info@gmail.com"}],"meta":{"created":"2017-10-09T11:32:36Z","location":"https://localhost:9443/scim2/Users/8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","lastModified":"2017-10-09T13:51:28Z","resourceType":"User"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"EnterpriseUser":{"manager":{"value":"Alex"},"employeeNumber":"113"},"name":{"givenName":"kim","familyName":"jackson"},"id":"8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","userName":"kim"}
```

**List** User

Run the following command to retrieve all user resources in the user
store:

**Request**

``` java
curl -v -k --user admin:admin https://localhost:9443/scim2/Users
```

**Response**

``` java
{"totalResults":2,"startIndex":1,"itemsPerPage":2,"schemas":["urn:ietf:params:scim:api:messages:2.0:ListResponse"],"Resources":[{"emails":[{"type":"home","value":"johndoe@gmail.com"}],"meta":{"created":"2017-07-17T11:39:00Z","lastModified":"2017-07-17T11:39:34Z"},"name":{"givenName":"John","familyName":"Doe"},"id":"71f3d46c-1abc-41d0-8fc5-9bf2eaa255df","userName":"John"},{"emails":[{"type":"work","value":"kim.info@gmail.com"}],"meta":{"created":"2017-10-09T11:32:36Z","location":"https://localhost:9443/scim2/Users/8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","lastModified":"2017-10-09T13:51:28Z","resourceType":"User"},"EnterpriseUser":{"manager":{"value":"Alex"},"employeeNumber":"113"},"name":{"givenName":"kim","familyName":"jackson"},"id":"8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","userName":"kim"}]}
```

!!! tip
    
    Proper use of ‘attributes’ and ‘excludedAttributes’ parameters
    with any operation on any endpoint can highly increase the performance.
    
    **attributes**
    
    Add attributes to the endpoint as seen below to define which particular
    attributes the API should return.
    
    ``` java
    curl -v -k --user admin:admin https://localhost:9443/scim2/Users?attributes=userName,name.familyName,emails.value
    ```

    **excluded attributes**

    Add excluded attributes to the endpoint as seen below to define which
    particular attributes the API should exclude from the response.

    ``` java
    curl -v -k --user admin:admin https://localhost:9443/scim2/Users?excludedAttributes=emails,meta
    ```


**Filter** User

Since CRUD operations have to be performed using the SCIM ID that is
unique to the service provider, the Users REST endpoint also supports
the filter operation.  
Run the following to filter a user using an attribute value:

**Request**

``` java
curl -v -k --user admin:admin https://localhost:9443/scim2/Users?filter=userName+Eq+kim
```

**Response**

``` java
{"totalResults":1,"startIndex":1,"itemsPerPage":1,"schemas":["urn:ietf:params:scim:api:messages:2.0:ListResponse"],"Resources":[{"emails":[{"type":"work","value":"kim.info@gmail.com"}],"meta":{"created":"2017-10-09T11:32:36Z","location":"https://localhost:9443/scim2/Users/8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","lastModified":"2017-10-09T13:51:28Z","resourceType":"User"},"EnterpriseUser":{"manager":{"value":"Alex"},"employeeNumber":"113"},"name":{"givenName":"kim","familyName":"jackson"},"id":"8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","userName":"kim"}]}
```

####  /Groups Endpoint

The following commands can be used to test the group endpoints.

**Create** Group

Run the following command to create a group:

**Request**

``` java
curl -v -k --user admin:admin --data '{"displayName": "engineer","members": [{"value":"316214c0-dd7e-4dc3-bed8-e91227d32597","display": "kim"}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Groups
```

**Response**

``` java
{"displayName":"PRIMARY/engineer","meta":{"created":"2017-10-09T14:42:27Z","location":"https://localhost:9443/scim2/Groups/56d163ba-b6b6-426e-88f4-498a7183f6dc","lastModified":"2017-10-09T14:42:27Z","resourceType":"Group"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:Group"],"members":[{"display":"kim","value":"8ce382ae-2a56-4c3e-bb57-75b29cd4d30b"}],"id":"56d163ba-b6b6-426e-88f4-498a7183f6dc"}
```

**Get** Group

Run the following command to retrieve a particular group resource using
its unique ID (You will get this ID in the response to the
`         create group        ` request):

**Request**

``` java
curl -v -k --user admin:admin https://localhost:9443/scim2/Groups/0032fd29-55a9-4fb9-be82-b1c97c073f02
```

**Response**

``` java
{"displayName":"engineer","meta":{"created":"2017-10-09T14:42:27Z","location":"https://localhost:9443/scim2/Groups/56d163ba-b6b6-426e-88f4-498a7183f6dc","lastModified":"2017-10-09T14:42:27Z"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:Group"],"members":[{"display":"kim","value":"8ce382ae-2a56-4c3e-bb57-75b29cd4d30b"}],"id":"56d163ba-b6b6-426e-88f4-498a7183f6dc"}
```
  
**Update** Group

Run the following command to update the group:

**Request**

``` java
curl -v -k --user admin:admin -X PUT -d '{"displayName": "students","members":[{"value":"d96f4b29-1e29-4986-9ed5-ff61ab506748","display":"sam"}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Groups/0d97ab74-0b1f-4c10-80f9-457bf0e0f2aa
```

**Response**

``` java
{"displayName":"PRIMARY/Students","meta":{"created":"2017-10-09T14:49:22Z","location":"https://localhost:9443/scim2/Groups/0959900d-cdba-4f3c-9020-5db5860ac86d","lastModified":"2017-10-09T14:56:32Z"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:Group"],"members":[{"display":"sam","value":"4b3e60d5-e0c3-4dd6-aaa2-3976096e029b"}],"id":"0959900d-cdba-4f3c-9020-5db5860ac86d"}
```

  
**Delete** Group

Run the following command to delete the group using its unique ID:

**Request**

``` java
curl -v -k --user admin:admin -X DELETE https://localhost:9443/scim2/Groups/484cdc26-9136-427b-ad9e-96ea3082e1f5 -H "Accept: application/json"
```

**Response**

``` java
HTTP/1.1 204 No Content
```

**Patch** Group

The following commands can be used to update a group using the unique ID
of the group.

**Patch** Add

Run the following command to add a new member to the group.

**Request**

``` java
curl -v -k --user admin:admin -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],"Operations":[{"op":"add","value":{"members":[{"display": "sam","$ref":"https://localhost:9443/scim2/Users/4b3e60d5-e0c3-4dd6-aaa2-3976096e029b","value": "4b3e60d5-e0c3-4dd6-aaa2-3976096e029b"}]}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Groups/56d163ba-b6b6-426e-88f4-498a7183f6dc
```

**Response**

``` java
{"displayName":"PRIMARY/engineer","meta":{"created":"2017-10-09T14:42:27Z","location":"https://localhost:9443/scim2/Groups/56d163ba-b6b6-426e-88f4-498a7183f6dc","lastModified":"2017-10-09T15:22:07Z"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:Group"],"members":[{"display":"kim","value":"8ce382ae-2a56-4c3e-bb57-75b29cd4d30b"},{"display":"sam","value":"8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","$ref":"https://localhost:9443/scim2/Users/4b3e60d5-e0c3-4dd6-aaa2-3976096e029b"}],"id":"56d163ba-b6b6-426e-88f4-498a7183f6dc"}
```

**Patch** Remove

Run the following command to remove a member of the group:

**Request**

``` java
curl -v -k --user admin:admin -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],"Operations":[{"op":"remove","path":"members[display eq kim]"}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Groups/56d163ba-b6b6-426e-88f4-498a7183f6dc
```

**Response**

``` java
{"displayName":"PRIMARY/engineer","meta":{"created":"2017-10-09T14:42:27Z","location":"https://localhost:9443/scim2/Groups/56d163ba-b6b6-426e-88f4-498a7183f6dc","lastModified":"2017-10-09T22:57:57Z"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:Group"],"members":[{"display":"sam","value":"4b3e60d5-e0c3-4dd6-aaa2-3976096e029b"}],"id":"56d163ba-b6b6-426e-88f4-498a7183f6dc"}
```

**Patch** Replace

Run the following command to replace a member of the group with another
member:

**Request**

``` java
curl -v -k --user admin:admin -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],"Operations":[{"op":"replace","path":"members[display eq sam]","value":{"value":"8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","display":"kim"}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Groups/56d163ba-b6b6-426e-88f4-498a7183f6dc
```

**Response**

``` java
{"displayName":"PRIMARY/engineer","meta":{"created":"2017-10-09T14:42:27Z","location":"https://localhost:9443/scim2/Groups/56d163ba-b6b6-426e-88f4-498a7183f6dc","lastModified":"2017-10-09T22:59:51Z"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:Group"],"members":[{"display":"kim","value":"8ce382ae-2a56-4c3e-bb57-75b29cd4d30b"}],"id":"56d163ba-b6b6-426e-88f4-498a7183f6dc"}
```

**List** Group

Run the following command to retrieve a all group resources in the user
store.

**Request**

``` java
curl -v -k --user admin:admin https://localhost:9443/scim2/Groups
```

**Response**

``` java
{"totalResults":1,"startIndex":1,"itemsPerPage":1,"schemas":["urn:ietf:params:scim:api:messages:2.0:ListResponse"],"Resources":[{"displayName":"PRIMARY/engineer","meta":{"created":"2017-10-09T14:42:27Z","location":"https://localhost:9443/scim2/Groups/56d163ba-b6b6-426e-88f4-498a7183f6dc","lastModified":"2017-10-09T14:42:27Z"},"members":[{"display":"kim","value":"8ce382ae-2a56-4c3e-bb57-75b29cd4d30b"}],"id":"56d163ba-b6b6-426e-88f4-498a7183f6dc"}]}
```

!!! tip
    Proper use of ‘attributes’ and ‘excludedAttributes’ parameters
    with any operation on any endpoint can highly increase the performance.
    
    **attributes**
    
    Add attributes to the endpoint as seen below to define which particular
    attributes the API should return.  
    
    ``` java
    curl -v -k --user admin:admin https://localhost:9443/scim2/Groups?attributes=displayName
    ```

**excluded attributes**

Add excluded attributes to the endpoint as seen below to define which
particular attributes the API should exclude from the response.  


``` java
curl -v -k --user admin:admin https://localhost:9443/scim2/Groups?excludedAttributes=members
```

**Filter** Group

Since CRUD operations have to be performed using the SCIM ID that is
unique to the service provider, the Groups REST endpoint also supports
the filter operation.  
Run the following to filter a group using an attribute value:

**Request**

``` java
curl -v -k --user admin:admin https://localhost:9443/scim2/Groups?filter=displayName+Eq+engineer
```

**Response**

``` java
{"totalResults":1,"startIndex":1,"itemsPerPage":1,"schemas":["urn:ietf:params:scim:api:messages:2.0:ListResponse"],"Resources":[{"displayName":"PRIMARY/engineer","meta":{"created":"2017-10-09T14:42:27Z","location":"https://localhost:9443/scim2/Groups/56d163ba-b6b6-426e-88f4-498a7183f6dc","lastModified":"2017-10-09T14:42:27Z"},"members":[{"display":"kim","value":"8ce382ae-2a56-4c3e-bb57-75b29cd4d30b"}],"id":"56d163ba-b6b6-426e-88f4-498a7183f6dc"}]}
```

#### /Me Endpoint

The following commands can be used to test the /Me endpoint.

**Get** Me

Run the following command to retrieve the user that is currently
authenticated:

**Request**

``` java
curl -v -k --user kim:kimwso2 https://localhost:9443/scim2/Me
```

**Response**

``` java
{"emails":[{"type":"work","value":"kim.info@gmail.com"}],"meta":{"created":"2017-10-09T11:32:36Z","location":"https://localhost:9443/scim2/Users/8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","lastModified":"2017-10-09T13:51:28Z","resourceType":"User"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"EnterpriseUser":{"manager":{"value":"Alex"},"employeeNumber":"113"},"name":{"givenName":"kim","familyName":"jackson"},"groups":[{"display":"engineer","value":"56d163ba-b6b6-426e-88f4-498a7183f6dc"}],"id":"8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","userName":"kim"}
```

**Create** Me

Run the following command to register a user anonymously.

**Request**

``` java
curl -v -k  --data '{"schemas":[],"name":{"familyName":"Johnson","givenName":"Alex"},"userName":"alex","password":"alexwso2","emails":[{"primary":true,"value":"alex.j@gmail.com","type":"home"},{"value":"alex_j@wso2.com","type":"work"}],"EnterpriseUser":{"employeeNumber":"123A","manager":{"value":"Taylor"}}}' --header "Content-Type:application/json" https://localhost:9443/scim2/Me
```

**Response**

``` java
{"emails":[{"type":"home","value":"alex.j@gmail.com","primary":true},{"type":"work","value":"alex_j@wso2.com"}],"meta":{"created":"2017-10-09T23:05:35Z","location":"https://localhost:9443/scim2/Users/7f2e12fd-7e8e-466f-bde5-d6e4fd45285b","lastModified":"2017-10-09T23:05:35Z","resourceType":"User"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"EnterpriseUser":{"manager":{"value":"Taylor"},"employeeNumber":"123A"},"name":{"familyName":"Johnson","givenName":"Alex"},"id":"7f2e12fd-7e8e-466f-bde5-d6e4fd45285b","userName":"alex"}
```

**Update** Me

Run the following command to update the user that is currently
authenticated:

**Request**

``` java
curl -v -k --user kim:kimwso2 -X PUT -d '{"schemas":[],"name":{"familyName":"Jackson","givenName":"Kim"},"userName":"kim","emails":[{"primary":true,"value":"jacksonk@gmail.com","type":"home"},{"value":"jackson_k@wso2.com","type":"work"}],"EnterpriseUser":{"employeeNumber":"123A","manager":{"value":"Taylor"}}}' --header "Content-Type:application/json" https://localhost:9443/scim2/Me
```

**Response**

``` java
{"emails":[{"type":"work","value":"jackson_k@wso2.com"},{"type":"home","value":"jacksonk@gmail.com"}],"meta":{"created":"2017-10-09T11:32:36Z","location":"https://localhost:9443/scim2/Users/8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","lastModified":"2017-10-09T23:09:06Z","resourceType":"User"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"EnterpriseUser":{"manager":{"value":"Taylor"},"employeeNumber":"123A"},"name":{"givenName":"Kim","familyName":"Jackson"},"groups":[{"display":"engineer","value":"56d163ba-b6b6-426e-88f4-498a7183f6dc"}],"id":"8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","userName":"kim"}
```

**Patch** Me  
Run the following command to update the user that is currently
authenticated using a particular attribute:

**Request**

``` java
curl -v -k --user kim:kimwso2 -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],"Operations":[{"op":"add","value":{"nickName":"kimmy"}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Me
```

**Response**

``` java
{"emails":[{"type":"work","value":"jackson_k@wso2.com"},{"type":"home","value":"jacksonk@gmail.com"}],"meta":{"created":"2017-10-09T11:32:36Z","location":"https://localhost:9443/scim2/Users/8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","lastModified":"2017-10-09T23:11:04Z","resourceType":"User"},"nickName":"kimmy","schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"EnterpriseUser":{"manager":{"value":"Taylor"},"employeeNumber":"123A"},"name":{"givenName":"Kim","familyName":"Jackson"},"groups":[{"display":"engineer","value":"56d163ba-b6b6-426e-88f4-498a7183f6dc"}],"id":"8ce382ae-2a56-4c3e-bb57-75b29cd4d30b","userName":"kim"}
```

####  /Bulk Endpoint

Run the following command to create multiple users via one SCIM request:

**Request**

``` java
curl -v -k --user admin:admin --data '{"failOnErrors":1,"schemas":["urn:ietf:params:scim:api:messages:2.0:BulkRequest"],"Operations":[{"method": "POST","path": "/Users","bulkId": "qwerty","data":{"schemas":["urn:ietf:params:scim:schemas:core:2.0:User"],"userName": "Kris","password":"krispass"}},{"method": "POST","path": "/Users","bulkId":"ytrewq","data":{"schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"userName":"Jesse","password":"jessepass","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{"employeeNumber": "11250","manager": {"value": "bulkId:qwerty"}}}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Bulk
```

**Response**

``` java
{"schemas":["urn:ietf:params:scim:api:messages:2.0:BulkResponse"],"Operations":[{"bulkId":"qwerty","method":"POST","location":"https://localhost:9443/scim2/Users/e9c0cec1-924c-47d6-82d5-82ed11ad7c68","status":{"code":201}},{"bulkId":"ytrewq","method":"POST","location":"https://localhost:9443/scim2/Users/59de8734-e56f-4e17-84b3-8d3a8c005248","status":{"code":201}}]}
```

#### /ServiceProviderConfig Endpoint

**Get** Config

Run the following command to retrieve the service provider's
configuration details:

**Request**

``` java
curl -v -k --user admin:admin  https://localhost:9443/scim2/ServiceProviderConfig
```

**Response**

``` java
{"patch":{"supported":true},"filter":{"maxResults":200,"supported":true},"documentationUri":"http://example.com/help/scim.html","authenticationSchemes":[{"name":"OAuth Bearer Token","description":"Authentication scheme using the OAuth Bearer Token Standard","specURI":"http://www.rfc-editor.org/info/rfc6750","type":"oauthbearertoken","primary":true},{"name":"HTTP Basic","description":"Authentication scheme using the HTTP Basic Standard","specURI":"http://www.rfc-editor.org/info/rfc2617","type":"httpbasic","primary":false}],"schemas":["urn:ietf:params:scim:schemas:core:2.0:ServiceProviderConfig"],"etag":{"supported":false},"sort":{"supported":false},"bulk":{"maxPayloadSize":1048576,"maxOperations":1000,"supported":true},"changePassword":{"supported":false}}
```

####  /ResourceType Endpoint

**Get** Resource Types

Run the following command to retrieve metadata about a resource type:

**Request**

``` java
curl -v -k --user admin:admin https://localhost:9443/scim2/ResourceType
```

**Response**

``` java
{"schemas":["urn:ietf:params:scim:schemas:core:2.0:ResourceType"],"resourceType":[{"schema":"urn:ietf:params:scim:schemas:core:2.0:User","endpoint":"/Users","meta":{"location":"https://localhost:9443/scim2/ResourceType/User","resourceType":"ResourceType"},"name":"User","description":"User Account","schemaExtensions":{"schema":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User","required":false},"id":"User"},{"schema":"urn:ietf:params:scim:schemas:core:2.0:Group","endpoint":"/Groups","meta":{"location":"https://localhost:9443/scim2/ResourceType/Group","resourceType":"ResourceType"},"name":"Group","description":"Group","id":"Group"}]}
```