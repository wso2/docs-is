# Symmetric Encryption

Symmetric encryption uses a single key to encrypt and decrypt information. In {{product_name}} version 7.0.0, symmetric encryption is used by default. 

!!! note
    If required, you may switch to [asymmetric key encryption]({{base_path}}/deploy/security/asymmetric-encryption/).

## Why symmetric key encryption?

In all versions of WSO2 Identity Server prior to 5.11.0, asymmetric key encryption was used for signing purposes and for encrypting internal data. However, from version 7.0.0 onwards, symmetric key encryption is used as the default encryption mechanism due to the following reasons:

- **Ability to easily change key stores** - In earlier versions, internal data was encrypted using asymmetric key encryption. This means that whenever the certificates expire, or when the keystore is changed, all encrypted data should be migrated. With the shift to symmetric encryption, this overhead is now removed. The secret key involved in symmetric key encryption is encrypted using asymmetric key encryption. Therefore, the secret key needs to be re-encrypted only when the keystore changes.

- **Industry-wide usage** - Symmetric key encryption is used as an accepted industry-wide mechanism for encrypting internal sensitive data. This includes both on-premise and cloud platforms. 

- **Post-Quantum Security** - Quantum computers have the potential to break widely-used asymmetric encryption algorithms such as RSA and ECC by efficiently solving the underlying mathematical problems. Symmetric key encryption, on the other hand, is more resistant to quantum attacks. 

!!! info
    For more information on symmetric key encryption properties, see [Configure Symmetric Key Encryption]({{base_path}}/deploy/security/symmetric-encryption/use-symmetric-encryption).

## How is it used?

{{product_name}} uses [symmetric key encryption]({{base_path}}/deploy/security/symmetric-encryption) to encrypt the following data.

- Event publisher passwords.
- Secondary user store properties.
- `secretKey` and `verifiedSecretKey` claims of TOTP authentication.
- OAuth 2.0 authorization codes, access tokens, refresh tokens, and consumer secrets (when encryption is enabled).
    
    !!! note
    
        To enable encryption of OAuth 2.0 authorization codes, access tokens, refresh tokens, and consumer secrets, add the following configuration to the `deployment.toml` found in the `<IS_HOME>/repository/conf/` directory.
        
        ```toml
        [oauth.extensions]
        token_persistence_processor = "org.wso2.carbon.identity.oauth.tokenprocessor.EncryptionDecryptionPersistenceProcessor" 
        ```

- Secondary keystore passwords and private-key passwords
- BPS profile passwords
- Workflow request credentials

For other types of encryption, [asymmetric encryption]({{base_path}}/deploy/security/asymmetric-encryption) is used by default.


!!! warning
    All configuration changes should be applied before starting Identity Server for the first time. Otherwise, a [key rotation]({{base_path}}/deploy/security/symmetric-encryption/blue-green-data-encryption-keyrotation) will be required.

## Generate a secret key

For enhanced security, it is recommended to generate your own secret key for symmetric key encryption in {{product_name}}. To do so,

{% if is_version == "7.0.0" %}

1. Generate a unique 128-bit secret key. If you use OpenSSL, the command will be as follows:

    ```bash
    openssl rand -hex 16
    ```

2. Add your generated key to the `deployment.toml` found in the `<IS_HOME>/repository/conf/` directory as follows:

    ```toml
    [encryption]
    key = "9a131db7d3fce3adb0850b486bfc6528"
    ```  

{% else %}

1. Generate a unique 256-bit secret key. If you use OpenSSL, the command will be as follows:

    ```bash
    openssl rand -hex 32
    ```

2. Add your generated key to the `deployment.toml` found in the `<IS_HOME>/repository/conf/` directory as follows:

    ```toml
    [encryption]
    key = "d13e3b2ea4c42eb4a23fd110facb72a596ecd84ecd5297a13065f1877393eccf"
    ```  

{% endif %}

If a custom encryption key is not provided, the value of `encryption.key` in this configuration file will be used as the default key.

## Algorithm

{{product_name}} uses the `AES/GCM/NoPadding` algorithm for symmetric key encryption.

GCM is a stream cipher. Hence, there is a performance advantage of using it due to the parallel encryption of each block. There is no need to use a padding mechanism in GCM mode. In GCM mode, the initialization vector (IV) should be a unique value for each encryption request. The corresponding IVs of each unique value should be kept track of in order to decrypt this internal data. 

{% if is_version == "7.0.0" %}

The key size supported is AES-128. 

{% else %}

The supported key sizes are AES-128, AES-192, and AES-256. 

{% endif %}

## Internal crypto provider

The `org.wso2.carbon.crypto.provider.SymmetricKeyInternalCryptoProvider` provider is used as the internal crypto provider. When configuring the `SymmetricKeyInternalCryptoProvider`, the secret key value needs to be provided in the configuration as well. 

The following configuration is enabled by default in the `<IS_HOME>/repository/resources/conf/default.json` file to use the above-mentioned internal crypto provider.

```json
"encryption.internal_crypto_provider": "org.wso2.carbon.crypto.provider.SymmetricKeyInternalCryptoProvider"
```

## Encrypting symmetric encryption key with cipher tool

It is advised to encrypt the symmetric encryption key with a cipher tool as mentioned [here]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool).

