# Encrypt ID Tokens

This page guides you through configuring [token encryption for ID tokens](TODO:insert-link-to-concept). 

----

This guide assumes you have your own application. If you wish to try out this flow with a sample application click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/oidc-token-encryption-sample"   rel="nofollow noopener">Try it with the sample</a>

----

(TODO: dev-portal-fragment)
{!fragments/register-a-service-provider.md!}

----

(TODO: dev-portal-fragment)
{!fragments/oauth-app-config-basic.md!}

-----

(TODO: dev-portal-content)

## Enable ID token encryption

1. Click **Edit** to edit the OAuth/OpenID Connect Configuration. 

2. Click **Enable ID Token Encryption** to enable id\_token encryption.

    Once you enable id\_token encryption, two select boxes will be
    visible to choose your preferred encryption algorithm and encryption
    method.

    -   **Encryption Algorithm:** Asymmetric encryption algorithm that is used to encrypt the Content Encryption Key (CEK), using the
        public key of the service provider.

    -   **Encryption Method:** Symmetric encryption algorithm that is used to encrypt the JWT claims set using the CEK.

    Leave these values as they are if you do not have any specific requirements.

----

(TODO: dev-portal-fragment)
{!fragments/encrypt-id-tokens.md!}

----

## Try it out

This section guides you through obtaining an encrypted ID token and decrypting it using a simple java program. Alternatively, you can use the WSO2 IS playground sample application to decrypt the token. For instructions, see [Decrypt the ID token](TODO:insert-link-to-guide).

1. See [OAuth Grant Types](../../access-delegation/oauth-grant-types) and try out one of the grant types with the `openid` scope to obtain an access token.

2. You will recieve an access token and an encrypted ID token. 

3. To decrypt the ID token, provide the private key of the client. 

    1.  Import JKS into a PKCS12 formatted store.

        ``` java
        keytool -importkeystore -srckeystore testkeystore.jks -destkeystore testkeystore.p12 -srcstoretype JKS -deststoretype PKCS12 -srcstorepass wso2carbon -deststorepass wso2carbon -srcalias wso2carbon -destalias wso2carbon -srckeypass wso2carbon -destkeypass wso2carbon
        ```

    2.  Extract the private key into a file named `key.pem`.

        ``` java
        openssl pkcs12 -in testkeystore.p12 -out key.pem -passin pass:wso2carbon -passout pass:wso2carbon -nodes -nocerts
        ```

    3.  Open the created `key.pem` file using a text editor and you will see the extracted private key.

    4.  Copy only the key string as shown in the sample below.

        ![sample-key-string](../../assets/img/guides/sample-key-string.png)

4. The following sample JAVA program can be used to decrypt the ID token using the default `wso2carbon.jks` keystore. 

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
            InputStream file = ClassLoader.getSystemResourceAsStream("wso2carbon.jks");
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
    
----

!!! info "Related Topics"
    - [Concept: Token Encryption for ID Tokens](TODO:insert-link-to-concept)
    - [Concept: ID Token](../../../concepts/authentication/id-token)
    - [Demo: OpenID Connect Token Encryption](../../../quick-starts/oidc-token-encryption-sample)
    - [Guide: OAuth Grant Types](../../access-delegation/oauth-grant-types)
    - [Guide: Decrypt the ID Token](TODO:insert-link-to-guide)
    - [Guide: Enable Login for an OpenID Connect Web Application](../webapp-oidc)
    - [Guide: Use Advanced Parameters in Authentication Requests](../oidc-parameters-in-auth-request)

