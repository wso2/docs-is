# Manage explicit federated user associations

Explicit federated user associations allow administrators to programmatically link federated user identities from external Identity Providers (IdPs) to local user accounts in {{ product_name }}. This feature is useful when you need to pre-establish connections between federated and local users without requiring users to go through the authentication flow.

## Overview

When users authenticate through external IdPs, {{ product_name }} can automatically create associations using [Just-in-Time (JIT) provisioning]({{base_path}}/guides/authentication/jit-user-provisioning/). However, there are scenarios where you may need to create these associations explicitly through APIs:

- **Pre-migration of user associations** - Establish federated user links before users first log in.
- **Bulk user onboarding** - Create multiple associations at once when integrating with partner organizations.
- **Administrative account linking** - Link federated identities to existing local accounts based on business rules.

## Before you begin

- Ensure you have administrator privileges in {{ product_name }}.
- [Register the external IdP]({{base_path}}/guides/authentication/federated-login/) as a connection in {{ product_name }}.
- Identify the users you want to associate.

## Understand the API parameters

When creating federated user associations through the API, you need to provide specific information about both the external IdP and the federated user identity.

### Required parameters

The following parameters are required when creating an association:

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>idp</code></td>
      <td>The name of the external Identity Provider as configured in {{ product_name }}. This is the connection name you created when registering the external IdP.</td>
      <td><code>GoogleIdP</code>, <code>AzureAD</code>, <code>EnterpriseOIDC</code></td>
    </tr>
    <tr>
      <td><code>federatedUserId</code></td>
      <td>The unique identifier for the user in the external IdP. The value depends on the authentication protocol:
        <ul>
          <li><strong>OIDC</strong>: The <code>sub</code> claim value from the ID token</li>
          <li><strong>SAML</strong>: The <code>NameID</code> value from the SAML response</li>
        </ul>
      </td>
      <td>
        OIDC: <code>1234567890</code>, <code>john@example.com</code><br/>
        SAML: <code>CN=John Doe,OU=Users,DC=example,DC=com</code>
      </td>
    </tr>
  </tbody>
</table>

### How to find the federatedUserId value

The `federatedUserId` corresponds to the subject identifier that the external IdP uses to uniquely identify a user:

**For OIDC connections:**

The `federatedUserId` is the `sub` claim from the ID token issued by the external IdP. This is typically a unique, immutable identifier for the user.

Example ID token payload:
```json
{
  "sub": "1234567890",
  "email": "john@example.com",
  "name": "John Doe"
}
```

In this example, the `federatedUserId` would be `1234567890`.

**For SAML connections:**

The `federatedUserId` is the `NameID` value from the SAML assertion. The format depends on the NameID format configured in the SAML connection.

Example SAML assertion:
```xml
<saml:Subject>
  <saml:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress">
    john@example.com
  </saml:NameID>
</saml:Subject>
```

In this example, the `federatedUserId` would be `john@example.com`.

## Create federated user associations

You can create federated user associations using the [Association Management REST API]({{base_path}}/apis/association-rest-api/).

### Create a single association

To create a single federated user association for a specific local user:

1. Obtain the local user's unique identifier (user ID) in {{ product_name }}.

2. Use the following API request:

    ```bash
    curl -X POST \
      'https://<hostname>/api/users/v1/me/federated-associations' \
      -H 'Authorization: Bearer <access_token>' \
      -H 'Content-Type: application/json' \
      -d '{
        "idp": "GoogleIdP",
        "federatedUserId": "1234567890"
      }'
    ```

    Replace the following:
    - `<hostname>` - Your {{ product_name }} hostname
    - `<access_token>` - A valid access token with appropriate permissions
    - `GoogleIdP` - The name of your external IdP connection
    - `1234567890` - The federated user's unique identifier

3. If successful, the API returns a `201 Created` response, confirming that the association was created.

{% if product_name == "WSO2 Identity Server" %}
### Create bulk associations (IS 7.2+)

