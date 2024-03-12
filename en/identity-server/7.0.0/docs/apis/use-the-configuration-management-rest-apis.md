# Configuration Management REST APIs

The configuration management APIs in WSO2 Identity Server manages configurations that are required to be stored as tenant-wise key-pair values. These stored configuration values are not changed frequently and are consumed at runtime. Some examples of such values are:

- SMTP configurations of an email server
- A server configuration where analytics data is published

Configurations for the above scenarios can be stored using the configuration management APIs. A detailed example is included in the [try-it-out](#try-it-out) section below.

## Prerequisites

The configuration management API sometimes uses dynamic query build for its database CRUD operations; especially in the `/search` endpoint (for more information, see [Retrieving Tenant Resources Based on Search Parameters]({{base_path}}/apis/retrieve-tenant-resources-based-on-search-parameters/)). However, a query that is too long can lead to errors. To prevent this, an upper limit to the dynamic query size is applied by default (the default value is the maximum packet size for MySQL 5.7 in bytes). To configure this upper limit value, do the following:

Add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file.
    
``` 
[configuration.store.query_length]
max="4194304"
```

---

## Configuration management architecture

The configuration manager exposed with the configuration management REST
APIs manages configurations as **Resources**.

![Configuration management architecture diagram]( {{base_path}}/assets/img/apis/resource.png)

What is a resource?

-   A **Resource** belongs to a **Resource Type** and a tenant domain.
-   Each **Resource** has a set of **Attributes**.
-   Each **Attribute** has a key and a respective value.

The section below describes each concept in more detail.

---

## Configuration management concepts

-   **Resource -**
     A resource contains one or more attributes which will be used to
    store resource data. A resource is created in the tenant domain and
    it belongs to the authenticated user who creates the resource. When
    creating the resource, it is mandatory to assign a resource type.  
      
-   **Resource Type -**  
    A resource type is shared among the tenants. Each resource created
    in a tenant domain, belongs to an already created resource type.
    Deleting a resource type will also delete its resources.

    !!! note
    
        Since the resource type is shared among tenants, deleting
        a resource type can affect resources in different tenant domains.
    

-   **Attribute -**  
    An attribute is the element that stores the data for its resource.
     An attribute is created for an already existing resource. It
    contains a key and a value.

-   **File -**
    A file with configurations that are required for identity server functionality.
    Eg: Publisher Files, Email Templates.  

---
    
## APIs and supported operations

!!! note
    
    For information on the REST APIs, supported operations and sample
    requests/responses, see [Configuration Management APIs
    Documentation](https://docs.wso2.com/display/IS511/apidocs/Configuration-management-apis/).
    
    For information on how to use the /search endpoint of the Configuration
    Management APIs, see [Retrieving Tenant Resources Based on Search
    Parameters]({{base_path}}/apis/retrieve-tenant-resources-based-on-search-parameters).

---   

## Try it out

This section guides you through a sample scenario using the WSO2 IS
configuration manager.

**Sample scenario** - Consider a scenario where you need to store the
SMTP email configurations. Assume that the simple SMTP configuration has
only one property.

| Property | Value            | Description                                                          |
|----------|------------------|----------------------------------------------------------------------|
| From     | "admin@wso2.com" | This email address is used by the WSO2 IS instance to send an email. |

To store the SMTP email configuration, follow the steps given below:

1.  Access the WSO2 Identity Server Management Console (`https://<IS_HOST>:<PORT>/carbon`) You can sign in using
    `          admin         ` as the username and password.
2.  Open a terminal window and run the following commands.

    1.  Create a resource type named "email" using the [Create resource
        type](https://docs.wso2.com/display/IS511/apidocs/Configuration-management-apis/index.html#!/operations#ResourceType#resourceTypePost)
        API.

        !!! abstract ""
            **Sample request**
            ``` groovy
            curl -k -X POST https://localhost:9443/api/identity/config-mgt/v1.0/resource-type -H "accept: application/json" -H 'Content-Type: application/json' -H 'Authorization: Basic YWRtaW46YWRtaW4=' -d '{"name": "e-mail", "description": "This is the resource type for email resources."}'
            ```
            ---
            **Sample response**
            ```
            {
                "name":"e-mail",
                "id":"0adbdfad-5f4f-4c11-af75-9ed3e93647b9",
                "description":"This is the resource type for email resources."
            }
            ```

    2.  Create a resource named "smtp" in the super tenant domain under
        the "email" resource type using the [Create
        resource](https://docs.wso2.com/display/IS511/apidocs/Configuration-management-apis/index.html#!/operations#Resource#resourceResourceTypePost)
        API.  Note that the "from" attribute is defined within this
        sample request. Therefore when the new resource is created a new
        attribute named "from" will be created under the "smtp" resource
        as well.

        !!! abstract ""
            **Sample request**
            ```
            curl -k -X POST https://localhost:9443/api/identity/config-mgt/v1.0/resource/e-mail -H "accept: application/json" -H 'Content-Type: application/json' -H 'Authorization: Basic YWRtaW46YWRtaW4=' -d '{"name": "smtp","attributes": [{"key": "from","value": "admin@wso2.com"}]}'
            ```
            ---
            **Sample response**
            ```
            {
                "resourceId":"6e45c661-7671-4ee9-805c-8d3d1df46cbc",
                "tenantDomain":"carbon.super","
                resourceName":"smtp",
                "resourceType":"e-mail",
                "lastModified":"2019-02-07T09:30:12.963Z",
                "created":"2019-02-07T09:30:12.963Z",
                "attributes":[{"key":"from","value":"admin@wso2.com"}],
                "files":[]
            }
            ```
        
    3.  Create a file named `EmailPublisher` under resource `smtp` and resource type `email` by using following curl 
        command.

        !!! abstract ""
            **Sample request**
            ``` groovy 
            curl -X POST "https://localhost:9443/t/{tenant-domain}/api/identity/config-mgt/v1.0/resource/Publisher/EmailPublisher/file" -H 'Authorization: Basic YWRtaW46YWRtaW4='  -H "accept: application/json" -H 
            "Content-Type: multipart/form-data" -F "resourceFile=@EmailPublisher.xml;type=text/xml" -F "file-name=EmailPublisher"
            ```
            ---
            **Sample response**
            
            | Header   |Value                                                          |
            |----------|----------------------------------------------------------------------|
            | location |`https://localhost:9443/api/identity/config-mgt/v1.0/resource/email/smtp/file/dbcf0a4f-9b27-4b5b-8d16-330752d0d905` |

3.  Next, assume that you now need to add an additional attribute named
    "to" to the "smtp" email configuration. To do this, create a new
    attribute named "to" using the [Create
    attribute](https://docs.wso2.com/display/IS511/apidocs/Configuration-management-apis/index.html#!/operations#Attribute#resourceResourceTypeResourceNamePost)
    API by running the following command on the terminal.

    !!! abstract ""
        **Sample request**
        ``` groovy
        curl -k -X POST https://localhost:9443/api/identity/config-mgt/v1.0/resource/e-mail/smtp -H "accept: application/json" -H 'Content-Type: application/json' -H 'Authorization: Basic YWRtaW46YWRtaW4=' -d '{"key": "to", "value": "abc.com"}'
        ```
        ---
        **Sample response**
        ``` groovy
        {"key":"to","value":"abc.com"}
        ```

4.  Once these steps are completed, the WSO2 IS instance calls the
    configuration manager to retrieve the SMTP email address using the
    following path:

    ``` java
    (Resource Type = ‘e-mail’) -> (Resource = ‘smtp’) ->  (Attribute key = ‘from’)
    ```

    Run the following curl command to retrieve the 'smtp' resource that
    you created above.

    !!! abstract ""
        **Sample request**
        ``` groovy
        curl -k -X GET https://localhost:9443/api/identity/config-mgt/v1.0/resource/e-mail/smtp -H "accept: application/json" -H 'Content-Type: application/json' -H 'Authorization: Basic YWRtaW46YWRtaW4='
        ```
        ---
        **Sample response**
        ```
        {
            "resourceId":"6e45c661-7671-4ee9-805c-8d3d1df46cbc",
            "tenantDomain":"carbon.super",
            "resourceName":"smtp",
            "resourceType":"e-mail",
            "lastModified":"2019-02-07T09:31:21.564Z",
            "created":"2019-02-07T09:30:12.963Z",
            "attributes":[
                {"key":"from","value":"admin@wso2.com"},
                {"key":"to","value":"abc.com"}
            ],
            "files":[]
        }
        ```
