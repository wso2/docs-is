# Enable and Disable User Accounts

Account locking and account disabling are security features in WSO2 Identity Server (IS) that can be used to prevent users from logging in to their account and from authenticating themselves using their WSO2 IS account.

----

## Disable user accounts using the admin portal

### Configure WSO2 IS for account disabling

First, you need to configure WSO2 Identity Server for user account
locking and disabling. Follow the below steps to do this configuration.

1.  Start the Identity Server and log into the management console (`https://<IS_HOST>:<PORT>/carbon`) using
    your tenant credentials.
2.  <a name = "accountdisabling"></a> Click **Main** > **Identity** > **Identity Providers** > **Resident**.
3.  Expand the **Account Management** tab.
4.  Expand the **Account Disable** tab and select the **Enable account disabling** checkbox. Click **Update** to save changes.  
	![account-disabling](/assets/img/guides/account-disabling.png) 
    
    !!! tip "Disable the account disabling feature"
        To disable the account disabling option, unselect the **Enable
        Account Disabling** in each of the tenants that you wish to disable
        this option for.
    
        Alternatively, disable this feature for all tenants by adding the
        following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file.
        This will remove the account disabling option from all tenants.

        ``` toml 
        [identity_mgt.account_disabling]
        enable_account_disabling=false
        ```
5.  Next, enable account locking. Expand the **Login Attempts Security** tab.
6.  Expand the **Account Lock** tab and select the **Lock user accounts** checkbox. Click **Update** to save changes.  
    ![enable-locking](/assets/img/guides/enable-locking.png) 

    !!! tip
    
        If a user is assigned the **Internal/system** role, the user can
        bypass account locking even if the user exceeds the specified number
        of **Maximum failed login attempts**.
    
        ??? note "Click here to see more information"
    
            WSO2 Identity Server has the **Internal/system** role configured by
            default. But generally a new user is not assigned the
            **Internal/system** role by default. Required roles can be assigned
            to a user depending on the set of permission a user needs to have.
            For more information on roles and permission, see [Configure Roles
            and Permissions](../../../guides/identity-lifecycles/manage-roles-overview).
    
            Although the **Internal/system** role is configured by default in
            WSO2 Identity Server, you can delete the role if necessary. To allow
            users with the **Internal/system** role to bypass account locking,
            you need to ensure that the role exists in WSO2 Identity Server.
    
7.  To enable account locking and disabling for other tenants, log out
    and repeat the steps given above from [step
    2](#accountdisabling) onwards.


### Disable an account

Follow the steps below to disable a user account through the WSO2 IS
management console.

1.  Navigate to **Main** > **Identity** > **Claims** > **List** and click on `http://wso2.org/claims`.

2.  Edit the **Account Disabled** claim. See [Edit Claim
    Mapping](../../../guides/dialects/edit-claim-mapping/) for more information on how to do
    this.

3.  Tick the checkbox **Supported by Default** and click **Update.**  
    ![click-supported-by-default](/assets/img/guides/click-supported-by-default.png) 
4.  Navigate to **Main** > **Identity** > **Users and Roles** > **List** > **Users** and click on
    **User Profile** of the user account that you want to disable.
5.  Tick the **Account Disabled** checkbox and click **Update**.

!!! tip
    
    **Alternatively,** instead of using the management console, you can also
    enable/disable the user account using the
    `         setUserClaimValues        ` method in the
    `                   RemoteUserStoreManagerService                 `
    after you have configured WSO2 IS for account disabling. For more information on using admin services, refer [Call Admin Services](../../../develop/apis/call-admin-services)
    

### Send email notifications for account disabling

Once you have configured WSO2 Identity Server for account disabling, you
can also configure the WSO2 IS to send an email to the user's email
address when the user account is disabled. To configure this, follow the
steps below.  

{! fragments/configure-email-sending.md !}

    !!! info
        The email template used to send the email notification for
        account locking is the **AccountLock** template and the template
        used for account disabling is the **AccountDisable** template. You
        can edit and customize the email template. For more information on
        how to do this, see [Customize Automated Emails](../../../guides/tenants/customize-automated-mails)
.

---

## Disable user accounts using SCIM

1.	In order to update the status of a user account, we need to obtain the SCIM ID of that particular user. Therefore, we first call the GET users API to get the user details. The following curl command gives details of alk the users including the SCIM IDs. 

	``` curl tab="Request"
	curl -v -k --user <username>:<password> 'https://<HOST>:<PORT>/scim2/Users'
	```

	``` curl tab="Sample"
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

2.	After obtaining the SCIM ID of the user, invoke the following curl command with the `accountDisable` attribute set to `true` or `false` to disable or enable the user account respectively.

	```curl 
	curl -v -k --user admin:admin -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],"Operations":[{"op":"replace","value":{"EnterpriseUser":{"accountDisable":"true"}}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/<User-ID>
	```

After setting the disable status to `true` for a particular user, the server should reject any authentication attempts done by that account.

---

<!--## Disable user accounts using SOAP

!!! note 
    1.	To disable a user account using SOAP, the default event listener has to be enabled. Add the following property to the `<IS_HOME>/repository/conf/deployment.toml` file. 

		```toml
		[event.default_listener.identity_mgt]
		priority= 50
		enable= true
		```

    2.	Add the following property to he `<IS_HOME>/repository/conf/deployment.toml` file to enable this feature. 

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
<!--         <ser:userName>cameron</ser:userName>
         <!--Optional:-->
<!--        <ser:notificationType>?</ser:notificationType>
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
<!--         <ser:userName>cameron</ser:userName>
         <!--Optional:-->
<!-->         <ser:notificationType>?</ser:notificationType>
      </ser:disableUserAccount>
   </soapenv:Body>
</soapenv:Envelope>
```
-->

----

!!! info "Related Topics"
	- [Guide: Configure Email Notifications for Account Locking](../../../guides/tenants/email-account-locking/)