{{ product_name }} 7.2.0 introduces a bulk API that allows administrators to create or delete multiple federated user associations in a single request. This is particularly useful for migrating large numbers of user associations or integrating with partner organizations.

To create multiple associations at once:

```bash
curl -X POST \
  'https://<hostname>/api/server/v1/organizations/<org-id>/federated-associations/bulk' \
  -H 'Authorization: Bearer <access_token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "operations": [
      {
        "operation": "ADD",
        "localUserId": "local-user-id-1",
        "idp": "GoogleIdP",
        "federatedUserId": "google-user-123"
      },
      {
        "operation": "ADD",
        "localUserId": "local-user-id-2",
        "idp": "AzureAD",
        "federatedUserId": "azure-user-456"
      }
    ]
  }'
```

Learn more about the [federated user association bulk API]({{base_path}}/apis/organization-apis/org-association-rest-api/).

{% endif %}

## Configure custom subject attribute mapping

By default, {{ product_name }} uses the standard subject identifier from the external IdP (the `sub` claim in OIDC or `NameID` in SAML) as the `federatedUserId`. However, you can configure {{ product_name }} to use a different claim or attribute as the subject identifier for federated user associations.

### When to use custom subject mapping

Custom subject attribute mapping is useful when:

- The external IdP's `sub` claim or `NameID` doesn't match your user identification needs.
- You want to use a business identifier (such as email or employee ID) instead of the default subject identifier.
- You need consistency across multiple IdPs that use different subject formats.

### Configure custom subject mapping

To map the `federatedUserId` to a custom attribute:

1. On the {{ product_name }} Console, go to **Connections** and select your external IdP connection.

2. Navigate to the **Attributes** tab.

3. In the **Subject attribute** section, select the attribute you want to use as the subject identifier.

    For example, if you want to use the user's email address:
    - For OIDC: Select the `email` claim from the **Subject attribute** dropdown
    - For SAML: Map the email attribute to the **Subject** field in the attribute mappings

4. To enable this custom subject mapping for federated user associations, you need to add a configuration to the `deployment.toml` file.

### Enable custom subject for associations

To enable the configured subject attribute for federated user associations:

1. Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.

2. Add the following configuration:

    ```toml
    [authentication.jit_provisioning]
    enable_configured_idp_sub_for_federated_user_association = true
    ```

3. Save the file and restart {{ product_name }}.

After enabling this configuration, {{ product_name }} uses the subject attribute configured in the connection's **Attributes** section (instead of the default `sub` or `NameID`) when matching `federatedUserId` values in association API requests.

### Example: Using email as the subject

If you configure the external IdP connection to use `email` as the subject attribute and enable the custom subject configuration:

1. The external IdP returns the following in the authentication response:
    ```json
    {
      "sub": "1234567890",
      "email": "john@example.com"
    }
    ```

2. When creating a federated user association via the API, use the email address as the `federatedUserId`:
    ```json
    {
      "idp": "GoogleIdP",
      "federatedUserId": "john@example.com"
    }
    ```

3. {{ product_name }} matches this association using the email address instead of the `sub` claim value.

## Delete federated user associations

To remove a federated user association:

```bash
curl -X DELETE \
  'https://<hostname>/api/users/v1/me/federated-associations/<idp-name>/<federated-user-id>' \
  -H 'Authorization: Bearer <access_token>'
```

Replace the following:
- `<idp-name>` - The name of the external IdP connection
- `<federated-user-id>` - The federated user's unique identifier

## Related links

- [Association Management REST API]({{base_path}}/apis/association-rest-api/)
- [Configure Just-in-Time user provisioning]({{base_path}}/guides/authentication/jit-user-provisioning/)
- [Add federated login]({{base_path}}/guides/authentication/federated-login/)
{% if product_name == "WSO2 Identity Server" %}
- [Federated user association bulk API]({{base_path}}/apis/organization-apis/org-association-rest-api/)
{% endif %}
