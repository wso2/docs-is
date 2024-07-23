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

## Add new keys to an existing keystore

### Add a asymmetric key pair to an existing keystore

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
        },
        {
          "kty": "RSA",
          "e": "AQAB",
          "use": "sig",
          "kid": "MGZlMjg1MTEyZjE5ZGEyZTI2MWY4ODNlOGM5ZWQwZDIyNzk4MTJiZg_RS256",
          "alg": "RS256",
          "n": "swfFo3uUhsEE5SSJSUrzE4-U-PuYmQn-d71GOV59VcL1_cZRAPS89GE1_M3fmFP4xzB7X4p5vYW7lYYZvOUeZGC0BwR1YXz7uK9VRqXDQM1t_X8yUxtYf6u6hajD5fR3PzirlMzjW1ckojeGTgKS5G-HdixOs2OX2n_kQ5LVUHwIEJ2lryGkfd2Vfq7IBgAifQqYDLcrKqK3-iwF7-foii0lLFg8E_dRuOD5sa6Ec01WjogsA14fZRHzmNKiocjP_FOzmvfq7uHRYta6erTVHtsdOvJBVDy1ANvR0cxGdydfRnGwDYI05kgA5L27MnlN6NMroffDBtHmlCvvwToylw"
        },
        {
          "kty": "RSA",
          "e": "AQAB",
          "use": "sig",
          "kid": "NTAxZmMxNDMyZDg3MTU1ZGM0MzEzODJhZWI4NDNlZDU1OGFkNjFiMQ_RS256",
          "alg": "RS256",
          "n": "luZFdW1ynitztkWLC6xKegbRWxky-5P0p4ShYEOkHs30QI2VCuR6Qo4Bz5rTgLBrky03W1GAVrZxuvKRGj9V9-PmjdGtau4CTXu9pLLcqnruaczoSdvBYA3lS9a7zgFU0-s6kMl2EhB-rk7gXluEep7lIOenzfl2f6IoTKa2fVgVd3YKiSGsyL4tztS70vmmX121qm0sTJdKWP4HxXyqK9neolXI9fYyHOYILVNZ69z_73OOVhkh_mvTmWZLM7GM6sApmyLX6OXUp8z0pkY-vT_9-zRxxQs7GurC4_C1nK3rI_0ySUgGEafO1atNjYmlFN-M3tZX6nEcA6g94IavyQ"
        }
      ]
    }
    ```
