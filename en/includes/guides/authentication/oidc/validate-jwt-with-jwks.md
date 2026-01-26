# Validate JWT with JSON Web Key Set (JWKS)

This guide explains JSON Web Key Set (JWKS) and how to use it to validate JSON Web Tokens (JWT) with {{product_name}}.

## Overview

A JWKS end-point exposes an authorization server’s public keys in the JWKS format. Clients can use these keys to verify the signatures of JWTs issued by the server. A JWKS endpoint comes with the following advantages.

- Programmatic key discovery by client applications - Clients can automatically fetch the Identity Provider (IdP)’s public keys without manual configuration.

- Simpler integration with multiple relying parties - Multiple apps can use the same IdP keys without individual updates.

- Seamless key rollover without service disruption - When the IdP changes keys, clients can verify tokens without breaking existing sessions.

{{product_name}} exposes its own JWKS endpoint when acting as an IdP. When acting as a service provider (SP), it can validate JWTs issued by external IdPs by calling the corresponding JWKS endpoints. The following sections explore how to configure and implement these two scenarios.

## {{product_name}} acting as the IdP

In this instance, {{product_name}} works as the JWT issuer. The following diagram explains this process.

![JWKS endpoint of {{product_name}}]({{base_path}}/assets/img/guides/authentication/oidc/jwks-idp.png)

- The user authenticates with {{product_name}} to access the protected resource.

- {{product_name}} authenticates the user, and returns a signed JWT.

- The application calls the JWKS endpoint of {{product_name}} to get the public keys.

- The application should then find the correct key based on the kid (key ID), validate the JWT response and grant access to the protected resource.

{{product_name}} exposes its public keys from the following URL:

=== "Format"

    ```bash
    https://<HOST_NAME>:<IS_HTTPS_PORT>/oauth2/jwks
    ```

=== "Example"

    ```bash
    https://localhost:9443/oauth2/jwks
    ```

The contents of the {{product_name}} JWKS endpoint take the following form:

