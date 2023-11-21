# Readiness checks
Use the following list to ensure that your organizations are ready for use in a production environment.

## User account management
To ensure the readiness of user accounts of your organizations:

- Verify groups and roles assigned to users.
- Enable/disable self-registration based on the business requirement. [Learn more]({{base_path}}/guides/user-accounts/configure-self-registration/)
- Enable/disable account recovery based on the business requirement. [Learn more]({{base_path}}/guides/user-accounts/password-recovery/)
- If you have added a user store, configure high availability. [Learn more]({{base_path}}/guides/users/user-stores/)

## Applications
Use the following sections to verify if your applications are ready for production.

??? note "OIDC"
    To ensure the readiness of the OIDC applications of your organizations:

    - Confirm whether the allowed access URL is from the production application's domain. Make sure not to include access URLs that include localhost.
    - Configure the recommended grant type depending on your application requirements. [Learn more]({{base_path}}/references/app-settings/oidc-settings-for-app/#allowed-grant-types)
    - Confirm whether the allowed callback URLs are only from the production application domain. Make sure not to include callback URLs that include localhost. [Learn more]({{base_path}}/references/app-settings/oidc-settings-for-app/#authorized-redirect-urls)
    - Use only the HTTP origins that host your web application, not localhost. [Learn more]({{base_path}}/references/app-settings/oidc-settings-for-app/#allowed-origins)
    - Verify token type matches the business application. [Learn more]({{base_path}}/references/app-settings/oidc-settings-for-app/#access-token)
    - Verify the token binding type matches the requirements.
    - Configure access, refresh, and id token expiry times.
    - Provide the correct certificate. [Learn more]({{base_path}}/references/app-settings/oidc-settings-for-app/#certificate)
    - Securing application secrets in the clients.

    An application's client secret and client ID can be used to invoke APIs. Hence, securely store and minimize access to only authorized people for your applications' client id and client secret.

??? note "SAML"
    To ensure the readiness of the SAML applications of your organizations:

    - Confirm whether the allowed access URL is only from the production application domain. Make sure not to include access URLs that include localhost.
    - Confirm whether the Assertion consumer service URLs(ACS) are only from the production application domain. [Learn more]({{base_path}}/references/app-settings/saml-settings-for-app/#assertion-consumer-service-urls-acs-urls)
    - Make sure not to include ACS URLs that include localhost. [Learn more]({{base_path}}/references/app-settings/saml-settings-for-app/#default-assertion-consumer-service-url-default-acs-url)
    - Select the default ACS URL when there are multiple ACS URLs. [Learn more]({{base_path}}/references/app-settings/saml-settings-for-app/#default-assertion-consumer-service-url-default-acs-url)
    - Enable `Response Signing`. Configure signing and digest algorithms. [Learn more]({{base_path}}/references/app-settings/saml-settings-for-app/#response-signing)
    - Enable/Disable Single logout (SLO) based on the application requirement. [Learn more]({{base_path}}/references/app-settings/saml-settings-for-app/#single-logout-profile)
    - If SLO is enabled, verify logout request and logout response URLs are configured, not localhost.
    - Provide certificates for the application. [Learn more]({{base_path}}/references/app-settings/saml-settings-for-app/#certificate)

??? note "Single Page Applications"
    To ensure the readiness of the single-page applications of your organizations:

    - Confirm whether the allowed access URL is only from the production application domain. Make sure not to include access URLs that include localhost.
    - Configure the recommended grant type depending on your application. [Learn more]({{base_path}}/references/app-settings/oidc-settings-for-app/#allowed-grant-types)
    - Confirm whether the allowed callback URLs are only from the production application domain. Make sure not to include callback URLs that include localhost. [Learn more]({{base_path}}/references/app-settings/oidc-settings-for-app/#authorized-redirect-urls)
    - Use only the HTTP origins that host your web application, not localhost. [Learn more]({{base_path}}/references/app-settings/oidc-settings-for-app/#allowed-origins)
    - Configure PKCE as mandatory. [Learn more]({{base_path}}/references/app-settings/oidc-settings-for-app/#proof-key-for-code-exchange-pkce)
    - Verify token type matches the business application. [Learn more]({{base_path}}/references/app-settings/oidc-settings-for-app/#access-token)
    - Verify the token binding type matches the requirements.
    - Configure access, refresh, and id token expiry times.
    - Provide the correct certificate. [Learn more]({{base_path}}/references/app-settings/oidc-settings-for-app/#certificate)

    An application's client secret and client ID can be used to invoke APIs. Hence, securely store and minimize access to only authorized people for your applications' client id and client secret.

## Connections
Verify authorized redirect URL and home page URL of social connections are updated with the production environment's values.

## Branding
By default, Asgardeo interfaces presented to users are themed according to Asgardeo's default branding. Make sure to customize the UIs according to your organization's branding styles. The following is the list of branding changes required. [Learn more]({{base_path}}/guides/branding/configure-ui-branding/)

**General**
To ensure the readiness of the general branding of your organizations:

- Configure the site title.
- Configure the Copyright Text.
- Configure the help email for the organization where end-users need to contact your organization for help.

**Design**
To ensure the readiness of the design branding of your organizations:

- Configure logo, favicon, and side images.
- Configure the heading text.
- Customize branding styles to UIs provided by Asgardeo provided according to your organization's branding guidelines.

**Advanced**
To ensure the readiness of the advanced branding of your organizations:

- Configure the Cookie Policy.
- Configure the Privacy Policy.
- Configure the Terms of Service.
- Configure the Self Signup page.

### Using a custom domain
By default, the interfaces provided by Asgardeo (such as the login page) are presented to your end users over Asgardeo domains. You can customize the URL domain to your organization-preferred host. [Learn more]({{base_path}}/guides/branding/configure-custom-domains/)

!!! note
    The free-tier users do not have the capability to configure domain branding.

### Customize email template
By default, all the emails triggered by Asgardeo for your end users have Asgardeo's default branding. If you wish to change the branding and content of the emails, you can customize them via the APIs. [Learn more]({{base_path}}/apis/email-template/#/operations/updateEmailTemplate)

!!! note
    Asgardeo rolled out this feature on Sep 20, 2022. Therefore this new feature is only applied to the Asgardeo organizations created after Sep 20, 2022.
    If you wish to use that capability for older organizations, you can send a request to the Asgardeo team at `asgardeo-support@wso2.com`.

## Manage subscriptions
Make sure to check the resource limits to verify the allowed Monthly Active User (MAU) limits, groups, etc., to ensure your scaling requirements are within the range of your subscription. [Learn more]({{base_path}}/guides/your-asgardeo/subscribe-to-asgardeo/)