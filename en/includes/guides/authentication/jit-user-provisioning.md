# Configure Just-in-Time (JIT) user provisioning

This guide explains the concept of Just-In-Time user provisioning, why and when to use it, and also the instructions for configuring it.

## How JIT provisioning works

Just-in-Time (JIT) user provisioning is a method used to store a user's identity and user claims in the {{ product_name }} user store when the user is authenticated through an [external identity provider (IdP)]({{base_path}}/guides/authentication/#manage-connections).

The flow of JIT user provisioning is as follows:

1. When an application initiates an authentication request, the user gets redirected to {{ product_name }}.

2. If the user has used an external identity provider for authentication, {{ product_name }} redirects the user to the selected external IdP.

3. {{ product_name }} receives a positive authentication response from the external IdP with the user information.

4. JIT provisioning is triggered and {{ product_name }} creates a user account in its internal user store along with the user claims obtained from the authentication response.

![How JIT user provisioning works]({{base_path}}/assets/img/guides/jit-provisioning/how-jit-works.png)

With this process, new user accounts are automatically provisioned to {{ product_name }} through external IdPs.

## Prerequisites

First, the external IdP should be registered in {{ product_name }} as a connection.

!!! note
    Learn more about how to enable login to your application using the following external IdPs:

    - [Facebook]({{base_path}}/guides/authentication/social-login/add-facebook-login/)
    - [Google]({{base_path}}/guides/authentication/social-login/add-google-login/)
    - [Github]({{base_path}}/guides/authentication/social-login/add-github-login/)
    - [OpenID Connect IdPs]({{base_path}}/guides/authentication/enterprise-login/add-oidc-idp-login/)
    - [SAML IdPs]({{base_path}}/guides/authentication/enterprise-login/add-saml-idp-login/)

## Enable/Disable JIT user provisioning

To enable/disable JIT user provisioning for an external Identity provider:

1. On the {{ product_name }} Console, click **Connections** and select the relevant IdP.

2. Go to the **Advanced** tab of the selected IdP.

3. JIT provisioning is enabled by default. You can uncheck the **Just-in-Time (JIT) User Provisioning**
 checkbox to disable it.
    ![JIT user provisioning configuration is enabled]({{base_path}}/assets/img/guides/jit-provisioning/jit-enabled.png)

4. Click **Update** to save.

!!! note
    - When JIT is enabled, {{ product_name }} will create a user profile and store the user attributes recieved from the external IdP.
    <br />
    - When JIT is disabled, a user profile is not created. Therefore, there is no location to store the attributes of the user. In such cases, the attributes are directly passed to the application.

!!! warning
    If you have configured multi-factor authentication (MFA), disabling JIT user provisioning might break the application login flow. Learn more about [troubleshooting sign-in flow errors with JIT](#troubleshoot-sign-in-flow-errors).

## Troubleshoot sign-in flow errors

If you have disabled JIT provisioning for an IdP, you need to validate its effect on your applications that use [multi-factor authentication]({{base_path}}/guides/authentication/mfa/). This is because certain MFA mechanisms (such as TOTP and EmailOTP) require the login users to have local accounts in {{ product_name }}.
Therefore, the application’s sign-in flow involving JIT-disabled IdPs and the MFA options will break by default.

In such scenarios, you will see the following warning in the application’s sign-in flow:

![MFA based Sign-in flow with JIT user provisioning]({{base_path}}/assets/img/guides/jit-provisioning/jit-mfa-conflict.png)

To avoid such errors, you can use one of the following options:

- Conditionally skip MFA

    You can skip MFA for external connections during the login flow by using the
    following example script:

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
        For more information on this script, refer the [sign-in option based conditional authentication script]({{base_path}}/guides/authentication/conditional-auth/sign-in-option-based-template/#how-it-works).


