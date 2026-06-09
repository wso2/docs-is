{% if product == "asgardeo" %}

# Customer data

The Customer Data Service (CDS) collects and unifies data about your end users across every interaction with your applications. It gives each user a single profile that represents who they are and what they have done across your applications.

!!! note
    Customer Data Service is currently in **Preview**. You need to enable it from **Feature Preview** before the **Customer Data** section appears in the console. See [Enable Customer Data Service]({{base_path}}/guides/customer-data/enable-customer-data-service).

## What you can do with it

- **Capture anonymous activity:** Capture what a visitor favorites, submits, or browses, before they ever create an account or sign in.
- **Keep the data when they sign up:** CDS merges the anonymous profile into the user's permanent one at sign in, so activity from before the account existed gets carried over.
- **Unify a person across devices and applications:** Bring user data together into a single profile, linked by the `user_id` after sign-in or by a matching identifier, such as an email address, before sign-in.
- **Control what a profile holds and how it merges:** Define profile attributes, data types, and merge rules, including whether values accumulate over time or are replaced by the most recent value.

## Where to start

| Read | What it covers |
|---|---|
| [Enable Customer Data Service]({{base_path}}/guides/customer-data/enable-customer-data-service) | Turn the feature on from Feature Preview. |
| [Profiles]({{base_path}}/guides/customer-data/concepts/profiles) | The shape of a profile and how anonymous and permanent profiles relate. |
| [Profile attributes]({{base_path}}/guides/customer-data/concepts/profile-attributes) | Attribute types, mutability, and merge strategies. |
| [Unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules) | When two records get merged into one. |
| [Use cases]({{base_path}}/guides/customer-data/use-cases/) | Common integration patterns for unifying activity across sessions, devices, and applications. |

{% endif %}
