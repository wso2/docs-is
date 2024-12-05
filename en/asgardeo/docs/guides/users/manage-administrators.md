# Manage administrators

This guide walks you through the steps of managing an administrator account. If you are the owner or an existing administrator in the organization, you can onboard new administrators or delete existing administrator accounts.

!!! note
    You cannot manage the user profiles of other administrators or update their passwords from the Asgardeo Console. Administrators must manage their own profiles and passwords using the [My Account portal]({{base_path}}/guides/your-asgardeo/asgardeo-self-service/).

## Onboard an administrator

There are two ways to onboard an administrator:

- An administrator can onboard new administrators by [sending an email invitation](#invite-an-external-administrator).
- An administrator can [assign administrative privileges to existing users](#assign-admin-privileges-to-users).

### Invite an external administrator

Existing administrators can onboard other administrators by sending them email invitations to join the organization. To do so,

1. On the Asgardeo Console, go to **Console Settings** > **Administrators**.

2. Click **Add Administrator** and provide the following details.

    !!! note
        If you have enabled the option to [assign admin privileges to users](#assign-admin-privileges-to-users), you may proceed to invite external admins by clicking *Add Administrator* > *Invite Admins to Asgardeo*.

    {% if default_roles %}

    <table>
        <tr>
            <th>Email Address</th>
            <td>The invitation will be sent to this email address. Additionally, this email address will be used as the username of this administrator. Usernames are always unique to an organization. Once created, they cannot be modified.</td>
        </tr>
        <tr>
            <th>Role</th>
            <td>Users can be assigned one or more default roles. For details on the available user roles and the permissions assigned to them, see [Asgardeo User Roles]({{base_path}}/references/user-management/user-roles/).</td>
        </tr>
    </table>

    {% else %}

    <table>
        <tr>
            <th>Email Address</th>
            <td>The invitation will be sent to this email address. Additionally, this email address will be used as the username of this administrator. Usernames are always unique to an organization. Once created, they cannot be modified.</td>
        </tr>
        <tr>
            <th>Role</th>
            <td>The <b>Administrator</b> role is assigned by default. For details on the available user roles and the permissions assigned to them, see [Asgardeo User Roles]({{base_path}}/references/user-management/user-roles/).</td>
        </tr>
    </table>

    {% endif %}


<td>The <b>Administrator</b> role is assigned by default. <br>For details on the available user roles and the permissions assigned to them, see [Asgardeo User Roles]({{base_path}}/references/user-management/user-roles/).</td>
3. Click **Invite** to send the invitation.

The external administrator can join the organization by accepting the invitation and setting a password for the new administrator account.

### Assign admin privileges to users

This option has to be enabled for the organization. If enabled, administrators can assign the administrator role to existing non-privileged users.

To enable this option,

1. On the Asgardeo Console, go to **Console Settings** > **Administrators**.

2. Click the settings icon next to **Add Administrator** to open the **Administrator Settings** page.

3. Turn on the **Enable users to manage the organization** toggle.

4. Go back to the **Administrators** tab and click **Add Administrator** to see a list with two options as follows:

    ![Add administrator dropdown]({{base_path}}/assets/img/guides/users/add-administrator-dropdown.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

To assign users the administrator role, 

1. On the **Console Settings** > **Administrators** page, click **+Add Administrator > Add Existing User**.
2. Select the user's username and the **Administrator** role and click **Add**.

The new administrator can now access the Asgardeo Console using the following URL:

```
https://console.asgardeo.io/t/{organization_name}
```

!!! note
    Currently, only privileged users onboarded from the internal user store and remote user stores can log in to the Asgardeo Console.

## View administrators
To view the administrators of your organization:

On the Asgardeo Console, go to **Console Settings > Administrators**. You will see the list of administrators presented in two tabs as follow.

<table>
    <tr>
        <th>Asgardeo</th>
        <td>This includes administrators whose identity is managed by Asgardeo.</td>
    </tr>
    <tr>
        <th><i>{organization_name}</i> organization</th>
        <td>This includes administrators whose identity is managed by the <code>{org_name}</code> organization.</td>
    </tr>
</table>

## Delete an administrator

!!! warning "Before you begin"

    - If you delete an exiting user who was assigned to the administrator role, you will only be revoking the administrator privileges from that user. Deleting this administrator does not delete the user account.
    - If you delete other administrators, you will be deleting the user account from the organization. This action is irreversible.

To delete an administrator:

1. On the Asgardeo Console, click **Console Settings** > **Administrators**.
2. Click **Delete** for the administrator you want to remove.
3. Select the checkbox to confirm your action.
4. Click **Confirm**.
