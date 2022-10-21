# Verification methods of Self-Registration

WSO2 Identity Server (WSO2 IS) supports self-registration, allowing users to set up their accounts and receive a confirmation when the account is created.

WSO2 Identity Server allows users to confirm their accounts via a user-preferred communication channel. Based on the user preference, the user self-registration process supports email or SMS as the preferred account confirmation channel for the user.

Currently, WSO2 IS supports `SMS` and `EMAIL` as internal notification channels. Each channel has the following attributes.

| Channel Type  | Claim | Channel verified claim    |
|---------------|-------|---------------------------|
| SMS   | http://wso2.org/claims/mobile | http://wso2.org/claims/identity/phoneVerified |
| Email | http://wso2.org/claims/emailaddress   | http://wso2.org/claims/identity/emailVerified |

The account confirmation channel is selected based on the following scenarios.

- `SMS`: If the user has provided only the mobile number, the confirmation channel will be SMS.
- `Email`: The confirmation channel will be `email` if the user has provided only the email address.
- Either `SMS` or `email`: If the user has provided both a mobile number and email address, the confirmation channel will be either SMS or email.

!!! note
    In this case, the account confirmation channel will be the preferred channel selected by the specific user. If the user has not specified any preferred channel, the server-configured channel is selected as the account confirmation channel.

!!! Note
    This feature is **only available via the Self Registration and Account confirmation REST APIs**.
    Currently, WSO2 does not support this feature via the End User Dashboard.

    <!-- to [User Self Registration and Account confirmation via Mobile and Email Channels](../../learn/multi-channel-self-registration-and-account-confirmation). -->

## Self-registration verification

This section describes how the self-registration API works, the flow, and sample API requests and responses.

### How it works
The following points below provide details about the self-registration API and how it works.

- In a self-registration request, either the mobile number (for SMS), email address, or both claims are required for the server to initiate an account verification request (i.e., at least one claim should be in the request).
    - Mobile (SMS) claim: `http://wso2.org/claims/mobile`
    - Email claim: `http://wso2.org/claims/emailaddress`

- WSO2 [self-register API]({{base_path}}/apis/use-the-self-sign-up-rest-apis/#/Self%20Register/post_me) supports the following types of registration requests:

    !!! info
        For the requests and responses of the corresponding APIs:
        
        1. Go to [self-register API docs]({{base_path}}/apis/use-the-self-sign-up-rest-apis/#/Self%20Register/post_me).
        2. Expand the **Examples** section and select the type of registration request from the list.
        
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
                <div class="admonition info">
                    <p class="admonition-title">Note</p>
                    This feature is only supported when the prior verified channel is either <code>EMAIL</code> or <code>SMS</code>. For more information, refer to the note on **Enable self-registration with pre-verified claims**
                </div>
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
                The user is not verified before the self-registration. The user account must be verified via internal or external channels after the user self-registration process.
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
        After enabling this feature, if the user has verified channels, the user will not be asked to verify the account, and the account will be unclocked on creation.

        WSO2 recommends verifying users after self-registration (Post channel verification).
        Therefore, it is recommended to set the property to `true`.
        After enabling this feature, if the user has verified channels, the user will not be asked to verify the account, and the account will be unlocked on creation.

- A claim with a user’s preference can be included in the request. To do this, add a new claim called **Preferred Channel**. This claim is optional, but it is recommended to send the claim with the request as follows:
    - Preferred channel: `http://wso2.org/claims/identity/preferredChannel`


- Once the server receives a self-registration request, the server will send notifications based on the following scenarios:

    | Scenario  | Action taken  |
    |-----------| --------------|
    | Initiate a self-registration request and verify the user account via WSO2 IS  | The server sends notifications to the user by resolving the communication channel internally. The notification channel resolution is as follows.  |
    | Initiate a self-registration request, verify the user account externally and confirm the flow to WSO2 IS  | The server provides a confirmation code to be used to confirm the user account.   |
    | Self-register after pre-confirmation of the user account, with verified claims    | The user is already verified. In this case, the user account should not be locked or prompted for verification. Therefore, no notifications are sent. |


### Notification channel selection criteria

The selection criteria for the notification channel selection are as follows: 

![notification-channel-selection-criteria]({{base_path}}/assets/img/guides/selection-criteria-flow-diagram.png)

1. The user inputs the notification channel details with other user claims.

2. If channel resolving is not enabled, the notification channel is set to use the server's default notification channel.

    !!! Note "Configure channel resolving"
        - Navigate to the `deployment.toml` and set `enable_resolve_notification_channel` to `true` to enable channel resolving.

        - To configure the default notification channel, navigate to the `deployment.toml` and 
        set a value (`EMAIL` or `SMS`).
        
        - For more information, see [Configuring self-registration]({{base_path}}/guides/identity-lifecycles/self-registration-workflow/).

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

## Account Confirmation

For account confirmations, WSO2 Identity Server now supports multiple verification channels and allows defining the verified channel (i.e., whether the account confirmation was communicated via EMAIL or SMS) in the API request. A sample request JSON body is as follows.

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
| Type  | Type of verified notification channel. Currently, WSO2 IS supports SMS and EMAIL channels.    |
| Claim | The value claim of the verified channel. All claims and terms are case-sensitive. |

!!! info
    In an account confirmation request,

    - If the request does not specify the verifiedChannel parameter, the Email Verified claim will be set to TRUE by the server.
    - If the request includes the `verifiedChannelparameter`, and if the server supports the verified channel, the verified claim associated with that channel will be set to `TRUE`.
    - If the verified channel is not supported, an error will be thrown.