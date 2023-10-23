# Configuring New-Device-Based Adaptive Authentication

This scenario demonstrates new-device-based adaptive authentication in
WSO2 Identity Server using sample authenticators. The instructions below
guide you through specifying authentication steps based on the device
that the user uses to log in to the application. In this example, if the
user uses a new device or a new browser to log in to the application,
the user is prompted for a second step of authentication. The new device
or browser is identified by a cookie, therefore, once the cookie expires
(this expiry time is specified in the authentication script), the same
browser or device is considered as a new device.

Follow the instructions given in the sections below to set this up.

!!! tip "Before you begin"
    
    -   Set up the service provider and sample application for adaptive
        authentication. For instructions on how to do this, see [Configuring
        a Service Provider for Adaptive
        Authentication](../../learn/configuring-a-service-provider-for-adaptive-authentication).
    -   For more information about adaptive authentication with WSO2
        Identity Server, see [Adaptive
        Authentication](../../learn/adaptive-authentication).
    
### Configuring the sample scenario

1.  Log in to the management console.
2.  Create a new user called "Kim".
3.  Navigate to **Service Providers\>List** and click **Edit** on the
    `              saml2-web-app-pickup-dispatch.com             `
    service provider.
4.  Expand the **Local and Outbound Configuration** section and click
    **Advanced Authentication**.
5.  Click on **Templates** on the right side of the **Script Based
    Conditional Authentication** field and then click
    **New-Device-Based**.  
    ![template-config-for-new-device-based-authentication](../assets/img/tutorials/template-config-for-new-device-based-authentication.png)
6.  Click **Ok**. The authentication script and authentication steps
    are configured. The authentication script prompts the second step of
    authentication if the user logs in using a new device or browser
    that they have not used before. The new device or browser is
    identified by a cookie.  

    !!! tip
    
        You can set the `           device          `
        `           Remember          ` `           Period          ` to
        specify how long the device should be considered as a trusted
        device. Once this time period has elapsed, the device is considered
        as a new device. The time period is set to two years by default.
    
        ``` java
            var deviceRememberPeriod = 60 * 60 * 24 * 365 * 2; ```


7.  The second authentication step that is added is
    `          totp.         ` However, `          totp         ` is an
    authentication step that you would normally use in production. To
    try out this scenario sample authenticators with the sample
    application, delete the `          totp         ` authenticator and
    add the following demo authenticator instead.
    1.  Click **Delete** to remove the `            totp           `
        authenticator from Step 2 (the second authentication step).  
        ![second-step-for-new-device-authentication](../assets/img/tutorials/second-step-for-new-device-authentication.png)
    2.  Select **Demo Hardware Key Authenticator** and click **Add**.  
        ![demo-hardware-key-authenticator](../assets/img/tutorials/demo-hardware-key-authenticator.png)
8.  Click **Update**.

### Trying out the sample scenario

1.  Access the following sample PickUp application URL:
    <http://localhost.com:8080/saml2-web-app-pickup-dispatch.com>
2.  Click **Login** and enter Kim's credentials. Note that you are
    prompted for hardware key authentication because Kim has never
    logged in from this device or browser before.  
    ![login-attempt-for-new-device-based-authentication](../assets/img/tutorials/login-attempt-for-new-device-based-authentication.png)
3.  Enter the 4 digit key and click **Sign-In**. You are successfully
    logged in to the application.  
    ![signing-in-with-four-digit-key](../assets/img/tutorials/signing-in-with-four-digit-key.png)  
4.  Log out and log in again using Kim's credentials on the same browser
    window. Note that you are logged in successfully without being
    prompted for hardware key authentication again. This is because this
    browser and device is now trusted.  
5.  Open a new browser window of a different browser and access the
    PickUp application URL:
    <http://localhost.com:8080/saml2-web-app-pickup-dispatch.com>
6.  Click Login and enter Kim's credentials. Note that you are now
    prompted for hardware key authentication again since Kim has never
    logged in using this particular browser before.
7.  Enter the 4 digit key and click **Sign In**. You are successfully
    logged in to the application.

