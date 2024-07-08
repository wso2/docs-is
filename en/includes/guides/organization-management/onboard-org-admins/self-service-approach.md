# Self-service approach

Self-service approach empowers organizations to take control of the onboarding process by enabling organizations to create their own organizations and onboard administrators. The root organization may facilitate this through a self-service portal built using the {{product_name}} APIs.

The following guides explain how you may create a self-service portal for your business.

!!! note "Prerequisite"

    [Create an administrator role]({{base_path}}/guides/users/manage-roles/) in the root organization that provides authorization for organization APIs. To share it with organizations, ensure that it is associated with the B2B application shared with the relavent organization.

## Set up the self-service portal

Follow the steps below to set up the application that acts as the self-service portal.

1. Create a [standard based application]({{base_path}}/guides/applications/register-standard-based-app/) selecting OAuth2.0/OpenID Connect as the protocol.

2. Select the application, go to its **Shared Access** tab and select **Share with all organizations**.

3. Go to the **Protocol** tab of the application and enable the following grant types

    - Client Credential
    - Organization Switch

4. Click **Update** to save the changes.

    !!! note

        Take note of the application's **Client ID** and **Client Secret** which will be required later.

## Get an access token

To invoke the required APIs, the self-service application should receive an access token. Follow the steps below to receive an access token.

