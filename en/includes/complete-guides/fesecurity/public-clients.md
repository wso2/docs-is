

## OAuth2/OIDC Public Clients

OIDC is an authentication protocol that builds on OAuth 2.0, standardizing the process of authenticating and authorizing users when they sign in to access digital services. OIDC supports several grant types, each designed for different application scenarios. For example, the authorization code grant type is intended for confidential clients to authenticate end users, while the client credentials grant type is meant for machine-to-machine authentication. Each grant type ultimately provides an access token, but the method of obtaining the token varies depending on the grant type. You can refer to the OAuth2 grant types [documentation]({{base_path}}/references/grant-types/){:target="_blank"}  to understand how each grant type works. According to current OAuth2 best practices, the Authorization Code grant type is the most recommended for browser-based front-end applications, such as React, Angular and Vue applications. As a frontend developer, it's crucial to ensure you're using the correct grant type, which, in this case, is the Authorization Code flow. Let’s explore the Authorization Code grant type with the help of the following diagram to better understand its flow.

![Code grant type]({{base_path}}/assets/img/complete-guides/fesecurity/image3.png){: width="800" style="display: block; margin: 0;"}


As depicted in the diagram above, once the user is authenticated, an authorization code is issued to the application. The application must then make a token request to the authorization server (IdP), supplying the authorization code. The IdP will issue an access token together with an ID token to the application upon verifying the request. This token request requires the client application to be verified using an application identifier and a secret. However, since frontend apps run entirely on the frontend typically within the user’s browser, they are classified as public clients. This means that their source code is accessible to anyone who interacts with the application. Storing secrets or credentials in this context is insecure because it exposes the client secret in the request headers, making the login process vulnerable to misuse. Therefore, traditional client authentication methods are not suitable for SPAs.

Without client authentication, this flow makes public clients vulnerable to authorization code interception attacks. In such attacks, an attacker intercepts the authorization code returned from the authorization endpoint through a communication path not protected by Transport Layer Security (TLS), such as inter-app communication within the client's operating system. Once the attacker obtains the authorization code, they can use it to acquire the access token. For more details on how this attack can be executed, you can refer to the [PKCE specification](https://www.rfc-editor.org/rfc/rfc7636#section-1){:target="_blank"}.


The Proof Key for Code Exchange (PKCE) extension to the OAuth 2.0 Authorization Code flow was introduced to address the security concerns of OIDC public clients. PKCE enhances the security of public clients by mitigating the risk of authorization code interception.

![PKCE]({{base_path}}/assets/img/complete-guides/fesecurity/image4.png){: width="800" style="display: block; margin: 0;"}

When a user logging into an application, the client (the application) generates a cryptographically random key called the “code verifier”. This is a long string of random characters, usually base64 encoded. The client then transforms the code verifier into a derived value called the “code challenge”. Typically, this transformation is done using a hashing algorithm like SHA-256, and the result is base64-url encoded. This makes the code challenge smaller and harder to reverse engineer, but the transformation itself is optional (the challenge can also be the plain code verifier).

The client initiates the OAuth 2.0 flow by sending an authorization request to the Authorization Server (IdP). This request includes the code challenge and the code challenge method (either plain or S256, indicating the hashing algorithm used) as indicated in the image below.

![PKCE code chalange]({{base_path}}/assets/img/complete-guides/fesecurity/mage5.png){: width="800" style="display: block; margin: 0;"}


After successful authentication, the IdP generates an authorization code and sends it back to the client. The client now makes a request to the token endpoint to exchange the authorization code for an access token. This request includes the authorization code and the code verifier (the original random string) as indicated in the image below.

![PKCE code verifier]({{base_path}}/assets/img/complete-guides/fesecurity/image6.png){: width="800" style="display: block; margin: 0;"}

The IdP takes the code verifier sent in the token request and applies the same transformation (if any) that was applied earlier. It compares the result with the code challenge that was sent earlier with the authorization request. If the two match, it verifies that the same client who initiated the flow is completing it and issues an access token.

This process ensures that if an attacker were to intercept the authorization code during the authorization phase, they wouldn't be able to exchange it for tokens. This is because they wouldn't possess the code verifier, a secret known only to the legitimate client. Since the code verifier is generated dynamically and is used only once, even if an attacker somehow obtains it, it would be useless for future requests.

PKCE is an important security improvement for frontend applications but at the same time it sounds like an extra burden for you to generate and process all these code challenges and code verifiers by yourself.  The good news here is, following the security best practices such as secure by design, secure by default, most of the the frontend authentication SDKs automatically enable PKCE extension for you. For instance, Asgardeo React SDK enables PKCE extension for your apps by default. Here is how you can enable it manually by setting the enable PKCE option to true in the Asgardeo SDK configuration:


```javascript title="src/main.jsx" hl_lines="9"

import { AuthProvider } from "@asgardeo/auth-react";

const authConfig = {
    clientID: "YOUR_CLIENT_ID",
    signInRedirectURL: "http://localhost:3000",
    signOutRedirectURL: "http://localhost:3000",
    baseUrl: "https://api.asgardeo.io/t/{org_name}",
    scope: [ "openid","profile"],
    enablePKCE: true,  
    ...
};

```

After successful login, you'll receive an access token and an ID token in response to the token request.

- The ID token is a JWT containing user information such as user attributes, roles, and groups, which the application uses to identify and interact with the authenticated user. You can configure the information to be included in the ID token via the user attributes section in {{product_name}}'s application configuration.

- The access token is used to access protected APIs in the same IdP, such as SCIM APIs in {{product_name}}, for retrieving and updating user profiles or a business API protected by {{product_name}}.

A sample response is provided below for your reference.

A sample response is provided below for your reference.

```json
{
    "access_token": "f39b1125-1cfa-372c-9a6c-4077fa32e321",
    "scope": "internal_login openid",
    "id_token": "eyJ4OiJ...IlJU2In0.eyJpcOiIyY...bC5jbfQ.jymfdT5L...Fqs390MNg",
    "token_type": "Bearer",
    "expires_in": 3600
}


```