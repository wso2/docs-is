# Configure Keystores

!!! info "Before you begin"

    1. Make sure to go through the [recommendations for setting up keystores]({{base_path}}/deploy/security/asymmetric-encryption/use-asymmetric-encryption#recommendations-for-setting-up-keystores) to understand the various keystores you will need.

    2. If you have not already created the keystores required for your system, see [creating new keystores]({{base_path}}/deploy/security/asymmetric-encryption/create-new-keystores).


## Configure default keystore and truststore

WSO2 Identity Server provides default keystore and truststore files:

- `wso2carbon.jks`: The default keystore that includes a private key and a self-signed certificate.
- `client-truststore.jks`: The default truststore containing CA certificates and the self-signed certificate from wso2carbon.jks.

These files are originally located at `<IS_HOME>/repository/resources/security`. This can be configured by specifying it in the `deployment.toml` file.

=== "JKS"

    For the primary keystore:
    ``` toml
    [keystore.primary]
    file_name = "<keystore location>"
    password = "<password>"
    key_password = "<password>"
    type = "JKS"
    alias = "<alias of the public certificate>"
    ```

    For the truststore:
    ``` toml
    [truststore]
    file_name = "truststore location>"
    password = "<password>"
    type = "JKS"
    ```

=== "PKCS12"

    For the primary keystore:
    ``` toml
    [keystore.primary]
    file_name = "<keystore location>"
    password = "<password>"
    key_password = "<password>"
    type = "PKCS12"
    alias = "<alias of the public certificate>"
    ```

    For the truststore:
    ``` toml
    [truststore]
    file_name = "truststore location>"
    password = "<password>"
    type = "PKCS12"
    ```

    To generate keystores for newly created tenants in PKCS12 format:
    ``` toml
    [keystore.tenant]
    type = "PKCS12"
    ```

### Keystore usage

- **Encrypting/decrypting** passwords and other confidential information, which are maintained in various configuration files as well as internal datastores.

- **Signing messages** when WSO2 Identity Server communicates with external parties (such SAML, OIDC id_token signing).

The default keystore that is shipped with WSO2 Identity Server (`wso2carbon.jks`) is preconfigured for general use. However, for production environments, it's recommended to establish multiple keystores with separate trust chains for specific use cases.

## Configure a separate keystore for encrypting data in internal datastores

Currently, our primary keystore handles both internal data encryption and external message signing. However, it's often necessary to have separate keystores for these tasks. For external communications (e.g., SAML, OIDC id_token signing), keystore certificates need frequent renewal. In contrast, for internal data encryption, frequent certificate changes can render encrypted data unusable.

!!! warning
    Using a totally new keystore for internal data encryption in an existing deployment will make already encrypted data unusable. In such cases, an appropriate data migration effort is needed.


This feature allows the creation of a separate keystore for encrypting internal datastore data. To configure the new keystore add the following configuration block to the `keystore.internal` tag of the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.

=== "JKS"

    ``` toml
    [keystore.internal]
    file_name = "internal.jks"
    type = "JKS"
    password = "wso2carbon"
    alias = "wso2carbon"
    key_password = "wso2carbon"
    ```

=== "PKCS12"

    ``` toml
    [keystore.internal]
    file_name = "internal.p12"
    type = "PKCS12"
    password = "wso2carbon"
    alias = "wso2carbon"
    key_password = "wso2carbon"
    ```

## Configure a secondary keystore for SSL connections

The default keystore configurations should be updated with the keystore used for certifying SSL connections to WSO2 Identity Server. Given below is the default configuration used internally, which points to the default keystore in your product.

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
