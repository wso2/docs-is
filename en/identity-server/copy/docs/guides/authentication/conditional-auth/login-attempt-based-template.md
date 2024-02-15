{% set product_name = "WSO2 Identity Server" %}
{% set product_url = "https://localhost:9443" %}
{% set product_url_format = "https://localhost:9443" %}
{% set product_url_sample = "https://localhost:9443" %}

# Add MFA based on login attempts

You can enable a more secure login flow for users based on the number of invalid login attempts by applying the **Login-Attempt-Based** conditional authentication template for Adaptive MFA. This template enables two-factor authentication with TOTP for users who exceed the number of invalid login attempts you specify.

## Scenario

Consider a scenario where the login flow of the application is stepped up with TOTP if a user exceeds three failed login attempts. The authentication steps are as follows:

1. Username and password
2. TOTP

![Login attempt-based adaptive authentication]({{base_path}}/assets/img/guides/conditional-auth/login-attempt-based-adaptive-auth.png)

## Prerequisites

You need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

## Configure the login flow

To enable conditional authentication:

1. On the {{product_name}} Console, click **Applications**.

2. Select the relevant application and go to it's **Sign-in Method** tab.

3. Add login attempt-based adaptive MFA using your preferred editor:

    ---
    === "Classic Editor"
        To add login-attempt-based adaptive MFA using the classic editor:

        1. Click **Start with default configuration** to define the login flow starting with the `username and password` login.

        2. Turn on **Conditional Authentication** by switching the toggle on.

        3. Select the **User** > **Login-Attempt-Based** template.

    === "Visual Editor"
        To add login-attempt-based adaptive MFA using the visual editor:

        1. Switch to the **Visual Editor** tab, and expand **Predefined Flows** > **Conditional Login Flows** > **Users**.

        2. Click **+ ADD** next to **Login-Attempt-Based** to add the login attempt-based adaptive MFA script.

            ![Role-based adaptive MFA with visual editor]({{base_path}}/assets/img/guides/conditional-auth/login-attempt-based-adaptive-mfa-with-visual-editor.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

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
               <td><code>invalidAttemptsToStepup</code></td>
               <td><p> Minimum number of attempts made by a user to prompt 2FA..</p> For this example scenario, enter <code>3</code>.</td>
            </tr>
         </tbody>
      </table>

6. Click **Update** to confirm.

## How it works

Shown below is the script of the login-attempt-based conditional authentication template.

```js
// This script will step up authentication for any user who has exceeded 3 invalid login attempts continuously.
// This variable is used to define the number of invalid attempts allowed before prompting the second facto.
var invalidAttemptsToStepup = 3;

var failedLoginAttemptsBeforeSuccessClaim= 'http://wso2.org/claims/identity/failedLoginAttemptsBeforeSuccess';
var onLoginRequest = function(context) {
  doLogin(context);
};

var doLogin = function(context) {
   executeStep(1, {
       onSuccess : function(context){
           var user = context.steps[1].subject;
           if (isExceedInvalidAttempts(user)) {
               executeStep(2, {
                 onSuccess : function(context) {
                   var user = context.steps[1].subject;
                   user.localClaims[failedLoginAttemptsBeforeSuccessClaim] = "0";
                 }
               });
           }
       },
       onFail : function(context) {
           // Retry the login..
           doLogin(context);
       }
   });
};

var isExceedInvalidAttempts  = function(user) {
   if (user.localClaims[failedLoginAttemptsBeforeSuccessClaim] >= invalidAttemptsToStepup) {
       return true;
   } else {
       return false;
   }
};
```

Let's look at how this script works.

<!-- ADD CONTENT -->

!!! note
      Find out more about the scripting language in the [Conditional Authentication API Reference]({{base_path}}/references/conditional-auth/api-reference/).

## Try it out

Follow the steps given below.

1. Access the application URL.
2. Try to log in, but use invalid credentials.
3. Repeat step 2 for two more attempts making three failed login attempts.
4. Try to log in to the application using valid credentials.

    The user will be prompted to enter the TOTP received on their registered TOTP authenticator.

    ![Login Attempt-based-2fa-conditional-auth-stepup-page]({{base_path}}/assets/img/guides/conditional-auth/totp-step-up.png){: width="300" style="border: 0.3px solid lightgrey;"}