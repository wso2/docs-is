# Importing or Exporting a Service Provider

This topic guides you through exporting a service provider as an xml
configuration file or importing an xml configuration file to create a
new service provider in WSO2 Identity Server (WSO2 IS).

This is particularly useful if you wish to create a service provider
with the same configuration in different tenants or different instances
of WSO2 IS. To do this, you can simply create and configure the service
provider in Tenant A, export it as an xml file, and then import the xml
file in Tenant B and C to create the same service provider in all
tenants. Importing and exporting service providers can also be useful if
you need to take backups of your service provider configurations.

!!! info 
    For more information:

    -   See
        [Architecture](../../get-started/architecture)
        for more information on what a service provider is.
    -   See [Adding and Configuring a Service
        Provider](../../learn/adding-and-configuring-a-service-provider) for
        instructions on how to add and configure a service provider using
        the management console.


### Export a service provider

To export a service provider as an xml configuration file, do the
following.

1.  Navigate to `           <IS_HOME>/bin/          ` and run the
    following command to start WSO2 Identity Server.

    Windows
    ``` java
    .\wso2server.bat
    ```

    Linux/Unix
    ``` java
    sh wso2server.sh
    ```

2.  Access the following URL and log in to the management console using
    admin/admin credentials: <https://localhost:9443/carbon/>

3.  Click **Add** under **Service Providers** on the **Main** tab to
    create a new service provider.
4.  Enter a name for the service provider and click **Register**.
5.  Configure the service provider according to your requirements and
    click **Update** to save the configurations.  
    You will see the service provider you just created listed under
    **Service Providers**.
6.  Click **Export** against the respective service provider. You are
    prompted to confirm the export.  

    ![export-sp](../assets/img/using-wso2-identity-server/export-sp.png)

