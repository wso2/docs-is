# Multi-valued attributes for user contact information

Multi-valued attributes can store more than one value. {{ product_name }} uses multi-valued attributes to associate multiple email addresses and mobile numbers with their profiles. For users with multiple values, they may also select a primary email address and a primary mobile number.

The following attributes are used for this purpose:

- Email Addresses
- Verified Email Addresses
- Mobile Numbers
- Verified Mobile Numbers

## Exclude these attributes from a user store

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}
If the {{ 'remote' if product_name == 'Asgardeo' else 'secondary' }} user store does not support the required schemas for these attributes, you can configure {{ product_name }} to store the attribute values in the identity store instead. See [Select storage location for selected attributes]({{base_path}}/guides/users/attributes/user-attributes/configure-attributes/#select-storage-location-for-selected-attributes) for instructions.
{% else %}
For non-JDBC {{ 'secondary' if product_name == 'WSO2 Identity Server' else 'remote' }} user stores, you must ensure proper mapping of these attributes in the user store. If mapping is not feasible, you can disable support for these attributes in that user store by following the steps below.

   1. On the {{ product_name }} Console, navigate to **User Attributes and Stores** > **Attributes**.
   2. Under **Manage Attributes**, click **Attributes** to view the list of all attributes.
   3. Click **Edit** for the attribute you wish to modify.
   4. Go to the **Attribute Mappings** tab.
   5. Find the corresponding user store and uncheck the **Enable for this user store** checkbox.
   6. Click **Update** to save the changes

   ![Enable for user store]({{base_path}}/assets/img/guides/organization/attributes/enable-for-user-store.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
{% endif %}


## Enable/Disable multiple emails and mobile numbers feature

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}
To enable or disable the multiple email addresses or mobile numbers feature, enable or disable the corresponding attribute in the relevant profile.

1. On the {{ product_name }} Console, navigate to **User Attributes and Stores** > **Attributes**.
2. Under **Manage Attributes**, click **Attributes** to view the list of all attributes.
3. Click **Edit** next to the corresponding attribute.
4. Disable the **Display** checkbox from the profiles (Administrator Console, End-User Profile).
5. Click **Update** to save the changes.
{% else %}
To manually enable or disable this feature, **you must update all related attributes** by following these steps:

1. On the {{ product_name }} Console, navigate to **User Attributes and Stores** > **Attributes**.
2. Under **Manage Attributes**, click **Attributes** to view the list of all attributes.
3. Click **Edit** next to the corresponding attribute.
4. Enable or disable the **Display** checkbox across all profiles (Administrator Console, End-User Profile, and Self-Registration).
5. Click **Update** to save the changes.
{% endif %}

