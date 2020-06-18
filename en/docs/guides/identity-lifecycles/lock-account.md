# Lock and Unlock User Accounts

Account locking and account disabling are security features in WSO2 Identity Server (IS) that can be used to prevent users from logging in to their account and from authenticating themselves using their WSO2 IS account. The account locking feature is used to **temporarily** block a user from logging in, for example, in instances where there have been many consecutive, unsuccessful login attempts.

## Lock user accounts using the admin portal

{insert-fragment}

---

## Lock user accounts using SCIM

1. Open the `<IS-HOME>/repository/conf/scim2-schema-extension.config` file and add the following configuration. 

   ```
   {
      "attributeURI":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:accountLock",
      "attributeName":"accountLock",
      "dataType":"boolean",
      "multiValued":"false",
      "description":"Lock user account.",
      "required":"false",
      "caseExact":"false",
      "mutability":"readwrite",
      "returned":"default",
      "uniqueness":"none",
      "subAttributes":"null",
      "canonicalValues":[],
      "referenceTypes":[]
   }
   ```

2. Then add the `accountLock` attribute as a sub-attribute of User.

   ```
   "subAttributes":"verifyEmail askPassword accountLock employeeNumber costCenter organization division department manager"
   ```

3. Save the file and restart the server. 

Before locking/unlocking users using SCIM, you need to do the following. 

1. [Add claim mapping](insert-link)

2. [Enable account locking](insert-link)

### Test it Out 

1. In order to update the lock status of a user account, we need to obtain the SCIM ID of that particular user. Therefore, we first call the GET users API to get the user details.

   **Request**

   ``` curl 
   curl -v -k --user admin:admin 'https://localhost:9443/scim2/Users'
   ```
   **Sample**

   ```curl
   curl -v -k --user admin:admin 'https://localhost:9443/scim2/Users?filter=userName+Eq+cameron'
   ```

2. After obtaining the SCIM ID of the user, invoke below curl command with the `accountLock` attribute set to `true` or `false` to lock or unlock the user account respectively.

   ```curl 
   curl -v -k --user admin:admin -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],"Operations":[{"op":"replace","value":{"EnterpriseUser":{"accountLock":"true"}}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/<SCIM-ID>
   ```

After setting the lock status to `true` for a particular user, the server should reject any authentication attempts done by that account.

---

## Lock user accounts using SOAP

An administrative user (with the permission level /permission/admin/configure/security/usermgt/users ) can lock a user account using the `RemoteUserStoreManagerService`. You can use the `setUserClaimValues` operation to achieve this. The following request is a sample SOAP request that can be sent to the `RemoteUserStoreManagerService` to lock a user account.

```curl 
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org" xmlns:xsd="http://common.mgt.user.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:setUserClaimValues>
         <!--Optional:-->
         <ser:userName>test</ser:userName>
         <!--Zero or more repetitions:-->
         <ser:claims>
            <!--Optional:-->
            <xsd:claimURI>http://wso2.org/claims/identity/accountLocked</xsd:claimURI>
            <!--Optional:-->
            <xsd:value>true</xsd:value>
         </ser:claims>
         <!--Optional:-->
         <ser:profileName>default</ser:profileName>
      </ser:setUserClaimValues>
   </soapenv:Body>
</soapenv:Envelope>
```

## Unlock user accounts using SOAP

Similarly, you can use the `setUserClaimValues` operation, `RemoteUserStoreManagerService` AdminService to unlock a locked user account. The following request is a sample SOAP request that can be sent to the `RemoteUserStoreManagerService` to unlock a user account.

```curl
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org" xmlns:xsd="http://common.mgt.user.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:setUserClaimValues>
         <!--Optional:-->
         <ser:userName>test</ser:userName>
         <!--Zero or more repetitions:-->
         <ser:claims>
            <!--Optional:-->
            <xsd:claimURI>http://wso2.org/claims/identity/accountLocked</xsd:claimURI>
            <!--Optional:-->
            <xsd:value>false</xsd:value>
         </ser:claims>
         <!--Optional:-->
         <ser:profileName>default</ser:profileName>
      </ser:setUserClaimValues>
   </soapenv:Body>
</soapenv:Envelope>
```

!!! info 
    To configure email notifications for account locking, see [here](admin-portal-section)