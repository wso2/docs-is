{% if product == "asgardeo" %}

# Manage unification rules

Unification rules tell the Customer Data Service when two profiles should be recognized as the same person and merged. Manage them from the **Customer Data** page in the console, under **Unification Rules**.

For a conceptual overview see [Unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules).

---

## View unification rules

1. From the console, go to **Customer Data** and select **Unification Rules**.
2. The list shows every rule defined for your organization, ordered by priority. The lowest priority number is evaluated first.

![Unification rules list]({{base_path}}/assets/img/guides/customer-data/unification-rules-list.png){: width="auto" style="display: block; margin: 0;"}

---

## Create a rule

1. Click **Add Unification Rule**.
2. Fill in:
    - **Rule name** — human-readable name.
    - **Attribute** — the profile attribute to match on. Select the scope (e.g. `Identity Attributes`) and the attribute (e.g. `emailaddress`).
    - **What this attribute holds** — the kind of value the attribute carries, such as **Email address** or **Name**. This decides how values are compared and how much a match counts. See [what the attribute holds]({{base_path}}/guides/customer-data/concepts/unification-rules).
    - **How it is matched** — **Exact** matches only the same value. Dates, phone numbers and unique identifiers are put in a standard form first, so `ABC123` and `abc123` match as unique identifiers; names, email addresses and locations must be identical character for character. **Tolerant** also matches typos and spelling variations, so it finds duplicates exact matching misses, and sends more matches for an administrator to confirm.
    - **Priority** — lower numbers are evaluated first.
    - **Enable this rule immediately** — select this option to apply the rule when you create it.
3. Click **Create Rule**.

!!! note
    **Tolerant** is offered only for attribute kinds where it makes sense — names, email addresses, phone numbers, locations and other free text. Unique identifiers and dates are always compared exactly.

![Unification Rules]({{base_path}}/assets/img/guides/customer-data/unification-rules.png){: width="auto" style="display: block; margin: 0;"}


## Reorder a rule

Use the up and down arrows in the **Priority** column to change the order in which rules are evaluated.

Reordering a rule does **not** retroactively merge or un-merge existing profiles — it only affects future unification runs.

---

## Disable a rule

Turn off the toggle of the rule in the list and confirm. The rule is skipped during evaluation but stays in the list and keeps its priority.

---

## Delete a rule

1. Click the delete icon of the rule in the list.
2. Confirm the deletion.

Existing merges already recorded under this rule are not reversed.

---

## Related

- [Unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules) — concepts and field reference.
- [Configure matching confidence]({{base_path}}/guides/customer-data/guides/configure-matching-confidence) — how high a match has to score before profiles are unified.
- [Review profile matches]({{base_path}}/guides/customer-data/guides/review-profile-matches) — decide on pairs the service held back.
- [Profile attributes]({{base_path}}/guides/customer-data/concepts/profile-attributes) — the attribute set rules can match on.
{% endif %}
