# JWT Token Generation Without Revoking Existing Tokens

When a request is received for generating a new **JWT** token, a new token is generated based on "APPLICATION, USER, SCOPE, BINDING" combinations.
If a token request is received for the same combination again, WSO2 IS revokes the existing token and returns a new token.

If you want to generate a JWT token without revoking the existing token, add and configure the following property in the
`deployment.toml` file found in the `<IS_HOME>/repository/conf` folder.

```toml
[oauth.jwt.renew_token_without_revoking_existing]
enable = true
```

!!! Note
    This feature is available for token request with the `client_crendetials` grant type by default. If you need to enable for
    other grant types, add the following configuration to `deployment.toml` file.

    ```toml
    [oauth.jwt.renew_token_without_revoking_existing]
    enable = true
    allowed_grant_types = ["client_credentials","password", ...]
    ```

!!! Warning
    Enabling this feature could lead to an exponential growth of tokens.
    Be sure to configure token clean up scripts with proper time limits.
    See [Remove Unused Tokens from the Database](../../deploy/remove-unused-tokens-from-the-database/) for details.
