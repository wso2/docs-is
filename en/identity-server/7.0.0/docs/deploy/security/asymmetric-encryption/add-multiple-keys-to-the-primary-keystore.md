# Add Multiple Keys to the Primary Keystore

WSO2 Identity Server enables adding multiple keys to the primary keystore. Let's explore the following topics to learn more.

## Add new keys

Follow the steps below to add new keys to the **super tenant**

1. Locate the `wso2carbon.jks` file in the `<IS_HOME>/repository/resources/security` directory in a command prompt.

    !!! info
        wso2carbon is the default keystore. To learn how to change the default keystore, see [Create New Keystores]({{base_path}}/deploy/security/asymmetric-encryption/create-new-keystores) and [Configure Keystores]({{base_path}}/deploy/security/asymmetric-encryption/configure-keystores-in-wso2-products).

2. Follow the steps given below to generate the new keys and add them to the keystore.

    1. Navigate to the `<IS_HOME>/repository/resources/security` directory on a command prompt.

        !!! info
            By default, all WSO2 Identity Server keystores are stored here. You may change it based on your requirements.

    2. Execute the following command.  

        !!! abstract ""
            **Format**
            ```curl
            keytool -genkey -alias <PUBLIC_CERTIFICATE_ALIAS> -keyalg RSA -keysize 2048 -keystore <KEYSTORE_NAME> -dname "CN=<<Common Name>>,OU=<<Organization Unit>>,O=<<Organization>>,L=<<Locality>>,S=<<StateofProvice Name>>,C=<<Country Name>>"-storepass <KEYSTORE_PASSWORD> -keypass <PRIVATE_KEY_PASSWORD>
            ```
            ---
            **Example**
            ``` curl
            keytool -genkey -alias newkey -keyalg RSA -keysize 2048 -keystore wso2carbon.jks -dname "CN=localhost, OU=IT,O={{base_path}},L=SL,S=WS,C=LK" -storepass wso2carbon -keypass wso2carbon
            ```

        !!! tip  
            If you are planning to delete the newly added keys in the future, it is recommended to maintain separate keystores for internal and external encryption purposes.

        !!! note
            Make sure to use the same password for all the keys and add it to the `Password` parameter under the `[keystore.tls]` element in the `<IS_HOME>/repository/conf/deployment.toml` file.

3. Follow the instructions given below to set the newly added key as the primary encrypting and signing key:

    1. Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.

    2. Update the `alias` parameter under the `[keystore.tls]` element with the new keystore `alias`.

        !!! abstract ""
            **Example**
            ```toml
            [keystore.tls]
            alias= "newKey"
            ```

4. Restart WSO2 Identity Server.

<!-- ## View private keys via management console

Follow the steps below to view the private keys via the WSO2 Identity Server Management Console (`https://<IS_HOST>:<PORT>/carbon`).

<ol>
 <li>
  <p>On <b>Main</b> menu of the Management Console, click <b>Manage > Keystore > List</b>.</p>
  <p><img src="{{base_path}}/assets/img/deploy/security/list-keystores-menu-item.jpeg" width="200" /></p>
 </li>
 <li>
  <p>Click <b>View</b> of the relevant keystore.</p>
  <p><img src="{{base_path}}/assets/img/deploy/security/keystores.jpeg" width="600" /></p>
  <p>The certificate of the private key appears.</p>
  <p><img src="{{base_path}}/assets/img/deploy/security/private-key-certificate.jpeg" width="800"></p>
 </li>
</ol> -->

## View public keys via JWKS

To view super tenant public key sets via the JWKS endpoint, visit `https://<IS_HOST>:<PORT>/oauth2/jwks`.

!!! abstract ""
 **Example**
 ```jwt
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
