<<<<<<< Updated upstream
{% set product_name = "Asgardeo" %}
{% include "../../../../includes/guides/authentication/index.md" %}
=======
# Authentication

See the topics given below to manage authentication for your applications.

## Design the login flow

When you register an application, you can customize the login flow.

- Configure Asgardeo login for [single-page applications with OIDC](../../guides/authentication/add-login-to-single-page-app/) or [web applications](../../guides/authentication/add-login-to-web-app/) with OIDC or SAML.

- Add [social login](../../guides/authentication/social-login/) options such as [Google](../../guides/authentication/social-login/add-google-login/), [Facebook](../../guides/authentication/social-login/add-facebook-login/), and [Github](../../guides/authentication/social-login/add-github-login/).

- Add other [enterprise identity providers](../../guides/authentication/enterprise-login/) as login options.

- Configure the number of factors (2FA or MFA) in the login flow to enforce [multi-factor authentication](../../guides/authentication/mfa/).

- Enforce [conditional authentication](../../guides/authentication/conditional-auth/) to dynamically change the login flow of a user based on the user’s devices, networks, locations, or usage contexts.

## Manage user attributes

Manage the user attributes you want to share with your application:

- [Enable user attributes for OpenID Connect apps](../../guides/authentication/user-attributes/enable-attributes-for-oidc-app/)
- [Enable user attributes for SAML apps](../../guides/authentication/user-attributes/enable-attributes-for-saml-app/)

## Manage connections

You can define connections to external identity providers (IdPs) and use them to authenticate users who log in to your applications. This process of authenticating users with external IdPs is known as **identity federation**.

!!! note
    The external identity provider (IdP) authenticates users and issues the identification information by using security tokens like SAML 2.0, OpenID Connect, OAuth 2.0, and WS-Trust.

### Benefits of identity federation

There are several benefits of using identity federation:

- Allows users to sign in with a user account registered with a trusted IdP without having to manually create accounts for them in Asgardeo.

    !!! note
        If the IdP is configured to use [JIT user provisioning](../../guides/authentication/jit-user-provisioning/), signing in with an external IdP will automatically create a local account for the user in Asgardeo.

- Give users the convenience of choosing their existing, trusted IdP when they sign in or sign up to your organization in Asgardeo.

### Supported external IdPs

Asgardeo supports a variety of external identity providers with various open-standard protocols (such as OAuth2.0, OpenID Connect, and SAML).

- [Social identity providers](../../guides/authentication/social-login/)
- [Enterprise identity providers](../../guides/authentication/enterprise-login/)

You can configure any number of external connections for your application via Asgardeo.

### Add groups to connections
<CommonGuide guide='guides/fragments/manage-connection/add-groups.md'/>
>>>>>>> Stashed changes
