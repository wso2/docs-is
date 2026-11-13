# Connect to {{ product_name }}

{{ product_name }} carries its side of the integration. Connecting the Customer Data Service (CDS) takes one block in the configuration of {{ product_name }}, the matching settings in CDS, and enabling it for each organization.

## Before you begin

- [Install CDS]({{base_path}}/deploy/customer-data-service/install/).
- Make sure each side trusts the other's certificate. See [Certificates]({{base_path}}/deploy/customer-data-service/secure/#certificates). A pack and a default {{ product_name }} on the same host already trust each other.

## Switch it on in {{ product_name }}

Add the following to `<IS_HOME>/repository/conf/deployment.toml` and restart {{ product_name }}.

```toml
[customer_data_service]
enable = true
server_url = "https://cds.example.com:8900"
admin_username = "cds-sync"
admin_password = "$env{CDS_ADMIN_PASSWORD}"
```

| Property | Description |
|---|---|
| `enable` | Switches the integration on. |
| `server_url` | Where {{ product_name }} reaches CDS. |
| `admin_username`, `admin_password` | The sync credential {{ product_name }} presents to CDS. It is a shared secret between the two, not a user account. |

Keep the password out of the file. See [Set passwords using environment variables]({{base_path}}/deploy/security/set-passwords-using-environment-variables-or-system-properties/) and [Encrypt passwords with Cipher Tool]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool/).

With `enable = true`, {{ product_name }} also registers what the integration needs: the event handlers, CDS API resources and their scopes, and the **Customer Data** pages of the Console. Without the block, nothing of the integration is active.

## Match the settings in CDS

In `<CDS_HOME>/repository/conf/deployment.yaml`:

| Setting | Value |
|---|---|
| `auth_server.host`, `auth_server.port` | The host and HTTPS port of {{ product_name }}. |
| `auth_server.admin_username` | The same as `admin_username` above. |
| `AUTH_SERVER_ADMIN_PASSWORD` | The same as `admin_password` above, supplied as a [secret]({{base_path}}/deploy/customer-data-service/secure/#secrets). |
| `server_url` | The public base URL of CDS. |

A pack's defaults match a default {{ product_name }} on the same host.

## Enable it for an organization

Each root organization enables CDS for itself. See [Enable Customer Data Service]({{base_path}}/guides/customer-data/enable-customer-data-service/).

When an organization enables it:

1. {{ product_name }} creates an application named **Customer Data Service** in the organization. It cannot be edited or deleted.
2. {{ product_name }} sends the application's client credentials to CDS, which verifies them and stores them encrypted. CDS uses them for its calls to {{ product_name }} for that organization, and never holds administrator credentials.
3. CDS synchronizes the organization's profile attributes with its user attributes, and adds the default consent categories.

Until then, CDS refuses the organization's requests. Turning CDS off and on again for an organization issues new credentials.

## What {{ product_name }} sends CDS

| When | CDS |
|---|---|
| A user is added | Creates the user's profile, or makes the browser's anonymous profile theirs. |
| A user signs in | Attaches the browser's anonymous profile to the user, and unifies it with the user's profile. |
| A user's attributes change | Updates the profile's identity attributes. |
| A user is deleted | Marks the profile deleted. |
| A session ends | Deactivates the browser's profile cookie. |
| A user attribute is added, changed or removed | Resynchronizes the organization's profile attributes. |

CDS also resynchronizes each organization's profile attributes on an interval (`sync.schema.interval`), so a missed event is corrected.

## Let applications call CDS

Applications call CDS with access tokens issued by {{ product_name }}. CDS accepts a token that:

- is a JWT issued for the organization in the request path
- carries the `iam-cds` audience, and has not expired
- {{ product_name }} reports as active
- carries the scope of the operation

Register the application, set its access token type to **JWT**, add `iam-cds` to its audience, and authorize CDS API resources it calls, with only the scopes it needs. See the [use cases]({{base_path}}/guides/customer-data/use-cases/).
