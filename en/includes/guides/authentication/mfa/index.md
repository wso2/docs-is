# Add multi-factor authentication

Multi-Factor Authentication (MFA) allows you to grant access to your resources by using two (2-Factor) or more (Multi-Factor) factors to authenticate users. If one factor is compromised or broken, an attacker still has at least one more barrier to breach before successfully breaking into the resource. MFA provides an additional layer of security to the resource.

Authentication factors in MFA rely on two or more independent credentials of the three categories given below.

- **Knowledge factor**  - Something you know, such as a password or a PIN.
- **Possession factor** - Something you have, such as a FIDO key or an ATM card.
- **Inherence factor**  - Something you are, such as your fingerprint or your iris pattern.

On {{ product_name }}, the default authentication mechanism is **username and password**.

![Configuring only username and password authentication]({{base_path}}/assets/img/guides/mfa/one-factor-auth.png)

The {{ product_name }} Console allows configuring multi-step authentication where you can define an authentication chain containing different authenticators in each step. By adding different authenticators, you can achieve a login flow secured by multiple factors.

![Configuring MFA with username and password authentication]({{base_path}}/assets/img/guides/mfa/mfa-config.png)

You can choose to replace the **username and password** authentication with social or enterprise logins and add a few more authenticators to build your authentication chain.

## Configure multi-factor authentication

{{product_name}} provides two modes to configure multi-factor authentication, namely the **Classic Editor** and the **Visual Editor**.

Given below are the main steps you will follow when enabling MFA in your login flow.

1. On the {{ product_name }} Console, go to **Applications** and select the application to which MFA needs to be added.

2. Go to the **Login Flow** tab where the application login flow is defined.

3. Add the required authenticators that should be enforced at each step. You can add authenticators using any one of the following editors:

    - Using the classic editor

        ![Configuring MFA in {{product_name}} using the classic editor]({{base_path}}/assets/img/guides/mfa/add-mfa-authenticator.png)

    - Using the classic editor

        ![Configuring MFA in {{product_name}} using the visual editor]({{base_path}}/assets/img/guides/mfa/add-mfa-authenticator-visual-editor.png)

## What's next?

Learn how to enable MFA using the following authenticators:

- [TOTP]({{base_path}}/guides/authentication/mfa/add-totp-login/)
- [Email OTP]({{base_path}}/guides/authentication/mfa/add-emailotp-login/)
- [SMS OTP]({{base_path}}/guides/authentication/mfa/add-smsotp-login/)
- [Passkey]({{base_path}}/guides/authentication/mfa/add-passkey-login/)
- [Push Notification]({{base_path}}/guides/authentication/mfa/add-push-auth-login/)
{% if product_name == "Asgardeo" %}
- [iProov]({{base_path}}/guides/authentication/mfa/add-iproov-login/)
- [Duo]({{base_path}}/guides/authentication/mfa/add-duo-login/)
{% endif %}