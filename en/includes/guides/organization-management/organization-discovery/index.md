# Organization discovery

In Business-to-Business (B2B) applications, delivering a seamless and personalized login experience is essential. {{ product_name }} supports several **organization discovery options** to automatically or explicitly route users to their respective organizational login pages.

This guide summarizes the available discovery types and provides practical guidance for integrating them into your applications.

---

## Supported Discovery Methods

| Discovery Type                     | Required Query Parameter(s)             | Use Case                                                  |
|-----------------------------------|-----------------------------------|-----------------------------------------------------------|
| Email Domain-Based                | `login_hint`                      | Auto-resolve based on email domain                        |
| Organization Name-Based           | `org`                             | Known org name                                            |
| Organization ID-Based             | `orgId`                           | Stable UUIDs for organizations                            |
| Custom Attribute-Based            | `login_hint`, `orgDiscoveryType`  | Fully custom server-side discovery logic                  |
| Dynamic Discovery via Script      | (`org`, `orgId`) in script logic  | Modify behavior based on request context at runtime       |

---

## Bypassing the “Sign in with SSO” Page

To **directly route users** to their organization's login page (bypassing the "Sign in with SSO" selection screen), include the following **query parameters** in your request:

- `fidp=OrganizationSSO`: Forces redirection to the organization's login flow

---

## Email Domain-Based Discovery (OOTB)

With email domain-based discovery, the user’s organization is determined automatically by the domain of their email address.

**Example OIDC Request:**

