`AsgardeoPushAuthBuilder` configures the SDK before `build()` is called. All options have sensible defaults — only override what you need.

## Builder properties

```dart
(AsgardeoPushAuthBuilder()
      ..logLevel = LogLevel.debug
      ..maxHistoryRecords = 50
      ..maxRetries = 2
      ..biometricPolicy = BiometricPolicy.mandatory
      ..biometricLocalizedReason = 'Verify your identity')
    .build();
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `httpManager` | `AsgardeoHttpManager?` | `HttpClientManager()` | Custom HTTP client for network requests |
| `storageManager` | `AsgardeoStorageManager?` | `SharedPreferencesStorageManager()` | Persistent storage for accounts and history |
| `cryptoEngine` | `AsgardeoCryptoEngine?` | `SecureCryptoEngine()` | RSA key generation and signing engine |
| `deviceInfoProvider` | `AsgardeoDeviceInfoProvider?` | `PlatformDeviceInfoProvider()` | Device name and model provider |
| `logger` | `AsgardeoLogger?` | `DefaultLogger()` | Custom logger implementation |
| `logLevel` | `LogLevel?` | `LogLevel.none` | Log verbosity (`none`, `error`, `info`, `debug`) |
| `biometricPolicy` | `BiometricPolicy` | `BiometricPolicy.enabled` | Biometric gate for private-key operations |
| `biometricLocalizedReason` | `String` | `'Authenticate to confirm this action'` | Text shown in the biometric prompt |
| `maxHistoryRecords` | `int` | `20` | Maximum auth history records per account |
| `maxRetries` | `int` | `1` | Retry attempts for transient network/5xx errors (0 to disable) |

!!! note
    Calling `build()` more than once throws `AsgardeoAlreadyInitializedException`. `AsgardeoPushAuth.reset()` exists for development and testing only — it disposes the singleton and allows re-initialization. Do not use `reset()` in production code.

For pluggable interfaces (`httpManager`, `storageManager`, `cryptoEngine`, `logger`, `deviceInfoProvider`), see [Custom Managers]({{base_path}}/sdks/flutter/push-authentication/configuration/custom-managers/).

---

## Biometric Policy

`BiometricPolicy` controls whether biometric or device-credential authentication is required before any private-key operation (key generation, registration signing, JWT signing for auth responses, device updates, unregistration).

| Policy | Behavior | Throws |
|--------|----------|--------|
| `BiometricPolicy.disabled` | No biometric prompt. Operations proceed immediately. | — |
| `BiometricPolicy.enabled` | Prompts when biometrics are available; skips silently if the device doesn't support it. **(Default)** | `AsgardeoBiometricAuthFailedException` if the user cancels or fails the prompt |
| `BiometricPolicy.mandatory` | Requires biometric or device-credential authentication. | `AsgardeoBiometricUnavailableException` if the device doesn't support it; `AsgardeoBiometricAuthFailedException` on cancel or failure |

```dart
(AsgardeoPushAuthBuilder()
      ..biometricPolicy = BiometricPolicy.mandatory
      ..biometricLocalizedReason = 'Authenticate to approve login')
    .build();
```

!!! important
    The biometric gate is enforced on **every** private-key operation — not only at app launch. This means the user is prompted each time they register, approve/deny a request, update the device, or unregister.
