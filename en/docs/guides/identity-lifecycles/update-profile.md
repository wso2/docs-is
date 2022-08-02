# View and Update User Profiles

You can update the information on a user's profile as explained.

## Prerequisites

The user information you see on a user profile are the **claims** (configured in WSO2 IS) that are mapped to the **user attributes** stored in the user store in the user's profile.

Learn more about [claims]({{base_path}}/guides/dialects/add-claim-mapping/).

## Use the Management Console

Follow the instructions given below to update a user using management console.

1.  On the **Main** > **Identity** tab in the Management Console, click **List** under
    **Users and Roles**.
2.  Click **Users**. This link is only visible to users with the Admin
    role.
3.  You will see the list of users that are available and you can click
    **Update Profile** if you want to update the profile of a particular
    user.  
    ![update-profile-in-console]({{base_path}}/assets/img/guides/update-profile-in-console.png) 
4.  There you can update the details of the user and click **Update**.  
    ![update-userdetails]({{base_path}}/assets/img/guides/update-userdetails.png) 

Other than updating user profile details, you can also change the
password of the user and assign more roles to the user.

### User attributes with multiple values

If your user store supports multiple values for attributes, the WSO2 Identity Server can view, add, update, or delete them (normally LDAP/AD offer support for this). The following are the different ways
you can do this.

1.  In WSO2 Identity Server Management Console, multiple attribute values are separated by commas. If you want to update two email addresses
    using the user profile UI, you must provide it as follows:

    ``` java
    asela@soasecurity.com,aselapathberiya@soasecurity.com
    ```

    See the following screen for how this will look in the user
    interface of the Identity Server Management Console.  
    ![is-user-interface]({{base_path}}/assets/img/fragments/is-user-interface.png)

2.  When using the `RemoteUserStoreManagerService` API, call it as follows.

    ``` java
    setUserClaimValue("username", "http://wso2.org/claims/emailaddress", "asela@soasecurity.org,aselapathberiya@gmail.com", null)
    ```

    The GET results are returned in the form of comma separated values
    for the attribute.

    ``` java
    "asela@soasecurity.org,aselapathberiya@gmail.com"
    ```

    The following screen shows how this looks in the LDAP.  
    ![ldap-interface]({{base_path}}/assets/img/fragments/ldap-interface.png)

## Use the SCIM 2.0 REST API

You can update a user profile using a SCIM 2.0 request as shown below. 

**Request**

```curl
curl -v -k --user [username]:[password] -X PATCH -d '{"schemas":[],"Operations":[{"op":[operation],"value":{[attributeName]:[attribute value]}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/[userID]
```

Below is a sample request and its corresponding response using SCIM 2.0. 

!!! abstract ""
    **Sample Request**
    ```
    curl -v -k --user admin:admin -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],"Operations":[{"op":"add","value":{"nickName":"shaggy"}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd
    ```
    ---
    **Sample Response**
    ```
    {
        "emails":[
            {"type":"work","value":"kim_j@wso2.com"},
            {"type":"home","value":"kim.jack@gmail.com"}
        ],
        "meta":{
            "created":"2018-08-15T14:55:23Z",
            "location":"https://localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd",
            "lastModified":"2018-08-16T14:46:07Z",
            "resourceType":"User"
        },
        "nickName":"shaggy",
        "schemas":[
            "urn:ietf:params:scim:schemas:core:2.0:User",
            "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
        ],
        "roles":[
            {"type":"default","value":"Internal/everyone"}
        ],
        "name":{"givenName":"kim","familyName":"jackson"},
        "id":"c8c821ba-1200-495e-a775-79b260e717bd",
        "userName":"kim"
    }
    ```

!!! info "Related topics"
    - [Concept: Users]({{base_path}}/references/concepts/user-management/users)
    - [Guide: Ways of User Onboarding]({{base_path}}/guides/identity-lifecycles/onboard-overview)
    - [Guide: Search/List Users]({{base_path}}/guides/identity-lifecycles/search-users)

