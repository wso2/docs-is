# Password Recovery Via User-Preferred Notification Channel

This section guides you through setting up password recovery for users to recover a lost or forgotten password.

!!! Note
    Currently, WSO2 IS does not support this feature via the Management Console.

## Password recovery flow

The password recovery flow of WSO2 Identity Server is as follows:

1. User provides a set of unique claims to identify the user account.
2. The API prompts the user to select a channel from the available notification channels for receiving the username recovery notification.
3. The user selects a notification channel.
4. The server sends the recovery notification to the user via the preferred notification channel.
5. If the preferred channel is:
    - **Email**: The user can click the reset link sent to the registered email address and reset the password.
    - **SMS**: The user provides the received One-Time Password (OTP) and resets the password.

The following sections walk you through configuring and trying out password recovery via SMS and Email channels.

??? Warning "If you are migrating from IS 5.10.0 or above"
    If you have migrated from IS 5.10.0 or above, ensure that the `IdentityMgtEventListener` with the `orderId=50` is set to `false` and that the identity listeners with `orderId=95` and `orderId=97` are set to `true` in the `<IS_HOME>/repository/conf/deployment.toml` file.

    You can skip this step if there are no entries for the `event.default_listener.xxx` parameter in the `deployment.toml` file.
    
    ``` java
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

## Set up password recovery

Follow the steps given below to recover a user in the super tenant (i.e., `carbon.super`).

1. Add the following properties to the `deployment.toml` file in the `IS_HOME/repository/conf` folder to configure WSO2 Identity Server to send confirmation emails.

    ``` toml
    [output_adapter.email]
    from_address= "wso2iamtest@gmail.com"
    username= "wso2iamtest"
    password= "Wso2@iam70"
    hostname= "smtp.gmail.com"
    port= 587
    enable_start_tls= true
    enable_authentication= true
    ```

    !!! Note
        - Add this configuration only if you wish to configure WSO2 Identity Server to send confirmation emails. See [Configure the Email Sending Module]({{base_path}}/deploy/configure-email-sending/) for more information.
        - Alternatively, you can use your own email managing mechanism.


2. Add the following properties to the `deployment.toml` file.

    ``` toml
    [identity_mgt.notification_channel_recovery]
    recovery_code_validity=2
    resend_code_validity=5
    
    [identity_mgt.password_reset_sms]
    sms_otp_validity=2
    ```

    <table>
       <tr>
           <th>Property Name</th>
           <th>Description</th>
       </tr>
       <tr>
          <td><code>recovery_code_validity</code></td>
          <td>
            Validity period of the recovery code given after initiating username/ password recovery.
            <ul>
                <li>Unit : <code>minutes</code>
                <li>Default value : <code>1</code>
            </ul>
            <div class="admonition note">
                <p class="admonition-title">note</p>
                <p>
                    If you have configured username recovery via the user-preferred notification channel, the above field is already configured.
                </p>
            </div>
          </td>
       </tr>
       <tr>
          <td><code>resend_code_validity</code></td>
          <td>
            Validity period of the recovery code given after initiating password recovery.
            <ul>
                <li>Unit : <code>minutes</code>
                <li>Default value : <code>1</code>
            </ul>
          </td>
       </tr>
       <tr>
         <td><code>sms_otp_validity</code></td>
         <td>
            Validity period of SMS OTP when the selected channel is <code>SMS</code>.
            <ul>
                <li>Unit : <code>minutes</code>
                <li>Default value : <code>1</code>
           </ul>
         </td>
      </tr>
    </table>

3. Add an event publisher to `<IS_HOME/repository/deployment/server/eventpublishers`. 

      You can use the following sample publisher to call a REST service to send confirmation codes. This sample uses the `http output adapter`.

    ??? info "Sample Event Publisher"
        ```
        <?xml version="1.0" encoding="UTF-8"?>
        <eventPublisher name="HTTPOutputEventAdapter" processing="enable"
            statistics="disable" trace="disable" xmlns="http://wso2.org/carbon/eventpublisher">
            <from streamName="id_gov_sms_notify_stream" version="1.0.0"/>
            <mapping customMapping="enable" type="json">
                <inline>{"api_key"="4c9374",
                    "api_secret"="FtqyPE93",
                    "from"="NEXMO",
                    "to"={{mobile}},
                    "text"={{body}}
                    }</inline>
            </mapping>
            <to eventAdapterType="http">
                <property name="http.client.method">httpPost</property>
                <property name="http.url">https://rest.nexmo.com/sms/json</property>
            </to>
        </eventPublisher>
        ```

        This publisher uses NEXMO as the SMS REST service provider. For more information on writing a custom HTTP event publisher, see [HTTP Event Publisher](https://docs.wso2.com/display/DAS300/HTTP+Event+Publisher).  

    !!! note
        If a WSO2 IS instance is already running, restart it to apply the above configurations.

4. On the Management Console, go to **Identity Providers** > **Resident** > **Account Management**, expand **Account Recovery**, and configure the following properties.

    ![password-recovery-configs]({{base_path}}/assets/img/guides/config-password-recovery.png)

    <table>
        <thead>
            <tr class="header">
                <th>Field</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr class="odd">
                <td>Notification based password recovery</td>
                <td>Enable password recovery with notifications for the current tenant domain.</td>
            </tr>
            <tr class="odd">
                <td>Security question based password recovery</td>
                <td>Enable security question-based password recovery.</td>
            </tr>
            <tr class="odd">
                <td>Manage notifications sending internally</td>
                <td>
                    <p>
                        Select to configure WSO2 Identity Server to send confirmation emails to the user.
                        If the client application handles notification sending already, clear this checkbox.
                    </p>
                </td>
            </tr>
            <tr class="odd">
                <td>Notify when recovery success</td>
                <td>Send a notification when password reset is successful.</td>
            </tr>
            <tr class="odd">
                <td>Recovery link expiry time in minutes</td>
                <td>
                    <ul>
                        <li>Validity period of the password reset email link.
                        <li>Unit : <code>minutes</code>
                        <li>Default : <code>1440</code>
                    </ul>
                </td>
            </tr>
            <tr class="odd">
                <td>SMS OTP expiry time</td>
                <td>
                    <ul>
                        <li>Validity period of the password reset OTP.
                        <li>Unit : <code>minutes</code>
                        <li>Default : <code>1</code>
                </td>
            </tr>
        </tbody>
    </table>

## Manage notification templates
This section guides you on how to manage your email and SMS notification templates in WSO2 Identity Server.

### Manage email notification templates

The email notification templates are stored in the `IS_HOME>/repository/conf/email/email-admin-config.xml`
file, and they can be edited using the Management Console.

!!! tip
    The **PasswordReset**, **passwordResetSucess**, and **resendPasswordReset** templates are used to
    send email notifications. You can edit and customize the email templates. For more information,
    see how to [customize automated emails]({{base_path}}/guides/tenants/customize-automated-mails).

### Manage SMS notification templates  
  
The templates for SMS notifications are stored in the registry. Follow the steps below to edit the existing
sms notification templates.

1. Log in to the Management Console and go to **Main > Registry> Browse**.

2. On the **tree view** tab, click **system > config > identity > sms**. This displays all the available SMS notification templates.

    ![sms-notification-templates]({{base_path}}/assets/img/guides/sms-notifiication-templates.png)

3. Select a template and click **en_us** to view the template.

4. Click **Display as text** to view the template or click **Edit as text** to edit the template.

    ![edit-sms-notification-template]({{base_path}}/assets/img/guides/display-sms-template.png)

!!! tip
    The **passwordreset**, **passwordresetsucess**, and **resendpasswordreset** templates are used to send SMS notifications. You can edit and customize the SMS templates. <!--For more information, see [Managing SMS Notification Templates From the Registry](../../learn/managing-sms-templates-from-the-registry).-->

## Try it out

!!! info "Notification mechanisms"
    WSO2 Identity Server provides the functionality to receive account recovery notifications internally or externally.

    - **Internal Notification Management**: Notification sending is managed by WSO2 Identity Server.
        
    - **External Notification Management**: Notification sending is managed by an external notification management mechanism.
    
    !!! note
        To configure external notification management, `disable` the `Enable Internal Notification Management` property in the `Account Recovery` configurations.
        
        ![disable-internal-notifications]({{base_path}}/assets/img/guides/disable-internal-notification.png)

### Create a user for recovery

!!! tip "Before you begin"
    Make sure you have a user with Email or Mobile configured. If you already have a user, skip to the next heading. If not, follow the steps below to create a new user and assign notification channels.

1. Log in to the Management Console and click **Main -> Identity -> Users and Roles -> Add**.

2. Click **Add New User** and enter user credentials.

    !!! Note
        For more details on creating users and roles, see [Adding Users and Roles]({{base_path}}/references/concepts/user-management/user-management/).

3. Go to **Users and Roles > List > Users**.

4. Find the user from the list and click **View Roles**.

5. Click **Permissions** to edit the default permissions.
    ![add-login-permissions]({{base_path}}/assets/img/guides/user-permissions.png)

6. From the list of permissions, select the **Login** permission and click **Update**.

    !!! warning
        This updates the permissions of the role. Therefore, all the users with the current role will receive login permissions.

7. Go to **Users and Roles > List > Users**, click **User Profile**, and update the email and mobile of the user.

### With internal notification management

1. Use the following command to create a username recovery request.

    !!! abstract ""
        **Request Format**
        ```
        curl -X POST "https://localhost:9443/api/users/v1/recovery/password/init" -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"claims\":[{\"uri\":\"http://wso2.org/claims/givenname\",\"value\":\"user1\"}],\"properties\":[{\"key\":\"key\",\"value\":\"value\"}]}"
        ```
        ---
        **Sample Request**
        ```curl
        [
        {
        "mode": "recoverWithNotifications",
        "channelInfo": {
            "recoveryCode": "254d9446-faef-4763-be8a-f71e80c4715b",
            "channels": [
                {
                    "id": "1",
                    "type": "EMAIL",
                    "value": "s********@g***l.com",
                    "preferred": false
                },
                {
                    "id": "2",
                    "type": "SMS",
                    "value": "*******3902",
                    "preferred": true
                }
            ]
        },
        "links": [
            {
                "rel": "next", 
                "href": "/t/carbon.super/api/users/v1/recovery/password/recover",
                "type": "POST"
            }
        ]
        },
        {
        "mode": "recoverWithChallengeQuestions",
        "links": [
            {
            "rel": "next",
            "href": "/t/carbon.superidentity/recovery/v0.9/security-question?username=sominda2",
            "type": "GET"
            }
        ]
        }
        ]
        ```

    !!! note
        - The validity period of the recovery code is determined by the second step of [configuring password recovery](#set-up-password-recovery).  
        - To try out password recovery with a challenge question, see [Configuring Password Reset with Challenge Questions]({{base_path}}/guides/password-mgt/challenge-question/).

2. Use the `recoveryCode` and a preferred channel `id` to get notifications via that channel.

    !!! abstract ""
        **Request Format**
        ```
        curl -X POST "https://localhost:9443/api/users/v1/recovery/password/recover" -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"recoveryCode\":\"1234-5678-2455-3433\",\"channelId\":\"1\",\"properties\":[{\"key\":\"key\",\"value\":\"value\"}]}"
        ```
        ---
        **Sample Request**
        ```curl
        {
        "code": "PWR-02001",
        "message": "Password recovery information sent via user preferred notification channel.",
        "notificationChannel": "EMAIL",
        "resendCode": "8dde8fd4-c58d-4408-a835-a9954ebc278a",
        "links": [
            {
                "rel": "next",
                "href": "/t/carbon.super/api/users/v1/recovery/password/confirm",
                "type": "POST"
            },
            {
                "rel": "resend",
                "href": "/t/carbon.super/api/users/v1/recovery/password/resend",
                "type": "POST"
            }
        ]
        }
        ```

3. If you want to resend notifications to the user via the notified channel in the above step, use the `resendCode` with the resend notifications API.

    !!! abstract ""
        **Request Format**
        ```
        curl -X POST "https://localhost:9443/api/users/v1/recovery/password/resend" -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"resendCode\":\"1234-2ws34-1234\",\"properties\":[{\"key\":\"key\",\"value\":\"value\"}]}"
        ```
        ---
        **Sample Request**
        ```curl
        {
        "code": "UAR-02001",
        "message": "Confirmation code resent to the user.",
        "notificationChannel": "EMAIL",
        "resendCode": "8ebefae5-0a80-4edf-ac2d-6034384e45c0",
        "links": [
            {
                "rel": "next",
                "href": "/t/carbon.super/api/users/v1/recovery/password/confirm",
                "type": "POST"
            },
            {
                "rel": "resend",
                "href": "/t/carbon.super/api/users/v1/recovery/password/resend",
                "type": "POST"
            }
        ]
        }
        ```

4. Use the confirmation code received by the user to verify the confirmation code.

    !!! abstract ""
        **Request Format**
        ```
        curl -X POST "https://localhost:9443/api/users/v1/recovery/password/confirm" -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"confirmationCode\":\"1234-2ws34-12345\",\"properties\":[{\"key\":\"key\",\"value\":\"value\"}]}"
        ```
        ---
        **Sample Request**
        ```curl
        {
            "resetCode": "90b9ce11-7642-4f50-aa06-386011b7de66",
            "links": [
                {
                    "rel": "next",
                    "href": "/t/carbon.super/api/users/v1/recovery/password/reset",
                    "type": "POST"
                }
            ]
        }
        ```

5. Use the `resetCode` and the new password to update the existing password and recover the account.

    !!! abstract ""
        **Request Format**
        ```
        curl -X POST "https://localhost:9443/api/users/v1/recovery/password/reset" -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"resetCode\":\"aefaef12-951e-4a42-b01b-3118798f58c3\",\"password\":\"newPassword\",\"properties\":[{\"key\":\"key\",\"value\":\"value\"}]}"
        ```
        ---
        **Sample Request**
        ```curl
        {
            "code": "PWR-02005",
            "message": "Successful password reset."
        }
        ```

### With external notification management

1. Use the following command to create a username recovery request.

    !!! abstract ""
        **Request Format**
        ```
        curl -X POST "https://localhost:9443/api/users/v1/recovery/password/init" -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"claims\":[{\"uri\":\"http://wso2.org/claims/givenname\",\"value\":\"user1\"}],\"properties\":[{\"key\":\"key\",\"value\":\"value\"}]}"
        ```
        ---
        **Sample Request**
        ```curl
        [{
        "mode": "recoverWithNotifications",
        "channelInfo": {
            "recoveryCode": "9ed0ed58-593a-48d8-90b3-ae745a6d7aae",
            "channels": [
                {
                    "id": "1",
                    "type": "EXTERNAL",
                    "value": ""
                }
            ]
        },
        "links": [
            {
                "rel": "next",
                "href": "/t/carbon.super/api/users/v1/recovery/username/recover",
                "type": "POST"
            }
        ]
        }]
        ```

    !!! note
            The validity period of the recovery code is determined by the [2nd step of configuring password recovery](#password-recovery-flow)

2. Use the `recoveryCode` and a channel `id` to get the recovered username.

    !!! abstract ""
        **Request Format**
        ```
        curl -X POST "https://localhost:9443/api/users/v1/recovery/password/recover" -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"recoveryCode\":\"1234-5678-2455-3433\",\"channelId\":\"1\",\"properties\":[{\"key\":\"key\",\"value\":\"value\"}]}"
        ```
        ---
        **Sample Request**
        ```curl
        {
        "code": "PWR-02001",
        "message": "Password recovery information sent via user preferred notification channel.",
        "notificationChannel": "EXTERNAL",
        "confirmationCode": "90b9ce11-7642-4f50-aa06-386011b7de66",
        "resendCode": "b24bcfc0-3ee3-4a7d-964c-e3e6e3098c08",
        "links": [
            {
                "rel": "next",
                "href": "/t/carbon.super/api/users/v1/recovery/password/confirm",
                "type": "POST"
            },
            {
                "rel": "resend",
                "href": "/t/carbon.super/api/users/v1/recovery/password/resend",
                "type": "POST"
            }
        ]
        }
        ```

3. If you want to resend the notifications, use the `resendCode` with the resend notifications API.

    !!! abstract ""
        **Request Format**
        ```
        curl -X POST "https://localhost:9443/api/users/v1/recovery/password/resend" -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"resendCode\":\"1234-2ws34-1234\",\"properties\":[{\"key\":\"key\",\"value\":\"value\"}]}"
        ```
        ---
        **Sample Request**
        ```curl
        {
        "code": "UAR-02001",
        "message": "Confirmation code resent to the user.",
        "notificationChannel": "EXTERNAL",
        "confirmationCode": "8ebcf3a1-b278-415c-b077-9b15fbf9bfdf",
        "resendCode": "b037478d-15e1-4f3d-ab7b-ad917dc73904",
        "links": [
            {
                "rel": "next",
                "href": "/t/carbon.super/api/users/v1/recovery/password/confirm",
                "type": "POST"
            },
            {
                "rel": "resend",
                "href": "/t/carbon.super/api/users/v1/recovery/password/resend",
                "type": "POST"
            }
        ]
        }
        ```

4. Use the `confirmationCode` to verify the password reset.

    !!! abstract ""
        **Request Format**
        ```
        curl -X POST "https://localhost:9443/api/users/v1/recovery/password/confirm" -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"confirmationCode\":\"1234-2ws34-12345\",\"properties\":[{\"key\":\"key\",\"value\":\"value\"}]}"
        ```
        ---
        **Sample Request**
        ```curl
        {
            "resetCode": "90b9ce11-7642-4f50-aa06-386011b7de66",
            "links": [
                {
                    "rel": "next",
                    "href": "/t/carbon.super/api/users/v1/recovery/password/reset",
                    "type": "POST"
                }
            ]
        }
        ```

5. Use the `resetCode` and the new password to update the existing password and recover the account.

    !!! abstract ""
        **Request Format**
        ```
        curl -X POST "https://localhost:9443/api/users/v1/recovery/password/reset" -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"resetCode\":\"aefaef12-951e-4a42-b01b-3118798f58c3\",\"password\":\"newPassword\",\"properties\":[{\"key\":\"key\",\"value\":\"value\"}]}"
        ```
        ---
        **Sample Request**
        ```curl
        {
            "code": "PWR-02005",
            "message": "Successful password reset."
        }
        ```