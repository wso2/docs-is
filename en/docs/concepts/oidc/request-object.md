# Request Object

#### Purpose of Request Object in OpenID Connect

This enables sending authentication request parameters in a
self-contained JWT instead of plain request parameters. Request Object
can be specified to the authorization server either by *value* or by
*reference* .

- [**Request Object by Value**](#request-object-by-value) (as ***request*** parameter)

 The request authorization request parameter enables OpenID Connect
 requests to be passed in a single, self-contained parameter and has
 to be optionally signed and/or encrypted. It represents the request
 as a JWT whose claims are the request parameters. This JWT is called
 a **Request Object.**

- **Request Object by Reference** (as ***request\_uri*** parameter )

 The request\_uri authorization request parameter enables OpenID
 Connect requests to be passed by reference, rather than by value.
 This parameter is used identically to the request parameter, other
 than that the Request Object value is retrieved from the resource at
 the specified URL.

!!! note
    WSO2 Identity Server does not support passing Request Object
    by Reference. However, an extension point is provided which can be
    extended to provide support for understanding Request Object from
    reference URI specified by request\_uri.
 

#### Request Object by Value

As mentioned above, the main purpose of this parameter is for supporting
to request some claims other than the default Userinfo and IdToken claim
set which is associated with the requested scope. Now, let us consider
the following sample request that contains a JWT as the ***request***
parameter value.

``` java
 https://localhost:9443/oauth2/authorize?
 response_type=code%20id_token
 &client_id=s6BhdRkqt3
 &redirect_uri=https%3A%2F%2Fclient.example.org%2Fcb
 &scope=openid
 &state=af0ifjsldkj
 &nonce=n-0S6_WzA2Mj
 &request=eyJhbGciOiJSUzI1NiIsImtpZCI6ImsyYmRjIn0.ew0KICJpc3MiOiA
 iczZCaGRSa3F0MyIsDQogImF1ZCI6ICJodHRwczovL3NlcnZlci5leGFtcGxlLmN
 vbSIsDQogInJlc3BvbnNlX3R5cGUiOiAiY29kZSBpZF90b2tlbiIsDQogImNsaWV
 udF9pZCI6ICJzNkJoZFJrcXQzIiwNCiAicmVkaXJlY3RfdXJpIjogImh0dHBzOi8
 vY2xpZW50LmV4YW1wbGUub3JnL2NiIiwNCiAic2NvcGUiOiAib3BlbmlkIiwNCiA
 ic3RhdGUiOiAiYWYwaWZqc2xka2oiLA0KICJub25jZSI6ICJuLTBTNl9XekEyTWo
 iLA0KICJtYXhfYWdlIjogODY0MDAsDQogImNsYWltcyI6IA0KICB7DQogICAidXN
 lcmluZm8iOiANCiAgICB7DQogICAgICJnaXZlbl9uYW1lIjogeyJlc3NlbnRpYWw
 iOiB0cnVlfSwNCiAgICAgIm5pY2tuYW1lIjogbnVsbCwNCiAgICAgImVtYWlsIjo
 geyJlc3NlbnRpYWwiOiB0cnVlfSwNCiAgICAgImVtYWlsX3ZlcmlmaWVkIjogeyJ
 lc3NlbnRpYWwiOiB0cnVlfSwNCiAgICAgInBpY3R1cmUiOiBudWxsDQogICAgfSw
 NCiAgICJpZF90b2tlbiI6IA0KICAgIHsNCiAgICAgImdlbmRlciI6IG51bGwsDQo
 gICAgICJiaXJ0aGRhdGUiOiB7ImVzc2VudGlhbCI6IHRydWV9LA0KICAgICAiYWN
 yIjogeyJ2YWx1ZXMiOiBbInVybjptYWNlOmluY29tbW9uOmlhcDpzaWx2ZXIiXX0
 NCiAgICB9DQogIH0NCn0.nwwnNsk1-ZkbmnvsF6zTHm8CHERFMGQPhos-EJcaH4H
 h-sMgk8ePrGhw_trPYs8KQxsn6R9Emo_wHwajyFKzuMXZFSZ3p6Mb8dkxtVyjoy2
 GIzvuJT_u7PkY2t8QU9hjBcHs68PkgjDVTrG1uRTx0GxFbuPbj96tVuj11pTnmFC
 UR6IEOXKYr7iGOCRB3btfJhM0_AKQUfqKnRlrRscc8Kol-cSLWoYE9l5QqholImz
 jT_cMnNIznW9E7CDyWXTsO70xnB4SkG6pXfLSjLLlxmPGiyon_-Te111V8uE83Il
 zCYIb_NMXvtTIVc1jpspnTSD7xMbpL-2QgwUsAlMGzw
```

The payload of the above sample Request Object is as follows:

``` java
{ 
   "iss":"s6BhdRkqt3",
   "aud":"https://server.example.com",
   "response_type":"code id_token",
   "client_id":"s6BhdRkqt3",
   "redirect_uri":"https://client.example.org/cb",
   "scope":"openid",
   "state":"af0ifjsldkj",
   "nonce":"n-0S6_WzA2Mj",
   "max_age":86400,
   "claims":{ 
      "userinfo":{ 
         "given_name":{ 
            "essential":true
         },
         "nickname":null,
         "email":{ 
            "essential":true
         },
         "email_verified":{ 
            "essential":true
         },
         "picture":null
      },
      "id_token":{ 
         "gender":null,
         "birthdate":{ 
            "essential":true
         },
         "acr":{ 
            "values":[ 
               "urn:mace:incommon:iap:silver"
            ]
         }
      }
   }
}
```

If the above request is sent, it requests some claims from both the
members **userinfo** endpoint and **id\_token**. For example, '
*given\_name'* and *'email'* are marked as essential claims from *user
info* endpoint and *'brithdate'* is requested as an essential claim from
*id token* .

Usually, in OpenID Connect, the returning claims will be filtered from
the requested scopes that are passed to the server as a query parameter
with the authorization request. When it comes to WSO2 Identity Server,
it filters the requested claims both from the requested scopes defined
with the authorization request and the requested claims that can be
configured in service provider configurations. But if the Request Object
is associated with the authorization request, the server returns the
essential request object claims in the response of **userinfo** endpoint
and **id\_token** accordingly.

 
The following validations is done on the server side.

1. The *client\_id* and *response\_type* of the request object (if
 present) should be equal to the *client\_id* and the
 *response\_type* of the authorization request.
2. The authorization request query parameters will be overridden from
 the *Request Object* values if they are present in the *Request
 Object.*
3. Both the *request* and *request\_uri* parameters cannot be
 associated with the same authorization request.
4. Even if a scope parameter is present in the Request Object value, a
 scope parameter MUST always be passed using the OAuth 2.0 request
 syntax containing the openid scope value to indicate the underlying
 OAuth 2.0 logic that this is an OpenID Connect request. (For further
 validation information, refer [OIDC
 specification](http://openid.net/specs/openid-connect-core-1_0.html#JWTRequests)
 ) 
 

The Identity Server will respond to the above sample request as follows:

1. Here the requested scope is considered as 'openid email' as the
 scope value of the request object is declared. So the server will
 ignore the scope value which is associated with the authorization
 request and considers the requested scope as 'openid email'
2. It considers the claims "given\_name" and "email" which are marked
 as 'essential:true' for 'userinfo' member. Even if they are not
 mapped with the openid or address scope in the registry, if these
 claims are requested claims, then 'given\_name' and 'email' will be
 returned from the Userinfo endpoint. In a nutshell, the claims which
 are marked as 'essential: true' only get controlled by the requested
 claims and ignore the requested scopes. If the server cannot provide
 those essential claims, there will not be any failure or error
 message returning from the server.
3. The claims like "nickname" it will act as a default claim and will
 be controlled by both requested scopes and the requested claims.
4. If the server cannot provide the requested essential claims, the
 server will return null for the specific claim and the flow will not
 break.

!!! note
    This behavior is common to the id token as well.

#### Signature Validation

Request Object may be signed or unsigned (plaintext). When it is
plaintext, this is indicated by use of the non-algorithm \[JWA\]. If the
Request Object is signed, the server will extract the certificate by the
*client\_id* . When registering the Auth application in the Identity
Server, we need to provide the corresponding public certificate of the
Request Object signing party. As of now, the Identity Server only
supports *RSA* signature algorithms only. If the header does not contain
valid signature algorithm, the server will reject the signature
validation. Based on the certificate value, it will generate the public
key and validate the signature using the
[nimbus](https://connect2id.com/products/nimbus-jose-jwt) library.

#### Decryption

The request parameter value can be even a JWE. If it is a JWE, it will
consist of five parts which are separated by four '.'  characters which
are JOSE header, JWE encrypted key, Initialization vector, Ciphertext,
and Authentication tag. The values of these five sections can be seen by
doing a base64 encoding. JOSE header consists of 'alg' and 'enc' values.
An algorithm defined in 'enc' is used to do the content encryption while
the algorithm defined in the 'alg' is used to do the key wrapping. Here,
the nimbus library is used for the decryption by providing the Identity
Server's private key. 
 
If the Request Object is a nested JWT, which is signed and encrypted,
then the payload (Cipher Text) of the Request Object is a signed JWT. So
the server will decrypt the JWE first and then check the payload for
signature validation.

 