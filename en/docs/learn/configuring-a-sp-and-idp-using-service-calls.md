# Configuring a SP and IdP Using Service Calls

This topic provides information on adding an identity provider and a
service provider using Web service calls.

### Adding an identity provider using a service call

This section provides instructions on how to add the identity provider
using a service call. You can achieve this by calling the
`         addIdP        ` method of
`         IdentityProviderMgtService        ` admin service (you can
find the .wsdl file at
`         https://<host>:<port>/services/IdentityProviderMgtService?wsdl        `
).

The following is a sample SOAP request for adding an identity provider.
This sample request is tested against the travelocity application.

``` xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:mgt="http://mgt.idp.carbon.wso2.org" xmlns:xsd="http://model.common.application.identity.carbon.wso2.org/xsd">
   <soap:Header/>
   <soap:Body>
      <mgt:addIdP>
         <!--Optional:-->
         <mgt:identityProvider>
            <xsd:alias>https://localhost:9443/oauth2/token/</xsd:alias>
            <xsd:displayName>identityProviderIDP_IS</xsd:displayName>
            <xsd:enable>true</xsd:enable>
            <xsd:federationHub>false</xsd:federationHub>
            <xsd:identityProviderDescription>Sample Description</xsd:identityProviderDescription>
            <xsd:identityProviderName>identityProviderIDP_IS</xsd:identityProviderName>
            <xsd:primary>false</xsd:primary>
            <xsd:claimConfig>
               <xsd:alwaysSendMappedLocalSubjectId>false</xsd:alwaysSendMappedLocalSubjectId>
               <xsd:localClaimDialect>true</xsd:localClaimDialect>
               <xsd:roleClaimURI>http://wso2.org/claims/role</xsd:roleClaimURI>
               <xsd:userClaimURI/>
            </xsd:claimConfig>
            <xsd:defaultAuthenticatorConfig/>
            <xsd:defaultProvisioningConnectorConfig/>
            <xsd:federatedAuthenticatorConfigs>
               <xsd:displayName>samlsso</xsd:displayName>
               <xsd:enabled>true</xsd:enabled>
               <xsd:name>SAMLSSOAuthenticator</xsd:name>
               <xsd:properties>
                  <xsd:confidential>false</xsd:confidential>
                  <xsd:defaultValue/>
                  <xsd:description/>
                  <xsd:displayName/>
                  <xsd:name>IdpEntityId</xsd:name>
                  <xsd:required>false</xsd:required>
                  <xsd:type/>
                  <xsd:value>identiryProviderIDP</xsd:value>
               </xsd:properties>
               <xsd:properties>
                  <xsd:confidential>false</xsd:confidential>
                  <xsd:defaultValue/>
                  <xsd:description/>
                  <xsd:displayName/>
                  <xsd:name>IsLogoutEnabled</xsd:name>
                  <xsd:required>false</xsd:required>
                  <xsd:type/>
                  <xsd:value>true</xsd:value>
               </xsd:properties>
               <xsd:properties>
                  <xsd:confidential>false</xsd:confidential>
                  <xsd:defaultValue/>
                  <xsd:description/>
                  <xsd:displayName/>
                  <xsd:name>SPEntityId</xsd:name>
                  <xsd:required>false</xsd:required>
                  <xsd:type/>
                  <xsd:value>travelocitySP</xsd:value>
               </xsd:properties>
               <xsd:properties>
                  <xsd:confidential>false</xsd:confidential>
                  <xsd:defaultValue/>
                  <xsd:description/>
                  <xsd:displayName/>
                  <xsd:name>SSOUrl</xsd:name>
                  <xsd:required>false</xsd:required>
                  <xsd:type/>
                  <xsd:value>https://localhost:9444/samlsso/</xsd:value>
               </xsd:properties>
               <xsd:properties>
                  <xsd:confidential>false</xsd:confidential>
                  <xsd:defaultValue/>
                  <xsd:description/>
                  <xsd:displayName/>
                  <xsd:name>isAssertionSigned</xsd:name>
                  <xsd:required>false</xsd:required>
                  <xsd:type/>
                  <xsd:value>false</xsd:value>
               </xsd:properties>
               <xsd:properties>
                  <xsd:confidential>false</xsd:confidential>
                  <xsd:defaultValue/>
                  <xsd:description/>
                  <xsd:displayName/>
                  <xsd:name>commonAuthQueryParams</xsd:name>
                  <xsd:required>false</xsd:required>
                  <xsd:type/>
                  <xsd:value/>
               </xsd:properties>
               <xsd:properties>
                  <xsd:confidential>false</xsd:confidential>
                  <xsd:defaultValue/>
                  <xsd:description/>
                  <xsd:displayName/>
                  <xsd:name>IsUserIdInClaims</xsd:name>
                  <xsd:required>false</xsd:required>
                  <xsd:type/>
                  <xsd:value>false</xsd:value>
               </xsd:properties>
               <xsd:properties>
                  <xsd:confidential>false</xsd:confidential>
                  <xsd:defaultValue/>
                  <xsd:description/>
                  <xsd:displayName/>
                  <xsd:name>IsLogoutReqSigned</xsd:name>
                  <xsd:required>false</xsd:required>
                  <xsd:type/>
                  <xsd:value>false</xsd:value>
               </xsd:properties>
               <xsd:properties>
                  <xsd:confidential>false</xsd:confidential>
                  <xsd:defaultValue/>
                  <xsd:description/>
                  <xsd:displayName/>
                  <xsd:name>IsAssertionEncrypted</xsd:name>
                  <xsd:required>false</xsd:required>
                  <xsd:type/>
                  <xsd:value>false</xsd:value>
               </xsd:properties>
               <xsd:properties>
                  <xsd:confidential>false</xsd:confidential>
                  <xsd:defaultValue/>
                  <xsd:description/>
                  <xsd:displayName/>
                  <xsd:name>ISAuthnReqSigned</xsd:name>
                  <xsd:required>false</xsd:required>
                  <xsd:type/>
                  <xsd:value>false</xsd:value>
               </xsd:properties>
               <xsd:properties>
                  <xsd:confidential>false</xsd:confidential>
                  <xsd:defaultValue/>
                  <xsd:description/>
                  <xsd:displayName/>
                  <xsd:name>IsAuthnRespSigned</xsd:name>
                  <xsd:required>false</xsd:required>
                  <xsd:type/>
                  <xsd:value>false</xsd:value>
               </xsd:properties>
               <xsd:properties>
                  <xsd:confidential>false</xsd:confidential>
                  <xsd:defaultValue/>
                  <xsd:description/>
                  <xsd:displayName/>
                  <xsd:name>LogoutReqUrl</xsd:name>
                  <xsd:required>false</xsd:required>
                  <xsd:type/>
                  <xsd:value>false</xsd:value>
               </xsd:properties>
            </xsd:federatedAuthenticatorConfigs>
            <xsd:justInTimeProvisioningConfig>
               <xsd:provisioningEnabled>false</xsd:provisioningEnabled>
               <xsd:provisioningUserStore/>
               <xsd:userStoreClaimUri/>
            </xsd:justInTimeProvisioningConfig>
            <permissionAndRoleConfig xmlns="http://model.common.application.identity.carbon.wso2.org/xsd"/>
         </mgt:identityProvider>
      </mgt:addIdP>
   </soap:Body>
</soap:Envelope>
```

