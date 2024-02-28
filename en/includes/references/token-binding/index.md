# Token binding

When a user logs in to an application, the server issues an authentication token, such as a session cookie, to the user. The client then sends this token with each subsequent request to prove the user’s identity. However, if this authentication token is not securely tied to the communication channel, an attacker can intercept this token and use this token to impersonate the user and gain unauthorized access.

Token binding is a security mechanism in web protocols to establish a secure connection between an authentication token and the client device that holds it. The primary purpose of token binding is to prevent unauthorized token theft and replay attacks.

{{product_name}} supports the following token binding types for your OIDC applications.

!!! note
    - Learn how you can [register your application in {{product_name}}]({{base_path}}/guides/applications/) and [configure OIDC settings]({{base_path}}/references/app-settings/oidc-settings-for-app/) such as token binding for your applications.

    - Learn more about the [grant types of {{product_name}}]({{base_path}}/references/grant-types).

## Cookie

Cookie token binding method binds the token to the cookie named `atbv` with `Secure` and `httpOnly` parameters. This method is supported with the **authorization code** grant type.

## SSO-session

SSO-session token binding method binds the access token to the login session. {{product_name}} issues a new access token for each new login and revokes the token upon logout. This method is supported with the **authorization_code** grant type.


## Certificate

Certificate token binding method binds the access token to the hash of the TLS certificate passed in the request. This method is supported with all grant types.

## Device flow

Device flow token binding method binds the token to the `device_code` sent in the **device flow** grant type token call.

## Client-request

[Client-request token binding method]({{base_path}}/references/token-binding/client-request) is introduced by {{product_name}} for back-channel grant types such as **token exchange** and **password**. It binds the token to the `tokenBindingId` sent in the authentication request.