# Share user profiles with organizations

If your organization users need access to organizations lower in the hierarchy without creating accounts for each and every organization, you can simply share these user profiles with those organizations. This is ideal when a user needs access to multiple organizations while maintaining a single identity. It also reduces the overhead of managing the user's profile across multiple organizations.

## Mathods to share profiles

There are three ways how user profiles are shared between organizations:

1. When a root organization user creates one or more organizations, the user automatically becomes the admin of these organizations and the user profile is shared with them. 
Learn more about [maintaining organization admins in the root organization]({{base_path}}/guides/organization-management/onboard-org-admins/self-service-approach/#maintain-admins-in-the-root-organization).

2. An organization admin can invite users from the immediate parent organization to join the organization. Once the user accepts the invitation, the user profile is automatically shared with the child organization. Learn more about [inviting existing users from the parent organization]({{base_path}}/guides/organization-management/onboard-users/#invite-existing-users-from-the-parent-organization).

3. An admin can share users of an organization with other organizations lower in the hierarchy using the [User Sharing API]({{base_path}}/apis/organization-user-share-rest-api).

## Customize user attributes in shared user profiles

If your organization has a user whose profile is managed by another organization, the ability to customize the attributes of such a user depends on how those attributes are configured in the organization that manages the user's identity.

Each user attribute in {{product_name}} has the **Source for Attribute Value of Shared Users** option that resolves the value of the user attribute in each organization, which can take one of the following options:

<table>
        <tbody>
            <tr>
                <td><b>Source for Attribute Value of Shared Users</b></td>
                <td><b>Behavior</b></td>
            </tr>
            <tr>
                <td>From Origin</td>
                <td>The attribute value is inherited from the organization that manages the user's profile.</td>
            </tr>
            <tr>
                <td>From Shared Profile</td>
                <td>Each organizations to which the user profile is shared can assign a value to this attribute and the user's profile will reflect this value.</td>
            </tr>   
            <tr>
                <td>From First Found in Hierarchy</td>
                <td>The attribute value is retrieved from the first organization in the hierarchy that has assigned a non-null value to the attribute.</td>
            </tr>
        </tbody>
    </table>

Learn more about attribute configurations in [configure attributes]({{base_path}}/guides/users/attributes/manage-attributes/#configure-attributes).


