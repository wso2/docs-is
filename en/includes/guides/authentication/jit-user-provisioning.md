# Configure Just-in-Time user provisioning

This guide explains the concept of Just-In-Time (JIT) user provisioning, why and when to use it, and also the instructions for configuring it.

## How JIT provisioning works

Just-in-Time (JIT) user provisioning is a method used to store a user's identity and user attributes in the {{ product_name }} user store when the user logs in with an external identity provider (IdP)

The flow of JIT user provisioning is as follows:

1. When an application initiates an authentication request, the user gets redirected to {{ product_name }}.

2. If the user selects an external IdP for authentication, {{ product_name }} redirects the user to the relevant IdP.

3. If {{ product_name }} receives a positive authentication response from the external IdP, JIT provisioning is triggered.

4. {{ product_name }} creates a user account in its internal user store along with the user attributes obtained from the authentication response.

![How JIT user provisioning works]({{base_path}}/assets/img/guides/jit-provisioning/how-jit-works.png){: width="800" style="display: block; margin: 0;"}

With this process, new user accounts are automatically provisioned to {{ product_name }} when users log in with external IdPs.


## Enable/Disable JIT user provisioning

!!! Prerequisite
    [Register the external IdP]({{base_path}}/guides/authentication/federated-login/) as a connection in {{product_name}}.

To enable/disable JIT user provisioning for an external Identity provider:

1. On the {{ product_name }} Console, click **Connections** and select the relevant connection.

2. Go to the **Just-in-Time Provisioning** tab of the selected connection.

3. Check/Uncheck the **Just-in-Time (JIT) User Provisioning** checkbox to enable/disable it.

    ![JIT user provisioning configuration is enabled]({{base_path}}/assets/img/guides/jit-provisioning/jit-enabled.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Update** to save.

!!! note
    - When JIT is enabled, {{ product_name }} updates the existing local account created with the same email address or if a new user, creates a user profile with the user attributes received from the external IdP.
    <br />
    - When JIT is disabled, a user profile is not created. Therefore, there is no location to store the attributes of the user. In such cases, the attributes are directly passed to the application.

!!! warning
    If you have configured multi-factor authentication (MFA), disabling JIT user provisioning might break the application login flow. Learn more about [troubleshooting sign-in flow errors with JIT](#troubleshoot-sign-in-flow-errors).

{% if product_name == "WSO2 Identity Server" %}
## Preserve locally added claims of JIT provisioned users

If a user already having an account in {{product_name}} logs in using federated login with the same email address, {{product_name}} deletes any locally added claims of the user and retains only the claims provided by the federated authenticator.

If you wish to change this default behavior and preserve the locally added claims of the user, go to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` directory and add the following configuration.

``` toml
[authentication.jit_provisioning]
preserve_locally_added_claims = "true"
```

!!! note
    If an identity provider is created using the [Identity Provider REST APIs]({{base_path}}/apis/idp/) with the `provisioning.jit.attributeSyncMethod` property set, this will take precedence over the above configuration.
{% endif %}

## Troubleshoot sign-in flow errors

If you have disabled JIT provisioning for an IdP, applications that use [multi-factor authentication]({{base_path}}/guides/authentication/mfa/) may break as certain MFA mechanisms (such as TOTP and Email OTP) require users to have local accounts in {{ product_name }}.

When configuring an application's sign-in flow involving JIT-disabled IdPs and such MFA options, {{product_name}} displays the following warning:

![MFA based Sign-in flow with JIT user provisioning]({{base_path}}/assets/img/guides/jit-provisioning/jit-mfa-conflict.png){:style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

To avoid unexpected errors, you can use the following conditional authentication script to skip the MFA step when using JIT-disabled connectors.

```js
var localAuthenticator = 'LOCAL';
var onLoginRequest = function (context) {
    executeStep(1, {
        onSuccess: function (context) {
            var step = context.steps[1];
            if (step.idp == localAuthenticator) {
                executeStep(2); // MFA Step
            }
        }
    });
};
```

!!! note
    For more information on this script, refer to the [sign-in option-based conditional authentication script]({{base_path}}/guides/authentication/conditional-auth/sign-in-option-based-template/#how-it-works).
