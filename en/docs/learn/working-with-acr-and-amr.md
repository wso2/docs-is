# Authentication Context Class Reference (ACR)  and Authentication Method Reference (AMR)

!!! Tip 
    You may first try the sample [Configuring ACR-Based Adaptive
    Authentication](../../learn/configuring-acr-based-adaptive-authentication) as a quick start

#### What is ACR 

Authentication Context Class Reference (ACR) is an optional parameter that is used in SAML and OpenID Connect (OIDC) requests. This parameter enables the service providers to send additional information to the identity provider so that the identity provider can enforce additional assurance in the user authentication flow, i.e., it would indicate the business rules that are required to be satisfied during authentication. In certain contexts, ACR is referred to as the level of assurance (LoA).

Even though the ACR values and their interpretations are not defined by any specification, there are common, recommended ACR values widely-accepted by the industry (see below). 

<table>
	<thead>
		<tr>
			<th>Authentication Method</th>
			<th>Authentication Context Class URI</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Username/Password</td>
			<td><code>urn:oasis:names:tc:SAML:2.0:ac:classes:Password</code></td>
		</tr>
		<tr>
			<td>Password Protected Transport</td>
			<td><code>urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport</code></td>
		</tr>
		<tr>
			<td>Transport Layer Security (TLS) Client</td>
			<td><code>urn:oasis:names:tc:SAML:2.0:ac:classes:TLSClient</code></td>
		</tr>
		<tr>
			<td>X.509 Certificate</td>
			<td><code>urn:oasis:names:tc:SAML:2.0:ac:classes:X509</code></td>
		</tr>
		<tr>
			<td>Integrated Windows Authentication</td>
			<td><code>urn:federation:authentication:windows</code></td>
		</tr>
		<tr>
			<td>Kerberos</td>
			<td><code>urn:oasis:names:tc:SAML:2.0:classes:Kerberos</code></td>
		</tr>
	</tbody>
</table>

You can also define new ACR values and their meanings to fit your requirements.

#### What is AMR
Authentication Method Reference (AMR) provides information about the authentication methods that are used to assert users authenticity. It provides information about the session activities that took place while authenticating a user.

#### ACR vs. AMR
While ACR denotes the set of business rules that must be satisfied during authentication, AMR denotes the authentication methods that can be used to satisfy these business rules.

### Requesting the ACR by service providers
Service providers can request the ACR through authentication requests using SAML2 and OAuth2. 

#### Requesting the ACR with SAML2
Following is a sample SAML fragment that you can add to the SAML SSO request while initiating the SAML SSO flow. 

```
<samlp:RequestedAuthnContext Comparison="exact">
   <saml:AuthnContextClassRef>urn:federation:authentication:windows</saml:AuthnContextClassRef>
   <saml:AuthnContextClassRef>pwd</saml:AuthnContextClassRef>
   <saml:AuthnContextClassRef>LOA2</saml:AuthnContextClassRef>
</samlp:RequestedAuthnContext>
```

!!! note
	All the necessary authentication context class URIs (AuthContextClassRef) are added as ACR values out of which some are standard ACR values while the rest being custom values. These values are interpreted by the WSO2 Identity Server service provider that is configured for the relevant application.

!!! abstract "Defining the acceptable ACR values" 

	When requesting the ACR values from the service provider, you can define an ordered list of ACR values that you will only accept. The following functions will be used to execute this: 

	-	**`selectAcrFrom`**: This inbuilt function evaluates the best/strongest ACR from the received and configured ACR lists.
	
	-	**`context.selectedAcr`**: This function sets the ACR value that needs to be returned to the caller.
	
	``` tab="Sample Request"
	var supportedAcrValues = ['urn:oasis:names:tc:SAML:2.0:classes:Kerberos', 'urn:oasis:names:tc:SAML:2.0:ac:classes:Password', 'urn:federation:authentication:windows'];
	 
	…
	…
	 
	var selectedAcr = selectAcrFrom(context, supportedAcrValues);
	context.selectedAcr = selectedAcr;
	```

	The corresponding SAML assertion will include the `AuthnStatement` element that contains the selected ACR values.

	```saml
	<saml2:AuthnStatement AuthnInstant="2019-07-03T10:26:56.645Z"
	                     SessionIndex="9e2a915b-aa69-4262-bd06-59e70c18469b">
	   <saml2:AuthnContext>
	       <saml2:AuthnContextClassRef>urn:federation:authentication:windows</saml2:AuthnContextClassRef>
	   </saml2:AuthnContext>
	</saml2:AuthnStatement>
	```

