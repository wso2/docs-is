![Configure Pre Issue Access Token Action]({{base_path}}/assets/img/complete-guides/actions/image13.png)

Once the action is configured, ensure that it is marked as active so it will be triggered during relevant operations. To
set up the application, navigate to **Applications > New Application** in the Console application of {{product_name}},
and select **Standard-Based Application**. Provide the application name as Adaptive Token Policy Demo App, choose OpenID
Connect as the protocol, and enable both **Authorization Code** and **Client Credentials** under the Protocol tab.
Additionally, make sure to add an **Authorized Redirect URL**, which should be a valid URL corresponding to your
application.

![Add Application]({{base_path}}/assets/img/complete-guides/actions/image14.png)

If you are testing the flow using the `authorization_code` grant, you will need a user. To add one, navigate to the 
**User Management > Users** section in the Console and create a new user with a predefined password.

![Add User]({{base_path}}/assets/img/complete-guides/actions/image15.png)
