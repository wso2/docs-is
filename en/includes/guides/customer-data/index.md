{% if product == "asgardeo" %}

# Customer Data

The Customer Data Service (CDS) collects and unifies data about your end users across every interaction with your applications, and gives each user a single profile that represents who they are and what they have done across your applications.

!!! note
    Customer Data Service is currently in **Preview**. You need to enable it from **Feature Preview** before the **Customer Data** section appears in the console. See [Enable Customer Data Service]({{base_path}}/guides/customer-data/enable-customer-data-service).

## What you can do with it

- **Build a unified profile per user** by combining identity attributes from {{ product_name }}, behavioural traits, and per-application data into one record.
- **Unify anonymous and authenticated sessions** so that activity captured before sign-up stays attached to the user once they register or log in.
- **Define profile attributes** that control the shape of data each profile can hold — types, mutability, and how values are resolved when profiles are merged.
- **Configure unification rules** that decide when two separate profile records should be recognised as the same person and merged.

## Where to start

| Read | What it covers |
|---|---|
| [Enable Customer Data Service]({{base_path}}/guides/customer-data/enable-customer-data-service) | Turn the feature on from Feature Preview. |
| [Profiles]({{base_path}}/guides/customer-data/concepts/profiles) | The shape of a profile and how anonymous and permanent profiles relate. |
| [Profile attributes]({{base_path}}/guides/customer-data/concepts/profile-attributes) | Attribute types, mutability, and merge strategies. |
| [Unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules) | When two records get merged into one. |

{% endif %}
