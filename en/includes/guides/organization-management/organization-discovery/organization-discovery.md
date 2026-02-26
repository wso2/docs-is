# Organization discovery

B2B applications need seamless login experiences. {{ product_name }} supports **organization discovery** to identify users' organizations and route them to the correct login page.

This guide explains the organization discovery flow, the available discovery types, and how to integrate them into your applications.

---

## Organization discovery page

After the user clicks **Sign in with SSO**, they are redirected to the organization discovery page where they identify their organization.

{% if product_name == "WSO2 Identity Server" and is_version > "7.1.0" %}

By default, users are prompted to enter the **organization handle** — a human-readable, unique identifier for the organization.

![Organization discovery page - org handle]({{base_path}}/assets/img/guides/organization/organization-login/discovery-page-org-handle.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% else %}

By default, users are prompted to enter the **organization name**.

![Organization discovery page - org name]({{base_path}}/assets/img/guides/organization/organization-login/discovery-page-org-name.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% endif %}

### Available discovery types

{{ product_name }} supports the following discovery types:

{% if product_name == "Asgardeo" %}

| Discovery Type                    | Use Case                                                  |
|-----------------------------------|-----------------------------------------------------------|
| **Organization Name-Based**       | Route users using the organization name. |
| **Organization ID-Based**         | Route users using the organization ID. Suitable for server-side integrations. |
| **Email Domain-Based**            | Automatically identify organizations from email domains. Ideal for corporate email addresses. |

{% else %}

{% if product_name == "WSO2 Identity Server" and is_version > "7.1.0" %}

| Discovery Type                    | Use Case                                                  |
|-----------------------------------|-----------------------------------------------------------|
| **Organization Handle-Based**     | Route users using the organization handle, a human-readable, unique identifier. |
| **Organization Name-Based**       | Route users using the organization name. |
| **Organization ID-Based**         | Route users using the organization ID. Suitable for server-side integrations. |
| **Email Domain-Based**            | Automatically identify organizations from email domains. Ideal for corporate email addresses. |
| **Custom Attribute-Based**        | Enable advanced discovery options using custom attributes. |

{% else %}

| Discovery Type                    | Use Case                                                  |
|-----------------------------------|-----------------------------------------------------------|
| **Organization Name-Based**       | Route users using the organization name. |
| **Organization ID-Based**         | Route users using the organization ID. Suitable for server-side integrations. |
| **Email Domain-Based**            | Automatically identify organizations from email domains. Ideal for corporate email addresses. |
| **Custom Attribute-Based**        | Enable advanced discovery options using custom attributes. |

{% endif %}

{% endif %}

{% if product_name == "WSO2 Identity Server" and is_version > "7.1.0" %}

### Configure default parameter for organization discovery

You can set the default discovery parameter for organization discovery across your server or for your root organization. This configuration determines which parameter users provide during SSO login. It affects the user experience.

#### Server-wide configuration

Add the following configuration to your deployment configuration file:

```toml
[organization_discovery]
default_param = "orgHandle"
```

**Available options**:

- `"orgHandle"` (recommended): Users provide the organization handle
- `"orgName"`: Users provide the organization name

#### Root organization configuration

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

#### User experience impact

Configure `default_param` to control what users enter during Single Sign-On (SSO).

**When `default_param = "orgHandle"`** (recommended):

Users select **Sign In With Single Sign-On (SSO)** to log in. They get redirected to the default SSO option. Users should provide the **organization handle**.

When you enable email domain discovery, the UI shows the default prompt option as follows:

