# Deploy the Customer Data Directory

The [Customer Data Directory]({{base_path}}/guides/customer-data/) (CDD) runs as its own service beside {{ product_name }}. {{ product_name }} signs users in, issues tokens and owns users and their attributes. CDD keeps customer profiles: what users do across your applications, before and after they sign in.

## Architecture

The two are separate installations that meet only over HTTPS.

| | {{ product_name }} | CDD |
|---|---|---|
| Role | Signs users in, issues tokens, owns users, user attributes and organizations. | Owns profiles, the profile schema, unification rules and consent. |
| Ships as | The {{ product_name }} distribution and its updates. Its side of the integration is built in. | The CDD pack and its updates. |
| Configured in | `<IS_HOME>/repository/conf/deployment.toml` | `<CDD_HOME>/repository/conf/deployment.yaml` |
| Default port | 9443 | 8900 |
| Stores data in | its own databases | its own database |

Neither installation writes into the other, so each can be installed, updated and run on its own, including from a container image or a read-only file system.

### How they work together

| From | To | For |
|---|---|---|
| {{ product_name }} | CDD | User, user attribute, session and organization events; enabling an organization; the credentials CDD uses for that organization. |
| CDD | {{ product_name }} | Tokens, token introspection, user attributes, applications, users and organizations. |
| Applications | CDD | CDD APIs, with access tokens issued by {{ product_name }}. |
| Browsers | CDD | The **Customer Data** pages of the Console, and anonymous profiles. |

### Inside CDD

| Part | What it does |
|---|---|
| APIs | Profiles, profile attributes, unification rules, consent, profile match reviews and settings, under `/t/<organization>/cds/api/v1`. |
| Workers | Unify profiles and synchronize each organization's profile attributes with {{ product_name }}. |
| Database | Everything CDD keeps, by organization: the inbuilt database, or PostgreSQL, MySQL, SQL Server or Oracle. |
| Queue | Carries unification and synchronization work to the workers: in memory, or ActiveMQ. |

Some work does not happen in the request that causes it. When a profile is created or updated, it is queued for unification, so it may be merged with matching profiles a moment later.

## Deploy

1. [Install CDD]({{base_path}}/deploy/customer-data-directory/install/).
2. [Connect it to {{ product_name }}]({{base_path}}/deploy/customer-data-directory/connect-to-identity-server/), and enable it for your organizations.
3. [Configure]({{base_path}}/deploy/customer-data-directory/configure/) its hostnames, cookie domain, CORS, database and queue.
4. [Secure]({{base_path}}/deploy/customer-data-directory/secure/) it: certificates, secrets and hardening.
5. Plan the [production deployment]({{base_path}}/deploy/customer-data-directory/production-deployment/).

Every setting is listed in the [configuration catalog]({{base_path}}/deploy/customer-data-directory/configuration-catalog/).
