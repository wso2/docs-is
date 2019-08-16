# Understanding What Has Changed

This page provides details about the behavioral changes and
configuration changes from WSO2 Identity Server 5.7.0 to 5.8.0.

### Behavioral changes

This section explains the features for which the behaviour has changed,
and the impact is causes on your current implementation when you migrate
to the latest release. Go through the behavioral changes to understand
what has changed and prepare for migration impact.

<table>
<thead>
<tr class="header">
<th>Number</th>
<th>Change</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><div class="content-wrapper">
<p>#1</p>
<p><br />
</p>
</div></td>
<td><div class="content-wrapper">
<p><strong>Use case:</strong> By default, WSO2 IS supports a fixed set of attributes for the SCIM2 user object. These are default attributes that are defined through the SCIM2 specification. However, in reality, organizations in the industry will have their own defined attributes for users. In such cases, the Enterprise User schema extension can be used. The Enterprise User schema extension defines attributes commonly used in representing users that belong to, or act on behalf of, a business or enterprise.</p>
<p><strong>Change:</strong> In this release, the <code>               urn:ietf:params:scim:schemas:extension:enterprise:2.0:User              </code> key is used in SCIM user creation to specify the properties of a user specified in <code>               urn:ietf:params:scim:schemas:extension:enterprise:2.0:User              </code> . This behavioral change is done in order to comply with the <a href="https://tools.ietf.org/html/rfc7643#section-3.3">SCIM2 specification</a> .</p>
<p><strong>Example:</strong> The SCIM2 response for the List Users API has changed as follows.</p>

<details class="example"><summary>Click here to view the examples</summary>
    <p>
           <ul>
               <li><b>5.7.0 Request</b>:</li>        
                   ```
                   curl -v -k --user admin:admin https://localhost:9443/scim2/Users/7d132f02-221d-4a5f-8b95-8635666e96c7
                   ```
               <li><b>5.7.0 Response</b></li>
                    ```
                    {"emails":["kim@wso2.com"],"EnterpriseUser":{"organization":"Wso2"},"meta":{"created":"2019-05-13T06:53:03.382Z","lastModified":"2019-05-13T06:57:05.730Z","resourceType":"User"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"roles":[{"type":"default","value":"Internal/everyone"}],"name":{"givenName":"Alex","familyName":"Anderson"},"id":"7d132f02-221d-4a5f-8b95-8635666e96c7","userName":"kim3"}
                    ```
               <li><b>5.8.0 Request</b>:</li>        
                    ```
                    curl -v -k --user admin:admin https://localhost:9443/scim2/Users/7d132f02-221d-4a5f-8b95-8635666e96c7
                    ```
               <li><b>5.8.0 Response</b></li>
                    ```
                    {"emails":["kim@wso2.com"],"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{"organization":"Wso2"},"meta":{"created":"2019-05-13T06:53:03.382Z","lastModified":"2019-05-13T06:57:05.730Z","resourceType":"User"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"roles":[{"type":"default","value":"Internal/everyone"}],"name":{"givenName":"Alex","familyName":"Anderson"},"id":"7d132f02-221d-4a5f-8b95-8635666e96c7","userName":"kim3"}
                    ```
           </ul>
    </p>
</details>    


<p><strong>Impact:</strong> When using the Enterprise User schema extension, if a client has been written based on the 5.7.0 response shown above, issues may occur from the client side as the response of the default pack has now changed.</p>
<p><strong>How to revert:</strong> To revert back to the previous behaviour, change the following attributeName back to <code>EnterpriseUser</code> in the <code><IS_HOME>/repository/conf/scim2-schema-extension.xml</code> file.</p>
```
attributeURI":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User", 
"attributeName":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
``` 
</p>
</div>
</div>
</div>
</div></td>
</tr>

<tr class="even">
<td><div class="content-wrapper">
<p>#2</p>
<p><br />
</p>
</div></td>
<td><div class="content-wrapper">
<p><strong>Use case:</strong> WSO2 IS uses a configuration property to determine the private key that should be used to sign the JWTs issued by the WSO2 Identity Server.</p>
<p><strong>Change:</strong> In IS 5.7.0 the configuration property is set to 'false' by default, which means the JWTs such as <code>               Id token              </code> , <code>               Request Object              </code> , <code>               Self Contain access token              </code> etc., are signed using the private key of the authorized user's tenant domain keystore. From IS 5.8.0 onwards, the default value is set to 'true', which means that JWTs issued from WSO2 IS are signed with the private key belonging to the service provider's keystore.</p>
<p><strong>Impact:</strong> This only makes a difference if the service provider is a SaaS-enabled one; else the user’s tenant domain and the service provider’s tenant domain are the same. If the service provider is SaaS-enabled and this property is set to false, verifying the signature based on the public key of the keystore of the authorized users the signature verification can fail.</p>
<p><strong>How to revert: <strong></strong></strong> To revert back to the previous behavior, change the following property value back to "false" in the <code style="color: rgb(36,41,46);">               &lt;IS_HOME&gt;/repository/conf/identity/identity.xml</code> file .</p>
```
<SignJWTWithSPKey>true</SignJWTWithSPKey>
```
</div>
</div>
<p><br />
</p>
</div></td>
</tr>

<tr class="odd">
<td>#3</td>
    <td><div class="content-wrapper">
        <p><strong>Use case:</strong> In prior versions of WSO2 Identity Server, data publishers were implementations of the <a href="https://github.com/wso2-extensions/identity-data-publisher-authentication/blob/master/components/org.wso2.carbon.identity.data.publisher.application.authentication/src/main/java/org/wso2/carbon/identity/data/publisher/application/authentication/AbstractAuthenticationDataPublisher.java">AbstractAuthenticationDataPublisher</a> that are invoked iteratively by the <a href="https://github.com/wso2-extensions/identity-data-publisher-authentication/blob/master/components/org.wso2.carbon.identity.data.publisher.application.authentication/src/main/java/org/wso2/carbon/identity/data/publisher/application/authentication/AuthnDataPublisherProxy.java">AuthnDataPublisherProxy</a> when a session changes, such that the data publishers send events to their corresponding destinations. From WSO2 Identity Server 5.8.0 onwards, all data publishers have been migrated to act as event handlers that subscribe to authentication events.</p>
        <p><strong>Impact:</strong> Custom DataPublishers that were written for previous versions will not work with the default pack as these listeners are now disabled. For information about migrating existing data publishers to event handlers, see <a href="https://docs.wso2.com/display/IS580/Migrating+Data+Publishers">Migrating Data Publishers</a> .</p>
        <p><strong>How to revert:</strong> To revert back to the previous behavior, do the following:</p>
        <p>Add and enable the following event listeners in the <code>&lt;IS_HOME&gt;/repository/conf/identity/identity.xml</code> file .</p>
        ```
        <EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler" name="org.wso2.carbon.identity.data.publisher.application.authentication.impl.DASLoginDataPublisherImpl" orderId="10" enable="true"/>

        <EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler" name="org.wso2.carbon.identity.data.publisher.application.authentication.impl.DASSessionDataPublisherImpl" orderId="11" enable="true"/>

        <EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler" name="org.wso2.carbon.identity.captcha.validator.FailLoginAttemptValidator" orderId="10" enable="true"/>
        ```
        <p>Set the enable parameter of the following properties to "false" in the <code>&lt;IS_HOME&gt;/repository/conf/identity/identity-event.properties</code> file.</p>
        ```
        module.name.14=analyticsLoginDataPublisheranalyticsLoginDataPublisher.subscription.1=AUTHENTICATION_STEP_SUCCESS
        analyticsLoginDataPublisher.subscription.2=AUTHENTICATION_STEP_FAILURE
        analyticsLoginDataPublisher.subscription.3=AUTHENTICATION_SUCCESS
        analyticsLoginDataPublisher.subscription.4=AUTHENTICATION_FAILURE
        analyticsLoginDataPublisher.enable=false
         
        module.name.15=analyticsSessionDataPublisher
        analyticsSessionDataPublisher.subscription.1=SESSION_CREATE
        analyticsSessionDataPublisher.subscription.2=SESSION_UPDATE
         
        analyticsSessionDataPublisher.subscription.3=SESSION_TERMINATE
        analyticsSessionDataPublisher.enable=true
         
        module.name.13=authenticationAuditLogger
        authenticationAuditLogger.subscription.1=AUTHENTICATION_STEP_SUCCESS
        authenticationAuditLogger.subscription.2=AUTHENTICATION_STEP_FAILURE
        authenticationAuditLogger.subscription.3=AUTHENTICATION_SUCCESS
        authenticationAuditLogger.subscription.4=AUTHENTICATION_FAILURE
        authenticationAuditLogger.subscription.5=SESSION_TERMINATE
        authenticationAuditLogger.enable=true"
         
        module.name.16=failLoginAttemptValidator
        failLoginAttemptValidator.subscription.1=AUTHENTICATION_STEP_FAILURE
        failLoginAttemptValidator.enable=true
        ```
        </div></td>
