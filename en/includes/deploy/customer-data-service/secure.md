# Secure the Customer Data Service

## Certificates

The Customer Data Service (CDS) serves HTTPS and calls {{ product_name }} over HTTPS. So CDS needs a certificate for the names it is reached by, {{ product_name }} has to trust that certificate, and CDS has to trust the certificate of {{ product_name }}.

!!! warning "Replace the default key pair"
    A pack carries the default key pair of {{ product_name }} as its `server.crt` and `server.key`, and trusts that certificate. A default {{ product_name }} trusts it too, so the two work together on one host with no setup. The certificate is issued for `localhost` only, and its private key ships with every {{ product_name }} download: anyone can present it. Replace it before the deployment carries real traffic. `cds verify` reports the default as a failed check.

### Replace the CDS certificate

1. Get a certificate for every name CDS is reached by, with its private key, in PEM. A name browsers reach needs a certificate browsers trust.
2. Put them in `tls.cert_dir` as `server.crt` and `server.key`, readable only by the CDS user.
3. Restart CDS.

### Trust CDS in {{ product_name }}

Import the CDS certificate, or the CA that issued it, into the client trust store of {{ product_name }}, and restart {{ product_name }}.

```bash
keytool -importcert -noprompt -alias cds \
  -file <CDS_HOME>/repository/resources/security/server.crt \
  -keystore <IS_HOME>/repository/resources/security/client-truststore.{{content.default_keystore_ext}} \
  -storetype {{content.default_keystore_type}} -storepass <truststore-password>
```

### Trust {{ product_name }} in CDS

Add the certificate of {{ product_name }}, or its CA, to `trust_store.pem`, and restart CDS. For example, from a running server:

```bash
openssl s_client -connect is.example.com:9443 -servername is.example.com </dev/null 2>/dev/null \
  | openssl x509 >> <CDS_HOME>/repository/resources/security/trust_store.pem
```

Check that the certificate you add is the one you expect.

## Secrets

Credentials never go into `deployment.yaml`. The configuration refers to them as `${NAME}`, and CDS reads each from the environment at start.

| Variable | Description | Needed |
|---|---|---|
| `AUTH_SERVER_ADMIN_PASSWORD` | The sync credential's password, matching `[customer_data_service] admin_password`. | Always. |
| `SERVICE_CREDENTIALS_ENCRYPTION_KEY` | Encrypts the stored per-organization credentials. | In production. |
| `DB_PASSWORD` | The PostgreSQL password. | With PostgreSQL. |
| `BROKER_PASSWORD` | The ActiveMQ password. | With ActiveMQ. |

Set them in the environment, or in `<CDS_HOME>/repository/conf/secrets.env`, one `KEY=VALUE` per line, readable only by the CDS user. A variable already set in the environment takes precedence over the file, so a secret manager or a Kubernetes Secret can supply them.

### The sync credential

{{ product_name }} presents the sync credential when it sends CDS events, organization enablement and credentials. Use a long random value, for example from `openssl rand -base64 32`. To rotate it, change it on both sides and restart both.

### The encryption key

CDS encrypts the credentials {{ product_name }} sends for each organization (AES-256-GCM) with `SERVICE_CREDENTIALS_ENCRYPTION_KEY`. Generate it with `openssl rand -base64 32`.

- Give every instance the same key.
- Back it up separately from the database. Without it, the stored credentials cannot be read, and CDS cannot call {{ product_name }} for those organizations until each is turned off and on again.
- A key that is set but not usable stops CDS at start.

## Security guidelines

Apply these with the [security guidelines]({{base_path}}/deploy/security/security-guidelines/) of {{ product_name }}.

### Product level

- Apply WSO2 updates to CDS as they are released.
- Replace the default key pair.
- Keep every credential out of `deployment.yaml`, and set the encryption key.
- Allow only the origins that need CDS in `auth.cors_allowed_origins`; let each organization list its own applications.
- Give each application only CDS scopes it uses.
- Avoid `DEBUG` logging in production.

### OS level

- Run CDS as its own user, without a login shell, owning `<CDS_HOME>`. Never run it as root.
- Make `secrets.env` and the private key readable only by that user.
- Allow only the ports in [Network flows]({{base_path}}/deploy/customer-data-service/production-deployment/#network-flows) through the host firewall.
- Keep the operating system up to date.

### Network level

- Expose CDS to the internet only as far as browsers need it. {{ product_name }} and your application backends can reach it on an internal network.
- Keep the database and the message broker on an internal network, reachable only from CDS, with TLS.
- Run two or more instances behind a load balancer for failover.
