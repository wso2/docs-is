<!-- markdownlint-disable-next-line -->
#### Token type  
{{product_name}} supports the following token types.

- **Opaque**: Opaque tokens are plain text tokens. If a resource server wants to know information related to an opaque token, it has to call the introspection endpoint and receive information related to tokens. An example for a opaque token response is shown below.

    ```json
    {
    "access_token": "9fac7747-bb2d-46be-bef2-a95b2f69f8b2",
    "scope": "openid",
    "id_token": "eyJ4NXQiOiJZemM1T1Rnd1pURTNNV1F6TVdFek5ERm1OelZoTTJOaU9UQmxOamN3TlRJNU9HTTBNbVExWWprd1lqZzJNVEl3WldNd056TTRNemcxWkdJeVpEZzNaQSIsImtpZCI6Ill6YzVPVGd3WlRFM01XUXpNV0V6TkRGbU56VmhNMk5pT1RCbE5qY3dOVEk1T0dNME1tUTFZamt3WWpnMk1USXdaV013TnpNNE16ZzFaR0l5WkRnM1pBX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJpc2siOiJhYjdlMDNlMGQ3MzlkNmVlNmQxYTJkMGYwMTk0NDJiZDJiMDE5MDQyNjhiYzY5ZTkyYTg3OTViMjViYmU1NTdkIiwiYXRfaGFzaCI6IkNYb2hyLU9kZ1pISTF6VElvNHF6cmciLCJhdWQiOiJXc29xOHQ0bkhXODBnU25QZnlEdlJiaUNfX0VhIiwiY19oYXNoIjoiajBhd1lkTGtOVF9mdVBzNVcwZ2VFUSIsInN1YiI6IkFsaWNhQGJpZnJvc3QuY29tIiwibmJmIjoxNjIzOTA0ODgzLCJhenAiOiJXc29xOHQ0bkhXODBnU25QZnlEdlJiaUNfX0VhIiwiYW1yIjpbIkJhc2ljQXV0aGVudGljYXRvciJdLCJpc3MiOiJodHRwczpcL1wvYWNjb3VudHMuYXNnYXJkZW8uaW9cL3RcL2JpZnJvc3RcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2MjM5MDg0ODMsImlhdCI6MTYyMzkwNDg4M30.XHNsUSAcaRAFvOmWB366fdhbQzQxsDiJC0ADD1kiWpiFentvl6fh3h1ITN-x92623cJDYZbC-YK_OdeZ3X7hYLHOK6UXu_gEA4GIaExl7B3iWB9XLukdbU67AX-QpqPFbPgYLqq3CIyyYUxjDC9F22CQreWREc8neLkMW0ejMvZSK7q3hNtuxh6Ox2yhoIJT4KgCygZO259L8xzp6ZuCNDp39nIRsj4zjTOuvz92Md6DC_eauS1BF0SaIZO4YG1PW-FVfmOppcqE0P3MCH8D3EOvmSj2ZqSJRy5hki8E7LOmBhUp4O6yLPWEgFf8QGNa2xAIWK2YqX4kezEyj6Iftw",
    "token_type": "Bearer",
    "expires_in": 3522
    }
    ```

