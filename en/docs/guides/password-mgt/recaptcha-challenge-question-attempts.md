# Configure reCAPTCHA On Invalid Challenge Question Attempts

This topic guides you through configuring reCAPTCHA for secret questions in the password recovery flow. By configuring reCAPTCHA, you can mitigate or block brute force attacks.

!!! info 
        -  For more information on setting up password recovery with secret questions, see [Enable password reset via Challenge Questions]({{base_path}}/guides/password-mgt/challenge-question/).
        -  For more information on brute force attacks, see [Mitigating Brute Force Attacks]({{base_path}}/deploy/mitigate-attacks/mitigate-brute-force-attacks).

---

## Configure reCAPTCHA API keys

[reCAPTCHA](https://developers.google.com/recaptcha/) is a free widget service provided by Google that can be used for protection against spam or other forms of internet abuse by verifying whether a user is a human or a robot. The following section guides you through setting up reCAPTCHA with WSO2 Identity Server.

First, you need to register and create an API key pair for the required domain. The key pair consists of a site key and secret. The site key is used when a reCAPTCHA widget is displayed on a page. After verification, a new parameter called g-recaptcha-response appears on the form which the user submits. From the server side, you can verify the submitted captcha response by calling the Google API with the secret key.

1.  Go to <https://www.google.com/recaptcha/admin>.

2.  Fill in the fields to register
    your identity server domain and click **Register**. The following
    are sample values:
    -   **Label:** WSO2 Identity Server
    -   Select the reCAPTCHA V2 option.
    -   **Domains:** is.wso2.com  

3.	Accept the terms of service. 

4.  Click **Submit**.

    ![configuring-recaptcha-api-keys]({{base_path}}/assets/img/fragments/recaptcha-new-sso.png) 

5.  Take note of the site key and secret that you receive.
    ![note-site-key-secret]({{base_path}}/assets/img/fragments/copy-key.png) 

---

{!./includes/set-up-recaptcha.md!}

1.  Log in to the management console (`https://<IS_HOST>:<PORT>/carbon`) using administrator credentials (`admin:admin`).

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
    