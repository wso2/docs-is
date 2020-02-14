# Configuring Account Locking due to Failed Login Attempts

WSO2 Identity Server enables privileged users to define the maximum number of failed login attempts the system accepts. When a user exceeds the maximum number of failed login attempts defined in the system, the user account will be automatically locked. The privileged users can also define for how long the account should be locked.

<img src="../assets/img/learn/account-locking-overview.png" alt="Account Locking" width="700">  

## Scenario

**Pickup** is a cab company that has many employees who use different credentials to sign in to different internal enterprise applications. While **Robert** is an administrator at Pickup, **Larry** is a new recruit. To prevent unauthorized access, Robert wants to temporarily lock accounts to which more than 3 failed login attempts were made.

Let's learn how Robert implements this!  

## Set up

Follow the steps below to configure account locking due to failed login attempts.

1.	Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory and check whether the following listener configs are in place.

	```
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

	3.	Enter the required information as given below:

		-	**Maximum Failed Login Attempts**: `3`
		-	**Account Unlock Time**: `15`  

		<img src="../assets/img/learn/account-locking-form-failed-attempts.png" alt="Account Locking form" width="600" style="border:1px solid grey">  	

	4.	Click **Update**. 

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

3.	To configure Larry's email account:
	
	1.	Click **User Profile** option of Larry.

		<img src="../assets/img/learn/user-profile-option.png" alt="User Profile option" width="700" style="border:1px solid grey">   

	2.	Enter an email address to which Larry's account locking emails should be sent.

		<img src="../assets/img/learn/user-email.png" alt="User Email option" width="700" style="border:1px solid grey">    		

	3. 	Click **Update**. 

4.	To mimic account locking:

	1.	Access the WSO2 Identity Server Dashboard at `https://localhost:9443/dashboard/`.  

		<img src="../assets/img/learn/dashboard-login-screen.png" alt="Sign In form" width="400" style="border:1px solid grey"> 	

	2.	To mimic three consecutive erroneous login attempts, log in with Larry's user name and the following as passwords sequentially:

		-	`test123`
		-	`test234`
		-	`test345`

	3.	An email that informs about the account locking is sent to the given email address.		

		<img src="../assets/img/learn/account-locked-email.png" alt="Account Locked email" width="500" style="border:1px solid grey">  

	4.	Wait for 15 minutes and try to log in again with the correct credentials. The WSO2 Identity Server Dashboard home screen appears.  


	
	
