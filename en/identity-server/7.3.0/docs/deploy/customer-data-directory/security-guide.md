# Secure the Customer Data Directory

This guide covers the certificates, the endpoints {{ product_name }} calls, the secrets and the hardening of a Customer Data Directory (CDD) deployment. To install and connect CDD, see the [deployment guide]({{base_path}}/deploy/customer-data-directory/deployment-guide/).

## Certificates

CDD serves HTTPS and calls {{ product_name }} over HTTPS. So CDD needs a certificate for the names it is reached by, {{ product_name }} has to trust that certificate, and CDD has to trust the certificate of {{ product_name }}.

The TLS material is in `<CDD_HOME>/repository/resources/security/`:

| File | Holds |
|---|---|
| `server.crt`, `server.key` | The certificate CDD presents, and its private key, in PEM. |
| `trust_store.pem` | The certificates of {{ product_name }}, or its CA, that CDD trusts when it calls {{ product_name }}. CDD trusts the system's CAs as well. |
| `client_trust_store.pem` | The client certificates the sync endpoints accept, when they [require one](#require-a-client-certificate). Never the system's CAs. |

!!! warning "Replace the default key pair"
    A pack carries the default key pair of {{ product_name }} {{ is_version }} as its `server.crt` and `server.key`, and trusts that certificate. A default {{ product_name }} trusts it too, so the two work together on one host with no setup. The certificate is issued for `localhost` only, and its private key ships with every {{ product_name }} download: anyone can present it. Replace it before the deployment carries real traffic. CDD warns at start while the default is in use.

### Replace the CDD certificate

1. Get a certificate for every name CDD is reached by, with its private key, in PEM. A name browsers reach needs a certificate browsers trust.
2. Put them in `<CDD_HOME>/repository/resources/security/` as `server.crt` and `server.key`, readable only by the CDD user.
3. Restart CDD.

### Trust CDD in {{ product_name }}

Import the CDD certificate, or the CA that issued it, into the client trust store of {{ product_name }}, and restart {{ product_name }}.

```bash
keytool -importcert -noprompt -alias cdd \
  -file <CDD_HOME>/repository/resources/security/server.crt \
  -keystore <IS_HOME>/repository/resources/security/client-truststore.{{content.default_keystore_ext}} \
  -storetype {{content.default_keystore_type}} -storepass <truststore-password>
```

### Trust {{ product_name }} in CDD

Add the certificate of {{ product_name }}, or its CA, to `trust_store.pem`, and restart CDD. For example, from a running server:

```bash
openssl s_client -connect is.example.com:9443 -servername is.example.com </dev/null 2>/dev/null \
  | openssl x509 >> <CDD_HOME>/repository/resources/security/trust_store.pem
```

Check that the certificate you add is the one you expect. A certificate of {{ product_name }} from a public CA needs no entry, since CDD trusts the system's CAs.

## Protect the sync endpoints

{{ product_name }} sends CDD its users, profile schema, organizations, per-organization credentials and configuration on the sync endpoints, under `/t/<organization>/cds/api/v1/`:

| Method | Path |
|---|---|
| `POST` | `profiles/sync` |
| `POST` | `profile-schema/sync` |
| `POST` | `organizations/event-sync` |
| `POST` | `service-credentials/sync` |
| `PATCH` | `config`, with Basic authentication. The Console updates it with an access token. |

They authenticate {{ product_name }} with the sync credential, over Basic authentication. They are served on the same port as the APIs that applications and browsers call, so they are reachable wherever CDD is. Protect them as follows:

1. **Keep them off the public route.** Only {{ product_name }} sends Basic authentication to CDD, and the APIs that applications call take access tokens. So the load balancer or ingress that applications reach CDD through can refuse every request with an `Authorization: Basic` header, and {{ product_name }} reaches CDD on a private address. For example, with NGINX:

    ```nginx
    if ($http_authorization ~* "^Basic ") {
        return 403;
    }
    ```

2. **Use a generated sync password.** Set the same long random value, for example from `openssl rand -base64 32`, as `admin_password` in the `[customer_data_service]` block of {{ product_name }} and as `AUTH_SERVER_ADMIN_PASSWORD` in CDD. To rotate it, change it on both sides and restart both.

3. **Optionally, require a client certificate** as well, so that a leaked password alone is not enough. See the next section.

## Require a client certificate

With `tls.require_client_cert`, the sync endpoints also refuse a request without a client certificate that `client_trust_store.pem` verifies, so {{ product_name }} and CDD authenticate each other with certificates: mutual TLS. CDD asks every connection for a client certificate but requires none, so the APIs that browsers and applications call keep working. It is off in the pack.

A client certificate needs the extended key usage `clientAuth`, or no extended key usage. Certificates from public CAs are now issued for TLS server authentication only, and CDD ends the handshake on one presented as a client certificate. So give {{ product_name }} a key pair of its own for CDD, from a CA of your own or self-signed, rather than its server certificate.

1. Create a key pair for {{ product_name }} with the extended key usage `clientAuth`, in a keystore in `<IS_HOME>/repository/resources/security/`. For example, a self-signed one:

    ```bash
    keytool -genkeypair -alias cdd-client -keyalg RSA -keysize 2048 -validity 825 \
      -dname "CN=is-cdd-client" -ext EKU=clientAuth -ext KU=digitalSignature \
      -keystore <IS_HOME>/repository/resources/security/cdd-client.p12 \
      -storetype PKCS12 -storepass <keystore-password>
    ```

2. Add the following to `<IS_HOME>/repository/conf/deployment.toml` and restart {{ product_name }}.

    ```toml
    [customer_data_service.client_certificate]
    file_name = "cdd-client.p12"
    type = "PKCS12"
    password = "<keystore-password>"
    alias = "cdd-client"
    ```

    | Property | Description |
    |---|---|
    | `file_name` | The keystore, in `<IS_HOME>/repository/resources/security/`. |
    | `type` | The keystore type. `PKCS12` by default. |
    | `password` | The keystore password. |
    | `alias` | The alias of the key pair. |
    | `key_password` | The password of the key. The keystore password by default. |

    Without this block, {{ product_name }} presents the key pair of its primary keystore, when it allows TLS client authentication.

3. Put the certificate of that key pair, or the CA that issued it, in `<CDD_HOME>/repository/resources/security/client_trust_store.pem`. Replace the file's content rather than adding to it: CDD refuses to start while it still trusts the default certificate of the pack beside the certificates of the deployment.

    ```bash
    keytool -exportcert -rfc -alias cdd-client \
      -keystore <IS_HOME>/repository/resources/security/cdd-client.p12 -storepass <keystore-password> \
      > <CDD_HOME>/repository/resources/security/client_trust_store.pem
    ```

4. If `client_trust_store.pem` holds a CA that issues certificates to anything other than {{ product_name }}, list the names the certificate of {{ product_name }} carries, so that only it passes. A name matches a DNS, URI or email subject alternative name, or the common name, exactly.

    ```yaml
    tls:
      client_cert_names:
        - "is-cdd-client"
    ```

5. Turn the check on in `<CDD_HOME>/repository/conf/deployment.yaml`, and restart CDD.

    ```yaml
    tls:
      require_client_cert: true
    ```

A request to a sync endpoint without an accepted certificate gets `401` with the code `CDS-10002`, and switching CDD on for an organization fails.

!!! note
    - Never put a public CA in `client_trust_store.pem`: every certificate it issues would be accepted.
    - Where a load balancer in front of CDD terminates TLS, the client certificate does not reach CDD. Require it at that load balancer or at the service mesh instead, and leave `require_client_cert` off.
    - With the default key pair of the pack, the check proves nothing, since its private key is public. Replace it first.

### Calls from CDD to {{ product_name }}

CDD calls the APIs of {{ product_name }} with the client credentials of each organization, like any other client. With `tls.mtls_enabled`, which the pack turns on, it also presents a client certificate, which {{ product_name }} does not require: `server.crt`, when it allows TLS client authentication, or the key pair in `tls.outbound_cert` and `tls.outbound_key` when they are set. CDD warns at start when `server.crt` does not allow it, and calls {{ product_name }} without a client certificate.

## Secrets

Credentials never go into `deployment.yaml`. The configuration refers to them as `${NAME}`, and CDD reads each from the environment at start.

| Variable | Description | Needed |
|---|---|---|
| `SERVICE_CREDENTIALS_ENCRYPTION_KEY` | Encrypts the stored per-organization credentials. | Always. |
| `AUTH_SERVER_ADMIN_PASSWORD` | The password of the sync credential, matching `admin_password` in `[customer_data_service]`. | Always. |
| `DB_PASSWORD` | The database password. | With an external database. |
| `BROKER_PASSWORD` | The ActiveMQ password. | With ActiveMQ. |

The pack ships `<CDD_HOME>/repository/conf/secrets.env` with every one of them listed and every value empty, one `KEY=VALUE` per line, readable only by its owner. Fill it in before the first start. A variable already set in the environment takes precedence over the file, so a secret manager or a Kubernetes Secret can supply them instead. Keep a copy of `secrets.env` outside `<CDD_HOME>`: a new pack ships it empty again.

### The encryption key

CDD encrypts the credentials {{ product_name }} sends for each organization (AES-256-GCM) with `SERVICE_CREDENTIALS_ENCRYPTION_KEY`. Generate one for each installation:

```bash
openssl rand -base64 32
```

- Never reuse a key from another installation or from an example.
- Give every instance of one deployment the same key, and keep it the same: credentials encrypted with one key cannot be read with another.
- Back it up separately from the database. Without it, CDD cannot read the stored credentials, and cannot call {{ product_name }} for those organizations until each is turned off and on again.

## Security guidelines

Apply these with the [security guidelines]({{base_path}}/deploy/security/security-guidelines/) of {{ product_name }}.

### Product level

- Apply WSO2 updates to CDD and {{ product_name }} as they are released.
- Replace the default key pair on both sides.
- Keep the sync endpoints off the public route, and use a generated sync password.
- Keep every credential out of `deployment.yaml`, and set the encryption key.
- Allow only the origins that need CDD in `auth.cors_allowed_origins`.
- Give each application only the CDD scopes it uses.
- Avoid `DEBUG` logging in production.

### OS level

- Run CDD as its own user, without a login shell, owning `<CDD_HOME>`. Never run it as root.
- Make `secrets.env` and the private keys readable only by that user.
- Allow only the ports in [Network flows]({{base_path}}/deploy/customer-data-directory/deployment-guide/#network-flows) through the host firewall.

### Network level

- Expose CDD to the internet only as far as browsers and applications need it. {{ product_name }} reaches it on a private address.
- Keep the database and the message broker on an internal network, reachable only from CDD, with TLS.
- Run two or more instances behind a load balancer for failover.
