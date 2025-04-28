# OIDC settings for apps

OpenID Connect protocol related settings are under the **Protocol** section of the application registered in {{product_name}}.

!!! note
    Configurations mentioned in this reference may vary based on the type of application that you register.
  
![OIDC settings]({{base_path}}/assets/img/guides/applications/app-protocol-settings.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Basic settings

The following are the minimum configurations that are required for OIDC applications to run successfully.

### Client credentials

When your application is registered in {{ product_name }}, a client ID is generated as the identifier of the application. If your application is not a public client, a client secret is generated in addition to the client ID as shown below.

![Get client ID and secret of webapp]({{base_path}}/assets/img/guides/applications/get-client-id-and-secret.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Allowed grant types
This option determines how the application communicates with the token service. Web application template supports the following grant types:

<table>
  <thead>
    <th>Grant type</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td>Code</td>
      <td>Used for executing the <b>OAuth2 Authorization Code</b> flow in client applications. Upon user authentication, the client receives an authorization code, which is then exchanged for an access token. The client can use this token to access the required resources.</td>
    </tr>
    <tr>
      <td>Client Credentials</td>
      <td>Used for executing the <b>OAuth2 Client Credentials</b> flow in client applications. Users are authenticated from the user credentials and an access token is granted. The client can use this token to access the required resources.</td>
    </tr>
    <tr>
      <td>Refresh Token</td>
      <td>The client can use the refresh token to get a new access token when the original access token expires, without having the user re-authenticate.</td>
    </tr>
    <tr>
      <td>Implicit</td>
      <td>Used for executing the <b>OAuth2 Implicit</b> flow in client applications. Clients without a back-channel (hence cannot securely store secrets) can receive the access token directly in the URL. <b>This grant type is not recommended due to security reasons</b>.</td>
    </tr>
    <tr>
      <td>Password</td>
      <td>Used for executing the <b>OAuth2 Password</b> flow in client applications.  The client sends the user's credentials to get an access token. <b>This grant type is not recommended due to security reasons</b>.</td>
    </tr>
    <tr>
      <td>Token Exchange</td>
      <td>This is a grant type in the OAuth 2.0 framework that enables the exchange of one type of token for another. </td>
    </tr>
    <tr>
      <td>Organization Switch</td>
      <td>A custom OAuth2 grant type that allows clients to get access to organization APIs in {{ product_name }}. The client can exchange the access token received from the organization (root) for an access token of the organization.  </td>
    </tr>
  </tbody>
</table>


!!! tip

    - It is recommended to use `Code` grant for public clients.
    - For single-page application templates, the `Code` grant is enabled by default.
    - If `Code` grant is enabled, enable the `Refresh Token` grant to get refresh tokens.

!!! note
    Learn more about [OAuth2 grant types]({{base_path}}/references/grant-types/).

### Authorized redirect URLs

Authorized redirect URLs determine where {{ product_name }} redirects users after login and logout. An application can have multiple authorized redirect URLs.

The `redirect_uri` sent in the [login request]({{base_path}}/guides/authentication/oidc/implement-auth-code/#get-authorization-code) and the `post_logout_redirect_uri` sent in the [logout request]({{base_path}}/guides/authentication/oidc/add-logout/) should match one of the registered authorized redirect URLs.

!!! note
    Authorized redirect URLs are not required for `Client Credentials` and `Password` grant types.

### Allowed origins

Browsers restrict cross-origin HTTP requests initiated from browser scripts for security reasons. Enabling [Cross Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS){:target="_blank"} allows your application to perform cross-origin HTTP requests.

You should list the set of URLs that are allowed to access {{ product_name }} APIs with JavaScript under **Allowed origins**. By pre-registering the application origin, applications can access:

  - the token endpoint
  - the JWKS endpoint
  - the userinfo endpoint
  - other APIs

## Advanced settings
This section elaborates on the advanced settings available for OIDC applications on {{ product_name }}.

### Proof Key for Code Exchange(PKCE)

When using [PKCE with authorization code flow]({{base_path}}/guides/authentication/oidc/implement-auth-code-with-pkce/), the application sends a `code challenge` in the authorization request and subsequently, sends the corresponding `code verifier` in the token request.

PKCE ensures that the authorization code is sent to the same client making the request and no malicious application has intercepted the code during the delivery process. {{product_name}} supports the following options for PKCE:

- **Mandatory**

    By enabling this option, {{ product_name }} makes it mandatory for an application to use PKCE with the authorization code flow grant type. Shown below is a sample request to the `/authorize` endpoint and the subsequent request to the `/token` endpoint.

    *Sample authorization request*

    ```
    {{ product_url_sample }}/oauth2/authorize?scope=openid&response_type=code&redirect_uri=<redirect_uri>&  client_id=<client_id>&code_challenge=<code_challenge>&code_challenge_method=<code_challenge_method>
    ```

    *Sample token request*

    === "cURL"

        ```bash
        curl --location --request POST '{{ product_url_sample }}/oauth2/token' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'code=60cb4ba7-b7b2-3f2f-8319-58122f1b2f5d' \
        --data-urlencode 'grant_type=authorization_code' \
        --data-urlencode 'redirect_uri=https://localhost:5000' \
        --data-urlencode    'code_verifier=WAOqjmxMpCnjME0mRpd8pDZNT8bEIpCdHgMKFqxoAVtEb4LhJ0KSg8Rl0z0O3pySx4HGp53R87bckxOxrXk2oNav0fgWzFdOy  BR rvA8ZTgCG7MlQcY9mfamCM8SWnGgO' \
        --data-urlencode 'client_id=fv_LScHaB83PN4VPX1cHufphtHQa'
        ```

    === "JavaScript - jQuery"

        ```js
        var settings = {
            "url": "{{ product_url_sample }}/oauth2/token",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
                "code": "60cb4ba7-b7b2-3f2f-8319-58122f1b2f5d",
                "grant_type": "authorization_code",
                "redirect_uri": "https://localhost:5000",
                "code_verifier":    "WAOqjmxMpCnjME0mRpd8pDZNT8bEIpCdHgMKFqxoAVtEb4LhJ0KSg8Rl0z0O3pySx4HGp53R87bckxOxrXk2oNav0fgWzFdOyBRrvA8  ZT gCG7MlQcY9mfamCM8SWnGgO",
                "client_id": "fv_LScHaB83PN4VPX1cHufphtHQa"
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
        ```

    === "Nodejs - Axios"

        ```js
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({
            'code': '60cb4ba7-b7b2-3f2f-8319-58122f1b2f5d',
            'grant_type': 'authorization_code',
            'redirect_uri': 'https://localhost:5000',
            'code_verifier':    'WAOqjmxMpCnjME0mRpd8pDZNT8bEIpCdHgMKFqxoAVtEb4LhJ0KSg8Rl0z0O3pySx4HGp53R87bckxOxrXk2oNav0fgWzFdOyBRrvA8ZTgC  G7 MlQcY9mfamCM8SWnGgO',
            'client_id': 'fv_LScHaB83PN4VPX1cHufphtHQa'
        });
        var config = {
            method: 'post',
            url: '{{ product_url_sample }}/oauth2/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
        ```

- **Support Plain Transform Algorithm**

    <!-- markdownlint-disable-next-line -->
    If this configuration is selected, the applications can use the `plain` algorithm. i.e,`code_challenge = code_verifier`. As the `code_verifier` is visible to a malicious party, this is not recommended for production environments.

    ``` 
    {{ product_url_sample }}/oauth2/authorize?response_type=code&client_id=Wsoq8t4nHW80gSnPfyDvRbiC__Ea&    scope=openidprofile&redirect_uri=http%3A%2F%2Flocalhost%3A5000&code_challenge_method=plain&   code_challenge=nAkA5m0EKlFbHFvF_V53Icig9gSnqr-HxH44Lvkne2c
    ```

### Client authentication

For applications that rely on a client secret, client authentication method is the mechanism used to verify the identity of the client application when requesting for an access token. The following are the available client authentication methods in {{product_name}}.

<table>
  <thead>
    <th>Client authentication method</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td>Client Secret Basic</td>
      <td>Client applications use HTTP basic authentication to authenticate with the authorization server. The client secret is included in the authorization header as a base 64 encoded string as shown below.</br>
        <code>Authorization: Basic base64(client_id:client_secret)</code>
      </td>
    </tr>
    <tr>
      <td>Client Secret Post</td>
      <td>The client application sends the client secret in the body of the HTTP POST request when requesting an access token.
      </td>
    </tr>
    <tr>
      <td>Mutual TLS</td>
      <td>Client authentication happens with TLS certificates. The server and the client both present their certificates to each other during the TLS handshake and establish a two-way trust relationship.</br>
      When configuring, enter the domain name of the client certificate under <b>TLS client authentication subject domain name</b>.
      </td>
    </tr>
    <tr>
      <td>Private Key JWT</td>
      <td>Client authentication happens with a public/private key pair. The client sends a client assertion, a client-generated JSON Web Token (JWT), signed with the private key. The authorization server will verify the assertion with the client's public key.</br>
      When configuring, enter the required <b>signing algorithm</b>.
      </td>
    </tr>
  </tbody>
</table>

!!! note "Public client"
    A public client is an application which cannot securely store client credentials. A public client does not need to authenticate with a `client_secret`. Thus to secure public clients, it is recommended to use `Code` grant type for public clients along with [PKCE](https://datatracker.ietf.org/doc/html/rfc7636){:target="_blank"} to mitigate code interception attacks.

### Pushed Authorization Requests (PAR)

When an application initiates an authorization request with Pushed Authorization Reqeusts (PAR), it sends the payload to the `/par` endpoint from the back channel, and includes a reference to the payload in the authorization request.

Selecting the **Mandatory** option enforces the application to initiate an authorization request with PAR.

!!! note
    Learn more about [Pushed Authorization Requests]({{base_path}}/references/pushed-authorization-requests/).

### Request Object

OAuth 2.0 authorization requests can either include the authorization parameters in URL query strings or in a request object. A request object is typically a JSON Web Token (JWT) which encapsulates the authorization parameters. It can be signed and encrypted to respectively ensure data integrity and data confidentiality.

- Under **Request object signing algorithm**, select a supported algorithm with which the request object will be signed.

- Under **Request object encryption algorithm**, choose a supported asymmetric encryption algorithm to perform the key exchange.

- Under **Request object encryption method**, choose a supported symmetric encryption algorithm with which the request object will be encrypted.

### Access Token
The following configurations are related to the access token.

{% include "../../guides/fragments/manage-app/oidc-settings/access-token.md" %}

### ID Token
The following configurations are related to the ID token.
{% include "../../guides/fragments/manage-app/oidc-settings/id-token.md" %}

### Refresh Token
{% include "../../guides/fragments/manage-app/oidc-settings/refresh-token.md" %}

### Certificate
Certificates play a critical role in validating signatures on signed requests and encrypting sensitive information in requests. To add a certificate, you can either upload one or provide a JWKS endpoint.

To upload a certificate, select **Provide certificate** and upload a certificate in the `.pem` format.

??? note "How to convert `.crt`, `.cer` or `.der` to the `.pem` format?"
    You can use [OpenSSL](https://www.openssl.org/){:target="_blank"} to convert certificates of other formats to the `.pem`format using the following commands.

    **Convert CRT to PEM**
    ``` 
    openssl x509 -in cert.crt -out cert.pem
    ```
    **Convert CER to PEM:**
    ``` 
    openssl x509 -in cert.cer -out cert.pem
    ```
    **Convert DER to PEM:**
    ``` 
    openssl x509 -in cert.der -out cert.pem
    ```

