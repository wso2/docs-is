# Configure unique attributes

Attributes are pieces of user information. While users can have the same value for a given user attribute (e.g. Country), there can be attributes (e.g. employee ID) for which user must have a unique values. This guide explains how you can set a uniqueness check for attributes to prevent duplicate values.

Follow the steps below to set the uniqueness for a user attribute:

1. On the {{ product_name }} Console, go to **User Attributes & Stores** > **Attributes**.
2. Under **Manage Attributes**, click **Attributes** to see the list of attributes.
3. Click the **Edit** icon corresponding to the attribute you want to update.
4. In the **General** tab of the attribute, select one of the following scopes from the **Uniqueness Validation** dropdown. 

    - **None**: No validation is applied. Users can have duplicate values for the selected attribute.
    - **Within User Store**: Users within the same user store cannot have duplicate values for the selected attribute. However, users in other user stores may have duplicates.
    - **Across User Stores**: Attribute values are unique across all user stores preventing duplicates throughout the organization.

    ![additional-properties]({{base_path}}/assets/img/guides/users/configure-attribute-uniqueness-validation.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Update** to save the changes.

You can now verify the functionality by attempting to add users with an existing attribute value or updating the user attribute value of an existing user.

{% if product_name == "WSO2 Identity Server" and is_version != "7.0.0" %}
!!! note "Disable uniqueness validation"

    To disable the uniqueness check for user attributes, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file and restart {{product_name}}.

    ```toml
    [identity_mgt.user_claim_update.uniqueness]
    enable = false
    ```
{% endif %}