# Add group-based access control

To control access to your application based on the user's group, you can apply the **Group-Based** conditional authentication template (which is in the **Access Control** section). Users are redirected to an error page if the user does not belong to any of the groups configured in the template.

## Scenario

Consider a scenario with two user groups, `manager` and `employee`. Login should be allowed to users assigned to these groups.

![Group-based access control]({{base_path}}/assets/img/guides/conditional-auth/group-based-access-control.png)

## Prerequisites

- You need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

- Create two user groups named `manager` and `employee` and assign user accounts to them. For instructions, see the following:
      - [Managing groups]({{base_path}}/guides/users/manage-groups/)
      - [Managing users]({{base_path}}/guides/users/manage-groups/)

## Configure the login flow

To enable conditional authentication:

1. On the {{product_name}} Console, click **Applications**.

2. Select the relevant application and go to it's **Login Flow** tab.

3. Add group-based access control using your preferred editor:

    ---
    === "Classic Editor"
        To add group-based access control using the classic editor:

        1. Click **Start with default configuration** to define the login flow starting with the `username and password` login.

        2. Turn on **Conditional Authentication** by switching the toggle on.

        3. Select the **Access Control > Group-Based** template.

    === "Visual Editor"
        To add group-based access control using the visual editor:

        1. Switch to the **Visual Editor** tab, and expand **Predefined Flows** > **Conditional Login Flows** > **Access Control**.

        2. Click **+ ADD** next to **Group-Based** to add the group-based access control script.
        
            ![Group-based access control with visual editor]({{base_path}}/assets/img/guides/conditional-auth/group-based-access-control-with-visual-editor.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        3. Click **Confirm** to replace any existing script with the selected predefined script.

    ---

{{asgardeo_auth_script_warning}}

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
               <td><code>groupsToAllowAccess</code></td>
               <td>An array of user groups that can access the application. For this scenario, enter <code>manager</code> and <code>employee</code>.</td>
            </tr>
         </tbody>
      </table>

7. Click **Update** to confirm.

## How it works

Shown below is the script of the group-based conditional authentication template for access control.

```js
// This script will allow access for any user who belongs
// to one of the given groups.
// If the user is a member of the following groups, user will be given access.
var groupsToAllowAccess = ['manager','employee'];

// Error page to redirect unauthorized users,
// can be either an absolute url or relative url to server root, or empty/null
// null/empty value will redirect to the default error page
var errorPage = '';

// Additional query params to be added to the above url.
// Hint: Use i18n keys for error messages
var errorPageParameters = {
    'status': 'Unauthorized',
    'statusMsg': 'You are not authorized to login to this application.'
};

var onLoginRequest = function(context) {
    executeStep(1, {
        onSuccess: function (context) {
            // Extracting authenticated subject from the first step.
            var user = context.currentKnownSubject;
            // Checking if the user is assigned to one of the given groups.
            var isMember = isMemberOfAnyOfGroups(user, groupsToAllowAccess);
            if (!isMember) {
                sendError(errorPage, errorPageParameters);
            }
        }
    });
};
```

Let's look at how this script works.

1. When the first step of the authentication flow is complete, the **onLoginRequest** function retrieves the user from the context.
2. The user and the configured list of groups are passed to the `isMemberOfAnyOfGroups` function.
3. The `isMemberOfAnyOfGroups` function, which is available in {{ product_name }} by default, verifies whether the given user belongs to any of the listed groups.
4. If the user belongs to any of the configured groups, the user will be able to log in successfully.

!!! note
      Find out more about the scripting language in the [Conditional Authentication API Reference]({{base_path}}/references/conditional-auth/api-reference/).

## Try it out

Follow the steps given below.

1. Access the application URL.
2. Try to log in as a user who belongs to the specified groups. This user will successfully log in to the application.
3. Log out of the application.
4. Log in again as a user who does not belong to the specified groups. The user will see the following error.

    ![authentication failed]({{base_path}}/assets/img/guides/conditional-auth/auth-failure.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

