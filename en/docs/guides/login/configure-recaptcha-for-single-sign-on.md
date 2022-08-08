# Configure reCAPTCHA for Single Sign-On

This topic guides you through configuring reCAPTCHA for the single sign
on flow. By configuring reCAPTCHA, you can mitigate or block brute force
attacks.

!!! Info 
    -   For more information on configuring single sign-on, see [Configuring
    Single Sign-On]({{base_path}}/guides/login/enable-single-sign-on/).
    -   For more information on brute force attacks, see [Mitigating Brute
    Force Attacks]({{base_path}}/deploy/mitigate-attacks/mitigate-brute-force-attacks/).

## Configure reCAPTCHA API keys

[reCAPTCHA](https://developers.google.com/recaptcha/) (v3 and v2) is a free widget service provided by Google that can be used for protection against spam or other forms of internet abuse by verifying whether a user is a human or a robot. The following section guides you through setting up reCAPTCHA with WSO2 Identity Server.

First, you need to register and create an API key pair for the required domain. The key pair consists of a site key and secret key. The site key is used to invoke reCAPTCHA on a page. A new parameter called g-recaptcha-response is embedded to the request when user submits. From the server side, you can verify the submitted captcha response by calling the Google API with the secret key.

!!! Info
    -   The invisible reCAPTCHA v2 is invoked when the user clicks on an existing button. Only the most suspicious traffic will be prompted to solve a captcha.
    -   The reCAPTCHA v3 does not require user interaction, and the user's actions are rated by the Google API by a score (between 0 and 1). 

!!! Note  
    -   For reCAPTCHA v3, you need to determine a threshold value for the score by looking at the traffic at [reCAPTCHA admin console](https://www.google.com/recaptcha/admin).
    -   In the current  implementation, if the  score is less than the threshold, the user request will be blocked by the server.

1.  Go to <https://www.google.com/recaptcha/admin>.

2.  Fill in the fields to register
    your identity server domain and click **Register**. The following
    are sample values:
    -   **Label:** WSO2 Identity Server
    -   Select either invisible reCAPTCHA V2 or reCAPTCHA V3 option.
    -   **Domains:** is.wso2.com  

3.	Accept the terms of service. 

4.  Click **Submit**.

    ![configuring-recaptcha-api-keys]({{base_path}}/assets/img/fragments/recaptcha-new-sso.png) 

5.  Take note of the site key and secret that you receive.
    ![note-site-key-secret]({{base_path}}/assets/img/fragments/copy-key.png) 


---

{!./includes/set-up-recaptcha.md !}

## Configure reCAPTCHA for SSO

1. Log in to the management console  (`https://<IS_HOST>:<IS_PORT>/carbon`).

2. Click **Main** > **Identity** > **Identity Providers** > **Resident**.

3. Expand the **Login Attempts Security** tab. Then, expand the **reCaptcha for SSO Login** tab.

4. Select the relevant option according to your requirement:

    - **Always prompt reCaptcha:** 

        Select this option to prompt users for reCaptcha with every SSO login attempt. 

    - **Prompt reCaptcha after max failed attempts:** 
    
        Select this option to prompt reCAPTCHA only after the number of max failed attempts exceed. 
    
        If you select this option, enter a value for the **Max failed attempts for reCaptcha** field as well. For example, if you enter 3, reCaptcha will be re-enabled after 3 failed attempts.  
        
        ![configure-captcha-for-sso]({{base_path}}/assets/img/guides/recaptcha-sso.png)
        
        Note the following when selecting this option:
        
        - Account locking must be enabled to enable **Prompt reCaptcha after max failed attempts**.

        - The **Max failed attempts for reCaptcha** value must be lower than the **Maximum failed login attempts** value configured under the **Account Lock** tab.
    
          ![configure-account-locking]({{base_path}}/assets/img/guides/configure-account-locking.png)
    
5.  You have now successfully configured reCAPTCHA for the single sign
    on flow. If the number of failed attempts reaches the maximum
    configured value, the following reCAPTCHA window appears.  

    ![captcha-login-failed]({{base_path}}/assets/img/guides/captcha-login-failed.png)

!!! Info
     If the user exceeds the maximum allowed failed login attempts as well, be sure to [configure email notifications for account locking]({{base_path}}/guides/tenants/email-account-locking).
    

!!! info "Related topics"
    - [Concept: Single Sign-On]({{base_path}}/references/concepts/single-sign-on)
