# Organization login - legacy approach

!!! warning "Legacy approach"
    This guide describes the **federation-based organization login** approach used in older versions of {{ product_name }}. For new implementations, use the [enhanced organization authentication]({{base_path}}/guides/organization-management/organization-login/) approach instead.

Before enhanced organization authentication, B2B organization login in {{ product_name }} was implemented using a built-in **Organization SSO** federated identity provider. The root organization exposed this federated IdP as an authentication option. Users selected it from the login page to identify their organization and authenticate against that organization.

This page documents the mechanisms specific to that legacy model:

- How applications initiated login
- Query parameters for routing users to a specific organization
- Conditional authentication script patterns
- The `orgDiscovery` scope
- How custom parameters were forwarded to the organization

---

## Start organization login

Send a standard authentication request to the root organization. The login page shows an **Organization SSO** option alongside any other configured authenticators. When the user selects it, {{ product_name }} prompts them for an organization identifier and then delegates the rest of the flow to that organization.

=== "OIDC"

    ```bash
    https://{{host_name}}/t/<root_org_handle>/oauth2/authorize?
    client_id=<client_id>
    &redirect_uri=<redirect_url>
    &scope=<scopes>
    &response_type=code
    ```

=== "SAML"

    ```bash
    https://{{host_name}}/t/<root_org_handle>/samlsso?
    spEntityID=<app_entity_id>
    ```

---

## Organization discovery parameters

To skip the **Organization SSO** selection screen and route a user straight to their organization, include the `fidp=OrganizationSSO` query parameter along with one of the following organization identifier parameters.

| Parameter | Description |
|-----------|-------------|
| `orgId` | The organization's ID. |
| `orgHandle` | The organization's handle. |
| `org` | The organization's name. |
| `login_hint` | An email address used to discover the organization by its email domain. |
| `orgDiscoveryType` | The discovery mechanism to use. For example, pass `emailDomain` for email domain-based discovery. |

### Sample requests

=== "OIDC"

    ```bash
    https://{{host_name}}/t/<root_org_handle>/oauth2/authorize?
    client_id=<client_id>
    &redirect_uri=<redirect_url>
    &scope=<scopes>
    &response_type=code
    &fidp=OrganizationSSO
    &<discovery_param>=<value>
    ```

=== "SAML"

    ```bash
    https://{{host_name}}/t/<root_org_handle>/samlsso?
    spEntityID=<app_entity_id>
    &fidp=OrganizationSSO
    &<discovery_param>=<value>
    ```

---

## Use a conditional authentication script

Instead of passing `fidp=OrganizationSSO` on every request, add a conditional authentication script to your application. The script auto-selects the **Organization SSO** authenticator when an organization discovery parameter is present.

The following script routes users through SSO when the `orgId` parameter is detected on the request.

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

To match a different discovery parameter, change the `context.request.params.orgId` check. For example, to route based on organization handle:

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

Or for organization name:

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

## Pass additional parameters to the organization request

Under the legacy model, query parameters on the initial authorize request are **not** automatically forwarded to the organization's authentication flow. To forward custom parameters, configure them as authenticator parameters for the Organization SSO option in the conditional authentication script using `ssoAdditionalParams`.

### Static parameters

Pass fixed values directly in the script:

```javascript
var onLoginRequest = function(context) {
    executeStep(1, {
        authenticatorParams: {
            federated: {
                SSO: {
                    ssoAdditionalParams: 'param1=value1&param2=value2'
                }
            }
        }
    }, {});
};
```

### Dynamic parameters

Pass values resolved at runtime using:

- `${key}` — resolves from a query parameter in the initial authentication request
- `$authparam{key}` — resolves from a value defined under `common` in the script

```javascript
var onLoginRequest = function(context) {
    executeStep(1, {
        authenticatorParams: {
            federated: {
                SSO: {
                    ssoAdditionalParams: 'param1=value1&param2=${abc}&param3=$authparam{pqr}'
                }
            },
            common: {
                pqr: 'xyz'
            }
        }
    }, {});
};
```

In this example, if the initial request includes `abc=def`, the parameters forwarded to the organization are:

```text
param1=value1&param2=def&param3=xyz
```

!!! note
    Under **enhanced organization authentication**, this script is no longer required. Custom parameters on the initial authorize request are forwarded automatically. See [Organization-based login]({{base_path}}/guides/organization-management/organization-login/).
