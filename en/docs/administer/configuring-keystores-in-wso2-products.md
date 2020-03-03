# Configuring Keystores

After you have [created a new keystore and updated the `client-truststore.jks` file](../../administer/creating-new-keystores), you must update a few configuration files in order to make the keystores work. Note that keystores are used for multiple functions in WSO2 Identity Server, which includes authenticating communication over SSL/TLS, encrypting pass words and other confidential information in configuration files etc. Therefore, you must update the specific configuration files with the updated keystore information. For example, you may have separate keystores for the purpose of encrypting
passwords in configuration files, and for authenticating communication over SSL/TLS.

The `wso2carbon.jks` keystore file, which is shipped with WSO2 Identity Server, is used as the default keystore for all functions. However, in a production environment, it is recommended to create new keystores with new keys and certificates.
    
!!! tip "Before you begin" 

    1.  Make sure to go through the [recommendations for setting up keystores](../../administer/using-asymmetric-encryption#recommendations-for-setting-up-keystores) to understand the various keystores you will need.

    2.  If you have not already created the keystores required for your system, see [creating new keystores](../../administer/creating-new-keystores).

## Configuring the primary keystore

!!! info

    The WSO2 Identity Server keystore is located at `<IS_HOME>/repository/resources/security/wso2carbon.jks` while the default trust-store is at `<IS_HOME>/repository/resources/security/client-truststore.jks`. This can be configured by specifying it in the `deployment.toml` file that is stored in the `<IS_HOME>/repository/conf/` directory. This keystore is used for the following functions in WSO2 Identity Server by default.

-   **Encrypting/decrypting** passwords and other confidential information, which are maintained in various configuration files as well as internal data stores. Note that you also have the option of
    [separating the keystore for encrypting information in internal data stores](#configuring-a-separate-keystore-for-encrypting-data-in-internal-data-stores).
-   **Signing messages** when WSO2 Identity Server communicates with external parties (such SAML, OIDC id_token signing). 

## Configuring a separate keystore for encrypting data in internal data stores

!!! info 
    This is available as part of the newly introduced Crypto Service. It is an extensible framework that facilitates the cryptography needs of WSO2 Identity Server.

Currently, the primary keystore configured in `deployment.toml` is used for internal data encryption (encrypting data in internal data stores and configuration files) as well as for signing messages that are communicated with external parties. However, it is sometimes a common requirement to have separate keystores for communicating messages with external parties (such SAML, OIDC id_token signing) and for encrypting information in internal data stores. This is because, for the first scenario of signing messages, the keystore certificates need to be frequently renewed. However, for encrypting information in internal data stores, the keystore certificates should not be changed frequently because the data that is already encrypted will become unusable every time the certificate changes.

This feature allows you to create a separate keystore for encrypting data in internal data stores. Follow the instructions given below.

!!! warning
    Using a totally new keystore for internal data encryption in an existing deployment will make already encrypted data unusable. In such cases, an appropriate data migration effort is needed.
    

1.  Configure the new keystore by adding the following configuration block inside the `keystore.internal` tag of the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.

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

## Configuring a secondary keystore for SSL connections

The default keystore configurations should be updated with the keystore used for certifying SSL connections to WSO2 Identity Server. Given below is the default configuration used internally, which points to the default keystore in your product. 

If you need to configure a different keystore for SSL, you may change the values accordingly.
    
```toml 
[transport.https.sslHostConfig.certificate.properties]
certificateKeystoreFile = "${carbon.home}/repository/resources/security/$ref{keystore.tls.file_name}",
certificateKeystorePassword = "$ref{keystore.tls.password}"",
certificateKeystoreType = "$ref{keystore.tls.type}",
certificateKeyAlias = "$ref{keystore.tls.alias}",
certificateKeyPassword = "$ref{keystore.tls.key_password}"
```
  
The internally used following trust-store configurations can be changed to define a custom trus-store for SSL validations.

```toml
[transport.https.sslHostConfig.properties]
truststoreFile="${carbon.home}/repository/resources/security/$ref{truststore.file_name}"
truststorePassword = "$ref{truststore.password}"
truststoreType = "$ref{truststore.type}"
``` 