!!! note
	WSO2 Identity Server authentication script does not support the `Comparison` attribute in the `RequestedAuthnContext` element due to the following reasons: 

	-	Similar functionality is not supported in OAuth2.

	-	The identity provider should decide the manner in which the ACR should be enforced. A client sending an exact, `minimum`, `maximum`, or `better` comparison may not be an effective mechanism. The identity provider should use other internal rules to decide the effective ACR.

#### Requesting the ACR with OAuth2
Following is a sample authorization request with the optional acr_values parameter, which indicates the necessary context class URIs. 

!!! note
	You can send multiple values in the `acr_values` parameter separated by a space. The following example uses plus (+) instead.

``` curl
https://localhost:9443/oauth2/authorize?scope=openid&acr_values=urn%3Afederation%3Aauthentication%3Awindows+pwd+LOA2&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fplayground2%2Foauth2client&client_id=EUVvhKM28RkwTQL9A52kqXnfCj8a
```

### Using ACR with WSO2 Identity Server
You can easily use ACR and AMR with WSO2 Identity Server by using adaptive authentication scripts. For more information, see Configuring Adaptive Authentication.

#### Accessing the ACR values using the authentication script
The authentication script is protocol-agnostic.

-	**For SAMLSSO requests**: The list of `samlp:AuthnContextClassRef` is available as `context.requestedAcr` in the authentication script.

-	**For OIDC requests**: The `acr_values` parameter is available with `context.requestedAcr`. You can assign any string value to returned ACR, via `context.selectedAcr` if necessary. You can select the best ACR value based on logic that is related to the LoA you want to provide. 

!!! tip
	WSO2 Identity Server provides a convenient function that is suitable for the majority of cases using the function selectAcrFrom. For more information, see [Configuring ACR-Based Adaptive Authentication](../../learn/configuring-acr-based-adaptive-authentication).

Let's consider the following example:

```
Log.info("ACR : "+context.requestedAcr);
var acr_values = context.requestedAcr; //Assigns the list of ACR values as an array.
 
context.selectedAcr="LOA1";  //Sets your ACR value to be returned
```

In this example, the values are assigned to `context.requestedAcr` using the `acr_values` parameter in the OAuth2 request. For SAML, the values can be assigned with the `samlp:RequestedAuthnContext` sub-elements received via the SAML SSO request. 

#### Trying out without an application
Follow the steps below to try the scenario without using an application:

!!! tip "Before you begin"

	To get familiar with the scenario, try out the instructions in [Configuring ACR-Based Adaptive Authentication](../../learn/configuring-acr-based-adaptive-authentication).

1. To update the script:

	1. Expand **Authentication Step Configuration** and add Step 4.

	2. Expand **Script Based Adaptive Authentication** and replace the authentication script of the service provider with the following:  

		```
		function onLoginRequest(context) {
		   
		  Log.info("ACR : "+context.requestedAcr);
		  var acr_values = context.requestedAcr;
		  var needLevel1 = (acr_values.indexOf("LOA1") > -1);
		  var needLevel2 = (acr_values.indexOf("LOA2") > -1);
		  var needLevel3 = (acr_values.indexOf("LOA3") > -1);
		   
		  executeStep(1);
		  if(needLevel1) {
		    executeStep(2);
		    context.selectedAcr="LOA1";  //Sets your ACR value to be returned
		  }
		  if(needLevel2) {
		    executeStep(3);
		    context.selectedAcr="LOA2";
		  }
		  if(needLevel3) {
		    executeStep(4);
		    context.selectedAcr="LOA3";
		  }
		}
		```
		!!! note 
			The subsequent instructions are given to quickly try out the case manually, without using any application. The relevant calls and response handling should be done by the service provider.

