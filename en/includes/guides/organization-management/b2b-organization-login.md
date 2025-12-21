# B2B organization login

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

---

## Prompt the organization discovery directly

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

You can select the Organization SSO option dynamically using conditions in your adaptive authentication script. For example, the following script uses an `orgId` request parameter as a discovery hint:

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
