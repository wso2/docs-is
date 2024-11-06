# Symmetric Encryption

Symmetric encryption uses a single key to encrypt and decrypt information. {{product_name}} uses symmetric encryption by default.

!!! note
    If required, you may switch to [asymmetric key encryption]({{base_path}}/deploy/security/asymmetric-encryption/).

## Why symmetric key encryption?

From {{product_name}} version 7.0.0 onwards, symmetric key encryption is used as the default encryption mechanism due to the following reasons:

- **Ability to easily change key stores** - In earlier versions, internal data was encrypted using asymmetric key encryption. This means that whenever the certificates expire, or when the keystore is changed, all encrypted data should be migrated. With the shift to symmetric encryption, this overhead is now removed. The secret key involved in symmetric key encryption is encrypted using asymmetric key encryption. Therefore, the secret key needs to be re-encrypted only when the keystore changes.

- **Industry-wide usage** - Symmetric key encryption is used as an accepted industry-wide mechanism for encrypting internal sensitive data. This includes both on-premise and cloud platforms. 

- **Post-Quantum Security** - Quantum computers have the potential to break widely-used asymmetric encryption algorithms such as RSA and ECC by efficiently solving the underlying mathematical problems. Symmetric key encryption, on the other hand, is more resistant to quantum attacks. 

!!! info
    For more information on symmetric key encryption properties, see [Configure Symmetric Key Encryption]({{base_path}}/deploy/security/symmetric-encryption/use-symmetric-encryption).

## How is it used?

{{product_name}} uses the `AES/GCM/NoPadding` algorithm for symmetric key encryption. GCM is a stream cipher and therefore, enables simultaneous encryption of multiple blocks, resulting in faster data encryption.

{% if is_version == "7.0.0" %}

The supported key size is AES-128. 

{% else %}

The supported key sizes are AES-128, AES-192, and AES-256.

{% endif %}

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

## Generate a secret key

For enhanced security, it is recommended to generate your own secret key for symmetric key encryption in {{product_name}}.

!!! warning
    All configuration changes should be applied before starting {{product_name}} for the first time. Otherwise, a [key rotation]({{base_path}}/deploy/security/symmetric-encryption/blue-green-data-encryption-keyrotation) will be required.

To do so,

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

    !!! note

        It is advised to encrypt the symmetric encryption key with a cipher tool as mentioned [here]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool).
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

!!! note "Important"

    It is highly recommended to encrypt the secret key using the [cipher tool]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool/).

=======
# Keystores and Truststores

## Keystores

A keystore is a secure repository for storing private keys and their associated public key certificates. These elements are used to protect sensitive information and establish secure communication channels. Each keystore entry consists of:

- **Private Key:** Used for decrypting data encrypted with the corresponding public key. It should be kept confidential.
- **Digital Certificate** Embeds the public key and verifies the identity of the key owner. It includes details such as the owner’s identity and the certificate’s validity.
- **Certificate Chain:** Includes the certificates of the Certificate Authorities (CAs) that signed the public key certificate. This may include root CA certificates or intermediate CA certificates.

## Truststores

A truststore is a repository for storing trusted CA certificates. It validates the identity of external parties by checking the CA certificates against those stored in the truststore. The truststore contains:

- **Trusted CA Certificates:** Certificates from CAs that are trusted for verifying the identity of third-party systems.
- **Trusted Certificates:** Certificates of specific third parties that the system intends to communicate with directly.

## Keystore formats

With IS 7.0.0 onwards, you can configure to utilize keystore and truststore in both JKS and PKCS12 formats.


### JKS

JKS is a proprietary format used mainly in Java applications for storing keys and certificates. It is easy to use within Java environments but has limited interoperability with non-Java systems and supports fewer cryptographic algorithms. 

### PKCS12

PKCS12 is a standard format supported across various platforms, offering high interoperability and advanced cryptographic support. It can store both private and public keys along with certificates in a single file. 

!!! tip

    To convert an existing JKS keystore to PKCS12, execute the following command:

    === "Format"

        ``` bash
        keytool -importkeystore -srckeystore <jks_keystore_name>.jks -destkeystore <pkcs12_keystore_name>.p12 -srcstoretype JKS -deststoretype PKCS12 -srcstorepass <keystore_password> -deststorepass <keystore_password>
        ```

    === "Sample keytool command"

        ``` bash
        keytool -importkeystore -srckeystore wso2carbon.jks -destkeystore wso2carbon.p12 -srcstoretype JKS -deststoretype PKCS12 -srcstorepass wso2carbon -deststorepass wso2carbon
        ```


## Recommendations for setting up keystores

Follow the recommendations given below when you set up your keystores.

- Maintain one primary keystore for encrypting sensitive internal data such as admin passwords and any other sensitive information found at both product-level and product feature-level configurations/configuration files.

    !!! note
        The primary keystore will also be used for signing messages when the product communicates with external parties (such as SAML, OIDC id_token signing).

    !!! tip
        You can have separate keystores for encrypting sensitive information for internal data encryption as a recommended practice. See [Configuring Keystores in WSO2 Identity Server]({{base_path}}/deploy/security/asymmetric-encryption/configure-keystores-in-wso2-products) for details.

- Maintain another secondary keystore, containing the server’s public key certificate for authenticating communication over SSL/TLS (for both Tomcat and Axis2 level HTTP connections).

- All instances of WSO2 Identity Server must use the same keystore for SSL. 

- It is recommended to use a CA-signed keystore for SSL communication. However, this is not mandatory. Even a self-signed certificate may suffice if it can be trusted by the clients.

- The keystore used for SSL must contain the same password for the keystore and private key due to a Tomcat limitation.

- The primary keystore used for admin passwords and other data encryption requirements can be a self-signed one. There is no value added by using a CA-signed keystore for this purpose as it is not used for any external communication.

- The primary keystore's public key certificate must have the **Data Encipherment** key usage to allow direct encipherment of raw data using its public key. This key usage is already included in the self-signed certificate that is included in the default `wso2carbon.jks` keystore. If the **Data Encipherment** key usage is not included in your public key certificate, the following error can occur when you attempt data encryption.

    !!! error
        ``` java
        Exception in thread "main" org.wso2.ciphertool.CipherToolException: Error initializing Cipher at org.wso2.ciphertool.CipherTool.handleException(CipherTool.java:861) at org.wso2.ciphertool.CipherTool.initCipher(CipherTool.java:202) at org.wso2.ciphertool.CipherTool.main(CipherTool.java:80) Caused by: java.security.InvalidKeyException: Wrong key usage at javax.crypto.Cipher.init(DashoA13..) at javax.crypto.Cipher.init(DashoA13..) at org.wso2.ciphertool.CipherTool.initCipher(CipherTool.java:200)... 1 more
        ```

- Optionally, you can set up separate keystores for message-level data encryption in WS-Security.

- If you already have the required keystores, you can generate CA-signed certificates and import them into the keystores. It is not recommended to create new keystores for the purpose of replacing the certificates in the keystore. See [Add CA-signed certificates]({{base_path}}/deploy/security/asymmetric-encryption/manage-ca-signed-certificates-in-a-keystore#add-ca-signed-certificates-to-keystores) to keystores for instructions.

!!! info "Related topics"
    -   [Deploy: Create New Keystores]({{base_path}}/deploy/security/asymmetric-encryption/create-new-keystores)
    -   [Deploy: Configure Keystores]({{base_path}}/deploy/security/asymmetric-encryption/configure-keystores-in-wso2-products)
