{% if product_name == "WSO2 Identity Server" and is_version > "7.2.0" %}

# Search profiles

Find profiles in the Customer Data Service (CDS) by the exact values they hold, by values similar to the ones you give, or by both. All three use `GET /profiles`. A search never unifies profiles or raises review tasks.

The request needs an access token with the `internal_cds_profile_view` scope, or `internal_org_cds_profile_view` in a [child organization]({{base_path}}/guides/customer-data/guides/customer-data-in-organizations/#use-cds-in-a-child-organization).

## Search by exact values

Pass each condition as `filter`, written `<attribute> <operator> <value>`:

```bash
curl -G "{{content.cds.baseUrl}}/cds/api/v1/profiles" \
  -H "Authorization: Bearer <access_token>" \
  --data-urlencode "filter=identity_attributes.emailaddress eq john@example.com"
```

| Operator | Matches |
|---|---|
| `eq` | Values equal to the one given. |
| `co` | Values that contain the one given. |
| `sw` | Values that start with the one given. |

To apply more than one condition, repeat `filter`, or join conditions in one value with ` and `. A profile is returned only when it satisfies every condition.

```bash
curl -G "{{content.cds.baseUrl}}/cds/api/v1/profiles" \
  -H "Authorization: Bearer <access_token>" \
  --data-urlencode "filter=traits.city eq Colombo and traits.membership sw gold"
```

## Search by similarity

Pass the values as `fuzzyFilter` to find profiles whose values are similar to them, such as `Jonathon Smyth` for `Jonathan Smith`:

```bash
curl -G "{{content.cds.baseUrl}}/cds/api/v1/profiles" \
  -H "Authorization: Bearer <access_token>" \
  --data-urlencode "fuzzyFilter=identity_attributes.name eq Jonathan Smith" \
  --data-urlencode "threshold=0.8"
```

A similarity search compares values with the organization's own active [unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules), the same way unification does:

- An attribute is searched only when an active rule uses it. The rule's kind, such as a name or an email address, decides how two values are compared.
- Similar values are found only through rules set to **Tolerant**. A rule set to **Exact** finds the same profiles as a `filter` would.
- [Tolerant matching]({{base_path}}/guides/customer-data/guides/configure-tolerant-matching) must be on for the deployment. While it is off, a similarity search returns exact matches only.

`fuzzyFilter` always uses `eq`. Repeat it to search on more than one attribute.

Each profile returned carries:

| Field | Description |
|---|---|
| `match_score` | How alike the profile and the values are, from 0 to 1. It is the score of the highest-priority rule that agreed. A rule that disagrees doesn't lower it. |
| `score_breakdown` | The score of each rule that had something to compare, by rule name. |

```json
{
  "profiles": [
    {
      "profile_id": "e8bf7337-4049-4d92-9545-711894ab2af3",
      "meta": {
        "created_at": "2026-10-02T08:15:00Z",
        "updated_at": "2026-11-12T10:41:00Z",
        "location": "{{content.cds.baseUrl}}/cds/api/v1/profiles/e8bf7337-4049-4d92-9545-711894ab2af3"
      },
      "match_score": 0.9429,
      "score_breakdown": { "name": 0.9429, "city": 1.0 }
    }
  ],
  "pagination": { "count": 1, "page_size": 5 }
}
```

Profiles are returned highest score first. `threshold` is the lowest score returned. When it is left out, the organization's review threshold is used, 0.75 unless the organization [changed it]({{base_path}}/guides/customer-data/guides/configure-matching-confidence/#review-threshold). The automatic unification threshold plays no part in a search.

### Combine similarity and exact values

Pass both `fuzzyFilter` and `filter` to return only the profiles that are similar on the `fuzzyFilter` values and satisfy every `filter` condition exactly:

```bash
curl -G "{{content.cds.baseUrl}}/cds/api/v1/profiles" \
  -H "Authorization: Bearer <access_token>" \
  --data-urlencode "fuzzyFilter=identity_attributes.name eq Jonathan Smith" \
  --data-urlencode "filter=traits.city eq Colombo"
```

## Choose what is returned

Each profile in a search result carries `profile_id`, `user_id`, `meta` and `merged_from`. Name the other fields you need in `attributes`, separated by commas. A scope returns all of its attributes, and `<scope>.<attribute>` returns one:

```bash
--data-urlencode "attributes=identity_attributes,traits.city"
```

## Page through results

| Parameter | Description |
|---|---|
| `page_size` | Profiles per page, 5 by default and 200 at most. |
| `cursor` | The `next_cursor` or `previous_cursor` of the previous page, to fetch the page after or before it. |

A similarity search returns a single page of the best matches. It has no cursors, so raise `page_size` to see more.

## Related

- [Configure tolerant matching]({{base_path}}/guides/customer-data/guides/configure-tolerant-matching)
- [Customer Data Service API]({{base_path}}/apis/customer-data-service-rest-api/)

{% endif %}
