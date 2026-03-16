# Configure OTP retry and resend limits per application

OTP retry and resend limits can be configured per application using the conditional authentication script. These limits define the maximum number of OTP resends and OTP verification failures allowed during a single authentication flow.

## Scenario

Consider a login flow that uses SMS OTP or Email OTP with the following requirements:

- Maximum of 3 OTP resends per login.
- Maximum of 3 incorrect OTP submissions per login.

Once a configured limit is reached, OTP resend or retry behavior is restricted.

## Prerequisites

- An application must be [registered in {{ product_name }}]({{base_path}}/guides/applications/).
- The application login flow must include an OTP authenticator (SMS OTP or Email OTP) in at least one step.

## Configure the login flow

To configure OTP retry and resend limits:

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the application and open the **Login Flow** tab.

3. Open the authentication script and locate the OTP step (the `executeStep(...)` call that runs SMS OTP or Email OTP). In that step, add the `authenticatorParams` block. Set the parameters under the relevant authenticator identifier:

    - `sms-otp-authenticator` for SMS OTP
    - `email-otp-authenticator` for Email OTP

    The **Example script** section shows the full structure.

4. Update the following parameters in the script:

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
                <td>Set to <code>"true"</code> to apply the limits defined in the script.</td>
            </tr>
            <tr>
                <td><code>maximumAllowedResendAttempts</code></td>
                <td>Maximum number of OTP resend attempts allowed for the flow.</td>
            </tr>
            <tr>
                <td><code>maximumAllowedFailureAttempts</code></td>
                <td>Maximum number of OTP verification failures allowed before retry is blocked.</td>
            </tr>
            <tr>
                <td><code>terminateOnResendLimitExceeded</code></td>
                <td>If <code>"true"</code>, the flow ends immediately when the resend limit is exceeded. If <code>"false"</code>, further resends are blocked but OTP submission is still allowed using the last issued OTP.</td>
            </tr>
        </tbody>
    </table>

5. Click **Update** to save the script.

!!! note "Account lock"
    If the user account is locked (for example, due to tenant-level failed login attempts) before reaching <code>maximumAllowedFailureAttempts</code>, the account lock takes precedence and the authentication flow ends immediately.

!!! note "User-based resend block"
    A user-based resend block can be configured at the connection level (SMS OTP or Email OTP). Use settings such as **Allowed OTP resend attempt count** and **Resend block duration**. If the connection-level resend block is reached before the application-level resend limit (<code>maximumAllowedResendAttempts</code>) is exceeded, resend requests are temporarily blocked for the duration configured in the connection.

    See the [SMS OTP]({{base_path}}/guides/authentication/mfa/add-smsotp-login/) and [Email OTP]({{base_path}}/guides/authentication/mfa/add-emailotp-login/) connection documentation for details.

## Example script

The following example sets a maximum of 3 resends and 3 OTP verification failures for the **SMS OTP** step. The flow ends when the resend limit is exceeded:

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

For **Email OTP**, use `email-otp-authenticator` with the same parameters inside the `local` block (instead of `sms-otp-authenticator`):

```js
"email-otp-authenticator": {
    "enableRetryFromAuthenticator": "true",
    "maximumAllowedResendAttempts": "3",
    "maximumAllowedFailureAttempts": "3",
    "terminateOnResendLimitExceeded": "true"
}
```

If these parameters are not included for an OTP step, the step uses the default behavior (no application-level limits from the script).

## API-based flow error responses

When OTP retry and resend limits are enforced in an API-based flow (app-native authentication), the configured limits can trigger the following error responses.

{% if product_name != "Asgardeo" %}
!!! note
    See the [App-native error codes]({{base_path}}/references/troubleshoot/app-native-error-codes/) catalog for the complete list of error codes.
{% endif %}

### Retry limit exceeded

The following is an example error response when the maximum OTP verification failure attempts are exceeded:

```json
{
  "code": "ABA-60013",
  "message": "Maximum retry attempts exceeded.",
  "description": "Authentication failed. The maximum number of retry attempts has been exceeded.",
  "traceId": "20260311T060000Z-186b9bdb58cwz52dhC1SG155uc00000005zg000000002m7c"
}
```

### Resend limit exceeded

The following is an example error response when the maximum OTP resend attempts are exceeded:

```json
{
  "code": "ABA-60014",
  "message": "Maximum resend attempts exceeded.",
  "description": "Authentication failed. The maximum number of resend attempts has been exceeded.",
  "traceId": "20260311T060000Z-186b9bdb58cwz52dhC1SG155uc00000005zg000000002m7c"
}
```

## Try it out

Follow the steps given below.

1. Access the application and complete the first step (for example, username and password).

2. When prompted for OTP, submit an incorrect code repeatedly. After the number of failures set in `maximumAllowedFailureAttempts`, the flow should no longer allow OTP retries.

3. Start a new login and trigger OTP resend repeatedly. After the number of resends set in `maximumAllowedResendAttempts`:

    - If `terminateOnResendLimitExceeded` is `"true"`, the authentication flow should end.
    - If `terminateOnResendLimitExceeded` is `"false"`, further resends are blocked but OTP submission is still allowed using the last issued OTP.

!!! note
    For more on the script and <code>executeStep</code>, see the [Conditional Authentication API Reference]({{base_path}}/references/conditional-auth/api-reference/).
