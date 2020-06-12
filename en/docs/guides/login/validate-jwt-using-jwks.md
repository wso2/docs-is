# Validate a JWT Based on JWKS

This page guides you through providing the keys of an external Identity Provider in [JWKS](../../../concepts/authentication/jwks)
format which is used for signature verification purposes.

----

## Configure the JWKS endpoint

Follow the below steps to configure JWKS based JWT Validator.

1.  Add the following configurations to
    `           <IS_HOME>/repository/conf/deployment.toml          `
    .

    ``` toml
    [oauth.jwks_endpoint]
    enable= true
    connection_timeout= 1000
    read_timeout= 1000
    size_limit_bytes= 51200
    ```

    You can use customized values for the above HTTP connection
    configurations. If not customized, the default values will be used
    for establishing HTTP connections on IDP's jwks\_uri. Also make sure
    that the `enable` property is set to `           true          ` .

2.  Restart the server.

----

(TODO: dev-portal-fragment)
{!fragments/register-an-identity-provider.md!}

{!fragments/jwks-uri-in-idp.md!}

----

## Invoke the Token API to generate tokens

Follow the instructions below to invoke the token API to generate access
tokens from JWT assertion.

1.  Obtain a JWT assertion from external IDP token endpoint. 

     Make sure to add /token endpoint of the identity server as an audience (aud)
    value in the JWT assertion. 

2.  Now you can access the Token API using a REST client such as cURL.
    For example, the following cURL command generates an access token.
    
    Here the JWT signature will be validated using the external IDP’s
    jwks\_uri.

    ``` xml
    curl -k -d "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=<jwt_assertion>&scope=openid" -H "Authorization: Basic <Base64 encoded consumer key:consumer secret>" -H "Content-Type: application/x-www-form-urlencoded" https://<IS server>/oauth2/token
    ```

    In case of key-rollover at the external IDP, the latest keys will be
    fetched from the jwks endpoint and the JWT signature will be
    validated accordingly with the exact key used to sign the assertion.

----

!!! info "Related Topics"
    - [Concept: JSON Web Key Set](../../../concepts/jwks)
    - [Guide: Obtain Key Set Using JSON Web Key Set](../using-jwks)