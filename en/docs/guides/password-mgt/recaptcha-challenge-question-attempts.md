# Configure reCAPTCHA On Invalid Challenge Question Attempts

This topic guides you through configuring reCAPTCHA for secret questions in the password recovery flow. By configuring reCAPTCHA, you can mitigate or block brute force attacks.

!!! info 
    For more information on setting up password recovery with secret questions, see [Enable password reset via Challenge Questions]({{base_path}}/guides/password-mgt/challenge-question/).

    For more information on brute force attacks, see [Mitigating Brute Force Attacks]({{base_path}}/deploy/mitigate-attacks/mitigate-brute-force-attacks).

## Prerequisites

[Setting Up reCAPTCHA]({{base_path}}/deploy/configure-recaptcha.md) with WSO2 Identity Server.

## Configure reCAPTCHA on invalid challenge question attempts for a specific tenant

1. Start WSO2 Identity Server and log in to the management console as tenant admin.

2.  On the **Main** tab, click **Identity** > **Identity Provider** > **Resident Identity Provider**.

3.  Expand the **Account Management** tab and then expand the **Account Recovery** tab.

4.  Select **Enable reCaptcha for security questions based password recovery** and configure the **Max failed attempts for reCaptcha**.  

    ![enable-security-question-recaptcha]({{base_path}}/assets/img/guides/enable-security-question-recaptcha.png)
    
    !!! note
        This **Max failed attempts for reCaptcha** value should be less than the number of failed attempts configured in the account locking connector.
        
        To view the number of failed attempts configured for the account lock feature, expand the **Login Attempts Security** tab and then expand the **Account Lock** tab.
    
        ![max-failed-login-attempts]({{base_path}}/assets/img/guides/max-failed-login-attempts.png)
    
6.  Expand the **Login Attempts Security** tab and then expand the **Account Lock** tab.     

7.  Select **Lock user accounts**.

    ![account-lock-enabled]({{base_path}}/assets/img/guides/account-lock-enabled.png)
    
8.  Click **Update**.

You have now successfully configured reCAPTCHA for the password recovery with secret questions flow. The reCAPTCHA will be prompted if the user reaches the limit of max failed attempts when providing an answer to a secret question. For instance, since the **Max failed attempts for reCaptcha** was configured as 2 above, if the user answers a question incorrectly twice, the reCAPTCHA will be prompted as seen in the window below.  

![recaptcha-max-failed-attempts-security-questions]({{base_path}}/assets/img/guides/recaptcha-max-failed-attempts-security-questions.png)

---

!!! info "Related topics"
    - [Guide: Enable password reset via Challenge Questions]({{base_path}}/guides/password-mgt/challenge-question)
    - [Guide: Configure reCAPTCHA for Password Recovery]({{base_path}}/guides/password-mgt/recaptcha-password-recovery)
    