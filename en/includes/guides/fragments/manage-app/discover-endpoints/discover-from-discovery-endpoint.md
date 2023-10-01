<!-- markdownlint-disable-next-line -->
OpenID Connect Discovery <!-- [OpenID Connect Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html)--> provides the capability to discover the metadata such as endpoints, scopes, response types, claims, supported client authentication methods of Identity providers such as {{ product_name }}.

Application can dynamically discover the OpenID Connect identity provider metadata by calling the OpenID Connect discovery <!-- [OpenID Connect discovery](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfigurationRequest)--> endpoint, which follows the structure given below.  
 `<issuer>/.well-known/openid-configuration`.  

**Issuer of {{ product_name }}:**
``` 
https://api.asgardeo.io/t/<organization_name>/oauth2/token
```

**Discovery endpoint of {{ product_name }}:**
``` 
https://api.asgardeo.io/t/<organization_name>/oauth2/token/.well-known/openid-configuration
```

**Sample request:**

=== "cURL"

    ```  
    curl --location --request GET 'https://api.asgardeo.io/t/bifrost/oauth2/token/.well-known/openid-configuration'
    ```

=== "JavaScript - jQuery"

    ```js 
    var settings = {
        "url": "https://api.asgardeo.io/t/bifrost/oauth2/token/.well-known/openid-configuration",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
    ```

=== "Nodejs - Axios"

    ```js 
    var axios = require('axios');

    var config = {
        method: 'get',
        url: 'https://api.asgardeo.io/t/bifrost/oauth2/token/.well-known/openid-configuration',
        headers: {}
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    ```

**Sample response:**

```json
{
    .
    .
   "introspection_endpoint" : "https://api.asgardeo.io/t/bifrost/oauth2/introspect",
   "end_session_endpoint" : "https://api.asgardeo.io/t/bifrost/oidc/logout",
   "registration_endpoint" : "https://api.asgardeo.io/t/bifrost/api/identity/oauth2/dcr/v1.0/register",
   "token_endpoint" : "https://api.asgardeo.io/t/bifrost/oauth2/token",
   "jwks_uri" : "https://api.asgardeo.io/t/bifrost/oauth2/jwks",
   "revocation_endpoint" : "https://api.asgardeo.io/t/bifrost/oauth2/revoke",
   "authorization_endpoint" : "https://api.asgardeo.io/t/bifrost/oauth2/authorize",
   "issuer" : "https://api.asgardeo.io/t/bifrost/oauth2/token"
    .
    .
}
```
<br>
