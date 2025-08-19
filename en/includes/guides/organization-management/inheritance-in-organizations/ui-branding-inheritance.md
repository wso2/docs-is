# UI branding inheritance

UI branding customizations take effect at two levels; organization-wide branding and application-specific branding. The inheritance of each branding level is as follows.

### Organization-wide branding

- You may configure separate UI branding for each organization. 
- If you haven't configured UI branding for your organization, the UI branding of your immediate parent organization will be applied to the organization. If your parent organization has no branding, the grand-parent organization's branding will apply. This will continue all the way until the root organization. If the root organization has no branding, the default {{product_name}} branding will apply.

### Application-specific branding

- If you configure application-specific branding, it will override the organization’s branding for that  application.
- If no application-specific branding is set, the UI branding of the organization will be applied. If the organization has no branding, the application-specific branding of the immediate parent's organization will apply. This will continue all the way until the root organization. If the root organization has no branding, the default {{product_name}} branding will apply.

![{{ product_name }} branding path resolver]({{base_path}}/assets/img/guides/branding/generic-app-branding-resolver-path.png)


## Configure UI branding

To learn how to configure UI branding for an organization, see the [Configure UI branding]({{base_path}}/guides/branding/configure-ui-branding/) guide.
