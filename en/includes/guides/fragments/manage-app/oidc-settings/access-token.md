<!-- markdownlint-disable-next-line -->
#### Token type

Select the access token type to issue for this application. {{product_name}} supports **Opaque** (reference token) and **JWT** (self-contained) token types.

!!! note
    Learn about [access token types and validation]({{base_path}}/references/tokens/access-tokens/#token-types) to understand how each type works at runtime.

{% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0") %}

#### Access Token Attributes

For **JWT** access tokens, this feature enables you to specify which user attributes are included in the access token. As a result, when a user logs in to an application, only the chosen attributes are shared, providing enhanced security and flexibility.

!!! note
    All configured user attributes are included in the access token, regardless of the requested scopes.

!!! warning
    For custom attributes to appear in the access token, you must explicitly add them to an OIDC scope. Without this mapping, custom attributes will not be included in the access token, even if they are configured under **Access Token Attributes**.

    To map custom attributes to an OIDC scope, [configure the custom attributes for the appropriate scopes]({{base_path}}/guides/users/attributes/manage-scopes/#edit-scopes) and ensure that your application's OIDC configuration is updated to request those scopes.

![Access-Token-Attributes]({{base_path}}/assets/img/guides/authorization/access-token/access-token-attributes.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% endif %}

#### Token binding type

Token binding securely links authentication tokens to client devices to prevent unauthorized token theft and replay attacks. It is a vital mechanism, especially when dealing with unsecured networks, as it provides an additional layer of security against unauthorized access.

!!! note
    Learn more about [Token Binding]({{base_path}}/references/token-binding/) in {{product_name}}.

{{product_name}} offers the following token binding types.

<table>
  <thead>
    <th>Binding Type</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td>none</td>
      <td>Does not establish any specific binding between the token and the client device. Suitable for scenarios where token binding is not required or implemented separately. This is the default token binding type of any application.</td>
    </tr>
    <tr>
      <td>cookie</td>
      <td>Binds the token to the cookie named <b>atbv</b> with Secure and httpOnly parameters. Supported with the <b>authorization_code</b> grant type. <b>Validate Token Binding<b> can be enabled to mandate client sends both the token and the cookie for successful authorization.</td>
    </tr>
    <tr>
      <td>sso-session</td>
      <td>Binds the token to the browser session. During each login, a token is generated coupled to the browser session and revoked on user logout. Supported with the <b>authorization_code</b> grant type.</td>
    </tr>
    <tr>
      <td>certificate</td>
      <td>Binds the token to the hash of the TLS certificate passed in the request. Supported with <b>all</b> grant types.</td>
    </tr>
    <tr>
      <td>device-flow</td>
      <td>Binds the token to the <b>device_code</b> sent in the <b>device_flow</b> grant type token call. </td>
    </tr>
    <tr>
      <td>client-request</td>
      <td>Binds the token to the instance identifier as requested by the client through the <code>tokenBindingId</code> parameter with the token request as shown below. </br></br>

            <p>
            <code>
            curl -X POST
            -u "&lt;client_id&gt;:&lt;client_secret&gt;"</br>
             -H "Content-Type: application/x-www-form-urlencoded"</br> 
             -d "grant_type=password&username=&lt;user_name&gt;&password=&lt;user_password&gt;</br>
            &tokenBindingId=&lt;your_unique_token_binding_id&gt;" </br>
            {{token_endpoint}}
            </code>
            </p>

        </br>
        Generally for applications that involve multiple instances and use back-channel grant types such as <b>token exchange</b> or <b>password</b>.</td>
        </tr>
  </tbody>
</table>

!!! note

    You can configure the following properties related to token binding:

    - **Validate token bindings** - When enabled, {{product_name}} uses the selected binding type to validate the access token based on the binding information sent in the cookie.
    
    - **Revoke token upon user logout** - When enabled, a user logout from a session causes access tokens to be revoked provided the logout request contains either `client_id` or `id_token_hint`. Learn more about [logout requests]({{base_path}}/guides/authentication/oidc/add-logout/).

#### User access token expiry time

This option specifies the validity period of an access token issued to a user in seconds. The default expiry time is 3600 seconds.

#### Application access token expiry time

This option specifies the validity period of an access token issued to an application when using the `Client Credentials` grant type in seconds.
