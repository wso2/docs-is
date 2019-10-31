# Using the Identity Provider API

## About the API

An Identity Provider (IdP) is responsible for issuing identification information for users who want to interact with a system. We can add and configure such identity providers and link them with WSO2 Identity Server through the Identity Provider Management Service API. 

This API is exposed as a web service and the following operations are available. 

!!! info 
    The service contract of this admin service can be found at the following URL. Update `<IS_HOST>:<IS_PORT>` with the relevant host and port number.    

    ``` tab="Format"
    https://<IS_HOST>:<IS_PORT>/services/IdentityProviderMgtService?wsdl
    ```
    
    ``` tab="Example"
    https://localhost:9443/services/IdentityProviderMgtService?wsdl
    ```  

!!! note
    
    Prior to calling any of these admin services, make them discoverable. For information on how to do this, see [Calling Admin Services](../../develop/calling-admin-services).
    
## API operations

### addIdp

<table>
  <tr>
    <th>Description</th>
    <td>To add an Identity Provider, you should add some basic Identity Provider information and configuring claims, roles, federated authenticators, just-in-time provisioning information, and outbound provisioning connectors as seen in the request below.</td>
  </tr>
  <tr>
    <th>Permissions</th>
    <td>permission/admin/manage </td>
  </tr>
  <tr>
    <th>Request</th>
    <td>See below</td>
  </tr>
  <tr>
    <th>Response</th>
    <td>See below</td>
  </tr>
</table>


??? info "Click to see request and response formats"

    ``` xml tab="Request Format"
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mgt="http://mgt.idp.carbon.wso2.org" xmlns:xsd="http://model.common.application.identity.carbon.wso2.org/xsd">
       <soapenv:Header/>
       <soapenv:Body>
          <mgt:addIdP>
             <!--Optional:-->
             <mgt:identityProvider>
                <!--Optional:-->
                <xsd:alias>?</xsd:alias>
                <!--Optional:-->
                <xsd:certificate>?</xsd:certificate>
                <!--Optional:-->
                <xsd:claimConfig>
                   ...
                </xsd:claimConfig>
                <!--Optional:-->
                <xsd:defaultAuthenticatorConfig>
                   ...
                </xsd:defaultAuthenticatorConfig>
                <!--Optional:-->
                <xsd:defaultProvisioningConnectorConfig>
                   ...
                </xsd:defaultProvisioningConnectorConfig>
                <!--Optional:-->
                <xsd:displayName>?</xsd:displayName>
                <!--Optional:-->
                <xsd:enable>?</xsd:enable>
                <!--Zero or more repetitions:-->
                <xsd:federatedAuthenticatorConfigs>
                   ...
                </xsd:federatedAuthenticatorConfigs>
                <!--Optional:-->
                <xsd:federationHub>?</xsd:federationHub>
                <!--Optional:-->
                <xsd:homeRealmId>?</xsd:homeRealmId>
                <!--Optional:-->
                <xsd:identityProviderDescription>?</xsd:identityProviderDescription>
                <!--Optional:-->
                <xsd:identityProviderName>?</xsd:identityProviderName>
                <!--Zero or more repetitions:-->
                <xsd:idpProperties>
                   ...
                </xsd:idpProperties>
                <!--Optional:-->
                <xsd:justInTimeProvisioningConfig>
                   ...
                </xsd:justInTimeProvisioningConfig>
                <!--Optional:-->
                <xsd:permissionAndRoleConfig>
                   ...
                </xsd:permissionAndRoleConfig>
                <!--Optional:-->
                <xsd:primary>?</xsd:primary>
                <!--Zero or more repetitions:-->
                <xsd:provisioningConnectorConfigs>
                   ...
                </xsd:provisioningConnectorConfigs>
                <!--Optional:-->
                <xsd:provisioningRole>?</xsd:provisioningRole>
             </mgt:identityProvider>
          </mgt:addIdP>
       </soapenv:Body>
    </soapenv:Envelope>
    ```

    ``` xml tab="Sample Request"
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mgt="http://mgt.idp.carbon.wso2.org" xmlns:xsd="http://model.common.application.identity.carbon.wso2.org/xsd">
       <soapenv:Header/>
       <soapenv:Body>
          <mgt:addIdP>
             <!--Optional:-->
             <mgt:identityProvider>
                <!--Optional:-->
                <xsd:alias>https://localhost:9443/oauth2/token</xsd:alias>
                <!--Optional:-->
                <xsd:certificate>MIICBTCCAW6gAwIBAgIEHJSJhDANBgkqhkiG9w0BAQQFADBHMREwDwYDVQQDEwh3
    c28yLmNvbTENMAsGA1UECxMETm9uZTEUMBIGA1UEChMLTm9uZSBMPU5vbmUxDTAL
    BgNVBAYTBE5vbmUwHhcNMTcxMDA5MDM0ODI1WhcNMjcxMTA2MDM0ODI1WjBHMREw
    DwYDVQQDEwh3c28yLmNvbTENMAsGA1UECxMETm9uZTEUMBIGA1UEChMLTm9uZSBM
    PU5vbmUxDTALBgNVBAYTBE5vbmUwgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGB
    AJ3FIXGHktsreizN3khqeFw/F8xb/V2lon3QyNfpwgieTFZovqrBG0SpaYT/v5yR
    GBSIcPfl6BaZ7seVjYWgXUPscNNu0v0z4Nyx5UOkUIRE6uQ0F7szHVuPgEmNDvFJ
    MLryopQ32x9ctG4N7sHruWGfiCs5ksdqz1aidViOS1bNAgMBAAEwDQYJKoZIhvcN
    AQEEBQADgYEAe0FdpjY9JLISt/ctSwwilV0zF6q8ID6NRcxAGNtCCFcunVirdxGK
    eyyFZDWGwkh2URpKHXdjU320zLS37MdB8wJR02DRGtx1/Dq5Xs+XWJqrr3F46iRK
    4hPfXwFXkRWBiIku/Ne9z2TW0Kh7z2z6rfzgZ2KazJwzmJ95bGrqc0g=</xsd:certificate>
                <!--Optional:-->
                <xsd:displayName>My IdP</xsd:displayName>
                <!--Optional:-->
                <xsd:enable>true</xsd:enable>
                <!--Optional:-->
                <xsd:federationHub>false</xsd:federationHub>
                <!--Optional:-->
                <xsd:homeRealmId>MyIdP</xsd:homeRealmId>
                <!--Optional:-->
                <xsd:identityProviderDescription>Sample IdP</xsd:identityProviderDescription>
                <!--Optional:-->
                <xsd:identityProviderName>MyIdP</xsd:identityProviderName>
             </mgt:identityProvider>
          </mgt:addIdP>
       </soapenv:Body>
    </soapenv:Envelope>
    ```

    ``` xml tab="Response Format"
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
       <soapenv:Body>
          <ns:addIdPResponse xmlns:ns="http://mgt.idp.carbon.wso2.org">
             <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
          </ns:addIdPResponse>
       </soapenv:Body>
    </soapenv:Envelope>
    ```

In addition to the basic IdP details, it is also possible to include claims configuration, role configuration, federated authenticators, just-in-time provisioning information, and outbound provisioning connectors details to the addIdp request body. It is also possible to add and update an IdP without these details.

#### Claim configuration

