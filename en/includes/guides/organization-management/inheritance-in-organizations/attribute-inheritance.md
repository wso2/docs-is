# User Attribute Inheritance

All user attributes defined in the root organization are inherited by its child organizations. This includes both default system claims and any custom claims created in the root organization.

## Configure User Attributes

Attribute configurations cannot be updated by child organizations, except for those that are specific to them. These are specifically configurations related to secondary user stores, since secondary user stores are defined per organization and are not shared across organizations.

These configurations can be found in the **Attribute Mappings** tab of an attribute.

### Mapped attributes
{% if product_name == "Asgardeo" %}

Mappings related to user stores ( **MY USER STORE** in this example) can be edited independently by each organization.

![The relationship between terms]({{base_path}}/assets/img/guides/organization/attributes/b2b-edit-attribute-mappings.png){: width="700" style="display: block; margin: 0;"}

{% else %}

The **PRIMARY** user store mappings shown below can only be updated by the root organization as the primary user store is shared. 

However, mappings related to the secondary user store (**MY USER STORE** in this example) can be edited independently by each organization.

![The relationship between terms]({{base_path}}/assets/img/guides/organization/attributes/b2b-edit-attribute-mappings.png){: width="700" style="display: block; margin: 0;"}

{% endif %}

### Enabling attributes for a user store

For certain multi-valued attributes, such as **Email Addresses**, organizations can configure whether the attribute should be enabled for a specific user store. For secondary user stores, this setting can be managed independently within each organization.

### Configuring other properties of attributes

All other configurations are directly inherited from root organizations and must be set at the root orgagnization level.

To learn how to configure user attributes in the root organization, see the following guide:

- [Manage attributess]({{base_path}}/guides/users/attributes/manage-attributes)