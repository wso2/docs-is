When {{product_name}} sends a push authentication request, your app receives a raw notification payload through FCM or APNs. The SDK provides a single helper to convert that payload into a typed request your code can act on.

For details on wiring up FCM and APNs handlers in your app, see the [Configure Notification Handlers]({{base_path}}/sdks/flutter/guides/configure-notification-handlers/) guide.

## parsePushNotification()

Converts a raw push notification payload into a typed `PushAuthRequest`. Returns `null` for notifications that did not originate from {{product_name}}, making it safe to call inside any shared notification handler.

```dart
PushAuthRequest? parsePushNotification(
  Map<String, dynamic> data, {
  int? sentTime,
})
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `Map<String, dynamic>` | ✅ | Raw notification payload (`message.data` from FCM, or the APNs userInfo map) |
| `sentTime` | `int?` | ❌ | Epoch-millisecond timestamp when the notification was sent |

```dart title="Parse a push notification"
final request = Asgardeo.instance.pushAuth.parsePushNotification(
  message.data,
  sentTime: message.sentTime?.millisecondsSinceEpoch,
);

if (request != null) {
  // Present the auth request to the user.
}
```

## PushAuthRequest fields

| Field | Type | Description |
|-------|------|-------------|
| `pushId` | `String` | Unique identifier for this push authentication request |
| `challenge` | `String` | Server-issued challenge string |
| `numberChallenge` | `String?` | Optional number for number-matching flows |
| `relativePath` | `String?` | Resolved relative path for the authentication endpoint |
| `deviceId` | `String` | Device identifier this notification targets |
| `username` | `String` | Username of the authenticating user |
| `tenantDomain` | `String` | Tenant domain of the user's organization |
| `organizationId` | `String?` | Sub-organization identifier, if applicable |
| `organizationName` | `String?` | Sub-organization name, if applicable |
| `userStoreDomain` | `String` | User store domain |
| `applicationName` | `String` | Name of the application requesting authentication |
| `notificationScenario` | `String` | Scenario type (e.g., `AUTHENTICATION`) |
| `ipAddress` | `String` | IP address from which the login attempt originated |
| `deviceOS` | `String` | OS of the requesting device |
| `browser` | `String` | Browser or client that initiated the login |
| `sentTime` | `int` | Epoch-millisecond timestamp when the notification was sent |
