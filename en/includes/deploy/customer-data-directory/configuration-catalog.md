# Configuration catalog

The settings of the Customer Data Directory (CDD), in `<CDD_HOME>/repository/conf/deployment.yaml`. The defaults are the values in the pack. A value written as `${NAME}` is read from the environment variable `NAME` at start. See [Secrets]({{base_path}}/deploy/customer-data-directory/secure/#secrets).

All instances of one deployment need the same configuration.

## Server

| Setting | Default | Description |
|---|---|---|
| `addr.host` | `127.0.0.1` | The address to listen on. |
| `addr.port` | `8900` | The HTTPS port. |
| `server_url` | `https://localhost:8900` | The public base URL of CDD. |
| `application_identifier_type` | `app_id` | How CDD identifies an application: `app_id`, the application ID in {{ product_name }}, or `client_id`, its OAuth client ID. It has to match the Console's setting. |
| `shutdown.grace_period_seconds` | `25` | How long a stop waits for work in flight. |

## Logs

| Setting | Default | Description |
|---|---|---|
| `log.app.level` | `${LOG_LEVEL}`, `INFO` when empty | `DEBUG`, `INFO`, `WARN` or `ERROR`. |
| `log.outputs.console.enabled` | `true` | Write the logs to standard output. |
| `log.outputs.console.format` | `text` | `text` or `json`. |
| `log.outputs.file.enabled` | `false` | Also write the logs to rotating files. |
| `log.outputs.file.format` | `json` | `text` or `json`. |
| `log.outputs.file.dir` | `repository/logs` | The directory of the files, relative to `<CDD_HOME>` unless absolute. |
| `log.outputs.file.max_size_mb` | `10` | The size at which a file rotates. A file also rotates each day. |
| `log.outputs.file.max_backups` | `20` | The rotated files kept for each log. |
| `log.access.enabled` | `true` | Write the access log. |
| `log.audit.enabled` | `true` | Write the audit log. Its records are always JSON. |

`log.app`, `log.access` and `log.audit` each take an `outputs` block that overrides `log.outputs` for that log, including the file `name`: `cds.log`, `http_access.log` and `audit.log` by default.

## TLS

| Setting | Default | Description |
|---|---|---|
| `tls.cert_dir` | `repository/resources/security` | The directory of the files below, relative to `<CDD_HOME>` unless absolute. |
| `tls.server_cert`, `tls.server_key` | `server.crt`, `server.key` | The certificate and private key of CDD, in PEM. |
| `tls.trust_store` | `trust_store.pem` | The certificates trusted for calls to {{ product_name }}, in addition to the system's CAs. |
| `tls.mtls_enabled` | `true` | Present the CDD certificate as a client certificate on calls to {{ product_name }}. |

## {{ product_name }}

| Setting | Default | Description |
|---|---|---|
| `auth_server.host`, `auth_server.port` | `localhost`, `9443` | {{ product_name }}. |
| `auth_server.cookieDomain` | `localhost` | The domain of the `cds_profile` cookie: one that both CDD and {{ product_name }} are under. |
| `auth_server.admin_username` | `admin` | The sync credential's user name, matching `[customer_data_service] admin_username`. |
| `auth_server.admin_password` | `${AUTH_SERVER_ADMIN_PASSWORD}` | The sync credential's password. |
| `auth_server.client_id`, `client_secret` | a placeholder, `${AUTH_SERVER_CLIENT_SECRET}` | The client CDD calls {{ product_name }} with for an organization without per-organization credentials. |
| `auth_server.introspection_client_id`, `introspection_client_secret` | `cds_introspection_client`, `${INTROSPECTION_CLIENT_SECRET}` | The client CDD introspects tokens with for an organization without per-organization credentials. |
| `idp.type` | `wso2is` | The identity provider. |
| `idp.service_credentials.encryption_key` | `${SERVICE_CREDENTIALS_ENCRYPTION_KEY}` | Encrypts the stored per-organization credentials. |
| `idp.service_credentials.introspection_auth` | `bearer_token` | How CDD authenticates at the introspection endpoint with an organization's credentials: `bearer_token`, or `client_secret_basic` for a {{ product_name }} that accepts client authentication there. |

Leave the endpoint paths and `auth_server.required_scopes` as they are.

## Browsers and organizations

| Setting | Default | Description |
|---|---|---|
| `auth.cors_allowed_origins` | `https://localhost:9443` | Browser origins allowed for every organization. Include the public origin of {{ product_name }}, for the Console. |
| `organization_management.enabled` | `true` | Sub organizations. |

## Database

| Setting | Default | Description |
|---|---|---|
| `datasource.type` | `sqlite` | `sqlite` (inbuilt), `postgres`, `mysql`, `mssql` or `oracle`. |
| `datasource.hostname`, `port`, `name`, `username`, `password` | | An external database. For Oracle, `name` is the service name of the pluggable database. |
| `datasource.sslmode` | `disable` | `disable`, `require`, `verify-ca` or `verify-full`. |
| `datasource.<type>.max_open_conns` | `100` | Connections held per instance. |
| `datasource.<type>.max_idle_conns` | `25` | Idle connections kept per instance. |
| `datasource.<type>.conn_max_lifetime_seconds` | `1800` | Retire a connection at this age. |
| `datasource.<type>.conn_max_idle_time_seconds` | `300` | Close a connection idle this long. |
| `datasource.<type>.connect_timeout_seconds` | `10` | Bound one connection attempt. |
| `datasource.sqlite.path` | `repository/database/cds.db` | The inbuilt database file. |

`<type>` is `postgres`, `mysql`, `mssql` or `oracle`, matching `datasource.type`.

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
| `identity_resolution.fuzzy_matching_enabled` | `true` | Allow **Tolerant** unification rules. While off, new tolerant rules are refused and existing ones are evaluated as **Exact**. A `deployment.yaml` without the setting keeps it off. |
| `identity_resolution.allow_evidence_strength_override` | `false` | Allow a rule to set its own match and mismatch strengths. |

## Background jobs

| Setting | Default | Description |
|---|---|---|
| `cleanup.cookie.enabled` | `true` | Remove inactive profile cookies. |
| `cleanup.cookie.interval` | `86400` | The interval, in seconds. |
| `cleanup.cookie.batch_size` | `500` | Cookies removed per batch. |
