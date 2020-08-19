# JWT Bearer Grant


## About JWT

The JSON Web Token (JWT) is simply a JSON string containing claim values that will be evaluated and validated by the JWT Bearer Grant Handler at the Authorization Server before issuing an access token.  

JWT contains a header, payload, and signature that are separated by periods (.). Let's learn more about them!

### Header

The header contains the algorithm that is used to generate the signature as well as the type of the token, i.e., `JWT`.

!!! example "Sample header"

	```json 
	{
	    "alg": "RS256",
	    "Type": "JWT"
	}
	```

### Payload
The payload contains the following claims. 
	
<table>
	<thead>
		<tr>
			<th>Claim</th>
			<th>Definition</th>
			<th>Usage</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>iss</td>
			<td>Issuer</td>
			<td>Mandatory</td>
			<td>This uniquely identifies the identity provider that issued the JWT.</td>
		</tr>
		<tr>
			<td>sub</td>
			<td>Subject</td>
			<td>Mandatory</td>
			<td>This is the identity provider that vouches that the JWT was issued by the identity proivder that is indicated in the `iss` claim.</td>
		</tr>
		<tr>
			<td>aud</td>
			<td>Audience</td>
			<td>Mandatory</td>
			<td>This is the audience to which the JWT is intended to. This should be the token endpoint of the authorization server.</td>
		</tr>
		<tr>
			<td>exp</td>
			<td>Expiration Time</td>
			<td>Mandatory</td>
			<td>This is epoch time of the JWT expiry time until which the JWT can be used.</td>
		</tr>
		<tr>
			<td>nbf</td>
			<td>Not before</td>
			<td>Optional</td>
			<td>This defines the epoch time after which the JWT can be used.</td>
		</tr>
		<tr>
			<td>iat</td>
			<td>Issued at</td>
			<td>Optional</td>
			<td>This the epoch time at which the JWT was issued.</td>
		</tr>
		<tr>
			<td>jti</td>
			<TD>JSON Web Token Id</TD>
			<td>Optional</td>
			<td>This is the JSON web token ID, which uniquely identifies the JWT.</td>
		</tr>
		<tr>
			<td>Custom claims</td>
			<td>N/A</td>
			<td>Optional</td>
			<td>This is the extension point of the JWT specification.</td>
		</tr>
	</tbody>
</table>

!!! example "Sample Payload"

	```json 
	{ 
	   "sub":"admin",
	   "aud":[ 
	      "https://localhost:9443/oauth2/token"
	   ],
	   "nbf":1507546100,
	   "iss":"jwtIDP",
	   "exp":1507606100,
	   "iat":1507546100,
	   "jti":"Token56756"
	}
	```

### Signature

To generate the signature:

1. Encode `header` and `payload` using the base64 scheme and concatenate them with a period (.).

	```tab="Signature Structure"
	sign(encodeBase64(header) + '.' + encodeBase64(payload))
	```

2. Sign it.

### Assertion

To generate the JWT assertion, encode the signature using the base64 scheme and concatenate `header`, `payload`, and `signature` with a period (.). 

```tab="Assertion Structure"
encodeBase64(header) + '.' + encodeBase64(payload) + '.' +  encodeBase64(s ignature)
```

!!! example "Sample Assertion"

	```
	eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImF1ZCI6WyJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDNcL29hdXRoMlwvdG9rZW4iXSwibmJmIjoxNTA3NTQ2MTAwLCJpc3MiOiJqd3RJRFAiLCJleHAiOjE1MDc2MDYxMDAsImlhdCI6MTUwNzU0NjEwMCwianRpIjoiVG9rZW41Njc1NiJ9.iGMhjibB0W2QFQlM27gnHp6z47Eybv8cAHk2o2i-xqo2S4uJ_1VppFI4CCJXTj4qzV9vmkJ5HKNAayiTa6wOMXGL4XnwYwpOAoKXvboznlEDNRpw3htW34nLvyUu6PjHbdvAPVjh8kPRwf7esRr2p-luecGvC21mjWdhyGzM4hE
	```

## Recommended use

WSO2 Identity Server as an OAuth 2.0 Authorization Server can accept JWT assertions from OAuth 2.0 clients as a means of resource owner authentication and authorization. Additionally, it can exchange it with OAuth 2.0 access tokens in order to access protected resources on behalf of the resource owner.

!!! info "JWT Brearer Grant in WSO2 Identity Server"

	The JWT Bearer Grant is enabled by default in WSO2 Identity Server with the following configurations in the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory. 

	```toml
	[oauth.grant_type.jwt_bearer]
	enable = true
	grant_handler = "org.wso2.carbon.identity.oauth2.grant.jwt.JWTBearerGrantHandler"
	grant_validator = "org.wso2.carbon.identity.oauth2.grant.jwt.JWTGrantValidator"
	```



	

## The flow

When an entity initates a request to gain access to an application: 

1.	The client application (registered as a **service provider** in WSO2 Identity Server) sends an access request to the identity provider (trusted by WSO2 Identity Server).

