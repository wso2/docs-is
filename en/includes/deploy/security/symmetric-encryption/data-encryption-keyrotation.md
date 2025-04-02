# Data Encryption Key Rotation

This section contains the complete process you need to follow in order to perform symmetric data encryption key rotation in {{product_name}}.

Key rotation can be defined as retiring an encryption key and replacing it with a new key. Data is encrypted using a key known as a Data Encryption Key(DEK) and the DEK is then encrypted with another key called Key Encryption Key(KEK). This is known as envelope encryption. Frequent rotations of these encryption keys are considered as an industry best practice by PCI DSS and NIST standards.

## Why should you rotate encryption keys?

!!! info
    Originator Usage Period (OUP) is the time period during which encryption is applied to data.

- A cryptoperiod is the time span during which a specific key is authorized for use. [NIST SP 800-57](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-57pt1r5.pdf){:target="_blank"} recommends different cryptoperiods for different encryption key types.

    - Symmetric Data Encryption Keys
        
        - OUP recommended for large volumes of data is about a day or a week.
        - OUP recommended for smaller volumes of data is about 2 years.

    - Symmetric Key, Wrapping Keys
    
        - OUP recommended for a key that wraps a large number of keys is about a day or a week.
        - OUP recommended for a key that wraps a smaller number of keys is up to 2 years.

- Security compliance requirements
- Security breach requirements

!!! note
    The above-mentioned cryptoperiods can vary based on other factors like the sensitivity of data and the amount of data we have.

## Background

{{product_name}} has the following key usages for signing/encrypting data and each of these types will have different key rotation requirements.
 
- TLS Connection
- Signing and encryption of data (JWT assertions, payloads) shared with external parties (SP, IdP).
- Encryption of sensitive runtime level configuration secrets/user data persisted in datastores and user stores.
- Encryption of sensitive deployment-level configuration data in configuration files.

From {{product_name}} 5.11.0 onwards, symmetric encryption is used to encrypt the internal sensitive runtime data above. The DEK used to encrypt these data is configured in the `deployment.toml` file and it is protected by a KEK. The secure vault is utilized as of now to protect this DEK. Here, only the rotation of the Data Encryption Key configured in the `deployment.toml` file is considered.

## DEK rotation frequency

In the case of a security compliance requirement, we can see that symmetric DEK rotation can be done in 2 years or less based on the volume of data present.

In a security breach scenario, we must rotate the DEK immediately and re-encrypt all the data to the new DEK.

## Key Rotation Approach

{{product_name}} has introduced support to use two encryption keys at once. This is to facilitate a smooth transition from the old key to the new key. The new key is used to encrypt the data and the old key is used to decrypt the data. This approach is known as double encryption.

{{product_name}} 7.1.0 onwards supports AES-128, AES-192 and AES-256 encryption algorithms. If you want to upgrade your encryption algorithm or update the encryption key, follow the steps below:

### Encryption Key Rotation

If the current configuration in the `deployment.toml` file is:

```toml
[encryption]
key = "03BAFEB27A8E871CAD83C5CD4E771DAB"
```

Update the `key` value with the new key, and set the current key as the `old_key` as shown below:

```toml
[encryption]
old_key = "03BAFEB27A8E871CAD83C5CD4E771DAB"
key = "D13E3B2EA4C42EB4A23FD110FACB72A596ECD84ECD5297A13065F1877393ECCF"
```

!!! note
    The `key` will be used to encrypt/decrypt new data while the `old_key` will be used to decrypt the existing data.
