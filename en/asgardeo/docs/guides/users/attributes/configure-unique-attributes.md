{% set product_name = "Asgardeo" %}
{% set steps %}
1. On the {{ product_name }} Console, go to **User Attributes & Stores** > **Attributes**.
2. Click **Attributes** to see the list of attributes.
3. Click **Edit** for the attribute you want to update.
4. In the **General** tab, select the desired scope of uniqueness validation from the **Uniqueness Validation**
dropdown to configure the attribute's uniqueness.
{% endset %}

{% set final_step %}
5. Click `Update` to save the changes.
{% endset %}

{% include "../../../../../includes/guides/users/attributes/configure-unique-attributes.md" %}