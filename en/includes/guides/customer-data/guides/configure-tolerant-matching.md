{% if product_name == "WSO2 Identity Server" and is_version > "7.2.0" %}

# Configure tolerant matching

A unification rule matched **Exact** finds profiles only when their values are the same. A rule matched **Tolerant**, also called fuzzy matching, also finds profiles whose values differ by a typo, a spelling variation or the way they are written, such as `Jonathan Smith` and `Jonathon Smyth`. Tolerant matching finds duplicates that exact matching misses, at the cost of more matches for an administrator to review.

Tolerant matching also powers [similarity search]({{base_path}}/guides/customer-data/guides/search-profiles/#search-by-similarity).

## Turn tolerant matching on

Tolerant matching is off by default for the whole Customer Data Service (CDS) deployment, so an upgrade keeps unifying profiles exactly as before. While it is off, **Tolerant** is not offered when creating a rule, and rules already set to **Tolerant** are evaluated as **Exact**.

1. Set the following in `<CDS_HOME>/repository/conf/deployment.yaml` on every instance:

    ```yaml
    identity_resolution:
      fuzzy_matching_enabled: true
    ```

2. Restart the instances.
3. In each organization, [create the tolerant rules]({{base_path}}/guides/customer-data/guides/manage-unification-rules/#create-a-rule) it needs.
4. For each rule that was already set to **Tolerant** before you turned tolerant matching on, turn the rule off and on again in the **Unification Rules** list.

Step 4 matters. While tolerant matching is off, CDS does not index profiles for it, so a tolerant rule created earlier cannot find the profiles created or changed in the meantime. Turning the rule off and on again reindexes its attribute for the whole organization.

## How values are compared

**Tolerant** is offered for the attribute kinds where a difference can still mean the same person. A rule's kind, set in **What this attribute holds**, decides the comparison.

| Kind | Exact | Tolerant |
|---|---|---|
| Name | Identical, character for character. | Ignores case, punctuation and word order, so `Smith, John` matches `John Smith`. Similar spellings score high, and names that sound alike score at least 0.9. |
| Email address | Identical, character for character. | Ignores case. Allows typos in the part before `@` and similar domains. The weaker of the two parts decides the score, so the same name at a different company is not a near match. |
| Phone number | The same number in a standard form. | Reads each number every way it can be written: with or without the country code, with a leading `0`, and with `00` for `+`. `+94 77 123 4567` matches `077 123 4567`. Two numbers either reach the same subscriber or don't, so a phone rule never gives a partial score. |
| Location | Identical. | Expands street abbreviations, such as `St` and `Street`, and compares the words the two values share. |
| Other text | Identical. | Similar spellings score high. |
| Unique identifier, date | Always exact. A difference there means a different person. | Not offered. |

Values that identify nobody are ignored on both sides, whatever the rule: role mailboxes such as `noreply@` and `info@`, reserved domains such as `example.com`, placeholder dates such as `1970-01-01`, phone numbers of one repeated digit, and text such as `N/A`.

## How tolerant matches are decided

A tolerant comparison gives a score between 0 and 1. A pair of profiles is unified or sent for review by the same [matching confidence]({{base_path}}/guides/customer-data/guides/configure-matching-confidence) settings as any other match:

- With the default automatic unification threshold of 1.00, only values that compare as identical are unified automatically. Every other tolerant match at or above the review threshold goes to [review]({{base_path}}/guides/customer-data/guides/review-profile-matches). Lower the automatic unification threshold to let close tolerant matches unify unattended.
- A tolerant match on a name alone is never unified automatically, whatever its score: two different people can have nearly the same name. Another rule, such as an email address, has to agree too.
- A rule that disagrees can hold a tolerant match back for review, for example a different date of birth.

## How candidates are found

CDS doesn't compare a profile with every other profile. It indexes the values each rule uses, and compares only the profiles that share an index entry. For a tolerant rule, CDS also indexes how a value sounds and fragments of how it is spelled, so that profiles that differ by a typo still meet.

A value shared by more than 100 profiles in an organization is not used to find candidates. A value that common identifies nobody.

## Turn tolerant matching off

Set `identity_resolution.fuzzy_matching_enabled: false`, or remove the setting, and restart the instances. The change takes effect at once:

- Rules set to **Tolerant** keep that setting, and are evaluated as **Exact**. Turning tolerant matching back on restores them, followed by step 4 of [Turn tolerant matching on](#turn-tolerant-matching-on).
- Review tasks raised by tolerant matches stay in the queue until an administrator decides on them.
- Similarity search keeps working, and returns exact matches only.

## Related

- [Unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules)
- [Manage unification rules]({{base_path}}/guides/customer-data/guides/manage-unification-rules)
- [Search profiles]({{base_path}}/guides/customer-data/guides/search-profiles)

{% endif %}
