# OAuth2 Token Validation and Introspection

WSO2 Identity Server provides a SOAP service to validate the OAuth2
token it has issued, which can be used by the resource server.

-   [Invoke the OAuth Introspection
    Endpoint](../../using-wso2-identity-server/invoke-the-oauth-introspection-endpoint)
-   [OAuth Token Validation Using SOAP
    Service](../../using-wso2-identity-server/oauth-token-validation-using-soap-service)
-   [OAuth Transaction Logs](../../using-wso2-identity-server/oauth-transaction-logs)

**However from these 2 methods, the recommended approach is to use the
REST API given above.**

If subject identifier in the token validation response needs to adhere
to the " Use tenant domain in local subject identifier" and " Use user
store domain in local subject identifier" configurations in service
provider, add the following configuration to the
`<IS_HOME>/repository/conf/deployment.toml` file .

``` toml
[oauth]
validation_response_subject_identifier_format= "app_configured"
```

-   Default value of this property is false.
-   If the value is false, subject identifier will be set as the fully
    qualified username.
