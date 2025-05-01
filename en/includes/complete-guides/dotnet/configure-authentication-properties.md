

The information that was noted in step 3 can now be utilized in the created .NET application.

For the purpose of this guide, these properties will be added to the `/Properties/launchSettings.json` file. You can, however, use any other configuration source according to your preference. The following are the properties that you need to configure.

- Authorization Endpoint
- Token Endpoint
- JWKS URI
- Logout Endpoint
- Authority
- Client ID
- Client Secret
- Metadata address

An example configuration is shown below (placeholders have to be replaced with the actual values). Make sure to add the configuration properties to the profile that is utilized for running the application. In this case, we will be using only the `https` profile. The complete `/Properties/launchSettings.json` file we will be utilizing is shown below.

```json title="launchSettings.json" hl_lines="12-19"
{
  "$schema": "https://json.schemastore.org/launchsettings.json",
  "profiles": {
    "https": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "inspectUri": "{wsProtocol}://{url.hostname}:{url.port}/_framework/debug/ws-proxy?browser={browserInspectUri}",
      "applicationUrl": "https://localhost:5001;http://localhost:5000",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development",
        "AUTHORIZATION_ENDPOINT": "https://api.asgardeo.io/t/<org>/oauth2/authorize",
        "TOKEN_ENDPOINT": "https://api.asgardeo.io/t/<org>/oauth2/token",
        "JWKS_URI": "https://api.asgardeo.io/t/<org>/oauth2/jwks",
        "LOGOUT_URI": "https://api.asgardeo.io/t/<org>/oidc/logout",
        "AUTHORITY": "https://api.asgardeo.io/t/<org>/",
        "CLIENT_ID": "<client_id>",
        "CLIENT_SECRET": "<client_secret>",
        "METADATA_ADDRESS": "https://api.asgardeo.io/t/<org>/oauth2/token/.well-known/openid-configuration"
      }
    },
  }
}
```

## Add authentication package 

As the next step we have to add `Microsoft.AspNetCore.Authentication.OpenIdConnect` package to our application. This package allows your .NET app to authenticate users using an OIDC identity providers such as Asgardeo and WSO2 Identity Server and also manage authentication tokens. 

When adding `Microsoft.AspNetCore.Authentication.OpenIdConnect` package, make sure to pick the right version as per your .Net SDK installation. 

=== ".Net 8 SDK "

    ```bash
    dotnet add package Microsoft.AspNetCore.Authentication.OpenIdConnect --version 8.0.0
    ```

=== ".Net 9 SDK"

    ```bash
    dotnet add package Microsoft.AspNetCore.Authentication.OpenIdConnect --version 9.0.0
    ```

Now that we have configured the authentication properties, we can proceed to implement the authentication logic in the .NET application.
