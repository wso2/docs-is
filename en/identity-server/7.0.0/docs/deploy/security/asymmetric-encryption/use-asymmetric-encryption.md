# Using Asymmetric Encryption

Asymmetric encryption uses public and private keys to encrypt and decrypt data. While the **public key** of the key pair is shared with external parties, the **private key** is kept secret. When one of the key pairs is used to encrypt a message, the other key can be used to decrypt it. In a **keystore**, you can store both private and public keys, and in a **truststore** you can store only public keys.

<!--WSO2 Identity Server uses asymmetric encryption by default for the authentication and protection of data.-->

The following topics explain more about keystores and truststores and how they are used in the WSO2 Identity Server.

## About keystores and truststores

### Keystores

A keystore is a repository (protected by a password) that holds the keys and certificates of a trust chain. There may be multiple trust chains (i.e., multiple keys with corresponding certificates) in one keystore. These artifacts are used for security purposes such as protecting sensitive information and establishing trust between your server and outside parties that connect to the server.
The usage of keys and certificates contained in a keystore are explained below.

- **Keys:** According to public-key cryptography, the concept of a key pair (public key and the corresponding private key) is used for protecting sensitive information and for authenticating the identity of external parties that communicate with your server. For example, the information that is encrypted in your server using the public key can only be decrypted using the corresponding private key.
Therefore, if any party wants to decrypt this encrypted data, they should have the corresponding private key, which is usually kept as a secret (not publicly shared).

- **Digital certificate:** When there is a key pair, it is also necessary to have a digital certificate to verify the identity of the keys. Typically, the public key of a key pair is embedded in this digital certificate, which also contains additional information such as the owner, validity, etc. of the keys.
    For example, if an external party wants to verify the integrity of data or validate the identity of the signer (by validating the digital signature), it is necessary for them to have the digital certificate of the signer.

- **Trusted certificates and certificate signing authorities:** To establish trust, the digital certificate containing the public key should be signed by a trusted certificate signing authority (CA). You can generate self-signed certificates for the public key (thereby creating your own certifying authority), or you can get the certificates signed by the digital certificate of an external CA.
    When the certificate is signed by a reputed CA, all the parties that trust this CA will also trust the certificates signed by them. To establish maximum trust, it is important to have a root CA directly sign your public key certificate, or else, you can have an intermediate CA certificate (which is already signed by a root CA) sign your certificate.
    In the latter case, there can be a chain of CAs involved in signing your public key certificate. However, note that both types of public key certificates (self-signed or CA-signed) can be effectively used depending on the sensitivity of the information that is protected by the keys.

In summary, each trust chain entry in a keystore contains the following:

- A private key protected by a password
- A digital certificate in which the public key (corresponding to the private key) is embedded
- Additionally, if this public key certificate is not self-signed but signed by a Certificate Signing Authority (CA), an additional set of certificates (of the CAs involved in the signing process) will also be included. This may be just one additional certificate if the immediate CA certificate that was used to sign the public key certificate is of a Root CA.
    If the immediate certificate is not of a root CA, all the certificates of the intermediate CAs should also be included in the keystore.

### Truststores

The usage of a truststore in WSO2 Identity Server aligns with this concept of trust explained above. A truststore is just another repository that is protected by a password (similar to a keystore), which stores digital certificates. These certificates can be either of the following:

- Certificates of trusted third parties with which a software system intends to communicate directly.

- Certificates of reputed certificate signing authorities (CA) that can be used to validate the identity of untrusted third parties that are being contacted. For example, consider a scenario where the exact certificate of the third party that the WSO2 Identity Server is attempting to contact is not in the truststore. In this scenario, if the third party has a CA-signed certificate and one of the certificates of its trust chain is already included in the WSO2 Identity Server's truststore, the trust is automatically granted and a successful SSL connection is established between the WSO2 server and the third party.


## Keystore and truststore in WSO2 Identity Server

### Default keystore and truststore

WSO2 Identity Server is by default shipped with a keystore file and truststore file (stored in the `<IS_HOME>/repository/resources/security/` directory).

- `wso2carbon.jks`: This is the default keystore that contains a private key and the self-signed public key certificate.
- `client-truststore.jks`: This is the default truststore, which contains certificates of reputed CAs that can validate the identity of third-party systems. This truststore also contains the self-signed certificate of the default `wso2carbon.jks` keystore.

### Keystore usage

In WSO2 Identity Server, asymmetric encryption is used by default for the following purposes: 

- Authenticating the communication over Secure Sockets Layer (SSL)/Transport Layer Security (TLS) protocols.
- Encrypting sensitive data such as plain-text passwords found in both product-level and product feature-level configurations/configuration files using [cipher tool]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool).
- Encrypting and signing SOAP messages using WS-Security.

!!! tip
    The default keystore that is shipped with WSO2 Identity Server (`wso2carbon.jks`) is by default configured for all of the above purposes. However, in a production environment, it is advised to set up several different keystores with separate trust chains for the above use cases.

### Recommendations for setting up keystores

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

- If you already have the required keystores, you can generate CA-signed certificates and import them into the keystores. It is not recommended to create new keystores for the purpose of replacing the certificates in the keystore. See [Add CA-signed certificates]({{base_path}}/deploy/security/asymmetric-encryption/create-new-keystores#add-ca-signed-certificates-to-keystores) to keystores for instructions.

!!! info "Related topics"
    -   [Deploy: Create New Keystores]({{base_path}}/deploy/security/asymmetric-encryption/create-new-keystores)
    -   [Deploy: Configure Keystores]({{base_path}}/deploy/security/asymmetric-encryption/configure-keystores-in-wso2-products)
