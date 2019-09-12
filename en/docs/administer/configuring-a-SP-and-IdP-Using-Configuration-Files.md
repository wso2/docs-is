# Configuring a SP and IdP Using Configuration Files

This topic provides instructions on how to create a service provider and
identity provider in the WSO2 Identity Server using configuration files
which is typically used during the deployment stage. This is done so
that multiple tenants in the Identity Server can have the same identity
provider.

While this topic need not be specifically about federated
authentication, this scenario addresses a federated authentication
solution. This scenario requires two WSO2 Identity Server instances,
where one acts as the external identity provider, and the other acts as
the service provider. From this point onwards, the Identity Server
instance that acts as the external identity provider will be referred to
as **`          identity provider IS         `** and the instance that
acts as the service provider will be referred to as
**`          service provider IS         `**. Once we are done with the
configuration, the **`          service provider IS         `** will
have the travelocity application configured as a service provider and an
identity provider configured and shared across its tenant space. This is
illustrated in the following diagram.

![](attachments/103329463/103329465.png)

The following are the high level steps required for this scenario.

1.  Add the **`           identity provider IS          `** in the
    **`           service provider IS          `** as an identity
    provider.
2.  Add the **`           service provider IS          `** in the
    **`           identity provider IS          `** as a service
    provider.
3.  Add the travelocity.com application in the
    **`           service provider IS          `** as a service
    provider. This uses the identity provider created earlier (in
    step 1) as a federated authenticator.

The above processes can be easily done using the [Management
Console](../../setup/getting-started-with-the-management-console), but the
service provider and identity provider created in
**`          service provider IS         `** are only visible to the
tenant who creates them. So the difference here is that the identity
provider and service provider in service provider IS are created using
configuration files so that they are available to all the tenants
in service provider IS.

The following sections provide instructions on how to carry out the
above steps.

