# SAML Front-Channel Logout

{!fragments/saml-logout-concept.md!}

The SAML 2.0 specification specifies three types of asynchronous (front-channel) bindings to send a request to the identity provider through the user agent.

- **HTTP Redirect binding**: This method transfers data using HTTP redirects and query parameters. The logout request is signed and the signature is sent as a query parameter. 

- **HTTP POST binding**: This method transfers data using HTTP POST forms. The logout request is signed and the signature is embedded in the SAML request body. 

- **Artifact binding**: Generally, SAML authentication requests and assertion data is sent through the browser using POST or HTTP Redirect binding. To avoid exposing the entire message to the browser this way, use [artifact binding](TODO:link-to-guide/concept) instead. 

---

## The flow

Front-channel logout has two different use cases:

1. **SP-initiated logout**: Logout initiated by the service provider application.

2. **IdP-initiated logout**: Logout initiated by the identity provider. 

The following diagram illustrates the flow for **SP-initiated logout**. 

![saml-front-channel](/assets/img/concepts/saml-front-channel.png)

1. issue `<LogoutRequest>` 

    The session participant initiates a single logout request and terminates the principal's session(s) by sending a `<LogoutRequest>` message through the user agent to the identity provider from whom it received the corresponding authentication assertion. 

2. determines session participants

    The identity provider uses the contents of the `<LogoutRequest>` message to determine the session(s) being terminated. If there are no other session participants, the profile proceeds with step 5. Else, steps 3 and 4 are repeated for each session participant identified.

3. issue `<LogoutRequest>` to other session participants

    The identity provider issues a `<LogoutRequest>` message through the user agent to another session participant, or a session authority related to one or more of the session(s) being terminated.

4. terminate principal's session and return `<LogoutResponse>`

    The session participant or session authority terminates the principal's session(s) as directed by the request (if possible) and returns a `<LogoutResponse>` to the identity provider through the user agent. 

5. issue `<LogoutResponse>` to originating session participant

    The identity provider issues a `<LogoutResponse>` message to the original requesting session participant through the user agent. 

!!! tip
    In step 1,3,4, and 5 either HTTP Redirect, HTTP POST, or HTTP Artifact binding can be used to transfer the message to the identity provider through the user agent. 

In an **IdP-initiated logout** scenario, the identity provider (acting as session authority) initiates this profile at step 2 and issues a `<LogoutRequest>` message to all session participants. Step 5 is skipped in this scenario. 

---

!!! info "Related Topics"
    - [Concept: SAML 2.0](TODO:link-to-concept)
    - [Concept: SAML Back-Channel Logout](../saml-back-channel)
    - [Guide: SAML Front-Channel Logout](../../../guides/login/saml-front-channel-logout)
    - [Demo: SAML Front-Channel Logout](../../../quick-starts/saml-front-channel-logout)
    - [Guide: Use SAML Artifact Binding](../../../guides/login/use-artifact-binding)
    - [Demo: Use SAML Artifact Binding](../../../quick-starts/use-artifact-binding-sample)