1. Provide authorization for the self-service application to consume the necessary APIs. To do so,

    1. On the {{product_name}} Console, go to **Applications** and select your self-service application.

    2. In its **API Authorization** tab, grant the application authorization to the following scopes.

    <table >
        <tr>
            <th>API Category</th>
            <th>API</th>
            <th>Scopes</th>
        </tr>
        <tr>
            <td>Management API</td>
            <td>Organization Management API <br>
                <code>/api/server/v1/organizations</code>
            </td>
            <td>
                <ul>
                    <li>Create Organizations</li>
                    <li>View Organizations</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Organization API</td>
            <td>SCIM2 Roles API <br>
                <code>/o/scim2/Roles</code>
            </td>
            <td>
                <ul>
                    <li>Update Role</li>
                    <li>View Role</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Organization API</td>
            <td>Application Management API <br>
                <code>/o/api/server/v1/applications</code>
            </td>
            <td>
                <ul>
                    <li>View Application</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Organization API</td>
            <td>SCIM2 Users API* <br>
                <code>/o/scim2/Users</code>
            </td>
            <td>
                <ul>
                    <li>Create User</li>
                    <li>List Users</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Management API</td>
            <td>SCIM2 Users API** <br>
                <code>/scim2/Users</code>
            </td>
            <td>
                <ul>
                    <li>Create User</li>
                    <li>View User</li>
                </ul>
            </td>
        </tr>
    </table>


    !!! note

        \* Only required if your admins are [maintained within the organization](#maintain-admins-within-the-organization). </br>
        \*\* Only required if your admins are [maintained in the root organization](#maintain-admins-in-the-root-organization).

2. Get an access token for the self-service application using the following command.

    ``` bash
    curl -X POST https://{{ host_name }}/oauth2/token \
    -u  '<client_id>:<client_secret>' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -d 'grant_type=client_credentials&scope=internal_org_role_mgt_view internal_org_role_mgt_update internal_org_user_mgt_create internal_org_user_mgt_list internal_org_application_mgt_view internal_organization_view internal_organization_create internal_user_mgt_view internal_user_mgt_create'
    ```

    !!! note

        The access token expiration time is set to `3600` seconds by default. If you wish to modify this duration, you can do so in the **Protocol** section of the application.


## Maintain organization admins

With self-service, you have the following two options to maintain administrators. Follow the appropriate guide that applies to your use case.

### Maintain admins within the organization

By maintaining admins in the respective organizations, you can create an isolation between each organization as each admin is only authorized to manage a single organization. This approach is suitable when you want organizations to govern themselves with minimal interaction from the root organization. Additionally, this approach helps you maintain a separation between your B2C users (whose accounts exist in the root organization) and B2B users (whose accounts exist in the child organizations).

!!! warning

    If a user wants to create multiple organizations, they will need to register a new account for each organization so that they will have separate identities for each organization.

To create and maintain admins in the organization:

1. Use the following command to check if the name of the organization you wish to create is available.

    ``` bash
    curl --location 'https://{{ host_name }}/api/server/v1/organizations/check-name' \
    --header 'Authorization: Bearer <access token>' \
    --header 'Content-Type: application/json' \
    --data '{"name": "<organization name>"}'
    ```

    !!! note
        If the organization name is available for use, the response will be `"available": true`, or it will be `"available": false`.

2. If the required organization name is available for use, use the following command to create the organization.

    ``` bash
    curl --location 'https://{{ host_name }}/api/server/v1/organizations' \
    --header 'Authorization: Bearer <access token>' \
    --header 'Content-Type: application/json' \
    --data '{"name": "<organization name>"}'
    ```

    !!! note
        Take note of the `id` parameter in the response. This is the ID of the organization and you will need it later.

3. Get an access token for the created organization by exchanging the access token obtained for the root organization. Use credentials of the shared OAuth2 application to execute the command.

    !!! note

        Learn more about the [organization switch grant]({{base_path}}/references/grant-types/#organization-switch-grant).

    ``` bash
    curl -X POST https://{{ host_name }}/oauth2/token \
    -u '<client_id>:<client_secret>' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -d 'grant_type=organization_switch&token=<access token obtained for root organization>&switching_organization=<id of created organization>&scope=internal_org_role_mgt_view internal_org_role_mgt_update internal_org_user_mgt_create internal_org_user_mgt_list internal_org_application_mgt_view'
    ```

4. Create a user in the organization using the following command.

    ``` bash
    curl --location 'https://{{ host_name }}/o/scim2/Users' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <token obtained in step 3>' \
    --data-raw '{
        "emails": [
            {
                "primary": true,
                "value": "<customer-email>"
            }
        ],
        "name": {
            "familyName": "<customer-family-name>",
            "givenName": "<customer-given-name>"
        },
        "userName": "<customer-username>",
        "{{ scim_schema_for_wso2_custom_claims }}": { 
            "askPassword" : "true"
        }
    }'
    ```

    !!! note
        Take note of the `user-id` returned in the response of the above command.

5. Use the following command to obtain the `id` of the administrator role associated with the B2B application.

    ``` bash
    curl --location 'https://{{ host_name }}/o/scim2/v2/Roles?filter=displayName eq <admin-role-name> and audience.value eq <role-audience-value>' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <access-token-obtained-for-the-organization>'
    ```

    !!! note "Find admin-role-name and role-audience-value"
        Refer to the following details related to the administrator role:
        <table>
        <tr>
        <td>admin-role-name</td>
        <td>Name of the administrator role associated with your B2B application.</td>
        <tr>
        <td>role-audience-value</td>
        <td>If the B2B application's audience is `application`, provide the application id. You may use the following command to obtain the application id. 
            
        ```bash
        curl --location 'https://{{ host_name }}/o/api/server/v1/applications?filter=name eq <B2B-application-name>'
        --header 'Authorization: Bearer <access-token-obtained-for-the-organization>'
        ```

        If the B2B application's audience is `organization`, provide the organization id. 
        Learn more about role audiences in [manage roles]({{base_path}}/guides/users/manage-roles/).
        </td>
        </tr>
        </table>

6. Assign the user created in step 4 to the administrator role of your B2B application by using the following command.

    ``` bash
    curl --location --request PATCH 'https://{{ host_name }}/o/scim2/v2/Roles/{admin-role-id}' \
    --header 'Authorization: Bearer <access-token-obtained-for-the-organization>' \
    --header 'Content-Type: application/json' \
    --data '{
        "Operations": [
            {
              "op": "add",
              "path": "users",
              "value": [
                {
                  "value": "<user-id obtained from step 4>"
                }
              ]
            }
        ]
    }'
    ```

### Maintain admins in the root organization

By maintaining organization admins in the root organization, you may enable organization admins to create and manage multiple organizations using a single identity. Organization admins are created and treated as a B2C user within the root organization.

!!! warning

    Since your organization admins are created in the root organization, separating B2B and B2C users will be complex.

To create and maintain admins in the root organization:

1. Create a user in the root organization (root) using {{ product_name }}'s SCIM APIs.

    ``` bash
    curl --location 'https://{{ host_name }}/scim2/Users' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer { access token }' \
    --data-raw '{
        "emails": [
            {
                "primary": true,
                "value": "<customer-email>"
            }
        ],
        "name": {
            "familyName": "<customer-family-name>",
            "givenName": "<customer-given-name>"
        },
        "userName": "<customer-username>",
        "{{ scim_schema_for_wso2_custom_claims }}": { 
            "askPassword" : "true"
        }
    }'
    ```

    !!! note

        Take note of the `user-id` received in the response of the above command.

2. Use the following command to check if the name of the organization you wish to create is available.

    ``` bash
    curl --location 'https://{{ host_name }}/api/server/v1/organizations/check-name' \
    --header 'Authorization: Bearer <access token>'  \
    --header 'Content-Type: application/json' \
    --data '{"name": "<organization name>"}'
    ```

    !!! note
        If the organization name is available for use, the response will be `"available": true`, else it will be `"available": false`.

3. If the required organization name is available for use, use the following command to create the organization and assign the user created in step 1 as the admin of that organization.

    ``` bash
    curl --location 'https://{{ host_name }}/api/server/v1/organizations' \
    --header 'Authorization: Bearer <access token>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "<organization name>",
        "attributes": [
            {
                "key": "creator.id",
                "value": "<user-id obtained from step 1>"
            },
            {
                "key": "creator.username",
                "value": "<username of the user created in step 1>"
            }
        ]
    }'
    ```

4. Get an access token for the created organization by exchanging the access token obtained for the root organization. Use credentials of the shared OAuth2 application to execute the command.

    !!! note

        Learn more about the [organization switch grant]({{base_path}}/references/grant-types/#organization-switch-grant).

    ``` bash
    curl -X POST https://{{ host_name }}/oauth2/token \
    -u  '<client_id>:<client_secret>' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -d 'grant_type=organization_switch&token=<access token obtained for root organization>&switching_organization=<created organization id>&scope=internal_org_role_mgt_view internal_org_role_mgt_update internal_org_user_mgt_create internal_org_user_mgt_list internal_org_application_mgt_view'
    ```

5. A shadow user account is created in the new organization for the organization creator. Get the shadow account's user id using the following command.

    ``` bash
    curl --location 'https://{{ host_name }}/o/scim2/Users?filter=userName eq <username of the user created in step 1>' \
    --header 'Authorization: Bearer <access-token-obtained-for-the-organization>' \
    --header 'Content-Type: application/json'
    ```

6. Use the following command to obtain the `id` of the administrator role defined for your B2B application.

    ``` bash
    curl --location 'https://{{ host_name }}/o/scim2/v2/Roles?filter=displayName eq <admin-role-name> and audience.value eq <role-audience-value>' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <access-token-obtained-for-the-organization>'
    ```

    !!! note "Find admin-role-name and role-audience-value"
        Refer to the following details related to the B2B application's administrator role:
        <table>
        <tr>
        <td>admin-role-name</td>
        <td>Name of the administrator role associated with your B2B application.</td>
        <tr>
        <td>role-audience-value</td>
        <td>If the B2B application's audience is `application`, provide the application id. You may use the following command to obtain the application id. 
            
        ```bash
        curl --location 'https://{{ host_name }}/o/api/server/v1/applications?filter=name eq <B2B-application-name>'
        --header 'Authorization: Bearer <access-token-obtained-for-the-organization>'
        ```

        If the B2B application's audience is `organization`, provide the organization id. 
        Learn more about role audiences in [manage roles]({{base_path}}/guides/users/manage-roles/).
        </td>
        </tr>
        </table>
        

7. Assign the shadow account to the administrator role of your B2B application by using the following command.

    ``` bash
    curl --location --request PATCH 'https://{{ host_name }}/o/scim2/v2/Roles/<admin-role-id>' \
    --header 'Authorization: Bearer <access-token-obtained-for-the-organization>' \
    --header 'Content-Type: application/json' \
    --data '{
        "Operations": [
            {
              "op": "add",
              "path": "users",
              "value": [
                {
                  "value": "<user-id obtained from step 4>"
                }
              ]
            }
        ]
    }'
    ```
