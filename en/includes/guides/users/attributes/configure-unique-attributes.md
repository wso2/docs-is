# Configure unique attributes

{{product_name}} can be configured to enforce the uniqueness of user attributes, ensuring that a specific attribute
value remains unique either within a single userstore or across all userstores.

Follow the steps below to configure:

{% if product_name == "WSO2 Identity Server" and is_version != "7.0.0" %}
1. Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` folder and add the following configurations.

    ```toml
    [identity_mgt.user_claim_update.uniqueness]
    enable = true
    ```

2. Restart the {{product_name}}.
3. On the {{ product_name }} Console, go to **User Attributes & Stores** > **Attributes**.
4. Click **Attributes** to see the list of attributes.
5. Click **Edit** for the attribute you want to update.
6. In the **General** tab, select the desired scope of uniqueness validation from the **Uniqueness Validation**
dropdown to configure the attribute's uniqueness.

{% elif product_name == "Asgardeo" %}
1. On the {{ product_name }} Console, go to **User Attributes & Stores** > **Attributes**.
2. Click **Attributes** to see the list of attributes.
3. Click **Edit** for the attribute you want to update.
4. In the **General** tab, select the desired scope of uniqueness validation from the **Uniqueness Validation**
dropdown to configure the attribute's uniqueness.
{% endif %}

    !!! note
        The uniqueness validation options available are as follows:

        - **None**: No validation is applied. Users can have duplicate values for the selected attribute both within and across all userstores.
        - **Within Userstore**: Ensures the selected attribute's value is unique within the specific userstore where the user resides. Duplicate values are permitted in other userstores.
        - **Across Userstore**: Ensures the selected attribute's value is unique across all userstores in the system, preventing duplicates system-wide.

    ![additional-properties]({{base_path}}/assets/img/guides/users/configure-attribute-uniqueness-validation.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% if product_name == "WSO2 Identity Server" and is_version != "7.0.0" %}
7. Click `Update` to save the changes.
{% else %}
5. Click `Update` to save the changes.
{% endif %}

You can now verify the functionality by attempting to add users with an existing attribute value or updating the user attribute value of an existing user.