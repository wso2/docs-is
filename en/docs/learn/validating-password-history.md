#Validating Password History

WSO2 Identity Server enables restricting the user from re-entering recently used passwords as a new password. For example, if we have set this configuration to 5, the user will not be able to re-use any of the five most recently used passwords when setting a new password.

<img src="../../assets/img/learn/password-history.png" alt="Password History" width="700">

## Scenario

**Pickup** is a cab company that has many employees who use different credentials to sign in to different internal enterprise applications. Robert, who is an administrator at Pickup, wants to restrict users from re-using the three most recently used passwords when setting a new password.

## Set up

Follow the steps below to define the password policy that Robert wants to enforce.

!!! tip "Before you begin"

	1.	[Run WSO2 Identity Sever](../../setup/running-the-product/).

	2.	Sign in to the WSO2 Identity Server [Management Console](../../setup/getting-started-with-the-management-console/) at `https://<SERVER_HOST>:9443/carbon` as an administrator.

1.	On the **Main** menu of the Management Console, click **Identity > Identity Providers > Resident**.

	<img src="../../assets/img/learn/resident-menu-item.png" alt="Resident Identity Provider menu-item" width="200" style="border:1px solid grey">  

2.	Under **Password Policies**, click **Password History**.

	<img src="../../assets/img/learn/password-history-option.png" alt="Passwrod History option" width="700" style="border:1px solid grey">  

3.	Enter the required values as given below.

	<img src="../../assets/img/learn/password-history-form.png" alt="Passwrod History form" width="700" style="border:1px solid grey">

	<table>
		<thead>
			<tr>
				<th>Field</th>
				<th>Description</th>
				<th>Sample Value</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Enable Password History Feature</td>
				<td>This enables password history validation.</td>
				<td>Selected</td>
			</tr>
			<tr>
				<td>Password History validation count</td>
				<td>This defines after how many password updates the user can re-use an old password.</td>
				<td><code>3</code></td>
			</tr>
		</tbody>
	</table>

## Try out 

1.	To create the user:

	1.	On the **Main** menu of the Management Console, click **Identity > Users and Roles > Add**.

	2.	Click **Add New User**.

	3.	Enter `Larry` as the user name and `testwso2is` as the password.

	4.	Click **Finish**.

2.	To assign login permissions to the user:
	
	1.	Click the **View Roles** option of Larry.

		<img src="../../assets/img/learn/view-roles-option.png" alt="View Roles option" width="700" style="border:1px solid grey"> 	 		 		

	2.	Click **Permissions**.

		<img src="../../assets/img/learn/role-permissions-option.png" alt="Role Permissions option" width="700" style="border:1px solid grey"> 	 		 		

	3.	Select **Login** and click **Update**.

		<img src="../../assets/img/learn/login-permission.png" alt="Login permission" width="700" style="border:1px solid grey"> 	 		

3.	To change the password:

	1.	Access WSO2 Identity Server Dashboard at `https://localhost:9443/dashboard/`.

	2.	Log in with the credentials of the user account that you created.

		<img src="../../assets/img/learn/sign-in-form.png" alt="Sign In form" width="400" style="border:1px solid grey"> 	

	3.	Consent to share the shown attributes with the given service provider.

		<img src="../../assets/img/learn/consent-form.png" alt="Consent form" width="400" style="border:1px solid grey">

	4.	Under **Change Password**, click **View details**. 

		<img src="../../assets/img/learn/dashboard-change-password-option.png" alt="Change Passwrod option" width="700" style="border:1px solid grey">

	5.	Enter `testwso2is` in **Current Password**, **New Password**, and **Confirm New Password** text boxes.

		<img src="../../assets/img/learn/change-password-form.png" alt="Change Password form" width="700" style="border:1px solid grey"> 

	6.	Click **Update**. An error message appears. 

		<img src="../../assets/img/learn/passwore-history-error-message.png" alt="Passwrod History Validation error message" width="600" style="border:1px solid grey">

	7.	To mimic three consecutive password changes, change Larry's password to the following sequentially. 

		-	`test123`
		-	`test234`
		-	`test345`

		Note that these passwords gets successfully added to the system. 

	8.	Now, change Larry's password back to `testwso2is`. Note that the password gets successfully changed. 
