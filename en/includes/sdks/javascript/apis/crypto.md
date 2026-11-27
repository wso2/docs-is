`Crypto` is the interface for the cryptographic operations that [`AsgardeoAuthClient`]({{base_path}}/sdks/javascript/apis/asgardeo-auth-client/) needs: base64url encoding, SHA-256 hashing, random bytes and JWT verification. Pass an implementation to `initialize()`, using the cryptography available on your platform, such as the Web Crypto API in browsers or the `crypto` module in Node.js.

The type parameter `T` is the binary type your implementation works with, for example `Uint8Array` or `Buffer`.

```typescript
interface Crypto<T = any> {
  base64URLDecode(value: string): string;
  base64URLEncode(value: T): string;
  generateRandomBytes(length: number): T;
  hashSha256(data: string): T | Promise<T>;
  verifyJwt(
    idToken: string,
    jwk: JWKInterface,
    algorithms: string[],
    clientId: string,
    issuer: string,
    subject: string,
    clockTolerance?: number,
    validateJwtIssuer?: boolean
  ): Promise<boolean>;
}
```

## How the client uses it

| Operation | Methods used |
|-----------|--------------|
| PKCE code verifier | `generateRandomBytes(32)`, then `base64URLEncode()`. |
| PKCE code challenge | `hashSha256()` on the verifier, then `base64URLEncode()`. |
| Decoding a JWT | `base64URLDecode()` on the token's header or payload. The result must be a UTF-8 string. |
| Validating the ID token | `verifyJwt()`, after the client finds the key in the JWKS whose `kid` matches the token header. |

## Methods

An implementation provides the following methods.

### base64URLDecode()

```typescript
base64URLDecode(value: string): string
```

Decodes a base64url string and returns the result as a string.

### base64URLEncode()

```typescript
base64URLEncode(value: T): string
```

Encodes binary data as base64url, without padding.

### generateRandomBytes()

```typescript
generateRandomBytes(length: number): T
```

Returns `length` cryptographically secure random bytes.

### hashSha256()

```typescript
hashSha256(data: string): T | Promise<T>
```

Returns the SHA-256 hash of `data`.

### verifyJwt()

```typescript
verifyJwt(
  idToken: string,
  jwk: JWKInterface,
  algorithms: string[],
  clientId: string,
  issuer: string,
  subject: string,
  clockTolerance?: number,
  validateJwtIssuer?: boolean
): Promise<boolean>
```

Verifies the ID token. Resolve to `true` when it is valid; resolve to `false` or throw when it isn't. Check that:

- The signature verifies with `jwk`, using one of `algorithms`. The client passes `RS256`, `RS512`, `RS384` and `PS256`.
- The `aud` claim contains `clientId`.
- The `iss` claim equals `issuer`, when `validateJwtIssuer` is `true`.
- The `sub` claim equals `subject`.
- The token hasn't expired, allowing `clockTolerance` seconds of clock skew.

`JWKInterface` has the key fields `alg`, `e`, `kid`, `kty`, `n` and `use`.

## Example

An implementation for runtimes with the Web Crypto API, using the [`jose`](https://github.com/panva/jose) library to verify the token:

```typescript
import type { Crypto, JWKInterface } from "@asgardeo/javascript";
import * as jose from "jose";

class WebCrypto implements Crypto<Uint8Array> {
  base64URLDecode(value: string): string {
    return new TextDecoder().decode(jose.base64url.decode(value));
  }

  base64URLEncode(value: Uint8Array): string {
    return jose.base64url.encode(value);
  }

  generateRandomBytes(length: number): Uint8Array {
    return crypto.getRandomValues(new Uint8Array(length));
  }

  async hashSha256(data: string): Promise<Uint8Array> {
    const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data));
    return new Uint8Array(hash);
  }

  async verifyJwt(
    idToken: string,
    jwk: JWKInterface,
    algorithms: string[],
    clientId: string,
    issuer: string,
    subject: string,
    clockTolerance?: number,
    validateJwtIssuer: boolean = true
  ): Promise<boolean> {
    const key = await jose.importJWK(jwk as jose.JWK);

    await jose.jwtVerify(idToken, key, {
      algorithms,
      audience: [clientId],
      clockTolerance,
      issuer: validateJwtIssuer ? issuer : undefined,
      subject
    });

    return true;
  }
}
```

!!! tip
    `IsomorphicCrypto`, also exported from the package, wraps a `Crypto` implementation with the higher-level helpers the client uses, such as `getCodeVerifier()`, `getCodeChallenge()` and `decodeJwtToken()`. You don't need to create it; the client does.
