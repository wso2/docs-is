# Configure Keystores

This page explains how to configure keystores in the `deployment.toml` file. Before you begin, ensure you have already created the keystores you need.

!!! info "Before you begin"

    1. Review the [recommendations for setting up keystores]({{base_path}}/deploy/security/keystores/#recommendations-for-setting-up-keystores) to understand which keystores you need (primary, internal, TLS).

    2. If you have not already created keystores, see [Create New Keystores]({{base_path}}/deploy/security/keystores/create-new-keystores).


## Configure default keystore and truststore

WSO2 Identity Server provides default keystore and truststore files:

- `wso2carbon.{{content.default_keystore_ext}}`: The default keystore that includes a private key and a self-signed certificate.
- `client-truststore.{{content.default_keystore_ext}}`: The default truststore containing Certificate Authority (CA) certificates and the self-signed certificate from wso2carbon.{{content.default_keystore_ext}}.

These files are originally located in the `<IS_HOME>/repository/resources/security` folder. The file settings can be configured by specifying them in the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder as follows.

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

## Use multiple keystores

In production environments, it is recommended to use distinct keystores for different purposes. See the [Recommendations for setting up keystores]({{base_path}}/deploy/security/keystores/#recommendations-for-setting-up-keystores) in the overview to understand the primary, internal, and TLS keystores.

!!! note
    All keystores should be placed in `<IS_HOME>/repository/resources/security`.

### Configure the internal keystore

!!! warning
    If [asymmetric encryption]({{base_path}}/deploy/security/asymmetric-encryption) is used, adding a new keystore for internal data encryption for an existing deployment will make already encrypted data unusable. In such cases, an appropriate data migration effort is needed.

!!! note
    Before configuring the internal keystore, you must first [create it]({{base_path}}/deploy/security/keystores/create-new-keystores/#create-the-internal-keystore).

To configure the internal keystore, add the following configuration block to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder.

=== "JKS"

    ``` toml
    [keystore.internal]
    file_name = "<internal-keystore-name>.jks"
    password = "<internal-keystore-password>"
    key_password = "<internal-keystore-password>"
    type = "JKS"
    alias = "<internal-key-alias>"
    ```

=== "PKCS12"

    ``` toml
    [keystore.internal]
    file_name = "<internal-keystore-name>.p12"
    password = "<internal-keystore-password>"
    key_password = "<internal-keystore-password>"
    type = "PKCS12"
    alias = "<internal-key-alias>"
    ```

### Configure TLS keystore

To configure a custom TLS keystore for SSL/TLS connections, update the following configuration:

=== "JKS"

    ```toml
    [keystore.tls]
    file_name = "tls.jks"
    type = "JKS"
    password = "<tls-keystore-password>"
    alias = "<tls-key-alias>"
    key_password = "<tls-keystore-password>"
    ```

=== "PKCS12"

    ```toml
    [keystore.tls]
    file_name = "tls.p12"
    type = "PKCS12"
    password = "<tls-keystore-password>"
    alias = "<tls-key-alias>"
    key_password = "<tls-keystore-password>"
    ```
  
The internally used trust-store configurations given below can be changed to define a custom truststore for SSL validations.

```toml
[transport.https.sslHostConfig.properties]
truststoreFile="${carbon.home}/repository/resources/security/$ref{truststore.file_name}"
truststorePassword = "$ref{truststore.password}"
truststoreType = "$ref{truststore.type}"
```

### Complete production keystore configuration

The following is a complete `deployment.toml` example for a production setup with all three keystores configured separately:

=== "JKS"

    ```toml
    # Primary keystore — used for token signing (OIDC, SAML)
    [keystore.primary]
    file_name = "primary.jks"
    type = "JKS"
    password = "<primary-keystore-password>"
    alias = "<primary-key-alias>"
    key_password = "<primary-keystore-password>"

    # Internal keystore — used for encrypting internal data and config passwords (Cipher Tool)
    [keystore.internal]
    file_name = "internal.jks"
    type = "JKS"
    password = "<internal-keystore-password>"
    alias = "<internal-key-alias>"
    key_password = "<internal-keystore-password>"

    # TLS keystore — used for HTTPS/SSL connections
    [keystore.tls]
    file_name = "tls.jks"
    type = "JKS"
    password = "<tls-keystore-password>"
    alias = "<tls-key-alias>"
    key_password = "<tls-keystore-password>"

    # Truststore
    [truststore]
    file_name = "client-truststore.jks"
    type = "JKS"
    password = "<truststore-password>"
    ```

=== "PKCS12"

    ```toml
    # Primary keystore — used for token signing (OIDC, SAML)
    [keystore.primary]
    file_name = "primary.p12"
    type = "PKCS12"
    password = "<primary-keystore-password>"
    alias = "<primary-key-alias>"
    key_password = "<primary-keystore-password>"

    # Internal keystore — used for encrypting internal data and config passwords (Cipher Tool)
    [keystore.internal]
    file_name = "internal.p12"
    type = "PKCS12"
    password = "<internal-keystore-password>"
    alias = "<internal-key-alias>"
    key_password = "<internal-keystore-password>"

    # TLS keystore — used for HTTPS/SSL connections
    [keystore.tls]
    file_name = "tls.p12"
    type = "PKCS12"
    password = "<tls-keystore-password>"
    alias = "<tls-key-alias>"
    key_password = "<tls-keystore-password>"

    # Truststore
    [truststore]
    file_name = "client-truststore.p12"
    type = "PKCS12"
    password = "<truststore-password>"
    ```

!!! tip
    After configuring keystores, use the [Cipher Tool]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool) to encrypt the keystore passwords in `deployment.toml` so they are not stored in plain text.

## Add new keys to an existing keystore

The following guides explain how you can add new keys to existing keystores.

1. Navigate to the [default keystore](#configure-default-keystore-and-truststore) or other existing keystore on a terminal.

2. Execute the following command.

    === "Format"

        ```bash
        keytool -genkey -alias <public_certificate_alias> -keyalg RSA -keysize 2048 -keystore <keystore_name> -storetype <keystore_type> -dname "CN=<<Common Name>>,OU=<<Organization Unit>>,O=<<Organization>>,L=<<Locality>>,S=<<StateofProvice Name>>,C=<<Country Name>>"-storepass <keystore_password> -keypass <private_key_password>
        ```

    === "Sample command (JKS)"

        ``` bash
        keytool -genkey -alias newkey -keyalg RSA -keysize 2048 -keystore wso2carbon.jks -dname "CN=localhost, OU=IT,O={{base_path}},L=SL,S=WS,C=LK" -storepass wso2carbon -keypass wso2carbon
        ```

    === "Sample command (PKCS12)"

        ``` bash
        keytool -genkey -alias newkey -keyalg RSA -keysize 2048 -keystore wso2carbon.p12 -storetype PKCS12 -dname "CN=localhost, OU=IT,O={{base_path}},L=SL,S=WS,C=LK" -storepass wso2carbon -keypass wso2carbon
        ```

    !!! tip  
        If you are planning to delete the newly added keys in the future, it is recommended to [maintain separate keystores](#use-multiple-keystores).

## View public keys via JWKS

To view super tenant public key sets via the JWKS endpoint, visit `https://<IS_HOST>:<PORT>/oauth2/jwks`.

!!! abstract ""
    **Example**
    ```json
    // 20190612140905
    // https://localhost:9443/oauth2/jwks
      
    {
      "keys": [
        {
          "kty": "RSA",
          "e": "AQAB",
          "use": "sig",
          "kid": "MGZlMjg1MTEyZjE5ZGEyZTI2MWY4ODNlOGM5ZWQwZDIyNzk4MTJiZg",
          "alg": "RS256",
          "n": "swfFo3uUhsEE5SSJSUrzE4-U-PuYmQn-d71GOV59VcL1_cZRAPS89GE1_M3fmFP4xzB7X4p5vYW7lYYZvOUeZGC0BwR1YXz7uK9VRqXDQM1t_X8yUxtYf6u6hajD5fR3PzirlMzjW1ckojeGTgKS5G-HdixOs2OX2n_kQ5LVUHwIEJ2lryGkfd2Vfq7IBgAifQqYDLcrKqK3-iwF7-foii0lLFg8E_dRuOD5sa6Ec01WjogsA14fZRHzmNKiocjP_FOzmvfq7uHRYta6erTVHtsdOvJBVDy1ANvR0cxGdydfRnGwDYI05kgA5L27MnlN6NMroffDBtHmlCvvwToylw"
        },
        {
          "kty": "RSA",
          "e": "AQAB",
          "use": "sig",
          "kid": "NTAxZmMxNDMyZDg3MTU1ZGM0MzEzODJhZWI4NDNlZDU1OGFkNjFiMQ",
          "alg": "RS256",
          "n": "luZFdW1ynitztkWLC6xKegbRWxky-5P0p4ShYEOkHs30QI2VCuR6Qo4Bz5rTgLBrky03W1GAVrZxuvKRGj9V9-PmjdGtau4CTXu9pLLcqnruaczoSdvBYA3lS9a7zgFU0-s6kMl2EhB-rk7gXluEep7lIOenzfl2f6IoTKa2fVgVd3YKiSGsyL4tztS70vmmX121qm0sTJdKWP4HxXyqK9neolXI9fYyHOYILVNZ69z_73OOVhkh_mvTmWZLM7GM6sApmyLX6OXUp8z0pkY-vT_9-zRxxQs7GurC4_C1nK3rI_0ySUgGEafO1atNjYmlFN-M3tZX6nEcA6g94IavyQ"
        }
      ]
    }
    ```
