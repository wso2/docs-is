# Add conditional authentication

With conditional authentication, the login flow in an application is dependent on the risk factors associated with the user's login request.
This allows you to strengthen the authentication flow when the risk is higher. In {{ product_name }}, conditional authentication is configured using a [script](#authentication-script).

![what is conditional authentication](../../../assets/img/guides/conditional-auth/conditional-auth-intro.png)

## Authentication script

The authentication script for configuring dynamic authentication flows in {{ product_name }} uses a functional language similar to Javascript. You can configure the script using the script editor in the {{ product_name }} Console. You can either use a [template](#script-templates) or [write a custom script](../../guides/authentication/conditional-auth/write-your-first-script/).

This scripting language supports a set of inbuilt [functions](../../../references/conditional-auth/api-reference/#utility-functions) and [objects](../../../references/conditional-auth/api-reference/#object-reference). A simple conditional authentication script will look like the following:

```js
var onLoginRequest = function(context) {
    // Some possible initializations...
    executeStep(1);
        if (doStepUp(context) === true) { 
            executeStep(2);
        }
};

function doStepUp(context) {
    // A function that decides whether to enforce second step based on the request context.
    return true;
}
```

!!! note
    Find out more about the scripting language in the [Conditional Authentication API Reference](../../references/conditional-auth/api-reference/).

## Script templates

The script editor in {{ product_name }} comes with a set of predefined templates to get you started with some of the most common conditional authentication scenarios. These scripts contain inline comments explaining the conditions that are applied.

![conditional-auth-templates-view](../../../assets/img/guides/conditional-auth/conditional-auth-templates.png)<br>

<!--
You can define scripts that can consider the following evaluation criteria:

- User attributes
- User behavior
- Authentication Request Attributes
- Application attributes

You can define dynamic authentication flows that can perform actions similar to the following:

- Control the authentication step selection
- Change user attributes
- Send email notifications
- Redirect users to an error page etc. 

We will discuss the scenario that the template covers, the prerequisites, the
required parameters, the default authentication steps, and how you can try out the behavior of this template.
-->

The available templates are categorized as follows:
- Access Control - These templates restrict user login to the application based on specified conditions.
- Adaptive MFA - These templates prompt two-factor authentication for login attempts based on specific conditions.

The pre-defined templates are listed below.

| Template  | Description |
|-----------|-------------|
| [User-Age-Based](../../guides/authentication/conditional-auth/user-age-based-template/) | This configures a login flow where users can log in only if their age is over the configured value. The user's age is calculated using the `date of birth` attribute. |
| [Group-Based (Access Control)](../../guides/authentication/conditional-auth/group-based-template-access-control/) | This login flow allows login only for users who belong to any of the given set of groups  |
| [Sign-In-Option-Based](../../guides/authentication/conditional-auth/sign-in-option-based-template/) | This login flow prompts two-factor authentication (2FA) only for users who are signing in with a given option.  |
| [New-Device-Based](../../guides/authentication/conditional-auth/new-device-based-template/) | This login flow sends an email notification and/or prompts two-factor authentication for users who are logged in from a previously unused device. |
| [Group-Based (Adaptive MFA)](../../guides/authentication/conditional-auth/group-based-template/)  | This login flow prompts two-factor authentication (2FA) for users who belong to any of the given set of groups. |
| [IP-Based](../../guides/authentication/conditional-auth/ip-based-template/) | This login flow prompts two-factor authentication for users who log in from outside the given IP range. |

If required, you can also use the script editor to introduce new functions and fields to an authentication script based on your requirement. See the instructions on [writing a custom authentication script](../../guides/authentication/conditional-auth/write-your-first-script/).

## What's next

- [Configure conditional authentication](../../../guides/authentication/conditional-auth/configure-conditional-auth.md)
- [Conditional authentication API reference](../../../references/conditional-auth/api-reference/)
