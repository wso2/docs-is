# Deploy the Customer Data Directory

The Customer Data Directory (CDD) runs as its own service beside {{ product_name }}. {{ product_name }} signs users in, issues tokens, and owns users and their attributes. CDD keeps customer profiles: what users do across your applications, before and after they sign in.

This guide covers installing CDD, connecting it to {{ product_name }}, and planning a production deployment. To secure the deployment, see the [security guide]({{base_path}}/deploy/customer-data-directory/security-guide/).

## Architecture

The two are separate installations that meet only over HTTPS.

| | {{ product_name }} | CDD |
|---|---|---|
| Role | Signs users in, issues tokens, owns users, user attributes and organizations. | Owns profiles, the profile schema, unification rules and consent. |
| Ships as | The {{ product_name }} distribution and its updates. | The CDD pack and its updates. |
| Configured in | `<IS_HOME>/repository/conf/deployment.toml` | `<CDD_HOME>/repository/conf/deployment.yaml` |
| Default port | 9443 | 8900 |
| Stores data in | Its own databases. | Its own database. |

| From | To | For |
|---|---|---|
| {{ product_name }} | CDD | User, user attribute, session and organization events; enabling an organization; the credentials CDD uses for that organization. |
| CDD | {{ product_name }} | Tokens, token introspection, user attributes, applications, users and organizations. |
| Applications | CDD | The CDD APIs, with access tokens that {{ product_name }} issues. |
| Browsers | CDD | The **Customer Data** pages of the Console, and anonymous profiles. |

## Before you begin

- {{ product_name }} {{ is_version }} carries its side of the integration through WSO2 Updates. Update it to the latest update level.
- Pick the CDD pack for the machine: `cdd-<os>-<arch>-<version>.zip`. CDD runs on Linux and macOS on x86_64 (`amd64`) and ARM64 (`arm64`), and on Windows on x86_64. It is a single executable and needs no Java runtime.
- For production, provision a database: PostgreSQL, MySQL, SQL Server or Oracle. The inbuilt database is for evaluation only.

## Install CDD

1. Verify the pack against the `.sha256` file published with it, and extract it. The extracted directory is referred to as `<CDD_HOME>`.

    ```bash
    unzip cdd-linux-amd64-<version>.zip -d /opt
    cd /opt/cdd-linux-amd64-<version>
    ```

    | Path | Holds |
    |---|---|
    | `bin/cdd`, `bin/start.sh` | CDD, and a script that starts it in the foreground. `cdd.exe` and `start.bat` on Windows. |
    | `repository/conf/deployment.yaml` | The configuration. |
    | `repository/conf/secrets.env` | The secrets, shipped empty for you to fill in. |
    | `repository/dbscripts/` | The schema for each external database. |
    | `repository/resources/security/` | The TLS certificates and trust stores. |

2. Fill in `repository/conf/secrets.env`. At least set `SERVICE_CREDENTIALS_ENCRYPTION_KEY` and `AUTH_SERVER_ADMIN_PASSWORD`. See [Secrets]({{base_path}}/deploy/customer-data-directory/security-guide/#secrets).

3. Start CDD.

    ```bash
    bin/start.sh            # or bin/cdd start
    ```

    CDD runs in the foreground and logs to standard output. To stop it, press Ctrl+C or send it SIGTERM. In production, run it under a service manager such as systemd, or in a container.

4. Check that it is up. The health endpoints answer without a token.

    | Endpoint | Answers when |
    |---|---|
    | `GET /cds/api/v1/health` | The process is serving. |
    | `GET /cds/api/v1/ready` | Its database answers as well. |

    At start, CDD warns when it still uses the default certificate of the pack, and when the sync password or the encryption key is empty.

## Connect CDD to {{ product_name }}

1. Add the following to `<IS_HOME>/repository/conf/deployment.toml` and restart {{ product_name }}.

    ```toml
    [customer_data_service]
    enable = true
    server_url = "https://cdd.example.com:8900"
    admin_username = "cdd-sync"
    admin_password = "$env{CDD_SYNC_PASSWORD}"
    ```

    | Property | Description |
    |---|---|
    | `enable` | Switches the integration on. Without the block, nothing of the integration is active. |
    | `server_url` | Where {{ product_name }} and the Console reach CDD. |
    | `admin_username`, `admin_password` | The sync credential {{ product_name }} presents to CDD. It is a shared secret between the two, not a user account. |

    Keep the password out of the file. See [Set passwords using environment variables]({{base_path}}/deploy/security/set-passwords-using-environment-variables-or-system-properties/) and [Encrypt passwords with Cipher Tool]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool/).

2. Match the settings in `<CDD_HOME>/repository/conf/deployment.yaml`, and restart CDD.

    | Setting | Value |
    |---|---|
    | `auth_server.host`, `auth_server.port` | The host and HTTPS port of {{ product_name }}. |
    | `auth_server.admin_username` | The same as `admin_username` above. |
    | `AUTH_SERVER_ADMIN_PASSWORD` in `secrets.env` | The same as `admin_password` above. |
    | `addr.host`, `addr.port` | The address CDD listens on. `127.0.0.1:8900` in the pack; `0.0.0.0` to listen on every interface. |
    | `server_url` | The public base URL of CDD. |
    | `auth.cors_allowed_origins` | The origin of {{ product_name }}, for the Console. |
    | `auth_server.cookieDomain` | A domain that both CDD and {{ product_name }} are under, for anonymous profiles at sign-in. |

    The defaults of the pack match a default {{ product_name }} on the same host, except for the secrets.

