# Configure inbound authentication

This section of the guide walks you through how to configure inbound authentication for your resident IdP using the following technologies:

- [SAML2 Web SSO Configuration](#saml2-configurations)
- [OAuth2/OpenID Connect Configuration](#oauth2openid-connect-configurations)

## SAML2 configurations
1. To configure SAML2 configurations:
    1. Click **SAML2 Web SSO Configuration**.  
        ![saml2-sso-form]( {{base_path}}/assets/img/guides/saml2-config-idp.png)

    2. Enter the required values and learn the fixed values as given below.

        | Field                           | Description                                                                                                                                                                             | Sample/Fixed Value                                                                                                      |
        |---------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
        | **Identity Provider Entity ID** | This is for tenant identification. The users who are provisioned through this tenant can be identified using this ID.                                                                   | `localhost`                                                                      |
        | **Destination URLs**            | This defines the destination URL of the identity provider. This helps the service providers that connect to WSO2 Identity Server through a proxy server to locate WSO2 Identity Server. | `https://localhost:9443/samlsso`        |
        | **SSO URL**                     | This is the SAML SSO endpoint of the identity provider.                                                                                                                                 | `https://localhost:9443/samlsso`        |
        | **Logout Url**                  | This is the identity provider's endpoint that accepts SAML logout requests.                                                                                                            | `https://localhost:9443/samlsso`        |
        | **Artifact Resolution URL**     | This is the identity provider's endpoint that resolves SAML artifacts.                                                                                                                  | `https://localhost:9443/samlartresolve` |
        | **Metadata Validity Period**    | This is the duration for which the metadata will be valid.                                                                                                                          | `60`                                                                             |
        | **Enable metadata signing**     | This facilitates enabling or disabling metadata signing                                                                                                                                  | `false`                                                                          |

    3. Click **Update** to save the configurations.

## OAuth2/OpenID Connect configurations
1. To configure OAuth2 or OIDC:
    1. Click **OAuth2/OpenID Connect Configuration**.  
        ![oauth2-oidc-config]({{base_path}}/assets/img/guides/oauth-oidc-config-idp.png)

    2. Enter the required values and learn the fixed values as given below.

        | Field                                        | Description                                                                                                                                                                                         | Sample/Fixed Value                                                                                                                     |
        |----------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
        | **Identity Provider Entity ID**              | This is for tenant identification. The users who are provisioned through this tenant can be identified using this ID.                                                                               | `localhost`                                                                                         |
        | **Authorization Endpoint URL**               | This is the identity provider's OAuth2/OpenID Connect authorization endpoint URL.                                                                                                                   | `https://localhost:9443/oauth2/authorize`                      |
        | **Token Endpoint URL**                       | This is the identity provider's token endpoint URL.                                                                                                                                                 | `https://localhost:9443/oauth2/token`                          |
        | **Token Revocation Endpoint URL**            | This is the URL of the endpoint at which access tokens and refresh tokens are revoked.                                                                                                               | `https://localhost:9443/oauth2/revoke`                         |
        | **Token Introspection Endpoint URL**         | This is the URL of the endpoint at which OAuth tokens are validated.                                                                                                                                | `https://localhost:9443/oauth2/introspect`                     |
        | **User Info Endpoint URL**                   | This is the URL of the endpoint through which user information can be retrieved. The information is gathered by passing an access token.                                                               | `https://localhost:9443/oauth2/userinfo`                       |
        | **Session iFrame Endpoint URL**              | This is the URL of the endpoint that provides an iframe to synchronize the session states between the client and the identity provider.                                                                | `https://localhost:9443/oidc/checksession`                     |
        | **Logout Endpoint URL**                      | This is the identity provider's endpoint that accepts SAML logout requests.                                                                                                                         | `https://localhost:9443/oidc/logout`                           |
        | **Web finger Endpoint URL**                  | This is the URL of the OpenID Connect token discovery endpoint from which WSO2 Identity Server's metadata are retrieved from.                                                                        | `https://localhost:9443/.well-known/webfinger`                 |
        | **Discovery Endpoint URL**                   | This is the URL of the endpoint that is used to discover the end user's OpenID provider and obtain the information required to interact with the OpenID provider, e.g., OAuth 2 endpoint locations. | `https://localhost:9443/oauth2/oidcdiscovery`                  |
        | **Dynamic Client Registration Endpoint URL** | This is the URL of the endpoint at which OpenID Connect dynamic client registration takes place.                                                                                                   | `https://localhost:9443/api/identity/oauth2/dcr/v1.1/register` |
        | **JWKS Endpoint URL**                        | This is the URL of the endpoint that returns WSO2 Identity Server's public key set in JSON Web Key Set (JWKS) format.                                                                               | `https://localhost:9443/oauth2/jwks`                           |

    3. Click **Update** to save the configurations.

    <!-- 3. To secure the WS-Trust endpoint with a security policy, click
        **Security Token Service Configuration** section.  
        ![ws-trust-endpoint-security]( {{base_path}}/assets/img/using-wso2-identity-server/ws-trust-endpoint-security.png)
        For more information on security token service (STS), see
        [Configuring WS-Trust Security Token
        Service]({{base_path}}/learn/configuring-ws-trust-security-token-service). -->

## Identity Server as a trusted IdP

To configure WSO2 Identity Server as a trusted identity provider in a service provider application, you need to perform the following tasks.
1. Export the SAML2 metadata of the resident identity provider.
2. Import the metadata to the relevant service provider.

!!! tip
    Use **one** of the following approaches to do this.

    -   Start the server and download the SAML2 metadata by accessing this
        URL: <https://localhost:9443/identity/metadata/saml2>.
    -   **Alternatively**, access the management console and follow the
        steps given below to download the metadata.

1. Expand the **Inbound Authentication Configuration > SAML2 Web SSO Configuration**.
2. Click **Download SAML Metadata**, to download the `metadata.xml` file.
3. Import the `metadata.xml` file to the relevant service provider.

    <!-- ![import-sp]( {{base_path}}/assets/img/using-wso2-identity-server/import-sp.png) \ -->