# Resource Registration Endpoint 

The Protection API of the [User Managed Access](../user-managed-access) profile uses three endpoints. 

- Resource registration endpoint
- Permissions endpoint
- Token introspection endpoint

This document describes the purpose, parameters, and flow of the **Resource Regisration** endpoint. 

----

## What is the resource registration endpoint? 

This endpoint allows the resource server to place resources under the protection of the authorization server on behalf of the resource owner.
The resource server uses a RESTful API resource registration endpoint at the authorization server to create, list, read, update, and delete resources and resource descriptions. 

---

## What is a resource description?

The resource description is a JSON object that explains the characteristics of the resource that is to be put under the protection of the authorization server. It consists of JSON documents that are maintained as web resources. Generally, protection of a resource starts with successful registration
and ends with successful deregistration.

Given below is an example of the resource description.

``` java
{  
   "resource_scopes":[  
      "view",
      "http://photoz.example.com/dev/scopes/print"
   ],
   "description":"Collection of digital photographs",
   "icon_uri":"http://www.example.com/icons/flower.png",
   "name":"Photo Album",
   "type":"http://www.example.com/rsrcs/photoalbum"
}
```

---

## Resource description parameters

The resource description has the following parameters:

| Parameter                                  | Description                                                                                                                                                                                                                                                    | Mandatory/Optional |
|--------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|
| `             resource_scopes            ` | A plain string, a URI, or an array of strings which indicates the available scopes for the resource.                                                                                                                                                           | Mandatory          |
| `             name            `            | A human-readable string naming the resource. The authorization server can use the referenced icon in the user interface when presenting information to a resource owner.                                                                                       | Mandatory          |
| `             description            `     | A human-readable string describing the resource in detail. The authorization server can use this description in the user interface when presenting information to a resource owner.                                                                            | Optional           |
| `             icon_uri            `        | A URI for a graphic icon representing the resource. The authorization server can use the referenced icon in the user interface when presenting information to a resource owner.                                                                                | Optional           |
| `             type            `            | A string identifying the semantics of the resource. The authorization server can use this information when processing information about the resource or displaying information about it in the user interface when presenting information to a resource owner. | Optional           |

---

## Resource registration APIs

The authorization server **must** support performing the following five operations. A valid Protection API Access Token (PAT) is required in order to access them. 

!!! info
    `resourceregistration` stands for the resource registration endpoint and `_id` stands for the authorization server-assigned identifier for the web resource (which corresponds to the resource at the time it was created), included within the URL returned in the location header.

| HTTP method                       | Description                      | URI                                                          |
|-----------------------------------|----------------------------------|--------------------------------------------------------------|
| `             POST            `   | Create the resource description. | `             resourceregistration/resource            `     |
| `             GET            `    | Read the resource description.   | `             resourceregistration/resource/_id            ` |
| `             PUT            `    | Update the resource description. | `             resourceregistration/resource/_id            ` |
| `             DELETE            ` | Delete the resource description. | `             resourceregistration/resource/_id            ` |
| `             GET            `    | List the resource descriptions.  | `             resourceregistration/            `             |



### Creating a resource description

The create resource operation adds a new resource to the authorization server using the POST method. If the request is successful, the resource is registered in the authorization server and the `201 (Created)` status message, which includes a location header and an `_id` parameter, is returned. A sample response is shown below.

``` xml tab="Request"
POST : https://localhost:9443/api/identity/oauth2/uma/resourceregistration/v1.0/resource HTTP/1.1 Content-Type: application/json
Authorization: Bearer 8ff019ba-4f8e-3ed9-9b13-a077d9d04557
...
{  
   "resource_scopes":[  
      "read-public",
      "post-updates",
      "read-private",
      "http://www.example.com/scopes/all"
   ],
   "icon_uri":"http://www.example.com/icons/photoAlbem.png",
   "name":"PhotoAlbem",
   "type":"http://www.example.com/rsrcs/socialstream/140-compatible"
}
```

``` xml tab="Response"
HTTP/1.1 201 Created
Content-Type: application/json
Location: /resource/2292d2f5-df72-4c2e-a918-5ae18b900855
...
{  
   "_id":"2292d2f5-df72-4c2e-a918-5ae18b900855",
   "user_access_policy_uri":"http://as.example.com/rs/222/resource/KX3A-39WE/policy"
}
```

### Reading a resource description

This operation reads the previously registered resource description using the GET method. If the request is successful, the response returns the `200 (OK)` status message with a body that contains the referenced resource description along with an `_id` parameter. A sample response is shown below.

