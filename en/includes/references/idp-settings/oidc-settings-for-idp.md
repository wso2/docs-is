# OIDC settings for IdPs

You can find the OIDC enterprise IdP settings in the **Settings** tab of the selected OIDC enterprise IdP.

## Mandatory settings

Listed below are the mandatory settings.

### Client ID
The client ID that is generated when registering {{ product_name }} as an OIDC application in the external identity provider.

### Client secret
The client secret that is generated when registering {{ product_name }} as an OIDC application in the external identity provider.

### Authorization endpoint URL
The OpenID Connect standard authorization endpoint URL of the external identity provider.

### Token endpoint URL
The OpenID Connect standard token endpoint URL of the external identity provider.

### Authorized redirect URL
This is where the user needs to be redirected after completing authentication at the external identity provider. The identity provider needs to send the authorization code to this URL upon successful authentication.

You should configure `{{ product_url_format }}/commonauth` as the redirect URL/callback URL when you register {{ product_name }} as an OIDC application in the external IdP.

## Additional settings

Listed below are additional settings.

### User info endpoint URL

The OpenID Connect standard userinfo endpoint <!-- [OpenID Connect standard userinfo endpoint](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo)--> of the external identity provider. If this URL is not given, user attributes are taken from the ID token of the token response received from the external IdP.

### Logout URL
The [OpenID Connect standard logout endpoint](https://openid.net/specs/openid-connect-rpinitiated-1_0.html#Terminology){:target="_blank"} of the external identity provider. If this URL is given, {{ product_name }} sends logout requests to the external IdP when a user logs out from the connected application.

### Scopes
This is a list of case-sensitive OpenID Connect scopes that needs to be requested from the OIDC external IdP. See the [OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims){:target="_blank"} for more information about what scopes can be configured here.

### Additional query parameters

{{ product_name }} supports sending additional information to your OIDC external IdP in the form of query params in the login request.

- Fixed query params
- Dynamic query params
  
    - Query param value sent in the application login request
    - Query param value resolved in a conditional authentication script

You can check below examples when an application developer wants to send _login_hint_ as a query param to external provider.

#### Fixed query params
Here {{ product_name }} sends the fixed query param to the external identity provider in the login request.

- **Sample Query Param:**

    `login_hint=none`

    ![Add fixed query param in enterprise IDP config]({{base_path}}/assets/img/guides/idp/oidc-enterprise-idp/queryparam/fixed-query-param.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

#### Dynamic query params

1. Query param value sent in the application login request

    - **Sample Query Param:**

        `login_hint=${login_hint_value}`

        ![Add dynamic query param in enterprise IDP config]({{base_path}}/assets/img/guides/idp/oidc-enterprise-idp/queryparam/dynamic_query_param_from_app.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        You can see a sample OIDC request from an application below.

        ```
        {{ product_url_sample }}/oauth2/authorize?scope=openid&response_type=code&redirect_uri=<redirect_uri>&client_id=<client_id>&login_hint_value=user@gmail.com
        ```


    - If the application does not send the query param in the login request, the particular parameterized query param will not be sent to the external OIDC identity provider.

2. Query param value resolved in a conditional authentication script

    - **Sample Query Param:**

        `login_hint=$authparam{login_hint_value}`

        ![Add dynamic query param in enterprise IDP config]({{base_path}}/assets/img/guides/idp/oidc-enterprise-idp/queryparam/dynamic_query_param_from_conditional_auth.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    Here _login_hint_value_ needs to be resolved from the conditional auth script.
    <br>  

    - **Sample conditional auth script:**  

        ```js
        // Step 1: username and password authentication  
        // Step 2: OIDC enterprise login  
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
                            idp: 'OIDC enterprise IDP' // Name of the OIDC idp.
                        }]
                    }, {});
                },
            });
        };
        ```
        <br>

## Enable PKCE
Specifies that PKCE should be used for client authentication.

### Enable HTTP basic auth for client authentication
Specify whether to enable HTTP basic authentication for the token request. Otherwise, client credentials are sent in the request body instead of the HTTP header.
