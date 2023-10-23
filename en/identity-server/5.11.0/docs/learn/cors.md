# CORS

Cross Origin Resource Sharing (CORS) is a mechanism that allows the web services to control the access to its 
resources from different origins. The WSO2 Identity Server (WSO2 IS) supports enforcing CORS at the tenant level. This is 
particularly useful when a Single Page Application (SPA) is needed to be connected to the IS. You can configure the 
CORS either at the server level during deployment or through the REST API. Any CORS preference that is configured at 
the server level can be overriden at the tenant level with the notable exception of the `Allowed CORS origins`. Any 
CORS origin that will be made allowed at the deployment stage through the `deployment.toml` will always be enabled for 
all the tenants under that particular WSO2 IS instance.

**The Identity Server must be running in the tenant URL mode in order for CORS to work.**

## CORS Configurations

Following are the CORS configurations that are configurable.

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
                <p>If this is through, then the generic HTTP requests will be allowed to pass through to the WSO2 IS. 
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
                <p>If through, the CORS valve will allow requests from any origin to the WSO2 IS while ignoring the 
                whitelisted origins. Otherwise the 'Allowed origins' for the server/tenant is considered when allowing 
                CORS requests.</p>
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
                <p>A list of origins that will be allowed to make CORS requests to the WSO2 IS.</p>
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
                <p>If true, then CORS requests from subdomains of the configured CORS origins will be allowed to be made 
                to the WSO2 IS.</p> 
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
                <p>The supported HTTP methods. Requests for methods not included here will be refused by the CORS 
                filter with a HTTP 405 'Method not allowed' response.</p>
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
                <p>If true, then CORS requests for any header will be supported while ignoring the 'Supported headers' 
                property.</p> 
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
                <p>This will only be consulted if the 'Support any header' property is false. In such case, the CORS 
                requests can be made only for the headers included in this property.</p> 
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
                <p>The non-simple response headers that the web browser should expose to the author of the CORS 
                request.</p>
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
                <p>Whether user credentials, such as cookies, HTTP authentication or client-side certificates, are 
                supported.</p>
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
                <p>Indicates how long the results of a preflight request can be cached by the web client, in seconds. 
                Here -1 means the age is unspecified.</p>
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

## Configuring CORS during deployment

All the above parameters can be configured at the server level through the `deployment.toml` file. A sample configuration 
is shown below. 

```
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

## Working with CORS through the REST APIs

The CORS functionality of the WSO2 Identity Server is managed by three different REST APIs. 

### [Server Configuration API](../../develop/configs-rest-api)
<p>The Server Configuration API is able to manage all the CORS configurations of a tenant except allowed CORS origins. 
These configurations cannot be set at the application level.</p>

### [Application Management API](../../develop/application-rest-api)
<p>Even if the enforcement happens at the tenant level, the developers are able to configure `Allowed CORS origins` for 
their applications individually through the Application Management REST API. Any CORS origin that will be made allowed 
through this API will be automatically allowed for other applications under the tenant as the CORS can only be enforced 
at the tenant level under the tenant-url mode.</p>

### [CORS API](../../develop/cors-rest-api) 
<p>CORS API allows the developers to view all the CORS origins configured per tenant. In addition, this API facilitates 
viewing the applications that are associated with a single CORS origin.</p>