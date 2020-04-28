# Configure Refresh Token Grant

This page guides you through configuring and obtaining [refresh tokens](../../../concepts/authorization/refresh-token) using the [refresh token grant](../../../concepts/authorization/refresh-token-grant).

----

## Configure validity period

Configure the following property in the `<IS_HOME>/repository/conf/deployment.toml` file to configure the validity period of the refresh token.

``` toml
[oauth.token_validation]
refresh_token_validity= "86400s"
```

You can also provide the validity period in minutes, hours, or days using different unit suffixes as follows.

- **1 day:** `refresh_token_validity= "1d"`
- **1 hour:** `refresh_token_validity= "1h"`
- **1 minute:** `refresh_token_validity= "1m"`


!!! info
    Note that you cannot combine two units together. 

    For instance, "1h 30m" is not a valid value but you can enter "90m" instead.

----

## Configure refresh token renewal 

Refresh tokens are renewed by default. 

If you wish to change this, add the following property to the `<IS_HOME>repository/conf/deployment.toml` file and set it to **false**. 

``` toml
[oauth.token_renewal]
renew_refresh_token= "false"
```

The refresh token is renewed when the refresh grant is used to get an access token. A new refresh token is issued with a new expiry time and the previous refresh token is made inactive and can no longer be used. Unless the refresh token has expired, the same refresh token will be returned when this element is set to **false**.

-----


{!fragments/self-contained-access-tokens.md!}

----

## Obtain access token 

A refresh token can be obtained when using one of the [OAuth 2.0 grant types](oauth-grant-types.md). 

Run the following cURL command to try out the refresh token grant and obtain an access token.

``` tab="Request Format"
curl -k -d "grant_type=refresh_token&refresh_token=<refresh_token>" -H "Authorization: Basic <Base64Encoded(Client_Id:Client_Secret)>" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
```

``` tab="Sample Request"
curl -k -d "grant_type=refresh_token&refresh_token=3c285b4f-ec29-3751-9ced-74c92061b327" -H "Authorization: Basic N3dZZXliQkdDVmZMeFBtUzB6NjZXTk1mZnlNYTpXWWZ3SFVzYnNFdnd0cW1ETHVheEZfVkNRSndh" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
```

You will receive an access token with the response.

``` 
{"access_token":"b9ed0658-f187-3d39-a4f1-6d42522e1eee","refresh_token":"3426ff78-62a5-32fa-be6e-74ab69d4cbf4","token_type":"Bearer","expires_in":3600
```