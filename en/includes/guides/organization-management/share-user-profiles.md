# Share user profiles with organizations

If your organization users need access to organizations lower in the hierarchy without creating accounts for each and every organization, you can simply share these user profiles with those organizations. This is ideal when a user needs access to multiple organizations while maintaining a single identity. It also reduces the overhead of managing the user's profile across multiple organizations.

## Methods to share profiles

There are three ways how user profiles are shared between organizations:

1. When a user from the root organization creates one or more organizations and is assigned as the admin, the user profile is automatically shared with those organizations. Learn more about [maintaining organization admins in the root organization]({{base_path}}/guides/organization-management/onboard-org-admins/self-service-approach/#maintain-admins-in-the-root-organization).

2. An organization admin can invite users from the immediate parent organization to join the organization. Once the user accepts the invitation, the user profile is automatically shared with the child organization. Learn more about [inviting existing users from the parent organization]({{base_path}}/guides/organization-management/onboard-users/#invite-existing-users-from-the-parent-organization).

3. An admin can share users of an organization with other organizations lower in the hierarchy using the [User Sharing API]({{base_path}}/apis/organization-user-share-rest-api).

## Customize user attributes in shared user profiles

If your organization has a user whose profile is managed by another organization, the ability to customize this user's attributes depends on the settings of the organization that manages the user's profile.

{{product_name}} offers the **Source for Attribute Value of Shared Users** option, allowing organizations to define how user attributes are resolved in shared user profiles.

<table>
        <tbody>
            <tr>
                <td><b>Source for Attribute Value of Shared Users</b></td>
                <td><b>Behavior</b></td>
            </tr>
            <tr>
                <td>From Origin</td>
                <td>The user attribute inherits the value from the organization that manages the user's profile.</td>
            </tr>
            <tr>
                <td>From Shared Profile</td>
                <td>The organization can customize the user attribute value.</td>
            </tr>   
            <tr>
                <td>From First Found in Hierarchy</td>
                <td>The user attribute inherits the value from the nearest organization in the hierarchy that has assigned a non-null value to it.</td>
            </tr>
        </tbody>
    </table>

Learn more about attribute configurations in [configure attributes]({{base_path}}/guides/users/attributes/manage-attributes/#configure-attributes).


