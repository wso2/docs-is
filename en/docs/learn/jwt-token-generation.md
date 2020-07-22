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
    

**Retrieving user claims with the JWT**

User claims can be retrieved using the ID token or the userinfo endpoint. For more information, see [Basic Client Profile with Playground](../../learn/basic-client-profile-with-playground).

You can access the userinfo endpoint with the received access token using the following curl command. As per the specification, the received bearer token is sent using the HTTP Authorization header.

```
curl -k -H "Authorization: Bearer 4164157d677a6cd3a22e26e24c30135d" https://localhost:9443/oauth2/userinfo?schema=openid
```

As the response, the WSO2 Identity Server returns a JSON with user claims.

```
{"sub":"PRIMARY\/sureshatt","email":"sureshgemunu@mymail.com","name":"Suresh Attanayake","family_name":"Attanayake","preferred_username":"sureshgemunu","given_name":"Suresh"}
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
