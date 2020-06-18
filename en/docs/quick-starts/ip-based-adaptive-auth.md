# Configure IP-Based Adaptive Authentication

This page guides you through configuring IP-based adaptive authentication for a sample web application using a sample hardware key authenticator. 

----

If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/configure-adaptive-auth"   rel="nofollow noopener">I have my own application</a>

----

## Scenario

Consider a scenario where you wish to add security for users logging in from external networks or other geographic locations. Using the IP-based adaptive authentication template, you can specify network ranges using the ip address so that users logging in from an external network that is not listed in the authentication script are prompted to perform an additional level of authentication. Users logging in from the internally configured network specified on the script, can simply provide their credentials (basic authentication) to access a resource.

----

{!fragments/adaptive-auth-samples.md!}

----

## Configure IP-based authentication

1.  Click **Service Providers > List**.

2.  Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3.  Expand the **Local and Outbound Configuration** section and click **Advanced Authentication**.

4.  Expand **Script Based Conditional Authentication**.

5.  Click **Templates** on the right side of the **Script Based Conditional Authentication** field and then click **IP-Based**. 

    ![ip-based-template](../assets/img/samples/ip-based-template.png)

6.  Click **Ok**. The authentication script and authentication steps are configured. 
    
    The authentication script prompts the second step of authentication for users who log in from an IP address that is not included within the network range configured in the script. 
    
7. To try out this scenario, run the following command on a terminal window to enter the IP address of your machine to define it as an internal network.

    ``` java
    var corpNetwork = ['192.168.1.0/24', '10.100.0.0/16'];
    ```

8. The authentication steps added are `totp` and `fido`. However, these are authentication steps that you would normally use in production. 

    To try out sample authenticators with the sample application, delete the two
    authenticators and add the following sample authenticators instead.

    1.  Click **Delete** to remove the `totp` authenticator from Step 2 (the
        second authentication step).
        
        ![delete authenticator](../assets/img/samples/delete-authenticator-1.png)
        
    2.  Select **Demo Hardware Key Authenticator** and click **Add**.  
        ![add new authenticator](../assets/img/samples/add-new-authenticator.png)

9.  Click **Update**.

----

## Add a user


1.  Start the server and log in to the [management console](insertlink).

2.  Create a new user named 'Alex' with login permission. Do not assign any roles.

    For instructions, see [Adding Users and Roles](insertlink).

----

## Try it out

1.  Access the following sample PickUp application URL:

    <http://localhost.com:8080/saml2-web-app-pickup-dispatch.com>

2.  Click **Login** and enter Alex's credentials. 

    Note that you are successfully logged in after only the basic authentication step because you are logging in from an IP address that is within the configured network.

3.  Log out of the Pickup application.

4. On the management console, click **Service Providers>List**.

5.  Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

6.  Edit the authentication script in the **Script Based Conditional Authentication** field and enter an IP address that is outside your
    network range.

    ``` java
    var corpNetwork = ['192.168.1.0/24', '10.100.0.0/16'];
    ```

7.  Click **Update**.

8.  Access the following sample PickUp application URL:

    <http://localhost.com:8080/saml2-web-app-pickup-dispatch.com>

9. Click **Login** and enter Alex's credentials. 

    Note that you are now prompted to provide hardware key authentication because you are logging in from an IP address that is external to the configured network.

    ![hardware-key-authenticator](../assets/img/samples/hardware-key-authenticator.png)

    !!! tip
        You can also try this scenario with two different machines
        in different networks to simulate a real world scenario.
