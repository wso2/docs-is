# Encrypt and decrypt ID tokens
{{product_name}} can encrypt ID tokens to enhance security during transmission. This ensures that only the intended recipient, who possesses the corresponding private key, can decrypt and read the token's contents. This guide explains how you can configure {{product_name}} to encrypt ID tokens and how your applications can decrypt them.

## How it works

{{product_name}} uses [JSON Web Encryption (JWE)](https://datatracker.ietf.org/doc/html/rfc7516){: target="_blank"} standards to encrypt ID tokens. The ID token will be encrypted using the registered public key of the application. The application can then use its private key to decrypt the token and access the claims within.

!!! note "Before you begin"

    Register an application by following the instructions in the relevant guide based on your application type:

    - [Register a standard-based application]({{base_path}}/guides/applications/register-standard-based-app/)
    - [Register an OIDC web application]({{base_path}}/guides/applications/register-oidc-web-app/)
    - [Register a single-page application]({{base_path}}/guides/applications/register-single-page-app/)
    - [Register a mobile application]({{base_path}}/guides/applications/register-mobile-app/)

## Enable encryption

The following steps ensures that {{product_name}} encrypts the ID token issued to your application.

1. On the WSO2 Identity Server Console, go to **Applications** and select your application.

2. In the **Protocol** tab of the application, make the following changes:

      1. under **Certificate**, provide a way for {{product_name}} to access the public key of the application. You can do so in either of the following ways:

          - upload the public certificate of the application. If you don't have one, create a self-signed certificate by following the instructions in the [create a self-signed certificate](#optional-create-a-self-signed-certificate) section below.

          - provide the JWKS URI of the application. Learn more about JWKS

      2. Under **ID Token**, select the **Enable ID Token Encryption** checkbox and configure the following parameters:

          - **Algorithm:**: Asymmetric encryption method used to encrypt the Content Encryption Key (CEK), using the public key of the application.

          - **Encryption method**: Symmetric encryption algorithm used to encrypt the JWT claims set using the CEK.

            !!! note

                Learn more about the supported [encryption algorithms and methods]({{base_path}}/guides/authentication/oidc/id-token-encryption-reference/).

3. Click **Update** to save the changes.

## (Optional) Create a self-signed certificate

You can create a self-signed certificate by following the steps below. You can skip this section if you already have a public certificate.

1. Create a new keystore.

    ```bash
    keytool -genkey -alias wso2carbon -keyalg RSA -keysize 2048 -keystore testkeystore.jks -dname "CN=*.test.com,OU=test,O=test,L=MPL,ST=MPL,C=FR" -storepass wso2carbon -keypass wso2carbon -validity 10950
    ```

2. Create a file and name it as the client ID of the OAuth application (You can get it from the **Protocol** section of the application). Export the public key of the new keystore to the file you created.

    ```bash
    keytool -export -alias wso2carbon -file <client-id> -keystore testkeystore.jks
    ```

3. Get the cert in X509 format.

    ```bash
    keytool -printcert -rfc -file <client-id>
    ```

    You will see the public certificate in X509 format in the console.

4. Copy the content of the certificate. A sample output is shown below.

    ```bash
    -----BEGIN CERTIFICATE-----
    MIIDVzCCAj+gAwIBAgIETCZA8zANBgkqhkiG9w0BAQsFADBcMQswCQYDVQQGEwJG
    UjEMMAoGA1UECBMDTVBMMQwwCgYDVQQHEwNNUEwxDTALBgNVBAoTBHRlc3QxDTAL
    BgNVBAsTBHRlc3QxEzARBgNVBAMMCioudGVzdC5jb20wHhcNMTgwMjE0MDYzNjE3
    WhcNNDgwMjA3MDYzNjE3WjBcMQswCQYDVQQGEwJGUjEMMAoGA1UECBMDTVBMMQww
    CgYDVQQHEwNNUEwxDTALBgNVBAoTBHRlc3QxDTALBgNVBAsTBHRlc3QxEzARBgNV
    BAMMCioudGVzdC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCz
    Gc/BcXCiIagLhXs1g90H+PbfZyXLzwFJ+YmsKMikcffhyopDD+fnFjHb1+XXSnUh
    4XzQlFba6m2vIOK8uquMhZKMv/E7Vxkl/ADTuw/BgpZRut4p88Fn8OWZlrJfoi3o
    hvgfxSMratvxLMp1Qe0BzjwoBDB9r+h9pj8kCpHC824eUGIR0FZsW9lnoJP2LegL
    nAcOJuNBoeWC0wwNu0sgIJwjsKp3G3glm8B4GdZvbF8aW1QRAk36sh8+0GXrRnAz
    aGcRAqt7CjeZmt5Dsuy0lfp5i1xf5myPOH7MwKHqQQ56Wu9O479NdDVLkJ0xne2r
    ZTCwMeGhQQH5hI+SYlxjAgMBAAGjITAfMB0GA1UdDgQWBBTzS+bja//25xb+4wcP
    gMN6cJZwoDANBgkqhkiG9w0BAQsFAAOCAQEAdhZ8romzQQKF9c8tJdIhUS4i7iJh
    oSjBzN+Ex9+OJcW6ubcLb8pai/J3hcvMadAybR1A17FkETLFmG9HkuEN9o2jfU7c
    9Yz5d0pqO8qNKXSqHky5c+zA4vzLZGsgKyDZ5a0p9Qpsat3wnA3UGZPRoVGV5153
    Mb0J1n1uubxGobEEzR2BXaKO9YEWAMQwGRdQCGBaIeGUOpqSUJMLYirDXL03je3g
    mYzWclLTEHpIYy+a66tmF9uTGgyys33LPm2pQ+kWd8FikWolKKBqp+IPU5QdUQi1
    DdFHsyNqrnms6EOQAY57Vnf91RyS7lnO1T/lVR6SDk9+/KDBEL1b1cy7Dg==
    -----END CERTIFICATE-----
    ```

5. Paste the copied certificate into the **Certificate** field of the application in {{product_name}} Console.

## Decrypt the ID token

Follow the steps below to get an encrypted ID token and decrypt it.

1. Use one of the following guides and perform an OIDC authentication flow to receive an encrypted ID token:
    - [Implement authorization code flow]({{base_path}}/guides/authentication/oidc/implement-auth-code/)
    - [Implement authorization code flow with PKCE]({{base_path}}/guides/authentication/oidc/implement-auth-code-with-pkce/)

2. You can use one of the following methods to decrypt the ID token:

    !!! note

        Learn more about the format of encrypted ID tokens in the [reference]({{base_path}}/guides/authentication/oidc/id-token-encryption-reference/).

       -  **Use the private key** - You can use the private key corresponding to the public key registered in {{product_name}} to decrypt the ID token. If you created a self-signed certificate by following the steps in the previous section, use the steps below to get the private key from the keystore.

          1. Import JKS into a PKCS12 formatted store.

              ```bash
              keytool -importkeystore -srckeystore testkeystore.jks -destkeystore testkeystore.p12 -srcstoretype JKS -deststoretype  PKCS12 -srcstorepass wso2carbon -deststorepass wso2carbon -srcalias wso2carbon -destalias wso2carbon -srckeypass  wso2carbon -destkeypass wso2carbon
              ```

          2. Extract the private key into a file named `key.pem`

              ```bash
              openssl pkcs12 -in testkeystore.p12 -out key.pem -passin pass:wso2carbon -passout pass:wso2carbon -nodes -nocerts
              ```
        
             The extracted `key.pem` file contains the private key in PEM format, which you can use to decrypt the ID token manually or with a script.

       - **Use a keystore with a third-party library** -  You can use libraries such as [Nimbus JOSE + JWT](https://connect2id.com/products/nimbus-jose-jwt){: target="_blank"} to perform the decryption. The following sample Java code demonstrates how to decrypt an encrypted ID token using the `testkeystore.jks` created in the previous section.

          ```java
          package org.wso2.sample;
          import com.nimbusds.jose.crypto.RSADecrypter;
          import com.nimbusds.jwt.EncryptedJWT;
          import java.io.InputStream;
          import java.security.KeyStore;
          import java.security.interfaces.RSAPrivateKey;
          public class DecryptIDToken {

              public static void main(String[] args) throws Exception {
              
                  // Get keystore as a resource.
                  InputStream file = ClassLoader.getSystemResourceAsStream("testkeystore.jks");
                  KeyStore keystore = KeyStore.getInstance(KeyStore.getDefaultType());
                  keystore.load(file, "wso2carbon".toCharArray());
                  String alias = "wso2carbon";

                  // Get the private key. Password for the key store is 'wso2carbon'.
                  RSAPrivateKey privateKey = (RSAPrivateKey) keystore.getKey(alias, "wso2carbon".toCharArray());

                  // Enter encrypted JWT String here.
                  String encryptedJWTString = "eyJ4NXQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZp" +
                          "TVEiLCJraWQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJlbmMiOiJ" +
                          "BMjU2R0NNIiwiYWxnIjoiUlNBMV81In0.Zwp2xDvYER9lAo43QrYrcaKz-tPLFPYZb2s4RontDDVyvdo-seYl6II2C1Wb4cQhXd" +
                          "ipcB_Qj093xvLrJyZXWxeavqYhryeuHi2jgcs59MfV1U9hMaKqqjVN1pcZYSrxDzn5leBF5bw7_YKaD_R6cFY8VtpVv5j_U8Woh" +
                          "tyIjM7_n2CsZ55vY8MUHCAYxzXK9_s75e6Ug8L4MEqpgeoJGQzYCxFrBFgGyDMv1jadLwNl4Y3yLhv4RLtQMU5AM6nODI601UfY" +
                          "drapObF3mpl_74H_YdRqT28LepGMtkEXbjeRgB-FiFGLvYlrK4wygczLBKrcviVyzyhrIrqz3TYV3g.Lf5lECzAdyAGgP8t.SHB" +
                          "UZoWkqwW_7u0GElrUqX1tewqRaUMWdGPHxpLRPmpVuc7FwQ27-kdsQ6O1_twhZ7uzjzZaEkatNhMxy9k10733-r4GT1lTGVqidK" +
                          "iBZq3mRQu7qJpcz7JWUroNFRLxhSoqpLpC8_tAhkohzG-mE42xdEh4tNDy3pBtAG0fe42WrLtWTuyg5lpmOYSppOc2Gb6LcDr4M" +
                          "mxFNPgoatF0edJSgO-CpFJQTcXn-22lU2g7o22x3RcBx9_KZH0At3g9y9uTuBncExOoBRK_ZweKOl0q76TaLiv5faXINW15xz9h" +
                          "ILA.RGYIL7FaQqAIMPAiQdkOig";  

                  EncryptedJWT jwt = EncryptedJWT.parse(encryptedJWTString);

                  // Create a decrypter with the specified private RSA key.
                  RSADecrypter decrypter = new RSADecrypter(privateKey);

                  jwt.decrypt(decrypter);

                  // Printing decrypted id token header.
                  System.out.println("ID token header: " + jwt.getHeader().toJSONObject());  
                  
                  // Printing decrypted id token header.
                  System.out.println("ID token claims: " + jwt.getJWTClaimsSet().toJSONObject());
              }
          }
          ```
