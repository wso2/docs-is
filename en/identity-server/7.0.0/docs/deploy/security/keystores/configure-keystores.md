{% include "../../../../../../includes/guides/encryption/configure-keystores.md" %}

## Add new keys to an existing keystore

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
