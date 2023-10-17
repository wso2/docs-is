---
template: templates/redoc.html
---

!!! Note

    - From WSO2 IS 6.0.0 onwards, access tokens mapped with the session via REST API can be revoked. 
      This is applicable for authorization code grant, implicit flow, refresh token grant, and hybrid flow. 
    - If a session is terminated via the API and the same access token is used by multiple sessions, the other sessions will lose their tokens. Therefore, it is recommended to use sso-session binding if you wish to retain the capability to revoke the access token when the session is terminated via the REST API.
    - WSO2 Identity Server also sends SAML/OIDC back-channel logouts when the session is terminated via the API. To support this, you should configure the application to enable back-channel logout.

<redoc spec-url="../../apis/restapis/session.yaml"></redoc>
