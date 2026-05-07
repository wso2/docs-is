Unregistering a device removes it from {{product_name}} so it no longer receives push authentication requests, and clears all associated local data (account record, key pair, and history). For cases where the device has already been removed server-side and only local cleanup is required, use `removeLocalAccount()`.

All operations are accessed through the `AsgardeoPushAuth.instance` singleton.

## unregisterDevice()

Removes the device from {{product_name}} and deletes all associated local data.

```dart
Future<void> unregisterDevice(String accountId)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `String` | ✅ | Local identifier of the account to unregister |

```dart title="Unregister a device"
try {
  await AsgardeoPushAuth.instance.unregisterDevice(accountId);
} on AsgardeoDeviceNotFoundException catch (e) {
  // Already removed server-side — clean up locally.
  await AsgardeoPushAuth.instance.removeLocalAccount(accountId);
} on AsgardeoUnregistrationException catch (e) {
  // Server rejected the unregistration request.
} on AsgardeoNetworkException catch (e) {
  // Network failure.
}
```

## removeLocalAccount()

Deletes the local account, key pair, and history without contacting {{product_name}}. Use this when the device has already been removed server-side.

```dart
Future<void> removeLocalAccount(String accountId)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `String` | ✅ | Local identifier of the account to remove |

```dart title="Remove a local account"
await AsgardeoPushAuth.instance.removeLocalAccount(accountId);
```
