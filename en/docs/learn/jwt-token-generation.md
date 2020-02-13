# JWT Token Generation

This section provides instructions on how to get the user claims of the
authorized user as a
[JWT](https://openid.net/specs/draft-jones-json-web-token-07.html) token
with the validation response.

###Configurations

Add and configure the following properties as shown below in the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder.  

```toml
[oauth.token.validation]
include_validation_context_as_jwt_in_reponse = "true"
validation_response_signing_algorithm = "SHA256withRSA"
validation_response_jwt_validity = "15m"
```

```toml
[oauth.extensions]
token_context_generator = "org.wso2.carbon.identity.oauth2.authcontext.JWTTokenGenerator"
token_context_claim_retriever = "org.wso2.carbon.identity.oauth2.authcontext.DefaultClaimsRetriever"
token_context_dialect_uri = "http://wso2.org/claims"
```

Add the following property to the `deployment.toml` file to use the JWT Token
Builder instead of the default Token Builder.

```toml
[oauth.token_generation]
access_token_type = "self_contained"
```
    
The following configurations are optional and can be configured as
needed.

1.  See the [Extension Points for OAuth](../../learn/extension-points-for-oauth/#authorizationcontext-token-generator)
    topic for more details about the usage of the `TokenGeneratorImplClass` and `ClaimsRetrieverImplClass`.

2.  **ConsumerDialectURI**: Defines the URI for the claim dialect under
    which the user attributes need to be retrieved.

3.  **SignatureAlgorithm**: Defines the algorithm to be used in signing the
    payload that carries user claims. If you want to disable signing of
    the JWT token, set this element to "NONE".

    ```toml
    [oauth.oidc.user_info]
    jwt_signature_algorithm = "none"
    ```

4.  **AuthorizationContextTTL**: Defines the expiry time for JWT token in
    minutes.

!!! note
    Instead of configuring the JWT token in the
    `deployment.toml` file, you can also choose to configure
    it using the management console while configuring the OAuth application.
    
    Select **JWT** as the Token Issuer for a new or existing OAuth/OpenID
    connect consumer application. See 
    [Configuring inbound authentication with OAuth/OpenID Connect](../../learn/configuring-inbound-authentication-for-a-service-provider/#configuring-inbound-authentication-with-oauthopenid-connect)
    for more information.
    
    ![jwt-token-issuer]( ../assets/img/using-wso2-identity-server/jwt-token-issuer.png) 
    

**Calling the OAuth2ValidationService with a valid token**

After configuring the elements mentioned above, see the 
[OAuth2 Token Validation and Introspection](../../learn/oauth2-token-validation-and-introspection) 
topic to call the `OAuth2ValidationService` . The following screenshot is the request and response of the
`OAuth2ValidationService` from the [SOAP UI](https://www.soapui.org/downloads/latest-release.html). Additionally, it shows the required claims of the user as required
claim URIs. In the response, you can see the received JWT token under
the `<tokenString>` element.

!!! note
    If there are no requested claim URIs defined, all the claims that carry
    values for the user are returned.
    

![jwt-request1]( ../assets/img/using-wso2-identity-server/jwt-request1.png) 

**Header Metadata:**  
The header contains the metadata for the token as seen below.
```java
<header> . <payload> . <signature>

eyJhbGciOiJSUzI1NiIsIng1dCI6Ik5tSm1PR1V4TXpabFlqTTJaRFJoTlRabFlUQTFZemRoWlRSaU9XRTBOV0kyTTJKbU9UYzFaQSJ9
.
eyJodHRwOlwvXC93c28yLm9yZ1wvZ2F0ZXdheVwvYXBwbGljYXRpb25uYW1lIjoiT2F1dGg3IiwiZXhwIjoxNDUyNTk0ODkyLCJzdWIiOiJhZG1pbkBjYXJib24uc3VwZXIiLCJodHRwOlwvXC93c28yLm9yZ1wvZ2F0ZXdheVwvc3Vic2NyaWJlciI6ImFkbWluQGNhcmJvbi5zdXBlciIsImlzcyI6Imh0dHA6XC9cL3dzbzIub3JnXC9nYXRld2F5IiwiaHR0cDpcL1wvd3NvMi5vcmdcL2dhdGV3YXlcL2VuZHVzZXIiOiJhZG1pbkBjYXJib24uc3VwZXIiLCJodHRwOlwvXC93c28yLm9yZ1wvY2xhaW1zXC9yb2xlIjoiYWRtaW4sQXBwbGljYXRpb25cL2Rld3ZkZXcsQXBwbGljYXRpb25cL09hdXRoNyxJbnRlcm5hbFwvZXZlcnlvbmUiLCJodHRwOlwvXC93c28yLm9yZ1wvY2xhaW1zXC9lbWFpbGFkZHJlc3MiOiJhZG1pbkB3c28yLmNvbSIsImlhdCI6MTQ1MjU5MzI1NCwiaHR0cDpcL1wvd3NvMi5vcmdcL2NsYWltc1wvb3JnYW5pemF0aW9uIjoiV1NPMiJ9
.
WRo2p92f-pt1vH9xfLgmrPWNKJfmST2QSPYcth7gXKz64LdP9zAMUtfAk9DVRdHTIQR3gX0jF4Ohb4UbNN4Oo97a35oTL1iRxIRTKUkh8L1dpt3H03Z0Ze7Q2giHGZikMIQv3gavHRYKjNMoU\_1MuB90jiK7
```
**Decoded Header:**
```
{"alg":"RS256","x5t":"NmJmOGUxMzZlYjM2ZDRhNTZlYTA1YzdhZTRiOWE0NWI2M2JmOTc1ZA"}

x5t : T his header provides a base64url encoded SHA-256 thumbprint
(a.k.a. digest) of the DER encoding of an X.509 certificate that can be
used to match a certificate to validate the signature.
```
**Decoded Payload:**

```java
{  
   "http://wso2.org/gateway/applicationname":"Oauth7",
   "exp":1452594892,
   "sub":"admin@carbon.super",
   "http://wso2.org/gateway/subscriber":"admin@carbon.super",
   "iss":"http://wso2.org/gateway",
   "http://wso2.org/gateway/enduser":"admin@carbon.super",
   "http://wso2.org/claims/role":"admin,Application/dewvdew,Application/Oauth7,Internal/everyone",
   "http://wso2.org/claims/emailaddress":"admin@wso2.com",
   "iat":1452593254,
   "http://wso2.org/claims/organization":"WSO2"
}
```

### Signature verification

The signature verification can be done similar to the ID token signature
verification.

The WSO2 Identity Server is shipped with a signed ID Token. This is
provided in order to address some security vulnerabilities in a typical
production environment. This topic provides information about using this
signed ID Token for signature verification.

The portions of each token are separated by the full stop. To see the
exact JSON values, do a Base64 decode for `<header>.<body>`.

-   **If the unsigned ID token contains only 2 portions:**  
    `<header>.<body>`  

    **Sample of unsigned ID token**
    ```
    eyJhbGciOiJSUzI1NiJ9 .
    eyJzdWIiOiJhbGljZSIsImlzcyI6Imh0dHBzOlwvXC9jMmlkLmNvbSIsImlhdCI6MTQxNjE1ODU0MX0
    ```

-   **If the signed ID token contains 3 portions:**  
    `<header>.<body>.<signature>`

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
`          wso2carbon.jks         ` public key in WSO2 products.

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
