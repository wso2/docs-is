# Configure the Customer Data Service

All configuration is in `<CDS_HOME>/repository/conf/deployment.yaml`. Restart the Customer Data Service (CDS) after a change. Every setting is listed in the [configuration catalog]({{base_path}}/deploy/customer-data-service/configuration-catalog/).

## Hostnames

### Listen address

CDS listens on `addr.host`:`addr.port`, `127.0.0.1:8900` by default, which only clients on the same host can reach. Set `addr.host` to `0.0.0.0`, or to the interface to listen on, when {{ product_name }}, a load balancer or browsers reach it from elsewhere.

```yaml
addr:
  host: 0.0.0.0
  port: 8900
```

### Public name

CDS is reached by {{ product_name }}, by your applications and by browsers. One name usually serves all of them.

| Setting | Where | Description |
|---|---|---|
| `server_url` | `deployment.yaml` | The public base URL of CDS. |
| `[customer_data_service] server_url` | `deployment.toml` of {{ product_name }} | Where {{ product_name }} reaches CDS. |

A name that browsers reach needs a certificate that browsers trust. See [Certificates]({{base_path}}/deploy/customer-data-service/secure/#certificates).

### Behind a load balancer

CDS serves HTTPS itself, so a load balancer in front of it either passes TLS through or re-encrypts to CDS. Point `server_url` at the load balancer. Instances keep no session state, so the load balancer needs no session affinity. Use `/cds/api/v1/ready` as its health check.

## Anonymous profiles at sign-in

Creating an anonymous profile sets a `cds_profile` cookie in the browser. When the user signs in, {{ product_name }} attaches that anonymous profile to the user, taking it from:

- the `cds_profile` cookie, when the browser sends it to {{ product_name }}, or
- the `anonymous_profile_tracker` parameter of the authorization request.

For the cookie to reach {{ product_name }}, give CDS and the sign-in host of {{ product_name }} names under one parent domain, for example `cds.example.com` and `login.example.com`, and set that parent domain as `auth_server.cookieDomain`:

```yaml
auth_server:
  cookieDomain: "example.com"
```

The cookie is `HttpOnly`, `SameSite=None` and, except on `localhost`, `Secure`, so it needs HTTPS end to end. Where the names cannot share a parent domain, pass the `anonymous_profile_tracker` parameter instead.

## CORS

Browsers call CDS from other origins: the Console, and your applications. CDS allows:

| Origins | Set in | Apply to |
|---|---|---|
| Deployment-wide | `auth.cors_allowed_origins` | Every organization's requests. List the origin of {{ product_name }} here, for the Console. |
| Per organization | `cors_allowed_origins` in the organization's settings, through the `/cds/api/v1/config` API | That organization's requests only. Each organization lists its own applications here. |

```yaml
auth:
  cors_allowed_origins:
    - "https://login.example.com"
```

## Database

| | Inbuilt database | PostgreSQL |
|---|---|---|
| `datasource.type` | `sqlite` (the pack default) | `postgres` |
| Instances | One. | Any number. |
| Setup | None; CDS creates the file in `repository/database/`. | Create the database and its schema. |
| Use for | Evaluation. | Production. |

The inbuilt database is a single file used by a single process. Profile filters scan the whole table, and case-insensitive matching covers ASCII characters only.

### Use PostgreSQL

1. Create a database and a user that owns it.

    ```sql
    CREATE USER cds WITH PASSWORD '<password>';
    CREATE DATABASE cds_db OWNER cds;
    ```

2. Create the schema.

    ```bash
    psql -h <db-host> -U cds -d cds_db -f <CDS_HOME>/repository/dbscripts/postgres.sql
    ```

3. Point CDS at it, and supply the password as `DB_PASSWORD`.

    ```yaml
    datasource:
      type: "postgres"
      hostname: "db.example.com"
      port: 5432
      username: "cds"
      password: "${DB_PASSWORD}"
      name: "cds_db"
      sslmode: verify-full
    ```

Use `sslmode: require` or `verify-full` unless the database is on the same host.

Each instance holds its own connection pool, set under `datasource.postgres`. Keep the number of instances multiplied by `max_open_conns` within the `max_connections` of PostgreSQL, with room for administration.

## Message queue

Unification and profile-attribute synchronization run through two queues.

| `message_queue.type` | Behavior | Use for |
|---|---|---|
| `memory` (default) | A buffer inside the process. Work still queued when the process stops is lost, and new work is dropped while the buffer is full. | Evaluation, and single instances that can tolerate it. |
| `activemq` | Durable queues on an ActiveMQ Classic broker, over STOMP. | Production, and always with more than one instance. |

```yaml
message_queue:
  type: "activemq"
  broker:
    addr: "mq.example.com:61613"
    username: "cds"
    password: "${BROKER_PASSWORD}"
```

Enable the STOMP connector on the broker. All instances use the same broker and queue names. CDS reconnects when the connection drops.

## Sub organizations

To use CDS in [organizations]({{base_path}}/guides/organization-management/), set `organization_management.enabled: true`, after creating the organization tables (`002-organization-management-postgres.sql` on an existing database). Sub organizations use CDS through their root organization, under `/o/<organization-id>/cds/api/v1`, with the `internal_org_cds_*` scopes.
