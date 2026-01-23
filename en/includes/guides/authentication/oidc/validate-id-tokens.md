# Validate ID tokens

The ID token is a security token that is sent by {{ product_name }} to the application when a token is requested with OpenID scopes. This ID token contains information about the authenticated user.

**Sample ID token**

```bash
eyJ4NXQjUzI1NiI6IjVCTmdUS2tubHQyT3lTOU9ZckN2b1FpZWdKQUhxU1JldTRjejEyblVXb28iLCJraWQiOiJaVFF4TXpZd05HTmhPVEkzT1Raa1pEaGxZemt5WmpSbE5qSmlNR0ZtWVRFd09EbGxPREE1TURBM1lUa3lORFZsWW1JNE56TXpaRGMyT1dRME5XRTRZUV9SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJpc2siOiJkMmFiZGIwMDFmNzkzOTBkMjc1NDlhYmI0ZTliMWYzZWQ4Y2Q1YWQwNzFkMjRlMzM0NDdlZjEyZWQ4NTc3ZWQyIiwiYXRfaGFzaCI6ImJiN3puS0UtcFJQcEV5VGN6VWlZdmciLCJzdWIiOiI4ZDEzMDE0OC0zYTY4LTQ5M2MtOTM5OC0zNmJhMjM4MGUzMGYiLCJhbXIiOlsiQmFzaWNBdXRoZW50aWNhdG9yIl0sImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0Ojk0NDMvb2F1dGgyL3Rva2VuIiwic2lkIjoiMWFmZWY1MGUtYTJjOC00NWU5LWI3YWYtMmQ2ZGMyOTNlMTk2IiwiY19oYXNoIjoiTEVCVGQ3cXMta1RQMHkxZTUtZ040QSIsImF1ZCI6Ijd3RUhxdkZxaW5XQ01SQmdaX0NfZHZhakVYb2EiLCJuYmYiOjE3NjkxNDEzMTYsImF6cCI6Ijd3RUhxdkZxaW5XQ01SQmdaX0NfZHZhakVYb2EiLCJvcmdfaWQiOiIxMDA4NGE4ZC0xMTNmLTQyMTEtYTBkNS1lZmUzNmIwODIyMTEiLCJvcmdfbmFtZSI6IlN1cGVyIiwiZXhwIjoxNzY5MTQ0OTE2LCJpYXQiOjE3NjkxNDEzMTYsImp0aSI6ImI1ZjI2NjMyLTVhZmItNDYxYi1iNDcxLTk3MzEwNzY3MzA5ZCIsIm9yZ19oYW5kbGUiOiJjYXJib24uc3VwZXIifQ.dLMYPnEVefva7-JieoS8q331hkaAD9jPn4KGdrSSHjvZTmLa7apUfDlJmL0YUtY0_khTjWgvyg9BC24Ei0VF4uvqj403V-Ie5zyMXBuIYzTOFmLK44Z430_-g-XlrsK-wKVg4uwYnUAtia7KURcBJLRyP1E8zFIM2GEBOCu7VWUwCTZHJHTs0Dlu6YR6-kGr10w_nrPATpezQzJvmE3j3D1TepgomwTk4jElEiIU08u3m6unez04rjFm-gids2SVPjWvSbGi0Kb8FJOnra6njFGup4paTjIyvZMizKq20BcQLdb4-8o3Cvw8j7pZUceTrX9MqrCL8kvA7W9OeCWMpg
```

**Decoded sample ID token**
```json
{
  "isk": "d2abdb001f79390d27549abb4e9b1f3ed8cd5ad071d24e33447ef12ed8577ed2",
  "at_hash": "bb7znKE-pRPpEyTczUiYvg",
  "sub": "8d130148-3a68-493c-9398-36ba2380e30f",
  "amr": [
    "BasicAuthenticator"
  ],
  "iss": "{{ product_url_sample }}/oauth2/token",
  "sid": "1afef50e-a2c8-45e9-b7af-2d6dc293e196",
  "c_hash": "LEBTd7qs-kTP0y1e5-gN4A",
  "aud": "7wEHqvFqinWCMRBgZ_C_dvajEXoa",
  "nbf": 1769141316,
  "azp": "7wEHqvFqinWCMRBgZ_C_dvajEXoa",
  "org_id": "10084a8d-113f-4211-a0d5-efe36b082211",
  "org_name": "{{ org_name }}",
  "exp": 1769144916,
  "iat": 1769141316,
  "jti": "b5f26632-5afb-461b-b471-97310767309d",
  "org_handle": "{{ org_name }}"
}
```

Use the following methods to validate the ID token:

