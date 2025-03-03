# SAML settings for IdPs
You can find the SAML IdP related settings under **settings** section of the selected SAML IdP.

## Basic settings

- ### Service provider entity ID

    Also known as  issuer. Specifies the entityID of {{ product_name }} which acts as the application. This value will be used as the `<saml2:Issuer>` in the SAML requests initiated from {{ product_name }} to external Identity Provider (IdP). You need to provide a unique value as the service provider entityId.

    It is recommended to use a valid urn (e.g: urn:asgardeo:id) as the entityID.

- ### Identity provider Single Sign-On URL

    Single sign-on URL of the external IdP. This is where {{ product_name }} will send its authentication requests.

- ### Assertion Consumer Service (ACS) URL

    The Assertion Consumer Service (ACS) URL determines where {{ product_name }} expects the external identity provider to send the SAML response.

- ### Identity provider entity ID

    Also known as the issuer of identity provider. This is the `<saml2:Issuer>` value specified in the SAML responses issued by the external IdP.

- ### Identity provider NameID format

    Name ID defines the name identifier formats supported by the external IdP. Name identifier is how {{ product_name }} communicates with external IdP regarding a user.

- ### HTTP protocol binding

    Specifies the mechanisms to transport SAML messages in communication protocols. Bindings define how SAML request-response protocol messages can be exchanged between identity provider and SAML application via HTTP transport.

{{ product_name }} supports below bindings:

- HTTP Post
- HTTP Redirect
- As Per Request

## Single Logout

- ### Accept identity provider logout requests

    Specifies whether single logout request from the IdP must be accepted by {{ product_name }}. By selecting this configuration, {{ product_name }} can process the SAML IdP initiated logout requests and send the back-channel logout requests to the downstream applications.

- ### Identity provider logout enabled

    Specifies whether logout is supported by the external IdP.

- ### IdP logout URL

    Provides the logout endpoint URL of the IdP.

## Request & Response Signing

### Strictly verify authentication response signature info

Specifies if SAML2 authentication response from the external IdP must be signed or not. If this setting is selected, {{ product_name }} will validate the signature in authentication response sent by the external IdP.

### Logout request signing

Specifies if SAML2 logout request to the external IdP from {{ product_name }} must be signed or not.

### Authentication request signing

Specifies if SAML2 authentication request to the external IdP from {{ product_name }} must be signed or not.

### Signature algorithm

Used as the signing algorithm to sign the authentication request and logout request.

### Digest algorithm

Used as the digest algorithm in authentication request and logout request.

## Advanced

### Include protocol binding in the request

Specifies whether the transport mechanism should be included in the small authentication request.

### Find user ID from requests

To specify an attribute from the SAML 2.0 assertion as the user identifier, configure the subject attribute from the attributes section.

### Enable assertion signing

Specifies whether the SAML Assertion element should be signed.

### Additional query parameters

{{ product_name }} supports sending additional information to your SAML external IdP in the form of query params in the login request.

- Fixed query params
- Dynamic query params

  - Query param value sent in the application login request
  - Query param value resolved in a conditional authentication script

You can check below examples when an application developer wants to send _login_hint_ as a query param to external provider.

#### Fixed query params

Here {{ product_name }} sends the fixed query param (e.g: `login_hint`) to the external identity provider in the login request.

- **Sample Query Param:**

    `login_hint=none`

    ![Add fixed query param in enterprise IDP config]({{base_path}}/assets/img/guides/idp/saml-enterprise-idp/queryparam/fixed-query-param.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

#### Dynamic query params

1. Query param value sent in the application login request

    - **Sample Query Param:**

        `login_hint={login_hint_value}`
        <br>

        ![Add dynamic query param in enterprise IDP config]({{base_path}}/assets/img/guides/idp/saml-enterprise-idp/queryparam/dynamic_query_param.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    - If the application does not send the query param `login_hint_value` in the login request, the particular parameterized query param  will not be sent to the external SAML identity provider.

2. Query param value resolved in a conditional authentication script

    - **Sample Query Param:**

        `login_hint=$authparam{login_hint_value}`

        ![Add dynamic query param in enterprise IDP config]({{base_path}}/assets/img/guides/idp/saml-enterprise-idp/queryparam/dynamic_query_param_from_conditional_auth.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        Here _login_hint_value_ needs to be resolved from the conditional auth script.
    <br>  

    - **Sample conditional auth script:**  

        ```js
        // Step 1: username and password authentication  
        // Step 2: SAML enterprise login  
        var onLoginRequest = function(context) {
            executeStep(1, {
                onSuccess: function(context) {
                    // Extracting authenticated user from the first step.
                    var emailAddress = context.steps[1].subject.username;
                    executeStep(2, {
                        authenticatorParams: {
                            common: {
                                'login_hint_value': emailAddress  // This is where we resolve the dynamic query param.
                            }
                        },
                        authenticationOptions: [{
                            idp: 'SAMLIDP' // Name of the SAML IdP.
                        }]
                    }, {});
                },
            });
        };
        ```