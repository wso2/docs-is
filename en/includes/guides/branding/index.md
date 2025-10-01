# Branding

By default, your organization's business applications in {{ product_name }} are displayed to users with {{ product_name }} branding. However, you have the option to customize this by applying your own branding.

- [Customize the user interfaces (UIs)]({{base_path}}/guides/branding/configure-ui-branding/) of the user login, sign-up, and account recovery flows.

{% if product_name == "WSO2 Identity Server" %}

- [Customize layouts]({{base_path}}/guides/branding/add-custom-layouts/) of the user login, sign-up, and account recovery flows.

{% endif %}

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0" and is_version != "7.1.0") %}

- [Use the editor to customize layouts]({{base_path}}/guides/branding/customize-layouts-with-editor/) for user login, sign-up, and account recovery flows. <sup>`Paid subscription required`</sup>

{% endif %}

{% if product_name == "Asgardeo" %}

- [Branding AI]({{base_path}}/guides/branding/branding-ai/)

- [Customize the domain name]({{base_path}}/guides/branding/configure-custom-domains/) <sup>`Paid subscription required`</sup>

{% endif %}

- [Customize email notifications]({{base_path}}/guides/branding/customize-email-templates/)

- [Localizations]({{base_path}}/guides/branding/localization/)
