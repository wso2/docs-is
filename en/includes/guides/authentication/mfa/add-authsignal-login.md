# Add Authsignal login

[Authsignal](https://www.authsignal.com/){: target="_blank"} is a multi-factor authentication platform that offers methods such as passkeys, authenticator apps (TOTP), SMS OTP, and email OTP, along with rules that decide when and how to challenge a user.

By integrating Authsignal with {{ product_name }}, you can add Authsignal as a second-factor authentication option in the login flow of your applications, and as an extra verification step in the self-registration, invited user registration, and password recovery flows.

## How it works

{{ product_name }} uses [Authsignal Flows](https://docs.authsignal.com/api-reference/server-api/start-flow){: target="_blank"} for every journey.

1. An earlier step, such as **Identifier First** or **Username & Password**, identifies the user.

2. {{ product_name }} starts the Authsignal flow configured for the journey and redirects the user to Authsignal's [pre-built UI](https://docs.authsignal.com/implementation-options/prebuilt-ui/overview){: target="_blank"}.

3. The user completes the flow, for example, with a passkey, an authenticator app, or a one-time password, and Authsignal redirects the user back to {{ product_name }} with a challenge token.

4. {{ product_name }} verifies the challenge token with Authsignal from the server side. The step succeeds only if the user completed the flow and the token belongs to the same user the flow started for.

The rules and steps of each journey, such as whether to challenge the user and which methods to offer, are configured on the flow in the Authsignal Portal. Therefore, most of the risk logic belongs in the Authsignal Portal rather than in the {{ product_name }} login flow.

!!! note

    The Authsignal user ID of a user is the user ID of the user in {{ product_name }}, which stays the same when the user is renamed. Federated users use their subject identifier.

## Prerequisites

Before you begin, ensure you have the following:

- An [Authsignal](https://www.authsignal.com/){: target="_blank"} tenant with access to the Authsignal Portal.

- A flow configured in the Authsignal Portal for each action code you plan to use. For example, a `sign-in` flow for login.

- [{{ product_name }} Account](https://asgardeo.io/signup){: target="_blank"}: Access to your {{ product_name }} Console with administrative privileges.

## Configure Authsignal in {{ product_name }}

Each organization has its own Authsignal configuration. To configure it,

1. In the Authsignal Portal, go to **Settings** > **API keys** and take note of the **Server API secret key** and the **API Host** of your tenant.

2. On the {{ product_name }} Console, go to **Connections** and select **Authsignal**.

    ![Authsignal in the connections list]({{base_path}}/assets/img/guides/mfa/authsignal/connector-listing.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Go to the **Settings** tab and enter the following details.

    ![Authsignal configuration]({{base_path}}/assets/img/guides/mfa/authsignal/connector-configuration.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    <table>
        <thead>
            <tr>
                <th>Field</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Secret key</td>
                <td>The Server API secret key of your Authsignal tenant.</td>
            </tr>
            <tr>
                <td>Region</td>
                <td>The region of your Authsignal tenant: <code>us</code>, <code>eu</code>, <code>au</code>, <code>ca</code>, or <code>uk</code>. Select the region that matches the <b>API Host</b> shown in the Authsignal Portal. The default value is <code>us</code>.</td>
            </tr>
            <tr>
                <td>Action code</td>
                <td>The default action code of the Authsignal flow. {{ product_name }} uses it in the login, self-registration, invited user registration, and password recovery flows, unless you override it <a href="#optional-set-the-action-code-from-the-conditional-authentication-script">from the conditional authentication script</a> or <a href="#optional-set-the-action-code-per-flow">per flow</a>. The default value is <code>sign-in</code>.</td>
            </tr>
        </tbody>
    </table>

4. Click **Update** to save the changes.

## Add Authsignal to the login flow

Authsignal is a second-factor option, so an earlier step must identify the user. To add Authsignal to the login flow of an application,

1. On the {{ product_name }} Console, go to **Applications** and select your application.

2. Go to the **Login Flow** tab and set up the steps as follows:

    - **Step 1:** Add **Identifier First**, which identifies the user.
    - **Step 2:** Add **Username & Password**, then click **Add Sign In Option** and select **Authsignal**.

    ![Login flow with Authsignal]({{base_path}}/assets/img/guides/mfa/authsignal/login-flow.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Click **Update** to save the changes.

When a user signs in, after entering their identifier, the user can either sign in with their password or select **Sign In With Authsignal**. If the user selects Authsignal, {{ product_name }} redirects them to Authsignal's pre-built UI to complete the Authsignal flow, and then back to the application.

### Optional: Set the action code from the conditional authentication script

By default, the login flow uses the **Action code** you configured for Authsignal. The [conditional authentication]({{base_path}}/guides/authentication/conditional-auth/) script of an application can use a different action code by passing `actionCode` to the Authsignal step.

For example, the following script uses the `step-up` flow for users with the `admin` role and the `sign-in` flow for other users.

```js
var onLoginRequest = function (context) {
    executeStep(1, {
        onSuccess: function (context) {
            var isAdmin = hasAnyOfTheRoles(context.currentKnownSubject, ["admin"]);
            executeStep(2, {
                authenticatorParams: {
                    local: {
                        "authsignal-authenticator": { actionCode: isAdmin ? "step-up" : "sign-in" }
                    }
                }
            }, {});
        }
    });
};
```

!!! note

    Each action code must match a flow configured in the Authsignal Portal.

## Add Authsignal to flows

You can add Authsignal to the self-registration, invited user registration, and password recovery flows that you build in **Flows** on the {{ product_name }} Console.

To add Authsignal to a flow,

1. In the Authsignal Portal, configure the flow to use. By default, {{ product_name }} uses the flow of the **Action code** you configured for Authsignal.

2. On the {{ product_name }} Console, go to **Flows**, select the flow, and add the **Authsignal** component as follows:

    <table>
        <thead>
            <tr>
                <th>Flow</th>
                <th>Placement</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Self registration</td>
                <td>After the attribute collection form and <b>before</b> the user onboarding step. The form <b>must</b> collect the email address or the mobile number of the user, as {{ product_name }} starts the Authsignal flow with it.</td>
            </tr>
            <tr>
                <td>Invited user registration</td>
                <td>After the user gets identified and before the password step.</td>
            </tr>
            <tr>
                <td>Password recovery</td>
                <td>After the user gets identified and before the password step. Keep Email OTP, SMS OTP, or Magic Link as the recovery option before the password reset step and use Authsignal as an extra check.</td>
            </tr>
        </tbody>
    </table>

    ![Registration flow with the Authsignal component]({{base_path}}/assets/img/guides/mfa/authsignal/registration-flow.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Save and publish the flow.

### Optional: Set the action code per flow

By default, the Authsignal component uses the **Action code** you configured for Authsignal. To use a different Authsignal flow for a component, for example, a `sign-up` flow for registration, select the component and enter the action code in the **Action code** field of its properties panel.

![Action code property of the Authsignal component]({{base_path}}/assets/img/guides/mfa/authsignal/action-code-property.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### How Authsignal works in flows

- **Registration before the user exists**: During registration, no user ID exists yet. Therefore, {{ product_name }} starts the Authsignal flow with the email address the user entered, or with the mobile number if there is no email address.

- **Contact details must be verified by the flow**: When the user returns, a completed step of the Authsignal flow must have verified the same email address (Email OTP or email magic link) or mobile number (SMS or WhatsApp) that the flow started with. A passkey-only flow doesn't meet this requirement.

- **Linking after the user gets created**: Once registration creates the user, {{ product_name }} links everything the user enrolled in the Authsignal flow to the user's Authsignal user ID. Registrations that are pending approval aren't linked.

- **Verified attributes**: After a successful link, {{ product_name }} marks the email address (or mobile number) of the user as verified only if the user has an Authsignal authenticator for the same email address (or mobile number). {{ product_name }} never copies contact details from Authsignal.

- **Passkey status**: After every successful Authsignal flow, {{ product_name }} records whether the user has a passkey on Authsignal in the `http://wso2.org/claims/identity/passkeyManagedExternally` attribute.

- **Password recovery accepts any successful flow of the user**, including a flow that enrolls a new authenticator. Configure the Authsignal flow used for password recovery to only verify existing authenticators. If the default flow allows enrollment, use a separate action code for password recovery.

!!! note "Retry linking at the next sign-in"

    If {{ product_name }} can't reach Authsignal to link the user after registration, it retries a few times. If linking still fails, {{ product_name }} saves the challenge ID in the `http://wso2.org/claims/authsignalChallengeId` attribute and retries the link at the user's next sign-in, within the validity period of the challenge (10 minutes by default).

    To enable this, [create a custom attribute]({{base_path}}/guides/users/attributes/user-attributes/manage-attributes/) named `authsignalChallengeId` and make it read-only and hidden from users. If the attribute doesn't exist, or the link fails with another error, the user has to enroll again.

## Limitations

- Authsignal is supported only as a second factor. It can't be the first step of the login flow.