-   [Adding the service provider in the identity provider
    IS](#ConfiguringaSPandIdPUsingConfigurationFiles-AddingtheserviceproviderintheidentityproviderIS)
-   [Adding the identity provider in the service provider
    IS](#ConfiguringaSPandIdPUsingConfigurationFiles-AddingtheidentityproviderintheserviceproviderIS)
-   [Adding the service provider in the service provider
    IS](#ConfiguringaSPandIdPUsingConfigurationFiles-AddingtheserviceproviderintheserviceproviderIS)
-   [Running the travelocity
    application](#ConfiguringaSPandIdPUsingConfigurationFiles-Runningthetravelocityapplication)
-   [Testing with
    tenants](#ConfiguringaSPandIdPUsingConfigurationFiles-Testingwithtenants)

Before you begin

Do the following steps to setup the two WSO2 Identity Server instances
for the scenario.

1.  [Download](http://wso2.com/products/identity-server/) and
    [install](../../setup/installing-the-product) the two Identity Server
    instances.
2.  In the
    `            <IDENTITY_PROVIDER_IS_HOME>/repository/conf/carbon.xml           `
    file, locate the `            Offset           ` element and change
    this to 1. This is done to increment the port values in the
    **`             identity provider IS            `** so that there is
    no port conflict with the
    **`             service provider IS            `**. Port conflicts
    occur when multiple WSO2 product instances run on the same machine.

    ``` xml
    <Offset>1</Offset>
    ```

Now you have setup the Identity Server instances so you can proceed with
the configuration steps.

### Adding the service provider in the identity provider IS

This section involves adding the
**`          service provider IS         `** as a service provider in
the **`          identity provider IS         `**.

1.  [Start the **`            identity provider IS           `** and
    access the Management Console](../../setup/running-the-product).
2.  Navigate to the **Main** menu to access the **Identity** menu. Click
    **Add** under **Service Providers**.
3.  Fill in the **Service Provider Name** and provide a brief
    **Description** of the service provider. For the purposes of this
    scenario, enter the **Service Provider Name** as
    `          ServiceProviderSP_IS         ` .
4.  Click **Register** to add the service provider.
5.  Expand the **Inbound Authentication** and **SAML2 Web SSO
    Configuration** sections and click **Configure**.
6.  Do the following configurations.

    | Configurations to be done                                                                                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
    |-------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | **Issuer** :­ `                travelocitySP               `                                                                  | This must be the same as the value you enter for the **Service Provider Entity Id** when configuring the identity provider in the **`                 service provider IS                `**.                                                                                                                                                                                                                                                                                                       |
    | **Assertion Consumer URL** ­: `                               https://localhost:9443/commonauth                             ` | This is the URL to which the browser should be redirected to after the authentication is successful. This is the Assertion Consumer Service (ACS) URL of the service provider. The identity provider redirects the SAML2 response to this URL. However, if the SAML2 request is signed and SAML2 request contains the ACS URL, the Identity Server will honor the ACS URL of the SAML2 request. It should be defined in this format: `               https://(host-name):(port)/acs              ` . |
    | Use fully qualified username in the NameID                                                                                    | A fully qualified username is basically the username with the user store domain. In short, the username must be in the following format: `               {user store domain}{user name}              ` .                                                                                                                                                                                                                                                                                             |
    | Enable Single Logout                                                                                                          | When single logout is enabled, the identity provider sends logout requests to all service providers. Basically, the identity provider acts according to the single logout profile.                                                                                                                                                                                                                                                                                                                   |

7.  Click **Register** to save your changes.

### Adding the identity provider in the service provider IS

This section involves adding the
**`          identity provider IS         `** as an identity provider in
the **`          service provider IS         `**.

Create a file named `         identityProviderIDP_IS.xml        ` inside
the
`         <SERVICE_PROVIDER_IS_HOME>/repository/conf/identity/identity­-providers        `
directory and add the following content into it. These configurations
basically add the identity provider in the
**`          service provider IS         `**. Additionally, this has
the configurations necessary for a federated authentication scenario.

!!! note
    
    **Note:** This configuration will **only** allow the file based identity
    provider to be visible in **file based** service providers.
    Additionally, it will only be visible to the super tenant. To make it
    visible across tenants and in the SP registration UI, add the prefix
    "SHARED\_" before the identity provider name to the
    `         <IdentityProviderName>        ` element, as seen below.
    
    ``` xml
    <IdentityProviderName>SHARED_identityProviderIDP_IS</IdentityProviderName>
    ```
    
    Adding this prefix allows this identity provider to be shared between
    the service providers. Consequently, it will also be shown in the UI
    drop down as a federated identity provider when configuring a service
    provider.
    

**identityProviderIDP\_IS.xml**

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

!!! tip
    
    **Tip** : When studying the above configurations, you can identify the
    **Service Provider Entity Id** in the following code snippet.
    
    ``` xml
    <property>
        <Name>SPEntityId</Name>
        <Value>travelocitySP</Value>
    </property>
```

Here, `         travelocitySP        ` must be the same value as the
value configured as the **Issuer** in the
**`          identity provider IS         `**.

**About certificates** : The following is a sample command if the
identity provider is WSO2 Identity Server where you can export the
public certificate in PEM format.

``` java
keytool -exportcert -alias wso2carbon -keypass wso2carbon -keystore wso2carbon.jks -storepass wso2carbon -rfc -file ispublic_crt.pem
```

Then, you can open the certificate file with a notepad so you see the
certificate value. Copy this certificate value and put in the file
within the \<Certificate\> tag.

Please note that above is only if the identity provider is the WSO2
Identity Server. If the identity provider is a third party IDP, then you
can get the certificate in PEM format and read the value. You need to
copy the entire content of the PEM file and place it within the
`         <Certificate>        ` tag.


### Adding the service provider in the service provider IS

This section involves adding the travelocity application as a service
provider in the **`          service provider IS         `**.

1.  Open the
    `           <SERVICE_PROVIDER_IS_HOME>/repository/conf/identity/sso-idp-config.xml          `
    file and add the following configuration under the
    `           <SSOIdentityProviderConfig>          ` properties  
    `           <ServiceProviders>          ` tag . This adds the
    travelocity application as a service provider.

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

    !!! tip
    
        **Tip:** If the incoming SAML requests from the client (e.g.,
        `                       travelocity.com                     ` ) are
        signed, and the service provider Identity Server instance needs to
        validate the signature included in the authentication and logout
        requests, do the following:
    
        1.  Import the public certificate of the client to the primary
            keystore (e.g., `            wso2carbon.jks           ` )
        2.  Add the corresponding certificate alias name to the
            `             <CertAlias>            ` property and set the
            `             <ValidateSignatures>            ` property to true
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
    directory.
3.  Add the following configurations into the
    `           travelocity.com.xml          ` file you created. This
    adds the necessary SAML configurations to thetravelocity service
    provider.

    !!! note
    
        If you added the "SHARED\_" prefix to the identity provider name
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

4.  Restart the WSO2 Identity Server to apply the file-based
    configurations to the system.

    !!! note
    
        Please note that the management console will not show the SP related
        configuration information if it is loaded through a file (as shown
        above)
    

### Running the travelocity application

Do the following steps to run the travelocity application.

1.  Check out the single sign on sample from the following GitHub
    repository. See the [Downloading a Sample](../../using-wso2-identity-server/downloading-a-sample)
    topic for more information.

    ``` java
    https://github.com/wso2/product-is/tree/master/modules/samples/sso
    ```

2.  Remove the parent entry in the **pom.xml** file that comes along
    with the sample. Once you are done with this step, the contents of
    the **pom.xml** file will look similar to the following.

    ``` xml
        <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
            <groupId>org.wso2.identity</groupId>
            <version>5.0.0</version>    
            <modelVersion>4.0.0</modelVersion>
            <artifactId>wso2is-identity-samples-sso</artifactId>
            <packaging>pom</packaging>
            <name>Identity Server : SSO Samples</name>
            <modules>
                <module>SSOAgentSample</module>
            </modules>
        </project>
    ```

3.  In your command line, navigate to
    `           <SAMPLE_HOME>/sso/          ` in the folder you checked
    out and build the sample using the following command. You must have
    Apache Maven installed to do this (see [Installation
    Prerequisites](_Installation_Prerequisites_) for the appropriate
    version to use).

    ``` java
        mvn clean install
    ```

4.  After successfully building the sample, a .war file named
    **travelocity.com** can be found inside the
    `           <HOME>/sso/SSOAgentSample/          `
    `           target          ` folder. Deploy this sample web app on
    a web container. To do this, use the Apache Tomcat server.

    !!! note
    
        **Note** : Since this sample is written based on Servlet 3.0 it
        needs to be deployed on Tomcat 7.x.
    

    Use the following steps to deploy the web app in the web container:

    1.  Stop the Apache Tomcat server if it is already running.
    2.  Copy the **travelocity.war** file to the
        `            <TOMCAT_HOME>/webapps           ` folder.
    3.  Start the Apache Tomcat server.

5.  When you access the following link to the travelocity application,
    you are directed to the identity provider for authentication:
    `          http://wso2is.local:8080/travelocity.com/index.jsp         `

### Testing with tenants

Now you can test if the configurations you have done work in a tenant
scenario.

1.  [Create new tenants](_Creating_and_Managing_Tenants_) in the
    **`            service provider IS           `**.

    !!! note
    
        **Note** : You cannot provide access to the service provider and
        identity provider for a specific tenant domain. This is accessible
        to all the tenants configured.
    

2.  Open the
    `           <TOMCAT_HOME>/webapps/travelocity.com/WEB­INF/classes/travelocity.properties          `
    file.

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    here to see the full contents of the travelocity.properties file.

    ``` java
    EnableSAMLSSOLogin=true
    EnableOpenIDLogin=true
    EnableSAML2Grant=false
    #This is the URL of the page that is used to choose the login scheme
    #such as SAML SSO. This Url will not be processed by the
    #SSOAgentFilter
    LoginUrl=index.jsp

    #Url to do send SAMLSSO AuthnRequest
    SAMLSSOUrl=samlsso

    #Url to do send SAML2 Grant OAuth2 Request
    SAML2GrantUrl=token

    #Url to send OpenID Authentication Request
    OpenIDUrl=openid

    #A unique identifier for this SAML 2.0 Service Provider application
    SAML.IssuerID=travelocity.com

    #QueryParams=tenantDomain=tenant.domain


    #The URL of the SAML 2.0 Assertion Consumer
    SAML.ConsumerUrl=http://wso2is.local/travelocity.com/home.jsp

    #The URL of the SAML 2.0 Identity Provider
    SAML.IdPUrl=https://localhost:9443/samlsso

    #This is the attribute name under which the authenticated session information
    #of SAML SSO and OpenID are stored
    SSOAgentSessionBeanName=SSOAgentSessionBean

    #Identifier given for the Service Provider for SAML 2.0 attributes
    #exchange
    #SAML.AttributeConsumingServiceIndex=1701087467

    #Specify if SingleLogout is enabled/disabled
    SAML.EnableSLO=true

    #This is the URL that is used for SLO
    SAML.LogoutUrl=logout

    #Specify if SAMLResponse element is signed
    SAML.EnableResponseSigning=false

    #Specify if SAMLAssertion element is signed
    SAML.EnableAssertionSigning=false

    #Specify if SAMLAssertion element is encrypted
    SAML.EnableAssertionEncryption=false

    #Specify if AuthnRequests and LogoutRequests should be signed
    SAML.EnableRequestSigning=false

    #Specify if force authentication enabled
    SAML.EnableForceAuthentication=false

    #Custom credentials class
    SAML.SSOAgentCredentialImplClass=org.wso2.carbon.identity.sso.agent.saml.SSOAgentKeyStoreCredential

    #KeyStore to cryptographic credentials
    #KeyStore=/home/johann/Desktop/wso2is­4.1.0/repository/resources/security/wso2carbon.jks

    #Password of the KeyStore for SAML and OpenID
    KeyStorePassword=wso2carbon

    #Alias of the IdP's public certificate
    SAML.IdPCertAlias=wso2carbon#Alias of the SP's private key
    SAML.PrivateKeyAlias=wso2carbon

    #Private key password to retrieve the private key used to sign
    #AuthnRequest and LogoutRequest messages
    SAML.PrivateKeyPassword=wso2carbon

    #OAuth2 token endpoint URL
    SAML.OAuth2TokenEndpoint=https://localhost:9443/oauth2/token

    #OAuth2 Client ID
    SAML.OAuth2ClientID=Qn5DQHCYfshxeZh6R9SL1HM2lsMa

    #OAuth2 Client Secret
    SAML.OAuth2ClientSecret=cbkAs1gajdwPAMbrSR54hPAIcz0a

    #OpenId Provider Url
    OpenID.OpenIdProviderUrl=https://localhost:9443/openid/

    #openid.return_to parameter
    OpenID.ReturnToUrl=http://wso2is.local/travelocity.com/home.jsp

    #This is the request parameter name under which to find the
    #openid.claimed_id value to send OpenID authentication request
    OpenID.ClaimedIDParameterName=claimed_id

    #Custom OpenID AttributesRequestor class
    OpenID.AttributesRequestorImplClass=SampleAttributesRequestor

    #Additional request parameters
    #SAML.Request.Query.Param=&forceAuth=true
    ```

3.  In the travelocity.properties file, locate and uncomment the
    following value. Replace the tenant domain (
    `           tenant.domain          ` ) with your newly created
    tenant domain.

    ``` java
        #QueryParams=tenantDomain=tenant.domain
    ```

    !!! tip
    
        **Tip** : You can uncomment values in this file by removing the
        “\#”.
    

4.  In order to enable response signature validation from the
    Travelocity side, first, you need to download the public certificate
    of the tenant.
    1.  Login using tenant credentials to the management console and
        navigate to
        `            Home > Manage > Keystores > List.           `
        Click on `            Public Key           ` link to download
        the certificate.  
        ![](attachments/103329463/103329464.png){width="985"
        height="196"}
    2.  Now you need to import this public certificate to
        `             <APACHE_HOME>/webapps/travelocity.com/WEB-INF/classes/wso2carbon.jks            `
        file using the following command.

        ``` java
        keytool -import -alias <key_alias> -file <download_file> -keystore wso2carbon.jks
        ```

        Default password of the
        `              wso2carbon.jks             ` is
        `              wso2carbon             `

    3.  Update `             IdPPublicCertAlias            `
        property in the
        `             <APACHE_HOME>/webapps/travelocity.com/WEB-INF/classes/travelocity.properties            `
        with provided alias in the previous step.

        Also, it is possible to disable response signature validation
        from the Travelocity application using the
        `              SAML2.EnableResponseSigning             `
        property available in
        `              <APACHE_HOME>/webapps/travelocity.com/WEB-INF/classes/travelocity.properties             `
        file.

5.  If you made any changes to the port offset, you must ensure that
    this change is reflected in the port value of the following
    property.

    ``` java
        SAML.IdPUrl=https://localhost:9443/samlsso
    ```

6.  Restart Apache Tomcat and access the travelocity application. You
    will be able to log in using the identity provider credentials
    regardless of the tenant domain you are using. Access the
    travelocity application using the following:
    [http://wso2is.local/travelocity.com/index.jsp](http://localhost:8080/travelocity.com/index.jsp)

      

**Related links**

The following links provide additional information that may be relevant
when attempting the instructions in this topic.

-   See [Configuring SAML SSO](_Configuring_Single_Sign-On_) for
    information on using the travelocity.com application for single
    sign-on. This provides insight on some parameters used.
-   See [Adding and Configuring a Service
    Provider](../../using-wso2-identity-server/adding-and-configuring-a-service-provider) for
    information on creating a service provider using the WSO2 Identity
    Server management console.
-   See [Adding and Configuring an Identity
    Provider](../../using-wso2-identity-server/adding-and-configuring-an-identity-provider) for
    information on creating an identity provider using the WSO2 Identity
    Server management console.
-   See [Configuring a SP and IdP Using Service
    Calls](_Configuring_a_SP_and_IdP_Using_Service_Calls_) for
    information on creating a service provider or identity provider
    using admin services.
