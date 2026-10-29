# Device attributes

These are the attributes you can build [device assurance policy]({{base_path}}/guides/device-management/device-assurance-policies/) conditions from. Each attribute is only available on the platforms listed below, and the Console offers only the attributes that make sense for the platform whose rule you are editing.

The **Key** column shows the name of the attribute as the device reports it, and as it appears in the [Policy management API]({{base_path}}/apis/policy-management-rest-api/). Your application must report the attributes that your policies use. See [Integrate device management in your app]({{base_path}}/guides/device-management/integrate-device-management-in-your-app/#report-device-attributes).

Unless stated otherwise, an attribute supports only the `equals` operator.

!!! note
    If a rule uses an attribute that the device didn't report, the device doesn't pass that condition, and the evaluation result reports the attribute as missing rather than as failed.

## Available on every platform

| Attribute | Key | What it checks | Values |
| --------- | --- | -------------- | ------ |
| **platform** | `platform` | The operating system the device runs. {{product_name}} uses this to select which rule applies, so it isn't offered when you build a rule in the Console. | `android`, `ios`, `macos`, `windows` |
| **lock screen** | `lockScreen` | Whether the device has any screen lock configured at all. This is the broadest check for whether a device is locked when idle. | `true`, `false` |

## Android

| Attribute | Key | What it checks | Values |
| --------- | --- | -------------- | ------ |
| **Android OS Version** | `androidOsVersion` | The Android major version the device runs. Supports `equals` and `greater than`. | `9` through `17` |
| **is rooted** | `isRooted` | Whether the device has been rooted, giving apps and the user unrestricted system access. A rooted device can defeat most other protections, so this is often the first condition to add. | `true`, `false` |
| **USB debugging** | `usbDebugging` | Whether developer-mode USB debugging is turned on. When enabled, anyone with physical access and a cable can read application data and drive the device. | `true`, `false` |
| **hardware keystore** | `hardwareKeystore` | Whether cryptographic keys are held in dedicated security hardware rather than in software. Hardware-held keys cannot be copied off the device. | `true`, `false` |
| **biometric** | `biometric` | Whether the user has enrolled a fingerprint or a face for unlocking. | `true`, `false` |
| **screen lock complexity** | `screenLockComplexity` | How strong the screen lock is. `high` means a long password or a complex PIN. `low` means something trivially guessable, such as a four-digit PIN or a swipe pattern. | `high`, `medium`, `low` |
| **disk encryption** | `diskEncryption` | Whether device storage is encrypted at rest, so data cannot be read by pulling the storage out of a lost or stolen device. | `true`, `false` |
| **network proxies** | `networkProxies` | Whether a network proxy is configured. A proxy can be legitimate corporate infrastructure, but it can also be an attacker intercepting traffic. Decide which case applies in your environment before enforcing this. | `true`, `false` |
| **WiFi network security** | `wifiNetworkSecurity` | Whether the Wi-Fi network the device is currently on is encrypted rather than an open public network. | `true`, `false` |
| **Android integrity** | `androidIntegrity` | The verdict from Google on whether this is a genuine, unmodified Android device. Supports `equals` and `not equals`. {{product_name}} sets this attribute from the attestation result and ignores any value the device reports itself. See [Device attestation]({{base_path}}/guides/device-management/device-attestation/). | `MEETS_STRONG_INTEGRITY`, `MEETS_DEVICE_INTEGRITY`, `MEETS_BASIC_INTEGRITY`, `MEETS_VIRTUAL_INTEGRITY`, `INTEGRITY_FAILED` |

## iOS

| Attribute | Key | What it checks | Values |
| --------- | --- | -------------- | ------ |
| **iOS Version** | `iosOsVersion` | The iOS major version the device runs. Supports `equals` and `greater than`. | `14` through `26` |
| **jailbreak** | `jailbreak` | Whether the device has been jailbroken. Jailbreaking gives the same unrestricted access that rooting gives on Android, and is equally worth blocking. | `true`, `false` |
| **passcode** | `passcode` | Whether the user has set a device passcode. Without one, most of the data protection in iOS does nothing. | `true`, `false` |
| **Touch ID or Face ID** | `touchIdOrFaceId` | Whether the user has enrolled a fingerprint or a face for unlocking. | `true`, `false` |
| **iOS device genuine** | `iosIntegrity` | The verdict from Apple on whether this is a genuine iOS device running a genuine copy of your application. {{product_name}} sets this attribute from the attestation result and ignores any value the device reports itself. See [Device attestation]({{base_path}}/guides/device-management/device-attestation/). | `true`, `false` |

## macOS

| Attribute | Key | What it checks | Values |
| --------- | --- | -------------- | ------ |
| **macOS Version** | `macosOsVersion` | The macOS major version. Supports `equals` and `greater than`. | `12` through `15` |
| **disk encryption** | `diskEncryption` | Whether FileVault is on, encrypting the disk at rest. | `true`, `false` |
| **secure enclave** | `secureEnclave` | Whether the Mac has a Secure Enclave, the dedicated security chip that holds keys and biometric data separately from the main processor. | `true`, `false` |

## Windows

| Attribute | Key | What it checks | Values |
| --------- | --- | -------------- | ------ |
| **Windows Version** | `windowsOsVersion` | The Windows major version. Supports `equals` and `greater than`. | `10`, `11` |
| **disk encryption** | `diskEncryption` | Whether BitLocker is on, encrypting the drive at rest. | `true`, `false` |
| **Windows Hello** | `windowsHello` | Whether Windows Hello, the built-in biometric or PIN sign-in, is configured. | `true`, `false` |
| **Trusted Platform Module** | `trustedPlatformModule` | Whether a TPM is present and enabled. The TPM is the hardware that makes BitLocker and Windows Hello meaningfully secure rather than merely convenient. | `true`, `false` |

!!! tip
    The `greater than` operator is exclusive. To require Android 14 or later, use `Android OS Version` `greater than` `13`.
