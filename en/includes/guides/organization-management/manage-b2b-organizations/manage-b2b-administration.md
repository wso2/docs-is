# Administration of sub organizations

The following guides explain how to manage the administration tasks of sub organizations.

## Prerequisites

Only sub organization creators can onboard administrators for their sub organizations using the {{ product_name }} Console.

## Onboard sub organization administrators

Follow the steps given below to onboard sub organization administrators using the {{ product_name }} Console.

### Step 1: Create a user

To create a new sub organization user:

1. Switch to the sub organization on the {{ product_name }} Console.

2. Go to **Users** and click **Add User**.

3. Enter the following details:
    <table>
        <tr>
            <th>Email (Username)</th>
            <td>A unique email address to identify the user.</td>
        </tr>
        <tr>
            <th>First Name</th>
            <td>First name of the user. You can add/change this later.</td>
        </tr>
        <tr>
            <th>Last Name</th>
            <td>Last name of the user. You can add/change this later.</td>
        </tr>
    </table>
4. You can either request the user to set the password or set one on the user's behalf.
    - **Invite user to set their own password**: If this option is selected, an email with a confirmation link will be sent to the provided email address for the user to set their own password.

    - **Set a temporary password for the user**: If this option is selected, the administrator can set a temporary password for the user.

5. Click **Finish** to add the new user.

### Step 2: Assign the user to the Administrator role

The Administrator role is available in sub organizations by default. To assign the created user to this role:

1. Switch to the sub organization on the {{ product_name }} Console.

2. Go to **Roles** and click **Configure** in the **Organization Roles** section.

3. Select the **Administrator** role and go to the **Users** tab.

4. Click the edit button to open the **Manage Users** dialog box.

5. Assign the user to the role by selecting the user and moving to the box on the right.

    !!! note
        See details of all the available [administrator permissions](../../references/user-management/user-roles/) you are granting the sub organization administrator.

    ![Assign admin permission to suborganization user](../../../assets/img/guides/organization/manage-organizations/assign-admin-permissions.png)

6. Click **Save**.

You have now onboarded an administrator to the sub organization. From thereon, the sub organization administrator can manage that organization's identity and access management requirements.

!!! note
    Note that sub organization administrators do not have access to the {{ product_name }} Console as they are not direct users of {{ product_name }}. A separate administration portal is required to carry out these functions. Learn more about [implementing an administration portal](#implement-an-administration-portal).

## Implement an administration portal

Sub organization administrators do not have access to the {{ product_name }} Console. Therefore, you should expose administrative functions to administrators through a separate administration portal in your application.

The administration portal of your application should use [{{ product_name }}'s sub organization APIs](../../apis/organization-management/) to perform administrative operations.

!!! note
    To access management APIs in {{ product_name }}, you need to register your application as a management application. Learn how to [register a management application](../../apis/authentication/#register-a-management-app) in {{ product_name }}

The following are some of the features that your administration portal should contain.

### Manage users

The sub organization administrator should be able to onboard new users (administrators and consumers) to the sub organization. The identities of these users are stored in the default {{ product_name }} user store.

The identity and access management requirements of these users will be managed by {{ product_name }}.

The administration portal in your application should use the [User management - SCIM2 API](../../apis/organization-management/org-scim2/#/) to create user operations.

### Onboard identity providers

A sub organization may have an external identity provider (IdP) to manage the user identities of its employees and customers. Such an IdP may be already being used for the following purposes:

- Authenticating user logins to various applications.
- Branding the login interfaces to suit the organization.
- Enabling custom login experiences to different user groups.

The sub organization administrator can onboard such corporate IdPs to the sub organization in {{ product_name }} as a connection. These IdPs can then be set as a login option in your application.

The administration portal in your application should use the [identity provider API](../../apis/organization-management/org-idp/#/) to manage external IdPs.

### Define application login flows

Sub organization administrators should be able to customize the login flows of the application to suit business needs.

For example, the administrator should be able to define the number of authentication steps that the application login flow needs and what login options should be available for each step.

The administration portal in your application should use the [application management API](../../apis/organization-management/org-application-management/#/) to manage application login flows.

### Extend administration tasks

Explore the [sub organization APIs](../../apis/organization-management/) of {{ product_name }} that are available for you to enable all the required administration capabilities from your administration portal.

!!! note
    See the instructions on [enabling organization login](../../guides/authentication/add-organization-login/) to try out a B2B organization login use case.
