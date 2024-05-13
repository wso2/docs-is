# Add app-native authentication

In traditional mobile applications, users often get redirected to an external web browser for login.
However, with App-Native Authentication, developers can implement a login experience directly within the application along with features such as Multi-Factor Authentication (MFA), adaptive authentication, and support for federated logins.

## Why app-native authentication?

For most applications, browser-based authentication is the straightforward approach as the application, then, does not have to deal with risks associated with handling sensitive user data.

However, an app-native login experience means users get to enjoy a seamless login experience. This is also ideal if you have a business requirement to keep the users within the application's environment without redirecting them elsewhere for login.

!!! warning "Limitations of App-Native Authentication"

    App-native authentication, albeit convenient, has the following limitations.

    - It should ONLY be used for the organization's own applications and should NOT be used with third-party applications as the user credentials may get exposed to third parties.

	- It has the following limitations compared to a browser-based authentication flow:
        - Does not prompt for user consent for attribute sharing or access delegation.
	    - Does not prompt the user to provide missing mandatory attributes.
	    - Does not support prompts in adaptive authentication flows.
	    - Does not support all authentication methods. If you have an unsupported option configured, the login flow will not be initiated.
	    - Cannot enroll authenticators (e.g. TOTP authenticator) during authentication.

## How it works

App-Native Authentication is an extension to the OAuth 2.0 protocol. The following steps give an overview on how app-native authentication is executed from an application.

1. The initial request made by the application is similar to a typical [OAuth 2.0 authorization code request]({{base_path}}/guides/authentication/oidc/implement-auth-code/) but with the `response_mode` set to `direct` as shown below.

    === "Sample request"
    
        ```java
        curl --location '{{api_base_path}}'
        --header 'Accept: application/json'
        --header 'Content-Type: application/x-www-form-urlencoded'
        --data-urlencode 'client_id=<client_id>'
        --data-urlencode 'response_type=<response_type>'
        --data-urlencode 'redirect_uri=<redircet_url>'
        --data-urlencode 'state=<state>'
        --data-urlencode 'scope=<space separated scopes>'
        --data-urlencode 'response_mode=direct'
        ```
    
    === "Example"
        ```java
        curl --location '{{api_example_base_path}}'
        --header 'Accept: application/json'
        --header 'Content-Type: application/x-www-form-urlencoded'
        --data-urlencode 'client_id=VTs12Ie26wb8HebnWercWZiAhMMa'
        --data-urlencode 'response_type=code'
        --data-urlencode 'redirect_uri=https://example-app.com/redirect'
        --data-urlencode 'state=logpg'
        --data-urlencode 'scope=openid internal_login'
        --data-urlencode 'response_mode=direct'
        ```

    The response contains the following key components.

    - **flowId** - used to uniquely identify a single user login flow. This value is carried forward to the subsequent requests of the process for identification.
    - **nextStep** - describes the authentication options configured for the next step of the login flow.


2. For the next phase of the process, the application starts interacting with the **Authentication API**.     This interaction continues until all the steps of the login flow are complete.

    !!! tip "What is the Authentication API?"
        The Authentication API is an interactive, and a stateful API that facilitates a multi-step authentication flow within an application. See its [OpenAPI definition]({{base_path}}/apis//app-native-authentication-api/) for more details.

    The application sends a request to the authentication API with the following key components.

    - **flowId** - The unique value received when initiating the login flow.
    - **selectedAuthenticator** - The authentication option that the user selected and its credentials.

    The response contains the following key components.

    - **flowStatus**: Describes if the login flow is complete or incomplete.
    - **nextStep** - describes the authentication options configured for the next step of the login flow.

3. Once the login flow is complete, the application receives an authorization code.

!!! note "Learn more"
    While this section provides a brief overview, it is highly recommended to read through [app-native authentication]({{base_path}}/references/app-native-authentication) to understand the concept in detail.


## Try it out
Follow the steps below to try out App-Native Authentication with {{product_name}}.

### Prerequisites

- To get started, you need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/).

- You need to have a user account in {{ product_name }}. If you don't already have one, [create a user account]({{base_path}}/guides/users/manage-users/#onboard-a-user) in {{ product_name }}.

### Enable App-Native Authentication

Follow the steps below to enable app-native authentication for your application.

1. On {{product_name}} Console, go to **Applications**.

