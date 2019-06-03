# Verifying OpenID Connect ID Token Signatures

The WSO2 Identity Server provides signed ID Tokens to address some
security vulnerabilities in the production environment.

-   Unsigned ID tokens can contain only two portions separated by "."

    ``` xml
    <header>.<body>
    ```

    The following is an example where unsigned ID tokens contain only
    two portions separated by "."

    ``` java
        eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhbGljZSIsImlzcyI6Imh0dHBzOlwvXC9jMmlkLmNvbSIsImlhdCI6MTQxNjE1ODU0MX0
    ```

-   Signed ID Tokens containing three portions separated by "."

    ``` xml
        <header>.<body>.<signature>
    ```

    The following is an example where the signed ID token contains three
    portions separated by "."

    ``` java
        eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhbGljZSIsImlzcyI6Imh0dHBzOlwvXC9jMmlkLmNvbSIsImlhdCI6MTQxNjE1ODU0MX0.iTf0eDBF-6-OlJwBNxCK3nqTUjwC71-KpqXVr21tlIQq4_ncoPODQxuxfzIEwl3Ko_Mkt030zJs-d36J4UCxVSU21hlMOscNbuVIgdnyWhVYzh_-v2SZGfye9GxAhKOWL-_xoZQCRF9fZ1j3dWleRqIcPBFHVeFseD_64PNemyg
    ```

If you want to see exact JSON values, you can do Base64 decode for
\<header\>.\<body\> values.

The following is a simple Java program to validate ID token signature
against default wso2carbon.jks public key in WSO2 products.

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

Configuration to switch between signed and unsigned ID tokens. With
default configurations, the ID token is always signed. If you want to
switch off ID token signing, make the following configuration changes in
the `         <IS_HOME>/repository/conf/identity/identity.xml        `
file.

``` xml
<AuthorizationContextTokenGeneration>
    <Enabled>true</Enabled>
    <SignatureAlgorithm>NONE</SignatureAlgorithm>
</AuthorizationContextTokenGeneration>
```

!!! note
    
    **Note** : By default WSO2 products ship with wso2carbon.jks. In the
    wso2carbon.jks keystore, the password is "wso2carbon" and the
    certificate alias also "wso2carbon". In a production environment we
    recommend that you change those values.
    
