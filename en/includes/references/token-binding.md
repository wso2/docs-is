# Token binding

When a user logs in to an application, the server issues an authentication token such as a session cookie to the user. The client then sends this token with each subsequent request to prove the user’s identity. However, if this authentication token is not securely tied to the communication channel, an attacker can intercept this token and use this token to impersonate the user and gain unauthorized access.

Token binding is a security mechanism in web protocols to establish a secure connection between an authentication token and the client device that holds it. The primary purpose of token binding is to prevent unauthorized token theft and replay attacks.

!!! note
    Learn how you can [register your application in {{product_name}}]({{base_path}}/guides/applications/) and [configure your application]({{base_path}}/references/app-settings/oidc-settings-for-app/)

{{product_name}} supports the following token binding types for your OIDC applications.

## Cookie

Cookie token binding method binds the token to the cookie named `atbv` with `Secure` and `httpOnly` parameters. This method is supported with the **authorization code** grant type.

## SSO-session

SSO-session token binding method binds the access token to the login session. {{product_name}} issues a new access token for each new login and revoke the token upon logout. This method is supported with the **authorization_code** grant type.


## Certificate

Certificate token binding method binds the access token to the hash of the TLS certificate passed in the request. This method is supported with all grant types.

## Device flow

Device flow binding method binds the token to the `device_code` sent in the **device flow** grant type token call.


## Client-request

Back-channel grant types such as **token exchange** or **password**, cannot associate the user sessions with specific devices or instances. To address this issue, {{product_name}} introduced client request binding. The client-request binding type works with a parameter called `tokenBindingId`. This parameter allows developers to explicitly associate user sessions with specific devices or instances.

Let's look at it in detail.

The `tokenBindingId` parameter is used to reflect the user session in a particular device or instance. The behavior of the client-request binding type depends on the type of access token (JWT or Opaque) and the grant type that you configure for the application.

With client-request token binding type enabled, for,

- **JWT**

    - If the request does not contain a `tokenBindingId`, {{product_name}} issues a new access token for every new token request with the same application, user and scope combination and revokes the previous tokens.

    - If the request contains a `tokenBindingId`, {{product_name}} issues a new access token for each unique `tokenBindingId` value. Issuing a new token does not revoke tokens issued for other `tokenBindingId` values.

- **Opaque**

    - If the request does not contain a `tokenBindingId`, {{product_name}} issues the same access token for every new token request until it expires.

    - If the request contains a `tokenBindingId`, {{product_name}} issues a new access token for each unique `tokenBindingId` value. Issuing a new token does not revoke tokens issued for other `tokenBindingId` values.

### Try it out

You can test the client-request token binding type in {{product_name}} by following the steps below.

1. Create a standard-based application.

    1. On the {{product_name}} Console, [create a standard-based application]({{base_path}}/guides/applications/register-standard-based-app/) by selecting **OAuth2.0** as the protocol.

    2. Go to its **Protocol** tab and under **Allowed grant types**, select **Password**.

    3. In **Protocol** > **Access Token**,
       - as the **Token type**, select either **JWT** or **Opaque**.
       - as the **Token binding type**, select **client-request**.

    4. Click **Update** to save your changes.

2. Use a tool such as cURL or Postman to perform the password grant flow as follows. Provide any value for the `tokenBindingId`.

    ``` curl
    curl -X POST
    -u "<client_id>:<client_secret>" 
    -H "Content-Type: application/x-www-form-urlencoded"
    -d "grant_type=password
    &username=<user_name>
    &password=<user_password>
    &tokenBindingId=uniqueId"
    https://localhost:9443/oauth2/token
    ```

3. Capture the access token from the response.

4. Perform an introspection and ensure the validity of the access token.

    ``` curl
    curl -X POST
    -u "client_id:client_secret"
    -H "Content-Type: application/x-www-form-urlencoded"
    -d "token=<your_access_token>"
    https://localhost:9443/oauth2/introspect
    ```

5. Repeat the steps for different tokenBindingId values and different token types and verify that the client-request behavior conforms to the patterns mentioned above.

Eventhough the **client-request** token binding type is tailored towards back-channel grant typee, its versatility extends to support any other grants in {{product_name}}. This flexibility allows developers to incorporate this feature into various use-cases, providing a more robust and secure solution for identity and access management.

