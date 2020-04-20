## Managing Users

You can create and manage users by using the admin portal, SCIM requests, or SOAP services. Below is the list operations you can perform to manage your users, using any one of these ways.

- [Add a user](#add-a-user)
- [Add users in  bulk]()
- [Search for a user](user-view-profile.md)
- [View and update user profile]()
- [Assign Roles](user-assign-role.md)
- [Change the password](change-password.md)
- [Lock the account](user-lock-account.md)
- [Delete the account](user-delete.md)


### Add a user

#### Add a user using the admin portal

{!fragments/xxx!}

#### Add a user using SCIM
You can create a new user using a SCIM request as shown below. 

```tab="Request Format"Request" 
curl -v -k --user admin:admin --data "{"schemas":[],"name":{"familyName":"familyName","givenName":"givenName"},"userName":"username","password":"password","emails":[{"primary":true,"value":"wso2_home.com","type":"home"},{"value":"wso2_work.com","type":"work"}]}" --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Users
```

```tab="Request Format"Response"
{"id":"0d2714d0-6a33-4ddd-b4e0-612584c4a8c8","schemas":["urn:scim:schemas:core:1.0"],"name":{"familyName":"familyName","givenName":"givenName"},"userName":"username","emails":[{"value":"wso2_home.com","type":"home"},{"value":"wso2_work.com","type":"work"}],"meta":{"lastModified":"2016-01-25T11:44:14","location":"https://localhost:9443/wso2/scim/Users/0d2714d0-6a33-4ddd-b4e0-612584c4a8c8","created":"2016-01-25T11:44:14"}} 
```

Below is a sample request and its corresponding response using SCIM 2.0. 

