# Device attributes

These are the attributes you can build [device assurance policy]({{base_path}}/guides/device-management/device-assurance-policies/) conditions from. Each attribute is only available on the platforms listed below, and the Console offers only the attributes that make sense for the platform whose rule you are editing.

## Available on every platform

| Attribute | What it checks | Values |
| --------- | -------------- | ------ |
| **platform** | The operating system the device runs. {{product_name}} uses this to select which rule applies, so you rarely need to test it inside a rule. | `android`, `ios`, `macos`, `windows` |
| **lock screen** | Whether the device has any screen lock configured at all. This is the broadest check for whether a device is locked when idle. | `true`, `false` |

## Android

| Attribute | What it checks | Values |
| --------- | -------------- | ------ |
| **Android OS version** | The Android major version the device runs. Supports `equals`, `greater than or equal to`, and `in`. | `9` through `17` |
| **is rooted** | Whether the device has been rooted, giving apps and the user unrestricted system access. A rooted device can defeat most other protections, so this is often the first condition to add. | `true`, `false` |
| **USB debugging** | Whether developer-mode USB debugging is turned on. When enabled, anyone with physical access and a cable can read application data and drive the device. | `true`, `false` |
| **hardware keystore** | Whether cryptographic keys are held in dedicated security hardware rather than in software. Hardware-held keys cannot be copied off the device. | `true`, `false` |
| **biometric** | Whether the user has enrolled a fingerprint or a face for unlocking. | `true`, `false` |
| **screen lock complexity** | How strong the screen lock is. `high` means a long password or a complex PIN. `low` means something trivially guessable, such as a four-digit PIN or a swipe pattern. | `high`, `medium`, `low` |
| **disk encryption** | Whether device storage is encrypted at rest, so data cannot be read by pulling the storage out of a lost or stolen device. | `true`, `false` |
| **network proxies** | Whether a network proxy is configured. A proxy can be legitimate corporate infrastructure, but it can also be an attacker intercepting traffic. Decide which case applies in your environment before enforcing this. | `true`, `false` |
| **WiFi network security** | Whether the Wi-Fi network the device is currently on is encrypted rather than an open public network. | `true`, `false` |
| **Android integrity** | Google's verdict on whether this is a genuine, unmodified Android device. This attribute is only meaningful when [device attestation]({{base_path}}/guides/device-management/device-attestation/) is configured. | `MEETS_STRONG_INTEGRITY`, `MEETS_DEVICE_INTEGRITY`, `MEETS_BASIC_INTEGRITY`, `MEETS_VIRTUAL_INTEGRITY`, `INTEGRITY_FAILED` |

## iOS

| Attribute | What it checks | Values |
| --------- | -------------- | ------ |
| **iOS version** | The iOS major version the device runs. Supports `equals`, `greater than or equal to`, and `in`. | `14` through `26`, plus `LATEST_IOS` and `SECOND_LATEST_IOS` |
| **jailbreak** | Whether the device has been jailbroken. Jailbreaking gives the same unrestricted access that rooting gives on Android, and is equally worth blocking. | `true`, `false` |
| **passcode** | Whether the user has set a device passcode. Without one, most of the data protection in iOS does nothing. | `true`, `false` |
| **Touch ID or Face ID** | Whether the user has enrolled a fingerprint or a face for unlocking. | `true`, `false` |
| **iOS device genuine** | The verdict from Apple on whether this is a genuine iOS device running a genuine copy of your application. See [device attestation]({{base_path}}/guides/device-management/device-attestation/). | `true`, `false` |

## macOS

| Attribute | What it checks | Values |
| --------- | -------------- | ------ |
| **macOS version** | The macOS major version. Supports `equals`, `greater than or equal to`, and `in`. | `12` through `15`, plus `LATEST_MACOS` and `SECOND_LATEST_MACOS` |
| **disk encryption** | Whether FileVault is on, encrypting the disk at rest. | `true`, `false` |
| **secure enclave** | Whether the Mac has a Secure Enclave, the dedicated security chip that holds keys and biometric data separately from the main processor. | `true`, `false` |

## Windows

| Attribute | What it checks | Values |
| --------- | -------------- | ------ |
| **Windows version** | The Windows major version. Supports `equals`, `greater than or equal to`, and `in`. | `10`, `11`, plus `LATEST_WINDOWS` and `SECOND_LATEST_WINDOWS` |
| **disk encryption** | Whether BitLocker is on, encrypting the drive at rest. | `true`, `false` |
| **Windows Hello** | Whether Windows Hello, the built-in biometric or PIN sign-in, is configured. | `true`, `false` |
| **Trusted Platform Module** | Whether a TPM is present and enabled. The TPM is the hardware that makes BitLocker and Windows Hello meaningfully secure rather than merely convenient. | `true`, `false` |
