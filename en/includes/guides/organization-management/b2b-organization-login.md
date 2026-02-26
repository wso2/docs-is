# Organization login overview

This document explains how you can initiate the login to organizations in B2B SaaS apps.

---

## Authentication request

You can start the B2B organization login by sending the authentication request to the following endpoints based on the protocol you use:

=== "OIDC"

    ```bash
    https://{{host_name}}{{organization_path_param}}/oauth2/authorize?
    client_id=<client_id>
    &redirect_uri=<redirect_url>
    &scope=<scopes>
    &response_type=code
    ```

=== "SAML"

    ```bash
    https://{{host_name}}{{organization_path_param}}/samlsso?
    spEntityID=<app_entity_id>
    ```
This will display the login page with the **Sign in with SSO** option, which the user clicks to proceed with organization discovery.

![Sign in with SSO option]({{base_path}}/assets/img/guides/organization/organization-login/sso-option.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

---

## Prompt the organization discovery page directly

In some cases, you may want to prompt the organization discovery page directly without showing the initial login page with the Sign in with SSO option. There are two ways to achieve this:

### Using the `fidp` parameter

Send your authentication request with the `fidp=OrganizationSSO` parameter to prompt for the organization discovery.

=== "OIDC"

    ```bash
    https://{{host_name}}{{organization_path_param}}/oauth2/authorize?
    client_id=<client_id>
    &redirect_uri=<redirect_url>
    &scope=<scopes>
    &response_type=code
    &fidp=OrganizationSSO
    ```

=== "SAML"

    ```bash
    https://{{host_name}}{{organization_path_param}}/samlsso?
    spEntityID=<app_entity_id>
    &fidp=OrganizationSSO
    ```

If you need to prompt an organization login without showing the discovery page, use the direct discovery options described in the [organization discovery guide]({{base_path}}/guides/organization-management/organization-discovery/).

### Using the conditional authentication script

You can select the Organization SSO option dynamically using conditions in your conditional authentication script. For example, the following script uses an `orgId` request parameter as a discovery hint:

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

You can swap `orgId` with any other request parameter that signals which organization login to use. The logic then automatically selects the Organization SSO option when the condition is met.
Additionally, if you have sent any discovery parameters in the request such as `orgId`, `org`, `orgHandle`, it will redirect to the discovered organization login automatically without showing the discovery page.

---

## Additional options

### Passing additional query parameters to organization login

{{ product_name }} allows authentication requests to include additional query parameters, defined either as static values or dynamically resolved values.

In organization login flows, these additional query parameters can be forwarded to the authentication request of the discovered sub-organization using the conditional authentication script. This allows applications to propagate contextual information (such as organization hints or custom flags) into the organization-specific login flow, independent of the underlying authentication protocol.

#### Using static query parameters

You can pass static query parameters by configuring them as authenticator parameters for the Organization SSO option in the conditional authentication script.

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

The specified parameters will be appended to the authentication request sent to the discovered sub-organization.

### Using dynamic query parameters

In addition to static values, dynamic query parameters are supported using values resolved at runtime from:

- **Query parameters in the initial authentication request**, referenced using the `${key}` syntax
- **Common parameters defined in the conditional authentication script**, referenced using the `$authparam{key}` syntax

Example:

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

In this example:

- `param2` is resolved from the `abc` query parameter in the initial authentication request
- `param3` is resolved from the `pqr` value defined under the conditional authentication common parameters

If the initial authentication request includes `abc=def`, the resolved query parameters sent to the discovered sub-organization authentication request will be:

```
param1=value1&param2=def&param3=xyz
```
