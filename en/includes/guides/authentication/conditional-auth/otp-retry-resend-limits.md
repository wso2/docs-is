# Configure OTP retry and resend limits per application

Use conditional authentication to control how many times a user can resend an OTP or fail OTP verification during a single login attempt.

## Scenario

Consider a login flow that uses SMS OTP with these requirements:

- Users can request at most 3 OTP resends per login.
- Users can submit at most 3 incorrect OTPs per login.

Once a user reaches either limit, the login flow blocks further retries or resend requests.

## Prerequisites

- [Register an application in {{ product_name }}]({{base_path}}/guides/applications/).
- Add an SMS OTP authenticator to at least one step in the application's login flow.

## Configure the login flow

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the application and open the **Login Flow** tab.

3. In the authentication script, find the `executeStep(...)` call that runs SMS OTP or Email OTP. Inside that step, add an `authenticatorParams` block. Use the correct authenticator identifier:

    - `sms-otp-authenticator` for SMS OTP
    - `email-otp-authenticator` for Email OTP

    See the **Example script** section for the full structure.

4. Set the following parameters in the script:

    <table>
        <thead>
            <tr>
                <th>Parameter</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><code>enableRetryFromAuthenticator</code></td>
                <td>Set to <code>"true"</code> to enforce the limits defined in the script.</td>
            </tr>
            <tr>
                <td><code>maximumAllowedResendAttempts</code></td>
                <td>Maximum number of OTP resend attempts allowed per login.</td>
            </tr>
            <tr>
                <td><code>maximumAllowedFailureAttempts</code></td>
                <td>Maximum number of incorrect OTP submissions allowed before the flow blocks further retries.</td>
            </tr>
            <tr>
                <td><code>terminateOnResendLimitExceeded</code></td>
                <td>
                    Controls what happens when the resend limit is reached.<br><br>
                    <code>"true"</code> — Ends the authentication flow immediately.<br>
                    <code>"false"</code> — Blocks further resends but still accepts the last issued OTP.
                </td>
            </tr>
        </tbody>
    </table>

5. Click **Update** to save the script.

!!! note "Account lock takes precedence"
    If {{ product_name }} locks the user account (for example, due to too many failed login attempts at the tenant level) before the user reaches <code>maximumAllowedFailureAttempts</code>, the account lock ends the authentication flow immediately.

!!! note "Connection-level resend block"
    You can also configure a resend block at the connection level using settings such as **Allowed OTP resend attempt count** and **Resend block duration**. If the connection-level block triggers before the application-level limit (<code>maximumAllowedResendAttempts</code>), the connection temporarily blocks resend requests for the configured duration.

    See the [SMS OTP]({{base_path}}/guides/authentication/mfa/add-smsotp-login/) and [Email OTP]({{base_path}}/guides/authentication/mfa/add-emailotp-login/) documentation for details.

## Example script

The following script sets a maximum of 3 resends and 3 OTP verification failures for the **SMS OTP** step. The flow ends when the user exceeds the resend limit:

```js
var onLoginRequest = function(context) {
    executeStep(1); // Basic Authentication
    executeStep(2, {
        authenticatorParams: {
            local: {
                "sms-otp-authenticator": {
                    "enableRetryFromAuthenticator": "true",
                    "maximumAllowedResendAttempts": "3",
                    "maximumAllowedFailureAttempts": "3",
                    "terminateOnResendLimitExceeded": "true"
                }
            }
        }
    }, {});
};
```

For **Email OTP**, replace `sms-otp-authenticator` with `email-otp-authenticator` inside the `local` block:

```js
"email-otp-authenticator": {
    "enableRetryFromAuthenticator": "true",
    "maximumAllowedResendAttempts": "3",
    "maximumAllowedFailureAttempts": "3",
    "terminateOnResendLimitExceeded": "true"
}
```

If you omit these parameters, the OTP step uses its default behavior with no application-level limits.

## API-based flow error responses

When you use app-native authentication, reaching either limit returns an error response.

{% if product_name != "Asgardeo" %}
!!! note
    See the [App-native error codes]({{base_path}}/references/troubleshoot/app-native-error-codes/) catalog for the full list of error codes.
{% endif %}

### Retry limit exceeded

{{ product_name }} returns this error when the user exceeds `maximumAllowedFailureAttempts`:

```json
{
  "code": "ABA-60013",
  "message": "Maximum retry attempts exceeded.",
  "description": "Authentication failed. The maximum number of retry attempts has been exceeded.",
  "traceId": "20260311T060000Z-186b9bdb58cwz52dhC1SG155uc00000005zg000000002m7c"
}
```

### Resend limit exceeded

{{ product_name }} returns this error when the user exceeds `maximumAllowedResendAttempts`:

```json
{
  "code": "ABA-60014",
  "message": "Maximum resend attempts exceeded.",
  "description": "Authentication failed. The maximum number of resend attempts has been exceeded.",
  "traceId": "20260311T060000Z-186b9bdb58cwz52dhC1SG155uc00000005zg000000002m7c"
}
```

## Try it out

1. Open the application and complete the first authentication step (for example, username and password).

2. When prompted for an OTP, enter an incorrect code repeatedly. After `maximumAllowedFailureAttempts` failures, the flow blocks OTP retries.

3. Start a new login and request OTP resends repeatedly. After `maximumAllowedResendAttempts` resends:

    - If `terminateOnResendLimitExceeded` is `"true"`, the authentication flow ends.
    - If `terminateOnResendLimitExceeded` is `"false"`, the flow blocks further resends but still accepts the last issued OTP.

!!! note
    For more on the authentication script and <code>executeStep</code>, see the [Conditional Authentication API Reference]({{base_path}}/references/conditional-auth/api-reference/).
