# Configure Hardware Security Module (HSM)

WSO2 Identity Server supports Hardware Security Module (HSM) integration for secure cryptographic key management. This guide explains how to configure an HSM with WSO2 Identity Server to protect private keys used in OAuth2 JWT signing, SAML assertion signing, and other cryptographic operations.

## Overview

### What is an HSM?

A Hardware Security Module (HSM) is a dedicated cryptographic processor that securely generates, stores, and manages digital keys. Unlike file-based keystores (JKS/PKCS12), an HSM ensures that private key material never leaves the secure hardware boundary. All cryptographic operations — signing, decryption, and key generation — are performed inside the HSM.

WSO2 Identity Server integrates with HSMs through the **PKCS#11** standard, which is supported by all major HSM vendors.

!!! info "Supported HSM Vendors"
    WSO2 Identity Server works with any HSM that provides a PKCS#11-compliant library, including but not limited to:

    - **Thales Luna Network HSM**
    - **AWS CloudHSM**
    - **Azure Dedicated HSM**

### Why use an HSM?

HSMs provide enterprise-grade security for cryptographic key management and can help you meet requirements such as FIPS 140-2 and PCI DSS, depending on HSM certification level and deployment controls. Unlike file-based keystores, private keys generated in an HSM cannot be exported or extracted, ensuring they remain secure within tamper-resistant hardware throughout their lifecycle.

### Architecture: HSM vs file-based keystore

The following diagram illustrates how WSO2 Identity Server operates with an HSM-backed keystore compared to a traditional file-based keystore.

![HSM vs file-based keystore architecture]({{base_path}}/assets/img/deploy/security/keystores/hsm-vs-jks-keystore.png)

!!! tip
    When HSM is enabled, WSO2 Identity Server is fully backward compatible. You can switch between HSM and file-based keystores by toggling the `[keystore.hsm]` configuration in `deployment.toml` without any code changes. A server restart is required after changing this configuration.

### What operations use the HSM?

When HSM is enabled, all private key operations in WSO2 Identity Server are performed using the HSM-backed key. This includes:

- **OAuth2 JWT signing**: Access tokens, ID tokens, and JWT-based client assertions
- **SAML assertion signing**: SAML response and assertion signatures

---

## Prerequisites

Before configuring HSM integration, ensure the following prerequisites are met:

- WSO2 Identity Server is installed. See [Install and Setup]({{base_path}}/deploy/get-started/install/).
- An HSM device or service is provisioned and accessible from the WSO2 Identity Server host.
- The PKCS#11 library (`.so` on Linux, `.dll` on Windows) provided by your HSM vendor is installed on the server.
- A token (partition) is initialized in the HSM with a user PIN.
- Java 11 or Java 17 is configured as the runtime.

!!! note
    Contact your HSM vendor for instructions on installing and initializing the PKCS#11 library and token for your specific device. The steps vary by vendor, but the PKCS#11 configuration for WSO2 is the same regardless of the HSM used.

---

## Step 1: Create the PKCS#11 provider configuration file

The PKCS#11 provider configuration file tells the Java runtime how to connect to your HSM. Create a file named `pkcs11.cfg` in the security resources directory.

**File path:** `<IS_HOME>/repository/resources/security/pkcs11.cfg`

``` properties
name = <PROVIDER_NAME>
library = <PKCS11_LIBRARY_PATH>
slot = <SLOT_NUMBER>
```

Replace the placeholders with values specific to your HSM:

| Parameter | Description | Example |
|-----------|-------------|---------|
| `name` | A descriptive name for the PKCS#11 provider. This appears in Java security provider listings. | e.g., `LunaHSM`, `CloudHSM` |
| `library` | The absolute path to the PKCS#11 shared library provided by your HSM vendor. | See table below |
| `slot` | The slot number (or token slot ID) assigned to your initialized HSM partition. | e.g., `0` |

??? info "Click here to see common PKCS#11 library paths by vendor."

    | HSM Vendor | Operating System | Typical Library Path |
    |------------|-----------------|----------------------|
    | Thales Luna | Linux | `/usr/lib/libCryptoki2_64.so` |
    | Thales Luna | Windows | `C:\Program Files\SafeNet\LunaClient\cryptoki.dll` |
    | AWS CloudHSM | Linux | `/opt/cloudhsm/lib/libcloudhsm_pkcs11.so` |
    | Azure Dedicated HSM | Linux | `/usr/lib/libCryptoki2_64.so` |

!!! tip
    Some HSMs support additional PKCS#11 configuration attributes such as `slotListIndex` or specific mechanism filters. Refer to the [Java PKCS#11 Reference Guide](https://docs.oracle.com/en/java/javase/17/security/pkcs11-reference-guide1.html) and your HSM vendor documentation for advanced configuration options.

---

## Step 2: Generate a key pair in the HSM

