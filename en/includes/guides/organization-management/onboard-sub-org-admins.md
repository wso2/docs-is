# Onboard organization administrators

You can onboard organization administrators using any of the following approaches:

- [Sales-led approach](#sales-led-approach)
- [Self-service approach](#self-service-approach)

## Sales-led approach

In this approach, the admin of the organization (root) creates the organization and adds a user as an admin of the created organization. This method is typically used when the organization (root) should regulate the creation of organizations, and the administrator's supervision is required to ensure proper setup.

Follow the steps below to onboard organization administrators using the {{ product_name }} Console.

### Prerequisites
You need to:

  - register your B2B application in the organization (root).
  - create an administrator role required for your B2B application and associate it to the application.
  - [create an organization]({{base_path}}/guides/organization-management/manage-organizations/#create-an-organization) and switch to the created organization.
  - [share the B2B application]({{base_path}}/guides/organization-management/share-applications/) with required organizations.

!!! note 
    The organization creator, invited parent organization users who have user management and role management permissions can onboard administrators for the organization switching to the organization on the {{ product_name }} Console.

### Step 1: Create a user

To create a new organization user:

1. Switch to the organization on the {{ product_name }} Console.

2. Go to **User Management** > **Users** and click **Add User**.

3. Enter the following details:
    {{ admin_user_details }}

4. You can either set a password on the user's behalf or request the user to set the password.

    - **Set a temporary password for the user**: If this option is selected, the administrator can set a temporary password for the user.

    - **Invite user to set their own password**: If this option is selected, an email with a confirmation link will be sent to the provided email address for the user to set their own password.

5. Click **Finish** to add the new user.

### Step 2: Assign the user to the {{ admin_role_name }} role of B2B application

If you have created an {{ admin_role_name }} role in the organization (root) and associated it with the shared B2B application, the B2B application's {{ admin_role_name }} role is available in the organization by default. To assign the created user to this role:

1. Switch to the organization on the {{ product_name }} Console.

2. Go to **User Management** > **Roles**.

3. Select the **{{ admin_role_name }}** role of the B2B application and go to the **Users** tab.

4. Select the user from drop-down.

    ![Assign admin permission to organization user]({{base_path}}/assets/img/guides/organization/manage-organizations/assign-admin-permissions.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

5. Click **Update**.

You have now onboarded an administrator to the organization. From thereon, the organization administrator can manage that organization's identity and access management requirements through the B2B administration portal.

## Self-service approach
In this approach, organization users can self-subscribe to the B2B application and easily create their own organizations. This method empowers organization users to take control of the onboarding process, making it quick and convenient.

Using the self-service approach, the organization users can maintain their administrators either in the organization itself or the organization (root). The selection of the creation place depends on the organization's business requirements.

- [Maintain admins in the organization](#maintain-admins-in-the-organization):
  You can create the user in the organization if the user needs to be isolated into one organization.
- [Maintain admins in the organization (root)](#maintain-admins-in-the-organization-root):
  You can create the user in the organization (root) if the same user can manage multiple organizations.

### Prerequisites
You need to:

   - register your B2B application in the organization (root).
   - create an administrator role required for your B2B application and associate it to the application.

### Initial setup: Get access tokens

Before creating admins using the APIs, you need to obtain the required access tokens and enable self-service. Follow the steps below to set up the initial requirements to create organization admins.

1. [Get an access token]({{base_path}}/apis/{{api_authentication_path}}) from your root organization.

    !!! note "Required APIs and scopes to authorize to the application"
        Authorize to SYSTEM API named **Self Service API**(`/api/server/v1/self-service`) with `internal_self_service_view` and `internal_self_service_update` scopes.

2. Enable self-service for the organization (root).

    ``` curl
    curl --location --request PATCH 
    'https://{{ host_name }}/api/server/v1/self-service/preferences' \
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

    !!! note
        Enabling self-service will create an Machine-to-Machine(M2M) application named `B2B-Self-Service-Mgt-Application`.
        This application is authorized to a limited set of APIs to facilitate subsequent API calls.
        You will be able to see this application on the {{ product_name }} console.

3. Get an access token for the `B2B-Self-Service-Mgt-Application` using the following cURL.

    !!! note
        Take note of the M2M application's **Client ID** and **Client Secret** created on the {{ product_name }} console, as it will be required in the next steps.

    ``` curl
    curl -X POST \
    https://{{ host_name }}/oauth2/token \
    -u  '<client_id>:<client_secret>' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -d 'grant_type=client_credentials&scope=internal_org_role_mgt_view internal_org_role_mgt_update internal_org_user_mgt_create internal_organization_view internal_organization_create internal_user_mgt_view internal_user_mgt_create'
    ```

   The access token expiration time is set to `3600` seconds by default. If you wish to modify this duration, you can do so via the console. Go to the `B2B-Self-Service-Mgt-Application application`'s protocol section and update the **Application access token expiry time**.

### Maintain admins in the organization
This approach is suitable when you want organizations to govern themselves with minimal interaction from the organization (root). Additionally, if you have a B2C user, this approach will help you to separate them from B2B users easily.

!!! warning
    If a user wants to create multiple organizations, they will need to register a new account for each organization. Thus they will have separate identities in each organization.

To create and maintain admins in the organization:

1. Use the following cURL to check if the name of the organization you wish to create is available.
    ``` curl
    curl --location 'https://{{ host_name }}/api/server/v1/organizations/check-name' \
    --header 'Authorization: Bearer {access token obtained for the B2B-Self-Service-Mgt-Application }' 
    --header 'Content-Type: application/json' \
    --data '{
        "name": "{organization name}"
    }'
    ```

    !!! note
        If the organization name is available for use, the response will be `"available": true`, else it will be `"available": false`.

2. If the required organization name is available for use, use the following cURL to create the organization.

    ``` curl
    curl --location 'https://{{ host_name }}/api/server/v1/organizations' \
    --header 'Authorization: Bearer {access token obtained for the B2B-Self-Service-Mgt-Application}' \
    --header 'Content-Type: application/json' \
    --data '{
        "name": "{organization name}"
    }'
    ```

    !!! note
        Take note of the `id` parameter in the response. This is the organization-id of the newly created organization and you will need it in the following steps.

3. Get an access token for the created organization by exchanging the access token obtained for the `B2B-Self-Service-Mgt-Application`. Use credentials of the `B2B-Self-Service-Mgt-Application` to execute the cURL.

    ``` curl
    curl -X POST \
    https://{{ host_name }}/oauth2/token \
    -u  '<client_id>:<client_secret>' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -d 'grant_type=organization_switch_cc&scope=internal_org_role_mgt_view internal_org_role_mgt_update internal_org_user_mgt_create&token=<access token obtained for the B2B-Self-Service-Mgt-Application>&switching_organization=<created organization id>'
    ```

4. Create a user in the organization using the following cURL.

    ``` curl
    curl --location 'https://{{ host_name }}/o/scim2/Users' \
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
        "userName": "{customer-username}",
        "{{ scim_schema_for_wso2_custom_claims }}": { 
            "askPassword" : "true"
        }
    }'
    ```

    !!! note
        Take note of the `user-id` returned in the response of the above cURL.

5. Use the following cURL to obtain the `id` of the administrator role defined for your B2B application.

    !!!note 
        Share the B2B application in organization(root) enabling `share with all organizations` or share the application to the created organization before the role operation.
        The roles associated to the B2B application will be shared with the organization only if the application is shared to the organization.

    ``` curl
    curl --location 'https://{{ host_name }}/o/scim2/v2/Roles?filter=displayName%20eq%20{ admin-role-name }%20and%20audience.value%20eq%20{ role-audience-value }' ' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer {access-token-obtained-for-the-organization}'
    ```

    !!! note
        Refer following details to get your B2B application's administrator role:
        <table>
            <tr>
             <th>admin-role-name</th>
             <td>Name of the administrator role associated to your B2B application.</td>
            </tr>
            <tr>
             <th>role-audience-value</th>
             <td>If your B2B application has associated to application audience roles give the id of the shared application in organization. Otherwise, created organization id.</td>
            </tr>
         </table>

6. Create a user and assign the user to the administrator role of your B2B application by using the following cURL.

    ``` curl
    curl --location --request PATCH 'https://{{ host_name }}/o/scim2/v2/Roles/{admin-role-id}' \
    --header 'Authorization: Bearer {access-token-obtained-for-the-organization}' \
    --header 'Content-Type: application/json' \
    --data '{
        "Operations": [
            {
                "op": "add",
                "path": "users",
                "value": [
                    {
                        "value": "{user-id obtained from step 4}"
                    }
                ]
            }
        ]
    }'
    ```

### Maintain admins in the organization (root)
This approach is particularly suitable when an organization user prefers to maintain a single identity linked to multiple organizations. Under this approach, organization users are treated as business users (B2C users) within the organization (root).

!!! warning
    Separating B2C and B2B users will be more complicated.

To create and maintain admins in the organization (root):

1. Create a user in the organization (root) using {{ product_name }}'s SCIM APIs.
    ``` curl
    curl --location 'https://{{ host_name }}/scim2/Users' \
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
        "userName": "{customer-username}",
        "{{ scim_schema_for_wso2_custom_claims }}": { 
            "askPassword" : "true"
        }
    }'
    ```

    !!! note
        Take note of the `user-id` received in the response of the above cURL.

2. Use the following cURL to check if the name of the organization you wish to create is available.

    ``` curl
    curl --location 'https://{{ host_name }}/api/server/v1/organizations/check-name' \
    --header 'Authorization: Bearer {access token obtained for the B2B-Self-Service-Mgt-Application }' 
    --header 'Content-Type: application/json' \
    --data '{
        "name": "{organization name}"
    }'
    ```

    !!! note
        If the organization name is available for use, the response will be `"available": true`, else it will be `"available": false`.

3. If the required organization name is available for use, use the following cURL to create the organization and assign the user created in step 1 as the organization's admin.
    ``` curl
    curl --location 'https://{{ host_name }}/api/server/v1/organizations' \
    --header 'Authorization: Bearer {access token obtained for the B2B-Self-Service-Mgt-Application  }' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "{organization name}",
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

Now, you have created a new organization. A shadow user account is created in the new organization for the organization creator in the organization (root). The organization creator is the {{ admin_role_name }} of the new organization.