2.	The identity provider creates a `JWT assertion` with the corresponding `claims` and sends it back to the service provider.

3.	The service provider forwards the access request to the **token endpoint** in WSO2 Identity Server with the following:
	-	`JWT bearer grant type`
	-	`JWT assertion` that is created by the identity provider
	-	Service provider's `client key` and `client secret`

2.	The token endpoint in turn reads and identifies it to be a JWT bearer and triggers the **JWT bearer grant handler** of WSO2 Identity Server. 

3.	The JWT bearer grant handler checks for the **identity provider** that issued the JWT token in the JWT assertion. 

	!!! note

		For this verification to work, the identity provider should have been registered as a trusted identity provider in WSO2 Identity Server.
		The `Identity Provider Name` or the `Identity Provider's Issuer Name` property in the Identity Provider configuration 
		should match the value in the `iss` claim of the JWT assertion.

4.	Once the identity provider is identified, WSO2 Identity Server retrieves the corresponding **identity provider configurations** containing the identity provider's `public certificate`.

5.	WSO2 Identity Server validates the JWT's signature using the identity provider's public certificate.

6.	Once the JWT is validated, WSO2 Identity Server creates an `OAuth2.0 access token` that can be used by the identity provider to grant access to the application holding the given `client key` and `client secret`.

## Configurations 

Follow the steps below to configure the trusted identity provider and service provider in WSO2 Identity Server.

!!! tip "Before you begin"

	Access the WSO2 Identity Server Management Console.

### Trusted identity provider

To configure the trusted identity provider:

1.	On the **Main** menu of the Management Console, click **Identity > Identity Providers > Add**. 

	<img src="../../assets/img/tutorials/add-new-idp.jpeg" alt="Add New Identity Provider menu-item" width="200"/>

2.	Enter the following information.

	<img src="../../assets/img/tutorials/add-new-identity-provider-screen.jpeg" alt="Add New Identity Provider screen" width="700" />  
	
	<table>
		<thead>
			<tr>
				<th>Field</th>
				<th>Description</th>
				<th>Sample Value</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Identity Provider Name</td>
				<td>This is is the name of the identity provider that issues the JWT.</td>
				<td></td>
			</tr>
			<tr>
				<td>Choose IDP certificate type</td>
				<td>This is to specify whether the JWT will be validated using a JWKS endpoint or a public certificate.</td>
				<td>
					<ul>
						<li><code>Use IDP JWKS endpoint</code></li>
						<li><code>Upload IDP certificate</code></li>
					</ul>
				</td>
			</tr>
			<tr>
				<td>Identity Provider's JWKS Endpoint</td>
				<td>This is to define the particular JWKS endpoint using which the JWT will be validated. <br> This field is enabled when the `Use IDP JWKS endpoint` option is selected for **Choose IDP certificate type**.</td>
				<td></td>
			</tr>
			<tr>
				<td>Identity Provider Public Certificate</td>
				<td>This is the public certificate that is used to sign the JWT assertion.  <br> This field is enabled when the `Upload IDP certificate` option is selected for **Choose IDP certificate type**.</td>
				<td></td>
			</tr>
			<tr>
				<td>Alias</td>
				<td>This is the alias of the token endpoint.</td>
				<td><code>https://localhost:9443/oauth2/token</code></td>
			</tr>
		</tbody>
	</table>	

	!!! info
		For more information on identity providers, see [Adding an Configuring an Identity Provider](../../learn/adding-and-configuring-an-identity-provider).

3.	Click **Register**.

You have successfully added the identity provider. Next, you will configure the application as a service provider.

### Service provider 

To add the application as a service provider in WSO2 Identity Server:

1.	On the **Main** menu, click **Identity > Service Providers > Add**.

	<img src="../../assets/img/tutorials/add-sp-menu-item.jpeg" alt="Add New Service Provider menu-item" width="200"/>

2. 	Enter a name for the service provider in the **Service Provider Name** text box and click **Register**.

	<img src="../../assets/img/tutorials/add-sp-screen.jpeg" alt="Add New Service Provider screen" width="700"/> 		


3. 	In the **Inbound Authentication Configuration** section, click **OAuth/OpenID Connect Configuration > Configure**.

	<img src="../../assets/img/tutorials/oauth-openid-connect-configure-option.png" alt="OAuth OpenID Connect Configure option" width="700"/>

