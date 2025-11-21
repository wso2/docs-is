# Multi-valued attributes for user contact information

Multi-valued attributes can store more than one value. {{ product_name }} uses multi-valued attributes to associate multiple email addresses and mobile numbers with their profiles. For users with multiple values, they may also select a primary email address and a primary mobile number.

The following attributes are used for this purpose:

- Email Addresses
- Verified Email Addresses
- Mobile Numbers
- Verified Mobile Numbers

## Enable/Disable multiple emails and mobile numbers feature

{% if product_name == "Asgardeo" %}
Unless you have configured remote user stores, the email address/mobile number-related attributes are already enabled to new and existing organizations.
{% endif %}
To manually enable or disable this feature, **you must update all related attributes** by following these steps:

1. On the {{ product_name }} Console, navigate to **User Attributes and Stores** > **Attributes**.
2. Under **Manage Attributes**, click **Attributes** to view the list of all attributes.
3. Click **Edit** next to the corresponding attribute.
4. Enable/Disable the **Display this attribute on the user's profile** checkbox.
5. Click **Update** to save the changes.

## Exclude these attributes from a user store

For non-JDBC {{ 'secondary' if product_name == 'WSO2 Identity Server' else 'remote' }} user stores, you must ensure proper mapping of these attributes in the user store. If mapping is not feasible, you can disable support for these attributes in that user store by following the steps below.

   1. On the {{ product_name }} Console, navigate to **User Attributes and Stores** > **Attributes**.
   2. Under **Manage Attributes**, click **Attributes** to view the list of all attributes.
   3. Click **Edit** for the attribute you wish to modify.
   4. Go to the **Attribute Mappings** tab.
   5. Find the corresponding user store and uncheck the **Enable for this user store** checkbox.
   6. Click **Update** to save the changes

   ![Enable for user store]({{base_path}}/assets/img/guides/organization/attributes/enable-for-user-store.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
