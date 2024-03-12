# Client-request token binding

Back-channel grant types such as **token exchange** or **password**, cannot associate the user sessions with specific devices or instances. To address this issue, {{product_name}} introduced client request binding. The client-request binding type works with a parameter called `tokenBindingId`. This parameter allows developers to explicitly associate user sessions with specific devices or instances.

Let's look into it in detail.

!!! note
    Learn mroe about token binding and other token binding types supported by {{product_name}} in the [Token Binding]({{base_path}}/references/token-binding) documentation.

In client-request token binding, the `tokenBindingId` parameter reflects the user session in a particular device or instance. The behavior of the client-request binding type depends on the type of [access token]({{base_path}}/references/app-settings/oidc-settings-for-app/#access-token) (JWT or Opaque) and the [grant type]({{base_path}}/references/grant-types) that you configure for the application.

For each type of access token, client-request token binding behaves as follows.

- **JWT**

    - If the request does not contain a `tokenBindingId`, {{product_name}} issues a new access token for every new token request with the same application, user and scope combination and revokes the previous tokens.

    - If the request contains a `tokenBindingId`, {{product_name}} issues a new access token for each unique `tokenBindingId` value. Issuing a new token does not revoke tokens issued for other `tokenBindingId` values.

- **Opaque**

    - If the request does not contain a `tokenBindingId`, {{product_name}} issues the same access token for every new token request until the token expires.

    - If the request contains a `tokenBindingId`, {{product_name}} issues a new access token for each unique `tokenBindingId` value. Issuing a new token does not revoke tokens issued for other `tokenBindingId` values.

### Try it out

You can test the client-request token binding type in {{product_name}} by following the steps below.

1. Create a standard-based application.

    1. On the {{product_name}} Console, [create a standard-based application]({{base_path}}/guides/applications/register-standard-based-app/) by selecting **OAuth2.0** as the protocol.

    2. Go to its **Protocol** tab and under **Allowed grant types**, select **Password**.

    3. In **Protocol** > **Access Token**,
         - select either **JWT** or **Opaque** as the **Token type**.
         - select **client-request** as the **Token binding type**.

    4. Click **Update** to save your changes.

2. Use a tool such as cURL or Postman to perform the password grant flow as follows. Provide any value for the `tokenBindingId`.

    {{token_request}}

3. Capture the access token from the response.

4. Perform an introspection and ensure the validity of the access token.

    {{introspection}}

5. Repeat the steps for different `tokenBindingId` values and different token types and verify that the client-request behavior conforms to the patterns mentioned above.

Eventhough the client-request token binding type is tailored towards back-channel grant types, its versatility extends to support any other grants in {{product_name}}. This flexibility allows developers to incorporate this feature into various use-cases, providing a more robust and secure solution for identity and access management.