### Adding a service provider using a service call

The following sections includes sample soap requests and expected
responses for the Web service calls to register a service provider. The
playground2 application is used as the example for the following
configurations.

1.  `           registerOAuthApplicationData          ` of
    `           OAuthAdminService          `

    **SOAP request**

    ``` xml
      <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://dto.oauth.identity.carbon.wso2.org/xsd">
         <soap:Header/>
         <soap:Body>
            <xsd:registerOAuthApplicationData>
               <!--Optional:-->
               <xsd:application>
                  <!--Optional:-->
                  <xsd1:OAuthVersion>2.0</xsd1:OAuthVersion>
                  <!--Optional:-->
                  <xsd1:applicationName>playground2</xsd1:applicationName>
                  <!--Optional:-->
                  <xsd1:callbackUrl>http://localhost:8080/playground2/oauth2client</xsd1:callbackUrl>
                  <!--Optional:-->
                  <xsd1:grantTypes>authorization_code implicit</xsd1:grantTypes>
               </xsd:application>
            </xsd:registerOAuthApplicationData>
         </soap:Body>
      </soap:Envelope>
    ```

2.  `           getOAuthApplicationDataByAppName          ` of
    `           OAuthAdminService          `

    **SOAP request**

    ``` xml
       <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsd="http://org.apache.axis2/xsd">
         <soap:Header/>
         <soap:Body>
            <xsd:getOAuthApplicationDataByAppName>
               <!--Optional:-->
               <xsd:appName>playground2</xsd:appName>
            </xsd:getOAuthApplicationDataByAppName>
         </soap:Body>
      </soap:Envelope>
    ```

    **Expected response**

    ``` xml
      <soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope">
         <soapenv:Body>
            <ns:getOAuthApplicationDataByAppNameResponse xmlns:ns="http://org.apache.axis2/xsd">
               <ns:return xsi:type="ax2331:OAuthConsumerAppDTO" xmlns:ax2331="http://dto.oauth.identity.carbon.wso2.org/xsd" xmlns:ax2334="http://base.identity.carbon.wso2.org/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ax2333="http://oauth.identity.carbon.wso2.org/xsd">
                  <ax2331:OAuthVersion>2.0</ax2331:OAuthVersion>
                  <ax2331:applicationName>playground2</ax2331:applicationName>
                  <ax2331:callbackUrl>http://localhost:8080/playground2/oauth2client</ax2331:callbackUrl>
                  <ax2331:grantTypes xsi:nil="true"/>
                  <ax2331:oauthConsumerKey>TXdYtJ2D8npgBH7e4QgP_5FDN50a</ax2331:oauthConsumerKey>
                  <ax2331:oauthConsumerSecret>UGlYgO0x4CfBAJ5oOaRIW8PSYDca</ax2331:oauthConsumerSecret>
                  <ax2331:username xsi:nil="true"/>
               </ns:return>
            </ns:getOAuthApplicationDataByAppNameResponse>
         </soapenv:Body>
      </soapenv:Envelope>
    ```

    You can extract the client ID and secret from this response.

