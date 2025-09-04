# JWT Bearer Grant

The [JWT Bearer Grant](https://datatracker.ietf.org/doc/html/rfc7523){: target="_blank"} allows clients to get access tokens by presenting a JWT (JSON Web Token) assertion to {{product_name}}. Follow this guide to implement the JWT bearer grant using {{product_name}}.

## Overview

The JWT bearer grant,

- Enables a client to authenticate and request access tokens without user intervention.

- Validates the JWT against a trusted identity provider before issuing tokens.

The diagram below shows how the JWT bearer grant type works:

![JWT bearer grant]({{base_path}}/assets/img/guides/oidc/jwt-bearer-grant.png){: width="600px"}

When a client application requests for an access token:

1.	The client application sends an access request to the identity provider trusted by {{product_name}}.

2.	The trusted identity provider creates a JWT assertion and sends it back to the application.

3.	The application then forwards the access request to the **token endpoint** in {{product_name}} with the following information:
	-	The grant type set to `JWT`.
	-	The JWT assertion received from the trusted identity provider.
	-	Application's own `client key` and `client secret`.

4.	{{product_name}} receives this information and go through the following steps:

    - The token endpoint recognizes the request as a JWT Bearer grant and invokes the **JWT bearer grant handler**.

    - The JWT bearer grant handler checks for the identity provider that issued the JWT token based on the  `iss` claim in the JWT assertion. (See more details in the [payload section](#payload)).

5. Once {{product_name}} identifies the identity provider, it does the following to validate the JWT assertion:

    - retrieves the identity provider’s configurations, including the public certificate.

    - validates the JWT signature using the public certificate.

6.	Once validated, WSO2 Identity Server creates an access token which the application can use to access resources.

## Create a valid JWT assertion

When using JWT Bearer Grant, {{product_name}} validates key elements in the JWT before issuing an access token.

This section explains the three main components of a JWT: header, payload, and signature. It also highlights the claims required for the grant to work correctly. By understanding these details, you can create valid JWT assertions and troubleshoot token requests.

### Header

The header specifies the algorithm used to sign the JWT and the token type. For example:

```js
{
    "alg": "RS256",
    "Type": "JWT"
}
```

- `alg` - The signing algorithm (e.g., RS256).

- `Type` – The token type i.e `JWT`.

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
			<td>Uniquely identifies the identity provider that issued the JWT.</td>
		</tr>
		<tr>
			<td>sub</td>
			<td>Subject</td>
			<td>Mandatory</td>
			<td>The principal (user or client) that the JWT represents. {{product_name}} issues the access token for the entity identified by `sub`</td>
		</tr>
		<tr>
			<td>aud</td>
			<td>Audience</td>
			<td>Mandatory</td>
			<td>Specifies the intended recipient of the JWT. For the JWT Bearer Grant, this must be the token endpoint of the authorization server.</td>
		</tr>
		<tr>
			<td>exp</td>
			<td>Expiration Time</td>
			<td>Mandatory</td>
			<td>Specifies the expiration time (in epoch seconds) of the JWT . {{product_name}} rejects the JWT if the current time exceeds this value.</td>
		</tr>
		<tr>
			<td>nbf</td>
			<td>Not before</td>
			<td>Optional</td>
			<td>Specifies the earliest time (in epoch seconds) when the JWT becomes valid.</td>
		</tr>
		<tr>
			<td>iat</td>
			<td>Issued at</td>
			<td>Optional</td>
			<td>Specifies the time (in epoch seconds) when the JWT was issued.</td>
		</tr>
		<tr>
			<td>jti</td>
			<TD>JSON Web Token Id</TD>
			<td>Optional</td>
			<td>Specifies a unique identifier for the JWT.</td>
		</tr>
		<tr>
			<td>Custom claims</td>
			<td>N/A</td>
			<td>Optional</td>
			<td>These claims extend the standard JWT specification and can include any application-specific information.</td>
		</tr>
	</tbody>
</table>

An example payload looks as follows:

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

The signature verifies the integrity of the JWT and confirms the issuer's identity. To generate the signature:

1. Encode *header* and *payload* using base64.

2. Concatenate the encoded values with a period (.) to form the signing input:

	```js
	Base64(header) + '.' + Base64(payload)
	```

3. Apply the specified algorithm (from the header) to the signing input to produce the cryptographic signature. This ensures that any change to the header or payload invalidates the token.

### JWT assertion

With the header, payload and the signature in place, you can create the JWT assertion by base64 encoding each of these elements and concatenating them with a period (.).

```js
Base64(header) + '.' + Base64(payload) + '.' +  Base64(signature)
```

An example JWT assertion looks as follows.
	```js
	eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImF1ZCI6WyJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDNcL29hdXRoMlwvdG9rZW4iXSwibmJmIjoxNTA3NTQ2MTAwLCJpc3MiOiJqd3RJRFAiLCJleHAiOjE1MDc2MDYxMDAsImlhdCI6MTUwNzU0NjEwMCwianRpIjoiVG9rZW41Njc1NiJ9.iGMhjibB0W2QFQlM27gnHp6z47Eybv8cAHk2o2i-xqo2S4uJ_1VppFI4CCJXTj4qzV9vmkJ5HKNAayiTa6wOMXGL4XnwYwpOAoKXvboznlEDNRpw3htW34nLvyUu6PjHbdvAPVjh8kPRwf7esRr2p-luecGvC21mjWdhyGzM4hE
	```

## Register the identity provider in {{product_name}}

For {{product_name}} to trust the identity provider, you need to register it as a connection. To do so,

1. On the {{product_name}} Console, go to **Connections**.

2. Click **New Connection**, select your preferred connection type and click **Create**.

3. Complete creating the connection by providing the following information.

    !!! tip

        Depending on the connection type, you can find these settings either in the creation wizard or in the **General** and **Settings** pages once you finish creating the connection.

    <table>
		<tbody>
			<tr>
				<td>Identity provider name</td>
				<td>The name of the identity provider that issues the JWT. This should match the <code>iss</code> claim in the JWT assertion.</td>
			</tr>
			<tr>
				<td>Certificates</td>
				<td>Specify whether {{product_name}} should <b>Use JWKS Endpoint</b> or you will <b>Provide Certificates</b> by uploading them.</td>
			</tr>
			<tr>
				<td>JWKS Endpoint URL</td>
				<td>Provide the JWKS endpoint if you chose to provide an endpoint.</td>
				<td></td>
			</tr>
			<tr>
				<td>Public certificate</td>
				<td>If you chose to upload a public certificate, click **New Certificate** and follow the wizard.</td>
			</tr>
			<tr>
				<td>Alias</td>
				<td>Provide an alias for the token endpoint.</td>
			</tr>
		</tbody>
	</table>

!!! note

	Refer to [OIDC IdP configurations]({{base_path}}/references/idp-settings/oidc-settings-for-idp/) to learn more about configuring identity providers.

## Register the application in {{product_name}}

Follow the steps below to register your client application in {{product_name}}.

1. On the {{product_name}} Console, go to **Applications**.

2. Click **New Application** and create an OIDC **Standard-Based Application**.

    !!! note

        Refer to [Register a standard-based app]({{base_path}}/guides/applications/register-standard-based-app/) to learn more.

3.	Go to the **Protocol** section of the application and under **Allowed grant types**, select **JWT Bearer**.

4. Click **Update** to save the changes.

5. Take note of the **client ID** and the **client secret** generated for the application.

!!! note

	Refer to [OIDC app configurations]({{base_path}}/references/app-settings/oidc-settings-for-app/) to learn more about configuring applications.

!!! note

	When configuring the JWT Bearer grant type, you can also set the `iat` validation time window in the `<IS_HOME>/repository/conf/deployment.toml` file. By default, this window is 30 minutes.
		
	```toml
	[oauth.grant_type.jwt]
	enable_iat_validation="true"
	iat_validity_period=30
	```

## Try it out

Now that you have successfully registered the client application and the trusted identity provider, follow these steps to try out the JWT bearer grant flow.

1.	Generate a request object (JWT) using the following.

	-	**iss**: This is the `client key` that was generated under step 3.d under [Configurations](#step3d) above.
	-	**sub**: This is the `client key` that was generated under step 3.d under [Configurations](#step3d) above.
	-	**aud**: `https://localhost:9443/oauth2/token`
	-	**iat**: This is the epoch of the token issuance time, e.g., `1575024942`.
	-	**jit**: This is the epoch of the token expiry time, e.g., `1575107914`.

	```json
	{
		"alg": "RS256",
    	"type": "JWT"
	}

	{
		"iss": "NCkZofT51NVKK2UuQSvxPJhQOWwa",
	    "sub": "NCkZofT51NVKK2UuQSvxPJhQOWwa", 
	    "aud": "https://localhost:9443/oauth2/token",
	    "iat": "1575024942",
	    "jit": "1575107914"
	}

	{
		<Signature>
	}
	```

2.	To get an access token and a refresh token, make a POST request to the {{product_name}} token endpoint.

    === "Request format"

        ```curl
	    curl -i -X POST -u <CLIENT_ID>:<CLIENT_SECRET> -k -d \
        'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=<JWT>' \
        -H 'Content-Type: application/x-www-form-urlencoded' \
        https://localhost:9443/oauth2/token
	    ```

    === "Example"

        ```cURL
	    curl -i -X POST  -u bBhEoE2wIpU1zB8HA3GfvZz8xxAa:RKgXUC3pTRQg9xPpNwyuTPGtnSQa  -k -d \
        'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjE0NTgxNjY5ODUsInN1YiI6ImFkbWluIiwibmJmIjoxNDU4MTA2OTg1LCJhdWQiOlsiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQzXC9vYXV0aDJcL3Rva2VuIiwid3NvMi1JUyJdLCJpc3MiOiJqd3RJRFAiLCJqdGkiOiJUb2tlbjU2NzU2IiwiaWF0IjoxNDU4MTA2OTg1fQ.ZcxdoTVEsWoil80ne42QzmsfelMWyjRZJEjUK1c2vMZJjjtrZnsWExyCA5tN6iXYFAXC_7rkFuuNSgOlBi51MNLPZw3WcgGI52j6apGEW92V2tib9zRRWOeLQLAdo8ae8KzLp7kuKZ2XunfQ2WYU9TvvLDm_vp5ruuYz3ZZrJOc' \
        -H 'Content-Type: application/x-www-form-urlencoded' \
        https://localhost:9443/oauth2/token 
	    ```

	- **CLIENT_ID**: Client ID generated for the application.
	- **ClIENT_SECRET**: Client secret generated for the application.
	- **JWT**: The JWT assertion constructed according to the [Create a valid JWT assertion](#create-a-valid-jwt-assertion) section.

    {{product_name}} responds with an access token and a refresh token as shown below.

    ```json
	{"token_type":"Bearer",
    "expires_in":3600,
    "refresh_token":"b1b4b78e2b0ef4956acb90f2e38a8833",
    "access_token":"615ebcc943be052cf6dc27c6ec578816"} 
	```

	!!! tip

		If you are using a [multi-tenanted]({{base_path}}/guides/multitenancy/) set up and have configured the application and the identity provider within a tenant, add the tenant domain as a query parameter to the access token endpoint.
        
        For example, if the tenant domain is `wso2.com`, the access token endpoint should be `https://localhost:9443/oauth2/token?tenantDomain=wso2.com`.
