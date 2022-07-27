# Recover Password via Email

WSO2 Identity Server enables resetting user passwords by emailing a password reset link to the user’s registered email Id.
    
## Set up notifications

Follow the steps below to configure WSO2 Identity Server to enable password reset via email notifications.  

-   [Enable the email sending configurations]({{base_path}}/deploy/configure-email-sending) of the WSO2 Identity Server.

-   Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory and check whether the following listener 
    configs are in place.
    
    ```
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

	!!! info 
        This is already configured this way by default. You can skip this step if you have not changed this configuration previously.

## Enable password recovery

Follow the steps given below to enable password recovery using email.

1.	Sign in to the WSO2 Identity Server Management Console as an administrator.

2.	Go to **Main** > **Identity Providers** > **Resident** and expand **Account Management**. 

3.  Expand **Account Recovery** and elect **Notification based password recovery**.

    ![notification-based-password-recovery-option]({{base_path}}/assets/img/guides/notification-based-password-recovery-option.png)

4.	Click **Update** to save the changes.

       
## Try it out

Follow the steps given below to try out password reset using email verification.

1. Access the WSO2 Identity Server My Account application and click **Password**.

    ![forgotten-password-option]({{base_path}}/assets/img/guides/forgotten-password-option.png)

2.  Enter the username of the newly created user.

    !! info
        If multiple recovery options are displayed, select the **Recover with Mail** option.

    ![recover-password-email-option.png]({{base_path}}/assets/img/guides/recover-password-email-option.png)
    
3.	Click **Submit** to initiate password recovery

4.  Log in to the email account you provided in the user profile. 
    
    !!! info
        You will see a new email with a password reset request.
    
4.  Follow the link provided in the email to reset the password. 

You can now log in to the My Account (`https://<HOST>:<PORT>/myaccount`) application successfully as the user you created above using the new password.

<!--

## Recover password using the REST API

You can use the following CURL command to recover a password using REST API. 

### Send recovery notification

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

### Update password

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

---

## Resend email notification
 
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
-->

!!! info "Related topics"
    - [Guide: Recover password via Challenge Questions]({{base_path}}/guides/password-mgt/challenge-question)
