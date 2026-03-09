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

In production environments, it is recommended to use three distinct keystores with separate trust chains:

- **Primary keystore** (`[keystore.primary]`): Used for signing messages when communicating with external parties (SAML assertions, OIDC ID token signing). This keystore contains an RSA key pair. It serves as the fallback for both signing and encryption unless a specific keystore is explicitly defined.

- **Internal keystore** (`[keystore.internal]`): Used for encrypting sensitive internal data such as admin passwords and other sensitive information in configuration files (via the [Cipher Tool]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool)). It is recommended to use a **symmetric AES key** (PKCS12 format) for the internal keystore due to its resilience against post-quantum threats. This keystore does not need to be CA-signed as it is not used for external communication.

- **TLS keystore** (`[keystore.tls]`): Contains the server’s key pair and certificate for authenticating communication over SSL/TLS (HTTPS). It is recommended to use a CA-signed certificate for the TLS keystore.

Additional recommendations:

- All instances of WSO2 Identity Server in a cluster must use the same TLS keystore for SSL.

- The TLS keystore must use the same password for the keystore and private key due to a Tomcat limitation.

- Change the default truststore password from `wso2carbon` (which is publicly known) before configuring production deployments.

- Remove the default WSO2 self-signed certificate (alias: `wso2carbon`) from the truststore after importing your own certificates in production environments.

- If you already have existing keystores, generate CA-signed certificates and import them into those keystores rather than creating new ones. See [Add CA-signed certificates]({{base_path}}/deploy/security/keystores/manage-ca-signed-certificates-in-a-keystore/#add-ca-signed-certificates-to-keystores) for instructions.

- Optionally, you can set up separate keystores for message-level data encryption in WS-Security.

!!! note "Using asymmetric encryption for the internal keystore"
    If you choose to use [asymmetric encryption]({{base_path}}/deploy/security/asymmetric-encryption) for the internal keystore instead of symmetric encryption, the internal keystore’s public key certificate must have the **Data Encipherment** key usage. If not included, the following error occurs when attempting data encryption:

    !!! error
        ``` java
        Exception in thread "main" org.wso2.ciphertool.CipherToolException: Error initializing Cipher at org.wso2.ciphertool.CipherTool.handleException(CipherTool.java:861) at org.wso2.ciphertool.CipherTool.initCipher(CipherTool.java:202) at org.wso2.ciphertool.CipherTool.main(CipherTool.java:80) Caused by: java.security.InvalidKeyException: Wrong key usage at javax.crypto.Cipher.init(DashoA13..) at javax.crypto.Cipher.init(DashoA13..) at org.wso2.ciphertool.CipherTool.initCipher(CipherTool.java:200)... 1 more
        ```

## Next steps

Follow this workflow to set up keystores for your deployment:

1. **Decide which keystores you need** — Review the [Recommendations for setting up keystores](#recommendations-for-setting-up-keystores) above to determine if you need the primary, internal, and/or TLS keystores.

2. **Create keystores** — Use [Create New Keystores]({{base_path}}/deploy/security/keystores/create-new-keystores) to generate the keystores you need using keytool commands.

3. **Configure keystores** — Use [Configure Keystores]({{base_path}}/deploy/security/keystores/configure-keystores) to set up the keystores in your `deployment.toml` file.

4. **(Optional) Protocol-specific keystores** — If you need separate keystores for different authentication protocols (OAuth, SAML, etc.), see [Configure custom keystores for authentication protocols]({{base_path}}/deploy/security/keystores/configure-custom-keystores).

5. **(Optional) CA-signed certificates** — If you need to work with CA-signed certificates, see [Manage CA-Signed certificates in a keystore]({{base_path}}/deploy/security/keystores/manage-ca-signed-certificates-in-a-keystore).