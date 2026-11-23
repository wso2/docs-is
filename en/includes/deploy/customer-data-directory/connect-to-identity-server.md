# Connect to {{ product_name }}

{{ product_name }} carries its side of the integration. Connecting the Customer Data Directory (CDD) takes one block in the configuration of {{ product_name }}, the matching settings in CDD, and enabling it for each organization.

## Before you begin

- [Install CDD]({{base_path}}/deploy/customer-data-directory/install/).
- Make sure each side trusts the other's certificate. See [Certificates]({{base_path}}/deploy/customer-data-directory/secure/#certificates). A pack and a default {{ product_name }} on the same host already trust each other.

## Switch it on in {{ product_name }}

Add the following to `<IS_HOME>/repository/conf/deployment.toml` and restart {{ product_name }}.

```toml
[customer_data_service]
enable = true
server_url = "https://cdd.example.com:8900"
admin_username = "cdd-sync"
admin_password = "$env{CDD_SYNC_PASSWORD}"
```

| Property | Description |
|---|---|
| `enable` | Switches the integration on. |
| `server_url` | Where {{ product_name }} and the Console reach CDD. |
| `admin_username`, `admin_password` | The sync credential {{ product_name }} presents to CDD. It is a shared secret between the two, not a user account. |

Keep the password out of the file. See [Set passwords using environment variables]({{base_path}}/deploy/security/set-passwords-using-environment-variables-or-system-properties/) and [Encrypt passwords with Cipher Tool]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool/).

With `enable = true`, {{ product_name }} also registers what the integration needs: the event handlers, the CDD API resources and their scopes, and the **Customer Data** pages of the Console. Without the block, nothing of the integration is active.

## Match the settings in CDD

In `<CDD_HOME>/repository/conf/deployment.yaml`:

| Setting | Value |
|---|---|
| `auth_server.host`, `auth_server.port` | The host and HTTPS port of {{ product_name }}. |
| `auth_server.admin_username` | The same as `admin_username` above. |
| `AUTH_SERVER_ADMIN_PASSWORD` | The same as `admin_password` above, supplied as a [secret]({{base_path}}/deploy/customer-data-directory/secure/#secrets). |
| `SERVICE_CREDENTIALS_ENCRYPTION_KEY` | A key generated for this installation, supplied as a [secret]({{base_path}}/deploy/customer-data-directory/secure/#the-encryption-key). |
| `server_url` | The public base URL of CDD. |
| `auth.cors_allowed_origins` | The origin of {{ product_name }}, for the Console. See [CORS]({{base_path}}/deploy/customer-data-directory/configure/#cors). |
| `auth_server.cookieDomain` | A domain that both CDD and {{ product_name }} are under. See [Anonymous profiles at sign-in]({{base_path}}/deploy/customer-data-directory/configure/#anonymous-profiles-at-sign-in). |

A pack's defaults match a default {{ product_name }} on the same host, except for the two secrets.

## Enable it for an organization

Each root organization enables CDD for itself. See [Enable Customer Data Directory]({{base_path}}/guides/customer-data/enable-customer-data-service/).

When an organization enables it:

1. {{ product_name }} creates an application named **Customer Data Service** in the organization. It cannot be edited or deleted.
2. {{ product_name }} sends the application's client credentials to CDD, which verifies them and stores them encrypted with `SERVICE_CREDENTIALS_ENCRYPTION_KEY`. CDD uses them for its calls to {{ product_name }} for that organization, and never holds administrator credentials.
3. CDD synchronizes the organization's profile attributes with its user attributes, and adds the default consent categories.

Until then, CDD refuses the organization's requests. Turning CDD off and on again for an organization issues new credentials.

!!! warning "Set the encryption key first"
    Without `SERVICE_CREDENTIALS_ENCRYPTION_KEY`, CDD refuses the credentials {{ product_name }} sends, and falls back to the clients configured under `auth_server` for every organization. Set the key before you enable the first organization.

## What {{ product_name }} sends CDD

| When | CDD |
|---|---|
| A user is added | Creates the user's profile, or makes the browser's anonymous profile theirs. |
| A user signs in | Attaches the browser's anonymous profile to the user, and unifies it with the user's profile. |
| A user's attributes change | Updates the profile's identity attributes. |
| A user is deleted | Marks the profile deleted. |
| A session ends | Deactivates the browser's profile cookie. |
| A user attribute is added, changed or removed | Resynchronizes the organization's profile attributes. |

## Let applications call CDD

Applications call CDD with access tokens issued by {{ product_name }}. CDD accepts a token that:

- is a JWT issued for the organization in the request path
- carries the `iam-cds` audience, and has not expired
- {{ product_name }} reports as active
- carries the scope of the operation

Register the application, set its access token type to **JWT**, add `iam-cds` to its audience, and authorize the CDD API resources it calls, with only the scopes it needs. See the [use cases]({{base_path}}/guides/customer-data/use-cases/).
