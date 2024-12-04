# Build SCIM 2.0 User Creation Payloads


This guide explains how to build SCIM 2.0 payloads in compliance with the SCIM 2.0 specification.


## Step 1 : Identifying SCIM 2.0 Claims for User Attributes


To build a SCIM 2.0 payload, the first step is identifying the SCIM schema mapping for your user attribute:


Navigate to **User Attributes & Stores** → **Attributes** → **SCIM 2.0** in the {{ product_name }} console. You will see the following schema options:

  - **Core Schema**
  - **User Schema**
  - **Enterprise Schema**
  - **Custom Schema**  {% if product_name == "WSO2 Identity Server" %} (if you have mapped any custom user attribute to a SCIM claim). {% endif %} 


> For further details refer [Manage SCIM 2.0 attribute mappings]({{base_path}}/guides/users/attributes/manage-scim2-attribute-mappings)


### Rules for Schema Usage in SCIM 2.0 Payloads


- If your user attribute is mapped to **Core Schema** or **User Schema**, the schema name does not need to be qualified in the SCIM payload.
- If your user attribute is mapped to **Enterprise Schema** or **Custom Schema**, each SCIM attribute under these schemas must be placed under the schema’s namespace.


#### Example
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


## Step 2 : Attribute Types in SCIM 2.0 Payloads


Each SCIM attribute falls into one of the following attribute types, which determine the format of the attribute in the payload.




### Singular Attributes

1. **Simple Attributes**

    Example:
    ```json
    {
      "userName": "kim"
    }
    ```


2. **Complex Attributes**

    Example:
    ```json
    {
      "name": {
        "givenName": "Kim",
        "familyName": "Berry"
      }
    }
    ```


### Multi-Valued Attributes
1. **Simple Attributes**

    Extended attribute example:
    ```json
    {
      "urn:scim:wso2:schema:userDevices": {
        "devices": ["d1", "d2"]
      }
    }
    ```

    > No multivalued simple attributes are defined in the Core Schema, User Schema, or Enterprise Schema.


2. **Complex Attributes**

    Example for `emails` attribute:
    ```json
    {
      "emails": [
        {
          "type": "home",
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

!!! note
    The following references provide comprehensive information about SCIM attribute types and their respective definitions. These details can help identify the type of attributes used in SCIM 2.0 payloads:

      - For attributes under **Core Schema**, **User Schema** and Specification-defined Enterprise Schema, refer to [RFC 7643 Section 8.7.1](https://datatracker.ietf.org/doc/html/rfc7643#section-8.7.1).

      {% if product_name == "WSO2 Identity Server" %}
      - For WSO2 IS-defined Enterprise Schema attributes, refer to the `scim2-schema-extension.config` file located in the `<IS_HOME>/repository/conf/` directory.
      {% endif %} 

      - For Custom Schema attributes, check the type meta attribute of the mapped local attribute.

## Step 3: Determining the Type of SCIM 2.0 Attributes

The patterns described below are used for SCIM attributes to map local user attributes. SCIM claim mappings should follow these patterns for different types of SCIM attributes.

Based on the pattern:

  1. Identify the type of the attribute.
  2. Construct the payload as outlined in Step 2.


### Singular Simple Attributes


- **Format:** `<schema name>:<attribute name>`
- By default, these attributes are treated as singular simple attributes.


### Multivalued Simple Attributes


- **Format:** `<schema name>:<attribute name>`
- These attributes are treated as multivalued simple attributes when the `type` property is specified.


  > By default, Core Schema, User Schema, and Enterprise Schema do not have multivalued simple attributes.


### Complex Attributes with Sub-Attributes


- **Format:** `<schema name>:<attribute name>.<sub attribute>`
- This format is used for sub-attributes of complex attributes.


### Multivalued Complex Attributes


- **Format:** `<schema name>:<multivalued attribute name>` and `<schema name>:<multivalued attribute name>.<type>`
- By default, multivalued complex attributes support only the `type` and `value` sub-attributes.
- Examples include attributes like `emails` and `addresses`.


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
     "type": "home",
     "value": "kim@gmail.com",
     "primary": true
   },
   {
     "type": "work",
     "value": "kim@wso2.com"
   }
 ],
 "addresses": [
   {
     "type": "home",
     "value": "123 Main St, City, Country"
   },
   {
     "type": "work",
     "value": "456 Office Rd, City, Country"
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
