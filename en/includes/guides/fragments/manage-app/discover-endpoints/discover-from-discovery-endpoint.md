<!-- markdownlint-disable-next-line -->
OpenID Connect Discovery <!-- [OpenID Connect Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html)--> provides the capability to discover the metadata such as endpoints, scopes, response types, claims, supported client authentication methods of Identity providers such as {{ product_name }}.

Application can dynamically discover the OpenID Connect identity provider metadata by calling the OpenID Connect discovery <!-- [OpenID Connect discovery](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfigurationRequest)--> endpoint, which follows the structure given below.  
 `<issuer>/.well-known/openid-configuration`.  

**Issuer of {{ product_name }}:**
``` 
{{ product_url_format }}/oauth2/token
```

**Discovery endpoint of {{ product_name }}:**
``` 
{{ product_url_format }}/oauth2/token/.well-known/openid-configuration
```

**Sample request:**

=== "cURL"

    ```  
    curl --location --request GET '{{ product_url_sample }}/oauth2/token/.well-known/openid-configuration'
    ```

=== "JavaScript - jQuery"

    ```js 
    var settings = {
        "url": "{{ product_url_sample }}/oauth2/token/.well-known/openid-configuration",
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
        url: '{{ product_url_sample }}/oauth2/token/.well-known/openid-configuration',
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
   "introspection_endpoint" : "{{ product_url_sample }}/oauth2/introspect",
   "end_session_endpoint" : "{{ product_url_sample }}/oidc/logout",
   "registration_endpoint" : "{{ product_url_sample }}/api/identity/oauth2/dcr/v1.0/register",
   "token_endpoint" : "{{ product_url_sample }}/oauth2/token",
   "jwks_uri" : "{{ product_url_sample }}/oauth2/jwks",
   "revocation_endpoint" : "{{ product_url_sample }}/oauth2/revoke",
   "authorization_endpoint" : "{{ product_url_sample }}/oauth2/authorize",
   "issuer" : "{{ product_url_sample }}/oauth2/token"
    .
    .
}
```
<br>
