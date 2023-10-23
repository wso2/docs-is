# OpenID Connect Discovery 

## What is OpenID Connect Discovery ?

The main purposes of [**OpenID Connect Discovery**](https://openid.net/specs/openid-connect-discovery-1_0.html) are to,

- [Discover OpenID Provider's issuer location.](#issuer-discovery)
- [Expose OpenID Provider's metadata configurations.](#expose-metadata) 

### Issuer discovery

OpenID Provider issuer discovery refers to the process of determining the location
of the OpenID Provider. Following information is required when making a request to discover the issuer's location.
  
 <table>
 <thead>
 <tr class="header">
 <th>Parameter</th>
 <th>Description</th>
 <th>Sample Value</th>
 </tr>
 </thead>
 <tbody>
 <tr class="odd">
 <td>Resource</td>
 <td>Identifier for the target end user that is the subject of the discovery request.</td>
 <td>acct:admin@localhost</td>
 </tr>
 <tr class="even">
 <td>HostServer</td>
 <td>Where the WebFinger service is hosted.</td>
 <td>localhost</td>
 </tr>
 <tr class="odd">
 <td>rel</td>
 <td>URI identifying the type of service whose location is being requested.</td>
 <td>http://openid.net/specs/connect/1.0/issuer</td>
 </tr>
 </tbody>
 </table>
 
 The following endpoint is responsible for revealing the OpenID Provider's
 issuer after validating the required parameters (Resource, Host and rel). 
 
 ``` https://<SERVER_URL>/.well-known/webfinger```
 
### Expose metadata
 
 The OpenID provider exposes a JSON document listing all the metadata of the server. 
 This document contains standard endpoints and other server supported metadata values. 
 The target audience of this file are the client application developers who send requests to the
 server.
 
 The following endpoint is responsible for exposing the server's metadata.
 
 ```https://<SERVER_URL>/.well-known/openid-configuration```
 
 A sample JSON file that containing the server metadata is shown below.
```
{
        "scopes_supported": [
            "address",
            "phone",
            "email",
            "profile",
            "openid"
        ],
        "check_session_iframe": "https://localhost:9443/oidc/checksession",
        "issuer": "https://localhost:9443/oauth2/token",
        "authorization_endpoint": "https://localhost:9443/oauth2/authorize",
        "claims_supported": [
            "formatted",
            "name",
            "phone_number",
            "given_name",
            "picture",
            "region",
            "street_address",
            "postal_code",
            "zoneinfo",
            "locale",
            "profile",
            "locality",
            "sub",
            "updated_at",
            "email_verified",
            "nickname",
            "middle_name",
            "email",
            "family_name",
            "website",
            "birthdate",
            "address",
            "preferred_username",
            "phone_number_verified",
            "country",
            "gender",
            "iss",
            "acr"
        ],
        "token_endpoint": "https://localhost:9443/oauth2/token",
        "response_types_supported": [
            "id_token token",
            "code",
            "id_token",
            "token"
        ],
        "end_session_endpoint": "https://localhost:9443/oidc/logout",
        "userinfo_endpoint": "https://localhost:9443/oauth2/userinfo",
        "jwks_uri": "https://localhost:9443/oauth2/jwks",
        "subject_types_supported": [
            "pairwise"
        ],
        "id_token_signing_alg_values_supported": [
            "RS256"
        ],
        "registration_endpoint": "https://localhost:9443/identity/connect/register"
    }
```

!!! info "Related topics"
        - [Guide: Discover OpenID Connect Provider]({{base_path}}/guides/login/oidc-discovery)
