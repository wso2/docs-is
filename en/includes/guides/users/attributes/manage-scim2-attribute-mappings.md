# Manage SCIM 2.0 attribute mappings

Attributes in your organization are mapped to the following SCIM 2.0 schemas mappings:

- [Core schema attributes](https://datatracker.ietf.org/doc/html/rfc7643#section-3.1){:target="_blank"}
- [User schema attributes](https://datatracker.ietf.org/doc/html/rfc7643#section-4.1){:target="_blank"}
- [Enterprise schema attributes](https://datatracker.ietf.org/doc/html/rfc7643#section-4.3){:target="_blank"}
- Custom schema attributes

The attributes in the core, user, and enterprise schemas are well-defined in the [SCIM 2.0 specification](https://datatracker.ietf.org/doc/html/rfc7643){:target="_blank"} and you can't modify the attributes in these schemas. Custom schema attributes can be added or deleted by users.

{{custom_schema_note}}

## View SCIM 2.0 attributes
To view the SCIM 2 attributes mapped to user attributes in your organization:

1. On the {{ product_name }} Console, go to {{ attribute_path }} > **Attributes**.
2. Under **Manage Attribute Mappings**, click **SCIM 2.0**.

    ![View SCIM2 attributes]({{base_path}}/assets/img/guides/organization/attributes/attribute-mappings/view-scim2-attributes.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Add a SCIM 2.0 custom schema attribute
You can add new SCIM 2.0 custom schema attributes as follows:

1. On the {{ product_name }} Console, go to {{ attribute_path }} >  **Attributes**.
2. Under **Manage Attribute Mappings**, click **SCIM 2.0**.
3. Click **New Attribute** and enter values for the following properties:

    ![Add OpenID Connect attributes]({{base_path}}/assets/img/guides/organization/attributes/attribute-mappings/add-scim2-attribute-mapping.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    <table>
          <tbody>
            <tr>
                <td>**SCIM Attribute**</td>
                <td>The SCIM attribute name that will be shared with applications.</td>
             </tr>
             <tr>
                <td>**User attribute to map to**</td>
                <td>Select the default attribute that should be mapped to the new SCIM attribute.</td>
             </tr>
          </tbody>
       </table>

4. Click **Save**.

## Delete a SCIM 2.0 custom schema attribute
To delete the SCIM 2.0 custom schema attributes available in your organization:

1. On the {{ product_name }} Console, go to {{ attribute_path }} > **Attributes**.
2. Under **Manage Attribute Mappings**, click **SCIM 2.0**.
3. Navigate to the **Custom Schema** tab and select the attribute to delete.
3. Click **Delete** and select the checkbox to confirm you action.
4. Click **Confirm**.

!!! note
    Only custom attributes can be deleted.