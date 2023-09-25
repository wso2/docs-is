# Add MFA based on user sign-in option

You can enable a more secure sign-in flow (based on the user's sign-in method) by applying the **Sign-In-Option-Based** conditional authentication template to your application.

## Scenario

Consider a scenario where your application has multiple authentication methods configured as the first authentication step. You need to secure the sign-in flow for users signing in through a selected method of authentication (ex: basic authentication). If the user sign-in with the specified authentication method, the second authentication step is prompted.
Users signing in from an authentication method which is not specified in the script can simply sign in using only the first step.

![Sign-in based adaptive authentication](../../../assets/img/guides/conditional-auth/signin-based-adaptive-auth.png)

## Prerequisites

You need to [register an application with {{ product_name }}](../../guides/applications/). You can register your own application or use one of the [sample applications](../../get-started/try-samples/) provided.

## Configure the sign-in flow

Follow the steps given below.

1. On the {{ product_name }} Console, click **Applications**.
2. Select the application for which you wish to apply a conditional login flow and go to its **Sign-in Method** tab.
3. Click **Start with default configuration** to define the login flow starting with the `username and password` login.
4. Add other authenticators alongside **username and password** for step one in the sign-in flow.

     !!! tip "Example"
        For example:  `username and password` + `Google` + `Facebook`

5. Turn on **Conditional Authentication** by switching the toggle.

   ![Enable conditional auth in {{ product_name }}](../../../assets/img/guides/conditional-auth/enable-conditional-auth.png)

   You can now define your conditional authentication script.

   !!! warning
       As a security measure, {{ product_name }} does not allow the usage of two consecutive full stops (`..`) in authentication scripts.

6. Select the **Adaptive MFA > Sign-In-Option-Based** template.
7. Update the following parameter in the script.

    <table>
        <thead>
            <tr>
                <th>Parameter</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><code>signInOptionToStepUp</code></td>
                <td>Parameter to define the sign-in option to which the second authentication step should apply. It can be configured as follows:
                    <ul>
                    <li>For basic authentication using username and password use <code>LOCAL</code> as the parameter value.</li>
                    <li>For federated IdPs use the name of the IdP as the parameter value (Ex: <code>Facebook</code>, <code>Google</code>, <code>Github</code>).</li>
                    </ul>
                </td>
            </tr>
        </tbody>
    </table>

## How it works

Shown below is the script of the sign-in-option-based conditional authentication template.

```js
// This script will step up authentication and prompt TOTP in case when
// user sign-in with configured sign-in option.
// Set the required sign-in option that requires step up authentication.
var signInOptionToStepUp = 'LOCAL';
var onLoginRequest = function(context) {
    executeStep(1, {
        onSuccess: function (context) {
            var step = context.steps[1];
            if (step.idp == signInOptionToStepUp) {
                executeStep(2);
            }
        }
    });
};
```

Let's look at how this script works.

1. When step 1 of the authentication flow is complete, the **onLoginRequest** function retrieves the first authentication method from the context.
2. The function verifies whether the given authentication method belongs to the method mentioned in ```signInOptionToStepUp```.
3. If the first authentication method is the authentication method in ```signInOptionToStepUp```, authentication step 2 (TOTP) is prompted.

## Try it out

Follow the steps given below.

1. Access the application URL.
2. Try to sign in to the application with an authenticator that is not specified in the script. You will successfully sign in to the application.
3. Log out of the application.
4. Sign in with the authenticator specified in the script. TOTP authentication is prompted.

    ![ip-based-2fa-conditional-auth-totp-page](../../../assets/img/guides/conditional-auth/enter-otp-token.png){: width="300"}