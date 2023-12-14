# Add application-native login

In a conventional mobile application, users are typically redirected to an external web browser during login. However, with application-native authentication, developers can integrate a seamless api-based authentication mechanism within the application itself so that users are never taken out of the context of the application.

As application-native authentication is an extension to OAuth 2.0, it also offers many of the flexibility and security features that the OAuth 2.0 protocol offers.

!!! warning "Limitations of application-native authentication"

	application-native authentication has the following limitations compared to a browser-based OAuth 2.0 flow:

	application-native authentication,
	<ul>
	<li>does not prompt the user to provide consent to share user attributes with the application.</li>
	<li>does not prompt the user to provide missing mandatory attributes.</li>
	<li>does not support prompts in adaptive authentication flows.</li>
	<li>cannot be initiated if a non API-based authentication method is configured for the application.</li>
	<li>cannot enroll authenticators (e.g. TOTP authenticator) during authentication.</li>
	</ul>

The following guide explains how you can implement application-native authentication for your application using {{product_name}}.

## Prerequisites

- To get started, you need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/).

- You need to have a user account in {{ product_name }}. If you don't already have one, [create a user account]({{base_path}}/guides/users/manage-customers/#onboard-a-user) in {{ product_name }}.

## Enable API-based authentication

Follow the steps below to enable API-based authentication for your application.

1. On the WSO2 Identity Server Console, go to **Applications**.

2. Go to the **Protocol** tab and select **Code** from **Allowed grant types**.

3. Go to the **Advanced** tab of your application and select **Enable app-native authentication API**.

  ![Enable application-native authentication]({{base_path}}/assets/img/guides/app-native-authentication/enable-app-native-authentication){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Click **Update** to save the changes.

## Initiate an API-based authentication request
API-based authentication is an extension to the OAuth 2.0 protocol. Therefore, the initial request made by the application to the WSO2 Identity Server is similar to a regular OAuth 2.0 authorization code grant request with one main difference, the `response_mode` parameter is set to `direct`.

The request made by the client to the WSO2 Identity Server will be as shown below.

=== "Sample request"

	```java
	curl --location 'https://localhost:9443/oauth2/authorize/' \
	--header 'Accept: application/json' \
	--header 'Content-Type: application/x-www-form-urlencoded' \
	--data-urlencode 'client_id=<client_Ii> \
	--data-urlencode 'response_type=<response_type> \
	--data-urlencode 'redirect_uri=<redircet_url>' \
	--data-urlencode 'state=<state> \
	--data-urlencode 'scope=<space separated scopes>' \
	--data-urlencode 'response_mode=direct'
	```

=== "Example"

	```java
	curl --location 'https://localhost:9443/oauth2/authorize/' \
	--header 'Accept: application/json' \
	--header 'Content-Type: application/x-www-form-urlencoded' \
	--data-urlencode 'client_id=VTs12Ie26wb8HebnWercWZiAhMMa' \
	--data-urlencode 'response_type=code' \
	--data-urlencode 'redirect_uri=https://example-app.com/redirect' \
	--data-urlencode 'state=logpg' \
	--data-urlencode 'scope=openid internal_login' \
	--data-urlencode 'response_mode=direct'
	```


!!! note
	Learn more about the authorization code grant in the [documentation]({{base_path}}/guides/authentication/oidc/implement-auth-code/).

When the `response_mode` is set to `direct` as shown above, all subsequent requests after the initial request to the `/authorize` endpoint will be directed to the `/authn` endpoint.


## Handle SSO with API-based authentication
With API-based authentication there are two ways that Single Sign-On (SSO) can be handled for user sessions.

### Cookie based SSO

API-based authentication, similar to the OAuth authorization code flow, sets an SSO cookie (commonAuthId). If the cookie is preserved, any subsequent authorization request that occurs with this cookie will automatically perform SSO.

### SessionId based SSO

SessionId parameter based SSO is useful if the implementation does not manage session cookies. The id_token that the application receives after the initial authentication request, contains the `isk` claim. When making a subsequent authorization request the `isk` value can be used as the `sessionId` for SSO to occur.

Given below is a sample authorization request using the `isk` value as the `sessionId`

=== "Sample request"

	``` java
	curl --location 'https://localhost:9443/oauth2/authorize/'
	--header 'Accept: application/json'
	--header 'Content-Type: application/x-www-form-urlencoded'
	--data-urlencode 'client_id=<client_id>'
	--data-urlencode 'response_type=<response_type>'
	--data-urlencode 'redirect_uri=<redirect_url>'
	--data-urlencode 'state=<state>'
	--data-urlencode 'scope=<space separated scopes>'
	--data-urlencode 'response_mode=direct'
	--data-urlencode 'sessionId=<isk claim obtained from the id_token>'
	```

=== "Example"

	```java
	curl --location 'https://localhost:9443/oauth2/authorize/'
	--header 'Accept: application/json'
	--header 'Content-Type: application/x-www-form-urlencoded'
	--data-urlencode 'client_id=VTs12Ie26wb8HebnWercWZiAhMMa'
	--data-urlencode 'response_type=code'
	--data-urlencode 'redirect_uri=https://example-app.com/redirect'
	--data-urlencode 'state=logpg'
	--data-urlencode 'scope=openid internal_login'
	--data-urlencode 'response_mode=direct'
	--data-urlencode 'sessionId=77961448dd65199ec519fee4685553fe153e9d7bb80e26e41cb5cedc89a2b731'
	```

!!! note
	If both cookie based SSO and SessionId based SSO are configured in the implementation, cookie based SSO takes precedence.








