# Mitigating Authorization Code Interception Attacks

The following sections describe the impact of the code interception
attack and the approaches you can use to mitigate it. You may need to
mitigate these kind of attacks when creating an OAuth application that
uses the [Authorization Code Grant](../../using-wso2-identity-server/authorization-code-grant) type for
authentication.

### How can code interception attacks be harmful?

A code interception attack is where a malicious client intercepts the
authorization code returned from the authorization endpoint and uses it
to obtain the access token. OAuth is a popular mechanism for smartphone
applications that run on platforms like Android, iOS and Microsoft
Windows. These applications generally use the **Authorization Code**
grant type for authentication.

##### The authorization code grant type flow

1. The application is registered as a handler for a particular URI scheme
(e.g., URLs beginning with " `          org.wso2.app://         ` ").
This means that the application will launch whenever a user navigates to
a URL beginning with the custom scheme "
`          org.wso2.app://         ` ".

2. When authentication is required, the application launches the system
browser and loads the appropriate page of the identity provider. In this
case, the identity provider is the WSO2 Identity Server (IS).

3. Within WSO2 IS:

    1.  The user authenticates himself.

    2.  Approves any user consents regarding the application.

4. When the user is successfully authenticated, WSO2 IS redirects the user
to the redirection URL provided by the application (e.g., “
`          org.wso2.app://auth?code=12345&state=abc         ` ”).

5. The browser queries the mobile Operating System (OS) to get a list of
applications that handle the URI provided. The mobile OS determines the
application(s) and parses the URI.

6. The native application extracts the authorization code from the parsed
URI.

7. The native application sends the authorization code back to WSO2 IS,
which validates the authorization code and returns the access token.

Since multiple applications can be registered as a handler for the
specific redirect URI, the vulnerability of this flow, is that a
malicious client could also register itself as a handler for the same
URI scheme that a legitimate application handles. If this happens, it is
a possibility that the operating system will parse the URI to the
malicious client. The flow of this attack is illustrated in the
following diagram.

!!! info
    In some operating systems such as Android, in step 5 of the flow, the
    user is prompted to select the application to handle the redirect URI
    before it is parsed using a "Complete Action Using" activity. This may
    avoid a malicious application from handling it, as the user can identify
    and select the legitimate application. However, some operating systems
    (such as iOS) do not have any such scheme.

![Authorization code grant type flow]( ../../assets/img/using-wso2-identity-server/authorization-code-grant-type-flow.png) 

### Mitigating code interception attacks using PKCE

The WSO2 Identity Server supports the Proof Key for Code Exchange (PKCE)
specification, which prevents applications from exchanging a maliciously
obtained authorization code for an access token by introducing two new
OAuth parameters to the normal flow of the authorization code grant
type. PKCE is able to mitigate the attack while still being backwards
compatible with OAuth servers that do not support PKCE and without any
changes to the existing flow.

With PKCE, the client sends the following two additional parameters when
requesting an authorization code.

| Parameter               | Description                                                                                                                                                                                                                                                                                                                                                     |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| code\_challenge         | The client creates and records a secret cryptographically random string (the `             code_verifier            ` ), which is then encoded using URL safe base64 encoding to transform it into the `             code_challenge            ` .                                                                                                              |
| code\_challenge\_method | This is the method used to transform the `             code_verifier            ` into the `             code_challenge.            ` It is sent as the hash algorithm name that was used for the hashing. When the authorization code is being issued, this method is used by the token endpoint to verify the `             code_verifier            ` value. |

WSO2 Identity Server stores the values of the
`         code_challenge        ` and
`         code_challenge_method        ` parameters. When the client
exchanges the authorization code for an access token, it passes the
following additional parameter.

| Parameter      | Description                                                                                                              |
|----------------|--------------------------------------------------------------------------------------------------------------------------|
| code\_verifier | The plain text cryptographically random string that was used to generate the `             code_challenge            ` . |

WSO2 Identity Server then uses the
`         code_challenge_method        ` to transform the
`         code_verifie        ` `         r        ` sent and compares
it with the `         code_challenge        ` . If the comparison fails
or no `         code_verifier        ` is sent, WSO2 IS does not respond
with an access token.

### Configuring PKCE with WSO2 Identity Server

In order to mitigate these attacks using PKCE with WSO2 Identity Server,
you need to enable PKCE when creating the OAuth application. Follow the
steps below to do this.

1.  [Add a new service provider.](../../using-wso2-identity-server/adding-and-configuring-a-service-provider.md)
2.  Expand the **Inbound Authentication Configuration** section and then
    the **OAuth/OpenID Connect Configuration** section. Click
    **Configure**.
3.  Select the **PKCE Mandatory** checkbox and the **Support PKCE
    'Plain' Transform Algorithm** checkbox to enable PKCE.  
    ![]( ../../assets/img/using-wso2-identity-server/register-a-new-application.png)


!!! info "Related Topics" 
    -   See [Try Authorization Code Grant](../../using-wso2-identity-server/try-authorization-code-grant)
        to try out PKCE with the authorization code grant type using the
        WSO2 Playground web application.
