# Configure unique attributes

User attributes can be configured to be unique. This setting determines the scope within which users must have a unique value for a given attribute.

Follow the steps below to configure the uniqueness of user attributes:

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
!!! note
    To disable the attribute uniqueness validation feature:
    
    1. Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` folder.
    2. Add the following configurations:
        ```toml
        [identity_mgt.user_claim_update.uniqueness]
        enable = false
        ```
    3. Restart {{product_name}} to apply the changes.
{% endif %}