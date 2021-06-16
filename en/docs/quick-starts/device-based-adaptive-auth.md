# Configure Device-Based Adaptive Authentication

This page guides you through configuring device-based adaptive authentication for a sample web application using a sample hardware key authenticator. 

----

## Scenario

The instructions below guide you through specifying authentication steps based on the device that the user uses to log in to the application. In this example, if the user uses a new device or a new browser to log in to the application, the user is prompted for a second step of authentication. The new device or browser is identified by a cookie, therefore, once the cookie expires (this expiry time is specified in the authentication script), the same browser or device is considered as a new device.

----

{!fragments/adaptive-auth-samples.md!}

----

## Configure device-based authentication

1.  Navigate to **Main** > **Identity** > **Service Providers** > **List**.

2.  Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3.  Expand the **Local and Outbound Configuration** section and click **Advanced Authentication**.

4.  Expand **Script Based Conditional Authentication**.

5.  Click **Templates** on the right side of the **Script Based Conditional Authentication** field and then click **New-Device-Based**. 

    ![device-based-template](../../assets/img/samples/device-based-template.png)

6.  Click **Ok**. The authentication script and authentication steps
    are configured. 
    
    The authentication script prompts the second step of authentication if the user logs in using a new device or browser that they have not used before. The new device or browser is identified by a cookie.
    
7. Set the `deviceRememberPeriod` to specify how long the device should be considered as a trusted device. 

    Once this time period has elapsed, the device is considered as a new device. The time period is set to two years by default.
    
    ``` java
    var deviceRememberPeriod = 60 * 60 * 24 * 365 * 2; 
    ```

8. The authentication steps added are `totp` and `fido`. However, these are authentication steps that you would normally use in production. 

    To try out sample authenticators with the sample application, delete the two
    authenticators and add the following sample authenticators instead.

    1.  Click **Delete** to remove the `totp` authenticator from Step 2 (the
        second authentication step).
        
        ![Delete authenticator](../../assets/img/samples/delete-authenticator-1.png)
        
    2.  Select **Demo Hardware Key Authenticator** and click **Add**.
      
        ![Add new authenticator](../../assets/img/samples/add-new-authenticator.png)

9.  Click **Update**.

----

## Add a user


1.  Start the server and log in to the Management Console (`https://<IS_HOST>:<PORT>/carbon`).

2.  Create a new user named 'Kim' with login permission. Do not assign any roles.

    For instructions, see [Add a User](../../guides/identity-lifecycles/admin-creation-workflow/).

----

## Try it out

1.  Access the following sample Pickup Dispatch application URL:
    
    `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com`

    ![Pickup Dispatch login](../../assets/img/samples/dispatch-login.png)

2.  Click **Login** and enter Kim's credentials. 

    Note that you are prompted for hardware key authentication because Kim has never logged in from this device or browser before.  

3.  Enter the 4-digit key and click **Sign-In**. 

    You are successfully logged in to the application.  

    ![Hardware key authenticator](../../assets/img/samples/hardware-key-authenticator.png) 

4.  Log out and log in again using Kim's credentials on the same browser window. 

    Note that you are logged in successfully without being prompted for hardware key authentication again. This is because this browser and device is now trusted.  

5.  Open a new browser window of a different browser and access the
    PickUp application URL: `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com`

6.  Click **Login** and enter Kim's credentials. 

    Note that you are now prompted for hardware key authentication again since Kim has never logged in using this particular browser before.

7.  Enter the 4-digit key and click **Sign In**. 

    You are successfully logged in to the application.