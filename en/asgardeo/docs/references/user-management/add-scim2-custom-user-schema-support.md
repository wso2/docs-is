# SCIM2 Custom User Schema Support

WSO2 Identity Server allows adding custom attributes into user objects through Custom schema.

!!! Note
    **Reasons why we introduced custom schema to add custom attributes:**

    - According to the current model, Enterprise User Extension attributes are in a file, and those configurations apply at the server level.
    - Enterprise User Extension is a defined schema and should not be modified.

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
7. Check the **Allow multiple values for this attribute**.
    
    ![additional-properties-multi-valued-attribute]({{base_path}}/assets/img/references/additional-properties-multi-valued-attribute.png)

### Map the custom claim

!!! Note
    SCIM 2.0 protocol mapping in Custom schema, will be created automatically with the Custom local claim creation as mentioned in the **Protocol Mapping** section in the wizard.

If it is not added, refer <a href="#map-the-custom-claim">Map the custom claim</a> to add it manually.

### Try it out

1. Create a user from **User Management** > **Users** in console.
2. Go to the **User Profile** of the user you just created.
3. Add values for the **Device Names** field and click **Update**.
   ![multi-valued-attribute-field]({{base_path}}/assets/img/references/extend/user-mgt/provisioning/multi-valued-attribute-field.png)
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
