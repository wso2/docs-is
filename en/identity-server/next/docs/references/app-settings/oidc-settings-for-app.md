{% set product_name = "WSO2 Identity Server" %}
{% set product_url_format = "https://localhost:9443" %}
{% set product_url_sample = "https://localhost:9443" %}
{% set token_binding_types = "<table>
  <thead>
    <th>Binding Type</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td>none</td>
      <td>Does not establish any specific binding between the token and the client device. Suitable for scenarios where token binding is not required or implemented separately. This is the default token binding type of any application.
      </td>
    </tr>
    <tr>
      <td>cookie</td>
      <td>Binds the token to the cookie named <b>atbv</b> with Secure and httpOnly parameters. Supported with the <b>authorization_code</b> grant type.</td>
    </tr>
    <tr>
      <td>sso-session</td>
      <td>Binds the access token to the login session. {{product_name}} will issue a new access token for each new login and revoke the token upon logout. Supported with the <b>authorization_code</b> grant type.</td>
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
      <td>Binds the token to the instance identifier as requested by the client through the <code>tokenBindingReference</code> token request parameter. Supported with <b>all</b> grant types. Specifically designed for applications that involve multiple instances and have to use back-channel grant types such as <b>token exchange</b> or <b>password</b>.</td>.
    </tr>
  </tbody>
</table>" %}


{% include "../../../../../includes/references/app-settings/oidc-settings-for-app.md" %}