Generate an RSA key pair inside the HSM. The private key will remain in the HSM and the corresponding certificate will be used for signature verification.

You can use the Java `keytool` utility with the PKCS#11 provider to generate a key pair directly in the HSM.

``` bash
keytool -genkeypair \
  -alias wso2carbon \
  -keyalg RSA \
  -keysize 2048 \
  -sigalg SHA256withRSA \
  -dname "CN=<HOSTNAME>, OU=<ORG_UNIT>, O=<ORGANIZATION>, L=<CITY>, ST=<STATE>, C=<COUNTRY>" \
  -validity 3650 \
  -keystore NONE \
  -storetype PKCS11 \
  -providerClass sun.security.pkcs11.SunPKCS11 \
  -providerArg <IS_HOME>/repository/resources/security/pkcs11.cfg \
  -storepass <HSM_PIN>
```

!!! note
    - The `-keystore NONE` and `-storetype PKCS11` flags instruct `keytool` to use the HSM instead of a file-based keystore.
    - The `-storepass` is the HSM user PIN, not a file password. You can omit `-storepass` to be prompted interactively, which avoids exposing the PIN in shell history and process listings.
    - The `-alias` value must match the `alias` configured in `[keystore.hsm]` in the `deployment.toml` file.

### Verify key pair creation

Verify that the key pair was created successfully:

``` bash
keytool -list \
  -keystore NONE \
  -storetype PKCS11 \
  -providerClass sun.security.pkcs11.SunPKCS11 \
  -providerArg <IS_HOME>/repository/resources/security/pkcs11.cfg \
  -storepass <HSM_PIN>
```

Expected output:

``` text
Keystore type: PKCS11
Keystore provider: SunPKCS11-<PROVIDER_NAME>

Your keystore contains 1 entry

wso2carbon, PrivateKeyEntry,
Certificate fingerprint (SHA-256): XX:XX:XX:...
```

---

## Step 3: Configure deployment.toml

Add the HSM keystore configuration to the `deployment.toml` file.

Open `<IS_HOME>/repository/conf/deployment.toml` and add the following configuration:

``` toml
[keystore.hsm]
enabled = true
pin = "<HSM_PIN>"
alias = "wso2carbon"
provider_configuration = "pkcs11.cfg"
```

!!! note
    The `provider_configuration` value is the filename of the PKCS#11 configuration file created in [Step 1](#step-1-create-the-pkcs11-provider-configuration-file). It is resolved relative to `<IS_HOME>/repository/resources/security/`.

!!! warning
    The HSM PIN is stored in plain text in `deployment.toml`. In production environments, use WSO2's [secure vault]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool/) to encrypt the PIN value. See [Security best practices](#security-best-practices) for more details.

Ensure that the primary keystore is configured. The primary keystore is used for TLS and other non-HSM operations:

``` toml
[keystore.primary]
file_name = "wso2carbon.p12"
password = "wso2carbon"
type = "PKCS12"
```

---

## Step 4: Start the server and verify

### Start the Identity Server

``` bash
cd <IS_HOME>/bin
./wso2server.sh
```

### Verify HSM initialization

Check the server startup logs to confirm that the HSM keystore was loaded successfully.

**Expected log entry:**

``` text
[INFO] {KeyStoreManager} - Primary keystore loaded successfully ---SunPKCS11-<PROVIDER_NAME> version XX
```

If the HSM is not configured correctly, you will see an error similar to:

``` text
[ERROR] {KeyStoreManager} - Error loading HSM keystore
```

!!! tip "Troubleshooting HSM startup issues"
    - Verify the PKCS#11 library path and slot number in `pkcs11.cfg`
    - Ensure the HSM PIN and key alias are correct
    - Check HSM connectivity and Java permissions

---

## Disabling HSM

To revert to file-based keystores, set the `enabled` parameter to `false` in the `deployment.toml` file:

``` toml
[keystore.hsm]
enabled = false
```

Restart the server. The Identity Server will automatically fall back to using the configured file-based keystore (`[keystore.primary]`).

!!! info
    Disabling HSM does not require any code changes. The switch is entirely configuration-driven.

---

## Security best practices

When deploying HSM in a production environment, consider the following best practices:

- **Protect the HSM PIN.** Store the HSM PIN in a secure secrets vault or use WSO2's [secure vault]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool/) to encrypt the PIN in `deployment.toml`.
- **Use dedicated HSM partitions.** Assign separate HSM partitions for different environments (development, staging, production).
- **Enable HSM audit logging.** Configure your HSM to log all cryptographic operations for compliance and auditing purposes.
- **Ensure high availability.** Use HSM clustering or replication features provided by your vendor to avoid a single point of failure.
- **Restrict network access.** For network-attached HSMs, restrict access to the HSM network interface to only the WSO2 Identity Server hosts.
- **Rotate keys periodically.** Establish a key rotation policy in accordance with your organization's security standards and regulatory requirements.
