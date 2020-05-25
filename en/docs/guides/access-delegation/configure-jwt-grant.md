# Configure JWT Grant

This page guides you through the flow involved in exchanging a JWT assertion with an OAuth 2.0 access token in order to access protected resources on behalf of the resource owner. To learn more, see [JWT Grant](../../../concepts/authorization/jwt-bearer-grant-type).

----

{!fragments/register-an-identity-provider.md!}

4. Configure the following fields.

    - Choose IDP certificate type
    - Identity Provider's JWKS Endpoint
    - Identity Provider Public Certificate
    - Alias

    For more information about these configurations, see [Identity Provider Configurations](insertlink).

5. Click **Register**. 

----

{!fragments/register-a-service-provider.md!}

3. Expand **Inbound Authentication Configuration** and then **OAuth/OpenID Connect Configuration**. 

4. Click **Configure**.   

5. Select the **urn:ietf:params:oauth:grant-type:jwt-bearer** from the **Allowed Grant Types** list.
        
6. Enter the **Callback Url**.

    !!! tip
        For more information on `Callback Url` field and other advanced configurations, see [Advanced OpenID Connect Configurations](../../guides/login/oauth-app-config-advanced).
        
7.  Configure the following fields.

    - Enable Audience Restriction
    - Audience

    For more information about these configurations, see [OAuth Configurations](../../login/oauth-app-config-advanced). 

8. Click **Add**. 

    Note that the **OAuth Client Key** and **Client Secret** are generated. You will need these values later on when sending the request to the authorization endpoint.

8.  Click **Register**.

-----

## Configure IAT 

**Optionally** you can configure the IAT (issued at) claim. It identifies the time at which the JWT was issued and can be used to determine the age of the JWT.

To configure the IAT validity period, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file. 

```toml
add config
```

----

{!fragments/self-contained-access-tokens.md!}

----

## Generate a JWT

1. Generate a request object (JWT) using the following. 

    - **iss:** This is the client key that was generated when configuring the service provider.
    - **sub:** This is the client key that was generated when configuring the service provider.
    - **aud:** https://localhost:9443/oauth2/token
    - **iat:** This is the epoch of the token issuance time (e.g., 1575024942).
    - **jit:** This is the epoch of the token expiry time (e.g., 1575107914).

    ```tab="Example"
    {
    "alg": "RS256",
    "type": "JWT"
    }

    {
    "iss": "NCkZofT51NVKK2UuQSvxPJhQOWwa",
    "sub": "NCkZofT51NVKK2UuQSvxPJhQOWwa", 
    "aud": "https://localhost:9443/oauth2/token"
    "iat": "1575024942",
    "jit": "1575107914"
    }

    {
    <Signature>
    }
    ```

2. Run the following curl command on a terminal window to obtain the access token and refresh token.

	``` powershell tab="Request Format"
	curl -i -X POST -u (Base64encoded<client_id>:<client_secret>) -k -d 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=<jwt_token>' -H 'Content-Type: application/x-www-form-urlencoded' <token_endpoint>
	``` 

	``` powershell tab="Sample Request"
	curl -i -X POST -H 'Content-Type: application/x-www-form-urlencoded' -u bBhEoE2wIpU1zB8HA3GfvZz8xxAa:RKgXUC3pTRQg9xPpNwyuTPGtnSQa -k -d 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjE0NTgxNjY5ODUsInN1YiI6ImFkbWluIiwibmJmIjoxNDU4MTA2OTg1LCJhdWQiOlsiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQzXC9vYXV0aDJcL3Rva2VuIiwid3NvMi1JUyJdLCJpc3MiOiJqd3RJRFAiLCJqdGkiOiJUb2tlbjU2NzU2IiwiaWF0IjoxNDU4MTA2OTg1fQ.ZcxdoTVEsWoil80ne42QzmsfelMWyjRZJEjUK1c2vMZJjjtrZnsWExyCA5tN6iXYFAXC_7rkFuuNSgOlBi51MNLPZw3WcgGI52j6apGEW92V2tib9zRRWOeLQLAdo8ae8KzLp7kuKZ2XunfQ2WYU9TvvLDm_vp5ruuYz3ZZrJOc' https://localhost:9443/oauth2/token 
	```

!!! tip
    If you have configured the service provider and identity provider in a tenant, add the tenant domain as a query parameter to the access token endpoint. For example, if the tenant domain is wso2.com, the access token endpoint should be `https://localhost:9443/oauth2/token tenantDomain=wso2.com.`

