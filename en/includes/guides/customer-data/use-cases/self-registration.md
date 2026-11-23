{% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}

# Unify anonymous and registered profiles

This use case keeps a visitor's activity attached to them as they go from an anonymous visitor to a registered user.

A visitor interacts with your application anonymously, so their activity is collected against a **temporary profile**. Later they self register and sign in. The Customer Data Service associates that temporary profile with the new user. Because the profiles now share a `user_id`, they are merged into the one **permanent profile**, so the activity captured before registration stays attached to the account.

1. The visitor interacts anonymously. A temporary profile is created and collects that activity.
2. The visitor self registers and signs in. The temporary profile gets the new user's `user_id`. The link comes from the profile cookie that {{ product_name }} reads, or from your backend through the link API.
3. Profiles that share a `user_id` are merged automatically, and the permanent profile holds the activity from before registration.
4. If the browser keeps the profile cookie, later activity on that browser maps to the same user, whether they are signed in or browsing anonymously again.

Registration is the deterministic signal that ties the activity to the user, so **no unification rule is required** for this scenario.

## Configure

The activity captured is stored in [profile attributes]({{base_path}}/guides/customer-data/concepts/profile-attributes). Add the attributes your anonymous activity maps to from the console:

1. Go to **Customer Data**, select **Profile Attributes**, and click **Add Profile Attribute**.
2. Choose the **Scope** and set the **Attribute name**.
3. Choose the **Value type** and the **Merge strategy**, which controls what happens to the value when the temporary profile merges into the permanent one. Use `Combine` with **Allow multiple values** to keep the values captured before registration alongside those added after.
4. Click **Finish**.

For the full field reference, see [Manage profile attributes]({{base_path}}/guides/customer-data/guides/manage-profile-attributes).

No unification rule is needed as the temporary and permanent profiles are matched by the `user_id` that the temporary profile gets when it is linked to the user.

## Implement

**1. Get an access token.** Exchange your M2M application's credentials for a token. The token carries the `iam-cds` audience that the Customer Data Service APIs require.

=== "Sample request"

    ```bash
    curl -X POST '{{content.sdkconfig.baseUrl}}/oauth2/token' \
    -H 'Authorization: Basic <base64(client_id:client_secret)>' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -d 'grant_type=client_credentials' \
    -d 'scope=internal_cds_profile_create internal_cds_profile_update internal_cds_profile_view'
    ```

