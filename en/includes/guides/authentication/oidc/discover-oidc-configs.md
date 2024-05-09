# Discover OpenID Connect endpoints of {{ product_name }}

When you build OpenID Connect login in your application using {{ product_name }} as your identity provider, you need to get the OpenID Connect endpoints and configurations from {{ product_name }}.

You can do this by invoking the discovery endpoint API or by using the {{ product_name }} Console as explained below.

## Prerequisite

To get started, you need to have an application registered in {{ product_name }}:

- Register a [single-page app with OIDC]({{base_path}}/guides/applications/register-single-page-app/).
- Register a [web app with OIDC]({{base_path}}/guides/applications/register-oidc-web-app/).

## Use the discovery endpoint

OpenID Connect Discovery <!-- [OpenID Connect Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html)--> allows you to discover the metadata such as endpoints, scopes, response types, claims, and supported client authentication methods of identity providers such as {{ product_name }}.

Applications can dynamically discover the OpenID Connect identity provider metadata by calling the OpenID Connect discovery <!-- [OpenID Connect discovery](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfigurationRequest)--> endpoint. The structure of the request URL is as follows: `<issuer>/.well-known/openid-configuration`.  

**Issuer of {{ product_name }}**
```bash
{{ product_url_format }}/oauth2/token
```

**Discovery endpoint of {{ product_name }}**
```bash
{{ product_url_format }}/oauth2/token/.well-known/openid-configuration
```

**Sample request**

=== "cURL"

    ```bash  
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

**Sample response**
```json 
{
   "introspection_endpoint" : "{{ product_url_sample }}/oauth2/introspect",
   "end_session_endpoint" : "{{ product_url_sample }}/oidc/logout",
   "registration_endpoint" : "{{ product_url_sample }}/api/identity/oauth2/dcr/v1.0/register",
   "token_endpoint" : "{{ product_url_sample }}/oauth2/token",
   "jwks_uri" : "{{ product_url_sample }}/oauth2/jwks",
   "revocation_endpoint" : "{{ product_url_sample }}/oauth2/revoke",
   "authorization_endpoint" : "{{ product_url_sample }}/oauth2/authorize",
   "issuer" : "{{ product_url_sample }}/oauth2/token"
}
```

## Get endpoints from the console

Some applications and SDKs are not capable of dynamically resolving endpoints from OpenID Connect discovery. For such applications, you need to configure endpoints manually.

You can get the endpoints from the console as follows:

1. On the {{ product_name }}, go to **Applications**.

2. Select an OIDC application from the list.

3. Go to the **Info** tab of the application and find the server endpoints to your organization.

   ![app-help-panel-for-endpoints]({{base_path}}/assets/img/guides/applications/app-endpoint-help.png){: width="700" style="border: 0.3px solid lightgrey;"}

## What's next?

Explore how OpenID Connect endpoints are used when you implement login to your applications:

- Implement login for single-page applications [using the authorization code flow with PKCE]({{base_path}}/guides/authentication/oidc/implement-auth-code-with-pkce/).
- Implement login for traditional web applications [using the authorization code flow]({{base_path}}/guides/authentication/oidc/implement-auth-code/).
