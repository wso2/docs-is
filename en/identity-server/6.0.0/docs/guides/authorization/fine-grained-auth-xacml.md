#Configuring Fine-Grained Access Control with XACML

While **authorization** grants permission to access a resource, **access control** selectively restricts access to a resource. In this tutorial, we will learn how to  enable fine-grained accesss control with eXtensible Access Control Markup 
Language (XACML) 3.0. 


??? abstract "What's XACML?"

	XACML is a standard policy language that supports a standard way to write access control rules and evaluate access requests according to the rules defined in policies. It lets you form a query to ask whether the given action should be allowed or not, and interprets the result. To learn more about XACML, see [Access control and Entitlement management]({{base_path}}/references/concepts/authorization/access-control).

## Scenario

Pickup is a cab company that has many employees who use different credentials to sign in to different internal enterprise applications. Following are two such applications:

-	**Pickup Manager**: This application helps manage the overall operations at Pickup.
-	**Pickup Dispatch**: This application helps allocate vehicles to drivers.

Following are three Pickup employees:

-	**Larry**: A manager who has permission to view old and current driver allocations via Pickup Dispatch.
-	**Sam**: An executive officer who is responsible of allocating new vehicles to drivers via Pickup Dispatch. Sam also has permission to view old and current driver allocations. 
-	**Kim**: An HR manager who only has access to Pickup Manager.  

<img src="{{base_path}}/assets/img/guides/pickup-access-control-with-xacml.png" alt="Scenario Diagram" width="800">  

Let's creat a XACML policy that controls access to Pickup Dispatch accordingly!  

## Set up 

Follow the steps below to create a XACML policy that controls access of John, Jane, and Richard.

!!! tip "Before you begin"

	1.	[Run WSO2 Identity Sever]({{base_path}}/setup/running-the-product/).

	2.	Sign in to the WSO2 Identity Server [Management Console]({{base_path}}/setup/getting-started-with-the-management-console/) at `https://<SERVER_HOST>:9443/carbon` as an administrator.


1.	On the **Main** menu of the Management Console, click **Entitlement > PAP > Policy Adminisration**.

	<img src="{{base_path}}/assets/img/guides/policy-administration-menu-item.png" alt="Policy Administration menu-item" width="200" style="border:1px solid grey">  

2.	Click **Add New Entitlement Policy**.

	<img src="{{base_path}}/assets/img/guides/add-new-entitlement-policy-option.png" alt="Policy Administration menu-item" width="700" style="border:1px solid grey"> 

3.	Click **Standard Policy Editor**. 

	<img src="{{base_path}}/assets/img/guides/standard-policy-editor-option.png" alt="Policy Administration menu-item" width="700" style="border:1px solid grey"> 