4.	Enter the following configurations and click **Add**. 
	
	<a name="step3d"></a>

	<img src="../../assets/img/tutorials/reg-new-app-screen.png" alt="Register New Application scree" width="700"/>

	<table>
		<thead>
			<tr>
				<th>Field</th>
				<th>Description</th>
				<th>Sample Value</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Callaback URL</td>
				<td>This is the service provider's URL to which the access token will be sent. </td>
				<td><code>http://localhost:8080/playground2/oauth2client</code>
				</td>
			</tr>
			<tr>
				<td>Enable Audience Restriction</td>
				<td>This is to define whether the token will be sent to specific entities or not. <br>If this is not selected, the `client key` of the service provider will be sent in the `Aud` element of the JWT.</td>
				<td>Selected</td>
			</tr>
			<tr>
				<td>Audience</td>
				<td>
					<p>This is to define audiences for **this service provider** to which the token will be intended to.</p>
					<div class="admonition tip">
					<p class="admonition-title">Tip</p>
					<p>To define audiences for **all the service providers** that are registered in WSO2 Identity Server globally:</p>
					<ol>
						<li>Open the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory.</li>
						<li>Add the audiences using the following configuration. 
						```toml
						[oauth.oidc.id_token]
						audiences=[] 
						```
						</li>
						<li>Restart WSO2 Identity Server and sign in to the Management Console.</li>
					</ol>
					</div>
				</td>
				<td>`https://localhost:9443/oauth2/token`</td>
			</tr>
		</tbody>
	</table>		 

	Note that the `client key` and `client secret` are generated. 

	<img src="../../assets/img/tutorials/oidc-clientkey-clientsecret 2.png" alt="Client Key and Client Secret" width="700"/> 	

	!!! note

		While configuring the JWT bearer grant type, the **iat** validating time period can also be configured in the `identity.xml` file in the `<IS_HOME>/repository/conf` as shown below. The default value is 30 minutes. 
		
		```json
		<JWTGrant>            
            <EnableIATValidation>true</EnableIATValidation>            
            <IATValidityPeriod>30</IATValidityPeriod>
    	</JWTGrant>
		```  

## Try out

1.	Generate a request object (JWT) using the following. 

	-	**iss**: This is the `client key` that was generated under step 3.d under [Configurations](#step3d) above.
	-	**sub**: This is the `client key` that was generated under step 3.d under [Configurations](#step3d) above.
	-	**aud**: `https://localhost:9443/oauth2/token`
	-	**iat**: This is the epoch of the token issuance time, e.g., `1575024942`.
	-	**jit**: This is the epoch of the token expiry time, e.g., `1575107914`.

	```json tab="Example"
	{
		"alg": "RS256",
    	"type": "JWT"
	}

	{
		"iss": "NCkZofT51NVKK2UuQSvxPJhQOWwa",
	    "sub": "NCkZofT51NVKK2UuQSvxPJhQOWwa", 
	    "aud": "https://localhost:9443/oauth2/token"
	    "iat": "1575024942",
	    "jit": "1575107914"
	}

	{
		<Signature>
	}
	```

2.	To retrieve the `access token` and `refresh token`, execute the following command in a command prompt.

	-	**CLIENT_KEY**: This is the client key that was generated under step 3.d under [Configurations](#step3d) above.
	- 	**ClIENT_SECRET**: This is the client secret that was generated under step 3.d under [Configurations](#step3d) above.
	-	**JWT**: This is the signed base64 encoded JWT. This must contain a single JWT. 

	!!! tip 

		If you have configured the service provider and identity provider in a tenant, add the tenant domain as a query parameter to the access token endpoint, e.g., if the tenant domain is `wso2.com`, the access token endpoint should be `https://localhost:9443/oauth2/token?tenantDomain=wso2.com`.

	```curl tab="Request Format"
	curl -i -X POST -u <CLIENT_ID>:<Client_SECRET> -k -d 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=<JWT>' -H 'Content-Type: application/x-www-form-urlencoded' https://localhost:9443/oauth2/token
	``` 

	```cURL tab="Sample Request"
	curl -i -X POST -H 'Content-Type: application/x-www-form-urlencoded' -u bBhEoE2wIpU1zB8HA3GfvZz8xxAa:RKgXUC3pTRQg9xPpNwyuTPGtnSQa -k -d 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjE0NTgxNjY5ODUsInN1YiI6ImFkbWluIiwibmJmIjoxNDU4MTA2OTg1LCJhdWQiOlsiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQzXC9vYXV0aDJcL3Rva2VuIiwid3NvMi1JUyJdLCJpc3MiOiJqd3RJRFAiLCJqdGkiOiJUb2tlbjU2NzU2IiwiaWF0IjoxNDU4MTA2OTg1fQ.ZcxdoTVEsWoil80ne42QzmsfelMWyjRZJEjUK1c2vMZJjjtrZnsWExyCA5tN6iXYFAXC_7rkFuuNSgOlBi51MNLPZw3WcgGI52j6apGEW92V2tib9zRRWOeLQLAdo8ae8KzLp7kuKZ2XunfQ2WYU9TvvLDm_vp5ruuYz3ZZrJOc' https://localhost:9443/oauth2/token 
	```

	Note that a refresh token and access token get generated.

	```cURL tab="Sample Response"
	{"token_type":"Bearer","expires_in":3600,"refresh_token":"b1b4b78e2b0ef4956acb90f2e38a8833","access_token":"615ebcc943be052cf6dc27c6ec578816"} 
	```
