# OAuth2.0 Client Types

Based on the client’s ability to authenticate with the authorization server,
two types of OAuth2.0 clients are specified in the OAuth2 specification.

[1. Confidential Clients]()

[2. Public Clients]()

### Confidential clients
**Confidential clients**  can maintain the confidentiality of their credentials without being exposed.
An example for a confidential client would be a web application. Once the authorization server provides the tokens
or the credentials to the web application, those credentials will not be exposed to the outside.

Confidential clients should associate with the grant types which require `authentication`. For the web based confidential clients,
it is recommended to use **Authorization Code Grant Type** and for the machine-to-machine communication, it is recommended to use 
**Client Credential Grant Type**.

### Public clients
**Public clients CAN NOT** maintain the confidentiality of their credentials without exposing them. Examples for public clients would be
mobile applications, desktop applications, and JavaScript applications. When using user-agent clients,
protocol data and credentials are easily accessible (and often visible) to the resource owner. Since such applications 
reside within the user-agent, they can make seamless use of the user-agent capabilities when requesting authorization.
When using native applications like desktop applications and mobile applications, those applications are installed and
executed in the resource owner’s devices. Hence protocol data and credentials are accessible to the resource owner
and the passwords can be exposed to the outside if the application is cracked. 

The implicit grant type is optimized for such types of clients, as this grant type does not include client authentication,
and relies on the presence of the resource owner and the registration of the redirection URI. Since the access token 
is encoded into the redirection URI, it may be exposed to the resource owner and other applications residing on the 
same device. To avoid attacks done by manipulating the redirect_uri, it is mandatory for public clients to pre-register 
the `redirect_uri`.

The Following table summarizes the sample clients and the grant types that are recommended for different client types.

| Client Type                 | Sample Clients         |Recommended Grant Type         | 
| --------------------- | ------------- | ------------- |
| Confidential Clients | Web Based| Authorization Code Grant Type, Password Grant Type |
|  | Machine To Machine| Client Credential Grant Type |
| Public Clients | JavaScript applications, Mobile Applications, Desktop Applications| Implicit Grant Type|

                           