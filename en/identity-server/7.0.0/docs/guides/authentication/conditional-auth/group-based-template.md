{% set product_name = "WSO2 Identity Server" %}
{% set product_url = "https://localhost:9443" %}
{% set product_url_format = "https://localhost:9443" %}
{% set product_url_sample = "https://localhost:9443" %}

# Add MFA based on user group

You can enable a more secure login flow for users that belong to specific groups by applying the **Group-Based** conditional authentication template for **Adaptive MFA**. This template enables two-factor authentication with TOTP for users who belong to the user groups you specify.

## Scenario

Consider a scenario with two user groups, `manager` and `employee`. For users assigned to these groups, the login flow in applications should be stepped up with TOTP or passkeys as follows:

1. Username and password
2. TOTP or Passkey

![Group based adaptive authentication]({{base_path}}/assets/img/guides/conditional-auth/group-based-adaptive-auth.png)

## Prerequisites

- You need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

- Create two user groups named `manager` and `employee` and assign user accounts to them. For instructions, see the following:

      - [Managing groups]({{base_path}}/guides/users/manage-groups/)
      - [Managing users]({{base_path}}/guides/users/manage-users/)

## Configure the login flow

To enable conditional authentication:

1. On the {{product_name}} Console, click **Applications**.

2. Select the relevant application and go to its **Sign-in Method** tab.

3. Add group-based adaptive MFA using your preferred editor:

    ---
    === "Classic Editor"
        To add group-based adaptive MFA using the classic editor:

        1. Click **Start with default configuration** to define the login flow starting with the `username and password` login.

        2. Turn on **Conditional Authentication** by switching the toggle on.

        3. Select the **User** > **Group-Based** template.

    === "Visual Editor"
        To add group-based adaptive MFA using the visual editor:

        1. Switch to the **Visual Editor** tab, and expand **Predefined Flows** > **Conditional Login Flows** > **Users**.

        2. Click **+ ADD** next to **Group-Based** to add the group-based adaptive MFA script.

            ![Group-based adaptive MFA with visual editor]({{base_path}}/assets/img/guides/conditional-auth/group-based-adaptive-mfa-with-visual-editor.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        3. Click **Confirm** to replace any existing script with the selected predefined script.

    ---

4. Verify that the login flow is now updated with the following two authentication steps:

    - Step 1: Username and Password
    - Step 2: TOTP and Passkey

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
               <td><code>groupsToStepUp</code></td>
               <td><p>Comma separated list of user groups. Two-factor authentication should apply to users from these groups.</p> For this example scenario, enter <code>manager</code> and <code>employee</code>.</td>
            </tr>
         </tbody>
      </table>

6. Click **Update** to confirm.

## How it works

Shown below is the script of the group-based conditional authentication template.

```js
var groupsToStepUp = ['manager', 'employee'];

var onLoginRequest = function (context) {
   executeStep(1, {
      onSuccess: function (context) {
            // Extracting authenticated subject from the first step.
            var user = context.currentKnownSubject;
            // Checking if the user is assigned to one of the given groups.
            var isMember = isMemberOfAnyOfGroups(user, groupsToStepUp);
            if (isMember) {
               Log.info(user.username + ' is a member of one of the groups: ' + groupsToStepUp.toString());
               executeStep(2);
            }
      }
   });
};
```

Let's look at how this script works.

1. When step 1 of the authentication flow is complete, the **onLoginRequest** function retrieves the user from the context.
2. The user and the configured list of groups are passed to the following function: `isMemberOfAnyOfGroups`.
3. This function (which is available in {{ product_name }} by default) verifies whether the given user belongs to any of the listed groups.
4. If the user belongs to any of the configured groups, authentication step 2 (TOTP) is prompted.

!!! note
      Find out more about the scripting language in the [Conditional Authentication API Reference]({{base_path}}/references/conditional-auth/api-reference/).

## Try it out

Follow the steps given below.

1. Access the application URL.
2. Try to log in with a user who does not belong to any of the configured groups (manager or employee). You will
   successfully sign in to the application.
3. Log out of the application.
4. Log in with a user who belongs to the `manager` or `employee` group or both.

    The user will be prompted to select the step-up method, and the sign-in flow will be stepped up according to the user's preference.

    ![group-based-2fa-conditional-auth-stepup-page]({{base_path}}/assets/img/guides/conditional-auth/totp-passkey-step-up.png){: width="300" style="border: 0.3px solid lightgrey;"}
