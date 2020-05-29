# Configure Tenant-Based Adaptive Authentication

This page guides you through configuring tenant-based adaptive authentication for a sample web application using a sample hardware key authenticator. 

For more information about tenants, see [multi-tenancy](insertlink). 

----

If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/configure-adaptive-auth"   rel="nofollow noopener">I have my own application</a>

----

## Scenario

Consider a scenario where you wish to add security for users logging in from external tenant domains. Using the tenant-based adaptive authentication template, you can whitelist certain tenant domains so that users from the whitelisted domains are prompted to perform an additional level of authentication, while users from any other tenant domain can simply provide their credentials (basic authentication) to access a resource.

----

{!fragments/adaptive-auth-samples.md!}

----

## Set up tenant

1. Start the server and log in to the [management console](insertlink).

2. Click on the **Configure** tab and then click **Multitenancy** > **Add New Tenant**.

3. Enter tenant details as shown below to register a new tenant for the domain " **abc.com** ".

    - **Domain:** abc.com
    - **Usage Plan for Tenant:** Demo
    - **Tenant Admin:** 

         - **First Name:** Alex
         -  **Last Name:** Doe
         - **Admin Username:** alex
         - **Admin Password:** alex321

    - **Email:** alex_d@gmail.com 

    ![register-new-tenant-1](../assets/img/guides/register-new-tenant.png)

5. Similarly, register a new tenant for the domain "123.com" with a
    different tenant admin.  

    ![register-new-tenant-2](../assets/img/samples/register-new-tenant-2.png)

----

## Configure tenant-based authentication

1.  Click **Service Providers > List**.

2.  Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3.  Select **Saas application**. This enables users from other tenant domains such as **abc.com** or **123.com** to log in to the application. 

    ![enable-saas-app](../../../assets/img/guides/enable-saas-app.png)

4.  Expand the **Local and Outbound Configuration** section and click **Advanced Authentication**.

5.  Expand **Script Based Conditional Authentication**.

6.  Click **Templates** on the right side of the **Script Based Conditional Authentication** field and then click **Tenant-Based**. 

    ![tenant based template](../assets/img/samples/tenant-based-template.png)

7.  Click **Ok**. The authentication script and authentication steps
    are configured. 
    
    The authentication script prompts the second step of authentication for users that belong to the tenant domains named "  `abc.com` " and " `xyz.com`".  

8.  The authentication steps added are `totp` and `fido`. However, these are authentication steps that you would normally use in production. 

    To try out sample authenticators with the sample application, delete the two
    authenticators and add the following sample authenticators instead.

    1.  Click **Delete** to remove the `totp` authenticator from Step 2 (the
        second authentication step).
        
        ![delete authenticator](../assets/img/samples/delete-authenticator-1.png)
        
    2.  Select **Demo Hardware Key Authenticator** and click **Add**.  
        ![add new authenticator](../assets/img/samples/add-new-authenticator.png)

9. Click **Update**.

----

## Try it out

1. Log out of the management console and log in with the **abc.com** tenant admin's credentials (alex@abc.com).  
    
    ![mgt-console-login-alex](../assets/img/samples/mgt-console-login-alex.png)

2.  Create a new user in the abc.com tenant named "chris" with login permission.

    For instructions, see [Adding Users and Roles](insertlink).

3.  Access the following sample PickUp application URL:

    <http://localhost.com:8080/saml2-web-app-pickup-dispatch.com>

4.  Click **Login** and enter Chris's credentials. 
    
    Enter the username with the appended tenant domain (i.e., chris@abc.com).  
    
    ![pickup-sign-in-chris](../assets/img/samples/pickup-sign-in-chris.png)  

    Note that you are prompted for hardware key authentication because
    **abc.com** is a whitelisted tenant domain.

5.  Enter the 4-digit key and click **Sign In**. You are successfully
    logged in to the application.  

    ![hardware-key-authenticator](../assets/img/samples/hardware-key-authenticator.png)

6.  Log out and log in with Kim's credentials. Kim is the admin of the
    **123.com** tenant domain, which is not one of the whitelisted
    domains.  

    ![pickup-sign-in-kim](../assets/img/samples/pickup-sign-in-kim.png)

7.  Provide consent.  
    Note that you are successfully logged in to the application after
    going through the basic authentication step only.