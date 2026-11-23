# Configure the Customer Data Directory

All configuration is in `<CDD_HOME>/repository/conf/deployment.yaml`. Restart the Customer Data Directory (CDD) after a change. Every setting is listed in the [configuration catalog]({{base_path}}/deploy/customer-data-directory/configuration-catalog/).

## Hostnames

### Listen address

CDD listens on `addr.host`:`addr.port`, `127.0.0.1:8900` by default, which only clients on the same host can reach. Set `addr.host` to `0.0.0.0`, or to the interface to listen on, when {{ product_name }}, a load balancer or browsers reach it from elsewhere.

```yaml
addr:
  host: 0.0.0.0
  port: 8900
```

### Public name

CDD is reached by {{ product_name }}, by the Console, by your applications and by browsers. One name usually serves all of them.

| Setting | Where | Description |
|---|---|---|
| `server_url` | `deployment.yaml` | The public base URL of CDD. |
| `[customer_data_service] server_url` | `deployment.toml` of {{ product_name }} | Where {{ product_name }} and the Console reach CDD. |

A name that browsers reach needs a certificate that browsers trust. See [Certificates]({{base_path}}/deploy/customer-data-directory/secure/#certificates).

### Behind a load balancer

CDD serves HTTPS itself, so a load balancer in front of it either passes TLS through or re-encrypts to CDD. Point `server_url` at the load balancer. Instances keep no session state, so the load balancer needs no session affinity. Use `/cds/api/v1/ready` as its health check.

## Anonymous profiles at sign-in

Creating an anonymous profile sets a `cds_profile` cookie in the browser. When the user signs in, {{ product_name }} attaches that anonymous profile to the user, taking it from:

- the `cds_profile` cookie, when the browser sends it to {{ product_name }}, or
- the `anonymous_profile_tracker` parameter of the authorization request.

CDD sets the cookie for the domain in `auth_server.cookieDomain`. For the browser to accept the cookie and send it to {{ product_name }}, that domain has to cover the names of both:

- A browser refuses the cookie when the domain does not cover the name of CDD.
- A browser does not send the cookie to {{ product_name }} when the domain does not cover the sign-in name of {{ product_name }}.

So give CDD and the sign-in host of {{ product_name }} names under one parent domain, for example `cdd.example.com` and `login.example.com`, and set that parent domain:

```yaml
auth_server:
  cookieDomain: "example.com"
```

Ports do not matter to cookies, which is why the default, `localhost`, works for both on one host. The cookie is `HttpOnly`, `SameSite=None` and, except on `localhost`, `Secure`, so it needs HTTPS end to end. Where the names cannot share a parent domain, pass the `anonymous_profile_tracker` parameter instead.

## CORS

Browsers call CDD from other origins: the Console, which {{ product_name }} serves, and your applications. CDD allows:

| Origins | Set in | Apply to |
|---|---|---|
| Deployment-wide | `auth.cors_allowed_origins` | Every organization's requests. List the origin of {{ product_name }} here, for the Console. |
| Per organization | `cors_allowed_origins` in the organization's settings, through the `/cds/api/v1/config` API | That organization's requests only. Each organization lists its own applications here. |

The pack allows `https://localhost:9443`, the origin of a default {{ product_name }} on the same host. When {{ product_name }} is reached by another name, list its public origin, or the Console cannot call CDD:

```yaml
auth:
  cors_allowed_origins:
    - "https://login.example.com"
```

## Database

| | Inbuilt database | PostgreSQL, MySQL, SQL Server or Oracle |
|---|---|---|
| `datasource.type` | `sqlite` (the pack default) | `postgres`, `mysql`, `mssql` or `oracle` |
| Instances | One. | Any number. |
| Setup | None; CDD creates the file in `repository/database/`. | Create the database and its schema. |
| Use for | Evaluation. | Production. |

The inbuilt database is a single file used by a single process. Profile filters scan the whole table, and case-insensitive matching covers ASCII characters only.

### Use an external database

1. Create a database, and a user that owns it.
2. Create the schema with the script for your database from `<CDD_HOME>/repository/dbscripts/`: `postgres.sql`, `mysql.sql`, `mssql.sql` or `oracle.sql`. For example, for PostgreSQL:

    ```bash
    psql -h <db-host> -U cdd -d cdd_db -f <CDD_HOME>/repository/dbscripts/postgres.sql
    ```

3. Point CDD at it, and supply the password as `DB_PASSWORD`.

    ```yaml
    datasource:
      type: "postgres"
      hostname: "db.example.com"
      port: 5432
      username: "cdd"
      password: "${DB_PASSWORD}"
      name: "cdd_db"
      sslmode: verify-full
    ```

For Oracle, `name` is the service name of the pluggable database.

`sslmode` is `disable`, `require`, `verify-ca` or `verify-full`. Use `require` or stronger unless the database is on the same host.

Each instance holds its own connection pool, set under `datasource.postgres`, `datasource.mysql`, `datasource.mssql` or `datasource.oracle`. Keep the number of instances multiplied by `max_open_conns` within the connection limit of the database, with room for administration.

## Message queue

Unification and profile-attribute synchronization run through two queues.

| `message_queue.type` | Behavior | Use for |
|---|---|---|
| `memory` (default) | A buffer inside the process. Work still queued when the process stops is lost, and new work is dropped while the buffer is full. | Evaluation, and single instances that can tolerate it. |
| `activemq` | Durable queues on an ActiveMQ broker, over STOMP. | Production, and always with more than one instance. |

```yaml
message_queue:
  type: "activemq"
  broker:
    addr: "mq.example.com:61613"
    username: "cdd"
    password: "${BROKER_PASSWORD}"
```

Enable the STOMP connector on the broker. All instances use the same broker and queue names. CDD reconnects when the connection drops.

## Logs

CDD writes three logs:

| Log | Records | File, when written to a file |
|---|---|---|
| Application, `log.app` | What the server and its workers do. | `cds.log` |
| Access, `log.access` | One record for each HTTP request. | `http_access.log` |
| Audit, `log.audit` | Who did what to which resource, with what outcome. Always JSON. | `audit.log` |

By default all three go to standard output. `log.outputs` sets the outputs for all of them, and each log can override them in its own block. To also write rotating files:

```yaml
log:
  outputs:
    file:
      enabled: true
      dir: "repository/logs"
```

The application log level is `log.app.level`, `INFO` by default. Avoid `DEBUG` in production.

## Sub organizations

CDD serves [organizations]({{base_path}}/guides/organization-management/) through `organization_management.enabled`, which the pack turns on. Sub organizations use CDD through their root organization, under `/o/<organization-id>/cds/api/v1`, with the `internal_org_cds_*` scopes.
