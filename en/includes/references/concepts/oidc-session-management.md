# OIDC Session Management

The [OIDC session management specification](https://openid.net/specs/openid-connect-session-1_0.html) defines methodologies to manage user sessions and log out end-users at the authorization server using front-channel communication.

In this approach, the login/logout requests from the Relying Party (RP) or the client application to the OpenID Provider (OP) and vice versa are done via the user agent (browser-based).

## Obtain user’s logging state

To obtain the user’s logging state, the specification recommends polling a hidden [OP iframe](#op-iframe) from an [RP iframe](#rp-iframe) using an origin-restricted postMessage. The main advantage of this method is that it does not generate any network traffic.

### OP iframe

The OP iframe loads on the RP side based on the OP’s `check_session_iframe` endpoint. The OP iframe must ensure that the caller shares the same origin as its parent frame, rejecting postMessage requests from any other origin.

### RP iframe

This iframe loads on the RP side and should be aware of the ID of the OP iframe. It can send postMessage requests to the OP iframe. The RP iframe should continuously post messages (poll) to the OP iframe at intervals specified by the application requirements.

### Session State

Session state is a JSON string that represents the end-user's login state at the OP. The `session_state` value contains "a salted cryptographic hash of Client ID, origin URL, and OP browser state". The OP passes this value to the RP in the authentication response, and the RP uses it to monitor the end-user session at the OP.

## Session Management Endpoints

OpenID Connect uses the following two endpoints for session management.

1. **check_session_iframe**:

    This endpoint supports cross-origin communications for session state information with the client, using the HTML5 postMessage API. It accepts postMessage requests from the relevant [RP iframe](#rp-iframe) and uses postMessage to communicate the end user's login status back to the OpenID Provider.

2. **end_session_endpoint**:

    This endpoint is responsible for logging out an end-user when the client performs a redirect request.

## How it works?

The following diagram represents the flow.

![OIDC session management flow diagram]({{base_path}}/assets/img/references/concepts/oidc-session-management.png){: width="600" style="display: block; margin: 0;"}

1. Authentication Request: When the end-user needs to log in to the RP, the RP sends an authentication request to the OP.

2. Response with Session State: The OP responds to the RP's authentication request by providing the session_state, which represents the end-user's login state.

3. Polling for State Changes: The RP iframe continuously polls the OP iframe to detect any changes in the session state.

4. OP Iframe Response: The OP iframe responds with one of the following statuses:

    - `unchanged`: This indicates that the user session is still valid at the OP. The RP will continue to poll the OP iframe to detect any session changes.

    - `unchanged`: This indicates that the session has changed at the OP, possibly due to user logout, session timeout, or a user logging in from a different client application. Upon receiving the `changed` status, the RP performs re-authentication with `prompt=none` to obtain the current session state at the OP.

    - `error`: This indicates that the message sent was determined by the OP to be malformed. Upon receiving the `error` status, the RP must not perform re-authentication with `prompt=none` to avoid potential infinite loops that generate network traffic to the OP. Instead, it directly logs the user out.
  
## RP-Initiated Logout

In RP-initiated logout, once an end-user is logged out from the RP, it can notify the OP accordingly. In this scenario, the RP, after logging the end-user out, redirects the end-user's user agent to the logout endpoint URL provided by the OP, which is obtained via the `end_session_endpoint` described earlier.

The following parameters are optional but recommended to be passed as query parameters in the logout request:

- **id_token_hint**

    This parameter is the previously issued ID Token. It should be passed to the logout endpoint as a hint about the end user’s current authenticated session with the client. The ID Token serves as an indication of the identity of the end-user that the RP is requesting to be logged out by the OP.
    Note that the OP need not be listed as an audience of the ID Token when it is used as an `id_token_hint value`.

- **post_logout_redirect_uri**

    This parameter represents the URL to which the RP requests the end user’s user agent to be redirected after a logout has been performed. The value should have been previously registered with the OP.

- **state**

    This parameter is an opaque value used by the RP to maintain the state between the logout request and the callback to the endpoint specified by the `post_logout_redirect_uri` query parameter. If included in the logout request, the OP passes this value back to the RP using the `state` query parameter when redirecting the user-agent back to the RP.
