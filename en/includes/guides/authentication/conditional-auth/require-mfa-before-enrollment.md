# Require MFA before SMS OTP and TOTP enrollment

With progressive enrollment, a user who hasn't set up SMS OTP or TOTP can set it up during login: they add a mobile number, or scan a QR code with an authenticator app. By default, {{ product_name }} allows this once any earlier step in the login has authenticated the user, so a password alone is enough.

If a password is stolen, an attacker can then enroll their own phone or authenticator app and keep access to the account even after the password is reset. To prevent this, use conditional authentication to require the user to pass a factor they already have, such as Email OTP, in the same login before they can enroll a new one.

{% if product_name == "WSO2 Identity Server" and is_version == "7.3.0" %}
!!! note
    This feature is available for **WSO2 Identity Server 7.3.0** from update level **7.3.0.TBD** onwards. See the instructions on [updating WSO2 products](https://updates.docs.wso2.com/en/latest/){:target="_blank"}.
{% endif %}

## Scenario

Consider a login flow with the following requirements:

- Users first sign in with their username and password.
- Users then choose Email OTP, SMS OTP, or TOTP as the second factor.
- Users who choose SMS OTP or TOTP but haven't set it up must pass Email OTP before they can enroll.

The following table shows what users experience.

| User selects | Already set up | Flow |
|---|---|---|
| Email OTP | - | Email OTP → application |
| SMS OTP | Yes | SMS OTP → application |
| SMS OTP | No | **Email OTP → add a mobile number → SMS OTP** → application |
| TOTP | Yes | TOTP → application |
| TOTP | No | **Email OTP → scan the QR code → TOTP** → application |

Users who have already set up SMS OTP or TOTP log in as before. The rule applies only to enrollment.

## How it works

You set the `requiredAmrForEnrollment` parameter on the step that offers SMS OTP and TOTP. It lists the authentication methods, as AMR values, that the user must have passed in the current login before enrollment is allowed.

When a user selects SMS OTP or TOTP and hasn't set it up yet, the authenticator checks the rule before it shows any enrollment page.

- **If the rule is satisfied**, the authenticator shows the enrollment page as usual.
- **If the rule is not satisfied**, the authenticator doesn't ask for a mobile number, doesn't generate a TOTP secret, and doesn't save anything. Instead, it fails the step and sets `context.endpointParams.enrollmentPendingAuthenticator` to its own name.

The script handles the failure in `onFail`. It prompts the user for a required factor, and then runs the pending authenticator again so that the user can enroll.

The authenticator, not the script, enforces the rule. The script can't mark the rule as satisfied, and requests that try to skip the required factor are rejected.

## Prerequisites

- [Register an application in {{ product_name }}]({{base_path}}/guides/applications/).
- [Set up Email OTP]({{base_path}}/guides/authentication/mfa/add-emailotp-login/), [SMS OTP]({{base_path}}/guides/authentication/mfa/add-smsotp-login/), and [TOTP]({{base_path}}/guides/authentication/mfa/add-totp-login/) in {{ product_name }}.
- Make sure users have an email address in their profile, so that they can pass Email OTP.

## Turn on progressive enrollment

Turn on progressive enrollment for SMS OTP and TOTP in your organization.

1. On the {{ product_name }} Console, go to **Connections** and select **SMS OTP**.
2. In the **Settings** tab, select **Allow mobile number enrollment during login**, and click **Update**.
3. Go back to **Connections** and select **TOTP**.
4. In the **Settings** tab, turn on **Enable TOTP progressive enrollment**, and click **Update**.

!!! warning "Set the rule in every application that uses SMS OTP or TOTP"
    These settings apply to all applications in the organization. An application that doesn't set `requiredAmrForEnrollment` still lets users enroll after a password alone. Set the rule in each application that offers SMS OTP or TOTP, or turn off enrollment for that application in its script. See [Disable enrolling in TOTP during first login]({{base_path}}/guides/authentication/mfa/add-totp-login/#disable-enrolling-in-totp-during-first-login).

## Configure the login flow

1. On the {{ product_name }} Console, go to **Applications** and select your application.

2. Go to the **Login Flow** tab and build the following login flow:

    - **Step 1**: Username & Password
    - **Step 2**: Email OTP, SMS OTP, and TOTP
    - **Step 3**: SMS OTP and TOTP

    The script uses step 3 to run the pending authenticator again after the user passes Email OTP.

3. Turn on **Conditional Authentication** and add the following script.

    ```js
    var EMAIL_OTP = 'email-otp-authenticator';
    var PENDING_AUTHENTICATOR = 'enrollmentPendingAuthenticator';

    var STEP_PARAMS = {
        common: {
            // The user must pass Email OTP in this login before enrolling SMS OTP or TOTP.
            'requiredAmrForEnrollment': EMAIL_OTP,
            // Let users retry a wrong code on the same page.
            'enableRetryFromAuthenticator': 'true'
        }
    };

    var onLoginRequest = function (context) {
        executeStep(1, {
            onSuccess: function (context) {
                executeStep(2, { authenticatorParams: STEP_PARAMS }, {
                    onFail: function (context) {
                        var pendingAuthenticator = context.endpointParams[PENDING_AUTHENTICATOR];
                        if (!pendingAuthenticator) {
                            // The step failed for another reason.
                            fail();
                            return;
                        }
                        // Prompt for the required factor.
                        executeStep(2, { authenticationOptions: [{ authenticator: EMAIL_OTP }] }, {
                            onSuccess: function (context) {
                                // Run the pending authenticator again so that the user can enroll.
                                executeStep(3, {
                                    stepOptions: { forceAuth: 'true' },
                                    authenticationOptions: [{ authenticator: pendingAuthenticator }]
                                }, {});
                            }
                        });
                    }
                });
            }
        });
    };
    ```

4. Click **Update** to save the login flow.

!!! note "Always handle `onFail`"
    If the step that sets `requiredAmrForEnrollment` has no `onFail` handler, a user who selects SMS OTP or TOTP without having set it up is sent back to the application with `error=login_required`, and the login ends.

## Parameters

<table>
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Set by</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>requiredAmrForEnrollment</code></td>
            <td>Script, in <code>authenticatorParams</code></td>
            <td>
                One or more AMR values, separated by commas. The user must have passed at least one of them in the current login before they can enroll SMS OTP or TOTP.<br><br>
                If you don't set this parameter, enrollment works as before.
            </td>
        </tr>
        <tr>
            <td><code>enrollmentPendingAuthenticator</code></td>
            <td>Authenticator, in <code>context.endpointParams</code></td>
            <td>
                Set when a step fails because the rule is not satisfied. The value is the name of the authenticator the user selected, for example <code>sms-otp-authenticator</code> or <code>totp</code>.<br><br>
                Use it in <code>onFail</code> to tell this failure apart from others, and to run that authenticator again.
            </td>
        </tr>
    </tbody>
</table>

### Which AMR values you can use

Use the same values that appear in the `amr` claim of the ID token.

- **By default**, the value is the authenticator name, for example `email-otp-authenticator` or `FIDOAuthenticator`.
- **If you [map the authenticator to an AMR value]({{base_path}}/guides/authentication/conditional-auth/acr-and-amr/#translate-amr-values)** in the `deployment.toml` file, use the mapped value, for example `otp`. The authenticator name no longer satisfies the rule. If several authenticators map to the same value, any of them satisfies the rule.
- **If you exclude the authenticator** from the `amr` claim, it can't satisfy the rule.

Only authenticators that the user passed in the current login count. Failed attempts and steps reused from an existing session don't satisfy the rule, because the rule must prove that the user is present now.

### Require one of several factors

If you list more than one AMR value, the user can pass any one of them. Offer all of them in the `onFail` handler, so that each user can choose a factor they already have:

```js
var STEP_PARAMS = {
    common: {
        'requiredAmrForEnrollment': 'email-otp-authenticator,FIDOAuthenticator'
    }
};

// In the onFail handler:
executeStep(2, {
    authenticationOptions: [
        { authenticator: 'email-otp-authenticator' },
        { authenticator: 'FIDOAuthenticator' }
    ]
}, {
    onSuccess: function (context) {
        // Run the pending authenticator again, as in the earlier example.
    }
});
```

## Troubleshoot

- **The login fails after the user passes the required factor.** Check the AMR values in `requiredAmrForEnrollment`. If a value is mistyped, or the authenticator is mapped to a different AMR value, the rule can't be satisfied. {{ product_name }} fails the login once instead of looping, and writes a log entry that names the value and the application.
- **The step failure doesn't appear in the audit log.** When the rule isn't satisfied, the authenticator fails the step on purpose, so {{ product_name }} doesn't record it as a failed authentication step. Only the overall login result is recorded.

## Limitations

- The user must pass **one** of the listed factors. You can't require a combination of factors, such as both Email OTP and a passkey.
- A user who can't pass any of the required factors can't enroll during login.
- The rule applies only to enrollment during login. It doesn't apply when users set up SMS OTP or TOTP from My Account or through the user APIs.
- AMR values from federated identity providers don't count.
- Passkey progressive enrollment doesn't use this parameter. See [Add passkey progressive enrollment]({{base_path}}/guides/authentication/conditional-auth/passkey-progressive-enrollment-based-template/).