- **JWT**: JWT tokens are self-contained verifiable access tokens. If a resource server wants to know the information related to that token, it can decode the token and get the required information without any additional network calls. An example for a JWT token response is shown below.

    ```json
    {
    "access_token": "eyJ4NXQiOiJZemM1T1Rnd1pURTNNV1F6TVdFek5ERm1OelZoTTJOaU9UQmxOamN3TlRJNU9HTTBNbVExWWprd1lqZzJNVEl3WldNd056TTRNemcxWkdJeVpEZzNaQSIsImtpZCI6Ill6YzVPVGd3WlRFM01XUXpNV0V6TkRGbU56VmhNMk5pT1RCbE5qY3dOVEk1T0dNME1tUTFZamt3WWpnMk1USXdaV013TnpNNE16ZzFaR0l5WkRnM1pBX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJBbGljYUBiaWZyb3N0LmNvbSIsImF1dCI6IkFQUExJQ0FUSU9OX1VTRVIiLCJhdWQiOiJXc29xOHQ0bkhXODBnU25QZnlEdlJiaUNfX0VhIiwibmJmIjoxNjIzOTA0ODA1LCJhenAiOiJXc29xOHQ0bkhXODBnU25QZnlEdlJiaUNfX0VhIiwic2NvcGUiOiJvcGVuaWQiLCJpc3MiOiJodHRwczpcL1wvYWNjb3VudHMuYXNnYXJkZW8uaW9cL3RcL2JpZnJvc3RcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2MjM5MDg0MDUsImlhdCI6MTYyMzkwNDgwNSwianRpIjoiOWZhYzc3NDctYmIyZC00NmJlLWJlZjItYTk1YjJmNjlmOGIyIn0.ETimDfsoXiV2wqkCy7ZWZ-cO3mK8VaGKXvbBeFd8hh5TceGppRvrOs_0Kxez6p8gVRTrCbv-iBIrJFikl_I_euqTk30-JfPxvh0ox5RxY_4nsXs8GGycJwL40XfssE5BLlFSff2YIsbvy6Mbih8_Jerb-RA6j7cAZSII_T-4ATD7mk9DeXmK_-jwqBoyH0UNtAxJKLgfIs8G2yIiioaS4rSnX8tEGGvPvcaDzeTdNx2RNKod_EYlWDNJVtJHUf61lstu4WSA0pdHyP5_Fpbhe4pu_FaXeSMyAwsHYIENWVarB8kknvyUnL51lkoOrIJaSHRjqIbSNteIJ3QyEQ-a8Q",
    "scope": "openid",
    "id_token": "eyJ4NXQiOiJZemM1T1Rnd1pURTNNV1F6TVdFek5ERm1OelZoTTJOaU9UQmxOamN3TlRJNU9HTTBNbVExWWprd1lqZzJNVEl3WldNd056TTRNemcxWkdJeVpEZzNaQSIsImtpZCI6Ill6YzVPVGd3WlRFM01XUXpNV0V6TkRGbU56VmhNMk5pT1RCbE5qY3dOVEk1T0dNME1tUTFZamt3WWpnMk1USXdaV013TnpNNE16ZzFaR0l5WkRnM1pBX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJpc2siOiJhYjdlMDNlMGQ3MzlkNmVlNmQxYTJkMGYwMTk0NDJiZDJiMDE5MDQyNjhiYzY5ZTkyYTg3OTViMjViYmU1NTdkIiwiYXRfaGFzaCI6IjZSWkQ4a2lZYkFpZkh4OENldWJUcXciLCJhdWQiOiJXc29xOHQ0bkhXODBnU25QZnlEdlJiaUNfX0VhIiwiY19oYXNoIjoiWjVPXzk5cmZFSkFabjJSUl9yTEhxZyIsInN1YiI6IkFsaWNhQGJpZnJvc3QuY29tIiwibmJmIjoxNjIzOTA0ODA1LCJhenAiOiJXc29xOHQ0bkhXODBnU25QZnlEdlJiaUNfX0VhIiwiYW1yIjpbIkJhc2ljQXV0aGVudGljYXRvciJdLCJpc3MiOiJodHRwczpcL1wvYWNjb3VudHMuYXNnYXJkZW8uaW9cL3RcL2JpZnJvc3RcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2MjM5MDg0MDUsImlhdCI6MTYyMzkwNDgwNSwic2lkIjoiOTE3MzQzOGQtNDFlNy00MmFhLWFmZTctNjlkNDM3Njk1NTRlIn0.f9rTgJtDD6VAUQ1fXZCbiUtg66B0Q5nNSgGTIbrCI6aBC8sn2QmhI4YFqXntj72b2T7-TTYXiY4k6iQH665Oc_KfhxJIwrCW4X96h6dMMHcDMQYuP5blZNMuP8fi42sFAVgAUcs4B5Lfq-nIiPrqO90XGJVyrzJEdSoGsgbX9fg6HWbx016Shla2oKeVzsvZra6uflk4S1bsEVnk5gmRjZ25Vueqtb5qJW291i38-dKhO6FDEkAJyw_QWG6nK_ZpOMx4GW6qj0GTEKrC_TuUTp5hUX1xUnpLRFHcN8WAQoe7_g6JyLOUQzQSFTr-CniwwftwnK0DcGq916bRPvTEjw",
    "token_type": "Bearer",
    "expires_in": 3600
    }
    ```
    <br>

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0") %}
#### Access Token Attributes

For **JWT** access tokens, this feature enables you to specify which user attributes are included in the access token. As a result, when a user logs in to an application, only the chosen attributes are shared, providing enhanced security and flexibility.

!!! note 
    All configured user attributes are included in the access token, regardless of the requested scopes.

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
