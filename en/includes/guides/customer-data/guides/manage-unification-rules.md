{% if product == "asgardeo" %}

# Manage unification rules

!!! note

    The Customer Data Service is currently in **Preview**. Some features may be subject to changes in future releases.

Unification rules tell the Customer Data Service when two profiles should be recognized as the same person and merged. Manage them from **Customer Data** → **Unification Rules** in the console.

For a conceptual overview see [Unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules).

---

## View unification rules

1. From the console, go to **Customer Data** → **Unification Rules**.
2. The list shows every rule defined for your organization, ordered by priority. The lowest priority number is evaluated first.

![Unification rules list]({{base_path}}/assets/img/guides/customer-data/unification-rules-list.png){: width="auto" style="display: block; margin: 0;"}

---

## Create a rule

1. Click **New unification rule**.
2. Fill in:
    - **Rule name** — human readable name.
    - **Match attribute** — the profile attribute to match on (e.g. `identity_attributes.email`).
    - **Priority** — lower numbers are evaluated first.
3. Click **Save**.

![Unification Rules]({{base_path}}/assets/img/guides/customer-data/unification-rules.png){: width="auto" style="display: block; margin: 0;"}

---

## Edit or reorder a rule

1. Click a rule in the list.
2. Change its match attribute, priority, or active state.
3. Click **Save**.

Editing a rule does **not** retroactively merge or un-merge existing profiles — it only affects future unification runs.

---

## Disable a rule

Toggle **Active** to off. The rule is skipped during evaluation but stays in the list and keeps its priority.

---

## Delete a rule

1. Click the rule, then click **Delete**.
2. Confirm the deletion.

Existing merges already recorded under this rule are not reversed.

---

## Related

- [Unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules) — concepts and field reference.
- [Profile attributes]({{base_path}}/guides/customer-data/concepts/profile-attributes) — the attribute set rules can match on.
{% endif %}
