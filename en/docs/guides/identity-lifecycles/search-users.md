# Search for Users

Once you have added a user in the Identity Server, you can search for
the user.

## Use the Management Console

Follow the steps given below to search for users from the Management Console.

1.  Go to **Main** > **Identity** > **Users and Roles** on the Management Console and click **List**.

2.  Click **Users** to view users.

    !!! info
        This link is only visible to users with the **Admin** role. 
    
    ![search-users-in-console]({{base_path}}/assets/img/guides/search-users-in-console.png) 
    
3.  Search for users by doing one of the following:

    -   **Search by Domain**  
        1.	Select the user store from the **Select Domain** list.
        2.  Enter the username of the user and click **Search Users**.
            
            !!! info
                For users to be listed, you must use the exact name of the user or use a username pattern by including \*. For example, if you have a user named Don, you can either search for this user by searching for "Don", or you could search for "D\*" to list out all the users with names beginning with D.

    -   **Search by Claim**
        1.  Select the relevant claim URI from the **Select Claim Uri**
            list and enter the claim value in the user name field.
        2.  Click **Search Users**.

## Use the SCIM 2.0 REST API

You can search for users using a SCIM 2.0 REST API request as shown below. See the [SCIM 2.0 API documentation]({{base_path}}/apis/scim2-rest-apis) for details on using this API.

**Request**

```curl
curl -v -k --user [username]:[password] --data '{"schemas": ["urn:ietf:params:scim:api:messages:2.0:SearchRequest"],"attributes": [attribute names],"filter": [filter query],"domain": [domain name],"startIndex": [value],"count": [value]}' --header "Content-Type:application/scim+json"  'https://localhost:9443/scim2/Users/.search'
```

Below is a sample request and its corresponding response to search for users using SCIM 2.0. 

!!! abstract ""
    **Sample Request**
    ```
    curl -v -k --user admin:admin --data '{"schemas": ["urn:ietf:params:scim:api:messages:2.0:SearchRequest"],"attributes": ["name.familyName", "userName"],"filter":"userName sw ki and name.familyName co ack","domain":"PRIMARY","startIndex": 1,"count": 10}' --header "Content-Type:application/scim+json"  'https://localhost:9443/scim2/Users/.search'
    ```
    ---
    **Sample Response**
    ```
    {
        "totalResults":1,
        "startIndex":1,
        "itemsPerPage":1,
        "schemas":["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
        "Resources":[
            {
                "name":{"familyName":"jackson"},
                "id":"c8c821ba-1200-495e-a775-79b260e717bd",
                "userName":"kim"
            }
        ]
    }
    ```


!!! info "Related topics"
    - [Delete users]({{base_path}}/guides/identity-lifecycles/delete-users)
    - [View/Update user profiles]({{base_path}}/guides/identity-lifecycles/update-profile)
    - [Add multiple user profiles]({{base_path}}/guides/identity-lifecycles/customize-profiles)
    - [Track user deletion]({{base_path}}/guides/identity-lifecycles/track-deletion)