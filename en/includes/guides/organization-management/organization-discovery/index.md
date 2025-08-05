# Organization discovery

B2B applications need seamless login experiences. {{ product_name }} supports **organization discovery** to route users directly to their organizational login pages.

This guide explains available discovery types and shows how to integrate them into your applications.

---

## Available discovery methods

{{ product_name }} supports the below organization discovery methods:

| Discovery Type                    | Use Case                                                  |
|-----------------------------------|-----------------------------------------------------------|
| **Organization Name-Based**       | Direct users to their organization using a human-readable name. |
| **Organization ID-Based**         | Route users using a unique organization identifier (UUID). Suitable for server-side integrations. |
| **Email Domain-Based**            | Automatically identify organizations from email domains. Ideal for corporate email addresses. |
| **Custom Attribute-Based**        | Enable advanced discovery using custom attributes. |

---

## How organization discovery works

Organization discovery routes users to their organization's login page. You can bypass the **"Sign in with SSO"** selection screen using two methods:

### Method 1: Direct routing with query parameters

Add the `fidp=OrganizationSSO` parameter along with the **organization identifier** to your authentication requests.

**Why use this method**: Direct users to their organization login page through the application.

### Method 2: Adaptive authentication script

Use an adaptive script to automatically select the SSO authenticator based on organization parameters.

**Why use this method**: Provides more control over the authentication flow logic.

---

## Organization name-based discovery

Use the organization's name to route users to their login page.

Add the `org` parameter with the organization name to your authentication request.

=== "OIDC Authorization Request"

    ```bash
    https://{{host_name}}{{organization_path_param}}/oauth2/authorize?
    client_id=<client_id>
    &redirect_uri=<redirect_url>
    &scope=<scopes>
    &response_type=code
    &org=<organization_name>
    &fidp=OrganizationSSO
    ```

=== "SAML Request"

    ```bash
    https://{{host_name}}{{organization_path_param}}/samlsso?
    spEntityID=<app_entity_id>
    &org=<organization_name>
    &fidp=OrganizationSSO
    ```

**Example**: If your organization name is `"acme-corp"`, add `org=acme-corp` to the request.

---

## Organization identifier-based discovery

Use the organization's unique ID (UUID) to route users to their login page.

Add the `orgId` parameter with the organization ID to your authentication request.

=== "OIDC Authorization Request"

    ```bash
    https://{{host_name}}{{organization_path_param}}/oauth2/authorize?
    client_id=<client_id>
    &redirect_uri=<redirect_url>
    &scope=<scopes>
    &response_type=code
    &orgId=<organization_id>
    &fidp=OrganizationSSO
    ```

=== "SAML Request"

    ```bash
    https://{{host_name}}{{organization_path_param}}/samlsso?
    spEntityID=<app_entity_id>
    &orgId=<organization_id>
    &fidp=OrganizationSSO
    ```
---

## Alternative: Use adaptive authentication

Instead of using the `fidp=OrganizationSSO` parameter, you can use an adaptive script to automatically route users.

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

---

## Email domain-based discovery

Automatically identify organizations based on user email domains. This method routes users to their organization's login page without requiring them to specify the organization name or ID.

**How it works**: {{ product_name }} extracts the domain from the user's email address and matches it to a configured organization.

How to configure email domain discovery: [Email Domain-Based Discovery](./email-domain-based-organization-discovery.md)
