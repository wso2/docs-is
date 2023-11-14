{% set product_name = "WSO2 Identity Server" %}

{% set admin_login_note = "" %}

{% set configure_email_sender = "- You need to [configure the email sending module](../../../deploy/configure-email-sending.md) for the WSO2 Identity Server to send the Magic link to the users." %}

{% set disable_cross_browser_support = "If you want to remove the cross-browser functionality, you can do so by adding the following configuration in the `<IS_HOME>/repository/conf/deployment.toml` file.

        ```toml
           [session.nonce.cookie]
           default_whitelist_authenticators=[] 
        ```
        This configuration will ensure that the magic link can only be opened in the same browser where the login was originally initiated.
" %}

{% include "../../../../../../includes/guides/authentication/passwordless-login/add-passwordless-login-with-magic-link.md" %}


