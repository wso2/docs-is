# Onboard sub organization administrators

You can onboard sub organization administrators using any of the following approaches:

- [Sales-led approach](#sales-led-approach)
- [Self-service approach](#self-service-approach)

## Sales-led approach

In this approach, the admin of the root organization creates the sub organization and adds a user as an admin of the created sub organization. This method is typically used when the root organization should regulate the creation of sub-organizations, and the administrator's supervision is required to ensure proper setup.

Follow the steps below to onboard sub organization administrators using the {{ product_name }} Console.

### Prerequisites
You need to [create a sub organization]({{base_path}}/guides/organization-management/manage-suborganizations/#create-a-sub-organization) and switch to the created sub organization.

!!! note
    Only sub organization creators can onboard administrators for their sub organizations using the {{ product_name }} Console.

### Step 1: Create a user

To create a new sub organization user:

1. Switch to the sub organization on the {{ product_name }} Console.

2. Go to **User Management** > **Users** and click **Add User**.

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

### Step 2: Assign the user to the {{ admin_role_name }} role

The Administrator role is available in sub organizations by default. To assign the created user to this role:

1. Switch to the sub organization on the {{ product_name }} Console.

2. Go to **User Management** > **Roles** and click **Configure** in the **Organization Roles** section.

3. Select the **Administrator** role and go to the **Users** tab.

4. Click the edit button to open the **Manage Users** dialog box.

5. Assign the user to the role by selecting the user and moving to the box on the right.

    !!! note
        See details of all the available [administrator permissions]({{base_path}}/references/user-management/user-roles/) you are granting the sub organization administrator.

    ![Assign admin permission to suborganization user]({{base_path}}/assets/img/guides/organization/manage-organizations/assign-admin-permissions.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

6. Click **Save**.

You have now onboarded an administrator to the sub organization. From thereon, the sub organization administrator can manage that organization's identity and access management requirements.

!!! note
    Note that sub organization administrators do not have access to the {{ product_name }} Console as they are not direct users of {{ product_name }}. A separate administration portal is required to carry out these functions. Learn more about [implementing an administration portal]({{base_path}}/guides/organization-management/manage-b2b-administration/#implement-an-administration-portal).

## Self-service approach
In this approach, sub organization users can self-subscribe to the B2B application and easily create their own sub-organizations. This method empowers sub organization users to take control of the onboarding process, making it quick and convenient.

Using the self-service approach, the sub organization users can maintain their administrators either in the sub organization itself or the root organization. The selection of the creation place depends on the organization's business requirements.

- [Maintain admins in the sub organization](#maintain-admins-in-the-sub-organization):
    You can create the user in the sub organization if the user needs to be isolated into one organization.
- [Maintain admins in the root organization](#maintain-admins-in-the-root-organization):
    You can create the user in the root organization if the same user can manage multiple organizations.

### Initial setup: Get access tokens

Before creating admins using the APIs, you need to obtain the required access tokens and enable self-service. Follow the steps below to set up the initial requirements to create sub organization admins.

1. [Get an access token]({{base_path}}/apis/authentication/#get-an-access-token) from your root organization.

    !!! note "Required scopes"
        Include the following scopes when requesting for the access token:

        `openid` `internal_application_mgt_create` `internal_application_mgt_view` `internal_organization_view` `internal_organization_update` `internal_governance_view` `internal_governance_update` `internal_email_mgt_view` `internal_email_mgt_update` internal_email_mgt_delete` `internal_email_mgt_create` `internal_userstore_view` `internal_userstore_update` `internal_userstore_delete`

2. Enable self-service for the root organization.

    ``` curl
    curl --location --request PATCH 
    'https://{{ host_name }}/o/{root-org-id}/api/server/v1/self-service/preferences' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <access-token-obtained-from-step-1>' \
    -d '{
        "operation": "UPDATE",
        "properties": [
            {
                "name": "Organization.SelfService.Enable",
                "value": "true"
            }
        ]
    }'
    ```

    The `{root-org-id}` is the organization ID of the root organization. To obtain the organization ID of your root organization, copy the provided organization ID from the organization drop-down. [Learn more]({{base_path}}/guides/organization-management/manage-organizations/#obtain-the-organization-id).

    !!! note
        Enabling self-service will create the following in the root organization:
    
        - A system user named `B2B-SS-System-User`.
        - A system role named `B2B-SS-System-Role`.
        - A system application named `B2B-Self-Service-Mgt-Application`. This application has limited permissions to facilitate subsequent API calls.
    
        You will be able to see these entities on the {{ product_name }} console.

4. Get an access token for the `B2B-Self-Service-Mgt-Application` using the following cURL.

    !!! note
        Take note of the system application's **Client ID** and **Client Secret** created on the {{ product_name }} console, as it will be required in the next steps.

    ``` curl
    curl -X POST \
    https://{{ host_name }}/t/<root_org_name>/oauth2/token \
    -u  '<client_id>:<client_secret>' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -d 'grant_type=client_credentials&scope=openid internal_identity_mgt_create internal_identity_mgt_delete internal_identity_mgt_update internal_identity_mgt_view internal_organization_admin internal_organization_create internal_organization_view internal_user_mgt_create internal_user_mgt_list internal_user_mgt_view'
    ```

    The access token expiration time is set to `7200` seconds by default. If you wish to modify this duration, you can do so via the console. Go to the `B2B-Self-Service-Mgt-Application application`'s protocol section and update the **User access token expiry time**.

### Maintain admins in the sub organization
This approach is suitable when you want sub organizations to govern themselves with minimal interaction from the root organization. Additionally, if you have a B2C user, this approach will help you to separate them from B2B users easily.

!!! warning
    If a user wants to create multiple organizations, they will need to register a new account for each organization. Thus they will have separate identities in each organization.

To create and maintain admins in the sub organization:

1. Use the following cURL to check if the name of sub organization you wish to create is already available.

    ``` curl
    curl --location 'https://{{ host_name }}/o/{root-org-id}/api/server/v1/organizations/check-name' \
    --header 'Authorization: Bearer {access token obtained for the B2B-Self-Service-Mgt-Application }' 
    --header 'Content-Type: application/json' \
    --data '{
    "name": "{sub-organization name}"
    }'
    ```

    !!! note
        If the sub organization name is available for use, the response will be `"available": true`, or else it will be `"available": false`.

2. If the required organization name is available for use, use the following cURL to create the sub organization.

    ``` curl
    curl --location 'https://{{ host_name }}/o/{root-org-id}/api/server/v1/organizations' \
    --header 'Authorization: Bearer {access token obtained for the B2B-Self-Service-Mgt-Application}' \
    --header 'Content-Type: application/json' \
    --data '{
        "name": "{sub-organization name}",
        "parentId": "{root-org-id}"
    }'
    ```

    !!! note
        Take note of the `id` parameter in the response. This is the organization-id of the newly created sub organization and you will need it in the following steps.

3. [Get an access token for the created sub organization]({{base_path}}/apis/organization-management/authentication/#step-2-for-the-suborganization) by exchanging the access token obtained for the `B2B-Self-Service-Mgt-Application`. Use credentials of the `B2B-Self-Service-Mgt-Application` to execute the cURL.

4. Create a user in the sub organization using the following cURL.

    ``` curl
    curl --location 'https://{{ host_name }}/o/{organization-id-obtained-in-step-2}/scim2/Users' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer {token obtained in step 3}' \
    --data-raw '{
        "emails": [
            {
                "primary": true,
                "value": "{customer-email}"
            }
        ],
        "name": {
            "familyName": "{customer-family-name}",
            "givenName": "{customer-given-name}"
        },
        "password": "{customer-password}",
        "userName": "{customer-username}"
    }'
    ```

    !!! note
        Take note of the `user-id` returned in the response of the above cURL.

6. Use the following cURL to obtain the `id` of the {{ admin_role_name }} role.

    ``` curl
    curl --location 'https://{{ host_name }}/o/{sub-org-id}/api/server/v1/organizations/{sub-org-id}/roles?filter=name%20eq%20{{ admin_role_name }}' ' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer {access-token-obtained-for-the-sub-organization}' \
    ```

7. Create a user and assign the user to the {{ admin_role_name }} role by using the following cURL.

    ``` curl
    curl --location --request PATCH 'https://{{ host_name }}/o/{sub-org-id}/api/server/v1/organizations/{sub-org-id}/roles/{administrator-role-id}' \
    --header 'Authorization: Bearer {Sub-org access token}' \
    --header 'Content-Type: application/json' \
    --data '{
        "operations": [
            {
                "op": "ADD",
                "path": "users",
                "value": [
                    "{user-id obtained from step 4}"
                ]
            }
        ]
    }'
    ```

### Maintain admins in the root organization
This approach is particularly suitable when a sub organization user prefers to maintain a single identity linked to multiple sub-organizations. Under this approach, sub organization users are treated as business users (B2C users) within the organization. It grants sub organization users the capability to access various B2C applications, such as billing portals, within the Business organization.

!!! warning
    Separating B2C and B2B users will be more complicated.

To create and maintain admins in the root organization:

1. Create a user in the root organization using {{ product_name }}'s SCIM APIs.

    ``` curl
    curl --location 'https://{{ host_name }}/o/{root-org-id}/scim2/Users' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer {access token obtained for the B2B-Self-Service-Mgt-Application}' \
    --data-raw '{
        "emails": [
            {
                "primary": true,
                "value": "{customer-email}"
            }
        ],
        "name": {
            "familyName": "{customer-family-name}",
            "givenName": "{customer-given-name}"
        },
        "password": "{customer-password}",
        "userName": "{customer-username}"
    }'
    ```

    !!! note
        Take note of the user-id received in the response of the above cURL.

2. Use the following cURL to check if the name of sub organization you wish to create is already available.

    ``` curl
    curl --location 'https://{{ host_name }}/o/{root-org-id}/api/server/v1/organizations/check-name' \
    --header 'Authorization: Bearer {access token obtained for the B2B-Self-Service-Mgt-Application }' 
    --header 'Content-Type: application/json' \
    --data '{
    "name": "{sub-organization-name}"
    }'
    ```

    !!! note
        If the sub organization name is available for use, the response will be `"available": true`, or else it will be `"available": false`.

3. If the required organization name is available for use, use the following cURL to create the sub organization and assign the user created in step 1 as the organization's admin.

    ``` curl
    curl --location 'https://{{ host_name }}/o/{root-org-id}/api/server/v1/organizations' \
    --header 'Authorization: Bearer {access token obtained for the B2B-Self-Service-Mgt-Application  }' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "{sub-organization name}",
        "parentId": "{root-org-id}",
        "attributes": [
            {
                "key": "creator.id",
                "value": "{user-id obtained from step 1}"
            },
            {
                "key": "creator.username",
                "value": {username of the user created in step 1}"
            }
        ]
    }'
    ```

Now, you have created a new sub organization and assigned a user from the root organization as the admin of it. This admin will be maintained in the root organization.