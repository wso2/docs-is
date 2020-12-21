# User Registration with Password Entry

[Registering users](../../learn/user-registraion) with password entry is an [account management](../../learn/managing-user-accounts) feature offered by WSO2 Identity Server. 

In this approach, an administrator first creates a user account in the system upon which a confirmation link will be emailed to the user’s registered email Id. Once the user clicks on the confirmation link, the user will be taken into a screen prompting to enter the password. Once the user enters the correct password, the user account gets activated. 

## Scenario

**Pickup** is a cab company that has many employees who use different credentials to sign in to different internal enterprise applications. While **Sam** is an administrator at Pickup, **Jane** is a new recruit. 

Sam wants to register a user account for Jane and get it activated by requesting Jane to enter a password. 

<img src="../../assets/img/learn/pickup-user-registration-with-password.png" alt="Scenario Diagram" width="800">  

Let's learn how it's done! 

## Set up  

Follow the steps below to configure WSO2 Identity Server to enable password entry for account confirmation.

1.	Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.

	1.	To request password entry from the users who are registered via Management Console, add the following configurations. 

		```toml
		[identity_mgt.user_onboarding]
		ask_password_from_user= true
		```

	2.	To configure the email server to send emails requesting password entry, add the following configurations.

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

2.	[Restart WSO2 Identity Server]((../../setup/running-the-product/)).

3.	Sign in to the WSO2 Identity Server [Management Console](../../setup/getting-started-with-the-management-console/) at `https://<SERVER_HOST>:9443/carbon` as an administrator. 	 

4.	On the **Main** menu of the Management Console, click **Identity > Identity Providers > Resident**.

	<img src="../../assets/img/learn/resident-menu-item.png" alt="Resident menu-item" width="200" style="border:1px solid grey">  

5.	Under the **Account Management Policies** section, click **User Onboarding**.

	<img src="../../assets/img/learn/user-onboarding-option.png" alt="User Onboarding Option" width="700" style="border:1px solid grey">  	

6.	Select the **Enable User Email Verification** check box.

	<img src="../../assets/img/learn/ask-password-enable-email-verification.png" alt="Ask password code expiry time text box" width="700" style="border:1px solid grey">  	  

7.	You may enter the password entry validity period (in minutes) in the **Ask password code expiry time** text box.

	<img src="../../assets/img/learn/ask-password-expiry-time.png" alt="Ask password code expiry time text box" width="700" style="border:1px solid grey">  	

8.	Click **Update**.

	You have now configured WSO2 Identity Server to send the user account confirmation email to the registered user. Let's try it out!


## Try out 

1.	To create the user account for Jane:

	1.	On the **Main** menu of the Management Console, click **Identity > Users and Roles > Add**.

		<img src="../../assets/img/learn/add-users-and-roles-menu-item.png" alt="Add Users and Roles menu-item" width="200" style="border:1px solid grey">  

	2.	Click **Add New User**.

		<img src="../../assets/img/learn/add-new-user-option.png" alt="Add New User option" width="700" style="border:1px solid grey">  

	3.	Enter the required data as follows.

		<img src="../../assets/img/learn/add-new-user-ask-password.png" alt="Add New User screen" width="700" style="border:1px solid grey">   

		-	**Domain**: `Primary`
		-	**Username**: `Jane`
		-	**Define password here**: Unselected
		-	**Ask Password from user**: Selected
		-	**Email Address**: Enter the email address to which you wish to receive the account confirmation email. 

			!!! tip "Using special characters in the email address"

				If you are using special characters such as `$` in your email address, see [Configuring Emails with Special Characters](../../learn/adding-email-special-characters).


	4.	Click **Finish**. 

	5.	A confirmation email requesting to enter the password is sent to the given email address. 

		<img src="../../assets/img/learn/ask-password-email.png" alt="Ask Password email" width="500" style="border:1px solid grey"> 

	6.	Click **Create Password**. The **Reset Password** screen appears.

		<img src="../../assets/img/learn/reset-password-screen.png" alt="Reset Password screen" width="600" style="border:1px solid grey">  

	7.	Enter a preferred password and click **Submit**. 
