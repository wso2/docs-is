# IDToken Signature Verification

The WSO2 Identity Server is shipped with a signed ID Token. This is
provided in order to address some security vulnerabilities in a typical
production environment. This topic provides information about using this
signed ID Token for signature verification.

The portions of each token are separated by the full stop. To see the
exact JSON values, do a Base64 decode for
`          <header>.<body>         ` .

-   **If the unsigned ID token contains only 2 portions:**  
    `           <header>.<body>          `  

    **Sample of unsigned ID token**
    ```
    eyJhbGciOiJSUzI1NiJ9 .
    eyJzdWIiOiJhbGljZSIsImlzcyI6Imh0dHBzOlwvXC9jMmlkLmNvbSIsImlhdCI6MTQxNjE1ODU0MX0
    ```
-  **If the signed ID token contains 3 portions:**
    `           <header>.<body>.<signature>          `

    **Sample of signed ID token**
    ```
    eyJhbGciOiJSUzI1NiJ9 .
    eyJzdWIiOiJhbGljZSIsImlzcyI6Imh0dHBzOlwvXC9jMmlkLmNvbSIsImlhdCI6MTQxNjE1ODU0MX0
    .
    iTf0eDBF-6-OlJwBNxCK3nqTUjwC71-KpqXVr21tlIQq4\_ncoPODQxuxfzIEwl3Ko\_Mkt030zJs-d36J4UCxVSU21hlMOscNbuVIgdnyWhVYzh\_-v2SZGfye9GxAhKOWL-\_xoZQCRF9fZ1j3dWleRqIcPBFHVeFseD\_64PNemyg
    ```
### Validating the ID token signature

The following code segment is a simple Java program that can be used to
validate the ID token signature against the default
`         wso2carbon.jks        ` public key in WSO2 products.

``` java
package org.sample;

import java.io.InputStream;
import java.security.KeyStore;
import java.security.cert.Certificate;
import java.security.interfaces.RSAPublicKey;

import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.RSASSAVerifier;
import com.nimbusds.jwt.SignedJWT;

public class ValidateRSASignature {

    public static void main(String[] args) throws Exception {
        RSAPublicKey publicKey = null;
        InputStream file = ClassLoader
                .getSystemResourceAsStream("wso2carbon.jks");
        KeyStore keystore = KeyStore.getInstance(KeyStore.getDefaultType());
        keystore.load(file, "wso2carbon".toCharArray());

        String alias = "wso2carbon";

        // Get certificate of public key
        Certificate cert = keystore.getCertificate(alias);
        // Get public key
        publicKey = (RSAPublicKey) cert.getPublicKey();

        // Enter JWT String here
        String signedJWTAsString = "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhbGljZSIsImlzcyI6Imh0d";

        SignedJWT signedJWT = SignedJWT.parse(signedJWTAsString);

        JWSVerifier verifier = new RSASSAVerifier(publicKey);

        if (signedJWT.verify(verifier)) {
            System.out.println("Signature is Valid");
        } else {
            System.out.println("Signature is NOT Valid");
        }
    }
}
```
