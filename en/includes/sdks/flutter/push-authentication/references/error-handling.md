All exceptions thrown by the SDK extend `AsgardeoException`. Catch the most specific subclass first, then fall back to broader categories.

## Base exception

```dart
class AsgardeoException implements Exception {
  final String message;
  final String? code;
  final String? traceId;
  final Object? cause;
}
```

| Field | Type | Description |
|-------|------|-------------|
| `message` | `String` | Human-readable description of the error |
| `code` | `String?` | Error code identifying the specific failure (server codes or SDK codes prefixed with `ASGPA-`) |
| `traceId` | `String?` | Server trace ID for correlating with server-side logs |
| `cause` | `Object?` | The underlying error that caused this failure, if any |

## Exception catalog

| Exception | Thrown when |
|-----------|-------------|
| `AsgardeoNotInitializedException` | `AsgardeoPushAuth.instance` is accessed before `build()` was called |
| `AsgardeoAlreadyInitializedException` | `build()` is called twice without an intervening `reset()` |
| `AsgardeoValidationException` | Input validation fails (invalid QR data, empty parameters) |
| `AsgardeoRegistrationException` | Server rejects a device registration request |
| `AsgardeoDeviceAlreadyRegisteredException` | The user already has a registered account on this device (subclass of `AsgardeoRegistrationException`) |
| `AsgardeoAuthResponseException` | Server rejects an approve/deny response |
| `AsgardeoAccountNotFoundException` | No local account is found for the given ID or device ID |
| `AsgardeoDeviceNotFoundException` | Server reports the device no longer exists (server code `PDH-15009`) |
| `AsgardeoDeviceUpdateException` | Server rejects a device update request |
| `AsgardeoUnregistrationException` | Server rejects a device unregistration request |
| `AsgardeoNetworkException` | Transport-level failure after retries are exhausted |
| `AsgardeoCryptoException` | A cryptographic operation fails |
| `AsgardeoBiometricUnavailableException` | Biometric is required (`BiometricPolicy.mandatory`) but the device does not support it |
| `AsgardeoBiometricAuthFailedException` | Biometric prompt was shown but the user cancelled or failed |
| `AsgardeoStorageException` | Local storage read or write fails |

## Structured error handling

```dart
try {
  await AsgardeoPushAuth.instance.registerDevice(qrCodeJson, deviceToken, FCMPushProvider());
} on AsgardeoValidationException catch (e) {
  // Client-side input error — fix and retry.
  print('Invalid input: ${e.message}');
} on AsgardeoDeviceAlreadyRegisteredException catch (e) {
  // Account already exists — prompt user to remove the existing account first.
  print('Already registered: ${e.message}');
} on AsgardeoRegistrationException catch (e) {
  // Server rejected the registration.
  print('Server error [${e.code}]: ${e.message} (traceId: ${e.traceId})');
} on AsgardeoBiometricAuthFailedException catch (e) {
  // User cancelled or failed the biometric prompt.
  print('Biometric auth failed: ${e.message}');
} on AsgardeoNetworkException catch (e) {
  // Transport failure after retries.
  print('Network error: ${e.message}');
} on AsgardeoException catch (e) {
  // Any other SDK error.
  print('SDK error: ${e.message}');
}
```

!!! tip
    When reporting issues, include both `code` and `traceId` from the caught exception. The `traceId` correlates the failed request with server-side logs and significantly speeds up debugging.
