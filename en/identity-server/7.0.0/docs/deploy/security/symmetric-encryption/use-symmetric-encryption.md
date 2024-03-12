# Configurations Related to Symmetric Key Encryption

This section explains the configurations related to [symmetric key encryption]({{base_path}}/deploy/security/symmetric-encryption). This version of WSO2 Identity Server uses symmetric encryption by default. You can switch to [asymmetric key encryption]({{base_path}}/deploy/security/asymmetric-encryption/use-asymmetric-encryption) if required.

## Algorithm used

`AES/GCM/NoPadding` is used as the symmetric key encryption algorithm.

GCM is a stream cipher. Hence, there is a performance advantage of using it due to the parallel encryption of each block. There is no need to use a padding mechanism in GCM mode. In GCM mode, the initialization vector (IV) should be a unique value for each encryption request. The corresponding IVs of each unique value should be kept track of in order to decrypt this internal data. The keysize supported is AES-128. 

The following configuration is enabled by default in the `<IS_HOME>/repository/conf/carbon.properties` file for the algorithm to be used.

```xml
org.wso2.CipherTransformation=AES/GCM/NoPadding
```

## Internal crypto provider

The `org.wso2.carbon.crypto.provider.SymmetricKeyInternalCryptoProvider` provider is used as the internal crypto provider. When configuring the `SymmetricKeyInternalCryptoProvider`, the secret key value needs to be provided in the configuration as well. 

The following configuration is enabled by default in the `<IS_HOME>/repository/resources/conf/default.json` file to use the above-mentioned internal crypto provider.

```xml
"encryption.internal_crypto_provider": "org.wso2.carbon.crypto.provider.SymmetricKeyInternalCryptoProvider",
"encryption.key": "03BAFEB27A8E871CAD83C5CD4E771DAB"
```

The corresponding xml configuration can be found in the `<IS_HOME>/repository/conf/carbon.xml` file.

```xml
<InternalCryptoProviderClassName>org.wso2.carbon.crypto.provider.SymmetricKeyInternalCryptoProvider</InternalCryptoProviderClassName>
<Secret>03BAFEB27A8E871CAD83C5CD4E771DAB</Secret>
```

The `encryption.key` or `<Secret>` value above is a sample value. Generate a unique secret key of 128 bytes using a tool like OpenSSL as shown below.

```xml
openssl rand -hex 16
```

Once a secure secret key is generated, configure it using the following configuration in the `<IS_HOME>/repository/conf/deployment.toml` file.

```toml
[encryption]
key = "3cc0481b70794667b5bee7e2beed2de4"
```

## Userstore password encryption

In the previous versions, there was a configuration to enable the preferred keystore (internal or primary) to encrypt secondary userstore passwords.
However, with symmetric key encryption, keystore references are not required. So this configuration has a blank as its value.

```toml
"keystore.userstore_password_encryption": "",
```

## Encrypting symmetric encryption key with cipher tool

It is advised to encrypt the symmetric encryption key with a cipher tool as mentioned [here]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool).
