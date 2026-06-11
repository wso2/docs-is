# ID tokens

An ID token is a signed JSON Web Token (JWT) issued by {{product_name}} as part of an OpenID Connect authentication flow. The client application uses the ID token to verify the identity of the authenticated user and learn details about the authentication event. ID tokens are not intended to be sent to resource servers as authorization credentials.

## ID token claims

ID tokens contain a set of claims that describe the authenticated user and the authentication event.

_Sample ID token payload_:

```json
{
  "isk": "c37e33a87f794f9db4e43eeec5596dd0f64ba43c2c8a6e35eb4bd09e8a09d58a",
  "at_hash": "sXH3BGop66MmXp0CCWDk2A",
  "aud": "Wsoq8t4nHW80gSnPfyDvRbiC__Ea",
  "c_hash": "IgFIyrsoOeTwjdAaG3y3OQ",
  "sub": "Alice@bifrost.com",
  "nbf": 1623843889,
  "azp": "Wsoq8t4nHW80gSnPfyDvRbiC__Ea",
  "amr": [
    "BasicAuthenticator"
  ],
  "iss": "https://<organization-host>/oauth2/token",
  "exp": 1623847489,
  "iat": 1623843889
}
```

The following table describes the standard claims in an {{product_name}} ID token.

| Claim | Description |
| ----- | ----------- |
| `sub` | Subject identifier — a unique identifier for the authenticated user within {{product_name}}. |
| `iss` | Issuer — the token endpoint URL of the {{product_name}} organization that issued the token. |
| `aud` | Audience — the intended recipient(s) of the ID token. By default this is the client ID of the application. |
| `azp` | Authorized party — the OAuth 2.0 client ID of the application that requested the token. |
| `iat` | Issued at — the Unix timestamp when the token was issued. |
| `exp` | Expiry time — the Unix timestamp after which the token must not be accepted. |
| `nbf` | Not before — the Unix timestamp before which the token must not be accepted. |
| `amr` | Authentication methods reference — an array of authentication method identifiers used during the authentication event. |
| `at_hash` | Access token hash — a hash of the access token, used to bind the ID token to the access token. |
| `c_hash` | Code hash — a hash of the authorization code, present when the token is issued via the authorization code flow. |
| `nonce` | A value included in the authentication request to bind the ID token to the client session and prevent replay attacks. Present only when the client included a `nonce` in the original request. |
| `isk` | An {{product_name}}-specific claim representing the session key. |

### Audience claim

The `aud` claim specifies the recipient(s) for which the ID token is intended. By default, the client ID of the application is added as an audience. When multiple audiences are configured, the `aud` claim becomes a JSON array.

_Sample ID token with multiple audiences_:

```json
{
  "isk": "1f77c2907c1c2670d73909d3dad38cd02ecda3c21a343dec9d75b51630ca5418",
  "at_hash": "a387Ursh5iNxeMmNViWT2A",
  "aud": [
    "Wsoq8t4nHW80gSnPfyDvRbiC__Ea",
    "sample_app"
  ],
  "c_hash": "tz02tie7nYsK4__SFj2uKQ",
  "sub": "Alice@bifrost.com",
  "nbf": 1623908834,
  "azp": "Wsoq8t4nHW80gSnPfyDvRbiC__Ea",
  "amr": [
    "BasicAuthenticator"
  ],
  "iss": "https://<organization-host>/oauth2/token",
  "exp": 1623912434,
  "iat": 1623908834
}
```

To add additional audiences to the ID token, see [OIDC settings for apps]({{base_path}}/references/app-settings/oidc-settings-for-app/#id-token).

## Validating an ID token

Validate an ID token immediately after receiving it from {{product_name}}, before using any of its claims to establish a user session or make access control decisions.

### Verify the signature

Every ID token is cryptographically signed. Verifying the signature confirms that the token was issued by {{product_name}} and has not been tampered with.

1. Read the `alg` value from the token header and confirm the algorithm is accepted by your application. Reject tokens with the `none` algorithm outright.
2. Retrieve {{product_name}}'s public signing keys from the JWKS endpoint. Use the `kid` value in the token header to select the correct key.
3. Verify the token signature against the header and payload using the retrieved public key.

Use a well-maintained JWT library that enforces algorithm whitelisting rather than implementing signature verification manually.

### Validate the claims

After the signature passes, verify the following claims.

| Claim | Validation |
| ----- | ---------- |
| `iss` | Must match your {{product_name}} organization's issuer URL and must be an HTTPS URL. |
| `aud` | Must contain your application's client ID. Reject the token if your client ID is absent. |
| `exp` | Current time must be before this timestamp. Reject expired tokens. |
| `iat` | Token must not have been issued in the future. |
| `nbf` | If present, current time must be at or after this timestamp. |
| `nonce` | If your application sent a `nonce` in the authorization request, this claim must match it exactly. This prevents replay attacks. |

### Verify hash claims

When {{product_name}} issues an ID token alongside an access token, the `at_hash` claim contains a hash of the access token. Verifying `at_hash` confirms that the two tokens belong to the same authorization response. Similarly, in an authorization code flow, the `c_hash` claim holds a hash of the authorization code and can be verified to detect substitution attacks.

## ID token encryption

By default, ID tokens are signed but not encrypted. When encryption is enabled, {{product_name}} encrypts the ID token using the public key from the certificate configured for the application, following the JSON Web Encryption (JWE) standard.

The encryption process uses two algorithms working together.

- **Asymmetric algorithm (`alg`)**: A single-use AES secret key, called the Content Encryption Key (CEK), is generated. {{product_name}} obtains the public key from the configured certificate and encrypts this CEK using the selected asymmetric algorithm. The algorithm name is recorded in the `alg` header of the JWE token.
- **Symmetric algorithm (`enc`)**: The CEK is then used with the selected symmetric encryption method to encrypt the actual ID token payload. The method name is recorded in the `enc` header of the JWE token.

!!! note
    To enable ID token encryption, configure a certificate for your application in the **Certificate** section of the application settings before enabling the **Enable encryption** option.

To configure encryption algorithm and method, see [OIDC settings for apps]({{base_path}}/references/app-settings/oidc-settings-for-app/#id-token).

## Token lifetime

An ID token has a configurable validity period. After the token expires, it must not be accepted by the client. The default validity period is 3600 seconds.

## ID tokens and API access

ID tokens prove that a user authenticated — they are not authorization credentials for calling APIs or resource servers. Using an ID token where an access token is expected creates security risks.

- **Audience mismatch**: The `aud` claim in an ID token is set to the client application's client ID, not to an API. A resource server that does not verify the audience could accept any ID token, including tokens stolen from unrelated client applications.
- **No scopes**: ID tokens do not carry OAuth 2.0 scopes. Using them for API calls bypasses the scope mechanism that restricts which operations the user has authorized.
- **No sender constraints**: Access tokens can be bound to the requesting client through [token binding]({{base_path}}/references/token-binding/), preventing replay if intercepted. ID tokens do not carry similar protections.

Always present access tokens to resource servers. Use ID tokens only within the client application to verify user identity and establish a login session.

!!! note
    To configure ID token audience, encryption, and expiry for your application, see [OIDC settings for apps]({{base_path}}/references/app-settings/oidc-settings-for-app/#id-token).
