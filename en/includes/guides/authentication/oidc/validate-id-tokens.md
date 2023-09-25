# Validate ID tokens

The ID token is a security token that is sent by {{ product_name }} to the application when a token is requested with OpenID scopes. This ID token contains information about the authenticated user.

**Sample ID token**

```bash 
eyJ4NXQiOiJZemM1T1Rnd1pURTNNV1F6TVdFek5ERm1OelZoTTJOaU9UQmxOamN3TlRJNU9HTTBNbVExWWprd1lqZzJNVEl3WldNd056TTRNemcxWkdJeVpEZzNaQSIsImtpZCI6Ill6YzVPVGd3WlRFM01XUXpNV0V6TkRGbU56VmhNMk5pT1RCbE5qY3dOVEk1T0dNME1tUTFZamt3WWpnMk1USXdaV013TnpNNE16ZzFaR0l5WkRnM1pBX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJpc2siOiIzYzdlNDIyZGFkNTk1MDc3ZTAyYTYzNjRjYzViN2M5YTE2NzFkNzhmYWQ1MmZmZTVlNmE0MzcwOTRiNGNhOWZmIiwiYXRfaGFzaCI6IklVdEVuNHRLQWlzVWVXRDhIWGZwRXciLCJhdWQiOiJXc29xOHQ0bkhXODBnU25QZnlEdlJiaUNfX0VhIiwiY19oYXNoIjoic3ZicjU1SEVIUGo3emt3Z2VuSkgxUSIsInN1YiI6IkFsaWNhQGJpZnJvc3QuY29tIiwibmJmIjoxNjI5OTY4MzQ0LCJhenAiOiJXc29xOHQ0bkhXODBnU25QZnlEdlJiaUNfX0VhIiwiYW1yIjpbIkJhc2ljQXV0aGVudGljYXRvciJdLCJpc3MiOiJodHRwczpcL1wvYXBpLmFzZ2FyZGVvLmlvXC90XC9iaWZyb3N0XC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNjI5OTcxOTQ0LCJpYXQiOjE2Mjk5NjgzNDQsInNpZCI6ImY3OGY1ZjRjLTE4NjItNDIwOS04NWEzLWUyMmMyYTljMDY4ZCJ9.D9-lJ8vtC8Hj5mJvUm1ld9w0rifPzjHc6UyCbENtWbno0zTYB_ki3_z-x7zI_-72ixiDpsjzwLbmKKWw8tFtqWM36WvdwBH6mBDVB_K7cy8NqrACLOjFgBrRa3HXwHkwAgwHp6Vpgbs35aAbwf0OTBxeohnbEA4y84D0pFILHm-u_iFG1-tS-QKKh6s8SBR0MNA6dJqj95R3NVF-tk4aztHI5GB63aaw2E883Xd6r2k4MIi3vQoB35-T_zFSebypaheyW3IXCPNsXjsyy4toMRfE4KEeI-j20vixxtIB22OlOWBMie7ce9Atzu6op0R0eJz3f3Ch6OrPxcvT3ghSJQ
```

**Decoded sample ID token**
```json 
{
  "isk": "3c7e422dad595077e02a6364cc5b7c9a1671d78fad52ffe5e6a437094b4ca9ff",
  "at_hash": "IUtEn4tKAisUeWD8HXfpEw",
  "aud": "Wsoq8t4nHW80gSnPfyDvRbiC__Ea",
  "c_hash": "svbr55HEHPj7zkwgenJH1Q",
  "sub": "Alica@bifrost.com",
  "nbf": 1629968344,
  "azp": "Wsoq8t4nHW80gSnPfyDvRbiC__Ea",
  "amr": [
    "BasicAuthenticator"
  ],
  "iss": "https://api.asgardeo.io/t/bifrost/oauth2/token",
  "exp": 1629971944,
  "iat": 1629968344,
  "sid": "f78f5f4c-1862-4209-85a3-e22c2a9c068d"
}
```

