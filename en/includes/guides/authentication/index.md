# Authentication

See the topics given below to manage authentication for your applications.

## Design the login flow

When you register an application, you can customize the login flow.

- Configure {{ product_name }} login for [single-page applications with OIDC]({{base_path}}/guides/authentication/add-login-to-single-page-app/) or [web applications]({{base_path}}/guides/authentication/add-login-to-web-app/) with OIDC or SAML.

- Add [social login]({{base_path}}/guides/authentication/social-login/) options such as [Google]({{base_path}}/guides/authentication/social-login/add-google-login/), [Facebook]({{base_path}}/guides/authentication/social-login/add-facebook-login/), [Apple]({{base_path}}/guides/authentication/social-login/add-apple-login/), and [Microsoft]({{base_path}}/guides/authentication/social-login/add-microsoft-login/).

- Add other [enterprise identity providers]({{base_path}}/guides/authentication/standard-based-login/) as login options.

- Configure the number of factors (2FA or MFA) in the login flow to enforce [multi-factor authentication]({{base_path}}/guides/authentication/mfa/).

- Enforce [conditional authentication]({{base_path}}/guides/authentication/conditional-auth/) to dynamically change the login flow of a user based on the user's devices, networks, locations, or usage contexts.

## Manage user attributes

Manage the user attributes you want to share with your application:

- [Enable user attributes for OpenID Connect apps]({{base_path}}/guides/authentication/user-attributes/enable-attributes-for-oidc-app/)
- [Enable user attributes for SAML apps]({{base_path}}/guides/authentication/user-attributes/enable-attributes-for-saml-app/)

## Manage connections

You can define connections to external identity providers (IdPs) and use them to authenticate users who log in to your applications. This process of authenticating users with external IdPs is known as **identity federation**.

!!! note
    The external identity provider (IdP) authenticates users and issues the identification information by using security tokens like SAML 2.0, OpenID Connect, OAuth 2.0, and WS-Trust.

### Benefits of identity federation

There are several benefits of using identity federation:

- Allows users to sign in with a user account registered with a trusted IdP without having to manually create accounts for them in {{ product_name }}.

    !!! note
        If the IdP is configured to use [JIT user provisioning]({{base_path}}/guides/authentication/jit-user-provisioning/), signing in with an external IdP will automatically create a local account for the user in {{ product_name }}.

- Give users the convenience of choosing their existing, trusted IdP when they sign in or sign up to your organization in {{ product_name }}.

### Supported external IdPs

{{ product_name }} supports a variety of external identity providers with various open-standard protocols (such as OAuth2.0, OpenID Connect, and SAML).

- [Social identity providers]({{base_path}}/guides/authentication/social-login/)
- [Enterprise identity providers]({{base_path}}/guides/authentication/standard-based-login/)

You can configure any number of external connections for your application via {{ product_name }}.

### Add groups to connections

{% include "../fragments/manage-connection/add-groups.md" %}