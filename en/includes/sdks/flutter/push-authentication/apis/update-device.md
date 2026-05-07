Use the device update API to refresh the device token (after FCM or APNs rotates it) or to change the device's display name on {{product_name}}.

All operations are accessed through the `AsgardeoPushAuth.instance` singleton.

## updateDevice()

Updates the device's display name or device token. At least one of `name` or `deviceToken` must be provided.

```dart
Future<void> updateDevice(
  String accountId, {
  String? name,
  String? deviceToken,
})
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `String` | ✅ | Local identifier of the account whose device is being updated |
| `name` | `String?` | ❌ | New display name for the device |
| `deviceToken` | `String?` | ❌ | New push notification token from FCM or APNs |

```dart title="Refresh device token after rotation"
try {
  
  await AsgardeoPushAuth.instance.updateDevice(
    accountId,
    deviceToken: newToken,
  );

} on AsgardeoDeviceNotFoundException catch (e) {
  // Device was removed server-side — clean up locally.
  await AsgardeoPushAuth.instance.removeLocalAccount(accountId);
} on AsgardeoDeviceUpdateException catch (e) {
  // Server rejected the update request.
}
```

### Renaming a device

```dart title="Example: Rename a registered device"
await AsgardeoPushAuth.instance.updateDevice(
  accountId,
  name: "Alice's Phone",
);
```

### Updating the device token

```dart title="Example: Update device token"
await AsgardeoPushAuth.instance.updateDevice(
  accountId,
  deviceToken: newToken,
);
```

!!! note
    Use this to update the device token when FCM or APNs rotates it.
