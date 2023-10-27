# Manage administrators

This guide walks you through the steps of managing an administrator account. If you are the owner or an existing administrator in the organization, you can onboard new administrators or delete existing administrator accounts.

!!! note
    You cannot manage the user profiles of other administrators or update their passwords from the Asgardeo Console. Administrators must [manage their own profiles and passwords]({{base_path}}/guides/your-asgardeo/asgardeo-self-service/#change-password) using the **My Account** portal.

## Onboard an administrator

There are two ways to onboard an administrator:

- An administrator can onboard new administrators by [sending an email invitation](#invite-an-external-administrator).
- An administrator can [assign existing users administrative privileges](#assign-admin-privileges-to-users).

### Invite an external administrator
Let's look at how administrators can onboard another administrator by sending an email invitation.

To onboard an administrator:

1. On the Asgardeo Console, go to **Organizational Settings** > **Administrators**.

2. Click **Add Administrator** and provide the required details.

    !!! note
        Note that if your organization allows you to [assign admin privileges to business users](#assign-admin-privileges-to-users), you will see the following options when you click **Add Administrator**.

        ![Add administrator dropdown]({{base_path}}/assets/img/guides/users/add-administrator-dropdown.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

        You need to select **Invite admins to Asgardeo** from this list to proceed with inviting an external admin.

    ![Add administrator user]({{base_path}}/assets/img/guides/users/add-administrator.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    <table>
        <tr>
            <th>Field name</th>
            <th>Description</th>
        </tr>
        <tr>
            <th>Email Address</th>
            <td>Provide the email address to which the invitation email should be sent. <br>This email address will be used as the admin's username in Asgardeo. Note that a username is always unique to the organization, and you can't change it once it is created.</td>
        </tr>
        <tr>
            <th>Role</th>
            <td>The <b>Administrator</b> role is assigned by default. <br>For details on the available user roles and the permissions assigned to them, see [Asgardeo User Roles]({{base_path}}/references/user-management/user-roles/).</td>
        </tr>
    </table>

3. Click **Invite** to send the invitation.


The administrator can access the Asgardeo Console by accepting the invitation and setting a password for the new administrator account.

### Assign admin privileges to users

You can assign admin privileges to existing business users only if it is allowed in your organization. Follow the instructions given below.

First, configure administrator settings for the organization:

1. On the Asgardeo Console, go to **Organizational Settings** > **Administrators**.

2. Click the settings icon next to **+ Add Administrator** to open the **Administrator Settings** page.

3. Switch on the **Enable users to manage the organization** toggle.

    ![Assign an existing user as an admin]({{base_path}}/assets/img/guides/users/enable-users-to-manage-organizations.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Go back to the **Administrators** page and see that the **+ Add Administrator** list is updated as follows:

    ![Add administrator dropdown]({{base_path}}/assets/img/guides/users/add-administrator-dropdown.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

Now, let's assign admin privileges to a user:

1. On the **Administrator** page, click **+Add Administrator > Assign admins from users**.
2. Select the user you want to add as an administrator and click **Add**.

The new administrator can now access the Asgardeo Console using the following URL:

!!! note
    Be sure to replace `{org_name}` with the relevant organization name.

```
https://console.asgardeo.io/t/{org_name}
```

!!! note
    Currently, only privileged users onboarded from the internal user store and remote user stores can log in to the Asgardeo Console.

## View administrators
To view the administrators of your organization:

On the Asgardeo Console, go to **Organizational Settings** > **Administrators**. You will see the list of administrators presented in two tabs as follow.

<table>
    <tr>
        <th>Asgardeo</th>
        <td>This includes administrators whose identity is managed by Asgardeo.</td>
    </tr>
    <tr>
        <th>{org_name} organization</th>
        <td>This includes administrators whose identity is managed by the <code>{org_name}</code> organization.</td>
    </tr>
</table>

## Delete an administrator

!!! warning Before you begin
    Note the following:

    - If the administrator you delete is a business user with admin privileges, you will only be revoking the administrator privileges from the user. Deleting this administrator does not delete the user account.
    - If the administrator is not a business user, you will be deleting the user account from the organization. This action is irreversible.

To delete an administrator:

1. On the Asgardeo Console, click **Organizational Settings** > **Administrators**.
2. Click **Delete** for the administrator you want to remove.
3. Select the checkbox to confirm your action.
4. Click **Confirm**.
