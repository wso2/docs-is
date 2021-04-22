1. 	Ensure that the identity listener with the
   `              priority=50             ` is set to **false** and
   the identity listener with the `              priority=95             ` is set to
   **true**  by adding the following configuration to the
   `              <IS_HOME>/repository/conf/deployment.toml             ` file.  

	!!! note
		If you haven't changed these configurations previously, you can skip this step since these are the default values. 

		``` xml
		[event.default_listener.identity_mgt]
		priority= "50"
		enable = false
		[event.default_listener.governance_identity_mgt]
		priority= "95"
		enable = true
		```


2.  <a name = "lockingaspecificuseraccount"></a>Start the Identity Server and log into the management console (`https://<IS_HOST>:<PORT>/carbon`) using
   your tenant credentials.
      
	!!! Tip
		Alternatively, you can also use the `IdentityGovernanceAdminService` SOAP service to do this instead of using the management console UI. See [Call Admin Services](../../../develop/apis/call-admin-services/) for more information on how to invoke this SOAP service. If you are using the SOAP service to configure this, you do not need to follow the steps given below this tip.

3.  Click **Main** > **Identity** > **Identity Providers** > **Resident**.
4.  Expand the **Login Attempts Security** tab.
5.  Expand the **Account Lock** tab and select the **Lock user accounts** checkbox. Click **Update** to save changes.  
	
	![login-policies](../../../assets/img/guides/login-policies.png) 

	!!! tip
		If a user is assigned the **Internal/system** role, the user can
		bypass account locking even if the user exceeds the specified number
		of **Maximum failed login attempts**.
   
		!!! note
			WSO2 Identity Server has the **Internal/ki8system** role configured by
			default. However, generally a new user is not assigned the
			**Internal/system** role by default. Required roles can be assigned
			to a user depending on the set of permission a user needs to have.
			For more information on roles and permission, see [Configuring Roles
			and
			Permissions](../../../guides/identity-lifecycles/manage-roles-overview/)

			Although the **Internal/system** role is configured by default in
			WSO2 Identity Server, you can delete the role if necessary. To allow
			users with the **Internal/system** role to bypass account locking,
			you need to ensure that the role exists in WSO2 Identity Server.
         
         
6.  To enable account locking for other tenants, log out and repeat the
   steps given above from [step 2](#lockingaspecificuseraccount)
   onwards.