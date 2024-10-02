These files are originally located at `<IS_HOME>/repository/resources/security`. This can be configured by specifying it in the `deployment.toml` file.

=== "JKS"

    For the primary keystore:
    ``` toml
    [keystore.primary]
    file_name = "<keystore file name>.jks"
    password = "<password>"
    key_password = "<password>"
    type = "JKS"
    alias = "<alias of the public certificate>"
    ```

    For the truststore:
    ``` toml
    [truststore]
    file_name = "truststore file name>.jks"
    password = "<password>"
    type = "JKS"
    ```

=== "PKCS12"

    For the primary keystore:
    ``` toml
    [keystore.primary]
    file_name = "<keystore file name>.p12"
    password = "<password>"
    key_password = "<password>"
    type = "PKCS12"
    alias = "<alias of the public certificate>"
    ```

    For the truststore:
    ``` toml
    [truststore]
    file_name = "<truststore file name>.p12"
    password = "<password>"
    type = "PKCS12"
    ```

    To generate keystores for newly created tenants in PKCS12 format:
    ``` toml
    [keystore.tenant]
    type = "PKCS12"
    ```

## Using multiple keystores for specific tasks

Currently, our primary keystore handles both internal data encryption and external message signing. However, it's often necessary to have separate keystores for these tasks. For external communications (e.g., SAML, OIDC id_token signing), keystore certificates need frequent renewal. In contrast, for internal data encryption, frequent certificate changes can render encrypted data unusable.

In production environments, it is recommended to use distinct keystores for each task, with separate trust chains for enhanced security:

- **Internal Keystore**: Used for encrypting and decrypting internal data (if [asymmetric encryption]({{base_path}}/deploy/security/asymmetric-encryption) is enabled) and for encrypting plaintext passwords in configuration files using the [cipher tool]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool).
- **TLS Keystore**: Used for SSL connections to secure network communication via HTTPS. This keystore typically contains certificates required for establishing SSL/TLS connections.
- **Primary Keystore**: Used for signing messages and other tasks, serving as the fallback keystore for both internal and external use cases unless specific keystores (like internal or SAML signing keystores) are defined.

!!! note 
    All keystores should be placed in the `<IS_HOME>/repository/resources/security` location.

### Configure internal keystore

!!! warning
    Using a totally new keystore for internal data encryption in an existing deployment will make already encrypted data unusable. In such cases, an appropriate data migration effort is needed.


To configure the new internal keystore, add the following configuration block to the `keystore.internal` tag of the `deployment.toml` file.

=== "JKS"

    ``` toml
    [keystore.internal]
    file_name = "<keystore file name>.jks"
    password = "<password>"
    key_password = "<password>"
    type = "JKS"
    alias = "<alias of the public certificate>"
    ```

=== "PKCS12"

    ``` toml
    [keystore.internal]
    file_name = "<keystore file name>.p12"
    password = "<password>"
    key_password = "<password>"
    type = "PKCS12"
    alias = "<alias of the public certificate>"
    ```

### Configure TLS keystore

The TLS keystore is used to manage SSL/TLS connections to WSO2 Identity Server. Given below is the default configuration used internally, which points to the default keystore in your product.

If you need to configure a different keystore for SSL, you may change the values accordingly.

```toml 
[transport.https.sslHostConfig.certificate.properties]
certificateKeystoreFile = "${carbon.home}/repository/resources/security/$ref{keystore.tls.file_name}"
certificateKeystorePassword = "$ref{keystore.tls.password}"
certificateKeystoreType = "$ref{keystore.tls.type}"
certificateKeyAlias = "$ref{keystore.tls.alias}"
certificateKeyPassword = "$ref{keystore.tls.key_password}"
```
  
The internally used trust-store configurations given below can be changed to define a custom truststore for SSL validations.

```toml
[transport.https.sslHostConfig.properties]
truststoreFile="${carbon.home}/repository/resources/security/$ref{truststore.file_name}"
truststorePassword = "$ref{truststore.password}"
truststoreType = "$ref{truststore.type}"
```
