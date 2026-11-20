# Install the Customer Data Service

## Prerequisites

### Environment compatibility

| | Supported |
|---|---|
| Operating system | Linux, on x86_64 (`amd64`) and ARM64 (`arm64`). |
| {{ product_name }} | See [Product compatibility]({{base_path}}/deploy/customer-data-service/production-deployment/#product-compatibility). |
| Database | The inbuilt database, for evaluation. PostgreSQL, for production (tested with PostgreSQL 15). |
| Message broker | ActiveMQ Classic over STOMP, for more than one instance (tested with 5.18). |

### Required applications

The Customer Data Service (CDS) is a single, statically linked executable. It needs no Java runtime or other software to run.

| Application | Needed for |
|---|---|
| `unzip` | Extracting the pack. |
| `openssl`, and `keytool` from the JDK of {{ product_name }} | Replacing certificates and adding them to trust stores. |

### Disk

The pack takes about 20 MB. With the inbuilt database, allow for the database file to grow with your profiles. CDS logs to standard output, so log storage is wherever your service manager or container runtime keeps it.

## Install

Extracting the pack is the installation. Pick the pack for the machine's architecture, `cds-linux-amd64-<version>.zip` or `cds-linux-arm64-<version>.zip`, and verify it against the `.sha256` file published with it.

```bash
unzip cds-linux-amd64-<version>.zip -d /opt
cd /opt/cds-linux-amd64-<version>
```

This directory is referred to as `<CDS_HOME>`.

| Path | Holds |
|---|---|
| `cds` | CDS, and the `cds verify` command. |
| `start.sh` | Starts CDS in the foreground. |
| `repository/conf/deployment.yaml` | The configuration. |
| `repository/conf/compatibility.yaml` | The {{ product_name }} versions this release supports. |
| `repository/conf/secrets.env` | Optional; the secrets, written by you. |
| `repository/database/` | The inbuilt database, when it is used. |
| `repository/dbscripts/` | The PostgreSQL schema and its upgrade scripts. |
| `repository/resources/security/` | The TLS certificate, key and trust store. |
| `bin/update_tool_setup.sh` | Sets up the WSO2 update tool. |

## Run

```bash
cd <CDS_HOME>
./start.sh            # or ./cds start
./start.sh --debug    # with logging at DEBUG
```

CDS runs in the foreground and logs to standard output. To stop it, press Ctrl+C or send it SIGTERM: it stops taking requests and finishes the work in flight within `shutdown.grace_period_seconds` (25 by default). It refuses to start when its port is already taken.

### Verify

```bash
./cds verify
```

`cds verify` changes nothing. It checks that:

- CDS is ready at its configured address, and its database is reachable
- it presents a certificate issued for this deployment rather than the pack's default, valid for the host in `server_url`
- {{ product_name }} is reachable, and its certificate is trusted

The health endpoints answer without a token:

| Endpoint | Answers when |
|---|---|
| `GET /cds/api/v1/health` | the process is serving |
| `GET /cds/api/v1/ready` | its database answers as well |

## Run as a Linux service

CDS runs in the foreground and stops on SIGTERM, which is what systemd expects. Run it as its own user, never as root.

```bash
sudo useradd --system --home-dir /opt/cds --shell /usr/sbin/nologin cds
sudo chown -R cds:cds /opt/cds
```

Create `/etc/systemd/system/cds.service`:

```ini
[Unit]
Description=WSO2 Customer Data Service
After=network-online.target
Wants=network-online.target

[Service]
User=cds
Group=cds
WorkingDirectory=/opt/cds
ExecStart=/opt/cds/cds start
Restart=on-failure
TimeoutStopSec=40

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now cds
journalctl -u cds -f
```

Keep `TimeoutStopSec` above `shutdown.grace_period_seconds`, so CDS can finish its work before it is killed.

## Get updates

Released packs carry `bin/update_tool_setup.sh`, which sets up the WSO2 update tool for the pack. Updates can include database changes; apply them as described in [Upgrade]({{base_path}}/deploy/customer-data-service/production-deployment/#upgrade).

## Uninstall

1. Turn CDS off for each organization, and remove the `[customer_data_service]` block from the `deployment.toml` of {{ product_name }}.
2. Stop CDS, and remove its systemd unit.
3. Delete `<CDS_HOME>`. With PostgreSQL, drop the database if its data is no longer needed.

## Next steps

[Connect CDS to {{ product_name }}]({{base_path}}/deploy/customer-data-service/connect-to-identity-server/).
