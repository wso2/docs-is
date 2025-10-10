# Discover OpenID Connect endpoints and configurations

When building OpenID Connect (OIDC) login in your application using {{product_name}} as your identity provider, your application needs the relevant OIDC endpoints and configurations. Your application can get these endpoints in **two main steps**:

1. **Discover the issuer (Optional)**:

    When the issuer URL of the OpenID Provider is not known in advance, your application can dynamically discover it using the **WebFinger** endpoint.

2. **Retrieve the OpenID Connect metadata from the issuer**:

    Once your application discovers the issuer URL (either via WebFinger or because it’s already configured), your application can fetch the OpenID Connect metadata. This includes all the necessary endpoints (authorization, token, introspection, revocation, logout, etc.), supported scopes, response types, claims, and client authentication methods.

For clients or SDKs that cannot dynamically fetch these endpoints, you can get them manually from the {{product_name}} Console.

This guide explains how to discover the OpenID Connect endpoints of {{ product_name }} using both the API and the Console.

## Prerequisites

To get started, you need to have an application registered in {{ product_name }}:

- Register a [single-page app with OIDC]({{base_path}}/guides/applications/register-single-page-app/).
- Register a [web app with OIDC]({{base_path}}/guides/applications/register-oidc-web-app/).

## Use the API

This section explains how your application can dynamically discover the OpenID Connect endpoints.

### Step 1: Discover the issuer

OpenID Provider issuer discovery, process allows a client application to automatically find the location (issuer URL) of the OpenID Provider.

You can use the following endpoint to retrieve the issuer information.

```bash
{{ product_url_format }}/.well-known/webfinger
```

The endpoint accepts the following required parameters.

 <table>
 <thead>
 <tr class="header">
 <th>Parameter</th>
 <th>Description</th>
 <th>Sample Value</th>
 </tr>
 </thead>
 <tbody>
 <tr class="odd">
 <td><code>resource</code></td>
 <td>The identifier of the user whose OpenID Provider (issuer) you want to discover.</td>
 <td>acct:admin@localhost</td>
 </tr>
 <tr class="even">
 <td><code>host</code></td>
 <td>Specify the domain or server that hosts the WebFinger service.</td>
 <td>localhost:9443</td>
 </tr>
 <tr class="odd">
 <td><code>rel</code></td>
 <td>Specify the URI that identifies the type of service you want to locate.</td>
 <td>http://openid.net/specs/connect/1.0/issuer</td>
 </tr>
 </tbody>
 </table>

#### Sample request

=== "cURL"

    ```bash  
    curl --location 'https://localhost:9443/.well-known/webfinger/openid-configuration?resource=acct:admin@localhost&rel=http://openid.net/specs/connect/1.0/issuer'
    ```

=== "JavaScript - jQuery"

    ```js 
    var settings = {
         "url": "{{ product_url_sample }}/.well-known/webfinger/openid-configuration",
         "method": "GET",
         "timeout": 0,
         "headers": { "Accept": "application/json" },
         "data": {
            "resource": "acct:admin@localhost",
            "rel": "http://openid.net/specs/connect/1.0/issuer"
         }
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
         url: '{{ product_url_sample }}/.well-known/webfinger/openid-configuration',
         params: {
            resource: 'acct:admin@localhost',
            rel: 'http://openid.net/specs/connect/1.0/issuer'
         },
         headers: { 'Accept': 'application/json' }
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    ```


#### Sample response

```json
{
   "subject": "acct:admin@localhost",
   "links": [
      {
         "rel": "http://openid.net/specs/connect/1.0/issuer",
         "href": "{{ product_url_sample }}/oauth2/token"
      }
   ]
}
```

### Step 2: Discover the issuer metadata

[OpenID Connect Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html) allows you to discover the metadata such as endpoints, scopes, response types, claims, and supported client authentication methods of identity providers such as {{ product_name }}.

Applications can dynamically discover the OpenID Connect identity provider metadata by calling the OpenID Connect discovery <!-- [OpenID Connect discovery](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfigurationRequest)--> endpoint. The structure of the request URL is as follows: `<issuer>/.well-known/openid-configuration`.  

- Issuer of {{ product_name }}

    ```bash
    {{ product_url_format }}/oauth2/token
    ```

- Discovery endpoint of {{ product_name }}

    ```bash
    {{ product_url_format }}/oauth2/token/.well-known/openid-configuration
    ```

#### Sample request

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

#### Sample response

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

## Use the Console

For applications and SDKs that can't dynamically resolve OpenID Connect endpoints, you can manually copy the relevant information from the Console. To do so,

1. On the {{ product_name }}, go to **Applications**.

2. Select your OIDC application from the list.

3. Go to the **Info** tab of the application and find the server endpoints to your organization.

   ![app-help-panel-for-endpoints]({{base_path}}/assets/img/guides/applications/app-endpoint-help.png){: width="700" style="border: 0.3px solid lightgrey;"}

## What's next?

Explore how OpenID Connect endpoints are used when you implement login to your applications:

- Implement login for single-page applications [using the authorization code flow with PKCE]({{base_path}}/guides/authentication/oidc/implement-auth-code-with-pkce/).
- Implement login for traditional web applications [using the authorization code flow]({{base_path}}/guides/authentication/oidc/implement-auth-code/).