2. To initiate the authentication flow, update the placeholders of the following and run it in a browser. 

	!!! info
		The `CLIENT_ID` is the client key of the service provider that you configured for the application in WSO2 Identity Server.

	``` tab="Format"
	https://localhost:9443/oauth2/authorize?response_type=code&scope=openid&client_id=<<CLIENT_ID>&redirect_uri=http://localhost:8080/playground2/oauth2client&acr_values=<<ACR_VALUES>>
	```
	
	``` tab="Example"
	https://localhost:9443/oauth2/authorize?response_type=code&scope=openid&client_id=Q7zSTBiNb3vwe8dWhUMEBh5sE4ka&redirect_uri=http://localhost:8080/playground2/oauth2client&acr_values=LOA1+LOA2+LOA3
	```

	The login screen appears.

3. Log in using `admin` as the username and password.
   The consent approval screen appears.

4. Provide your consent to share the necessary data. Note that you get redirected to a URL similar to the following. 

	``` tab="Format"
	http://localhost:9764/playground2/oauth2client?code=<<AUTHORIZATION_CODE>>
	```

	``` tab="Example"
	http://localhost:9764/playground2/oauth2client?code=e1934548d0a0883dd5734e24412310
	```
	
5. Copy the `AUTHORIZATION_CODE` for later use.

6. To obtain the access token, replace the placeholders in the following command and execute it in a command prompt. 

	!!! info

		The `CLIENT_SECRET` and `CALLBACK_URL` are the client secret and callback URL of the service provider that you configured for the application in WSO2 Identity Server.

	``` tab="Format"
	curl -v -X POST --basic -u <<CLIENT_ID>>:<<CLIENT_SECRET>> -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "client_id=<<CLIENT_ID>>&grant_type=authorization_code&code=<<AUTHORIZATION_CODE>>&redirect_uri=<<CALLBACK_URL>>" https://localhost:9443/oauth2/token
	```

	``` tab="Example"
	curl -v -X POST --basic -u Q7zSTBiNb3vwe8dWhUMEBh5sE4ka:VkTfbwh1BFkxr4vKRh1TsjcxCcca -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "client_id=Q7zSTBiNb3vwe8dWhUMEBh5sE4ka&grant_type=authorization_code&code=86650268-5637-311c-9a08-4066727d656f&redirect_uri=http://localhost:8080/playground2/oauth2client" https://localhost:9443/oauth2/token
	```

	An access token similar to the following appears. 

	``` tab="Format"
	{"access_token":"1b87d316-a107-3174-a71d-ac438a54719b","refresh_token":"60a66d57-0e48-3896-98e7-00213acee104","scope":"openid","id_token":"<<ID_TOKEN>>","token_type":"Bearer","expires_in":2554}
	```

	``` tab="Example"
	{"access_token":"1b87d316-a107-3174-a71d-ac438a54719b","refresh_token":"60a66d57-0e48-3896-98e7-00213acee104","scope":"openid","id_token":"eyJ4NXQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJraWQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiNk9Yd2Z4SmFUV1lDNTZSY2NFaFNKZyIsImF1ZCI6IkVVVnZoS00yOFJrd1RRTDlBNTJrcVhuZkNqOGEiLCJhY3IiOiJMT0EyIiwiY19oYXNoIjoibERqOW5paFpHU1VtZ05tel9seHhYQSIsInN1YiI6ImFkbWluIiwibmJmIjoxNTQ4Mzk2NDEzLCJhenAiOiJFVVZ2aEtNMjhSa3dUUUw5QTUya3FYbmZDajhhIiwiYW1yIjpbInB3ZCIsImh3ayJdLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE1NDg0MDAwMTMsImlhdCI6MTU0ODM5NjQxM30.DIf0aP7pa2bPD2ViGXpdddnJi8d6uwfH63gjo5td0g9J0sKeTTahDfYIupj6hGCGyHXzvo40pyDk1VHgl-wY_8im6_fpFbN_56UMSClfRhkY9MqwHn1-ekp3cz9dkPa1eXJFjBMasdZ5nXFkXhGHujfTETClzbHJIJmYSFfPEASHC99ZUN2hTuWM27xH-4gvW6J4eJol_RO4nENhexFUC1y3fk9hOzyKieYGduow_cC8myzfwcgFnnZ1FEZq1ODgHGa4isldUnYcM7Hjh-egmhby6a9L45Ytkvb4Jt-xPqyi2fskDIrg4IgdwWQXbFnNadP3Ifjyhnbak6wjSOPkHw","token_type":"Bearer","expires_in":2554}
	```

