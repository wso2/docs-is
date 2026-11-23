{% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}

<h1>Customer data service use cases</h1>

These guides show common patterns for integrating with the Customer Data Service from your application. They capture visitor activity even before an account is created, and unify it into a single profile that follows the user across sessions, devices, and applications.

---

## Before you begin

- [Enable Customer Data Service]({{base_path}}/guides/customer-data/enable-customer-data-service) for your organization.
- A [machine-to-machine (M2M) application]({{base_path}}/guides/applications/register-machine-to-machine-app) is registered for your backend to call the Customer Data Service APIs, granted the `internal_cds_profile_create`, `internal_cds_profile_update`, and `internal_cds_profile_view` scopes and configured to issue tokens with the `iam-cds` audience. If your backend links profiles through the link API, the application also has the `internal_cds_profile_link` scope.
- The [profile attributes]({{base_path}}/guides/customer-data/guides/manage-profile-attributes) that your activity maps to are defined, each with the merge strategy it should use.
- The [unification rules]({{base_path}}/guides/customer-data/guides/manage-unification-rules) that decide when two profiles are the same person are defined.

!!! warning "Call the Customer Data Service from your backend only"
    Keep the access token of the M2M application on your server. Do not send it to a browser or a mobile app. Give the application only the scopes that the use case needs. Do not give it the scopes that manage settings, profile attributes, unification rules, or organizations.

---

## Link profiles to users

A temporary profile has no `user_id`. When the visitor registers or signs in, the temporary profile must be linked to the user. After the link, profiles that share the `user_id` merge into one permanent profile. There are two methods to link a profile:

| Method | How it works | Requirement |
|---|---|---|
| **Profile cookie** | Your backend sets the `cds_profile` cookie in the visitor's browser. {{ product_name }} reads the cookie when the visitor registers or signs in, and links the profile. | The browser must send the cookie to {{ product_name }}. Thus, your application and {{ product_name }} must use the same parent domain.{% if product == "asgardeo" %} In {{ product_name }}, this needs [custom domains]({{base_path}}/guides/branding/configure-custom-domains/).{% endif %} |
| **Link API** | After the user signs in, your backend calls `POST /cds/api/v1/profiles/link` with the `profile_id` and the user ID. | The `internal_cds_profile_link` scope. No domain requirement. |

Choose the method that fits your setup. The profile cookie works only when your application and {{ product_name }} use the same parent domain. The link API works with any domain. For the steps, see [Link with the profile cookie]({{base_path}}/guides/customer-data/use-cases/self-registration/#link-with-the-profile-cookie) and [Link from your backend]({{base_path}}/guides/customer-data/use-cases/self-registration/#link-from-your-backend).

---

## Use cases

| Read | Use this when |
|---|---|
| [Unify anonymous and registered profiles]({{base_path}}/guides/customer-data/use-cases/self-registration) | A visitor interacts anonymously, then signs up, and their activity is consolidated into the new profile. |
| [Accumulate data across multiple devices]({{base_path}}/guides/customer-data/use-cases/cross-device) | A user interacts anonymously across multiple devices and then signs in, and their activity is consolidated into a single profile. |
| [Stitch user profiles across websites]({{base_path}}/guides/customer-data/use-cases/lead-stitching) | A visitor interacts anonymously across multiple applications or domains, and their activity is consolidated into a single profile based on a shared identifier. |

{% endif %}
