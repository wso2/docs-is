# Recover Password via Email

WSO2 Identity Server enables resetting user passwords by emailing a password reset link to the user’s registered email Id.

---

## Prerequisites

**Create a user**

{!fragments/create-user-for-recovery-flows.md!}

**Configure the email adapter to send emails**

Enable the email sending configurations of the WSO2 Identity Server as explained here.

{!fragments/configure-email-sending.md!}

---
    
## Enable password reset via email

Follow the steps below to configure WSO2 Identity Server to enable password reset via email notifications.  

1.	Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory and check whether the following listener 
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

3.	Sign in to the WSO2 Identity Server Management Console (`https://<HOST>:<PORT>/carbon`) as an administrator. 	 

4.	On the **Main** menu of the Management Console, click **Identity > Identity Providers > Resident**.

	![resident-idp](../../../assets/img/fragments/resident-idp.png) 

5.	Under the **Account Management** section, click **Account Recovery**.

    ![account-recovery-option](../../../assets/img/fragments/account-recovery-option.png) 

6.	Select **Notification based password recovery**.

    ![notification-based-password-recovery-option](../../../assets/img/guides/notification-based-password-recovery-option.png)

7.	Click **Update**. 

---
       
## Recover password using the My Account application 

1. Access the WSO2 Identity Server My Account (`https://<HOST>:<PORT>/myaccount`) application.

2.	Click **Password**.

    ![forgotten-password-option](../../../assets/img/guides/forgotten-password-option.png)

3.	Enter the user name of the newly created user. If multiple recovery options are displayed, select the **Recover with Mail** option.

    ![recover-password-email-option.png](../../../assets/img/guides/recover-password-email-option.png)
    
4.	Click **Submit**. 

5.  Log in to the email account you provided in the user profile of the user you created above. You will see a new email with a password reset request.
    
6.  Follow the link provided in the email to reset the password. You can
    now log in to the My Account (`https://<HOST>:<PORT>/myaccount`) application
    successfully as the user you created above using the new password.

---

## Recover password using the REST API

You can use the following CURL command to recover a password using REST API. 

### Send recovery notification

This API is used to send password recovery confirmation over defined channels such as email or SMS.

**Request**

```curl
curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{"user": {"username": "[USERNAME]","realm": "[USER STORE NAME]","tenant-domain":"[TENANT DOMAIN NAME]"},"properties": []}' "https://localhost:9443/api/identity/recovery/v0.9/recover-password?type=email&notify=true"
```

```curl tab="Sample Request"
curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{"user": {"username": "kim","realm": "PRIMARY","tenant-domain":"carbon.super"},"properties": []}' "https://localhost:9443/api/identity/recovery/v0.9/recover-password?type=email&notify=true"
```

```curl tab="Sample Response" 
"HTTP/1.1 202 Accepted"
```

### Update password

This API is used to reset user password using the confirmation key received through the recovery process. Input the key and the new password.

**Request**

```curl 
curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{"key": "[CONFIRMATION KEY]", "password": "[NEW PASSWORD]","properties": []}' "https://localhost:9443/api/identity/recovery/v0.9/set-password"
```

```curl tab="Sample Request" 
curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{"key": "5c765a47-6764-4048-b5cf-55864cb654c0", "password": "Password1!","properties": []}' "https://localhost:9443/api/identity/recovery/v0.9/set-password"
```

```curl tab="Sample Response"
"HTTP/1.1 200 OK"        
```

---

## Resend email notification
 
 Run the following curl command to resend email notification for password reset. 
 
 **Request** 
 
 ```curl
 curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{"user":{"username": <USERNAME>,"realm": <REALM>"},"properties": [{"key":"RecoveryScenario","value":"NOTIFICATION_BASED_PW_RECOVERY"}]}' "https://<IS_HOST>:<IS_PORT>/api/identity/user/v1.0/resend-code" -k -v
 ```
 
 **Sample**
 
 ```curl tab="Request"
 curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{"user":{"username": "admin","realm": "PRIMARY"},"properties": [{"key":"RecoveryScenario","value":"NOTIFICATION_BASED_PW_RECOVERY"}]}' "https://localhost:9443/api/identity/user/v1.0/resend-code" -k -v
 ```
 
 ```curl tab="Response"
 HTTP/1.1 201 Created
 ```

!!! info "Related Topics"
    - [Guide: Recover password via Challenge Questions](../../../guides/password-mgt/challenge-question)
