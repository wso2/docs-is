# Configuration catalog

The settings of the Customer Data Service (CDS), in `<CDS_HOME>/repository/conf/deployment.yaml`. A value written as `${NAME}` is read from the environment variable `NAME` at start. See [Secrets]({{base_path}}/deploy/customer-data-service/secure/#secrets).

All instances of one deployment need the same configuration.

## Server

| Setting | Default | Description |
|---|---|---|
| `addr.host` | `127.0.0.1` | The address to listen on. |
| `addr.port` | `8900` | The HTTPS port. |
| `server_url` | `https://localhost:8900` | The public base URL of CDS. |
| `log.log_level` | `${LOG_LEVEL}` | `DEBUG`, `INFO`, `WARN` or `ERROR`. |
| `shutdown.grace_period_seconds` | `25` | How long a stop waits for work in flight. |

## TLS

| Setting | Default | Description |
|---|---|---|
| `tls.cert_dir` | `repository/resources/security` | The directory of the files below. |
| `tls.server_cert`, `tls.server_key` | `server.crt`, `server.key` | The certificate and private key of CDS, in PEM. |
| `tls.trust_store` | `trust_store.pem` | The certificates trusted for calls to {{ product_name }}. When empty, the system's CAs. |
| `tls.mtls_enabled` | `true` | Present the CDS certificate as a client certificate on calls to {{ product_name }}. |

## {{ product_name }}

| Setting | Default | Description |
|---|---|---|
| `auth_server.host`, `auth_server.port` | `localhost`, `9443` | {{ product_name }}. |
| `auth_server.cookieDomain` | `localhost` | The domain of the `cds_profile` cookie. |
| `auth_server.admin_username` | `admin` | The sync credential's user name, matching `[customer_data_service] admin_username`. |
| `auth_server.admin_password` | `${AUTH_SERVER_ADMIN_PASSWORD}` | The sync credential's password. |
| `idp.service_credentials.encryption_key` | `${SERVICE_CREDENTIALS_ENCRYPTION_KEY}` | Encrypts the stored per-organization credentials. |

Leave the endpoint paths and `auth_server.required_scopes` as they are.

## Browsers and organizations

| Setting | Default | Description |
|---|---|---|
| `auth.cors_allowed_origins` | local development origins | Browser origins allowed for every organization. |
| `organization_management.enabled` | `false` | Sub organizations. Needs the organization tables. |

## Database

| Setting | Default | Description |
|---|---|---|
| `datasource.type` | `sqlite` | `sqlite` (inbuilt) or `postgres`. |
| `datasource.hostname`, `port`, `name`, `username`, `password` | | PostgreSQL. |
| `datasource.sslmode` | `disable` | PostgreSQL TLS: use `require` or `verify-full`. |
| `datasource.postgres.max_open_conns` | `100` | Connections held per instance. |
| `datasource.postgres.max_idle_conns` | `25` | Idle connections kept per instance. |
| `datasource.postgres.conn_max_lifetime_seconds` | `1800` | Retire a connection at this age. |
| `datasource.postgres.conn_max_idle_time_seconds` | `300` | Close a connection idle this long. |
| `datasource.postgres.connect_timeout_seconds` | `10` | Bound one connection attempt. |
| `datasource.sqlite.path` | `repository/database/cds.db` | The inbuilt database file. |

## Message queue

| Setting | Default | Description |
|---|---|---|
| `message_queue.type` | `memory` | `memory` or `activemq`. |
| `message_queue.broker.addr` | | The broker, as `host:port`. |
| `message_queue.broker.username`, `password` | `admin`, `${BROKER_PASSWORD}` | The broker credentials. |
| `message_queue.broker.profile_queue_name` | `/queue/cds-profile-unification` | The unification queue. |
| `message_queue.broker.schema_sync_queue_name` | `/queue/cds-schema-sync` | The profile-attribute synchronization queue. |

## Identity resolution

These apply to every organization.

| Setting | Default | Description |
|---|---|---|
| `identity_resolution.fuzzy_matching_enabled` | `false` | Allow **Tolerant** unification rules. While off, new tolerant rules are refused and existing ones are evaluated as **Exact**. |
| `identity_resolution.allow_evidence_strength_override` | `false` | Allow a rule to set its own match and mismatch strengths. |

## Background jobs

| Setting | Default | Description |
|---|---|---|
| `sync.schema.enabled` | `true` | Periodically resynchronize each organization's profile attributes with {{ product_name }}. |
| `sync.schema.interval` | `3600` | The interval, in seconds. |
| `cleanup.cookie.enabled` | `true` | Remove inactive profile cookies. |
| `cleanup.cookie.interval` | `86400` | The interval, in seconds. |
| `cleanup.cookie.batch_size` | `500` | Cookies removed per batch. |
