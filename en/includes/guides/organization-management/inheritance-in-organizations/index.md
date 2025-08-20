# Inheritance in organizations

Parent organizations sit higher in the hierarchy and often define common behaviors for their child organizations. At the same time, child organizations need to maintain their own unique identity and configurations.

{{product_name}} allows child organizations to **inherit** and **override** configurations from their parent organizations. This model simplifies administration by letting parent organizations set baseline configurations. It also gives child organizations the flexibility to customize their settings.

The following guides explain how inheritance works for each of these features:

{% if product_name != "Asgardeo" and (product_name == "WSO2 Identity Server" and is_version != "7.0.0" and is_version != "7.1.0") %}

<<<<<<< Updated upstream
- **[Login & registration configuration inheritance]({{base_path}}/guides/organization-management/inheritance-in-organizations/login-registration-inheritance/)**: Learn how login and registration configurations can be inherited and customized.
- **[User attribute inheritance]({{base_path}}/guides/organization-management/inheritance-in-organizations/attribute-inheritance/)**: Learn how to manage user attribute configurations in organizations.
- **[OIDC scope inheritance]({{base_path}}/guides/organization-management/inheritance-in-organizations/oidc-scope-inheritance/)**: Learn how organizations inherit OpenID Connect (OIDC) scopes.
=======
- **[Configurations for login & registration]({{base_path}}/guides/organization-management/inheritance-in-organizations/login-registration-inheritance/)**: Learn how child organizations can inherit or override configurations related to login and registration.
>>>>>>> Stashed changes

{% endif %}

- **[UI branding]({{base_path}}/guides/organization-management/inheritance-in-organizations/ui-branding-inheritance/)**: Discover how organizations can inherit or define their own look and feel.
- **[Email and SMS template]({{base_path}}/guides/organization-management/inheritance-in-organizations/email-sms-templates-inheritance/)**: Learn how customizations to Email and SMS templates propagate in an organization hierarchy.
