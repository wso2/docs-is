# Configuring a SP and IdP Using Configuration Files

This topic provides instructions on how to create a service provider and
identity provider in the WSO2 Identity Server using configuration files
which is typically used during the deployment stage. This is configured so
that multiple tenants in the Identity Server can have the same identity
provider.

Even though this topic is not specifically about federated authentication, this 
scenario also addresses a federated authentication
solution. This scenario requires two WSO2 Identity Server instances,
where one acts as the external identity provider, and the other acts as
the service provider. From this point onwards, the Identity Server
instance that acts as the external identity provider will be referred to
as **`          identity provider IS         `** and the instance that
acts as the service provider will be referred to as
**`          service provider IS         `**. Once the configurations 
are done, the **`          service provider IS         `** will
have the `travelocity` application configured as a service provider and an
identity provider configured and shared across its tenant space. This is
illustrated via the following diagram.

![Configuring a SP and IdP Using Configuration Files](../assets/img/103329463/103329465.png)

The following are the high level steps required for this scenario.

1.  Add the **`           identity provider IS          `** to the
    **`           service provider IS          `** as an identity
    provider.
2.  Add the **`           service provider IS          `** to the
    **`           identity provider IS          `** as a service
    provider.
3.  Add the `travelocity.com` application in the
    **`           service provider IS          `** as a service
    provider. This uses the identity provider created earlier (in
    step 1) as a federated authenticator.

!!! note
    The above processes can be easily done using the [Management
    Console](../../setup/getting-started-with-the-management-console), but the
    `service provider` and `identity provider` created in
    **`          service provider IS         `**, will **only be visible to the
    tenant who creates them**. 
    
    Therefore, difference here is that the `identity
    provider` and `service provider` in **`service provider IS`** are created using
    configuration files are **available to all the tenants**
    in **`service provider IS`**.

The following sections provide instructions on how to carry out the
above steps.

## Before you begin

Do the following steps to setup two WSO2 Identity Server instances
for this scenario.

