# Using the Service Provider API

This section guides you through using the Identity Application
Management API to create a service provider, update it, delete it, and
the different operations you can use to work with it.  The following
operations are available:

-   [createApplication](#UsingtheServiceProviderAPI-createApplication)
-   [updateApplication](#UsingtheServiceProviderAPI-updateApplication)
-   [deleteApplication](#UsingtheServiceProviderAPI-deleteApplication)
-   [getAllApplicationBasicInfo](#UsingtheServiceProviderAPI-getAllApplicationBasicInfo)
-   [getAllIdentityProviders](#UsingtheServiceProviderAPI-getAllIdentityProviders)
-   [getAllLocalAuthenticators](#UsingtheServiceProviderAPI-getAllLocalAuthenticators)
-   [getAllLocalClaimUris](#UsingtheServiceProviderAPI-getAllLocalClaimUris)
-   [getAllRequestPathAuthenticators](#UsingtheServiceProviderAPI-getAllRequestPathAuthenticators)
-   [getApplication](#UsingtheServiceProviderAPI-getApplication)
-   [getIdentityProvider](#UsingtheServiceProviderAPI-getIdentityProvider)

The service contract of this admin service can be found at
https://\<IS\_HOST\>:\<IS\_PORT\>/services/IdentityApplicationManagementService?wsdl.
Replace the tag \<IS\_HOST\>:\<IS\_PORT\> with the relevant host and
port number, for example:
<https://localhost:9443/services/IdentityApplicationManagementService?wsdl>
.

!!! tip
    
    Before you begin
    
    Follow the instructions given in the [Calling Admin
    Services](https://docs.wso2.com/display/IS530/Calling+Admin+Services)
    topic to enable the admin service.
    

### createApplication

Permission Level: `         /permission/admin/manage        `

Creating an application via Identity Application Management Service is a
two-step process.

1.  Create a service provider for the given application name and the
    description using the `           createApplication          `
    operation. It returns a `           200 OK          ` response.  

    The service provider's application ID is required to use the
    `            updateApplication           ` operation. You can
    include an application ID for the new service provider within the
    same SOAP request when calling the
    `            createApplication           ` operation . If you do not
    include an application ID in the request, you can retrieve the
    auto-generated application ID value by calling the
    `            getApplication           ` service method with the
    application name.

2.  Update the service provider with other configurations using the
    `          updateApplication         ` operation. The service
    provider's application ID is required for this request.

**Input parameters**

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
<td>applicationID</td>
<td>Integer</td>
<td>Unique application ID for the service provider. This is an optional parameter, if you have not included this value in the SOAP request, WSO2 IS assigns a unique application ID.</td>
</tr>
<tr class="even">
<td>applicationName</td>
<td>String</td>
<td><div class="content-wrapper">
<p>The desired service provider name.</p>
!!! note
    <p>Adding a service provider creates an internal application role for the given application name in the following format: Internal/&lt;applicationName&gt;.<br />
    Therefore, creating another service provider for the same application name is not possible and will throw an <code>               IdentityApplicationManagementException              </code> .</p>
</div></td>
</tr>
<tr class="odd">
<td>description</td>
<td>String</td>
<td>A brief text description of the service provider.</td>
</tr>
</tbody>
</table>

**  
Request:**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://model.common.application.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:createApplication>
         <!--Optional:-->
         <xsd:serviceProvider>
            <!--Optional:-->
            <xsd1:applicationName>?</xsd1:applicationName>
            <!--Optional:-->
            <xsd1:description>?</xsd1:description>
         </xsd:serviceProvider>
      </xsd:createApplication>
   </soapenv:Body>
</soapenv:Envelope>
```

![](images/icons/grey_arrow_down.png){.expand-control-image} Sample
Request...

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://model.common.application.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:createApplication>
         <!--Optional:-->
         <xsd:serviceProvider>
            <!--Optional:-->
            <xsd1:applicationName>travelocity.com</xsd1:applicationName>
            <!--Optional:-->
            <xsd1:description>sample service provider</xsd1:description>
         </xsd:serviceProvider>
      </xsd:createApplication>
   </soapenv:Body>
</soapenv:Envelope>
```

****Request with application ID:**  
**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://model.common.application.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:createApplication>
         <!--Optional:-->
         <xsd:serviceProvider>
            <!--Optional:-->
            <xsd1:applicationID>?</xsd1:applicationID>
            <!--Optional:-->
            <xsd1:applicationName>?</xsd1:applicationName>
            <!--Optional:-->
            <xsd1:description>?</xsd1:description>
         </xsd:serviceProvider>
      </xsd:createApplication>
   </soapenv:Body>
</soapenv:Envelope>
```

![](images/icons/grey_arrow_down.png){.expand-control-image} Sample
Request...

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://model.common.application.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:createApplication>
         <!--Optional:-->
         <xsd:serviceProvider>
            <!--Optional:-->
            <xsd1:applicationID>2</xsd1:applicationID>
            <!--Optional:-->
            <xsd1:applicationName>travelocity.com</xsd1:applicationName>
            <!--Optional:-->
            <xsd1:description>sample service provider</xsd1:description>
         </xsd:serviceProvider>
      </xsd:createApplication>
   </soapenv:Body>
</soapenv:Envelope>
```

**Response:**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <ns:createApplicationResponse xmlns:ns="http://org.apache.axis2/xsd">
         <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
      </ns:createApplicationResponse>
   </soapenv:Body>
</soapenv:Envelope>
```

### updateApplication

Permission Level: `          /permission/admin/manage         `

After creating the service provider, it can be configured and updated
with the following configurations:

-   Claim configuration
-   Role/Permission configuration
-   Inbound and Outbound authentication configuration
-   Inbound and Outbound provisioning configuration

-   **Get application ID** - The service provider is updated based on
    its application ID. If you have not provided an application ID when
    creating the service provider, you can use the
    [getApplication](#UsingtheServiceProviderAPI-getApplication)
    operation to retrieve the application ID value from WSO2 IS.

      

-   **Get certificate reference ID** - The certificate of the service
    provider is updated based on its certificate reference ID. Use the
    [getApplication](#UsingtheServiceProviderAPI-getApplication)
    operation to retrieve the certificate reference ID value from WSO2
    IS and include it in the
    `             updateApplication            ` SOAP request to update
    the same certificate. The code block below shows the certificate
    reference ID value included in the
    `             getApplication            ` response.

    ``` java
        <ax2140:spProperties xsi:type="ax2140:ServiceProviderProperty">
            <ax2140:displayName>CERTIFICATE</ax2140:displayName>
            <ax2140:name>CERTIFICATE</ax2140:name>
            <ax2140:value>2</ax2140:value>
        </ax2140:spProperties>
    ```

    To update the same certificate, include the certificate reference ID
    you retrieved in the `             updateApplication            `
    SOAP request as follows.

    ``` java
        <xsd1:spProperties>
            <!--Optional:-->
            <xsd1:displayName>CERTIFICATE</xsd1:displayName>
            <!--Optional:-->
            <xsd1:name>CERTIFICATE</xsd1:name>
            <!--Optional:-->
            <xsd1:value>2</xsd1:value>
        </xsd1:spProperties>
    ```

The format of the update request should be as follows.

**Request:**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://model.common.application.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:updateApplication>
         <!--Optional:-->
         <xsd:serviceProvider>
            <!--Optional:-->
            <xsd1:applicationID>?</xsd1:applicationID>
            <!--Optional:-->
            <xsd1:applicationName>?</xsd1:applicationName>
            <!--Optional:-->
            <xsd1:certificateContent>?</xsd1:certificateContent>
            <!--Optional:-->
            <xsd1:claimConfig>
            </xsd1:claimConfig>
            <!--Optional:-->
            <xsd1:description>?</xsd1:description>
            <!--Optional:-->
            <xsd1:inboundAuthenticationConfig>...</xsd1:inboundAuthenticationConfig>
            <!--Optional:-->
            <xsd1:inboundProvisioningConfig>...</xsd1:inboundProvisioningConfig>
            <!--Optional:-->
            <xsd1:localAndOutBoundAuthenticationConfig>...</xsd1:localAndOutBoundAuthenticationConfig>
            <!--Optional:-->
            <xsd1:outboundProvisioningConfig>...</xsd1:outboundProvisioningConfig>
            <!--Optional:-->
            <xsd1:owner>...</xsd1:owner>
            <!--Optional:-->
            <xsd1:permissionAndRoleConfig>...</xsd1:permissionAndRoleConfig>
            <!--Zero or more repetitions:-->
            <xsd1:requestPathAuthenticatorConfigs>...</xsd1:requestPathAuthenticatorConfigs>
            <!--Optional:-->
            <xsd1:saasApp>?</xsd1:saasApp>
            <xsd1:spProperties>
            <!--Optional:-->
            <xsd1:displayName>CERTIFICATE</xsd1:displayName>
            <!--Optional:-->
            <xsd1:name>CERTIFICATE</xsd1:name>
            <!--Optional:-->
            <xsd1:value>2</xsd1:value>
            </xsd1:spProperties>
         </xsd:serviceProvider>
      </xsd:updateApplication>
   </soapenv:Body>
</soapenv:Envelope>
```

![](images/icons/grey_arrow_down.png){.expand-control-image} Sample
Request...

For SAML

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://model.common.application.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:updateApplication>
         <!--Optional:-->
         <xsd:serviceProvider>
            <!--Optional:-->
            <xsd1:applicationID>2</xsd1:applicationID>
            <!--Optional:-->
            <xsd1:applicationName>travelocity.com</xsd1:applicationName>
            <!--Optional:-->
            <xsd1:claimConfig>
               <!--Optional:-->
               <xsd1:alwaysSendMappedLocalSubjectId>false</xsd1:alwaysSendMappedLocalSubjectId>
               <!--Optional:-->
               <xsd1:localClaimDialect>true</xsd1:localClaimDialect>
            </xsd1:claimConfig>
            <!--Optional:-->
            <xsd1:description>sample service provider</xsd1:description>
            <!--Optional:-->
            <xsd1:inboundAuthenticationConfig></xsd1:inboundAuthenticationConfig>
            <!--Optional:-->
            <xsd1:inboundProvisioningConfig>
               <!--Optional:-->
               <xsd1:provisioningEnabled>false</xsd1:provisioningEnabled>
               <!--Optional:-->
               <xsd1:provisioningUserStore>PRIMARY</xsd1:provisioningUserStore>
            </xsd1:inboundProvisioningConfig>
            <!--Optional:-->
            <xsd1:localAndOutBoundAuthenticationConfig>
               <!--Optional:-->
               <xsd1:alwaysSendBackAuthenticatedListOfIdPs>false</xsd1:alwaysSendBackAuthenticatedListOfIdPs>
               <!--Optional:-->
               <xsd1:authenticationStepForAttributes></xsd1:authenticationStepForAttributes>
               <!--Optional:-->
               <xsd1:authenticationStepForSubject></xsd1:authenticationStepForSubject>
               <xsd1:authenticationType>default</xsd1:authenticationType>
               <!--Optional:-->
               <xsd1:subjectClaimUri>http://wso2.org/claims/fullname</xsd1:subjectClaimUri>
            </xsd1:localAndOutBoundAuthenticationConfig>
            <!--Optional:-->
            <xsd1:outboundProvisioningConfig>
               <!--Zero or more repetitions:-->
               <xsd1:provisionByRoleList></xsd1:provisionByRoleList>
            </xsd1:outboundProvisioningConfig>
            <!--Optional:-->
            <xsd1:permissionAndRoleConfig></xsd1:permissionAndRoleConfig>
            <!--Optional:-->
            <xsd1:saasApp>false</xsd1:saasApp>
         </xsd:serviceProvider>
      </xsd:updateApplication>
   </soapenv:Body>
</soapenv:Envelope>
```

For OAuth

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://model.common.application.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:updateApplication>
         <!--Optional:-->
         <xsd:serviceProvider>
            <!--Optional:-->
            <xsd1:applicationID>5</xsd1:applicationID>
            <!--Optional:-->
            <xsd1:applicationName>SampleApplication</xsd1:applicationName>
            <!--Optional:-->
            <xsd1:claimConfig>
               <!--Optional:-->
               <xsd1:alwaysSendMappedLocalSubjectId>false</xsd1:alwaysSendMappedLocalSubjectId>
               <!--Optional:-->
               <xsd1:localClaimDialect>true</xsd1:localClaimDialect>
            </xsd1:claimConfig>
            <!--Optional:-->
            <xsd1:description>oauth application</xsd1:description>
            <!--Optional:-->
            <xsd1:inboundAuthenticationConfig>
               <!--Zero or more repetitions:-->
               <xsd1:inboundAuthenticationRequestConfigs>
                  <!--Optional:-->
                  <xsd1:inboundAuthKey>CLIENT_ID</xsd1:inboundAuthKey>
                  <!--Optional:-->
                  <xsd1:inboundAuthType>oauth2</xsd1:inboundAuthType>
                  <!--Zero or more repetitions:-->
                  <xsd1:properties>
                     <!--Optional:-->
                     <xsd1:advanced>false</xsd1:advanced>
                     <!--Optional:-->
                     <xsd1:confidential>false</xsd1:confidential>
                     <!--Optional:-->
                     <xsd1:defaultValue></xsd1:defaultValue>
                     <!--Optional:-->
                     <xsd1:description></xsd1:description>
                     <!--Optional:-->
                     <xsd1:displayName></xsd1:displayName>
                     <!--Optional:-->
                     <xsd1:name>oauthConsumerSecret</xsd1:name>
                     <!--Optional:-->
                     <xsd1:required>false</xsd1:required>
                     <!--Optional:-->
                     <xsd1:type></xsd1:type>
                     <!--Optional:-->
                     <xsd1:value>CLIENT_SECRET</xsd1:value>
                  </xsd1:properties>
               </xsd1:inboundAuthenticationRequestConfigs>
            </xsd1:inboundAuthenticationConfig>
            <!--Optional:-->
            <xsd1:inboundProvisioningConfig>
               <!--Optional:-->
               <xsd1:provisioningEnabled>false</xsd1:provisioningEnabled>
               <!--Optional:-->
               <xsd1:provisioningUserStore>PRIMARY</xsd1:provisioningUserStore>
            </xsd1:inboundProvisioningConfig>
            <!--Optional:-->
            <xsd1:localAndOutBoundAuthenticationConfig>
               <!--Optional:-->
               <xsd1:alwaysSendBackAuthenticatedListOfIdPs>false</xsd1:alwaysSendBackAuthenticatedListOfIdPs>
               <!--Optional:-->
               <xsd1:authenticationStepForAttributes></xsd1:authenticationStepForAttributes>
               <!--Optional:-->
               <xsd1:authenticationStepForSubject></xsd1:authenticationStepForSubject>
               <xsd1:authenticationType>default</xsd1:authenticationType>
               <!--Optional:-->
               <xsd1:subjectClaimUri>http://wso2.org/claims/fullname</xsd1:subjectClaimUri>
            </xsd1:localAndOutBoundAuthenticationConfig>
            <!--Optional:-->
            <xsd1:outboundProvisioningConfig>
               <!--Zero or more repetitions:-->
               <xsd1:provisionByRoleList></xsd1:provisionByRoleList>
            </xsd1:outboundProvisioningConfig>
            <!--Optional:-->
            <xsd1:permissionAndRoleConfig></xsd1:permissionAndRoleConfig>
            <!--Optional:-->
            <xsd1:saasApp>false</xsd1:saasApp>
         </xsd:serviceProvider>
      </xsd:updateApplication>
   </soapenv:Body>
</soapenv:Envelope>
```

**  
Response:**

``` java
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <ns:updateApplicationResponse xmlns:ns="http://org.apache.axis2/xsd">
         <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
      </ns:updateApplicationResponse>
   </soapenv:Body>
</soapenv:Envelope>
```

**Input parameters**

Service provider level parameters

  

<table>
<thead>
<tr class="header">
<th><p>Parameter</p></th>
<th><p>Type</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>applicationID</p></td>
<td><p>Integer</p></td>
<td><p>Application ID of the service provider. This is mandatory when updating the SP.</p></td>
</tr>
<tr class="even">
<td><p>applicationName</p></td>
<td><p>String</p></td>
<td><p>Service provider name</p></td>
</tr>
<tr class="odd">
<td><p>claimConfig</p></td>
<td><p>ClaimConfig</p></td>
<td><p>Claims related configurations</p></td>
</tr>
<tr class="even">
<td><p>description</p></td>
<td><p>String</p></td>
<td><p>Description of the SP</p></td>
</tr>
<tr class="odd">
<td><p>inboundAuthenticationConfig</p></td>
<td><p>InboundAuthenticationConfig</p></td>
<td><p><a href="https://docs.wso2.com/display/IS550/Configuring+Inbound+Authentication+for+a+Service+Provider">Inbound authentication</a> related configurations</p></td>
</tr>
<tr class="even">
<td><p>inboundProvisioningConfig</p></td>
<td><p>InboundProvisioningConfig</p></td>
<td><p>Inbound provisioning related configurations</p></td>
</tr>
<tr class="odd">
<td><p>localAndOutBoundAuthenticationConfig</p></td>
<td><p>LocalAndOutboundAuthenticationConfig</p></td>
<td><p>Local and outbound authentication</p></td>
</tr>
<tr class="even">
<td><p>outboundProvisioningConfig</p></td>
<td><p>OutboundProvisioningConfig</p></td>
<td>Outbound provisioning related configurations</td>
</tr>
<tr class="odd">
<td><p>owner</p></td>
<td><p>User</p></td>
<td><p>Applicationn owner</p></td>
</tr>
<tr class="even">
<td><p>permissionAndRoleConfig</p></td>
<td><p>PermissionsAndRoleConfig</p></td>
<td>Permission and role related configurations</td>
</tr>
<tr class="odd">
<td><p>requestPathAuthenticatorConfigs</p></td>
<td><p>RequestPathAuthenticatorConfig</p></td>
<td>Request patch authenticator related configurations</td>
</tr>
<tr class="even">
<td>saasApp</td>
<td>Optional</td>
<td><p>This parameter allows you to determine whether the service provider is a SaaS application.</p>
<p>true - enable SaaS application</p>
<p>false - disable SaaS application</p>
<br />

<p>If no value is passed for this parameter, the service provider is marked as SaaS disabled by default. Thus, t he web application is not shared among tenants so only users in the current tenant (the one you are logged in when creating the service provider) are allowed to log into the web application. Alternatively, if you enabled SaaS application, that means this web application is shared among tenants so users from any tenant are allowed to log into the web application.</p></td>
</tr>
</tbody>
</table>

#### Claim configuration level parameters

The `          <claimConfig>         ` element  defines all claim
configuration level inputs. This element can have zero or more
`          <claimMappings>         ` elements that specify claims
referred by this service provider. A
`          <claimMappings>         ` element includes two elements;
`          <localClaim>         ` and `          <remoteClaim>         `
where each is represented by a claimId and a claimURI.  The
`          <localClaim>         ` denotes a standard claim which is
local to the WSO2 Identity Server and the
`          <remoteClaim>         ` denotes some remote claim value that
maps to the local claim under the same [claim
mapping](https://docs.wso2.com/display/IS550/Claim+Management). Remote
claims are specifically used with identity federation scenarios to map
claims received from the federated Identity Provider to local claims.

  

<table>
<thead>
<tr class="header">
<th><p>Parameter</p></th>
<th><p>Type</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>alwaysSendMappedLocalSubjectId</p></td>
<td><p>Boolean</p></td>
<td>This configuration specifies whether the subject attribute that returns to the service provider is taken from the locally mapped user or from the federated user.</td>
</tr>
<tr class="even">
<td><p>localClaimDialect</p></td>
<td><p>Boolean</p></td>
<td><p>This is a boolean that specifies whether this service provider is using the local claim dialect or a custom claim dialect.</p>
<p>true - using the local claim dialect</p>
<p>false - using the custom claim dialect</p>
<br />

<p>If it is using the custom claim dialect, the local claim should map with a remote claim in each <a href="https://docs.wso2.com/display/IS550/Claim+Management">claim mapping</a> otherwise, both the local claim URI and the remote claim URI should be the same (i.e. a URI defined under a dialect local to the WSO2 Identity Server).</p></td>
</tr>
<tr class="odd">
<td><p>claimMappings.localClaim.claimId</p>
<p>claimMappings.remoteClaim.claimId</p></td>
<td><p>Integer</p></td>
<td><p>Integer value that identifies the claim. Applies to both <code>                 localClaim                </code> and <code>                 remoteClaim                </code> elements.</p></td>
</tr>
<tr class="even">
<td><p>claimMappings.localClaim.claimUri</p>
<p>claimMappings.remoteClaim.claimUri</p></td>
<td><p>String</p></td>
<td><p>URI specific to the claim. It applies to both <code>                 localClaim                </code> and <code>                 remoteClaim                </code> elements. When defined under <code>                 localClaim                </code>, this is a URI defined under the dialect specific to the claim. If defined under the <code>                 remoteClaim                </code>, this is a remote claim URI which maps with the local claim defined under the same parent claimMappings element. If only the local claim dialect is used, the same claimURI in localClaim should be used with claimURI in <code>                 remoteClaim                </code>, since there are no explicit local to remote claim mappings.</p></td>
</tr>
<tr class="odd">
<td><p>claimMappings.requested</p></td>
<td><p>Boolean</p></td>
<td><p>This is a boolean that marks a mapped claim as a requested claim which ensures that the service provider definitely sends this claim to the Identity Server.</p>
<p>true - mark as requested</p>
<p>false - mark as not requested</p></td>
</tr>
<tr class="even">
<td><p>roleClaimURI</p></td>
<td><p>String</p></td>
<td><p>Role claim URI is used to identify the claim that equates to the role of the user. This is linked to the permissions that you can apply for specific user roles. This is a remote claim URI mapped via claim mappings.</p></td>
</tr>
<tr class="odd">
<td><p>userClaimURI</p></td>
<td><p>String</p></td>
<td><p>User claim URI is also referred to as Subject claim URI in the management console. It is the claim that is used to uniquely identiy a user. For example, mapping the claims to the users email or ID attribute.</p></td>
</tr>
</tbody>
</table>

**claimConfig Request Element:**

``` xml
<xsd1:claimConfig>
    <!--Optional:-->
    <xsd1:alwaysSendMappedLocalSubjectId>?</xsd1:alwaysSendMappedLocalSubjectId>
    <!--Zero or more repetitions:-->
    <xsd1:claimMappings>
        <!--Optional:-->
        <xsd1:defaultValue>?</xsd1:defaultValue>
        <!--Optional:-->
        <xsd1:localClaim>
            <!--Optional:-->
            <xsd1:claimId>?</xsd1:claimId>
            <!--Optional:-->
            <xsd1:claimUri>?</xsd1:claimUri>
        </xsd1:localClaim>
        <!--Optional:-->
        <xsd1:mandatory>?</xsd1:mandatory>
        <!--Optional:-->
        <xsd1:remoteClaim>
            <!--Optional:-->
            <xsd1:claimId>?</xsd1:claimId>
            <!--Optional:-->
            <xsd1:claimUri>?</xsd1:claimUri>
        </xsd1:remoteClaim>
        <!--Optional:-->
        <xsd1:requested>?</xsd1:requested>
    </xsd1:claimMappings>
    <!--Zero or more repetitions:-->
    <xsd1:idpClaims>
        <!--Optional:-->
        <xsd1:claimId>?</xsd1:claimId>
        <!--Optional:-->
        <xsd1:claimUri>?</xsd1:claimUri>
    </xsd1:idpClaims>
    <!--Optional:-->
    <xsd1:localClaimDialect>?</xsd1:localClaimDialect>
    <!--Optional:-->
    <xsd1:roleClaimURI>?</xsd1:roleClaimURI>
    <!--Optional:-->
    <xsd1:userClaimURI>?</xsd1:userClaimURI>
</xsd1:claimConfig>
```

![](images/icons/grey_arrow_down.png){.expand-control-image} Sample
Request...

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://model.common.application.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:updateApplication>
         <!--Optional:-->
         <xsd:serviceProvider>
            <!--Optional:-->
            <xsd1:applicationID>2</xsd1:applicationID>
            <!--Optional:-->
            <xsd1:applicationName>travelocity.com</xsd1:applicationName>
            <!--Optional:-->
            <xsd1:claimConfig>
               <!--Optional:-->
               <xsd1:alwaysSendMappedLocalSubjectId>false</xsd1:alwaysSendMappedLocalSubjectId>
               <!--Zero or more repetitions:-->
               <xsd1:claimMappings>
                  <!--Optional:-->
                  <xsd1:localClaim>
                     <!--Optional:-->
                     <xsd1:claimUri>http://wso2.org/claims/givenname</xsd1:claimUri>
                  </xsd1:localClaim>
                  <!--Optional:-->
                  <xsd1:mandatory>true</xsd1:mandatory>
                  <!--Optional:-->
                  <xsd1:remoteClaim>
                     <!--Optional:-->
                     <xsd1:claimUri>name</xsd1:claimUri>
                  </xsd1:remoteClaim>
                  <!--Optional:-->
                  <xsd1:requested>true</xsd1:requested>
               </xsd1:claimMappings>
               <xsd1:claimMappings>
                  <!--Optional:-->
                  <xsd1:localClaim>
                     <!--Optional:-->
                     <xsd1:claimUri>http://wso2.org/claims/role</xsd1:claimUri>
                  </xsd1:localClaim>
                  <!--Optional:-->
                  <xsd1:mandatory>true</xsd1:mandatory>
                  <!--Optional:-->
                  <xsd1:remoteClaim>
                     <!--Optional:-->
                     <xsd1:claimUri>role</xsd1:claimUri>
                  </xsd1:remoteClaim>
                  <!--Optional:-->
                  <xsd1:requested>true</xsd1:requested>
               </xsd1:claimMappings>
               <!--Optional:-->
               <xsd1:localClaimDialect>false</xsd1:localClaimDialect>
               <!--Optional:-->
               <xsd1:roleClaimURI>role</xsd1:roleClaimURI>
               <!--Optional:-->
               <xsd1:userClaimURI>user</xsd1:userClaimURI>
            </xsd1:claimConfig>
            <!--Optional:-->
            <xsd1:description>sample service provider</xsd1:description>
            <!--Optional:-->
            <xsd1:inboundAuthenticationConfig></xsd1:inboundAuthenticationConfig>
            <!--Optional:-->
            <xsd1:inboundProvisioningConfig>
               <!--Optional:-->
               <xsd1:provisioningEnabled>false</xsd1:provisioningEnabled>
               <!--Optional:-->
               <xsd1:provisioningUserStore>PRIMARY</xsd1:provisioningUserStore>
            </xsd1:inboundProvisioningConfig>
            <!--Optional:-->
            <xsd1:localAndOutBoundAuthenticationConfig>
               <!--Optional:-->
               <xsd1:alwaysSendBackAuthenticatedListOfIdPs>false</xsd1:alwaysSendBackAuthenticatedListOfIdPs>
               <!--Optional:-->
               <xsd1:authenticationStepForAttributes></xsd1:authenticationStepForAttributes>
               <!--Optional:-->
               <xsd1:authenticationStepForSubject></xsd1:authenticationStepForSubject>
               <xsd1:authenticationType>default</xsd1:authenticationType>
               <!--Optional:-->
               <xsd1:subjectClaimUri>name</xsd1:subjectClaimUri>
            </xsd1:localAndOutBoundAuthenticationConfig>
            <!--Optional:-->
            <xsd1:outboundProvisioningConfig>
               <!--Zero or more repetitions:-->
               <xsd1:provisionByRoleList></xsd1:provisionByRoleList>
            </xsd1:outboundProvisioningConfig>
            <!--Optional:-->
            <xsd1:permissionAndRoleConfig></xsd1:permissionAndRoleConfig>
            <!--Optional:-->
            <xsd1:saasApp>false</xsd1:saasApp>
         </xsd:serviceProvider>
      </xsd:updateApplication>
   </soapenv:Body>
</soapenv:Envelope>
```

#### Permissions and roles configuration parameters

The `          <permissionAndRoleConfig>         ` element defines all
permission and role configuration level inputs. Under this element,
specific permissions can be specified via zero or more
`          <permissions>         ` blocks.

  

| Parameter         | Type   | Description                                                                                                                                                                                                                                    |
|-------------------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| permissions.value | String | A string value that defines a service provider specific permission. This permission is added under `               /permission/applications/<service-provider-name>/<given-permission-name>              ` and is available when adding roles. |

Once the permissions are specified, the roles specific to the service
provider can be mapped to local roles defined in the Identity Server via
zero or more `           <roleMappings>          ` blocks. A
`           <roleMappings>          ` block includes a
`           <localRole>          ` element and a
`           <remoteRole>          ` element. The
`           <localRole>          ` represents a local role defined in
the identity server and the `           <remoteRole>          `
represents the service provider specific role that you want to map to
the local role.

  

<table>
<thead>
<tr class="header">
<th><p>Parameter</p></th>
<th><p>Type</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>localRole.localRoleName</p></td>
<td><p>String</p></td>
<td><p>This is the name of the local role which is defined in Identity Server.</p></td>
</tr>
<tr class="even">
<td><p>localRole.userStoreId</p></td>
<td><p>String</p></td>
<td><p>This is the key of the userstore used by Identity Server.<br />
</p></td>
</tr>
<tr class="odd">
<td><p>remoteRole</p></td>
<td><p>String</p></td>
<td><p>Role specific to the service provider</p></td>
</tr>
</tbody>
</table>

  

**permissionAndRoleConfig Request Element:**

``` xml
<xsd1:permissionAndRoleConfig>
    <!--Zero or more repetitions:-->
    <xsd1:idpRoles>?</xsd1:idpRoles>
    <!--Zero or more repetitions:-->
    <xsd1:permissions>
        <!--Optional:-->
        <xsd1:value>?</xsd1:value>
    </xsd1:permissions>
    <!--Zero or more repetitions:-->
    <xsd1:roleMappings>
        <!--Optional:-->
        <xsd1:localRole>
            <!--Optional:-->
            <xsd1:localRoleName>?</xsd1:localRoleName>
            <!--Optional:-->
            <xsd1:userStoreId>?</xsd1:userStoreId>
        </xsd1:localRole>
        <!--Optional:-->
        <xsd1:remoteRole>?</xsd1:remoteRole>
    </xsd1:roleMappings>
</xsd1:permissionAndRoleConfig>
```

![](images/icons/grey_arrow_down.png){.expand-control-image} Sample
Request...

``` xml
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsd="http://org.apache.axis2/xsd"
    xmlns:xsd1="http://model.common.application.identity.carbon.wso2.org/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:updateApplication>
            <!--Optional:-->
            <xsd:serviceProvider>
                <!--Optional:-->
                <xsd1:applicationID>2</xsd1:applicationID>
                <!--Optional:-->
                <xsd1:applicationName>travelocity.com</xsd1:applicationName>
                <!--Optional:-->
                <xsd1:claimConfig>
                    <!--Optional:-->
                    <xsd1:alwaysSendMappedLocalSubjectId>false</xsd1:alwaysSendMappedLocalSubjectId>
                    <!--Optional:-->
                    <xsd1:localClaimDialect>true</xsd1:localClaimDialect>
                </xsd1:claimConfig>
                <!--Optional:-->
                <xsd1:description>sample service provider</xsd1:description>
                <!--Optional:-->
                <xsd1:inboundAuthenticationConfig></xsd1:inboundAuthenticationConfig>
                <!--Optional:-->
                <xsd1:inboundProvisioningConfig>
                    <!--Optional:-->
                    <xsd1:provisioningEnabled>false</xsd1:provisioningEnabled>
                    <!--Optional:-->
                    <xsd1:provisioningUserStore>PRIMARY</xsd1:provisioningUserStore>
                </xsd1:inboundProvisioningConfig>
                <!--Optional:-->
                <xsd1:localAndOutBoundAuthenticationConfig>
                    <!--Optional:-->
                    <xsd1:alwaysSendBackAuthenticatedListOfIdPs>false</xsd1:alwaysSendBackAuthenticatedListOfIdPs>
                    <!--Optional:-->
                    <xsd1:authenticationStepForAttributes></xsd1:authenticationStepForAttributes>
                    <!--Optional:-->
                    <xsd1:authenticationStepForSubject></xsd1:authenticationStepForSubject>
                    <xsd1:authenticationType>default</xsd1:authenticationType>
                    <!--Optional:-->
                    <xsd1:subjectClaimUri>http://wso2.org/claims/fullname</xsd1:subjectClaimUri>
                </xsd1:localAndOutBoundAuthenticationConfig>
                <!--Optional:-->
                <xsd1:outboundProvisioningConfig>
                    <!--Zero or more repetitions:-->
                    <xsd1:provisionByRoleList></xsd1:provisionByRoleList>
                </xsd1:outboundProvisioningConfig>
                <!--Optional:-->
                <xsd1:permissionAndRoleConfig>
                    <!--Zero or more repetitions:-->
                    <xsd1:permissions>
                        <!--Optional:-->
                        <xsd1:value>/sample/permission</xsd1:value>
                    </xsd1:permissions>
                    <!--Zero or more repetitions:-->
                    <xsd1:roleMappings>
                        <!--Optional:-->
                        <xsd1:localRole>
                            <!--Optional:-->
                            <xsd1:localRoleName>tester</xsd1:localRoleName>
                        </xsd1:localRole>
                        <!--Optional:-->
                        <xsd1:remoteRole>app-tester</xsd1:remoteRole>
                    </xsd1:roleMappings>
                </xsd1:permissionAndRoleConfig>
                <!--Optional:-->
                <xsd1:saasApp>false</xsd1:saasApp>
            </xsd:serviceProvider>
        </xsd:updateApplication>
    </soapenv:Body>
</soapenv:Envelope>
```

#### Inbound authentication

[Inbound
Authentication](https://docs.wso2.com/display/IS550/Configuring+Inbound+Authentication+for+a+Service+Provider)
Configuration defines the protocol that the service provider and the
Identity Server uses to communicate. You can add a common set of
configurations for the service provider for any protocol such as SAML
2.0, OpenID Connect, OAuth 2.0, and WS-Federation (passive) that
is supported by WSO2 Identity Server.

The `          <inboundAuthenticationConfig>         ` element consists
zero or more \<inboundAuthenticationRequestConfigs\> elements. The
\<inboundAuthenticationRequestConfigs\> element has following
elements(Note: Only the required element are mentioned).

**IMPORTANT: You need to create inbound authenticator configurations
accessing the appropriate services(Ex: OAuthAdminService,
IdentitySAMLSSOConfigService, etc.), before updating service provider
with inbound authenticator configurations.**

  

| Parameter                                  | Type     | Description                                                                |
|--------------------------------------------|----------|----------------------------------------------------------------------------|
| inboundAuthKey                             | String   | Specify an identifier for the service provider as the authentication key.  |
| inboundAuthType                            | String   | Specify the authentication type. ex: samlsso, oauth2, wstrust, passivests, |
| properties                                 | Property | Inbound authentication request properties                                  |
| [properties.name](http://properties.name/) | String   | Specify the property name                                                  |
| properties.value                           | String   | Specify the property value                                                 |

**inboundAuthenticationConfig** **Request Element:**

``` xml
<xsd1:inboundAuthenticationConfig>
    <!--Zero or more repetitions:-->
    <xsd1:inboundAuthenticationRequestConfigs>
        <!--Optional:-->
        <xsd1:friendlyName>?</xsd1:friendlyName>
        <!--Optional:-->
        <xsd1:inboundAuthKey>?</xsd1:inboundAuthKey>
        <!--Optional:-->
        <xsd1:inboundAuthType>?</xsd1:inboundAuthType>
        <!--Optional:-->
        <xsd1:inboundConfigType>?</xsd1:inboundConfigType>
        <!--Zero or more repetitions:-->
        <xsd1:properties>
            <!--Optional:-->
            <xsd1:advanced>?</xsd1:advanced>
            <!--Optional:-->
            <xsd1:confidential>?</xsd1:confidential>
            <!--Optional:-->
            <xsd1:defaultValue>?</xsd1:defaultValue>
            <!--Optional:-->
            <xsd1:description>?</xsd1:description>
            <!--Optional:-->
            <xsd1:displayName>?</xsd1:displayName>
            <!--Optional:-->
            <xsd1:displayOrder>?</xsd1:displayOrder>
            <!--Optional:-->
            <xsd1:name>?</xsd1:name>
            <!--Optional:-->
            <xsd1:required>?</xsd1:required>
            <!--Optional:-->
            <xsd1:type>?</xsd1:type>
            <!--Optional:-->
            <xsd1:value>?</xsd1:value>
        </xsd1:properties>
    </xsd1:inboundAuthenticationRequestConfigs>
</xsd1:inboundAuthenticationConfig>
```

![](images/icons/grey_arrow_down.png){.expand-control-image} Sample
Request...

``` xml
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsd="http://org.apache.axis2/xsd"
    xmlns:xsd1="http://model.common.application.identity.carbon.wso2.org/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:updateApplication>
            <!--Optional:-->
            <xsd:serviceProvider>
                <!--Optional:-->
                <xsd1:applicationID>2</xsd1:applicationID>
                <!--Optional:-->
                <xsd1:applicationName>travelocity.com</xsd1:applicationName>
                <!--Optional:-->
                <xsd1:claimConfig>
                    <!--Optional:-->
                    <xsd1:alwaysSendMappedLocalSubjectId>false</xsd1:alwaysSendMappedLocalSubjectId>
                    <!--Optional:-->
                    <xsd1:localClaimDialect>true</xsd1:localClaimDialect>
                </xsd1:claimConfig>
                <!--Optional:-->
                <xsd1:description>sample service provider</xsd1:description>
                <!--Optional:-->
                <xsd1:inboundAuthenticationConfig>
                    <!--Zero or more repetitions:-->
                    <xsd1:inboundAuthenticationRequestConfigs>
                        <!--Optional:-->
                        <xsd1:inboundAuthKey>li6JMbjW6WDMKTWsRnGcjp5zcGhi</xsd1:inboundAuthKey>
                        <!--Optional:-->
                        <xsd1:inboundAuthType>oauth2</xsd1:inboundAuthType>
                        <!--Zero or more repetitions:-->
                        <xsd1:properties>
                            <!--Optional:-->
                            <xsd1:name>oauthConsumerSecret</xsd1:name>
                            <!--Optional:-->
                            <xsd1:value>NMB3EAfxh4YvSTqbb3iMkongAHjW</xsd1:value>
                        </xsd1:properties>
                    </xsd1:inboundAuthenticationRequestConfigs>
                    <xsd1:inboundAuthenticationRequestConfigs>
                        <!--Optional:-->
                        <xsd1:inboundAuthKey>travelocity.com</xsd1:inboundAuthKey>
                        <!--Optional:-->
                        <xsd1:inboundAuthType>samlsso</xsd1:inboundAuthType>
                        <!--Zero or more repetitions:-->
                        <xsd1:properties>
                            <!--Optional:-->
                            <xsd1:name>attrConsumServiceIndex</xsd1:name>
                            <!--Optional:-->
                            <xsd1:value>202240762</xsd1:value>
                        </xsd1:properties>
                    </xsd1:inboundAuthenticationRequestConfigs>
                </xsd1:inboundAuthenticationConfig>
                <!--Optional:-->
                <xsd1:inboundProvisioningConfig>
                    <!--Optional:-->
                    <xsd1:provisioningEnabled>false</xsd1:provisioningEnabled>
                    <!--Optional:-->
                    <xsd1:provisioningUserStore>PRIMARY</xsd1:provisioningUserStore>
                </xsd1:inboundProvisioningConfig>
                <!--Optional:-->
                <xsd1:localAndOutBoundAuthenticationConfig>
                    <!--Optional:-->
                    <xsd1:alwaysSendBackAuthenticatedListOfIdPs>false</xsd1:alwaysSendBackAuthenticatedListOfIdPs>
                    <!--Optional:-->
                    <xsd1:authenticationStepForAttributes></xsd1:authenticationStepForAttributes>
                    <!--Optional:-->
                    <xsd1:authenticationStepForSubject></xsd1:authenticationStepForSubject>
                    <xsd1:authenticationType>default</xsd1:authenticationType>
                    <!--Optional:-->
                    <xsd1:subjectClaimUri>http://wso2.org/claims/fullname</xsd1:subjectClaimUri>
                </xsd1:localAndOutBoundAuthenticationConfig>
                <!--Optional:-->
                <xsd1:outboundProvisioningConfig>
                    <!--Zero or more repetitions:-->
                    <xsd1:provisionByRoleList></xsd1:provisionByRoleList>
                </xsd1:outboundProvisioningConfig>
                <!--Optional:-->
                <xsd1:permissionAndRoleConfig></xsd1:permissionAndRoleConfig>
                <!--Optional:-->
                <xsd1:saasApp>false</xsd1:saasApp>
            </xsd:serviceProvider>
        </xsd:updateApplication>
    </soapenv:Body>
</soapenv:Envelope>
```

#### Inbound provisioning configuration

The inbound provisioning of the service provider can be configured.

  

| Parameter             | Type    | Description                                     |
|-----------------------|---------|-------------------------------------------------|
| provisioningEnabled   | Boolean | Specify whether inbound provisioning is enabled |
| provisioningUserStore | String  | User store domain name                          |

**inboundProvisioningConfig** **Request Element:**

``` xml
<xsd1:inboundProvisioningConfig>
    <!--Optional:-->
    <xsd1:dumbMode>?</xsd1:dumbMode>
    <!--Optional:-->
    <xsd1:provisioningEnabled>?</xsd1:provisioningEnabled>
    <!--Optional:-->
    <xsd1:provisioningUserStore>?</xsd1:provisioningUserStore>
</xsd1:inboundProvisioningConfig>
```

![](images/icons/grey_arrow_down.png){.expand-control-image} Sample
Request...

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://model.common.application.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:updateApplication>
         <!--Optional:-->
         <xsd:serviceProvider>
            <!--Optional:-->
            <xsd1:applicationID>2</xsd1:applicationID>
            <!--Optional:-->
            <xsd1:applicationName>travelocity.com</xsd1:applicationName>
            <!--Optional:-->
            <xsd1:claimConfig>
               <!--Optional:-->
               <xsd1:alwaysSendMappedLocalSubjectId>false</xsd1:alwaysSendMappedLocalSubjectId>
               <!--Optional:-->
               <xsd1:localClaimDialect>true</xsd1:localClaimDialect>
            </xsd1:claimConfig>
            <!--Optional:-->
            <xsd1:description>sample service provider</xsd1:description>
            <!--Optional:-->
            <xsd1:inboundAuthenticationConfig></xsd1:inboundAuthenticationConfig>
            <!--Optional:-->
            <xsd1:inboundProvisioningConfig>
               <!--Optional:-->
               <xsd1:provisioningEnabled>true</xsd1:provisioningEnabled>
               <!--Optional:-->
               <xsd1:provisioningUserStore>PRIMARY</xsd1:provisioningUserStore>
            </xsd1:inboundProvisioningConfig>
            <!--Optional:-->
            <xsd1:localAndOutBoundAuthenticationConfig>
               <!--Optional:-->
               <xsd1:alwaysSendBackAuthenticatedListOfIdPs>false</xsd1:alwaysSendBackAuthenticatedListOfIdPs>
               <!--Optional:-->
               <xsd1:authenticationStepForAttributes></xsd1:authenticationStepForAttributes>
               <!--Optional:-->
               <xsd1:authenticationStepForSubject></xsd1:authenticationStepForSubject>
               <xsd1:authenticationType>default</xsd1:authenticationType>
               <!--Optional:-->
               <xsd1:subjectClaimUri>http://wso2.org/claims/fullname</xsd1:subjectClaimUri>
            </xsd1:localAndOutBoundAuthenticationConfig>
            <!--Optional:-->
            <xsd1:outboundProvisioningConfig>
               <!--Zero or more repetitions:-->
               <xsd1:provisionByRoleList></xsd1:provisionByRoleList>
            </xsd1:outboundProvisioningConfig>
            <!--Optional:-->
            <xsd1:permissionAndRoleConfig></xsd1:permissionAndRoleConfig>
            <!--Optional:-->
            <xsd1:saasApp>false</xsd1:saasApp>
         </xsd:serviceProvider>
      </xsd:updateApplication>
   </soapenv:Body>
</soapenv:Envelope>
```

  

#### Local and outbound authentication configuration

  

<table>
<thead>
<tr class="header">
<th><p>Parameter</p></th>
<th><p>Type</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>alwaysSendBackAuthenticatedListOfIdPs</p></td>
<td><p>boolean</p></td>
<td><p>Always send back the authenticated list of identity providers.</p>
<br />

<p>true - send authenticated list of IdPs</p>
<br />

<p>false - do not send authenticated list of IdPs</p></td>
</tr>
<tr class="even">
<td><p>authenticationSteps</p></td>
<td><p>AuthenticationStep</p></td>
<td><p>Zero or more authentication steps. This can be used for subjects and attributes as well.</p></td>
</tr>
<tr class="odd">
<td><p>authenticationSteps.attributeStep</p></td>
<td><p>boolean</p></td>
<td><p>true - Use attributes from the current step</p></td>
</tr>
<tr class="even">
<td><p>authenticationSteps.federatedIdentityProviders</p></td>
<td><p>IdentityProvider</p></td>
<td><div class="content-wrapper">
<p>To configure federated IdPs, there should be one or more registered IdPs with at least one <a href="https://docs.wso2.com/display/IS550/Configuring+Federated+Authentication">federated authenticator</a> enabled.</p>
<br />

<p>With the request, it is necessary to include the IdP name and the federated authenticator name.</p>
!!! note
    <p>The federated authenticator should be enabled in the IdP. If a federated authenticator is not mentioned, the default federated authenticator for the IdP will be used.</p>
</div></td>
</tr>
<tr class="odd">
<td><p>authenticationSteps.localAuthenticatorConfigs</p></td>
<td><p>LocalAuthenticatorConfigs</p></td>
<td><p>Local authentication related configs for the authentication step. For example, you can specify whether to use a basic or an IWA authenticator.</p>
<br />

<p>To use basic, <a href="http://localauthenticatorconfigs.name/">localAuthenticatorConfigs.name</a> should be 'BasicAuthenticator' while 'IWAAuthenticator' for iwa.</p></td>
</tr>
<tr class="even">
<td><p>authenticationSteps.stepOrder</p></td>
<td><p>int</p></td>
<td><p>Execution order of the step</p></td>
</tr>
<tr class="odd">
<td><p>authenticationSteps.subjectStep</p></td>
<td><p>boolean</p></td>
<td><p>true - Use subject identifier from this step</p></td>
</tr>
<tr class="even">
<td><p>authenticationType</p></td>
<td><p>String</p></td>
<td><p>Depending on the requirement, the authentication type can be specified. The available types are: <a href="#UsingtheServiceProviderAPI-authtype_D">default</a>, <a href="#UsingtheServiceProviderAPI-authtype_L">local</a>, <a href="#UsingtheServiceProviderAPI-authtype_F">federated</a>, <a href="#UsingtheServiceProviderAPI-authtype_A">flow</a> .</p>
<br />

<p>Refer the sample requests below on each authentication type configuration.</p></td>
</tr>
<tr class="odd">
<td><p>subjectClaimUri</p></td>
<td><p>String</p></td>
<td><p>Subject claim URI</p></td>
</tr>
</tbody>
</table>

  

**Default**

``` xml
<xsd1:localAndOutBoundAuthenticationConfig>
    <!--Optional:-->
    <xsd1:alwaysSendBackAuthenticatedListOfIdPs>false</xsd1:alwaysSendBackAuthenticatedListOfIdPs>
    <!--Optional:-->
    <xsd1:authenticationType>default</xsd1:authenticationType>
    <!--Optional:-->
    <xsd1:subjectClaimUri>http://wso2.org/claims/fullname</xsd1:subjectClaimUri>
</xsd1:localAndOutBoundAuthenticationConfig>
```

![](images/icons/grey_arrow_down.png){.expand-control-image} Sample
Request...

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://model.common.application.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:updateApplication>
         <!--Optional:-->
         <xsd:serviceProvider>
            <!--Optional:-->
            <xsd1:applicationID>2</xsd1:applicationID>
            <!--Optional:-->
            <xsd1:applicationName>travelocity.com</xsd1:applicationName>
            <!--Optional:-->
            <xsd1:claimConfig>
               <!--Optional:-->
               <xsd1:alwaysSendMappedLocalSubjectId>false</xsd1:alwaysSendMappedLocalSubjectId>
               <!--Optional:-->
               <xsd1:localClaimDialect>true</xsd1:localClaimDialect>
            </xsd1:claimConfig>
            <!--Optional:-->
            <xsd1:description>sample service provider</xsd1:description>
            <!--Optional:-->
            <xsd1:inboundAuthenticationConfig></xsd1:inboundAuthenticationConfig>
            <!--Optional:-->
            <xsd1:inboundProvisioningConfig>
               <!--Optional:-->
               <xsd1:provisioningEnabled>false</xsd1:provisioningEnabled>
               <!--Optional:-->
               <xsd1:provisioningUserStore>PRIMARY</xsd1:provisioningUserStore>
            </xsd1:inboundProvisioningConfig>
            <!--Optional:-->
            <xsd1:localAndOutBoundAuthenticationConfig>
               <!--Optional:-->
               <xsd1:alwaysSendBackAuthenticatedListOfIdPs>false</xsd1:alwaysSendBackAuthenticatedListOfIdPs>
               <!--Optional:-->
               <xsd1:authenticationType>default</xsd1:authenticationType>
               <!--Optional:-->
               <xsd1:subjectClaimUri>http://wso2.org/claims/fullname</xsd1:subjectClaimUri>
            </xsd1:localAndOutBoundAuthenticationConfig>
            <!--Optional:-->
            <xsd1:outboundProvisioningConfig>
               <!--Zero or more repetitions:-->
               <xsd1:provisionByRoleList></xsd1:provisionByRoleList>
            </xsd1:outboundProvisioningConfig>
            <!--Optional:-->
            <xsd1:permissionAndRoleConfig></xsd1:permissionAndRoleConfig>
            <!--Optional:-->
            <xsd1:saasApp>false</xsd1:saasApp>
         </xsd:serviceProvider>
      </xsd:updateApplication>
   </soapenv:Body>
</soapenv:Envelope>
```

**Local**

Since there is only one `          <authenticationSteps>         `
element configured here, there is no need to set the
`          authenticationSteps.stepOrder         `,
`          authenticationSteps.subjectStep, authenticationSteps.attributeStep         `
attributes.

``` xml
<xsd1:localAndOutBoundAuthenticationConfig>
    <!--Zero or more repetitions:-->
    <xsd1:authenticationSteps>
        <!--Zero or more repetitions:-->
        <xsd1:localAuthenticatorConfigs>
            <!--Optional:-->
            <xsd1:displayName>basic</xsd1:displayName>
            <!--Optional:-->
            <xsd1:name>BasicAuthenticator</xsd1:name>
            <!--Optional:-->
            <xsd1:valid>true</xsd1:valid>
            <!--Zero or more repetitions:-->
        </xsd1:localAuthenticatorConfigs>
        <!--Optional:-->
        <xsd1:stepOrder>1</xsd1:stepOrder>
        <!--Optional:-->
        <xsd1:subjectStep>false</xsd1:subjectStep>
        <!--Optional:-->
    </xsd1:authenticationSteps>
    <xsd1:authenticationType>local</xsd1:authenticationType>
    <!--Optional:-->
    <xsd1:subjectClaimUri>http://wso2.org/claims/fullname</xsd1:subjectClaimUri>
</xsd1:localAndOutBoundAuthenticationConfig>
```

![](images/icons/grey_arrow_down.png){.expand-control-image} Sample
Request...

``` xml
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsd="http://org.apache.axis2/xsd"
    xmlns:xsd1="http://model.common.application.identity.carbon.wso2.org/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:updateApplication>
            <!--Optional:-->
            <xsd:serviceProvider>
                <!--Optional:-->
                <xsd1:applicationID>2</xsd1:applicationID>
                <!--Optional:-->
                <xsd1:applicationName>travelocity.com</xsd1:applicationName>
                <!--Optional:-->
                <xsd1:claimConfig>
                    <!--Optional:-->
                    <xsd1:alwaysSendMappedLocalSubjectId>false</xsd1:alwaysSendMappedLocalSubjectId>
                    <!--Optional:-->
                    <xsd1:localClaimDialect>true</xsd1:localClaimDialect>
                </xsd1:claimConfig>
                <!--Optional:-->
                <xsd1:description>sample service provider</xsd1:description>
                <!--Optional:-->
                <xsd1:inboundAuthenticationConfig></xsd1:inboundAuthenticationConfig>
                <!--Optional:-->
                <xsd1:inboundProvisioningConfig>
                    <!--Optional:-->
                    <xsd1:provisioningEnabled>false</xsd1:provisioningEnabled>
                    <!--Optional:-->
                    <xsd1:provisioningUserStore>PRIMARY</xsd1:provisioningUserStore>
                </xsd1:inboundProvisioningConfig>
                <!--Optional:-->
                <xsd1:localAndOutBoundAuthenticationConfig>
                    <!--Zero or more repetitions:-->
                    <xsd1:authenticationSteps>
                        <!--Zero or more repetitions:-->
                        <xsd1:localAuthenticatorConfigs>
                            <!--Optional:-->
                            <xsd1:displayName>basic</xsd1:displayName>
                            <!--Optional:-->
                            <xsd1:name>BasicAuthenticator</xsd1:name>
                            <!--Optional:-->
                            <xsd1:valid>true</xsd1:valid>
                            <!--Zero or more repetitions:-->
                        </xsd1:localAuthenticatorConfigs>
                        <!--Optional:-->
                        <xsd1:stepOrder>1</xsd1:stepOrder>
                        <!--Optional:-->
                        <xsd1:subjectStep>false</xsd1:subjectStep>
                        <!--Optional:-->
                    </xsd1:authenticationSteps>
                    <xsd1:authenticationType>local</xsd1:authenticationType>
                    <!--Optional:-->
                    <xsd1:subjectClaimUri>http://wso2.org/claims/fullname</xsd1:subjectClaimUri>
                </xsd1:localAndOutBoundAuthenticationConfig>
                <!--Optional:-->
                <xsd1:outboundProvisioningConfig>
                    <!--Zero or more repetitions:-->
                    <xsd1:provisionByRoleList></xsd1:provisionByRoleList>
                </xsd1:outboundProvisioningConfig>
                <!--Optional:-->
                <xsd1:permissionAndRoleConfig></xsd1:permissionAndRoleConfig>
                <!--Optional:-->
                <xsd1:saasApp>false</xsd1:saasApp>
            </xsd:serviceProvider>
        </xsd:updateApplication>
    </soapenv:Body>
</soapenv:Envelope>
```

**Federated**

Since there is only one `          <authenticationSteps>         `
configured here, there is no need to set the
`          authenticationSteps.stepOrder, authenticationSteps.subjectStep, authenticationSteps.attributeStep         `
attributes.

``` xml
<xsd1:localAndOutBoundAuthenticationConfig>
    <!--Zero or more repetitions:-->
    <xsd1:authenticationSteps>
        <!--Zero or more repetitions:-->
        <xsd1:federatedIdentityProviders>
            <!--Zero or more repetitions:-->
            <xsd1:federatedAuthenticatorConfigs>
                <!--Optional:-->
                <xsd1:displayName>samlsso</xsd1:displayName>
                <!--Optional:-->
                <xsd1:name>SAMLSSOAuthenticator</xsd1:name>
                <!--Optional:-->
                <xsd1:valid>true</xsd1:valid>
            </xsd1:federatedAuthenticatorConfigs>
            <!--Optional:-->
            <xsd1:identityProviderName>TrustedIdP</xsd1:identityProviderName>
        </xsd1:federatedIdentityProviders>
        <!--Optional:-->
        <xsd1:stepOrder>1</xsd1:stepOrder>
        <!--Optional:-->
        <xsd1:subjectStep>false</xsd1:subjectStep>
        <!--Optional:-->
    </xsd1:authenticationSteps>
    <xsd1:authenticationType>federated</xsd1:authenticationType>
    <!--Optional:-->
    <xsd1:subjectClaimUri>http://wso2.org/claims/fullname</xsd1:subjectClaimUri>
</xsd1:localAndOutBoundAuthenticationConfig>
```

![](images/icons/grey_arrow_down.png){.expand-control-image} Sample
Request...

``` xml
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsd="http://org.apache.axis2/xsd"
    xmlns:xsd1="http://model.common.application.identity.carbon.wso2.org/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:updateApplication>
            <!--Optional:-->
            <xsd:serviceProvider>
                <!--Optional:-->
                <xsd1:applicationID>2</xsd1:applicationID>
                <!--Optional:-->
                <xsd1:applicationName>travelocity.com</xsd1:applicationName>
                <!--Optional:-->
                <xsd1:claimConfig>
                    <!--Optional:-->
                    <xsd1:alwaysSendMappedLocalSubjectId>false</xsd1:alwaysSendMappedLocalSubjectId>
                    <!--Optional:-->
                    <xsd1:localClaimDialect>true</xsd1:localClaimDialect>
                </xsd1:claimConfig>
                <!--Optional:-->
                <xsd1:description>sample service provider</xsd1:description>
                <!--Optional:-->
                <xsd1:inboundAuthenticationConfig></xsd1:inboundAuthenticationConfig>
                <!--Optional:-->
                <xsd1:inboundProvisioningConfig>
                    <!--Optional:-->
                    <xsd1:provisioningEnabled>false</xsd1:provisioningEnabled>
                    <!--Optional:-->
                    <xsd1:provisioningUserStore>PRIMARY</xsd1:provisioningUserStore>
                </xsd1:inboundProvisioningConfig>
                <!--Optional:-->
                <xsd1:localAndOutBoundAuthenticationConfig>
                    <!--Zero or more repetitions:-->
                    <xsd1:authenticationSteps>
                        <!--Zero or more repetitions:-->
                        <xsd1:federatedIdentityProviders>
                            <!--Zero or more repetitions:-->
                            <xsd1:federatedAuthenticatorConfigs>
                                <!--Optional:-->
                                <xsd1:displayName>samlsso</xsd1:displayName>
                                <!--Optional:-->
                                <xsd1:name>SAMLSSOAuthenticator</xsd1:name>
                                <!--Optional:-->
                                <xsd1:valid>true</xsd1:valid>
                            </xsd1:federatedAuthenticatorConfigs>
                            <!--Optional:-->
                            <xsd1:identityProviderName>TrustedIdP</xsd1:identityProviderName>
                        </xsd1:federatedIdentityProviders>
                        <!--Optional:-->
                        <xsd1:stepOrder>1</xsd1:stepOrder>
                        <!--Optional:-->
                        <xsd1:subjectStep>false</xsd1:subjectStep>
                        <!--Optional:-->
                    </xsd1:authenticationSteps>
                    <xsd1:authenticationType>federated</xsd1:authenticationType>
                    <!--Optional:-->
                    <xsd1:subjectClaimUri>http://wso2.org/claims/fullname</xsd1:subjectClaimUri>
                </xsd1:localAndOutBoundAuthenticationConfig>
                <!--Optional:-->
                <xsd1:outboundProvisioningConfig>
                    <!--Zero or more repetitions:-->
                    <xsd1:provisionByRoleList></xsd1:provisionByRoleList>
                </xsd1:outboundProvisioningConfig>
                <!--Optional:-->
                <xsd1:permissionAndRoleConfig></xsd1:permissionAndRoleConfig>
                <!--Optional:-->
                <xsd1:saasApp>false</xsd1:saasApp>
            </xsd:serviceProvider>
        </xsd:updateApplication>
    </soapenv:Body>
</soapenv:Envelope>
```

**Flow/Advanced**

Multiple `          <         `
`          authenticationSteps>         ` can be configured here.
Therefore, in each `          <authenticationSteps>         `, the
stepOrder and whether the subject identifiers and attributes should be
used from that particular step.

  

``` xml
<xsd1:localAndOutBoundAuthenticationConfig>
    <!--Zero or more repetitions:-->
    <xsd1:authenticationSteps>
        <!--Zero or more repetitions:-->
        <xsd1:federatedIdentityProviders>
            <!--Zero or more repetitions:-->
            <xsd1:federatedAuthenticatorConfigs>
                <!--Optional:-->
                <xsd1:displayName>samlsso</xsd1:displayName>
                <!--Optional:-->
                <xsd1:name>SAMLSSOAuthenticator</xsd1:name>
                <!--Optional:-->
                <xsd1:valid>true</xsd1:valid>
            </xsd1:federatedAuthenticatorConfigs>
            <!--Optional:-->
            <xsd1:identityProviderName>TrustedIdP</xsd1:identityProviderName>
        </xsd1:federatedIdentityProviders>
        <!--Zero or more repetitions:-->
        <xsd1:localAuthenticatorConfigs>
            <!--Optional:-->
            <xsd1:displayName>basic</xsd1:displayName>
            <!--Optional:-->
            <xsd1:name>BasicAuthenticator</xsd1:name>
            <!--Optional:-->
            <xsd1:valid>true</xsd1:valid>
            <!--Zero or more repetitions:-->
        </xsd1:localAuthenticatorConfigs>
        <!--Optional:-->
        <xsd1:stepOrder>1</xsd1:stepOrder>
        <!--Optional:-->
        <xsd1:subjectStep>false</xsd1:subjectStep>
        <!--Optional:-->
    </xsd1:authenticationSteps>
    <xsd1:authenticationType>flow</xsd1:authenticationType>
    <!--Optional:-->
    <xsd1:subjectClaimUri>http://wso2.org/cla
```

![](images/icons/grey_arrow_down.png){.expand-control-image} Sample
Request...

``` xml
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsd="http://org.apache.axis2/xsd"
    xmlns:xsd1="http://model.common.application.identity.carbon.wso2.org/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:updateApplication>
            <!--Optional:-->
            <xsd:serviceProvider>
                <!--Optional:-->
                <xsd1:applicationID>2</xsd1:applicationID>
                <!--Optional:-->
                <xsd1:applicationName>travelocity.com</xsd1:applicationName>
                <!--Optional:-->
                <xsd1:claimConfig>
                    <!--Optional:-->
                    <xsd1:alwaysSendMappedLocalSubjectId>false</xsd1:alwaysSendMappedLocalSubjectId>
                    <!--Optional:-->
                    <xsd1:localClaimDialect>true</xsd1:localClaimDialect>
                </xsd1:claimConfig>
                <!--Optional:-->
                <xsd1:description>sample service provider</xsd1:description>
                <!--Optional:-->
                <xsd1:inboundAuthenticationConfig></xsd1:inboundAuthenticationConfig>
                <!--Optional:-->
                <xsd1:inboundProvisioningConfig>
                    <!--Optional:-->
                    <xsd1:provisioningEnabled>false</xsd1:provisioningEnabled>
                    <!--Optional:-->
                    <xsd1:provisioningUserStore>PRIMARY</xsd1:provisioningUserStore>
                </xsd1:inboundProvisioningConfig>
                <!--Optional:-->
                <xsd1:localAndOutBoundAuthenticationConfig>
                    <!--Zero or more repetitions:-->
                    <xsd1:authenticationSteps>
                        <!--Zero or more repetitions:-->
                        <xsd1:federatedIdentityProviders>
                            <!--Zero or more repetitions:-->
                            <xsd1:federatedAuthenticatorConfigs>
                                <!--Optional:-->
                                <xsd1:displayName>samlsso</xsd1:displayName>
                                <!--Optional:-->
                                <xsd1:name>SAMLSSOAuthenticator</xsd1:name>
                                <!--Optional:-->
                                <xsd1:valid>true</xsd1:valid>
                            </xsd1:federatedAuthenticatorConfigs>
                            <!--Optional:-->
                            <xsd1:identityProviderName>TrustedIdP</xsd1:identityProviderName>
                        </xsd1:federatedIdentityProviders>
                        <!--Zero or more repetitions:-->
                        <xsd1:localAuthenticatorConfigs>
                            <!--Optional:-->
                            <xsd1:displayName>basic</xsd1:displayName>
                            <!--Optional:-->
                            <xsd1:name>BasicAuthenticator</xsd1:name>
                            <!--Optional:-->
                            <xsd1:valid>true</xsd1:valid>
                            <!--Zero or more repetitions:-->
                        </xsd1:localAuthenticatorConfigs>
                        <!--Optional:-->
                        <xsd1:stepOrder>1</xsd1:stepOrder>
                        <!--Optional:-->
                        <xsd1:subjectStep>false</xsd1:subjectStep>
                        <!--Optional:-->
                    </xsd1:authenticationSteps>
                    <xsd1:authenticationType>flow</xsd1:authenticationType>
                    <!--Optional:-->
                    <xsd1:subjectClaimUri>http://wso2.org/claims/fullname</xsd1:subjectClaimUri>
                </xsd1:localAndOutBoundAuthenticationConfig>
                <!--Optional:-->
                <xsd1:outboundProvisioningConfig>
                    <!--Zero or more repetitions:-->
                    <xsd1:provisionByRoleList></xsd1:provisionByRoleList>
                </xsd1:outboundProvisioningConfig>
                <!--Optional:-->
                <xsd1:permissionAndRoleConfig></xsd1:permissionAndRoleConfig>
                <!--Optional:-->
                <xsd1:saasApp>false</xsd1:saasApp>
            </xsd:serviceProvider>
        </xsd:updateApplication>
    </soapenv:Body>
</soapenv:Envelope>            
```

#### Request path authenticator configuration

Specify configurations related to zero or more request path
authenticators.

  

<table>
<thead>
<tr class="header">
<th><p>Parameter</p></th>
<th><p>Type</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>displayName</p></td>
<td><p>String</p></td>
<td><p>The name that displays</p></td>
</tr>
<tr class="even">
<td><p>enabled</p></td>
<td><p>Boolean</p></td>
<td><p>true - enable</p>
<p>false - deisable</p></td>
</tr>
<tr class="odd">
<td><p>name</p></td>
<td><p>String</p></td>
<td><p>OAuthRequestPathAuthenticator</p>
<p>BasicAuthRequestPathAuthenticator</p></td>
</tr>
<tr class="even">
<td><p>valid</p></td>
<td><p>boolean</p></td>
<td><p>true - valid</p>
<p>false - invalid</p></td>
</tr>
<tr class="odd">
<td><p>properties</p></td>
<td><p>Property</p></td>
<td><p>List of properties in a array</p></td>
</tr>
</tbody>
</table>

**  
**

**requestPathAuthenticatorConfigs** **Request Element:**

``` xml
<xsd1:requestPathAuthenticatorConfigs>
    <!--Optional:-->
    <xsd1:name>BasicAuthRequestPathAuthenticator</xsd1:name>
    <!--Optional:-->
    <xsd1:valid>true</xsd1:valid>
</xsd1:requestPathAuthenticatorConfigs>
<xsd1:requestPathAuthenticatorConfigs>
    <!--Optional:-->
    <xsd1:name>OAuthRequestPathAuthenticator</xsd1:name>
    <!--Optional:-->
    <xsd1:valid>true</xsd1:valid>
</xsd1:requestPathAuthenticatorConfigs>
```

![](images/icons/grey_arrow_down.png){.expand-control-image} Sample
Request...

``` xml
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsd="http://org.apache.axis2/xsd"
    xmlns:xsd1="http://model.common.application.identity.carbon.wso2.org/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:updateApplication>
            <!--Optional:-->
            <xsd:serviceProvider>
                <!--Optional:-->
                <xsd1:applicationID>2</xsd1:applicationID>
                <!--Optional:-->
                <xsd1:applicationName>travelocity.com</xsd1:applicationName>
                <!--Optional:-->
                <xsd1:claimConfig>
                    <!--Optional:-->
                    <xsd1:alwaysSendMappedLocalSubjectId>false</xsd1:alwaysSendMappedLocalSubjectId>
                    <!--Optional:-->
                    <xsd1:localClaimDialect>true</xsd1:localClaimDialect>
                </xsd1:claimConfig>
                <!--Optional:-->
                <xsd1:description>sample service provider</xsd1:description>
                <!--Optional:-->
                <xsd1:inboundAuthenticationConfig></xsd1:inboundAuthenticationConfig>
                <!--Optional:-->
                <xsd1:inboundProvisioningConfig>
                    <!--Optional:-->
                    <xsd1:provisioningEnabled>false</xsd1:provisioningEnabled>
                    <!--Optional:-->
                    <xsd1:provisioningUserStore>PRIMARY</xsd1:provisioningUserStore>
                </xsd1:inboundProvisioningConfig>
                <!--Optional:-->
                <xsd1:localAndOutBoundAuthenticationConfig>
                    <!--Optional:-->
                    <xsd1:alwaysSendBackAuthenticatedListOfIdPs>false</xsd1:alwaysSendBackAuthenticatedListOfIdPs>
                    <!--Optional:-->
                    <xsd1:authenticationStepForAttributes></xsd1:authenticationStepForAttributes>
                    <!--Optional:-->
                    <xsd1:authenticationStepForSubject></xsd1:authenticationStepForSubject>
                    <xsd1:authenticationType>default</xsd1:authenticationType>
                    <!--Optional:-->
                    <xsd1:subjectClaimUri>http://wso2.org/claims/fullname</xsd1:subjectClaimUri>
                </xsd1:localAndOutBoundAuthenticationConfig>
                <!--Optional:-->
                <xsd1:outboundProvisioningConfig>
                    <!--Zero or more repetitions:-->
                    <xsd1:provisionByRoleList></xsd1:provisionByRoleList>
                </xsd1:outboundProvisioningConfig>
                <!--Optional:-->
                <xsd1:permissionAndRoleConfig></xsd1:permissionAndRoleConfig>
                <!--Zero or more repetitions:-->
                <xsd1:requestPathAuthenticatorConfigs>
                    <!--Optional:-->
                    <xsd1:name>BasicAuthRequestPathAuthenticator</xsd1:name>
                    <!--Optional:-->
                    <xsd1:valid>true</xsd1:valid>
                </xsd1:requestPathAuthenticatorConfigs>
                <xsd1:requestPathAuthenticatorConfigs>
                    <!--Optional:-->
                    <xsd1:name>OAuthRequestPathAuthenticator</xsd1:name>
                    <!--Optional:-->
                    <xsd1:valid>true</xsd1:valid>
                </xsd1:requestPathAuthenticatorConfigs>
                <!--Optional:-->
                <xsd1:saasApp>false</xsd1:saasApp>
            </xsd:serviceProvider>
        </xsd:updateApplication>
    </soapenv:Body>
</soapenv:Envelope>      
```

#### Outbound provisioning configuration

To configure the outbound provisioning of the service provider, use the
following parameters.

  

<table>
<thead>
<tr class="header">
<th><p>Parameter</p></th>
<th><p>Type</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>provisionByRoleList</p></td>
<td><p>String</p></td>
<td><p>-</p></td>
</tr>
<tr class="even">
<td><p>provisioningIdentityProviders</p></td>
<td><p>IdentityProvider</p></td>
<td><p>To configure provisioning IdPs, there should be one or more registered IdPs, with at least one outbound provisioning connector enabled.</p>
<p>Include the IdP name and provisioning connector name and specify whether to enable JiT provisioning with the request.</p></td>
</tr>
</tbody>
</table>

**outboundProvisioningConfig** **Request Element:**

``` xml
<xsd1:outboundProvisioningConfig>
    <!--Zero or more repetitions:-->
    <xsd1:provisionByRoleList></xsd1:provisionByRoleList>
    <!--Zero or more repetitions:-->
    <xsd1:provisioningIdentityProviders>
        <!--Optional:-->
        <xsd1:defaultProvisioningConnectorConfig>
            <!--Optional:-->
            <xsd1:blocking>false</xsd1:blocking>
            <!--Optional:-->
            <xsd1:enabled>false</xsd1:enabled>
            <!--Optional:-->
            <xsd1:name>scim</xsd1:name>
            <!--Optional:-->
        </xsd1:defaultProvisioningConnectorConfig>
        <!--Optional:-->
        <xsd1:identityProviderName>TrustedIdP</xsd1:identityProviderName>
        <!--Optional:-->
        <xsd1:justInTimeProvisioningConfig>
            <!--Optional:-->
            <xsd1:dumbMode>false</xsd1:dumbMode>
            <!--Optional:-->
            <xsd1:provisioningEnabled>true</xsd1:provisioningEnabled>
        </xsd1:justInTimeProvisioningConfig>
    </xsd1:provisioningIdentityProviders>
</xsd1:outboundProvisioningConfig>
```

![](images/icons/grey_arrow_down.png){.expand-control-image} Sample
Request...

``` xml
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsd="http://org.apache.axis2/xsd"
    xmlns:xsd1="http://model.common.application.identity.carbon.wso2.org/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:updateApplication>
            <!--Optional:-->
            <xsd:serviceProvider>
                <!--Optional:-->
                <xsd1:applicationID>2</xsd1:applicationID>
                <!--Optional:-->
                <xsd1:applicationName>travelocity.com</xsd1:applicationName>
                <!--Optional:-->
                <xsd1:claimConfig>
                    <!--Optional:-->
                    <xsd1:alwaysSendMappedLocalSubjectId>false</xsd1:alwaysSendMappedLocalSubjectId>
                    <!--Zero or more repetitions:-->
                    <xsd1:claimMappings>
                        <!--Optional:-->
                        <xsd1:localClaim>
                            <!--Optional:-->
                            <xsd1:claimUri>http://wso2.org/claims/givenname</xsd1:claimUri>
                        </xsd1:localClaim>
                        <!--Optional:-->
                        <xsd1:mandatory>true</xsd1:mandatory>
                        <!--Optional:-->
                        <xsd1:remoteClaim>
                            <!--Optional:-->
                            <xsd1:claimUri>name</xsd1:claimUri>
                        </xsd1:remoteClaim>
                        <!--Optional:-->
                        <xsd1:requested>true</xsd1:requested>
                    </xsd1:claimMappings>
                    <xsd1:claimMappings>
                        <!--Optional:-->
                        <xsd1:localClaim>
                            <!--Optional:-->
                            <xsd1:claimUri>http://wso2.org/claims/role</xsd1:claimUri>
                        </xsd1:localClaim>
                        <!--Optional:-->
                        <xsd1:mandatory>true</xsd1:mandatory>
                        <!--Optional:-->
                        <xsd1:remoteClaim>
                            <!--Optional:-->
                            <xsd1:claimUri>role</xsd1:claimUri>
                        </xsd1:remoteClaim>
                        <!--Optional:-->
                        <xsd1:requested>true</xsd1:requested>
                    </xsd1:claimMappings>
                    <!--Optional:-->
                    <xsd1:localClaimDialect>false</xsd1:localClaimDialect>
                    <!--Optional:-->
                    <xsd1:roleClaimURI>role</xsd1:roleClaimURI>
                    <!--Optional:-->
                    <xsd1:userClaimURI>user</xsd1:userClaimURI>
                </xsd1:claimConfig>
                <!--Optional:-->
                <xsd1:description>sample service provider</xsd1:description>
                <!--Optional:-->
                <xsd1:inboundAuthenticationConfig></xsd1:inboundAuthenticationConfig>
                <!--Optional:-->
                <xsd1:inboundProvisioningConfig>
                    <!--Optional:-->
                    <xsd1:provisioningEnabled>false</xsd1:provisioningEnabled>
                    <!--Optional:-->
                    <xsd1:provisioningUserStore>PRIMARY</xsd1:provisioningUserStore>
                </xsd1:inboundProvisioningConfig>
                <!--Optional:-->
                <xsd1:localAndOutBoundAuthenticationConfig>
                    <!--Optional:-->
                    <xsd1:alwaysSendBackAuthenticatedListOfIdPs>false</xsd1:alwaysSendBackAuthenticatedListOfIdPs>
                    <!--Optional:-->
                    <xsd1:authenticationStepForAttributes></xsd1:authenticationStepForAttributes>
                    <!--Optional:-->
                    <xsd1:authenticationStepForSubject></xsd1:authenticationStepForSubject>
                    <xsd1:authenticationType>default</xsd1:authenticationType>
                    <!--Optional:-->
                    <xsd1:subjectClaimUri>name</xsd1:subjectClaimUri>
                </xsd1:localAndOutBoundAuthenticationConfig>
                <!--Optional:-->
                <xsd1:outboundProvisioningConfig>
                    <!--Zero or more repetitions:-->
                    <xsd1:provisionByRoleList></xsd1:provisionByRoleList>
                    <!--Zero or more repetitions:-->
                    <xsd1:provisioningIdentityProviders>
                        <!--Optional:-->
                        <xsd1:defaultProvisioningConnectorConfig>
                            <!--Optional:-->
                            <xsd1:blocking>false</xsd1:blocking>
                            <!--Optional:-->
                            <xsd1:enabled>false</xsd1:enabled>
                            <!--Optional:-->
                            <xsd1:name>scim</xsd1:name>
                            <!--Optional:-->
                        </xsd1:defaultProvisioningConnectorConfig>
                        <!--Optional:-->
                        <xsd1:identityProviderName>TrustedIdP</xsd1:identityProviderName>
                        <!--Optional:-->
                        <xsd1:justInTimeProvisioningConfig>
                            <!--Optional:-->
                            <xsd1:dumbMode>false</xsd1:dumbMode>
                            <!--Optional:-->
                            <xsd1:provisioningEnabled>true</xsd1:provisioningEnabled>
                        </xsd1:justInTimeProvisioningConfig>
                    </xsd1:provisioningIdentityProviders>
                </xsd1:outboundProvisioningConfig>
                <!--Optional:-->
                <xsd1:permissionAndRoleConfig></xsd1:permissionAndRoleConfig>
                <!--Optional:-->
                <xsd1:saasApp>false</xsd1:saasApp>
            </xsd:serviceProvider>
        </xsd:updateApplication>
    </soapenv:Body>
</soapenv:Envelope>
```

### deleteApplication

Permission Level: `            /permission/admin/manage           `

A service provider is deleted based on the application name. The input
parameters and the format of the request should be as follows.

  

**Input parameters**

| Parameter       | Type   | Description             |
|-----------------|--------|-------------------------|
| applicationName | String | Name of the application |

**  
**

**Request:**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:deleteApplication>
         <!--Optional:-->
         <xsd:applicationName>TestSP</xsd:applicationName>
      </xsd:deleteApplication>
   </soapenv:Body>
</soapenv:Envelope>
```

**  
**

**Response:**

``` java
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <ns:deleteApplicationResponse xmlns:ns="http://org.apache.axis2/xsd">
         <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
      </ns:deleteApplicationResponse>
   </soapenv:Body>
</soapenv:Envelope>
```

**  
**

### getAllApplicationBasicInfo

Permission Level: `            /permission/admin/manage           `

This method can use to get all available service provider names and
their descriptions.

**Request:**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:getAllApplicationBasicInfo/>
   </soapenv:Body>
</soapenv:Envelope>
```

  

**Response:**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <ns:getAllApplicationBasicInfoResponse xmlns:ns="http://org.apache.axis2/xsd" xmlns:ax2115="http://core.carbon.wso2.org/xsd" xmlns:ax2114="http://mgt.application.identity.carbon.wso2.org/xsd" xmlns:ax2120="http://common.application.identity.carbon.wso2.org/xsd" xmlns:ax2117="http://model.common.application.identity.carbon.wso2.org/xsd">
   <ns:return xsi:type="ax2117:ApplicationBasicInfo" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <ax2117:applicationName>TestSP1</ax2117:applicationName>
            <ax2117:description>Test Service Provider-1</ax2117:description>
         </ns:return>
      </ns:getAllApplicationBasicInfoResponse>
   </soapenv:Body>
</soapenv:Envelope>
```

  

### getAllIdentityProviders

Permission Level: `           /permission/admin/manage          `

This method can use to get all available identity providers.

**Request:**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:getAllIdentityProviders/>
   </soapenv:Body>
</soapenv:Envelope> 
```

**  
** **Response:**

``` xml
 <soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <ns:getAllIdentityProvidersResponse
            xmlns:ns="http://org.apache.axis2/xsd"
            xmlns:ax2115="http://core.carbon.wso2.org/xsd"
            xmlns:ax2114="http://mgt.application.identity.carbon.wso2.org/xsd"
            xmlns:ax2120="http://common.application.identity.carbon.wso2.org/xsd"
            xmlns:ax2117="http://model.common.application.identity.carbon.wso2.org/xsd">
            <ns:return xsi:type="ax2117:IdentityProvider"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2117:alias xsi:nil="true"/>
                <ax2117:certificate xsi:nil="true"/>
                <ax2117:claimConfig xsi:nil="true"/>
                <ax2117:defaultAuthenticatorConfig xsi:nil="true"/>
                <ax2117:defaultProvisioningConnectorConfig xsi:nil="true"/>
                <ax2117:displayName xsi:nil="true"/>
                <ax2117:enable>true</ax2117:enable>
                <ax2117:federatedAuthenticatorConfigs xsi:type="ax2117:FederatedAuthenticatorConfig">
            ...</ax2117:federatedAuthenticatorConfigs>
    <ax2117:federationHub>false</ax2117:federationHub>
                <ax2117:homeRealmId xsi:nil="true"/>
                <ax2117:identityProviderDescription xsi:nil="true"/>
                <ax2117:identityProviderName>TestIdP</ax2117:identityProviderName>
                <ax2117:justInTimeProvisioningConfig xsi:nil="true"/>
                <ax2117:permissionAndRoleConfig xsi:nil="true"/>
                <ax2117:primary>false</ax2117:primary>
                <ax2117:provisioningConnectorConfigs xsi:type="ax2117:ProvisioningConnectorConfig">...
            </ax2117:provisioningConnectorConfigs>
                <ax2117:provisioningRole xsi:nil="true"/>
            </ns:return>
        </ns:getAllIdentityProvidersResponse>
    </soapenv:Body>
</soapenv:Envelope>
```

  

### getAllLocalAuthenticators

Permission Level: `           /permission/admin/manage          `

This method can use to get all available local authenticators.

**Request:**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:getAllLocalAuthenticators/>
   </soapenv:Body>
</soapenv:Envelope>
```

**  
**

**Response:**

  

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <ns:getAllLocalAuthenticatorsResponse xmlns:ns="http://org.apache.axis2/xsd" xmlns:ax2115="http://core.carbon.wso2.org/xsd" xmlns:ax2114="http://mgt.application.identity.carbon.wso2.org/xsd" xmlns:ax2120="http://common.application.identity.carbon.wso2.org/xsd" xmlns:ax2117="http://model.common.application.identity.carbon.wso2.org/xsd">
         <ns:return xsi:type="ax2117:LocalAuthenticatorConfig" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <ax2117:displayName>basic</ax2117:displayName>
            <ax2117:enabled>false</ax2117:enabled>
            <ax2117:name>BasicAuthenticator</ax2117:name>
            <ax2117:valid>true</ax2117:valid>
         </ns:return>
         <ns:return xsi:type="ax2117:LocalAuthenticatorConfig" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <ax2117:displayName>iwa</ax2117:displayName>
            <ax2117:enabled>false</ax2117:enabled>
            <ax2117:name>IWAAuthenticator</ax2117:name>
            <ax2117:valid>true</ax2117:valid>
         </ns:return>
      </ns:getAllLocalAuthenticatorsResponse>
   </soapenv:Body>
</soapenv:Envelope>
```

  

### getAllLocalClaimUris

Permission Level: `            /permission/admin/manage           `

This method can use to get all available claim URI values which are in
`                         http://wso2.org/claims                       `
dialect.

**Request:**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:getAllLocalClaimUris/>
   </soapenv:Body>
</soapenv:Envelope>
```

  

**Response:**

``` xml
 <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <ns:getAllLocalClaimUrisResponse xmlns:ns="http://org.apache.axis2/xsd" xmlns:ax2115="http://core.carbon.wso2.org/xsd" xmlns:ax2114="http://mgt.application.identity.carbon.wso2.org/xsd" xmlns:ax2120="http://common.application.identity.carbon.wso2.org/xsd" xmlns:ax2117="http://model.common.application.identity.carbon.wso2.org/xsd">
         <ns:return>http://wso2.org/claims/otherphone</ns:return>
         <ns:return>http://wso2.org/claims/dob</ns:return>
         <ns:return>http://wso2.org/claims/primaryChallengeQuestion</ns:return>
         <ns:return>http://wso2.org/claims/role</ns:return>
         <ns:return>http://wso2.org/claims/challengeQuestion1</ns:return>
         <ns:return>http://wso2.org/claims/telephone</ns:return>
         <ns:return>http://wso2.org/claims/mobile</ns:return>
         <ns:return>http://wso2.org/claims/country</ns:return>
         <ns:return>http://wso2.org/claims/challengeQuestionUris</ns:return>
         <ns:return>http://wso2.org/claims/postalcode</ns:return>
         <ns:return>http://wso2.org/claims/challengeQuestion2</ns:return>
         <ns:return>http://wso2.org/claims/identity/accountLocked</ns:return>
         <ns:return>http://wso2.org/claims/nickname</ns:return>
         <ns:return>http://wso2.org/claims/streetaddress</ns:return>
         <ns:return>http://wso2.org/claims/url</ns:return>
         <ns:return>http://wso2.org/claims/givenname</ns:return>
         <ns:return>http://wso2.org/claims/emailaddress</ns:return>
         <ns:return>http://wso2.org/claims/oneTimePassword</ns:return>
         <ns:return>http://wso2.org/claims/region</ns:return>
         <ns:return>http://wso2.org/claims/gender</ns:return>
         <ns:return>http://wso2.org/claims/fullname</ns:return>
         <ns:return>http://wso2.org/claims/passwordTimestamp</ns:return>
         <ns:return>http://wso2.org/claims/title</ns:return>
         <ns:return>http://wso2.org/claims/locality</ns:return>
         <ns:return>http://wso2.org/claims/stateorprovince</ns:return>
         <ns:return>http://wso2.org/claims/im</ns:return>
         <ns:return>http://wso2.org/claims/organization</ns:return>
         <ns:return>http://wso2.org/claims/lastname</ns:return>
      </ns:getAllLocalClaimUrisResponse>
   </soapenv:Body>
</soapenv:Envelope>
```

**  
**

### **getAllRequestPathAuthenticators**

Permission Level: `           /permission/admin/manage          `

This method can use to get all available request patch authenticators.

**Request:**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:getAllRequestPathAuthenticators/>
   </soapenv:Body>
</soapenv:Envelope>
```

**  
Response:**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <ns:getAllRequestPathAuthenticatorsResponse xmlns:ns="http://org.apache.axis2/xsd" xmlns:ax2115="http://core.carbon.wso2.org/xsd" xmlns:ax2114="http://mgt.application.identity.carbon.wso2.org/xsd" xmlns:ax2120="http://common.application.identity.carbon.wso2.org/xsd" xmlns:ax2117="http://model.common.application.identity.carbon.wso2.org/xsd">
         <ns:return xsi:type="ax2117:RequestPathAuthenticatorConfig" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <ax2117:displayName>basic-auth</ax2117:displayName>
            <ax2117:enabled>false</ax2117:enabled>
            <ax2117:name>BasicAuthRequestPathAuthenticator</ax2117:name>
            <ax2117:valid>true</ax2117:valid>
         </ns:return>
         <ns:return xsi:type="ax2117:RequestPathAuthenticatorConfig" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <ax2117:displayName>oauth-bearer</ax2117:displayName>
            <ax2117:enabled>false</ax2117:enabled>
            <ax2117:name>OAuthRequestPathAuthenticator</ax2117:name>
            <ax2117:valid>true</ax2117:valid>
         </ns:return>
      </ns:getAllRequestPathAuthenticatorsResponse>
   </soapenv:Body>
</soapenv:Envelope>
```

  

### **getApplication** ** **

Permission Level: `           /permission/admin/manage          `

This method can be used to get the service provider information while
passing the application name. The input parameters and the format of the
request should be as follows.

  

**Input parameters**

| Parameter       | Type   | Description             |
|-----------------|--------|-------------------------|
| applicationName | String | Name of the application |

  

**Request:**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:getApplication>
         <!--Optional:-->
         <xsd:applicationName>TestSP</xsd:applicationName>
      </xsd:getApplication>
   </soapenv:Body>
</soapenv:Envelope>
```

**Response:**

``` xml
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <ns:getApplicationResponse
            xmlns:ns="http://org.apache.axis2/xsd">
            <ns:return xsi:type="ax2117:ServiceProvider"
                xmlns:ax2115="http://core.carbon.wso2.org/xsd"
                xmlns:ax2114="http://mgt.application.identity.carbon.wso2.org/xsd"
                xmlns:ax2120="http://common.application.identity.carbon.wso2.org/xsd"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xmlns:ax2117="http://model.common.application.identity.carbon.wso2.org/xsd">
                <ax2117:applicationID>4</ax2117:applicationID>
                <ax2117:applicationName>TestSP</ax2117:applicationName>
                <ax2117:claimConfig xsi:type="ax2117:ClaimConfig">...
            </ax2117:claimConfig>
                <ax2117:description>Description</ax2117:description>
                <ax2117:inboundAuthenticationConfig xsi:type="ax2117:InboundAuthenticationConfig">
            ...
            </ax2117:inboundAuthenticationConfig>
                <ax2117:localAndOutBoundAuthenticationConfig xsi:type="ax2117:LocalAndOutboundAuthenticationConfig">
            ...</ax2117:localAndOutBoundAuthenticationConfig>
                <ax2117:outboundProvisioningConfig xsi:type="ax2117:OutboundProvisioningConfig">
            ..    
            </ax2117:outboundProvisioningConfig>
                <ax2117:owner xsi:type="ax2117:User">
                ...
            </ax2117:owner>
                <ax2117:permissionAndRoleConfig xsi:type="ax2117:PermissionsAndRoleConfig"/>
                <ax2117:saasApp>true</ax2117:saasApp>
            </ns:return>
        </ns:getApplicationResponse>
    </soapenv:Body>
</soapenv:Envelope>
```

### getIdentityProvider

Permission Level: `           /permission/admin/manage          `

This method can use to get the identity provider information while
passing the identity provider name. The input parameters and the format
of the request should be as follows.

  

**Input parameters**

| Parameter        | Type   | Description                   |
|------------------|--------|-------------------------------|
| federatedIdPName | String | Name of the identity provider |

  

**Request:**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:getIdentityProvider>
         <!--Optional:-->
         <xsd:federatedIdPName>TestIdP</xsd:federatedIdPName>
      </xsd:getIdentityProvider>
   </soapenv:Body>
</soapenv:Envelope>
```

  

**Response:**

``` xml
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <ns:getIdentityProvidersResponse
            xmlns:ns="http://org.apache.axis2/xsd"
            xmlns:ax2115="http://core.carbon.wso2.org/xsd"
            xmlns:ax2114="http://mgt.application.identity.carbon.wso2.org/xsd"
            xmlns:ax2120="http://common.application.identity.carbon.wso2.org/xsd"
            xmlns:ax2117="http://model.common.application.identity.carbon.wso2.org/xsd">
            <ns:return xsi:type="ax2117:IdentityProvider"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2117:alias xsi:nil="true"/>
                <ax2117:certificate xsi:nil="true"/>
                <ax2117:claimConfig xsi:nil="true"/>
                <ax2117:defaultAuthenticatorConfig xsi:nil="true"/>
                <ax2117:defaultProvisioningConnectorConfig xsi:nil="true"/>
                <ax2117:displayName xsi:nil="true"/>
                <ax2117:enable>true</ax2117:enable>
                <ax2117:federatedAuthenticatorConfigs xsi:type="ax2117:FederatedAuthenticatorConfig">
            ...</ax2117:federatedAuthenticatorConfigs>
                <ax2117:federationHub>false</ax2117:federationHub>
                <ax2117:homeRealmId xsi:nil="true"/>
                <ax2117:identityProviderDescription xsi:nil="true"/>
                <ax2117:identityProviderName>TestIdP</ax2117:identityProviderName>
                <ax2117:justInTimeProvisioningConfig xsi:nil="true"/>
                <ax2117:permissionAndRoleConfig xsi:nil="true"/>
                <ax2117:primary>false</ax2117:primary>
                <ax2117:provisioningConnectorConfigs xsi:type="ax2117:ProvisioningConnectorConfig">...
            </ax2117:provisioningConnectorConfigs>
                <ax2117:provisioningRole xsi:nil="true"/>
            </ns:return>
        </ns:getIdentityProvidersResponse>
    </soapenv:Body>
</soapenv:Envelope>
```
