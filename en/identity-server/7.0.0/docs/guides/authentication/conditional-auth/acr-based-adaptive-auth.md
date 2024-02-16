# Configure ACR-based adaptive authentication

Authentication Context Class Reference (ACR) is an optional parameter that is used in SAML and OpenID Connect (OIDC) requests. This parameter enables applications to send additional information to the identity provider regarding the required level of assurance. Developers can then define authentication steps required for a given ACR value using an adaptive authentication script in the {{product_name}}.

## Scenario

Let's look at a scenario where you want to dynamically adjust the authentication flow based on the authentication context value received in the authentication request.

For example, imagine a financial institution that wants to send ACR values in the authentication request based on activities.

- For a high value transaction, the application may request for an ACR value of `ACR2` from the identity provider which generally include a stronger authentication mechanism.

- For a balance inquiry, the application may request for an ACR value of `ACR1` from the identity provider which generally include a basic authentication mechanism.


The guides below explain how you can leverage an adaptive authentication script in {{product_name}} to achieve this.

## Prerequisites

 You need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use the [playground2](https://github.com/wso2/samples-is/releases/download/v4.5.5/playground2.war) sample application to test ACR-based adaptive authentication.

## Request ACR from applications

Follow the sections below to learn how you can request ACR parameters from either an OIDC or a SAML application.

??? details "Some commonly accepted ACR values"
    Eventhough ACR values and their interpretations are not defined by a set specification, the following are some commonly accepted ACR values.

    |Authentication Method| Authentication Context Class URI|
    |-----------------------|--------------------------------|
    |Username/Password|  `urn:oasis:names:tc:SAML:2.0:ac:classes:Password` |
    | Password Protected Transport | `urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport` |
    | Transport Layer Security (TLS) Client | `urn:oasis:names:tc:SAML:2.0:ac:classes:TLSClient` |
    | X.509 Certificate | `urn:oasis:names:tc:SAML:2.0:ac:classes:X509` |
    | Integrated Windows Authentication | `urn:federation:authentication:windows` |
    | Kerberos | `urn:oasis:names:tc:SAML:2.0:classes:Kerberos` |

    Developers have the flexibility of defining custom ACR values and their meanings to fit business requirements.


### From an OIDC application

`acr_values` is an optional parameter that can be included in an OIDC authentication request. This parameter may include the necessary context class URIs. If there are multiple ACR values they can be included separated by commas.

Shown below is an example authentication request including the optional `acr_values` parameter.

=== "Format"

    ```http
    https://localhost:9443/oauth2/authorize?
    scope={scope}
    &acr_values={acr_value1} {acr_value2}
    &response_type={response_type}
    &redirect_uri={redirect_uri}
    &client_id={client_id}
    ```
=== "Sample request"

    ```http
    https://localhost:9443/oauth2/authorize?
    scope=openid
    &acr_values=urn:federation:authentication:windows pwd LOA2
    &response_type=code
    &redirect_uri=http://localhost:8080/playground2/oauth2client
    &client_id=EUVvhKM28RkwTQL9A52kqXnfCj8a
    ```

### From a SAML application

To receive ACR values from a SAML application, developers can add the following to the SAML SSO request when initiating the SAML SSO flow.

```http
<samlp:RequestedAuthnContext Comparison="exact">
    <saml:AuthnContextClassRef>urn:federation:authentication:windows</saml:AuthnContextClassRef>
    <saml:AuthnContextClassRef>pwd</saml:AuthnContextClassRef>
    <saml:AuthnContextClassRef>LOA2</saml:AuthnContextClassRef>
</samlp:RequestedAuthnContext>
```

!!! warning
    WSO2 Identity Server authentication script does not support the `Comparison` attribute in the `RequestedAuthnContext` element due to the following reasons:

    - OAuth2 does not support similar functionality.

    - {{product_name}} provides more flexibility to enforce ACR through adaptive authentication scripts. A client sending an `exact`, `minimum`, `maximum`, or `better` comparison may not be as effective.

## Configure the login flow

The steps below explain how you can set up an ACR-based conditional authentication script to define the necessary logic for the received ACR values.

1. On the {{product_name}} Console, click **Applications**.

2. Select the relevant application and go to its **Sign-in Method** tab.

3. Add ACR-based adaptive MFA using your preferred editor:

    ---
    === "Classic Editor"
        To add ACR-based adaptive MFA using the classic editor:

        1. Click **Start with default configuration** to define the login flow starting with the `username and password` login.

        2. Turn on **Conditional Authentication** by switching the toggle on.

        3. Select the **Adaptive MFA** > **ACR-Based** template.

    === "Visual Editor"
        To add ACR-based adaptive MFA using the visual editor:

        1. Switch to the **Visual Editor** tab, and expand **Predefined Flows** > **Conditional Login Flows**.

        2. Under **Adaptive MFA**, click **+ ADD** next to **ACR-Based** to add the ACR-based adaptive MFA script.

            ![Role-based adaptive MFA with visual editor]({{base_path}}/assets/img/guides/conditional-auth/acr-based-adaptive-auth-with-visual-editor.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        3. Click **Confirm** on the prompt to replace any existing script with the current script.

    ---

4. Verify that the login flow is now updated. For the sample application, we'll have the following three authentication steps:

    - Step 1: Username and Password
    - Step 2: TOTP authenticator
    - Step 3: Passkey authenticator

6. Click **Update** to confirm.

## How it works

Shown below is the default script for ACR-based conditional authentication.

```js
// Define conditional authentication by passing one or many Authentication Context Class References 
// as comma separated values.

// Specify the ordered list of ACR here.
var supportedAcrValues = ['acr1', 'acr2', 'acr3'];

var onLoginRequest = function(context) {
    var selectedAcr = selectAcrFrom(context, supportedAcrValues);
    Log.info('--------------- ACR selected: ' + selectedAcr);
    context.selectedAcr = selectedAcr;
    switch (selectedAcr) {
        case supportedAcrValues[0] :
            executeStep(1);
            break;
        case supportedAcrValues[1] :
            executeStep(1);
            executeStep(2);
            break;
        case supportedAcrValues[2] :
            executeStep(1);
            executeStep(3);
            break;
        default :
            executeStep(1);
            executeStep(2);
            executeStep(3);
    }
};
```

!!! info "Access ACR Values from the authentication script"

    The authentiaction script is protocol-agnostic, i.e. it works for both OIDC and SAML SSO requests.

    - For OIDC requests the `acr_values` parameter is available as `context.requestedAcr`.
    
    - For SAML SSO requests, the list of `samlp:AuthnContextClassRef` is available as `context.requestedAcr`.

    You can also assign any string value that is returned in the authentication response, using `context.selectedAcr`.

    The following example explains this.

    ```js
    var acr_values = context.requestedAcr; //Assigns the list of ACR values returned from the application to an array.
    context.selectedAcr="LOA1";  //Sets the ACR value to be returned in the response.
    ```

Let's look at how this script works.

1. The ordered list, `supportedAcrValues`, contains comma separated ACR values accepted from the application.
2. The `selectAcrFrom` function dynamically and adaptively determines the strongest ACR value from the received and configured ACR values.
3. `context.selectedAcr` sets the selected ACR value to be returned in the authentication response.
4. Based on the selected ACR value, authentication level is determined in the `switch` cases. In this case,
    - `acr1` - step 1 (basic authentication)
    - `acr2` - step 1 and 2 (basic authentication and TOTP)
    - `acr3` - step 1 and 3 (basic authentication and Passkeys)

!!! note
      Find out more about the scripting language in the [Conditional Authentication API Reference]({{base_path}}/references/conditional-auth/api-reference/).

## Try it out

Follow the steps given below to try out ACR-based adaptive authentication with the playground2 sample application.

1. Access the application URL: `http://wso2is.local:8080/playground2/index.jsp`

2. Click **Import Photos**.  

3. Enter the `client ID` of the OAuth service provider application you registered above and enter `acr2` as the **Authentication Context Class** value.  

    ![Authentication context class]({{base_path}}/assets/img/samples/authentication-context-class.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. You are now prompted for basic authentication followed by TOTP authentication which corresponds to the received `acr2` ACR value.

    ![TOTP authenticator]({{base_path}}/assets/img/samples/totp-code-verification.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

6. Enter the TOTP and click **Continue**.
    ![ACR-based login successful]({{base_path}}/assets/img/samples/login-successful-acr-based.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

7. Click `Get Access Token` and proceed to obtain the access token.

    ![ACR-based access token]({{base_path}}/assets/img/samples/acr-based-access-token.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! note
        Authentication Method Reference (AMR) value found in the access token provides information about the authentication methods that are used to assert the authenticity of the user.

        The AMR values for the relevant request are `BasicAuthenticator` and `totp` which were the methods used for authenticaion.

8. Logout from the application and try this flow with different ACR values.

    !!! tip
        Try this flow using the ACR value `acr3` which will then prompt the user for steps 1 and 3 (basic authentication and passkeys).