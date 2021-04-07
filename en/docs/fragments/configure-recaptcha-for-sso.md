
1. Log in to the management console.

2. Click **Resident** under **Identity Providers** found in the **Main** tab.

3. Expand the **Login Attempts Security** tab. Then, expand the **reCaptcha for SSO Login** tab.

4. Select the relevant option according to your requirement:

    - **Always prompt reCaptcha:** 

        Select this option to prompt users for reCaptcha with every SSO login attempt. 

    - **Prompt reCaptcha after max failed attempts:** 
    
        Select this option to prompt reCAPTCHA only after the number of max failed attempts has been exceeded. 
    
        If this option is selected, enter a value for the **Max failed attempts for reCaptcha** field as well. For example, if you enter 3, reCaptcha will be re-enabled after 3 failed attempts.  
        
        ![configure-captcha-for-sso](../../../assets/img/guides/recaptcha-sso.png)
        
        Note the following when selecting this option:
        
        - Account locking must be enabled to enable **Prompt reCaptcha after max failed attempts**.

        - The **Max failed attempts for reCaptcha** value must be lower than the **Maximum failed login attempts** value configured under the **Account Lock** tab.
    
          ![configure-account-locking](../../../assets/img/guides/configure-account-locking.png)
    
5.  You have now successfully configured reCAPTCHA for the single sign
    on flow. If the number of failed attempts reaches the maximum
    configured value, the following reCAPTCHA window appears.  

    ![captcha-login-failed](../../../assets/img/guides/captcha-login-failed.png)
       
    
