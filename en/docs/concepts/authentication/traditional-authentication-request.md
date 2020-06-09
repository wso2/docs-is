# Traditional Authentication

## Authentication Parameters

**Required Parameters**

----

| Parameter                     | Description |
| --------------------- | -------- |
| client_id | The OAuth 2.0 Client Identifier valid at the authorization server.  |                         
| scope | [Description for scopes](scopes-claims.md)  |                         
| response_type           | Determines which authorization processing flow is to be used, including what parameters are returned from the endpoints used. Any combination of `code`,`token` or `id_token`   |                          
| redirect_uri             |  The URI which the authorization server should send the response to. |

----

###state parameter

The parameter passed from the application to the identity provider to maintain any state information. This is used to correlate the requests and responses. If the state parameter is defined as state_1, the request and response both have state_1 in them. This makes it easy for the client to identify the request and responses.

----
###nonce parameter

{!fragments/nonce.md!}

----


###prompt parameter

| Parameter vale                 | Description    | 
| --------------------- | ------------- |
| prompt= none |The Authorization Server does not display any authentication or consent user interface pages. An error is returned if an end user is not already authenticated or the client does not have pre-configured consent for the requested claims or if there are any other unfulfilled conditions for processing the request.  |                       
| prompt= login |Even if the end user is already authenticated, it will prompt the end user for re-authentication.  |                       
| prompt= consent           |Even if the consent is already given, it will prompt the end user for consent again before returning information to the client.  |                        
| prompt= consent login  | The user will be prompted to login as well as for consent when returning information to the client.  |