4.	Enter the required values as given below.

	<img src="{{base_path}}/assets/img/guides/create-a-xacml-policy.png" alt="Create a XACML Policy screen" width="700" style="border:1px solid grey"> 

	1.	**Entitlement Policy Name**: This is the XACML policy name. Enter `Pickup_Access_Control`.

	2.	**Policy evaluation criterial**: This defines the entity based on which the policy will be evaluated. To evaluate the resources that match with the `/pickup-dispatch/.+` regex pattern, enter the following. 		

		<table>
			<tr>
				<td><code>Resource</code></td>
				<td><code>is</code></td>
				<td><code>equals-with-regex-match</code></td>
				<td><code>/pickup-dispatch/.+</code></td>
				<td><code>END</code></td>
			</tr>
		</table>

	3.	**Rules**:

		1.	To grant view access to John and Jane, add the following rule element values.

			-	**Rule Name**: This is the name of the XACML rule. Enter `View_Access`.

			-	**Rule Effect**. This defines whether access is granted or permitted to the entities that match with the rule. Select `Permit`.	

			-	**Rule Conditions**: This defines the entity based on which the rule will be evaludated. To evaluate the resources that match with the `/pickup-dispatch/.+` regex pattern, enter the following:

				<table>
					<tr>
						<td><code>Resource</code></td>
						<td><code>is</code></td>
						<td><code>equals-with-regex-match</code></td>
						<td><code>/pickup-dispatch/.+</code></td>
						<td><code>END</code></td>
					</tr>
				</table> 				

			-	**Your Conditions**: This defines the criteria to pick entities that match with the rule. To grant permissions to either Johne or Jane, when they are sending a GET request, enter the following rule element values.

				<table>
					<tr>
						<td><code>Subject</code></td>
						<td><code>is/are</code></td>
						<td><code>At-least-one-member-of</code></td>
						<td><code>John,Jane</code></td>
						<td><code>AND</code></td>
					</tr>
				</table>

				Note that another rule element row appears. Enter the following. 

				<table>
					<tr>
						<td><code>Action</code></td>
						<td><code>is/are</code></td>
						<td><code>equal</code></td>
						<td><code>GET</code></td>
						<td><code>END</code></td>
					</tr>
				</table> 

				Click **Add**. Note that the rule appears at the bottom of the screen. 

				<img src="{{base_path}}/assets/img/guides/first-xacml-rule.png" alt="First XACML Rule" width="700" style="border:1px solid grey">

		2.	Similarly, to grant edit access to Jane, add the following rule element values and click **Add**.

			-	**Rule Name**: `Edit_Access`

			-	**Rule Effect**: `Permit`

			-	**Rule Conditions**:

				<table>
					<tr>
						<td><code>Resource</code></td>
						<td><code>is</code></td>
						<td><code>equals-with-regex-match</code></td>
						<td><code>/pickup-dispatch/.+</code></td>
						<td><code>END</code></td>
					</tr>
				</table> 

			-	**Your Conditiions**:

				<table>
					<tr>
						<td><code>Subject</code></td>
						<td><code>is/are</code></td>
						<td><code>equal</code></td>
						<td><code>Jane</code></td>
						<td><code>AND</code></td>
					</tr>
				</table>

				<table>
					<tr>
						<td><code>Action</code></td>
						<td><code>is/are</code></td>
						<td><code>equal</code></td>
						<td><code>POST</code></td>
						<td><code>END</code></td>
					</tr>
				</table> 				

		3.	To deny edit access for John and Richard, add the following rule element values and click **Add**.

			-	**Rule Name**: `Deny_Edit_Access`

			-	**Rule Effect**: `Deny`

			-	**Rule Conditions**: 

				<table>
					<tr>
						<td><code>Resource</code></td>
						<td><code>is</code></td>
						<td><code>equals-with-regex-match</code></td>
						<td><code>/pickup-dispatch/.+</code></td>
						<td><code>END</code></td>
					</tr>
				</table> 

			-	**Your Conditiions**: 

				<table>
					<tr>
						<td><code>Subject</code></td>
						<td><code>is/are</code></td>
						<td><code>at-least-one-member</code></td>
						<td><code>John,Richard</code></td>
						<td><code>AND</code></td>
					</tr>
				</table>

				<table>
					<tr>
						<td><code>Action</code></td>
						<td><code>is/are</code></td>
						<td><code>equal</code></td>
						<td><code>POST</code></td>
						<td><code>END</code></td>
					</tr>
				</table>

		4.	To deny view access for Richard, add the following rule element values and click **Add**.

			-	**Rule Name**: `Deny_View_Access`

			-	**Rule Effect**: `Deny`

			-	**Rule Conditions**: 

				<table>
					<tr>
						<td><code>Resource</code></td>
						<td><code>is</code></td>
						<td><code>equals-with-regex-match</code></td>
						<td><code>/pickup-dispatch/.+</code></td>
						<td><code>END</code></td>
					</tr>
				</table> 

			-	**Your Conditiions**: 

				<table>
					<tr>
						<td><code>Subject</code></td>
						<td><code>is/are</code></td>
						<td><code>equal</code></td>
						<td><code>Richard</code></td>
						<td><code>AND</code></td>
					</tr>
				</table>

				<table>
					<tr>
						<td><code>Action</code></td>
						<td><code>is/are</code></td>
						<td><code>equal</code></td>
						<td><code>GET</code></td>
						<td><code>END</code></td>
					</tr>
				</table> 				
 				

		You have successfully created four access control rules for the XACML policy. 

5.	To save the XACML policy, click **Finish**.  


## Try out

Follow the steps below to test the XACML policy that you created above.

1.	On the **Policy Administration** screen of the Management Console, locate the newly added XACML policy.

	<img src="{{base_path}}/assets/img/guides/xacml-policy-location.png" alt="XACML Policy Location" width="700" style="border:1px solid grey"> 

2.	Click **Try**. Note that the **TryIt** screen appears.

	<img src="{{base_path}}/assets/img/guides/tryit-screen.png" alt="XACML Policy Location" width="700" style="border:1px solid grey">  

3.	To mimic a GET request to the `/pickup-dispatch/protected/index.jsp` resource by John, 
	1.	Enter the following request element values. 
		-	**Resource**: `/pickup-dispatch/protected/index.jsp`
		-	**Subject Name**: `John`
		-	**Action Name**: `GET`

	2.	Click **Test Evaluate**. A message indicating that John is permitted to perform the GET request to the given resource, appears.
	
4.	To mimic a POST request to the `/pickup-dispatch/protected/index.jsp` resource by John, change the **Action Name** to `POST` and click **Test Evaluate**.

4.	To mimic a POST request by Jane to the same resource, change the **Subject Name** to `Jane` and click **Test Evaluate**. A message indicating that Jane is permitted to send the POST request to the given resource, appears.

5.	To mimic a GET request by Richard, change the **Subject Name** back to `Richard` and **Action Name** to `GET` and click **Test Evaluate**. A message indicating that Richard is not permitted to send the POST request to the given resource appears. 
