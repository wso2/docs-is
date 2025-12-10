# Configure Just-in-Time user provisioning

This guide explains the concept of Just-In-Time (JIT) user provisioning, why and when to use it, and also the instructions for configuring it.

## Overview

Just-in-Time (JIT) user provisioning allows {{ product_name }} to automatically create a user account in its internal user store when a user successfully logs in using an external Identity Provider (IdP) for the first time.

This eliminates the need for manual user account creation in {{ product_name }} before users can log in using external IdPs.

JIT user provisioning works follows:

1. When an application initiates an authentication request, the user gets redirected to {{ product_name }}.

2. If the user selects an external IdP for authentication, {{ product_name }} redirects the user to the relevant IdP.

3. If {{ product_name }} receives a positive authentication response from the external IdP, JIT provisioning is triggered.

4. {{ product_name }} creates a user account in its internal user store along with the user attributes obtained from the authentication response.

![How JIT user provisioning works]({{base_path}}/assets/img/guides/jit-provisioning/how-jit-works.png){: width="800" style="display: block; margin: 0;"}

With this process, new user accounts are automatically provisioned to {{ product_name }} when users log in with external IdPs.

## Enable JIT user provisioning

!!! Prerequisite

    [Register the external IdP]({{base_path}}/guides/authentication/federated-login/) as a connection in {{product_name}}.

To enable JIT user provisioning for an external Identity provider:

1. On the {{ product_name }} Console, click **Connections** and select the relevant connection.

2. Go to the **Just-in-Time Provisioning** tab of the selected connection.

3. Check the **Just-in-Time (JIT) User Provisioning** checkbox to enable it. Uncheck to disable it.

    ![JIT user provisioning configuration is enabled]({{base_path}}/assets/img/guides/jit-provisioning/jit-enabled.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Update** to save.

!!! warning

    When JIT user provisionin is disabled, the following restrictions apply:

    - Since {{product_name}} does not create local user accounts for federated users, those users' attributes will not be stored in {{product_name}}. Instead, attributes from the external IdP are passed directly to the application.

    - If you have configured multi-factor authentication (MFA) that rely on a local user account, disabling JIT user provisioning breaks the application login flow for JIT provisioned users. Learn more about [troubleshooting sign-in flow errors with JIT](#troubleshoot-sign-in-flow-errors).

{% if show_advanced_account_linking_content == "true" %}

## Configure JIT user provisioning settings

When JIT user provisioning is enabled, you can configure the following settings to customize how {{ product_name }} provisions users.

{% if product_name == "WSO2 Identity Server" %}

### JIT provisioning scheme

This setting determines whether {{ product_name }} prompts users for credentials and consent when provisioning accounts through JIT. By default, {{ product_name }} provisions users silently without prompting for either consent or credentials.

![JIT provisioning schemes]({{base_path}}/assets/img/guides/jit-provisioning/jit-provisioning-scheme.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

- **Prompt for username, password, and consent** - Prompts the user for a username, password, and consent before account creation.

- **Prompt for password and consent** - Prompts the user to provide both a password and consent. The username is automatically derived from the federated identity.

- **Prompt for consent** - Prompts the user for consent before provisioning.

- **Provision silently**: Provisions the user automatically without prompting for either credentials or consent. This is the default behavior.

{% endif %}

### Attribute synchronization methods

This setting determines how {{ product_name }} synchronizes user attributes between the user's account in the external IdP and the corresponding local user account.

![Attribute Sync Methods]({{base_path}}/assets/img/guides/jit-provisioning/jit-attribute-sync.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

- **Override All** - Overrides all attributes of the local user account with the attributes received from the external identity provider each time the user logs in.

- **None** - No attributes are synchronized. The local user account retains its attributes.

- **Preserve local** - Overrides only the attributes that are received from the identity provider. Any additional attributes that exist in the local user account but are not provided by the identity provider are preserved.

### Local account linking

This setting allows you to link federated users to existing local user accounts based on configurable rules. The rules define how {{ product_name }} identifies a match between a federated user and a local user.

![Account linking]({{base_path}}/assets/img/guides/jit-provisioning/jit-account-linking.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

- **Enable local account linking** - Enables account linking. When enabled,
    - {{ product_name }} evaluates the defined account linking rules to determine whether the federated user matches an existing local user.
    - If a match is found, the federated user is automatically linked to the corresponding local account.
    - If no rules are defined, {{ product_name }} defaults to matching the email address.

- **Skip user provisioning when no local account is found** - By default, {{product_name}} creates a new local user account for the federated user if no account linking rule matches are found. This setting prevents {{product_name}} from creating a new local user account.

- **Link account if** - Configure the account linking rules. You can define a first match rule and a fallback match rule.
    - Each rule maps a federated attribute to its corresponding local attribute.
    - {{product_name}} evaluates the first match rule and if no match is found, applies the fallback match rule.
    - If none of the rules match, {{product_name}} creates a new local user account (unless the **Skip user provisioning when no local account is found** setting is enabled).

    !!! tip

        Ensure you select a local user attribute that is unique for each user to guarantee accurate and consistent user matching. Learn more about [configuring unique attributes]({{base_path}}/guides/users/attributes/configure-unique-attributes/).

{% endif %}

{% if product_name == "WSO2 Identity Server" and hide_legacy_sync_config != "true" %}

### Preserve locally added claims of JIT provisioned users

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