1.  [Download](http://wso2.com/products/identity-server/) and
    [install](../../setup/installing-the-product) the two Identity Server
    instances.
2. Navigate to `<IDENTITY_PROVIDER_IS_HOME>/repository/conf/deployment.toml`
   and add an `offset` value to increment the port values in the 
   **`identity provider IS `** so that there is 
   no port conflict with the **`service provider IS`**. 
   Port conflicts occur when multiple WSO2 product instances run on the same machine.

    ``` toml
    [server]
    ...
    offset=2
    ...
    ```
    
    !!! note
        To read more about new configurations, 
        see [New Configuration Model](../../references/new-configuration-model).

You have successfully setup the Identity Server instances. Now you can proceed to the
the configuration steps.

## Configure the Federated Identity Provider

This section involves adding the **` service provider IS `** as a
service provider in the **` identity provider IS `** from the management
console.

1.  [Start the **`identity provider IS`** and access the Management Console](../../setup/running-the-product).
2.  Navigate to the **Main** -> **Identity** -> **Service Providers** -> Click **Add**.
3.  Fill in the **Service Provider Name** and provide a brief
    **Description** of the service provider. 
    
    **NOTE:** for this scenario, enter the **Service Provider Name** as `ServiceProviderSP_IS`.
    
4.  Click **Register** to add the service provider.
5.  Expand the **Inbound Authentication** and **SAML2 Web SSO
    Configuration** sections and click **Configure**.
6.  Do the following configurations.

    | Configurations to be done                                                                                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
    |-------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | **Issuer** :­ `                travelocitySP               `                                                                  | This must be the same as the value you enter for the **Service Provider Entity Id** when configuring the identity provider in the **`                 service provider IS                `**.                                                                                                                                                                                                                                                                                                       |
    | **Assertion Consumer URL** ­: `                               https://localhost:9443/commonauth                             ` | This is the URL to which the browser should be redirected to after the authentication is successful. This is the Assertion Consumer Service (ACS) URL of the service provider. The identity provider redirects the SAML2 response to this URL. However, if the SAML2 request is signed and SAML2 request contains the ACS URL, the Identity Server will honor the ACS URL of the SAML2 request. It should be defined in this format: `               https://(host-name):(port)/acs              ` . |
    | **Enable Single Logout**                                                                                                          | When single logout is enabled, the identity provider sends logout requests to all service providers. Basically, the identity provider acts according to the single logout profile.                                                                                                                                                                                                                                                                                                                   |

7.  Click **Register** to save your changes.

## Adding an identity provider

This section involves adding the **` identity provider IS `** as an
identity provider in the **` service provider IS `** via a file.

Create a file named `         identityProviderIDP_IS.xml        ` inside
the `<SERVICE_PROVIDER_IS_HOME>/repository/conf/identity/identity­-providers`
directory and add the following content into it. These configurations
basically add the identity provider in the
**`          service provider IS         `**. Additionally, this has
the configurations necessary for a federated authentication scenario.

??? example "identityProviderIDP\_IS.xml"
    ``` xml
    <IdentityProvider>
        <IdentityProviderName>identityProviderIDP_IS</IdentityProviderName>
        <DisplayName>identityProviderIDP_IS</DisplayName>
        <IdentityProviderDescription></IdentityProviderDescription>
        <Alias>https://localhost:9444/oauth2/token/</Alias>
        <IsPrimary></IsPrimary>
        <IsEnabled>true</IsEnabled>
        <IsFederationHub></IsFederationHub>
        <HomeRealmId></HomeRealmId>
        <ProvisioningRole></ProvisioningRole>
        <FederatedAuthenticatorConfigs>
            <saml2>
                <Name>SAMLSSOAuthenticator</Name>
                <DisplayName>samlsso</DisplayName>
                <IsEnabled>true</IsEnabled>
                <Properties>
                    <property>
                        <Name>IdPEntityId</Name>
                        <Value>identiryProviderIDP</Value>
                    </property>
                    <property>
                        <Name>IsLogoutEnabled</Name>
                        <Value>true</Value>
                    </property>
                    <property>
                        <Name>SPEntityId</Name>
                        <Value>travelocitySP</Value>
                    </property>
                    <property>
                        <Name>SSOUrl</Name>
                        <Value>https://localhost:9444/samlsso/</Value>
                    </property>
                    <property>
                        <Name>isAssertionSigned</Name>
                        <Value>false</Value>
                    </property>
                    <property>
                        <Name>commonAuthQueryParams</Name>
                        <Value></Value>
                    </property>
                    <property>
                        <Name>IsUserIdInClaims</Name>
                        <Value>false</Value>
                    </property>
                    <property>
                        <Name>IsLogoutReqSigned</Name>
                        <Value>false</Value>
                    </property>
                    <property>
                        <Name>IsAssertionEncrypted</Name>
                        <Value>false</Value>
                    </property>
                    <property>
                        <Name>IsAuthReqSigned</Name>
                        <Value>false</Value>
                    </property>
                    <property>
                        <Name>IsAuthnRespSigned</Name>
                        <Value>false</Value>
                    </property>
                    <property>
                        <Name>LogoutReqUrl</Name>
                        <Value>false</Value>
                    </property>
                </Properties>
            </saml2>
        </FederatedAuthenticatorConfigs>
        <DefaultAuthenticatorConfig>SAMLSSOAuthenticator</DefaultAuthenticatorConfig>
        <ProvisioningConnectorConfigs>
        </ProvisioningConnectorConfigs>
        <DefaultProvisioningConnectorConfig></DefaultProvisioningConnectorConfig>
        <ClaimConfig></ClaimConfig>
        <Certificate></Certificate>
        <PermissionAndRoleConfig></PermissionAndRoleConfig>
        <JustInTimeProvisioningConfig></JustInTimeProvisioningConfig>
    </IdentityProvider>
    ```
    
    !!! note
        Here, `         travelocitySP        ` must be the same value as the
        value configured as the **Issuer** in the
        **`          identity provider IS         `**.
    
    !!! tip
        **Tip** : When studying the above configurations, you can identify the
        **Service Provider Entity Id** in the following code snippet.
        
        ``` xml
        <property>
            <Name>SPEntityId</Name>
            <Value>travelocitySP</Value>
        </property>
        ```

    !!! note
        **Note:** This configuration will **only** allow the file based identity
        provider to be visible in **file based** service providers.
        Additionally, it will only be visible to the super tenant. To make it
        visible across tenants and in the SP registration UI, add the prefix
        `SHARED\_` before the identity provider name to the
        `         <IdentityProviderName>        ` element, as seen below.
        
        ``` xml
        <IdentityProviderName>SHARED_identityProviderIDP_IS</IdentityProviderName>
        ```
        
        Adding this prefix allows this identity provider to be shared between
        the service providers. Consequently, it will also be shown in the UI
        drop down as a federated identity provider when configuring a service
        provider.
    
**Adding Certificate**
Add the certificate value to the `identityProviderIDP_IS.xml` 
file within the `<Certificate>` tag.

!!! note
    The following is a sample command export the public certificate in PEM format 
    in WSO2 Identity Server. Navigate to `<IDENTITY_PROVIDER_IS_HOME>/repository/resources/security` folder and
    use the following command.
    
    ``` java
    keytool -exportcert -alias wso2carbon -keypass wso2carbon -keystore wso2carbon.jks -storepass wso2carbon -rfc -file ispublic_crt.pem
    ```
    Open the certificate file with a notepad so you see the
    certificate value. Copy this certificate value and add it 
    within the `<Certificate>` tag.
    
    !!! note
        Use the above command only if the identity provider is the WSO2 
        Identity Server. If the identity provider is a third party IDP, then you 
        can get the certificate in PEM format and read the value. You need to 
        copy the entire content of the PEM file and place it within the 
        `<Certificate>` tag.
        

## Adding a service provider

This section involves adding the `travelocity.com` application as a
service provider in the **` service provider IS `** via a file.

1.  Open the
    `           <SERVICE_PROVIDER_IS_HOME>/repository/conf/identity/sso-idp-config.xml          `
    file and add the following configuration under the
    `           <SSOIdentityProviderConfig>          ` properties  
    `           <ServiceProviders>          ` tag . This adds the
    travelocity application as a service provider.

    ??? example "Additional configs to sso-idp-config.xml"
        ``` xml
        <ServiceProvider>
            <Issuer>travelocity.com</Issuer>
            <AssertionConsumerServiceURLs>
              <AssertionConsumerServiceURL>http://wso2is.local:8080/travelocity.com/home.jsp</AssertionConsumerServiceURL>
            </AssertionConsumerServiceURLs>
            <DefaultAssertionConsumerServiceURL>http://wso2is.local:8080/travelocity.com/home.jsp</DefaultAssertionConsumerServiceURL>
            <EnableSingleLogout>true</EnableSingleLogout>
            <SLOResponseURL></SLOResponseURL>
            <SLORequestURL></SLORequestURL>
            <SAMLDefaultSigningAlgorithmURI>http://www.w3.org/2000/09/xmldsig#rsa-sha1</SAMLDefaultSigningAlgorithmURI>
            <SAMLDefaultDigestAlgorithmURI>http://www.w3.org/2000/09/xmldsig#sha1</SAMLDefaultDigestAlgorithmURI>
            <SignResponse>true</SignResponse>
            <ValidateSignatures>false</ValidateSignatures>
            <EncryptAssertion>true</EncryptAssertion>
            <CertAlias></CertAlias>
            <EnableAttributeProfile>true</EnableAttributeProfile>
            <IncludeAttributeByDefault>true</IncludeAttributeByDefault>
            <ConsumingServiceIndex>2104589</ConsumingServiceIndex>
            <EnableAudienceRestriction>false</EnableAudienceRestriction>
            <AudiencesList>
              <Audience></Audience>
            </AudiencesList>
            <EnableRecipients>false</EnableRecipients>
            <RecipientList>
              <Recipient></Recipient>
            </RecipientList>
            <EnableIdPInitiatedSSO>false</EnableIdPInitiatedSSO>
            <EnableIdPInitSLO>false</EnableIdPInitSLO>
            <ReturnToURLList>
              <ReturnToURL></ReturnToURL>
            </ReturnToURLList>
        </ServiceProvider>
        ```

    !!! Tip 
        If the incoming SAML requests from the client (e.g., `
        travelocity.com ` ) are signed, and the service provider Identity
        Server instance needs to validate the signature included in the
        authentication and logout requests, do the following:
        
        1.  Import the public certificate of the client to the primary
            keystore (e.g., `wso2carbon.jks` )
        2.  Add the corresponding certificate alias name to the
            `<CertAlias>` property and set the `<ValidateSignatures>` property to true
            in the `             sso-idp-config.xml            ` file.
        
        In the above configuration, the single logout is supported by
        Back-Channel Logout. In order to use SAML Front-Channel Logout, add
        the following properties under
        `           <ServiceProvider>          ` tag.
    
        To enable SAML Front-Channel Logout with HTTP Redirect Binding
            ``` xml
            <EnableSingleLogout>true</EnableSingleLogout>
            <EnableFrontChannelLogout>true</EnableFrontChannelLogout>
            <FrontChannelLogoutBinding>HTTPRedirectBinding</FrontChannelLogoutBinding>
            ```
        
        To enable SAML Front-Channel Logout with HTTP POST Binding
            ``` xml
                <EnableSingleLogout>true</EnableSingleLogout>
                <EnableFrontChannelLogout>true</EnableFrontChannelLogout>
                <FrontChannelLogoutBinding>HTTPPostBinding</FrontChannelLogoutBinding>
            ```

2.  Create a file named `          travelocity.com.xml         ` in the
    `          <SERVICE_PROVIDER_IS_HOME>/repository/conf/identity/service-providers         `
    directory. Add the following configurations into the
    `           travelocity.com.xml          ` file you created. This
    adds the necessary SAML configurations to the  travelocity service
    provider.

    ??? example "travelocity.com.xml"
        !!! note
        
            If you added the `SHARED\_` prefix to the identity provider name
            when adding the identity provider, replace the
            `           <IdentityProviderName>          ` value (found under the
            `           <LocalAndOutBoundAuthenticationConfig>          `
            element) in the `           travelocity.com.xml          ` file,
            with the following value.
        
            ``` java
            SHARED_identityProviderIDP_IS
            ```
        
    
        ``` xml
        <ServiceProvider>
            <ApplicationID>3</ApplicationID>
            <ApplicationName>travelocity.com</ApplicationName>
            <Description>travelocity Service Provider</Description>
            <IsSaaSApp>true</IsSaaSApp>
            <InboundAuthenticationConfig>
                <InboundAuthenticationRequestConfigs>
                    <InboundAuthenticationRequestConfig>
                        <InboundAuthKey>travelocity.com</InboundAuthKey>
                        <InboundAuthType>samlsso</InboundAuthType>
                        <Properties></Properties>
                    </InboundAuthenticationRequestConfig>
                </InboundAuthenticationRequestConfigs>
            </InboundAuthenticationConfig>
          
            <LocalAndOutBoundAuthenticationConfig>
            <AuthenticationSteps>
                <AuthenticationStep>
                    <StepOrder>1</StepOrder>
                    <LocalAuthenticatorConfigs>
                        <LocalAuthenticatorConfig>
                            <Name>BasicAuthenticator</Name>
                            <DisplayName>basicauth</DisplayName>
                            <IsEnabled>true</IsEnabled>
                        </LocalAuthenticatorConfig>
                    </LocalAuthenticatorConfigs>
                    <FederatedIdentityProviders>
                        <IdentityProvider>
                            <IdentityProviderName>identityProviderIDP_IS</IdentityProviderName>
                            <IsEnabled>true</IsEnabled>
                            <DefaultAuthenticatorConfig>
                                <FederatedAuthenticatorConfigs>
                                    <FederatedAuthenticatorConfig>
                                        <Name>SAMLSSOAuthenticator</Name>
                                        <DisplayName>samlsso</DisplayName>
                                        <IsEnabled>true</IsEnabled>
                                    </FederatedAuthenticatorConfig>
                                </FederatedAuthenticatorConfigs>
                            </DefaultAuthenticatorConfig>
                        </IdentityProvider>
                    </FederatedIdentityProviders>
                    <SubjectStep>true</SubjectStep>
                    <AttributeStep>true</AttributeStep>
                </AuthenticationStep>
            </AuthenticationSteps>
            <subjectClaimUri> <!--selected URI --> </subjectClaimUri>
        </LocalAndOutBoundAuthenticationConfig>
            <RequestPathAuthenticatorConfigs></RequestPathAuthenticatorConfigs>
            <InboundProvisioningConfig></InboundProvisioningConfig>
            <OutboundProvisioningConfig></OutboundProvisioningConfig>
            <ClaimConfig>
                <AlwaysSendMappedLocalSubjectId>true</AlwaysSendMappedLocalSubjectId>
                <LocalClaimDialect>true</LocalClaimDialect><ClaimMappings><ClaimMapping><LocalClaim><ClaimUri>http://wso2.org/claims/givenname</ClaimUri></LocalClaim><RemoteClaim><ClaimUri>http://wso2.org/claims/givenName</ClaimUri>ClaimUri></RemoteClaim><RequestClaim>true</RequestClaim></ClaimMapping></ClaimMappings></ClaimConfig>    
            <PermissionAndRoleConfig></PermissionAndRoleConfig>
        </ServiceProvider>
        ```

3.  Restart the WSO2 Identity Server to apply the file-based
    configurations to the system.

    !!! note
    
        Please note that the management console will not show the SP related
        configuration information if it is loaded through a file

        ![no-service-providers](../assets/img/setup/configuring-sp-Idp-using-configuration-files/no-service-providers.png)


## Running the travelocity application

Do the following steps to run the travelocity application.

1.  [Deploy the travelocity](../../learn/deploying-the-sample-app/#download-the-sample)
    application. No need to register the service provider for
    travelocity as
    [we created service provider via a file](#adding-the-service-provider-in-the-service-provider-is).

2.  When you access the following link to the travelocity application,
    you are directed to the identity provider for authentication: `
    http://wso2is.local:8080/travelocity.com/index.jsp `

    !!! note
        Check whether you have enabled following configurations while adding the service provider 
        in the `identity provider IS`. You can check this by navigating to **Main** -> **Identity** -> 
        **Service Providers** -> List -> Click **Edit** in the corresponding SP -> 
        **Inbound Authentication Configuration** -> **SAML2 Web SSO Configuration** -> **Edit**.
        
        ![SAML2 Web SSO Configuration](../assets/img/setup/configuring-sp-Idp-using-configuration-files/sp_configs.png)
        
        If you have `not enabled` the configs, add the following configs to travelocity as well.
        
        1.  Stop tomcat if it is already running.
        2.  Navigate to `<TOMCAT_HOME>/webapps/travelocity.com/WEB­INF/classes/travelocity.properties` file 
        and change the following configs to `false` if they are configured to `true`.
        
        ```
        #Specify if SAMLResponse element is signed
        SAML2.EnableResponseSigning=false
        
        #Specify if SAMLAssertion element is signed
        SAML2.EnableAssertionSigning=false
        
        #Specify if AuthnRequests and LogoutRequests should be signed
        SAML2.EnableRequestSigning=false
        ```
    
## Testing with tenants

Now you can test if the configurations you have done work in a tenant
scenario.

1.  [Create new tenants](../../learn/creating-and-managing-tenants) in the
    **`            service provider IS           `**.

    !!! note
    
        **Note** : You cannot provide access to the service provider and
        identity provider for a specific tenant domain. This is accessible
        to all the tenants configured.
    

2.  Open the
    `           <TOMCAT_HOME>/webapps/travelocity.com/WEB­INF/classes/travelocity.properties          `
    file.

    !!! note
        If the tomcat server is running, you need to stop the server.

    ??? Example "Full contents of the travelocity.properties file"
        ``` java
        EnableSAML2SSOLogin=true
        EnableOpenIDLogin=true
        EnableOAuth2SAML2Grant=false
        
        #Url to do send SAML2 SSO AuthnRequest
        SAML2SSOURL=samlsso
        
        #Url to do initiate OAuth2 SAML2 Grant Request
        OAuth2SAML2GrantURL=token
        
        #Url to initiate OpenID Authentication Request
        OpenIdURL=openid
        
        #URIs to skip SSOAgentFilter; comma separated values
        SkipURIs=/travelocity.com/index.jsp
        
        #A unique identifier for this SAML 2.0 Service Provider application
        SAML2.SPEntityId=travelocity.com
        
        #The URL of the SAML 2.0 Assertion Consumer
        SAML2.AssertionConsumerURL=http://localhost:8080/travelocity.com/home.jsp
        
        #A unique identifier for this SAML 2.0 Service Provider application
        SAML2.IdPEntityId=localhost
        
        #The URL of the SAML 2.0 Identity Provider
        SAML2.IdPURL=https://localhost:9443/samlsso
        
        #Identifier given for the Service Provider for SAML 2.0 attributes 
        #exchange
        #SAML2.AttributeConsumingServiceIndex=1701087467
        
        #Specify if SingleLogout is enabled/disabled
        SAML2.EnableSLO=true
        
        #This is the URL that is used for SLO
        SAML2.SLOURL=logout
        
        #Specify if SAMLResponse element is signed
        SAML2.EnableResponseSigning=false
        
        #Specify if SAMLAssertion element is signed
        SAML2.EnableAssertionSigning=false
        
        #Specify if SAMLAssertion element is encrypted
        SAML2.EnableAssertionEncryption=false
        
        #Specify if AuthnRequests and LogoutRequests should be signed
        SAML2.EnableRequestSigning=false
        
        #Specify if SAML request is a passive
        SAML2.IsPassiveAuthn=false
        
        #Password of the KeyStore for SAML and OpenID
        KeyStorePassword=wso2carbon
        
        #Alias of the IdP's public certificate
        IdPPublicCertAlias=wso2carbon
        
        #Alias of the SP's private key 
        PrivateKeyAlias=wso2carbon
        
        #Private key password to retrieve the private key used to sign 
        #AuthnRequest and LogoutRequest messages
        PrivateKeyPassword=wso2carbon
        
        #OAuth2 token endpoint URL
        OAuth2.TokenURL=https://localhost:9443/oauth2/token
        
        #OAuth2 Client ID
        OAuth2.ClientId=Qn5DQHCYfshxeZh6R9SL1HM2lsMa
        
        #OAuth2 Client Secret
        OAuth2.ClientSecret=cbkAs1gajdwPAMbrSR54hPAIcz0a
        
        #OpenId Provider Url
        OpenId.ProviderURL=https://localhost:9443/openid/
        
        #openid.return_to parameter
        OpenId.ReturnToURL=http://localhost:8080/travelocity.com/home.jsp
        
        #Custom SAML post binding request page
        #SAML.PostBinding.RequestPage=path/to/the/html
        
        #Additional request parameters
        #QueryParams=tenantDomain=-1234
        
        #SAML2.IsForceAuthn=true
        
        #Specify whether the consumer requests user attributes from the provider
        OpenId.EnableAttributeExchange=true
        
        #Specify whether the consumer runs in dumb mode
        OpenId.EnableDumbMode=false
        ```

3.  In the `travelocity.properties` file update `tenantDomain` query param with the 
    newly created tenant domain.

    ``` java
    QueryParams=tenantDomain=tenant.domain
    ```

    !!! tip
        **Tip** : You can uncomment values in this file by removing the
        **`\#`**.
    

4.  In order to enable response signature validation from the
    Travelocity side, first, you need to download the public certificate
    of the tenant.
    
    !!! note
        If you have **not enabled** signature validation, proceed to the next step.
    
    1.  Login using tenant credentials to the management console and
        navigate to
        `            Main > Manage > Keystores > List.           `
        Click on `            Public Key           ` link to download
        the certificate.  
        
        ![](../assets/img/103329463/103329464.png)
        
    2.  Now you need to import this public certificate to
        `             <APACHE_HOME>/webapps/travelocity.com/WEB-INF/classes/wso2carbon.jks            `
        file using the following command.

        ``` java
        keytool -import -alias <key_alias> -file <download_file> -keystore wso2carbon.jks
        ```

        **NOTE:** Default password of the `wso2carbon.jks` is `wso2carbon`.

    3.  Update `             IdPPublicCertAlias            `
        property in the
        `             <APACHE_HOME>/webapps/travelocity.com/WEB-INF/classes/travelocity.properties            `
        with provided alias in the previous step.

        !!! note
            It is possible to disable response signature validation
            from the Travelocity application using the `SAML2.EnableResponseSigning`
            property available in `<APACHE_HOME>/webapps/travelocity.com/WEB-INF/classes/travelocity.properties`
            file.

5.  If you have made any changes to the port offset, you must ensure that
    this change is reflected in the port value of the following
    property in the `ravelocity.properties` file.

    ``` java
    SAML2.IdPURL=https://localhost:9443/samlsso
    ```

6.  Restart Apache Tomcat and access the travelocity application. You
    will be able to log in using the identity provider credentials
    regardless of the tenant domain you are using. Access the
    travelocity application using the following:
    [http://wso2is.local/travelocity.com/index.jsp](http://localhost:8080/travelocity.com/index.jsp)

      

**Related links**

The following links provide additional information that may be relevant
when attempting the instructions in this topic.

-   See [Configuring SAML SSO](../../learn/configuring-single-sign-on) for
    information on using the travelocity.com application for single
    sign-on. This provides insight on some parameters used.
-   See [Adding and Configuring a Service
    Provider](../../learn/adding-and-configuring-a-service-provider) for
    information on creating a service provider using the WSO2 Identity
    Server management console.
-   See [Adding and Configuring an Identity
    Provider](../../learn/adding-and-configuring-an-identity-provider) for
    information on creating an identity provider using the WSO2 Identity
    Server management console.
-   See [Configuring a SP and IdP Using Service
    Calls](../../learn/configuring-a-sp-and-idp-using-service-calls) for
    information on creating a service provider or identity provider
    using admin services.

