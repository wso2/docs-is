# Cross-Origin Resource Sharing (CORS)

Cross-Origin Resource Sharing (CORS) lets web services control which external origins can access their resources. {{product_name}} allows you to enforce CORS at the tenant level, ideal for connecting Single Page Applications (SPAs).

{% if product_name == "WSO2 Identity Server" %}

!!! tip "Before you begin: Enable tenant URL mode"

    {{product_name}} must be running in tenant URL mode for CORS to work. This means your URL should follow this format:
    
    ```bash
    https://<IS_HOST>:<IS_PORT>/t/<TENANT_DOMAIN>/...
    ```

    For example, for the default carbon super tenant, the URL should be:
    
    ```bash
    https://localhost:9443/t/carbon.super/...
    ```
    
    Tenant mode is enabled by default. If it’s disabled, enable it by editing the `<IS_HOME>/repository/conf/deployment.toml` file and adding the following configuration:

    ```toml
    [tenant_context]
    enable_tenant_qualified_urls = true
    ```

## Configure CORS

You can configure CORS in the following two ways:

### During deployment

You can configure CORS settings during server deployment from the `<IS_HOME>/repository/conf/deployment.toml` file. The following shows a sample configuration.

```toml
[cors]
allow_generic_http_requests = true
allow_any_origin = false
allowed_origins = [
    "http://wso2.is"
]
allow_subdomains = false
supported_methods = [
    "GET",
    "POST",
    "HEAD",
    "OPTIONS"
]
support_any_header = true
supported_headers = []
exposed_headers = []
supports_credentials = true
max_age = 3600
tag_requests = false
```

### Using REST APIs

{% endif %}

You can use the following REST APIs to view and configure CORS properties.

{% if product_name == "WSO2 Identity Server" %}

!!! note "Overriding server-level properties"

    REST APIs can override all the CORS properties defined at the server-level except for **Allowed CORS origins**.  The origins listed under this property at the server level are permanent. REST APIs can add new origins to it but can't restrict or remove server-lvel defined origins.

{% endif %}

{% if product_name == "WSO2 Identity Servr" %}
-  [Server Configuration API]({{base_path}}/apis/configs-rest-api/) - Allows overriding all server-level properties except for `Allowed CORS origins`.

{% else %}
-  [Server Configuration API]({{base_path}}/apis/configs-rest-api/) - Allows configuring all CORS properties.

{% endif %}

- [Application Management API]({{base_path}}/apis/application-rest-api/) - You can define the allowed CORS origins for your applications. Any origin allowed for a single application will be allowed for other applications under the same tenant.

- [CORS API]({{base_path}}/apis/cors-rest-api/) allows you to view all the CORS origins configured per tenant and applications associated with a single origin.

{% if product_name == "WSO2 Identity Server" %}

## Configurable properties

{% endif %}

Following are the configurable CORS properties.

<table>
    <thead>
        <tr class="header">
            <th>
                Name
            </th>
            <th>
                Description
            </th>
            <th>
                Configuration
            </th>
        </tr>
    </thead>
    <tbody>
        <tr class="odd">
            <td>
                <p>Allow generic HTTP requests</p>
            </td>
            <td>
                <p>When set to true, generic HTTP requests will be allowed to pass through to {{product_name}}.
                Otherwise, only valid and accepted CORS requests will be allowed.</p>
            </td>
            <td>
                allow_generic_http_requests
            </td>
        </tr>
        <tr class="even">
            <td>
                <p>Allow any origin</p>
            </td>
            <td>
                <p>When set to true, the CORS valve allows requests from any origin to {{product_name}}. If false, only allows the whitelisted origins configured under <code>Allowed origins</code>.</p>
            </td>
            <td>
                allow_any_origin
            </td>
        </tr>
        <tr class="odd">
            <td>
                <p>Allowed origins</p>
            </td>
            <td>
                <p>A list of origins that will be allowed to make CORS requests to {{product_name}}.</p>
            </td>
            <td>
                allowed_origins
            </td>
        </tr>
        <tr class="even">
            <td>
                <p>Allow subdomains</p>
            </td>
            <td>
                <p>When set to true, subdomains of the allowed CORS origins can make requests to {{product_name}}.</p>
            </td>
            <td>
                allow_subdomains
            </td>
        </tr>
        <tr class="odd">
            <td>
                <p>Supported methods</p>
            </td>
            <td>
                <p>List of supported HTTP methods. {{product_name}} responds with a HTTP 405 'Method not allowed' response for any methods not listed here.</p>
            </td>
            <td>
                supported_methods
            </td>
        </tr>
        <tr class="even">
            <td>
                <p>Support any header</p>
            </td>
            <td>
                <p>If true, then CORS requests for any header will be supported while ignoring the 'Supported headers' property.</p>
            </td>
            <td>
                support_any_header
            </td>
        </tr>
        <tr class="odd">
            <td>
                <p>Supported headers</p>
            </td>
            <td>
                <p>If <code>Support any header</code> set to false, {{product_name}} only allows requests with headers listed here.</p>
            </td>
            <td>
                supported_headers
            </td>
        </tr>
        <tr class="even">
            <td>
                <p>Exposed headers</p>
            </td>
            <td>
                The non-simple response headers that the browser will expose to the requesting page in a cross-origin request.</p>
            </td>
            <td>
                exposed_headers
            </td>
        </tr>
        <tr class="odd">
            <td>
                <p>Supports credentials</p>
            </td>
            <td>
                <p>Whether to support user credentials, such as cookies, HTTP authentication or client-side certificates.</p>
            </td>
            <td>
                supports_credentials
            </td>
        </tr>
        <tr class="even">
            <td>
                <p>Max age</p>
            </td>
            <td>
                <p>The duration (in seconds) that the browser can cache the preflight response. -1 means the cache duration is unspecified.</p>
            </td>
            <td>
                max_age
            </td>
        </tr>
        <tr class="odd">
            <td>
                <p>Tag requests</p>
            </td>
            <td>
                <p>Enables HTTP servlet request tagging to provide CORS information to downstream handlers.</p>
            </td>
            <td>
                tag_requests
            </td>
        </tr>
    </tbody>
</table>