Use the following methods to validate the ID token:

## Verify the signature in the ID token
To validate the signature on the ID token, you need the public key of {{ product_name }}. The signature of ID tokens can be validated using the JWKS endpoint in {{ product_name }}. <!-- See [ID Token validation](https://openid.net/specs/openid-connect-core-1_0.html#TokenResponseValidation) for details.-->

{{ product_name }} exposes the public key information through the standard [JWKS](https://datatracker.ietf.org/doc/html/rfc7517) endpoint.

By using a signature validation library, you can validate the signature of the ID token using the JWKS endpoint.

**JWKS endpoint**

``` 
https://api.asgardeo.io/t/<organization_name>/oauth2/jwks
```

**Sample request**

<CodeGroup>
<CodeGroupItem title="cURL" active>

```bash
curl --location --request GET 'https://api.asgardeo.io/t/bifrost/oauth2/jwks'
```

</CodeGroupItem>

<CodeGroupItem title="JavaScript - jQuery">

```js
var settings = {
    "url": "https://api.asgardeo.io/t/bifrost/oauth2/jwks",
    "method": "GET",
    "timeout": 0,
};

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

</CodeGroupItem>

<CodeGroupItem title="Nodejs - Axios">

```js
var axios = require('axios');

var config = {
    method: 'get',
    url: 'https://api.asgardeo.io/t/bifrost/oauth2/jwks',
    headers: {}
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
```

</CodeGroupItem>
</CodeGroup>

**Sample response**

```json 
{
  "keys": [
    {
      "kty": "RSA",
      "e": "AQAB",
      "use": "sig",
      "kid": "Yzc5OTgwZTE3MWQzMWEzNDFmNzVhM2NiOTBlNjcwNTI5OGM0MmQ1YjkwYjg2MTIwZWMwNzM4Mzg1ZGIyZDg3ZA_RS256",
      "alg": "RS256",
      "n": "i_i34CgF8IZd8e27sY3lJkX6MyW7e2oIH0f_OlnwftTdS-SAmmIMm06QdyhDr0fycTuNR9hjsEhSm9ecS5kZh9qsuffLb1N041Ml37VE6qeOKP4AocvYmr0rtpH0TUgqXndDeFAAF3oLVhUTokw9Ik-T23cEPDA8gMCmQf7Nje7fNsQ6aCuzzvfUekXvRnDl_7ZAHgbw_0gyujIJ11NlKiNbmCdKMATn68TwQ4U5RJD9-IT0zizWm1ciV-ZOc12L8AsUI-QFjLnUlM4S42X1oj0Tao1oL9V8QGASHHIGKqJ9YxvvnuxaHd42NFFHJcwB4oLlirjOyI5HfKZRFE4FzQ"
    }
  ]
}
```

<br>


## Verify claims in the ID token

Applications should verify the claims in the ID token before consuming it. You can either use some libraries, or you can manually verify the claims.  <!-- See [ID token validation](https://openid.net/specs/openid-connect-core-1_0.html#TokenResponseValidation) for details.-->

Given below are some claims that are sent in the ID token. These need to be verified by the application.

<table>
  <tr>
    <th>Claim</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>iss</code> <p>(issuer)</p></td>
    <td>This should match the <code>https://api.asgardeo.io/t/organization_name/oauth2/token</code> value.</td>
  </tr>
  <tr>
    <td><code>aud</code> <p>(audience)</p></td>
    <td>This should match the client ID of the application.</td>
  </tr>
  <tr>
    <td><code>iat</code> <p>(issued at time)</p></td>
    <td>This indicates when the ID token was issued. Applications can reject tokens that were issued too long ago.</td>
  </tr>
  <tr>
    <td><code>exp</code> <p>(expiry time)</p></td>
    <td>This indicates the time at which the ID token will expire. Applications should reject the expired tokens.</td>
  </tr>
</table>