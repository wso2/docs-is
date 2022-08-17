# Enable and Disable User Accounts

Account locking and account disabling are security features in WSO2 Identity Server (IS) that can be used to prevent users from logging in to their account and from authenticating themselves using their WSO2 IS account.

----

## Enable account disabling

Follow the below steps to do this configuration.

1.  Start the Identity Server and log into the management console (`https://<IS_HOST>:<PORT>/carbon`) using
    your tenant credentials.
2.  <a name = "accountdisabling"></a> Click **Main** > **Identity** > **Identity Providers** > **Resident**.
3.  Expand the **Account Management** tab.
4.  Expand the **Account Disable** tab and select the **Enable account disabling** checkbox. Click **Update** to save changes.  
	![account-disabling]({{base_path}}/assets/img/guides/account-disabling.png) 
    
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

## Enable claims

Follow the steps below to disable a user account through the WSO2 IS
management console.

1.  Navigate to **Main** > **Identity** > **Claims** > **List** and click on `http://wso2.org/claims`.

2.  Edit the **Account Disabled** claim. See [Edit Claim
    Mapping]({{base_path}}/guides/dialects/edit-claim-mapping/) for more information on how to do
    this.

3.  Tick the checkbox **Supported by Default** and click **Update**.

    ![click-supported-by-default]({{base_path}}/assets/img/guides/click-supported-by-default.png)

4.  Navigate to **Main** > **Identity** > **Users and Roles** > **List** > **Users** and click on **User Profile** of the user account that you want to disable.

5.  Tick the **Account Disabled** checkbox and click **Update**.  

## Configure the email sender

[Enable the email sending configurations]({{base_path}}/deploy/configure-email-sending) of the WSO2 Identity Server.

!!! info
    The email template used to send the email notification for
    account locking is the **AccountLock** template and the template
    used for account disabling is the **AccountDisable** template. You
    can edit and customize the email template. For more information on
    how to do this, see [Customize Automated Emails]({{base_path}}/guides/tenants/customize-automated-mails).

---

## Try it out

### Use the Management Console

### Use the SCIM2 Rest API

1.	In order to update the status of a user account, we need to obtain the SCIM ID of that particular user. Therefore, we first call the GET users API to get the user details. The following curl command gives details of alk the users including the SCIM IDs. 

    !!! abstract ""
        **Request**
        ```
        curl -v -k --user <username>:<password> 'https://<HOST>:<PORT>/scim2/Users'
        ```
        ---
        **Sample**
        ```curl
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


!!! info "Related topics"
	- [Guide: Configure Email Notifications for Account Locking]({{base_path}}/guides/tenants/email-account-locking/)

