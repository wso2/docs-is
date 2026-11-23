{% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}

# Customer data

The Customer Data Service (CDS) collects and unifies data about your end users across every interaction with your applications. It gives each user a single profile that represents who they are and what they have done across your applications.

!!! note
    You need to enable the Customer Data Service for your organization before you start. See [Enable Customer Data Service]({{base_path}}/guides/customer-data/enable-customer-data-service).

{% if product_name == "WSO2 Identity Server" %}
In {{ product_name }}, the Customer Data Service runs as a separate service beside the Identity Server. It has to be deployed and connected to the Identity Server before you enable it for an organization.
{% endif %}

## What you can do with it

- **Capture anonymous activity:** Capture what a visitor favorites, submits, or browses, before they ever create an account or sign in.
- **Keep the data when they sign up:** CDS merges the anonymous profile into the user's permanent one at sign in, so activity from before the account existed gets carried over.
- **Unify a person across devices and applications:** Bring user data together into a single profile, linked by the `user_id` after sign-in or by a matching identifier, such as an email address, before sign-in.
- **Control what a profile holds and how it merges:** Define profile attributes, data types, and merge rules, including whether values accumulate over time or are replaced by the most recent value.

## Where to start

| Read | What it covers |
|---|---|
| [Enable Customer Data Service]({{base_path}}/guides/customer-data/enable-customer-data-service) | Turn the feature on from the **Customer Data** page. |
| [Profiles]({{base_path}}/guides/customer-data/concepts/profiles) | The shape of a profile and how anonymous and permanent profiles relate. |
| [Profile attributes]({{base_path}}/guides/customer-data/concepts/profile-attributes) | Attribute types, mutability, and merge strategies. |
| [Unification rules]({{base_path}}/guides/customer-data/concepts/unification-rules) | When two records get merged into one. |
| [Use cases]({{base_path}}/guides/customer-data/use-cases/) | Common integration patterns for unifying activity across sessions, devices, and applications. |

{% if product_name == "WSO2 Identity Server" %}

{{ product_name }} also has:

| Read | What it covers |
|---|---|
| [Configure tolerant matching]({{base_path}}/guides/customer-data/guides/configure-tolerant-matching) | Match profiles despite typos and spelling variations. |
| [Search profiles]({{base_path}}/guides/customer-data/guides/search-profiles) | Find profiles by exact values or by similarity. |
| [Customer data in organizations]({{base_path}}/guides/customer-data/guides/customer-data-in-organizations) | What child organizations inherit, and how to share profile attributes and unification rules with them. |
| [Customer Data Service API]({{base_path}}/apis/customer-data-service-rest-api/) | The API reference. |

{% endif %}
{% endif %}
