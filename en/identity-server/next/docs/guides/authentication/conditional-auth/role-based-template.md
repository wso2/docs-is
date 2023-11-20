{% set product_name = "WSO2 Identity Server" %}
{% set product_url = "https://localhost:9443" %}
{% set product_url_format = "https://localhost:9443" %}
{% set product_url_sample = "https://localhost:9443" %}

# Add MFA based on user roles

You can enable a more secure login flow for users that belong to specific roles by applying the **Role-Based** conditional authentication template for Adaptive MFA. This template enables two-factor authentication with TOTP or FIDO for users who belong to the user role you specify.

## Scenario

Consider a scenario with two user roles, `admin` and `manager`. For users assigned to these roles, the login flow in applications should be stepped up with TOTP or FIDO as follows:

1. Username and password
2. TOTP or FIDO

![Role based adaptive authentication]({{base_path}}/assets/img/guides/conditional-auth/role-based-adaptive-auth.png)

## Prerequisites

- You need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

- Create two user roles named `admin` and `manager` and assign user accounts to them. For instructions, see the following:

    <!-- ADD CONTENT -->

    - [Managing roles]({{base_path}}/guides/users/manage-roles/)
    - [Managing users]({{base_path}}/guides/users/manage-groups/)

## Configure the login flow

To enable conditional authentication:

1. On the {{product_name}} Console, click **Applications**.

2. Select the relevant application and go to it's **Sign-in Method** tab.

3. Add role-based adaptive MFA using your preferred editor:

    ---
    === "Classic Editor"
        To add role-based adaptive MFA using the classic editor:

        1. Click **Start with default configuration** to define the login flow starting with the `username and password` login.

        2. Turn on **Conditional Authentication** by switching the toggle on.

        3. Select the **User** > **Role-Based** template.

    === "Visual Editor"
        To add role-based adaptive MFA using the visual editor:

        1. Switch to the **Visual Editor** tab, and expand **Predefined Flows** > **Conditional Login Flows** > **Users**.

        2. Click **+ ADD** next to **Role-Based** to add the role-based adaptive MFA script.

            ![Role-based adaptive MFA with visual editor]({{base_path}}/assets/img/guides/conditional-auth/role-based-adaptive-mfa-with-visual-editor.png){: style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

        3. Click **Confirm** to replace any existing script with the selected predefined script.

    ---

4. Verify that the login flow is now updated with the following two authentication steps:

    - Step 1: Username and Password
    - Step 2: TOTP and FIDO

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
               <td><code>rolesToStepUp</code></td>
               <td><p> Comma-separated list of user roles. Two-factor authentication should apply to users from these roles.</p> For this example scenario, enter <code>admin</code> and <code>manager</code>.</td>
            </tr>
         </tbody>
      </table>

6. Click **Update** to confirm.

## How it works

Shown below is the script of the role-based conditional authentication template.

```js
// This script will step up authentication for any user belonging
// to one of the given roles
// If the user has any of the below roles, authentication will be stepped up
var rolesToStepUp = ['admin', 'manager'];

var onLoginRequest = function(context) {
    executeStep(1, {
        onSuccess: function (context) {
            // Extracting authenticated subject from the first step
            var user = context.currentKnownSubject;
            // Checking if the user is assigned to one of the given roles
            var hasRole = hasAnyOfTheRoles(user, rolesToStepUp);
            if (hasRole) {
                Log.info(user.username + ' Has one of Roles: ' + rolesToStepUp.toString());
                executeStep(2);
            }
        }
    });
};
```

Let's look at how this script works.

1. When step 1 of the authentication flow is complete, the `onLoginRequest` function retrieves the user from the context.
2. The user and the configured list of roles are passed to the following function: `hasAnyOfTheRoles`.
3. This function (which is available in {{ product_name }} by default) verifies whether the given user belongs to any of the listed roles.
4. If the user belongs to any of the configured roles, authentication step 2 (TOTP or FIDO) is prompted.

!!! note
      Find out more about the scripting language in the [Conditional Authentication API Reference]({{base_path}}/references/conditional-auth/api-reference/).

## Try it out

Follow the steps given below.

1. Access the application URL.
2. Try to log in with a user who does not belong to any of the configured roles (manager or admin). You will successfully sign in to the application.
3. Log out of the application.
4. Log in with a user who belongs to the `admin` or `manager` role.

    The user will be prompted to select the step-up method, and the sign-in flow will be stepped up according to the user's preference.

    ![role-based-2fa-conditional-auth-stepup-page]({{base_path}}/assets/img/guides/conditional-auth/totp-fido-step-up.png){: width="300" style="border: 0.3px solid lightgrey;"}