</tr>

<tr class="even">
<td>#4</td>
<td><div class="content-wrapper">
<p><strong>Use case:</strong> The following configuration properties have been added to support f iltering users or groups only from the PRIMARY domain.</p>
```
<MandateDomainForUsernamesAndGroupNamesInResponse>false</MandateDomainForUsernamesAndGroupNamesInResponse>
<MandateDomainForGroupNamesInGroupsResponse>false</MandateDomainForGroupNamesInGroupsResponse>
```
<p><strong>Change:</strong> Enabling the &lt; <code>               MandateDomainForUsernamesAndGroupNamesInResponse&gt;              </code> property prepends the "PRIMARY/" prefix in the SCIM2 response to the user names and role names (group names) that belong to the PRIMARY user store, regardless of whether the response is for the users endpoint or the groups endpoint. When the properties are set to 'false', the "PRIMARY/" prefix will not be prepended.</p>
<p><strong>Impact:</strong> When this property is enabled, the SCIM response will be different from responses received in previous versions of WSO2 IS. Therefore, if some clients have been written based on these SCIM responses, there is a possibility that this change could break those clients.</p>
<p><strong>Example:</strong> The following code blocks show the difference between the requests and responses that are recieved when this property is enabled, when it is disabled, and in versions prior to 5.8.0. Note that in previous versions, there is an inconsistency in the responses recieved (i.e., the "PRIMARY/" prefix is prepended to group names only in the groups endpoint request). This inconsistency has been fixed with the introduction of these two new properties. When the &lt; <code>               MandateDomainForUsernamesAndGroupNamesInResponse&gt;              </code> property is enabled, the "PRIMARY/" prefix is prepended to both user names and group names for both users and groups endpoint responses, and when the property is disabled, it is not prepended at all.</p>

<details class="example">
    <summary>Click here to view the examples</summary>
       <p>
       <ul><b>Old behavior:</b>
               <li><b>Groups endpoint request</b></li>
                    ```
                    curl -v -k --user admin:admin 'https://localhost:9443/scim2/Groups'
                    ```
               <li><b>Groups endpoint response</b></li>        
                    ```                   
                    {"totalResults":4,"startIndex":1,"itemsPerPage":4,"schemas":["urn:ietf:params:scim:api:messages:2.0:ListResponse"],"Resources":[{"displayName":"PRIMARY/Engineering","meta":{"created":"2019-05-13T03:44:36.787Z","location":"https://localhost:9443/scim2/Groups/abb1c935-dcd2-4e89-a633-72bf22460463","lastModified":"2019-05-13T03:44:36.787Z"},"members":[{"display":"ann","value":"1ad7272f-82b5-4a44-9a86-fe1f31279b29"}],"id":"abb1c935-dcd2-4e89-a633-72bf22460463"},{"displayName":"Internal/system","meta":{"created":"2019-05-13T03:42:53.425Z","location":"https://localhost:9443/scim2/Groups/c9f632fa-12e9-405d-92c8-076657151104","lastModified":"2019-05-13T03:42:53.425Z"},"id":"c9f632fa-12e9-405d-92c8-076657151104"},{"displayName":"PRIMARY/admin","meta":{"created":"2019-05-13T03:42:52.839Z","location":"https://localhost:9443/scim2/Groups/bebe2740-8490-4da3-814b-fc010a92f665","lastModified":"2019-05-13T03:42:52.839Z"},"members":[{"display":"admin","value":"442c1077-75f4-4327-981a-4846efff396e"}],"id":"bebe2740-8490-4da3-814b-fc010a92f665"},{"displayName":"PRIMARY/Manager","meta":{"created":"2019-05-13T03:44:54.118Z","location":"https://localhost:9443/scim2/Groups/12bf8c7a-768e-43b2-b256-14c89b086bd3","lastModified":"2019-05-13T03:44:54.118Z"},"members":[{"display":"kim","value":"68ef862d-6013-4bb0-87ad-9531d7a99765"}],"id":"12bf8c7a-768e-43b2-b256-14c89b086bd3"}]}
                    ```
               <li><b>Users endpoint request</b></li>
                    ```                       
                    curl -v -k --user admin:admin 'https://localhost:9443/scim2/Users'
                    ```
                <li><b>Users endpoint response</b></li>        
                    ```                   
                   {"totalResults":3,"startIndex":1,"itemsPerPage":3,"schemas":["urn:ietf:params:scim:api:messages:2.0:ListResponse"],"Resources":[{"emails":["admin@wso2.com"],"meta":{"created":"2019-05-13T09:12:52Z","lastModified":"2019-05-13T09:12:52Z"},"name":{"givenName":"admin","familyName":"admin"},"groups":[{"display":"admin","value":"bebe2740-8490-4da3-814b-fc010a92f665"}],"id":"442c1077-75f4-4327-981a-4846efff396e","userName":"admin"},{"meta":{"created":"2019-05-13T03:44:20.474Z","lastModified":"2019-05-13T03:44:20.474Z","resourceType":"User"},"name":{"familyName":"ann"},"groups":[{"display":"Engineering","value":"abb1c935-dcd2-4e89-a633-72bf22460463"}],"id":"1ad7272f-82b5-4a44-9a86-fe1f31279b29","userName":"ann"},{"meta":{"created":"2019-05-13T03:44:06.517Z","lastModified":"2019-05-13T03:44:06.517Z","resourceType":"User"},"name":{"familyName":"kim"},"groups":[{"display":"Manager","value":"12bf8c7a-768e-43b2-b256-14c89b086bd3"}],"id":"68ef862d-6013-4bb0-87ad-9531d7a99765","userName":"kim"}]}
                    ```
       </ul>  
    


