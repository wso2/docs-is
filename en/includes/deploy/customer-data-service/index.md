# Deploy the Customer Data Service

The [Customer Data Service]({{base_path}}/guides/customer-data/) (CDS) runs as its own service beside {{ product_name }}. {{ product_name }} signs users in, issues tokens and owns users and their attributes. CDS keeps customer profiles: what users do across your applications, before and after they sign in.

## Architecture

The two are separate installations that meet only over HTTPS.

| | {{ product_name }} | CDS |
|---|---|---|
| Role | Signs users in, issues tokens, owns users, user attributes and organizations. | Owns profiles, the profile schema, unification rules and consent. |
| Ships as | The {{ product_name }} distribution and its updates. Its side of the integration is built in. | The CDS pack and its updates. |
| Configured in | `<IS_HOME>/repository/conf/deployment.toml` | `<CDS_HOME>/repository/conf/deployment.yaml` |
| Default port | 9443 | 8900 |
| Stores data in | its own databases | its own database |

Neither installation writes into the other, so each can be installed, updated and run on its own, including from a container image or a read-only file system.

### How they work together

| From | To | For |
|---|---|---|
| {{ product_name }} | CDS | User, user attribute, session and organization events; enabling an organization; the credentials CDS uses for that organization. |
| CDS | {{ product_name }} | Tokens, token introspection, user attributes, applications, users and organizations. |
| Applications | CDS | CDS APIs, with access tokens issued by {{ product_name }}. |
| Browsers | CDS | The **Customer Data** pages of the Console, and anonymous profiles. |

### Inside CDS

| Part | What it does |
|---|---|
| APIs | Profiles, profile attributes, unification rules, consent, profile match reviews and settings, under `/t/<organization>/cds/api/v1`. |
| Workers | Unify profiles and synchronize each organization's profile attributes with {{ product_name }}. |
| Database | Everything CDS keeps, by organization: the inbuilt database or PostgreSQL. |
| Queue | Carries unification and synchronization work to the workers: in memory, or ActiveMQ. |

Some work does not happen in the request that causes it. When a profile is created or updated, it is queued for unification, so it may be merged with matching profiles a moment later.

## Deploy

1. [Install CDS]({{base_path}}/deploy/customer-data-service/install/).
2. [Connect it to {{ product_name }}]({{base_path}}/deploy/customer-data-service/connect-to-identity-server/), and enable it for your organizations.
3. [Configure]({{base_path}}/deploy/customer-data-service/configure/) its hostnames, database and queue.
4. [Secure]({{base_path}}/deploy/customer-data-service/secure/) it: certificates, secrets and hardening.
5. Plan the [production deployment]({{base_path}}/deploy/customer-data-service/production-deployment/).

Every setting is listed in the [configuration catalog]({{base_path}}/deploy/customer-data-service/configuration-catalog/).
