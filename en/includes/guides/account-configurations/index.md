# Account configurations

{{product_name}} provides a robust suite of tools designed to ensure secure and efficient management of user accounts. This section details the configurations available to administrators for enhancing user account security, streamlining the onboarding process, and facilitating account recovery.

## Login security
Enhance the security of user logins through various settings that prevent unauthorized access.

- [Password Validation]({{base_path}}/guides/account-configurations/login-security/password-validation/)
- [Login Attempts]({{base_path}}/guides/account-configurations/login-security/login-attempts/)
- [Bot Detection]({{base_path}}/guides/account-configurations/login-security/bot-detection/)
{% if sift_fraud_detection and product_name == "Asgardeo" %}
- [Fraud detection]({{base_path}}/guides/account-configurations/login-security/sift-fraud-detection/)
{% endif %}
{% if product_name == "WSO2 Identity Server" %}
- [Session Management]({{base_path}}/guides/account-configurations/login-security/session-management/)
{% endif %}

## User onboarding
Streamline the addition of new users to your organization with flexible onboarding configurations.

- [Self Registration]({{base_path}}/guides/account-configurations/user-onboarding/self-registration/)
{% if product_name == "WSO2 Identity Server" %}
- [Invite User to Set Password]({{base_path}}/guides/account-configurations/user-onboarding/invite-user-to-set-password/)
{% endif %}

## Account recovery
Provide users with options to recover their access credentials, ensuring they can regain account access efficiently.

- [Password Recovery]({{base_path}}/guides/account-configurations/account-recovery/password-recovery/)
{% if product_name == "WSO2 Identity Server" %}
- [Username Recovery]({{base_path}}/guides/account-configurations/account-recovery/username-recovery/)
- [Admin Initiated Password Reset]({{base_path}}/guides/account-configurations/account-recovery/admin-initiated-password-reset/)
{% endif %}

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0")%}
## Account management
Enable additional options for managing user accounts.

- [Account disabling]({{base_path}}/guides/account-configurations/account-disabling/)
{% endif %}