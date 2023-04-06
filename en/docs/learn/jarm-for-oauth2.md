# JWT Secured Authorization Response Mode (JARM) for OAuth 2.0

The [JWT-Secured Authorization Response Mode for OAuth 2.0 (JARM) specification](https://bitbucket.org/openid/fapi/src/master/oauth-v2-jarm.md) defines new JWT-based modes to encode OAuth2 authorization responses. These new modes allow clients to request authorization response parameters along with additional data in JWT format.

!!! info
    This is only available as a WSO2 Update from WSO2 Identity Server update level **5.10.216** onwards. See the instructions on [updating WSO2 products](https://updates.docs.wso2.com/en/latest/).

## Authorization flow (default)

Given below is a sample authorization request sent to authorization endpoint of WSO2 Identity Server.

```bash
https://<IS_HOME>/oauth2/authorize?prompt=login&scope=openid&redirect_uri=https://<CLIENT-HOST>/redirects/redirect1&client_id=<CLIENT-ID>&response_type=<RESPONSE-TYPE>&response_mode=<RESPONSE-MODE>
```

Note the following two parameters (`reponse_type` and `response_mode`) in the above request.

<table>
    <tr>
        <th>
            reponse_type
        </th>
        <td>
            Specifies the type of authorization information that should be returned and also informs WSO2 Identity Server (the authorization server) of the desired authorization processing flow. </br>
            Possible values:<code>code</code>, <code>code id_token</code>.
        </td>
    </tr>
    <tr>
        <th>
            response_mode
        </th>
        <td>
            Specifies how the authorization information should be returned to the client.</br>
            Possible values: <code>query.jwt</code>, <code>fragment.jwt</code>, <code>form_post.jwt</code>, and <code>jwt</code></br>
            WSO2 Identity Server supports query.jwt, fragment.jwt, and form_post.jwt response modes by default.
        </td>
    </tr>
</table>

In the default authorization flow (for default response modes), the authorization response parameters including the authorization code and ID token are sent as human-readable plain text to the redirect URL.

```bash
https://<CLIENT_HOST>/redirects/redirect1?code=<AUTH-CODE>&session_state=<SESSION-STATE>
```

## Authorization flow (with JARM)

With JARM, clients should have the ability to request the transmission of the authorization response parameters along with additional data, in JWT format. The specification defines the following response modes, which you can specify using the `response_mode` parameter in the authorization request.

### query.jwt
  
Response parameters are encoded in a single JWT and sent as a query param to the redirect URI.

Sample response:

```bash
HTTP/1.1 302 Found
Location: https://<CLIENT-HOST>/redirects/redirect1?response=<JWT>
```

### fragment.jwt

Response parameters are encoded in a single JWT and sent as a fragment param to the redirect URI.

Sample response:

```bash
HTTP/1.1 302 Found
Location: https://<CLIENT-HOST>/redirects/redirect1#response=<JWT>
```

### form_post.jwt

The response parameter containing the JWT is encoded as an HTML form value that is auto-submitted in the User Agent, and thus is transmitted via the HTTP POST method to the client, with the result parameters being encoded in the body.

Sample response from the authorization server to the user agent:

```bash
HTTP/1.1 200 OK
Content-Type: text/html;charset=UTF-8
Cache-Control: no-cache, no-store
Pragma: no-cache

<html>
<head><title>Submit Form</title>
</head>
<body onload="javascript:document.forms[0].submit()">
<form method="post" action="https://<CLIENT-HOST>/redirects/redirect1">
    <input type="hidden" name="response" value=<JWT>/>
</form>
</body>
</html>
```

The above response results in the following POST request to the client's redirect URI:

```bash
POST /redirects/redirect1 HTTP/1.1
Host: <CLIENT-HOST>
Content-Type: application/x-www-form-urlencoded

response=<JWT>
```

### jwt

The response mode jwt is a shortcut and indicates the default redirect encoding (query, fragment) for the requested response type as shown below.

<table>
    <tr>
        <th>response_type</th>
        <th>response_mode</th>
    </tr>
    <tr>
        <td><code>code</code></td>
        <td><code>query.jwt</code></td>
    </tr>
    <tr>
        <td><code>token</code></td>
        <td><code>fragment.jwt</code></td>
    </tr>
    <tr>
        <td>Contains <code>token</code> or <code>id_token</code></td>
        <td><code>fragment.jwt</code></td>
    </tr>
</table>

**Given below is a sample JARM response <JWT>:**

```bash
eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJhdWQiOiJ5VDJmQ0FpY1E4M1FZeW1FakMwYTBmcGplYzhhIiwiY29kZSI6IjQ0Y2U1NzU3LTdmNTQtM2IxZS1hMzNmLTE4YTMwNjE1NTA1MyIsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTY4MDA5MDUwMiwic2Vzc2lvbl9zdGF0ZSI6IjdkODUyN2E2Y2YwNTY3ZTI0OTFmMThiZGZlYTZlOTBiMTQ5ZmEyOTUwZDkyZGJiMzEwYjU0MjE5YjczM2U0ODEuc3B1RVlVQm1QX0VMZVRkS1BfZTdKQSJ9.wYIBpEIhYdFq4W3mrx4gcAI2kSgJ5viQ6qGntHsIRMT2wg9F4d-DzMEkMvy4tOup2dlZNby80Sf1djuG44Z-1xbellcuk7hRfotlMOjSLc7fmkzy0b4HvwcN66U9wETWQfixUTbWbOvmqMqzdMQKtSB2b7oWEh5EHOlQQ6vrGJc2eSxquMN_O17PlYKF0smXSgoESIunf8k5sGydO8MvwVZ4-qfqnx7Lx7Huk36CfW-CFI0IXIehi017onOx0FOXwRaizMM45M0zfzyvg4CbZUaGPeGuyO7DVsUPwjdkrjkhiKcXR61S01uqj8-_AAgtZMJHMI3yJQmvWM4ezNe9_Q
```

**Decoded payload:**

```json
{
  "aud": "yT2fCAicQ83QYymEjC0a0fpjec8a",
  "code": "44ce5757-7f54-3b1e-a33f-18a306155053",
  "iss": "https://localhost:9443/oauth2/token",
  "exp": 1680090502,
  "session_state": "7d8527a6cf0567e2491f18bdfea6e90b149fa2950d92dbb310b54219b733e481.spuEYUBmP_ELeTdKP_e7JA"
}
```

## Enabling JARM

By default, JARM response modes are not enabled in WSO2 Identity Server 5.10.0. To enable JARM, open the `<IS_HOME>/repository/conf/deployment.toml` file and add the following configurations:

```toml
[oauth.jarm]
jarm_response_jwt_validity = 7200

[[oauth.response_mode]]
name = "jwt"
class = "org.wso2.carbon.identity.oauth2.responsemode.provider.jarm.impl.JwtResponseModeProvider"

[[oauth.response_mode]]
name = "query.jwt"
class = "org.wso2.carbon.identity.oauth2.responsemode.provider.jarm.impl.QueryJwtResponseModeProvider"

[[oauth.response_mode]]
name = "fragment.jwt"
class = "org.wso2.carbon.identity.oauth2.responsemode.provider.jarm.impl.FragmentJwtResponseModeProvider"

[[oauth.response_mode]]
name = "form_post.jwt"
class = "org.wso2.carbon.identity.oauth2.responsemode.provider.jarm.impl.FormPostJwtResponseModeProvider"
```
