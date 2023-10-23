# Permission Endpoint
 
This document describes the purpose, parameters, and flow of the permission endpoint of the protection API in [UMA 2.0]({{base_path}}/references/concepts/authorization//user-managed-access). 

----

## What is the permission endpoint? 

The permission endpoint of the authorization server is used by the resource server to request permissions on behalf of the client. This process is initiated when a client makes a tokenless resource request or a request with an invalid token to the resource server i.e., the request is unaccompanied by an RPT (Requesting Party Token) or the RPT is invalid.

!!! info
    An RPT is an OAuth access token that is unique to a requesting party, client, authorization server, resource server, and resource owner. This token also contains information about granted permissions.

The resource server interprets the request made to the client and maps it to the relevant authorization server, resource owner, resource identifiers, and their corresponding set of scopes. 

Note that in a single instance, the resource server can only request permission to access the resources of a single resource owner that is protected by a single authorization server. The resource server decides whether to request zero or more scopes that correspond to a resource identifier. As the response, the resource server receives a permission ticket which represents the same permissions that the resource server requested. 

![UMA 2.0 permission endpoint]({{base_path}}/assets/img/concepts/uma-permission-endpoint.png)

----

## Create permission ticket

This API creates a permission ticket using the POST HTTP method.  

The Protection API Access Token (PAT) provided in the request header is used by the authorization server to identify the relevant resource owner and resource server.

If the permission request is authenticated successfully, but fails due to some other reason, you would receive a failed response similar to the one shown below.

!!! abstract ""
    **Request**
    ``` xml
    POST https://localhost:9443/api/identity/oauth2/uma/permission/v1.0/permission 
    Content-Type:  application/json
    Authorization: Bearer 8ff019ba-4f8e-3ed9-9b13-a077d9d04557
    ...
    [
        {
        "resource_id":"238157ba-06f4-4730-8492-86e35f5b2b7d",
        "resource_scopes":[
            "view",
            "crop",
            "lightbox"
        ]
        },
        {
        "resource_id":"238157ba-06f4-4730-8492-86e35f8b2b32",
        "resource_scopes":[
            "view",
            "layout",
            "print"
        ]
        },
        {
        "resource_id":"238157ba-06f4-8676-8492-86e35f5b2b7d",
        "resource_scopes":[
            "http://www.example.com/scopes/all"
        ]
        }
    ]
    ```
    ---
    **Successful Response**
    ``` xml
    HTTP/1.1          201     Created
    Content-Type:  application/json
    ...
    {                           
        "ticket":"016f84e8-f9b9-11e0-bd6f-0021cc6004de"
    }
    ```
    ---
    **Failed Response**
    ``` xml
    HTTP/1.1          400     Bad    Request
    Content-Type:  application/json
    ...
    {
        "error":"invalid_resource_id",
        "error_description":"Permission request failed with bad resource ID."
    }
    ```

----

## Error messages

The error code can either be `invalid_resource_id` or `invalid_resource_scope`.

| Error code                                        | Description                                                                                                            |
|---------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| `             Invalid_resource_id            `    | This indicates that the resource ID does not exist in the authorization server.                                        |
| `             Invalid_resource_scope            ` | This indicates that at least one of the scopes corresponding to the resource is not found at the authorization server. |
