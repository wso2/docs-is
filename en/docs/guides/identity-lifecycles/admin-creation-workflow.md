# Create new user

Administrators can add new users in a tenant by manually registering the user details from the Management Console.

## Use the Management Console

Follow the steps given below to add users fromt he Management Console.

1. Sign in to the WSO2 Identity Server Management Console using administrator credentials (`admin:admin`).

2. Go to **Main** > **Identity** > **Users and Roles** and click **Add** to open the **Add Users and Roles** page.

3. Click **Add New User** and specify the required details as explained below.

    ![enter-user-details]({{base_path}}/assets/img/guides/enter-user-details.png)

    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Domain</td>
            <td>
                <p>The user store in which the user details should be created. You can select an exisitng user store from the list.</p>
                <b>Default Value</b>: PRIMARY
                <p>Learn more about <a href="{{base_path}}/deploy/configure-user-stores/">user stores in WSO2 IS</a>.</p>
            </td>
        </tr>
        <tr>
            <td>Username</td>
            <td>
                The username that should be used to sign in.
            </td>
        </tr>
        <tr>
            <td>Password</td>
            <td>
               <p> The password of the user. The administrator is setting the password for the user. The user will be able to reset the password later from the My Account portal.</p>
               <p><b>Note</b>: By default, the password must be atleast 5 characters.</p>
            </td>
        </tr>
    </table>

5. Click **Finish** to complete the user registration.

## Use the SCIM 2.0 REST API

You can create a new user using a SCIM 2.0 request as shown below. 

**Request**

```curl
curl -v -k --user [username]:[password] --data '{"schemas":[],"name":{"familyName":[last name],"givenName":[name]},"userName":[username],"password":[password],"emails":[{"primary":[true/false],"value":[email address],"type":[home/work]},{"value":[email address 2],"type":[home/work]}]}--header "Content-Type:application/json" https://localhost:9443/scim2/Users
```

Below is a sample request to create a user and its corresponding response using SCIM 2.0. 

!!! abstract ""
    **Sample Request**
    ```
    curl -v -k --user admin:admin --data '{"schemas":[],"name":{"familyName":"jackson","givenName":"kim"},"userName":"kim","password":"kimwso2","emails":[{"primary":true,"value":"kim.jackson@gmail.com","type":"home"},{"value":"kim_j@wso2.com","type":"work"}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users
    ```
    ---
    **Sample Response**
    ```
    {
        "emails":[
            {
                "type":"home",
                "value":"kim.jackson@gmail.com",
                "primary":true
            },
            {
                "type":"work",
                "value":"kim_j@wso2.com"
            }
        ],
        "meta":{
            "created":"2018-08-15T14:55:23Z",
            "location":"https://localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd",
            "lastModified":"2018-08-15T14:55:23Z",
            "resourceType":"User"
        },
        "schemas":[
            "urn:ietf:params:scim:schemas:core:2.0:User",
            "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
        ],
        "name":{
            "familyName":"jackson",
            "givenName":"kim"
        },
        "id":"c8c821ba-1200-495e-a775-79b260e717bd",
        "userName":"kim"
    }
    ```


!!! info "Related topics"
    - [Guide: Invitation Workflow]({{base_path}}/guides/identity-lifecycles/invitation-workflow) 
    - [Guide: User Self Registration Workflow]({{base_path}}/guides/identity-lifecycles/self-registration-workflow)
    - [Guide: Just in Time User Provisioning Workflow]({{base_path}}/guides/identity-lifecycles/jit-workflow/)
    - [Guide: Bulk Import Users]({{base_path}}/guides/identity-lifecycles/bulk-import-users)
    - [Guide: Outbound Provisioning]({{base_path}}/guides/identity-lifecycles/outbound-provisioning)
    - [Concept: Users]({{base_path}}/references/concepts/user-management/users)
    <!--- [Guide: Email Templates](TODO:dev-portal-link)--->