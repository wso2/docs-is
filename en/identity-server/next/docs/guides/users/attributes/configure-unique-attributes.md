{% set product_name = "WSO2 Identity Server" %}
{% set steps %}
1.  Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` folder and add the following configurations.

    ``` toml
    [identity_mgt.user_claim_update.uniqueness]
    enable = true
    ```

2.  Restart the {{product_name}}.
3. On the {{ product_name }} Console, go to **User Attributes & Stores** > **Attributes**.
4. Click **Attributes** to see the list of attributes.
5. Click **Edit** for the attribute you want to update.
6. In the **General** tab, select the desired scope of uniqueness validation from the **Uniqueness Validation**
dropdown to configure the attribute's uniqueness.
{% endset %}

{% set final_step %}
7. Click `Update` to save the changes.
{% endset %}

{% include "../../../../../../includes/guides/users/attributes/configure-unique-attributes.md" %}