3.  `           createApplication          ` of
    `           IdentityApplicationManagementService          `

    **SOAP request**

    ``` xml
      <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://model.common.application.identity.carbon.wso2.org/xsd">
         <soap:Header/>
         <soap:Body>
            <xsd:createApplication> 
            <xsd:serviceProvider> 
                  <xsd1:applicationName>playground2</xsd1:applicationName> 
               </xsd:serviceProvider> 
            </xsd:createApplication> 
         </soap:Body>
      </soap:Envelope>
    ```

    **Expected response**

    ``` xml
        <soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope">
          <soapenv:Body>
             <ns:createApplicationResponse xmlns:ns="http://org.apache.axis2/xsd">
                <ns:return>16</ns:return>
             </ns:createApplicationResponse>
          </soapenv:Body>
        </soapenv:Envelope>
    ```

    You can extract the application ID from the above response.

4.  `           updateApplication          ` of
    `           IdentityApplicationManagementService          `

    !!! tip
    
        **Tip** : You can set the extracted client ID, secret and
        application ID in the following SOAP request.
    

    **SOAP request**

    ``` xml
    <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://model.common.application.identity.carbon.wso2.org/xsd">
       <soap:Header/>
       <soap:Body>
          <xsd:updateApplication>
             <!--Optional:-->
             <xsd:serviceProvider>
                <!--Optional:-->
                <xsd1:applicationID>16</xsd1:applicationID>
                <xsd1:applicationName>playground2</xsd1:applicationName>
                <xsd1:claimConfig>
                   <xsd1:alwaysSendMappedLocalSubjectId>false</xsd1:alwaysSendMappedLocalSubjectId>
                </xsd1:claimConfig>
                <xsd1:description>oauth application</xsd1:description>
                <xsd1:inboundAuthenticationConfig>
                   <xsd1:inboundAuthenticationRequestConfigs>
                      <xsd1:inboundAuthKey>TXdYtJ2D8npgBH7e4QgP_5FDN50a</xsd1:inboundAuthKey>
                      <xsd1:inboundAuthType>oauth2</xsd1:inboundAuthType>
                      <xsd1:properties>
                         <xsd1:confidential>false</xsd1:confidential>
                         <xsd1:defaultValue xsd:nil="true"/>
                         <xsd1:description xsd:nil="true"/>
                         <xsd1:displayName xsd:nil="true"/>
                         <xsd1:name>oauthConsumerSecret</xsd1:name>
                         <xsd1:required>false</xsd1:required>
                         <xsd1:type xsd:nil="true"/>
                         <xsd1:value>UGlYgO0x4CfBAJ5oOaRIW8PSYDca</xsd1:value>
                      </xsd1:properties>
                   </xsd1:inboundAuthenticationRequestConfigs>
                </xsd1:inboundAuthenticationConfig>
                <xsd1:inboundProvisioningConfig>
                   <xsd1:provisioningEnabled>false</xsd1:provisioningEnabled>
                   <xsd1:provisioningUserStore>PRIMARY</xsd1:provisioningUserStore>
                </xsd1:inboundProvisioningConfig>
                 <xsd1:localAndOutBoundAuthenticationConfig> <xsd1:alwaysSendBackAuthenticatedListOfIdPs>false</xsd1:alwaysSendBackAuthenticatedListOfIdPs> 
                   <xsd1:authenticationStepForAttributes xsd:nil="true"/> 
                   <xsd1:authenticationStepForSubject xsd:nil="true"/> 
                   <xsd1:authenticationType>default</xsd1:authenticationType> 
                   <xsd1:subjectClaimUri xsd:nil="true">http://wso2.org/claims/fullname</xsd1:subjectClaimUri> 
                </xsd1:localAndOutBoundAuthenticationConfig> 
                <xsd1:outboundProvisioningConfig>
                   <xsd1:provisionByRoleList xsd:nil="true"/>
                </xsd1:outboundProvisioningConfig>
                <xsd1:permissionAndRoleConfig/>
                <xsd1:saasApp>false</xsd1:saasApp>
             </xsd:serviceProvider>
          </xsd:updateApplication>
       </soap:Body>
    </soap:Envelope>
    ```

Invoking the above four Web service calls in a sequential manner will
create the service provider in the [management
console](../../setup/getting-started-with-the-management-console) user interface.

!!! info "Related Topics"
      The following links provide additional information that may be relevant
      when attempting the instructions in this topic.

      -   See [Configuring SAML
      SSO](../../learn/configuring-single-sign-on-saml)
      for information on using the pickup-dispatch application for single
      sign-on. This provides insight on some parameters used.
      -   See [Configuring a Service
      Provider](../../learn/adding-and-configuring-a-service-provider)
      for information on creating a service provider using the WSO2
      Identity Server management console.
      -   See [Configuring an Identity
      Provider](../../learn/adding-and-configuring-an-identity-provider)
      for information on creating an identity provider using the WSO2
      Identity Server management console.
      -   See [Configuring a SP and IdP Using Configuration
      Files](../../setup/configuring-a-sp-and-idp-using-configuration-files) for
      information on creating a service provider or identity provider
      using the Identity Server configuration files.
