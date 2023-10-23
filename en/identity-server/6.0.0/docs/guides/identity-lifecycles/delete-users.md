# Delete an Existing User 

This section guides you through deleting an existing user in WSO2 Identity Server.

!!! warning 
	Deleting a user cannot be undone.

## Use the Management Console 

1.  On the **Main** > **Identity** tab in the Management Console, click **List** under
    **Users and Roles**.  
2.  Click **Users**. This link is only visible to users with the Admin
    role.  
3.  In the **Users** list, click **Delete** next to the user you want to
    delete, and then click **Yes** to confirm the operation.

## Use the SCIM 2.0 REST API

!!! abstract ""
    **Request**
    ```
    curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} -X DELETE https://{IS_HOST}:{IS_PORT}/scim2/Users/{SCIM_USER_ID} -H "Accept: application/json"
    ```
    ---
     **Sample Request**
    ```curl
    curl -v -k --user admin:admin -X DELETE https://localhost:9443/scim2/Users/b228b59d-db19-4064-b637-d33c31209fae -H "Accept: application/json"
    ```

You receive a response with status `204 No Content` and the user will be deleted from the userstore.
    
!!! info "Related topics"
    - [Concept: Users]({{base_path}}/references/concepts/user-management/users)
    - [Guide: Ways of User Onboarding]({{base_path}}/guides/identity-lifecycles/onboard-overview)
    - [Guide: Search/List Users]({{base_path}}/guides/identity-lifecycles/search-users)
    - [Track user deletion on deleting a user]({{base_path}}/guides/identity-lifecycles/track-deletion)
