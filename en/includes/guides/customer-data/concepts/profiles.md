{% if product == "asgardeo" %}

# Profiles

A **profile** is the central entity in the Customer Data Service. It represents a single person's collected data, their identity attributes, behavioral traits, and per application data unified across all interactions.

![Profile List]({{base_path}}/assets/img/guides/customer-data/temporary-profiles-list.png){: width="auto" style="display: block; margin: 0;"}

---

## Temporary and permanent profiles

Profiles are either **temporary** (anonymous) or **permanent** (identified).

### Temporary profile

- Created when an anonymous user first interacts (e.g. visits a website)
- Has no `user_id`
- Accumulates behavioral data during the anonymous session

### Permanent profile

- Has a `user_id`, which is set when the user logs in or is created in {{ product_name }}
- Acts as the master record for that identity
- May have one or more temporary profiles merged into it over time

---

## Profile structure

| Field | Description |
|---|---|
| `profile_id` | System generated UUID. Immutable. |
| `user_id` | The user's ID from {{ product_name }}. Empty on anonymous profiles. |
| `identity_attributes` | Attributes sourced from the identity system (e.g. email, phone, name). Keyed by attribute name. |
| `traits` | Behavioral or preference data (e.g. download count, segment tags). |
| `application_data` | Per-application data, keyed by application identifier. |
| `meta.created_at` | When the profile was created. Read-only. |
| `meta.updated_at` | When the profile was last modified. Read-only. |
| `merged_from` | References to profiles that were unified into this one. |
| `merged_to` | Set on child profiles, points to the master profile they were merged into. |

![Profile Structure]({{base_path}}/assets/img/guides/customer-data/profile-structure.png){: width="auto" style="display: block; margin: 0;"}

---

## Related

- [Profile attributes]({{base_path}}/guides/customer-data/concepts/profile-attributes)
- [Unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules)
{% endif %}
