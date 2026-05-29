{% if product == "asgardeo" %}

# Unification rules

**Unification rules** tell the Customer Data Service when two separate profiles should be recognised as the same person and merged. Each rule specifies a profile attribute to match on, if two profiles share the same value for that attribute, they are candidates for merging.

---

## Rule structure

| Field | Description |
|---|---|
| `rule_name` | Human-readable name. Also recorded as the reason on a merge. |
| `property_name` | The attribute name to match on (e.g. `identity_attributes.email`) |
| `priority` | Lower number = evaluated first. Rules are sorted ascending by priority. |
| `is_active` | Only active rules are evaluated during unification |

---

## How rules are evaluated

When a profile is created or updated, the service queues it for unification. The unification worker:

1. Fetches all active rules for the organization, sorted by `priority` ascending.
2. For each rule, checks whether any existing master profile has the same value for `property_name` as the incoming profile.
3. On the first match, merges the two profiles and stops, only one rule fires per unification run.

Rules are evaluated **after** the system level `userId` match. If two profiles share the same `userId`, they are always merged regardless of any rules.

---

## Priority guidance

- Assign **lower** priority numbers to high-confidence identifiers (e.g. `identity_attributes.email` at priority 1).
- Assign **higher** priority numbers to weaker signals (e.g. `traits.phone` at priority 10).
- Leave gaps between priorities (e.g. 10, 20, 30) so new rules can be inserted without reordering.

---

## Related

- [Manage unification rules]({{base_path}}/guides/customer-data/guides/manage-unification-rules)
- [Profile attributes]({{base_path}}/guides/customer-data/concepts/profile-attributes)
{% endif %}
