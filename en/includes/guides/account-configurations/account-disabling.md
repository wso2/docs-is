# Enable account disabling

When a user leaves your organization or stays inactive for a long period, you might want to disable their account instead of deleting it permanently. Disabling a user account prevents the user from logging into applications or to the self-service My Account portal, while retaining their information and activity history.

!!! note

    Account disabling serves as a long-term, permanent solution. If you only want to temporarily lock user accounts, use account locking instead. See [lock users]({{base_path}}/guides/users/manage-users/#lock-a-user-account) for more details.

You can disable users accounts either via the {{ product_name }} Console or by using the SCIM API.

## Use the Console

By default, the {{product_name}} Console keeps the account disabling feature turned off in user profiles. To enable account disabling in user profiles,

1. On the {{product_name}} Console, go to **Login and Registration**.

2. Under **Account Management**, click **Account Disable**.

3. Toggle **Enable account disabling** on to enable.

    ![Account Disable Settings]({{base_path}}/assets/img/guides/users/account-disable-setting.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

Once enabled, every user profile displays an option to disable the user. Learn more about user profiles in [manage users]({{base_path}}/guides/users/manage-users/).

## Use the API

You can also use {{ product_name }}'s [SCIM API]({{base_path}}/apis/scim2-users-rest-apis/#tag/Users-Endpoint/operation/patchUser) to disable user accounts. To do so,

1. [Get an access token]({{base_path}}/apis/#oauth-based-authentication) with the `internal_user_mgt_update` scope.

2. Use the obtained access token to execute the following cURL.

    !!! note

        Replace `<user_id>` with the ID of the user you want to disable, and `<access_token>` with the access token you obtained in step 1.

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

    After you successfully execute the cURL, the user profile gets disabled.
