# Configuring JWT Grant Type

The JSON Web Token bearer grant is simply a JSON string containing claim
values that will be evaluated and validated by the JWT Grant Handlers at
the Authorization Server end before issuing an access token.

WSO2 Identity Server as an OAuth 2.0 Authorization Server can accept
JSON Web Token(JWT) Assertions from OAuth 2.0 clients as a means of
resource owner authentication and authorization. Additionally, it can
exchange it with OAuth 2.0 access tokens in order to access protected
resources on behalf of the resource owner.

!!! info 
    To download the grant type, go
    to [https://store.wso2.com/store/assets/isconnector/jwtgrant](https://store.wso2.com/store/assets/isconnector/list?q=%22_default%22%3A%22jwt%22)

This topic provides instructions on how to configure the JWT grant type.
See the following sections for more information.

### Deploying artifacts

1.  Place the
    `           org.wso2.carbon.identity.oauth2.grant.jwt-1.0.5.jar          `
    downloaded from
    [store](https://store.wso2.com/store/assets/isconnector/list?q=%22_default%22%3A%22jwt%22)
    in the
    `           <IS_HOME>/repository/components/dropins          `
    directory.

    !!! note
    
        If you want to upgrade the JWT Grant Type (.jar) that is available
        in your existing WSO2 Identity Server distribution, see [upgrade
        instructions.](../../develop/upgrading-an-authenticator)
    

2.  To register the JWT grant type, configure the
    `           <IS_HOME>/repository/conf/identity/identity.xml          `
    file by adding a new entry under the
    `           <OAuth><SupportedGrantTypes>          ` element. Add a
    unique identifier between the `           <GrantTypeName>          `
    tags as seen in the code block below.

    ``` xml
    <SupportedGrantType>
        <GrantTypeName>urn:ietf:params:oauth:grant-type:jwt-bearer</GrantTypeName>
        <GrantTypeHandlerImplClass>org.wso2.carbon.identity.oauth2.grant.jwt.JWTBearerGrantHandler</GrantTypeHandlerImplClass>
        <GrantTypeValidatorImplClass>org.wso2.carbon.identity.oauth2.grant.jwt.JWTGrantValidator</GrantTypeValidatorImplClass>
    </SupportedGrantType>
    ```

3.  To store `           AUTHZ_USER          ` and
    `           USER_DOMAIN          ` values separately, add the
    `           SplitAuthzUser3Way          ` property to the OAuth
    section of the
    `           <IS_HOME>/repository/conf/identity/identity.xml          `
    file as follows:
    `           <SplitAuthzUser3Way>true</SplitAuthzUser3Way>          `

4.  Add the audience values to the JWT token (ID token) in the
    `           <IS_HOME>/repository/conf/identity/identity.xml          `
    file as follows

    ``` xml
        <Audiences>
            <Audience>https://localhost:9443/oauth2/token</Audience>
        </Audiences>
    ```

5.  Restart the server.

### Configure the JWT grant type

1.  Sign in to the WSO2 Identity Server. Enter your username and
    password to log on to the [Management
    Console](../../setup/getting-started-with-the-management-console)
    .
2.  In the **Identity Providers** section under the **Main** tab of the
    management console, click **Add**.
3.  Provide the following values to configure the IDP:
    -   **Identity Provider Name:** Enter a issuer name (this is used to
        generate the JWT assertion) as the identity provider name.
    -   **Identity Provider Public Certificate :** The certificate used
        to sign the JWT assertion. You can find more information about
        adding certificate in [Configuring an Identity
        Provider](../../learn/adding-and-configuring-an-identity-provider)
        .

    -   **Alias** : Give the name of the alias if the Identity Provider
        identifies this token endpoint by an alias (e.g.,
        `                         https://localhost:9443/oauth2/token)                       `

    See [Adding a new identity
    provider](../../learn/adding-and-configuring-an-identity-provider)
    for more information.  
      
    ![](../../assets/img/50507537/50685934.png) 
4.  Navigate to the **Main** menu to access the **Identity** menu. Click
    **Add** under **Service Providers**.
5.  Fill in the **Service Provider Name** and provide a brief
    **Description** of the service provider. See [Adding a Service
    Provider](../../learn/adding-and-configuring-a-service-provider)
    for more information.
6.  Expand the **OAuth/OpenID Connect Configuration** and click
    **Configure**.
7.  Enter a **Callback URL**. For example, use
    `                     http://localhost:8080/playground2/oauth2client                   `
    and click **Add**.
8.  The **OAuth Client Key** and **OAuth Client Secret** will now be
    visible.  
    ![](../../assets/img/50507537/50685935.png) 

!!! note 
    While configuring the JWT grant type, the IAT validating time
    period can also be configured in the **identity.xml** file.
    
    IAT validity period is configured as 30 minutes by default. This can be
    modified by changing the value in the **identity.xml** file in
    **\<IS\_HOME\>/repository/conf** as shown below.
    
    ``` xml
        <JWTGrant>
            <!-- Validate issued at time (iat) of JWT token. The validity can be set using 'IATValidity' configuration.
                Default value is 'true'.
                -->
            <EnableIATValidation>true</EnableIATValidation>
            <!-- Reject the JWT if the iat of JWT is pass a certain time period. Time period is in minutes.
                'EnableIATValidation' configuration should be set to 'true' in order to make use of the validity period.
                Default value is '30' minutes.
                -->
            <IATValidityPeriod>30</IATValidityPeriod>
        </JWTGrant>
    ```
    

### The flow

The CURL commands below can be used to retrieve the access token and
refresh the token using a JWT.

**Request**

``` java
curl -i -X POST -u <clientid>:<clientsecret> -k -d 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=<JWT>' -H 'Content-Type: application/x-www-form-urlencoded' https://localhost:9443/oauth2/token
```

The **-u** flag should specify the “
`         <Client Id>:<Client Secret>        ` ” value. The assertion
parameter value is the signed base64 encoded JWT. The value of the
assertion parameter **MUST** contain a **single JWT**. You can refer
[JWT Bearer Grant](#jwt-bearer-grant) for more
information about assertion.

!!! info 
    If you have configured the service provider and identity provider in a
    tenant, you have to add the tenant domain as a query parameter to the
    access token endpoint.

    If the tenant domain is *wso2.com*, the access token endpoint will be
    as follows.

    Access Token Endpoint:
    https://localhost:9443/oauth2/token?tenantDomain=wso2.com

**Sample request**

``` java
curl -i -X POST -H 'Content-Type: application/x-www-form-urlencoded' -u bBhEoE2wIpU1zB8HA3GfvZz8xxAa:RKgXUC3pTRQg9xPpNwyuTPGtnSQa -k -d 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjE0NTgxNjY5ODUsInN1YiI6ImFkbWluIiwibmJmIjoxNDU4MTA2OTg1LCJhdWQiOlsiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQzXC9vYXV0aDJcL3Rva2VuIiwid3NvMi1JUyJdLCJpc3MiOiJqd3RJRFAiLCJqdGkiOiJUb2tlbjU2NzU2IiwiaWF0IjoxNDU4MTA2OTg1fQ.ZcxdoTVEsWoil80ne42QzmsfelMWyjRZJEjUK1c2vMZJjjtrZnsWExyCA5tN6iXYFAXC_7rkFuuNSgOlBi51MNLPZw3WcgGI52j6apGEW92V2tib9zRRWOeLQLAdo8ae8KzLp7kuKZ2XunfQ2WYU9TvvLDm_vp5ruuYz3ZZrJOc' https://localhost:9443/oauth2/token
```

You would have now received the response from the token endpoint. The
response would contain the access token, refresh token, expiry time and
token type .

**Sample response**

``` java
{"token_type":"Bearer","expires_in":3600,"refresh_token":"b1b4b78e2b0ef4956acb90f2e38a8833","access_token":"615ebcc943be052cf6dc27c6ec578816"} 
```

<a name="jwt-bearer-grant"> </a>

### JWT Bearer Grant

JWT contains three parts that are separated by dots ".": header,
payload, and a signature. The header identifies which algorithm is used
to generate the signature.

For example, see the following code block.

**Sample header**

``` groovy
{
    "alg":"RS256"
}
```

The payload contains the claims mentioned below:

-   `          iss         ` (issuer) - The JWT must contain an
    `          iss         ` (issuer) claim that contains a unique
    identifier that identifies the identity provider that issued the
    JWT.
-   `          sub         ` (subject) - The JWT must contain a
    `          sub         ` (subject) claim that identifies the entity
    that the identity provider or the entity that issued the JWT vouches
    for.
-   `          aud         ` (audience) - The JWT must contain an
    `          aud         ` (audience) claim which containing a value
    that identifies the authorization server as an intended audience.
    This value should be registered as token endpoint alias in the
    Identity Provider.
-   `          exp         ` (expiration time) - The JWT must contain an
    `          exp         ` (expiration) claim that limits the time
    window during which the JWT can be used.
-   `          nbf         ` (not before) - The JWT may contain a
    `          nbf         ` (not before time) claim that forces a JWT
    to be used only after a specified time.
-   `          iat         ` (issued at) - The JWT may contain an
    `          iat         ` (issued at) claim that identifies the time
    at which the JWT was issued.
-   `          jti         ` (json web token Id) - The JWT may contain
    `          jti         ` (JWT ID) claim that provides a unique
    identifier for the token.
-   Other custom claims - JWT may contain claims other than the above
    mentioned ones. This is the extension point of the JWT
    specification.

For example, see the following code block.

**Sample payload**

``` groovy
{  
   "sub":"admin",
   "aud":[  
      "https://localhost:9443/oauth2/token"
   ],
   "nbf":1507546100,
   "iss":"jwtIDP",
   "exp":1507606100,
   "iat":1507546100,
   "jti":"Token56756"
}
```

The signature is calculated by base64 URL encoding the header and
payload and concatenating them with a period as a separator and signing
it:

`                              Signature = sign(encodeBase64(header) + '.' + encodeBase64(payload))                           `

The signature must then be base64 URL encoded. JWT assertion can be
generated by concatenating these three encoded values with a separator
dot ".".

***assertion*** = ***encodeBase64(header) + '.' + encodeBase64(payload)
+ '.' + ***encodeBase64(s****** ***ignature)***

The result is as follows:

**Sample assertion**

``` java
    eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImF1ZCI6WyJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDNcL29hdXRoMlwvdG9rZW4iXSwibmJmIjoxNTA3NTQ2MTAwLCJpc3MiOiJqd3RJRFAiLCJleHAiOjE1MDc2MDYxMDAsImlhdCI6MTUwNzU0NjEwMCwianRpIjoiVG9rZW41Njc1NiJ9.iGMhjibB0W2QFQlM27gnHp6z47Eybv8cAHk2o2i-xqo2S4uJ_1VppFI4CCJXTj4qzV9vmkJ5HKNAayiTa6wOMXGL4XnwYwpOAoKXvboznlEDNRpw3htW34nLvyUu6PjHbdvAPVjh8kPRwf7esRr2p-luecGvC21mjWdhyGzM4hE
```
