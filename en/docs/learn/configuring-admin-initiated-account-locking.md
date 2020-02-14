# Configuring Admin-Initiated Account Locking

WSO2 Identity Server enables the privileged users to temporarily lock suspicious user accounts and prevent the users from logging in. These locked user accounts can only be unlocked by privileged users. 

## Scenario

**Pickup** is a cab company that has many employees who use different credentials to sign in to different internal enterprise applications. While **Robert** is an administrator at Pickup, **Larry** is a new recruit. Due to suspicious user activity, Robert wants to lock Larry's account.  

Let's learn how Robert can lock Larry's user account! 

## Set up

Follow the steps below to configure admin-initiated account locking in WSO2 Identity Server.

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

		<img src="../assets/img/learn/resident-menu-item.png" alt="Resident menu-item" width="200" style="border:1px solid grey">  

	2.	Under the **Login Policies** section, click **Account Locking**.

		<img src="../assets/img/learn/account-locking-option.png" alt="Account Locking Option" width="700" style="border:1px solid grey">  	

	3.	Select the **Account Lock Enabled** check box. 

		<img src="../assets/img/learn/account-locking-form-admin-initiated.png" alt="Account Locking form" width="600" style="border:1px solid grey">  	

	4.	Click **Update**. 

4.	To enable the account locking claim:

	1.	On the **Main** menu of the Management Console, click **Identity > Claims > List**.

		<img src="../assets/img/learn/claims-list-menu-item.png" alt="Claims List option" width="200" style="border:1px solid grey"> 	 		 		 

	2.	Click **http://wso2.org/claims**.

		<img src="../assets/img/learn/claim-list-wso2.png" alt="WSO2 claim dialect" width="700" style="border:1px solid grey">  

	3.	Under **Account Locked**, click **Edit**.

		<img src="../assets/img/learn/account-lock-claim-edit.png" alt="Account Locked claim edit option" width="700" style="border:1px solid grey">  

	4.	Select **Supported by Default**.

		<img src="../assets/img/learn/account-locked-claim-supported-by-default.png" alt="Account Locked claim's Suppported by Default option" width="700" style="border:1px solid grey">  

	5. Click **Update**.

## Try out

1.	To create the user account for Larry:

	1.	On the **Main** menu of the Management Console, click **Identity > Users and Roles > Add**.

		<img src="../assets/img/learn/add-users-and-roles-menu-item.png" alt="Add Users and Roles menu-item" width="200" style="border:1px solid grey">  

	2.	Click **Add New User**.

		<img src="../assets/img/learn/add-new-user-option.png" alt="Add New User option" width="700" style="border:1px solid grey">  

	3.	Enter the required data as follows.

		<img src="../assets/img/learn/add-new-user-screen.png" alt="Add New User screen" width="700" style="border:1px solid grey">   

		-	**Domain**: `Primary`
		-	**Username**: `Larry`

	4.	Click **Finish**. 

2.	To assign login permissions to the user:
	
	1.	Click the **View Roles** option of Larry.

		<img src="../assets/img/learn/view-roles-option.png" alt="View Roles option" width="700" style="border:1px solid grey"> 	 		 		

	2.	Click **Permissions**.

		<img src="../assets/img/learn/role-permissions-option.png" alt="Role Permissions option" width="700" style="border:1px solid grey"> 	 		 		

	3.	Select **Login** and click **Update**.

		<img src="../assets/img/learn/login-permission.png" alt="Login permission" width="700" style="border:1px solid grey">  

3.	To lock Larry's user account:
	
	1.	Click **User Profile** option of Larry.

		<img src="../assets/img/learn/user-profile-option.png" alt="User Profile option" width="700" style="border:1px solid grey">   

	2.	Enter an email address to which Larry's account locking emails will be sent and select the **User Locked** check box.

		<img src="../assets/img/learn/user-locked.png" alt="User Email option" width="700" style="border:1px solid grey">    		

	3. 	Click **Update**. 

	4.	An email that informs about the account locking is sent to the given email address.		

		<img src="../assets/img/learn/account-locked-email.png" alt="Account Locked email" width="500" style="border:1px solid grey"> 

	5.	Access the WSO2 Identity Server Dashboard at `https://localhost:9443/dashboard/`.

		<img src="../assets/img/learn/dashboard-login-screen.png" alt="Sign In form" width="400" style="border:1px solid grey"> 	

	6.	Try logging in with Larry's credentials. Note that an error message appears.

	7.	Wait for 15 minutes and try to log in again. The WSO2 Identity Server Dashboard home screen appears.  

4. To unlock Larry's user account:

	1.	Click **User Profile** option of Larry.

	2.	Unselect the **User Locked** check box.

	3.	Click **Update**

	4.	An email that informs about the account unlocking is sent to the given email address.

		<img src="../assets/img/learn/account-unlocked-email.png" alt="Account Unlocked email" width="500" style="border:1px solid grey"> 		

	5.	Try logging in to the WSO2 Identity Server Dashboard with Larry's credentials. The WSO2 Identity Server Dashboard home screen appears.
