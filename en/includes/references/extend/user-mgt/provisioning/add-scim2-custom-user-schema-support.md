# SCIM2 Custom User Schema Support

{{ product_name }} allows adding custom attributes into user objects through Custom schema.

{% if product_name ==  "WSO2 Identity Server" %}
!!! Note
    **Reasons why we introduced custom schema to add custom attributes:**

    - According to the current model, Enterprise User Extension attributes are in a file, and those configurations apply at the server level.
    - Enterprise User Extension is a defined schema and should not be modified.
{% endif %}

## How to add claims to support simple attributes

### Add custom local claim

1. Navigate to **User Attributes & Stores** > **Attributes** in console.
2. Click **Attributes** under **Manage Attributes**.
3. Click **New Attribute** and enter the following values.
    - **Attribute Name**: `http://wso2.org/claims/customClaim`
    - **Attribute Display Name**: `Custom Claim`

    ![add-scim-local-custom-claim]({{base_path}}/assets/img/references/extend/user-mgt/provisioning/add-custom-local-claim.png)

4. Go to the **Edit Attribute** of the custom attribute you just created.
5. Select necessary options in **Attribute Configurations** to make the field visible in user profiles and click **Update**.
   ![local-claim-attribute-configurations]({{base_path}}/assets/img/references/extend/user-mgt/provisioning/local-claim-attribute-configurations.png)

{% if product_name ==  "WSO2 Identity Server" %}
!!! Note
    If you want to add any additional properties for the scim attribute in Custom schema, you can add them using **Additional Properties** in the local claim configuration.

    <div style="text-align: center;">
        <table style="margin: 0 auto;">
            <thead>
                <tr class="header">
                    <th>Property Name</th>
                    <th>Allowed Values</th>
                </tr>
            </thead>
            <tbody>
                <tr class="odd">
                    <td>dataType</td>
                    <td>string, boolean, integer, decimal, complex, dateTime</td>
                </tr>
                <tr class="even">
                    <td>multiValued</td>
                    <td>true, false</td>
                </tr>
                </tr>
                <tr class="odd">
                    <td>caseExact</td>
                    <td>true, false</td>
                </tr>
                <tr class="even">
                    <td>mutability</td>
                    <td>readWrite, readOnly, immutable</td>
                </tr>
                <tr class="odd">
                    <td>returned</td>
                    <td>always, default, never, request</td>
                </tr>
                <tr class="odd">
                    <td>subAttributes</td>
                    <td>{sub_attribute_uri_1} {sub_attribute_uri_2}</td>
                </tr>
            </tbody>
        </table>
    </div>

!!! note

    - You can use the word `customClaim` or any other preferred word as the **Mapped Attribute** when using a JDBC user store because JDBC user stores will automatically create a new attribute if it does not already exist in the user store. However, if you are using LDAP or Active Directory, you will have to use an attribute that exists in the user store already.

    - The configuration above is valid when using the PRIMARY user store. If you have a secondary user store configured, make sure to add another attribute mapping by clicking **Add Attribute Mapping** and selecting the secondary user store.
{% endif %}

### Map the custom claim

!!! Note
    SCIM 2.0 protocol mapping in Custom schema, will be created automatically with the Custom local claim creation as mentioned in the **Protocol Mapping** section in the wizard.

If it is not added, you can add it manually by,

1. Navigate to **User Attributes & Stores** > **Attributes** in console.
2. Click **SCIM 2.0** under **Manage Attribute Mappings**.
3. Click **New Attribute** in **Custom Schema** tab and enter the following values.
    - **SCIM Attribute**: `customClaim`
    - **User Attribute to map to**: Select local claim from the dropdown
4. Click **Add Attribute Mapping** and click **Finish**.
    ![map-scim2-custom-claim]({{base_path}}/assets/img/references/extend/user-mgt/provisioning/map-scim2-custom-claim.png)

### Try it out

