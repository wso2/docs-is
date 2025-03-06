# JWT Secured Authorization Response Mode (JARM) for OAuth 2.0

The [JWT Secured Authorization Response Mode for OAuth 2.0 (JARM) specification](https://openid.net/specs/openid-financial-api-jarm-ID1.html){:target="_blank"} defines new JWT-based modes to encode OAuth2 authorization responses. These modes allow clients to request authorization response parameters and additional data in the JWT format.

## Authorization flow

Below is a sample authorization request sent to the authorization endpoint of the WSO2 Identity Server.

```bash
https://{{host_name}}/oauth2/authorize?prompt=login
&scope=openid
&redirect_uri=https://<CLIENT_HOST>/redirects/redirect1
&client_id=<CLIENT_ID>
&response_type=<RESPONSE_TYPE>
&response_mode=<RESPONSE_MODE>
```

The parameters used in the authorization request are defined below.

<table>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>reponse_type</code></td>
        <td>
            Informs {{product_name}} of the desired OAuth2 authorization processing flow that will determine the type</br> of authorization information returned.</br>
            Possible values:
            <ul>
                <li>
                    <code>code</code>: Used for the <a href="{{base_path}}/references/grant-types/#authorization-code-grant">authorization code flow</a>.
                </li>
                <li>
                    <code>token</code>: Used for the <a href="{{base_path}}/references/grant-types/#implicit-grant">implicit flow</a>.
                </li>
                <li>
                    <code>code id_token</code>: Used for the <!-- TODO   <a href="../openid-connect-hybrid-flow">-->hybrid flow</a>.
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><code>response_mode</code></td>
        <td>Specifies how the authorization information is returned to the client. By default, the following response modes </br> are supported in {{product_name}}:
            <ul>
                <li><code>query</code></li>
                <li><code>fragment</code></li>
                <li><code>form_post</code></li>
            </ul>
        </td>
    </tr>
</table>

## JARM response modes

Instead of receiving authorization responses in plain text, JARM allows clients to request authorization responses in the JWT format. The specification defines the following response modes, which clients may request using the `response_mode` parameter.

### query.jwt
  
With `query.jwt`, response parameters are encoded in a single JWT and sent as a query parameter in the redirect URI.

Sample response:

```bash
HTTP/1.1 302 Found
Location: https://<CLIENT_HOST>/redirects/redirect1?response=<JWT>
```

### fragment.jwt

With `fragment.jwt`, response parameters are encoded in a single JWT and sent as a fragment parameter in the redirect URI.

Sample response:

```bash
HTTP/1.1 302 Found
Location: https://<CLIENT_HOST>/redirects/redirect1#response=<JWT>
```

### form_post.jwt

With `form_post.jwt`, the response parameter containing the JWT is encoded as an HTML form value, which is auto-submitted at the user agent, and thus is transmitted via the HTTP POST method to the client.

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
<form method="post" action="https://<CLIENT_HOST>/redirects/redirect1">
    <input type="hidden" name="response" value=<JWT>/>
</form>
</body>
</html>
```

The above response results in the following POST request to the client's redirect URI:

```bash
POST /redirects/redirect1 HTTP/1.1
Host: <CLIENT_HOST>
Content-Type: application/x-www-form-urlencoded

response=<JWT>
```

### jwt

The `jwt` response mode is a shortcut that indicates the default redirect encoding for the requested response type as follows.

- If the response type is `code`, the default `response_mode` is `query.jwt`.
- For the response types defined in <a href="https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html" target="_blank">OIDC</a> (​​except `none`), the default response mode is `fragment.jwt`.
- For response types containing `token` or `id_token`, the default response mode is `fragment.jwt`.

Given below is a sample JARM response {JWT}:

```bash
eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.ewogICJhdWQiOiAieVQyZkNBaWNRODNRWXltRWpDMGEwZnBqZWM4YSIsCiAgImNvZGUiOiAiNDRjZTU3NTctN2Y1NC0zYjFlLWEzM2YtMThhMzA2MTU1MDUzIiwKICAiaXNzIjogImh0dHBzOi8vYXBpLmFzZ2FyZGVvLmlvL2JpZnJvc3Qvb2F1dGgyL3Rva2VuIiwKICAiZXhwIjogMTY4MDA5MDUwMiwKICAic2Vzc2lvbl9zdGF0ZSI6ICI3ZDg1MjdhNmNmMDU2N2UyNDkxZjE4YmRmZWE2ZTkwYjE0OWZhMjk1MGQ5MmRiYjMxMGI1NDIxOWI3MzNlNDgxLnNwdUVZVUJtUF9FTGVUZEtQX2U3SkEiCn0=.wYIBpEIhYdFq4W3mrx4gcAI2kSgJ5viQ6qGntHsIRMT2wg9F4d-DzMEkMvy4tOup2dlZNby80Sf1djuG44Z-1xbellcuk7hRfotlMOjSLc7fmkzy0b4HvwcN66U9wETWQfixUTbWbOvmqMqzdMQKtSB2b7oWEh5EHOlQQ6vrGJc2eSxquMN_O17PlYKF0smXSgoESIunf8k5sGydO8MvwVZ4-qfqnx7Lx7Huk36CfW-CFI0IXIehi017onOx0FOXwRaizMM45M0zfzyvg4CbZUaGPeGuyO7DVsUPwjdkrjkhiKcXR61S01uqj8-_AAgtZMJHMI3yJQmvWM4ezNe9_Q
```

Decoded payload:

```json
{
  "aud": "yT2fCAicQ83QYymEjC0a0fpjec8a",
  "code": "44ce5757-7f54-3b1e-a33f-18a306155053",
  "iss": "https://api.asgardeo.io/bifrost/oauth2/token",
  "exp": 1680090502,
  "session_state": "7d8527a6cf0567e2491f18bdfea6e90b149fa2950d92dbb310b54219b733e481.spuEYUBmP_ELeTdKP_e7JA"
}
```

{{disable_jarm}}