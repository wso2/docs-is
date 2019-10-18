# Configuring Keystores in WSO2 Products

After you have [created a new keystore and updated the
`          client-truststore.jks         `
file](../../administer/creating-new-keystores), you must update a few configuration
files in order to make the keystores work. Note that keystores are used
for multiple functions in WSO2 products, which includes authenticating
communication over SSL/TLS, encrypting pass
words and other confidential
information in configuration files etc. Therefore, you must update the
specific configuration files with the updated keystore information. For
example, you may have separate keystores for the purpose of encrypting
passwords in configuration files, and for authenticating communication
over SSL/TLS.

The `         wso2carbon.jks        ` keystore file, which is shipped
with all WSO2 products, is used as the default keystore for all
functions. However, in a production environment, it is recommended
to create new keystores with new keys and certificates.
    
!!! note 
    Please note that in WSO2 IoT Server and WSO2 Enterprise Integrator the `    <IS_HOME>/repository/conf   ` directory is in the following location: `  <IS_HOME>/conf  `

!!! tip
    If you want an easy way to locate all the configuration files that have references to keystores, you can use the grep command as follows:

    1.  Open a command prompt and navigate to the <IS_HOME>/repository/conf/ directory where your product stores all configuration files.

    2.  Execute the following command: grep -nr ".jks" .

    The configuration files and the keystore files referred to in each file are listed out. See an example of this below.

    ``` text
    ./axis2/axis2.xml:260:                <Location>repository/resources/security/wso2carbon.jks</Location>
    ./axis2/axis2.xml:431:                <Location>repository/resources/security/wso2carbon.jks</Location>
    ./carbon.xml:316:            <Location>${carbon.home}/repository/resources/security/wso2carbon.jks</Location>
    ./carbon.xml:332:            <Location>${carbon.home}/repository/resources/security/wso2carbon.jks</Location>
    ./identity.xml:180:             <Location>${carbon.home}/repository/resources/security/wso2carbon.jks</Location>
    ./security/secret-conf.properties:21:#keystore.identity.location=repository/resources/security/wso2carbon.jks
    ```

### Before you begin

-   Be sure to go through the [recommendations for setting
    up keystores in WSO2
    products](../../administer/using-asymmetric-encryption#recommendations-for-setting-up-keystores-in-wso2-products)
    to understand the various keystores you will need.
-   If you haven't already created the keystores required for your
    system, see the instructions for [creating new
    keystores](../../administer/creating-new-keystores).

### Configuring the primary keystore

The primary keystore of WSO2 products are located at `[HOME]/resources/security/wso2carbon.jks`, 
while the default trust-store is at `[HOME]/repository/resources/security/client-truststore.jks`.
This can be configured by specifying it in the `         deployment.toml        ` file (stored in the
`         <IS_HOME>/repository/conf/        ` directory).
This keystore is used for the following functions in WSO2 products by
default.

-   **Encrypting/decrypting** passwords and other confidential
    information, which are maintained in various configuration files as
    well as internal data stores. Note that you also have the option of
    [separating the keystore for encrypting information in internal data
    stores](#configuring-a-separate-keystore-for-encrypting-data-in-internal-data-stores)
    .
-   **Signing messages** when the WSO2 product communicates with
    external parties (such SAML, OIDC id\_token signing).

### Configuring a separate keystore for encrypting data in internal data stores

!!! info 
    This is available as part of the newly introduced Crypto Service. It is
    an extensible framework that facilitates the cryptography needs of WSO2
    products.

Currently, the primary keystore configured in deployment.toml is
used for internal data encryption (encrypting data in internal data
stores and configuration files) as well as for signing messages that are
communicated with external parties. However, it is sometimes a common
requirement to have separate keystores for communicating messages with
external parties (such SAML, OIDC id\_token signing) and for encrypting
information in internal data stores. This is because, for the first
scenario of signing messages, the keystore certificates need to be
frequently renewed. However, for encrypting information in internal data
stores, the keystore certificates should not be changed frequently
because the data that is already encrypted will become unusable every
time the certificate changes.

This feature allows you to create a separate keystore for encrypting
data in internal data stores. Follow the instructions given below.

!!! warning
    Using a totally new keystore for internal data encryption
    in an existing deployment will make already encrypted data unusable. In
    such cases, an appropriate data migration effort is needed.
    

1.  Configure the new keystore by adding the following configuration
    block inside the `           keystore.internal         ` tag in the
    `           <IS_HOME>/repository/conf/deployment.toml          `
    file.

    !!! note
        The values of the properties such as passwords must be
        changed based on the keystore.
    
    ``` toml
    [keystore.internal]
    file_name = "internal.jks"
    type = "JKS"
    password = "wso2carbon"
    alias = "wso2carbon"
    key_password = "wso2carbon"
    ```

### Configuring a secondary keystore (for SSL connections)

The default keystore configurations should be updated with the keystore used for certifying SSL connections
to Carbon servers. Given below is the default configuration used internally, which points to the default
keystore in your product. 
If you need to configure a different keystore for SSL, you may change the values accordingly.
    ```toml 
    [transport.https.sslHostConfig.certificate.properties]
    certificateKeystoreFile = "${carbon.home}/repository/resources/security/$ref{keystore.tls.file_name}",
    certificateKeystorePassword = "$ref{keystore.tls.password}"",
    certificateKeystoreType = "$ref{keystore.tls.type}",
    certificateKeyAlias = "$ref{keystore.tls.alias}",
    certificateKeyPassword = "$ref{keystore.tls.key_password}"
    ```
  
The internally used following trust-store configurations can be changed to define a custom trus-store for SSL 
validations.
    ```toml
    [transport.https.sslHostConfig.properties]
    truststoreFile="${carbon.home}/repository/resources/security/$ref{truststore.file_name}"
    truststorePassword = "$ref{truststore.password}"
    truststoreType = "$ref{truststore.type}"
    ```

In the [5.9.0 and later doc space](https://is.docs.wso2.com/en/5.9.0/administer/configuring-keystores-in-wso2-products/) need to add following with improvements

### Configuring a keystore for Java permissions

The [Java Security Manager](../../administer/enabling-java-security-manager) is used
for defining various security policies that prevent untrusted code from
manipulating your system. Enabling the Java Security Manager for WSO2
products will activate the Java permissions that are in the
`         <IS_HOME>/repository/conf/sec.policy        ` file.
Administrators can modify this file to change the Java security
permissions as required and grant various application-level permissions
to the signed and trusted code using Java.

If you are granting specific Java-level permissions to some signed code,
you should import the public key certificate of the signer as a trusted
certificate to one of your keystores. You must then update the
`         sec.policy        ` file with the keystore path and the alias
of the certificate as shown below.

``` java
keystore "file:${user.dir}/repository/resources/security/wso2carbon.jks", "JKS";
```

Following is the default keystore configuration in the sec.policy file,
which grants all Java-level permissions to the code signed by the
certificate that uses the “wso2carbon” alias.

``` java
grant signedBy "wso2carbon" {
  permission java.security.AllPermission;
};
```

### What's next?

Some WSO2 products will use keystore for more use cases than the ones
listed above. See the [documentation for your WSO2
product](https://docs.wso2.com/dashboard.action) for instructions.
