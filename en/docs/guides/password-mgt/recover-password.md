# Password Recovery Via Email

WSO2 Identity Server enables resetting user passwords by emailing a password reset link to the user’s registered email Id.

## Prerequisites

-   If you have migrated from a previous IS version, ensure that the `IdentityMgtEventListener` with the ` orderId=50 ` is set to **false** and that the Identity Listeners with ` orderId=95 ` and `orderId=97 ` are set to **true** in the `<IS_HOME>/repository/conf/deployment.toml ` file.
    
    !!! Note 
        If there are no such entries for `event.default_listener.xxx` in `deployment.toml`, you can skip this configuration. 
        
    ``` toml
    [event.default_listener.identity_mgt]
    priority= "50"
    enable = false
    [event.default_listener.governance_identity_mgt]
    priority= "95"
    enable = true
    [event.default_listener.governance_identity_store]
    priority= "97"
    enable = true
    ```

-   [Enable the email sending configurations]({{base_path}}/deploy/configure-email-sending) of the WSO2 Identity Server.

    !!! tip
        The **AccountConfirmation** template is used to send email notifications.

        You can edit and customize the email template. For more information on how to do this, see [Customizing Automated Emails]({{base_path}}/guides/tenants/customize-automated-mails/).

    
## Enable password recovery via email

### Enable password recovery via email for a specific tenant

Follow the steps below to configure WSO2 Identity Server to enable password reset via email notifications.  

1.	Sign in to the WSO2 Identity Server Management Console (`https://<HOST>:<PORT>/carbon`) as an administrator. 	 

2.	On the **Main** menu of the Management Console, click **Identity > Identity Providers > Resident**.

	![resident-idp]({{base_path}}/assets/img/fragments/resident-idp.png) 

3.	Under the **Account Management** section, click **Account Recovery**.

    ![account-recovery-option]({{base_path}}/assets/img/fragments/account-recovery-option.png) 

4.	Select **Notification based password recovery**.

    ![notification-based-password-recovery-option]({{base_path}}/assets/img/guides/notification-based-password-recovery-option.png)

    !!! note
        Select **Enable reCaptcha for password recovery** to enable reCAPTCHA for password recovery via email. See [Setting Up reCAPTCHA]({{base_path}}/deploy/configure-recaptcha) for more information.

5.	Click **Update**. 

### Enable password recovery via email globally

1.  Navigate to the `<IS_HOME>/repository/conf/deployment.toml`file and add the following configurations.

    !!! tip
        To avoid any configuration issues, do this before starting the WSO2 Identity Server product instance.
    

    ```toml
    [identity_mgt.password_reset_email]
    enable_password_reset_email=true      
    ```

    !!! note
        If you want to enable reCAPTCHA for password recovery via email, you can set `enable_recaptcha` true as a property of `[identity_mgt.password_reset_email]` in the `deployment.toml` file. See [Setting Up reCAPTCHA]({{base_path}}/deploy/configure-recaptcha) for more information.

        ``` toml
        enable_recaptcha=true
        ```

2.  You have now successfully configured reCAPTCHA for the password recovery flow.

       
## Try it out       
### Use the My Account portal 

1. Access the WSO2 Identity Server My Account (`https://<HOST>:<PORT>/myaccount`) application.

2.	Click **Password**.

    ![forgotten-password-option]({{base_path}}/assets/img/guides/forgotten-password-option.png)

3.	Enter the user name of the newly created user. If multiple recovery options are displayed, select the **Recover with Mail** option.

    ![recover-password-email-option.png]({{base_path}}/assets/img/guides/recover-password-email-option.png)
    
4.	Click **Submit**. 

5.  Log in to the email account you provided in the user profile of the user you created above. You will see a new email with a password reset request.
    
6.  Follow the link provided in the email to reset the password. You can
    now log in to the My Account (`https://<HOST>:<PORT>/myaccount`) application
    successfully as the user you created above using the new password.


### Use the REST API

You can use the following CURL command to recover a password using REST API. 

#### Send recovery notification

This API is used to send password recovery confirmation over defined channels such as email or SMS.

!!! abstract ""
    **Request**
    ```curl
    curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{"user": {"username": "[USERNAME]","realm": "[USER STORE NAME]","tenant-domain":"[TENANT DOMAIN NAME]"},"properties": []}' "https://localhost:9443/api/identity/recovery/v0.9/recover-password?type=email&notify=true"
    ```
    ---
    **Sample Request**
    ```curl
    curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{"user": {"username": "kim","realm": "PRIMARY","tenant-domain":"carbon.super"},"properties": []}' "https://localhost:9443/api/identity/recovery/v0.9/recover-password?type=email&notify=true"
    ```
    ---
    **Sample Response**
    ```curl
    "HTTP/1.1 202 Accepted"
    ```

#### Update password

This API is used to reset user password using the confirmation key received through the recovery process. Input the key and the new password.

!!! abstract ""
    **Request**
    ```curl 
    curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{"key": "[CONFIRMATION KEY]", "password": "[NEW PASSWORD]","properties": []}' "https://localhost:9443/api/identity/recovery/v0.9/set-password"
    ```
    ---
    **Sample Request**
    ```curl 
    curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{"key": "5c765a47-6764-4048-b5cf-55864cb654c0", "password": "Password1!","properties": []}' "https://localhost:9443/api/identity/recovery/v0.9/set-password"
    ```
    ---
    **Sample Response**
    ```curl
    "HTTP/1.1 200 OK"        
    ```

#### Resend email notification
 
 Run the following curl command to resend email notification for password reset. 
 
!!! abstract ""
    **Request**  
    ```curl
    curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{"user":{"username": <USERNAME>,"realm": <REALM>"},"properties": [{"key":"RecoveryScenario","value":"NOTIFICATION_BASED_PW_RECOVERY"}]}' "https://<IS_HOST>:<IS_PORT>/api/identity/user/v1.0/resend-code" -k -v
    ```
    ---
    **Sample**
    ```curl
    curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{"user":{"username": "admin","realm": "PRIMARY"},"properties": [{"key":"RecoveryScenario","value":"NOTIFICATION_BASED_PW_RECOVERY"}]}' "https://localhost:9443/api/identity/user/v1.0/resend-code" -k -v
    ```
    ---
    **Response**
    ```curl
    HTTP/1.1 201 Created
    ```

---

!!! info "Related topics"
    - [Guide: Recover password via Challenge Questions]({{base_path}}/guides/password-mgt/challenge-question)
