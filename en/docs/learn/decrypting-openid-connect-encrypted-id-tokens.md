# Decrypting OpenID Connect Encrypted ID Tokens
The WSO2 Identity Server provides encrypted ID Tokens.

-   Unencrypted JWT ID tokens can contain only two base64 encoded
    portions separated by a "."

    ``` xml
    <header>.<body>
    ```

    The following is an example where unencrypted ID tokens contain only
    two base64 encoded portions separated by a "."

    ``` java
    eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhbGljZSIsImlzcyI6Imh0dHBzOlwvXC9jMmlkLmNvbSIsImlhdCI6MTQxNjE1ODU0MX0
    ```

-   Encrypted ID Tokens containing five base64 encoded portions
    separated by a "."

    ``` xml
    <header>.<Encrypted_Key>.<Initialization_Vector>.<Ciphertext>.<Authentication_Tag>
    ```

    The following is an example where the encrypted ID token contains
    five base64 encoded portions separated by a "."

    ``` java
    eyJ4NXQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJraWQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBMV81In0.Zwp2xDvYER9lAo43QrYrcaKz-tPLFPYZb2s4RontDDVyvdo-seYl6II2C1Wb4cQhXdipcB_Qj093xvLrJyZXWxeavqYhryeuHi2jgcs59MfV1U9hMaKqqjVN1pcZYSrxDzn5leBF5bw7_YKaD_R6cFY8VtpVv5j_U8WohtyIjM7_n2CsZ55vY8MUHCAYxzXK9_s75e6Ug8L4MEqpgeoJGQzYCxFrBFgGyDMv1jadLwNl4Y3yLhv4RLtQMU5AM6nODI601UfYdrapObF3mpl_74H_YdRqT28LepGMtkEXbjeRgB-FiFGLvYlrK4wygczLBKrcviVyzyhrIrqz3TYV3g.Lf5lECzAdyAGgP8t.SHBUZoWkqwW_7u0GElrUqX1tewqRaUMWdGPHxpLRPmpVuc7FwQ27-kdsQ6O1_twhZ7uzjzZaEkatNhMxy9k10733-r4GT1lTGVqidKiBZq3mRQu7qJpcz7JWUroNFRLxhSoqpLpC8_tAhkohzG-mE42xdEh4tNDy3pBtAG0fe42WrLtWTuyg5lpmOYSppOc2Gb6LcDr4MmxFNPgoatF0edJSgO-CpFJQTcXn-22lU2g7o22x3RcBx9_KZH0At3g9y9uTuBncExOoBRK_ZweKOl0q76TaLiv5faXINW15xz9hILA.RGYIL7FaQqAIMPAiQdkOig
    ```

If you want to see the exact JSON values of the ID Token, you have to
decrypt it.

The following is a simple Java program to decrypt the ID Token using the
default wso2carbon.jks key store in WSO2 Identity Server.

``` java
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

When encrypted id tokens are produced, two encryption processes happen.
First, a random content encryption key (CEK) is generated. Then the
payload is encrypted using this CEK and a symmetric encryption
algorithm, which is called the Encryption Method. Then the CEK is
encrypted again using the public key of the client and an asymmetric
encryption algorithm, which is called the Encryption Algorithm.

You can read more about these concepts [here](https://tools.ietf.org/html/rfc7516).

You can configure the default values of the above-mentioned Encryption
Method and Encryption Algorithm by making changes to the
`        <IS_HOME>/repository/conf/deployment.toml        ` 
file.

```xml
[oauth.oidc.id_token]
supported_encryption_algorithms= "RSA-OAEP"
supported_encryption_methods= "A128GCM" 
```

For Encryption Algorithm, currently WSO2 IS supports the following
algorithms.

-   RSA1\_5
-   RSA-OAEP

For Encryption Method, currently WSO2 IS supports the following algorithms.

-   A128GCM
-   A192GCM
-   A256GCM
-   A128CBC-HS256
-   A128CBC+HS256  
      

``` xml
[oauth.oidc.id_token]
supported_encryption_algorithms=["RSA1_5","RSA-OAEP"]
supported_encryption_methods=["A128GCM","A192GCM","A256GCM","A128CBC-HS256","A128CBC+HS256"]
```

!!! note
    By default WSO2 products are shipped with wso2carbon.jks. The password for the
    keystore is "wso2carbon" and the certificate alias is also "wso2carbon".
    In a production environment, we recommend that you change these values.
    
