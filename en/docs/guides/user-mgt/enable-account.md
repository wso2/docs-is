# Enable and Disable User Accounts

Account locking and account disabling are security features in WSO2 Identity Server (IS) that can be used to prevent users from logging in to their account and from authenticating themselves using their WSO2 IS account.

## Disable user accounts using the admin portal

{insert-fragment}

---

## Disable user accounts using SCIM

1. Open the `<IS-HOME>/repository/conf/scim2-schema-extension.config` file and add the following configuration. 

   ```
   {
      "attributeURI":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:accountDisable",
      "attributeName":"accountDisable",
      "dataType":"boolean",
      "multiValued":"false",
      "description":"Disable user account.",
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

2. Add the `accountDisable` attribute as a sub-attribute of User.

   ```
   "subAttributes":"verifyEmail askPassword accountDisable employeeNumber costCenter organization division department manager"
   ```

3. Save the file and restart the server. 

Before enabling/disabling users using SCIM, you need to do the following. 

1. [Add claim mapping](insert-link)

2. [Enable account disabling](insert-link)

### Test it Out 

1. In order to update the status of a user account, we need to obtain the SCIM ID of that particular user. Therefore, we first call the GET users API to get the user details.

   **Request**

   ``` curl 
   curl -v -k --user admin:admin 'https://localhost:9443/scim2/Users'
   ```
   **Sample**

   ```curl
   curl -v -k --user admin:admin 'https://localhost:9443/scim2/Users?filter=userName+Eq+cameron'
   ```

2. After obtaining the SCIM ID of the user, invoke the following curl command with the `accountDisable` attribute set to `true` or `false` to disable or enable the user account respectively.

   ```curl 
   curl -v -k --user admin:admin -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],"Operations":[{"op":"replace","value":{"EnterpriseUser":{"accountDisable":"true"}}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/<User-ID>
   ```

After setting the disable status to `true` for a particular user, the server should reject any authentication attempts done by that account.

---

## Disable user accounts using SOAP

!!! note 
    1. To disable a user account using SOAP, the default event listener has to be enabled. Add the following property to the `<IS_HOME>/repository/conf/deployment.toml` file. 

        ```toml
        [event.default_listener.identity_mgt]
        priority= 50
        enable= true
        ```

    2. Add the following property to he `<IS_HOME>/repository/conf/deployment.toml` file to enable this feature. 

       ```toml
       [identity_mgt.account_disabling]
       enable_account_disabling=true
       ```

An administrative user (with the permission level, `/permission/admin/configure/security/usermgt/users` ) can disabled a user account using the `RemoteUserStoreManagerService`. You can use the `setUserClaimValues` operation to achieve this. The following request is a sample SOAP request that can be sent to the `RemoteUserStoreManagerService` to disable a user account.

```curl 
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:disableUserAccount>
         <!--Optional:-->
         <ser:userName>cameron</ser:userName>
         <!--Optional:-->
         <ser:notificationType>?</ser:notificationType>
      </ser:disableUserAccount>
   </soapenv:Body>
</soapenv:Envelope>
```

## Enable user accounts using SOAP

Similarly, you can use the `setUserClaimValues` operation, `RemoteUserStoreManagerService` AdminService to enable a diabled user account. The following request is a sample SOAP request that can be sent to the `RemoteUserStoreManagerService` to enable a user account.

```curl
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:enableUserAccount>
         <!--Optional:-->
         <ser:userName>cameron</ser:userName>
         <!--Optional:-->
         <ser:notificationType>?</ser:notificationType>
      </ser:disableUserAccount>
   </soapenv:Body>
</soapenv:Envelope>
```

!!! info 
    To configure email notifications for account disabling, see [here](admin-portal-section)