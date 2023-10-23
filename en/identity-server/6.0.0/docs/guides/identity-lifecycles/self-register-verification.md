# Account Confirmation methods for Self-Registration

WSO2 Identity Server (WSO2 IS) supports self-registration, allowing users to set up their accounts and receive a confirmation when the account is created.

!!! info
    UI-based [user self-registration]({{base_path}}/guides/identity-lifecycles/self-registration-workflow/) only allows email verification for self-registered user accounts.

WSO2 IS self-registration portal does not support account verification through SMS OTP. Therefore, if a tenant needs to confirm self-registered accounts through SMS OTP, they need to build up their self-registration portal and incorporate the API provided in this guide section.

Users can confirm their accounts via a user-preferred communication channel. Based on the user preference, the user self-registration process supports `email` or `SMS` as the preferred account confirmation channel for the user.

Each channel has the following attributes.

| Channel Type  | Claim | Channel verified claim    |
|---------------|-------|---------------------------|
| SMS   | http://wso2.org/claims/mobile | http://wso2.org/claims/identity/phoneVerified |
| Email | http://wso2.org/claims/emailaddress   | http://wso2.org/claims/identity/emailVerified |

The account confirmation channel is selected based on the following scenarios.

- `SMS`: If the user has provided only the mobile number, the confirmation channel will be SMS.
- `Email`: The confirmation channel will be `email` if the user has provided only the email address.
- Either `SMS` or `email`: If the user has provided a mobile number and email address, the confirmation channel will be either SMS.

!!! note
    - In this case, the account confirmation channel will be the preferred channel selected by the specific user. If the user has not specified any preferred channel, the server-configured channel is selected as the account confirmation channel.

    - Configuring the self-registration verification method is only available via the REST APIs. Currently, WSO2 does not support this feature via the Management Console.

    <!-- to [User Self Registration and Account confirmation via Mobile and Email Channels](../../learn/multi-channel-self-registration-and-account-confirmation). -->

## Configure account confirmation methods on WSO2 IS

The section of the guide walks you through configuring account confirmation methods.

### Set up self-registration on WSO2 IS
To set up self-registration on WSO2 IS:

1. Configure the preferred self-registration verification method provider.
    - [SMS]({{base_path}}/guides/mfa/2fa-sms-otp/)
    - [Email]({{base_path}}/deploy/configure-email-sending)

2. Add the following configurations to the `deployment.toml` file:
    ```toml
    [identity_mgt.user_self_registration]
    default_notification_channel = "<value>"
    enable_resolve_notification_channel = true
    ```

    | Parameter | Description   | Value  |
    |-----------|---------------|---------------|
    | `default_notification_channel`    | This is used to set the default notification mechanism in IS. WSO2 IS will consider `EMAIL` as the default notification channel if this is not configured. | `SMS` or `EMAIL`   |
    | `resolve_notification_channel`    | This resolves the user's preferred notification channel.  | `true`    |

3. Sign in to the WSO2 Identity Server Management Console as an administrator.

4. Enable [User Self Registration]({{base_path}}/guides/identity-lifecycles/self-registration-workflow) for the tenant.

### Create a user

A user can be self-registered on the WSO2 IS using the following methods:

