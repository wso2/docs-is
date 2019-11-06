# Enable Assertions In Access Tokens


Assertions are used to embed parameters into tokens in order to generate
a strong access token. You can also use these parameters later for
various other processing functionality. At the moment, the Identity
Server only supports UserName as an assertion.

By default, assertions are not enabled in WSO2 Identity Server.

You can make it enable by setting the by adding the following configuration to
`         <IS_HOME>/repository/conf/deployment.toml        ` file. .You can add a user name to an
access token when generating the key, and verify it by Base64-decoding
the retrieved access token.

``` toml
[oauth.token_generation]
include_username_in_access_token = true
```