{% set product_name = "WSO2 Identity Server" %}
{% set grant_type_configs_note = '
!!! note
    WSO2 Identity Server provides more control over issuing id tokens and user claims for client-credential grant type.
    To facilitate this, add the following configurations to the `deployment.toml` file found in the
    `<IS_HOME>/repository/conf` folder in order to register new `ScopeHandlers` and `ScopeValidators`.

    ``` toml
    [oauth.custom_scope_validator]
    class = "org.fully.qualified.class.name.CustomScopeValidator"
    ```

    Further, by configuring the `<IdTokenAllowed>` property to `true` or `false` along with the above configuration, 
    you can turn on or turn off the process of issuing ID tokens for the grant types that have the `openid` scope. 
    By default, `IdTokenAllowed` is set to `true`, you can allow it to issue `id_tokens` for all grant types that have 
    the `openid` scope. By configuring it to false, you can stop issuing ID tokens.  
    **Note:** You can not turn off the process of issuing ID tokens for the `authorization_code` grant type.

    By configuring the `<IsRefreshTokenAllowed>` property to `true` or `false` along with the above configuration, 
    you can turn on or turn on the process of issuing refresh tokens. By default, `IsRefreshTokenAllowed` is set to 
    `true`, and you can allow it to issue refresh tokens for all grant types. By configuring it to `false`, you can stop 
    issuing refresh tokens.  
    **Note:** By default, issuing ID token for `client_credentials` grant type is disabled as it is logically invalid.

    By configuring the `<PublicClientAllowed>` property to `true` or `false` along with the above configuration, 
    you can decide whether the grant type can be used by public clients or not. By default, `PublicClientAllowed`is set 
    to `true`, and you can allow it to be used by public clients. By configuring it to `false`, you can stop using the 
    grant type in public clients.   
    **Note:** By default, using `client_credentials` grant type for public clients is disabled as it is logically invalid.
'%}

{% include "../../../../includes/references/grant-types.md" %}