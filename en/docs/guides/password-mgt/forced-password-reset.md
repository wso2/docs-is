# Forced Password Reset 

## Password reset using the user portal 

{!TODO:insert-fragment!}

---

## Password reset using SCIM

1. Log in to the Management Console.
2. Add a new external claim in **Main** -> **Claims** -> **Add** -> **Add External Claim**, using the following values. 
    
	| Field              | Value                                                                       |
    |--------------------|-----------------------------------------------------------------------------|
    | Dialect URI*       |urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:forcePasswordReset|
    |External Claim URI* |forcePasswordReset                                                           | 
    |Mapped Local Claim* |http://wso2.org/claims/identity/adminForcedPasswordReset                     |
    
3. Use following SCIM 2.0 request to trigger a password reset
    
    You need to set the **forcePasswordReset** attribute under the`urn:ietf:params:scim:schemas:extension:enterprise:2.0:User` schema to `true` in the SCIM2 user create request. 
    
    ```java
    POST https://<host>:<port>/scim2/Users/<users-scim-id>

        {"schemas": 
        ["urn:ietf:params:scim:api:messages:2.0:PatchOp","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],
         "Operations": [
            {"op": "add",
            "value": {"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {"forcePasswordReset": true}
        }}]
        }
    ```
    
    A sample curl commands is given below.
    
        ``` java 
        curl -v -k --user admin:admin -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"], "Operations": [ {"op": "add","value": {"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {"forcePasswordReset": true}}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/c02857fd-2a51-427f-bf25-a9f76b85659d
        ```
---

## Password reset sing SOAP-based admin services

1.  Discover the `UserProfileMgtService` admin service. For information on how to do this, see [Calling Admin Services](insert-link).
2.  Create a new [SOAP-UI](https://www.soapui.org/) project by importing the WSDL:
    <https://localhost:9443/services/UserProfileMgtService?wsdl>.

3.  Use the `             setUserProfile            ` method to send
    a SOAP request to update the
    `                           http://wso2.org/claims/identity/adminForcedPasswordReset                         `
    claim of the project.

    **Sample SOAP Request**

    ``` xml
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mgt="http://mgt.profile.user.identity.carbon.wso2.org" xmlns:xsd="http://mgt.profile.user.identity.carbon.wso2.org/xsd">
        <soapenv:Header/>
        <soapenv:Body>
            <mgt:setUserProfile>
                <mgt:username>tom</mgt:username>
                <mgt:profile>
                    <xsd:fieldValues>
                        <xsd:claimUri>http://wso2.org/claims/identity/adminForcedPasswordReset</xsd:claimUri>
                        <xsd:fieldValue>true</xsd:fieldValue>
                    </xsd:fieldValues>
                    <xsd:profileName>default</xsd:profileName>
                </mgt:profile>
            </mgt:setUserProfile>
        </soapenv:Body>
    </soapenv:Envelope>
    ```
    
    !!! Info 
        For a user in a secondary user store, you should send
        the username in the format of `<user-store-domain>/<user-name>`
        in the above SOAP request.
    
4.  Add a new basic authorization from the SOAP-UI request
    window and enter valid credentials to authenticate with the
    identity server.  
    ![add-basic-authorization](TODO:insert-link)
    
    !!! Info 
        To try the scenario for a tenant user, provide the
        credentials of a tenant administer in the authentication step.
            
!!! info 
    In order to force a user to change the password after a specific time
    period, refer [Configuring Password Policy Authenticator](TODO:insert-link).


!!! info "Related Links"
    See [Configuring Claims](TODO:insert-link) for more
    information on how to store the claim values in the user store.
