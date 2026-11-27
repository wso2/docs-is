The {{product_name}} Node SDK exports a few APIs for writing a {{product_name}} SDK for a Node.js framework. The [Next.js SDK]({{base_path}}/sdks/nextjs/overview/) is built on them. Apps that use the Node SDK directly use [`LegacyAsgardeoNodeClient`]({{base_path}}/sdks/node/apis/legacy-asgardeo-node-client/) and do not need these.

## AsgardeoNodeClient

```typescript
abstract class AsgardeoNodeClient<T = AsgardeoNodeConfig> extends AsgardeoJavaScriptClient<T> {}
```

The base class for a framework SDK's client. It adds nothing to `AsgardeoJavaScriptClient` from `@asgardeo/javascript`, and you can't create an instance of it directly. A framework SDK extends it and usually wraps a `LegacyAsgardeoNodeClient` for the authentication flow. For example, the Next.js SDK's `AsgardeoNextClient` extends `AsgardeoNodeClient`.

## AsgardeoNodeConfig

```typescript
type AsgardeoNodeConfig = Config & {
  sessionCookieExpiryTime?: number;
};
```

The configuration type for `AsgardeoNodeClient`. It adds `sessionCookieExpiryTime`, the lifetime of the session cookie in seconds, to the shared `Config` type. The Node SDK itself does not read `sessionCookieExpiryTime`; the framework SDK applies it.

## Session cookies

Framework SDKs use these values to set their session cookies.

### CookieConfig

Constants for a framework SDK's session cookies.

| Constant | Value |
|----------|-------|
| `CookieConfig.SESSION_COOKIE_NAME` | `__asgardeo__session` |
| `CookieConfig.TEMP_SESSION_COOKIE_NAME` | `__asgardeo__temp.session` |
| `CookieConfig.DEFAULT_MAX_AGE` | `3600` (seconds) |
| `CookieConfig.DEFAULT_HTTP_ONLY` | `true` |
| `CookieConfig.DEFAULT_SAME_SITE` | `"lax"` |
| `CookieConfig.DEFAULT_SECURE` | `true` |

!!! note
    These values are not used by the Express SDK, which sets its own session cookie. See [Session cookie]({{base_path}}/sdks/express/apis/session-cookie/) in the Express SDK documentation.

### getSessionCookieOptions()

```typescript
getSessionCookieOptions(options: Partial<CookieOptions>): CookieOptions
```

Returns `options` with the `CookieConfig` defaults filled in for `httpOnly`, `maxAge`, `sameSite` and `secure` when they are not set.

### CookieOptions

```typescript
interface CookieOptions {
  httpOnly?: boolean;
  maxAge?: number;
  sameSite?: boolean | "lax" | "strict" | "none";
  secure?: boolean;
}
```

`maxAge` is in seconds.

### generateSessionId()

```typescript
generateSessionId(): string
```

Returns a new random session ID, a UUID from the Web Crypto API (`crypto.randomUUID()`).
