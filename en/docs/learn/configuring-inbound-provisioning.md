# Configuring Inbound Provisioning 

Provisioning is the process of creating, maintaining, and deleting digital identities (accounts) for users of a system(s) and linking appropriate rights to identities in the form of rules and roles. 

Inbound provisioning provisions users or groups into WSO2 Identity Server by an external application. These external applications are referred to as service providers. WSO2 Identity Server supports the SCIM API and SOAP-based Web service API standards for inbound provisioning.
This tutorial guides you to perform inbound provisioning using SCIM2.

## Scenario

Pickup is a cab company with many employees. So far they have been maintaining employee details in an external application but Pickup now wishes to use WSO2 Identity Server for user management so that they can easily configure account management policies such as password recovery.

Pickup can provision the users from the external application to WSO2 Identity Server using SCIM2. 

## Try it out

1. [Download WSO2 Identity Server](https://wso2.com/identity-and-access-management/)
2. Navigate to `<IS_HOME>/bin` and start the server by executing one of the following commands.

    ``` java tab="Linux/MacOS"
    sh wso2server.sh
    ```

    ``` java tab="Windows"
    wso2server.bat run
    ```

3. Run the following curl command on a terminal window to provision a user. 

    ```java tab="Request"
    curl -v -k --user admin:admin --data '{"schemas":[],"name":{"familyName":"jackson","givenName":"kim"},"userName":"kim","password":"kimwso2","emails":[{"primary":true,"value":"kim.jackson@gmail.com","type":"home"},{"value":"kim_j@wso2.com","type":"work"}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users
    ```
    
    ```java tab="Response"
    {"emails":[{"type":"home","value":"kim.jackson@gmail.com","primary":true},{"type":"work","value":"kim_j@wso2.com"}],"meta":{"created":"2018-08-15T14:55:23Z","location":"https://localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd","lastModified":"2018-08-15T14:55:23Z","resourceType":"User"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"name":{"familyName":"jackson","givenName":"kim"},"id":"c8c821ba-1200-495e-a775-79b260e717bd","userName":"kim"}
    ```

4. View provisioned users using the user ID. Obtain the user ID from the response shown above. 

    ```
    curl -v -k --user admin:admin 'https://localhost:9443/scim2/Users/<user-id>'
    ```

5. Update a provisioned user's profile details. The updated profile details are now returned with the response. 

    ```java tab="Request"
    curl -v -k --user admin:admin -X PUT -d '{"schemas":[],"name":{"familyName":"jackson","givenName":"kim"},"userName":"kim","emails":[{"value":"kim_j@wso2.com","type":"work"},{"value":"kim.jack@gmail.com","type":"home"}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd 
    ```
    
    ```java tab="Response"
    {"emails":[{"type":"work","value":"kim_j@wso2.com"},{"type":"home","value":"kim.jack@gmail.com"}],"meta":{"created":"2018-08-15T14:55:23Z","location":"https://localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd","lastModified":"2018-08-16T14:24:00Z","resourceType":"User"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"roles":[{"type":"default","value":"Internal/everyone"}],"name":{"givenName":"kim","familyName":"jackson"},"id":"c8c821ba-1200-495e-a775-79b260e717bd","userName":"kim"} 
    ```
    
4. Delete a provisioned user using the user's corresponding user ID. 

    ```java
    curl -v -k --user admin:admin -X DELETE https://localhost:9443/scim2/Users/<user-id> -H "Accept: application/scim+json"
    ```