If your backend links profiles through the link API, also request the `internal_cds_profile_link` scope. See [Link from your backend](#link-from-your-backend).

**2. Create a temporary profile.** When an anonymous visitor arrives, create a profile for them. The response returns the `profile_id` and the `anonymous_profile_tracker`. Store both values in the visitor's session on your server.

=== "Sample request"

    ```bash
    curl -X POST '{{content.cds.baseUrl}}/cds/api/v1/profiles' \
    -H 'Authorization: Bearer <access_token>' \
    -H 'Content-Type: application/json' \
    -d '{}'
    ```

=== "Example response"

    ```json
    {
    "profile_id": "a551bebd-2d2e-4e57-9f45-b02d7505670d",
    "anonymous_profile_tracker": "526d5ef6-2648-48c4-b64d-82d3e0c271bf",
    "meta": {
        "created_at": "2026-06-05T03:38:04.834627Z",
        "updated_at": "2026-06-05T03:38:04.834627Z",
        "location": "<your-organization-name>/cds/api/v1/profiles/a551bebd-2d2e-4e57-9f45-b02d7505670d"
        }
    }
    ```

!!! note
    The response also has a `Set-Cookie` header for the `cds_profile` cookie. This header goes to your backend, not to the visitor's browser. If you use the [profile cookie](#link-with-the-profile-cookie), your backend must set the cookie in the browser.

    If the visitor's browser already has a `cds_profile` cookie, send it in the `Cookie` header of this request. If that cookie is still active, the service returns the profile of the cookie with `200 OK` and does not create a new profile.

![Temporary profile in the profile list]({{base_path}}/assets/img/guides/customer-data/temporary-profiles-list.png){: width="auto" style="display: block; margin: 0;"}

**3. Capture activity against that profile.** As the visitor acts, write the activity to their profile.

Where you write the value depends on the attribute's **scope**, and you must target the same scope the attribute was defined in:

- **`traits`** — profile-wide data, shared across all your applications. Use this when the activity isn't tied to one application.
- **`application_data`** — data scoped to a single application, keyed by that application's ID. Use this when the value is meaningful only within one application.

=== "Trait (shared across apps)"

    ```bash
    curl -X PATCH '{{content.cds.baseUrl}}/cds/api/v1/profiles/<profile_id>' \
    -H 'Authorization: Bearer <access_token>' \
    -H 'Content-Type: application/json' \
    -d '{
      "traits": {
        "<attribute>": ["<value>"]
      }
    }'
    ```

=== "Application data (per application)"

    ```bash
    curl -X PATCH '{{content.cds.baseUrl}}/cds/api/v1/profiles/<profile_id>' \
    -H 'Authorization: Bearer <access_token>' \
    -H 'Content-Type: application/json' \
    -d '{
      "application_data": {
        "<application_id>": {
          "<attribute>": ["<value>"]
        }
      }
    }'
    ```

![Activity captured in the profile attributes section]({{base_path}}/assets/img/guides/customer-data/profile-attributes-captured.png){: width="auto" style="display: block; margin: 0;"}

**4. Link the temporary profile to the new user.** The Customer Data Service must know which temporary profile belongs to the new user. Use one of these methods:

| Method | Use it when | What links the profile |
|---|---|---|
| [Profile cookie](#link-with-the-profile-cookie) | Your application and the {{ product_name }} sign-in and registration pages use the same parent domain. | {{ product_name }} reads the `cds_profile` cookie when the visitor registers and when the user signs in. |
| [Link API](#link-from-your-backend) | Your application uses a different domain, or the browser cannot send the cookie to {{ product_name }}. | Your backend calls the link API after the user signs in. |

Choose the method that fits your setup. You can also use the two methods together. If the profile is already linked to the same user, the link API makes no change.

**5. Profiles merge automatically.** Profiles that share the same `user_id` are merged into the permanent profile, which now holds the pre-registration activity.

![The permanent profile holding the pre-registration activity]({{base_path}}/assets/img/guides/customer-data/permanent-profile-view.png){: width="auto" style="display: block; margin: 0;"}

## Link with the profile cookie

A browser sends a cookie only to the domain for which the cookie is set. Thus, the `cds_profile` cookie gets to {{ product_name }} only when your application and the {{ product_name }} pages use the same parent domain.

{% if product == "asgardeo" %}
!!! note "Custom domains are necessary"
    By default, {{ product_name }} serves the sign-in and registration pages on `accounts.asgardeo.io` and its services on `api.asgardeo.io`. Your application cannot set a cookie for these domains. To use the profile cookie, [configure custom domains]({{base_path}}/guides/branding/configure-custom-domains/) under the parent domain of your application. For example, if your application runs on `www.example.com`, use `accounts.example.com` and `api.example.com`.

    If you cannot use custom domains, [link from your backend](#link-from-your-backend).
{% else %}
!!! note
    Serve {{ product_name }} on a host name under the parent domain of your application. For example, if your application runs on `www.example.com`, use `login.example.com` for {{ product_name }}. If this is not possible, [link from your backend](#link-from-your-backend).
{% endif %}

1. Set the `cds_profile` cookie in the visitor's browser. Do this in your backend, in the response to the visitor, after you create the temporary profile in step 2. Use the `anonymous_profile_tracker` as the value of the cookie.

    ```http
    Set-Cookie: cds_profile=<anonymous_profile_tracker>; Domain=example.com; Path=/; Secure; HttpOnly; SameSite=Lax
    ```

    | Attribute | Value |
    |---|---|
    | `Domain` | The parent domain of your application and {{ product_name }}, for example `example.com`. |
    | `Path` | `/` |
    | `Secure` | Set it. The browser then sends the cookie only over HTTPS. |
    | `HttpOnly` | Set it. Scripts on the page then cannot read the cookie. |
    | `SameSite` | `Lax`. Do not use `Strict`. A browser does not send a `Strict` cookie in a navigation that another site starts, for example the return from a social login provider. |
    | `Max-Age` or `Expires` | Optional. Keep the cookie for as long as you keep the anonymous activity of the visitor. |

2. When the visitor self registers, the {{ product_name }} registration page reads the `cds_profile` cookie and sends its value with the registration. When {{ product_name }} creates the user, the Customer Data Service gives the temporary profile the `user_id` of the new user.

3. When the user signs in, {{ product_name }} reads the `cds_profile` cookie again. If the profile of the cookie does not have a user yet, it gets the `user_id` of the user who signed in. If that user already has a permanent profile, the two profiles merge.

## Link from your backend

With the link API, your backend links the temporary profile to the user after the user signs in. This method has no domain requirement.

1. Authorize your M2M application for the `internal_cds_profile_link` scope. Add this scope to the token request in step 1.{% if product_name == "WSO2 Identity Server" %} In a child organization, use the `internal_org_cds_profile_link` scope and the path of the organization. See [Customer data in organizations]({{base_path}}/guides/customer-data/guides/customer-data-in-organizations/#use-cds-in-a-child-organization).{% endif %}

2. After the user self registers and signs in to your application, get the user ID. By default, the `sub` claim of the ID token holds the user ID.

    !!! note
        If you configured an [alternate subject attribute]({{base_path}}/guides/authentication/user-attributes/enable-attributes-for-oidc-app/#select-an-alternate-subject-attribute) for the application, the `sub` claim does not hold the user ID. Then get the user ID from a different attribute.

3. Call the link API. Send the `profile_id` from the visitor's session and the user ID.

    === "Sample request"

        ```bash
        curl -X POST '{{content.cds.baseUrl}}/cds/api/v1/profiles/link' \
        -H 'Authorization: Bearer <access_token>' \
        -H 'Content-Type: application/json' \
        -d '{
          "profile_id": "<profile_id>",
          "user_id": "<user_id>"
        }'
        ```

    === "Example response"

        ```json
        {
          "profile_id": "a551bebd-2d2e-4e57-9f45-b02d7505670d",
          "user_id": "8b5f3c2e-6d1a-4f7b-9c3e-2a1d4e5f6a7b"
        }
        ```

{% endif %}
