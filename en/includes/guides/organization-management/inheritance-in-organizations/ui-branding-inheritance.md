# UI branding inheritance

In {{product_name}}, child organizations inherit branding from their parent organizations. Child organizations can make their own adjustments to these inherited settings.

Organization administrators can access these settings in the {{product_name}} Console under **Branding** > **Styles & Text**.

## How it works

Inheritance for UI branding works as follows based on the branding type.

### Organization-wide branding

<<<<<<< Updated upstream
- You may configure separate UI branding for each organization. 
- If you haven't configured UI branding for your organization, the UI branding of your immediate parent organization will be applied to the organization. If your parent organization has no branding, the grand-parent organization's branding will apply. This will continue all the way until the root organization. If the root organization has no branding, the default {{product_name}} branding will apply.

### Application-specific branding

- If you configure application-specific branding, it will override the organization’s branding for that  application.
- If no application-specific branding is set, the UI branding of the organization will be applied. If the organization has no branding, the application-specific branding of the immediate parent's organization will apply. This will continue all the way until the root organization. If the root organization has no branding, the default {{product_name}} branding will apply.
=======
Organization-wide branding settings apply to all applications within the organization. For all applications,

- Child organizations inherit branding settings from the nearest ancestor with custom branding settings. If no ancestor has customized settings, the default value applies.

- Organizations can customize their own branding settings, overriding the inherited settings. These overridden settings then pass down to the organization’s descendants.

- Organizations can also revert their branding settings, restoring the inherited values.

### Application-specific branding

Application-specific branding settings apply to a single application. For a given application,

- Child organizations inherit branding from the nearest ancestor with custom settings. The rules are:

    - Application-specific branding overrides organization-wide branding at the same hierarchy level.

    - If the ancestor has application-specific branding, the child inherits that.

    - Otherwise, it inherits the ancestor’s organization-wide branding.

    - If no ancestor has customized settings, the default branding applies.

- If the organization has its own organization-wide branding, that applies to the application.

- Organizations can customize their own application-specific branding settings, overriding either their organization-wide settings or the inherited settings. These overridden settings then pass down to the organization’s descendants.

- Organizations can also revert their application-specific branding settings, restoring either their organization-wide settings or the inherited values.

The following diagram explains how inheritance works for UI branding when your organization hierarchy has a combination of organization-wide branding and application-specific branding.
>>>>>>> Stashed changes

![{{ product_name }} branding path resolver]({{base_path}}/assets/img/guides/branding/generic-app-branding-resolver-path.png)


## Configure UI branding

To learn how to configure UI branding for an organization, see the [Configure UI branding]({{base_path}}/guides/branding/configure-ui-branding/) guide.
