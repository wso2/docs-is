# SCIM2 Patch Operations

Follow the topics given below to understand how **Patch** operations can be used when you invoke the [SCIM2 API](scim2-rest-apis.md).

## Introduction

WSO2 Identity Server supports SCIM Patch, which can be used to update one or more attributes of a SCIM resource. 

When you create you request payload to update attributes in a SCIM resource, you need to first determine the following two factors: the type of attribute and the type of update.

### Types of attributes

The type of attribute that should be updated. 

<table>
    <tr>
        <th>Simple singular attributes</th>
        <td></td>
    </tr>
    <tr>
        <th>Complex singular attributes</th>
        <td></td>
    </tr>
    <tr>
        <th>Simple multi-valued attributes</th>
        <td></td>
    </tr>
    <tr>
        <th>Complex multi-valued attributes</th>
        <td></td>
    </tr>
</table>

### Types of updates

The type of update that should be applied. There are three types of update operations you can use:

<table>
    <tr>
        <th>add</th>
        <td>Add a new value.</td>
    </tr>
    <tr>
        <th>replace</th>
        <td>Replace the existing value.</td>
    </tr>
    <tr>
        <th>remove</th>
        <td>Delete the existing value.</td>
    </tr>
</table>

### Patch request payload

The structure of a patch request payload is as follows:

```json
{
    "schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    "operations":[
        {
        "op": "add|replace|remove",
        "path": "attribute_path|value_path|sub_attribute_path"
        "value": {},
        },
        ...
    ]
}
```

The parameters in the above payload are explained below.

<table>
    <tr>
        <th>Parameter</th>
        <th>Possible Values</th>
        <th>Required/Optional</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>schemas</code></td>
        <td>urn:ietf:params:scim:api:messages:2.0:PatchOp</td>
        <td>Required</td>
        <td>This is the schema that is required for sending patch requests.</td>
    </tr>
    <tr>
        <td><code>operations</code></td>
        <td>Array of add, remove, replace operations</td>
        <td>Required</td>
        <td>Specify the array of add, remove, replace operations that should be used to update the information. You can include any number of operations in one request.</td>
    </tr>
    <tr>
        <td><code>op</code></td>
        <td>
            <ul>
                <li>add</li>
                <li>remove</li>
                <li>replace</li>
            </ul>
        </td>
        <td>Required</td>
        <td>The method that should be used in the operation.</td>
    </tr>
    <tr>
        <td><code>path</code></td>
        <td>attribute_path/value_path [sub_attribute]</td>
        <td>Required if <code>op</code> is <code>remove</code>.</td>
        <td>Add this path to specify that a new user is being added. If the path is not defined here, it should be specified as a sub parameter of the value.</td>
    </tr>
    <tr>
        <td><code>value</code></td>
        <td>attribute/set_of_attributes/specific_value</td>
        <td>Required if <code>op</code> is <code>remove</code>.</td>
        <td></td>
    </tr>
</table>

## Patch users

You can use the patch operations to add/remove/replace attributes of users. Consider the following SCIM2 schemas that you will update:

-   User Core schema
-   Enterprise schema
-   Custom schemas

### Add users

Since `path` is an optional parameter for add and replace operations, there are two ways to define the operation in a payload: with or without the `path` parameter.

Note that if you are adding user attributes to a user in the **User Core** schema, it is not necessary to specify the schema in the request payload. See the examples given below.

-   **Example 1:** Add a simple singular attribute in the **Core** user schema.

    Let's add a simple singular attribute named `nickName` in the **Core** user schema (without using the path param):

    ```json
    {
        "op": "add",
        "value": {
            "nickName": "shaggy"
        }
    }
    ```

    Let's add a simple singular attribute named `nickName` in the **Core** user schema (using the path param):

    ```json
    {
        "op": "add",
        "path": "nickName",
        "value": "Tomy"
    }
    ```

-   **Example 2:** Add a simple singular attribute in the **Enterprise** user schema.

    Let's add a simple singular attribute named `country` in the **Enterprise** user schema (without using the path param):

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

    Let's add a simple singular attribute named `country` in the **Enterprise** user schema (using the path param):

    ```json
    {
        "op": "add",
        "path": "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:country",
        "value": "India"
    }
    ```

### Replace users

Since `path` is an optional parameter for add and replace operations, there are two ways to define the operation in a payload: with or without the `path` parameter.

