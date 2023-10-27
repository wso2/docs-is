# User management

The users in Asgardeo are the digital representations of the identities of physical users who interact with your
organization. With Asgardeo, the identity lifecycle of each of these users can be easily managed by the admins of the
organization.

The admins can grant users access to resources in your organization and control user access. Admins can also manage various user operations via the Asgardeo Console and SCIM APIs.

Shown below are some main user management capabilities available in Asgardeo.

![User management]({{base_path}}/assets/img/guides/users/user-management-overview.png)

## User accounts

Asgardeo supports the following types of user accounts based on their relationship to the organization.

### Owner

The owner has all the administrative rights in the organization. The owner can access the Asgardeo console and manage the organization using the following actions:
  
- Onboard users
- Create organizations
- Manage users and groups
- Manage applications
- Enforce password reset

The owner account cannot be deleted once it is created. There can be only one owner for an organization. By default, it's the user who created the organization.

An owner is always assigned the **Administrator** role. It cannot be changed by other admins either.


### Administrator

An administrator can manage the organization and has access to the organization's administrative operations. An administrator can be invited to the organization and assigned with the Administrator user role.

Refer [Managing administrators]({{base_path}}/guides/users/manage-collaborators/) for more information.

### User

A user registered in an organization can login and use applications in that organization.

Refer [Managing users]({{base_path}}/guides/users/manage-customers/) for more information.

### Comparing User Accounts

The following table compares the different user account types available in Asgardeo.

Based on your requirements, you can choose user types and create them via the Asgardeo Console.

The source of the user account determines which entity manages the user's credentials and details.

- **Accounts managed by Asgardeo** can persist across multiple organizations. That is, the same user account can be associated with other organizations as an owner or an administrator. When removed from one organization, these associations with other organizations continue to persist.
- **Accounts managed by an organization** are confined to that organization. When removed from that organization, the account is completely deleted from Asgardeo.
<br>

<table>
  <tr>
    <th>User Accounts</th>
    <th>Managed By</th>
    <th>Capabilities</th>
  </tr>
  <tr>
    <td>Owner<Badge text="Asgardeo User" type="optional"/></td>
    <td>Asgardeo</td>
    <td>
        <li>Onboard users</li>
        <li>Create organizations</li>
        <li>Manage users and groups</li>
        <li>Manage applications</li>
    </td>
  </tr>
  <tr>
    <td>Administrator<Badge text="Asgardeo User" type="optional"/></td>
    <td>Asgardeo</td>
    <td>
    By default, administrators are assigned all administration capabilities:
      <li>Onboard users</li>
      <li>Create organizations</li>
      <li>Manage users and groups</li>
      <li>Manage applications</li>
    </td>
  </tr>
  <tr>
    <td>User</td>
    <td>Organization</td>
    <td><li>Consume business applications</li></td>
  </tr>
</table>

## What's next?

Following are the main components that are required for user management.
- [Groups]({{base_path}}/guides/users/manage-groups/)
- [Roles]({{base_path}}/references/user-management/user-roles/)

