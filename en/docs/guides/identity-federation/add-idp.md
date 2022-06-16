# Introduction

WSO2 Identity Server allows you to add identity providers (IdP) and specify various details that help you to link the identity provider to WSO2 Identity Server. To properly configure the IdPs you must specify all information required to send the authentication requests and get a response back from the identity provider.

This guide walks you through the process of adding and configuring identity providers based on your requirements.

!!! note
    Adding and configuring an IdP can be performed by administrators only.

## Add an identity provider

To add a new identity provider.

1. On WSO2 Identity Server [Management
    Console](../../setup/getting-started-with-the-management-console), go to **Main > Identity \> Identity Providers**

2. Click **Add**, and enter the details in the **Basic Information** section.  
    ![basic-info](../../assets/img/guides/add-identity-provider-screen.png)

    | Method      | Description                          | Sample Value                         |
    | ----------- | ------------------------------------ | ------------------------------------ |
    | Identity Provider Name       | A unique name used as the primary identifier of the IdP. | `FacebookIdP`
    | Display Name       | This is used to identify the identity provider. If this is left blank, the Identity Provider Name is used. | `Facebook`                       |
    | Description    | A description about the identity provider. | `This is the identity provider configuration for Facebook.`                       |
    | Federation Hub Identity Provider    | Select the Federation Hub Identity Provider check-box to indicate if this points to an identity provider that acts as a federation hub. | Selected                        |
    | Home Realm Identifier    | This value is an identifier when your application useds federated IdP. If a user selects this IdP, and an authentication request is sent, the `fidp` query parameter will be populated with this value. (example: `fidp` = googleIdP) | `googleIdP`                         |
    | Choose IDP certificate type    | This is used to authenticate responses from the IdP. You can either **Upload IDP certificate** or use the **Use IDP JWKS endpoint**.       | Selected                        |
    | Identity Provider's JWKS Endpoint:    | If you have selected **Use IDP JWKS endpoint** in the above field, this field will appear. You need to add the JWKS endpoint URL in this field.        | Selected                        |
    | Identity Provider Public Certificate    | If you have selected **Upload IDP certificate** in the above field, this field will appear. You need to upload the public certificate of your IdP in this field.      | Selected                        |
    | Alias    | This is a value that has an equivalent value specified in the identity provider that we are configuring. This is required for authentication in some scenarios. | http://localhost:9443/oauth2/token                         |
    | Identity Provider's Issuer Name    | This is an optional property that can be used to define the issuer name of the Identity Provider if it is different from the Identity Provider Name. | http://is.wso2.com                        |

    ??? note "Create IdP certificate"

        To create the identity provider certificate, navigate to the ```<IS_HOME>/repository/resources/security/``` directory, open a terminal, and execute the following command:

            keytool -export -alias wso2carbon -file wso2.crt -keystore wso2carbon.jks -storepass wso2carbon
            
        See [Using Asymmetric Encryption](../../deploy/security/use-asymmetric-encryption.md) guide for more information about certificates.

    ??? note "Federation hub and the home realm identifier"
        A federation hub is a collection of multiple IdPs configured on WSO2 Identity Server.

        On the federation hub, each IdP is recognized by the **home realm identifier** of the IdP. This home realm identifier is configured when creating the IdP.

        The following diagrams illustrates the work flow of authentication with a federated hub.

        ![fed-hub-home-realm-identifier]( ../../assets/img/guides/federation-hub-flow.png) 

        When the Home Realm Identifier is not specified, you can either
        select the domain name from a dropdown in the login page, or you
        have to enter the domain value in a separate page prior to logging
        in (as shown below).
        
        ![home-realm-identifier]( ../assets/img/using-wso2-identity-server/home-realm-identifier.png) 
                    
        The `proxy_mode` configuration allows the framework to operate in either `smart` mode or `dumb` mode. 
        
        In `smart` mode, both local and federated authentication is supported, while in `dumb` mode, only federated authentication is supported. If `dumb` mode is configured here, you must provide the Home Realm Identifier,
        or you have to display a separate screen to the user to get it.

        If smart mode is configured, the default behavior applies, where you can enter a local username and 
        password, or use federated authenticators for authentication.
        
        To configure the `proxy_mode`, open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory 
        and add the following configuration.
        ```               
        [authentication] 
        proxy_mode="smart" 
        ```       

    ??? note "Details about Alias"

        The **Alias** is used in the following authentication scenario.

        ![alias-authentication]( ../assets/img/using-wso2-identity-server/alias-authentication.png)

        Here a SAML identity provider sends a SAML token to a web
        application for authentication. The SAML token has an audience
        restriction element that controls access and has a reference to the
        web application in order to access it. Using this token, the
        authentication takes place. Now, if the web application needs to
        access an API that is protected by OAuth 2.0, the same SAML token is
        sent to the token endpoint of the Identity Server. The **Alias**
        value you configure in the Identity Server is associated with this
        token endpoint. This alias value must be added to the audience
        restriction element of the SAML token. When this SAML token is sent
        to the Identity Server, you obtain an access token, which is used to
        access the API.

        So in order to configure this, you must add the SAML identity
        provider as an identity provider in the Identity Server using the
        instructions in this topic. When configuring this in the Identity
        Server, you must specify the token alias for this scenario to work.
        This indicates that any token coming from the SAML identity provider
        must have this alias value in the audience restriction element.

