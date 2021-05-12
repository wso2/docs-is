# Configure OpenID Connect Back-Channel Logout

This page guides you through configuring [OpenID Connect back-channel logout](../../../references/concepts/authentication/back-channel-logout) between OpenID Connect Relying Parties (RP) or client applications. 

----

This guide assumes you have your own applications. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/oidc-backchannel-logout-sample"   rel="nofollow noopener">Try it with the sample</a>

---- 

## Create a service provider

{!fragments/register-a-service-provider.md!}

----

## Basic OAuth/OpenID Connect configuration
{!fragments/oauth-app-config-basic.md!}

----

## Discover the logout endpoint


To enable OIDC back-channel logout, the relying party/client application needs to obtain the OpenID Provider's logout endpoint URL.

- If you are using WSO2 Identity Server as the identity provider, do the following to view the logout endpoint URL. 

    1. Click **Identity Providers > Resident**. 

    2. Expand **Inbound Authentication Configuration** and then expand **OAuth2/OpenID Connect Configuration**. 

        Note the listed identity provider's **Logout Endpoint URL**. 
        
        ![oidc-logout-url](/assets/img/guides/oidc-logout-url.png)

- If you are using a different identity provider, use the [OpenID Connect discovery](../oidc-discovery) endpoint to obtain the OpenID Provider's logout endpoint URL. The logout endpoint URL can be discovered using the `end_session_endpoint` parameter in the OIDC Discovery response.

----

{!fragments/oidc-backchannel-logout.md!}

----

!!! info "Related Topics"
    - [Concept: OpenID Connect Back-Channel Logout](../../../references/concepts/authentication/back-channel-logout)
    - [Demo: OpenID Connect Back-Channel Logout](../../../quick-starts/oidc-backchannel-logout-sample)

