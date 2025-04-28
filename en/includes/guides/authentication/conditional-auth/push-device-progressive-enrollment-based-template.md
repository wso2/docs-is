# Push Notification Device Progressive Enrollment

This method of adaptive authentication is specifically designed for applications that have set up **Push Notification** as a passwordless login option and have enabled **push notification device progressive enrollment** so that users may enroll their push notification devices at the moment they log in to an application.

!!! note
    Learn how to enable push notifications and push notification device progressive enrollment in [Add Push Notification login]({{base_path}}/guides/authentication/passwordless-login/add-passwordless-login-with-push-notification/).

Follow the guide below to learn about the adaptive script smoothly transition users using other methods of authentication to use push notification as their primary authentication method.

## Configure the login flow

The script is designed to execute during the authentication flow. When a user initiates push notification device enrollment, the system prompts the user to log in with one of the other configured authentication methods. After successfully logging in, the user is guided through the push notification device enrollment. To enable conditional authentication:

1. On the {{product_name}} Console, click **Applications**.

2. Select the relevant application and go to its **Login Flow** tab.

3. Add the push notification device progressive enrollment based adaptive script as follows.

    {% include "../../../guides/fragments/add-login/conditional-auth/push-device-progressive-enrollment.md" %}

    !!! warning "Important"
        Adding the push device progressive enrollment adaptive script, modifies the authentication flow to include only the **Username & Password** and **Push Notification** authenticators in the authentication flow. If you need to include other authenticators, make sure to add them manually. Learn more in [How it works](#how-it-works).

4. Click **Update** to save your changes.

## How it works

Shown below is the conditional authentication template for push device progressive enrollment.

```javascript
var onLoginRequest = function(context) {
    executeStep(1, {
        onFail: function(context) {
            var authenticatorStatus = context.request.params.scenario;

            // If it is a push notification device progressive enrollment request, trigger the following flow.
            if (authenticatorStatus != null && authenticatorStatus[0] === 'INIT_PUSH_ENROLL') {
                executeStep(2, {
                    stepOptions: {
                        markAsSubjectIdentifierStep: 'true',
                        markAsSubjectAttributeStep: 'true'
                    }
                }, {
                    onSuccess: function(context) {
                        // If the user is successfully authenticated
                        executeStep(1, {
                            stepOptions: {
                                forceAuth: 'true'
                            }
                        }, {});
                    }
                });
            }
        }
    });
};
```

Let's look at how this script works:

1. The user will be prompted for the username in the first step. Since the user does not have a push notification device enrolled, the user will be displayed with an option to enroll a push notification device or to cancel the enrollment.

2. If the user clicks on **Register** to enroll a push notification device, the `onFail` event is triggered. The parameter `scenario` returns the value `INIT_PUSH_ENROLL`, uniquely identifying the push notification device enrollment request.

3. The second step of the authentication flow is triggered where **Username & Password** authentication is enforced by default. The user needs to authenticate by entering the password for the previously mentioned username.

4. After successful authentication, the `onSuccess` event is triggered. The first step of the authentication flow is triggered again which contains Push notification authenticator. This time, the user will be shown with the QR code to scan and enroll the push notification device.

5. After successful registration, the user will be sent a push notification to authenticate. The user can approve the authentication request to complete the login process.