``` xml 
<xsd:claimConfig>
<localClaimDialect>true</localClaimDialect>
            <roleClaimURI>http://wso2.org/claims/role</roleClaimURI>
            <userClaimURI>http://wso2.org/claims/organization</userClaimURI>
</xsd:claimConfig>
```

When configuring advance claims to the custom claim dialect, the following parameters can be added to the `<claimMappings>` element. A sample `<claimMappings>` element configured with advance claim configurations is similiar to the following: 
  
``` xml
<xsd:claimConfig>
<localClaimDialect>true</localClaimDialect>
            <roleClaimURI>http://wso2.org/claims/role</roleClaimURI>
            <userClaimURI>http://wso2.org/claims/organization</userClaimURI>
<claimMappings>
    <defaultValue>defaultVal</defaultValue>
    <localClaim>
        <claimUri>http://wso2.org/claims/title</claimUri>
    </localClaim>
    <remoteClaim>
        <claimUri>Role</claimUri>
    </remoteClaim>
    <requested>true</requested>
</claimMappings>
<claimMappings>
    <defaultValue>defaultVal</defaultValue>
    <localClaim>
        <claimUri>http://wso2.org/claims/emailaddress</claimUri>
    </localClaim>
    <remoteClaim>
        <claimUri>EmailID</claimUri>
    </remoteClaim>
    <requested>true</requested>
</claimMappings>
</xsd:claimConfig>
```

#### Just-in-time (JiT) provisioning

With Just-in-Time provisioning, you can create users on the fly without having to create user accounts in advance. To configure JiT provisioning, add the following snippet to the `addIdp` request body.

``` xml
<xsd:justInTimeProvisioningConfig>
<xsd:provisioningEnabled>true</xsd:provisioningEnabled>
<xsd:provisioningUserStore>PRIMARY</xsd:provisioningUserStore>
<xsd:userStoreClaimUri>?</xsd:userStoreClaimUri>
</xsd:justInTimeProvisioningConfig>
```

#### Role configuration   

``` xml
<permissionAndRoleConfig xmlns="http://model.common.application.identity.carbon.wso2.org/xsd">
               <idpRoles>IDPRole</idpRoles>
               <roleMappings>
                  <localRole>
                     <localRoleName>Role1</localRoleName>
                  </localRole>
                  <remoteRole>IDPRole</remoteRole>
               </roleMappings>
</permissionAndRoleConfig>
```

