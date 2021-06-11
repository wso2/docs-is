# Lock and Unlock User Accounts

Account locking and account disabling are security features in WSO2 Identity Server (IS) that can be used to prevent users from logging in to their account and from authenticating themselves using their WSO2 IS account. The account locking feature is used to **temporarily** block a user from logging in, for example, in instances where there have been many consecutive, unsuccessful login attempts.

---

## Configure the management console to enable account locking

If you have not already configured WSO2 identity Server (WSO2 IS) for
account locking, follow the instructions given below.

{! fragments/enable-account-locking.md !}
    
---

### Enable claims for account locking

1.  Navigate to **Main** > **Identity** > **Claims** > **List** and select the `http://wso2.org/claims` claim dialect.  
    For more information about claims, see [Configure Claims](../../../guides/dialects/configure-claims/).
2.  Select the **Account Locked** claim and click **Edit**.  
    ![account-locked-claim](../../../assets/img/guides/account-locked-claim.png) 
3.  Select the **Supported by Default** check box and click **Update**
.  
    This is done to make the "Account Locked" status appear in the
    user's profile.  
    ![locked-status](../../../assets/img/guides/locked-status.png) 

---

## Lock user accounts using the management console

1.  Navigate to **Main** > **Identity** > **Users and Roles** > **List** > **Users** and click on **User Profile** of the user you want to lock.
2.  If it is the first time this particular account is being locked, a
    text box will appear in front of the **Account Locked** field as
    seen below.  
    To lock the account, type true in the text box and click **Update**
.  
    ![admin-lock-account](../../../assets/img/guides/admin-lock-account.png)

!!! note
    If it is not the first time you are locking this user account, there
    will be a check box instead of the text box (as shown above) in front of
    the **Account Locked** field. Select the check box to lock the account
    or deselect it to unlock the account and click **Update**.

---

## Lock user accounts using SCIM

1. In order to update the lock status of a user account, we need to obtain the SCIM ID of that particular user. Therefore, we first call the GET users API to get the user details.

    !!! abstract ""
        **Request**
        ```
        curl -v -k --user <username>:<password> 'https://<HOST>:<PORT>/scim2/Users'
        ```
        ---
        **Sample**
        ```
        curl -v -k --user admin:admin 'https://localhost:9443/scim2/Users'
        ```

	Alternatively, you can also obtain it from the management console. 

	1.	Navigate to **Main** > **Identity** > **Claims** > **List**. 

	2.	Select `http://wso2.org/claims`. 

	3.	Edit **User ID**. 

	4.	Select **Supported by Default**. 

	5.	Click **Update**. 

	6.	Navigate to **Main** > **Identity** > **Users and Roles** > **List** and select **Users**. 

	7.	Click **User Profile** adjecent to the user that needs to be enabled or disabled. The **User ID** value will be mentioned by default now. 

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


!!! info "Related topics"
	[Guides: Configure Email Notifications for Account Locking](../../../guides/tenants/email-account-locking)
    <!--- [Concept: Account Locking](TODO:link-to-concept)-->
    <!-- [Guide: Configure Email Notifications](TODO:link-to-guide)-->