3. Click the arrow buttons to expand the forms available to update the other configurations if required.
    [!expand-configurations](../../assets/img/guides/adding-configs-for-the-idp.png)

    !!! info
        **Identity Provider Name** is the only required field. You can fill in the remaning details if applicable.

        For more information about the other configurations, see the following documentation. 
        
        - [Configure claims for an IdP](../identity-federation/claims-idp.md)
        - [Configure roles for an IdP](../identity-federation/roles-idp.md)
        - [Configure federated authenticators](../identity-federation/configure-ad-fs-as-a-federated-authenticator.md)
        - [Configure just-in-time provisioning](../identity-federation/jit-workflow.md)
        - [Configure outbound provisioning connectors](../identity-federation/outbound-provisioing-idp.md)

4. Click **Register** to add the Identity Provider.

## Configuring a resident identity provider

Apart from mediating authentication requests between service providers
and identity providers, WSO2 Identity Server can act as a service
provider and an identity provider. When WSO2 Identity Server acts as an
identity provider, it is called the **resident identity provider**.

!!! note
    The resident identity provider configuration helps service providers
    to send authentication or provisioning requests to WSO2 Identity Server via SAML, OpenID Connect, SCIM, or WS-Trust.

    For an example on how a resident identity provider is used to implement a security token service, see [Configuring WS-Trust Security Token Service](../../learn/configuring-ws-trust-security-token-service).
    
    The Resident identity provider configuration is a one-time configuration for a given tenant. It shows WSO2 Identity Server's metadata, e.g., endpoints. The resident identity provider configurations can be used to secure the WS-Trust endpoint with a security policy.

Follow the instructions below to configure a resident identity provider:

1. On the WSO2 Identity Server Management Console, go to **Main \> Identity \> Identity Providers \> Resident**.  
    ![idp-resident-main](../assets/img/using-wso2-identity-server/idp-resident-main.png)
    The Resident Identity Provider page appears.  
    ![resident-identity-provider](../assets/img/using-wso2-identity-server/resident-identity-provider.png)

2. Enter the required values as given below.

    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    <th>Sample Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><strong>Home Realm Identifier</strong></td>
    <td>This is the domain name of the identity provider. If you do not enter a value here, when an authentication request comes to WSO2 Identity Server, a user will be prompted to specify a domain. You can enter multiple identifiers as a comma-separated list.</td>
    <td><code>localhost</code></td>
    </tr>
    <tr class="even">
    <td><strong>Idle Session Time Out</strong></td>
    <td>This is the duration in minutes for which an SSO session can be idle for. If WSO2 Identity Server does not receive any SSO authentication requests for the given duration, a session time out occurs. The default value is <code>15</code> .</td>
    <td><code>15</code></td>
    </tr>
    <tr class="odd">
    <td><strong>Remember Me Period</strong></td>
    <td><div class="content-wrapper">
    <p>This is the duration in weeks for which WSO2 Identity Server should remember an SSO session given that you have selected the <strong>Remember Me</strong> option in the WSO2 Identity Server login screen.</p>
    <p>The default value is <code>2</code> weeks.</p>
    </div></td>
    <td><code>2</code></td>
    </tr>
    </tbody>
    </table>

