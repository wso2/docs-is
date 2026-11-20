# Production deployment

## Product compatibility

The Customer Data Service (CDS) works with {{ product_name }} 7.3.0 and later, with the WSO2 updates that add the CDS integration. Each CDS release lists the {{ product_name }} versions it is verified with in `repository/conf/compatibility.yaml`.

## Deployment patterns

### Evaluation

One instance on the host of {{ product_name }}, with the inbuilt database, the in-memory queue and the default certificates: the pack as extracted. Not for real traffic.

### Single instance

One instance with PostgreSQL and certificates issued for the deployment, running as a service. CDS is unavailable while it restarts. Add ActiveMQ if unification work must survive a restart.

### High availability

Two or more instances behind a load balancer, sharing:

- the same `deployment.yaml`
- the same secrets, including `SERVICE_CREDENTIALS_ENCRYPTION_KEY`
- one PostgreSQL database
- one ActiveMQ broker

Instances share nothing else, so any instance can serve any request. Make the database and the broker highly available as well.

## Network flows

| From | To | Port | Authentication | For |
|---|---|---|---|---|
| {{ product_name }} | CDS | 8900 | The sync credential | Events, enablement, per-organization credentials. |
| CDS | {{ product_name }} | 9443 | The organization's client credentials | Tokens, introspection, user attributes, applications, users, organizations. |
| Applications | CDS | 8900 | Access tokens with the `iam-cds` audience | The APIs. |
| Browsers | CDS | 8900 | Access tokens, or the profile cookie | The Console; anonymous profiles. |
| CDS | PostgreSQL | 5432 | User name and password | The database. |
| CDS | ActiveMQ | 61613 | User name and password | The queues. |

## Containers

CDS suits a container as it is: one process in the foreground, logs on standard output, stopped with SIGTERM.

- Run `cds start` as a non-root user, and expose port 8900 with `addr.host: 0.0.0.0`.
- Mount `deployment.yaml` and the TLS material, and pass secrets as environment variables.
- Probe `/cds/api/v1/health` for liveness and `/cds/api/v1/ready` for readiness, with a readiness timeout of a few seconds.
- On Kubernetes, use a rolling update with `maxUnavailable: 0`, and set `terminationGracePeriodSeconds` above `shutdown.grace_period_seconds`.

For {{ product_name }}, the image only needs the `[customer_data_service]` block and the CDS certificate in its trust store.

## Monitor

| Signal | Source |
|---|---|
| Liveness | `GET /cds/api/v1/health` |
| Readiness, including the database | `GET /cds/api/v1/ready` |
| The deployment as a whole | `cds verify` |
| Logs | Standard output, collected by CDS manager or the container runtime. |

## Backup and recovery

| What | How |
|---|---|
| PostgreSQL | Its own backups: `pg_dump`, or continuous archiving for point-in-time recovery. |
| The inbuilt database | `repository/database/cds.db`, with CDS stopped. |
| `SERVICE_CREDENTIALS_ENCRYPTION_KEY` | In your secret manager, separately from the database backups. |
| `deployment.yaml` and the TLS material | With the rest of your configuration. |

To restore, restore the database with the same encryption key, then the configuration, start CDS and run `cds verify`. Users and their attributes stay in {{ product_name }}; CDS resynchronizes profile attributes on its next run. Profile activity written after the backup is lost.

## Upgrade

1. Check that the new release supports your {{ product_name }} version, in its `compatibility.yaml`.
2. Back up the database and the configuration.
3. Stop all instances.
4. Apply, in order, the scripts in `repository/dbscripts/migrations/` that your database does not have yet.
5. Extract the new pack, and carry over `deployment.yaml`, `secrets.env` and the TLS material. Compare `deployment.yaml` with the new pack's for new settings.
6. Start the instances and run `cds verify`.

Changes that would alter which profiles get unified arrive switched off. For example, tolerant matching stays off until `identity_resolution.fuzzy_matching_enabled` is set.

## Production checklist

| Area | Check |
|---|---|
| Compatibility | {{ product_name }} is at a version and update level that supports CDS. |
| Pattern | The deployment pattern fits the availability you need. |
| Database | PostgreSQL, with TLS, and a connection pool within `max_connections`. |
| Queue | ActiveMQ for more than one instance. |
| Connection | The `[customer_data_service]` block is in place, and the sync credential matches on both sides. |
| Hostnames | `addr.host` and `server_url` are set for the deployment's names. |
| Anonymous profiles | The cookie domain covers CDS and the sign-in host, or applications pass `anonymous_profile_tracker`. |
| CORS | The origin of {{ product_name }} is allowed; organizations list their own applications. |
| Certificates | The default key pair is replaced, each side trusts the other, and `cds verify` passes. |
| Secrets | Out of `deployment.yaml`; the encryption key is set, identical on every instance, and backed up. |
| Hardening | The security guidelines are applied. |
| Operations | Health checks, log collection and backups are in place. |
