First, sign in to your Asgardeo or WSO2 IS account using your admin credentials, click on "Actions" and then select the
action type Pre Update Profile.

Add an action name, the endpoint extracted from the deployment platform, and the appropriate authentication mechanism.

* Choreo: Append the endpoint name defined in the source code to the generated Choreo URL.
* Vercel: Append the endpoint name defined in the source code to the generated Vercel domain URL.
* AWS Lambda: Use the generated function URL directly.

Set the authentication mechanism as follows:

* Choreo and Vercel: Use an API key. The header name should be api-key.
* For Choreo, use the value generated through the Dev Portal.
* For Vercel, use the value defined in the environment variables.
* AWS Lambda: No authentication is required; set the authentication mechanism to None.

![Asgardeo Configure Pre Update Profile Action]({{base_path}}/assets/img/complete-guides/actions/image13.png){: width="
600" style="display: block; margin: 0;"}

Once the action is configured, ensure that the action is marked as active. Additionally, navigate to the User
Management > Users section and add a user with a predefined password for testing purposes.

![Asgardeo Add User]({{base_path}}/assets/img/complete-guides/actions/image14.png){: width="600" style="display: block;
margin: 0;"}

Since "department" is a custom attribute, you will also need to add an attribute for it. You can navigate to User
Attributes & Stores > Attributes > Manage Attributes > Attributes > New Attribute, and then add an attribute named
department.

![Asgardeo Add Attribute]({{base_path}}/assets/img/complete-guides/actions/image15.png){: width="600" style="display:
block; margin: 0;"}

Once it is added, mark it to be displayed in both the Administrator Console and End User Profile.

![Asgardeo Attribute Configurations]({{base_path}}/assets/img/complete-guides/actions/image16.png){: width="600" style="
display: block; margin: 0;"}
