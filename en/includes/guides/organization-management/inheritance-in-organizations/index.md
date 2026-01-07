# Inheritance in organizations

Parent organizations sit higher in the hierarchy and often define common behaviors for their child organizations. At the same time, child organizations need to maintain their own unique identity and configurations.

{{product_name}} allows child organizations to **inherit** and **override** configurations from their parent organizations. This model simplifies administration by letting parent organizations set baseline configurations. It also gives child organizations the flexibility to customize their settings.

The following guides explain how inheritance works for each of these features:

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0" and is_version != "7.1.0") %}

- **[Configurations for login & registration]({{base_path}}/guides/organization-management/inheritance-in-organizations/login-registration-inheritance/)**: Learn how child organizations can inherit or override configurations related to login and registration.

- **[User attributes]({{base_path}}/guides/organization-management/inheritance-in-organizations/attribute-inheritance/)**: Learn how to manage user attribute configurations in organizations.
- **[OIDC scopes]({{base_path}}/guides/organization-management/inheritance-in-organizations/oidc-scope-inheritance/)**: Learn how organizations inherit OpenID Connect (OIDC) scopes.
- **[Flows]({{base_path}}/guides/organization-management/inheritance-in-organizations/flow-inheritance/)**: Learn how organizations inherit Flows.

{% endif %}

- **[UI branding]({{base_path}}/guides/organization-management/inheritance-in-organizations/ui-branding-inheritance/)**: Discover how organizations can inherit or define their own look and feel.
- **[Email and SMS template]({{base_path}}/guides/organization-management/inheritance-in-organizations/email-sms-templates-inheritance/)**: Learn how customizations to Email and SMS templates propagate in an organization hierarchy.

{% if product_name == "Asgardeo" %}

!!! info Upcoming Enhancements to Organization Management

    As of January 7, 2026, we have rolled out a new set of changes for organizations that introduce hierarchical inheritance for the following features.

    - Login and registration settings
    - Configurations of the following connections:
        - SMS OTP
        - Push Notifications
        - Email OTP
        - Passkey connection
    - Flows
        - Self-registration flows
        - Password recovery flows
        - Invited user registration flows
    - OIDC scopes
    - Attribute update verification settings
    - User attributes (claims)

    ## Summary of Upcoming Changes

    - **Login & Registration Settings and Flows**

        - Previously: These configurations were not inherited by child organizations, and customization at the child level was not possible.

        - After the update: Child organizations will automatically inherit login and registration settings and flows from the parent organization, including any designed self-registration, password recovery and invited user registration flows. Any customizations that an organization makes will cascade down to child organizations. Child organizations can override the inherited settings.

    - **Connections**

        - Previously: SMS OTP, Push Notification, Email OTP and Passkey connection configurations were not inherited by child organizations, and customizations at the child level was not possible.

        - After the update: Child organizations will automatically inherit these connection configurations from the parent organization. Additionally, child organizations can override the settings for Email OTP and SMS OTP connections.

    - **Custom User Attributes (Claims)**

        - Previously: Custom user attributes were shared with child organizations only if they were shared via a B2B SaaS application.

        - After the update: Child organizations will automatically inherit custom user attributes (claims) defined in the root organization. The inherited attributes will function in the same way as they did under the explicit sharing model, however, additional custom attributes that were not shared previously will now be available in the child organization.

    - **OIDC Scopes**

        - Previously: Child organizations did not inherit OIDC scopes from parent organizations and instead relied on system default values.

        - After the update: Child organizations will automatically inherit OIDC scopes configured in the root organization.

    - **Attribute Update Verification Settings**

        - Previously: Child organizations did not inherit email and mobile number verification and notification settings related to user attribute updates.

        - After the update: Child organizations now automatically inherit email and mobile number verification and notification settings for user attribute updates from the parent organization.

{% endif %}
