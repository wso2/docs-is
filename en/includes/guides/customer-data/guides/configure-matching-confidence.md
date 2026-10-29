{% if product_name == "WSO2 Identity Platform" %}

# Configure matching confidence

Configure when matching profiles require administrator review or can be unified automatically. Match scores range from 0 to 1, with higher scores indicating greater similarity.

Manage these settings from the **Customer Data** page in the console, under **Settings** → **Profile unification**.

## Automatic unification

Choose one of the following:

| Option | Effect |
|---|---|
| **Always require administrator approval** | Matches at or above the review threshold are sent for administrator review instead of being unified. |
| **Automatically unify high-confidence matches** | Profiles are unified automatically when their match score reaches the configured threshold. |

When **Automatically unify high-confidence matches** is selected, two more settings appear.

### Automatic unification threshold

Profiles scoring from this value up to 1.00 are unified without review. At 1.00, only profiles with a perfect score are unified. Set it with the slider or by entering a value. It cannot go below the review threshold, so the slider and the input stop there.

### Automatically unify exact-rule matches

Selected by default. Profiles are unified immediately when an exact-match rule is satisfied, whatever that rule's priority. The other rules are not taken into consideration.

Clear it to let the other rules object: two profiles sharing an email address but holding different dates of birth are then sent for review instead of being unified. Tolerant rules are unaffected by this setting. Clearing it only ever moves a decision from automatic to an administrator; nothing is unified with it cleared that would not have been unified with it selected.

!!! note
    A unique identifier is conclusive on its own, with or without this setting. When a unique-identifier rule is the highest-priority rule that agrees, and its values match exactly, the profiles are unified straight away. A different date of birth does not hold that pair back for review.

Both settings are hidden while **Always require administrator approval** is selected, and their saved values are kept.

## Administrator review

### Review threshold

Profiles scoring from this value up to 1.00 are sent for review unless they qualify for automatic unification. No action is taken on lower-scoring profiles. Set it with the slider or by entering a value. The slider and the input stop just below the automatic unification threshold and just above 0.30.

The review threshold has to sit below the automatic unification threshold, even while **Always require administrator approval** is selected. A match held back from automatic unification is scored just below that threshold, and it still has to be high enough to be sent for review.

The review threshold also cannot be set too low. It is the bar a rule has to clear to count as agreeing. A low value lets barely related values decide whether profiles are unified.

## How matches will be handled

A bar shows how the score range from 0 to 1 is divided by the current settings, with a legend giving the exact values. It updates as you change the settings, before you save them.

For example, with a review threshold of 0.64 and an automatic unification threshold of 1.00:

| Score | Outcome |
|---|---|
| Below 0.64 | No action |
| 0.64 to below 1.00 | Administrator review |
| 1.00 | Automatic unification |

With **Always require administrator approval** selected, only the first two outcomes appear. No action is taken on scores below the review threshold. Scores from the review threshold up to 1.00 are sent for review.

When **Automatically unify exact-rule matches** is selected, exact-rule matches are automatically unified and other rules will not be considered.

## Related

- [Unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules) — how a match score is arrived at.
- [Review profile matches]({{base_path}}/guides/customer-data/guides/review-profile-matches) — decide on the pairs these settings hold back.
{% endif %}
