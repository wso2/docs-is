# Obtain Key Set Using JSON Web Key Set

The [JSON Web Key Set (JWKS) endpoint](http://openid.net/specs/openid-connect-discovery-1_0.html) is a read-only endpoint that returns the Identity Server's public key set in the [JWKS](../../../concepts/authentication/jwks) format. 

You can follow this guide when your relying party (RP) application needs to validate JWT Token signatures issued by WSO2 Identity Server.

----

## Endpoint URL for super tenant

Copy and paste the following endpoint URL on your browser window.

```tab="URL Format"
https://<IS_HOST>:<IS_HTTPS_PORT>/oauth2/jwks
```

```tab="Sample URL"
https://localhost:9443/oauth2/jwks
```

- By default, `<IS_HOST>` is localhost. However, if you are using a public IP, the respective IP address or domain needs to be specified.

- By default, `<IS_HTTPS_PORT>` has been set to 9443. However, if the port offset has been incremented by n , the default port value needs to be incremented by n as well.

You will see the following response. 

```tab="Response"
{
  "keys": [
    {
      "kty": "RSA",
      "e": "AQAB",
      "use": "sig",
      "kid": "NTAxZmMxNDMyZDg3MTU1ZGM0MzEzODJhZWI4NDNlZDU1OGFkNjFiMQ",
      "alg": "RS256",
      "n": "luZFdW1ynitztkWLC6xKegbRWxky-5P0p4ShYEOkHs30QI2VCuR6Qo4Bz5rTgLBrky03W1GAVrZxuvKRGj9V9-PmjdGtau4CTXu9pLLcqnruaczoSdvBYA3lS9a7zgFU0-s6kMl2EhB-rk7gXluEep7lIOenzfl2f6IoTKa2fVgVd3YKiSGsyL4tztS70vmmX121qm0sTJdKWP4HxXyqK9neolXI9fYyHOYILVNZ69z_73OOVhkh_mvTmWZLM7GM6sApmyLX6OXUp8z0pkY-vT_9-zRxxQs7GurC4_C1nK3rI_0ySUgGEafO1atNjYmlFN-M3tZX6nEcA6g94IavyQ"
    }
  ]
}
```

For information about the elements in the response, see [Response parameters](#response-parameters).

------

## Endpoint URL for tenants

Copy and paste the following endpoint URL on your browser window.

```tab="URL Format"
https://<IS_HOST>:<IS_PORT>/t/<TENANT_DOMAIN>/oauth2/jwks
```

```tab="Sample URL"
https://localhost:9443/t/foo.com/oauth2/jwks
```

- By default, `<IS_HOST>` is localhost. However, if you are using a public IP, the respective IP address or domain needs to be specified.

- By default, `<IS_HTTPS_PORT>` has been set to 9443. However, if the port offset has been incremented by n , the default port value needs to be incremented by n as well.

You will see the following response. 

```tab="Response"
{
  "keys": [
    {
      "kty": "RSA",
      "e": "AQAB",
      "use": "sig",
      "kid": "MTk5NjA3YjRkNGRmZmI4NTYyMzEzZWFhZGM1YzAyZWMyZTg0ZGQ4Yw",
      "alg": "RS256",
      "n": "0OA-yiyn_pCKnldZBq2KPnGplLuTEtGU7IZP66Wf7ElhFJ-kQ87BMKvZqVNDV84MSY3XQg0t0yL6gITg-W8op61PWO2UrEcxhhMHN_rra22Ae2OCaUfOr43cW1YFc54cYj5p7v-HSVvjTuNLGMMrNfTGAOCPzuLxbSHfq62uydU"
    }
  ]
}
```

For information about the elements in the response, see [Response parameters](#response-parameters).

-----

## Response parameters

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Property value</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>                   kty                  </code></td>
<td>The public key type.</td>
</tr>
<tr class="even">
<td><code>                   e                  </code></td>
<td>The exponent value of the public key.</td>
</tr>
<tr class="odd">
<td><code>                   use                  </code></td>
<td><p>Implies how the key is being used. The value <code>                    sig                   </code> represents signature.</p></td>
</tr>
<tr class="even">
<td><code>                   kid                  </code></td>
<td>The thumbprint of the certificate. This value is used to identify the key that needs to be used to verify the signature.</td>
</tr>
<tr class="odd">
<td><code>                   alg                  </code></td>
<td><p>The algorithm used to secure the JSON Web Signature.</p></td>
</tr>
<tr class="even">
<td><code>                   n                  </code></td>
<td>The modulus value of the public key.</td>
</tr>
</tbody>
</table>

For more information, see the [JWKS specification](https://tools.ietf.org/html/rfc7515#section-4).

-----

!!! info "Related Topics"
    - [Concept: JSON Web Key Set](../../../concepts/authentication/jwks)
    - [Guide: Validate a JWT Based on JWKS](../validate-jwt-using-jwks)
