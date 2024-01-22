# Passkey Progressive Enrollment

The passkey progressive enrollment adaptive script is only required if **Passkey** is set as a first authentication factor and you wish to enable passkey progressive enrollment. This enables users to enroll their passkeys at the moment they are signing in to the application.

The primary objective of this script is to smoothly transition users to use passkeys as their primary authentication method.

!!! info
    Learn how to set up passkey login and enable passkey progressive enrollment for applications in [Add Passkey Login]({{base_path}}/guides/authentication/passwordless-login/add-passwordless-login-with-passkey/).

## Overview

The script is designed to execute during the authentication flow. When a user initiates passkey enrollment, the system prompts the user to log in with one of the other configured first-factor authentication methods. After successfully logging in, the user is guided through the passkey enrollment.

!!! warning
    For the script to properly function, you must have one or more additional authenticators configured in the first step alongside **Passkey**.

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