# OAuth Concepts

WSO2 Identity Server supports 2-legged and 3-legged OAuth. To enable
OAuth support for your client application, you need to register your
application.

### 2-legged OAuth with OAuth 1.0 and 2.0

[OAuth 1.0](http://oauth.net/core/1.0/) emerged from the large social
providers like Facebook, Yahoo!, AOL, and Google. Each had developed its
own alternative to the password anti-pattern. OAuth 1.0 reflected their
agreement on a single community standard. As a result of security
upgrades, [OAuth 1.0a](http://oauth.net/core/1.0a/) was released as the
revised specification that offered upgraded security to users. In 2009,
recognizing the value of more formalized standardization, that community
contributed OAuth 1.0 to the IETF. It was within the IETF Working Group
that the original OAuth 1.0 was reworked and clarified to become the
Informative [RFC 5849](http://tools.ietf.org/html/rfc5849).

![oauth-concepts-diagram](../assets/img/using-wso2-identity-server/oauth-concepts-diagram.png)

After more standardization, in 2010, Microsoft, Yahoo!, and Google
created the Web Resource Authentication Protocol (WRAP), which was soon
submitted into the IETF WG as input for [OAuth
2.0](http://tools.ietf.org/html/draft-ietf-oauth-v2-22). WRAP proposed
significant reworking of the OAuth 1.0a model. Among the changes were
the deprecation of message signatures in favor of SSL, and a formal
separation between the roles of ‘token issuance’ and ‘token reliance.’

Development of OAuth 2.0 in the IETF consequently reflects the input of
both OAuth 1.0, OAuth 1.0a, and the WRAP proposal. The different
assumptions about what are appropriate security protections between
OAuth 1.0a and WRAP have created tensions within IETF OAuth WG.

While OAuth 2.0 initially reflected more of the WRAP input, lately there
has been a swing in group consensus that the signatures of OAuth 1.0a
that were deprecated by WRAP are appropriate and desirable in some
situations. Consequently, signatures are to be added back as an optional
security mechanism.

OAuth provides a method for clients to access server resources on behalf
of a resource owner (such as a different client or an end-user). It also
provides a process for end-users to authorize third-party access to
their server resources without sharing their credentials (typically, a
username and password pair), using user-agent redirections.

In the traditional client-server authentication model, the client
requests for an access restricted resource (protected resource) on the
server by authenticating it with the server using the resource owner's
credentials. In order to provide third-party applications with access to
restricted resources, the resource owner shares its credentials with the
third-party. This creates several problems and limitations:

1.  Third-party applications are required to store the resource owner's
    credentials for future use, typically a password in clear-text.

2.  Servers are required to support password authentication, despite the
    security weaknesses created by passwords.

3.  Third-party applications gain overly broad access to the resource
    owner's protected resources, leaving resource owners without any
    ability to restrict duration or access to a limited subset of
    resources.

4.  Resource owners cannot revoke access to an individual third-party
    without revoking access to all third-parties, and must do so by
    changing their password.

5.  Compromise of any third-party application results in compromise of
    the end-user's password and all of the data protected by that
    password.

The protocol centers on a three-legged scenario, delegating user access
to a consumer for resources held by a Service Provider. In many cases, a
two-legged scenario is needed, in which the consumer is acting on behalf
of itself, without a direct or any user involvement.

OAuth was created to solve the problem of sharing two-legged credentials
in three-legged situations. However, within the OAuth context, consumers
might still need to communicate with the Service Provider using requests
that are consumer-specific. Since the consumers already established a
Consumer Key and Consumer Secret, there is value in being able to use
them for requests where the consumer identity is being verified.

#### OAuth 1.0

[This
specification](https://oauth.net/core/1.0/)
defines how 2-legged OAuth works with OAuth 1.0. However it never became
an IETF RFC.

With OAuth 1.0, 2-legged OAuth includes two parties, i.e., the consumer
and the service provider. Basically in this case the consumer also
becomes the resource owner. The consumer first needs to register a
consumer\_key and consumer\_secret with the service provider. To access
a Protected Resource, the consumer sends an HTTP(S) request to the
Service Provider's resource endpoint URI. The request MUST be signed as
defined in OAuth Core 1.0 section 9 with an empty Token Secret.

All the requests to the Protected Resources MUST be signed by the
consumer and verified by the Service Provider. The purpose of signing
requests is to prevent unauthorized parties from using the Consumer Key
when making Protected Resources requests. The signature process encodes
the Consumer Secret into a verifiable value which is included with the
request.

OAuth does not mandate a particular signature method, as each
implementation can have its own unique requirements. The protocol
defines three signature methods: HMAC-SHA1, RSA-SHA1, and PLAINTEXT, but
Service Providers are free to implement and document their own methods.

The consumer declares a signature method in the oauth\_signature\_method
parameter, generates a signature, and stores it in the oauth\_signature
parameter. The Service Provider verifies the signature as specified in
each method. When verifying a consumer signature, the Service Provider
SHOULD check the request to ensure it has not been used in a previous
consumer request.

The signature process MUST NOT change the request parameter names or
values, with the exception of the oauth\_signature parameter.

In 2-legged OAuth with OAuth 1.0, the request to the protected resource
looks like the following:

``` java
http://provider.example.net/profile  
Authorization: OAuth realm="http://provider.example.net/",  
oauth_consumer_key="dpf43f3p2l4k3l03",  
oauth_signature_method="HMAC-SHA1",  
oauth_signature="IxyYZfG2BaKh8JyEGuHCOin%2F4bA%3D",  
oauth_timestamp="1191242096",  
oauth_token="",  
oauth_nonce="kllo9940pd9333jh",  
oauth_version="1.0" 
```

#### OAuth 2.0

[This specification](https://tools.ietf.org/html/rfc6749) defines
OAuth2. OAuth 2.0 defines four roles:

1.  **Resource owner** : An entity capable of granting access to a
    protected resource (e.g. end-user).
2.  **Resource server** : The server hosting the protected resources,
    capable of accepting and responding to protected resource requests
    using access tokens.
3.  **Client** : An application making protected resource requests on
    behalf of the resource owner and with its authorization.
4.  **Authorization server** : The server issuing access tokens to the
    client after successfully authenticating the resource owner and
    obtaining authorization.

In case of 2-legged OAuth, the client becomes the resource owner.

At a very high-level, it is possible to break the full OAuth flow into
two parts.

1.  Get a token from the authorization server.
2.  Use the token to access the resource server.

OAuth 2.0 defines a concept called " **authorization grant** " which is
a credential representing the resource owner's authorization (to access
its protected resources) used by the client to obtain an access token.
This specification defines the following four grant types:

1.  Authorization code
2.  Implicit
3.  Resource owner password credentials
4.  Client credentials

!!! info
      More information about the grant types can found from
      [here](../../learn/oauth-2.0-grant-types).

Client Credentials is the grant type which goes closely with 2-legged
OAuth. With the Client Credentials grant type, the client can request an
access token using only its client credentials (or other supported means
of authentication) when the client is requesting access to the protected
resources under its control. Once the client makes this request to the
authorization server - it will return back an access token to access the
protected resource. The access token returned back to the client could
be either of type bearer of MAC. The "mac" token type defined in
[ietf-oauth-v2-http-mac](http://tools.ietf.org/html/draft-ietf-oauth-v2-http-mac-00)
is utilized by issuing a MAC key together with the access token which is
used to sign certain components of the HTTP requests by the client when
accessing the protected resource. The MAC scheme requires the
establishment of a shared symmetric key between the client and the
server. This is often accomplished through a manual process such as
client registration.

The OAuth 2.0 specification offers two methods for issuing a set of MAC
credentials to the client using the following:

1.  OAuth 2.0 in the form of a MAC-type access token, using any
    supported OAuth grant type.
2.  The HTTP "Set-Cookie" response header field via an extension
    attribute.

When using MAC type access tokens with 2-legged OAuth, the request to
the protected resource looks like the following:

``` java
GET /resource/1?b=1&a=2 HTTP/1.1  
     Host: example.com  
     Authorization: MAC id="h480djs93hd8",  
                        nonce="264095:dj83hs9s",  
                        mac="SLDJd4mg43cjQfElUs3Qub4L6xE="
```

Bearer type is defined
[here](http://tools.ietf.org/html/draft-ietf-oauth-v2-bearer-08). It is
a security token with the property that any party in possession of the
token (a "bearer") can use the token in any way that any other party in
possession of it can. Using a bearer token does not require a bearer to
prove possession of cryptographic key material (proof-of-possession).

When using Bearer type access tokens with 2-legged OAuth, the request to
the protected resource looks like the following.

``` java
GET /resource HTTP/1.1  
   Host: server.example.com  
   Authorization: Bearer vF9dft4qmT
```

Also - the issued access token from the Authorization Server to the
client, has an 'scope' attribute.

!!! info
      2-legged OAuth with OAuth 1.0 does not have this scope attribute as well
      as access token concept - so the resource server has to perform
      authorization separately based on the resource the client is going to
      access.

The client should request access tokens with the minimal scope and
lifetime necessary. The authorization server takes the client identity
into account when choosing how to honor the requested scope and
lifetime, and may issue an access token with less rights than requested.

When securing APIs with OAuth - this 'scope' attribute can be bound to
different APIs. So the authorization server can decide whether to let
the client access this API or not.

??? note "Click here for information about Nonce and Timestamp"

      OAuth *nonce* and *timestamp* together play an important role when it
      comes to OAuth Security depending on how they are being implemented in
      an application. These two help OAuth to be protected from what is called
      a replay-attack - an attack where the same request is resend, maybe over
      and over again.

      The term *nonce* means ‘number used once’. It should be a unique and
      random string that is meant to uniquely identify each signed request.
      This string value is used to associate a Client session with an ID
      Token, and to mitigate replay attacks. In OAuth, the nonce value should
      be sent by the client during implicit flow. Then the value is passed
      through unmodified from the Authentication Request to ID token

      By having a unique identifier for each request, the Service Provider is
      able to prevent requests from being used more than once. When
      implementing this, the Consumer/Client generates a unique string for
      each request sent to the Service Provider. Service Provider keeps track
      of all the nonces used to prevent them from being used a second time.
      Since the nonce value is included in the signature, it cannot be changed
      by an attacker without knowing the shared secret.

      It becomes a problem when Service Provider keeps a persistent storage of
      all nonce values received. To make this practical, timestamp comes to
      play. OAuth adds a timestamp value to each request which allows the
      Service Provider to keep nonce values only for a limited time. When a
      request comes in with a timestamp that is older than the retained time
      frame, it is rejected as the Service Provider no longer has nonces from
      that time period. It is safe to assume that a request sent after the
      allowed time limit is a replay attack. The nonce together with
      timestamp, provides a perpetual unique value that can never be used
      again by an attacker.
