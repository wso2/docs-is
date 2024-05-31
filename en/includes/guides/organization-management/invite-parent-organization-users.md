# Invite users from the parent organization

Customer/Partner organizations may sometimes need help performing administrative tasks from members of the parent organization. Also, members of an organization who are also members of the parent organization might want to bring in more members from the parent organization.

For such scenarios, {{product_name}} organizations can invite parent organization users to join their organizations. When you invite users, you may assign them to specific groups to provide the right level of permissions. Once the users accept the invitations, they will be added to the organization and be assigned to the specified groups.

## Prerequisites

In order to invite users from the parent organization, get to know the usernames of the users through an offline channel.

## Invite users

If a user of the organization with {{ product_name }} Console access needs to invite a user from the parent organization, follow the steps below.

1. Login to your organization using the link `https://{{host_name}}/t/{root-organization-name}/o/{organization-id}{{console_path}}`.
2. Go to **User Management > Users** and click ** Add user**. From there, select **Invite Parent User**.
3. Enter the usernames of the user that you want to invite to the organization. You can enter multiple usernames by pressing enter after each username input.
4. Select the groups that you want to assign to the invited users.
5. Click **Invite**.
6. The invited users will receive an email notification with the invitation link which they can click to accept.

    !!! note
        If you are part of an organization hierarchy, you cannot directly invite users from other ancestors except for your parent organization.

If a user, who is a member of both the organization and parent organization, wishes to invite more members from the parent organization, follow the steps below.

1. Login to your organization (root) on the {{ product_name }} Console.
2. Go to **Organizations** and select the organization to which you wish to invite users.
3. [Switch]({{base_path}}/guides/organization-management/manage-organizations/#switch-between-organizations) to that organization.
4. Go to **User Management > Users** and click **+ Add user**. From there, select **Invite Parent User**.

    ![Invite parent organization users]({{base_path}}/assets/img/guides/organization/manage-organizations/invite-parent-users.png){: width="600" style="display: block; margin: 0;"}

5. Enter the usernames of the users that you want to invite to the organization. You can enter multiple usernames by pressing enter after each username input.
6. Select the groups that you want to assign to the invited users.
7. Click **Invite**.
8. You can see whether the invitation is successful or not as follows.

    ![Successful invitation]({{base_path}}/assets/img/guides/organization/manage-organizations/successful-invitation.png){: width="600" style="display: block; margin: 0;"}

9. The invited users will receive an email notification with the invitation link. The invited users can accept the invitation by clicking the link.


## Accept invitations

1. The invited users will receive an email similar to the following, containing an invitation link valid for 72 hours.

    ![Invitation email]({{base_path}}/assets/img/guides/organization/manage-organizations/parent-org-user-invitation-email.png){: width="600" style="display: block; margin: 0; border: 1px solid grey;"}

2. Click the **Accept Invitation** button in the email to accept it.
3. Once the invitation is accepted, the invited users will be displayed in the {{ product_name }} Console as follows.

    ![Invited users]({{base_path}}/assets/img/guides/organization/manage-organizations/invited-users.png){: width="600" style="display: block; margin: 0;"}

## Manage invitations

Inorder to view or delete the invitations via {{ product_name }} Console:

1. Login to the relevant organization space of the {{ product_name }} Console.
2. Go to **User Management > Users** and click **Invitations** tab.
3. You can view the list of invitations that are sent to the users of the parent organization with their status.

    ![View invitations]({{base_path}}/assets/img/guides/organization/manage-organizations/view-invitations.png){: width="600" style="display: block; margin: 0;"}

4. If required, invitations can be deleted by clicking the **Delete** icon.