``` xml tab="Request"
GET: https://localhost:9443/api/identity/oauth2/uma/resourceregistration/v1.0/resource/2292d2f5-df72-4c2e-a918-5ae18b900855 
HTTP/1.1 Content-Type: application/json Authorization: Bearer 8ff019ba-4f8e-3ed9-9b13-a077d9d04557
```

``` xml tab="Response"
HTTP/1.1 200 OK
Content-Type: application/json
...
{  
   "_id":"2292d2f5-df72-4c2e-a918-5ae18b900855",
   "resource_scopes":[  
      "read-public",
      "post-updates",
      "read-private",
      "http://www.example.com/scopes/all"
   ],
   "icon_uri":"http://www.example.com/icons/PhotoAlbem.png",
   "name":"PhotoAlbem",
   "type":"http://www.example.com/rsrcs/socialstream/140-compatible"
}
```

### Updating a resource description

This operation updates the resource description. It replaces the previous description with the new description using the PUT method. If the request is successful, it returns `200 (OK)` as the response from the authorization server and it includes the `_id` parameter. A sample response is shown below.

``` xml tab="Request"
PUT : https://localhost:9443/api/identity/oauth2/uma/resourceregistration/v1.0/resource/
2292d2f5-df72-4c2e-a918-5ae18b900855
HTTP/1.1 Content-Type: application/json
Authorization: Bearer 8ff019ba-4f8e-3ed9-9b13-a077d9d04557
...
{  
   "resource_scopes":[  
      "http://photoz.example.com/dev/scopes/view",
      "public-read"
   ],
   "description":"Collection of digital photographs",
   "icon_uri":"http://www.example.com/icons/nature.png",
   "name":"Photo Album 90",
   "type":"http://www.example.com/rsrcs/photoalbum90"
}
```

``` xml tab="Response"
HTTP/1.1 200 OK
...
{  
   "_id":"2292d2f5-df72-4c2e-a918-5ae18b900855"
}
```

### Deleting a resource description

This operation removes a previously registered resource and its information. If the request is successful, the authorization server responds with an `HTTP 200` or `204` status message.

``` xml tab="Request"
DELETE : https://localhost:9443/api/identity/oauth2/uma/resourceregistration/v1.0/resource/
2292d2f5-df72-4c2e-a918-5ae18b900855
HTTP/1.1 Content-Type: application/json Authorization: Bearer 8ff019ba-4f8e-3ed9-9b13-a077d9d04557
```

``` xml tab="Response"
HTTP/1.1 204 No content
...
```

### Listing resource descriptions

This operation lists down all the resources of a specific resource owner using the GET method. If the request is successful, a response in string array format is returned. A sample response is shown below.

``` xml tab="Request"
GET : https://localhost:9443/api/identity/oauth2/uma/resourceregistration/v1.0/resource
HTTP/1.1 Content-Type: application/json
Authorization: Bearer 8ff019ba-4f8e-3ed9-9b13-a077d9d04557
```

``` xml tab="Response"
HTTP/1.1 200 OK
...
[  
   "2292d2f5-df72-4c2e-a918-5ae18b900855",
    "d163001d-e8ec-4b11-b89e-7c5d891e878e",
    "3a62e677-4bd9-4dfb-87b6-c305ec17b339",
    "763bc9cf-3753-44e8-ba86-389b9913f971"
]
```

----

## Resource registration error messages

When the request to the resource registration endpoint is incorrect, the authorization server responds as follows:

<table>
<colgroup>
<col style="width: 14%" />
<col style="width: 85%" />
</colgroup>
<thead>
<tr class="header">
<th>Error Code</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>HTTP 404 (Not Found)</td>
<td><p>If the referenced resource cannot be found, the authorization server <strong>must</strong> respond with an <code>HTTP 404</code> status code and <strong>may</strong> respond with a <code>not_found</code> error code.</p></td>
</tr>
<tr class="even">
<td>HTTP 405 (Method Not Allowed)</td>
<td><p>If the resource server request used an unsupported HTTP method, the authorization server <strong>must</strong> respond with the <code>HTTP 405</code> status code and <strong>may</strong> respond with an <code>unsupported_method_type</code> error code.</p></td>
</tr>
<tr class="odd">
<td>HTTP 400 (Bad Request)</td>
<td><p>If the request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once, or is otherwise malformed, the authorization server <strong>must</strong> respond with the <code>HTTP 400</code> status code and <strong>may</strong> respond with an <code>invalid_request</code> error code.</p></td>
</tr>
</tbody>
</table>