{% set product_name = "Asgardeo" %}

{% set email_template_note = "!!! note
    This feature was onboarded on 20th September 2022. Email template branding will not be applied to email templates of organizations created before this date.

    If you need to apply organization branding to your emails, contact the Asgardeo team at **asgardeo-help@wso2.com**.
" %}

{% set customize_email_settings = "## Customize email settings

You can customize the default settings set by Asgardeo for email parameters such as `from address` and `replyTo` by contacting the Asgardeo team at **asgardeo-help@wso2.com**." %}

{% set email_templates_api_path = "email-template" %}

{% set localization_doc_path = "localization-in-asgardeo" %}

{% include "../../../../includes/guides/branding/customize-email-templates.md" %}