# User attribute inheritance

Child organizations inherit all user attributes defined in the root organization. This includes both default system attributes in {{ product_name }} and any custom attributes created in the root organization.

## User attributes in the local attribute dialect

Child organizations can only update the attribute configurations that relate to secondary user stores, since each organization defines its own secondary user stores and doesn't share them with others.

You can find these configurations in the **Attribute Mappings** tab of an attribute.

### Mapped attributes

{% if product_name == "Asgardeo" %}

You can edit mappings related to user stores ( **MY USER STORE** in this example) independently for each organization.

![Attribute mappings]({{base_path}}/assets/img/guides/organization/attributes/b2b-edit-attribute-mappings.png){: width="700" style="display: block; margin: 0;"}

{% else %}

You can edit the **PRIMARY** user store mappings shown below only in the root organization, which manages the primary user store shared across organizations.

However, you can edit mappings related to secondary user stores (**MY USER STORE** in this example) independently for each organization.

![Attribute mappings]({{base_path}}/assets/img/guides/organization/attributes/b2b-edit-attribute-mappings.png){: width="700" style="display: block; margin: 0;"}

{% endif %}

### Enabling attributes for a user store

For certain multi-valued attributes, such as **Email Addresses**, organizations can configure whether the attribute should be enabled for a specific user store as seen in the above image. For secondary user stores, you can independently manage this setting within each organization.

### Configuring other properties of attributes

All other configurations are directly inherited from root organizations. Therefore, you must set them at the root organization level.

To learn how to configure user attributes in the root organization, see the following guides:

- [Manage attributes]({{base_path}}/guides/users/attributes/manage-attributes)
- [Configure unique attributes]({{base_path}}/guides/users/attributes/configure-unique-attributes)

## User attributes in external attribute dialects

{% if product_name == "Asgardeo" %}

Child organizations inherit external attribute dialects defined by the system in {{ product_name }} such as SCIM 2.0 and OpenID Connect (OIDC).

{% else %}

Child organizations inherit external attribute dialects defined by the system in {{ product_name }} such as SCIM 2.0, OpenID Connect (OIDC) and any other custom attribute dialects.

{% endif %}

However, child organizations can't create new attribute dialects or modify those inherited from the root.

To learn how to configure external user attributes in the root organization, see the following guides:

- [Manage SCIM 2.0 attribute mappings]({{base_path}}/guides/users/attributes/manage-scim2-attribute-mappings)
- [Manage OpenID Connect attribute mappings]({{base_path}}/guides/users/attributes/manage-oidc-attribute-mappings)
