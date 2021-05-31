# Search for Users

## Search for users using the Management Console

Once you have added a user in the Identity Server, you can search for
the user by doing the following.

1.  On the **Main** > **Identity** tab in the Management Console, click **List** under
    **Users and Roles**.  
2.  Click **Users**. This link is only visible to users with the Admin
    role. The following screen appears.  
    ![search-users-in-console](../../../assets/img/guides/search-users-in-console.png) 
    
    You can search for users by doing one of the following. 

    -   **Search by Domain**  
        1.	Select the user store that the user store in using the
            **Select Domain** dropdown.
        2.  Enter the user name of the user and click **Search Users**.
            For users to be listed, you must use the exact name of the
            user, or use a username pattern by including \*. For
            example, if you have a user named Don, you can either search
            for this user by searching for "Don", or you could search
            for "D\*" to list out all the users with names beginning
            with D.
        3.  The user is displayed in the list.  

    -   **Search by Claim**
        1.  Select the relevant claim URI from the **Select Claim Uri**
            dropdown and enter the claim value in the user name field.
        2.  Click on **Search Users**.

---

## Search for users using SCIM 2.0 REST API

You can search for users using a SCIM 2.0 REST API request as shown below. 

**Request**

```curl
curl -v -k --user [username]:[password] --data '{"schemas": ["urn:ietf:params:scim:api:messages:2.0:SearchRequest"],"attributes": [attribute names],"filter": [filter query],"domain": [domain name],"startIndex": [value],"count": [value]}' --header "Content-Type:application/scim+json"  'https://localhost:9443/scim2/Users/.search'
```

Below is a sample request and its corresponding response to search for users using SCIM 2.0. 

```tab="Sample Request"
curl -v -k --user admin:admin --data '{"schemas": ["urn:ietf:params:scim:api:messages:2.0:SearchRequest"],"attributes": ["name.familyName", "userName"],"filter":"userName sw ki and name.familyName co ack","domain":"PRIMARY","startIndex": 1,"count": 10}' --header "Content-Type:application/scim+json"  'https://localhost:9443/scim2/Users/.search'
```

```tab="Sample Response"
{"totalResults":1,"startIndex":1,"itemsPerPage":1,"schemas":["urn:ietf:params:scim:api:messages:2.0:ListResponse"],"Resources":[{"name":{"familyName":"jackson"},"id":"c8c821ba-1200-495e-a775-79b260e717bd","userName":"kim"}]}
```

---

!!! info "Related topics"
    - [Concept: Users](../../../references/concepts/user-management/users)
    - [Guide: Ways of User Onboarding](../onboard-overview)
    - [Guide: Delete Users](../delete-users)