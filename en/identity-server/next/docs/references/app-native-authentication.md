# Application-native authentication

Application-native authentication is an extension to the OAuth 2.0 protocol that enables users to authenticate to native and mobile applications without being redirected to a web browser. The sections below explain about the API involved in app-native authentication, the **authentication API**,  and how developers can protect the app-native authentication requests.

!!! tip "OpenAPI definition"
	Find detailed information in the openAPI definition of the [authentication API]({{base_path}}/apis/authentication-api/){: target="#"}.

## How does it work?

This section looks at the general steps that are involved during application native authentication.

1. The application initiates an app-native authentication request. This is done with a typical OAuth 2.0 authorization code request but with `response_mode` set to `direct` as shown below.


	!!! note
		Learn how to [implement login using the authorization code flow]({{base_path}}/guides/authentication/oidc/implement-auth-code/)

	=== "Sample request"
	
		```java
		curl --location 'https://localhost:9443/oauth2/authorize/'
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
		curl --location 'https://localhost:9443/oauth2/authorize/'
		--header 'Accept: application/json'
		--header 'Content-Type: application/x-www-form-urlencoded'
		--data-urlencode 'client_id=VTs12Ie26wb8HebnWercWZiAhMMa'
		--data-urlencode 'response_type=code'
		--data-urlencode 'redirect_uri=https://example-app.com/redirect'
		--data-urlencode 'state=logpg'
		--data-urlencode 'scope=openid internal_login'
		--data-urlencode 'response_mode=direct'
		```

2. The application in return, receives a response that contain the **flowId** parameter. The application then sends a POST request to the `/authn` endpoint with a payload as shown below.

	!!! note
		In app-native authentication, after the initial request to the `/authorize` endpoint, subsequent requests are made to the `/authn` endpoint. The **flowId** parameter is used to bind the requests made to the `/authn` endpoint to the initial request.

	=== "Sample request"

		```json
		{
		"flowId": "{flowId received from the initial response}",
		"selectedAuthenticator": {
		    "authenticatorId": "{authenticator id for the selected authenticator}",
		    "params": {
		          "{requested parameters from the authenticator}"
		    	}
			}
		}
		```

	=== "Example"

		```json
		{
		"flowId": "93fd1740-d7b3-4ddb-820d-2ac6d3ce188f",
		"selectedAuthenticator": {
		    "authenticatorId": "QmFzaWNBdXRoZW50aWNhdG9yOkxPQ0FM",
		    "params": {
		        "username": "admin",
		        "password": "admin"
		    	}
			}
		}
		```

3. The authentication flow completes when the application receives an OAuth 2.0 authorization code with other relevant Oauth 2.0 artifacts in a json format as shown below.

	```json
	{
	   "code": "6ff8b7e1-01fc-39b9-b56d-a1f5826e6d2a",
	   "state": "logpg",
	   "session_state": "43b1ffc92c8d349942e99bd0270fca05f934ad6f612b27f40a5fa60b96bd093c.iD4RK8Etr4XruxnYMEvcKQ"
	}
	```


## Secure the authentication request

API-based authentication uses the authentication API which is an open API that does not require any form of authentication. You can implement the following mechanisms to secure the authentication request.

### Enable client attestation

An adversary, often another mobile application, can attempt to mimic or impersonate a legitimate client application during the authentication process. This may lead to the following security threats.

- **User Deception**: The malicious app may trick users into providing their credentials by making them believe they are interacting with a legitimate application.

- **Token Interception**: The malicious app may extract the authorization code or tokens exchanged during the authentication process, gaining unauthorized access to the user's resources.

Client attestation ensures the authenticity of the client making requests to the WSO2 Identity Server.

If the application is hosted either in the App Store or the Google Play Store, follow the steps below to leverage the attestation services provided by these platforms to verify the legitimacy of the client.

1. On the WSO2 Identity Server Console, go to **Applications**.
2. Go to the **Advanced** tab of your application and select **Enable client attestation**.
3. Select either **Apple** or **Android** to specify which attestation service you wish to use.

4. Provide details about the attestation service.

	![How JIT user provisioning works]({{base_path}}/assets/img/references/enable-client-attestation.png){: width="600" style="display: block; margin: 0;"}

	a. **For android**:

    !!! tip
	    By leveraging the Google Play Integrity API, {{product_name}} ensures a heightened level of security for Application Native Authentication. It actively detects and responds to potential threats, thereby safeguarding against attacks and mitigating the risk of abuse.
	    Learn more about the [Play Integrity API](https://developer.android.com/google/play/integrity/overview).

	- Provide the package name of the application which takes the format of the reverse domain format (e.g. com.example.myapp)

	- Provide the service account credentials.
		
		!!! note
			Learn more about [service account credentials](https://cloud.google.com/iam/docs/service-account-creds).

	b. **For apple**:

    !!! tip
	    By leveraging DCAppAttestService, WSO2 Identity Server adds an extra layer of security to Application Native Authentication for iOS apps. It actively detects and responds to potential threats, safeguarding against unauthorized access and malicious activities.
	    Learn more about [Apple's DeviceCheck Attest Service](https://developer.apple.com/documentation/devicecheck/dcappattestservice)

	- Provide the app ID of your application which consists of the Team ID and the bundle ID separated by a period (.). (e.g. A1B2C3D4E5.com.domainname.applicationname)

5. Click **Update** to save the changes.

### Secure request authentication
Confidential clients that are able to securely store a secret can implement the following methods to secure authentication requests.

- Choose a `client authentication method` to secure the `/token` endpoint. See [client authentication methods]({{base_path}}/references/app-settings/oidc-settings-for-app/#client-authentication) for more details.

- Follow the steps below to make Pushed Authorization Requests (PAR) mandatory for the application. See [Implement login using Pushed Authorization Requests]({{base_path}}/guides/authentication/oidc/implement-login-with-par/) for more details.

	1. On the WSO2 Identity Server Console, go to **Applications**.

	2. Go to the **Protocol** tab of the application, select the **Mandatory** checkbox under **Pushed Authorization Requests**.

	3. Click **Update** to save the changes.
