# Self registration verification process

{{product_name}} user registration portal does not support account verification through SMS OTP. Therefore, if a tenant needs to 
confirm self-registered accounts through SMS OTP, they need to build up their self-registration portal and incorporate the API provided in this guide section.

!!! note
    This method can be used for both `SMS` and `EMAIL` account verification methods.

This section describes how the self-registration API works, the flow, and sample API requests and responses.

## How it works

The following points below provide details about the self-registration API and how it works.

- In a self-registration request, either the mobile number (for SMS), email address, or both claims are required for the server to initiate an account verification request.
    - Mobile (SMS) claim: `http://wso2.org/claims/mobile`
    - Email claim: `http://wso2.org/claims/emailaddress`

- {{product_name}} [self-register API]({{base_path}}/apis/use-the-self-sign-up-rest-apis/#tag/Self-Register/paths/~1me/post) supports the following types of registration requests:

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
                    If a channel is verified external to {{product_name}}, the corresponding channel-verified claim needs to be in the request with the value set to <code>TRUE</code>.
                    <p> For example, if the mobile number is already verified, then the <code>Phone verified</code> claim needs to be in the self-registration request with the value set to <code>TRUE</code>. </p>
                    <p>Following are the claims associated with each channel</p>
                        <li>Phone Verified: <code>http://wso2.org/claims/identity/phoneVerified</code></li>
                        <li>Email Verified: <code>http://wso2.org/claims/identity/emailVerified</code></li>
                    </li>
            </td>
        <tr>
            <td>Self-registration with post user account verifications</td>
            <td>
                The user is not verified before the self-registration. After the user self-registration process, the user account must be verified via internal or external channels.
            </td>
        </tr>
    </table>

    !!! info "Enable self-registration with pre-verified claims"
        Add the following configuration to the `deployment.toml` to enable this feature.

        ```toml
        [identity_mgt.user_self_registration]
        enable_account_lock_for_verified_preferred_channel = false
        ```
        After adding this configuration, if the user has verified channels, the user will not be asked to verify the account, and the account will be unlocked on creation.

        {{product_name}} recommends verifying users after self-registration (Post channel verification). Therefore, it is recommended to set the property to `true`. After enabling this feature, if the user has verified channels, the user will not be asked to verify the account, and the account will be unlocked on creation.

- A claim with a user’s preference can be included in the request. This claim is optional, but it is recommended to send the claim with the request body as mentioned in the 
    previous requests:
    - Preferred channel: `http://wso2.org/claims/identity/preferredChannel`

- Once the server receives a self-registration request, the server will send notifications based on the following scenarios:

    | Scenario  | Action taken  |
    |-----------| --------------|
    | Initiate a self-registration request and verify the user account via {{product_name}}  | The server sends notifications to the user by resolving the communication channel internally.  |
    | Initiate a self-registration request, verify the user account externally and confirm the flow to {{product_name}}  | The server provides a confirmation code to confirm the user account.   |
    | Self-register after pre-confirmation of the user account, with verified claims    | The user is already verified. In this case, the user account should not be locked or prompted for verification. Therefore, no notifications are sent. |

## Notification channel selection criteria

The selection criteria for the notification channel selection are as follows: 

![notification-channel-selection-criteria]({{base_path}}/assets/img/guides/organization/self-service/customer/selection-criteria-flow-diagram.png)

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
