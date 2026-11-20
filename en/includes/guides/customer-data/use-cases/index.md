{% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}

<h1>Customer data service use cases</h1>

These guides show common patterns for integrating with the Customer Data Service from your application. They capture visitor activity even before an account is created, and unify it into a single profile that follows the user across sessions, devices, and applications.

---

## Before you begin

{% if product_name == "WSO2 Identity Server" %}- The Customer Data Service is [deployed]({{base_path}}/deploy/customer-data-service/) and connected to {{ product_name }}. Its API base URL in the examples is `{{content.cds.baseUrl}}`; replace the host with your deployment's.
{% endif %}- [Enable Customer Data Service]({{base_path}}/guides/customer-data/enable-customer-data-service) for your organization.
- A [machine-to-machine (M2M) application]({{base_path}}/guides/applications/register-machine-to-machine-app) is registered for your backend to call the Customer Data Service APIs, granted the `internal_cds_profile_create`, `internal_cds_profile_update`, and `internal_cds_profile_view` scopes and configured to issue tokens with the `iam-cds` audience.{% if product_name == "WSO2 Identity Server" %} Set its access token type to **JWT**; the Customer Data Service does not accept opaque tokens from applications.{% endif %}
- The [profile attributes]({{base_path}}/guides/customer-data/guides/manage-profile-attributes) that your activity maps to are defined, each with the merge strategy it should use.
- The [unification rules]({{base_path}}/guides/customer-data/guides/manage-unification-rules) that decide when two profiles are the same person are defined.

---

## Use cases

| Read | Use this when |
|---|---|
| [Unify anonymous and registered profiles]({{base_path}}/guides/customer-data/use-cases/self-registration) | A visitor interacts anonymously, then signs up, and their activity is consolidated into the new profile. |
| [Accumulate data across multiple devices]({{base_path}}/guides/customer-data/use-cases/cross-device) | A user interacts anonymously across multiple devices and then signs in, and their activity is consolidated into a single profile. |
| [Stitch user profiles across websites]({{base_path}}/guides/customer-data/use-cases/lead-stitching) | A visitor interacts anonymously across multiple applications or domains, and their activity is consolidated into a single profile based on a shared identifier. |

{% endif %}
