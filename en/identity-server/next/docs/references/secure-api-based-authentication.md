# Secure the authentication request

API-based authentication uses the authentication API which is an open API that does not require any form of authentication. You can implement the following mechanisms to secure the authentication request.

## Enable client attestation

Client attestation ensures the authenticity of the client making requests to the WSO2 Identity Server.

If the application is hosted either in the App Store or the Google Play Store, follow the steps below to leverage the attestation services provided by these platforms to verify the legitimacy of the client.

1. On the WSO2 Identity Server Console, go to Applications.
2. Go to the Advanced tab of your application and select Enable client attestation.
3. Select either Apple or Android to specify which attestation service you wish to use.

Provide details about the attestation service.
			
- For android:

	1. Provide the package name of the application which takes the format of the reverse domain format (e.g. com.example.myapp)

	2. Provide the service account credentials.
		Learn more about service account credentials (https://cloud.google.com/iam/docs/service-account-creds)


  	!!! note
	    Learn more about [Play Integrity API](https://developer.android.com/google/play/integrity/overview).


- For apple:

	1. Provide the app ID of your application.
				
  	!!! note
  	    Learn more about [Managed Device Attestation for Apple devices](https://support.apple.com/en-lk/guide/deployment/dep28afbde6a/web).

4. Click Update to save the changes.

## Secure request authentication
Confidential clients that are able to securely store a secret can implement the following methods to secure authentication requests.

Choose a client authentication method to secure the /token endpoint when making the authorization request to the /authorize endpoint. (See Authorization code for more details)

Make Pushed Authorization Requests (PAR) mandatory for the application. (See Pushed authorization Requests for more details.)

1. On the WSO2 Identity Server Console, go to Applications.

2. Go to the Protocol tab of the application, select the Mandatory checkbox under Pushed Authorization Requests.

3. Click Update to save the changes.
