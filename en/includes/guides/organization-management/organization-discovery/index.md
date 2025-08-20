# Organization discovery

B2B applications need seamless login experiences. {{ product_name }} supports **organization discovery** to route users directly to their organizational login pages.

This guide explains available discovery types and shows how to integrate them into your applications.

---

## Available discovery methods

{{ product_name }} supports the below organization discovery methods:

{% if product_name == "Asgardeo" %}

| Discovery Type                    | Use Case                                                  |
|-----------------------------------|-----------------------------------------------------------|
| **Organization Name-Based**       | Direct users to their organization using the organization name. |
| **Organization ID-Based**         | Route users using the organization id. Suitable for server-side integrations. |
| **Email Domain-Based**            | Automatically identify organizations from email domains. Ideal for corporate email addresses. |

{% else %}

{% if product_name == "WSO2 Identity Server" and is_version > "7.1.0" %}

| Discovery Type                    | Use Case                                                  |
|-----------------------------------|-----------------------------------------------------------|
| **Organization Handle-Based**     | Route users using the organization handle, a human-readable, unique identifier. |
| **Organization Name-Based**       | Direct users to their organization using the organization name. |
| **Organization ID-Based**         | Route users using the organization id. Suitable for server-side integrations. |
| **Email Domain-Based**            | Automatically identify organizations from email domains. Ideal for corporate email addresses. |
| **Custom Attribute-Based**        | Enable advanced discovery options using custom attributes. |

{% else %}

| Discovery Type                    | Use Case                                                  |
|-----------------------------------|-----------------------------------------------------------|
| **Organization Name-Based**       | Direct users to their organization using the organization name. |
| **Organization ID-Based**         | Route users using the organization id. Suitable for server-side integrations. |
| **Email Domain-Based**            | Automatically identify organizations from email domains. Ideal for corporate email addresses. |
| **Custom Attribute-Based**        | Enable advanced discovery options using custom attributes. |

{% endif %}

{% endif %}

---

## How organization discovery works

Organization discovery routes users directly to their organization's login page. This bypasses the **"Sign in with Single Sign-On (SSO)"** selection screen.

Use one of these two methods:

- **Direct routing with query parameters**: Add the `fidp=OrganizationSSO` parameter along with the *organization discovery parameters* to your authentication requests. This routes users directly to their organization login page.

- **Conditional authentication script**: Use a conditional authentication script to automatically select the SSO authenticator based on organization parameters.

---

{% if product_name == "WSO2 Identity Server" and is_version > "7.1.0" %}

## Organization handle-based discovery

Use the organization's handle to route users to their login page. Organization handle provides a human-readable, unique identifier that users can remember better than organization IDs.

Add the `orgHandle` parameter with the organization handle to your authentication request.

=== "OIDC"

    ```bash
    https://{{host_name}}{{organization_path_param}}/oauth2/authorize?
    client_id=<client_id>
    &redirect_uri=<redirect_url>
    &scope=<scopes>
    &response_type=code
    &orgHandle=<organization_handle>
    &fidp=OrganizationSSO
    ```

=== "SAML"

    ```bash
    https://{{host_name}}{{organization_path_param}}/samlsso?
    spEntityID=<app_entity_id>
    &orgHandle=<organization_handle>
    &fidp=OrganizationSSO
    ```

**Example**: For an organization with handle `"abc.com"`, add `orgHandle=abc.com` to the request.

{% endif %}

---

## Organization name-based discovery

Use the organization's name to route users to their login page.

Add the `org` parameter with the organization name to your authentication request.

=== "OpenID Connect (OIDC) Authorization"

    ```bash
    https://{{host_name}}{{organization_path_param}}/oauth2/authorize?
    client_id=<client_id>
    &redirect_uri=<redirect_url>
    &scope=<scopes>
    &response_type=code
    &org=<organization_name>
    &fidp=OrganizationSSO
    ```

=== "Security Assertion Markup Language (SAML)"

    ```bash
    https://{{host_name}}{{organization_path_param}}/samlsso?
    spEntityID=<app_entity_id>
    &org=<organization_name>
    &fidp=OrganizationSSO
    ```

**Example**: For an organization named `"ABC Builders"`, add `org=ABC+Builders` to the request.

---

## Organization identifier-based discovery

Use the organization's unique ID to route users to their login page.

Add the `orgId` parameter with the organization ID to your authentication request.

