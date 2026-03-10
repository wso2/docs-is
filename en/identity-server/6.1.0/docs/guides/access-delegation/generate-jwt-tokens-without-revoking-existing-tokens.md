# Generate JSON Web Tokens without revoking existing tokens

!!! note
    Instead of configuring the **JSON Web Token (JWT)** token in the
    `deployment.toml` file, you can also choose to configure
    it using the management console while configuring the OAuth application.

    Select **JWT** as the Token Issuer for a new or existing OAuth/OpenID
    connect consumer application. See
    [Advanced OpenID Connect Configurations](../../../guides/login/oauth-app-config-advanced/)
    for more information.

    ![jwt-token-issuer]({{base_path}}/assets/img/guides/jwt-token-issuer.png)

When WSO2 Identity Server receives a request to generate a new JSON Web Token (JWT), it issues a token based on the application, user, scope, and binding combination. If the server receives another request for the same combination, it revokes the existing token and returns a new one.

If you want to generate a JWT without revoking the existing token, add and configure the following property in the `<IS_HOME>/repository/conf/deployment.toml` file.

```toml
[oauth.jwt.renew_token_without_revoking_existing]
enable = true
```

!!! Note
    This feature supports token requests with the `client_crendetials` grant type by default. If you need to enable for other grant types, add the following configuration to the same `<IS_HOME>/repository/conf/deployment.toml` file.

    ```toml
    [oauth.jwt.renew_token_without_revoking_existing]
    enable = true
    allowed_grant_types = ["client_credentials","password", ...]
    ```

!!! Warning
    Enabling this feature could lead to an exponential growth of tokens. Make sure to configure token clean up scripts with proper time limits. See [Remove Unused Tokens from the Database]({{base_path}}/deploy/remove-unused-tokens-from-the-database/) for details.
