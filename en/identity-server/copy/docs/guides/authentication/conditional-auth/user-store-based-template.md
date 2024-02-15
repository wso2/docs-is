{% set product_name = "WSO2 Identity Server" %}
{% set product_url = "https://localhost:9443" %}
{% set product_url_format = "https://localhost:9443" %}
{% set product_url_sample = "https://localhost:9443" %}

# Add MFA based on user store

You can enable a more secure login flow for users that belong to specific user stores by applying the **User Store-Based** conditional authentication template for Adaptive MFA. This template enables two-factor authentication with TOTP for users who belong to the user store you specify.

## Scenario

Consider a scenario with two user stores, `EMPLOYEES` and `CONTRACTORS`. For users assigned to these user stores, the login flow in applications should be stepped up with TOTP as follows:

1. Username and password
2. TOTP

![User store-based adaptive authentication]({{base_path}}/assets/img/guides/conditional-auth/user-store-based-adaptive-auth.png)

## Prerequisites

- You need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

- Create two user stores named `EMPLOYEES` and `CONTRACTORS` and add user accounts to them. For instructions, see the following:

    - [Managing user stores]({{base_path}}/guides/users/user-stores/)
    - [Managing users]({{base_path}}/guides/users/manage-users/)

## Configure the login flow

To enable conditional authentication:

1. On the {{product_name}} Console, click **Applications**.

2. Select the relevant application and go to it's **Sign-in Method** tab.

3. Add user store-based adaptive MFA using your preferred editor:

    ---
    === "Classic Editor"
        To add user store-based adaptive MFA using the classic editor:

        1. Click **Start with default configuration** to define the login flow starting with the `username and password` login.

        2. Turn on **Conditional Authentication** by switching the toggle on.

        3. Select the **User** > **User Store-Based** template.

    === "Visual Editor"
        To add user store-based adaptive MFA using the visual editor:

        1. Switch to the **Visual Editor** tab, and expand **Predefined Flows** > **Conditional Login Flows** > **Users**.

        2. Click **+ ADD** next to **User Store-Based** to add the user store-based adaptive MFA script.

            ![User store-based adaptive MFA with visual editor]({{base_path}}/assets/img/guides/conditional-auth/user-store-based-adaptive-mfa-with-visual-editor.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        3. Click **Confirm** to replace any existing script with the selected predefined script.

    ---

4. Verify that the login flow is now updated with the following two authentication steps:

    - Step 1: Username and Password
    - Step 2: TOTP

5. Update the following parameter in the script.

      <table>
         <thead>
            <tr>
               <th>Parameter</th>
               <th>Description</th>
            </tr>
         </thead>
         <tbody>
            <tr>
               <td><code>userStoresToStepUp</code></td>
               <td><p> Comma-separated list of user stores. Two-factor authentication should apply to users from the specified user stores.</p> For this example scenario, enter <code>EMPLOYEES</code> and <code>CONTRACTORS</code>.</td>
            </tr>
         </tbody>
      </table>

6. Click **Update** to confirm.

## How it works

Shown below is the script of the user store-based conditional authentication template.

```js
// This script will prompt 2FA to the app only for a selected set of user stores.
// If the user is in one of the following user stores, user will be prompted 2FA
var userStoresToStepUp = ['EMPLOYEES', 'CONTRACTORS'];

var onLoginRequest = function(context) {
    executeStep(1, {
        onSuccess: function (context) {
            // Extracting user store domain of authenticated subject from the first step
            var userStoreDomain = context.currentKnownSubject.userStoreDomain;
            // Checking if the user is from whitelisted tenant domain
            if (userStoresToStepUp.indexOf(userStoreDomain) >= 0) {
                executeStep(2);
            }
        }
    });
};
```

Let's look at how this script works.

1. When step 1 of the authentication flow is complete, the `onLoginRequest` function retrieves the user from the context.
2. The `userStoreDomain` is extracted from the authentication information provided in step one.
3. Check if the extracted `userStoreDomain` is in the values specified for the variable `userStoresToStepUp`.
4. If the user belongs to any of the configured user stores, authentication step 2 (TOTP) is prompted.

!!! note
      Find out more about the scripting language in the [Conditional Authentication API Reference]({{base_path}}/references/conditional-auth/api-reference/).

## Try it out

Follow the steps given below.

1. Access the application URL.
2. Try to log in with a user who does not belong to any of the configured user stores (`EMPLOYEES` or `CONTRACTORS`). You will successfully sign in to the application.
3. Log out of the application.
4. Log in with a user who belongs to the `EMPLOYEES` or `CONTRACTORS` user store. TOTP authentication is prompted.

    ![user-store-based-2fa-conditional-auth-stepup-page]({{base_path}}/assets/img/guides/conditional-auth/totp-step-up.png){: width="300" style="border: 0.3px solid lightgrey;"}