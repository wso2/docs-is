# Configuring reCaptcha for Username Recovery

The user account recovery feature implemented in the WSO2 Identity
Server helps to recover the username of the account in case the user
forgets it. This recovery process can also be secured with captcha
verification.

By configuring reCaptcha, you can mitigate or block brute force attacks.

!!! note
    
    For more information on setting up username recovery, see [Username
    Recovery](../../learn/username-recovery).
    
    For more information on brute force attacks, see [Mitigating Brute Force
    Attacks](../../administer/mitigating-brute-force-attacks)
.
    

There are two ways to configure this feature.

### Configuring username recovery with reCaptcha for a tenant

Follow the instructions given below to configure username recovery with
reCaptcha for a specific tenant.

1.  Set up reCaptcha with WSO2 Identity Server. For instructions on how
    to do this, and for more information about reCaptcha, see [Setting Up ReCaptcha](../../learn/setting-up-recaptcha)
.
2.  Enable the **EnableMultiTenancy** context-parameter in the
    **accountreoceryendpoint web.xml** file.
3.  Start WSO2 Identity Server and log into the [management
    console](https://localhost:9443/carbon/admin/login.jsp) as tenant
    admin.
4.  On the **Main** tab, click on **Identity Provider** → **Resident
    Identity Provider**.

5.  Expand the **Account Management Policies** tab, then click on
    **Account Recovery.**

6.  Select the **Enable reCaptcha for Username Recovery** checkbox to
    enable reCaptcha for the username recovery flow.

    ![enable-recaptcha](../assets/img/using-wso2-identity-server/enable-recaptcha.png)

7.  You have now successfully configured reCaptcha for the username
    recovery flow. Start the WSO2 Identity Server and log into the end
    user [my account](https://localhost:9443/myaccount).

    !!! tip
    
        If you have changed the port offset or modified the hostname, change
        the port or hostname accordingly.
    

8.  Click on **Forgot Username**.

![forgot-username](../assets/img/using-wso2-identity-server/register-now-option.png)

  

Enter the domain name in the page that appears next.

![tenant-domain-name](../assets/img/using-wso2-identity-server/tenant-domain-name.png)

  

Clicking on **Forgot Username** redirects you to the
following page where you can select the recaptcha option for username
recovery.


![proceed-to-username-recovery](../assets/img/using-wso2-identity-server/recaptcha-for-username-recovery.png)

### Configuring username recovery with reCaptcha globally

Follow the instructions given below to configure username recovery with
reCaptcha globally.  

1.  Add the following properties to the `deployment.toml` file in the `IS_HOME/repository/conf` folder to enable 
username recovery with reCaptcha.
    
    !!! tip
        To avoid any configuration issues, perform **Step-1** before starting the WSO2 Identity Server product instance.
        
    ``` toml    
    [identity_mgt.username_recovery.email] 
    enable_recaptcha= true
    ```

2.  Set up reCaptcha with WSO2 Identity Server. For instructions on how
    to do this and more information about reCaptcha, see [Setting Up
    ReCaptcha](../../learn/setting-up-recaptcha)
.

3.  You have now successfully configured reCaptcha for the username
    recovery flow. Start WSO2 Identity Server and log into the end user
    [my account](https://localhost:9443/myaccount).

    !!! tip
    
        If you have changed the port offset or modified the hostname, change
        the port or hostname accordingly.
    

4.  Click the Forgot Username link.

![forgot-username-link](../assets/img/using-wso2-identity-server/register-now-option.png)

  

Clicking on **Forgot Username** redirects you to the following page
where you can select the recaptcha option for username recovery.

![recaptcha-for-username-recovery](../assets/img/using-wso2-identity-server/recaptcha-for-username-recovery.png)

  
  
  
