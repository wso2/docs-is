# Introduction to ID Token

### ID Token
ID Token is a security token that contains claims about the authentication of an end-user by an *Authorization Server*
which is introduced with [OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html#IDToken).
This token represents as a JWT (Json Web Kit) and contains user claims to identify who the user is and it contains a unique 
identifier that is represented in the ‘sub’ claim. The ID Token is issued from the authorization server and the audience
of the ID Token is the client application. The client application will validate the ID Token based on the signature value
and can interpret the value of the ID Token. To secure the ID Tokens the token should be signed and it can be also encrypted.

There are two main usage of the id token.

1. To exchange with the access token.

2. To obtain the user information and pass it to external applications if required.



### Sample ID Tokens

1. Unsigned ID Token

Following is a sample of *Unsigned ID Token* which has two parts separated from a `.` in the format of 
`<header>.<body>.`

```
eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhbGljZSIsImlzcyI6Imh0dHBzOlwvXC9jMmlkLmNvbSIsImlhdCI6MTQxNjE1ODU0MX0
```


2. Signed ID Token

*Signed ID Token* which is signed by the OpenID Provider(OP), has three parts separated from `.` in the format of `<header>.<body>.<signature>`.

```
eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGljZSIsImlzcyI6Imh0dHBzOlwvXC9jMmlkLmNvbSIsImlhdCI6MTQxNjE1ODU0MX0.iTf0eDBF-6-OlJwBNxCK3nqTUjwC71-KpqXVr21tlIQq4_ncoPODQxuxfzIEwl3Ko_Mkt030zJs-d36J4UCxVSU21hlMOscNbuVIgdnyWhVYzh_-v2SZGfye9GxAhKOWL-_xoZQCRF9fZ1j3dWleRqIcPBFHVeFseD_64PNemyg
```

After decoding the header value `eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9`  of the ID Token it looks as follows.

```
{"typ":"JWT",
"alg":"HS256"}
```
This header section can contain any parameter described in the [spec](https://tools.ietf.org/html/rfc7515#section-4.1).

After decoding the payload value of the ID Token looks as follows.  The Payload can be an arbitrary sequence of octets, representing user attributes.

```
{
  "sub": "alice",
  "iss": "https://c2id.com",
  "iat": 1416158541
}
```

### Things to consider when issuing an ID Token
1. **Not** to add any sensitive data to the token payload.
2. To have a finite and short expiry time.
3. Sign/encrypt the JWT properly and validate it from the client side.
4. To include any additional optional parameters based on the use case.
