# OpenID Connect Back-Channel Logout

[OpenID Connect back-channel logout](https://openid.net/specs/openid-connect-backchannel-1_0.html#Backchannel) feature
enables logging out users from a client application/Relying Party (RP) by directly communicating the logout requests 
between the client application and authorization server.

## What is back-channel communication?

- Back-channel communication enables communication between two or more unobservable parties.

- In this method, the request messages are communicated between the servers via direct network links between the servers.

- This method also enables the client application to communicate with the identity provider and resource server without
  user involvement as well as the identity provider to communicate with the resources server without the 
  client application's involvement.

## What is direct communication?

Direct communication enables communicating the requests between the client application and authorization server through 
direct network links without having to rely on a browser/agent. This approach is more reliable as it does not require
communicating the logout requests through a user agent/browser and maintains active RP browser sessions for the 
communication to succeed.

## Message flow
Let's take a look at the underlying message flow of OpenID Connect back-channel logout.

1. The client application or authorization server triggers a user logout.
2. The authorization server identifies all the client applications that share the same user session.
3. The authorization server generates the logout token, which is a special JWT containing claims and sends it with the 
   logout request to the logout endpoints of the client applications.
4. Upon receiving the logout token, the client application validates the logout token and invalidates the user session.