Note that if you are replacing the attributes of a user in the **User Core** schema, it is not necessary to specify the schema in the request payload. See the examples given below.

-   **Example 1:** Replace a simple singular attribute in the **Core** user schema.

    Let's replace a simple singular attribute named `nickName` in the **Core** user schema (without using the path param):

    ```json
    {
        "op": "replace",
        "value": {
            "nickName": "Blinki"
        }
    }
    ```

    Let's replace a simple singular attribute named `nickName` in the **Core** user schema (using the path param):

    ```json
    {
        "op": "replace",
        "path": "nickName",
        "value": "Shaini"
    }
    ```

-   **Example 2:** Replace a simple singular attribute in the **Enterprise** user schema.

    Let's replace a simple singular attribute named `country` in the **Enterprise** user schema (without using the path param):

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

    Let's replace a simple singular attribute named `country` in the **Enterprise** user schema (using the path param):

    ```json
    {
        "op": "replace",
        "path": "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:country",
        "value": "UK"
    }
    ```

### Remove users

The `path` parameter is required when removing simple singular attributes from a user.

-   **Example 1:** Remove a simple singular attribute of a user in the **Core** user schema.

    ```json
    {
        "op": "remove",
        "path": "nickName"
    }
    ```

-   **Example 2:** Remove a simple singular attribute of a user in the **Enterprise** user schema.

    ```json
    {
        "op": "remove",
        "path": "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:country"
    }
    ```

## Patch groups

You can use the patch operations to add/remove/replace users (members) in a user group.

### Add members

Since `path` is an optional parameter for add and replace operations, there are two ways to define the operation in a payload: with or without the `path` parameter.

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

Since `path` is an optional parameter for add and replace operations, there are two ways to define the operation in a payload: with or without the `path` parameter.

-   **Example 1:** Replace a member in a group (without using the path param):

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

-   **Example 2:** Replace a member in a group (using the path param):

    ```json
    {
        "op": "replace",
        "path": "members",
        "value": [
                    {
                    "display": "alex",
                    "value": "0565f472-28fe-4d93-83ad-096c66ed4a47"
                }
            ]
    }
    ```

### Remove members

The `path` parameter is required when removing members from a user group.

-   **Example 1:** Specify the member who needs to be removed by user ID.

    ```json
    {
        "op": "remove",
        "path": "members[value eq 0565f472-28fe-4d93-83ad-096c66ed4a47]"
    }
    ```

-   **Example 2:** Specify the member who needs to be removed by username.

    ```json
    {
        "op": "remove",
        "path": "members[display eq alex]"
    }
    ```

## Patch user roles

You can use the patch operations to add/remove/replace users and user groups for a role.

### Assign users

Since `path` is an optional parameter for add and replace operations, there are two ways to define the operation in a payload: with or without the `path` parameter.

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

Since `path` is an optional parameter for add and replace operations, there are two ways to define the operation in a payload: with or without the `path` parameter.

-   **Example 1:** Replace a user from a role (without using the path param):

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

-   **Example 2:** Replace a user from a role (using the path param):

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

The `path` parameter is required when removing users from a role.

-   **Example 1:** Specify the user who needs to be removed by user ID.

    ```json
    {
        "op": "remove",
        "path": "members[value eq 0565f472-28fe-4d93-83ad-096c66ed4a47]"
    }
    ```

-   **Example 2:** Specify the user who needs to be removed by username.

    ```json
    {
        "op": "remove",
        "path": "members[display eq alex]"
    }
    ```

### Assign user groups

Since `path` is an optional parameter for add and replace operations, there are two ways to define the operation in a payload: with or without the `path` parameter.

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

Since `path` is an optional parameter for add and replace operations, there are two ways to define the operation in a payload: with or without the `path` parameter.

-   **Example 1:** Replace a user group from a role (without using the path param):

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

-   **Example 2:** Replace a user group from a role (using the path param):

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

The `path` parameter is required when removing user groups from a role.

-   **Example 1:** Specify the group that needs to be removed by group ID.

    ```json
    {
        "op": "remove",
        "path": "groups[value eq 78144fd9-48e7-4fc9-95b5-cd3883f5ce4a]"
    }
    ```

-   **Example 2:** Specify the group that needs to be removed by group name.

    ```json
    {
        "op": "remove",
        "path": "groups[display eq PRIMARY/ABCD]"
    }
    ```