7. Copy the `ID_TOKEN` and decode with Base64. The decoded `ID_TOKEN` will look similar to the following. 

	``` tab="Format"
	{
	  "at_hash": "<<Access token hash value>>",
	  "aud": "<<Audience that the ID token is intended for>>",
	  "c_hash": "<<Code hash value>>",
	  "sub": "<<Subject>>",
	  "acr": "<<ACR>>", 
	  "nbf": <<Epoch time before which the JWT must not be accepted for processing>>,
	  "azp": "<<Authorized party>>",
	  "amr": [<<Authentications Method Reference>>],
	  "iss": "<<The token endpoint that issued the token>>",
	  "exp": <<Epoch time of the token expiration date/time>>,
	  "iat": <<Epoch time of the token issuance date/time>>
	}
	```

	``` tab="Example"
	{
	  "at_hash": "tUx0jJwYLku_1X9Ncb3F2w",
	  "aud": "EUVvhKM28RkwTQL9A52kqXnfCj8a",
	  "c_hash": "gx4o-kX3w_YjM6lbVU5OoQ",
	  "sub": "admin",
	  "acr": "LOA2", 
	  "nbf": 1548388521,
	  "azp": "EUVvhKM28RkwTQL9A52kqXnfCj8a",
	  "amr": [
	    "DemoFaceIdAuthenticator",
	    "BasicAuthenticator",
	    "DemoFingerprintAuthenticator"
	  ],
	  "iss": "https://localhost:9443/oauth2/token",
	  "exp": 1548392121,
	  "iat": 1548388521
	}
	```
	
	Note that the AMR values in this example are 	`DemoFaceIdAuthenticator`	, 	`BasicAuthenticator`	, and 	`DemoFingerprintAuthenticator`. These are the authenticators that are used in the authentication process.

#### Translating AMR values
Follow the steps below to translate the AMR values that get returned through the authentication process.

1. Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.

2. Add the following configurations:

    !!! note 
        You can add any custom AMR mapping to this config.

       ```
       [[authentication_context.method_refs]]
       method = "SMSOTP"
       amr_value = "sms"
       [[authentication_context.method_refs]]
       method = "EmailOTP"
       amr_value = "otp"
       [[authentication_context.method_refs]]
       excluded_methods = ["BasicAuthenticator", "AuthenticationMethodToBeIgnored"]
       ```
	
    * `method`: Authentication Method Name

    * `amr_value`: AMR value mapping you prefer to have as the amr in the ID token. You can refer [AMR draft specification](https://tools.ietf.org/html/draft-ietf-oauth-amr-values-04) for this.

    * `excluded_methods`: List of Authentication Methods that you would like to prevent being available on the ID token.

3. Start the WSO2 Identity Server.

!!! info
	You can verify whether the changes are successfully applied by opening the `identity.xml` file in the `<IS_HOME>/repository/conf/identity` directory after starting the server. It should contain a similar configuration as shown below.

```
<AuthenticationContext>
        <MethodRefs>
                <MethodRef method="SMSOTP" uri="sms" />
                <MethodRef method="EmailOTP" uri="otp" />
                <MethodRef method="BasicAuthenticator" xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />
                <MethodRef method="AuthenticationMethodToBeIgnored" xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />
        </MethodRefs>
 </AuthenticationContext>
```

### FAQ

1. **Can I define my own URI as the ACR**
	Yes. You are free to define your own URI for any ACR value. However, a newly-defined ACR value must be agreed by the service provider/application and the identity provider. You can configure this URI in the adaptive authentication script and evaluate as per your requirement. 

	!!! note 
		When sending the URI via HTTP URL, make sure to encode with URL encoding.






