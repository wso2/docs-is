# SCIM2 Bulk Operations

Follow the topics given below to understand how **Bulk** operations can be used when you manage resources in the [SCIM2 API](scim2-rest-apis.md).

The SCIM2 API allows you to send multiple resource operations in a single request. That is, you can add new records (POST data), replace an existing record (PUT data), update elements of an existing record (PATCH data), and delete records (DELETE data) in bulk. These bulk operations are supported for managing users and groups with the SCIM API in WSO2 Identity Server.

You need to specify the following information in the request payload.

<table>
    <tr>
        <th>Parameter</th>
        <th>Possible Values</th>
        <th>Required/Optional</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>schemas</code></td>
        <td>urn:ietf:params:scim:api:messages:2.0:BulkRequest</td>
        <td>Required</td>
        <td>This is the schema that is required for sending bulk requests.</td>
    </tr>
    <tr>
        <td><code>operations</code></td>
        <td>Array of POST operations</td>
        <td>Required</td>
        <td>Specify the array of POST, PUT, PATCH, and/or DELETE operations that should be used to update the information. You can include any number of operations in one bulk request.</br></br>
        See the instructions given below to define the required operations.</td>
    </tr>
</table>

## Manage users in bulk

### Add users

Given below is an example request payload to manage users in bulk. This request includes an array of operations that adds multiple new users.

```json
{
    "failOnErrors":1,
    "schemas": ["urn:ietf:params:scim:api:messages:2.0:BulkRequest"],
    "Operations": [
        {
            "method": "POST",
            "path": "/Users",
            "bulkId": "qwerty",
            "data": {
                "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
                "userName": "Kim",
                "password":"kim123",
                "name": {
                    "givenName": "Kim",
                    "familyName": "Berry"
                }
            }
        },
        {
            "method": "POST",
            "path": "/Users",
            "bulkId": "ytrewq",
            "data": {
                "schemas": [
                    "urn:ietf:params:scim:schemas:core:2.0:User",
                    "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
                    ],
                "name": {
                    "givenName": "Smith",
                    "familyName": "Berry"
                },
                "userName": "smith",
                "password": "smith123",
                "emails": [
                    {
                        "type": "home",
                        "value": "smith@gmail.com",
                        "primary": true
                    },
                    {
                        "type": "work",
                        "value": "smith@wso2.com"
                    }
                ],
                "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
                    "employeeNumber": "1234A",
                    "manager": {
                        "value": "Taylor"
                    }
                }
            }
        }
    ]
}
```

The parameters in the request body are explained below.

### Update users

Given below is an example request payload to update users in bulk. This request includes an array of operations that updates multiple details of multiple users.

```json
{ 
    "failOnErrors": 1, 
    "schemas": [ "urn:ietf:params:scim:api:messages:2.0:BulkRequest" ], 
    "Operations": [
        { 
            "method": "PATCH", 
            "path": "/Users/e67906fb-308f-4b15-89bd-0ab6e3d996e5", 
            "data": { 
                "Operations": [
                    { 
                        "op": "replace", 
                        "path": "name", 
                        "value": 
                        { 
                            "givenName": "john", 
                            "familyName": "Anderson" 
                        }
                    },
                    {
                        "op": "add", 
                        "path": "nickName", 
                        "value": "shaggy"  
                    }
                ] 
            } 
        },
        { 
            "method": "PATCH", 
            "path": "/Users/b1781d25-bde5-460a-a58a-8fe8dbfd8487", 
            "data": { 
                "Operations": [{ 
                    "op": "remove", 
                    "path": "emails[type eq home]"
                }] 
            } 
        }
    ] 
}
```

The parameters in the request body are explained below.

### Replace users

Given below is an example request payload to replace existing users in bulk. This request includes an array of operations that replace multiple users.

```json
{
    "failOnErrors":1,
    "schemas":["urn:ietf:params:scim:api:messages:2.0:BulkRequest"],
    "Operations":[
        {
            "method": "PUT",
            "path": "/Users/e67906fb-308f-4b15-89bd-0ab6e3d996e5",
            "bulkId": "qwerty",
            "data":{
                "schemas":["urn:ietf:params:scim:schemas:core:2.0:User"],
                "userName": "Kim",
                "name": {
                    "givenName": "John",
                    "familyName": "Berry"
                },
                "emails": [
                    {
                        "type": "home",
                        "value": "john@gmail.com"
                    }
                ]
            }
        },
        {
            "method": "PUT",
            "path": "/Users/b1781d25-bde5-460a-a58a-8fe8dbfd8487",
            "bulkId":"ytrewq",
            "data":{
                "schemas":[
                "urn:ietf:params:scim:schemas:core:2.0:User",
                "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
                ],
                "userName":"smith",
                "name": {
                    "givenName": "Smith",
                    "familyName": "Berry"
                },
                "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{
                    "employeeNumber": "12345"
                }
            }
        }
    ]
}
```