- **Federated authenticator**: The `          <federatedAuthenticatorConfigs>         ` parameter can be used to configure zero or more federated authenticators. For sample
federated authenticator configurations, see [Federated Authenticator Configuration Samples](../../develop/identity-provider-configurations-used-with-apis#federated-authenticator-configuration-samples).

- **Outbound provisioning connectors**: The `         <provisioningConnectorConfigs>        ` parameter can be used to configure zero or more outbound provisioning connectors. For
sample outbound provisioning connector configurations, see [Outbound Provisioning Connectors Configuration Samples.](../../develop/identity-provider-configurations-used-with-apis#outbound-provisioning-connector-configuration-samples).   

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
          <td><p>enabled</p></td>
          <td><p>boolean</p></td>
          <td><p>Set 'true' to enable the provisioning connector.</p></td>
        </tr>
        <tr class="even">
          <td><p>name</p></td>
          <td><p>String</p></td>
          <td><p>Name of the connector.</p></td>
        </tr>
        <tr class="odd">
          <td><p>provisioningProperties</p></td>
          <td><p>Property</p></td>
          <td>
            <p>Zero or more properties related to the connector.</p>
            <p>Attributes of the property are similar to properties mentioned in Federated Authenticators Configuration.</p>
            <p>Contains: confidential, defaultValue, description, displayName, name, required, type value.</p>
          </td>
        </tr>
      </tbody>
    </table>   

### deleteIdp

<table>
  <tr>
    <th>Description</th>
    <td>To delete an identity provider, call the <code>deleteIdp()</code> operation. The IdP name should be included in the request.</td>
  </tr>
  <tr>
    <th>Permissions</th>
    <td>/permission/admin/manage</td>
  </tr>
  <tr>
    <th>Request</th>
    <td><div style="width: 100%; display: block; overflow: auto;">
            <pre><code>&lt;soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:mgt="http://mgt.idp.carbon.wso2.org"&lt;
  &lt;soapenv:Header/&lt;
  &lt;soapenv:Body&lt;
      &lt;mgt:deleteIdP&lt;
          &lt;!--Optional:--&lt;
          &lt;mgt:idPName&lt;TestIDP&lt;/mgt:idPName&lt;
      &lt;/mgt:deleteIdP&lt;
  &lt;/soapenv:Body&lt;
&lt;/soapenv:Envelope&gt;</code></pre>
  </td>
  </tr>
  <tr>
    <th>Response</th>
    <td>None</td>
  </tr>
</table>

 
### getAllFederatedAuthenticators

<table>
  <tr>
    <th>Description</th>
    <td>The <code>getAllFederatedAuthenticators()</code> operation returns a detailed list of available federated authenticators in WSO2 Identity Server.</td>
  </tr>
  <tr>
    <th>Permissions</th>
    <td>/permission/admin/manage</td>
  </tr>
  <tr>
    <th>Request</th>
            <td>
              <div style="width: 100%; display: block; overflow: auto;">
            <pre><code>&lt;soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:mgt="http://mgt.idp.carbon.wso2.org"&gt;
  &lt;soapenv:Header/&gt;
  &lt;soapenv:Body&gt;
      &lt;mgt:getAllFederatedAuthenticators/&gt;
    &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
          </div>
      </td>
  </tr>
  <tr>
      <th>Response</th>
      <td>See below</td>
  </tr>
</table>


??? info "Click to view the response format"

    ``` xml tab="Response Format"
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
       <soapenv:Body>
          <ns:getAllFederatedAuthenticatorsResponse xmlns:ns="http://mgt.idp.carbon.wso2.org" xmlns:ax2392="http://model.common.application.identity.carbon.wso2.org/xsd" xmlns:ax2390="http://common.application.identity.carbon.wso2.org/xsd">
             <ns:return xsi:type="ax2392:FederatedAuthenticatorConfig" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2392:displayName>facebook</ax2392:displayName>
                <ax2392:enabled>false</ax2392:enabled>
                <ax2392:name>FacebookAuthenticator</ax2392:name>
                <ax2392:valid>true</ax2392:valid>
             </ns:return>
             <ns:return xsi:type="ax2392:FederatedAuthenticatorConfig" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2392:displayName>openidconnect</ax2392:displayName>
                <ax2392:enabled>false</ax2392:enabled>
                <ax2392:name>OpenIDConnectAuthenticator</ax2392:name>
                <ax2392:valid>true</ax2392:valid>
             </ns:return>
             <ns:return xsi:type="ax2392:FederatedAuthenticatorConfig" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2392:displayName>microsoft(hotmail, msn, live)</ax2392:displayName>
                <ax2392:enabled>false</ax2392:enabled>
                <ax2392:name>MicrosoftWindowsLive</ax2392:name>
                <ax2392:properties xsi:type="ax2392:Property">
                   <ax2392:confidential>true</ax2392:confidential>
                   <ax2392:defaultValue xsi:nil="true"/>
                   <ax2392:description>Enter Microsoft Live client secret value</ax2392:description>
                   <ax2392:displayName>Client Secret</ax2392:displayName>
                   <ax2392:name>ClientSecret</ax2392:name>
                   <ax2392:required>true</ax2392:required>
                   <ax2392:type xsi:nil="true"/>
                   <ax2392:value xsi:nil="true"/>
                </ax2392:properties>
                <ax2392:properties xsi:type="ax2392:Property">
                   <ax2392:confidential>false</ax2392:confidential>
                   <ax2392:defaultValue xsi:nil="true"/>
                   <ax2392:description>Enter value corresponding to callback url.</ax2392:description>
                   <ax2392:displayName>Callback Url</ax2392:displayName>
                   <ax2392:name>windows-live-callback-url</ax2392:name>
                   <ax2392:required>true</ax2392:required>
                   <ax2392:type xsi:nil="true"/>
                   <ax2392:value xsi:nil="true"/>
                </ax2392:properties>
                <ax2392:properties xsi:type="ax2392:Property">
                   <ax2392:confidential>false</ax2392:confidential>
                   <ax2392:defaultValue xsi:nil="true"/>
                   <ax2392:description>Enter Microsoft Live client identifier value</ax2392:description>
                   <ax2392:displayName>Client Id</ax2392:displayName>
                   <ax2392:name>ClientId</ax2392:name>
                   <ax2392:required>true</ax2392:required>
                   <ax2392:type xsi:nil="true"/>
                   <ax2392:value xsi:nil="true"/>
                </ax2392:properties>
                <ax2392:valid>true</ax2392:valid>
             </ns:return>
             <ns:return xsi:type="ax2392:FederatedAuthenticatorConfig" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2392:displayName>openid</ax2392:displayName>
                <ax2392:enabled>false</ax2392:enabled>
                <ax2392:name>OpenIDAuthenticator</ax2392:name>
                <ax2392:valid>true</ax2392:valid>
             </ns:return>
             <ns:return xsi:type="ax2392:FederatedAuthenticatorConfig" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2392:displayName>google</ax2392:displayName>
                <ax2392:enabled>false</ax2392:enabled>
                <ax2392:name>GoogleOpenIDAuthenticator</ax2392:name>
                <ax2392:valid>true</ax2392:valid>
             </ns:return>
             <ns:return xsi:type="ax2392:FederatedAuthenticatorConfig" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2392:displayName>yahoo</ax2392:displayName>
                <ax2392:enabled>false</ax2392:enabled>
                <ax2392:name>YahooOpenIDAuthenticator</ax2392:name>
                <ax2392:valid>true</ax2392:valid>
             </ns:return>
             <ns:return xsi:type="ax2392:FederatedAuthenticatorConfig" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2392:displayName>samlsso</ax2392:displayName>
                <ax2392:enabled>false</ax2392:enabled>
                <ax2392:name>SAMLSSOAuthenticator</ax2392:name>
                <ax2392:valid>true</ax2392:valid>
             </ns:return>
          </ns:getAllFederatedAuthenticatorsResponse>
       </soapenv:Body>
    </soapenv:Envelope>
    ```

### getAllIdPs

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>Use the <code>getAlIdPs()</code> operation to obtain a detailed list of Identity Providers registered in WSO2 Identity Server.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin/login</td>  
        </tr>        
        <tr>
            <th>Request</th>
            <td>
              <div style="width: 100%; display: block; overflow: auto;">
            <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mgt="http://mgt.idp.carbon.wso2.org"&gt;
 &lt;soapenv:Header/&gt;
 &lt;soapenv:Body&gt;
    &lt;mgt:getAllIdPs/&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
          </div>
      </td>
        </tr>
        <tr>
            <th>Response</th>
            <td>
              <div style="width: 100%; display: block; overflow: auto;">
            <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"&gt;
 &lt;soapenv:Body&gt;
    &lt;ns:getAllIdPsResponse xmlns:ns="http://mgt.idp.carbon.wso2.org" xmlns:ax2392="http://model.common.application.identity.carbon.wso2.org/xsd" xmlns:ax2390="http://common.application.identity.carbon.wso2.org/xsd"&gt;
       &lt;ns:return xsi:type="ax2392:IdentityProvider" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"&gt;
          &lt;ax2392:alias xsi:nil="true"/&gt;
          &lt;ax2392:certificate xsi:nil="true"/&gt;
          &lt;ax2392:claimConfig xsi:type="ax2392:ClaimConfig"&gt;
             &lt;ax2392:alwaysSendMappedLocalSubjectId&gt;false&lt;/ax2392:alwaysSendMappedLocalSubjectId&gt;
             &lt;ax2392:localClaimDialect&gt;true&lt;/ax2392:localClaimDialect&gt;
             &lt;ax2392:roleClaimURI xsi:nil="true"/&gt;
             &lt;ax2392:userClaimURI xsi:nil="true"/&gt;
          &lt;/ax2392:claimConfig&gt;
          &lt;ax2392:defaultAuthenticatorConfig xsi:nil="true"/&gt;
          &lt;ax2392:defaultProvisioningConnectorConfig xsi:nil="true"/&gt;
          &lt;ax2392:displayName xsi:nil="true"/&gt;
          &lt;ax2392:enable>true&lt;/ax2392:enable&gt;
          &lt;ax2392:federationHub&gt;false&lt;/ax2392:federationHub&gt;
          &lt;ax2392:homeRealmId xsi:nil="true"/&gt;
          &lt;ax2392:identityProviderDescription xsi:nil="true"/&gt;
          &lt;ax2392:identityProviderName&gt;TestIdP&lt;/ax2392:identityProviderName&gt;
          &lt;ax2392:justInTimeProvisioningConfig xsi:nil="true"/&gt;
          &lt;ax2392:permissionAndRoleConfig xsi:nil="true"/&gt;
          &lt;ax2392:primary>false&lt;/ax2392:primary&gt;
          &lt;ax2392:provisioningRole xsi:nil="true"/&gt;
       &lt;/ns:return&gt;
    &lt;/ns:getAllIdPsResponse&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
          </div>
            </td>
        </tr>
    </tbody>    
</table> 


### getAllLocalClaimURIs

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>Use the <code>getAlILocalClaimUris()</code> operation to obtain a list of local claim URIs available in WSO2 Identity Server.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin/manage</td>  
        </tr>        
        <tr>
            <th>Request</th>
            <td>
              <div style="width: 100%; display: block; overflow: auto;">
            <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mgt="http://mgt.idp.carbon.wso2.org"&gt;
 &lt;soapenv:Header/&gt;
 &lt;soapenv:Body&gt;
    &lt;mgt:getAllLocalClaimUris/&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
          </div>
      </td>
        </tr>
        <tr>
            <th>Response</th>
            <td>
              <div style="width: 100%; display: block; overflow: auto;">
            <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"&gt;
 &lt;soapenv:Body&gt;
    &lt;ns:getAllLocalClaimUrisResponse xmlns:ns="http://mgt.idp.carbon.wso2.org" xmlns:ax2392="http://model.common.application.identity.carbon.wso2.org/xsd" xmlns:ax2390="http://common.application.identity.carbon.wso2.org/xsd"&gt;
       &lt;ns:return&gt;http://wso2.org/claims/otherphone&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/dob&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/primaryChallengeQuestion&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/role&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/challengeQuestion1&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/telephone&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/mobile&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/country&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/challengeQuestionUris&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/postalcode&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/challengeQuestion2&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/identity/accountLocked&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/nickname&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/streetaddress&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/url&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/givenname&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/emailaddress&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/oneTimePassword&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/region&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/gender&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/fullname&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/passwordTimestamp&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/title&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/locality&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/stateorprovince&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/im&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/organization&lt;/ns:return&gt;
       &lt;ns:return&gt;http://wso2.org/claims/lastname&lt;/ns:return&gt;
    &lt;/ns:getAllLocalClaimUrisResponse&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
          </div>
            </td>
        </tr>
    </tbody>    
</table>

### getAllProvisioningConnectors

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>Use the <code>getAlIProvisioningConnectors()</code> operation to obtain a detailed list of Outbound Provisioning Connectors available in WSO2 Identity Server.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin/manage</td>  
        </tr>        
        <tr>
            <th>Request</th>
            <td>
              <div style="width: 100%; display: block; overflow: auto;">
            <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mgt="http://mgt.idp.carbon.wso2.org"&gt;
 &lt;soapenv:Header/&gt;
 &lt;soapenv:Body&gt;
    &lt;mgt:getAllProvisioningConnectors/&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
          </div>
      </td>
        </tr>
        <tr>
            <th>Response</th>
            <td>
              <div style="width: 100%; display: block; overflow: auto;">
            <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"&gt;
 &lt;soapenv:Body&gt;
    &lt;ns:getAllProvisioningConnectorsResponse xmlns:ns="http://mgt.idp.carbon.wso2.org" xmlns:ax2392="http://model.common.application.identity.carbon.wso2.org/xsd" xmlns:ax2390="http://common.application.identity.carbon.wso2.org/xsd"&gt;
       &lt;ns:return xsi:type="ax2392:ProvisioningConnectorConfig" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"&gt;
          &lt;ax2392:blocking&gt;false&lt;/ax2392:blocking&gt;
          &lt;ax2392:enabled&gt;false&lt;/ax2392:enabled&gt;
          &lt;ax2392:name&gt;googleapps&lt;/ax2392:name&gt;
          &lt;ax2392:valid&gt;false&lt;/ax2392:valid&gt;
       &lt;/ns:return&gt;
       &lt;ns:return xsi:type="ax2392:ProvisioningConnectorConfig" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"&gt;
          &lt;ax2392:blocking&gt;false&lt;/ax2392:blocking&gt;
          &lt;ax2392:enabled&gt;false&lt;/ax2392:enabled&gt;
          &lt;ax2392:name&gt;salesforce&lt;/ax2392:name&gt;
          &lt;ax2392:valid&gt;false&lt;/ax2392:valid&gt;
       &lt;/ns:return&gt;
       &lt;ns:return xsi:type="ax2392:ProvisioningConnectorConfig" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"&gt;
          &lt;ax2392:blocking&gt;false&lt;/ax2392:blocking&gt;
          &lt;ax2392:enabled&gt;false&lt;/ax2392:enabled&gt;
          &lt;ax2392:name&gt;scim&lt;/ax2392:name&gt;
          &lt;ax2392:valid&gt;false&lt;/ax2392:valid&gt;
       &lt;/ns:return&gt;
       &lt;ns:return xsi:type="ax2392:ProvisioningConnectorConfig" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"&gt;
          &lt;ax2392:blocking&gt;false&lt;/ax2392:blocking&gt;
          &lt;ax2392:enabled&gt;false&lt;/ax2392:enabled&gt;
          &lt;ax2392:name&gt;spml&lt;/ax2392:name&gt;
          &lt;ax2392:vali&gt;>false&lt;/ax2392:valid&gt;
       &lt;/ns:return&gt;
    &lt;/ns:getAllProvisioningConnectorsResponse&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
          </div>
            </td>
        </tr>
    </tbody>    
</table>


### getEnabledAllIdPs

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>Use the <code>getEnabledAllIdPs()</code> operation to obtain a detailed list of IdPs which are enabled in WSO2 Identity Server.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin/manage</td>  
        </tr>        
        <tr>
            <th>Request</th>
            <td>
              <div style="width: 100%; display: block; overflow: auto;">
            <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mgt="http://mgt.idp.carbon.wso2.org"&gt;
 &lt;soapenv:Header/&gt;
 &lt;soapenv:Body&gt;
    &lt;mgt:getEnabledAllIdPs/&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
          </div>
      </td>
        </tr>
        <tr>
            <th>Response</th>
            <td>
              <div style="width: 100%; display: block; overflow: auto;">
            <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"&gt;
 &lt;soapenv:Body&gt;
    &lt;ns:getEnabledAllIdPsResponse xmlns:ns="http://mgt.idp.carbon.wso2.org" xmlns:ax2392="http://model.common.application.identity.carbon.wso2.org/xsd" xmlns:ax2390="http://common.application.identity.carbon.wso2.org/xsd"&gt;
       &lt;ns:return xsi:type="ax2392:IdentityProvider" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"&gt;
          &lt;ax2392:alias xsi:nil="true"/&gt;
          &lt;ax2392:certificate xsi:nil="true"/&gt;
          &lt;ax2392:claimConfig xsi:nil="true"/&gt;
          &lt;ax2392:defaultAuthenticatorConfig xsi:nil="true"/&gt;
          &lt;ax2392:defaultProvisioningConnectorConfig xsi:nil="true"/&gt;
          &lt;ax2392:displayName xsi:nil="true"/&gt;
          &lt;ax2392:enable>true&lt;/ax2392:enable&gt;
          &lt;ax2392:federationHub&gt;false&lt;/ax2392:federationHub&gt;
          &lt;ax2392:homeRealmId xsi:nil="true"/&gt;
          &lt;ax2392:identityProviderDescription xsi:nil="true"/&gt;
          &lt;ax2392:identityProviderName&gt;TestIdP&lt;/ax2392:identityProviderName&gt;
          &lt;ax2392:justInTimeProvisioningConfig xsi:nil="true"/&gt;
          &lt;ax2392:permissionAndRoleConfig xsi:nil="true"/&gt;
          &lt;ax2392:primary&gt;false&lt;/ax2392:primary&gt;
          &lt;ax2392:provisioningRole xsi:nil="true"/&gt;
       &lt;/ns:return&gt;
    &lt;/ns:getEnabledAllIdPsResponse&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
          </div>
            </td>
        </tr>
    </tbody>    
</table>


### getIdPByName

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>Use the <code>getIdPByName</code> operation to retrieve an identity provider by including the IdP name in the request.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin/manage</td>  
        </tr>        
        <tr>
            <th>Request</th>
            <td>
              <div style="width: 100%; display: block; overflow: auto;">
            <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mgt="http://mgt.idp.carbon.wso2.org"&gt;
 &lt;soapenv:Header/&gt;
 &lt;soapenv:Body&gt;
    &lt;mgt:getIdPByName&gt;
       &lt;!--Optional:--&gt;
       &lt;mgt:idPName&gt;TestIdP&lt;/mgt:idPName>
    &lt;/mgt:getIdPByName&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
          </div>
      </td>
        </tr>
        <tr>
            <th>Response</th>
            <td>See below</td>
        </tr>
    </tbody>    
</table>

??? info "Click to view the response format" 

    ``` xml tab="Response Format"
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
       <soapenv:Body>
          <ns:getIdPByNameResponse xmlns:ns="http://mgt.idp.carbon.wso2.org">
             <ns:return xsi:type="ax2392:IdentityProvider" xmlns:ax2392="http://model.common.application.identity.carbon.wso2.org/xsd" xmlns:ax2390="http://common.application.identity.carbon.wso2.org/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2392:alias>https://localhost:9443/oauth2/token/</ax2392:alias>
                <ax2392:certificate xsi:nil="true"/>
                <ax2392:claimConfig xsi:type="ax2392:ClaimConfig">
                   <ax2392:alwaysSendMappedLocalSubjectId>false</ax2392:alwaysSendMappedLocalSubjectId>
                   <ax2392:localClaimDialect>true</ax2392:localClaimDialect>
                   <ax2392:roleClaimURI>http://wso2.org/claims/role</ax2392:roleClaimURI>
                   <ax2392:userClaimURI>http://wso2.org/claims/organization</ax2392:userClaimURI>
                </ax2392:claimConfig>
                <ax2392:defaultAuthenticatorConfig xsi:nil="true"/>
                <ax2392:defaultProvisioningConnectorConfig xsi:nil="true"/>
                <ax2392:displayName xsi:nil="true"/>
                <ax2392:enable>true</ax2392:enable>
                <ax2392:federatedAuthenticatorConfigs xsi:type="ax2392:FederatedAuthenticatorConfig">
                   <ax2392:displayName>yahoo</ax2392:displayName>
                   <ax2392:enabled>false</ax2392:enabled>
                   <ax2392:name>YahooOpenIDAuthenticator</ax2392:name>
                   <ax2392:valid>true</ax2392:valid>
                </ax2392:federatedAuthenticatorConfigs>
                <ax2392:federatedAuthenticatorConfigs xsi:type="ax2392:FederatedAuthenticatorConfig">
                   <ax2392:displayName>openid</ax2392:displayName>
                   <ax2392:enabled>false</ax2392:enabled>
                   <ax2392:name>OpenIDAuthenticator</ax2392:name>
                   <ax2392:properties xsi:type="ax2392:Property">
                      <ax2392:confidential>false</ax2392:confidential>
                      <ax2392:defaultValue xsi:nil="true"/>
                      <ax2392:description xsi:nil="true"/>
                      <ax2392:displayName xsi:nil="true"/>
                      <ax2392:name>commonAuthQueryParams</ax2392:name>
                      <ax2392:required>false</ax2392:required>
                      <ax2392:type xsi:nil="true"/>
                      <ax2392:value xsi:nil="true"/>
                   </ax2392:properties>
                   <ax2392:properties xsi:type="ax2392:Property">
                      <ax2392:confidential>false</ax2392:confidential>
                      <ax2392:defaultValue xsi:nil="true"/>
                      <ax2392:description xsi:nil="true"/>
                      <ax2392:displayName xsi:nil="true"/>
                      <ax2392:name>IsUserIdInClaims</ax2392:name>
                      <ax2392:required>false</ax2392:required>
                      <ax2392:type xsi:nil="true"/>
                      <ax2392:value>false</ax2392:value>
                   </ax2392:properties>
                   <ax2392:properties xsi:type="ax2392:Property">
                      <ax2392:confidential>false</ax2392:confidential>
                      <ax2392:defaultValue xsi:nil="true"/>
                      <ax2392:description xsi:nil="true"/>
                      <ax2392:displayName xsi:nil="true"/>
                      <ax2392:name>RealmId</ax2392:name>
                      <ax2392:required>false</ax2392:required>
                      <ax2392:type xsi:nil="true"/>
                      <ax2392:value xsi:nil="true"/>
                   </ax2392:properties>
                   <ax2392:properties xsi:type="ax2392:Property">
                      <ax2392:confidential>false</ax2392:confidential>
                      <ax2392:defaultValue xsi:nil="true"/>
                      <ax2392:description xsi:nil="true"/>
                      <ax2392:displayName xsi:nil="true"/>
                      <ax2392:name>OpenIdUrl</ax2392:name>
                      <ax2392:required>false</ax2392:required>
                      <ax2392:type xsi:nil="true"/>
                      <ax2392:value>https://localhost:9443/openid/</ax2392:value>
                   </ax2392:properties>
                   <ax2392:valid>true</ax2392:valid>
                </ax2392:federatedAuthenticatorConfigs>
                <ax2392:federatedAuthenticatorConfigs xsi:type="ax2392:FederatedAuthenticatorConfig">
                   <ax2392:displayName>passivests</ax2392:displayName>
                   <ax2392:enabled>false</ax2392:enabled>
                   <ax2392:name>PassiveSTSAuthenticator</ax2392:name>
                   <ax2392:properties xsi:type="ax2392:Property">
                      <ax2392:confidential>false</ax2392:confidential>
                      <ax2392:defaultValue xsi:nil="true"/>
                      <ax2392:description xsi:nil="true"/>
                      <ax2392:displayName xsi:nil="true"/>
                      <ax2392:name>commonAuthQueryParams</ax2392:name>
                      <ax2392:required>false</ax2392:required>
                      <ax2392:type xsi:nil="true"/>
                      <ax2392:value xsi:nil="true"/>
                   </ax2392:properties>
                   <ax2392:properties xsi:type="ax2392:Property">
                      <ax2392:confidential>false</ax2392:confidential>
                      <ax2392:defaultValue xsi:nil="true"/>
                      <ax2392:description xsi:nil="true"/>
                      <ax2392:displayName xsi:nil="true"/>
                      <ax2392:name>IsUserIdInClaims</ax2392:name>
                      <ax2392:required>false</ax2392:required>
                      <ax2392:type xsi:nil="true"/>
                      <ax2392:value>false</ax2392:value>
                   </ax2392:properties>
                   <ax2392:properties xsi:type="ax2392:Property">
                      <ax2392:confidential>false</ax2392:confidential>
                      <ax2392:defaultValue xsi:nil="true"/>
                      <ax2392:description xsi:nil="true"/>
                      <ax2392:displayName xsi:nil="true"/>
                      <ax2392:name>RealmId</ax2392:name>
                      <ax2392:required>false</ax2392:required>
                      <ax2392:type xsi:nil="true"/>
                      <ax2392:value xsi:nil="true"/>
                   </ax2392:properties>
                   <ax2392:properties xsi:type="ax2392:Property">
                      <ax2392:confidential>false</ax2392:confidential>
                      <ax2392:defaultValue xsi:nil="true"/>
                      <ax2392:description xsi:nil="true"/>
                      <ax2392:displayName xsi:nil="true"/>
                      <ax2392:name>PassiveSTSUrl</ax2392:name>
                      <ax2392:required>false</ax2392:required>
                      <ax2392:type xsi:nil="true"/>
                      <ax2392:value>https://localhost:9443/passivests/</ax2392:value>
                   </ax2392:properties>
                   <ax2392:valid>true</ax2392:valid>
                </ax2392:federatedAuthenticatorConfigs>
                <ax2392:federatedAuthenticatorConfigs xsi:type="ax2392:FederatedAuthenticatorConfig">
                   <ax2392:displayName>google</ax2392:displayName>
                   <ax2392:enabled>false</ax2392:enabled>
                   <ax2392:name>GoogleOpenIDAuthenticator</ax2392:name>
                   <ax2392:valid>true</ax2392:valid>
                </ax2392:federatedAuthenticatorConfigs>
                <ax2392:federatedAuthenticatorConfigs xsi:type="ax2392:FederatedAuthenticatorConfig">
                   <ax2392:displayName>microsoft(hotmail,</ax2392:displayName>
                   <ax2392:enabled>false</ax2392:enabled>
                   <ax2392:name>MicrosoftWindowsLive</ax2392:name>
                   <ax2392:properties xsi:type="ax2392:Property">
                      <ax2392:confidential>false</ax2392:confidential>
                      <ax2392:defaultValue xsi:nil="true"/>
                      <ax2392:description xsi:nil="true"/>
                      <ax2392:displayName xsi:nil="true"/>
                      <ax2392:name>ClientSecret</ax2392:name>
                      <ax2392:required>false</ax2392:required>
                      <ax2392:type xsi:nil="true"/>
                      <ax2392:value/>
                   </ax2392:properties>
                   <ax2392:properties xsi:type="ax2392:Property">
                      <ax2392:confidential>false</ax2392:confidential>
                      <ax2392:defaultValue xsi:nil="true"/>
                      <ax2392:description xsi:nil="true"/>
                      <ax2392:displayName xsi:nil="true"/>
                      <ax2392:name>windows-live-callback-url</ax2392:name>
                      <ax2392:required>false</ax2392:required>
                      <ax2392:type xsi:nil="true"/>
                      <ax2392:value/>
                   </ax2392:properties>
                   <ax2392:properties xsi:type="ax2392:Property">
                      <ax2392:confidential>false</ax2392:confidential>
                      <ax2392:defaultValue xsi:nil="true"/>
                      <ax2392:description xsi:nil="true"/>
                      <ax2392:displayName xsi:nil="true"/>
                      <ax2392:name>ClientId</ax2392:name>
                      <ax2392:required>false</ax2392:required>
                      <ax2392:type xsi:nil="true"/>
                      <ax2392:value/>
                   </ax2392:properties>
                   <ax2392:valid>true</ax2392:valid>
                </ax2392:federatedAuthenticatorConfigs>
                <ax2392:federationHub>false</ax2392:federationHub>
                <ax2392:homeRealmId xsi:nil="true"/>
                <ax2392:identityProviderDescription xsi:nil="true"/>
                <ax2392:identityProviderName>TestIdP</ax2392:identityProviderName>
                <ax2392:justInTimeProvisioningConfig xsi:type="ax2392:JustInTimeProvisioningConfig">
                   <ax2392:provisioningEnabled>false</ax2392:provisioningEnabled>
                   <ax2392:provisioningUserStore xsi:nil="true"/>
                   <ax2392:userStoreClaimUri xsi:nil="true"/>
                </ax2392:justInTimeProvisioningConfig>
                <ax2392:permissionAndRoleConfig xsi:type="ax2392:PermissionsAndRoleConfig">
                   <ax2392:idpRoles>IDPRole1</ax2392:idpRoles>
                   <ax2392:roleMappings xsi:type="ax2392:RoleMapping">
                      <ax2392:localRole xsi:type="ax2392:LocalRole">
                         <ax2392:localRoleName>Role1</ax2392:localRoleName>
                         <ax2392:userStoreId xsi:nil="true"/>
                      </ax2392:localRole>
                      <ax2392:remoteRole>IDPRole1</ax2392:remoteRole>
                   </ax2392:roleMappings>
                </ax2392:permissionAndRoleConfig>
                <ax2392:primary>false</ax2392:primary>
                <ax2392:provisioningRole>IDPRole1, IDPRole2</ax2392:provisioningRole>
             </ns:return>
          </ns:getIdPByNameResponse>
       </soapenv:Body>
    </soapenv:Envelope>
    ```

### getResidentIdP

<table>
    <tbody>                
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin/manage</td>  
        </tr>        
        <tr>
            <th>Request</th>
            <td>
              <div style="width: 100%; display: block; overflow: auto;">
            <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mgt="http://mgt.idp.carbon.wso2.org"&gt;
 &lt;soapenv:Header/&gt;
 &lt;soapenv:Body&gt;
    &lt;mgt:getResidentIdP/&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
          </div>
      </td>
        </tr>
        <tr>
            <th>Response</th>
            <td>See below</td>
        </tr>
    </tbody>    
</table>


??? info "Click to view the response format"

    ``` xml tab="Response Format"
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
       <soapenv:Body>
          <ns:getResidentIdPResponse xmlns:ns="http://mgt.idp.carbon.wso2.org">
             <ns:return xsi:type="ax2392:IdentityProvider" xmlns:ax2392="http://model.common.application.identity.carbon.wso2.org/xsd" xmlns:ax2390="http://common.application.identity.carbon.wso2.org/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2392:alias xsi:nil="true"/>
                <ax2392:certificate>MIICNTCCAZ6gAwIBAgIES343gjANBgkqhkiG9w0BAQUFADBVMQswCQYDVQQGEwJVUzELMAkGA1UECAwCQ0ExFjAUBgNVBAcMDU1vdW50YWluIFZpZXcxDTALBgNVBAoMBFdTTzIxEjAQBgNVBAMMCWxvY2FsaG9zdDAeFw0xMDAyMTkwNzAyMjZaFw0zNTAyMTMwNzAyMjZaMFUxCzAJBgNVBAYTAlVTMQswCQYDVQQIDAJDQTEWMBQGA1UEBwwNTW91bnRhaW4gVmlldzENMAsGA1UECgwEV1NPMjESMBAGA1UEAwwJbG9jYWxob3N0MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUp/oV1vWc8/TkQSiAvTousMzOM4asB2iltr2QKozni5aVFu818MpOLZIr8LMnTzWllJvvaA5RAAdpbECb+48FjbBe0hseUdN5HpwvnH/DW8ZccGvk53I6Orq7hLCv1ZHtuOCokghz/ATrhyPq+QktMfXnRS4HrKGJTzxaCcU7OQIDAQABoxIwEDAOBgNVHQ8BAf8EBAMCBPAwDQYJKoZIhvcNAQEFBQADgYEAW5wPR7cr1LAdq+IrR44iQlRG5ITCZXY9hI0PygLP2rHANh+PYfTmxbuOnykNGyhM6FjFLbW2uZHQTY1jMrPprjOrmyK5sjJRO4d1DeGHT/YnIjs9JogRKv4XHECwLtIVdAbIdWHEtVZJyMSktcyysFcvuhPQK8Qc/E/Wq8uHSCo=</ax2392:certificate>
                <ax2392:claimConfig xsi:type="ax2392:ClaimConfig">
                   <ax2392:alwaysSendMappedLocalSubjectId>false</ax2392:alwaysSendMappedLocalSubjectId>
                   <ax2392:localClaimDialect>false</ax2392:localClaimDialect>
                   <ax2392:roleClaimURI xsi:nil="true"/>
                   <ax2392:userClaimURI xsi:nil="true"/>
                </ax2392:claimConfig>
                <ax2392:defaultAuthenticatorConfig xsi:nil="true"/>
                <ax2392:defaultProvisioningConnectorConfig xsi:nil="true"/>
                <ax2392:displayName xsi:nil="true"/>
                <ax2392:enable>true</ax2392:enable>
                <ax2392:federatedAuthenticatorConfigs xsi:type="ax2392:FederatedAuthenticatorConfig">
                   <ax2392:displayName xsi:nil="true"/>
                   <ax2392:enabled>false</ax2392:enabled>
                   <ax2392:name>openidconnect</ax2392:name>
                   <ax2392:properties xsi:type="ax2392:Property">
                      <ax2392:confidential>false</ax2392:confidential>
                      <ax2392:defaultValue xsi:nil="true"/>
                      <ax2392:description xsi:nil="true"/>
                      <ax2392:displayName xsi:nil="true"/>
                      <ax2392:name>OAUTH2TokenUrl</ax2392:name>
                      <ax2392:required>false</ax2392:required>
                      <ax2392:type xsi:nil="true"/>
                      <ax2392:value>https://localhost:9443/oauth2/token</ax2392:value>
                   </ax2392:properties>
                   <ax2392:properties xsi:type="ax2392:Property">
                      <ax2392:confidential>false</ax2392:confidential>
                      <ax2392:defaultValue xsi:nil="true"/>
                      <ax2392:description xsi:nil="true"/>
                      <ax2392:displayName xsi:nil="true"/>
                      <ax2392:name>UserInfoUrl</ax2392:name>
                      <ax2392:required>false</ax2392:required>
                      <ax2392:type xsi:nil="true"/>
                      <ax2392:value>https://localhost:9443/oauth2/userinfo</ax2392:value>
                   </ax2392:properties>
                   <ax2392:properties xsi:type="ax2392:Property">
                      <ax2392:confidential>false</ax2392:confidential>
                      <ax2392:defaultValue xsi:nil="true"/>
                      <ax2392:description xsi:nil="true"/>
                      <ax2392:displayName xsi:nil="true"/>
                      <ax2392:name>OAuth2AuthzUrl</ax2392:name>
                      <ax2392:required>false</ax2392:required>
                      <ax2392:type xsi:nil="true"/>
                      <ax2392:value>https://localhost:9443/oauth2/authz</ax2392:value>
                   </ax2392:properties>
                   <ax2392:valid>true</ax2392:valid>
                </ax2392:federatedAuthenticatorConfigs>
                <ax2392:federatedAuthenticatorConfigs xsi:type="ax2392:FederatedAuthenticatorConfig">
                   <ax2392:displayName xsi:nil="true"/>
                   <ax2392:enabled>true</ax2392:enabled>
                   <ax2392:name>samlsso</ax2392:name>
                   <ax2392:properties xsi:type="ax2392:Property">
                      <ax2392:confidential>false</ax2392:confidential>
                      <ax2392:defaultValue xsi:nil="true"/>
                      <ax2392:description xsi:nil="true"/>
                      <ax2392:displayName xsi:nil="true"/>
                      <ax2392:name>LogoutReqUrl</ax2392:name>
                      <ax2392:required>false</ax2392:required>
                      <ax2392:type xsi:nil="true"/>
                      <ax2392:value>https://localhost:9443/samlsso</ax2392:value>
                   </ax2392:properties>
                   <ax2392:properties xsi:type="ax2392:Property">
                      <ax2392:confidential>false</ax2392:confidential>
                      <ax2392:defaultValue xsi:nil="true"/>
                      <ax2392:description xsi:nil="true"/>
                      <ax2392:displayName xsi:nil="true"/>
                      <ax2392:name>IdPEntityId</ax2392:name>
                      <ax2392:required>false</ax2392:required>
                      <ax2392:type xsi:nil="true"/>
                      <ax2392:value>localhost</ax2392:value>
                   </ax2392:properties>
                   <ax2392:properties xsi:type="ax2392:Property">
                      <ax2392:confidential>false</ax2392:confidential>
                      <ax2392:defaultValue xsi:nil="true"/>
                      <ax2392:description xsi:nil="true"/>
                      <ax2392:displayName xsi:nil="true"/>
                      <ax2392:name>SSOUrl</ax2392:name>
                      <ax2392:required>false</ax2392:required>
                      <ax2392:type xsi:nil="true"/>
                      <ax2392:value>https://localhost:9443/samlsso</ax2392:value>
                   </ax2392:properties>
                   <ax2392:valid>true</ax2392:valid>
                </ax2392:federatedAuthenticatorConfigs>
                <ax2392:federatedAuthenticatorConfigs xsi:type="ax2392:FederatedAuthenticatorConfig">
                   <ax2392:displayName xsi:nil="true"/>
                   <ax2392:enabled>false</ax2392:enabled>
                   <ax2392:name>openid</ax2392:name>
                   <ax2392:properties xsi:type="ax2392:Property">
                      <ax2392:confidential>false</ax2392:confidential>
                      <ax2392:defaultValue xsi:nil="true"/>
                      <ax2392:description xsi:nil="true"/>
                      <ax2392:displayName xsi:nil="true"/>
                      <ax2392:name>OpenIdUrl</ax2392:name>
                      <ax2392:required>false</ax2392:required>
                      <ax2392:type xsi:nil="true"/>
                      <ax2392:value>https://localhost:9443/openid</ax2392:value>
                   </ax2392:properties>
                   <ax2392:valid>true</ax2392:valid>
                </ax2392:federatedAuthenticatorConfigs>
                <ax2392:federatedAuthenticatorConfigs xsi:type="ax2392:FederatedAuthenticatorConfig">
                   <ax2392:displayName xsi:nil="true"/>
                   <ax2392:enabled>false</ax2392:enabled>
                   <ax2392:name>passivests</ax2392:name>
                   <ax2392:properties xsi:type="ax2392:Property">
                      <ax2392:confidential>false</ax2392:confidential>
                      <ax2392:defaultValue xsi:nil="true"/>
                      <ax2392:description xsi:nil="true"/>
                      <ax2392:displayName xsi:nil="true"/>
                      <ax2392:name>PassiveSTSUrl</ax2392:name>
                      <ax2392:required>false</ax2392:required>
                      <ax2392:type xsi:nil="true"/>
                      <ax2392:value>https://localhost:9443/services/wso2carbon-sts</ax2392:value>
                   </ax2392:properties>
                   <ax2392:valid>true</ax2392:valid>
                </ax2392:federatedAuthenticatorConfigs>
                <ax2392:federationHub>false</ax2392:federationHub>
                <ax2392:homeRealmId>localhost</ax2392:homeRealmId>
                <ax2392:identityProviderDescription xsi:nil="true"/>
                <ax2392:identityProviderName>LOCAL</ax2392:identityProviderName>
                <ax2392:justInTimeProvisioningConfig xsi:type="ax2392:JustInTimeProvisioningConfig">
                   <ax2392:provisioningEnabled>false</ax2392:provisioningEnabled>
                   <ax2392:provisioningUserStore xsi:nil="true"/>
                   <ax2392:userStoreClaimUri xsi:nil="true"/>
                </ax2392:justInTimeProvisioningConfig>
                <ax2392:permissionAndRoleConfig xsi:type="ax2392:PermissionsAndRoleConfig"/>
                <ax2392:primary>false</ax2392:primary>
                <ax2392:provisioningConnectorConfigs xsi:type="ax2392:ProvisioningConnectorConfig">
                   <ax2392:blocking>false</ax2392:blocking>
                   <ax2392:enabled>false</ax2392:enabled>
                   <ax2392:name>scim</ax2392:name>
                   <ax2392:provisioningProperties xsi:type="ax2392:Property">
                      <ax2392:confidential>false</ax2392:confidential>
                      <ax2392:defaultValue xsi:nil="true"/>
                      <ax2392:description xsi:nil="true"/>
                      <ax2392:displayName xsi:nil="true"/>
                      <ax2392:name>scimUserEndpoint</ax2392:name>
                      <ax2392:required>false</ax2392:required>
                      <ax2392:type xsi:nil="true"/>
                      <ax2392:value>https://localhost:9443/wso2/scim/Users</ax2392:value>
                   </ax2392:provisioningProperties>
                   <ax2392:provisioningProperties xsi:type="ax2392:Property">
                      <ax2392:confidential>false</ax2392:confidential>
                      <ax2392:defaultValue xsi:nil="true"/>
                      <ax2392:description xsi:nil="true"/>
                      <ax2392:displayName xsi:nil="true"/>
                      <ax2392:name>scimGroupEndpoint</ax2392:name>
                      <ax2392:required>false</ax2392:required>
                      <ax2392:type xsi:nil="true"/>
                      <ax2392:value>https://localhost:9443/wso2/scim/Groups</ax2392:value>
                   </ax2392:provisioningProperties>
                   <ax2392:valid>false</ax2392:valid>
                </ax2392:provisioningConnectorConfigs>
                <ax2392:provisioningRole xsi:nil="true"/>
             </ns:return>
          </ns:getResidentIdPResponse>
       </soapenv:Body>
    </soapenv:Envelope>
    ```

### updateIdP

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>The <code>updateIdP()</code> operation can be used to update an existing identity provider. The <code><oldIdPName></code> element is mandatory in the <code>updateIdP</code> request. All the other parameters in the <code>updateIdP</code> request is similar to the parameters in <code>addIdP</code> request.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin/manage</td>  
        </tr>        
        <tr>
            <th>Request</th>
            <td>See below</td>
        </tr>
        <tr>
            <th>Response</th>
            <td>None</td>
        </tr>
    </tbody>    
</table>

??? info "Click to view the request format"

    ``` xml tab="Request Format"
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mgt="http://mgt.idp.carbon.wso2.org" xmlns:xsd="http://model.common.application.identity.carbon.wso2.org/xsd">
       <soapenv:Header/>
       <soapenv:Body>
          <mgt:updateIdP>
             <!--Optional:-->
             <mgt:oldIdPName>?</mgt:oldIdPName>
             <!--Optional:-->
             <mgt:identityProvider>
                <!--Optional:-->
                <xsd:alias>?</xsd:alias>
                <!--Optional:-->
                <xsd:certificate>?</xsd:certificate>
                <!--Optional:-->
                <xsd:claimConfig>...</xsd:claimConfig>
                <!--Optional:-->
                <xsd:defaultAuthenticatorConfig>...</xsd:defaultAuthenticatorConfig>
                <!--Optional:-->
                <xsd:defaultProvisioningConnectorConfig>...
                </xsd:defaultProvisioningConnectorConfig>
                <!--Optional:-->
                <xsd:displayName>?</xsd:displayName>
                <!--Optional:-->
                <xsd:enable>?</xsd:enable>
                <!--Zero or more repetitions:-->
                <xsd:federatedAuthenticatorConfigs>...</xsd:federatedAuthenticatorConfigs>
                <!--Optional:-->
                <xsd:federationHub>?</xsd:federationHub>
                <!--Optional:-->
                <xsd:homeRealmId>?</xsd:homeRealmId>
                <!--Optional:-->
                <xsd:identityProviderDescription>?</xsd:identityProviderDescription>
                <!--Optional:-->
                <xsd:identityProviderName>?</xsd:identityProviderName>
                <!--Optional:-->
                <xsd:justInTimeProvisioningConfig>...</xsd:justInTimeProvisioningConfig>
                <!--Optional:-->
                <xsd:permissionAndRoleConfig>...</xsd:permissionAndRoleConfig>
                <!--Optional:-->
                <xsd:primary>?</xsd:primary>
                <!--Zero or more repetitions:-->
                <xsd:provisioningConnectorConfigs>...</xsd:provisioningConnectorConfigs>
                <!--Optional:-->
                <xsd:provisioningRole>?</xsd:provisioningRole>
             </mgt:identityProvider>
          </mgt:updateIdP>
       </soapenv:Body>
    </soapenv:Envelope>
    ```

### updateResidentIdP

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>
              <p>The <code>updateResidentIdP()</code> operation can be used to alter certain parameters of the resident identity provider. These parameters are:</p>
              <ul>
                <li>Home Realm Identifier</li>
                <li>SAML2 Web SSO Configuration Entity ID</li>
              </ul>
            </td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin/manage</td>  
        </tr>        
        <tr>
            <th>Request</th>
            <td>See below</td>
        </tr>
        <tr>
            <th>Response</th>
            <td>None</td>
        </tr>
    </tbody>    
</table>

??? info "Click to view the request format"

    ``` xml tab="Request Format"
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mgt="http://mgt.idp.carbon.wso2.org" xmlns:xsd="http://model.common.application.identity.carbon.wso2.org/xsd">
       <soapenv:Header/>
       <soapenv:Body>
          <mgt:updateResidentIdP>
             <!--Optional:-->
             <mgt:identityProvider>
                <!--Optional:-->
                <xsd:alias>?</xsd:alias>
                <!--Optional:-->
                <xsd:certificate>?</xsd:certificate>
                <!--Optional:-->
                <xsd:claimConfig>...</xsd:claimConfig>
                <!--Optional:-->
                <xsd:defaultAuthenticatorConfig>...</xsd:defaultAuthenticatorConfig>
                <!--Optional:-->
                <xsd:defaultProvisioningConnectorConfig>...
               </xsd:defaultProvisioningConnectorConfig>
                
                <xsd:displayName>?</xsd:displayName>
                <!--Optional:-->
                <xsd:enable>?</xsd:enable>
                <!--Zero or more repetitions:-->
                <xsd:federatedAuthenticatorConfigs>...</xsd:federatedAuthenticatorConfigs>
                <!--Optional:-->
                <xsd:federationHub>?</xsd:federationHub>
                <!--Optional:-->
                <xsd:homeRealmId>?</xsd:homeRealmId>
                <!--Optional:-->
                <xsd:identityProviderDescription>?</xsd:identityProviderDescription>
                <!--Optional:-->
                <xsd:identityProviderName>?</xsd:identityProviderName>
                <!--Optional:-->
                <xsd:justInTimeProvisioningConfig>...</xsd:justInTimeProvisioningConfig>
                <!--Optional:-->
                <xsd:permissionAndRoleConfig>...</xsd:permissionAndRoleConfig>
                <!--Optional:-->
                <xsd:primary>?</xsd:primary>
                <!--Zero or more repetitions:-->
                <xsd:provisioningConnectorConfigs>...</xsd:provisioningConnectorConfigs>
                <!--Optional:-->
                <xsd:provisioningRole>?</xsd:provisioningRole>
             </mgt:identityProvider>
          </mgt:updateResidentIdP>
       </soapenv:Body>
    </soapenv:Envelope>
    ```
