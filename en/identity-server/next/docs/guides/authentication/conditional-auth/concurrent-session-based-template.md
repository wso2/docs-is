{% set product_name = "WSO2 Identity Server" %}
{% set product_url = "https://localhost:9443" %}
{% set product_url_format = "https://localhost:9443" %}
{% set product_url_sample = "https://localhost:9443" %}

# Add concurrent sessions based access control

You can effectively control the number of concurrent user sessions for an application by implementing the **Session-Based** conditional authentication template. Users are redirected to a dedicated page where they can manage their existing sessions or cancel the current authentication request if they exceed the number of allowed concurrent sessions.

## Scenario

Consider a scenario with two roles, `admin` and `manager`. Users belonging to these roles are limited to having only 
one active session at a time. If they try to initiate a second session, they will be presented with a list of their current sessions and offered with the following two options:

- Terminate any of their existing sessions.
- Cancel their current authentication attempt.

## Prerequisites

- You need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

- Create two roles named `admin` and `manager` in application audience selecting the created application or create roles in organization audience and associate to the created application.

      - [Managing roles]({{base_path}}/guides/users/manage-roles/)

- Assign user accounts to the created roles. For instructions, see the following:

      - [Managing users]({{base_path}}/guides/users/manage-users/#onboard-a-user)
      - [Assigning users to roles]({{base_path}}/guides/users/manage-roles/#assign-users-to-a-role)



## Configure the login flow

To configure the login flow with concurrent session-based access control:

1. On the {{ product_name }} Console, click **Applications**.
2. Select the relevant application and go to its **Sign-in Method** tab.
3. Add concurrent session-based access control using your preferred editor

    ---
    === "Classic Editor"
        To add concurrent session management-based access control using the classic editor:

        1. Click **Start with default configuration** to define the login flow starting with the `username and password` login.

        2. Turn on **Conditional Authentication** by switching the toggle on.

        3. Select the **User** > **Concurrent Session Management Template** template.

    === "Visual Editor"
        To add concurrent session management-based access control using the visual editor:

        1. Switch to the **Visual Editor** tab, and expand **Predefined Flows** > **Conditional Login Flows** > **User**.

        2. Click **+ ADD** next to **Concurrent Session Management Template** to add the user-age-based access control script.

            <!--![Age-based access control with visual editor]({{base_path}}/assets/img/guides/conditional-auth/age-based-access-control-with-visual-editor.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}-->

        3. Click **Confirm** to replace any existing script with the selected predefined script.

    ---

4. Update the following parameter in the script.

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
                <td>Comma-separated list of user roles. Two-factor authentication should apply to users from these roles.</p> For this example scenario, enter <code>admin</code> and <code>manager</code>.</td>
            </tr>
            <tr>
                <td><code>maxSessionCount</code></td>
                <td><p>The number of allowed sessions for the user</p> For this example scenario, enter <code>1</code> as we allow only one concurrent active sessions per user.</td>
            </tr>
            <tr>
                <td><code>MaxSessionCount</code></td>
                <td><p>The number of allowed sessions for the user</p> For this example scenario, enter <code>1</code> as we allow only one concurrent active sessions per user. Use the same value assigned for <code>MaxSessionCount</code>.</td>
            </tr>
        </tbody>
    </table>

5. Click **Update** to confirm.

## How it works

Shown below is the user age-based conditional authentication template.

```js
// This script will prompt concurrent session handling
// to one of the given roles
// If the user has any of the below roles, concurrent session handling will be prompted
// and it will either kill sessions or abort login based on number of active concurrent user sessions
var rolesToStepUp = ['admin', 'manager'];
var maxSessionCount = 1;

var onLoginRequest = function(context) {
   executeStep(1, {
       onSuccess: function (context) {
       // Extracting authenticated subject from the first step
           var user = context.currentKnownSubject;
           // Checking if the user is assigned to one of the given roles
           var hasRole = hasAnyOfTheRolesV2(context, rolesToStepUp);

           if (hasRole) {
               Log.info(user.username + ' Has one of Roles: ' + rolesToStepUp.toString());
                   executeStep(2, {
                       authenticatorParams: {
                            local: {
                                 SessionExecutor: {
                                      MaxSessionCount: '1'
                                 }
                            }
                       }
                   }, {});
           }
       }
   });
};
```

Let's look at how this script works.

1. When step 1 of the authentication flow is complete, the onLoginRequest function retrieves the authenticating user from the context.
2. The function verifies whether the authenticating user is a member of the roles listed in `rolesToStepUp`.
3. If the authenticating user is assigned to one or more roles in `rolesToStepUp`, authentication step 2 is prompted with `maxSessionCount` being passed as a parameter to the Active Sessions Limit handler.

!!! note
    Find out more about the scripting language in the [Conditional Authentication API Reference]({{base_path}}/references/conditional-auth/api-reference/).

## Try it out

Follow the steps given below.

1. Access the application URL.

2. Log in to the application as a user belonging to the `admin` or `manager`.

3. Attempt to log in as the same user from a second browser.

    Now, the user will receive a prompt, allowing them to either terminate one of their existing sessions or deny the authentication request for the second session.
