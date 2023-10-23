# Validating JWT based on JWKS

This section describes how a JWT can be validated based on JWKS.


### Introduction

Currently, when configuring external identity providers in WSO2 Identity
Server, relevant X.509 public certificate of the Identity provider needs
to be uploaded for signature verification purposes. However, you can
also provide the keys of the identity provider in jwks\_uri format.
The JWKS uri represents the cryptographic keys used by the identity
provider for signing RS256 tokens. We need to have a way to support JWKS
based validation for signatures.

The main benefit of allowing JWKS endpoint configuration is its ability
to handle key rotation by external identity providers. Configuring this
endpoint would enable you to programmatically discover JSON web keys and
allow the third party identity providers to publish new keys without
having the overhead of notifying each and every client application. This
allows smooth key rollover and integration.

Following sequence diagram illustrates the scenario where a JWT obtained
from a third party IDP is validated using the JWKS Based JWT Validator.

![jwks-validation-flow]( ../assets/img/using-wso2-identity-server/jwks-validation-flow.png) 

The steps of the above diagram are explained below:

**Step 1:**

-   User requests a JWT assertion from the Identity Provider.

-   A valid JWT is returned with the response

**Step 2:**

-   The user initiates a token request to WSO2 Server’s token endpoint
    using JWT grant type with the obtained JWT assertion.

-   Access Token Issuer handles all the requests sent to the token
    endpoint.

**Step 3:**

-   Access token issuer invokes the JWT Grant Handler to validate the
    provided JWT assertion.

    Deploys and configures the JWT client-handler artifacts

**Step 4:**

-   JWT Grant Handler invokes the JWKS Based JWT validator to validate
    the JWT signature using IDP’s jwks endpoint.

**Step 5:**

-   JWKS Based JWT validator validates the JWT using IDP’s JWKS

**Step 6:**

-   Upon JWT Grant Validation, Access Token issuer issues a new access
    token to the user.

Here, the retrieved JWKS is cached against the jwks\_uri. When
validating a JWT, we use the 'kid' header parameter which is an
indicator for the key used to sign the JWT at the IDP, and compare it
against the JWKS 'kid' properties. If a matched 'kid' is found among the
key set, the JWT will be validated using the corresponding key. In case
of key roll-over at the IDP, the JWT is signed using the new keys and
hence the matching key is not found in the cached JWKS. When a matching
key is not found, the validator retrieves the latest JWKS from the IDP
JWKS endpoint and obtain the matching key for signature validation.

### Configuring JWKS based JWT validator

Follow the below steps to configure JWKS based JWT Validator.

#### Configuring the JWKS endpoint

1.  Add the following configurations to
    `           <SERVER_HOME>/repository/conf/deployment.toml          `
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
      

#### Configuring the identity provider

Now we need to configure JWKS IdP with as an Identity Provider in IS.

1.  Log in to the management console and select **Add** under **Identity
    Providers** menu in the Main menu.
2.  Provide the following values to configure the IDP:

    Under basic information:

    -   -   Identity Provider Name: Enter an issuer name (iss value in
            the JWT) as the identity provider name.

        -   Alias: Give the Recipient URL configured in the external IDP
            as the alias E.g: <https://localhost:9443/oauth2/token>

        -   Configure jwks\_uri for IS
            -   Under Identity Provider configuration UI select "Use IDP
                JWKS endpoint" option in 'Choose IDP certificate type'
                field.

            -   In the 'Identity Provider's JWKS Endpoint' field, enter
                the jwks\_uri of the Identity Provider. e.g.,
                [https://exampleidp.com/oauth2/default/v1/keys](https://dev-838836.oktapreview.com/oauth2/default/v1/keys)

    ![add-jwt-idp]( ../assets/img/using-wso2-identity-server/add-jwt-idp.png) 

3.  Click **Register** to save the details.

### Invoking the Token API to generate tokens

Follow the instructions below to invoke the token API to generate access
tokens from JWT assertion.

1.  Obtain a JWT assertion from external IDP token endpoint. ( Make sure
    to add /token endpoint of the identity server as an audience( aud )
    value in the JWT assertion)
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
