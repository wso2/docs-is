# Configuring Role-Based Adaptive Authentication

This tutorial demonstrates how you can set up role-based adaptive
authentication with WSO2 Identity Server (WSO2 IS).

To understand how to set up role-based adaptive authentication with WSO2
IS, let's consider a scenario where you want a user who has an
administrator role to perform an additional level of authentication
while any other user can just provide their credentials (basic
authentication) to access a resource.

Here, you will use a sample application named to deploy and set up
sample authenticators required to try out the scenario.

!!! tip
    
    Before you begin
    
    -   Set up the service provider and sample application for adaptive
        authentication if you have not done so already. For instructions on
        how to do this, see [Configuring a Service Provider for Adaptive
        Authentication](configuring-a-service-provider-for-adaptive-authentication.md)
        .
    -   For more information about adaptive authentication with WSO2
        Identity Server, see [Adaptive
        Authentication](adaptive-authentication-overview.md) .

### Configuring the sample scenario

1.  Log in to the management console and create a new user named 'Alex'.
    Do not assign any roles.
2.  Navigate to **Service Providers&gt;List** and click **Edit** on
    the saml2-web-app-dispatch.com service provider.
3.  Expand the **Local and Outbound Configuration** section and click
    **Advanced Authentication** .
4.  Expand **Script Based Conditional Authentication** .
5.  Click **Templates** on the right side of the **Script Based
    Conditional Authentication** field and then click **Role-Based** .  
    ![](../../assets/img/tutorials/role-based-authentication-template.png)
6.  Click **Ok** . The authentication script and authentication steps
    are configured. The authentication script defines a conditional step
    that executes the second authentication step (i.e., hardware key
    authenticator) only if the user belongs to an 'admin' or 'manager'
    role.

7.  The authentication steps added are `          totp         ` and
    `          fido         ` . However, these are authentication steps
    that you would normally use in production. To try out sample
    authenticators with the sample application, delete the two
    authenticators and add the following sample authenticators instead.
    1.  Click **Delete** to remove the `            totp           ` and
        `            fido           ` authenticators from Step 2 (the
        second authentication step).  
        ![](../../assets/img/tutorials/delete-authenticators.png)
    2.  Select **Demo Hardware Key Authenticator** and click **Add** .  
        ![](../../assets/img/tutorials/add-new-authenticator.png)
8.  Click **Update** .

### Testing the sample scenario

1.  Access the following sample PickUp application URL:
    <http://localhost.com:8080/saml2-web-app-dispatch.com>
2.  Click **Login** and enter admin/admin credentials.  You are prompted
    to use the hardware key after basic authentication according to the
    authentication step defined in the JavaScript above.  
    ![](../../assets/img/tutorials/pickup-sign-in.png)
3.  Enter the 4 digit key given on the screen and click **Sign In** .  
    ![](../../assets/img/tutorials/hardware-key-authenticator.png)
4.  Next, log out of the application and log in again as 'Alex'. Note
    that this user is not assigned to any role. You will see that
    authentication is successful only after going through the basic
    authentication step.  
    ![](../../assets/img/tutorials/pickup-homepage.png)

### What's Next?

The following scenarios demonstrate the use of adaptive authentication
templates and scripts to try out other use cases.