5. You may configure inbound authentication by expanding the **Inbound
    Authentication Configuration** section.  
    1. To configure SAML2 configurations:
        1. Click **SAML2 Web SSO Configuration**.  
            ![saml2-sso-config](../assets/img/using-wso2-identity-server/saml2-sso-config.png)
            The SAML2 Web SSO Configuration form appears.  
            ![saml2-sso-form]( ../assets/img/using-wso2-identity-server/saml2-sso-form.png)

        2. Enter the required values and learn the fixed values as given below.

            | Field                           | Description                                                                                                                                                                             | Sample/Fixed Value                                                                                                      |
            |---------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
            | **Identity Provider Entity ID** | This is for tenant identification. The users who are provisioned through this tenant can be identified using this ID.                                                                   | `localhost`                                                                      |
            | **Destination URLs**            | This defines the destination URL of the identity provider. This helps the service providers that connect to WSO2 Identity Server through a proxy server to locate WSO2 Identity Server. | `https://localhost:9443/samlsso`        |
            | **SSO URL**                     | This is the SAML SSO endpoint of the identity provider.                                                                                                                                 | `https://localhost:9443/samlsso`        |
            | **Logout Url**                  | This is the identity provider's end point that accepts SAML logout requests.                                                                                                            | `https://localhost:9443/samlsso`        |
            | **Artifact Resolution URL**     | This is the identity provider's endpoint that resolves SAML artifacts.                                                                                                                  | `https://localhost:9443/samlartresolve` |
            | **Metadata Validity Period**    | This is the duration for which the metadata will be valid for.                                                                                                                          | `60`                                                                             |
            | **Enable metadata signing**     | This facilitates to enable or disable metadata signing                                                                                                                                  | `false`                                                                          |

    2. To configure OAuth2 or OIDC, click **OAuth2/OpenID Connect
        Configuration**.  
        ![oauth2-oidc-config](../assets/img/using-wso2-identity-server/oauth2-oidc-config.png)

        | Field                                        | Description                                                                                                                                                                                         | Sample/Fixed Value                                                                                                                     |
        |----------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
        | **Identity Provider Entity ID**              | This is for tenant identification. The users who are provisioned through this tenant can be identified using this ID.                                                                               | `localhost`                                                                                         |
        | **Authorization Endpoint URL**               | This is the identity provider's OAuth2/OpenID Connect authorization endpoint URL.                                                                                                                   | `https://localhost:9443/oauth2/authorize`                      |
        | **Token Endpoint URL**                       | This is the identity provider's token endpoint URL.                                                                                                                                                 | `https://localhost:9443/oauth2/token`                          |
        | **Token Revocation Endpoint URL**            | This is the URL of the endpoint at which access tokens and refresh token are revoked.                                                                                                               | `https://localhost:9443/oauth2/revoke`                         |
        | **Token Introspection Endpoint URL**         | This is the URL of the endpoint at which OAuth tokens are validated.                                                                                                                                | `https://localhost:9443/oauth2/introspect`                     |
        | **User Info Endpoint URL**                   | This the URL of the endpoint through which user information can be retrieved. The information is gathered by passing an access token.                                                               | `https://localhost:9443/oauth2/userinfo`                       |
        | **Session iFrame Endpoint URL**              | This the URL of the endpoint that provides an iframe to synchronize the session states between the client and the identity provider.                                                                | `https://localhost:9443/oidc/checksession`                     |
        | **Logout Endpoint URL**                      | This is the identity provider's endpoint that accepts SAML logout requests.                                                                                                                         | `https://localhost:9443/oidc/logout`                           |
        | **Web finger Endpoint URL**                  | This is the URL of the OpenID Connect token discovery endpoint at which WSO2 Identity Server's meta data are retrieved from.                                                                        | `https://localhost:9443/.well-known/webfinger`                 |
        | **Discovery Endpoint URL**                   | This is the URL of the endpoint that is used to discover the end user's OpenID provider and obtain the information required to interact with the OpenID provider, e.g., OAuth 2 endpoint locations. | `https://localhost:9443/oauth2/oidcdiscovery`                  |
        | **Dynamic Client Registration Endpoint URL** | This is the URL of the endpoint at which OpenID Connect dynamic client registration takes places.                                                                                                   | `https://localhost:9443/api/identity/oauth2/dcr/v1.1/register` |
        | **JWKS Endpoint URL**                        | This is the URL of the endpoint that returns WSO2 Identity Server's public key set in JSON Web Key Set (JWKS) format.                                                                               | `https://localhost:9443/oauth2/jwks`                           |

    3. To secure the WS-Trust endpoint with a security policy, click
        **Security Token Service Configuration** section.  
        ![ws-trust-endpoint-security]( ../assets/img/using-wso2-identity-server/ws-trust-endpoint-security.png)
        For more information on security token service (STS), see
        [Configuring WS-Trust Security Token
        Service](../../learn/configuring-ws-trust-security-token-service).

6. You may view the inbound provisioning configurations by clicking
    **Inbound Provisioning Configuration** section.
    ![inbound-porvisioning-configuration](../assets/img/using-wso2-identity-server/inbound-porvisioning-configuration.png)

    | Field                   | Description                                                                                                                                                    | Sample Value                                                                                              |
    |-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
    | **SCIM User Endpoint**  | This is the identity provider's endpoint for SCIM user operations, e.g., creating and managing users.                                                          | `https://localhost:9443/wso2/scim/Users`  |
    | **SCIM Group Endpoint** | This is the identity provider's endpoint for the SCIM user role operations, e.g., creating user roles, assigning user roles to users, and managing user roles. | `https://localhost:9443/wso2/scim/Groups` |

