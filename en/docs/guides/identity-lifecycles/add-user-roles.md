# Add a User Role

This section guides you through the ways of adding a user role to WSO2 Identity Server.

---

## Add a user role using the Management Console

{! fragments/add-user-role.md !}

---

## Add a user role using SCIM 2.0 REST API

In SCIM 2.0, creating a role is the same as creating a **group.** 

!!! note
    To create a group with users, the relevant users should already exist in the user store.
    

Use the following curl command to create a new user group with a new member. The attributes you have to include in the cURL command are the `userID`, `username:password`.

The sample request given below adds a group named "engineer" with the user "Mark" as a member.

**Request**

``` curl
curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} --data '{"displayName": {GROUP_NAME},"members": {MEMBERS_OF_THE_GROUP}}' --header "Content-Type:application/json" https://{IS_IP}:{IS_PORT}/wso2/scim2/Groups
```

``` tab="Sample Request"
curl -v -k --user admin:admin --data '{"displayName": "engineer","members": [{"value":"008bba85-451d-414b-87de-c03b5a1f4217","Mark": "Mark"}]}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim2/Groups
```

``` tab="Sample Response"
{"id":"7bac6a86-1f21-4937-9fb1-5be4a93ef469","schemas":["urn:ietf:params:scim:schemas:core:2.0:Group"],"displayName":"PRIMARY/engineer","members":[{"value":"008bba85-451d-414b-87de-c03b5a1f4217","display":"Mark"}],"meta":{"lastModified":"2020-04-26T18:31:57","created":"2020-04-26T18:31:57","location":"https://localhost:9443/scim2/Groups/7bac6a86-1f21-4937-9fb1-5be4a93ef469"}}
```

You receive a response with the payload as indicated above and a
response status `           201 CREATED          `.

----

!!! info "Related Topics"
    - [Concept: Roles and Permissions](../../../references/concepts/user-management/roles-and-permissions)
    - [Guide: Edit/Delete Roles](../../identity-lifecycles/edit-delete-roles)
    - [Guide: Role Based Permissions](../../identity-lifecycles/role-based-permissions/)




