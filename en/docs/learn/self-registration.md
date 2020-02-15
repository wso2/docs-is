# Self-Registration

Self-registration is an [account management](../../learn/managing-user-accounts) feature offered by WSO2 Identity Server. 

In this approach, when a user self-registers, a user account gets created and an email requesting for account confirmation is send to the user's registerd email ID. The account remains locked for a predefined duration during which the user should confirm the account creation. If the user does not confirm the account creation before the predefined duration, the user account gets locked. Such accounts can be deleted by administrators to manage resources effectively.

## Scenario

**Pickup** is a cab company that has many employees who use different credentials to sign in to different internal enterprise applications. While **Robert** is an administrator at Pickup, **Mark** is a new recruit who wishes to use the self-registration option to create a user account. 

When Mark self-registers, an email requesting for account creation confirmation is sent to Mark's registered email account. Mark should respond to the confirmation email before the confirmation acceptance window expires. If Mark fails to confirm the account creation, his user account will be locked and Robert will be able to delete his user account. 

<img src="../../assets/img/learn/self-registration.png" alt="Scenario Diagram" width="800">  

Let's learn how it's done!  

## Set up
Follow the steps below to configure WSO2 Identity Server to enable password entry for account confirmation.


1.	Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.

	1. 	Make sure the following listener configs are in place.

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

	2.	To send user account creation confirmation email, add the following configurations. 

		```toml
		[identity_mgt.user_onboarding]
		enable_email_verification = true 
		lock_on_creation=true
		```

	3.	To configure the email server to send emails requesting a password entry, add the following configurations.

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

5.	Under the **Account Management Policies** section, click **User Self Registration**.

	<img src="../../assets/img/learn/user-self-registration-option.png" alt="User Self-Registration Option" width="700" style="border:1px solid grey">  	

6.	Enter the required information as given below. 

	<img src="../../assets/img/learn/user-self-registration-form.png" alt="User Self-Registration form" width="700" style="border:1px solid grey">

	1.	To enable self-registration, select the **Enable Self User Registration** check box.

	2.	To keep the user account that is created through self-registration locked until the user responds to the account confirmation email, select the **Enable Account Lock On Creation Enabled** check box.

	3.	To enables sending confirmation emails to the user, select the **Enable Notification Internally Management** check box. If the client application handles notifications, unselect.

	4.	You may enter the account confirmation email validity period (in minutes) in the **User self registration code expiry time** text box.

	5.	To set attributes that the user will consent to share:

		1.	Click **Click here** under **Manage Self-Sign-Up purposes**.

		2.	Click **Add New Purpose**.

			<img src="../../assets/img/learn/consent-purpose-form.png" alt="Consent Purpose form" width="700" style="border:1px solid grey">

			The **Add New Purpose** screen appears.

			<img src="../../assets/img/learn/add-new-purpose-form.png" alt="Add New Consent Purpose form" width="700" style="border:1px solid grey">

		3.	Enter `To send marketing material` in the **Purpose Name** text box.

		4.	Enter `To send product marketing material via email and text messages` in the **Description** text area.

		5.	Under **Select PII Categories**, click **Add PII Category**.

			??? info "What's PII?"

				Personally Identifiable Information (PII) is any information that can be used to identify the user who is consenting to share the user's information. For more information, see [Definitions for consent management](../../develop/using-the-consent-management-rest-apis/)

		6.	Select the following options.

			-	`http://wso2.org/claims/givenname`
			-	`http://wso2.org/claims/emailaddress`
			-	`http://wso2.org/claims/mobile`

			<img src="../../assets/img/learn/pii-category-entry.png" alt="PII Category entry" width="600" style="border:1px solid grey"> 


		7.	Set the **First Name** and **Email** display names to mandatory.

		8. 	Click **Finish**. Note that the Consent Purposes screen appears.

		9.	Clic **Finish**. Note that the User Self Registration screen appears. 	

7.	Click **Update**.

You have now configured WSO2 Identity Server to enable self-registration. Let's try it out!


## Try out 

1.	Access WSO2 Identity Server Dashboard at `https://localhost:9443/dashboard/`.

2.	Click **Register Now**.

	<img src="../../assets/img/learn/register-now-option.png" alt="Register Now option" width="400" style="border:1px solid grey"> 	

3.	Enter the user name as `Mark` and click **Proceed to Self Register**.

	<img src="../../assets/img/learn/start-signing-up-form.png" alt="Start Signing Up form" width="500" style="border:1px solid grey">

	The **Create New Account** screen appears.

	<img src="../../assets/img/learn/create-new-account-screen.png" alt="Create New screen" width="500" style="border:1px solid grey">

	1.	Enter `Mark` in the **First Name** text box.

	2.	Enter a preferred password in the **Password** and **Confirm password** text boxes.

	3.	Enter your email address in the **Email** text box. Note that as per the PII configurations, this text box appears mandatory.

	4.	You may enter a mobile number in the **Mobile** text box. Note that as per the PII configurations, this text box appears optional.

	5.	Under the consent management frame, select the **First Name**,  **Email**, and **Mobile** check boxes.

	6.	Read the Privacy Policy and select the **Privacy Policy** check box.

	7. 	Click **Register**. 

4.	An email requesting to confirm the user account creation is sent to the given email address. 

	<img src="../../assets/img/learn/self-registration-confirmation-email.png" alt="Self-Regisrtation Confirmation email" width="500" style="border:1px solid grey">  	   

5.	To respond to the account confirmation email, click **Confirm Account**. A confirmation message appears.

	<img src="../../assets/img/learn/account-confirmation-notification.png" alt="Account Confirmation notification" width="400" style="border:1px solid grey">  	   

6.	Click **Close**. The WSO2 Identity Server Dashboard Login screen appears.

7. 	Log in with Mark's credentials and navigate to the Home screen.  


!!! tip

	Following are more self-registration methods:

	-	[Self-Registration with REST API](/develop/using-the-self-sign-up-rest-apis/)
	-	[Self-Registration with SCIM/Me](/learn/creating-users-using-the-ask-password-option#ask-password)  
