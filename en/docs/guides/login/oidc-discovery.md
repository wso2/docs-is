# Discover OpenID Connect Provider

This page guides you through using [OpenID Connect Discovery]({{base_path}}/references/concepts/authentication/discovery) to discover an end user's OpenID provider, and to obtain information required to interact with the OpenID provider, including its OAuth 2.0 endpoint locations. 

You can use this OIDC Discovery document to automatically configure applications. The OpenID Connect discovery endpoint is as follows:

```
https://localhost:9443/oauth2/oidcdiscovery
```

-----

## OpenID Provider issuer discovery

OpenID Provider Issuer discovery refers to the process of determining the location of the OpenID Provider.

To move the OpenID Provider configuration information to `https://<HOST>:<PORT>/oauth2/token/.well-known/openid-configuration`, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file.
    
``` java
[oauth.endpoints]
oidc_discovery_url= "${carbon.protocol}://${carbon.host}:${carbon.management.port}/oauth2/token"
```

----

## Configure the OpenID Provider issuer location

In WSO2 Identity Server, the resident IdP Entity ID for OpenID Connect can be configured as the OpenID Provider Issuer location. 

1.  Log in to the management console.

2.  Click **Identity Providers > Resident**. 

3.  Expand **Inbound Authentication Configuration** section and then **OAuth2/OpenID Connect Configuration**.

4.  Enter a valid OpenID Provider issuer location as the **Identity Provider Entity Id** value.  

    ![idp-entity-id]( {{base_path}}/assets/img/guides/idp-entity-id.png) 

    !!! Tip
        A valid OpenID Provider Issuer location in WSO2 Identity Server has the following format.

        ``` java
        {host}/oauth2/{issuer}
        ```

	    -   **{host}:** The host number of WSO2 Identity Server (e.g.,https://localhost:9443)

	    -   **{issuer}:** The issuer path component. This value can be either `token` or `oidcdiscovery`.

	    -   **Sample OpenID Provider Issuer location:** `https://localhost:9443/oauth2/token`

----

## Obtain OpenID Provider issuer location

Once the issuer location has been configured, you can send a request to the endpoint to obtain the configured OpenID Provider issuer location.
The following information is required to make a request.

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
<td>acct:admin@localhost (for super tenant)<br />
acct:admin@ wso2.com@localhost (for tenant)</td>
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

Sample requests and responses are given below.

**Super tenant**

!!! abstract ""
    **Request**
    ```
    curl -v -k https://localhost:9443/.well-known/webfinger?resource='acct:admin@localhost&rel=http://openid.net/specs/connect/1.0/issuer'
    ```
    ---
    **Response**
    ```
    {
      "subject": "acct:admin@localhost",
      "links": [
         {
            "rel": "http://openid.net/specs/connect/1.0/issuer",
            "href": "https://localhost:9443/oauth2/token"
         }
      ]
    }
    ```

**Tenant-specific**

The following sample request is for a tenant called as `wso2.com`.

!!! abstract ""
    **Request**
    ```
    curl -v -k https://localhost:9443/.well-known/webfinger?resource='acct:admin%40wso2.com@localhost&rel=http://openid.net/specs/connect/1.0/issuer'
    ```
    **Response**
    ```
    {
    "subject": "acct:admin@wso2.com@localhost",
    "links": [
        {
            "rel": "http://openid.net/specs/connect/1.0/issuer",
            "href": "https://localhost:9443/t/wso2.com/oauth2/token"
        }
    ]
    }
    ```

----

## Obtain OpenID Provider configuration information

Follow the steps below to obtain configuration details of the OpenID Provider.

1.  Once you receive the response as shown in the sample response of the previous section, append `/.well-known/openid-configuration` to the href value that you received in the previous step.

    ``` java
    https://localhost:9443/oauth2/token/.well-known/openid-configuration
    ```

2.  Send a request to the endpoint as shown below.

    !!! abstract ""
        **Request**
        ```
        curl -v -k https://localhost:9443/oauth2/token/.well-known/openid-configuration
        ```
        ---
        **Response**
        ```
        {
            "request_parameter_supported":true,
            "claims_parameter_supported":true,
            "introspection_endpoint":"https://localhost:9443/oauth2/introspect",
            "Response_modes_supported":[
                "query",
                "fragment",
                "form_post"
            ],
            "scopes_supported":[
                "address",
                "phone",
                "openid",
                "profile",
                "email"
            ],
            "check_session_iframe":"https://localhost:9443/oidc/checksession",
            "backchannel_logout_supported":true,
            "issuer":"https://localhost:9443/oauth2/token",
            "authorization_endpoint":"https://localhost:9443/oauth2/authorize",
            "introspection_endpoint_auth_methods_supported":[
                "client_secret_basic",
                "client_secret_post"
            ],
            "claims_supported":[
                "zoneinfo",
                "profile",
                "phone_number_verified",
                "picture",
                "postal_code",
                "name",
                "groups",
                "locale",
                "address",
                "preferred_username",
                "middle_name",
                "street_address",
                "country",
                "website",
                "phone_number",
                "formatted",
                "gender",
                "sub",
                "nickname",
                "email",
                "upn",
                "birthdate",
                "given_name",
                "updated_at",
                "locality",
                "region",
                "email_verified",
                "family_name",
                "iss",
                "acr"
            ],
            "userinfo_signing_alg_values_supported":[
                "RS256"
            ],
            "token_endpoint_auth_methods_supported":[
                "client_secret_basic",
                "client_secret_post"
            ],
            "response_modes_supported":[
                "query",
                "fragment",
                "form_post"
            ],
            "backchannel_logout_session_supported":true,
            "token_endpoint":"https://localhost:9443/oauth2/token",
            "response_types_supported":[
                "id_token token",
                "code",
                "code id_token token",
                "code id_token",
                "id_token",
                "code token",
                "none",
                "token"
            ],
            "revocation_endpoint_auth_methods_supported":[
                "client_secret_basic",
                "client_secret_post"
            ],
            "grant_types_supported":[
                "refresh_token",
                "urn:ietf:params:oauth:grant-type:saml2-bearer",
                "password",
                "client_credentials",
                "iwa:ntlm",
                "authorization_code",
                "urn:ietf:params:oauth:grant-type:uma-ticket",
                "account_switch",
                "urn:ietf:params:oauth:grant-type:jwt-bearer"
            ],
            "end_session_endpoint":"https://localhost:9443/oidc/logout",
            "revocation_endpoint":"https://localhost:9443/oauth2/revoke",
            "userinfo_endpoint":"https://localhost:9443/oauth2/userinfo",
            "code_challenge_methods_supported":[
                "S256",
                "plain"
            ],
            "jwks_uri":"https://localhost:9443/oauth2/jwks",
            "subject_types_supported":[
                "public"
            ],
            "id_token_signing_alg_values_supported":[
                "RS256"
            ],
            "registration_endpoint":"https://localhost:9443/api/identity/oauth2/dcr/v1.1/register",
            "request_object_signing_alg_values_supported":[
                "RS256",
                "RS384",
                "RS512",
                "PS256",
                "none"
            ]
        }
        ```


!!! info "Related topics"
    - [Concept: OpenID Connect Discovery]({{base_path}}/references/concepts/authentication/discovery)
    - [Guide: Authorization Code Grant]({{base_path}}/guides/access-delegation/auth-code-playground)
    - [Guide: Enable Login for an OpenID Connect Web Application]({{base_path}}/guides/login/webapp-oidc)