3. Make sure each side trusts the other's certificate. See [Certificates]({{base_path}}/deploy/customer-data-directory/security-guide/#certificates). A pack and a default {{ product_name }} on the same host already trust each other.

4. Enable CDD for each root organization, with the configuration API of that organization. It needs the `internal_cds_admin_config_update` scope.

    ```bash
    curl -X PATCH https://is.example.com:9443/t/<organization>/api/server/v1/configs/cds \
      -H "Authorization: Bearer <access-token>" \
      -H "Content-Type: application/json" \
      -d '{"enabled": true}'
    ```

    When an organization enables it, {{ product_name }} creates an application for CDD in the organization and sends CDD its client credentials. CDD verifies them, stores them encrypted with `SERVICE_CREDENTIALS_ENCRYPTION_KEY`, and uses them for its calls to {{ product_name }} for that organization. CDD then synchronizes the organization's profile attributes with its user attributes.

    !!! warning "Set the encryption key first"
        Without `SERVICE_CREDENTIALS_ENCRYPTION_KEY`, CDD refuses the credentials {{ product_name }} sends. Set the key before you enable the first organization.

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

| From | To | Port | Route | Authentication | For |
|---|---|---|---|---|---|
| {{ product_name }} | CDD | 8900 | A private address | The sync credential, and optionally a client certificate | Events, enablement, per-organization credentials. |
| CDD | {{ product_name }} | 9443 | Any | The organization's client credentials | Tokens, introspection, user attributes, applications, users, organizations. |
| Applications | CDD | 8900 | The public route | Access tokens with the `iam-cds` audience | The CDD APIs. |
| Browsers | CDD | 8900 | The public route | Access tokens, or the profile cookie | The Console; anonymous profiles. |
| CDD | The database | The database's port | Private | User name and password | The database. |
| CDD | ActiveMQ | 61613 | Private | User name and password | The queues. |

The calls from {{ product_name }} to CDD are served on the same port as the CDD APIs. Keep them off the public route. See [Protect the sync endpoints]({{base_path}}/deploy/customer-data-directory/security-guide/#protect-the-sync-endpoints).

## Containers

CDD suits a container as it is: one process in the foreground, logs on standard output, stopped with SIGTERM.

- Run `cdd start` as a non-root user, and expose port 8900 with `addr.host: 0.0.0.0`.
- Mount `deployment.yaml` and the TLS material, and pass secrets as environment variables. A variable set in the environment takes precedence over `secrets.env`.
- Probe `/cds/api/v1/health` for liveness and `/cds/api/v1/ready` for readiness.
- On Kubernetes, use a rolling update with `maxUnavailable: 0`, and set `terminationGracePeriodSeconds` above `shutdown.grace_period_seconds`.

## Monitor

| Signal | Source |
|---|---|
| Liveness | `GET /cds/api/v1/health` |
| Readiness, including the database | `GET /cds/api/v1/ready` |
| Configuration problems | The warnings CDD logs at start. |
| Logs | The application, access and audit logs, on standard output or in files. |

## Backup and recovery

| What | How |
|---|---|
| An external database | Its own backups, for example `pg_dump` or continuous archiving for PostgreSQL. |
| The inbuilt database | `repository/database/cds.db`, with CDD stopped. |
| `SERVICE_CREDENTIALS_ENCRYPTION_KEY` | In your secret manager, separately from the database backups. |
| `deployment.yaml`, `secrets.env` and the TLS material | With the rest of your configuration. |

To restore, restore the database with the same encryption key, then the configuration, and start CDD. Users and their attributes stay in {{ product_name }}.

## Upgrade

1. Back up the database and the configuration.
2. Stop all instances.
3. Apply the database changes in the release notes of each release you move past, if any.
4. Extract the new pack, and carry over `deployment.yaml`, `secrets.env` and the TLS material. Compare `deployment.yaml` with the new pack's for new settings.
5. Start the instances, and check their start-up warnings and `/cds/api/v1/ready`.

## Production checklist

| Area | Check |
|---|---|
| {{ product_name }} | Updated to the latest update level, with the `[customer_data_service]` block in place. |
| Pattern | The deployment pattern fits the availability you need. |
| Database | An external database, with TLS. |
| Queue | ActiveMQ for more than one instance. |
| Hostnames | `addr.host` and `server_url` are set for the deployment's names. |
| Sync endpoints | Off the public route, reached by {{ product_name }} on a private address, with a generated sync password. |
| Certificates | The default key pair is replaced on both sides, each side trusts the other, and CDD logs no certificate warning at start. |
| Secrets | Out of `deployment.yaml`; the encryption key is set, identical on every instance, and backed up. |
| Hardening | The [security guidelines]({{base_path}}/deploy/customer-data-directory/security-guide/#security-guidelines) are applied. |
| Operations | Health checks, log collection and backups are in place. |
