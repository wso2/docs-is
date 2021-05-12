# Configure reCAPTCHA for Password Recovery

The password account recovery feature implemented in the WSO2 Identity Server helps to recover the password of the account in case the user forgets it. This recovery process can also be secured with captcha verification.

By configuring reCAPTCHA, you can mitigate or block brute force attacks.

!!! info 
    For more information on setting up password recovery, see [Password Recovery Using Email Verification](../../../guides/password-mgt/recover-password) 
    and [Password Recovery Using Challenge Question](../../../guides/password-mgt/challenge-question).

    For more information on brute force attacks, see [Mitigating Brute Force
    Attacks](../../../deploy/mitigate-attacks/mitigate-brute-force-attacks).

---

{!fragments/configure-recaptcha-api-keys.md!}

---

{! fragments/set-up-recaptcha.md !}

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

    ![enable-recaptcha](/assets/img/guides/enable-recaptcha.png) 

6.  You have now successfully configured reCAPTCHA for the password
    recovery flow. Start WSO2 Identity Server and log in to the My Account (`https://<HOST>:<PORT>/myaccount`) application.

7.  Click **Password**.
    
    ![forgot-password](/assets/img/guides/forgotten-password-option.png)

8.  You are redirected to the **Recover Password** page where the reCAPTCHA is displayed.

    ![recover-password](/assets/img/guides/recover-password-with-recaptcha.png)

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

    ![forgot-password](/assets/img/guides/forgotten-password-option.png)

4.  You are redirected to the **Recover Password** page where the reCAPTCHA is displayed.

    ![recover-password-with-recaptcha](/assets/img/guides/recover-password-with-recaptcha.png)

---

!!! info "Related Topics"
    - [Guide: Recover password via Email](../../../guides/password-mgt/recover-password)
    - [Guide: Recover password via Challenge Questions](../../../guides/password-mgt/challenge-question)
