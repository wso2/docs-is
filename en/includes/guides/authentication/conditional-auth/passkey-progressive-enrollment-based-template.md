# Passkey Progressive Enrollment

This method of adaptive authentication is specifically designed for applications that have set up **Passkey** as a login option and have enabled **passkey progressive enrollment** so that users may enroll passkeys at the moment they log in to an application.

!!! note
    Learn how to enable passkeys and passkey progressive enrollment in [Add Passkey login]({{base_path}}/guides/authentication/passwordless-login/add-passwordless-login-with-passkey/).

Follow the guide below to learn about the adaptive script smoothly transition users using other methods of authentication to use passkeys as their primary authentication method.

## Configure the login flow

The script is designed to execute during the authentication flow. When a user initiates passkey enrollment, the system prompts the user to log in with one of the other configured first-factor authentication methods. After successfully logging in, the user is guided through the passkey enrollment. To enable conditional authentication:

1. On the {{product_name}} Console, click **Applications**.

2. Select the relevant application and go to its **Login Flow** tab. 

3. Add the passkey progressive enrollment based adaptive script as follows.

    {% include "../../../guides/fragments/add-login/conditional-auth/passkey-progressive-enrollment.md" %}

    !!! warning "Important"
        Adding the passkey progressive enrollment adaptive script, modifies the authentication flow to include only the **Username & Password** and **Passkey** authenticators in the first step. If you need to include other authenticators in the first step, make sure to add them manually. Learn more in [How it works](#how-it-works).

4. Click **Update** to save your changes.

## How it works

Shown below is the conditional authentication template for passkey progressive enrollment.

```javascript
var onLoginRequest = function(context) {
    executeStep(1, {
        onFail: function(context) {
            var authenticatorStatus = context.request.params.scenario;

            // Passkey progressive enrollment flow trigger
            if (authenticatorStatus != null && authenticatorStatus[0] == 'INIT_FIDO_ENROLL') {
                var filteredAuthenticationOptions = filterAuthenticators(context.steps[1].options, 'FIDOAuthenticator');
                executeStep(1, {
                    stepOptions: {
                        markAsSubjectIdentifierStep: 'true',
                        markAsSubjectAttributeStep: 'true'
                    },
                    authenticationOptions: filteredAuthenticationOptions
                }, {
                    onSuccess: function(context) {
                        // Trigger FIDO Authenticator for Passkey enrollment
                        executeStep(1, {
                            stepOptions: {
                                forceAuth: 'true'
                            },
                            authenticationOptions: [{
                                authenticator: 'FIDOAuthenticator'
                            }]
                        }, {});
                    },
                });
            }
        }
    });
};
```

Let's look at how this script works:

1. If the user chooses **Sign In With Passkey** and consents to passkey enrollment, an `onFail` event is triggered. The parameter `scenario` returns the value `INIT_FIDO_ENROLL`, uniquely identifying the passkey enrollment request.

2. The `filterAuthenticators()` method takes the configured list of authenticators in the first step and the authenticator to be excluded and returns the list of authenticators excluding the Passkey authenticator(`FIDOAuthenticator`).

3. The user is then prompted for the first step of the authentication flow with `authenticationOptions` set to the list of filtered authenticators from the above step.

4. After successful authentication with an alternative authenticator, the script re-triggers the passkey authenticator. This allows users to seamlessly proceed with passkey enrollment.