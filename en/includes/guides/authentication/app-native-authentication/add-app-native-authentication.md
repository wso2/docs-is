# Add app-native authentication

In traditional applications, login is usually fulfilled by a web browser. This means that the users who attempt to log in to these applications are redirected to a web browser for authentication. This is not ideal if your goal is to provide the user with a seamless login experience or if you have a business need to keep users within the application's environment.

App-Native Authentication takes an API-based approach to let developers implement a secure login experience directly within the application along with features such as Multi-Factor Authentication (MFA), adaptive authentication, and support for federated logins. This means users will have a seamless login experience from right within the application without the need for redirection.


!!! warning "Limitations of App-Native Authentication"

    - At the time of login, app-native authentication,

        - does not prompt the user to provide missing mandatory attributes. 
        - does not prompt the user for consent to share attributes with the application.
	    - does not support prompts in adaptive authentication flows.
        - does not facilitate enrolling authenticators (e.g. TOTP authenticator).
        - only supports silent JIT provisioning.

	- App-native authentication does not support all authentication methods. If you have an unsupported option configured, the login flow will not be initiated.
	

## How it works

The following diagram illustrates the high-level steps involved with app-native authentication.

![app-native-authentication-sequence]({{base_path}}/assets/img/guides/app-native-authentication/app-native-authentication-sequence.png){: width="650" style="display: block; margin: 0; border: 0px;"}


1. User initiates a login request at the application's login page.
2. The application initiates an app-native authentication request with the server. The initial request made by the application is similar to an [OAuth 2.0 authorization code request]({{base_path}}/guides/authentication/oidc/implement-auth-code/) but with the `response_mode` set to `direct` as shown below.

    === "Sample request"
    
        ```bash
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
        ```bash
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

3. The server responds with instructions for the next step of the authentication.
4. The application displays the available authentication options to the user and prompts the user to enter the credentials.
5. User interacts with the application and enters the credentials for a selected authentication option.
6. The application gathers the credentials and sends an authentication request back to the server using the **Authentication API**.

    !!! info
        Steps 3-6 repeat for all authentication steps configured for the application.

    !!! tip "What is the Authentication API?"
        - The Authentication API is an interactive, stateful API that facilitates a multi-step authentication flow. See its [OpenAPI definition]({{base_path}}/apis/app-native-authentication-api/) for more details.
        - While app-native authentication is initiated at the `/authorize` endpoint, the authentication API fulfills the actual authentication for each step by interacting with the `/authn` endpoint. 

7. After the authentication is complete, the application receives an OAuth2 authorization code in the response.

!!! note "Learn more"
    While this section provides a brief overview, it is highly recommended to read through [app-native authentication]({{base_path}}/references/app-native-authentication) to understand the concept in detail.


## Try it out
Follow the steps below to try out App-Native Authentication with {{product_name}}.

!!! warning "Attention"
    App-native authentication should be limited exclusively to an organization's internal applications. AVOID using it with third-party applications to mitigate the risk of credential exposure.

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

### Try out App-Native Authentication

Try out App-Native Authentication using Postman.

{% if product_name=="Asgardeo"%}
[![Run in Postman]({{base_path}}/assets/img/logo/postman.svg)](https://app.getpostman.com/run-collection/8657284-83f51f64-fe45-4ca4-88b0-f670562d6b44){: target="#"}
{% else %}
[![Run in Postman]({{base_path}}/assets/img/logo/postman.svg)](https://app.getpostman.com/run-collection/8657284-8d164672-61aa-4326-bc5e-30314c49f6d0){: target="#"}
{% endif %}

!!! note
    Learn more about the API calls in [App-native authentication]({{base_path}}/references/app-native-authentication/).

### Next steps

You have successfully enabled app-native authentication for your application. You can now try out the app-native authentication flow with your application. To give you better support, we have provided SDKs for different technologies.

#### Android

If you are developing an Android application, you can use the <a href="https://central.sonatype.com/artifact/io.asgardeo/asgardeo-android" target="_blank">Android Mobile UI SDK</a> to integrate app-native authentication to your Android application. 

To get started, refer to the Android Mobile UI SDK <a href="https://asgardeo.github.io/mobile-ui-sdks/android/introduction.html" target="_blank">documentation</a>.

#### Other technologies

We are working on providing SDKs for other technologies. Stay tuned for updates.

## What's next?

- [Secure app-native authentication flows]({{base_path}}/guides/authentication/app-native-authentication/secure-app-native-authentication-flows/) guides you on how to secure app-native authentication flows.

- [Handle advanced login scenarios]({{base_path}}/guides/authentication/app-native-authentication/handle-advanced-login-scenarios/) guides you on how to handle federated authentication, multi-option login steps and SSO for app-native authentication.