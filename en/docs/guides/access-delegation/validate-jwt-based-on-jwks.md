# Validating a JWT Based on JWKS

This page describes how a JWT can be validated based on [JWKS](../../../concepts/login/jwks).

----

## Configure the JWKS endpoint

Follow the steps below to configure a JWKS-based JWT Validator.

1.  Add the following configurations to `<IS_HOME>/repository/conf/deployment.toml`.

    ``` toml
    [oauth.jwks_endpoint]
    enable= true
    connection_timeout= 1000
    read_timeout= 1000
    size_limit_bytes= 51200
    ```

    You can use customized values for the above HTTP connection configurations. 
    
    If not customized, the default values will be used for establishing HTTP connections on IDP's jwks\_uri. Also, ensure that the `enable` property is set to `true`.

2.  Restart the server.  
      

----

{!fragments/register-an-identity-provider.md!}

----

## Configure the identity provider

Next, configure the JWKS identity provider as an identity provider in WSO2 IS.

Provide the following values to configure the IDP:

-  **Identity Provider Name**: Enter an issuer name (`iss` value in the JWT) as the identity provider name.

-  **Alias**: Enter the Recipient URL configured in the external IDP e.g., `<https://localhost:9443/oauth2/token>`. 

-  **Choose IDP certificate type**: Select `Use IDP JWKS endpoint`.

-  **Identity Provider's JWKS Endpoint**: Enter the jwks\_uri of the Identity Provider e.g.,[https://exampleidp.com/oauth2/default/v1/keys](https://dev-838836.oktapreview.com/oauth2/default/v1/keys)

![add-jwt-idp]( ../../assets/img/guides/add-jwt-idp.png) 

----

## Invoke the Token API to generate tokens

Follow the instructions below to invoke the token API to generate access tokens from the JWT assertion.

1.  Obtain a JWT assertion from an external IDP token endpoint. 

    Make sure to add the token endpoint of the identity server as an audience( `aud ` value in the JWT assertion).

2.  You can now access the Token API using a REST client such as cURL.

    For example, the following cURL command generates an access token.
    Here, the JWT signature will be validated using the external IDP’s
    jwks\_uri.

    ``` 
    curl -k -d "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=<jwt_assertion>&scope=openid" -H "Authorization: Basic <Base64 encoded consumer key:consumer secret>" -H "Content-Type: application/x-www-form-urlencoded" https://<IS server>/oauth2/token
    ```

    In case of key-rollover at the external IDP, the latest keys will be fetched from the jwks endpoint and the JWT signature will be
    validated accordingly with the exact key used to sign the assertion.