<ul><b>Enabled:</b>
        <li><b>Groups endpoint request</b></li>        
            ```        
            curl -v -k --user admin:admin 'https://localhost:9443/scim2/Groups'
            ```
        <li><b>Groups endpoint response</b></li>        
            ```            
            {"totalResults":4,"startIndex":1,"itemsPerPage":4,"schemas":["urn:ietf:params:scim:api:messages:2.0:ListResponse"],"Resources":[{"displayName":"PRIMARY/Engineering","meta":{"created":"2019-05-13T03:44:36.787Z","location":"https://localhost:9443/scim2/Groups/abb1c935-dcd2-4e89-a633-72bf22460463","lastModified":"2019-05-13T03:44:36.787Z"},"members":[{"display":"PRIMARY/ann","value":"1ad7272f-82b5-4a44-9a86-fe1f31279b29"}],"id":"abb1c935-dcd2-4e89-a633-72bf22460463"},{"displayName":"Internal/system","meta":{"created":"2019-05-13T03:42:53.425Z","location":"https://localhost:9443/scim2/Groups/c9f632fa-12e9-405d-92c8-076657151104","lastModified":"2019-05-13T03:42:53.425Z"},"id":"c9f632fa-12e9-405d-92c8-076657151104"},{"displayName":"PRIMARY/admin","meta":{"created":"2019-05-13T03:42:52.839Z","location":"https://localhost:9443/scim2/Groups/bebe2740-8490-4da3-814b-fc010a92f665","lastModified":"2019-05-13T03:42:52.839Z"},"members":[{"display":"PRIMARY/admin","value":"442c1077-75f4-4327-981a-4846efff396e"}],"id":"bebe2740-8490-4da3-814b-fc010a92f665"},{"displayName":"PRIMARY/Manager","meta":{"created":"2019-05-13T03:44:54.118Z","location":"https://localhost:9443/scim2/Groups/12bf8c7a-768e-43b2-b256-14c89b086bd3","lastModified":"2019-05-13T03:44:54.118Z"},"members":[{"display":"PRIMARY/kim","value":"68ef862d-6013-4bb0-87ad-9531d7a99765"}],"id":"12bf8c7a-768e-43b2-b256-14c89b086bd3"}]}
            ```
        <li><b>Users endpoint request</b></li>    
            ```    
            curl -v -k --user admin:admin 'https://localhost:9443/scim2/Users'
            ```
         <li><b>Users endpoint response</b></li>        
            ```
            {"totalResults":3,"startIndex":1,"itemsPerPage":3,"schemas":["urn:ietf:params:scim:api:messages:2.0:ListResponse"],"Resources":[{"emails":["admin@wso2.com"],"meta":{"created":"2019-05-13T09:12:52Z","lastModified":"2019-05-13T09:12:52Z"},"name":{"givenName":"admin","familyName":"admin"},"groups":[{"display":"PRIMARY/admin","value":"bebe2740-8490-4da3-814b-fc010a92f665"}],"id":"442c1077-75f4-4327-981a-4846efff396e","userName":"PRIMARY/admin"},{"meta":{"created":"2019-05-13T03:44:20.474Z","lastModified":"2019-05-13T03:44:20.474Z","resourceType":"User"},"name":{"familyName":"ann"},"groups":[{"display":"PRIMARY/Engineering","value":"abb1c935-dcd2-4e89-a633-72bf22460463"}],"id":"1ad7272f-82b5-4a44-9a86-fe1f31279b29","userName":"PRIMARY/ann"},{"meta":{"created":"2019-05-13T03:44:06.517Z","lastModified":"2019-05-13T03:44:06.517Z","resourceType":"User"},"name":{"familyName":"kim"},"groups":[{"display":"PRIMARY/Manager","value":"12bf8c7a-768e-43b2-b256-14c89b086bd3"}],"id":"68ef862d-6013-4bb0-87ad-9531d7a99765","userName":"PRIMARY/kim"}]}
            ```
</ul>


<ul><b>Disabled:</b>
        <li><b>Groups endpoint request</b></li>
            ```        
            curl -v -k --user admin:admin 'https://localhost:9443/scim2/Groups'
            ```
        <li><b>Groups endpoint response</b></li>
            ```        
            {"totalResults":4,"startIndex":1,"itemsPerPage":4,"schemas":["urn:ietf:params:scim:api:messages:2.0:ListResponse"],"Resources":[{"displayName":"Engineering","meta":{"created":"2019-05-13T03:44:36.787Z","location":"https://localhost:9443/scim2/Groups/abb1c935-dcd2-4e89-a633-72bf22460463","lastModified":"2019-05-13T03:44:36.787Z"},"members":[{"display":"ann","value":"1ad7272f-82b5-4a44-9a86-fe1f31279b29"}],"id":"abb1c935-dcd2-4e89-a633-72bf22460463"},{"displayName":"Internal/system","meta":{"created":"2019-05-13T03:42:53.425Z","location":"https://localhost:9443/scim2/Groups/c9f632fa-12e9-405d-92c8-076657151104","lastModified":"2019-05-13T03:42:53.425Z"},"id":"c9f632fa-12e9-405d-92c8-076657151104"},{"displayName":"admin","meta":{"created":"2019-05-13T03:42:52.839Z","location":"https://localhost:9443/scim2/Groups/bebe2740-8490-4da3-814b-fc010a92f665","lastModified":"2019-05-13T03:42:52.839Z"},"members":[{"display":"admin","value":"442c1077-75f4-4327-981a-4846efff396e"}],"id":"bebe2740-8490-4da3-814b-fc010a92f665"},{"displayName":"Manager","meta":{"created":"2019-05-13T03:44:54.118Z","location":"https://localhost:9443/scim2/Groups/12bf8c7a-768e-43b2-b256-14c89b086bd3","lastModified":"2019-05-13T03:44:54.118Z"},"members":[{"display":"kim","value":"68ef862d-6013-4bb0-87ad-9531d7a99765"}],"id":"12bf8c7a-768e-43b2-b256-14c89b086bd3"}]}
            ```
        <li><b>Users endpoint request</b></li>
            ```
            curl -v -k --user admin:admin 'https://localhost:9443/scim2/Users'
            ```
         <li><b>Users endpoint response</b></li>
            ```        
            {"totalResults":3,"startIndex":1,"itemsPerPage":3,"schemas":["urn:ietf:params:scim:api:messages:2.0:ListResponse"],"Resources":[{"emails":["admin@wso2.com"],"meta":{"created":"2019-05-13T09:12:52Z","lastModified":"2019-05-13T09:12:52Z"},"name":{"givenName":"admin","familyName":"admin"},"groups":[{"display":"admin","value":"bebe2740-8490-4da3-814b-fc010a92f665"}],"id":"442c1077-75f4-4327-981a-4846efff396e","userName":"admin"},{"meta":{"created":"2019-05-13T03:44:20.474Z","lastModified":"2019-05-13T03:44:20.474Z","resourceType":"User"},"name":{"familyName":"ann"},"groups":[{"display":"Engineering","value":"abb1c935-dcd2-4e89-a633-72bf22460463"}],"id":"1ad7272f-82b5-4a44-9a86-fe1f31279b29","userName":"ann"},{"meta":{"created":"2019-05-13T03:44:06.517Z","lastModified":"2019-05-13T03:44:06.517Z","resourceType":"User"},"name":{"familyName":"kim"},"groups":[{"display":"Manager","value":"12bf8c7a-768e-43b2-b256-14c89b086bd3"}],"id":"68ef862d-6013-4bb0-87ad-9531d7a99765","userName":"kim"}]}
            ```
</ul>
</p>


