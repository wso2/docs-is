# Add a user role

This section will guide you through the ways of adding a user role to WSO2 Identity Server.

## Add a user role using the admin portal

TODO: dev-portal-fragment

---

## Add a user role using SCIM

In SCIM, creating a role is the same as creating a **group.** For more information, see
    [SCIM](TODO:insert-link-to-concept).

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

---

## Add a user role using SOAP

A role can be created by calling the service
`         RemoteUserStoreManager        ` . If you are new to admin
services, see [Calling Admin Services.](insert-calling admin services)

1.  Disable the hidden admin service property in the `           <IS_HOME>/repository/conf/deployment.toml          ` file.  
    By default, the admin services are disabled as it is not recommended
    to expose these URLs to users. However, this can be enabled by the
    administrators if it needs to be accessed.

    ``` toml
    [admin_service.wsdl]
    enable = true
    ```

2.  Open the following Admin Service from
    [SOAP UI](https://www.soapui.org/downloads/latest-release.html):
    [https://localhost:9443/services/RemoteUserStoreManagerService?wsdl  
                                            ](https://localhost:9443/services/RemoteUserStoreManagerService?wsdl)

    !!! info 
        If you have configured WSO2 IS to use an IP or hostname, replace
        `            localhost           ` with your IP or hostname.

3.  Call the method **`            addRole()           `** to create a
    role.

    **SOAP Request**

    ``` xml
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org" xmlns:xsd="http://dao.service.ws.um.carbon.wso2.org/xsd">
        <soapenv:Header/>
        <soapenv:Body>
            <ser:addRole>
                <!--Optional:-->
                <ser:roleName>engineer</ser:roleName>
                <!--Zero or more repetitions:-->
                <ser:userList>Mark</ser:userList>
                <!--Zero or more repetitions:-->
            </ser:addRole>
        </soapenv:Body>
    </soapenv:Envelope>
    ```

!!! info "Related Topics"
    - [Concept: User Roles](TODO:insert-link-to-concept)
    - [Guide: Edit/Delete Roles](../../identity-lifecycles/edit-delete-roles)
    - [Guide: Role Based Permissions](../../identity-lifecycles/edit-delete-roles)




