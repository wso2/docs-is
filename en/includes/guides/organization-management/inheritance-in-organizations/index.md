# Inheritance in organizations

In a B2B scenario, a primary organization offers services to other businesses, which function as **child organizations**.

Parent organizations often need to define common behaviors for their child organizations. However, child organizations also require their own unique identity and configurations.

{{product_name}} allows child organizations to **inherit** and **override** configurations from their parent organization. This model simplifies administration by letting parent organizations set baseline configurations. It also gives child organizations the flexibility to customize their settings.

The following guides explain how inheritance works for different features:

{% if product_name != "Asgardeo" and (product_name == "WSO2 Identity Server" and is_version != "7.0.0" and is_version != "7.1.0") %}

- **[Login & registration configuration inheritance]({{base_path}}/guides/organization-management/inheritance-in-organizations/login-registration-inheritance/)**: Learn how login and registration configurations can be inherited and customized.
- **[User attribute inheritance]({{base_path}}/guides/organization-management/inheritance-in-organizations/attribute-inheritance/)**: Learn how user attribute configurations can be managed in organizations.
- **[OIDC scope inheritance]({{base_path}}/guides/organization-management/inheritance-in-organizations/oidc-scope-inheritance/)**: Learn how OIDC scopes are inherited by organizations.

{% endif %}

- **[UI branding inheritance]({{base_path}}/guides/organization-management/inheritance-in-organizations/ui-branding-inheritance/)**: Discover how organizations can inherit or define their own look and feel.
- **[Email and SMS template inheritance]({{base_path}}/guides/organization-management/inheritance-in-organizations/email-sms-templates-inheritance/)**: See how Email and SMS templates can be managed in an organizational hierarchy.
