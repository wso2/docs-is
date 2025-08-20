# Email and SMS template inheritance

<<<<<<< Updated upstream
You can customize email and sms templates to fit the branding needs of each organization. If you don't customize a template for an organization, it will inherit the design from the closest ancestor organization with a customized template. If no ancestor has customized the particular template, the default template will apply.
=======
In {{product_name}}, child organizations inherit email and SMS templates from their parent organizations. Child organizations can make their own adjustments to these inherited templates.
>>>>>>> Stashed changes

Organization administrators can access email and SMS templates from the {{product_name}} Console under **Branding** > **Email Templates** and **Branding** > **SMS Templates** respectively.

## How it works

Inheritance for email and SMS templates works as follows.

- Child organizations inherit email and SMS templates from the nearest ancestor with custom templates. If no ancestor has customized templates, the default templates apply.

- Organizations can customize their own email and SMS templates, overriding the inherited templates. These overridden templates then pass down to the organization’s descendants.

- Organizations can also revert their email and SMS templates, restoring the inherited values.

## Customize email and SMS templates

To learn how to customize email and SMS templates, refer to the following guides:

- [Customize email templates]({{base_path}}/guides/branding/customize-email-templates/)
- [Customize SMS templates]({{base_path}}/guides/branding/customize-sms-templates/)
