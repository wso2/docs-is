# Editing a XACML Policy

Follow the instructions below to edit a XACML policy.

1.  Sign in. Enter your username and password to log on to the
    [Management Console]({{base_path}}/deploy/get-started/get-started-with-the-management-console/)
    .
2.  Navigate to the **Main** menu to access the **Entitlement** menu.
    Click **Policy Administration** under **PAP**.

3.  Locate the policy you want to edit in the list of **Available
    Entitlement Policies**, and click on the **Edit** link to access
    the **Policy Editor** window.  
4.  On the **Policy Editor** window, you will get the created policy in
    XML format and you can edit the XML file according to your
    requirement. Finally, you can click **Save Policy** to save the
    changes you did to the policy.  

    !!! info
		Remember this when editing a policy created by Simple Policy Editor

		Note the following:

		-   Simple Policy Editor is specially designed for XACML 2.0.
		-   When you edit a policy created by a Simple Policy Editor, you
			get the design view instead of the XML view as shown below.
		-   Also, the base condition that executes the policy cannot be
			changed once it is created as highlighted below.
		-   You can edit other parameters of the policy and click **Finish**
			to save the changes.


5.  Once you successfully edit the policy, you can publish it to the PDP
    by clicking **Publish To My PDP** in the **Available Entitlement
    Policies** window as shown below.  
6.  When the policy is published to PDP, it will display in **Policy
    View** under **PDP**.
7.  If you want to delete an existing published policy, first go to the
    **Policy View** in **PDP** and delete it from the PDP by clicking
    **Delete** against that relevant published policy.  
8.  Click **Yes** to confirm the complete removal of policy from PDP.  

After deleting the policy permanently from PDP, you can follow the above
steps again to edit the policy and publish it to PDP again.