# Configuring Password Reset with Challenge Questions

WSO2 Identity Server enables resetting user passwords by correctly responding to predefined challenge questions (also known as security questions).

## Scenario

**Pickup** is a cab company that has many employees who use different credentials to sign in to different internal enterprise applications. **Larry** who is a new recruit at Pickup has forgotten his password. 

Let's learn how he can recover his password by answering to a challenge question!

## Set up

Follow the steps below to configure WSO2 Identity Server to enable password reset by answering to a challenge question.  

!!! tip "Before you begin"

	1.	[Run WSO2 Identity Server](../../setup/running-the-product/).

	2.	Sign in to the WSO2 Identity Server [Management Console](../../setup/getting-started-with-the-management-console/) at `https://<SERVER_HOST>:9443/carbon` as an administrator. 	  

1.	On the **Main** menu of the Management Console, click **Identity > Identity Providers > Resident**.

	<img src="../assets/img/learn/resident-menu-item.png" alt="Resident menu-item" width="200" style="border:1px solid grey">  

2.	Under the **Account Management Policies** section, click **Account Recovery**.

	<img src="../assets/img/learn/account-recovery-option.png" alt="Account Recovery Option" width="700" style="border:1px solid grey">  	

3.	Enter the required values as given below:

	-	**Enable Notification Based Password Recovery**: Selected

	-	**Number of Questions Required for Password Recovery**: `2` 

	<img src="../assets/img/learn/security-question-based-password-recovery-option.png" alt="Security-Question-Based Password Recovery Option" width="600" style="border:1px solid grey">  	

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

3.	To configure the challenge questions:

	1.	Access WSO2 Identity Server Dashboard at `https://localhost:9443/dashboard/`. 		

	2.	Log in with the credentials of the user account that you created.

		<img src="../assets/img/learn/sign-in-form.png" alt="Sign In form" width="400" style="border:1px solid grey"> 	

	3.	Consent to share the shown attributes with the given service provider.

		<img src="../assets/img/learn/consent-form.png" alt="Consent form" width="400" style="border:1px solid grey">

	4.	Under **Account Recovery**, click **View details**.

		<img src="../assets/img/learn/dashboard-account-recovery-option.png" alt="Change Passwrod option" width="700" style="border:1px solid grey">

	5.	Configure the challenge questions as given below:

		-	**Challenge Question 1**: `City where you were born?`
		-	**Your Answer**: `Seattle`
		-	**Challenge Question 2**: `Favourite sport?`
		-	**Your Answer**: `Baseball`

		<img src="../assets/img/learn/dashboard-account-recovery-form.png" alt="Challenge Question form" width="700" style="border:1px solid grey">

	6. Click **Update**.

	7. Sign out.  

4.	To mimic a forgotten password:

	1.	On the Sign In screen of the WSO2 Identity Server Dashboard at `https://localhost:9443/dashboard/`, click **Password**.

		<img src="../assets/img/learn/forgotten-password-option.png" alt="Sign In form" width="700" style="border:1px solid grey"> 	

	3.	Enter the user name as `Larry` and select the **Recover with Security Questions** option.

		<img src="../assets/img/learn/recover-password-screen.png" alt="Consent form" width="600" style="border:1px solid grey">

	4.	Click **Submit**. 

	5.	Enter the first challenge question answer as `Seattle` and click **Submit**.

		<img src="../assets/img/learn/first-security-question.png" alt="First Security Question" width="400" style="border:1px solid grey">

	6.	Enter the second challenge question answer as `Baseball` and click **Submit**.

		<img src="../assets/img/learn/second-security-question.png" alt="First Security Question" width="400" style="border:1px solid grey">  

	7.	Enter the new password and click **Submit**.

		<img src="../assets/img/learn/password-reset-form.png" alt="Password Reset form" width="500" style="border:1px solid grey">  	  

	8.	Enter the user name and new password and click **Sign In**. The User Portal home screen appears. 