## Verify the signature in the ID token
To validate the signature on the ID token, you need the public key of {{ product_name }}. The signature of ID tokens can be validated using the JWKS endpoint in {{ product_name }}. <!-- See [ID Token validation](https://openid.net/specs/openid-connect-core-1_0.html#TokenResponseValidation) for details.-->

{{ product_name }} exposes the public key information through the standard [JWKS](https://datatracker.ietf.org/doc/html/rfc7517){:target="_blank"} endpoint.

By using a signature validation library, you can validate the signature of the ID token using the JWKS endpoint.

**JWKS endpoint**

``` 
{{ product_url_format }}/oauth2/jwks
```

**Sample request**

=== "cURL"
    ```bash
    curl --location --request GET '{{ product_url_sample }}/oauth2/jwks'
    ```

=== "JavaScript - jQuery"
    ```js
    var settings = {
        "url": "{{ product_url_sample }}/oauth2/jwks",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
    ```

=== "Nodejs - Axios"
    ```js
    var axios = require('axios');

    var config = {
        method: 'get',
        url: '{{ product_url_sample }}/oauth2/jwks',
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

**Sample response**

```json 
{
  "keys": [
    {
      "kty": "RSA",
      "x5t#S256": "5BNgTKknlt2OyS9OYrCvoQiegJAHqSReu4cz12nUWoo",
      "e": "AQAB",
      "use": "sig",
      "kid": "ZTQxMzYwNGNhOTI3OTZkZDhlYzkyZjRlNjJiMGFmYTEwODllODA5MDA3YTkyNDVlYmI4NzMzZDc2OWQ0NWE4YQ_RS256",
      "x5c": [
        "MIIDpTCCAo2gAwIBAgIEcEz57jANBgkqhkiG9w0BAQsFADBiMQswCQYDVQQGEwJVUzELMAkGA1UECAwCQ0ExFDASBgNVBAcMC1NhbnRhIENsYXJhMQ0wCwYDVQQKDARXU08yMQ0wCwYDVQQLDARXU08yMRIwEAYDVQQDDAlsb2NhbGhvc3QwHhcNMjYwMTEyMTEwNjMzWhcNMjcwMTEyMTEwNjMzWjBiMQswCQYDVQQGEwJVUzELMAkGA1UECAwCQ0ExFDASBgNVBAcMC1NhbnRhIENsYXJhMQ0wCwYDVQQKDARXU08yMQ0wCwYDVQQLDARXU08yMRIwEAYDVQQDDAlsb2NhbGhvc3QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCkqtxeegBTza1/uV+srudeXLQ1ca6igrn3vpwCmiz14oV3cjaWfs8RkSR5blT5uzH99JgGdKV/isIPfEYjv0fzp18mbrF7Ax5iQZb6Cr+rIElZH6oHgxJuHQtFyLezClUx9XgL7iM4nRCZKOmvTi2hfP7JE7VhAh9mc7wRKVJvLaDGdqKYCSCN2/ilkm/hIrZgRCI6xSRiSVFyQzFU7eD+XhEg/zfIFEslpTkiJj/RjIp5HdcgzVAO/7RnMjXcxI+FvZNjMd6/CBn1w+cAMwFP9G1GD3LmOxwD4D8V0Nxn9AuytYxg2qn0CU0G8qyyuplDo+t8D5ieBi72tcgbcG5TAgMBAAGjYzBhMB0GA1UdDgQWBBQbtJ8mhGKs0P8eqdZy6kce2SAgBjALBgNVHQ8EBAMCBPAwFAYDVR0RBA0wC4IJbG9jYWxob3N0MB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjANBgkqhkiG9w0BAQsFAAOCAQEAIJapDMhdJItuZ3H0fF9s+CF6k3VBHUdp/bU2qBFbfMudDJa+mKdmWul+p2JQY7Ll9DYIKOAwOTM8VuVtMREapG8HP5XCXFT+fEyl8/mTcGt2CJjxT4oq8ggz3vBhiH4LvlZY2uLYXIiveECiYeX6qp+5T/Xwr0hZEBDcFTOy1sE8zgQXYO6ArPQTVCVobTtvkiv33UhkGl5RU9nc/PwDcVsDfGS4JcbMyXMQRctcrYDffg4WVHhcTZ0kTmpQIQmnULUszk8gqfPgaX6kngKt+JXFVGAgnkRlFrqespIGbNINGw7RjhwoVNTp0eAgfLauzNSMQK1xZhgubpCKwjcyKA=="
      ],
      "alg": "RS256",
      "n": "pKrcXnoAU82tf7lfrK7nXly0NXGuooK5976cApos9eKFd3I2ln7PEZEkeW5U-bsx_fSYBnSlf4rCD3xGI79H86dfJm6xewMeYkGW-gq_qyBJWR-qB4MSbh0LRci3swpVMfV4C-4jOJ0QmSjpr04toXz-yRO1YQIfZnO8ESlSby2gxnaimAkgjdv4pZJv4SK2YEQiOsUkYklRckMxVO3g_l4RIP83yBRLJaU5IiY_0YyKeR3XIM1QDv-0ZzI13MSPhb2TYzHevwgZ9cPnADMBT_RtRg9y5jscA-A_FdDcZ_QLsrWMYNqp9AlNBvKssrqZQ6PrfA-YngYu9rXIG3BuUw"
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
    <td>This should match the <code>{{ product_url_format }}/oauth2/token</code> value.</td>
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