![Email input for Single Sign-On (SSO) login]({{base_path}}/assets/img/guides/organization/manage-organizations/email-input-for-sso-login-with-handle.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

**When `default_param = "orgName"`** (legacy behavior):

Users provide the **organization name** instead.

When you enable email domain discovery, the UI shows the default prompt option as follows:

![Email input for Single Sign-On (SSO) login]({{base_path}}/assets/img/guides/organization/manage-organizations/email-input-for-sso-login.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% endif %}

---

{% if (product_name == "WSO2 Identity Server" and is_version > "7.1.0") or product_name == "Asgardeo" %}

## Directly access the organization

To route users directly to their organization's login page without showing the discovery page, you need to handle two things:

1. **Select organization login** — trigger the Organization SSO authenticator
2. **Pass discovery parameters** — identify which organization to route to

### Select organization login

You can select organization login in two ways:

- **Using the `fidp` parameter** — add `fidp=OrganizationSSO` to the authentication request to directly trigger the Organization SSO authenticator.
- **Using the conditional authentication script** — use `authenticationOptions` in your conditional authentication script to conditionally select the Organization SSO authenticator.

For details and examples of both approaches, see [Directly identify the organization]({{base_path}}/guides/organization-management/organization-login/#directly-identify-the-organization) in the organization login overview.

### Pass discovery parameters

After organization login is selected, pass a discovery parameter to identify which organization to route to. The following sections show the available combinations.

#### Using request parameters

Include both `fidp=OrganizationSSO` and the discovery parameter directly in the authentication request URL.

{% if product_name == "WSO2 Identity Server" and is_version > "7.1.0" %}

=== "Organization Handle"

    Add `orgHandle=<organization_handle>` to the authentication request.

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

=== "Organization Name"

    Add `org=<organization_name>` to the authentication request.

    === "OIDC"

        ```bash
        https://{{host_name}}{{organization_path_param}}/oauth2/authorize?
        client_id=<client_id>
        &redirect_uri=<redirect_url>
        &scope=<scopes>
        &response_type=code
        &org=<organization_name>
        &fidp=OrganizationSSO
        ```

    === "SAML"

        ```bash
        https://{{host_name}}{{organization_path_param}}/samlsso?
        spEntityID=<app_entity_id>
        &org=<organization_name>
        &fidp=OrganizationSSO
        ```

    **Example**: For an organization named `"ABC Builders"`, add `org=ABC+Builders` to the request.

=== "Organization ID"

    Add `orgId=<organization_id>` to the authentication request.

    === "OIDC"

        ```bash
        https://{{host_name}}{{organization_path_param}}/oauth2/authorize?
        client_id=<client_id>
        &redirect_uri=<redirect_url>
        &scope=<scopes>
        &response_type=code
        &orgId=<organization_id>
        &fidp=OrganizationSSO
        ```

    === "SAML"

        ```bash
        https://{{host_name}}{{organization_path_param}}/samlsso?
        spEntityID=<app_entity_id>
        &orgId=<organization_id>
        &fidp=OrganizationSSO
        ```

=== "Email Domain"

    Add `login_hint=<user_email>` to the authentication request. {{ product_name }} extracts the domain and matches it to a configured organization.

    === "OIDC"

        ```bash
        https://{{host_name}}{{organization_path_param}}/oauth2/authorize?
        client_id=<client_id>
        &redirect_uri=<redirect_url>
        &scope=<scopes>
        &response_type=code
        &login_hint=<user_email>
        &fidp=OrganizationSSO
        ```

    === "SAML"

        ```bash
        https://{{host_name}}{{organization_path_param}}/samlsso?
        spEntityID=<app_entity_id>
        &login_hint=<user_email>
        &fidp=OrganizationSSO
        ```

    See [Email domain-based discovery](#email-domain-based-discovery) for configuration details.

#### Using the conditional authentication script

You can pass the discovery parameter through the conditional authentication script using `authenticatorParams`. This approach has two variants depending on how you select organization login.

**With `fidp` in the request, discovery parameter in the script**

Include `fidp=OrganizationSSO` in the authentication request URL to select organization login. Configure the conditional authentication script to pass the discovery parameter via `authenticatorParams`.

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

Configure the conditional authentication script with the discovery parameter:

{% if product_name == "WSO2 Identity Server" and is_version > "7.1.0" %}

=== "Organization Handle"

    ```javascript
    var onLoginRequest = function(context) {
        executeStep(1, {
            authenticatorParams: {
                federated: {
                    SSO: {
                        orgHandle: '<organization_handle>'
                    }
                }
            }
        }, {
            onSuccess: function(context) {
                Log.info("User successfully completed initial authentication with IDP: " + context.steps[1].idp);
            }
        });
    };
    ```

{% endif %}

=== "Organization Name"

    ```javascript
    var onLoginRequest = function(context) {
        executeStep(1, {
            authenticatorParams: {
                federated: {
                    SSO: {
                        org: '<organization_name>'
                    }
                }
            }
        }, {
            onSuccess: function(context) {
                Log.info("User successfully completed initial authentication with IDP: " + context.steps[1].idp);
            }
        });
    };
    ```

=== "Organization ID"

    ```javascript
    var onLoginRequest = function(context) {
        executeStep(1, {
            authenticatorParams: {
                federated: {
                    SSO: {
                        orgId: '<organization_id>'
                    }
                }
            }
        }, {
            onSuccess: function(context) {
                Log.info("User successfully completed initial authentication with IDP: " + context.steps[1].idp);
            }
        });
    };
    ```

=== "Email Domain"

    ```javascript
    var onLoginRequest = function(context) {
        executeStep(1, {
            authenticatorParams: {
                federated: {
                    SSO: {
                        login_hint: '<user_email>'
                    }
                }
            }
        }, {
            onSuccess: function(context) {
                Log.info("User successfully completed initial authentication with IDP: " + context.steps[1].idp);
            }
        });
    };
    ```

    See [Email domain-based discovery](#email-domain-based-discovery) for configuration details.

---

**Both selection and discovery parameter in the script**

Use the conditional authentication script to both select organization login via `authenticationOptions` and pass the discovery parameter via `authenticatorParams`. No `fidp` parameter is needed in the request.

{% if product_name == "WSO2 Identity Server" and is_version > "7.1.0" %}

=== "Organization Handle"

    ```javascript
    var onLoginRequest = function(context) {
        executeStep(1, {
            authenticationOptions: [{ idp: "SSO" }],
            authenticatorParams: {
                federated: {
                    SSO: {
                        orgHandle: '<organization_handle>'
                    }
                }
            }
        }, {
            onSuccess: function(context) {
                Log.info("User successfully completed initial authentication with IDP: " + context.steps[1].idp);
            }
        });
    };
    ```

{% endif %}

=== "Organization Name"

    ```javascript
    var onLoginRequest = function(context) {
        executeStep(1, {
            authenticationOptions: [{ idp: "SSO" }],
            authenticatorParams: {
                federated: {
                    SSO: {
                        org: '<organization_name>'
                    }
                }
            }
        }, {
            onSuccess: function(context) {
                Log.info("User successfully completed initial authentication with IDP: " + context.steps[1].idp);
            }
        });
    };
    ```

=== "Organization ID"

    ```javascript
    var onLoginRequest = function(context) {
        executeStep(1, {
            authenticationOptions: [{ idp: "SSO" }],
            authenticatorParams: {
                federated: {
                    SSO: {
                        orgId: '<organization_id>'
                    }
                }
            }
        }, {
            onSuccess: function(context) {
                Log.info("User successfully completed initial authentication with IDP: " + context.steps[1].idp);
            }
        });
    };
    ```

=== "Email Domain"

    ```javascript
    var onLoginRequest = function(context) {
        executeStep(1, {
            authenticationOptions: [{ idp: "SSO" }],
            authenticatorParams: {
                federated: {
                    SSO: {
                        login_hint: '<user_email>'
                    }
                }
            }
        }, {
            onSuccess: function(context) {
                Log.info("User successfully completed initial authentication with IDP: " + context.steps[1].idp);
            }
        });
    };
    ```

    See [Email domain-based discovery](#email-domain-based-discovery) for configuration details.

{% else %}

## How organization discovery works

Organization discovery routes users directly to their organization's login page. This bypasses the **"Sign in with Single Sign-On (SSO)"** selection screen.

Use one of these two methods:

- **Direct routing with query parameters**: Add the `fidp=OrganizationSSO` parameter along with the *organization discovery parameters* to your authentication requests. This routes users directly to their organization login page.

- **Conditional authentication script**: Use a conditional authentication script to automatically select the SSO authenticator based on organization parameters.

---

## Organization name-based discovery

Use the organization's name to route users to their login page.

Add the `org` parameter with the organization name to your authentication request.

=== "OIDC"

    ```bash
    https://{{host_name}}{{organization_path_param}}/oauth2/authorize?
    client_id=<client_id>
    &redirect_uri=<redirect_url>
    &scope=<scopes>
    &response_type=code
    &org=<organization_name>
    &fidp=OrganizationSSO
    ```

=== "SAML"

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

=== "OIDC"

    ```bash
    https://{{host_name}}{{organization_path_param}}/oauth2/authorize?
    client_id=<client_id>
    &redirect_uri=<redirect_url>
    &scope=<scopes>
    &response_type=code
    &orgId=<organization_id>
    &fidp=OrganizationSSO
    ```

=== "SAML"

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

{% endif %}

---

## Email domain-based discovery

Automatically identify organizations based on user email domains. This method routes users to their organization's login page without requiring them to specify the organization name or ID.

**How it works**: {{ product_name }} extracts the domain from the user's email address. Then it matches the domain to a configured organization.

How to configure email domain discovery: [Email Domain-Based Discovery](./email-domain-based-organization-discovery.md)
