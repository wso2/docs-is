After registration, the SDK keeps a local record of every enrolled account. The account-management APIs let you list and look up these accounts and read each account's push authentication history.

All operations are accessed through the `AsgardeoPushAuth.instance` singleton.

## getAccounts()

Returns all locally registered accounts.

```dart
Future<List<PushAuthAccount>> getAccounts()
```

```dart title="List all registered accounts"
final accounts = await AsgardeoPushAuth.instance.getAccounts();
for (final account in accounts) {
  print('${account.username} @ ${account.organizationName ?? account.tenantDomain}');
}
```

## getAccount()

Returns a single account by its local identifier, or `null` if not found.

```dart
Future<PushAuthAccount?> getAccount(String accountId)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `String` | ✅ | Local identifier of the account to look up |

```dart title="Look up an account by local ID"
final account = await AsgardeoPushAuth.instance.getAccount(accountId);
```

## getAccountByDeviceId()

Returns a single account by the server-assigned device identifier, or `null` if not found.

```dart
Future<PushAuthAccount?> getAccountByDeviceId(String deviceId)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `deviceId` | `String` | ✅ | Device identifier assigned by {{product_name}} during registration |

```dart title="Look up an account by device ID"
final account = await AsgardeoPushAuth.instance.getAccountByDeviceId(deviceId);
```

## getAuthHistory()

Returns the push authentication history for a given account.

```dart
Future<List<PushAuthRecord>> getAuthHistory(String accountId)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `String` | ✅ | Local identifier of the account whose history to retrieve |

```dart title="Read push authentication history"
final records = await AsgardeoPushAuth.instance.getAuthHistory(accountId);
for (final record in records) {
  print('${record.applicationName} — ${record.status}');
}
```

## PushAuthAccount fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String` | Local account identifier |
| `username` | `String` | Username associated with the account |
| `displayName` | `String` | Display name for the account |
| `deviceId` | `String` | Device identifier assigned by the server |
| `host` | `String` | {{product_name}} server host URL |
| `tenantDomain` | `String?` | Tenant domain of the root organization user |
| `organizationId` | `String?` | Sub-organization identifier, if applicable |
| `organizationName` | `String?` | Sub-organization name, if applicable |
| `userStoreDomain` | `String?` | User store domain |

## PushAuthRecord fields

| Field | Type | Description |
|-------|------|-------------|
| `pushAuthId` | `String` | Unique identifier of the push authentication request |
| `applicationName` | `String` | Application that requested authentication |
| `status` | `String` | `APPROVED` or `DENIED` |
| `respondedTime` | `int` | Epoch-millisecond timestamp when the response was sent |
| `ipAddress` | `String` | IP address from which the login attempt originated |
| `deviceOS` | `String` | OS of the requesting device |
| `browser` | `String` | Browser or client that initiated the login |
| `accountId` | `String` | Local ID of the account that handled the request |
