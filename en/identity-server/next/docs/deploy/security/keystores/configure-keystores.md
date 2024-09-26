# Configure Keystores

!!! info "Before you begin"

    1. Make sure to go through the [recommendations for setting up keystores]({{base_path}}/deploy/security/asymmetric-encryption/use-asymmetric-encryption#recommendations-for-setting-up-keystores) to understand the various keystores you will need.

    2. If you have not already created the keystores required for your system, see [creating new keystores]({{base_path}}/deploy/security/asymmetric-encryption/create-new-keystores).


## Configure default keystore and truststore

WSO2 Identity Server provides default keystore and truststore files:

- `wso2carbon.p12`: The default keystore that includes a private key and a self-signed certificate.
- `client-truststore.p12`: The default truststore containing CA certificates and the self-signed certificate from wso2carbon.jks.

{% include "../../../../../../includes/guides/encryption/configure-keystores.md" %}

## Add new keys to an existing keystore

### Add an asymmetric key pair to an existing keystore

1. Locate the [default keystore](#configure-default-keystore-and-truststore) or other existing keystore in a command prompt.

2. Execute the following command to add a new keypair to keystore.

    === "Format"

        ```bash
        keytool -genkey -alias <PUBLIC_CERTIFICATE_ALIAS> -keyalg RSA -keysize 2048 -keystore <KEYSTORE_NAME> -dname "CN=<<Common Name>>,OU=<<Organization Unit>>,O=<<Organization>>,L=<<Locality>>,S=<<StateofProvice Name>>,C=<<Country Name>>"-storepass <KEYSTORE_PASSWORD> -keypass <PRIVATE_KEY_PASSWORD>
        ```

    === "Sample keytool command"

        ``` bash
        keytool -genkey -alias newkey -keyalg RSA -keysize 2048 -keystore wso2carbon.jks -dname "CN=localhost, OU=IT,O={{base_path}},L=SL,S=WS,C=LK" -storepass wso2carbon -keypass wso2carbon
        ```

    !!! tip  
        If you are planning to delete the newly added keys in the future, it is recommended to maintain separate keystores for internal and external encryption purposes.

This newly added key can be used for different purposes.

!!! abstract ""
    **Example**

    Follow the instructions given below to set the newly added key as the primary encrypting and signing key:

    1. Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.

    2. Update the `alias` parameter under the `[keystore.tls]` element with the new keystore `alias`.
            
        ```toml
        [keystore.tls]
        alias= "newKey"
        ```

### Add a symmetric secret to a PKCS12 keystore

To create a PKCS12 keystore with an AES key or add an existing key to the keystore, use the following command. If the keystore is not available, new PKCS12 keystore will be created.

=== "Format"

    ``` bash
    keytool -genseckey -alias <SECRET_ALIAS> -keyalg AES -keysize 256 -keystore <KEYSTORE_NAME> -storetype PKCS12 -storepass <KEYSTORE_PASSWORD> -keypass <KEYSTORE_PASSWORD>
    ```

=== "Sample keytool command"

    ``` bash
    keytool -genseckey -alias secretkey -keyalg AES -keysize 256 -keystore keystore.p12 -storetype PKCS12 -storepass password -keypass password
    ```

!!! abstract ""
    **Example**

    Follow the instructions given below to set the newly added key for symmetric encryption using cipher tool:

    1. Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.

    2. Update the `alias` parameter under the `[keystore.tls]` element with the new keystore `alias`.
            
        ```toml
        [keystore.internal]
        file_name = "keystore.p12"
        password = "password"
        key_password = "password"
        type = "PKCS12"
        alias= "secretkey"
        ```

{% include "../../../../../../includes/guides/encryption/view-jwks-keys.md" %}
