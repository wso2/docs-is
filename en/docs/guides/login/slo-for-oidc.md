#OpenID Connect Single Logout

The following three single logout mechanisms are supported by OpenID Connect:  

- [OpenID Connect Session Management](../../../references/concepts/authentication/session-management) is enabled by 
  default for all OAuth/OpenID Connect service providers in WSO2 Identity Server. For more information on configuring an 
  OAuth/OpenID Connect application, see [Enable Authentication for an OIDC Web Application](../webapp-oidc). To configure 
  this logout mechanism in your application, see [Manage User Sessions and Logout](../session-management-logout).

- [OpenID Connect Back-Channel Logout](../../../references/concepts/authentication/back-channel-logout) can be configured using one of the following methods:
    1. via OpenID Connect Dynamic Client Registration (DCR)
    2. manually via the WSO2 IS management console <br>

    To configure this logout mechanism in your application, see [Configure OpenID Connect Back-Channel Logout](../oidc-backchannel-logout).

- OpenID Connect Front-Channel Logout is on the WSO2 Identity Server roadmap and will be available in a future release.