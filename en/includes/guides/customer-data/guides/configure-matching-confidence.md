{% if product == "asgardeo" %}

# Configure matching confidence

Every candidate pair is given a match score from 0 to 1, where 1 means the compared values are identical. These settings decide how high that score has to be before profiles are unified.

Manage them from the **Customer Data** page in the console, under **Settings** → **Profile unification**.

---

## Unify profiles automatically

A match score at or above this unifies the profiles without an administrator reviewing them.

Select **Never unify profiles automatically** to require an administrator to approve every match. The score is still used when this is off: it sets the score given to a match held back by a contradiction, and it limits how high the review score can be set.

---

## Share profiles for an administrator to review

A match score at or above this is added to the review queue instead of being discarded. Pairs scoring below it are left alone.

This score has to sit below the automatic unification score, because a match held back from automatic unification is scored just below that threshold and still has to be high enough to reach the queue. It also cannot be set too low: it is the bar a rule has to clear to count as agreeing, so a low value lets barely related values decide whether profiles are unified.

---

## An exact match is final

| | Effect |
|---|---|
| **On** (default) | A match on any exact rule unifies the profiles straight away, without the other rules being consulted. |
| **Off** | Other rules may object. Two profiles sharing an email address but holding different phone numbers are shared for review instead of being unified. |

Tolerant rules are unaffected by this setting — objections always apply to them.

Turning this off only ever moves a decision from automatic to an administrator. Nothing is unified with it off that would not have been unified with it on.

---

## Related

- [Unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules) — how a match score is arrived at.
- [Review profile matches]({{base_path}}/guides/customer-data/guides/review-profile-matches) — decide on the pairs these settings hold back.
{% endif %}
