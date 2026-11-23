# Production deployment

## Product compatibility

The Customer Data Directory (CDD) works with {{ product_name }} 7.3.0 and later. Each CDD release lists the {{ product_name }} versions it is verified with in `repository/conf/compatibility.yaml`.

## Deployment patterns

### Evaluation

One instance on the host of {{ product_name }}, with the inbuilt database, the in-memory queue and the default certificates: the pack as extracted, with `secrets.env` filled in. Not for real traffic.

### Single instance

One instance with an external database and certificates issued for the deployment, running as a service. CDD is unavailable while it restarts. Add ActiveMQ if unification work must survive a restart.

### High availability

Two or more instances behind a load balancer, sharing:

- the same `deployment.yaml`
- the same secrets, including `SERVICE_CREDENTIALS_ENCRYPTION_KEY`
- one external database
- one ActiveMQ broker

Instances share nothing else, so any instance can serve any request. Make the database and the broker highly available as well.

## Network flows

| From | To | Port | Authentication | For |
|---|---|---|---|---|
| {{ product_name }} | CDD | 8900 | The sync credential | Events, enablement, per-organization credentials. |
| CDD | {{ product_name }} | 9443 | The organization's client credentials | Tokens, introspection, user attributes, applications, users, organizations. |
| Applications | CDD | 8900 | Access tokens with the `iam-cds` audience | The APIs. |
| Browsers | CDD | 8900 | Access tokens, or the profile cookie | The Console; anonymous profiles. |
| CDD | The database | The database's port, for example 5432 for PostgreSQL | User name and password | The database. |
| CDD | ActiveMQ | 61613 | User name and password | The queues. |

## Containers

CDD suits a container as it is: one process in the foreground, logs on standard output, stopped with SIGTERM.

- Run `cdd start` as a non-root user, and expose port 8900 with `addr.host: 0.0.0.0`.
- Mount `deployment.yaml` and the TLS material, and pass secrets as environment variables.
- Probe `/cds/api/v1/health` for liveness and `/cds/api/v1/ready` for readiness, with a readiness timeout of a few seconds.
- On Kubernetes, use a rolling update with `maxUnavailable: 0`, and set `terminationGracePeriodSeconds` above `shutdown.grace_period_seconds`.

For {{ product_name }}, the image only needs the `[customer_data_service]` block and the CDD certificate in its trust store.

## Monitor

| Signal | Source |
|---|---|
| Liveness | `GET /cds/api/v1/health` |
| Readiness, including the database | `GET /cds/api/v1/ready` |
| Configuration problems | The warnings CDD logs at start. |
| Logs | The application, access and audit logs, on standard output or in files. See [Logs]({{base_path}}/deploy/customer-data-directory/configure/#logs). |

## Backup and recovery

| What | How |
|---|---|
| An external database | Its own backups, for example `pg_dump` or continuous archiving for PostgreSQL. |
| The inbuilt database | `repository/database/cds.db`, with CDD stopped. |
| `SERVICE_CREDENTIALS_ENCRYPTION_KEY` | In your secret manager, separately from the database backups. |
| `deployment.yaml`, `secrets.env` and the TLS material | With the rest of your configuration. |

To restore, restore the database with the same encryption key, then the configuration, and start CDD. Users and their attributes stay in {{ product_name }}. Profile activity written after the backup is lost.

## Upgrade

1. Check that the new release supports your {{ product_name }} version, in its `compatibility.yaml`.
2. Back up the database and the configuration.
3. Stop all instances.
4. Apply the database changes in the release notes of each release you move past, if any.
5. Extract the new pack, and carry over `deployment.yaml`, `secrets.env` and the TLS material. Compare `deployment.yaml` with the new pack's for new settings.
6. Start the instances, and check their start-up warnings and `/cds/api/v1/ready`.

Changes that would alter which profiles get unified arrive switched off for a `deployment.yaml` you carry over. For example, tolerant matching stays off until `identity_resolution.fuzzy_matching_enabled` is set.

## Production checklist

| Area | Check |
|---|---|
| Compatibility | {{ product_name }} is at a version that supports CDD. |
| Pattern | The deployment pattern fits the availability you need. |
| Database | An external database, with TLS, and a connection pool within its connection limit. |
| Queue | ActiveMQ for more than one instance. |
| Connection | The `[customer_data_service]` block is in place, and the sync credential matches on both sides. |
| Hostnames | `addr.host` and `server_url` are set for the deployment's names. |
| Anonymous profiles | The cookie domain covers CDD and the sign-in host, or applications pass `anonymous_profile_tracker`. |
| CORS | The public origin of {{ product_name }} is allowed; organizations list their own applications. |
| Certificates | The default key pair is replaced, each side trusts the other, and CDD logs no certificate warning at start. |
| Secrets | Out of `deployment.yaml`; the encryption key is set, identical on every instance, and backed up. |
| Hardening | The security guidelines are applied. |
| Operations | Health checks, log collection and backups are in place. |
