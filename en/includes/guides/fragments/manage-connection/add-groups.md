### Map local attributes to external attributes

Follow the steps below to map attributes of {{product_name}} with that of a connection.

1. On the {{ product_name }} Console, go to **Connections**.

2. Select your connection and go to its **Attributes** tab.

3. Click **Add Attribute Mapping** to add a new attribute mapping.

    ![Add attribute mappings]({{base_path}}/assets/img/guides/idp/group-mapping/add-attribute-mappings.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Enter the  **External IdP Attribute** of the connection and map it to the **Groups** attribute of {{ product_name }}.

    ![Add new group attribute mapping]({{base_path}}/assets/img/guides/idp/group-mapping/add-new-group-attribute-mapping.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Add Attribute Mapping** and then click **Save**.

    ![Stage new group attribute mapping]({{base_path}}/assets/img/guides/idp/group-mapping/stage-new-group-attribute-mapping.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

6. Click **Update** to save the changes.

    ![Submit attribute mappings]({{base_path}}/assets/img/guides/idp/group-mapping/submit-attribute-mappings.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% if product_name == "WSO2 Identity Server" %}

### Add required attributes for provisioning

When provisioning users from an external identity provider (IdP), you may want to include specific attributes in the user’s profile. Follow the steps below to define the required attributes and assign default values.

1. On the {{ product_name }} Console, go to **Connections**.
2. Select your connection and go to its **Attributes** tab.
3. Under **Provisioning Attributes Selection**, click **Add Attribute**.
4. Move the attributes that you want to include in the provisioned user's profile and click **Save**.

    ![Add required attributes for provisioning]({{base_path}}/assets/img/guides/idp/add-required-attributes-for-provisioning.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Add a default value to the attribute. If the federated user lacks data for it, the system adds the default to the provisioned user’s profile.

    ![Add default value for required attributes]({{base_path}}/assets/img/guides/idp/add-default-value-for-required-attributes.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! note

        To add default values to the provisioned user’s profile when the federated user has no value, configure the following in the `<IS_HOME>/repository/conf/deployment.toml` file.

        ```toml
        [authentication.endpoint]
        enable_merging_custom_claim_mappings_with_default = true
        ```

{% endif %}

### Add groups to connections

Follow the steps below to add the groups from your connection to {{ product_name }}:

1. On the {{ product_name }} Console, go to **Connections**.
2. Select your connection and go to its **Groups** tab.
3. Click **New Group** and enter the group name. Be sure to enter the exact group name that will be returned from the connection.

    ![Add group]({{base_path}}/assets/img/guides/idp/add-federated-group.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Finish** to add the group information.
