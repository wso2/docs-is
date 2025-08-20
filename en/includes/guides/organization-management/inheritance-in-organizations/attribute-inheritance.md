# User attribute inheritance

In {{product_name}}, child organizations inherit user attributes from the root organization, including both system-defined defaults and any custom attributes created by the root organization.

## How it works

This section explains how inheritance works for user attributes, attribute mappings, and attribute dialects across organizations.

### User attributes

- Child organizations inherit both system-defined attributes and custom attributes from the root organization.

- Custom attributes can only be created at the root level.

Organization administrators can access user attributes from the {{product_name}} Console under **User Attributes & Stores** > **User Attributes**.

### User attribute mappings

Each user store in an organization maintains mappings for user attributes. These mappings define how attributes from the user store correspond to the attributes used in {{product_name}}. Inheritance of user attribute mappings work in the following way for each user store.

Organization administrators can access user attribute mappings from the {{product_name}} Console by selecting an inherited attribute from **User Attributes & Stores** > **User Attributes** and going to its **Attribute Mappings** tab.

- **Primary user store**

    - Only the root organization can manage the primary user store.

    - Only the root organization can edit the user mappings for the primary user store.

    - Child organizations inherit user store mappings from the root organization.

- **Secondary user stores**

    - Child organizations can onboard their own secondary user stores.

    - They have full control over attribute mappings for these stores, including:

        - Editing mappings for attributes inherited by the root organization.

        - Whether to enable multi-valued user attributes (e.g. **emailAddresses**) for the secondary user stores.

{% if product_name == "Asgardeo" %}

You can edit mappings related to user stores ( **MY USER STORE** in this example) independently for each organization.

    ![Attribute mappings]({{base_path}}/assets/img/guides/organization/attributes/b2b-edit-attribute-mappings.png){: width="700" style="display: block; margin: 0;"}

    {% else %}

    You can edit the **PRIMARY** user store mappings shown below only in the root organization, which manages the primary user store shared across organizations.

    However, you can edit mappings related to secondary user stores (**MY USER STORE** in this example) independently for each organization.

    ![Attribute mappings]({{base_path}}/assets/img/guides/organization/attributes/b2b-edit-attribute-mappings.png){: width="700" style="display: block; margin: 0;"}

    {% endif %}


For certain multi-valued attributes, such as **Email Addresses**, organizations can configure whether the attribute should be enabled for a specific user store as seen in the above image. For secondary user stores, you can independently manage this setting within each organization.


### Attribute dialects

- Child organizations inherit all external attribute dialects defined at the root, such as:

    - SCIM 2.0

    - OpenID Connect (OIDC)

    {% if product_name == "WSO2 Identity Server" %}

    - Any custom dialects created at the root organization level

    {% endif %}

- Attribute dialects are read-only for child organizations. They can't create new dialects or modify inherited ones.

{% if product_name == "Asgardeo" %}

Child organizations inherit external attribute dialects defined by the system in {{ product_name }} such as SCIM 2.0 and OpenID Connect (OIDC).

{% else %}

Child organizations inherit external attribute dialects defined by the system in {{ product_name }} such as SCIM 2.0, OpenID Connect (OIDC) and any other custom attribute dialects.

{% endif %}

However, child organizations can't create new attribute dialects or modify those inherited from the root.







### Configuring other properties of attributes

All other configurations are directly inherited from root organizations. Therefore, you must set them at the root organization level.

To learn how to configure user attributes in the root organization, see the following guides:

- [Manage attributes]({{base_path}}/guides/users/attributes/manage-attributes)
- [Configure unique attributes]({{base_path}}/guides/users/attributes/configure-unique-attributes)

## User attributes in external attribute dialects



To learn how to configure external user attributes in the root organization, see the following guides:

- [Manage SCIM 2.0 attribute mappings]({{base_path}}/guides/users/attributes/manage-scim2-attribute-mappings)
- [Manage OpenID Connect attribute mappings]({{base_path}}/guides/users/attributes/manage-oidc-attribute-mappings)
