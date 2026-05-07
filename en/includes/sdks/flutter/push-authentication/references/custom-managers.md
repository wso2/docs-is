The SDK exposes abstract interfaces for every external dependency, so you can plug in custom implementations for HTTP, storage, crypto, logging, and device info.

## Pluggable interfaces

| Interface | Default Implementation | Purpose |
|-----------|------------------------|---------|
| `AsgardeoHttpManager` | `HttpClientManager` | HTTP GET / POST operations |
| `AsgardeoStorageManager` | `SharedPreferencesStorageManager` | Persistent storage for accounts and history |
| `AsgardeoCryptoEngine` | `SecureCryptoEngine` | RSA-2048 key generation and signing |
| `AsgardeoLogger` | `DefaultLogger` | Log output |
| `AsgardeoDeviceInfoProvider` | `PlatformDeviceInfoProvider` | Device name and model resolution |

Inject custom implementations on the builder before calling `build()`:

```dart
(AsgardeoPushAuthBuilder()
      ..httpManager = MyHttpManager()
      ..storageManager = MyStorageManager()
      ..logger = MyLogger())
    .build();
```

---

## Custom HTTP client

For example, to trust a self-signed certificate when connecting to a local server, provide a custom `HttpClientManager`:

```dart
import 'dart:io';
import 'package:asgardeo_push_auth/asgardeo_push_auth.dart';
import 'package:flutter/services.dart';
import 'package:http/io_client.dart';

final certBytes = await rootBundle.load('assets/certs/server.pem');
final context = SecurityContext(withTrustedRoots: true)
  ..setTrustedCertificatesBytes(certBytes.buffer.asUint8List());

final httpClient = IOClient(HttpClient(context: context));

(AsgardeoPushAuthBuilder()
      ..httpManager = HttpClientManager(client: httpClient))
    .build();
```

---

## Custom logger

Implement `AsgardeoLogger` to forward SDK logs to your crash-reporting or analytics service:

```dart
import 'package:asgardeo_push_auth/asgardeo_push_auth.dart';

class MyLogger implements AsgardeoLogger {
  @override
  void error(String message, [Object? error, StackTrace? stackTrace]) {
    // Send to Sentry, Crashlytics, etc.
  }

  @override
  void info(String message) => print('[INFO] $message');

  @override
  void debug(String message) => print('[DEBUG] $message');
}

(AsgardeoPushAuthBuilder()..logger = MyLogger()).build();
```

---

## Custom storage

Implement `AsgardeoStorageManager` to back the SDK with an alternative storage layer (encrypted database, custom keystore, etc.). The default `SharedPreferencesStorageManager` is usually sufficient — accounts and history records are non-sensitive metadata; the private keys live in platform-secure storage regardless of this manager.

Refer to the `AsgardeoStorageManager` interface in the package source for the full method contract.
