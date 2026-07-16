{% if product == "asgardeo" %}

# Accumulate data across multiple devices

## Overview

This use case keeps a single user's activity together even when they reach your application from more than one device.

A user interacts with the application anonymously on one device, and later does the same on another. Because neither session is signed in, each device starts as its own **temporary profile**. When the user signs in on each device, the Customer Data Service associates that device's profile with the authenticated user. Profiles that share the same `user_id` are then merged automatically into the one **permanent profile**, so the activity captured across devices is held together.

1. The user interacts anonymously on `device A`. A temporary profile is created and collects that activity.
2. The user interacts anonymously on `device B`. A separate temporary profile is created.
3. The user signs in on each device, passing that device's anonymous profile tracker into the sign-in request. Each temporary profile gains the same `user_id`.
4. Profiles that share a `user_id` are merged automatically, and the permanent profile holds the activity from both devices.

Signing in is the deterministic signal that the devices belong to the same person, so **no unification rule is required** for this scenario.

## Configure

The activity accumulated are stored in [profile attributes]({{base_path}}/guides/customer-data/concepts/profile-attributes). What happens to those values when two profiles merge is governed by each attribute's **merge strategy**, not by any unification rule.

Add each attribute that should accumulate across devices from the console:

1. Go to **Customer Data** → **Profile Attributes** and click **New attribute**.
2. Set the **Attribute name** with its scope — for example `traits`, or an `application_data` attribute with the **Application identifier** set to your application's client ID.
3. Choose the **Value type**.
4. Set the **Merge strategy** to `combine`.
5. Mark the attribute **Multi-valued** (required for `combine`).
6. Click **Save**.

For the full field reference, see [Manage profile attributes]({{base_path}}/guides/customer-data/guides/manage-profile-attributes).

!!! warning

    If the merge strategy is `overwrite`, the value from the most recently merged device replaces the value captured earlier on another device, and the user appears to lose the activity from their other device. Use `combine` with **multi-valued** marked for any attribute that should accumulate across devices. See [Manage profile attributes]({{base_path}}/guides/customer-data/guides/manage-profile-attributes).

## Implement

This is the mechanism from the overview applied **once per device**. Get an access token once, then repeat steps 2–4 on each device the user uses. Every device builds its own temporary profile, and they are reconciled when the user signs in.

**1. Get an access token.** Exchange your M2M application's credentials for a token. The token carries the `iam-cds` audience that the Customer Data Service APIs require.

=== "Sample request"

    ```bash
    curl -X POST '{{content.sdkconfig.baseUrl}}/oauth2/token' \
    -H 'Authorization: Basic <base64(client_id:client_secret)>' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -d 'grant_type=client_credentials' \
    -d 'scope=internal_cds_profile_create internal_cds_profile_update internal_cds_profile_view'
    ```

**2. Create a temporary profile on each device.** When an anonymous visitor arrives on a device, create a profile for them. The response returns the `profile_id` and the `anonymous_profile_tracker`, and the service sets a `cds_profile` cookie in that browser. Persist them for that session. Each device creates its **own** temporary profile, so `device A` and `device B` end up with separate `profile_id` and `anonymous_profile_tracker` values.

=== "Sample request"

    ```bash
    curl -X POST '{{content.sdkconfig.baseUrl}}/cds/api/v1/profiles' \
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

![Two temporary profiles in the profile list]({{base_path}}/assets/img/guides/customer-data/temporary-profiles-list.png){: width="auto" style="display: block; margin: 0;"}

**3. Capture activity against that profile.** As the visitor acts, write the activity to their profile. Each device writes to its own temporary profile, so your application needs no cross-device coordination.

Where you write the value depends on the attribute's **scope**, and you must target the same scope the attribute was defined in:

- **`traits`** — profile-wide data, shared across all your applications. Use this when the activity isn't tied to one application.
- **`application_data`** — data scoped to a single application, keyed by that application's client ID. Use this when the value is meaningful only within one application.

=== "Trait (shared across apps)"

    ```bash
    curl -X PATCH '{{content.sdkconfig.baseUrl}}/cds/api/v1/profiles/<profile_id>' \
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
    curl -X PATCH '{{content.sdkconfig.baseUrl}}/cds/api/v1/profiles/<profile_id>' \
    -H 'Authorization: Bearer <access_token>' \
    -H 'Content-Type: application/json' \
    -d '{
      "application_data": {
        "<application_client_id>": {
          "<attribute>": ["<value>"]
        }
      }
    }'
    ```

![Activity captured in the profile attributes section]({{base_path}}/assets/img/guides/customer-data/profile-attributes-captured.png){: width="auto" style="display: block; margin: 0;"}

**4. Pass each device's tracker into sign-in.** When the user signs in on a device, include **that device's** `anonymous_profile_tracker` in the sign-in (authorize) request. On successful authentication the service stamps the user's `user_id` onto that device's temporary profile. As the user signs in on each device, every one of their temporary profiles gains the same `user_id`.

**5. Profiles merge automatically.** The temporary profiles that now share the same `user_id` — one from each device — are all merged into the single permanent profile. Because multiple profiles merge into one, attributes defined with the `combine` merge strategy keep the activity from **every** device; with `overwrite`, only the last-merged device's value would survive (see [Configure](#configure)).

![The permanent profile holding activity merged from both devices]({{base_path}}/assets/img/guides/customer-data/permanent-profile-view.png){: width="auto" style="display: block; margin: 0;"}

{% endif %}
