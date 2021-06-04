# Delete an Existing User 

This section guides you through deleting an exisiting user in WSO2 Identity Server.

----

!!! warning 
	Deleting a user cannot be undone.

## Delete a user using the Management Console 

1.  On the **Main** > **Identity** tab in the Management Console, click **List** under
    **Users and Roles**.  
2.  Click **Users**. This link is only visible to users with the Admin
    role.  
3.  In the **Users** list, click **Delete** next to the user you want to
    delete, and then click **Yes** to confirm the operation.

---

## Delete a user using SCIM 2.0 REST API

```curl tab="Request"
curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} -X DELETE https://{IS_IP}:{IS_PORT}/wso2/scim/Users/{SCIM_USER_ID} -H "Accept: application/json"
```

```curl tab="Sample Request"
curl -v -k --user admin:admin -X DELETE https://localhost:9443/wso2/scim/Users/b228b59d-db19-4064-b637-d33c31209fae -H "Accept: application/json"
```

You receive a response with status `200 OK` and the user will be deleted from the userstore.

-----
    
!!! info "Related topics"
    - [Concept: Users](../../../references/concepts/user-management/users)
    - [Guide: Ways of User Onboarding](../../identity-lifecycles/onboard-overview)
    - [Guide: Search/List Users](../../identity-lifecycles/search-users)
    - [Track user deletion on deleting a user](../../../deploy/monitor/monitor-logs#track-user-deletion-on-deleting-a-user)