The parameters in the request body are explained below.

### Delete users

Given below is an example request payload to delete existing users in bulk. This request includes an array of operations that delete multiple users.

```json
{
    "failOnErrors":1,
    "schemas":["urn:ietf:params:scim:api:messages:2.0:BulkRequest"],
    "Operations":[
        {
            "method": "DELETE",
            "path": "/Users/e67906fb-308f-4b15-89bd-0ab6e3d996e5"  
        },
        {
            "method": "DELETE",
            "path": "/Users/b1781d25-bde5-460a-a58a-8fe8dbfd8487"
        }
    ]
}
```

The parameters in the request body are explained below.

## Manage user groups in bulk

### Add user groups

Given below is an example request payload to add user groups in bulk. This request includes an array of operations that adds multiple new user groups.

```json
{
    "schemas": ["urn:ietf:params:scim:api:messages:2.0:BulkRequest"],
    "Operations": [
       {
            "method": "POST",
            "path": "/Groups",
            "bulkId": "ytrewq",
            "data": {
                "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
                "displayName": "TourGuides",
                "members": [
                    {
                    "type": "User",
                    "value": "3633c988-69bf-48fc-978a-83dfde12695f"
                    }
                ]
            }
        },
               {
            "method": "POST",
            "path": "/Groups",
            "bulkId": "ytrewq",
            "data": {
                "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
                "displayName": "SLTourGuides",
                "members": [
                    {
                    "type": "User",
                    "value": "3633c988-69bf-48fc-978a-83dfde12695f"
                    },
                     {
                    "type": "User",
                    "value": "40390b19-54c9-4e77-b223-fe31d55e59e0"
                    }
                ]
            }
        }
     ]
}
```

The parameters in the request body are explained below.

### Update groups

Given below is an example request payload to update user groups in bulk. This request includes an array of operations that updates multiple details in multiple user groups.

```json
{ 
    "schemas": [ "urn:ietf:params:scim:api:messages:2.0:BulkRequest" ], 
    "Operations": [
 {
           "method": "PATCH",
           "path": "/Groups/46887262-2ba1-4cee-b3ef-64549423e0b0",
           "data": {
               "Operations": [
                   {
                       "op": "replace",
                       "path": "members",
                       "value": [
                           {
                           "display": "smith",
                           "value": "ba1db5ff-8062-415b-bc78-5f79738d00ea"
                           }
                       ]
                   }
               ]
           }
       },
        {
           "method": "PATCH",
           "path": "/Groups/18d04a36-0894-4f71-bdc4-2610fcc6ae42",
           "data": {
               "Operations": [
                   {
                       "op": "add",
                       "path": "members",
                       "value": [
                           {
                           "display": "smith",
                           "value": "ba1db5ff-8062-415b-bc78-5f79738d00ea"
                           }
                       ]
                   },
                   {
                        "op":"remove",
                        "path":"members[value eq \"3633c988-69bf-48fc-978a-83dfde12695f\"]"
                    }
               ]
           }
       }
    ] 
}
```

The parameters in the request body are explained below.

### Replace groups

Given below is an example request payload to replace existing user groups in bulk. This request includes an array of operations that replace multiple user groups.

```json
{
    "failOnErrors":1,
    "schemas":["urn:ietf:params:scim:api:messages:2.0:BulkRequest"],
    "Operations":[
        {
            "method": "PUT",
            "path": "/Groups/46887262-2ba1-4cee-b3ef-64549423e0b0",
            "data":{
                "displayName": "TourGuides",
                "members": [
                    {
                    "display": "Alice",
                    "value": "3633c988-69bf-48fc-978a-83dfde12695f"
                    }
                ]
            }
        },
        {
            "method": "PUT",
            "path": "/Groups/18d04a36-0894-4f71-bdc4-2610fcc6ae42",
            "data":{
                "displayName": "SLTourGuides",
                "members": [
                    {
                    "display": "Alice",
                    "value": "3633c988-69bf-48fc-978a-83dfde12695f"
                    }
            ] 
            }
        }
    ]
}
```

The parameters in the request body are explained below.

### Delete users

Given below is an example request payload to delete existing user groups in bulk. This request includes an array of operations that delete multiple user groups.

```json
{
    "schemas":["urn:ietf:params:scim:api:messages:2.0:BulkRequest"],
    "Operations":[
        {
            "method": "DELETE",
            "path": "/Groups/46887262-2ba1-4cee-b3ef-64549423e0b0"  
        },
        {
            "method": "DELETE",
            "path": "/Groups/18d04a36-0894-4f71-bdc4-2610fcc6ae42"
        }
    ]
}
```

The parameters in the request body are explained below.
