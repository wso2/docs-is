# Configure Keystores

After you have [created a new keystore]({{base_path}}/deploy/security/asymmetric-encryption/create-new-keystores) and updated the `client-truststore.jks` file, you need to update a few configuration files in order to make the keystores work.
Note that keystores are used for multiple functions in WSO2 Identity Server, which includes authenticating communication over SSL/TLS, encrypting passwords, and other confidential information in configuration files, etc. Therefore, you must update the specific configuration files with the updated keystore information.
For example, you may have separate keystores for encrypting passwords in configuration files, and for authenticating communication over SSL/TLS.

The `wso2carbon.jks` keystore file, which is shipped with WSO2 Identity Server, is used as the default keystore for all functions. However, in a production environment, it is recommended to create new keystores with new keys and certificates.

!!! info "Before you begin"

    1. Make sure to go through the [recommendations for setting up keystores]({{base_path}}/deploy/security/asymmetric-encryption/use-asymmetric-encryption#recommendations-for-setting-up-keystores) to understand the various keystores you will need.

    2. If you have not already created the keystores required for your system, see [creating new keystores]({{base_path}}/deploy/security/asymmetric-encryption/create-new-keystores).


## Configure the primary keystore

!!! info
    The WSO2 Identity Server keystore is located at `<IS_HOME>/repository/resources/security/wso2carbon.jks` while the default trust-store is at `<IS_HOME>/repository/resources/security/client-truststore.jks`. This can be configured by specifying it in the `deployment.toml` file that is stored in the `<IS_HOME>/repository/conf/` directory. This keystore is used for the following functions in WSO2 Identity Server by default.

- **Encrypting/decrypting** passwords and other confidential information, which are maintained in various configuration files as well as internal datastores. Note that you also have the option of [separating the keystore for encrypting information in internal datastores](#configure-a-separate-keystore-for-encrypting-data-in-internal-data-stores).

- **Signing messages** when WSO2 Identity Server communicates with external parties (such SAML, OIDC id_token signing).

## Configure a separate keystore for encrypting data in internal datastores

!!! info
    This is available as part of the Crypto Service. It is an extensible framework that facilitates the cryptography needs of WSO2 Identity Server.

Currently, the primary keystore configured in `deployment.toml` is used for internal data encryption (encrypting data in internal datastores and configuration files) as well as for signing messages that are communicated with external parties.
However, it is sometimes a common requirement to have separate keystores for communicating messages with external parties (such as SAML, OIDC id_token signing) and for encrypting information in internal datastores. This is because, for the first scenario of signing messages, the keystore certificates need to be frequently renewed.
However, for encrypting information in internal datastores, the keystore certificates should not be changed frequently because the data that is already encrypted will become unusable every time the certificate changes.

This feature allows you to create a separate keystore for encrypting data in internal datastores. Follow the instructions given below.

!!! warning
    Using a totally new keystore for internal data encryption in an existing deployment will make already encrypted data unusable. In such cases, an appropriate data migration effort is needed.


To configure the new keystore add the following configuration block to the `keystore.internal` tag of the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.

!!! note
    The values of the properties such as passwords must be changed based on the keystore.

``` toml
[keystore.internal]
file_name = "internal.jks"
type = "JKS"
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