7. Click **Update**.

!!! note
    To modify the host name of the above mentioned URLs,

    Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory and add the following configuration.

        ``` xml
        [server]
        hostname = "localhost"
        ```
    
        ``` xml
        [sts.endpoint] 
        idp="https://localhost:9443/samlsso"
        ```
    
        To ensure the client application is communicating with the right
        identity provider, WSO2 Identity Server compares the destination
        value in the SAML request with the URL in the above configuration.


### <a name="exporting-saml2-metadata-of-the-resident-idp"></a> Exporting SAML2 metadata of the resident IdP

To configure WSO2 Identity Server as a trusted identity provider in a
service provider application, export the SAML2 metadata of the resident
identity provider of WSO2 IS and import the metadata to the relevant
service provider.

!!! tip
    Use **one** of the following approaches to do this.

    -   Start the server and download the SAML2 metadata by accessing this
        URL: <https://localhost:9443/identity/metadata/saml2>.
    -   **Alternatively**, access the management console and follow the
        steps given below to download the metadata.

1. Expand the **Inbound Authentication Configuration** section and then
    expand **SAML2 Web SSO Configuration**.
2. Click **Download SAML2 metadata**. A `metadata.xml` file will be downloaded on to your machine.
3. Import the `metadata.xml` file to thenrelevant service provider to configure WSO2 Identity Server as antrusted identity provider for your application.

    ![import-sp]( ../assets/img/using-wso2-identity-server/import-sp.png) \

## Managing identity providers

This section provides instructions on how to manage identity providers
once they are created.

### Viewing identity providers

Follow the instructions below to view the list of identity providers
added in the WSO2 Identity Server.

1. Sign in. Enter your username and password to log on to
    the Management Console.
2. In the **Main** menu under the **Identity** section, click **List**
    under **Identity Providers**. The list of identity providers you
    added appears.  
    ![identity-provider-list](../assets/img/using-wso2-identity-server/identity-provider-list.png)

### Editing identity providers

Follow the instructions below to edit an identity provider's details.

1. Sign in. Enter your username and password to log on to
    the Management Console.
2. In the **Main** menu under the **Identity** section, click **List**
    under **Identity Providers**. The list of identity providers you
    added appears.
3. Locate the identity provider you want to edit and click on the
    corresponding **Edit** link.  
    ![idp-edit](../assets/img/using-wso2-identity-server/idp-edit.png)
4. You are directed to the edit screen where you can modify the details
    you configured for the identity provider.

### Deleting identity providers

Follow the instructions below to delete an identity provider.

1. Sign in. Enter your username and password to log on to
    the Management Console.
2. In the **Main** menu under the **Identity** section, click **List**
    under **Identity Providers**. The list of identity providers you
    added appears.
3. Locate the identity provider you want to delete and click on the
    corresponding **Delete** link.  
    ![delete-idp](../assets/img/using-wso2-identity-server/delete-idp.png)
4. Confirm your request in the WSO2 Carbon window. Click the **Yes**
    button.

#### Disabling/Enabling identity providers

Follow the instructions below to disable or enable an identity provider.

1. Sign in. Enter your username and password to log on to
    the Management Console.
2. In the **Main** menu under the **Identity** section, click **List**
    under **Identity Providers**. The list of identity providers you
    added appears.
3. Locate the identity provider you want to delete and click on the
    corresponding **Disable** link to disable the identity provider.
    Clicking this link will change the link to **Enable**. To enable
    the identity provider again, click the **Enable** link.
    ![enable-disable-idp](../assets/img/using-wso2-identity-server/enable-disable-idp.png)
4. Click **Ok** on the confirmation form that appears when clicking
    **Disable** / **Enable**.  

!!! info "Related Topics"

    See the following topics for information on configuring service
    providers using different specifications.

    -   See [Identity Federation](../../learn/identity-federation) for information on configuring federated authenticators.

    See the following topics to configure different applications as service providers in Identity Server.

    -   [Configuring Shibboleth IdP as a Trusted Identity
        Provider](../../learn/configuring-shibboleth-idp-as-a-trusted-identity-provider)
    -   [Logging in to Salesforce with
        Facebook](../../learn/logging-in-to-salesforce-with-facebook)
    -   [Logging in to Salesforce with Integrated Windows
        Authentication](../../learn/logging-in-to-salesforce-with-integrated-windows-authentication)
    -   [Logging in to your application via Identity Server using Facebook
        Credentials](../../learn/logging-in-to-your-application-via-identity-server-using-facebook-credentials)