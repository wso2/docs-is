# OpenID Connect Dynamic Client Registration

This extension provides a mechanism to register clients with the authorization server dynamically or programmatically. 
 

## How it works 

To register a new client at the authorization server:

1. Client discovers the client registration endpoint. The registration endpoint URL is discoverable via WebFinger.
   For more information on discovering the client registration endpoint, see [OpenID Connect Discovery](../login/discovery.md).
   
2. Client sends an HTTP POST message to the client registration endpoint with client metadata parameters that the client
   chooses to specify for itself during the registration.
   
3. The authorization server assigns an unique client identifier (client ID) and optionally, a client secret.

4. The authorization server associates the metadata given in the request with the issued client ID.


## DCR vs DCRM
### What is DCR (Dynamic Client Registration) ?

Dynamic Client Registration is a protocol that allows OAuth clients to register applications in an authorization server.
Before this mechanism was introduced to the [specification](https://tools.ietf.org/html/rfc7591) the client registration
happened manually. With this implementation, the client registration can be done in two ways.

- A client can be registered dynamically with the authorization server itself
- A programmer can register a client programmatically


### What is DCRM (Dynamic Client Registration Management) ?

DCRM is an extension to the DCR, which introduced form this [specification](https://tools.ietf.org/html/rfc7592). 
Main functionalities which specified are :

- Current registration state of a client (Client Read Request)
- Update request to an already registered client (Client Update Request)
- Delete request to an already registered client (Client Delete request)
