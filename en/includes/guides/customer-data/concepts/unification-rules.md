{% if product == "asgardeo" %}

# Unification rules

**Unification rules** tell the Customer Data Service when two separate profiles should be recognized as the same person. Each rule names a profile attribute to compare, what kind of value that attribute holds, and how closely the two values have to agree.


## Rule structure

| Field | Description |
|---|---|
| `rule_name` | Human-readable name. Also recorded as the reason on a merge. |
| `property_name` | The attribute to compare (e.g. `identity_attributes.emailaddress`) |
| **What this attribute holds** | The kind of value the attribute carries. This decides how values are compared and how much a result counts. |
| **How it is matched** | **Exact** — only the same value matches, once dates, phone numbers and identifiers are put in a standard form. **Tolerant** — typos and spelling variations also match. |
| `priority` | Lower number = evaluated first. Rules are sorted ascending by priority. |
| `is_active` | Only active rules are evaluated during unification |


## What the attribute holds

The kind of value matters even when matching is exact, because it decides how much the result counts.

| Kind | Agreement | Disagreement |
|---|---|---|
| Unique identifier | Merges profiles on its own | Blocks a merge |
| Email address | Merges profiles on its own | Doesn't block a merge, but counts against it — people can have more than one email address |
| Phone number | Merges profiles on its own | Doesn't block a merge, but counts against it |
| Date (e.g. date of birth) | Counts for little — birthdays collide | Blocks a merge |
| Name | Counts for little on its own | Counts against the match |
| Location / address | Counts for little on its own | Counts for little |

Dates, phone numbers and identifiers are also tidied into a standard form before comparison, so the same date written two ways still matches, and `ABC123` and `abc123` match as unique identifiers. Names, email addresses and locations matched exactly must be identical character for character.

!!! note
    **Tolerant** matching is available for names, email addresses, phone numbers, locations and other free text. Unique identifiers and dates are always compared exactly, because a difference there means a different person.

---

## How rules are evaluated

When a profile is created or updated, the service queues it for unification. Every active rule is evaluated for each candidate pair, and the results are combined into one decision:

1. Each rule compares its attribute and reports a score between 0 and 1. A rule has no say where either profile is missing the value, or where the value identifies nobody — a placeholder address such as `noreply@example.com`, for example.
2. Walking the rules in priority order, the first rule whose score is high enough to count as agreeing sets the match score for the pair.
3. The remaining rules may object. A disagreement on an attribute that blocks a merge — a different date of birth, a different unique identifier — holds the pair back for review even when another rule agrees.
4. A single agreeing rule merges profiles on its own only where that attribute identifies a person by itself. A shared name alone is sent for review rather than merged.

Steps 3 and 4 do not apply when the rule from step 2 is a unique identifier that matches exactly, or when any **Exact** rule agrees while **Automatically unify exact-rule matches** is selected (the default). The profiles are then unified straight away, without the other rules being consulted.

The match score is then compared against the thresholds described in [Configure matching confidence]({{base_path}}/guides/customer-data/guides/configure-matching-confidence) to decide between merging automatically, sending the pair for review, or doing nothing.

Rules are evaluated **after** the system level `userId` match. If two profiles share the same `userId`, they are always merged regardless of any rules.

---

## Priority guidance

- Assign **lower** priority numbers to high-confidence identifiers (e.g. `identity_attributes.emailaddress` at priority 1).
- Assign **higher** priority numbers to weaker signals (e.g. `traits.phone` at priority 10).
- Leave gaps between priorities (e.g. 10, 20, 30) so new rules can be inserted without reordering.
- Priority decides which signal is preferred among several. It does not make a weak signal strong: an organization whose only rule is a tolerant name match still sends those pairs for review.

---

## Related

- [Manage unification rules]({{base_path}}/guides/customer-data/guides/manage-unification-rules)
- [Configure matching confidence]({{base_path}}/guides/customer-data/guides/configure-matching-confidence)
- [Review profile matches]({{base_path}}/guides/customer-data/guides/review-profile-matches)
- [Profile attributes]({{base_path}}/guides/customer-data/concepts/profile-attributes)
{% endif %}
