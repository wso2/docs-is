# Configure enterprise login for the Asgardeo Console

Enterprise login allows administrators to sign in to the Asgardeo Console using credentials from an external identity provider (IdP). Instead of maintaining separate Asgardeo accounts, your administrators can authenticate through your organization's existing SAML or OIDC-based enterprise IdP.

This guide walks you through configuring enterprise login for the Asgardeo Console by setting up an enterprise connection and mapping external IdP groups to Asgardeo Console roles.

## Prerequisites

- You need to have an Asgardeo organization with administrator access.
- You need to have an external enterprise IdP (SAML or OIDC) configured in your organization. The external IdP must support sending group information in its claims/assertions.

## Step 1: Configure the enterprise IdP

First, register your external enterprise IdP as a connection in Asgardeo.

1. Set up an enterprise connection by following the relevant guide:

    - [Add login with an OIDC IdP]({{base_path}}/guides/authentication/standard-based-login/add-oidc-idp-login/)
    - [Add login with a SAML IdP]({{base_path}}/guides/authentication/standard-based-login/add-saml-idp-login/)

2. After creating the connection, configure the following settings:

    <table>
        <tr>
            <th>Setting</th>
            <th>Description</th>
        </tr>
        <tr>
            <td><b>IdP groups</b></td>
            <td>Configure the groups on the connection that match the group names sent by your external IdP. These group names must exactly match the groups your external IdP includes in its authentication response.</td>
        </tr>
        <tr>
            <td><b>Just-in-Time (JIT) provisioning</b></td>
            <td>Enable JIT provisioning for the connection. This ensures that user accounts are automatically created in Asgardeo when users sign in through the enterprise IdP for the first time.</td>
        </tr>
        <tr>
            <td><b>Groups claim mapping</b></td>
            <td>Add a claim mapping from the external IdP's groups claim to the local groups claim. This ensures that group information from the external IdP is correctly mapped to Asgardeo.</td>
        </tr>
        <tr>
            <td><b>Groups scope</b></td>
            <td>Request the <code>groups</code> scope in the connection settings. This ensures that group information is included in the authentication response from the external IdP.</td>
        </tr>
    </table>

    !!! note
        Both SAML and OIDC connections are supported for enterprise login. Choose the protocol that your external IdP supports.

## Step 2: Configure enterprise login in Console settings

After setting up the enterprise connection, configure it for Console login.

1. On the Asgardeo Console, go to **Console Settings** > **Enterprise Login**.

2. Under **Enterprise Connection**, select the enterprise IdP connection that you configured in [Step 1](#step-1-configure-the-enterprise-idp).

3. Under **Group-Role Mappings**, click **Add Mapping** to map IdP groups to Asgardeo Console roles.

4. For each mapping, configure the following:

    <table>
        <tr>
            <th>Field</th>
            <th>Description</th>
        </tr>
        <tr>
            <td><b>Console Role</b></td>
            <td>Select the Asgardeo Console role to assign. For example, select <b>Administrator</b> to grant full administrative access.</td>
        </tr>
        <tr>
            <td><b>Connection Group</b></td>
            <td>Select or type the IdP group name that should map to the selected console role. For example, map the <code>admin-group</code> from your external IdP to the <b>Administrator</b> role.</td>
        </tr>
    </table>

    !!! info
        Add additional mappings for any other console roles you want to assign to your enterprise users. Each mapping links an external IdP group to a specific Asgardeo Console role.

    ![Configure Enterprise Login]({{base_path}}/assets/img/guides/users/enterprise-login-configurations.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Save** to apply the enterprise login configuration.

After you save the configuration, users who belong to the mapped IdP groups can sign in to the Asgardeo Console using your enterprise IdP.

## Sign in with enterprise login

After you configure enterprise login, users can sign in to the Asgardeo Console through the enterprise IdP from the standard Asgardeo login page.

### Direct console access

If you want users to access the console directly through the enterprise IdP without going through the standard login page, configure a **Home Realm Identifier** for your enterprise connection.

1. Go to the connection settings of your enterprise IdP in Asgardeo.

2. Under the connection's general settings, configure the **Home Realm Identifier** value.

3. Share the following URL with your enterprise users for direct access:

    ```text
    https://console.asgardeo.io/t/<organization-name>/app?fidp=<home-realm-identifier>
    ```

    Replace the following placeholders:

    <table>
        <tr>
            <th>Placeholder</th>
            <th>Description</th>
        </tr>
        <tr>
            <td><code>&lt;organization-name&gt;</code></td>
            <td>Your Asgardeo organization name.</td>
        </tr>
        <tr>
            <td><code>&lt;home-realm-identifier&gt;</code></td>
            <td>The Home Realm Identifier value configured in the enterprise IdP connection settings.</td>
        </tr>
    </table>

    Users who navigate to this URL go directly to the enterprise IdP's sign-in page and are redirected to the Asgardeo Console after successful authentication.

## Troubleshooting

If enterprise login does not work as expected, check the following common issues:

| Issue | What to check |
|---|---|
| Users from the enterprise IdP cannot sign in | Verify that the enterprise connection is selected under **Console Settings** > **Enterprise Login** > **Enterprise Connection** and that the configuration is saved. |
| Groups are not mapped correctly | Confirm that the group names configured in Asgardeo exactly match the group names sent by your external IdP in its authentication response. Group names are case-sensitive. |
| JIT provisioning is not creating user accounts | Verify that JIT provisioning is enabled on the enterprise connection. Check the Asgardeo provisioning logs for error details. |
| Group information is missing from the authentication response | Confirm that the groups claim mapping is configured on the connection and that the `groups` scope is included in the connection's requested scopes. |
| The Home Realm Identifier URL does not redirect to the enterprise IdP | Verify that the **Home Realm Identifier** value in the connection settings matches the value used in the direct access URL. |

## Next steps

After you configure enterprise login, consider the following actions:

- Verify that enterprise users can sign in with the expected Console roles by testing with a user from each mapped IdP group.
- Monitor sign-in activity in the Asgardeo Console audit logs to detect any authentication issues.
- Document the claim format used by your external IdP, including the groups claim name and value format, for future reference.
- Share the direct access URL with your enterprise administrators so they can access the Asgardeo Console directly through your enterprise IdP.

## Remove enterprise login

To remove the enterprise login configuration:

1. On the Asgardeo Console, go to **Console Settings** > **Enterprise Login**.

2. Under the **Danger Zone**, click **Remove Enterprise Login**.

3. Confirm the action.

!!! warning
    Removing enterprise login revokes console access for all users who rely on the enterprise IdP to sign in. Ensure that alternative administrator accounts exist before removing the configuration.
