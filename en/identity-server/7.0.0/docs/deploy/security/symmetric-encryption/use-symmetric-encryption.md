# Configurations Related to Symmetric Key Encryption

This section explains the configurations related to [symmetric key encryption]({{base_path}}/deploy/security/symmetric-encryption). WSO2 Identity Server uses symmetric encryption by default for encrypting following data:

- Event publisher passwords
- Secondary user store properties
- TOTP `secretKey` and `verifiedSecretKey` claims
- OAuth 2.0 authorization codes, access tokens, refresh tokens, and consumer secrets (disabled by default)
- Secondary Keystore passwords, and private-key passwords
- BPS profile passwords
- Workflow request credentials

!!! note
    To enable encryption of OAuth 2.0 authorization codes, access tokens, refresh tokens, and consumer secrets, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file.
    ```toml
    [oauth.extensions]
    token_persistence_processor = "org.wso2.carbon.identity.oauth.tokenprocessor.EncryptionDecryptionPersistenceProcessor" 
    ```

For other types of encryption, [asymmetric encryption]({{base_path}}/deploy/security/asymmetric-encryption) is used by default.

!!! warning
    All configuration changes should be applied before starting Identity Server for the first time. Otherwise, a [key rotation]({{base_path}}/deploy/security/symmetric-encryption/blue-green-data-encryption-keyrotation) will be required.

## Configuring the symmetric secret

It is recommended to generate a new symmetric encryption key for enhanced security.

To generate a unique 128-bit secret key, use a tool like OpenSSL with the following command:

```bash
openssl rand -hex 16
```

Once a secure secret key is generated, configure it using the following configuration in the `<IS_HOME>/repository/conf/deployment.toml` file.

```toml
[encryption]
key = "03BAFEB27A8E871CAD83C5CD4E771DAB"
```  

If a custom encryption key is not provided, the `encryption.key` in this configuration will be used as the default key.

## Algorithm used

`AES/GCM/NoPadding` is used as the symmetric key encryption algorithm.

GCM is a stream cipher. Hence, there is a performance advantage of using it due to the parallel encryption of each block. There is no need to use a padding mechanism in GCM mode. In GCM mode, the initialization vector (IV) should be a unique value for each encryption request. The corresponding IVs of each unique value should be kept track of in order to decrypt this internal data. The keysize supported is AES-128. 

## Internal crypto provider

The `org.wso2.carbon.crypto.provider.SymmetricKeyInternalCryptoProvider` provider is used as the internal crypto provider. When configuring the `SymmetricKeyInternalCryptoProvider`, the secret key value needs to be provided in the configuration as well. 

The following configuration is enabled by default in the `<IS_HOME>/repository/resources/conf/default.json` file to use the above-mentioned internal crypto provider.

```json
"encryption.internal_crypto_provider": "org.wso2.carbon.crypto.provider.SymmetricKeyInternalCryptoProvider"
```

## Encrypting symmetric encryption key with cipher tool

It is advised to encrypt the symmetric encryption key with a cipher tool as mentioned [here]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool).
