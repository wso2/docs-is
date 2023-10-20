# User Registration with Email Verification

[Registering users](../../learn/user-registraion) with email verification is an [account management](../../learn/managing-user-accounts) feature offered by WSO2 Identity Server. 

In this approach, an administrator first creates a user account with a default password that will be emailed to the user's registered email Id for confirmation. 

## Scenario

**Pickup** is a cab company that has many employees who use different credentials to sign in to different internal enterprise applications. While **Sam** is an administrator at Pickup, **Mark** is a new recruit. 

Sam wants to register a user account with a default password for Mark and get it activated by requesting Mark to verify. 

<img src="../../assets/img/learn/pickup-user-registration-with-email-verification.png" alt="Scenario Diagram" width="800">  

Let's learn how it's done!  

## Set up  

Follow the steps below to configure WSO2 Identity Server to enable password entry for account confirmation.


1.	Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.

	1.	To request email verification from the users who are registered with a default password, add the following configurations. 

		```toml
		[identity_mgt.user_onboarding]
		enable_email_verification = true 
		lock_on_creation=true
		```

	2.	To configure the email server to send emails requesting a passwor entry, add the following configurations.

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

7.	You may enter the confirmation email validity period (in minutes) in the **Email verification code expiry time** text box.

8.	Click **Update**.

You have now configured WSO2 Identity Server to send the user account confirmation email to the registered user. Let's try it out!


## Try out 

1.	To create the user account for Mark, execute the following cURL.

	!!! tip

		Make sure to enter a valid user email.


	```curl 
	curl -v -k --user admin:admin --data '{"schemas":[],"name":{"familyName":"Mark","givenName":"Roe"},"userName":"Mark","password":"password","emails":[{"primary":true,"value":"<USER_EMAIL>"}],"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{verifyEmail:"true"}}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users
	```

2.	An email requesting to confirm the user creation is sent to the given email address. 

	<img src="../../assets/img/learn/user-registration-verification-email.png" alt="Account Creation verification email" width="500" style="border:1px solid grey">  	  

3.	To verify account creation, click **Confirm Account**. 