1. Create a user from **User Management** > **Users** in console.
2. Go to the **User Profile** of the user you just created.
3. Add a value for the **Custom Claim** field and click **Update**.
{% if product_name ==  "WSO2 Identity Server" %}
4. Retrieve the user using SCIM and ensure that the custom claim value is present.

    !!! abstract ""
        **SCIM Request**
        ```bash
        curl -v -k --user admin:admin https://localhost:9443/scim2/Users
        ```
        ---
        **SCIM Response**
        ```
        {
            "totalResults": 1,
            "startIndex": 1,
            "itemsPerPage": 1,
            "schemas": [
                "urn:ietf:params:scim:api:messages:2.0:ListResponse"
            ],
            "Resources": [
                {
                    "emails": [
                        "alex@wso2.com"
                    ],
                    "urn:scim:schemas:extension:custom:User": {
                        "customClaim": "testValue"
                    },
                    "meta": {
                        "created": "2025-04-15T13:15:59.362739Z",
                        "location": "https://localhost:9443/scim2/Users/65f09c38-23e0-4132-867f-451699e18022",
                        "lastModified": "2025-04-15T13:17:06.638187Z",
                        "resourceType": "User"
                    },
                    "name": {
                        "givenName": "Alex",
                        "familyName": "Parker"
                    },
                    "id": "65f09c38-23e0-4132-867f-451699e18022",
                    "userName": "alex",
                    "urn:scim:wso2:schema": {
                        "emailAddresses": [
                            "alex@wso2.com"
                        ]
                    }
                }
            ]
        }
        ```


5. You can also try out updating the Custom Claim value using the following SCIM command and check if the value is updated by accessing the user profile on the console. 

    !!! abstract ""
        **SCIM Patch Request**
        ```
        curl --location --request PATCH 'https://localhost:9443/scim2/Users/65f09c38-23e0-4132-867f-451699e18022' \
        --header 'Authorization: Basic YWRtaW46YWRtaW4=' \
        --header 'Content-Type: application/json' \
        --data '{
                "schemas": [
                    "urn:ietf:params:scim:api:messages:2.0:PatchOp"
                ],
                "Operations": [
                    {
                        "op": "replace",
                        "value": {
                            "urn:scim:schemas:extension:custom:User": {
                                "customClaim": "New value"
                            }
                        }
                    }
                ]
            }'
        ```
{% endif %}


## How to add claims to support multi-valued simple attributes

Let's see when we have a **deviceNames** simple multi-valued attribute.

### Add local claim for deviceNames

1. Navigate to **User Attributes & Stores** > **Attributes** in console.
2. Click **Attributes** under **Manage Attributes**.
3. Click **New Attribute** and enter the following values.
    - **Attribute Name**: `http://wso2.org/claims/deviceNames`
    - **Attribute Display Name**: `Device Names`
4. Click Finish.
5. Go to the **Edit Attribute** of the custom attribute you just created.
6. Select necessary options in **Attribute Configurations** to make the field visible in user profiles and click **Update**.
{% if (product_name == "WSO2 Identity Server" and is_version <= "7.1.0" ) %}
7. Navigate to **Additional Properties** tab and enter following property and click **Update**.
    - `multiValued`: `true`
{% else %}
7. Check the **Allow multiple values for this attribute**.
{% endif %}

    
    ![additional-properties-multi-valued-attribute]({{base_path}}/assets/img/references/extend/user-mgt/provisioning/additional-properties-multi-valued-attribute.png)

### Map the custom claim

!!! Note
    SCIM 2.0 protocol mapping in Custom schema, will be created automatically with the Custom local claim creation as mentioned in the **Protocol Mapping** section in the wizard.

If it is not added, refer <a href="#map-the-custom-claim">Map the custom claim</a> to add it manually.

### Try it out

