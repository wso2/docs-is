# Microprofile JWT 1.0 support for IS

[Microprofile
JWT](https://www.eclipse.org/community/eclipse_newsletter/2017/september/article2.php)
is a specification focused on providing role-based access control for
microservices. The focus of the MP-JWT specification is the definition
of the required format of the JWT used as the basis for interoperable
authentication and authorization.

The MP-JWT specification introduces two new claims which need to be
present in the issued JWT token in order to be usable as an
authentication and authorization token.

These claims are:

-   **"upn":** A human-readable claim that uniquely identifies the
    subject or user principal of the token, across the MicroProfile
    services the token will be accessed with.
-   **"groups":** The token subject's group memberships that will be
    mapped to Java EE style application-level roles in the MicroProfile
    service container.

The set of minimum required claims in a compatible JWT token is listed
below:

<table style="width:100%;">
<colgroup>
<col style="width: 7%" />
<col style="width: 75%" />
<col style="width: 16%" />
</colgroup>
<thead>
<tr class="header">
<th>Claim name</th>
<th>Description</th>
<th>Reference</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>alg</td>
<td>This JOSE header parameter identifies the cryptographic algorithm used to secure the JWT. MP-JWT requires the use of the RSASSA-PKCS1-v1_5 SHA-256 algorithm and must be specified as "RS256".</td>
<td><a href="https://tools.ietf.org/html/rfc7515#section-4.1.1">RFC7515, Section 4.1.1</a></td>
</tr>
<tr class="even">
<td>kid</td>
<td>This JOSE header parameter is a hint indicating which key was used to secure the JWT.</td>
<td><a href="https://tools.ietf.org/html/rfc7515#section-4.1.4">RFC7515, Section-4.1.4</a></td>
</tr>
<tr class="odd">
<td>iss</td>
<td>The token issuer.</td>
<td><a href="https://tools.ietf.org/html/rfc7519#section-4.1.1">RFC7519, Section 4.1.1</a></td>
</tr>
<tr class="even">
<td>sub</td>
<td>Identifies the principal that is the subject of the JWT. See the "upn" claim for how this relates to the runtime <code>             java.security.Principal            </code> .</td>
<td><a href="https://tools.ietf.org/html/rfc7519#section-4.1.2">RFC7519, Section 4.1.2</a></td>
</tr>
<tr class="odd">
<td>aud</td>
<td>Identifies the recipients that the JWT is intended for</td>
<td><a href="https://tools.ietf.org/html/rfc7519#section-4.1.3">RFC7519, Section 4.1.3</a></td>
</tr>
<tr class="even">
<td>exp</td>
<td>Identifies the expiration time on or after which the JWT MUST NOT be accepted for processing*</td>
<td><a href="https://tools.ietf.org/html/rfc7519#section-4.1.4">RFC7519, Section 4.1.4</a></td>
</tr>
<tr class="odd">
<td>iat</td>
<td>Identifies the time at which the issuer generated the JWT*</td>
<td><a href="https://tools.ietf.org/html/rfc7519#section-4.1.6">RFC7519, Section 4.1.6</a></td>
</tr>
<tr class="even">
<td>jti</td>
<td>Provides a unique identifier for the JWT</td>
<td><p><a href="https://tools.ietf.org/html/rfc7519#section-4.1.7">RFC7519, Section 4.1.7</a></p></td>
</tr>
<tr class="odd">
<td>upn</td>
<td>Provides the user principal name in the java.security.Principal interface**</td>
<td><p><a href="https://www.eclipse.org/community/eclipse_newsletter/2017/september/article2.php">MP-JWT 1.0 specification</a></p></td>
</tr>
<tr class="even">
<td>groups</td>
<td>Provides the list of group names that have been assigned to the principal of the MP-JWT. This typically will require a mapping at the application container level to application deployment roles, but a one-to-one between group names and application role names is required to be performed in addition to any other mapping.</td>
<td><p><a href="https://www.eclipse.org/community/eclipse_newsletter/2017/september/article2.php">MP-JWT 1.0 specification</a></p></td>
</tr>
</tbody>
</table>

### Generating MP-JWT Compatible JWT token using Identity Server

WSO2 Identity Server defines a set of claims that can be configured for
situations where a service provider needs some information about the
user from the Identity Server where the service provider authenticates.
Therefore if you need to generate an MP-JWT compatible token, all you
have to do is requesting the claims
<http://wso2.org/claims/userprincipal> and <http://wso2.org/claims/role>
when the service provider is created.

Let's see how this can be done.

#### Configuring the service provider

1.  Log in to identity server using admin credentials.

2.  Configure a service provider.

    1.  Give a name and a description and click **Register**.
        ![add-new-sp-1]( ../assets/img/using-wso2-identity-server/add-new-sp-1.png)

    2.  Navigate to the claim configuration section and add the
        following requested claims:  

        <http://wso2.org/claims/userprincipal>  
        <http://wso2.org/claims/role>
        ![mandatory-claims]( ../assets/img/using-wso2-identity-server/mandatory-claims.png)

    3.  Configure OAuth/OpenID Connect Configuration in Inbound
        Authentication Configuration section.  
        ![configure-oauth]( ../assets/img/using-wso2-identity-server/configure-oauth.png)
        Now the generated ID token using this client is compatible with
        the MP-JWT specification.

#### Testing it out

1.  Configure the web app (provide callback URL as
    <https://localhost:9443> )

2.  Run the following cURL command (Replace the generated client\_key
    and client secret)

    **Request**

    ``` xml
    curl --user <client_key>:<client_secret>  -k -d "grant_type=password&username=<username>&password=<password>&scope=openid" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
    ```

    **Response**

    ``` xml
    {"access_token":"16eaa123-122a-3bdd-9c55-e4cc12d350ef","refresh_token":"25cbe580-672e-3969-b007-2fb4e4381378","scope":"openid","id_token":"eyJ4NXQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJraWQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoidEhwckZ4UXRrdDF0Um9zRGozcFFXdyIsInN1YiI6ImNhbWVyb24iLCJhdWQiOlsieXFEUTJUU25LX25JZVJtZjBRNmlyeVVMQU9JYSJdLCJ1cG4iOiJjYW1lcm9uIiwiYXpwIjoieXFEUTJUU25LX25JZVJtZjBRNmlyeVVMQU9JYSIsImFtciI6WyJwYXNzd29yZCJdLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDNcL29hdXRoMlwvdG9rZW4iLCJncm91cHMiOlsiRGVidG9yIiwiSW50ZXJuYWxcL2V2ZXJ5b25lIl0sImV4cCI6MTUyNTc1ODQxOCwiaWF0IjoxNTI1NzU0ODE4fQ.OAawdar3iybUQJPxEJXvKZ3NIypdD5QhEfv7limhZ3pmar8vHCt0gocpuzGU63mbqVkUrnEejw5PP0UdMNDNNIGqfeLnourbWYBlu4QgS66NKnJoi-S8zWaTXPrSWUFyB-S4OhT7L-d2IWeTno0iNhvL1qMrxkbKPYO-zXyr4-VbP4Radepnf0FhhaNDdQhtMLiG6iF8wwXmaZ2doNYCz98HDZZHUHrv_7ZlYlThAaDH7pxmekt_CRJN0PMWMZBezn53UjFsvzIpYF77wZZPLGxwLaNqVkm8WcB8TIPd-rNXQMfuJTVsyP2yyAd9dFG7MTJszjQyb9BonoYJL1gEOw","token_type":"Bearer","expires_in":3600}
    ```

    You can also run the following cURL command. Instead of passing the
    client\_key and client\_secret separately, you can send it with the
    authorization header as follows:

    In order to send the client credentials with the Authorization
    header, you need to encode the client credentials as follows:

    ``` java tab="<Linux/Mac>"
    echo -n <CLIENT_KEY>:<CLIENT_SECRET> | base64
    ```

    ``` java tab="Windows"
    powershell "[convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes(\"<CLIENT_KEY>:<CLIENT_SECRET>\"))
    ```

    **Request**

    ``` xml
    curl -H "Authorization: Basic <BASE64 ENCODED COMBINED CLIENT ID AND SECRET>" -H "Content-Type: application/x-www-form-urlencoded" -k -d "grant_type=password&username=<admin>&password=<password>&scope=openid" https://localhost:9443/oauth2/token
    ```

    **Decoded response (Sample)**

    ``` xml
    {
      "x5t": "NTAxZmMxNDMyZDg3MTU1ZGM0MzEzODJhZWI4NDNlZDU1OGFkNjFiMQ",
      "kid": "NTAxZmMxNDMyZDg3MTU1ZGM0MzEzODJhZWI4NDNlZDU1OGFkNjFiMQ",
      "alg": "RS256"
    }
    {
      "at_hash": "tHprFxQtkt1tRosDj3pQWw",
      "sub": "cameron",
      "aud": [
        "yqDQ2TSnK_nIeRmf0Q6iryULAOIa"
      ],
      "upn": "cameron",
      "azp": "yqDQ2TSnK_nIeRmf0Q6iryULAOIa",
      "amr": [
        "password"
      ],
      "iss": "https://localhost:9443/oauth2/token",
      "groups": [
        "Debtor",
        "Internal/everyone"
      ],
      "exp": 1525758418,
      "iat": 1525754818
    }
    ```

    As you can see in the decoded response the “upn” and “groups” claims
    which map to username and the role list respectively are added to
    the issued JWT token.
