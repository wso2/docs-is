After the user reviews a push authentication request and approves or denies it, your app submits the decision back to {{product_name}} to complete (or reject) the login flow.

All operations are accessed through the `AsgardeoPushAuth.instance` singleton.

## sendAuthResponse()

Sends the user's approve or deny decision for a pending push authentication request.

```dart
Future<void> sendAuthResponse(
  PushAuthRequest request,
  PushAuthResponseStatus status, {
  int? selectedNumber,
})
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `request` | `PushAuthRequest` | ✅ | The parsed push authentication request |
| `status` | `PushAuthResponseStatus` | ✅ | `PushAuthResponseStatus.approved` or `.denied` |
| `selectedNumber` | `int?` | ❌ | Number selected by the user; required only when `request.numberChallenge` is present |

```dart title="Approve an authentication request"
try {
  
  await AsgardeoPushAuth.instance.sendAuthResponse(
    request,
    PushAuthResponseStatus.approved,
  );
  
} on AsgardeoAccountNotFoundException catch (e) {
  // No local account found for the device ID in the notification.
} on AsgardeoAuthResponseException catch (e) {
  // Server rejected the response.
} on AsgardeoNetworkException catch (e) {
  // Network failure.
}
```

### Denying a request

```dart title="Example: Deny an authentication request"
await AsgardeoPushAuth.instance.sendAuthResponse(
  request,
  PushAuthResponseStatus.denied,
);
```

### Approving with a number challenge

When `request.numberChallenge` is non-null, prompt the user to select the matching number and pass their selection as `selectedNumber`.

```dart title="Example: Approve with number challenge"
await AsgardeoPushAuth.instance.sendAuthResponse(
  request,
  PushAuthResponseStatus.approved,
  selectedNumber: userSelectedNumber,
);
```

## PushAuthResponseStatus

| Value | Description |
|-------|-------------|
| `PushAuthResponseStatus.approved` | User approved the request |
| `PushAuthResponseStatus.denied` | User denied the request |
