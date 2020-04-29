# Issue New Tokens Per Request

When there are multiple token requests from a combination of the same client ID, user, and scopes, the same access token and refresh token are
returned for all the token requests until the token expires.

Alternatively, if required, you can also configure a new access token and refresh token to be issued for each token request after revoking the existing active token. Follow the steps given below to do this. 

----

## Enable issuing new tokens

Add the following configuration to the `deployment.toml` file in `<IS_HOME>/repository/conf/` folder to enable issuing a new token per request.

``` toml
[oauth.token_renewal] 
renew_access_token_per_request = true
```

!!! note
    If the [OAuthTokenGenerator extension point](insertlink) is used, it overrides the value of `renew_access_token_per_request`. 
    Here, the code level changes take precedence over the configuration change. 
    
    Hence, this configuration will not affect the flow of self-contained access tokens, which by default renews access tokens for every request. This will not affect the flow of the refresh token grant type either, which renews the access token by default, and the refresh token depending on the `renew_access_token_per_request` configuration in the `deployment.toml` file.
    
----

{!fragments/register-a-service-provider.md!}

----

{!fragments/oauth-app-config-basic.md!}

## Try it out

Once you have created an OAuth application in WSO2 Identity Server and obtained its Client ID and Client Secret, you can generate
the tokens by mentioning the password grant type in the cURL command given below.

``` java tab="Request Format"
curl -v -X POST -H "Authorization: Basic <base64encoded clientId:clientSecrect>" -k -d "grant_type=password&username=<username>&password=<password>&scope=<scope>" -H "Content-Type:application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
```

``` java tab="Sample Request"
curl -v -X POST -H "Authorization: Basic <base64encoded clientId:clientSecrect>" -k -d "grant_type=password&username=admin&password=admin&scope=openid" -H "Content-Type:application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
```
  
When you call the above URL for the second time, a new token is generated. As long as it's the same client ID, user, and scope, a new token is generated regardless of which grant type you use in the second call.

Given below are sample responses to the first and the second requests.

``` java tab="Response to the first call"
{
"access_token": "ed074839-7efc-3c07-a5a0-a06382eba5ac",
"refresh_token": "faecb739-b065-305e-8233-fa2e9d94c10e",
"scope": "somescope",
"token_type": "Bearer",
"expires_in": 3600
}
```

``` java tab="Response to the second call"
{
"access_token": "1f00293e-278e-3326-89e3-eef2fcbf8b6b",
"refresh_token": "c9deea6f-a440-35bf-8fac-e0a6043df2b1",
"scope": "somescope",
"token_type": "Bearer",
"expires_in": 3600
}
```
  
You can also introspect the old access token using the following cURL command. You can see that it is inactive now.

``` java tab="Request"
curl -k -u admin:admin -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=<access token from 1st token API call>'https://localhost:9443/oauth2/introspect
```

``` java tab="Response"
{'active':false}
```
