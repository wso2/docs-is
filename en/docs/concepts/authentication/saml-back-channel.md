# SAML Back-Channel Logout

SAML back-channel logout enables a user to log out of an application and simulatenously log out of other connected applications without having to explicity log out of them one by one. The [SAML 2.0](TODO:link-to-concept) protocol has two approaches for single logout. 

1. Synchronous binding (back-channel)
2. Asynchronous binding (front-channel)

The main difference between back-channel logout and front-channel logout is that the front-channel method uses web browser redirections and user sessions to handle the logout, but the back-channel method is handled via server-to-server communication and the need for browser redirections is eliminated. When using the back channel protocol, you can rely on mutually authenticated TLS (Transport Layer Security) for end-to-end security since the communication is point-to-point. 

---

## The flow

Back-channel logout has two different usecases:

1. **SP-initiated logout**: Logout initiated by the service provider application.

2. **IdP-initiated logout**: Logout initiated by the identity provider. 

The following diagram illustrates the two flows.

![saml-back-channel](../../assets/img/concepts/saml-back-channel.png)

**Case 1: User attempts to log out from SP 1 (SAML SSO authenticated session)**

- Since the user is logged into Service Provider 1 (SP1) by default in the SAML flow, SP1 sends an sp-initiated logout request.

- Once the logout request is received, the identity provider will send the back-channel logout requests to all the service providers which have Single Logout (SLO) enabled.

- Since Service Provider 2 (SP2) is logged in using back-channel authentication, it will invalidate the local session mapped to the session index ID.

- Finally, the identity provider sends a SAML logout response to SP1, and SP1 will invalidate the local session mapped to the session index ID.

**Case 2: User attempts to log out from SP2 (Back channel authenticated session)**

- Since the user is logged into SP2 using back-channel authentication, SP2 will trigger an idp-initiated SAML logout request.

- The identity provider will send a logout request to all the service providers in the same SAML SSO session (SP1 and SP2).

- All service providers will invalidate their local session and SP2 will be redirected to the return URL specified in the logout request.

---

!!! info "Related Topics"
    - [Concept: SAML 2.0](TODO:link-to-concept)
    - [Concept: SAML Front-Channel Logout](../saml-front-channel)
    - [Guide: SAML Back-Channel Logout](../../../guides/login/saml-back-channel-logout)
    - [Demo: SAML Back-Channel Logout](../../../quick-starts/saml-front-channel-logout)


