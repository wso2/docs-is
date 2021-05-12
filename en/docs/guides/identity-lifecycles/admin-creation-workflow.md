# Add a user

## Add a user using the management console

{! fragments/add-new-user.md !}

3. In the **Domain** list, select the user store in which you want to create this user account (e.g., `Primary`). This list includes the user stores you have configured. 

4. Enter a unique username and password. These are the credentials that the user will use to log in. 

    !!! note
        Note that by default, the password must be atleast 5 characters.

    ![enter-user-details](/assets/img/guides/enter-user-details.png)

5. Click **Finish** or you can click **Next** to assign the user to a specific role. For more information about assigning a role, see the next section. 


---

## Add a user using SCIM
You can create a new user using a SCIM request as shown below. 

**Request**

```curl
curl -v -k --user [username]:[password] --data '{"schemas":[],"name":{"familyName":[last name],"givenName":[name]},"userName":[username],"password":[password],"emails":[{"primary":[true/false],"value":[email address],"type":[home/work]},{"value":[email address 2],"type":[home/work]}]}--header "Content-Type:application/json" https://localhost:9443/scim2/Users
```

Below is a sample request to create a user and its corresponding response using SCIM 2.0. 

```tab="Sample Request"
curl -v -k --user admin:admin --data '{"schemas":[],"name":{"familyName":"jackson","givenName":"kim"},"userName":"kim","password":"kimwso2","emails":[{"primary":true,"value":"kim.jackson@gmail.com","type":"home"},{"value":"kim_j@wso2.com","type":"work"}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users
```

```tab="Sample Response"
{"emails":[{"type":"home","value":"kim.jackson@gmail.com","primary":true},{"type":"work","value":"kim_j@wso2.com"}],"meta":{"created":"2018-08-15T14:55:23Z","location":"https://localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd","lastModified":"2018-08-15T14:55:23Z","resourceType":"User"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"name":{"familyName":"jackson","givenName":"kim"},"id":"c8c821ba-1200-495e-a775-79b260e717bd","userName":"kim"}
```

---

## Add a user using SOAP

The user can also be created by calling the
`          RemoteUserStoreManager         ` service. If you are new to
admin services, see [Calling Admin Services](../../../develop/apis/call-admin-services).

1. Enable the hidden admin service property. 
    By default, admin services WSDLs are not exposed in a product. We need to add the following configuration in  `            <IS_HOME>/repository/conf/deployment.toml           ` to access the WSDLs.
     
    ```toml
    [admin_service.wsdl]
    enable = true
    ```

2. Open the following Admin Service from [SOAP UI](https://www.soapui.org/downloads/latest-release.html):
    `https://localhost:9443/services/RemoteUserStoreManagerService?wsdl ` 

    !!! info 
         If you have configured WSO2 IS to use an IP or hostname, replace
         `             localhost            ` with your IP or hostname.

3. Call the `            addUser()           ` method to create the
    user and make sure to give the email address of the user. Following is a sample SOAP request.

      **SOAP Request**

      ```xml
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org" xmlns:xsd="http://common.mgt.user.carbon.wso2.org/xsd">
         <soapenv:Header/>
         <soapenv:Body>
            <ser:addUser>

               <ser:userName>username</ser:userName>

               <!--Zero or more repetitions:-->
               <ser:roleList>admin</ser:roleList>

               <!--Zero or more repetitions:-->
               <ser:claims>
                  <xsd:claimURI>http://wso2.org/claims/emailaddress</xsd:claimURI>
                  <xsd:value>wso2demomail@gmail.com</xsd:value>
               </ser:claims>

               <ser:profileName>default</ser:profileName>

               <ser:requirePasswordChange>true</ser:requirePasswordChange>
            </ser:addUser>
         </soapenv:Body>
      </soapenv:Envelope>
      ```

!!! Note
    There will be no SOAP response as this is a one-way SOAP operation. You can validate that the user creation is successful using the admin portal by clicking on <admin-portal-user-list-path> section.
    
!!! info "Related Topics"
    - [Guide: Invitation Workflow](../../../guides/identity-lifecycles/invitation-workflow) 
    - [Guide: User Self Registration Workflow](../../../guides/identity-lifecycles/self-registration-workflow)
    - [Guide: Just in Time User Provisioning Workflow](../../../guides/identity-lifecycles/jit-workflow/)
    - [Guide: Bulk Import Users](../../../guides/identity-lifecycles/import-users)
    - [Guide: Outbound Provisioning](../../../guides/identity-lifecycles/outbound-provisioning)
    - [Concept: Users](../../../references/concepts/user-management/users)
    <!--- [Guide: Email Templates](TODO:dev-portal-link)--->