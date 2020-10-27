# Locking/Unlocking Functionality Per User

An admin user can lock and unlock functionalities on a per-user basis. This allows for fine-grained control over functionalities that a particular user is allowed to use. This page guides you through configuring per-user functionality locking for the security-question-based password recovery functionality with WSO2 Identity Server using the OSGi service. 

!!! tip
    This can also be done using the [User Functionality Management REST APIs](../../develop/user-functionality-mgt-rest-api/). Using the REST API is the recommended approach. 

---

## Configure tenant-wide properties 

The following properties related to the functionality need to be defined and will affect all the users in a tenant. 

- **MaxAttempts** : Maximum attempts allowed for a user
- **LockoutTime** : The duration (in minutes) specifying how long the functionality is locked for a user 
- **TimeoutRatio** : The ratio that the functionality's lockout time is increased upon when the maximum number of attempts is exceeded

This sample requests below use the following values for these properties.

```
MaxAttempts = 5
LockoutTime = 5
TimeoutRatio = 2
```

To store these configurations for per-user functionality locking, you must first define a resource type using the [Configuration Management REST APIs](../../develop/using-the-configuration-management-rest-apis). Sample requests and responses are given below. 

1. Create a new resource type called `functionalityLock` in the configuration store. 

    ```tab="Sample Request"
    curl -k -X POST https://localhost:9443/api/identity/config-mgt/v1.0/resource-type -H "accept: application/json" -H 'Content-Type: application/json' -H 'Authorization: Basic YWRtaW46YWRtaW4=' -d '{"name": "functionalityLock", "description": "This is the resource type for per user functionality locking."}'
    ```

    ```tab="Sample Response"
    {
    "name": "functionalityLock",
    "id": "05f3996c-be3a-43b4-917e-2ae12a304d9b",
    "description": "This is the resource type for per user functionality locking.",
    "links": []
    }
    ```

2. Next, create a resource for the specific functionality that you wish to configure. In this request, you can define the property values mentioned above.

    ```tab="Sample Request"
    curl -k -X POST https://localhost:9443/api/identity/config-mgt/v1.0/resource/functionalityLock -H "accept: application/json" -H 'Content-Type: application/json' -H 'Authorization: Basic YWRtaW46YWRtaW4=' -d '{"name": "SecurityQuestionBasedPasswordRecovery", "attributes": [{"key": "MaxAttempts", "value": "5"}, {"key": "LockoutTime", "value": "5"}, {"key": "TimeoutRatio", "value": "2"}]}'
    ```

    ```tab="Sample Response"
    {
    "resourceId": "c4357c84-5e4f-452e-9121-33cd1e655470",
    "tenantDomain": "carbon.super",
    "resourceName": "SecurityQuestionBasedPasswordRecovery",
    "resourceType": "functionalityLock",
    "lastModified": "2020-06-12T07:32:44.429Z",
    "created": "2020-06-12T07:32:44.429Z",
    "attributes": [
        {
            "key": "MaxAttempts",
            "value": "5"
        },
        {
            "key": "LockoutTime",
            "value": "5"
        },
        {
            "key": "TimeoutRatio",
            "value": "2"
        }
    ],
    "files": [
        {
            "href": "/t/carbon.super/api/identity/config-mgt/v1.0/resource/functionalityLock/SecurityQuestionBasedPasswordRecovery/file",
            "rel": "file"
        }
    ]
    }
    ```

3. If you wish to update the configuration properties set for security-question-based password recovery, you can use the following command. In this example, the `MaxAttempts` property value is updated to `3`. 

    ```tab="Sample Request"
    curl -k -X PUT https://localhost:9443/api/identity/config-mgt/v1.0/resource/functionalityLock/SecurityQuestionBasedPasswordRecovery -H "accept: application/json" -H 'Content-Type: application/json' -H 'Authorization: Basic YWRtaW46YWRtaW4=' -d '{"key": "MaxAttempts", "value": "3"}'
    ```

    ```tab="Sample Response"
    {"key":"MaxAttempts","value":"3"}
    ```

4. Run the following command to retrieve the `SecurityQuestionBasedPasswordRecovery` resource you created. 

    ```tab="Sample Request"
    curl -k -X GET https://localhost:9443/api/identity/config-mgt/v1.0/resource/functionalityLock/SecurityQuestionBasedPasswordRecovery -H "accept: application/json" -H 'Content-Type: application/json' -H 'Authorization: Basic YWRtaW46YWRtaW4='
    ```

    ```tab="Sample Response"
    {
    "resourceId": "851827f8-1a38-4847-a8dc-db9fb97407ad",
    "tenantDomain": "carbon.super",
    "resourceName": "SecurityQuestionBasedPasswordRecovery",
    "resourceType": "functionalityLock",
    "lastModified": "2020-06-12T07:53:16Z",
    "created": "2020-06-12T07:52:14Z",
    "attributes": [
        {
            "key": "MaxAttempts",
            "value": "3"
        },
        {
            "key": "TimeoutRatio",
            "value": "2"
        },
        {
            "key": "LockoutTime",
            "value": "5"
        }
    ],
    "files": [
        {
            "href": "/t/carbon.super/api/identity/config-mgt/v1.0/resource/functionalityLock/SecurityQuestionBasedPasswordRecovery/file",
            "rel": "file"
        }
    ]
    }
    ```

---

## Disable per-user functionality locking

Per-user functionality locking is enabled in WSO2 Identity Server by default. If you wish to disable this, add the following configuration in the `deployment.toml` file located in the `<IS_HOME>/repository/conf/` folder. 

```
[user]
enable_per_user_functionality_locking="false"
```