<p><strong>How to revert:</strong> <strong><strong></strong></strong> To revert back to the previous behaviour (in versions prior to 5.8.0), set the following property value to "true" in the <code>               &lt;IS_HOME&gt;/repository/conf/identity/identity.xml              </code> file.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb22" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb22-1" title="1">&lt;MandateDomainForGroupNamesInGroupsResponse&gt;<span class="kw">true</span>&lt;/MandateDomainForGroupNamesInGroupsResponse&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td>#5</td>
<td><div class="content-wrapper">
<p><strong>Use case:</strong> A new configuration property <code>               &lt;ForceLocalCache&gt;              </code> has been added. For clustered nodes, enabling this property enables local cache invalidations.</p>
<p><strong>Change</strong> : In a clustered nodes setup, cache invalidation requests for any local cache of a particular node will be sent to other nodes in the cluster for each cache related operation such as cache update, delete, or add. In previous versions of WSO2 IS, these invalidation requests were not sent to other nodes in the cluster by default. Therefore, it is recommended to enable this property if the local cache is enabled in a clustered setup.</p>
<p><strong>How to revert: <strong><strong><strong></strong></strong></strong></strong> To revert back to the previous behavior, change the following property value back to "false" in the <code>               &lt;IS_HOME&gt;/repository/conf/carbon.xml</code> file .</p>
```
<ForceLocalCache>true</ForceLocalCache>
```
</div>
</div>
</div></td>
</tr>
</tbody>
</table>


### Configuration changes

This section lists out the configuration changes in each configuration
file including new properties, modified properties, and deprecated
properties.

!!! note
    
    The configuration changes listed below will not affect the
    existing system because these configurations are applied only at first
    start up and new tenant creation.  
    If you wish to change the configurations for the existing tenants,
    configure it through the management console user interface.
    




<table>
    <colgroup>