1. Create a user from **User Management** > **Users** in console.
2. Go to the **User Profile** of the user you just created.
3. Add values for the **Device Names** field and click **Update**.
   ![multi-valued-attribute-field]({{base_path}}/assets/img/references/extend/user-mgt/provisioning/multi-valued-attribute-field.png)
{% if product_name ==  "WSO2 Identity Server" %}
4. Retrieve the user using SCIM and ensure that the custom claim value is present.

    !!! abstract ""
        **SCIM Request**
        ```bash
        curl -v -k --user admin:admin https://localhost:9443/scim2/Users
        ```
        ---
        **SCIM Response**
        ```
        {
            "totalResults": 1,
            "startIndex": 1,
            "itemsPerPage": 1,
            "schemas": [
                "urn:ietf:params:scim:api:messages:2.0:ListResponse"
            ],
            "Resources": [
                {
                    "emails": [
                        "alex@wso2.com"
                    ],
                    "urn:scim:schemas:extension:custom:User": {
                        "deviceNames": [
                            "device1",
                            "device2",
                            "device3"
                        ]
                    },
                    "meta": {
                        "created": "2025-04-15T13:15:59.362739Z",
                        "location": "https://localhost:9443/scim2/Users/65f09c38-23e0-4132-867f-451699e18022",
                        "lastModified": "2025-04-15T18:01:55.805973Z",
                        "resourceType": "User"
                    },
                    "name": {
                        "givenName": "Alex",
                        "familyName": "Parker"
                    },
                    "id": "65f09c38-23e0-4132-867f-451699e18022",
                    "userName": "alex",
                    "urn:scim:wso2:schema": {
                        "emailAddresses": [
                            "alex@wso2.com"
                        ]
                    }
                }
            ]
        }
        ```

5. You can also try out updating the **Device Names** attribute values using the following SCIM command and check if the values are updated by accessing the user profile on the console. 

    !!! abstract ""
        **SCIM Patch Request**
        ```
        curl --location --request PATCH 'https://localhost:9443/scim2/Users/65f09c38-23e0-4132-867f-451699e18022' \
        --header 'Authorization: Basic YWRtaW46YWRtaW4=' \
        --header 'Content-Type: application/json' \
        --data '{
            "schemas": [
                "urn:ietf:params:scim:api:messages:2.0:PatchOp"
            ],
            "Operations": [
                {
                    "op": "replace",
                    "value": {
                        "urn:scim:schemas:extension:custom:User": {
                            "deviceNames": [
                                "new_device1",
                                "new_device2"
                            ]
                        }
                    }
                }
            ]
        }'
        ```


## How to add claims to support Complex attributes

Let's see if we have a **manager** complex attribute that has **address** simple attribute and **roles** multi-valued attribute as the sub attributes.

### Create claim mappings for Manager-Address claim

1. Navigate to **User Attributes & Stores** > **Attributes** in console.
2. Click **Attributes** under **Manage Attributes**.
3. Click **New Attribute** and enter the following values.
    - **Attribute Name**: `http://wso2.org/claims/manager.address`
    - **Attribute Display Name**: `Manager Address`
4. Go to the **Edit Attribute** of the custom attribute you just created.
5. Select necessary options in **Attribute Configurations** to make the field visible in user profiles and click **Update**.

!!! Note
    SCIM 2.0 protocol mapping in Custom schema, will be created automatically with the Custom local claim creation as mentioned in the **Protocol Mapping** section in the wizard.

### Create claim mappings for Manager-Roles claim

1. Navigate to **User Attributes & Stores** > **Attributes** in console.
2. Click **Attributes** under **Manage Attributes**.
3. Click **New Attribute** and enter the following values.
    - **Attribute Name**: `http://wso2.org/claims/manager.roles`
    - **Attribute Display Name**: `Manager Roles`
4. Click Finish.
5. Go to the **Edit Attribute** of the custom attribute you just created.
6. Select necessary options in **Attribute Configurations** to make the field visible in user profiles and click **Update**.
7. Navigate to **Additional Properties** tab and enter following property and click **Update**.
    - `multiValued`: `true`

!!! Note
    SCIM 2.0 protocol mapping in Custom schema, will be created automatically with the Custom local claim creation as mentioned in the **Protocol Mapping** section in the wizard.

