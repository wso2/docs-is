# Configure unique attributes

User attributes can be configured to be unique. This setting determines the scope within which users must have a unique value for a given attribute.

Follow the steps below to configure the uniqueness of user attributes:

{% if product_name == "WSO2 Identity Server" and is_version != "7.0.0" %}
1. Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` folder and add the following configurations.

    ```toml
    [identity_mgt.user_claim_update.uniqueness]
    enable = true
    ```

2. Restart {{product_name}}.
{% endif %}

3. On the {{ product_name }} Console, go to **User Attributes & Stores** > **Attributes**.
4. Under **Manage Attributes**, click **Attributes** to see the list of attributes.
5. Click the **Edit** icon corresponding to the attribute you want to update.
6. In the **General** tab of the attribute, select one of the following scopes from the **Uniqueness Validation** dropdown. 

    - **None**: No validation is applied. Users can have duplicate values for the selected attribute.
    - **Within User Store**: Users within the same user store cannot have duplicate values for the selected attribute. However, users in other user stores may have duplicates.
    - **Across User Stores**: Attribute values are unique across all user stores preventing duplicates throughout the organization.

    ![additional-properties]({{base_path}}/assets/img/guides/users/configure-attribute-uniqueness-validation.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

7. Click **Update** to save the changes.

You can now verify the functionality by attempting to add users with an existing attribute value or updating the user attribute value of an existing user.