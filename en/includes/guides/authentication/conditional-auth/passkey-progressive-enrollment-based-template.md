# Add Passkey Progressive Enrollment

This document provides a comprehensive guide on implementing Passkey progressive enrollment in {{ product_name }} using an adaptive script. The primary objective of this script is to ensure a smooth transition for users to adopt Passkey as their primary authentication method.

!!! note "Important"
    This adaptive script will only be required if Passkey is set as a first authentication factor and there is a need to enable progressive Passkey enrollment.

## Overview of the Script's Functionality

The script is designed to execute during the authentication flow. When a user initiates passkey enrollment, the system prompts them with first-factor authentication methods, excluding Passkey. After successful authentication using one of these methods, the user is guided to the passkey enrollment stage. A successful enrollment results in user authentication within the system.

To configure Passkey progressive enrollment for your application, refer to the [Add Passkey Login]({{base_path}}/guides/authentication/passwordless-login/add-passwordless-login-with-passkey/) documentation.

!!! warning
    - For the script to function correctly, you must have Passkey configured alongside another set of authenticators in the first step.

## How the Script Works

Shown below is the script of the Passkey progressive enrollment conditional authentication template.

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

### Detailed Explanation

1. **Initial Authentication Display:**
    - All authenticators configured in the first step of the authentication flow are displayed to the user.

2. **Triggering Passkey Enrollment:**
    - If the user chooses Passkey authentication and consents to enrollment, an `onFail` event is triggered.
    - A parameter `scenario` with the value `INIT_FIDO_ENROLL` is returned, uniquely identifying the passkey enrollment request.

3. **Executing the Conditional Script:**
    - The `filterAuthenticators()` method takes the configured list of authenticators in the first step and the authenticator to be excluded (`FIDOAuthenticator`) and returns the list of authenticators excluding the Passkey authenticator.
    - This step ensures user authenticates using an alternative authenticator (like `Username & Password`, `Email OTP`, or federated authenticators like `Google`, `Facebook`, etc.) before enrolling in passkey.

4. **Re-triggering Passkey(FIDO) Authenticator:**
    - After successful authentication with an alternative authenticator, the script re-triggers the Passkey Authenticator.
    - This allows users to proceed with passkey enrollment seamlessly.

By following these steps, {{ product_name }} streamlines a user-friendly and secure authentication process. This approach not only encourages the adoption of Passkey as a primary authentication method but also enables on-the-fly passkey enrollment during the authentication phase. This dual functionality enhances both the security and the convenience of the user experience.
