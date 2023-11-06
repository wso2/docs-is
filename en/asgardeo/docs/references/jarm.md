# JWT Secured Authorization Response Mode (JARM) for OAuth 2.0

The [JWT Secured Authorization Response Mode for OAuth 2.0 (JARM) specification](https://openid.net/specs/openid-financial-api-jarm-ID1.html) defines new JWT-based modes to encode OAuth2 authorization responses. These modes allow clients to request authorization response parameters and additional data in JWT format.

## Authorization flow

Below is a sample authorization request sent to the authorization endpoint of Asgardeo.

```bash
https://api.asgardeo.io/t/{organization-name}/oauth2/authorize?prompt=login&scope=openid&redirect_uri=https://<CLIENT_HOST>/redirects/redirect1&client_id=<CLIENT_ID>&response_type=<RESPONSE_TYPE>&response_mode=<RESPONSE_MODE>
```

The parameters used in the authorization request are defined below.

<table>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    <tr>
        <th>
            <code>reponse_type</code>
        </th>
        <td>
            Informs Asgardeo of the desired OAuth2 authorization processing flow, which determines the type of authorization information that should be returned.</br></br>
            Possible values:
            <ul>
                <li>
                    <code>code</code>: Used if the <a href="{{base_path}}/references/grant-types/#authorization-code-grant">authorization code flow</a> is implemented.
                </li>
                <li>
                    <code>token</code>: Used if the <a href="{{base_path}}/references/grant-types/#implicit-grant">implicit flow</a> is implemented.
                </li>
                <li>
                    <code>code id_token</code>: Used if the <!-- TODO   <a href="../openid-connect-hybrid-flow">-->hybrid flow</a> is implemented.
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>
            <code>response_mode</code>
        </th>
        <td>
            Specifies how the authorization information should be returned to the client. By default, the following response modes are supported in Asgardeo:
            <ul>
                <li><code>query</code></li>
                <li><code>fragment</code></li>
                <li><code>form_post</code></li>
            </ul>
            In the default authorization flow (for default response modes), the authorization response parameters, such as the authorization code and ID token, are sent as human-readable plain text to the redirect URL, as shown below.</br></br>
            <code>https://&lt;CLIENT_HOST&gt;/redirects/redirect1?code=&lt;AUTH_CODE&gt;&session_state=&lt;SESSION_STATE&gt;</code></br></br>
            The JARM specification is used to send this response more securely by encoding the response parameters in a JWT.
        </td>
    </tr>
</table>

## Using JARM

With JARM, clients can request authorization response parameters along with additional data in JWT format instead of plain text.

The specification defines the following response modes, which you can specify using the `response_mode` parameter in the authorization request.

- [response_mode=query.jwt](#queryjwt)
- [response_mode=fragment.jwt](#fragmentjwt)
- [response_mode=form_post.jwt](#form_postjwt)
- [response_mode=jwt](#jwt)

### `query.jwt`
  
Response parameters are encoded in a single JWT and sent as a query parameter to the redirect URI.

Sample response:

```bash
HTTP/1.1 302 Found
Location: https://<CLIENT_HOST>/redirects/redirect1?response=<JWT>
```

### `fragment.jwt`

Response parameters are encoded in a single JWT and sent as a fragment parameter to the redirect URI.

Sample response:

```bash
HTTP/1.1 302 Found
Location: https://<CLIENT_HOST>/redirects/redirect1#response=<JWT>
```

### `form_post.jwt`

The response parameter containing the JWT is encoded as an HTML form value that is auto-submitted in the User-Agent and thus is transmitted via the HTTP POST method to the client, with the result parameters being encoded in the body.

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

### `jwt`

The `jwt` response mode is a shortcut, and it indicates the default redirect encoding (`query.jwt` or `fragment.jwt`) for the requested response type. If the response mode is `jwt`, the server decides whether `query.jwt` or `fragment.jwt` is to be used depending on the `response_type` sent in the request.

The default response modes for each response type are shown below.

- If the `response_type` is `code`, the default `response_mode` is `query.jwt`.
- For the response types defined in [OIDM](https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html) (​​except `none`), the default response mode is `fragment.jwt`.
- For response types containing `token` or `id_token`, the default response mode is `fragment.jwt`.

Given below is a sample JARM response <JWT>:

```bash
eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJhdWQiOiJ5VDJmQ0FpY1E4M1FZeW1FakMwYTBmcGplYzhhIiwiY29kZSI6IjQ0Y2U1NzU3LTdmNTQtM2IxZS1hMzNmLTE4YTMwNjE1NTA1MyIsImlzcyI6Imh0dHBzOi8vYXBpLmFzZ2FyZGVvLmlvL3QvdGVzdC9vYXV0aDIvdG9rZW4iLCJleHAiOjE2ODAwOTA1MDIsInNlc3Npb25fc3RhdGUiOiI3ZDg1MjdhNmNmMDU2N2UyNDkxZjE4YmRmZWE2ZTkwYjE0OWZhMjk1MGQ5MmRiYjMxMGI1NDIxOWI3MzNlNDgxLnNwdUVZVUJtUF9FTGVUZEtQX2U3SkEifQ.GZUeGUBptOADYNYVL7CRH5Js6moc4cp-gyUBQNRBuljj2vCFnHoJuBeJXJa3t11X-b1AuK8C0aJelWDOBKAtKxKf9cXCffeVkepZNGMNc4H6-rnIDtnaxbPGQl3MURhTTc4vsxMwhadx_Nc-F7j87cgO-lfeFLhEim71oke4Gnr5_NNGMx6F-BP103qqiu4bGUPjXVLBrdV93_EyUZpT3qFdyS73UYo1EySceRi3xhnQNWxYRHXmlXhuDdP6u--olbbT-CYRWDZN0qj3dz9KtA_0Rz2hx2T4jrAB_R3sh9DHedL-GQKCtxDFWmejSKO0fc86XC1WiqlrJ9QRB2xWDQ
```

Decoded payload:

```json
{
  "aud": "yT2fCAicQ83QYymEjC0a0fpjec8a",
  "code": "44ce5757-7f54-3b1e-a33f-18a306155053",
  "iss": "https://api.asgardeo.io/t/{organization-name}/oauth2/token",
  "exp": 1680090502,
  "session_state": "7d8527a6cf0567e2491f18bdfea6e90b149fa2950d92dbb310b54219b733e481.spuEYUBmP_ELeTdKP_e7JA"
}
```