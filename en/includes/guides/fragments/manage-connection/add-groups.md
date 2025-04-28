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

### Add groups to connections

Follow the steps below to add the groups from your connection to {{ product_name }}:

1. On the {{ product_name }} Console, go to **Connections**.
2. Select your connection and go to its **Groups** tab.
3. Click **New Group** and enter the group name. Be sure to enter the exact group name that will be returned from the connection.

    ![Add group]({{base_path}}/assets/img/guides/idp/add-federated-group.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Finish** to add the group information.