```json
{
  "keys": [
    {
      "kty": "RSA",
      "x5t#S256": "m_eCU6DLMVTX9h5TomL64Swtp-AMsmA-6xvWCTr5gf4",
      "e": "AQAB",
      "use": "sig",
      "kid": "OWJmNzgyNTNhMGNiMzE1NGQ3ZjYxZTUzYTI2MmZhZTEyYzJkYTdlMDBjYjI2MDNlZWIxYmQ2MDkzYWY5ODFmZQ_RS256",
      "x5c": [
        "MIIDtTCCAp2gAwIBAgIUdYqOmjbFWs31cUW2cjkBlEUK3tQwDQYJKoZIhvcNAQELBQAwYjELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRQwEgYDVQQHDAtTYW50YSBDbGFyYTENMAsGA1UECgwEV1NPMjENMAsGA1UECwwEV1NPMjESMBAGA1UEAwwJbG9jYWxob3N0MB4XDTI1MDEwODA4MzIwN1oXDTI2MDEwODA4MzIwN1owYjELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRQwEgYDVQQHDAtTYW50YSBDbGFyYTENMAsGA1UECgwEV1NPMjENMAsGA1UECwwEV1NPMjESMBAGA1UEAwwJbG9jYWxob3N0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApKrcXnoAU82tf7lfrK7nXly0NXGuooK5976cApos9eKFd3I2ln7PEZEkeW5U+bsx/fSYBnSlf4rCD3xGI79H86dfJm6xewMeYkGW+gq/qyBJWR+qB4MSbh0LRci3swpVMfV4C+4jOJ0QmSjpr04toXz+yRO1YQIfZnO8ESlSby2gxnaimAkgjdv4pZJv4SK2YEQiOsUkYklRckMxVO3g/l4RIP83yBRLJaU5IiY/0YyKeR3XIM1QDv+0ZzI13MSPhb2TYzHevwgZ9cPnADMBT/RtRg9y5jscA+A/FdDcZ/QLsrWMYNqp9AlNBvKssrqZQ6PrfA+YngYu9rXIG3BuUw"
      ],
      "alg": "RS256",
      "n": "pKrcXnoAU82tf7lfrK7nXly0NXGuooK5976cApos9eKFd3I2ln7PEZEkeW5U-bsx_fSYBnSlf4rCD3xGI79H86dfJm6xewMeYkGW-gq_qyBJWR-qB4MSbh0LRci3swpVMfV4C-4jOJ0QmSjpr04toXz-yRO1YQIfZnO8ESlSby2gxnaimAkgjdv4pZJv4SK2YEQiOsUkYklRckMxVO3g_l4RIP83yBRLJaU5IiY_0YyKeR3XIM1QDv-0ZzI13MSPhb2TYzHevwgZ9cPnADMBT_RtRg9y5jscA-A_FdDcZ_QLsrWMYNqp9AlNBvKssrqZQ6PrfA-YngYu9rXIG3BuUw"
    },
    {
      "kty": "RSA",
      "x5t#S256": "m_eCU6DLMVTX9h5TomL64Swtp-AMsmA-6xvWCTr5gf4",
      "e": "AQAB",
      "use": "sig",
      "kid": "OWJmNzgyNTNhMGNiMzE1NGQ3ZjYxZTUzYTI2MmZhZTEyYzJkYTdlMDBjYjI2MDNlZWIxYmQ2MDkzYWY5ODFmZQ_PS256",
      "x5c": [
        "MIIDtTCCAp2gAwIBAgIUdYqOmjbFWs31cUW2cjkBlEUK3tQwDQYJKoZIhvcNAQELBQAwYjELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRQwEgYDVQQHDAtTYW50YSBDbGFyYTENMAsGA1UECgwEV1NPMjENMAsGA1UECwwEV1NPMjESMBAGA1UEAwwJbG9jYWxob3N0MB4XDTI1MDEwODA4MzIwN1oXDTI2MDEwODA4MzIwN1owYjELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRQwEgYDVQQHDAtTYW50YSBDbGFyYTENMAsGA1UECgwEV1NPMjENMAsGA1UECwwEV1NPMjESMBAGA1UEAwwJbG9jYWxob3N0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApKrcXnoAU82tf7lfrK7nXly0NXGuooK5976cApos9eKFd3I2ln7PEZEkeW5U+bsx/fSYBnSlf4rCD3xGI79H86dfJm6xewMeYkGW+gq/qyBJWR+qB4MSbh0LRci3swpVMfV4C+4jOJ0QmSjpr04toXz+yRO1YQIfZnO8ESlSby2gxnaimAkgjdv4pZJv4SK2YEQiOsUkYklRckMxVO3g/l4RIP83yBRLJaU5IiY/0YyKeR3XIM1QDv+0ZzI13MSPhb2TYzHevwgZ9cPnADMBT/RtRg9y5jscA+A/FdDcZ/QLsrWMYNqp9AlNBvKssrqZQ6PrfA+YngYu9rXIG3BuUw"
      ],
      "alg": "PS256",
      "n": "pKrcXnoAU82tf7lfrK7nXly0NXGuooK5976cApos9eKFd3I2ln7PEZEkeW5U-bsx_fSYBnSlf4rCD3xGI79H86dfJm6xewMeYkGW-gq_qyBJWR-qB4MSbh0LRci3swpVMfV4C-4jOJ0QmSjpr04toXz-yRO1YQIfZnO8ESlSby2gxnaimAkgjdv4pZJv4SK2YEQiOsUkYklRckMxVO3g_l4RIP83yBRLJaU5IiY_0YyKeR3XIM1QDv-0ZzI13MSPhb2TYzHevwgZ9cPnADMBT_RtRg9y5jscA-A_FdDcZ_QLsrWMYNqp9AlNBvKssrqZQ6PrfA-YngYu9rXIG3BuUw"
    }
  ]
}
```

