This guide explains how to integrate push notification handlers into your Flutter app so that incoming {{product_name}} push authentication requests are routed to the SDK.

The core method is `parsePushNotification`, which accepts the raw notification data map and returns a typed `PushAuthRequest` (or `null` for unrelated notifications). It is safe to call in any shared notification handler — it silently filters out payloads that don't originate from {{product_name}}.

!!! note
    Make sure you have completed [Set Up Push Providers]({{base_path}}/sdks/flutter/push-authentication/guides/set-up-push-providers/) before continuing.

<!-- See the sample app for a complete integration: <SAMPLE_APP_GITHUB_URL> -->

---

## FCM Foreground Handler

When the app is open and in the foreground, use `FirebaseMessaging.onMessage` to receive notifications.

```dart
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:asgardeo_push_auth/asgardeo_push_auth.dart';

void setupForegroundHandler() {
  FirebaseMessaging.onMessage.listen((RemoteMessage message) {
    final request = AsgardeoPushAuth.instance.parsePushNotification(
      message.data,
      sentTime: message.sentTime?.millisecondsSinceEpoch,
    );

    if (request != null) {
      // Display the authentication request to the user.
      // e.g. show an in-app dialog or navigate to an approval screen.
    }
  });
}
```

---

## FCM Background and Terminated Handler

When the app is in the background or not running, FCM invokes a top-level background handler. This function must be a top-level (non-anonymous) function so that Flutter can isolate it.

```dart
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:asgardeo_push_auth/asgardeo_push_auth.dart';

@pragma('vm:entry-point')
Future<void> firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  // Ensure the SDK is initialized before using it in the background isolate.
  AsgardeoPushAuthBuilder().build();

  final request = AsgardeoPushAuth.instance.parsePushNotification(
    message.data,
    sentTime: message.sentTime?.millisecondsSinceEpoch,
  );

  if (request != null) {
    // Store the request locally or show a system notification
    // so the user can act on it when they open the app.
  }
}
```

Register the handler early in `main()`:

```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  FirebaseMessaging.onBackgroundMessage(firebaseMessagingBackgroundHandler);

  AsgardeoPushAuthBuilder().build();
  runApp(const MyApp());
}
```

!!! important
    The background handler runs in a **separate Dart isolate**. It cannot update UI state directly. Use local storage, shared preferences, or a stream to pass the request to the main isolate when the user opens the app.

---

## APNs Handler (iOS)

If your iOS app communicates directly through Apple Push Notification service (APNs) without going through FCM, implement the native APNs delegate methods via a Flutter platform channel or a native plugin.

**Obtaining the device token:**

In your `AppDelegate.swift`, capture the APNs device token and pass it to Flutter:

```swift
func application(
    _ application: UIApplication,
    didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
) {
    let tokenString = deviceToken.map { String(format: "%02.2hhx", $0) }.joined()
    // Send tokenString to your Flutter layer via a MethodChannel or EventChannel.
}
```

Pass this token as the `deviceToken` argument when calling `registerDevice`.

**Receiving notifications:**

When a notification arrives, the system calls `didReceiveRemoteNotification`. Extract the payload and pass it to `parsePushNotification`:

```swift
func application(
    _ application: UIApplication,
    didReceiveRemoteNotification userInfo: [AnyHashable: Any],
    fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void
) {
    // Forward userInfo to your Flutter layer, then call parsePushNotification.
    completionHandler(.newData)
}
```
