# Configuring Password Recovery with Email

WSO2 Identity Server enables resetting user passwords by emailing a password reset link to the user’s registered email Id.

## Scenario

**Pickup** is a cab company that has many employees who use different credentials to sign in to different internal enterprise applications. **Alex** who is a new recruit at Pickup has forgotten the password. 

Let's learn how Alex can recover the password via email!

## Set up

Follow the steps below to configure WSO2 Identity Server to enable password reset via email notifications.  

1.	Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.

	1.	Check whether the following listener configs are in place.

		```
		[event.default_listener.identity_mgt]
		priority= "50"
		enable = false
		[event.default_listener.governance_identity_mgt]
		priority= "95"
		enable = true
		[event.default_listener.governance_identity_store]
		priority= "97"
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
			
			3.  Enable **Less secure app access** in Google Account security section.

2.	[Restart WSO2 Identity Server](../../setup/running-the-product/).

3.	Sign in to the WSO2 Identity Server [Management Console](../../setup/getting-started-with-the-management-console/) at `https://<SERVER_HOST>:9443/carbon` as an administrator. 	 

4.	On the **Main** menu of the Management Console, click **Identity > Identity Providers > Resident**.

	<img src="../../assets/img/learn/resident-menu-item.png" alt="Resident menu-item" width="200" style="border:1px solid grey">  

5.	Under the **Account Management** section, click **Account Recovery**.

	<img src="../../assets/img/learn/account-recovery-option.png" alt="Account Recovery Option" width="700" style="border:1px solid grey">  	

6.	Select **Notification Based Password Recovery** check box.

	<img src="../../assets/img/learn/notification-based-password-recovery-option.png" alt="Notification-Based Password Recovery Option" width="600" style="border:1px solid grey">  	

7.	Click **Update**. 

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

2.	To add Alex's email Id:
	
	1.	Click **User Profile** option of Alex.

		<img src="../../assets/img/learn/user-profile-option.png" alt="User Profile option" width="700" style="border:1px solid grey">   

	2.	Enter an email address to which Alex's password recovery emails will be sent.

		<img src="../../assets/img/learn/user-email.png" alt="User Email option" width="700" style="border:1px solid grey">   

	3. Click **Update**.

3.	To mimic a forgotten password:

	1.	Access WSO2 Identity Server **My Account** at `https://localhost:9443/myaccount`.

	2.	Click **Password**.

		<img src="../../assets/img/learn/forgotten-password-option.png" alt="Sign In form" width="400" style="border:1px solid grey"> 	

	3.	Enter the user name as `Alex` and select the **Recover with Mail** option.

		<img src="../../assets/img/learn/recover-password-screen.png" alt="Consent form" width="600" style="border:1px solid grey">

	4.	Click **Submit**. 
	