7.  Select **Include Secrets** if you wish to include secrets when
    exporting. An xml file similar to the sample given below is
    downloaded on to your machine.

    !!! tip
    
        **Note:** The Kerberos KDC configuration is excluded as it is a
        password. Any hashed or encrypted secrets are also excluded.
    

    ![kerberos-kdc-config](../assets/img/using-wso2-identity-server/kerberos-kdc-config.png)

    ??? note "Click to see a sample service-provider.xml"

        ``` java
        <ServiceProvider>
            <ApplicationName>saml2-web-app-dispatch</ApplicationName>
            <Description/>
            <InboundAuthenticationConfig>
                <InboundAuthenticationRequestConfigs>
                    <InboundAuthenticationRequestConfig>
                        <InboundAuthKey>saml2-web-app-dispatch</InboundAuthKey>
                        <InboundAuthType>passivests</InboundAuthType>
                        <InboundConfigType>standardAPP</InboundConfigType>
                        <Properties/>
                    </InboundAuthenticationRequestConfig>
                    <InboundAuthenticationRequestConfig>
                        <InboundAuthKey>saml2-web-app-dispatch</InboundAuthKey>
                        <InboundAuthType>openid</InboundAuthType>
                        <InboundConfigType>standardAPP</InboundConfigType>
                        <Properties/>
                    </InboundAuthenticationRequestConfig>
                    <InboundAuthenticationRequestConfig>
                        <InboundAuthKey>saml2-web-app-pickup-dispatch.com</InboundAuthKey>
                        <InboundAuthType>samlsso</InboundAuthType>
                        <InboundConfigType>standardAPP</InboundConfigType>
                        <inboundConfiguration>
                            <![CDATA[
                            <?xml version="1.0" encoding="UTF-8" standalone="yes"?><samlssoServiceProviderDTO><issuer>saml2-web-app-pickup-dispatch.com</issuer><assertionConsumerUrls><assertionConsumerUrl>http://localhost.com:8080/saml2-web-app-pickup-dispatch.com/consumer</assertionConsumerUrl></assertionConsumerUrls><defaultAssertionConsumerUrl>http://localhost.com:8080/saml2-web-app-pickup-dispatch.com/consumer</defaultAssertionConsumerUrl><certAlias>wso2carbon</certAlias><loginPageURL></loginPageURL><attributeConsumingServiceIndex></attributeConsumingServiceIndex><doSingleLogout>true</doSingleLogout><doSignAssertions>true</doSignAssertions><doSignResponse>true</doSignResponse><requestedClaims/><requestedAudiences/><requestedRecipients/><enableAttributeProfile>false</enableAttributeProfile><isAssertionQueryRequestProfileEnabled>false</isAssertionQueryRequestProfileEnabled><enableAttributesByDefault>false</enableAttributesByDefault><nameIDFormat>urn/oasis/names/tc/SAML/1.1/nameid-format/emailAddress</nameIDFormat><idPInitSSOEnabled>false</idPInitSSOEnabled><idPInitSLOEnabled>false</idPInitSLOEnabled><idpInitSLOReturnToURLs/><doEnableEncryptedAssertion>false</doEnableEncryptedAssertion><doValidateSignatureInRequests>true</doValidateSignatureInRequests><signingAlgorithmURI>http://www.w3.org/2000/09/xmldsig#rsa-sha1</signingAlgorithmURI><digestAlgorithmURI>http://www.w3.org/2000/09/xmldsig#sha1</digestAlgorithmURI><assertionEncryptionAlgorithmURI>http://www.w3.org/2001/04/xmlenc#aes256-cbc</assertionEncryptionAlgorithmURI><keyEncryptionAlgorithmURI>http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p</keyEncryptionAlgorithmURI><enableSAML2ArtifactBinding>false</enableSAML2ArtifactBinding><doValidateSignatureInArtifactResolve>false</doValidateSignatureInArtifactResolve></samlssoServiceProviderDTO>
        ]]>
                        </inboundConfiguration>
                        <Properties/>
                    </InboundAuthenticationRequestConfig>
                </InboundAuthenticationRequestConfigs>
            </InboundAuthenticationConfig>
            <LocalAndOutBoundAuthenticationConfig>
                <AuthenticationSteps/>
                <AuthenticationType>default</AuthenticationType>
                <alwaysSendBackAuthenticatedListOfIdPs>false</alwaysSendBackAuthenticatedListOfIdPs>
                <UseTenantDomainInUsername>false</UseTenantDomainInUsername>
                <UseUserstoreDomainInRoles>true</UseUserstoreDomainInRoles>
                <UseUserstoreDomainInUsername>false</UseUserstoreDomainInUsername>
                <EnableAuthorization>false</EnableAuthorization>
            </LocalAndOutBoundAuthenticationConfig>
            <RequestPathAuthenticatorConfigs/>
            <InboundProvisioningConfig>
                <ProvisioningUserStore/>
                <IsProvisioningEnabled>false</IsProvisioningEnabled>
                <IsDumbModeEnabled>false</IsDumbModeEnabled>
            </InboundProvisioningConfig>
            <OutboundProvisioningConfig>
                <ProvisioningIdentityProviders/>
            </OutboundProvisioningConfig>
            <ClaimConfig>
                <RoleClaimURI/>
                <LocalClaimDialect>true</LocalClaimDialect>
                <IdpClaim/>
                <ClaimMappings/>
                <AlwaysSendMappedLocalSubjectId>false</AlwaysSendMappedLocalSubjectId>
                <SPClaimDialects/>
            </ClaimConfig>
            <PermissionAndRoleConfig>
                <Permissions/>
                <RoleMappings/>
                <IdpRoles/>
            </PermissionAndRoleConfig>
            <IsSaaSApp>false</IsSaaSApp>
        </ServiceProvider>
        ```

You have successfully exported the service provider. You can now make
changes to the configurations and import the service provider as
required.

### Import a service provider

1.  Navigate to `           <IS_HOME>/bin/          ` and run the
    following command to start WSO2 Identity Server.

    Windows:
    ``` java
    .\wso2server.bat
    ```
    Linux/Unix:
    ``` java
    sh wso2server.sh
    ```

2.  Access the following URL and log in to the management console using
    admin/admin credentials: <https://localhost:9443/carbon/>

3.  Click **Add** under **Service Providers** on the **Main** tab to
    create a new service provider.
4.  Select **File Configuration** and click **Choose File** to upload
    the xml configuration file of the service provider you wish to
    import.  
    ![file-config](../assets/img/using-wso2-identity-server/file-config.png)
5.  Upload the xml file and click **Import**.  
    ![import-xml](../assets/img/using-wso2-identity-server/import-xml.png)
6.  You can make changes to the service provider configurations if
    required and click **Update** to save.  
    You will see the service provider listed under **Service Providers**
    . You have successfully imported the service provider.  
    ![sp-list](../assets/img/using-wso2-identity-server/sp-list.png)

!!! tip "Troubleshooting tip"
    
    If you attempt to upload a service provider with the same name as one of
    the existing service providers within that tenant, you may receive the
    following error. This is because the service provider already exists.
    
    ![sp-error](../assets/img/using-wso2-identity-server/sp-error.png)
    
    To resolve this error you can:
    
    -   Rename the service provider by editing the xml file and upload it
        again.
    -   Ensure that you are logged in as the tenant admin to the tenant you
        wish to import this service provider to.
    
