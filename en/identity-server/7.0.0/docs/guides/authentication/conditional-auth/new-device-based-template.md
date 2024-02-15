{% set product_name = "WSO2 Identity Server" %}
{% set product_url = "https://localhost:9443" %}
{% set product_url_format = "https://localhost:9443" %}
{% set product_url_sample = "https://localhost:9443" %}

# Add MFA based on user device

You can apply the **New-Device-Based** conditional authentication template to your application to enable a more secure login flow for users who log in from a previously unused device.

When the user signs in from a previously unused device, this template enables two-factor authentication and/or sends an email notification when the user passes the first authentication step. A cookie is used to identify whether the device has been used before. When the cookie expires (this expiry time is specified in the template), the same browser or device is considered a new device.

## Scenario

Consider a scenario where users who log in to an application from a new device or browser should be prompted with TOTP as a second authentication step. The two authentication steps are as follows:

1. Username and password
2. TOTP

An email should also be sent to the user with details of the login attempt.

## Prerequisites

- You need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

- You need to have a user account in {{ product_name }}. If you don't already have one, [create a user account]({{base_path}}/guides/users/manage-users/#onboard-a-user) in {{ product_name }}.

- Go to the user's profile and add the email address for the user. For instructions, see [Manage user profiles]({{base_path}}/guides/user-self-service/update-profile-info/).

## Configure the login flow

To enable conditional authentication:

1. On the {{product_name}} Console, click **Applications**.

2. Select the relevant application and go to it's **Sign-in Method** tab.

3. Add New-Device-based adaptive MFA using your preferred editor:

    ---
    === "Classic Editor"
        To add New-Device-based adaptive MFA using the classic editor:

        1. Click **Start with default configuration** to define the login flow starting with the `username and password` login.

        2. Turn on **Conditional Authentication** by switching the toggle on.

        3. Select the **Request > Device-Based** template.

    === "Visual Editor"
        To add New-Device-based adaptive MFA using the visual editor:

        1. Switch to the **Visual Editor** tab, and expand **Predefined Flows** > **Conditional Login Flows** > **Request**.

        2. Click **+ ADD** next to **New-Device-Based** to add the New-Device-based adaptive MFA script.

            ![New-device-based access control with visual editor]({{base_path}}/assets/img/guides/conditional-auth/new-device-based-adaptive-mfa-with-visual-editor.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        3. Click **Confirm** to replace any existing script with the selected predefined script.

    ---

4. Verify that the login flow is now updated with the following two authentication steps:

    - Step 1: Username and Password
    - Step 2: TOTP

5. Update the following parameters in the script.
    <!-- markdownlint-disable-file MD037 -->
    <table>
        <thead>
            <tr>
                <th>Parameter</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><code>sendNotification</code></td>
                <td><p>Specifies whether email notifications should be sent to users.</p> For this scenario, set this parameter to <code>true</code>.</td>
            </tr>
            <tr>
                <td><code>cookieName</code></td>
                <td>A user-defined cookie name to be used for device identification.</td>
            </tr>
            <tr>
                <td><code>deviceRememberPeriod</code></td>
                <td><p>The length of time <b>in seconds</b> for which this device should be remembered as a trusted device. Once this time period passes, login attempts are considered as new device logins.</p>For example, you can specify two years as follows: <code>60 * 60 * 24 * 365 * 2</code></td>
            </tr>
        </tbody>
    </table>

6. Click **Update** to confirm.

## How it works

Shown below is the script of the device-based conditional authentication template.

```js
// This script will step up authentication and send email notification in case of
// a user being logging in from a new device (identified by a cookie).

// Amount of time in seconds to remember a device. Set to 2 years below.
var deviceRememberPeriod = 60 * 60 * 24 * 365 * 2;

// Cookie name to be set
var cookieName = 'deviceAuth';

// Whether to send a notification on new device login
var sendNotification = true;

// Whether to step up authentication for new device login
var stepUpAuthentication = true;

// Email template to be used for new device login notification
var emailTemplate = 'UnseenDeviceLogin';


var onLoginRequest = function(context) {
    executeStep(1, {
        onSuccess: function (context) {
            subject = context.currentKnownSubject;
            if (!validateCookie(context, subject)) {
                Log.debug('New device login for ' + subject.identifier);

                if (sendNotification === true) {
                    var templatePlaceholders = {
                        'username': subject.identifier,
                        'login-time': new Date().toUTCString()
                    };
                    var isSent = sendEmail(subject, emailTemplate, templatePlaceholders);
                    if (isSent) {
                         Log.debug('New device login notification sent to ' + subject.identifier);
                    } else {
                         Log.debug('New device login notification sending failed to ' + subject.identifier);
                    }
                }

                if (stepUpAuthentication === true) {
                    Log.debug('Stepping up authentication due to a new device login for ' + subject.identifier);
                    executeStep(2, {
                        onSuccess: function (context) {
                            setCookie(context.response, cookieName, subject.identifier, {
                                'sign': true,
                                'max-age': deviceRememberPeriod,
                                'sameSite': 'LAX'
                            });
                        }
                    });
                }
            }
        }
    });
};

//Validate if the user has a valid cookie with the value as subject's username
var validateCookie = function(context, subject) {
    var cookieVal = getCookieValue(context.request, cookieName, {'validateSignature': true});
    return subject.identifier === cookieVal;
};
```

Let's look at how this script works.

1. The **validateCookie** function verifies whether the user has a valid cookie for the logged-in user. This function calls the [getCookieValue(request, name, properties)]({{base_path}}/references/conditional-auth/api-reference/#get-cookie-value) function. The cookie name is configured with the **cookieName** parameter.

2. When step 1 of the authentication flow is complete, the **onLoginRequest** function validates the **deviceAuth** cookie.

3. If there is no valid cookie found, the function checks whether the **sendNotification** and **stepUpAuthentication** parameters are enabled.

4. If the **sendNotification** property is enabled, the [sendEmail(user, templateId, placeholderParameters)]({{base_path}}/references/conditional-auth/api-reference/#send-email) function is called to send the notification email with the login timestamp. The email template is set as **UnseenDeviceLogin** in the **emailTemplate** variable.

5. If the **stepUpAuthentication** parameter is enabled, step 2 of the authentication flow is executed.

6. On the successful execution of step 2 of the authentication flow, the [setCookie(response, name, value, properties)]({{base_path}}/references/conditional-auth/api-reference/#set-cookie) function is called to set a **deviceAuth** cookie.

!!! note
    Find out more about the scripting language in the [Conditional Authentication API Reference]({{base_path}}/references/conditional-auth/api-reference/).

## Try it out

Follow the steps given below.

1. Access the application URL from a new device or browser.

2. Try to log in to the application. TOTP authentication is prompted and the configured email of the user receives the email notification.

    <!--![new-device-email-notification-sample]({{base_path}}/assets/img/guides/conditional-auth/new-device-email-notification.png){: style="border: 0.3px solid lightgrey;"}-->

3. Log out of the application.

4. Log in with the same user from the same device/browser. You will successfully log in to the application with only the basic authentication.
