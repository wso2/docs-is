# Authentication

See the topics given below to manage authentication for your applications.

## Design the login flow

When you register an application, you can customize the login flow.

- Configure {{ product_name }} login for [single-page applications with OIDC]({{base_path}}/guides/authentication/add-login-to-single-page-app/) or [web applications]({{base_path}}/guides/authentication/add-login-to-web-app/) with OIDC or SAML.

- Add [social login]({{base_path}}/guides/authentication/social-login/) options such as [Google]({{base_path}}/guides/authentication/social-login/add-google-login/), [Facebook]({{base_path}}/guides/authentication/social-login/add-facebook-login/), [Apple]({{base_path}}/guides/authentication/social-login/add-apple-login/), and [Microsoft]({{base_path}}/guides/authentication/social-login/add-microsoft-login/).

- Add other [enterprise identity providers]({{base_path}}/guides/authentication/standard-based-login/) as login options.

- Configure the number of factors (2FA or MFA) in the login flow to enforce [multi-factor authentication]({{base_path}}/guides/authentication/mfa/).

- Enforce [conditional authentication]({{base_path}}/guides/authentication/conditional-auth/) to dynamically change the login flow of a user based on the user's devices, networks, locations, or usage contexts.

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0") %}

- Add [SSO integrations]({{base_path}}/guides/authentication/sso-integrations/) using {{ product_name }} to log in to applications such as [Google]({{base_path}}/guides/authentication/sso-integrations/add-google-workspace-template/), [Salesforce]({{base_path}}/guides/authentication/sso-integrations/add-salesforce-template/), [Microsoft]({{base_path}}/guides/authentication/sso-integrations/add-microsoft-365-template/), [Zoom]({{base_path}}/guides/authentication/sso-integrations/add-zoom-template/), and [Slack]({{base_path}}/guides/authentication/sso-integrations/add-slack-template/).

{% endif %}

## Manage user attributes

Manage the user attributes you want to share with your application:

- [Enable user attributes for OpenID Connect apps]({{base_path}}/guides/authentication/user-attributes/enable-attributes-for-oidc-app/)
- [Enable user attributes for SAML apps]({{base_path}}/guides/authentication/user-attributes/enable-attributes-for-saml-app/)

## Manage connections

External Identity Providers (IdPs) can be registered as connections in {{product_name}} and be used to authenticate users who log in to your applications. These IdPs authenticate users and issue identification information using security tokens based on protocols like SAML 2.0, OpenID Connect, OAuth 2.0, and WS-Trust. This process of authenticating users with external IdPs is known as **Identity Federation**.

With identity federation, users can use an existing user account registered to a trusted IdP to login to your applications without having to create accounts for them in {{product_name}}.

!!! note
    If the IdP is configured to use [JIT user provisioning]({{base_path}}/guides/authentication/jit-user-provisioning/), when a user signs in with an external IdP, an account will automatically be created for the user in {{ product_name }}.

### Supported external IdPs

{{ product_name }} supports a variety of external identity providers with various open-standard protocols (such as OAuth2.0, OpenID Connect, and SAML).

- [Social identity providers]({{base_path}}/guides/authentication/social-login/)
- [Enterprise identity providers]({{base_path}}/guides/authentication/standard-based-login/)

You can configure any number of external connections for your application via {{ product_name }}.

{% include "../fragments/manage-connection/add-groups.md" %}



