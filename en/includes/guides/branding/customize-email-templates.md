# Customize email templates

The following topics explain how you can customize email notifications that are sent to users of your {{ product_name }} organization.

## Customize email branding

Once you publish your [branding preferences]({{base_path}}/guides/branding/configure-ui-branding/#general-preferences) on {{ product_name }}, the branding preferences are automatically applied to emails sent to the users of your organization.

{{email_template_note}}

{% if (product_name == "WSO2 Identity Server" and is_version == "7.0.0") %}

!!! note "Email templates for B2B applications"

    If you have set up [organizations]({{base_path}}/guides/organization-management/manage-organizations/),
    you can customize email templates to fit the branding needs of each organization. If you do not customize a
    specific email template, the default email template will be applied.

{% else %}

!!! note "Email templates for B2B applications"

    If you have set up [organizations]({{base_path}}/guides/organization-management/manage-organizations/),
    you can customize email templates to fit the branding needs of each organization. If you do not customize an 
    email template for an organization, it will inherit the design from the closest ancestor organization with a
    customized email template. If no ancestor has customized the particular email template, the default email template
    will be applied.

{% endif %}

The branding variables that affect the email templates are as follows:

![Branding email templates]({{base_path}}/assets/img/guides/branding/email-branding.png)

<table>
    <tr>
        <th></th>
        <th>Template variable</th>
        <th>Branding preference</th>
    </tr>
    <tr>
        <td rowspan="2">1</td>
        <td>Organization Logo</td>
        <td>Design > Theme Preferences > Images > Logo URL</td>
    </tr>
    <tr>
        <td>Logo alternative text</td>
        <td>Design > Theme Preferences > Images > Logo Alt Text</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Primary color</td>
        <td>Design > Theme Preferences > Color Palette > Primary Color</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Email background color</td>
        <td>Design > Theme Preferences > Color Palette > Body Background > Main Background Color</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Email body color</td>
        <td>Design > Theme Preferences > Color Palette > Surface Background > Main Surface Background Color</td>
    </tr>
    <tr>
        <td>5</td>
        <td>Email font</code></td>
        <td>Design > Theme Preferences > Font > Font Family</td>
    </tr>
    <tr>
        <td>6</td>
        <td>Email body font color</td>
        <td>Design > Theme Preferences > Color Palette > Text Colors > Primary Text Color</td>
    </tr>
    <tr>
        <td>7</td>
        <td>Email button font color</td>
        <td>Design > Theme Preferences > Buttons > Primary Button > Font Color</td>
    </tr>
    <tr>
        <td>8</td>
        <td>Copyright text</td>
        <td>General > Copyright Text</td>
    </tr>
    <tr>
        <td>9</td>
        <td>Support email</td>
        <td>General > Contact Email</td>
    </tr>
</table>


## Customize email content

You can tailor the **subject**, **body**, and **footer** of email notifications to your preferences by following the steps below.

!!! note
    This feature is only available for the most frequently used email templates. You can customize [all available email templates]({{base_path}}/references/email-templates/) using the [Email Templates API]({{base_path}}/apis/{{ email_templates_api_path }}/).

1. On the {{ product_name }}, go to **Branding** > **Email Templates**.
2. Select the email template and the relevant locale that you wish to modify.

    !!! note
        Asgardeo gives you the option to automatically copy a template from one locale to another so that you do not have to create email templates from scratch. To do so, select a locale with an existing email template, switch over to the new locale and click confirm when the **Replicate content?** prompt appears.

    ![Select email template]({{base_path}}/assets/img/guides/branding/select-email-template.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Make your modifications in the **Content** tab and use the **Preview** tab for a real-time preview.

4. Click **Save** to publish your changes.

!!! warning "Apply changes to user profiles"
    To apply these changes to each user's profile in your organization:

    1. Display the `local` attribute on the user's profile. Learn how to do so in [updating user attributes]({{base_path}}/guides/users/attributes/manage-attributes/#update-attributes).

    2. Update the `local` attribute value with the [required locale code]({{base_path}}/guides/branding/{{ localization_doc_path }}/#supported-languages). The value should be updated by,

        - the admin, if the admin onboards the user to the organization.

        - the user, if the user self-registers to the organization.

Alternatively, you can customize the content of email templates using the [Email Templates API]({{base_path}}/apis/{{ email_templates_api_path }}/) provided by {{ product_name }}.

{{customize_email_settings}}


