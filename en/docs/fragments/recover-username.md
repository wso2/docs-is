Follow the steps below to configure WSO2 Identity Server to enable username recovery.

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
		-	**username**: This is the username of the given email address.
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

2.	[Restart WSO2 Identity Server](../../../deploy/get-started/run-the-product/).

3.	On the **Main** menu of the Management Console, click **Identity > Identity Providers > Resident**.

	<img src="../../../assets/img/fragments/resident-menu-item.png" alt="Resident menu-item" width="200" style="border:1px solid grey">  

4.	Under the **Account Management Policies** section, click **Account Recovery**.

	<img src="../../../assets/img/fragments/account-recovery-option.png" alt="Account Recovery Option" width="700" style="border:1px solid grey">  	

5.	Select the following check boxes:
	-	**Enable Username Recovery**
	-	**Enable Internal Notification Management**

	<img src="../../../assets/img/fragments/user-name-recovery-options.png" alt="User Name Recover options" width="600" style="border:1px solid grey">  	

6.	Click **Update**. 