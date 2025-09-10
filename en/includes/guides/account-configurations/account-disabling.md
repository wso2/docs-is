# Enable account disabling

For scenarios such as a user being inactive for an extended period or leaving your organization, you can disable the user's account instead of permanently deleting it. This allows you to retain the user's information and activity history while preventing the user from logging into applications or to the self-service My Account portal.

This option is intended for a more permanent solution and should not be used for temporarily locking user accounts. For temporary restrictions, use the user locking option available in each user profile. See [lock users]({{base_path}}/guides/users/manage-users/#lock-a-user-account) for more details.

Follow the steps below to enable the option to disable users of your organization,

1. On the {{product_name}} Console, go to **Login and Registration**.

2. Under **Account Management**, click **Account Disable**.
    
3. Toggle the  **Enable account disabling** on to enable the account disabling feature.

    ![Account Disable Settings]({{base_path}}/assets/img/guides/users/account-disable-setting.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

When this option is enabled, an additional option appears in each user profile to disable the user. Learn more about user profiles in [manage users]({{base_path}}/guides/users/manage-users/).

**Using the API**

You can also use {{ product_name }}'s [SCIM API]({{base_path}}/apis/scim2-users-rest-apis/#tag/Users-Endpoint/operation/patchUser) to disable user accounts. To do so,

1. [Get an access token]({{base_path}}/apis/#oauth-based-authentication) with the `internal_user_mgt_update` scope.

2. Use the obtained access token to execute the following cURL.

    ``` curl
    curl --location --request PATCH 'https://localhost:9443/scim2/Users/<user_id>' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <access_token>' \
    --data '{
       "schemas": [
          "urn:ietf:params:scim:api:messages:2.0:PatchOp",
          "urn:scim:wso2:schema"
       ],
       "Operations": [
          {
                "op": "replace",
                "value": {
                    "urn:scim:wso2:schema": {
                        "accountDisabled": false
                    }
                }
          }
       ]
    }'
    ```

Upon successful execution of the cURL the user account will get disabled.