=== "OpenID Connect (OIDC) Authorization"

    ```bash
    https://{{host_name}}{{organization_path_param}}/oauth2/authorize?
    client_id=<client_id>
    &redirect_uri=<redirect_url>
    &scope=<scopes>
    &response_type=code
    &orgId=<organization_id>
    &fidp=OrganizationSSO
    ```

=== "Security Assertion Markup Language (SAML)"

    ```bash
    https://{{host_name}}{{organization_path_param}}/samlsso?
    spEntityID=<app_entity_id>
    &orgId=<organization_id>
    &fidp=OrganizationSSO
    ```
---

## Alternative: Use conditional authentication

Instead of using the `fidp=OrganizationSSO` parameter, you can use a conditional authentication script to automatically route users.

Add this script to your application's authentication flow:

```javascript
var onLoginRequest = function(context) {
    executeStep(1, {
        authenticationOptions: [{
            idp: (context.request.params.orgId && !context.steps[1].idp) ? "SSO" : context.steps[1].idp
        }]
    }, {
        onSuccess: function(context) {
            Log.info("User successfully completed initial authentication with IDP: " + context.steps[1].idp);
        }
    });
};
```

**How this works**: The script checks for the `orgId` parameter and automatically selects the SSO authenticator.

{% if product_name == "WSO2 Identity Server" and is_version > "7.1.0" %}

**For organization handle**: Change the script to check for the `orgHandle` parameter instead:

```javascript
var onLoginRequest = function(context) {
    executeStep(1, {
        authenticationOptions: [{
            idp: (context.request.params.orgHandle && !context.steps[1].idp) ? "SSO" : context.steps[1].idp
        }]
    }, {
        onSuccess: function(context) {
            Log.info("User successfully completed initial authentication with IDP: " + context.steps[1].idp);
        }
    });
};
```

## Configure default parameter for organization discovery

{% if product_name == "WSO2 Identity Server" and is_version > "7.1.0" %}

You can set the default discovery parameter for organization discovery across your server or for your root organization. This configuration determines which parameter users provide during SSO login. It affects the user experience.

### Server-wide configuration

Add the following configuration to your deployment configuration file:

```toml
[organization_discovery]
default_param = "orgHandle"
```

**Available options**:

- `"orgHandle"` (recommended): Users provide the organization handle
- `"orgName"`: Users provide the organization name

### Root organization configuration

Use the following API to configure the default parameter for your root organization only:

```bash
curl --location --request PUT 'https://localhost:9443/api/server/v1/organization-configs/discovery' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: Basic YWRtaW46YWRtaW4=' \
--data '{
    "properties": [
        {
            "key": "defaultParam",
            "value": "orgHandle"
        },
        < other available key value properties >
    ]
}'
```

**Note**: By default, the system uses `"orgHandle"` for better user experience with human-readable identifiers. You can change it to `"orgName"` if organization names are easier for users to remember.

### User experience impact of organization discovery configuration

Configure `default_param` to control what users enter during Single Sign-On (SSO)

**When `default_param = "orgHandle"`** (recommended):

Users select **Sign In With Single Sign-On (SSO)** to log in. They get redirected to the default SSO option. Users should provide the **organization handle**.

When you enable email domain discovery, the UI shows the default prompt option as follows:

![Email input for Single Sign-On (SSO) login]({{base_path}}/assets/img/guides/organization/manage-organizations/email-input-for-sso-login-with-handle.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

**When `default_param = "orgName"`** (legacy behavior):

Users provide the **organization name** instead.

When you enable email domain discovery, the UI shows the default prompt option as follows:

![Email input for Single Sign-On (SSO) login]({{base_path}}/assets/img/guides/organization/manage-organizations/email-input-for-sso-login.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% endif %}

{% else %}

**For organization names**: Change the script to check for the `org` parameter instead:

```javascript
var onLoginRequest = function(context) {
    executeStep(1, {
        authenticationOptions: [{
            idp: (context.request.params.org && !context.steps[1].idp) ? "SSO" : context.steps[1].idp
        }]
    }, {
        onSuccess: function(context) {
            Log.info("User successfully completed initial authentication with IDP: " + context.steps[1].idp);
        }
    });
};
```

{% endif %}

---

## Email domain-based discovery

Automatically identify organizations based on user email domains. This method routes users to their organization's login page without requiring them to specify the organization name or ID.

**How it works**: {{ product_name }} extracts the domain from the user's email address. Then it matches the domain to a configured organization.

How to configure email domain discovery: [Email Domain-Based Discovery](./email-domain-based-organization-discovery.md)
