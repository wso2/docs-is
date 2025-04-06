# Manage SCIM 2.0 attribute mappings

Attributes in your organization are mapped to the following SCIM 2.0 schema mappings:

??? details "Core schema"

    The core schema defines a set of common attributes that are included in every SCIM resource, such as unique identifiers and resource metadata. Core schema attributes are an integral part of every base resource schema. Unlike other schemas, the core schema does not have its own URI and is inherently included in every resource definition.

    Read about core schema in the [SCIM2 specification](https://datatracker.ietf.org/doc/html/rfc7643#section-3.1){blank="_target"}.

??? details "User schema"

    The user schema defines attributes specific to user resources, in addition to the core schema attributes. This schema is identified by the URI `urn:ietf:params:scim:schemas:core:2.0:User`. Attributes in the user schema include details such as the user's name, email addresses, phone numbers, roles, and other identity-related properties.

    Read about user schema in the [SCIM2 specification](https://datatracker.ietf.org/doc/html/rfc7643#section-4.1){blank="_target"}.

??? details "Enterprise schema"

    The enterprise schema extends the user schema to include attributes commonly used for representing users in business or enterprise environments. This schema is identified by the URI `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User`. Attributes in the enterprise schema include details such as the user’s department, manager, cost center, and other organization-specific properties.

    Read about enterprise schema in the [SCIM2 specification](https://datatracker.ietf.org/doc/html/rfc7643#section-4.3){blank="_target"}.

{% if (product_name == "WSO2 Identity Server" and is_version != "7.0.0") or product_name == "Asgardeo" %}

??? details "System schema"

    The system schema is a user extension provided by {{product_name}} to support attributes related to the product features and functionalities. It includes user attributes that are essential for Identity Server-specific operations, as well as general user attributes not covered in the standard SCIM specification.

{% endif %}

??? details "Custom schema"

    Custom schema attributes provide the flexibility to extend standard SCIM schemas with additional fields to fit the needs of your organization. While other attribute schemas cannot be modified, you can freely add or delete custom schema attributes.

    {% if product_name == "WSO2 Identity Server" %}

    {% if is_version >= "7.1.0" %}
    Custom user attributes in WSO2 Identity Server are created under the `urn:scim:schemas:extension:custom:User` schema. 
    {% else %}
    Custom user attributes in WSO2 Identity Server are created under the `urn:scim:wso2:schema` schema.
    {% endif %}
    You can configure this schema in the following ways by adding configuration to `<IS_HOME>/repository/conf/deployment.toml`
    
    - To disable this schema,
         
        ```toml
        [scim2]
        enable_custom_schema_extension = false
        ```

    - To rename this schema,

        ```toml
        [scim2]
        custom_user_schema_uri = "urn:scim:custom:schema:new"
        ```
    {% endif %}

{% if immutable_claims_note %}
{{immutable_claims_note}}
{% endif %}

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