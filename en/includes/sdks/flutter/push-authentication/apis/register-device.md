Device registration enrolls a Flutter app instance with {{product_name}} so it can later receive and respond to push authentication requests. The SDK supports two registration methods: a QR-based flow for unauthenticated apps, and a token-based flow for apps that already hold a valid OAuth2 access token.

All operations are accessed through the `AsgardeoPushAuth.instance` singleton.

## registerDevice()

Registers the device using a QR code JSON payload.

```dart
Future<String> registerDevice(
  String qrCodeJson,
  String deviceToken,
  AsgardeoPushNotificationProvider provider,
)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `qrCodeJson` | `String` | Raw JSON string scanned from the registration QR code |
| `deviceToken` | `String` | Push notification token from FCM or APNs |
| `provider` | `AsgardeoPushNotificationProvider` | Push notification provider for this device. See [Push Notification Providers](#push-notification-providers) |

Returns the local `accountId` string on success.

```dart title="Register a device with FCM"
try {

  final accountId = await AsgardeoPushAuth.instance.registerDevice(
    qrCodeJson,
    deviceToken,
    FCMPushProvider(),
  );
  
} on AsgardeoValidationException catch (e) {
  // Invalid or malformed QR code data.
} on AsgardeoDeviceAlreadyRegisteredException catch (e) {
  // This user already has a registered account on this device.
} on AsgardeoRegistrationException catch (e) {
  // Server rejected the registration request.
} on AsgardeoNetworkException catch (e) {
  // Network failure after all retries were exhausted.
}
```

## registerDeviceWithToken()

Registers the device using an OAuth2 access token. The SDK fetches the registration payload from the {{product_name}} push discovery-data endpoint.

```dart
Future<String> registerDeviceWithToken(
  String baseUrl,
  String accessToken,
  String deviceToken,
  AsgardeoPushNotificationProvider provider,
)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `baseUrl` | `String` | {{product_name}} server base URL{% if product_name == "Asgardeo" %} (e.g., `https://api.asgardeo.io/t/myorg`){% else %} (e.g., `https://localhost:9443/t/myorg`){% endif %} |
| `accessToken` | `String` | OAuth2 Bearer token for the authenticated user |
| `deviceToken` | `String` | Push notification token from FCM or APNs |
| `provider` | `AsgardeoPushNotificationProvider` | Push notification provider for this device. See [Push Notification Providers](#push-notification-providers) |

!!! note
    The user must be authenticated before calling this method. The access token must include the `internal_login` scope.

```dart title="Register with an access token"
try {
  
  final accountId = await AsgardeoPushAuth.instance.registerDeviceWithToken(
    {% if product_name == "Asgardeo" %}'https://api.asgardeo.io/t/myorg'{% else %}'https://localhost:9443/t/myorg'{% endif %},
    accessToken,
    deviceToken,
    AmazonSNSPushProvider(AmazonSNSPlatform.fcm),
  );

} on AsgardeoDeviceAlreadyRegisteredException catch (e) {
  // This user already has a registered account on this device.
} on AsgardeoRegistrationException catch (e) {
  // Discovery-data fetch or registration request failed.
} on AsgardeoNetworkException catch (e) {
  // Network failure.
}
```

## Push Notification Providers

Pass the appropriate provider when registering a device.

!!! important
    The push notification provider must be configured in {{product_name}} before registering a device. See [Server-side Push Provider Configuration]({{base_path}}/sdks/flutter/push-authentication/guides/set-up-push-providers/#server-side-push-provider-configuration).

### Firebase Cloud Messaging (FCM)

Use FCM to deliver push notifications on Android, or on iOS when routing through Firebase instead of APNs directly.

| Constructor | When to use |
|-------------|-------------|
| `FCMPushProvider()` | Firebase Cloud Messaging (Android, or iOS via FCM) |

### Amazon SNS

Use Amazon SNS when your {{product_name}} organization is configured with SNS as the push provider. Select the platform that matches your target device.

| Constructor | When to use |
|-------------|-------------|
| `AmazonSNSPushProvider(AmazonSNSPlatform.fcm)` | Amazon SNS with FCM as the underlying platform |
| `AmazonSNSPushProvider(AmazonSNSPlatform.apns)` | Amazon SNS with APNs as the underlying platform |

!!! note
    A platform application for the relevant platform must be configured in {{product_name}} before using it. **`AmazonSNSPlatform.apns` is for the native APNs approach and should not be used for FCM on iOS.**

### Custom Provider

Use `CustomPushProvider` when your organization uses a push delivery service not covered by the built-in providers. Supply the provider name and any metadata required by your server configuration.

| Constructor | When to use |
|-------------|-------------|
| `CustomPushProvider(name: '...', metadata: {...})` | Any other push provider |

```dart title="Example: Use a custom push provider"
await AsgardeoPushAuth.instance.registerDevice(
  qrCodeJson,
  deviceToken,
  CustomPushProvider(name: 'MyProvider', metadata: {'key': 'value'}),
);
```

!!! tip "Tip: Selecting a provider based on platform"
    ```dart
    import 'dart:io';

    final provider = Platform.isIOS
        ? AmazonSNSPushProvider(AmazonSNSPlatform.apns)
        : FCMPushProvider();

    await AsgardeoPushAuth.instance.registerDevice(qrCodeJson, deviceToken, provider);
    ```
