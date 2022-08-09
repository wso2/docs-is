# Configure reCAPTCHA for Single Sign-On

This topic guides you through configuring reCAPTCHA for the single sign
on flow. By configuring reCAPTCHA, you can mitigate or block brute force
attacks.

!!! Info 
    -   For more information on configuring single sign-on, see [Configuring
    Single Sign-On]({{base_path}}/guides/login/enable-single-sign-on/).
    -   For more information on brute force attacks, see [Mitigating Brute
    Force Attacks]({{base_path}}/deploy/mitigate-attacks/mitigate-brute-force-attacks/).

---

{!./includes/configure-recaptcha-api-keys.md !}

---

{!./includes/set-up-recaptcha.md !}

## Configure reCAPTCHA for SSO

1. Log in to the management console  (`https://<IS_HOST>:<IS_PORT>/carbon`).

2. Click **Main** > **Identity** > **Identity Providers** > **Resident**.

3. Expand the **Login Attempts Security** tab. Then, expand the **reCaptcha for SSO Login** tab.

4. Select the relevant option according to your requirement:

    - **Always prompt reCaptcha:** 

        Select this option to prompt users for reCAPTCHA with every SSO login attempt. 

    - **Prompt reCaptcha after max failed attempts:** 
    
        Select this option to prompt reCAPTCHA only after the number of max failed attempts exceed. 
    
        If you select this option, enter a value for the **Max failed attempts for reCaptcha** field as well. For example, if you enter 3, reCAPTCHA will be re-enabled after 3 failed attempts.  
        
        ![configure-captcha-for-sso]({{base_path}}/assets/img/guides/recaptcha-sso.png)
        
        Note the following when selecting this option:
        
        - Account locking must be enabled to enable **Prompt reCaptcha after max failed attempts**.

        - The **Max failed attempts for reCaptcha** value must be lower than the **Maximum failed login attempts** value configured under the **Account Lock** tab.
    
          ![configure-account-locking]({{base_path}}/assets/img/guides/configure-account-locking.png)
    
5.  You have now successfully configured reCAPTCHA for the single sign
    on flow. If the number of failed attempts reaches the maximum
    configured value, the reCAPTCHA logo appears at the bottom right of the screen.  

    ![captcha-login-failed]({{base_path}}/assets/img/guides/captcha-login-failed.png)

!!! Info
     If the user exceeds the maximum allowed failed login attempts as well, be sure to [configure email notifications for account locking]({{base_path}}/guides/tenants/email-account-locking).
    

!!! info "Related topics"
    - [Concept: Single Sign-On]({{base_path}}/references/concepts/single-sign-on)
