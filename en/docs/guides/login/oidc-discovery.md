## Discover OpenID Connect provider

This page guides you through using [OpenID Connect Discovery](../../../concepts/authentication/discovery) to discover an end user's OpenID provider, and to obtain information required to interact with the OpenID provider, including its OAuth 2.0 endpoint locations. 

You can use this OIDC Discovery document to automatically configure applications. The OpenID Connect discovery endpoint is as follows:

```
https://localhost:9443/.well-known/oidcdiscovery
```

-----

## OpenID Provider issuer discovery

OpenID Provider Issuer discovery refers to the process of determining the location of the OpenID Provider.

In WSO2 Identity Server, the default OpenID Provider Issuer location path is set to `oidcdiscovery/.well-known/openid-configuration` .
To move the OpenID provider issuer location path to the root `<issuer>/.well-known/openid-configuration`, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file.
    
``` java
[oauth.endpoints]
oidc_discovery_url= "${carbon.protocol}://${carbon.host}:${carbon.management.port}/oauth2/token</"
```

----

(TODO: dev-portal-content)

## Configure the OpenID Provider issuer location

In WSO2 Identity Server, the resident IdP Entity ID for OpenID Connect can be configured as the OpenID Provider Issuer location. 

1.  Add the following property to the `deployment.toml` file found in the `<IS_HOME>/repository/conf/` folder.

    ``` java
    [oauth]
    use_entityid_as_issuer_in_oidc_discovery= "true"
    ```

    !!! warning
        In future releases, the Entity ID will be used as the OpenID
        Provider Issuer location by default and will not need to be enabled
        manually using the property mentioned above. Therefore, the
        `            use_entityid_as_issuer_in_oidc_discovery           `
        property will be deprecated in the next release.
    

2.  Log in to the management console.

3.  Click **Identity Providers > Resident**. 

4.  Expand **Inbound Authentication Configuration** section and then **OAuth2/OpenID Connect Configuration**.

5.  Enter a valid OpenID Provider issuer location as the **Identity Provider Entity Id** value.  

    ![idp-entity-id]( ../../assets/img/guides/idp-entity-id.png) 

    A valid OpenID Provider Issuer location in WSO2 Identity Server has
    the following format.

    **OpenID Provider Issuer URL format**

    ``` java
    {Host}/oauth2/{issuer}
    ```

-   **{Host}:** The host number of WSO2 Identity Server (e.g.,https://localhost:9443)

-   **{issuer}:** The issuer path component. This value can be either `token` or `oidcdiscovery`.

-   **Sample OpenID Provider Issuer location:** <https://localhost:9443/oauth2/token>

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

By default, all endpoints in the WSO2 Identity Server are secured with basic authentication. You will need authentication details to call an
endpoint. 

By default, you can use admin credentials, or an access token for the request. For more information on how to obtain an access token, see [OpenID Connect Grant Types](../../access-delegation/oidc-grant-types).

Sample requests and responses are given below.

**Super tenant**

```tab="Request"
curl -v -k --user admin:admin https://localhost:9443/.well-known/webfinger?resource='acct:admin@localhost&rel=http://openid.net/specs/connect/1.0/issuer'
```

```tab="Response"
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

```tab="Request"
curl -v -k --user admin:admin https://localhost:9443/.well-known/webfinger?resource='acct:admin%40wso2.com@localhost&rel=http://openid.net/specs/connect/1.0/issuer'
```

```tab="Response"
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

1.  Once you receive the response as shown in the sample response of the previous section, append `/.well-known/openid-configuration` to the href value that you received.

    ``` java
    https://localhost:9443/oauth2/token/.well-known/openid-configuration
    ```

2.  Send a request to the endpoint as shown below.

    ```tab="Request"
    curl -v -k --user admin:admin https://localhost:9443/oauth2/token/.well-known/openid-configuration
    ```
    
    ```tab="Response"
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

-----

!!! info "Related Topics"
    - [Concept: OpenID Connect Discovery](../../../concepts/authentication/discovery)
    - [Guide: OpenID Connect Grant Types](../../access-delegation/oidc-grant-types)
    - [Guide: Enable Login for an OpenID Connect Web Application](../webapp-oidc)