# Profile attributes

**Profile attributes** define the shape of data that can be stored on a profile for your organization. They control attribute names, types, mutability, and how values are resolved when two profiles are merged.

Together, the set of profile attributes defined for your organization makes up the **profile attribute schema**.

---

## Scopes

Profile attributes are organised into three scopes:

| Scope | Description |
|---|---|
| `identity_attributes` | Attributes sourced from the identity system (e.g. email, phone, name from {{ product_name }} claims) |
| `traits` | Behavioural or preference data managed by the application (e.g. language, segments) |
| `application_data` | Per-application attributes, scoped by application identifier |

---

## Attribute fields

| Field | Required | Description |
|---|---|---|
| `attribute_name` | yes | Dot-notation path including scope prefix |
| `display_name` | no | Human-readable label |
| `value_type` | yes | One of the supported data types (see below) |
| `merge_strategy` | yes | How to resolve the value when two profiles are merged |
| `mutability` | yes | Read/write behaviour (see below) |
| `multi_valued` | no | If `true`, the attribute holds an array of the declared type |
| `canonical_values` | no | Enumerated allowed values (for string attributes) |
| `sub_attributes` | no | Child attributes when `value_type` is `complex` |
| `application_identifier` | no | Scopes the attribute to a specific application (for `application_data`) |

---

## Supported value types

| Type | Description |
|---|---|
| `string` | Plain text |
| `integer` | Whole number |
| `decimal` | Floating-point number |
| `boolean` | `true` / `false` |
| `date` | Calendar date |
| `date_time` | Date and time |
| `epoch` | Unix timestamp (milliseconds) |
| `complex` | Nested object, define child fields in `sub_attributes` |

---

## Mutability

Mutability controls whether an attribute value can be changed once set.

| Value | Meaning |
|---|---|
| `readWrite` | Can be freely read and updated |
| `readOnly` | System-managed, cannot be updated by applications (e.g. `meta.created_at`) |
| `writeOnly` | Can be written but not read back |
| `immutable` | Must be set at creation, cannot be changed (e.g. `profile_id`) |
| `writeOnce` | Can be empty initially; once set, cannot be updated (e.g. `user_id`) |

---

## Merge strategies

When two profiles are unified, the merge strategy for each attribute decides which value wins.

| Strategy | Behaviour |
|---|---|
| `overwrite` | The incoming profile's value replaces the existing one |
| `combine` | Both values are combined into an array (requires `multi_valued: true`) |

---

## Core attributes

These attributes are built into every profile and cannot be modified:

| Attribute | Type | Mutability |
|---|---|---|
| `profile_id` | `string` | `immutable` |
| `user_id` | `string` | `writeOnce` |
| `meta.created_at` | `date_time` | `readOnly` |
| `meta.updated_at` | `date_time` | `readOnly` |
| `meta.location` | `string` | `readOnly` |

---

## Staying in sync with {{ product_name }}

`identity_attributes` mirror the claim dialects in {{ product_name }}. When a claim is added, updated, or deleted, the service automatically reconciles its local attribute set so the two stay aligned, no manual action is needed.

---

## Related

- [Manage profile attributes]({{base_path}}/guides/customer-data/guides/manage-profile-attributes)
- [Unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules)
