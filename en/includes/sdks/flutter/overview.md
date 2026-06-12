![Asgardeo Flutter SDK]({{base_path}}/assets/img/sdks/flutter/banner.png){: width="auto" style="display: block; margin-bottom: 20px;"}

The `asgardeo_flutter` package is the official {{product_name}} Flutter SDK. The current release supports push-notification-based multi-factor authentication and handles the full lifecycle — device registration, cryptographic challenge signing, approve/deny responses, and local auth history — using RSA-2048 key pairs stored in the platform's secure hardware storage.

## Features

| Feature | Description |
|---------|-------------|
| **Device Registration** | Register devices via QR code scan or OAuth2 access token |
| **RSA-2048 Signing** | Cryptographic request signing with platform-secure key storage (Android Keystore / iOS Keychain) |
| **Push Authentication** | Parse incoming push notifications and send approve/deny responses |
| **Number Challenge** | Support for number-matching push authentication flows |
| **Biometric Gating** | Optional biometric/device-credential authentication before key operations |
| **Device Management** | Update device name, refresh push token, and unregister devices |
| **Auth History** | Local tracking of all push authentication events per account |
| **Automatic Retries** | Built-in retry logic with exponential backoff for transient failures |
| **Pluggable Architecture** | Replace HTTP, storage, crypto, logging, and device-info implementations |

## Getting Started

This guide gets the `asgardeo_flutter` SDK running in the minimum number of steps. For push notification delivery to work end-to-end, complete the [Set Up Push Providers]({{base_path}}/sdks/flutter/guides/set-up-push-providers/) and [Configure Notification Handlers]({{base_path}}/sdks/flutter/guides/configure-notification-handlers/) guides.

### Installation

Add the dependency to your `pubspec.yaml`:

```yaml
dependencies:
  asgardeo_flutter: <version>
```

Then run:

```bash
flutter pub get
```

### Initialize the SDK

Call `AsgardeoBuilder().build()` once at app startup, before any other SDK calls. The best place is in `main()` after `WidgetsFlutterBinding.ensureInitialized()`.

```dart title="lib/main.dart"
import 'package:asgardeo_flutter/asgardeo.dart';
import 'package:flutter/material.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  AsgardeoBuilder().build();

  runApp(const MyApp());
}
```

After `build()` returns, access push-auth operations through `Asgardeo.instance.pushAuth` from anywhere in your app:

```dart
final pushAuth = Asgardeo.instance.pushAuth;
```

### Register a device

Once you have a QR code JSON string (scanned from the {{product_name}} My Account portal) and a push token from FCM or APNs, call `registerDevice`:

```dart
import 'package:asgardeo_flutter/asgardeo.dart';

Future<void> registerDevice(String qrCodeJson, String deviceToken) async {
  
  try {
    
    final accountId = await Asgardeo.instance.pushAuth.registerDevice(
      qrCodeJson,
      deviceToken,
      FCMPushProvider(),
    );
    
    print('Device registered. Account ID: $accountId');

  } on AsgardeoDeviceAlreadyRegisteredException {
    // This user already has a registered account on this device.
  } on AsgardeoRegistrationException catch (e) {
    print('Registration failed: ${e.message}');
  } on AsgardeoNetworkException catch (e) {
    print('Network error: ${e.message}');
  }
}
```

!!! note
    `FCMPushProvider` is used in this example. Choose the provider that matches your push notification service configuration. See [Push Notification Providers]({{base_path}}/sdks/flutter/apis/register-device/#push-notification-providers) for all options.

## Next steps

- [Set Up Push Providers]({{base_path}}/sdks/flutter/guides/set-up-push-providers/) — Configure Firebase, Apple Developer, and server-side push provider.
- [Configure Notification Handlers]({{base_path}}/sdks/flutter/guides/configure-notification-handlers/) — Wire up FCM and APNs handlers in your app.
- [API Reference]({{base_path}}/sdks/flutter/apis/register-device/) — Full documentation for every method.
- [Customization]({{base_path}}/sdks/flutter/references/builder-options/) — Customize the SDK with builder options.