<col style="width: 25%" />
<col style="width: 75%" />
</colgroup>

    <thead>
        <tr class="header">
            <th>Configuration File</th>
            <th>Changes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <div class="content-wrapper">
                    <p><code>carbon.xml</code> file in the <code><IS_HOME>/repository/conf</code> directory</p>
                </div>
            </td>
            <td>
                <div class="content-wrapper">
                    <p>The version property value has been changed to 5.8.0.</p>
                    <div class=""></div>
                    ```
                    java<Version>5.8.0</Version>                 
                    ```
                    <p><b>Why?</b></p>
                    <p>This property indicates the version of WSO2 IS.</p>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="content-wrapper">
                    <p><code>axis2.xml</code> file in the<code><IS_HOME>/repository/conf/axis2</code> directory</p>
                </div>
            </td>
            <td>
                <div class="content-wrapper">
                    <p>The following property values have been changed to 5.8.0.</p>
                    ``` java
                    <parameter name="userAgent" locked="true">
                            WSO2 Identity Server-5.8.0
                    </parameter>
                    <parameter name="server" locked="true">
                        WSO2 Identity Server-5.8.0
                    </parameter>
                    ```
                    <p>The following property has been added.</p>
                    ``` java
                    <parameter name="forceIncludeNullElements">false</parameter>
                    ```
                    <p><b>Why?</b></p>
                    <p>Enabling this property forces elements that have the <code>@IgnoreNullElement</code> annotation to be returned as well even though the value is null. The default value for this property is <code>false</code>.</p>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="content-wrapper">
                    <p><code>Endpointconfig.properties</code> file in the <code><IS_HOME>/repository/conf/identity</code>directory</p>
                </div
            </td>
            <td>
                <div class="content-wrapper">
                    <p>The following property has been added.</p>
                    ``` java
                    mutualSSLManagerEnabled=true
                    ```
                    <p><b>Why?</b></p>
                    <p>Enabling this property allows the <code>MutualSSLManager</code> to initialize the keystores. If it is set to <code>false</code>, the <code>MutualSSLManager</code> will not initialize the keystore.</p>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="content-wrapper">
                    <p><code>application-authentication.xml</code> file in the <code><IS_HOME>/repository/conf/identity</code> directory</p>
                </div>
            </td>
            <td>
                <div class="content-wrapper">
                    <p>The following property has been added to the following authenticators under the relevant tags.</p>
                    <ul>
                        <li><b>BasicAuthenticator</b></li>
                            ```
                            <AuthenticatorConfig name="BasicAuthenticator" enabled="true">
                            ```
                        <li><b>BasicAuthRequestPathAuthenticator</b></li>
                            ```
                            <AuthenticatorConfig name="BasicAuthRequestPathAuthenticator" enabled="true">
                            ```
                    </ul>
                    ``` java
                    <Parameter name="AuthMechanism">basic</Parameter>
                    ```                               
                    <p><b>Why?</b></p>
                    <p>This property is used to help identify the authentication mechanism used by the authenticator.</p>
                    <hr>
                    <p>The following parameters were added under the <code><AuthenticatorConfig name="EmailOTP" enabled="true"></code> tag. 
                    ``` java
                    <Parameter name="EMAILOTPAuthenticationEndpointURL">emailotpauthenticationendpoint/emailotp.jsp</Parameter>
                    <Parameter name="EmailOTPAuthenticationEndpointErrorPage">emailotpauthenticationendpoint/emailotpError.jsp</Parameter>
                    <Parameter name="EmailAddressRequestPage">emailotpauthenticationendpoint/emailAddress.jsp</Parameter>
                    ```
                    <p><b>Why?</b></p>
                    <p> The following parameters make the Email OTP URLs configurable.</p>                     
                    <p>The <code>totp</code> authenticator configurations were uncommented and the following parameters have been added under the <code><AuthenticatorConfig name="totp" enabled="true"></code> tag.</p> 
                    ``` java
                    <Parameter name="Issuer">WSO2</Parameter>
                    <Parameter name="UseCommonIssuer">true</Parameter>
                    ```
                    <p><b>Why?</b>The added parameters make the <code>totp</code> issuer configurable instead of showing the domain name.</p>
                    <hr>
                    <p>The following parameter has been removed from the totp authenticator as it is redundant.</p> 
                    ``` java
                    <Parameter name="redirectToMultiOptionPageOnFailure">false</Parameter>
                    ```
                    <hr>
                    <p>The following property has been added under the <code><ApplicationAuthentication></code> tag.</p>
                    ``` xml
                    <!--Similar to the 'AuthenticationEndpointQueryParams' above, the following section defines the parameters that should be included/excluded in the redirection responses from authentication framework. These parameters may be generated internally from the framework, handlers or authenticators. The filtered parameters will be available via the REST API for authentication framework. "removeOnConsumeFromAPI" defines whether to make the filtered parameters unavailable from the API on the first consumption. -->
                    <AuthenticationEndpointRedirectParams action="exclude" removeOnConsumeFromAPI="true">
                        <AuthenticationEndpointRedirectParam name="loggedInUser"/>
                    </AuthenticationEndpointRedirectParams>
                    ```
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="content-wrapper">
                    <p><code>captcha-config.properties</code> file in the <code><IS_HOME>/repository/conf/identity</code> directory</p>
                </div>
            </td>
            <td>
                <div class="content-wrapper">
                    <p>The following properties have been added.</p>
                    ``` java
                    #reCaptcha failed redirect urls
                    #recaptcha.failed.redirect.urls=
                    ```
                    <p><b>Why?</b></p>
                    <p>The properties listed above allow configuring the list of URLs that can be used for redirection when reCaptcha fails.</p>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="content-wrapper">
                    <p><code>scim2-schema-extension.config</code> file stored in the <code><IS_HOME>/repository/conf</code> directory</p>
                </div>
            </td>
            <td>
                <div class="content-wrapper">
                    <p>The <code>EnterpriseUser</code> attribute name has been changed from what is reflected in the 5.7.0 code block to the configuration shown in the 5.8.0 code block.</p>
                    <ul>
                        <li><b>5.7.0:</b></li> 
                        ``` java
                        "attributeURI":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User", 
                        "attributeName":"EnterpriseUser",
                        ```
                        <li><b>5.8.0:</b></li>
                        ``` java
                        attributeURI":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User", 
                        "attributeName":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
                        ```
                    </ul>
                    <p><b>Why?</b></p>
                    <p> This change is done in order to comply with the [SCIM2 specification](https://tools.ietf.org/html/rfc7643#section-3.3). For more details, see [behavioral change \#1 in the behavioral changes table](#UnderstandingWhatHasChanged-1) given above.</p>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="content-wrapper">
                    <p><code>identity-event.properties</code> file in the <code><IS_HOME>/repository/conf/identity</code> directory</p>
                </div>
            </td>
            <td>
                <div class="content-wrapper">
                    <p>The password policy error message has been modified as follows.</p>
                    ``` java
                    passwordPolicy.errorMsg='Password pattern policy violated. Password should contain a digit[0-9], a lower case letter[a-z], an upper case letter[A-Z], and one of !@#$%&* characters'
                    ```
                    <p> The following handlers have been added.</p> 
                    ``` java
                    module.name.17=SAMLLogoutHandler
                    SAMLLogoutHandler.subscription.1=SESSION_TERMINATE
                    SAMLLogoutHandler.enable=true 

                    # To delete registration code in database once the user deletion
                    module.name.18=confirmationCodesInvalidate
                    confirmationCodesInvalidate.subscription.1=POST_DELETE_USER
                    ```
                    <p><b>Why?</b></p>
                    <p>These handlers are introduced to support the cross-protocol logout feature and for migration of existing data publishers to event handlers that subscribe to authentication events. For more information about migrating existing data publishers to event handlers, see [Migrating Data Publishers](_Migrating_Data_Publishers_).</p>  
                    <hr>
                    <p>The following properties were added.</p> 
                    ``` java
                    module.name.14=analyticsLoginDataPublisher
                    analyticsLoginDataPublisher.subscription.1=AUTHENTICATION_STEP_SUCCESS
                    analyticsLoginDataPublisher.subscription.2=AUTHENTICATION_STEP_FAILURE
                    analyticsLoginDataPublisher.subscription.3=AUTHENTICATION_SUCCESS
                    analyticsLoginDataPublisher.subscription.4=AUTHENTICATION_FAILURE
                    analyticsLoginDataPublisher.enable=false

                    module.name.15=analyticsSessionDataPublisher
                    analyticsSessionDataPublisher.subscription.1=SESSION_CREATE
                    analyticsSessionDataPublisher.subscription.2=SESSION_UPDATE

                    analyticsSessionDataPublisher.subscription.3=SESSION_TERMINATE
                    analyticsSessionDataPublisher.enable=true

                    module.name.13=authenticationAuditLogger
                    authenticationAuditLogger.subscription.1=AUTHENTICATION_STEP_SUCCESS
                    authenticationAuditLogger.subscription.2=AUTHENTICATION_STEP_FAILURE
                    authenticationAuditLogger.subscription.3=AUTHENTICATION_SUCCESS
                    authenticationAuditLogger.subscription.4=AUTHENTICATION_FAILURE
                    authenticationAuditLogger.subscription.5=SESSION_TERMINATE
                    authenticationAuditLogger.enable=true"

                    module.name.16=failLoginAttemptValidator
                    failLoginAttemptValidator.subscription.1=AUTHENTICATION_STEP_FAILURE
                    failLoginAttemptValidator.enable=true
                    ```
                    <p><b>Why?</b></p>
                    <p>The properties listed above are added to support the event listeners that were added for migrating data publishers to event handlers. For more details, see [behavioral change \#3 in the behavioral changes table](#UnderstandingWhatHasChanged-3) given above.</p>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="content-wrapper">
                    <p><code>identity.xml</code> file stored in the <code><IS_HOME>/repository/conf/identity</code> directory</p>
                </div>
            </td>
            <td>
                <div class="content-wrapper">
                    <p>The following property has been added to the <code>IntrospectionDataProvider</code> interface.</p> 
                    ``` java
                    <Introspection>
                        <EnableDataProviders>false</EnableDataProviders>
                    </Introspection>
                    ```
                    <p><b>Why?</b></p>
                    <p>This property is used to inject additional data to the introspection response. The default <code>CleanUpPeriod</code> value has been modified to 1440.</p> 
                    ``` java
                    <CleanUpPeriod>1440</CleanUpPeriod>
                    ```
                    <hr>
                    <p>The default value of the following property has been changed from false to <code>true</code>.</p> 
                    ``` java
                    <SignJWTWithSPKey>true</SignJWTWithSPKey>
                    ```
                    <p><b>Why?</b></p>
                    <p>For details about this change, see [behavioral change \#2 in the behavioral changes table](#UnderstandingWhatHasChanged-2) given above.</p>
                    <hr>
                    <p>The following property has been added under the <code><SessionDataPersist></code> tag.</p> 
                    ``` java
                    <UserSessionMapping>
                        <Enable>true</Enable>
                    </UserSessionMapping>
                    ```
                    <p><b>Why?</b></p>
                    <p>This property enables terminating all the active sessions of a user during password reset, user deletion, and username renaming.</p>
                    <hr>
                    <p>The following event listeners have been removed.</p>                 
                    ``` java
                    <EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler"                name="org.wso2.carbon.identity.data.publisher.application.authentication.impl.DASLoginDataPublisherImpl" orderId="10" enable="true"/>

                    <EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler" name="org.wso2.carbon.identity.data.publisher.application.authentication.impl.DASSessionDataPublisherImpl" orderId="11" enable="true"/>

                    <EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler" name="org.wso2.carbon.identity.captcha.validator.FailLoginAttemptValidator" orderId="10" enable="true"/>
                    ```
                    <p><b>Why?</b></p>
                    <p>From WSO2 IS 5.8.0 onwards, data publishers are migrated to act as event handlers that subscribe to authentication events. Hence, the event listeners listed above have been removed by default. For more details, see [behavioral change \#3 in the behavioral changes table](#UnderstandingWhatHasChanged-3) given above.</p>
                    <hr>
                    <p>The following property has been added.</p> 
                    ``` java
                    <FilterUsersAndGroupsOnlyFromPrimaryDomain>false</FilterUsersAndGroupsOnlyFromPrimaryDomain>
                    ```
                    <p><b>Why?</b></p>
                    <p>Enabling this property filters users or groups only from the PRIMARY user store, regardless of the Users and Groups endpoints. If it is set to <code>false</code> it filters users or groups across all user stores.</p> 
                    <hr>
                    <p>The following property has been added.</p>
                    ``` java
                    <MandateDomainForUsernamesAndGroupNamesInResponse>false</MandateDomainForUsernamesAndGroupNamesInResponse>
                    ```
                    <p><b>Why?</b></p>
                    <p>Enabling this property prepends the "PRIMARY/" prefix to the user name and role name (group name) that belongs to the PRIMARY user store, in the SCIM2 response regardless of the Users and Groups endpoint. When it is set to 'false', the "PRIMARY/" prefix will not be prepended. For more details, see [behavioral change \#4 in the behavioral changes table](#UnderstandingWhatHasChanged-4) given above.</p>
                    <hr>
                    <p>The following property has been added.</p>
                    ``` java
                    <MandateDomainForGroupNamesInGroupsResponse>false</MandateDomainForGroupNamesInGroupsResponse>
                    ```
                    <p><b>Why?</b></p>
                    <p>Enabling this property in the Groups endpoints prepends the "PRIMARY/" prefix to the role name (group name) that belongs to the PRIMARY user store. When it is set to 'false', the "PRIMARY/" prefix will not be prepended. For more details, see [behavioral change \#4 in the behavioral changes table](#UnderstandingWhatHasChanged-4) given above. The following properties have been added under the <code><Server></code> tag.</p> 
                    ``` java
                    <!--This configuration is used to define the Service Provider name regex in DCR and IdentityApplicationManagementService-->
                        <!--<ServiceProviders>-->
                            <!--<SPNameRegex>^[a-zA-Z0-9._-]*$</SPNameRegex>-->
                        <!--</ServiceProviders>-->
                    ```
                    <hr>
                    <p>The following properties have been added under the <code><OAuth></code> tag.</p>  
                    ``` java
                    <!-- If enabled, resident Idp entity id will be honoured as the issuer location in OpenId Connect Discovery -->
                            <UseEntityIdAsIssuerInOidcDiscovery>true</UseEntityIdAsIssuerInOidcDiscovery>
                    ```
                    <hr>
                    <p>The UMA grant type has been added as a supported grant type under the <code><SupportedGrantTypes></code> tag.</p> 
                    ``` java
                    <!-- Supported versions: IS 5.7.0 onwards.-->
                    <SupportedGrantType>
                        <GrantTypeName>urn:ietf:params:oauth:grant-type:uma-ticket</GrantTypeName>
                        <GrantTypeHandlerImplClass>org.wso2.carbon.identity.oauth.uma.grant.UMA2GrantHandler</GrantTypeHandlerImplClass>
                        <GrantTypeValidatorImplClass>org.wso2.carbon.identity.oauth.uma.grant.GrantValidator</GrantTypeValidatorImplClass>
                    </SupportedGrantType>
                    ```
                    <hr>
                    <p>The following properties have been added under the <code><OAuth></code> tag.</p> 
                    ``` java
                    <!-- Configurations for JWT bearer grant. Supported versions: IS 5.8.0 onwards. -->
                    <JWTGrant>
                        <!-- Validate issued at time (iat) of JWT token. The validity can be set using 'IATValidity' configuration.
                                 Default value is 'true'.
                                 -->
                        <EnableIATValidation>true</EnableIATValidation>
                        <!-- Reject the JWT if the iat of JWT is pass a certain time period. Time period is in minutes.
                                 'EnableIATValidation' configuration should be set to 'true' in order to make use of the validity 
                                 period.
                                 Default value is '30' minutes.
                                 -->
                        <IATValidityPeriod>30</IATValidityPeriod>
                    </JWTGrant>
                    ```
                    <hr> 
                    <p>The following properties have been added under the <code><OpenIDConnect></code> tag.</p> 
                    ``` java
                    <!-- Add tenant domain to 'realm' claim of ID Token-->
                    <AddTenantDomainToIdToken>false</AddTenantDomainToIdToken>
                    <!-- Add userstore domain to 'realm' claim of ID Token-->
                    <AddUserstoreDomainToIdToken>false</AddUserstoreDomainToIdToken>
                    ```
                    <hr>
                    <p>The following properties have been added under the <code><OAuth></code> tag.</p> 
                    ``` java
                    <!--Configuration provides the ability to renew the access token and the refresh token(where applicable) per each token request and revoke previously available active token for a matching clientid, user and scopes combination.
                    Not applicable for refresh token grant type and when when self-contained access tokens are used.
                    Default value : false
                    Supported versions : IS 5.8.0 onwards -->
                    <!--<RenewTokenPerRequest>true</RenewTokenPerRequest>-->

                    <!--By enabling this property, in a logout request if the opbs cookie or a valid session does not exist instead of showing the invalid request error page the user will be redirected to the successfully logged out page of the IS or if a valid id_token_hint and a valid post_logout_redirect_uri is available user will be redirected to the post_logout_redirect_uri-->
                    <HandleAlreadyLoggedOutSessionsGracefully>false</HandleAlreadyLoggedOutSessionsGracefully>
                    ```
                    <hr>
                    <p>The following properties have been added under the <code><SSOService></code> tag.</p> 
                    ``` java
                    <ArtifactResolutionEndpoint>${carbon.protocol}://${carbon.host}:${carbon.management.port}/samlartresolve</ArtifactResolutionEndpoint>
                    <SAMLECPEndpoint>${carbon.protocol}://${carbon.host}:${carbon.management.port}/samlecp</SAMLECPEndpoint>
                    ```
                    <p><b>Why?</b></p>
                    <p>These properties allow adding the Artifact URL as a Resident IDP property in the WSO2 IS management console.</p>
                    <hr>
                    <p>The following properties have been added under the <code>\<SCIM2\></code> tag.</p> 
                    ``` java
                    <!--<ComplexMultiValuedAttributeSupportEnabled>true</ComplexMultiValuedAttributeSupportEnabled>-->
                    <!--<EnableFilteringEnhancements>true</EnableFilteringEnhancements>-->
                    ```
                    <p><b>Why?</b></p>
                    <p>The <code><EnableFilteringEnhancements></code> property was introduced for the purpose of applying filtering enhancements for SCIM2 filter results. Enabling this ensures that the Eq filter strictly checks for a string match (in this case cross user store search should not be performed). This configuration also enforces consistency on the filtered attribute formats in the response when filtering is done via different endpoints. e.g. Users and Groups endpoints.</p>
                    <hr>
                    <p>The following properties have been added under the <code><Recovery></code> tag.</p> 
                    ``` java
                     <ReCaptcha>
                        <Password>
                            <Enable>false</Enable>
                        </Password>
                        <Username>
                            <Enable>false</Enable>
                        </Username>
                    </ReCaptcha>
                    <CallbackRegex>${carbon.protocol}://${carbon.host}:${carbon.management.port}/authenticationendpoint/login.do</CallbackRegex>
                    ```
                    <p><b>Why?</b></p>
                    <p>This configuration block is used to enable ReCaptcha verification for password recovery and username recovery.</p>
                    <hr>
                    <p>The following property have been added under the <code><SelfRegistration></code> tag.</p>
                    ``` java
                    <CallbackRegex>${carbon.protocol}://${carbon.host}:${carbon.management.port}/authenticationendpoint/login.do</CallbackRegex>
                    ```
                    <p><b>Why?</b></p>
                    <p>This property enables configuring a regex pattern for the callback URLs of the account recovery and self registration APIs. The callbackURL included in the requests is then validated with the configured regex pattern.</p>
                    <hr>
                    <p>The following new event listener has been added under the <code><EventListeners></code> tag.</p> 
                    ``` java
                    <EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityHandler"
                                           name="org.wso2.carbon.identity.data.publisher.oauth.listener.OAuthTokenIssuanceLogPublisher"
                                           orderId="12" enable="false">
                                          <Property name="Log.Token">false</Property>
                    </EventListener>

                    <EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener"
                                           name="org.wso2.carbon.identity.mgt.listener.UserSessionTerminationListener"
                                           orderId="85" enable="true"/>

                    <EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener"
                                           name="org.wso2.carbon.user.mgt.listeners.UserClaimsAuditLogger"
                                           orderId="9" enable="false"/>
                    ```
                    <p><b>Why?</b></p>
                    <p><code>AbstractIdentityHandler</code> - Enabling this listener logs the audit data for OAuth token issuance and token introspection. Adding this property allows you to disable logging, else if this property is not present in the configuration file, logging is enabled by default. For more information about auditing, see [OAuth Transaction Logs](../../using-wso2-identity-server/oauth-transaction-logs).</p>
                    <p><code>UserOperationEventListener</code> - This event listener is used to support session termination at the point renaming the username.</p>
                    <p><code>UserOperationEventListener</code> - This event listener allows adding claims to the audit logs.</p>
                    <hr>
                    <p>The following caches have been added under the <code><CacheManager name="IdentityApplicationManagementCacheManager"></code> tag.</p> 
                    ``` java
                    <Cache name="JWKSCache" enable="true" timeout="300" capacity="5000" isDistributed="false"/>
                    <Cache name="ServiceProviderCache.ID" enable="true"  timeout="900" capacity="5000" isDistributed="false"/>
                    <Cache name="ServiceProvideCache.InboundAuth" enable="true"  timeout="900" capacity="5000" isDistributed="false"/>
                    ```
                    <p><b>Why?</b></p>
                    <p><code>JKWSCache</code> - This property has been added to support JWKS Endpoint Cache invalidation.</p>
                    <p><code>ServiceProviderCache.ID</code> and <code>ServiceProvideCache.InboundAuthKey</code> - These two properties have been added in order to cache   the service provider against the ID and inboundAuth. If these new properties is not present in the configuration file, the configuration value of the <code>ServiceProviderCache</code> is applied for these caches.
                    <hr>
                    <p>The following resources have been added under the </code>\<ResourceAccessControl></code> tag. 
                    ``` java
                    <Resource context="(.*)/api/identity/config-mgt/v1.0/search(.*)" secured="true" http-method="GET">
                        <Permissions>/permission/admin/manage/identity/configmgt/list</Permissions>
                    </Resource>
                    <Resource context="(.*)/api/identity/config-mgt/v1.0/resource-type" secured="true" http-method="POST">
                        <Permissions>/permission/admin/manage/identity/configmgt/add</Permissions>
                    </Resource>
                    <Resource context="(.*)/api/identity/config-mgt/v1.0/resource-type" secured="true" http-method="PUT">
                        <Permissions>/permission/admin/manage/identity/configmgt/update</Permissions>
                    </Resource>
                    <Resource context="(.*)/api/identity/config-mgt/v1.0/resource-type/(.*)" secured="true" http-method="GET"/>
                    <Resource context="(.*)/api/identity/config-mgt/v1.0/resource-type/(.*)" secured="true" http-method="DELETE">
                        <Permissions>/permission/admin/manage/identity/configmgt/delete</Permissions>
                    </Resource>
                    <Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)" secured="true" http-method="POST">
                        <Permissions>/permission/admin/manage/identity/configmgt/add</Permissions>
                    </Resource>
                    <Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)" secured="true" http-method="PUT">
                        <Permissions>/permission/admin/manage/identity/configmgt/update</Permissions>
                    </Resource>
                    <Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)/(.*)" secured="true" http-method="GET"/>
                    <Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)/(.*)" secured="true" http-method="DELETE">
                        <Permissions>/permission/admin/manage/identity/configmgt/delete</Permissions>
                    </Resource>
                    <Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)/(.*)" secured="true" http-method="POST">
                        <Permissions>/permission/admin/manage/identity/configmgt/add</Permissions>
                    </Resource>
                    <Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)/(.*)" secured="true" http-method="PUT">
                        <Permissions>/permission/admin/manage/identity/configmgt/update</Permissions>
                    </Resource>
                    <Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)/(.*)/(.*)" secured="true" http-method="GET"/>
                    <Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)/(.*)/(.*)" secured="true" http-method="DELETE">
                        <Permissions>/permission/admin/manage/identity/configmgt/delete</Permissions>
                    </Resource>
                    ```
                    <p><b>Why?</b></p>
                    <p>These resources control access to the configuration management resources in WSO2 IS.</p>
                    <hr>
                    <p>The resource context <code>/scim2/ResourceType</code> to <code>/scim2/ResourceTypes</code> found under the <code><ResourceAccessControl></code> tag has been modified as shown below.</p>
                    ``` java
                    <Resource context="/scim2/ResourceTypes" secured="false" http-method="all">
                    ```
                    <p><b>Why?</b></p>
                    <p>This change is done in order to comply with the [SCIM2 specification](https://tools.ietf.org/html/rfc7643#section-3.3).</p>  
                    <p>The following resource found under the <code><ResourceAccessControl></code> tag has been removed.</p> 
                    ``` java
                    <Resource context="(.*)/api/identity/auth/(.*)" secured="true" http-method="all"/>
                    ```
                    <p><b>Why?</b></p>
                    <p>This change has been made in order to remove protection for the <code>/api/identity/auth/v1.2/authenticate</code> API. This is because the API itself authenticates the user.</p>
                    <hr>
                    <p>The following resources have been added under the <code><ResourceAccessControl></code> tag.</p> 
                    ``` java
                    <Resource context="(.*)/api/identity/auth/v1.2/data(.*)" secured="true" http-method="all"/>
                    <Resource context="(.*)/api/identity/auth/v1.2/context(.*)" secured="true" http-method="all"/>
                    <Resource context="(.*)/api/identity/template/mgt/v1.0.0/(.*)" secured="true" http-method="all"/>
                    <Resource context="(.*)/api/identity/user/v1.0/update-username(.*)" secured="true" http-method="PUT">
                        <Permissions>/permission/admin/manage/identity/usermgt/update</Permissions>
                    </Resource>
                    ```                    
                    <p><b>Why?</b></p>
                    <p>These resources have been added to secure the <code>update-username</code> API.</p> 
                    <hr>
                    <p>The following properties have been added under the <code><Server></code> tag.</p>
                    ``` java
                    <!--Intermediate certificate validation for certificate based requests-->
                    <IntermediateCertValidation enable="false">
                        <IntermediateCerts>
                            <!--Add intermediate certificate CN. Multiple <CertCN> elements can be used for multiple certificates.-->
                            <CertCN>localhost</CertCN>
                        </IntermediateCerts>
                        <ExemptContext>
                            <!--Add exemptable context paths. Multiple <Context> elements can be used for multiple contexts.-->
                            <Context>scim2</Context>
                        </ExemptContext>
                    </IntermediateCertValidation>
                    <!--This is the separator that use to separate multiple roles in the role claim value coming from IDP side-->
                    <FederatedIDPRoleClaimValueAttributeSeparator>,</FederatedIDPRoleClaimValueAttributeSeparator>
                    <!--This configuration is used for X509 Certificate based authentication. -->
                    <!--<X509>-->
                    <!--During ssl termination at LB, the X509 certificate is passed over the HTTP header. This configuration
                            provides the facility to configure HTTP request header name which is configured at LB.  -->
                    <!--<X509RequestHeaderName>X-SSL-CERT</X509RequestHeaderName>-->
                    <!--</X509>-->
                    <!-- This configuration specifies the claims that should be logged to "audit.log" upon changes. -->
                    <!--<LoggableUserClaims>-->
                    <!--<LoggableUserClaim>http://wso2.org/claims/identity/accountLocked</LoggableUserClaim>-->
                    <!--<LoggableUserClaim>http://wso2.org/claims/role</LoggableUserClaim>-->
                    <!--</LoggableUserClaims>-->
                    <!--Configuration Store properties-->
                    <ConfigurationStore>
                        <!--Set an upper limit to the database call queries. Configuration store uses dynamic query generation,
                            specially for searching resources. This property will prevent any unwanted errors due to too large queries.
                            Default value is the maximum packet size for MySQL 5.7 in bytes.-->
                        <MaximumQueryLength>4194304</MaximumQueryLength>
                    </ConfigurationStore>
                    ```
                </div>
            </td>
        </tr>
         <tr>
            <td>
                <div class="content-wrapper">
                    <p><code>jaas.conf</code> file in the <code><IS_HOME>/repository/conf/identity</code> directory</p>
                </div>
            </td>
            <td>
                <div class="content-wrapper">
                    <p>The value of the following property value has been corrected from <code>tfalse</code> to <code>false</code>.</p> 
                    ``` java
                    useKeyTab=false
                    ```
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="content-wrapper">
                    <p><code>Webapp-classloading-environments.xml</code> file in the <code><IS_HOME>/repository/conf/</code> directory</p>
                </div>
            </td>
            <td>
                <div class="content-wrapper">
                    <p>The following ExclusiveEnvironment has been added under the <code><Classloading></code> tag.</p>
                    ``` java
                    <ExclusiveEnvironments>
                            <ExclusiveEnvironment>
                                <Name>CXF3</Name>
                                <Classpath>${carbon.home}/lib/runtimes/cxf3/*.jar;${carbon.home}/lib/runtimes/cxf3/</Classpath>
                            </ExclusiveEnvironment>
                        </ExclusiveEnvironments>
                    ```
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="content-wrapper">
                    <p><code>carbon.xml</code> in the <code><IS_HOME>/repository/conf</code> directory</p>
                </div>
            </td>
            <td>
                <div class="content-wrapper">
                    <p>The following properties related to the tenant deletion feature have been added under the <code><Server> <Tenant></code> tag.</p>
                    ``` java
                    <!-- Flag to enable or disable tenant deletion. By default tenant deletion is enabled-->
                    <TenantDelete>true</TenantDelete>
                    <!-- Configurations related to listener invocation by tenant admin service-->
                    <ListenerInvocationPolicy>
                        <!-- Flag to enable or disable listener invocation on tenant delete. This is disabled by default-->
                        <InvokeOnDelete>false</InvokeOnDelete>
                    </ListenerInvocationPolicy>
                    ```
                    <hr>
                    <p>The following property has been added under the <code><Server></code> tag.</p> 
                    ``` java
                    <!--EnablePasswordTrim>false</EnablePasswordTrim--> 
                    ```

                    The following property has been added.

                    ``` java
                    <ForceLocalCache>true</ForceLocalCache>
                    ```
                    <p><b>Why?</b></p>
                    <p>Enabling this property forces all the caches to behave as local caches. It is required to enable this in order to have cache invalidation in between the IS nodes in a clustered enviornment. For more details, see [behavioral change \#5 in the behavioral changes table](#UnderstandingWhatHasChanged-6) given above.</p>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                    <div class="content-wrapper">
                        <p><code>claim-config.xml</code> file in the <code><IS_HOME>/repository/conf</code> directory</p>
                    </div>
            </td>
            <td>            
                    <div class="content-wrapper">
                        <p>The AttributeID of the <code>http://wso2.org/claims/resourceType</code> claim has been modified to "resourceType".</p> 
                        ``` java
                        <AttributeID>resourceType</AttributeID>
                        ```
                        <hr>
                        <p>The RegEx of the <code>http://wso2.org/claims/phoneNumbers</code> claim has been modified as follows.</p>
                        ``` java
                        <RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
                        ```
                        <hr>
                        <p>The RegEx of the <code>urn:scim:schemas:core:1.0:phoneNumbers</code> claim has been modified as follows.</p>   
                        ``` java
                        <RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
                        ```
                        <hr>            
                        <p>The AttributeID of the claim <code>urn:ietf:params:scim:schemas:core:2.0:meta.resourceType</code> claim has been modified to "resourceType" instead of "userType".</p> 
                        ``` java
                        <AttributeID>resourceType</AttributeID>
                        ```
                        <p><b>Why?</p></b>                    
                        <p>The value "Ref" is reserved in open LDAPs for referrals. Therefore, this attributeID was modified to avoid the errors when using Active Directory open LDAPs.</p>
                        <hr>
                        <p>The RegEx of the <code>urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers</code> claim has been modified as follows.</p> 
                        ``` java
                        <RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
                        ```
                        <hr>
                        <p>The Regex of the <code>urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers.mobile</code> claim has been modified as follows.</p>
                        ``` java
                        <RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
                        ```
                        <hr>
                        <p>The RegEx of the <code>urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers.home</code> claim has been modified as follows.</p>
                        ``` java
                        <RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>  
                        ```
                        <hr>
                        <p>The RegEx of the <code>urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers.work</code> claim has been modified as follows.</p>
                        ``` java
                        <RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
                        ```
                        <hr>
                        <p>The RegEx of the <code>urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers.other</code> claim has been modified as follows.</p>
                        ``` java
                        <RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
                        ```
                        <p><b>Why?</b></p>
                        <p>The default regular expression values for phone numbers were modified in the claim-config.xml file in order to recognize US and Canadian numbers with the extension code as well.</p>
                    </div>
                </td>
        </tr>
        <tr>
            <td>
                <div class="content-wrapper">
                    <p><code>log4j.properties</code> file stored in the <code><IS_HOME>/repository/conf</code> directory</p>
                </div>
            </td> 
            <td>
                <div class="content-wrapper">
                    <p>The following properties have been added.</p>
                    ``` java
                    log4j.logger.TRANSACTION_LOGGER=INFO, TRANSACTION_LOGGER

                    log4j.appender.TRANSACTION_LOGGER=org.apache.log4j.FileAppender
                    log4j.appender.TRANSACTION_LOGGER.File=${carbon.home}/repository/logs/transaction.log
                    log4j.appender.TRANSACTION_LOGGER.Append=true
                    log4j.appender.TRANSACTION_LOGGER.layout=org.apache.log4j.PatternLayout
                    log4j.appender.TRANSACTION_LOGGER.layout.ConversionPattern=[%d] - %m %n
                    log4j.appender.TRANSACTION_LOGGER.threshold=INFO
                    log4j.additivity.TRANSACTION_LOGGER=false


                    # Appender config to put correlation Log.
                    log4j.logger.correlation=INFO, CORRELATION
                    log4j.additivity.correlation=false
                    log4j.appender.CORRELATION=org.apache.log4j.RollingFileAppender
                    log4j.appender.CORRELATION.File=${carbon.home}/repository/logs/${instance.log}/correlation.log
                    log4j.appender.CORRELATION.MaxFileSize=10MB
                    log4j.appender.CORRELATION.layout=org.apache.log4j.PatternLayout
                    log4j.appender.CORRELATION.Threshold=INFO
                    log4j.appender.CORRELATION.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss,SSS}|%X{Correlation-ID}|%t|%m%n
                    ```
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="content-wrapper">
                    <p><code>user-mgt.xml</code> file stored in the <code><IS_HOME>/repository/conf</code> directory</p>
                </div>
            </td>
            <td>
                <div class="content-wrapper">
                    <p>The following properties have been added under the <code><UserManager> <Realm> <Configuration></code> tag.</p>
                    ``` java
                    <!-- Enable username claim retrieve from the UM_USER_NAME in JDBC datasources -->
                    <OverrideUsernameClaimFromInternalUsername>true</OverrideUsernameClaimFromInternalUsername
                    ```
                    <hr> 
                    <p>The following property has been under under the <code>JDBCUserStoreManager</code> configuration block.</p> 
                    ``` java
                    <Property name="LeadingOrTrailingSpaceAllowedInUserName">false</Property>
                    ```
                    <hr> 
                    <p>The value of the <code><UserNameListFilter></code> property under the <code>ReadOnlyLDAPUserStoreManager</code> configuration block has been modified to the value given below.</p> 
                    ``` java
                    (&amp;(objectClass=person)(!(sn=Service)))
                    ```
                    <hr>
                    <p>The value of the <code><UserNameListFilter></code> property under the <code>ActiveDirectoryUserStoreManager</code> and <code>ReadWriteLDAPUserStoreManager</code> configuration blocks has been modified as follows.</p> 
                    ``` java
                    (&amp;(objectClass=user)(!(sn=Service)))
                    ```
                    <hr>
                    <p>The following property has been added under the <code>ActiveDirectoryUserStoreManager</code> and the <code>ReadWriteLDAPUserStoreManager</code> configuration blocks.</p> 
                    ``` java
                    <Property name="StartTLSEnabled">false</Property>
                    ```
                </div>
            </td>
        </tr>
    </tbody>
</table>
