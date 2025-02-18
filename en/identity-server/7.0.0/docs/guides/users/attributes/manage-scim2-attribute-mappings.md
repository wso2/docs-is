{% set attribute_path = "**User Attributes & Stores**" %}

{% set custom_schema_note = "!!! note
    Custom user attributes in WSO2 Identity Server are created under the `urn:scim:wso2:schema` schema. You can configure this schema in the following ways by updating the `<IS_HOME>/repository/conf/identity/charon-config.xml` file.
    
      - To disable this schema, set the following property to `false`.

         ```bash
         <Property name=\"custom-user-schema-enabled\">false</Property>
         ```

      - To rename this schema, update the following property.

         ```bash
         <Property name=\"custom-user-schema-uri\">urn:scim:custom:schema:new</Property>
         ```
"%}

{% set immutable_claims_note = "!!! note
    A set of attributes in the enterprise schema are immutable. These attributes are used for internal purposes of WSO2 Identity Server and are not intended to be modified. Attempting to modify these attributes, either through the SCIM 2.0 API or from the user profile in the Console, will result in an error.

    These attributes can be identified by the `\"mutability\"` key with the value `\"readOnly\"` configured in the `scim2-schema-extension.config` file.

    The following attributes in the Identity Server are immutable in the default setup:

    - `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:pendingEmails.value`
    - `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:pendingEmails`
    - `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:accountState`
    - `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:lastLoginTime`
    - `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:lastLoginTime`
    - `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:lastPasswordUpdateTime`
    - `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:lockedReason`
    - `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:isReadOnlyUser`
    - `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:oneTimePassword`
"%}

{% include "../../../../../../includes/guides/users/attributes/manage-scim2-attribute-mappings.md" %}