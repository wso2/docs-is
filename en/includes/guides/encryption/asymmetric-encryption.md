# Asymmetric Encryption

Asymmetric encryption uses public and private keys to encrypt and decrypt data. While the **public key** of the key pair is shared with external parties, the **private key** is kept secret. When one of the key pairs is used to encrypt a message, the other key can be used to decrypt it. In a **keystore**, you can store both private and public keys, and in a **truststore** you can store only public keys.

!!! info
    For more information on how to configure the keystores to asymmetric key encryption, see [Keystores]({{base_path}}/deploy/security/keystores).

In WSO2 Identity Server, asymmetric encryption is used by default for the following purposes: 

- Authenticating the communication over Secure Sockets Layer (SSL)/Transport Layer Security (TLS) protocols.
- Encrypting sensitive data such as plain-text passwords found in both product-level and product feature-level configurations/configuration files using [cipher tool]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool).
- Encrypting SOAP messages using WS-Security.

For other types of encryption, [symmetric encryption]({{base_path}}/deploy/security/symmetric-encryption) is used by default.


!!! note
    To switch to asymmetric encryption, add the following configurations to the `deployment.toml` file located in the `<IS_HOME>/repository/conf` directory.
    
    The `[keystore]` property should be added before the `[keystore.primary]` entry in the `deployment.toml` file. The other two properties can be added to the end of the file. 

    ```toml
    [keystore]
    userstore_password_encryption = "InternalKeyStore"

    [system.parameter]
    "org.wso2.CipherTransformation"="RSA/ECB/OAEPwithSHA1andMGF1Padding"

    [encryption]
    internal_crypto_provider = "org.wso2.carbon.crypto.provider.KeyStoreBasedInternalCryptoProvider"
    ```