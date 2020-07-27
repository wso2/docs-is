# Configuring User Name Recovery

WSO2 Identity Server enables recovering user accounts where the user has forgotten the user name. This is done by matching the user claims that are related to user attributes. The user will be prompted to enter values for these user attributes. If the value entered by the user matches with the claims, the corresponding user name will be emailed to the user’s registered email ID.  

<img src="../../assets/img/learn/user-name-recovery-overview.png" alt="User Name Recovery" width="700"> 

## Scenario

**Pickup** is a cab company that has many employees who use different credentials to sign in to different internal enterprise applications. **Alex** who is a new recruit at Pickup has forgotten the user name. 

Let's learn how Alex can recover the password by providing the corresponding profile information!


## Set up

Follow the steps below to configure WSO2 Identity Server to enable user name recovery.

1.	Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.

	1.	Check whether the following listener configs are in place.

		```
		[event.default_listener.identity_mgt]
		priority= "50"
		enable = false
		[event.default_listener.governance_identity_mgt]
		priority= "95"
		enable = true
		```

	2.	To configure the email server to send emails requesting password reset, add the following configurations.

		-	**from_address**: This is the email address from which the confirmation email will be sent.
		-	**username**: This is the user name of the given email address.
		-	**password**: This is the password of the given email address. 

		```toml tab="Format"
		[output_adapter.email]
		from_address= ""
		username= ""
		password= ""
		hostname= "smtp.gmail.com"
		port= 587
		enable_start_tls= true
		enable_authentication= true
		```

		```toml tab="Sample"
		[output_adapter.email]
		from_address= "wso2iamtest@gmail.com"
		username= "wso2iamtest"
		password= "Wso2@iam70"
		hostname= "smtp.gmail.com"
		port= 587
		enable_start_tls= true
		enable_authentication= true
		```

		!!! warning "If you are using a Google email account"

			Google has restricted third-party applications and less secure applications from sending emails by default. As WSO2 Identity Server acts as a third-party application when sending emails for password entry, follow the steps below to enable your Google email account to provide access to third-party applications.

			1.	Access [https://myaccount.google.com/security](https://myaccount.google.com/security).

			2.	Under **Signing in to Google** section, turn off the **2-step Verification** option.

2.	[Restart WSO2 Identity Server](../../setup/running-the-product/).

3.	On the **Main** menu of the Management Console, click **Identity > Identity Providers > Resident**.

	<img src="../../assets/img/learn/resident-menu-item.png" alt="Resident menu-item" width="200" style="border:1px solid grey">  

4.	Under the **Account Management Policies** section, click **Account Recovery**.

	<img src="../../assets/img/learn/account-recovery-option.png" alt="Account Recovery Option" width="700" style="border:1px solid grey">  	

5.	Select the following check boxes:
	-	**Enable Username Recovery**
	-	**Enable Internal Notification Management**

	<img src="../../assets/img/learn/user-name-recovery-options.png" alt="User Name Recover options" width="600" style="border:1px solid grey">  	

6.	Click **Update**. 


## Try out

1.	To create the user account for Alex:

	1.	On the **Main** menu of the Management Console, click **Identity > Users and Roles > Add**.

		<img src="../../assets/img/learn/add-users-and-roles-menu-item.png" alt="Add Users and Roles menu-item" width="200" style="border:1px solid grey">  

	2.	Click **Add New User**.

		<img src="../../assets/img/learn/add-new-user-option.png" alt="Add New User option" width="700" style="border:1px solid grey">  

	3.	Enter the required data as follows.

		<img src="../../assets/img/learn/add-new-user-screen.png" alt="Add New User screen" width="700" style="border:1px solid grey">   

		-	**Domain**: `Primary`
		-	**Username**: `Alex`

	4.	Click **Finish**. 

2.	To assign login permissions to the user:
	
	1.	Click the **View Roles** option of Alex.

		<img src="../../assets/img/learn/view-roles-option.png" alt="View Roles option" width="700" style="border:1px solid grey"> 	 		 		

	2.	Click **Permissions**.

		<img src="../../assets/img/learn/role-permissions-option.png" alt="Role Permissions option" width="700" style="border:1px solid grey"> 	 		 		

	3.	Select **Login** and click **Update**.

		<img src="../../assets/img/learn/login-permission.png" alt="Login permission" width="700" style="border:1px solid grey">  

3.	To add Alex's email Id:
	
	1.	Click **User Profile** option of Alex.

		<img src="../../assets/img/learn/user-profile-option.png" alt="User Profile option" width="700" style="border:1px solid grey">   

	2.	Enter an email address to which Alex's password recovery emails will be sent.

		<img src="../../assets/img/learn/user-email.png" alt="User Email option" width="700" style="border:1px solid grey">   

	3. Click **Update**. 

4.	To mimic a forgotten user name:

	1.	On the Sign In screen of the WSO2 Identity Server User Portal at `https://localhost:9443/user-portal/`, click
	 **Username**.

		<img src="../../assets/img/learn/forgotten-user-name-option.png" alt="Sign In form" width="400" style="border:1px solid grey"> 	

	3.	Enter the first name as `Alex`.

		<img src="../../assets/img/learn/recover-user-name-screen.png" alt="Consent form" width="600" style="border:1px solid grey">

	4.	Click **Submit**. 

	5.	An email with the user name is sent to the given email address.		

		<img src="../../assets/img/learn/account-recovery-email.png" alt="Account Recovery email" width="500" style="border:1px solid grey"> 
	