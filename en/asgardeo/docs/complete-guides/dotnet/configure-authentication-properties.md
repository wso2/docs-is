---
template: templates/complete-guide.html
heading: Configure authentication properties
read_time: 2 min
---

The information that was noted in step 3 can now be utilized in the created .NET application.

For the purpose of this guide, these properties will be added to the `launchSettings.json` file. You can, however, use any other configuration source according to your preference. The following are the properties that you need to configure.

- Authorization Endpoint
- Token Endpoint
- JWKS URI
- Logout Endpoint
- Authority
- Client ID
- Client Secret
- Metadata address

An example configuration is shown below (placeholders have to be replaced with the actual values).

```json hl_lines="10-17"
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
            "CLIENT_SECRET": "<client_id>",
            "METADATA_ADDRESS": "https://api.asgardeo.io/t/<org>/oauth2/token/.well-known/openid-configuration"
        }
    },
}
```