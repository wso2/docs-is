# Configuring Inbound Authentication for a Service Provider

The inbound authenticator component of WSO2 Identity Server identifies
and parses all the incoming authentication requests and builds the
corresponding response. A given inbound authenticator has two parts:

-   Request Processor
-   Response Builder

For each protocol supported by WSO2 Identity Server, there should be an
inbound authenticator. WSO2 Identity Server includes inbound
authenticators for SAML 2.0, OpenID Connect, OAuth 2.0, Kerberos KDC,
WS-Trust STS, and WS-Federation (passive). The responsibility of the
SAML 2.0 request processor is to accept a SAML request from a service
provider, validate the SAML request, and build a common object model
that is understood by the authentication framework and handover the
request to it. The responsibility of the SAML response builder is to
accept a common object model from the authentication framework and build
a SAML response out of it.

Both the request processors and the response builders are
protocol-aware, while the authentication framework is not coupled to any
protocol. For more information on the inbound authentication flow, see
[Architecture](../../get-started/architecture).

Let's learn how to configure inbound authentication for a service
provider.

!!! Tip "Before you begin"	
    You must first
    [register a service provider](../../learn/adding-and-configuring-a-service-provider/#adding-a-service-provider).
    
!!! warning "Removed Feature!"
    OpenID 2.0 has been removed from the base product in WSO2 Identity
    Server version 5.3.0 onwards as it is now an obsolete specification and
    has been superseded by OpenID Connect. Alternatively, we recommend that
    you use [OpenID Connect](../../learn/oauth2-openid-connect-overview).

You can configure inbound authentication in the following ways:

### Configuring inbound authentication with SAML2 Web SSO

See [here](../../learn/configuring-saml2-web-single-sign-on)
for instructions on configuring inbound authentication with SAML2 Web SSO. 

### Configuring inbound authentication with OAuth/OpenID Connect

See [here](../../learn/configuring-oauth2-openid-connect-single-sign-on)
for instructions on configuring inbound authentication with Oauth/OpenID Comnnect.

### Configuring inbound authentication with WS-Federation

See [here](../../learn/configuring-ws-federation-single-sign-on)
for instructions on configuring inbound authentication with WS-Federation.

### Configuring inbound authentication with WS-Trest Security Token Service

See [here](../../learn/configuring-ws-trust-security-token-service)
for instructions on configuring inbound authentication with ws-trest security token service.

!!! info "Related Topics"

    See [Single Sign-On](../../learn/single-sign-on) for details on configuring single
    sign-on for service provider using inbound authentication. See the
    following topics for samples of configuring single sign-on:

    -   [Configuring Single Sign-On](../../learn/configuring-single-sign-on)
    -   [Logging in to WSO2 Products via the Identity
        Server](../../learn/logging-in-to-wso2-products-via-the-identity-server)
