# Customize SMS templates

The following topics explain how you can customize SMS notifications that are sent to users of your {{ product_name }} organization.

!!! note "SMS templates for B2B applications"

    If you have set up [organizations]({{base_path}}/guides/organization-management/manage-organizations/),
    you can customize sms templates to fit the branding needs of each organization. If you do not customize an 
    sms template for an organization, it will be inherit the design from the closest ancestor organization with
    a customized sms template. If no ancestor has customized the particular sms template, the default sms template
    will be applied.

You can tailor the **body** of SMS notifications to your preferences by following the steps below.

!!! note
    This feature is only available for the most frequently used SMS templates. You can customize [all available SMS templates]({{base_path}}/references/sms-templates/) using the [Notification Templates API]({{base_path}}/apis/notification-templates/).

1. On the {{ product_name }}, go to **Branding** > **SMS Templates**.
2. Select the SMS template and the relevant locale that you wish to modify.

    ![Select SMS template]({{base_path}}/assets/img/guides/branding/select-sms-template.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Make your modifications in the **SMS Template Body** input field and use the **Preview** for a real-time preview.

4. Click **Save** to publish your changes.

!!! warning "Apply changes to user profiles"
    To apply these changes to each user's profile in your organization:

    1. Display the `local` attribute on the user's profile. Learn how to do so in [updating user attributes]({{base_path}}/guides/users/attributes/manage-attributes/#update-attributes).

    2. Update the `local` attribute value with the [required locale code]({{base_path}}/guides/branding/{{ localization_doc_path }}/#supported-languages). The value should be updated by,

        - the admin, if the admin onboards the user to the organization.

        - the user, if the user self-registers to the organization.

Alternatively, you can customize the content of SMS templates using the [Notification Templates API]({{base_path}}/apis/{{ notification_templates_api_path }}/) provided by {{ product_name }}.
