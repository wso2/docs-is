# Build SCIM 2.0 user creation payloads

This guide provides information on building user creation payloads that align with the SCIM 2.0 specification. Follow the steps below to ensure your user creation payload meets the standard requirements.

## Step 1 : Determine the associated schema

{{product_name}} maps user attributes to the following SCIM 2.0 schemas:

- Core Schema
- User Schema
- Enterprise Schema
- Custom Schema

The first step of building a SCIM 2.0 payload is to identify the schema mapping for your user attribute.

!!! note

    - You may find these schemas on the {{product_name}} Console by navigating to **User Attributes & Stores** > **Attributes** > **SCIM 2.0**. Learn how to [Manage SCIM 2.0 attribute mappings]({{base_path}}/guides/users/attributes/manage-scim2-attribute-mappings).

For a user attribute,

- if it is mapped to the **Core Schema** or the **User Schema**, the schema URI does not need to be included in the SCIM payload.

    ```json
    {
      "name": {
        "givenName": "Kim",
        "familyName": "Berry"
      },
      "username": "kimberry"  
    }
    ```

- If it is mapped to **Enterprise Schema** or **Custom Schema**, it needs to be placed under the namespace of the corresponding schema.


    ```json
    {
     "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
       "employeeNumber": "1234A"
     },
     "urn:scim:wso2:schema": {
       "customAttribute": "xyz"
     }
    }
    ```

## Step 2 : Identify the attribute type

Each SCIM attribute belongs to one of the following types, which determine how the attribute is formatted in the payload.


- **Single-valued Attributes** contain a single value.

    - **Simple Attributes** contain a single attribute.

          ```json
          {
            "userName": "kim"
          }
          ```


    - **Complex Attributes** contain multiple sub-attributes.

        ```json
        {
          "name": {
            "givenName": "Kim",
            "familyName": "Berry"
          }
        }
        ```

- **Multi-Valued Attributes** hold multiple values

      - **Simple Attributes** contain a single attribute.

        ```json
        {
            "devices": ["d1", "d2"]
        }
        ```

      - **Complex Attributes** contain multiple sub-attributes.

        ```json
        {
          "emails": [
            {
              "value": "kim@gmail.com",
              "primary": true
            },
            {
              "type": "work",
              "value": "kim@wso2.com"
            }
          ]
        }
        ```

!!! info
    The following references provide comprehensive information about SCIM attribute types and their respective definitions. These details can help identify the type of attributes used in SCIM 2.0 payloads:

      - For attributes under core schema, user schema and SCIM2 specification-defined enterprise schema, refer to [RFC 7643 Section 8.7.1](https://datatracker.ietf.org/doc/html/rfc7643#section-8.7.1).

      {% if product_name == "WSO2 Identity Server" %}
      - For {{product_name}}-defined enterprise schema attributes, refer to the `scim2-schema-extension.config` file located in the `<IS_HOME>/repository/conf/` directory.
      {% endif %} 

      - For custom schema attributes, check the `dataType` meta attribute of the mapped local attribute.

## Step 3: Build the payload

Let's combine the two steps above and build the payload for each attribute type.

### For Core and User schemas

The schema URI does not need to be included in the user creation payload. Therefore, you can simply add the attributes and their values to the payload as shown below.

- Single-valued simple attributes

    ```json
    {
      "userName": "kim"
    }
    ```


  - Single-valued complex attributes.

    ```json
    {
      "name": {
        "givenName": "Kim",
        "familyName": "Berry"
      }
    }
    ```

- Multi-Valued complex attributes

    !!! note

        By default, core schema, user schema, and enterprise schema do not have multi-valued simple attributes.

    ```json
    {
      "emails": [
        {
          "value": "kim@gmail.com",
          "primary": true
        },
        {
          "type": "work",
          "value": "kim@wso2.com"
        }
      ]
    }
    ```

### For other schemas

The schema URI needs to be included in the user creation payload. Therefore, when you are adding such an attribute be sure to do so under the relevant schema.

- Single-valued simple attributes

    ```json
    {
    "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":
      "employeeNumber": "1234A"
    }
    ```

- Single-valued complex attributes.

    ```json
    {
      "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": 
        "manager": {
          "value": "Taylor",
          "displayName": "Taylor Smith"
        }
    }
    ```

- Multi-valued simple attributes


    ```json
    {
      "urn:scim:wso2:schema":
        "devices": ["d1", "d2"]
    }
    ```

## Example Payload
```json
{
 "schemas": [
   "urn:ietf:params:scim:schemas:core:2.0:User",
   "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User",
   "urn:scim:wso2:schema"
 ],
 "userName": "kim",
 "password": "MyPa33w@rd",
 "name": {
   "givenName": "Kim",
   "familyName": "Berry"
 },
 "emails": [
   {
     "value": "kim@gmail.com",
     "primary": true
   },
   {
     "type": "work",
     "value": "kim@wso2.com"
   }
 ],
 "phoneNumbers": [
   {
     "type": "mobile",
     "value": "+1234567890"
   },
   {
     "type": "work",
     "value": "+0987654321"
   }
 ],
 "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
   "employeeNumber": "1234A",
   "division": "R&D",
   "manager": {
     "value": "Taylor",
     "displayName": "Taylor Smith"
   }
 },
 "urn:scim:wso2:schema": {
   "customAttribute": "customValue",
   "devices": ["d1", "d2"]
 }
}
```
