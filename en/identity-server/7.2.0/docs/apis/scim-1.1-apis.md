# SCIM 1.1 APIs

!!! warning
    
    **WSO2 recommends using** **[SCIM 2.0 APIs]({{base_path}}/apis/scim2-users-rest-apis)** because of the following
    reasons:
    
    -   SCIM 2.0 APIs provide additional methods that are not available with
        SCIM 1.1 APIs (e.g., additional search filters for filtering users).
    -   The SCIM 2.0 schema supports more fine-grained requirements.  
    -   There is more focus on feature development for SCIM 2.0 APIs.
    

The SCIM API is used in to perform various tasks in the WSO2
Identity Server. For simplicity, cURL commands are used in this example
to send CRUD requests to the REST endpoints of Identity Server.

To execute these commands, you need to [Download the WSO2 Identity
Server](http://wso2.com/products/identity-server/), unzip it and run
it.

-   Navigate to the *SCIM User Endpoint* at the following URL:
    https://localhost:9443/wso2/scim/Users .

    You can use the following SCIM User Endpoint to specifically return
    data of the currently logged-in user:
    `https://localhost:9443/wso2/scim/Users/me`  
    (You can use this endpoint for commands that refer to a single user,
    such as GetUser, UpdateUser etc.)

-   Navigate to the *SCIM Group Endpoint* at the following URL:
    `https://localhost:9443/wso2/scim/Groups`

These endpoints are exposed over HTTPS since sensitive information is
exchanged and also protected with Basic Auth Authentication.

!!! warning
    The following requests use Basic Auth authentication to demonstrate
    sending requests to the REST endpoints of WSO2 Identity Server as a
    quick start. **In a production environment, we recommend that you use
    OAuth Authentication instead.** <!-- TODO For instructions, see [Setting Up Service Provider for Inbound Provisioning]({{base_path}}/guides/applications/inbound-provisioning-for-sp/).-->

-   **Create User** : The following command can be used to create a
    user. In this request, authentication is done using Basic Auth and the payload is sent in JSON format adhering to the SCIM 1.1 specification. You receive a response with 201 CREATED status and the payload response as follows:

    ```curl tab="Request"
    curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} --data '{"schemas":[],"name":{"familyName":"{FAMILY_NAME}","givenName":"{FIRST_NAME}"},"userName":"{USERNAME}","password":"{PASSWORD}","emails":[{"primary":true,"value":"{HOME_EMAIL}","type":"home"},{"value":"{WORK_EMAIL}","type":"work"}]}' --header "Content-Type:application/json" https://{IS_IP}:{IS_PORT}/wso2/scim/Users
    ```

    ```curl tab="Sample Request"
    curl -v -k --user admin:admin --data '{"schemas":[],"name":{"familyName":"gunasinghe","givenName":"hasinitg"},"userName":"hasinitg","password":"hasinitg","emails":[{"primary":true,"value":"hasini_home.com","type":"home"},{"value":"hasini_work.com","type":"work"}]}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Users
    ```

    ```json tab="Response"
    {"id":"0032fd29-55a9-4fb9-be82-b1c97c073f02","schemas":["urn:scim:schemas:core:1.0"],"name":{"familyName":"gunasinghe","givenName":"hasinitg"},"userName":"hasinitg","emails":[{"value":"hasini_home.com","type":"home"},{"value":"hasini_work.com","type":"work"}],"meta":{"lastModified":"2016-01-26T16:46:53","location":"https://localhost:9443/wso2/scim/Users/0032fd29-55a9-4fb9-be82-b1c97c073f02","created":"2016-01-26T16:46:53"}}
    ```

    Some additional attributes such as, `unique_id`, `created`, `lastModified` and `location` are READ ONLY attributes and are set by the service provider.

    Do the following to test this.

    1. On the WSO2 Identity Server console, go to **Users**.
        You will see that the user created above is listed.
    
    2. Click on the newly added user to view the user profile of the user you created. You will see that only the user's first and last names have been set properly but the other fields remain empty. This is because the Carbon platform uses a different set of attributes in LDAP than the SCIM specific dialect. However, those attributes are stored in the underlying user store. You can verify this using a GET request on the particular user.

<!-- -->

-   **GET User** : You can retrieve a particular user resource using its
    unique id (You can get this id in the response to the
    `create user` request):

    ```curl tab="Request"
    curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} https://{IS_IP}:{IS_PORT}/wso2/scim/Users/{SCIM_USER_ID}
    ```

    ``` curl tab="Sample Request"
    curl -v -k --user admin:admin https://localhost:9443/wso2/scim/Users/0032fd29-55a9-4fb9-be82-b1c97c073f02
    ```

    The response consists of all attributes that were sent.

    Alternatively, you can log in as a user and use the
    `Users/me` SCIM endpoint to retrieve data of
    the currently logged-in user:

    ``` curl
    curl -v -k --user hasinitg:hasinitg https://localhost:9443/wso2/scim/Users/me
    ```

    For this command, the user credentials of the user created above
    (hasinitg) is used as an example. Also note that to run this
    command, the user must have a role that includes admin privileges.

<!-- -->

-   **List Users** : Now create some users through the WSO2 Identity
    Server console and fill in their profile details. The
    following code snippets show the response received after a new user
    called "pulasthim" was created and the user profile was updated. The following is the response you would receive.

    ```curl tab="Sample Request"
    curl -v -k --user admin:admin https://localhost:9443/wso2/scim/Users
    ```

    ```json tab="Response"
    {"schemas":["urn:scim:schemas:core:1.0"],"totalResults":2,"Resources":[{"id":"0032fd29-55a9-4fb9-be82-b1c97c073f02","userName":"hasinitg","meta":{"lastModified":"2016-01-26T16:46:53","created":"2016-01-26T16:46:53","location":"https://localhost:9443/wso2/scim/Users/0032fd29-55a9-4fb9-be82-b1c97c073f02"}},{"id":"b228b59d-db19-4064-b637-d33c31209fae","userName":"pulasthim","meta":{"lastModified":"2016-01-26T17:00:33","created":"2016-01-26T17:00:33","location":"https://localhost:9443/wso2/scim/Users/b228b59d-db19-4064-b637-d33c31209fae"}}]}
    ```

    You can see the representation of the three users with attributes in
    JSON format adhering to SCIM Schema.

<!-- -->

-   **Update User** : Update the work and home email fields of the user
    "hasinitg" through the following cURL command:

    !!! note
        You have to use the correct SCIM ID by taking it either
        from the "create user" response or from the "list user" response.

    ```curl tab="Request"
    curl -v -k --user {IS_USERNAME}:{IS_PASSWORD}  -X PUT -d '{"schemas":[],"name":{"familyName":"{LAST_NAME}","givenName":"{FIRST_NAME"},"userName":"{USERNAME","emails": "{EMAIL"}' --header "Content-Type:application/json" https://{IS_IP}:{IS_PORT}/wso2/scim/Users/{SCIM_USER_ID}
    ```

    ```curl tab="Sample Request"
    curl -v -k --user admin:admin -X PUT -d '{"schemas":[],"name":{"familyName":"gunasinghe","givenName":"hasinitg"},"userName":"hasinitg","emails":[{"value":"hasini@wso2.com","type":"work"},{"value":"hasi7786@gmail.com","type":"home"}]}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Users/0032fd29-55a9-4fb9-be82-b1c97c073f02
    ```

    You receive a 200 OK response and a payload containing the updated
    user representation.

    Alternatively, you can use the `            Users/me           `
    SCIM endpoint to update the user profile of the currently logged-in
    user:

    ```curl
    curl -v -k --user hasinitg:hasinitg -X PUT -d '{"schemas":[],"name":{"familyName":"gunasinghe","givenName":"hasinitg"},"userName":"hasinitg","emails":[{"value":"hasini@wso2.com","type":"work"},{"value":"hasi7786@gmail.com","type":"home"}]}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Users/me
    ```

    For this command, the user credentials of the user created above
    (hasinitg)was used as an example.

    !!! note "Updating a resource using PATCH request"
        You can also update a resource using a PATCH request. Unlike the PUT
        request (which completely replaces or overwrites the attributes),
        the PATCH modifies only the existing resource. The sample cURL
        command for a PATCH request is given below:
    
        ```curl tab="Sample Request"
        curl -v -k --user admin:admin -X PATCH -d '{"schemas": ["urn:scim:schemas:core:1.0"],"name":
        {"familyName": "Tester"},"userName": "hasinitg","meta": {"attributes": []}}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Users/15722a71-3bd1-4864-8460-1e63a2dace65
        ```
    
        ```json tab="Sample Response"
        200 OK
        {"emails":[
        {"type":"home","value":"hasini_home.com"},
        {"type":"work","value":"hasini_work.com"}],"meta":
        {"created":"2017-08-16T10:07:36","location":"https://localhost:9443/wso2/scim/Users/15722a71-3bd1-4864-8460-1e63a2dace65","lastModified":"2017-08-16T12:17:11"},"schemas":["urn:scim:schemas:core:1.0"],"name":
        {"familyName":"Tester","givenName":"hasinitg"},"id":"15722a71-3bd1-4864-8460-1e63a2dace65","userName":"hasinitg"}
        ```

-   **Delete User** : Delete the user with username 'pulasthim' that was
    created through the WSO2 Identity Server console.

    ```curl tab="Request"
    curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} -X DELETE https://{IS_IP}:{IS_PORT}/wso2/scim/Users/{SCIM_USER_ID} -H "Accept: application/json"
    ```

    ```curl tab="Sample Request"
    curl -v -k --user admin:admin -X DELETE https://localhost:9443/wso2/scim/Users/b228b59d-db19-4064-b637-d33c31209fae -H "Accept: application/json"
    ```

    You receive a response with status 200 OK and the user will be
    deleted from the user store. Similarly, you can manage groups by
    performing CRUD operations on the Group resource endpoint.

-   **Filter User** : Since CRUD operations have to be performed using
    SCIM ID which is unique to the service provider, the user REST
    endpoint also supports the filter operation. You can filter users
    based on their username, which is considered the unique user
    attribute in Carbon servers. You can use the following cURL command.
    WSO2 Identity Server currently supports only equal operation in
    filtering.

    ```curl tab="Request"
    curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} https://{IS_IP}:{IS_PORT}/wso2/scim/Users?filter={VALUE_TO_BE_CHECKED}+Eq+%22{VALUE_TO_BE_EQUAL}%22
    ```

    ```curl tab="Sample Request"
    curl -v -k --user admin:admin https://localhost:9443/wso2/scim/Users?filter=userName+Eq+%22hasinitg%22
    ```

    ```json tab="Response"
    {"schemas":["urn:scim:schemas:core:1.0"],"totalResults":1,"Resources":[{"id":"0032fd29-55a9-4fb9-be82-b1c97c073f02","userName":"hasinitg","meta":{"lastModified":"2016-01-26T18:26:04","created":"2016-01-26T16:46:53","location":"https://localhost:9443/wso2/scim/Users/0032fd29-55a9-4fb9-be82-b1c97c073f02"}}]}
    ```

-   **Create Group** : You can create groups either with or without
    members. The following command creates a group with a user.

    !!! note
        When creating a group with users, you need to have that
        user already existing in the user store and provide its unique id.
        Create a new group named: 'engineer' with the user 'hasinitg' as a
        member. The attributes you have to include in the cURL command are
        the userID, username:password.

        You receive a response with the payload as indicated below and a response status 201 CREATED:

    ```curl tab="Request"
    curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} --data '{"displayName": {GROUP_NAME},"members": {MEMBERS_OF_THE_GROUP}}' --header "Content-Type:application/json" https://{IS_IP}:{IS_PORT}/wso2/scim/Groups
    ```

    ```curl tab="Sample Request"
    curl -v -k --user admin:admin --data '{"displayName": "engineer","members": [{"value":"316214c0-dd7e-4dc3-bed8-e91227d32597","display": "hasinitg"}]}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Groups
    ```

    ```json tab="Sample Response"
    {"id":"b4f9bccf-4f79-4288-be21-78e0d4500714","schemas":["urn:scim:schemas:core:1.0"],"displayName":"PRIMARY/engineer","members":[{"value":"0032fd29-55a9-4fb9-be82-b1c97c073f02","display":"hasinitg"}],"meta":{"lastModified":"2016-01-26T18:31:57","created":"2016-01-26T18:31:57","location":"https://localhost:9443/wso2/scim/Groups/b4f9bccf-4f79-4288-be21-78e0d4500714"}}
    ```

    You can observe in the IS console, that the new group
    is listed under roles and user 'adam' is listed under users of that
    group.

-   **List Groups:** Now create another role through the Identity Server
    Console and list all the groups. Create a group named:
    'manager' without any users added to it. The following command lists
    the groups. When you list the groups, you can see both groups are listed.

    ```java tab="Sample Request"
    curl -v -k --user admin:admin https://localhost:9443/wso2/scim/Groups
    ```

    ```java tab="Response"
    {"schemas":["urn:scim:schemas:core:1.0"],"totalResults":2,"Resources":[{"id":"b4f9bccf-4f79-4288-be21-78e0d4500714","displayName":"PRIMARY/engineer","meta":{"lastModified":"2016-01-26T18:31:57","created":"2016-01-26T18:31:57","location":"https://localhost:9443/wso2/scim/Groups/b4f9bccf-4f79-4288-be21-78e0d4500714"}},{"id":"484cdc26-9136-427b-ad9e-96ea3082e1f5","displayName":"PRIMARY/manager","meta":{"lastModified":"2016-01-26T18:33:33","created":"2016-01-26T18:33:33","location":"https://localhost:9443/wso2/scim/Groups/484cdc26-9136-427b-ad9e-96ea3082e1f5"}}]}
    ```

-   **Update Group** : Rename the group "manager" to "executive":


    ```java tab="Request"
    curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} -X PATCH -d '{"displayName": {GROUP_NAME}}' --header "Content-Type:application/json" https://{IS_IP}:{IS_PORT}/wso2/scim/Groups/{SCIM_GROUP_ID}
    ```

    ```java tab="Sample Request"
    curl -v -k --user admin:admin -X PATCH -d '{"displayName": "executive"}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Groups/484cdc26-9136-427b-ad9e-96ea3082e1f5
    ```

    You receive a response with `           200 OK          ` status and
    full JSON representation of the updated group.

      
-   **Delete Group** : You can delete the group using the unique SCIM Id
    of the group. The following command deletes the group: 'executive'.

    ```java tab="Request"
    curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} -X DELETE https://{IS_IP}:{IS_PORT}/wso2/scim/Groups/{SCIM_GROUP_ID} -H "Accept: application/json"
    ```

    ```java tab="Sample Request"
    curl -v -k --user admin:admin -X DELETE https://localhost:9443/wso2/scim/Groups/484cdc26-9136-427b-ad9e-96ea3082e1f5 -H "Accept: application/json"
    ```

-   **Filter Group** : You can filter groups with the group display name
    using one of the following commands. These commands filter the group
    with display name: 'engineer'. You can use one of the two curl commands given below to test this. 

    ```java tab="Sample Request"
    curl -v -k --user admin:admin https://localhost:9443/wso2/scim/Groups?filter=displayName+Eq+%22engineer%22
    ```

    ```java tab="Sample Request"
    curl -v -k --user admin:admin https://localhost:9443/wso2/scim/Groups?filter=displayNameEqengineer
    ```

    ```java tab="Reponse"
    {"schemas":["urn:scim:schemas:core:1.0"],"totalResults":1,"Resources":[{"id":"b4f9bccf-4f79-4288-be21-78e0d4500714","displayName":"PRIMARY/engineer","meta":{"lastModified":"2016-01-26T18:31:57","created":"2016-01-26T18:31:57","location":"https://localhost:9443/wso2/scim/Groups/b4f9bccf-4f79-4288-be21-78e0d4500714"}}]}
    ```

    Now, you can use the above commands or similar in a sample scenario.

You can also filter group names using wild card character "\*". WSO2 IS
now supports filters like:
`                     https://localhost:9443/wso2/scim/Groups?filter=displayName                    Eq *a*         `

---

## Using the SCIM API

This sample scenario is to add users and groups to a super tenant and a
normal tenant so that the users are unique to their domains.

For the super tenant:

-   **Create group AMRSNGHE/ngioletGR** - This will create a group
    in a given user store domain.

    ```java tab="Request"
    curl -k --user {IS_USERNAME}:{IS_PASSWORD} --data '{"displayName": "{USER_STORE_DOMAIN}/{GROUP_NAME}"}' --header "Content-Type:application/json" https://{IS_IP}:{IS_PORT}/wso2/scim/Groups
    ```

    ```java tab="Request Sample"
    curl -k --user admin:admin --data '{"displayName": "AMRSNGHE/ngioletGR"}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Groups
    ```

    ```java tab="Response"
    {"id":"8ee9253e-4fe1-4863-9641-80d807611707","schemas":["urn:scim:schemas:core:1.0"],"displayName":"AMRSNGHE/ngioletGR","meta":{"lastModified":"2015-04-30T10:18:33","created":"2015-04-30T10:18:33","location":"https://localhost:9443/wso2/scim/Groups/8ee9253e-4fe1-4863-9641-80d807611707"}}
    ```

-   **Create user AMRSNGHE/groupUSR001** - This will create a user in a given user store domain.

    ```java tab="Request"
    curl -k --user {IS_USERNAME}:{IS_PASSWORD} --data '{"schemas":[],"name":{"familyName": "{LAST_NAME}","givenName":"{FIRST_NAME"},"userName":"{USER_STORE_DOMAIN}/{USERNAME}","password":"{PASSWORD"}' --header "Content-Type:application/json" https://{IS_IP}:{IS_PORT}/wso2/scim/Users
    ```

    ```java tab="Sample Request"
    curl -k --user admin:admin --data '{"schemas":[],"name":{"familyName":"John","givenName":"Doe"},"userName":"AMRSNGHE/groupUSR001","password":"testPwd123"}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Users
    ```

    ```java tab="Response"
    {"id":"bbda8f2f-fea7-4a9c-9128-f1e0c3aad475","schemas":["urn:scim:schemas:core:1.0"],"name":{"familyName":"John","givenName":"Doe"},"userName":"AMRSNGHE/groupUSR001","meta":{"lastModified":"2015-04-30T10:19:05","location":"https://localhost:9443/wso2/scim/Users/bbda8f2f-fea7-4a9c-9128-f1e0c3aad475","created":"2015-04-30T10:19:05"}}
    ```

-   **Create user AMRSNGHE/groupUSR002**

    ```java tab="Request"
    curl -k --user admin:admin --data '{"schemas":[],"name":{"familyName":"John","givenName":"Doe"},"userName":"AMRSNGHE/groupUSR002","password":"testPwd123"}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Users
    ```

    ``` java tab="Response"
    {"id":"e04e20ca-6321-4c75-88b9-cfa5a600e356","schemas":["urn:scim:schemas:core:1.0"],"name":{"familyName":"John","givenName":"Doe"},"userName":"AMRSNGHE/groupUSR002","meta":{"lastModified":"2015-04-30T10:19:14","location":"https://localhost:9443/wso2/scim/Users/e04e20ca-6321-4c75-88b9-cfa5a600e356","created":"2015-04-30T10:19:14"}}
    ```

-   **Add user AMRSNGHE/groupUSR001 to group AMRSNGHE/ngioletGR -**
    This will add the user to the group.

    ``` java tab="Request"
    curl -k --user {IS_USERNAME}:{IS_PASSWORD} -X PATCH -d '{"displayName": "AMRSNGHE/ngioletGR","members": [{"value":"{id returned in the response when creating the AMRSNGHE/groupUSR001}","display": "AMRSNGHE/groupUSR001"}]}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Groups/{id returned in the response when creating the group AMRSNGHE/ngioletGR}
    ```

-   **Add user AMRSNGHE/groupUSR002 to group AMRSNGHE/ngioletGR**

    ``` java tab="Request"
    curl -k --user {IS_USERNAME}:{IS_PASSWORD} -X PATCH -d "{"displayName": "AMRSNGHE/ngioletGR","members": [{"value":"{id returned in the response when creating the AMRSNGHE/groupUSR002}","display": "AMRSNGHE/groupUSR002"}]}" --header "Content-Type:application/json" https://{IS_IP}:{IS_PORT}/wso2/scim/Groups/{id returned in the response when creating the group AMRSNGHE/ngioletGR}
    ```

-   **List the group members -** This will list all the members in
    the group.

    ``` java tab="Request"
    curl -k --user {IS_USERNAME}:{IS_PASSWORD}  https://{IS_IP}:{IS_PORT}/wso2/scim/Groups/{id returned in the response when creating the group AMRSNGHE/ngioletGR}
    ```

For a tenant amrsnghe.org:

-   **Create group AMRSNGHE/ngioletGR**

    ``` java tab="Sample Request"
    curl -k --user gayashan@amrsnghe.org:adming --data '{"displayName": "AMRSNGHE/ngioletGR"}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Groups
    ```

    ``` java tab="Response"
    {"id":"8ee9253e-4fe1-4863-9641-80d807611707","schemas":["urn:scim:schemas:core:1.0"],"displayName":"AMRSNGHE/ngioletGR","meta":{"lastModified":"2015-04-30T10:18:33","created":"2015-04-30T10:18:33","location":"https://localhost:9443/wso2/scim/Groups/8ee9253e-4fe1-4863-9641-80d807611707"}}
    ```

-   **Create user AMRSNGHE/groupUSR001**

    ``` java tab="Sample Request"
    curl -k --user gayashan@amrsnghe.org:adming --data '{"schemas":[],"name":{"familyName":"John","givenName":"Doe"},"userName":"AMRSNGHE/groupUSR001","password":"testPwd123"}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Users
    ```

    ``` java tab="Response"
    {"id":"bbda8f2f-fea7-4a9c-9128-f1e0c3aad475","schemas":["urn:scim:schemas:core:1.0"],"name":{"familyName":"John","givenName":"Doe"},"userName":"AMRSNGHE/groupUSR001","meta":{"lastModified":"2015-04-30T10:19:05","location":"https://localhost:9443/wso2/scim/Users/bbda8f2f-fea7-4a9c-9128-f1e0c3aad475","created":"2015-04-30T10:19:05"}}
    ```

-   **Create user AMRSNGHE/groupUSR002**

    ``` java tab="Request"
    curl -k --user gayashan@amrsnghe.org:adming --data '{"schemas":[],"name":{"familyName":"John","givenName":"Doe"},"userName":"AMRSNGHE/groupUSR002","password":"testPwd123"}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Users
    ```

    ``` java tab="Response"
    {"id":"e04e20ca-6321-4c75-88b9-cfa5a600e356","schemas":["urn:scim:schemas:core:1.0"],"name":{"familyName":"John","givenName":"Doe"},"userName":"AMRSNGHE/groupUSR002","meta":{"lastModified":"2015-04-30T10:19:14","location":"https://localhost:9443/wso2/scim/Users/e04e20ca-6321-4c75-88b9-cfa5a600e356","created":"2015-04-30T10:19:14"}}
    ```

-   **Add user AMRSNGHE/groupUSR001 to group AMRSNGHE/ngioletGR**

    ``` java
    curl -k --user gayashan@amrsnghe.org:adming -X PATCH -d '{"displayName": "AMRSNGHE/ngioletGR","members": [{"value":"<id returned in the response when creating the AMRSNGHE/groupUSR001>","display": "AMRSNGHE/groupUSR001"}]}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Groups/<id returned in the response when creating the group AMRSNGHE/ngioletGR>
    ```

-   **Add user AMRSNGHE/groupUSR002 to group AMRSNGHE/ngioletGR**

    ``` java
    curl -k --user gayashan@amrsnghe.org:adming -X PATCH -d '{"displayName": "AMRSNGHE/ngioletGR","members": [{"value":"<id returned in the response when creating the AMRSNGHE/groupUSR002>","display": "AMRSNGHE/groupUSR002"}]}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Groups/<id returned in the response when creating the group AMRSNGHE/ngioletGR>
    ```

-   **List the group members**

    ``` java
    curl -k --user gayashan@amrsnghe.org:adminghttps://localhost:9443/wso2/scim/Groups/<id returned in the response when creating the group AMRSNGHE/ngioletGR>
    ```

---

## SCIM bulk operations

The WSO2 Identity Server exposes SCIM endpoint **/Bulk** to do bulk operations using SCIM.

-   **Create Users:** This creates a bulk of users at the same time.

    ```java tab="Sample Request"
    curl -v -k --user admin:admin -H "Accept: application/json" -H "Content-type: application/json" -X POST -d "{\"failOnErrors\":2,\"schemas\":[\"urn:scim:schemas:core:1.0\"],\"Operations\":[{\"data\":{\"schemas\":[\"urn:scim:schemas:core:1.0\"],\"path\":\"/Users\",\"userName\":\"hasini\",\"method\":\"POST\",\"emails\":[{\"value\":\"hasini@gmail.com\"},{\"value\":\"hasinig@yahoo.com\"}],\"phoneNumbers\":[{\"value\":\"0772508354\"}],\"displayName\":\"Hasini\",\"externalId\":\"hasini@wso2.com\",\"password\":\"dummyPW1\",\"preferredLanguage\":\"Sinhala\",\"bulkId\":\"bulkIDUser1\"},\"path\":\"/Users\",\"method\":\"POST\",\"bulkId\":\"bulkIDUser1\"},{\"data\":{\"schemas\":[\"urn:scim:schemas:core:1.0\"],\"path\":\"/Users\",\"userName\":\"dinuka\",\"method\":\"POST\",\"emails\":[{\"value\":\"dinuka.malalanayake@gmail.com\"},{\"value\":\"dinuka_malalanayake@yahoo.com\"}],\"phoneNumbers\":[{\"value\":\"0772508354\"}],\"displayName\":\"Dinuka\",\"externalId\":\"dinukam@wso2.com\",\"password\":\"myPassword\",\"preferredLanguage\":\"Sinhala\",\"bulkId\":\"bulkIDUser2\"},\"path\":\"/Users\",\"method\":\"POST\",\"bulkId\":\"bulkIDUser2\"}]}" https://localhost:9443/wso2/scim/Bulk
    ```

    ```java tab="Sample Response"
    {"schemas":["urn:scim:schemas:core:1.0"],"Operations":[{"status":{"code":"201"},"location":"https://localhost:9443/wso2/scim/Users/bcbc6fed-6519-4eeb-a1ff-9b643fdab1b5","method":"POST","bulkId":"bulkIDUser1"},{"status":{"code":"201"},"location":"https://localhost:9443/wso2/scim/Users/ce6cf606-c4de-4260-bfdf-a751161eeae0","method":"POST","bulkId":"bulkIDUser2"}]}
    ```

-   **Create Groups** : This creates a bulk of groups at the same time.  

    ```java tab="Sample Request"
    curl -v -k --user admin:admin -H "Accept: application/json" -H "Content-type: application/json" -X POST -d "{\"failOnErrors\":2,\"schemas\":[\"urn:scim:schemas:core:1.0\"],\"Operations\":[{\"data\":{\"schemas\":[\"urn:scim:schemas:core:1.0\"],\"path\":\"/Groups\",\"method\":\"POST\",\"displayName\":\"engineer\",\"externalId\":\"engineer\",\"members\":[{\"value\":\"b1b03cf2-470f-4a73-b517-ae4faed8e61b\"},{\"value\":\"8e2c7178-e5bf-4013-b526-1193e0611d9a\"}],\"bulkId\":\"bulkGroup1\"},\"path\":\"/Groups\",\"method\":\"POST\",\"bulkId\":\"bulkGroup1\"},{\"data\":{\"schemas\":[\"urn:scim:schemas:core:1.0\"],\"path\":\"/Groups\",\"method\":\"POST\",\"displayName\":\"doctor\",\"externalId\":\"doctor\",\"members\":[{\"value\":\"8e2c7178-e5bf-4013-b526-1193e0611d9a\"},{\"value\":\"b1b03cf2-470f-4a73-b517-ae4faed8e61b\"}],\"bulkId\":\"bulkGroup2\"},\"path\":\"/Groups\",\"method\":\"POST\",\"bulkId\":\"bulkGroup2\"}]}" https://localhost:9443/wso2/scim/Bulk
    ```

    ```java tab="Response"
    {"schemas":["urn:scim:schemas:core:1.0"],"Operations":[{"status":{"code":"201"},"location":"https://localhost:9443/wso2/scim/Groups/6f008b6c-e990-4f67-9048-0fbcb3b52d5c","method":"POST","bulkId":"bulkGroup1"},{"status":{"code":"201"},"location":"https://localhost:9443/wso2/scim/Groups/1b7c44a8-26b8-4e81-9961-26d90fe68ac5","method":"POST","bulkId":"bulkGroup2"}]}
    ```