# OAuth Dynamic Client Registration

This page guides you through using [OAuth Dynamic Client Registration](../../../concepts/authorization/dcr) registering and managing an OAuth application using REST APIs.

-----

## Register an OAuth application

Use the following curl command to register an OAuth application with a specified client ID and client secret. 

```tab="Request Format"
curl -k -X POST -H "Authorization: Basic <Base64_encoded_username:password>" -H 
"Content-Type: application/json" -d '{
 "client_name": "<application_name>",
 "grant_types": ["<grant_types>"], 
 "ext_param_client_id":"<client_id>", 
 "ext_param_client_secret":"<client_secret>" }' 
"https://localhost:9443/api/identity/oauth2/dcr/v1.0/register"
```

```tab="Sample Request"
curl -k -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H 
"Content-Type: application/json" -d '{
 "client_name": "application1",
 "grant_types": ["password"], 
 "ext_param_client_id":"provided_client_id0001", 
 "ext_param_client_secret":"provided_client_secret0001" }' 
"https://localhost:9443/api/identity/oauth2/dcr/v1.0/register"
```

**Response**

```
"HTTP/1.1 201 Created"
{"client_name”:"application1",
"client_id":"provided_client_id0001",
"client_secret":"provided_client_secret0001",
"redirect_uris":[""]}
```

-----

## Update an OAuth application

Use the following curl command to update an OAuth application.

```tab="Request Format"
curl -X PUT -H "Authorization: Basic <Base64_encoded_username:password>" -H
"Content-Type: application/json" -d '{
  "redirect_uris":["<callback_url>"],
  "client_name": "<application_name>",
  "grant_types": ["<grant_types>"] }'
"https://localhost:9443/api/identity/oauth2/dcr/v1.1/register"
```

```tab="Sample Request"
curl -X PUT -H "Authorization: Basic YWRtaW46YWRtaW4=" -H
"Content-Type: application/json" -d '{
  "redirect_uris":["https://client.example.org/callback"],
  "client_name": "application1",
  "grant_types": ["password"] }'
"https://localhost:9443/api/identity/oauth2/dcr/v1.1/register"
```

**Response**

```
"HTTP/1.1 200 OK"
{ "client_id": "s6BhdRkqt3",
"client_secret":"ZJYCqe3GGRvdrudKyZS0XhGv_Z45DuKhCUk0gBR1vZk",
"client_secret_expires_at": 1577858400,
"redirect_uris":["https://client.example.org/callback"],
"client_name":"application_owner_application_1" }
```

----

## Get application information via client ID

Use the following curl command to retrieve OAuth application information using the client ID. 

```tab="Request Format"
curl -X GET -H "Authorization: Basic <Base64_encoded_username:password>" -H "Content-Type: application/json" -d '{}' "https://localhost:9443/api/identity/oauth2/dcr/v1.1/register/<client_id>"
```

```tab="Sample Request"
curl -X GET -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{}' "https://localhost:9443/api/identity/oauth2/dcr/v1.1/register/s6BhdRkqt3"
```

**Response**

```
"HTTP/1.1 200 OK"
{ "client_id": "s6BhdRkqt3",
"client_secret":"ZJYCqe3GGRvdrudKyZS0XhGv_Z45DuKhCUk0gBR1vZk",
"client_secret_expires_at": 1577858400,
"redirect_uris":["https://client.example.org/callback"],
"client_name":"application1" }
```

----

## Get application information via client name

Use the following curl command to retrieve OAuth application information using the client name. 

```tab="Request Format"
curl -X GET -H "Authorization: Basic <Base64_encoded_username:password>" -H "Content-Type: application/json" -d '{}' "https://localhost:9443/api/identity/oauth2/dcr/v1.1/register?client_name=<client_name>"
```

```tab="Sample Request"
curl -X GET -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{}' "https://localhost:9443/api/identity/oauth2/dcr/v1.1/register?client_name=application1"
```

**Response**

```
"HTTP/1.1 200 OK"
{ "client_id": "s6BhdRkqt3",
"client_secret":"ZJYCqe3GGRvdrudKyZS0XhGv_Z45DuKhCUk0gBR1vZk",
"client_secret_expires_at": 1577858400,
"redirect_uris":["https://client.example.org/callback"],
"client_name":"application1" }
```

----

## Delete an OAuth application

Use the following curl command to delete an OAuth application using the client ID. 

```tab="Request Format"
curl -X DELETE -H "Authorization: Basic <Base64_encoded_username:password>" -H "Content-Type: application/json" -d '{}' "https://localhost:9443/api/identity/oauth2/dcr/v1.1/register/<client_id>"
```

```tab="Sample Request"
curl -X DELETE -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{}' "https://localhost:9443/api/identity/oauth2/dcr/v1.1/register/s6BhdRkqt3"
```

**Response**

```
"HTTP/1.1 204 No Content"
```

-----

To see the swagger definition of this REST API, see [OAuth Dynamic Client Registration APIs](insertlink).