### Create claim mappings for the Manager claim

1. Navigate to **User Attributes & Stores** > **Attributes** in console.
2. Click **Attributes** under **Manage Attributes**.
3. Click **New Attribute** and enter the following values.
    - **Attribute Name**: `http://wso2.org/claims/manager`
    - **Attribute Display Name**: `Manager`
4. Click Finish.
5. Go to the **Edit Attribute** of the custom attribute you just created.
6. Navigate to **Additional Properties** tab and enter following property and click **Update**.
    - `dataType`: `complex`
    - `subAttributes`: `http://wso2.org/claims/manager.address http://wso2.org/claims/manager.roles`
    
    !!! Note
        The values for `subAttributes` must be **space-separated**.
    
    ![additional-properties-complex-attribute]({{base_path}}/assets/img/references/extend/user-mgt/provisioning/additional-properties-complex-attribute.png)

!!! Note
    SCIM 2.0 protocol mapping in Custom schema, will be created automatically with the Custom local claim creation as mentioned in the **Protocol Mapping** section in the wizard.


### Try it out

1. Create a user from **User Management** > **Users** in console.
2. Go to the **User Profile** of the user you just created.
3. Add values for the **Manager Address** field, **Manager Roles** field and click **Update**.
   ![complex-attribute-fields]({{base_path}}/assets/img/references/extend/user-mgt/provisioning/complex-attribute-fields.png)
4. Retrieve the user using SCIM and ensure that the custom claim value is present.

    !!! abstract ""
        **SCIM Request**
        ```bash
        curl -v -k --user admin:admin https://localhost:9443/scim2/Users
        ```
        ---
        **SCIM Response**
        ```
        {
            "totalResults": 1,
            "startIndex": 1,
            "itemsPerPage": 1,
            "schemas": [
                "urn:ietf:params:scim:api:messages:2.0:ListResponse"
            ],
            "Resources": [
                {
                    "emails": [
                        "alex@wso2.com"
                    ],
                    "urn:scim:schemas:extension:custom:User": {
                        "manager": {
                            "address": "105, Bauddhaloka Mawatha, Colombo 04",
                            "roles": [
                                "Auditor",
                                "Application Editor"
                            ]
                        }
                    },
                    "meta": {
                        "created": "2025-04-15T13:15:59.362739Z",
                        "location": "https://localhost:9443/scim2/Users/65f09c38-23e0-4132-867f-451699e18022",
                        "lastModified": "2025-04-15T18:58:23.825351Z",
                        "resourceType": "User"
                    },
                    "name": {
                        "givenName": "Alex",
                        "familyName": "Parker"
                    },
                    "id": "65f09c38-23e0-4132-867f-451699e18022",
                    "userName": "alex",
                    "urn:scim:wso2:schema": {
                        "emailAddresses": [
                            "alex@wso2.com"
                        ]
                    }
                }
            ]
        }
        ```

5. You can also try out updating the **Manager Address** and **Manager Roles** claim values using the following SCIM command and check if the values are updated by accessing the user profile on the console. 

    !!! abstract ""
        **SCIM Patch Request**
        ```
        curl --location --request PATCH 'https://localhost:9443/scim2/Users/65f09c38-23e0-4132-867f-451699e18022' \
        --header 'Authorization: Basic YWRtaW46YWRtaW4=' \
        --header 'Content-Type: application/json' \
        --data '{
            "schemas": [
                "urn:ietf:params:scim:api:messages:2.0:PatchOp"
            ],
            "Operations": [
                {
                    "op": "replace",
                    "value": {
                        "urn:scim:schemas:extension:custom:User": {
                            "manager": {
                                "address": "WSO2, 105, Bauddhaloka Mawatha, Colombo 04",
                                "roles": [
                                    "Connection Editor",
                                    "Application Viewer"
                                ]
                            }
                        }
                    }
                }
            ]
        }'
        ```
{% endif %}
