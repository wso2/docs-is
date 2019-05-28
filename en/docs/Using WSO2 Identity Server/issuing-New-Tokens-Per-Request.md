# Issuing New Tokens Per Request

When there are multiple token requests from a combination of the same
clientid, user and scopes, the same access token and refresh token are
returned for all the token requests until the token expires.

This feature issues a new access token and refresh token for each token
request after revoking the existing active token.

### Try it out

Add the following configuration within the `         <OAuth>        `
tag in the `         identity.xml        ` file in
`         <is_home>/repository/conf/identity        ` t o enable issuing
a new token per request `         .        `

``` java
<RenewTokenPerRequest>true</RenewTokenPerRequest>
```

!!! note
    
    If the [OAuthTokenGenerator extension
    point](https://docs.wso2.com/display/IS570/Extension+Points+for+OAuth#ExtensionPointsforOAuth-OAuthTokenGenerator)
    is used, it overrides the value of
    `         RenewTokenPerRequest        ` . Here, the code level changes
    take precedence over our configuration change. Hence, this configuration
    will not affect the flow of self-contained access tokens, which by
    default renew access tokens for every request. This will not affect the
    flow of the refresh token grant type either, which renews the access
    token by default, and the refresh token depending on the
    `         RenewRefreshTokenForRefreshGrant        ` configuration in the
    `         identity.xml        ` file.
    

### Test it out

After enabling the feature, create an OAuth application in the identity
server and obtain its Client ID and Client Secret. Now we can generate
the tokens by mentioning the password grant type in the cURL command
given below.

``` java
curl -v -X POST -H "Authorization: Basic <base64encoded clientId:clientSecrect>" -k -d "grant_type=password&username=admin&password=admin&scope=somescope" -H "Content-Type:application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
```

  
When you call the above URL for the second time, a new token is
generated. As long as it's the same clientID, user, and scopes, a new
token is generated regardless of which grant type you use in the second
call.

Given below are the responses to the first and the second requests.

  

-   [**Response to the first call**](#66b458eb62e84ac1ba0e9c5bd13d618d)
-   [**Response to the second call**](#52977c0e28944a3fa0163f9e5f1fdfb2)

``` java
{
"access_token": "ed074839-7efc-3c07-a5a0-a06382eba5ac",
"refresh_token": "faecb739-b065-305e-8233-fa2e9d94c10e",
"scope": "somescope",
"token_type": "Bearer",
"expires_in": 3600
}
```

``` java
{
"access_token": "1f00293e-278e-3326-89e3-eef2fcbf8b6b",
"refresh_token": "c9deea6f-a440-35bf-8fac-e0a6043df2b1",
"scope": "somescope",
"token_type": "Bearer",
"expires_in": 3600
}
```

  
You can also introspect the old access token using the following cURL
command. You can see that it is inactive now.

-   [**Request**](#f35b8eaad10c489dae7ce71f9f8475e0)
-   [**Response**](#c940f87b6ca2466c9c1008f320fca7b7)

``` java
curl -k -u admin:admin -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=<access token from 1st token API call>'https://localhost:9443/oauth2/introspect
```

``` java
{'active':false}
```
