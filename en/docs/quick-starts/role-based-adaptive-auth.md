# Configure Role-Based Adaptive Authentication

This page guides you through configuring role-based adaptive authentication for a sample web application using a sample hardware key authenticator. 

----

If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/configure-adaptive-auth"   rel="nofollow noopener">I have my own application</a>

----

## Scenario

Consider a scenario where you want a user who belongs to the 'admin' role to perform an additional level of authentication, while other users can access a resource by only providing their credentials (basic authentication).

Role-based adaptive authentication can be used to trigger additional authentication steps for a particular role. 

----

{!fragments/adaptive-auth-samples.md!}

----

## Add a user


1.  Start the server and log in to the [management console](insertlink).

2.  Create a new user named 'Alex' with login permission. Do not assign any roles.
    For instructions, see [Adding Users and Roles](insertlink).

----

## Configure role-based authentication

1.  Click **Service Providers>List**.

2.  Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3.  Expand the **Local and Outbound Configuration** section and click **Advanced Authentication**.

4.  Expand **Script Based Conditional Authentication**.

5.  Click **Templates** on the right side of the **Script Based Conditional Authentication** field and then click **Role-Based**.  

    ![role based authentication template](../assets/img/samples/role-based-template.png)

6.  Click **Ok**. The authentication script and authentication steps
    are configured. 
    
    The authentication script defines a conditional step
    that executes the second authentication step (i.e., hardware key
    authenticator) only if the user belongs to an 'admin' or 'manager'
    role.

7.  The authentication steps added are `totp` and `fido`. However, these are authentication steps that you would normally use in production. 

    To try out sample authenticators with the sample application, delete the two
    authenticators and add the following sample authenticators instead.

    1.  Click **Delete** to remove the `            totp           ` and
        `            fido           ` authenticators from Step 2 (the
        second authentication step).
        
        ![delete authenticators](../assets/img/samples/delete-authenticators.png)
        
    2.  Select **Demo Hardware Key Authenticator** and click **Add**.  
        ![add new authenticator](../assets/img/samples/add-new-authenticator.png)

8.  Click **Update**.

----

## Try it out

1.  Access the following sample PickUp application URL:
    <http://localhost.com:8080/saml2-web-app-pickup-dispatch.com>
    
2.  Click **Login** and enter admin/admin credentials.  
    You are prompted to use the hardware key after basic authentication according to the authentication step defined in the JavaScript above.  
    
    ![pickup sign in](../assets/img/samples/pickup-sign-in.png)
    
3.  Enter the 4-digit key given on the screen and click **Sign In**. 

    ![hardware key authenticator](../assets/img/samples/hardware-key-authenticator.png)
    
    
4.  Next, log out of the application and log in again as 'Alex'. 

    Note that this user is not assigned to any role. You will see that
    authentication is successful only after going through the basic
    authentication step.  

    ![pickup homepage](../assets/img/samples/pickup-homepage.png)