<table>
    <tr>
        <td>kty</td>
        <td>The public key type. e.g., RSA</td>
    </tr>
    <tr>
        <td>x5t#S256</td>
        <td>A SHA-256 hash of the X.509 certificate in the JWKS. Used to quickly identify which certificate was used to sign the JWT.</td>
    </tr>
    <tr>
        <td>e</td>
        <td>Exponent used in the RSA algorithm. </td>
    </tr>
    <tr>
        <td>use</td>
        <td>Indicates the intended use of the key.
            <ul>
                <li><code>sig</code>: signature verification</li>
                <li><code>enc</code>: encryption</li>
            </ul>
         </td>
    </tr>
    <tr>
        <td>kid</td>
        <td>The key ID. Helps to identify which key signed the JWT.</td>
    </tr>
    <tr>
        <td>x5c</td>
        <td>The X.509 certificate chain. The chain can include intermediate certificates up to a trusted root. Useful for clients that validate signatures against trusted Certificate Authorities (CA). </td>
    </tr>
    <tr>
        <td>n</td>
        <td>Modulus value used in the RSA algorithm. </td>
    </tr>
</table>

## {{product_name}} acting as the SP

In this instance, {{product_name}} works as the JWT validator. The following diagram explains this process.

![Get JWKS from external IdP]({{base_path}}/assets/img/guides/authentication/oidc/jwks-sp.png)

- The user first authenticates with the external IdP to access the protected resource.

- The external IdP issues a signed JWT and returns it to the user.

- Because the resource server trusts {{product_name}}, not the external IdP, the user must exchange this JWT for an access token in {{product_name}}.

- {{product_name}} reads the kid (key ID) from the JWT header to determine which key was used to sign it.

- If the corresponding key is already available in the cached JWKS content from the external IdP, {{product_name}} uses it to validate the JWT.

- If the key is not cached, {{product_name}} retrieves the JWKS from the external IdP and updates the cache.

- After successfully validating the JWT, {{product_name}} issues an access token to the user.

Follow the steps below to implement this use case.

### Configure external JWKS endpoint properties

The following properties control how {{product_name}} retrieves and processes keys from an external JWKS endpoint. Configure them in the `<IS_HOME>/repository/conf/deployment.toml` file and restart {{product_name}}.

```toml
[oauth.jwks_endpoint]
enable= true
connection_timeout= 1000 # time in milliseconds
read_timeout= 1000 # time in milliseconds
size_limit_bytes= 51200
```

### Exchange signed JWT to a {{product_name}} token

You can see JWT validation in action by following the guide and implementing the [JWT Bearer Grant type]({{base_path}}/guides/authentication/configure-jwt-bearer-grant/) for your application.

{% if product_name == "WSO2 Identity Server" and is_version > "7.2.0" %}

### Additional configurations

We recommend using `x5t#S256`. If your system requires the previous `x5t` support or hexifying the values, use the configuration combinations in the table below.

<table>
    <tr>
        <th>JWT Header</th>
        <th>JWKS Response</th>
        <th>Configuration</th>
        <th>Notes</th>
    </tr>
    <tr>
        <td><code>x5t#S256</code></td>
        <td><code>x5t#S256</code></td>
        <td>This is the default configuration</td>
        <td><strong>Recommended.</strong></td>
    </tr>
    <tr>
        <td><code>x5t</code></td>
        <td><code>x5t</code></td>
        <td>
            <code>[oauth]</code><br/>
            <code>jwt_x5t_s256_enabled=false</code><br/>
            <code>jwt_x5t_enabled=true</code><br/><br/>
            <code>[oauth.jwks_endpoint]</code><br/>
            <code>is_x5t_required=true</code>
        </td>
        <td>Use this to support legacy systems that require <code>x5t</code>.</td>
    </tr>
    <tr>
        <td colspan="2">Hexifying thumbprints</td>
        <td>
            <code>[oauth]</code><br/>
            <code>jwt_x5t_hexify_required=true</code><br/><br/>
            <code>[oauth.jwks_endpoint]</code><br/>
            <code>is_thumbprint_hexify_required=true</code>
        </td>
        <td>When you need to hexify thumbprints, use this configuration.</td>
    </tr>
</table>

{% endif %}
