# Add Authsignal login

[Authsignal](https://www.authsignal.com/){: target="_blank"} is a multi-factor authentication (MFA) service that lets users verify themselves with methods such as passkeys, authenticator apps, SMS, and email one-time passwords.

In this guide, you'll learn how to add Authsignal as a second factor to the login flow of your application. You'll also learn how to use Authsignal to verify users when they register or reset their password.

## How it works

When a user signs in, they first enter their username and password. They then get redirected to an Authsignal page, where they verify themselves using one of the methods you enabled in Authsignal. Once they complete the verification, Authsignal sends them back to {{ product_name }} and they get signed in to the application.

You decide which verification methods to offer, and when to ask for them, in the Authsignal Portal. {{ product_name }} only needs to know which Authsignal flow to run.

## Prerequisites

Before you begin, ensure you have the following:

- [Authsignal account](https://www.authsignal.com/){: target="_blank"}: Access to the Authsignal Portal.
- [{{ product_name }} account](https://asgardeo.io/signup){: target="_blank"}: Access to the {{ product_name }} Console with administrative privileges.

## Set up Authsignal

1. Log in to the Authsignal Portal.

2. Create a flow for sign-in and enable the verification methods you want to offer, such as passkeys or authenticator apps. Take note of the flow's **action code**, for example, `sign-in`.

    !!! tip
        You can create separate flows for different situations, for example, one for sign-in and another for registration. Each flow has its own action code.

3. Go to **Settings** > **API keys** and take note of the following:

    - The **Server API secret key**.
    - The **region** of your Authsignal tenant, shown in the **API Host**. For example, `us`, `eu`, or `au`.

## Connect Authsignal to {{ product_name }}

1. On the {{ product_name }} Console, go to **Connections** and select **Authsignal**.

    ![Authsignal in the connections list]({{base_path}}/assets/img/guides/mfa/authsignal/connector-listing.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Go to the **Settings** tab and enter the following details:

    - **Secret key**: The Server API secret key from the Authsignal Portal.
    - **Region**: The region of your Authsignal tenant.
    - **Action code**: The action code of your sign-in flow. {{ product_name }} runs this flow unless you choose a different one for a specific step.

    ![Authsignal settings]({{base_path}}/assets/img/guides/mfa/authsignal/connector-configuration.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Click **Update**.

## Add Authsignal to the login flow of an application

Authsignal works as a second factor, so users need to identify themselves first.

1. On the {{ product_name }} Console, go to **Applications** and select your application.

2. Go to the **Login Flow** tab and set up the following steps:

    - **Step 1**: Add **Identifier First**.
    - **Step 2**: Add **Username & Password**. Then, click **+ Add Sign In Option** in the same step and select **Authsignal**.

    ![Login flow with Authsignal]({{base_path}}/assets/img/guides/mfa/authsignal/login-flow.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Click **Update**.

## Try it out

1. Open your application and click **Login**.

2. Enter your username.

3. On the next page, select **Sign In With Authsignal**.

4. Complete the verification on the Authsignal page using one of the methods you enabled.

You'll be signed in to the application once the verification succeeds.

## Use a different Authsignal flow for some users

You can run a different Authsignal flow based on who is signing in. For example, you can ask administrators for a stronger verification than other users.

To do so, add a [conditional authentication]({{base_path}}/guides/authentication/conditional-auth/) script to the login flow and pass the action code of the flow to the Authsignal step. The following script runs the `step-up` flow for users with the `admin` role and the `sign-in` flow for everyone else.

```js
var onLoginRequest = function (context) {
    executeStep(1, {
        onSuccess: function (context) {
            var isAdmin = hasAnyOfTheRoles(context.currentKnownSubject, ["admin"]);
            executeStep(2, {
                authenticatorParams: {
                    local: {
                        "authsignal-authenticator": { actionCode: isAdmin ? "step-up" : "sign-in" }
                    }
                }
            }, {});
        }
    });
};
```

Make sure that a flow with each action code you use exists in the Authsignal Portal.

## Add Authsignal to registration and password recovery

You can also ask users to verify themselves with Authsignal when they register, accept an invitation, or reset their password.

1. On the {{ product_name }} Console, go to **Flows** and select the flow you want to update.

2. Drag the **Authsignal** step into the flow:

    - **Self registration**: Place it after the form that collects the user's details. The form must ask for an email address or a mobile number.
    - **Invited user registration** and **password recovery**: Place it after the user is identified and before the password step.

    ![Registration flow with the Authsignal step]({{base_path}}/assets/img/guides/mfa/authsignal/registration-flow.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Optionally, select the Authsignal step and enter an **Action code** to run a different Authsignal flow for this step, for example, a `sign-up` flow for registration. If you leave it empty, the step uses the action code from the Authsignal settings.

    ![Action code of the Authsignal step]({{base_path}}/assets/img/guides/mfa/authsignal/action-code-property.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Publish**.

When a user registers, the verification methods they set up in Authsignal, such as a passkey, are saved to their new account, so they can use them the next time they sign in.

!!! note
    - For registration, the Authsignal flow must verify the email address or mobile number the user entered, for example, with an email or SMS one-time password.
    - For password recovery, use an Authsignal flow that only verifies methods the user already has, and doesn't let them add new ones.

## What Authsignal updates in user profiles

Authsignal updates the following details in a user's profile in {{ product_name }}.

- **Verified email address and mobile number**: After a user registers, {{ product_name }} marks their email address as verified only if the user verified the same email address in Authsignal. The same applies to the mobile number. {{ product_name }} never copies an email address or mobile number from Authsignal to the user's profile.

- **Passkey status**: Each time a user completes an Authsignal flow, {{ product_name }} records whether the user has a passkey in Authsignal. It saves this in the `passkeyManagedExternally` attribute (`http://wso2.org/claims/identity/passkeyManagedExternally`) of the user. If saving it fails, the user can still sign in or register.

## Recover from a failed account link

After a user registers, {{ product_name }} links the verification methods they set up in Authsignal to their new account. If {{ product_name }} can't reach Authsignal at that point, it can try again the next time the user signs in.

To allow this, create a [custom attribute]({{base_path}}/guides/users/attributes/user-attributes/manage-attributes/) named `authsignalChallengeId` (`http://wso2.org/claims/authsignalChallengeId`). Make it read-only, and don't show it to users. {{ product_name }} uses it to remember the pending link.

!!! note
    - The user must sign in again within 10 minutes of registering, which is the default validity period in Authsignal. After that, the pending link expires.
    - If the attribute doesn't exist or the link expires, the user has to set up their verification methods in Authsignal again.
