# Adding SCIM2 Custom User Schema Support

WSO2 Identity Server allows adding custom attributes into user objects through [Enterprise User Extension](({{base_path}}/references/extend/provisioning/extend-scim2-user-schemas). From 6.0.0 onwards, you can use this custom schema to add custom attributes of the user.

!!! Note
    **Reasons why we introduced custom schema to add custom attributes:**
    1. According to the current model, Enterprise User Extension attributes are in a file, and those configurations are applicable at the server level.
    2. Enterprise User Extension is a defined schema, and it should not be allowed to be modified.

!!! Note
    SCIM2 Custom User Schema Support is added by default in WSO2 Identity Server
    version 6.0.0 onwards.

## Add custom schema dialect

1. Log in to the Management Console with your admin account.
2. Add the custom schema dialect if it is not found
    - Click **Add** under **Main** > **Identity** > **Claims**.
    - Click **Add Claim Dialect**.
    - Add the **urn:scim:custom:schema** claim dialect.

    ![add-scim-custom-schema-dialect]({{base_path}}/assets/img/deploy/add-custom-schema-dialect.png)

    - Click **Add**.

## How to add claims to support simple attributes

### Add custom local claim

1. Click **Add** under **Main** > **Identity** > **Claims**.
2. Click **Add Local Claim** and enter the following values.
    - **Claim URI**: http://wso2.org/claims/customclaim
    - **Display Name**: Custom Claim
    - **Description**: Custom Claim
    - **Mapped Attribute(s**):
        - **User Store Domain Name**: PRIMARY
        - **Mapped Attribute**: customClaim
    - **Supported By Default**: True

    ![add-scim-local-custom-claim]({{base_path}}/assets/img/deploy/add-custom-local-claim.png)

    If you want to add any additional properties for the scim attribute, you can add them using **Additional Properties** in the claim configuration.

    The following additional properties can be added to the custom schema via **Additional Properties** element.

    - `dataType`
    - `multiValued`
    - `required`
    - `caseExact`
    - `mutability`
    - `returned`
    - `uniqueness`
    - `subAttributes`
    - `referenceTypes`

    E.g., `dataType: boolean`

!!! note

    - You can use the word `customClaim` or any other preferred word as the **Mapped Attribute** when using a JDBC user store because JDBC user stores will automatically create a new attribute if it does not already exist in the user store. However, if you are using LDAP or Active Directory, you will have to use an attribute that exists in the user store already.

    - The configuration above is valid when using the PRIMARY user store. If you have a secondary user store configured, make sure to add another attribute mapping by clicking **Add Attribute Mapping** and selecting the secondary user store.

### Map the custom claim

1. Click **Add** under **Main** > **Identity** > **Claims**.

2. Click **Add External Claim** and enter the following values.
    - **Dialect URI**: urn:scim:custom:schema
    - **External Claim URI**: urn:scim:custom:schema:customClaim
    - **Mapped Local Claim**:http://wso2.org/claims/customclaim

    ![add-scim-external-claim]({{base_path}}/assets/img/deploy/map-remote-claim.png)

3. Click **Add**.

### Try it out

1. Click **Add** under **Main** > **Identity** > **Users and Roles**.

2. Click **Add New User** and give the user a username and password.

3. Click **List** under **Users and Roles** and then go to the **User Profile** of the user you just created.

4. Add a value for the **Custom Claim** field and click **Save**.

5. Retrieve the user using SCIM and ensure that the custom claim value is present.

  ```bash tab="SCIM Request"
        curl -v -k --user admin:admin https://localhost:9443/scim2/Users
  ```

 ``` bash tab="SCIM Response"
    {
        "totalResults": 2,
        "startIndex": 1,
        "itemsPerPage": 2,
        "schemas": [
            "urn:ietf:params:scim:api:messages:2.0:ListResponse"
        ],
        "Resources": [
            {
                "emails": [
                    "user1@gmail.com"
                ],
                "urn:scim:custom:schema": {
                    "customClaim": "custom"
                },
                "meta": {
                    "created": "2021-05-13T13:45:29.026Z",
                    "location": "https://localhost:9443/scim2/Users/f92dff10-8142-415c-aac7-30bd3d250431",
                    "lastModified": "2021-05-21T05:58:08.044Z",
                    "resourceType": "User"
                },
                "roles": [
                    {
                        "display": "everyone",
                        "value": "1457e626-df8a-4421-a16e-a191d8e310d3",
                        "$ref": "https://localhost:9443/scim2/Roles/1457e626-df8a-4421-a16e-a191d8e310d3"
                    }
                ],
                "name": {
                    "givenName": "kim",
                    "familyName": "jackson"
                },
                "id": "f92dff10-8142-415c-aac7-30bd3d250431",
                "userName": "user1",
                "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
                    "accountLocked": false,
                    "country": "France",
                    "failedLoginLockoutCount": 0,
                    "unlockTime": "0",
                    "failedLoginAttemptsBeforeSuccess": 1,
                    "failedLoginAttempts": 0
                }
            },
            {
                "emails": [
                    "admin@wso2.com"
                ],
                "meta": {
                    "location": "https://localhost:9443/scim2/Users/fc4ffb25-ad0a-4d43-bf4a-d914f4ced339",
                    "lastModified": "2021-04-28T13:47:05.314Z",
                    "resourceType": "User"
                },
                "roles": [
                    {
                        "display": "admin",
                        "value": "88fd66e8-ae44-4bee-91f8-2d49f9ce7aba",
                        "$ref": "https://localhost:9443/scim2/Roles/88fd66e8-ae44-4bee-91f8-2d49f9ce7aba"
                    },
                    {
                        "display": "everyone",
                        "value": "1457e626-df8a-4421-a16e-a191d8e310d3",
                        "$ref": "https://localhost:9443/scim2/Roles/1457e626-df8a-4421-a16e-a191d8e310d3"
                    }
                ],
                "name": {
                    "givenName": "admin",
                    "familyName": "admin"
                },
                "id": "fc4ffb25-ad0a-4d43-bf4a-d914f4ced339",
                "userName": "admin"
            }
        ]
    }
 ```

You can also try out updating the Custom Claim value using the following SCIM command and checking if the value is updated by accessing the user profile on the management console. 

```curl
    curl --location --request PATCH 'https://localhost:9443/scim2/Users/f92dff10-8142-415c-aac7-30bd3d250431' \
    --header 'Authorization: Basic YWRtaW46YWRtaW4=' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "schemas": [
            "urn:ietf:params:scim:api:messages:2.0:PatchOp"
        ],
        "Operations": [
            {
                "op": "replace",
                "value": {
                    "urn:scim:custom:schema": {
                        "customClaim": "new value"
                    }
                }
            }
        ]
    }'
```

## How to add claims to support complex attributes.

Let's see if we have a **manager** complex attribute that has **displayName** and **emailAddress** as the subattributes.


### Create claim mappings for Manager-Display claim

**Add local claim for displayname attribute**

1. Click **Add** under **Claims**.
2. Click **Add Local Claim** and enter the following values. 
    - **Claim URI**: http://wso2.org/claims/manager.displayname
    - **Display Name**: Manager displayname
    - **Description**: Manager displayname
    - **Mapped Attribute(s**):
        - **User Store Domain Name**: PRIMARY
        - **Mapped Attribute**: manager.displayname
    - **Supported By Default**: True

    ![add-scim-local-custom-claim]({{base_path}}/assets/img/deploy/add-manager-displayname-local-claim.png)

    If you want to add any additional properties for the scim attribute, you can add them using **Additional Properties** in the claim configuration.
 
**Map to remote claim**

1. Click **Add** under **Main** > **Identity** > **Claims**.

2. Click **Add External Claim** and enter the following values.
    - **Dialect URI**: urn:scim:custom:schema
    - **External Claim URI**: urn:scim:custom:schema:manager.displayName
    - **Mapped Local Claim**:http://wso2.org/claims/manager.displayName

    ![add-scim-external-claim]({{base_path}}/assets/img/deploy/add-manager-displayname-remote-claim.png)

3. Click **Add**.

### Create claim mappings for Manager-Email address claim

**Add local claim for emailaddress attribute**

1. Click **Add** under **Main** > **Identity** > **Claims**.
2. Click **Add Local Claim** and enter the following values. 
    - **Claim URI**: http://wso2.org/claims/manager.emailaddress
    - **Display Name**: Manager Emailaddress
    - **Description**: Manager Emailaddress
    - **Mapped Attribute(s**):
        - **User Store Domain Name**: PRIMARY
        - **Mapped Attribute**: manager.emailaddress
    - **Supported By Default**: True

    ![add-scim-local-custom-claim]({{base_path}}/assets/img/deploy/add-manager-emailaddress-localclaim.png)
    
    If you want to add any additional properties for the scim attribute, you can add them using **Additional Properties** 
    in the claim configuration.
 
**Map to remote claim**

1. Click **Add** under **Main** > **Identity** > **Claims**.

2. Click **Add External Claim** and enter the following values.
    - **Dialect URI**: urn:scim:custom:schema
    - **External Claim URI**: urn:scim:custom:schema:manager.emailaddress
    - **Mapped Local Claim**:http://wso2.org/claims/manager.emailaddress

    ![add-scim-external-claim]({{base_path}}/assets/img/deploy/add-manager-email-remote-claim.png)

3. Click **Add**.


### Create claim mappings for the Manager claim

**Add local claim for manager attribute**

1. Click **Add** under **Claims**.
2. Click **Add Local Claim** and enter the following values. 
    - **Claim URI**: http://wso2.org/claims/manager
    - **Display Name**: Manager
    - **Description**: Manager
    - **Mapped Attribute(s**):
        - **User Store Domain Name**: PRIMARY
        - **Mapped Attribute**: manager
    - **Supported By Default**: false
    - **Additional properties**:
        - dataType : complex
        - subattributes: http://wso2.org/claims/manager.emailaddress http://wso2.org/claims/manager.displayName

    ![add-scim-local-custom-claim]({{base_path}}/assets/img/deploy/add-manager-local-claim.png)
 
**Map to remote claim**

1. Click **Add** under **Main** > **Identity** > **Claims**.

2. Click **Add External Claim** and enter the following values.
    - **Dialect URI**: urn:scim:custom:schema
    - **External Claim URI**: urn:scim:custom:schema:manager
    - **Mapped Local Claim**:http://wso2.org/claims/manager

    ![add-scim-external-claim]({{base_path}}/assets/img/deploy/add-manager-remote-claim.png)

3. Click **Add**.


### Try it out

1. Click **Add** under **Main** > **Identity** > **Users and Roles**.

2. Click **List** under **Users and Roles** and then go to the **User Profile** of the user you created earlier. 

3. Add a value for the **Manager Emailaddress** field and click **Save**. 

4. Add a value for the **Manager Emailaddress** field and click **Save**. 

5. Retrieve the user using SCIM and ensure that the manager claim is present. 


 ```bash tab="SCIM Request"
    curl -v -k --user admin:admin https://localhost:9443/scim2/Users/f92dff10-8142-415c-aac7-30bd3d250431
 ```

The response will be as follows:

``` bash tab="SCIM Response"
    {
        "emails": [
            "user1@gmail.com"
        ],
        "urn:scim:custom:schema": {
            "manager": {
                "displayName": "manager_displayname",
                "emailaddress": "manager_email@wso2.com"
            },
            "customClaim": "new value"
        },
        "meta": {
            "created": "2021-05-13T13:45:29.026Z",
            "location": "https://localhost:9443/scim2/Users/f92dff10-8142-415c-aac7-30bd3d250431",
            "lastModified": "2021-05-21T07:05:08.286Z",
            "resourceType": "User"
        },
        "schemas": [
            "urn:ietf:params:scim:schemas:core:2.0:User",
            "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User",
            "urn:scim:custom:schema"
        ],
        "roles": [
            {
                "display": "everyone",
                "value": "1457e626-df8a-4421-a16e-a191d8e310d3",
                "$ref": "https://localhost:9443/scim2/Roles/1457e626-df8a-4421-a16e-a191d8e310d3"
            }
        ],
        "name": {
            "givenName": "kim",
            "familyName": "jackson"
        },
        "id": "f92dff10-8142-415c-aac7-30bd3d250431",
        "userName": "user1",
        "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
            "accountLocked": false,
            "country": "France",
            "failedLoginLockoutCount": 0,
            "unlockTime": "0",
            "failedLoginAttemptsBeforeSuccess": 1,
            "failedLoginAttempts": 0
        }
    }
```

You can also try out updating the `manager.displayName` and `manager.emailaddress` claim values using the following SCIM command and check if the value is updated by accessing the user profile on the management console.

```curl
    curl --location --request PATCH 'https://localhost:9443/scim2/Users/f92dff10-8142-415c-aac7-30bd3d250431' \
    --header 'Authorization: Basic YWRtaW46YWRtaW4=' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "schemas": [
            "urn:ietf:params:scim:api:messages:2.0:PatchOp"
        ],
        "Operations": [
            {
                "op": "replace",
                "value": {
                    "urn:scim:custom:schema": {
                        "manager":{
                             "displayName": "new_manager_displayname",
                             "emailaddress": "new_manager_email@wso2.com"
                        }
                    }
                }
            }
        ]
    }'
```

## How to add claims to support multivalued simple attributes

Let's see when we have a **deviceNames** simple multivalued attribute.

### Create claim mappings

Let's see if we have a **deviceNames** simple multivalued attribute.

**Add local claim for deviceNames**

1. Click **Add** under **Claims**.
2. Click **Add Local Claim** and enter the following values.
    - **Claim URI**: http://wso2.org/claims/deviceNames
    - **Display Name**: DeviceNames
    - **Description**: DeviceNames
    - **Mapped Attribute(s**):
        - **User Store Domain Name**: PRIMARY
        - **Mapped Attribute**: deviceNames
    - **Supported By Default**: true
    - **Additional properties**:
        - multivalued : true

    ![add-scim-local-custom-claim]({{base_path}}/assets/img/deploy/add-local-claim-device-names.png)
 
**Map to remote claim**

1. Click **Add** under **Main** > **Identity** > **Claims**.

2. Click **Add External Claim** and enter the following values.
    - **Dialect URI**: urn:scim:custom:schema
    - **External Claim URI**: urn:scim:custom:schema:deviceNames
    - **Mapped Local Claim**:http://wso2.org/claims/deviceNames

    ![add-scim-external-claim]({{base_path}}/assets/img/deploy/add-remote-claim-device-names.png)

3. Click **Add**.

### Try it out

1. Click **List** under **Main** > **Identity** > **Users and Roles** and then go to the **User Profile** of the user you created earlier. 

2. Add a value (Eg: device1,device2,device3) for the **Device Names** field and click **Save**. 

3. Retrieve the user using SCIM and ensure that the `deviceNames` claim is present. 


 ```bash tab="SCIM Request"
    curl -v -k --user admin:admin https://localhost:9443/scim2/Users/f92dff10-8142-415c-aac7-30bd3d250431
 ```

The response will be as follows:

``` bash tab="SCIM Response"
    {    
        {
            "emails": [
                "user1@gmail.com"
            ],
            "urn:scim:custom:schema": {
                "deviceNames": [
                    "device1",
                    "device2",
                    "device3"
                ],
                "manager": {
                    "displayName": "new_manager_displayname",
                    "emailaddress": "new_manager_email@wso2.com"
                },
                "customClaim": "new value"
            },
            "meta": {
                "created": "2021-05-13T13:45:29.026Z",
                "location": "https://localhost:9443/scim2/Users/f92dff10-8142-415c-aac7-30bd3d250431",
                "lastModified": "2021-05-21T08:10:12.639Z",
                "resourceType": "User"
            },
            "schemas": [
                "urn:ietf:params:scim:schemas:core:2.0:User",
                "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User",
                "urn:scim:custom:schema"
            ],
            "roles": [
                {
                    "display": "everyone",
                    "value": "1457e626-df8a-4421-a16e-a191d8e310d3",
                    "$ref": "https://localhost:9443/scim2/Roles/1457e626-df8a-4421-a16e-a191d8e310d3"
                }
            ],
            "name": {
                "givenName": "kim",
                "familyName": "jackson"
            },
            "id": "f92dff10-8142-415c-aac7-30bd3d250431",
            "userName": "user1",
            "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
                "accountLocked": false,
                "country": "France",
                "failedLoginLockoutCount": 0,
                "unlockTime": "0",
                "failedLoginAttemptsBeforeSuccess": 1,
                "failedLoginAttempts": 0
            }
        }
```
You can also try out updating the deviceNames claim values using the following SCIM command and checking if the value is updated by accessing the user profile on the management console. 

```curl
    curl --location --request PATCH 'https://localhost:9443/scim2/Users/f92dff10-8142-415c-aac7-30bd3d250431' \
    --header 'Authorization: Basic YWRtaW46YWRtaW4=' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "schemas": [
            "urn:ietf:params:scim:api:messages:2.0:PatchOp"
        ],
        "Operations": [
            {
                "op": "replace",
                "value": {
                    "urn:scim:custom:schema": {
                        "deviceNames":["new_device1", "new_device2"]
                    }
                }
            }
        ]
    }'
```

!!! note

    - If you want to disable this schema, you can add the configuration give below in the
    `<IS_HOME>/repository/conf/identity/charon-config.xml` file.
        
        ```
            <Property name="custom-user-schema-enabled">false</Property>
        ```
    
    - If you want to change the name of the schema, you can add the configuration given below to the
    `<IS_HOME>/repository/conf/identity/charon-config.xml` file.
         
         ```
            <Property name="custom-user-schema-uri">urn:scim:custom:schema:new</Property>
         ```