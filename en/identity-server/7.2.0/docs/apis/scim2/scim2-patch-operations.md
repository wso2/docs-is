# SCIM2 Patch Operations

Follow the topics given below to understand how **Patch** operations can be used when you invoke the SCIM2 [User PATCH operation]({{base_path}}/apis/scim2-users-rest-apis/#tag/Users-Endpoint/operation/patchUser), [Group PATCH operation]({{base_path}}/apis/scim2-groups-rest-apis/#tag/Groups-Endpoint/operation/patchGroup), [Role PATCH operation]({{base_path}}/apis/roles-v2-rest-api/#tag/Roles-Endpoint/operation/patchRole) and [Me PATCH operation]({{base_path}}/apis/scim2-me-rest-apis/#tag/Me-Endpoint/operation/patchUserMe).

## Introduction

WSO2 Identity Server supports **SCIM Patch**, which can be used to update one or more attributes of a SCIM resource. 

When you create your request payload to update attributes in a SCIM resource, you need to first determine the following two factors: 

-   Type of attribute that should be updated
-   Type of update operation that should be used

### Types of attributes

<table>
    <tr>
        <th>Singular attribute</th>
        <td>A resource attribute that contains a single value. For example, the <code>displayName</code> attribute can only have one unique value.
        </td>
    </tr>
    <tr>
        <th>Multi-valued attribute</th>
        <td>A resource attribute that contains multiple values. For example, the <code>emails</code> attribute may have multiple email addresses as values.
        </td>
    </tr>
    <tr>
        <th>Complex attribute</th>
        <td>A singular or multi-valued attribute, which has a value that is a composition of one or more simple attributes. For example, the <code>addresses</code> attribute has the sub-attributes <code>streetAddress</code>, <code>locality</code>, <code>postalCode</code>, and <code>country</code>.
        </td>
    </tr>
    <tr>
        <th>Simple attribute</th>
        <td>A singular or multi-valued attribute, which has a value that is a primitive. A simple attribute must not contain sub-attributes.
        </td>
    </tr>
</table>

### Types of update operations

<table>
    <tr>
        <th>add</th>
        <td>Add a new value for the attribute.</td>
    </tr>
    <tr>
        <th>replace</th>
        <td>Replace the existing value of an attribute.</td>
    </tr>
    <tr>
        <th>remove</th>
        <td>Delete the existing value of an attribute.</td>
    </tr>
</table>

### Patch request payload

The structure of a patch request payload is as follows:

```json
{
    "schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    "Operations":[
        {
        "op": "add|replace|remove",
        "path": "attribute_path|value_path|sub_attribute_path"
        "value": {},
        },
        ...
    ]
}
```

The main parameters in the above payload are explained below.

<table>
    <tr>
        <th>Parameter</th>
        <th>Required/Optional</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>schemas</code></td>
        <td>Required</td>
        <td>Specify the following schema when sending patch requests:</br>
            <code>urn:ietf:params:scim:api:messages:2.0:PatchOp</code>.
        </td>
    </tr>
    <tr>
        <td><code>operations</code></td>
        <td>Required</td>
        <td>Specify the array of <code>add</code>, <code>remove</code>, <code>replace</code> operations that should be used to update the information. You can include any number of operations in one request.</td>
    </tr>
</table>

The parameters per operation in the above payload are explained below.

<table>
    <tr>
        <th>Parameter</th>
        <th>Required/Optional</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>op</code></td>
        <td>Required</td>
        <td>The method that should be used in the operation.</br>
        <b>Possible values:</b>
            <ul>
                <li><code>add</code></li>
                <li><code>remove</code></li>
                <li><code>replace</code></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><code>path</code></td>
        <td>Required if <code>op</code> is <code>remove</code>.</br>
        Optional if <code>op</code> is <code>add</code> or <code>replace</code>.
        </td>
        <td>Add the path to specify the attribute/sub-attribute that should be updated.</br> 
        Since <code>path</code> is an optional parameter for <code>add</code> and <code>replace</code> operations, there are two ways to define the operation in a payload: with or without the <code>path</code> parameter.
        </td>
    </tr>
    <tr>
        <td><code>value</code></td>
        <td>Required if <code>op</code> is <code>add</code> or <code>replace</code>.</td>
        <td>The value that should be updated.</td>
    </tr>
</table>

## Patch users

You can use the patch operations to add/remove/replace attributes of users in a specific SCIM2 schema. Consider the following SCIM2 schemas that you will update:

-  User Core schema
-  Enterprise schema
-  Custom schemas

!!! Note
    If you are adding or replacing user attributes from a user in the **Core** user schema, it is not necessary to specify the schema in the request payload. See the examples given below.

### Add user attributes

Let's create patch request payloads to `add` user attributes of different types.

**Simple singular attributes**

Consider the `nickname` attribute in the **Core** user schema and the `country` attribute in the **Enterprise** user schema (`urn:ietf:params:scim:schemas:extension:enterprise:2.0:User`). These are simple singular attributes.

-   **Example 1:** Add the `nickName` attribute in the **Core** user schema (without using the path param):

    ```json
    {
        "op": "add",
        "value": {
            "nickName": "shaggy"
        }
    }
    ```

-   **Example 2:** Add the `nickName` attribute in the **Core** user schema (using the path param):

    ```json
    {
        "op": "add",
        "path": "nickName",
        "value": "Tomy"
    }
    ```

-   **Example 3:** Add the `country` attribute in the **Enterprise** user schema (without using the path param):

    ```json
    {
        "op": "add",
        "value": {
            "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
                "country": "Sri Lanka"
            }
        }
    }
    ```

-   **Example 4:** Add the `country` attribute in the **Enterprise** user schema (using the path param):

    ```json
    {
        "op": "add",
        "path": "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:country",
        "value": "India"
    }
    ```

**Complex singular attributes**

Consider the `name` attribute in the **Core** user schema, which has sub-attributes such as `givenName`, `familyName`, etc. and the `manager` attribute in the **Enterprise** user schema (`urn:ietf:params:scim:schemas:extension:enterprise:2.0:User`), which has `displayName`, `value`, `ref`, etc. as sub-attributes. 

These a complex singular attributes because there are multiple sub-attributes.

-   **Example 1:** Add the `name` attribute in the **Core** user schema (without using the path param):

    ```json
    {
        "op": "add",
        "value": {
            "name": {
                "givenName": "John",
                "familyName": "Doe"
            }
        }
    }
    ```

-   **Example 2:** Add the `name` attribute in the **Core** user schema (using the path param):

    !!! Note
        There are two ways to define the `path` paratmeter. 

    In the first method, you need only one operation to add the sub-attributes as shown below.

    ```json
    {
        "op": "add",
        "path": "name",
        "value": {
            "givenName": "John",
            "familyName": "John"
        }
    },
    ```

    In the second method, you need two separate operations to add the sub-attributes as shown below.

    ```json
    {
        "op": "add",
        "path": "name.givenName",
        "value": "John"
    },
    {
        "op": "add",
        "path": "name.familyName",
        "value": "Doe"
    }
    ```

-   **Example 3:** Add the `manager` attribute in the **Enterprise** user schema (without using the path param):

    ```json
    {
        "op": "add",
        "value": {
            "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
                "manager": {
                    "displayName": "Manager1",
                    "value": "Joe"
                }
            }
        }
    }
    ```

-   **Example 4:** Add the `manager` attribute in the **Enterprise** user schema (using the path param):

    ```json
        {
        "op": "add",
        "path": "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:manager",
        "value": {
            "displayName": "Manager2"
        }
    }
    ```

**Simple multi-valued attributes**

Attributes of this type are not found in the core schemas of the SCIM specification. However, you can add simple multi-valued attributes to custom schemas as shown below. 

Let's consider a custom schema with an attribute called `devices`, which can have multiple attributes.

-   **Example 1:** Add the `devices` attribute to a **custom** user schema (without using the path param):

    ```json
    {
        "op": "add",
        "value": {
            "urn:scim:wso2:schema": {
                "devices": [
                    "D1",
                    "D2",
                    "D3"
                ]
            }
        }
    }
    ```

-   **Example 2:** Add the `devices` attribute to a **custom** user schema (using the path param):

    ```json
    {
        "op": "add",
        "path": "urn:scim:wso2:schema:devices",
        "value": ["D4", "D5"]
    }
    ```

**Complex multi-valued attributes**

Consider the `emails` attribute in the **Core** user schema, which can have multiple emails types such as `home`, `work`, etc. Each email attribute has sub-attributes such as `value`, `type`, and `primary`.

-   **Example 1:** Add the `emails` complex attribute to a **Core** user schema (without using the path param):

    ```json
    {
        "op": "add",
        "value": {
            "emails": [
                {
                    "value": "abc@gmail.com",
                    "type": "home"
                },
                {
                    "value": "xyz@gmail.com",
                    "type": "work"
                }
            ]
        }
    }
    ```

-   **Example 2:** Add the `emails` complex attribute to a **Core** user schema (using the path param):

    ```json
    {
        "op": "add",
        "path": "emails",
        "value": [
            {
                "value": "abc@gmail.com",
                "type": "home"
            },
            {
                "value": "xyz@gmail.com",
                "type": "work"
            }
        ]
    }
    ```

### Replace user attributes

Let's create patch request payloads to `replace` user attributes of different types.

**Simple singular attributes**

Consider the `nickname` attribute in the **Core** user schema and the `country` attribute in the **Enterprise** user schema (`urn:ietf:params:scim:schemas:extension:enterprise:2.0:User`). These are simple singular attributes.

-   **Example 1:** Replace the `nickName` attribute in the **Core** user schema (without using the path param):

    ```json
    {
        "op": "replace",
        "value": {
            "nickName": "Blinki"
        }
    }
    ```

-   **Example 2:** Replace the `nickName` attribute in the **Core** user schema (using the path param):

    ```json
    {
        "op": "replace",
        "path": "nickName",
        "value": "Shaini"
    }
    ```

-   **Example 3:** Replace the `country` attribute in the **Enterprise** user schema (without using the path param):

    ```json
    {
        "op": "replace",
        "value": {
            "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
                "country": "USA"
            }
        }
    }
    ```

-   **Example 4:** Replace the `country` attribute in the **Enterprise** user schema (using the path param):

    ```json
    {
        "op": "replace",
        "path": "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:country",
        "value": "UK"
    }
    ```

**Complex singular attributes**

Consider the `name` attribute in **Core** user schema, which has sub-attributes such as `givenName`, `familyName`, etc. and the `manager` attribute in the **Enterprise** user schema (`urn:ietf:params:scim:schemas:extension:enterprise:2.0:User`), which has `displayName`, `value`, `ref`, etc. as sub-attributes. 

-   **Example 1:** Replace the `name` attribute in the **Core** user schema (without using the path param):

    ```json
    {
        "op": "replace",
        "value": {
            "name": {
                "givenName": "Peterson"
            }
        }
    }
    ```

-   **Example 2:** Replace the `name` attribute in the **Core** user schema (using the path param):

    ```json   
    {
        "op": "replace",
        "path": "name",
        "value": {
            "givenName": "Martin",
            "familyName": "Freeman"
        }
    },
    {
        "op": "replace",
        "path": "name.familyName",
        "value": "Jackson"
    }
    ```

-   **Example 3:** Replace the `manager` attribute in the **Enterprise** user schema (without using the path param):

    ```json
    {
        "op": "replace",
        "value": {
            "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
                "manager": {
                    "displayName": "Manager3",
                    "value": "Tom"
                }
            }
        }
    }
    ```

-   **Example 4:** Replace the `manager` attribute in the **Enterprise** user schema (using the path param):

    ```json
    {
        "op": "replace",
        "path": "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:manager",
        "value": {
            "displayName": "Manager4"
        }
    },
    {
        "op": "replace",
        "path": "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:manager.value",
        "value": "Jem"
    }
    ```

**Simple multi-valued attributes**

This type of attribute is not found in the core schemas of the SCIM specification. However, there is a capability to add simple multi-valued attributes to our extended schemas (custom schemas). 

Let's consider a custom schema with an attribute called devices.

-   **Example 1:** Replace the `devices` attribue in a **Custom** user schema (without using the path param):

    ```json
    {
        "op": "replace",
        "value": {
            "urn:scim:wso2:schema": {
                "devices": ["M1", "M2"]
            }
        }
    }
    ```

-   **Example 2:** Replace the `devices` attribue in a **custom** user schema (using the path param):

    ```json
    {
        "op": "replace",
        "path": "urn:scim:wso2:schema:devices",
        "value": [
            "M6",
            "M7"
        ]
    }
    ```

**Complex multi-valued attributes**

Consider the `emails` attribute in the **Core** user schema, which can have multiple emails types such as `home`, `work`, etc. Each email attribute has sub-attributes such as `value`, `type`, and `primary`.

-   **Example 1:** Replace the `emails` attribute in a **Core** user schema (without using the path param):

    ```json
    {
        "op": "replace",
        "value": {
            "emails": [
                {
                    "value": "abcd@gmail.com",
                    "type": "home"
                },
                {
                    "value": "wxyz@gmail.com",
                    "type": "work"
                }
            ]
        }
    }
    ```

-   **Example 2:** Replace the `emails` attribute in a **Core** user schema (using the path param):

    ```json
    {
        "op": "replace",
        "path": "emails",
        "value": [
            {
                "value": "abcde@gmail.com",
                "type": "home"
            },
            {
                "value": "vwxyz@gmail.com",
                "type": "work"
            }
        ]
    }
    ```

### Remove user attributes

Let's create patch request payloads to `remove` user attributes of different types.

**Simple singular attributes**

Consider the `nickname` attribute in the **Core** user schema and the `country` attribute in the **Enterprise** user schema (`urn:ietf:params:scim:schemas:extension:enterprise:2.0:User`). These are simple singular attributes.

-   **Example 1:** Remove the `nickName` attribute of a user in the **Core** user schema.

    ```json
    {
        "op": "remove",
        "path": "nickName"
    }
    ```

-   **Example 2:** Remove the `country` attribute of a user in the **Enterprise** user schema.

    ```json
    {
        "op": "remove",
        "path": "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:country"
    }
    ```

**Complex singular attributes**

Consider the `name` attribute in **Core** user schema, which has sub-attributes such as `givenName`, `familyName`, etc. and the `manager` attribute in the **Enterprise** user schema (`urn:ietf:params:scim:schemas:extension:enterprise:2.0:User`), which has `displayName`, `value`, `ref`, etc. as sub-attributes. 

!!! Note    
    -   If the path contains the complex attribute, all sub-attribute values are removed. 
    -   There is a special case for the `name` attribute. Even though `“path”: “name”` is specified, the `familyName` attribute is not removed. This is only applicable when an LDAP user store is used.
    -   If you just want to delete a sub-attribute of a complex attribute, use the `attribute.subattribute` format as shown below.

-   **Example 1:** Remove a sub-attribute of the `name` attribute in the **Core** user schema:

    ```json
    {
        "op": "remove",
        "path": "name.givenName"
    }
    ```

-   **Example 2:** Remove the manager's `value` attribute and whole `manager` object in the **Enterprise** user schema:

    ```json
    {
        "op": "remove",
        "path": "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:manager.value"
    },
    {
        "op": "remove",
        "path": "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:manager"
    }
    ```

**Simple multi-valued attributes**

This type of attribute is not found in the core schemas of the SCIM specification. However, there is a capability to add simple multi-valued attributes to our extended schemas (custom schemas). 

Let's consider a custom schema with an attribute called devices.

```json
{
    "op": "remove",
    "path": "urn:scim:wso2:schema:devices[value eq \"M7\"]"
},
{
    "op": "remove",
    "path": "urn:scim:wso2:schema:devices"
}
```

**Complex multi-valued attributes**

Consider the `emails` attribute in the **Core** user schema, which can have multiple emails types such as `home`, `work`, etc. Each email attribute has sub-attributes such as `value`, `type`, and `primary`.

```json
{
    "op": "remove",
    "path": "emails[type eq home]"
},
{
    "op": "remove",
    "path": "emails"
}
```

## Patch groups

You can use the patch operations to add/remove/replace users (members) in a user group. You can also rename the a user group by using the `replace` operation.

### Add members

Let's create patch request payloads to `add` members to a user group.

-   **Example 1:** Add a member to a group (without using the path param):

    ```json
    {
        "op": "add",
        "value": {
            "members": [
                {
                    "display": "alex",
                    "value": "0565f472-28fe-4d93-83ad-096c66ed4a47"
                }
            ]
        }
    }
    ```

-   **Example 2:** Add a member to a group (using the path param):

    ```json
    {
        "op": "add",
        "path": "members",
        "value": [
                    {
                      "display": "alex",
                      "value": "0565f472-28fe-4d93-83ad-096c66ed4a47"
                }
            ]
    }
    ```

### Replace members

Let's create patch request payloads to `replace` members in a user group.

-   **Example 1:** Replace members in a group (without using the path param):

    ```json
    {
        "op": "replace",
        "value": {
            "members": [
                {
                    "display": "alex",
                    "value": "0565f472-28fe-4d93-83ad-096c66ed4a47"
                }
            ]
        }
    }
    ```

-   **Example 2:** Replace members in a group (using the path param):

    ```json
    {
        "op":"replace",
        "path":"members",
        "value":[
            {
                "display":"alex",
                "value":"0565f472-28fe-4d93-83ad-096c66ed4a47"
            }
        ]
    }
    ```

### Remove members

Let's create patch request payloads to `remove` members from a user group.

-   **Example 1:** Specify the member (by user ID) who needs to be removed.

    ```json
    {
        "op": "remove",
        "path": "members[value eq 0565f472-28fe-4d93-83ad-096c66ed4a47]"
    }
    ```

-   **Example 2:** Specify the member (by username) who needs to be removed.

    ```json
    {
        "op": "remove",
        "path": "members[display eq alex]"
    }
    ```

### Rename user group

Let's create a patch request payload to rename an existing user group.

-   **Example 1:** Rename a user group (without using the path param):

    ```json
    {
        "op": "replace",
        "value": {
            "displayName": "new_group_name"
        }
    }
    ```

-   **Example 1:** Rename a user group (using the path param):

    ```json
    {
        "op": "replace",
        "path": "displayName",
        "value": "new_group_name"
    }
    ```

## Patch roles

You can use the patch operations to add/remove/replace users and user groups for a role.

### Assign users

Let's create patch request payloads to `add` users to a user role.

-   **Example 1:** Assign users to a role (without using the path param):

    ```json  
    {
           "op": "add",
           "value": {
               "users": [
                   {
                       "display": "alex",
                       "value": "0565f472-28fe-4d93-83ad-096c66ed4a47"
                   }
               ]
           }
       }


    ```

-   **Example 2:** Assign users to a role (using the path param):

    ```json
    {
        "op": "add",
        "path": "users",
        "value": [
                    {
                      "display": "alex",
                      "value": "0565f472-28fe-4d93-83ad-096c66ed4a47"
                    }
            ]
    }
    ```

### Replace users

Let's create patch request payloads to `replace` users assigned to a user role.

-   **Example 1:** Replace users in a role (without using the path param):

    ```json
    {
        "op": "replace",
        "value": {
            "users": [
                {
                    "display": "alex",
                    "value": "0565f472-28fe-4d93-83ad-096c66ed4a47"
                }
            ]
        }
    }
    ```

-   **Example 2:** Replace users in a role (using the path param):

    ```json
    {
        "op": "replace",
        "path": "users",
        "value": [
                    {
                      "display": "alex",
                      "value": "0565f472-28fe-4d93-83ad-096c66ed4a47"
                }
            ]
    }
    ```

### Remove users

Let's create patch request payloads to `remove` users from a user role.

-   **Example 1:** Specify the user (by user ID) who needs to be removed.

    ```json
    {
        "op": "remove",
        "path": "users[value eq 0565f472-28fe-4d93-83ad-096c66ed4a47]"
    }
    ```

-   **Example 2:** Specify the user (by username) who needs to be removed.

    ```json
    {
        "op": "remove",
        "path": "members[users eq alex]"
    }
    ```

### Assign user groups

Let's create patch request payloads to `add` user groups to a user role.

-   **Example 1:** Assign user groups to a role (without using the path param):

    ```json  
    {
        "op": "add",
        "value": {
            "groups": [
                {
                    "value": "78144fd9-48e7-4fc9-95b5-cd3883f5ce4a"
                }
            ]
        }
    }
    ```

-   **Example 2:** Assign user groups to a role (using the path param):

    ```json
    {
        "op": "add",
        "path": "groups",
        "value": [
                    {
                      "value": "78144fd9-48e7-4fc9-95b5-cd3883f5ce4a"
                    }
                 ]
    }
    ```

### Replace user groups

Let's create patch request payloads to `replace` user groups assigned to a user role.

-   **Example 1:** Replace user groups in a role (without using the path param):

    ```json
    {
        "op": "replace",
        "value": {
            "groups": [
                {
                    "value": "78144fd9-48e7-4fc9-95b5-cd3883f5ce4a"
                }
            ]
        }
    }
    ```

-   **Example 2:** Replace user groups in a role (using the path param):

    ```json
    {
        "op": "replace",
        "path": "groups",
        "value": [
                    {
                      "value": "78144fd9-48e7-4fc9-95b5-cd3883f5ce4a"
                    }
                 ]
    }
    ```

### Remove user groups

Let's create patch request payloads to `remove` user groups assigned to a user role.

-   **Example 1:** Specify the group (by group ID) that needs to be removed.

    ```json
    {
        "op": "remove",
        "path": "groups[value eq 78144fd9-48e7-4fc9-95b5-cd3883f5ce4a]"
    }
    ```

-   **Example 2:** Specify the group (by group name) that needs to be removed.

    ```json
    {
        "op": "remove",
        "path": "groups[display eq PRIMARY/ABCD]"
    }
    ```
