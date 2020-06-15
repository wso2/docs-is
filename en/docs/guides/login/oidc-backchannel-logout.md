# Configure OpenID Connect Back-Channel Logout

This page guides you through configuring [OpenID Connect back-channel logout](../../../concepts/authentication/back-channel-logout) between OpenID Connect Relying Parties (RP) or client applications. 

----

This guide assumes you have your own applications. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/oidc-backchannel-logout-sample"   rel="nofollow noopener">Try it with the sample</a>

----

The following three single logout mechanisms are supported by OpenID Connect:  

- [OpenID Connect Session Management](../../../concepts/authentication/session-management) is enabled by default for all OAuth/OpenID Connect service providers in WSO2 Identity Server. For more information on configuring an OAuth/OpenID Connect application, see [Enable Authentication for an OIDC Web Application](..//webapp-oidc.md). 

- [OpenID Connect Back-Channel Logout](../../../concepts/authentication/back-channel-logout) can be configured using one of the following methods:
    - via OpenID Connect Dynamic Client Registration (DCR)
    - manually via the WSO2 IS management console

- [OpenID Connect Front-Channel Logout](TODO:insert-link) is on the WSO2 Identity Server roadmap and will be available in a future release. 

----

The instructions below guide you through configuring OpenID Connect Back-Channel Logout.

(TODO: dev-portal-fragment)
{!fragments/register-a-service-provider.md!}

----

(TODO: dev-portal-fragment)
{!fragments/oauth-app-config-basic.md!}

----

## Discover the logout endpoint

(TODO: dev-portal-content)

To enable OIDC back-channel logout, the relying party/client application needs to obtain the OpenID Provider's logout endpoint URL.

- If you are using WSO2 Identity Server as the identity provider, do the following to view the logout endpoint URL. 

    1. Click **Identity Providers > Resident**. 

    2. Expand **Inbound Authentication Configuration** and then expand **OAuth2/OpenID Connect Configuration**. 

        Note the listed identity provider's **Logout Endpoint URL**. 

- If you are using a different identity provider, use the [OpenID Connect discovery](../oidc-discovery) endpoint to obtain the OpenID Provider's logout endpoint URL. The logout endpoint URL can be discovered using the `end_session_endpoint` parameter in the OIDC Discovery response.

----

{!fragments/oidc-backchannel-logout.md!}

----

!!! info "Related Topics"
    - [Concept: OpenID Connect Back-Channel Logout](../../../concepts/authentication/back-channel-logout)
    - [Demo: OpenID Connect Back-Channel Logout](../../../quick-starts/oidc-backchannel-logout-sample)
    - [Guide: OpenID Connect Session Management](../session-management-logout)

