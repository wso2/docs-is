### Self-contained access tokens

<<<<<<<< HEAD:en/identity-server/6.1.0/docs/includes/self-contained-access-tokens.md
Optionally, you can configure WSO2 Identity Server to issue [self-contained acccess tokens](../../references/concepts/authorization/access-token.md) for any of the known OAuth 2.0 grant types.
========
Optionally, you can configure WSO2 Identity Server to issue [self-contained acccess tokens](../../references/concepts/authorization/access-token.md) for any of the known OAuth 2.0 grant types. 
>>>>>>>> 6.0.0-docs-old:en/identity-server/6.0.0/docs/includes/self-contained-access-tokens.md

1. Add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file.

    ```toml
    [oauth.token_generation]
    access_token_type= "self_contained" 
    ```

2. Restart WSO2 Identity Server.

3. Initiate an access token request to the WSO2 Identity Server, over a known grant type. 

    You will receive a JWT self-contained access token in response to the request. 