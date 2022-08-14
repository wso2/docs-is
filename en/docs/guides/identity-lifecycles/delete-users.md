# Delete an Existing User

Once you have added a user in the WSO2 Identity Server, you can delete users as explained below.

!!! warning
    Deleting a user cannot be undone.

## Use the Management Console

1.  Go to **Main** > **Identity** > **Users and Roles** in the Management Console and click **List**.

2.  Click **Users** to view users.

    !!! info
        This link is only visible to users with the **Admin** role.  

3.  Click **Delete** next to the user you want to delete and then click **Yes** to confirm the operation.

## Use the SCIM 2.0 REST API

You can delete users using a SCIM 2.0 REST API request as shown below. See the [SCIM 2.0 API documentation]({{base_path}}/apis/scim2-rest-apis) for details on using this API.

!!! abstract ""
    **Request**
    ```
    curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} -X DELETE https://{IS_IP}:{IS_PORT}/wso2/scim/Users/{SCIM_USER_ID} -H "Accept: application/json"
    ```
    ---
     **Sample Request**
    ```curl
    curl -v -k --user admin:admin -X DELETE https://localhost:9443/wso2/scim/Users/b228b59d-db19-4064-b637-d33c31209fae -H "Accept: application/json"
    ```

You receive a response with status `200 OK` and the user will be deleted from the userstore.
    
!!! info "Related topics"
    - [Guide: Search/List users]({{base_path}}/guides/identity-lifecycles/search-users)
    - [Guide: View/Update user profiles]({{base_path}}/guides/identity-lifecycles/update-profile)
    - [Guide: Add multiple user profiles]({{base_path}}/guides/identity-lifecycles/customize-profiles)
    - [Guide: Track user deletion]({{base_path}}/guides/identity-lifecycles/track-deletion)