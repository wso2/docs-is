# OIDC settings for apps

You can find the OpenID Connect protocol related settings under **protocol** section of the selected application.
  ![OIDC settings](../../assets/img/guides/applications/app-protocol-settings.png)

## Basic settings

### Client credentials

When your application is registered in Asgardeo, a client ID is generated as the identifier of the application. If you register a traditional web application, a client secret is generated in addition to the client ID as shown below.

![Get client ID and secret of webapp](../../assets/img/guides/applications/get-client-id-and-secret.png)

### Allowed grant types
This will determine how the application communicates with the token service. Web application template supports following grant types:

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
      <td>Used for executing the <b>OAuth2 Implicit</b> flow in client applications. Clients without a back-channel (hence cannot securely store secrets) can receive the access token directly in the URL. This grant type is not recommended.</td>
    </tr>
    <tr>
      <td>Password</td>
      <td>Used for executing the <b>OAuth2 Password</b> flow in client applications.  The client sends the user's credentials to get an access token. This grant type is not recommended.</td>
    </tr>
    <tr>
      <td>Organization Switch</td>
      <td>A custom OAuth2 grant type that allows clients to get access to suborganization APIs in Asgardeo. The client can exchange the access token received from the root organization for an access token of the suborganization.  </td>
    </tr>
      <td></td>
      <td></td>
    </tr>

  </tbody>
</table>

<!-- - Code - 
- Client Credentials
- Refresh Token
- Implicit
  Applications request token
- Password
- Organization Switch -->

It is recommended to use code grant for public clients. For single-page application templates, code grant is enabled by default.
You can enable refresh token grant to get refresh tokens.
However, [implicit grant](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-14#section-2.1.2) and [password](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-14#section-2.4) grants are not recommended due to security reasons.

See [grant types of Asgardeo](../../references/grant-types-in-asgardeo/) for more details.

### Public client

<CommonGuide guide='guides/fragments/manage-app/oidc-settings/public-client.md'/>

### Authorized redirect URLs
Authorized redirect URLs are not required for `Client Credentials` and `Password` grant type.

<CommonGuide guide='guides/fragments/manage-app/oidc-settings/authorized-urls.md'/>

The `redirect_uri` sent in the [login](../../guides/authentication/oidc/implement-auth-code/#get-authorization-code) request and the `post_logout_redirect_uri` sent in the [logout request](../../guides/authentication/oidc/add-logout/) should match with one of the registered authorized redirect URLs.


### Allowed origins
 <CommonGuide guide='guides/fragments/manage-app/oidc-settings/allowed-origin.md'/>

## Advanced settings
### Proof Key for Code Exchange(PKCE)

#### Mandatory
 <CommonGuide guide='guides/fragments/manage-app/oidc-settings/pkce-mandatory.md'/>

#### Support Plain Transform Algorithm
 <CommonGuide guide='guides/fragments/manage-app/oidc-settings/pkce-plain-text.md'/>

### Access Token
  <CommonGuide guide='guides/fragments/manage-app/oidc-settings/access-token.md'/>

### ID Token
 <CommonGuide guide='guides/fragments/manage-app/oidc-settings/id-token.md'/>

### Refresh Token
 <CommonGuide guide='guides/fragments/manage-app/oidc-settings/refresh-token.md'/>

### Certificate
The certificate is used to validate signatures of signed requests from the application to Asgardeo and to encrypt requests from Asgardeo to the application.
<br><br>
You can either <b>Provide Certificate</b> or <b>Use JWKS endpoint</b> to add a certificate.
<br>
Follow the steps given below to Provide Certificate.

1. Select <b>Provide Certificate</b> and click <b>New Certificate</b>.
![Upload app certificate](../../assets/img/guides/applications/oidc/upload-certificate-of-app.png)

2. Upload the certificate file or copy the certificate contents.
<br>

??? note If you have certificate in other formats such as `.crt`, `.cer` or `.der`, expand here to convert your certs to PEM format using [OpenSSL](https://www.openssl.org/)
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
:::

<br>
