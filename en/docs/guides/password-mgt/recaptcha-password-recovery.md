# Configure reCAPTCHA for Password Recovery

The password account recovery feature implemented in the WSO2 Identity Server helps to recover the password of the account in case the user forgets it. This recovery process can also be secured with captcha verification.

By configuring reCAPTCHA, you can mitigate or block brute force attacks.

!!! info 
    For more information on setting up password recovery, see [Password Recovery Using Email Verification]({{base_path}}/guides/password-mgt/recover-password) 
    and [Password Recovery Using Challenge Question]({{base_path}}/guides/password-mgt/challenge-question).

    For more information on brute force attacks, see [Mitigating Brute Force
    Attacks]({{base_path}}/deploy/mitigate-attacks/mitigate-brute-force-attacks).

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

{!./includes/set-up-recaptcha.md !}

There are two ways to configure this feature.

---

### Enable password recovery with reCAPTCHA for a tenant

Follow the instructions given below to configure password recovery with
reCAPTCHA for a specific tenant.

1.  Enable the **EnableMultiTenancy** context-parameter in the
    **web.xml** file of accountrecoveryendpoint available in 
    `<IS_HOME>/repository/deployment/server/webapps/accountrecoveryendpoint/WEB-INF` directory.
    
    ```
    <context-param>
        <param-name>EnableMultiTenancy</param-name>
        <param-value>false</param-value>
    </context-param>
    ```

2.  Start WSO2 Identity Server and log in to the management console (`https://<IS_HOST>:<PORT>/carbon`) as a tenant
    admin.

3.  On the **Main** tab, click **Identity** > **Identity Provider** > **Resident
    Identity Provider**.
    
4.  Expand the **Account Management** tab, then click on
    **Account Recovery.**

5.  Select **Enable reCaptcha for password recovery**.

    ![enable-recaptcha]({{base_path}}/assets/img/guides/enable-recaptcha.png) 

6.  You have now successfully configured reCAPTCHA for the password
    recovery flow. Start WSO2 Identity Server and log in to the My Account (`https://<HOST>:<PORT>/myaccount`) application.

7.  Click **Password**.
    
    ![forgot-password]({{base_path}}/assets/img/guides/forgotten-password-option.png)

8.  You are redirected to the **Recover Password** page where the reCAPTCHA is displayed.

    ![recover-password]({{base_path}}/assets/img/guides/recover-password-with-recaptcha.png)

---

### Enable password recovery with reCAPTCHA globally

Alternatively, follow the instructions given below to configure password recovery with
reCAPTCHA globally.  

1.  Add the following properties to the `deployment.toml` file in the `IS_HOME/repository/conf` folder to enable 
password recovery with reCAPTCHA.

    !!! tip
    
        To avoid any configuration issues, perform **step-1** before
        starting the WSO2 Identity Server product instance.
    
    ``` toml    
    [identity_mgt.password_reset_email] 
    enable_recaptcha= true
    ```

2.  You have now successfully configured reCAPTCHA for the password
    recovery flow. Start WSO2 Identity Server and log in to the My Account (`https://<HOST>:<PORT>/myaccount`) application.

3.  Click **Password**.

    ![forgot-password]({{base_path}}/assets/img/guides/forgotten-password-option.png)

4.  You are redirected to the **Recover Password** page where the reCAPTCHA is displayed.

    ![recover-password-with-recaptcha]({{base_path}}/assets/img/guides/recover-password-with-recaptcha.png)

---

!!! info "Related topics"
    - [Guide: Recover password via Email]({{base_path}}/guides/password-mgt/recover-password)
    - [Guide: Recover password via Challenge Questions]({{base_path}}/guides/password-mgt/challenge-question)
