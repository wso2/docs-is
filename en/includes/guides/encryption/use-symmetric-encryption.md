# Configure symmetric key encryption

This section explains the configurations related to [symmetric key encryption]({{base_path}}/deploy/security/symmetric-encryption).

WSO2 Identity Server uses symmetric encryption by default for encrypting the following data:

- Event publisher passwords
- Secondary user store properties
- TOTP `secretKey` and `verifiedSecretKey` claims
- OAuth 2.0 authorization codes, access tokens, refresh tokens, and consumer secrets (only when encryption enabled)
    
    !!! note
    
        To enable encryption of OAuth 2.0 authorization codes, access tokens, refresh tokens, and consumer secrets, add the following configuration to the `deployment.toml` found in the `<IS_HOME>/repository/conf/` directory.
        ```toml
        [oauth.extensions]
        token_persistence_processor = "org.wso2.carbon.identity.oauth.tokenprocessor.EncryptionDecryptionPersistenceProcessor" 
        ```

- Secondary keystore passwords, and private-key passwords
- BPS profile passwords
- Workflow request credentials

For other types of encryption, [asymmetric encryption]({{base_path}}/deploy/security/asymmetric-encryption) is used by default.


!!! warning
    All configuration changes should be applied before starting Identity Server for the first time. Otherwise, a [key rotation]({{base_path}}/deploy/security/symmetric-encryption/blue-green-data-encryption-keyrotation) will be required.

## Configure a secret key

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

## Algorithm used

`AES/GCM/NoPadding` is used as the symmetric key encryption algorithm.

GCM is a stream cipher. Hence, there is a performance advantage of using it due to the parallel encryption of each block. There is no need to use a padding mechanism in GCM mode. In GCM mode, the initialization vector (IV) should be a unique value for each encryption request. The corresponding IVs of each unique value should be kept track of in order to decrypt this internal data. 

{% if is_version == "7.0.0" %}

The keysize supported is AES-128. 

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