2. Go to the **Protocol** tab and select **Code** from **Allowed grant types**.

3. Click **Update** to save the changes.

4. Go to the **Advanced** tab of your application and select **Enable app-native authentication API**.

    ![Enable app-native authentication]({{base_path}}/assets/img/guides/app-native-authentication/enable-app-native-authentication.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Update** to save the changes.

6. Go to the **Login flow** tab and configure a login flow with the supported authentication options.

    ??? tip "Finding supported authentication options in the login flow"
        Supported authentication options are tagged with `#APIAuth`.

        ![Supported authentication options]({{base_path}}/assets/img/guides/app-native-authentication/supported-authentication-options.png){: width="400" style="display: block; margin: 0;"}

7. Click **Update** to save the changes.

8. Try out App-Native Authentication using Postman.
    {% if product_name=="Asgardeo"%}
    [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/8657284-83f51f64-fe45-4ca4-88b0-f670562d6b44){: target="#"}
    {% else %}
    [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/8657284-8d164672-61aa-4326-bc5e-30314c49f6d0){: target="#"}
    {% endif %}

## Secure the authentication request
In App-Native Authentication, users input their credentials directly into the application. Hence, malicious applications mimicking the legitimate application may be able to capture user credentials. You can implement the following mechanisms to secure authentication requests.

While these mechanisms are only applicable for the initial authentication request, all subsequent requests are bound to it via a unique identifier (flowId), which prevents alterations during the process.

- **Client attestation** - If the application is published in the Apple App Store or Google Play Store, attestation capabilities provided by the platform can be used to ensure the request originated from the legitimate client application.
- **Client authentication** - If the application is capable of securely storing a client secret (confidential client), client authentication can be used to secure the request.

### Using client attestation
If the application is hosted either in the Apple App Store or the Google Play Store, follow the steps below to leverage 
the attestation services provided by these platforms to verify the legitimacy of the client.

1. On the {{product_name}} Console, go to **Applications**.
2. Go to the **Advanced** tab of your application and select **Enable client attestation**.
3. Select either **Apple** or **Android** to specify which attestation service you wish to use.

4. Provide details about the attestation service.

	![Enable client attestation]({{base_path}}/assets/img/references/enable-client-attestation.png){: width="600" style="display: block; margin: 0;"}

	a. **For android**:

    !!! tip
	    By leveraging the Google Play Integrity API, {{product_name}} ensures a heightened level of security for Application Native Authentication. It actively detects and responds to potential threats, thereby safeguarding against attacks and mitigating the risk of abuse.
	    Learn more about the [Play Integrity API](https://developer.android.com/google/play/integrity/overview).

	- Provide the package name of the application which takes the format of the reverse domain format (e.g. com.example.myapp)

	- Provide the service account credentials.
		
		!!! note
			Learn more about [service account credentials](https://cloud.google.com/iam/docs/service-account-creds){target="_blank"}.

	b. **For apple**:

    !!! tip
	    By leveraging DCAppAttestService, {{product_name}} adds an extra layer of security to Application Native Authentication for iOS apps. It actively detects and responds to potential threats, safeguarding against unauthorized access and malicious activities.
	    Learn more about [Apple's DeviceCheck Attest Service](https://developer.apple.com/documentation/devicecheck/dcappattestservice)

	- Provide the app ID of your application which consists of the Team ID and the bundle ID separated by a period (.). (e.g. A1B2C3D4E5.com.domainname.applicationname)

5. Click **Update** to save the changes.

!!! tip "Using client attestation in the request"
    The client application should obtain the attestation object from the platform and pass it to {{product_name}} via the `x-client-attestation` header in the initial authentication request.

    === "Sample request"

        ```bash
        curl --location '{{api_base_path}}'
        --header 'x-client-attestation: <attestation_object>'
        --header 'Accept: application/json'
        --header 'Content-Type: application/x-www-form-urlencoded'
        --data-urlencode 'client_id=<client_id>'
        --data-urlencode 'response_type=code'
        --data-urlencode 'redirect_uri=<redirect_uri>'
        --data-urlencode 'scope=<scope>'
        --data-urlencode 'response_mode=direct'
        ```

    === "Example"
    
        ```bash
        curl --location '{{api_example_base_path}}'
        --header 'x-client-attestation: eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2R0NNIn0.O1miRMXle8A4hLH46VkxHgdU9i1-ow...'
        --header 'Accept: application/json'
        --header 'Content-Type: application/x-www-form-urlencoded'
        --data-urlencode 'client_id=XWRkRNkJDeTiR5MwHdXROGiJka'
        --data-urlencode 'response_type=code'
        --data-urlencode 'redirect_uri=https://example.com/home'
        --data-urlencode 'scope=openid profile'
        --data-urlencode 'response_mode=direct'
        ```

### Using client authentication
Confidential clients that are able to securely store a secret can make use of client authentication to secure authentication requests.

The initial authentication request is an OAuth 2.0 authorization request. Therefore,  any [supported authentication mechanism]({{base_path}}/references/app-settings/oidc-settings-for-app/#client-authentication)
for an OAuth confidential client can be used to secure this request. There are no additional configurations required to enable client authentication. The application can also initiate the request as a [Pushed Authorization Request (PAR)]({{base_path}}/guides/authentication/oidc/implement-login-with-par/).

!!! tip "Using client authentication in the request"
    The following is a sample request using client secret based authentication.

    === "Sample request"

        ```bash
        curl --location '{{api_base_path}}'
        --header 'Authorization: Basic <base64encoded(client_id:client_secret)>'
        --header 'Accept: application/json'
        --header 'Content-Type: application/x-www-form-urlencoded'
        --data-urlencode 'client_id=<client_id>'
        --data-urlencode 'response_type=code'
        --data-urlencode 'redirect_uri=<redirect_uri>'
        --data-urlencode 'scope=<scope>'
        --data-urlencode 'response_mode=direct'
        ```

    === "Example"
    
        ```bash
        curl --location '{{api_example_base_path}}'
        --header 'Authorization: Basic WFd4N0RlVGlSNU13SGRYUk9HaUprYTpmVDlCN0RJTGZ3MWZVUmpQRVpHOG9fWFA4Q20ySFFQOEhBclJFhNYQ=='
        --header 'Accept: application/json'
        --header 'Content-Type: application/x-www-form-urlencoded'
        --data-urlencode 'client_id=XWRkRNkJDeTiR5MwHdXROGiJka'
        --data-urlencode 'response_type=code'
        --data-urlencode 'redirect_uri=https://example.com/home'
        --data-urlencode 'scope=openid profile'
        --data-urlencode 'response_mode=direct'
        ```


## Handle Single Sign-On
Single Sign-On (SSO) for app-native authentication can be handled in the following two ways.

### Cookie based SSO

App-native authentication, just as the OAuth authorization code flow, sets an SSO cookie (commonAuthId). If the cookie is preserved, any subsequent authorization request that occurs with this cookie will automatically perform SSO.

### SessionId based SSO

SessionId parameter based SSO is useful if the implementation does not maintain cookies. The `id_token` that the application receives after the initial authentication request, contains the `isk` claim. When making a subsequent authorization request the `isk` value can be used as the `sessionId` for SSO to occur.

Given below is a sample authorization request using the `isk` value as the `sessionId`

=== "Sample request"

    ```bash
    curl --location '{{api_base_path}}'
    --header 'Accept: application/json'
    --header 'Content-Type: application/x-www-form-urlencoded'
    --data-urlencode 'client_id=<client_id>'
    --data-urlencode 'response_type=code'
    --data-urlencode 'redirect_uri=<redirect_uri>'
    --data-urlencode 'scope=<scope>'
    --data-urlencode 'response_mode=direct'
    --data-urlencode 'sessionId=<isk claim obtained from the id_token>'
    ```

=== "Example"

    ```bash
    curl --location '{{api_example_base_path}}'
    --header 'Accept: application/json'
    --header 'Content-Type: application/x-www-form-urlencoded'
    --data-urlencode 'client_id=XWRkRNkJDeTiR5MwHdXROGiJka'
    --data-urlencode 'response_type=code'
    --data-urlencode 'redirect_uri=https://example.com/home'
    --data-urlencode 'scope=openid profile'
    --data-urlencode 'response_mode=direct'
    --data-urlencode 'sessionId=77961448dd65199ec519fee4685553fe153e9d7bb80e26e41cb5cedc89a2b731'
    ```

!!! note
    If both cookie based SSO and SessionId based SSO are used, cookie based SSO takes precedence.