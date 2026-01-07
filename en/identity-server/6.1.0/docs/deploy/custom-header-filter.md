# Configure custom headers using a custom header filter

The Custom Header Filter adds custom HTTP headers to WSO2 Identity Server's own web applications. You can use this to add security headers, such as Content-Security-Policy (CSP) headers, to WSO2 Identity Server web applications like Console, Authentication Endpoint, Account Recovery Endpoint, and My Account.

!!! info
    If you want to add custom headers to login pages for your applications, you can add the header to the server response via the custom header filter. This applies to the Authentication Endpoint that the applications use for login flows.

!!! warning "Known limitations"

    WSO2 Identity Server web applications do not fully support CSP headers with `unsafe-inline` and `unsafe-eval` directives due to code base limitations.

## Prerequisites

See [Using the Configuration Management REST APIs]({{base_path}}/develop/using-the-configuration-management-rest-apis/) for prerequisites and general architecture.

## Enable custom header filter

Add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file:

```toml
[custom_header_filter]
enable = true
```

Restart the server for the changes to take effect.

## Configure custom headers

Follow these steps to configure custom headers for the web applications.

### Step 1: Register the custom-headers resource type

Create a resource type named `custom-headers` to enable custom header configurations for the server.

```bash
curl -k -X POST https://localhost:9443/api/identity/config-mgt/v1.0/resource-type \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic YWRtaW46YWRtaW4=" \
  -d '{
    "name": "custom-headers", 
    "description": "This is the resource type for custom header resources."
  }'
```

### Step 2: Create custom headers for a web application

Create a new configuration with custom headers for the web application.

The following example adds a `Content-Security-Policy` header to the `console` application:

```bash
curl -k -X POST hhttps://localhost:9443/t/{root_organization_name}/api/identity/config-mgt/v1.0/resource/custom-headers \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic YWRtaW46YWRtaW4=" \
  -d '{
    "name": "console",
    "attributes": [
      {
        "key": "Content-Security-Policy", 
        "value": "default-src '\''self'\''; script-src '\''self'\''; style-src '\''self'\''"
      }
    ]
  }'
```

!!! note
    Replace `console` with the web application name:

    - `console` - Admin Console
    - `authenticationendpoint` - Authentication Endpoint
    - `accountrecoveryendpoint` - Account Recovery Endpoint
    - `myaccount` - My Account Portal

### Optional Step: Add headers to an existing web application

Add additional headers to a web application that already has custom header configurations.

```bash
curl -k -X POST https://localhost:9443/t/{root_organization_name}/api/identity/config-mgt/v1.0/resource/custom-headers/console \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic YWRtaW46YWRtaW4=" \
  -d '{
    "key": "X-Frame-Options", 
    "value": "DENY"
  }'
```
