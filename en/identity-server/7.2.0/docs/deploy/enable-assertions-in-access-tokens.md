# Enable Assertions in Access Tokens

Assertions are used to embed parameters into tokens in order to generate a strong access token. You can also use these parameters later for various other processing functionalities. At the moment, the WSO2 Identity Server only supports `UserName` as an assertion.

By default, assertions are not enabled in the WSO2 Identity Server.

You can enable it by adding the following configuration to the  `<IS_HOME>/repository/conf/deployment.toml` file. You can add a username to an access token when generating the key, and verify it by Base64-decoding the retrieved access token.

``` toml
[oauth.token_generation]
include_username_in_access_token = true
```