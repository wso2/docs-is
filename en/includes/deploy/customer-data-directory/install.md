# Install the Customer Data Directory

## Prerequisites

### Environment compatibility

| | Supported |
|---|---|
| Operating system | Linux and macOS, on x86_64 (`amd64`) and ARM64 (`arm64`). Windows, on x86_64 (`amd64`). |
| {{ product_name }} | See [Product compatibility]({{base_path}}/deploy/customer-data-directory/production-deployment/#product-compatibility). |
| Database | The inbuilt database, for evaluation. PostgreSQL, MySQL, SQL Server or Oracle, for production. |
| Message broker | ActiveMQ, over STOMP, for more than one instance. |

### Required applications

The Customer Data Directory (CDD) is a single, statically linked executable. It needs no Java runtime or other software to run.

| Application | Needed for |
|---|---|
| `unzip` | Extracting the pack. |
| `openssl`, and `keytool` from the JDK of {{ product_name }} | Replacing certificates and adding them to trust stores. |

### Disk

With the inbuilt database, allow for the database file to grow with your profiles. CDD logs to standard output by default, so log storage is wherever your service manager or container runtime keeps it. File logs, when you turn them on, rotate by size and by day.

## Install

Extracting the pack is the installation. Pick the pack for the machine, `cdd-<os>-<arch>-<version>.zip`, for example `cdd-linux-amd64-<version>.zip`, and verify it against the `.sha256` file published with it.

```bash
unzip cdd-linux-amd64-<version>.zip -d /opt
cd /opt/cdd-linux-amd64-<version>
```

This directory is referred to as `<CDD_HOME>`.

| Path | Holds |
|---|---|
| `bin/cdd` | CDD. `cdd.exe` on Windows. |
| `bin/start.sh` | Starts CDD in the foreground. `start.bat` on Windows. |
| `repository/conf/deployment.yaml` | The configuration. |
| `repository/conf/compatibility.yaml` | The {{ product_name }} versions this release supports. |
| `repository/conf/secrets.env` | The secrets, shipped empty for you to fill in. |
| `repository/database/` | The inbuilt database, when it is used. |
| `repository/dbscripts/` | The schema for each external database. |
| `repository/resources/security/` | The TLS certificate, key and trust store. |
| `updates/product.txt` | The product identity of the pack, for WSO2 Updates. |

On Windows, extract the zip and use `bin\start.bat` and `bin\cdd.exe`. Everything else is the same.

On macOS, the executable is not notarized. If a browser downloaded the zip and Finder extracted it, macOS blocks it as coming from an unidentified developer. Clear the quarantine flag once, after extracting:

```bash
xattr -dr com.apple.quarantine cdd-darwin-arm64-<version>
```

## Run

Before the first start, fill in `repository/conf/secrets.env`. See [Secrets]({{base_path}}/deploy/customer-data-directory/secure/#secrets).

```bash
cd <CDD_HOME>
bin/start.sh            # or bin/cdd start
bin/start.sh --debug    # with logging at DEBUG
```

CDD runs in the foreground and logs to standard output. To stop it, press Ctrl+C or send it SIGTERM: it stops taking requests and finishes the work in flight within `shutdown.grace_period_seconds` (25 by default). It refuses to start when its port is already taken.

### Verify

At start, CDD warns when it still presents the pack's default certificate, and when the sync credential's password or the encryption key is empty, naming the variable to set.

The health endpoints answer without a token:

| Endpoint | Answers when |
|---|---|
| `GET /cds/api/v1/health` | the process is serving |
| `GET /cds/api/v1/ready` | its database answers as well |

```bash
curl --cacert repository/resources/security/server.crt https://localhost:8900/cds/api/v1/ready
```

## Run as a service

CDD runs in the foreground and stops on SIGTERM, which is what a service manager expects. Run it as its own user, never as root.

On Linux, with systemd:

```bash
sudo useradd --system --home-dir /opt/cdd --shell /usr/sbin/nologin cdd
sudo chown -R cdd:cdd /opt/cdd
```

Create `/etc/systemd/system/cdd.service`:

```ini
[Unit]
Description=WSO2 Customer Data Directory
After=network-online.target
Wants=network-online.target

[Service]
User=cdd
Group=cdd
WorkingDirectory=/opt/cdd
ExecStart=/opt/cdd/bin/cdd start
Restart=on-failure
TimeoutStopSec=40

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now cdd
journalctl -u cdd -f
```

Keep `TimeoutStopSec` above `shutdown.grace_period_seconds`, so CDD can finish its work before it is killed.

On macOS, a launchd job runs it the same way. On Windows, CDD does not register as a Windows service itself, so run `bin\cdd.exe start` under a service wrapper.

## Get updates

A release that is available through WSO2 Updates carries the setup script of the update tool in `bin/`, which identifies the pack by `updates/product.txt`. Updates can include database changes; apply them as described in [Upgrade]({{base_path}}/deploy/customer-data-directory/production-deployment/#upgrade).

## Uninstall

1. Turn CDD off for each organization, and remove the `[customer_data_service]` block from the `deployment.toml` of {{ product_name }}.
2. Stop CDD, and remove its service.
3. Delete `<CDD_HOME>`. With an external database, drop the database if its data is no longer needed.

## Next steps

[Connect CDD to {{ product_name }}]({{base_path}}/deploy/customer-data-directory/connect-to-identity-server/).
