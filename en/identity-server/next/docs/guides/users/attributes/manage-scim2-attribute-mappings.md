{% set attribute_path = "**User Attributes & Stores**" %}

{% set custom_schema_note = "!!! note
    Custom user attributes in WSO2 Identity Server are created under the `urn:scim:schemas:extension:custom:User` schema. You can configure this schema in the following ways by updating the `<IS_HOME>/repository/conf/identity/charon-config.xml` file.
    
      - To disable this schema, set the following property to `false`.

         ```bash
         <Property name=\"custom-user-schema-enabled\">false</Property>
         ```

      - To rename this schema, update the following property.

         ```bash
         <Property name=\"custom-user-schema-uri\">urn:scim:custom:schema:new</Property>
         ```
"%}

{% include "../../../../../../includes/guides/users/attributes/manage-scim2-attribute-mappings.md" %}