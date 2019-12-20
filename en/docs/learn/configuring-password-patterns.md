# Configuring Password Patterns

WSO2 Identity Server enables defining custom [password policies](../../learn/configuring-password-policies) and enforcing them at the point of user creation. This enables complying with password policies that are deemed necessary through various regulations. 

<img src="../../assets/img/learn/password-pattern.png" alt="Password Pattern" width="700">  

## Scenario

**Pickup** is a cab company that has many employees who use different credentials to sign in to different internal enterprise applications. Robert, who is an administrator at Pickup, wants to enforce the following password pattern:

-	Minimum password length: 6
-	Maximum password length: 12
-	Must contain at least 1 lowercase alphabetical character 
-	Must contain at least 1 uppercase alphabetical character 
-	Must contain at least 1 numeric character
-	Must contain at least one special character out of the `!@#$%&*` characters 	

## Set up

Follow the steps below to define the password policy that Robert wants to enforce.

!!! tip "Before you begin"

	1.	[Run WSO2 Identity Sever](../../setup/running-the-product/).

	2.	Sign in to the WSO2 Identity Server [Management Console](../../setup/getting-started-with-the-management-console/) at `https://<SERVER_HOST>:9443/carbon` as an administrator.

1.	On the **Main** menu of the Management Console, click **Identity > Identity Providers > Resident**.

	<img src="../../assets/img/learn/resident-menu-item.png" alt="Resident Identity Provider menu-item" width="200" style="border:1px solid grey">  

2.	Under **Password Policies**, click **Password Patterns**.

	<img src="../../assets/img/learn/password-patterns-option.png" alt="Passwrod Patterns option" width="700" style="border:1px solid grey">  	

3.	Enter the required values as given below.

	<img src="../../assets/img/learn/password-patterns-form.png" alt="Passwrod Patterns form" width="700" style="border:1px solid grey">  

	<table>
		<colgroup>
			<col width="20%">
			<col width="40%">
			<col width="40%">
		</colgroup>
		<thead>
			<tr>
				<th>Field</th>
				<th>Description</th>
				<th>Sample Value</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Enable Password Policy Feature</td>
				<td>This enables password patterns in WSO2 Identity Server.</td>
				<td>Selected</td>
			</tr>
			<tr>
				<td>Password Policy Min Length</td>
				<td>This is the minimum password length allowed.</td>
				<td><code>6</code></td>
			</tr>
			<tr>
				<td>Password Policy Max Length</td>
				<td>This is the maximum password length allowed.</td>
				<td><code>12</code></td>
			</tr>
			<tr>
				<td>Password Policy Pattern</td>
				<td>This is the allowed password pattern.</td>
				<td><code>^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*])).{0,100}$</code></td>
			</tr>
			<tr>
				<td>Password Policy Error Message</td>
				<td>This appears when the password violates the defined password pattern.</td>
				<td><code>'Password pattern policy violated! The password should contain a digit [0-9], a lower case letter [a-z], an upper case letter [A-Z], and one of the !@#$%&* characters.'</code></td>
			</tr>
		</tbody>
	</table>  

## Try out

1.	On the **Main** menu of the Management Console, click **Identity > Users and Roles > Add**.

2.	Click **Add New User**.

3.	Enter `Larry` as the user name and `test123` as the password.

4.	Click **Finish**.  Note that the error message that you added for the password pattern appears.

	<img src="../../assets/img/learn/password-patter-violation-error-message.png" alt="Password Pattern Viloated error message" width="400" style="border:1px solid grey">
