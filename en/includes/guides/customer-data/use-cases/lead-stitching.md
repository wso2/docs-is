{% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}
{% set cd_name = "Customer Data Directory" if product_name == "WSO2 Identity Server" else "Customer Data Service" %}

# Stitch user profiles across websites

Lead stitching brings a person's anonymous activity together across **separate applications or domains**, before they ever create an account. It works by matching on a shared identifier such as their email address.

A prospective customer interacts anonymously with one of your applications and provides an identifier. For example, an email address in a download form, without signing up. Later they do the same on a different application or domain, providing the same identifier. Because both applications feed the same {{ cd_name }} tenant, a **unification rule** recognizes the shared identifier and merges the separate anonymous profiles into a single lead profile.

1. The lead interacts anonymously with application A and provides their email. A temporary profile is created, carrying that email.
2. The lead interacts anonymously with application B and provides the same email. A separate temporary profile is created, carrying the same email.
3. A unification rule matching on the email recognizes the two profiles as the same person and merges them into one lead profile, no sign-in required.
4. When the lead later signs up or signs in to a central application with the same email, the already unified profile is surfaced.

!!! note

    Unlike [unifying anonymous and registered profiles]({{base_path}}/guides/customer-data/use-cases/self-registration) and [accumulating data across multiple devices]({{base_path}}/guides/customer-data/use-cases/cross-device), which merge profiles by the `user_id` assigned at sign-in, this scenario stitches profiles **before an account exists**, so it relies on a unification rule matching a shared attribute.

## Configure

This use case is driven by a **unification rule** that you define from the console.

1. Make sure the shared identifier is defined as a [profile attribute]({{base_path}}/guides/customer-data/guides/manage-profile-attributes) — for example the `emailaddress` identity attribute — and that every application writes it to the profile.
2. Go to **Customer Data**, select **Unification Rules**, and click **Add Unification Rule**.
3. Set a **Rule name**, set the **Attribute** to the shared identifier — for example the `emailaddress` identity attribute — and set a **Priority**.
4. Click **Create Rule**.

When two profiles share the same value for the match attribute, the service merges them. For the concepts and the full field reference, see [Unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules) and [Manage unification rules]({{base_path}}/guides/customer-data/guides/manage-unification-rules).

## Implement

Make the {{ cd_name }} calls from each application's backend. Every touch point creates its own temporary profile and writes the shared identifier to it; the unification rule does the stitching.

**1. Get an access token.** Exchange your M2M application's credentials for a token. The token carries the `iam-cds` audience that the {{ cd_name }} APIs require.

=== "Sample request"

    ```bash
    curl -X POST '{{content.sdkconfig.baseUrl}}/oauth2/token' \
    -H 'Authorization: Basic <base64(client_id:client_secret)>' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -d 'grant_type=client_credentials' \
    -d 'scope=internal_cds_profile_create internal_cds_profile_update internal_cds_profile_view'
    ```

**2. Create a temporary profile at each touch point.** When an anonymous lead interacts with an application, create a profile for them. The response returns the `profile_id` and the `anonymous_profile_tracker`. Store both values in the session on your server. If you use the [profile cookie]({{base_path}}/guides/customer-data/use-cases/self-registration/#link-with-the-profile-cookie), your backend also sets the `cds_profile` cookie in that browser.

=== "Sample request"

    ```bash
    curl -X POST '{{content.cds.baseUrl}}/cds/api/v1/profiles' \
    -H 'Authorization: Bearer <access_token>' \
    -H 'Content-Type: application/json' \
    -d '{}'
    ```

**3. Write the shared identifier and activity.** Write the identifier the unification rule matches on — here, the email — to the profile, along with any activity you capture. Write it to the **same attribute the rule keys on**, for example `identity_attributes.emailaddress`.

=== "Sample request"

    ```bash
    curl -X PATCH '{{content.cds.baseUrl}}/cds/api/v1/profiles/<profile_id>' \
    -H 'Authorization: Bearer <access_token>' \
    -H 'Content-Type: application/json' \
    -d '{
      "identity_attributes": {
        "emailaddress": "<email>"
      }
    }'
    ```

**4. The unification rule stitches the profiles.** Each time a profile is created or updated, the service evaluates it against the active unification rules. When two profiles share the same value for the rule's match attribute, they are merged into one lead profile automatically — before any account exists.
{% if product_name == "WSO2 Identity Server" %}

If the organization's [matching confidence]({{base_path}}/guides/customer-data/guides/configure-matching-confidence) is set to **Always require administrator approval**, the pair is sent for [review]({{base_path}}/guides/customer-data/guides/review-profile-matches) instead. The profiles merge when an administrator approves it.
{% endif %}

**5. Surface the unified profile at sign-in.** When the lead later registers or signs in to a central application with the same email, the profile is already unified. Link the temporary profile of that browser to the user, with the profile cookie or with the link API. See [Link with the profile cookie]({{base_path}}/guides/customer-data/use-cases/self-registration/#link-with-the-profile-cookie) and [Link from your backend]({{base_path}}/guides/customer-data/use-cases/self-registration/#link-from-your-backend). The `user_id` from that link continues to unify any further profiles for that person.

{% endif %}
