# Refresh Token Grant

### Recommended use

The refresh token grant can be used when the current access token is
expired or when a new access token is needed. With this grant type, the
refresh token acts as a credential and is issued to the client by the
authorization server. Issuing a refresh token is optional and if the
authorization server issues a refresh token, it is included when issuing
an access token. WSO2 Identity Server issues refresh tokens for all
other grant types other than the **implicit and client credentials grant
types**, as recommended by the OAuth 2.0 specification.

!!! note
    
    This refresh token needs to be kept private, similar to the access
    token. When using this token, keep in mind that it issues the access
    token without a user interaction.
    

### The flow

A refresh token has to be obtained before using it with a grant type
such as the authorization code or password grant type. Using the
obtained refresh token, you can obtain a new access token along with a
renewed refresh token without having to go through any other additional
steps.

The diagram below illustrates the refresh token grant flow.

![oauth-refresh-token-diagram](../assets/img/using-wso2-identity-server/oauth-refresh-token-diagram.png)

### Configurations

1.  Configure the validity period of the refresh token by configuring the following property in the `deployment.toml` file found in the `<IS_HOME>/repository/conf/` folder. 
    ``` toml
    [oauth.token_validation]
    refresh_token_validity= "86400s"
    ```

    !!! info

        You can also provide the validity period in minutes, hours, or days using different unit suffixes as follows.
            <ul>
                <li>1 day -> refresh_token_validity= "1d"</li>
                <li>1 hour -> refresh_token_validity= "1h"</li>
                <li>1 minute -> refresh_token_validity= "1m"</li>
            </ul>

        **Note**: You cannot combine two units together. Ex: "1h 30m" is not allowed. You'll have to go with "90m" instead.

2.  Refresh tokens are renewed by default. If you wish to change this, add the following property in the `deployment.toml` file and set it to false. 
    ``` toml
    [oauth.token_renewal]
    renew_refresh_token= "false"
    ```

    !!! info

        The refresh token is renewed when the refresh grant is used to get
        an access token. A new refresh token is issued with a new expiry
        time and the previous refresh token is made inactive and can no
        longer be used. If this element is set to false, unless the refresh
        token has expired, the same refresh token is returned.

### Try it out

Run the following cURL command to try out the refresh token grant.

``` powershell
curl -k -d "grant_type=refresh_token&refresh_token=<refresh_token>" -H "Authorization: Basic <Base64Encoded(Client_Id:Client_Secret)>" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
```
