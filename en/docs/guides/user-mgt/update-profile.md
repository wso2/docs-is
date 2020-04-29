# View and Update User Profiles

## View and update a user using the admin portal

{insert-fragment}

---

## View and update a user using SCIM
You can update a user profile using a SCIM request as shown below. 

**Request**

```curl
curl -v -k --user [username]:[password] -X PATCH -d '{"schemas":[],"Operations":[{"op":[operation],"value":{[attributeName]:[attribute value]}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/[user ID]
```

Below is a sample request and its corresponding response using SCIM 2.0. 

```tab="Sample Request"
curl -v -k --user admin:admin -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],"Operations":[{"op":"add","value":{"nickName":"shaggy"}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd
```

```tab="Sample Response"
{"emails":[{"type":"work","value":"kim_j@wso2.com"},{"type":"home","value":"kim.jack@gmail.com"}],"meta":{"created":"2018-08-15T14:55:23Z","location":"https://localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd","lastModified":"2018-08-16T14:46:07Z","resourceType":"User"},"nickName":"shaggy","schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"roles":[{"type":"default","value":"Internal/everyone"}],"name":{"givenName":"kim","familyName":"jackson"},"id":"c8c821ba-1200-495e-a775-79b260e717bd","userName":"kim"}
```

---

## View and update a user using SOAP

The users can update their claims by calling the
`          RemoteUserStoreManager         ` service. If you are new to
admin services, see [Calling Admin Services](insert-calling admin services).

1.  Enable the hidden admin service property in the
    `            <IS_HOME>/repository/conf/deployment.toml          `
    file.  
    By default, the admin services are disabled as it is not recommended
    to expose these URLs to users. However, it can be enabled if it
    needs to be accessed by the administrators.

    ``` toml
    [admin_service.wsdl]
    enable = true
    ```

2.  Open the following Admin Service from [SOAP UI](https://www.soapui.org/downloads/latest-release.html):
    [https://localhost:9443/services/RemoteUserStoreManagerService?wsdl  
    ](https://localhost:9443/services/RemoteUserStoreManagerService?wsdl)

    !!! info 
         If you have configured WSO2 IS to use an IP or hostname, replace
         `             localhost            ` with your IP or hostname.

3.  There are a few SOAP service methods that can be used to update user
    details by calling the above admin service.

    1.  `              updateCredential()             ` : This is the
        method used to update user's password.

        **Request: Sample**

        ``` java
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org">
            <soapenv:Header/>
            <soapenv:Body>
                <ser:updateCredential>
                    <!--Optional:-->
                    <ser:userName>user123</ser:userName>
                    <!--Optional:-->
                    <ser:newCredential>password123</ser:newCredential>
                    <!--Optional:-->
                    <ser:oldCredential>password</ser:oldCredential>
                </ser:updateCredential>
            </soapenv:Body>
        </soapenv:Envelope>
        ```

    2.  `              updateUserListOfRole()             ` : This is
        the method used to update user's roles.

        **Request: Sample**

        ``` java
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org">
            <soapenv:Header/>
            <soapenv:Body>
                <ser:updateUserListOfRole>
                    <!--Optional:-->
                    <ser:roleName>admin123</ser:roleName>
                    <!--Zero or more repetitions:-->
                    <ser:deletedUsers>sampleUser</ser:deletedUsers>
                    <!--Zero or more repetitions:-->
                    <ser:newUsers>user123</ser:newUsers>
                </ser:updateUserListOfRole>
            </soapenv:Body>
        </soapenv:Envelope>
        ```