- Using the [default notification channel](#with-the-default-notification-channel) as the account confirmation method for the user.
- Using a [user preferred channel](#with-a-preferred-notification-channel) as the account confirmation method for the user.

#### With the default notification channel
Let's try a scenario where the user has selected `SMS` as the `default_notification_channel`.

Open a terminal and execute the following cURL command.
    ```
    curl -X POST 
    -H "Authorization: Basic <Base64(username:password)>" 
    -H "Content-Type: application/json" 
    -d '{
        "user": {
            "username": "kim",
            "realm": "PRIMARY", 
            "password": "Password12!",
            "claims": [
                {
                    "uri": "http://wso2.org/claims/givenname",
                    "value": "kim" 
                },
                {
                    "uri": "http://wso2.org/claims/emailaddress",
                    "value": "kim.anderson@gmail.com"
                },
                {
                    "uri": "http://wso2.org/claims/lastname",
                    "value": "Anderson"
                },
                {
                    "uri": "http://wso2.org/claims/mobile",
                    "value": "+947721584558"
                } 
            ] 
        },
        "properties": [
            {
                "key":"callback",
                "value": "https://localhost:9443/authenticationendpoint/login.do"
            }
        ]
    }' "https://localhost:9443/api/identity/user/v1.0/me"
    ```

The user account will be created, and you can see the user on the Management Console.

Go to **Users and Roles > List**, and click on Kim's **User Profile**. You will see that Kim's profile is locked by default.

![Locked User Kim]({{base_path}}/assets/img/guides/locked-user-profile.png)

Kim should receive a confirmation message when the profile is created through the default notification channel configured in the `deployment.toml` file. Kim should receive an SMS to the registered mobile number, if the deployment.toml has `"SMS"` as the `default_notification_channel` value.

#### With a preferred notification channel

Let's add a new user named `John` with the following claims configured.
- Email claim
- SMS claim
- preferred notification channel claim

In this scenario, the user specifies the notification channel in the cURL request. When the preferred notification channel is included in the request, the `default_notification_channel` parameter in the `deployment.toml` file is not considered.

Open a terminal and execute the following cURL command.
    ```
    curl -X POST 
    -H "Authorization: Basic <Base64(username:password)>" 
    -H "Content-Type: application/json" 
    -d '{
        "user": {
            "username": "kim",
            "realm": "PRIMARY", 
            "password": "Password12!",
            "claims": [
                {
                    "uri": "http://wso2.org/claims/givenname",
                    "value": "John" 
                },
                {
                    "uri": "http://wso2.org/claims/emailaddress",
                    "value": "john.doe@gmail.com"
                },
                {
                    "uri": "http://wso2.org/claims/lastname",
                    "value": "Doe"
                },
                {
                    "uri": "http://wso2.org/claims/mobile",
                    "value": "+947721584559"
                },
                {
                    "uri": "http://wso2.org/claims/identity/preferredChannel",
                    "value": "SMS"
                }
            ] 
        },
        "properties": [
            {
                "key":"callback",
                "value": "https://localhost:9443/authenticationendpoint/login.do"
            }
        ]
    }' "https://localhost:9443/api/identity/user/v1.0/me"
    ```

Note that John's user account is locked.

John should receive a confirmation message when the profile is created through the preferred notification channel specified in the request. According to the configured scenario, John should receive an SMS to the registered mobile number.

!!! info
    For the other requests and responses of the corresponding APIs:
    
    1. Go to [self-register API docs]({{base_path}}/apis/use-the-self-sign-up-rest-apis/#/Self%20Register/post_me).
    2. Expand the **Examples** section and select the type of registration request from the list.

### Verify the account

On a terminal, execute the cURL command by replacing the `code` parameter with the OTP received to the notification channel.
    ```
    curl -X POST
    -H "Authorization: Basic <Base64(username:password)>"
    -H "Content-Type: application/json"
    -d '{
        "code": "<OTP>"
    }' "https://localhost:9443/api/identity/user/v1.0/validate-code"
    ```

John's user account will be unlocked after successful account confirmation.

## Self-registration verification process

WSO2 IS user registration portal does not support account verification through SMS OTP. Therefore, if a tenant needs to confirm self-registered accounts through SMS OTP, they need to build up their self-registration portal and incorporate the API provided in this guide section.

!!! note
    This method can be used for both `SMS` and `Email` account verification methods.

This section describes how the self-registration API works, the flow, and sample API requests and responses.

### How it works
The following points below provide details about the self-registration API and how it works.

- In a self-registration request, either the mobile number (for SMS), email address, or both claims are required for the server to initiate an account verification request.
    - Mobile (SMS) claim: `http://wso2.org/claims/mobile`
    - Email claim: `http://wso2.org/claims/emailaddress`

- WSO2 [self-register API]({{base_path}}/apis/use-the-self-sign-up-rest-apis/#/Self%20Register/post_me) supports the following types of registration requests:
        
    <table>
        <tr>
            <th>Self Register Request Type</th>
            <th>Description</th>
        </tr>
            <td>Self-registration with pre-verified claims</td>
            <td>
                <li>
                    The user is already verified before the self-registration by an external mechanism. Therefore, no need to verify the user account again.
                </li>
                <li>
                    If a channel is verified external to WSO2 Identity Server, the corresponding channel-verified claim needs to be in the request with the value set to <code>TRUE</code>.
                    <p> For example, if the mobile number is already verified, then the <code>Phone verified</code> claim needs to be in the self-registration request with the value set to <code>TRUE</code>. </p>
                    <p>Following are the claims associated with each channel</p>
                        <li>Phone Verified: <ocde>http://wso2.org/claims/identity/phoneVerified</code></li>
                        <li>Email Verified: <code>http://wso2.org/claims/identity/emailVerified</code></li>
                    </li>
            </td>
        <tr>
            <td>Self-registration with post user account verifications</td>
            <td>
                The user is not verified before the self-registration. After the user self-registration process, the user account must be verified via internal or external channels.
            </td>
        </tr>
        <tr>
        </tr>
    </table>

    !!! info "Enable self-registration with pre-verified claims"
        Add the following configuration to the `deployment.toml` to enable this feature.
        ```toml
        [identity_mgt.user_self_registration]
        enable_account_lock_for_verified_preferred_channel = false
        ```
        After adding this configuration, if the user has verified channels, the user will not be asked to verify the account, and the account will be unlocked on creation.

        WSO2 recommends verifying users after self-registration (Post channel verification). Therefore, it is recommended to set the property to `true`. After enabling this feature, if the user has verified channels, the user will not be asked to verify the account, and the account will be unlocked on creation.

- A claim with a user’s preference can be included in the request. To do this, add a new claim called **Preferred Channel**. This claim is optional, but it is recommended to send the claim with the request as follows:
    - Preferred channel: `http://wso2.org/claims/identity/preferredChannel`


- Once the server receives a self-registration request, the server will send notifications based on the following scenarios:

    | Scenario  | Action taken  |
    |-----------| --------------|
    | Initiate a self-registration request and verify the user account via WSO2 IS  | The server sends notifications to the user by resolving the communication channel internally. The notification channel resolution is as follows.  |
    | Initiate a self-registration request, verify the user account externally and confirm the flow to WSO2 IS  | The server provides a confirmation code to confirm the user account.   |
    | Self-register after pre-confirmation of the user account, with verified claims    | The user is already verified. In this case, the user account should not be locked or prompted for verification. Therefore, no notifications are sent. |


### Notification channel selection criteria

The selection criteria for the notification channel selection are as follows: 

![notification-channel-selection-criteria]({{base_path}}/assets/img/guides/selection-criteria-flow-diagram.png)

1. The user inputs the notification channel details with other user claims.

2. If channel resolving is not enabled, the notification channel is set to use the server's default notification channel.

3. If the channel resolving property is enabled, the server will check for a user-preferred notification channel.

    | Scenario  | Result   | Example    |
    |-----------|----------|------------|
    | The user has only provided an email address or a mobile number as the notification channel and has not specified a preferred channel.    | The notification will be sent via the channel that is given in the request as a claim value. | If only the mobile number has been provided, the mobile number is considered the preferred channel.   |
    | The user has specified a preferred channel that matches the given claim values. | The confirmation info will be sent via the user-specified preferred channel. | The preferred channel is specified as SMS, and the provided claim value is a mobile number.    |
    | The user has specified a preferred channel and does not match the given claim values.  | `400 ERROR` is returned   | The preferred channel is specified as `SMS`, but there is no value for the mobile number. |
    | The user has provided email and mobile communication channels and specified a preferred channel.  | The notification will be sent via the preferred channel   | - |
    | The user has provided email and mobile communication channels but has not specified a preferred channel.   | A notification will be sent via the server default channel.  | - |


    Each notification channel is bound to the claim channel.

    | Notification channel  | Bounded value claim   |
    |-----------------------|-----------------------|
    | EMAIL | `http://wso2.org/claims/emailaddress` |
    | SMS   | `http://wso2.org/claims/mobile`   |

    !!! warning
        Changing the bounded value claim will cause errors.


4. Once the communication channel is resolved, an event is triggered. Once the event is triggered, the notification handlers will send notifications to the user.

    The event names will be in the following format.

    | Channel   | Event name    |
    |-----------|---------------|
    | SMS   | `TRIGGER_SMS_NOTIFICATION`    |
    | Email | `TRIGGER_NOTIFICATION`    |
    
    !!! note
    If you have any custom notification handlers, you need to subscribe to the notification handler for the above events.

### Account Confirmation

WSO2 Identity Server now supports multiple verification channels and allows defining the verified channel in the API request.

A sample request JSON body is as follows.

```
{
"code": "1a39ec29-9417-4f69-93b6-b7f2bbf75413",
"verifiedChannel":{"type":"SMS", "claim":"http://wso2.org/claims/mobile"},
"properties": []
}
```

Refer the [API of self-signup's validate-code endpoint]({{base_path}}/apis/use-the-self-sign-up-rest-apis/#/Self%20Register/post_validate_code) to see the request and the responses.

By using the `verifiedChannel` parameter, the user can be verified with any server-supported channel. In the above example, using the confirmation code, the SMS channel for the user can be set as the verified notification channel.


| Property Name | Description   |
|---------------|---------------|
| Type  | Type of the verified notification channel. Currently, WSO2 IS supports SMS and EMAIL channels.    |
| Claim | The value claim of the verified channel. All claims and terms are case-sensitive. |

!!! info
    In an account confirmation request,

    - If the request does not specify the `verifiedChannel` parameter, the Email verified claim would be set to TRUE by the server.
    - If the request includes the `verifiedChannel` parameter, and if the server supports the verified channel, the verified claim associated with that channel will be set to `TRUE`.
    - If the verified channel is not supported, an error will be thrown.