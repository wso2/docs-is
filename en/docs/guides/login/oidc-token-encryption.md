# Encrypt ID Tokens

This page guides you through configuring token encryption for ID tokens.

## Register a service provider

{!./includes/register-a-service-provider.md!}

----

## Configure the service provider

Make the following changes to the created service provider.

1. Expand **Inbound Authentication Configuration > OAuth/OpenID Connect Configuration** and click **Configure**.

2. Enter the **Callback Url**. 

    !!! note
        The **Callback Url** is the exact location in the service provider's application to which an access token will be sent. This URL should be the URL of the page that the user is redirected to after successful authentication.

3. Click **Enable ID Token Encryption** to enable id\_token encryption.

    Once you enable id\_token encryption, two select boxes will be
    visible to choose your preferred encryption algorithm and encryption
    method.

    -   **Encryption Algorithm:** Asymmetric encryption algorithm that is used to encrypt the Content Encryption Key (CEK), using the
        public key of the service provider.

    -   **Encryption Method:** Symmetric encryption algorithm that is used to encrypt the JWT claims set using the CEK.

    Leave these values as they are if you do not have any specific requirements.
    
4. Click **Add**

!!! tip
     To configure more advanced configurations, see [OAuth/OpenID Connect Configurations]({{base_path}}/guides/login/oauth-app-config-advanced). 

----

## Configure the public certificate

The following steps describe how to configure a service provider public certificate.

1.  Create a new keystore.

    ``` java
    keytool -genkey -alias wso2carbon -keyalg RSA -keysize 2048 -keystore testkeystore.jks -dname "CN=*.test.com,OU=test,O=test,L=MPL,ST=MPL,C=FR" -storepass wso2carbon -keypass wso2carbon -validity 10950
    ```

2.  Create a file and name it as the client ID of the OAuth application service provider. Export the public key of the new keystore to the file you created.

    ``` java
    keytool -export -alias wso2carbon -file <client-id> -keystore testkeystore.jks
    ```

3.  Get the cert in X509 format.

    ``` java
    keytool -printcert -rfc -file <client-id>
    ```

    You will see the public certificate in X509 format in the console.
    
4. Copy the content of the certificate. A sample output is shown below. 

    ``` java
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

4.  Click **Service Providers > List** and **Edit** the service provider you created. 

5. Select **Upload SP Certificate** under  **Select SP Certificate Type**.

6. Paste the certificate content copied in step 4 as the **Application Certificate**.

    ![Upload SP certificate]({{base_path}}/assets/img/guides/upload-sp-cert.png)
    
    !!! note

		Instead of uploading the service provider certificate as shown
		above, you can choose to use the JWKS enpoint as shown below and
		add the relevant JWKS URI.

		![JWKS URI]({{base_path}}/assets/img/guides/jwks-uri.png)

7. Click **Update**.

----

## Try it

This section guides you through obtaining an encrypted ID token and decrypting it using a simple java program. Alternatively, you can use the WSO2 IS playground sample application to decrypt the token. For instructions, see [Decrypt the ID token]({{base_path}}/guides/login/oidc-token-decryption).

1. See [OAuth Grant Types]({{base_path}}/access-delegation/authorization-code) and try out one of the grant types with the `openid` scope to obtain an access token.

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

        ![sample-key-string]({{base_path}}/assets/img/guides/sample-key-string.png)

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
    

!!! info "Related topics"
    - [Concept: ID Token]({{base_path}}/references/concepts/authentication/id-token)
    - [Quick Start: OpenID Connect Token Encryption]({{base_path}}/quick-starts/oidc-token-encryption-sample)
    - [Guide: Enable Login for an OpenID Connect Web Application]({{base_path}}/webapp-oidc)
    - [Guide: Use Advanced Parameters in Authentication Requests]({{base_path}}/oidc-parameters-in-auth-request)

