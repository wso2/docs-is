`Storage` is the interface for the key-value store that [`AsgardeoAuthClient`]({{base_path}}/sdks/javascript/apis/asgardeo-auth-client/) keeps its data in. Pass an implementation to `initialize()`. Choose the backing store to suit your platform: browser storage, memory, a file, or a shared cache such as Redis.

```typescript
interface Storage {
  getData(key: string): Promise<string>;
  setData(key: string, value: string): Promise<void>;
  removeData(key: string): Promise<void>;
}
```

## Methods

An implementation provides the following methods.

### getData()

```typescript
getData(key: string): Promise<string>
```

Returns the value stored under `key`. When nothing is stored under the key, return `"{}"`. The stores in the {{product_name}} SDKs do this, and the client reads every value as JSON.

### setData()

```typescript
setData(key: string, value: string): Promise<void>
```

Stores `value` under `key`, replacing any existing value.

### removeData()

```typescript
removeData(key: string): Promise<void>
```

Removes the value stored under `key`.

## Example

An in-memory store:

```typescript
import type { Storage } from "@asgardeo/javascript";

class MemoryStore implements Storage {
  private data = new Map<string, string>();

  async getData(key: string): Promise<string> {
    return this.data.get(key) ?? "{}";
  }

  async setData(key: string, value: string): Promise<void> {
    this.data.set(key, value);
  }

  async removeData(key: string): Promise<void> {
    this.data.delete(key);
  }
}
```

## What the client stores

The client stores each kind of data as one JSON string under its own key, in the form `<prefix>-instance_<instanceID>-<clientId>`. When a method is called with a `userId`, the key ends with `-<userId>`, so the data of each user is kept apart:

| Key prefix | Contents |
|------------|----------|
| `config_data` | The configuration, merged over the defaults. |
| `oidc_provider_meta_data` | The resolved OpenID provider metadata and endpoints. |
| `session_data` | The tokens: `access_token`, `id_token`, `refresh_token`, `expires_in`, `scope`, `token_type`, `session_state` and `created_at`. |
| `temporary_data` | Short-lived data, such as PKCE code verifiers. |
| `persisted_data` | Data kept across sessions, such as `applicationId`. |

The session data includes the user's tokens. Keep the store somewhere only your integration can read it.

## StorageManager

`StorageManager` is the class the client uses to read and write these keys through your `Storage` implementation. Get the client's instance with `AsgardeoAuthClient.getStorageManager()`, for example to read or update the session data directly:

```typescript
const storageManager = auth.getStorageManager();

const session = await storageManager.getSessionData();
```

It has `get`, `set` and `remove` methods for each kind of data, such as `getConfigData()`, `setSessionData()`, `getTemporaryDataParameter()` and `removeSessionData()`. Most methods take an optional `userId`.
