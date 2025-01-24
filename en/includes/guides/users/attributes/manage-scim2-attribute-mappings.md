# Manage SCIM 2.0 attribute mappings

Attributes in your organization are mapped to the following SCIM 2.0 schemas mappings:

- [Core schema attributes](https://datatracker.ietf.org/doc/html/rfc7643#section-3.1){:target="_blank"}
- [User schema attributes](https://datatracker.ietf.org/doc/html/rfc7643#section-4.1){:target="_blank"}
- [Enterprise schema attributes](https://datatracker.ietf.org/doc/html/rfc7643#section-4.3){:target="_blank"}
{% if (product_name == "WSO2 Identity Server" and is_version != "7.0.0") or product_name == "Asgardeo" %}
- System schema attributes
{% endif %}
- Custom schema attributes

#### Core Schema

The core schema defines a set of common attributes that are included in every SCIM resource, such as unique identifiers and resource metadata. Core schema attributes are considered an integral part of every base resource schema. Unlike other schemas, the core schema does not have its own URI and is inherently included in every resource definition.

#### User Schema

The user schema defines attributes specific to User resources, in addition to the core schema attributes. This schema is identified by the URI `urn:ietf:params:scim:schemas:core:2.0:User`. Attributes in the user schema include details such as the user's name, email addresses, phone numbers, roles, and other identity-related properties.

#### Enterprise User Schema

The enterprise schema extends the user schema to include attributes commonly used for representing users in business or enterprise environments. This schema is identified by the URI `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User`. Attributes in the enterprise schema include details such as the user’s department, manager, cost center, and other organization-specific properties.

{% if (product_name == "WSO2 Identity Server" and is_version != "7.0.0") or product_name == "Asgardeo" %}

#### System Schema

The system schema is a user extension provided by the {{product_name}} to support attributes related to the product features and functionalities. It includes user attributes that are essential for Identity Server-specific operations, as well as general user attributes not covered in the standard SCIM specification.

{% endif %}

#### Custom Schema

Custom schema attributes are user-defined attributes that can be added to tailor SCIM schemas to the unique needs of your organization. These attributes provide flexibility to extend the standard schemas with additional fields that are specific to your business requirements.

{% if (product_name == "WSO2 Identity Server" and is_version != "7.0.0") or product_name == "Asgardeo" %}

The attributes in the core, user, and enterprise schemas are well-defined in the [SCIM 2.0 specification](https://datatracker.ietf.org/doc/html/rfc7643){:target="_blank"}. The system schema is maintained by the {{product_name}}. You can't modify the attributes in these schemas. However, custom schema attributes can be freely added or deleted by users.

{% else %}

The attributes in the core, user, and enterprise schemas are well-defined in the [SCIM 2.0 specification](https://datatracker.ietf.org/doc/html/rfc7643){:target="_blank"} and you can't modify the attributes in these schemas. Custom schema attributes can be added or deleted by users.

{% endif %}

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