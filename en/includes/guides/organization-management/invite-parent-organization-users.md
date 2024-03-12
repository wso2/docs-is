# Invite users from the parent organization

In the business-to-business (B2B) world, sometimes customer or partner organizations may need help with administrative tasks from members of the root organization. There's also a situation where a user from the root organization, who uses a specific application of a customer or partner organization, wants to invite other users from the root organization.

For these situations, we have a feature called "inviting parent organization members." When you invite someone, you can specify which groups they should be a part of. Once they accept the invitation, they'll be added to the organization and placed in the mentioned groups.

To make sure parent organization members have the right level of access, you can give them authorization by assigning their groups to the appropriate roles.

## Prerequisites

Inorder to make an invitation, the username of the parent organization's user should get to know through an offline channel.

## Invite users

If a user of organization (root) needs to invite another root organization's user to a customer/partner organization via {{ product_name }} Console, follow the steps below.

1. Login to your organization (root) on the {{ product_name }} Console.
2. Go to **Organizations** and select the organization that you want to invite users to.
3. [Switch]({{base_path}}/guides/organization-management/manage-organizations/#switch-between-organizations) to that organization.
4. Go to **User Management > Users** and click **+ Add user**. From there, select **Invite Parent User**.

    ![Invite parent organization users]({{base_path}}/assets/img/guides/organization/manage-organizations/invite-parent-users.png){: width="600" style="display: block; margin: 0;"}

5. Enter the usernames of the users that you want to invite to the organization. You can enter multiple usernames by pressing enter after each username input.
6. Select the groups that you want to assign to the invited users.
7. Click **Invite**.
8. You can see whether the invitation is successful or not as follows.

    ![Successful invitation]({{base_path}}/assets/img/guides/organization/manage-organizations/successful-invitation.png){: width="600" style="display: block; margin: 0;"}

9. The invited users will receive an email notification with the invitation link. The invited users can accept the invitation by clicking the link.

If a user of the organization who has {{ product_name }} Console access needs to invite a user from the parent organization via {{ product_name }} Console, follow the steps below.

1. Login to your organization space of the {{ product_name }} Console, by accessing https://{{host_name}}/t/{root-organization-name}/o/{organization-id}{{console_path}}.
2. Go to **User Management > Users** and click **+ Add user**. From there, select **Invite Parent User**.
3. Enter the usernames of the user that you want to invite to the organization. You can enter multiple usernames by pressing enter after each username input.
4. Select the groups that you want to assign to the invited users.
5. Click **Invite**.
6. The invited users will receive an email notification with the invitation link. The invited users can accept the invitation by clicking the link.

    !!!note
        If you are maintaining an organization hierarchy, you cannot invite users in the ancestor organizations directly. You can only invite users in the parent organization.

## Accept invitations

1. The invited users will receive an email similar to following with the invitation link.

    ![Invitation email]({{base_path}}/assets/img/guides/organization/manage-organizations/parent-org-user-invitation-email.png){: width="600" style="display: block; margin: 0;"}

    !!! info
          The invitation link is valid for 72 hours.

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
