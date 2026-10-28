{% if product == "asgardeo" %}

# Review profile matches

Where the Customer Data Service finds two profiles similar enough to be worth asking about, but not similar enough to unify on its own, it adds the pair to a review queue for an administrator to decide.

Open it from the **Customer Data** page in the console, under **Review Tasks**.

---

## Review a pair

1. From the console, go to **Customer Data** and select **Review Tasks**.
2. The list shows each pair with its match score, strongest matches first.
3. Expand a row to see the evidence — the attributes each rule compared, the values held by both profiles, and what each scored.
4. Choose **Merge** or **Reject**.

| Action | Effect |
|---|---|
| **Merge** | The two profiles are unified, exactly as an automatic unification would. Any other pending task naming either profile is cancelled, since one of them no longer exists on its own. |
| **Reject** | The pair is recorded as two different people. |

---

## What a rejection remembers

A rejection is a statement about identity, not about the data at the time. Two different people do not become the same person because one of them changed a phone number, so an attribute changing is not by itself a reason to ask again.

A rejected pair is put back in front of an administrator only when a later evaluation is materially stronger than the one that was rejected, or when a rule now agrees that did not agree when the pair was rejected — new evidence the administrator has not seen. A score that is the same, lower, or drifts up slightly leaves the rejection standing.

Rejections follow their profiles: unifying a profile moves its rejections onto the surviving profile, and deleting a profile removes them.

---

## Keeping the queue short

If the queue grows faster than it can be worked through, the matching is too loose for the data:

- Raise the review score so that weaker matches are left alone.
- Switch a rule from **Tolerant** to **Exact** where the attribute is an identifier rather than something a person types differently each time.
- Check that the rule's **What this attribute holds** is right. A name matched as free text produces more candidates than a name matched as a name.

---

## Related

- [Configure matching confidence]({{base_path}}/guides/customer-data/guides/configure-matching-confidence) — the thresholds that decide what reaches this queue.
- [Unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules) — how a match score is arrived at.
{% endif %}
