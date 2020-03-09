# Configuring Account Disabling

WSO2 Identity Server enables the privileged users to disable user accounts for longer durations. These disabled user accounts can only be unlocked by privileged users. 

## Scenario

**Pickup** is a cab company that has many employees who use different credentials to sign in to different internal enterprise applications. **Robert** is an administrator at Pickup. **Larry** is an employee who had served Pickup for 7 years and he is entitled for sabbatical leave. As Larry is going on sabbatical leave for 2 years, Robert wants to disable Larry's account.  

Let's learn how Robert can disable Larry's user account! 

## Set up

Follow the steps below to configure account disabling in WSO2 Identity Server.

1.	Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory and check whether the following listener configs are in place.

	```toml
	[event.default_listener.identity_mgt]
	priority= "50"
	enable = false
	[event.default_listener.governance_identity_mgt]
	priority= "95"
	enable = true
	```

2.	[Restart WSO2 Identity Server](../../setup/running-the-product/).

3.	To configure the account locking requirements: 

	1.	On the **Main** menu of the Management Console, click **Identity > Identity Providers > Resident**.

		<img src="../../assets/img/learn/resident-menu-item.png" alt="Resident menu-item" width="200" style="border:1px solid grey">  

	2.	Under the **Login Policies** section, click **Account Disabling**.

		<img src="../../assets/img/learn/account-disabling-option.png" alt="Account Disabling Option" width="700" style="border:1px solid grey">  	

	3.	Select the **Enable Account Disabling** check box. 

		<img src="../../assets/img/learn/account-disabling-form.png" alt="Account Disabling form" width="600" style="border:1px solid grey">  	

	4.	Click **Update**. 

4.	To enable the account disabling claim:

	1.	On the **Main** menu of the Management Console, click **Identity > Claims > List**.

		<img src="../../assets/img/learn/claims-list-menu-item.png" alt="Claims List option" width="200" style="border:1px solid grey"> 	 		 		 

	2.	Click **http://wso2.org/claims**.

		<img src="../../assets/img/learn/claim-list-wso2.png" alt="WSO2 claim dialect" width="700" style="border:1px solid grey">  

	3.	Under **Account Disabled**, click **Edit**.

		<img src="../../assets/img/learn/account-disabled-edit.png" alt="Account Disabled claim edit option" width="700" style="border:1px solid grey">  

	4.	Select **Supported by Default**.

		<img src="../../assets/img/learn/account-disabled-claim-supported-by-default.png" alt="Account Disabled claim's Suppported by Default option" width="700" style="border:1px solid grey">  

	5. Click **Update**.

## Try out

1.	To create the user account for Larry:

	1.	On the **Main** menu of the Management Console, click **Identity > Users and Roles > Add**.

		<img src="../../assets/img/learn/add-users-and-roles-menu-item.png" alt="Add Users and Roles menu-item" width="200" style="border:1px solid grey">  

	2.	Click **Add New User**.

		<img src="../../assets/img/learn/add-new-user-option.png" alt="Add New User option" width="700" style="border:1px solid grey">  

	3.	Enter the required data as follows.

		<img src="../../assets/img/learn/add-new-user-screen.png" alt="Add New User screen" width="700" style="border:1px solid grey">   

		-	**Domain**: `Primary`
		-	**Username**: `Larry`

	4.	Click **Finish**. 

2.	To assign login permissions to the user:
	
	1.	Click the **View Roles** option of Larry.

		<img src="../../assets/img/learn/view-roles-option.png" alt="View Roles option" width="700" style="border:1px solid grey"> 	 		 		

	2.	Click **Permissions**.

		<img src="../../assets/img/learn/role-permissions-option.png" alt="Role Permissions option" width="700" style="border:1px solid grey"> 	 		 		

	3.	Select **Login** and click **Update**.

		<img src="../../assets/img/learn/login-permission.png" alt="Login permission" width="700" style="border:1px solid grey">  

3.	To disable Larry's user account:
	
	1.	Click **User Profile** option of Larry.

		<img src="../../assets/img/learn/user-profile-option.png" alt="User Profile option" width="700" style="border:1px solid grey">   

	2.	Enter an email address to which Larry's account disabling emails will be sent and select the **User Locked** check box.

		<img src="../../assets/img/learn/user-disabled.png" alt="User Disabled option" width="700" style="border:1px solid grey">    		

	3. 	Click **Update**. 

	4.	An email that informs about the disabled account is sent to the given email address.		

		<img src="../../assets/img/learn/account-disabled-email.png" alt="Account Disabled email" width="500" style="border:1px solid grey"> 

	5.	Access the WSO2 Identity Server User Portal at `https://localhost:9443/user-portal/`.

		<img src="../../assets/img/learn/userportal-login-screen.png" alt="Sign In form" width="400" style="border:1px
		 solid grey"> 	

	6.	Try logging in with Larry's credentials. Note that an error message appears.

4. To revoke the account disabling:

	1.	Click **User Profile** option of Larry.

	2.	Unselect the **User Disabled** check box.

	3.	Click **Update**.

	4.	An email that informs about the enabled account is sent to the given email address.

		<img src="../../assets/img/learn/account-enabled-email.png" alt="Account Enabled email" width="500" style="border:1px solid grey"> 		

	5.	Trying logging in to the WSO2 Identity Server User Portal with Larry's credentials. The WSO2 Identity Server
	 User Portal home screen appears.
