# Configure custom headers using a custom header filter

The custom header filter adds custom HTTP headers to WSO2 Identity Server's own web applications. Use this to add security headers like Content-Security-Policy (CSP) to web apps. Supported apps include console, authentication endpoint, account recovery endpoint, and My Account portal.

!!! info
    Add custom headers to your application's login pages by configuring the authentication endpoint. This applies the headers to login flows your applications use.

!!! warning "Known limitations"

    WSO2 Identity Server web applications do not fully support CSP headers with `unsafe-inline` and `unsafe-eval` directives.

{% if product_name == "WSO2 Identity Server" %}

## Prerequisites

See [Using the Configuration Management REST APIs]({{base_path}}/apis/use-the-configuration-management-rest-apis/) for prerequisites and general architecture.

## Enable custom header filter

Add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file:

```toml
[custom_header_filter]
enable = true
```

Restart the server for the changes to take effect.

{% if custom_header_min_version is defined %}
!!! info
    This feature is available out of the box as an update in WSO2 Identity Server {{ is_version }} from update level **{{ custom_header_min_version }}** (Updates 2.0 model). See the instructions on [updating WSO2 products](https://updates.docs.wso2.com/en/latest/).

    If you don't have this update level, build the feature manually:
    
    1. Clone the [identity-carbon-auth-rest](https://github.com/wso2-extensions/identity-carbon-auth-rest) repository.
    2. Build the project using Java 11 or Java 17.
    3. Copy `org.wso2.carbon.identity.custom.header.filter-${project.version}.jar` to the `<IS_HOME>/repository/components/dropins` directory.
{% endif %}

{% endif %}

## Configure custom headers

Follow these steps to configure custom headers for the web applications.

{% if product_name == "WSO2 Identity Server" %}

### Step 1: Register the custom-headers resource type

Create a resource type named `custom-headers` to enable custom header configurations for the server.

```bash
curl -k -X POST https://{{ host_name }}/api/identity/config-mgt/v1.0/resource-type \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {bearer_token}" \
  -d '{
    "name": "custom-headers", 
    "description": "This is the resource type for custom header resources."
  }'
```

### Step 2: Create custom headers for a web application

{% else %}

### Step 1: Create custom headers for a web application

{% endif %}

Create a new configuration with custom headers for the web application.

The following example adds a `Content-Security-Policy` header to the `console` application:

```bash
curl -k -X POST https://{{ host_name }}/t/{{ root_organization_path }}/api/identity/config-mgt/v1.0/resource/custom-headers \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {bearer_token}" \
  -d '{
    "name": <APP_NAME>,
    "attributes": [
      {
        "key": "Content-Security-Policy", 
        "value": "default-src '\''self'\''; script-src '\''self'\''; style-src '\''self'\''"
      }
    ]
  }'
```

!!! note
    Replace `<APP_NAME>` with the web application name:

    - `console` - Admin Console
    - `authenticationendpoint` - Authentication endpoint
    - `accountrecoveryendpoint` - Account recovery endpoint
    - `myaccount` - My Account portal

### Optional step: Add headers to an existing web application

Add more headers to web applications with existing custom header configurations.

```bash
curl -k -X POST https://{{ host_name }}/t/{{ root_organization_path }}/api/identity/config-mgt/v1.0/resource/custom-headers/console \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {bearer_token}" \
  -d '{
    "key": "X-Frame-Options", 
    "value": "DENY"
  }'
```
