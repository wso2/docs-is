# An Overview of Symmetric Encryption

With symmetric encryption, a single key will be shared for encryption and decryption of information. In this version of WSO2 Identity Server, symmetric encryption is used by default. You can switch to [asymmetric key encryption]({{base_path}}/deploy/security/asymmetric-encryption/use-asymmetric-encryption) if required.


!!! note
    Add the following configurations to the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory to switch to asymmetric encryption.

    The `[keystore]` property should be added before the `[keystore.primary]` entry in the `deployment.toml` file. The other two properties can be added to the end of the file. 

    ```toml
    [keystore]
    userstore_password_encryption = "InternalKeyStore"

    [system.parameter]
    "org.wso2.CipherTransformation"="RSA/ECB/OAEPwithSHA1andMGF1Padding"

    [encryption]
    internal_crypto_provider = "org.wso2.carbon.crypto.provider.KeyStoreBasedInternalCryptoProvider"
    ```

---

## Why symmetric key encryption instead of asymmetric encryption?

The asymmetric key encryption was used for encrypting internal data as well as for signing purposes for all versions prior to WSO2 IS 5.11.0.
However, this release uses symmetric key encryption as the default encryption mechanism to encrypt internal sensitive data. Following are the reasons for this decision.


- **Capability to change the keystores easily**
    Earlier, since internal data was also encrypted using asymmetric key encryption, whenever the certificates expired, or when the keystore needed to be changed, all the data encrypted using the old keystore had to be migrated.
    Now, with the introduction of symmetric key encryption for internal sensitive data, this overhead is resolved. The secret key in symmetric key encryption will be encrypted using asymmetric key encryption. So, the secret key of symmetric key encryption needs to be re-encrypted only when a keystore change is required.

- **Industry-wide usage**
    Symmetric key encryption is used as an accepted industry-wide mechanism for encrypting internal sensitive data. This included both on-premise as well as cloud platforms. 

!!! info
    For more information on how to configure the properties related to symmetric key encryption, see [Configurations Related to Symmetric Key Encryption]({{base_path}}/deploy/security/symmetric-encryption/use-symmetric-encryption).