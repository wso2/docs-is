# Authorization Code Grant with OAuth 2.0 Playground

This page guides you through using a sample Playground application to try out authentication to an OAuth 2.0/OpenID Connect web application using the [Authorization Code]({{base_path}}/references/concepts/authorization/authorization-code-grant/) grant type.

----

## Set up the sample application

{!./includes/deploying-sample-apps.md!}


{!./includes/deploy-playground.md!}


{!./includes/deploy-playground-with-check-session.md!}

---

## Register a service provider

1. On WSO2 Identity Server Management Console, go to **Main** > **Identity** > **Service Providers** and click **Add**.

2. Enter `playground2` as the **Service Provider Name** text box, and click **Register**.

3. Expand the **Inbound Authentication Configuration > OAuth/OpenID Connect Configuration** and click **Configure**.

4. Fill in the form that appears. By default, all **Allowed Grant Types** are selected; you can disable the grant types that are not required.

    !!! note
        The **custom** grant type will only appear on the UI if you have configured the JWT grant type. The value specified as the `name` of the `oauth.custom_grant_type` in the `deployment.toml` file when creating the custom grant type is the value that will appear on the UI. For more information on writing a custom grant type, see [Write a Custom OAuth 2.0 Grant Type]({{base_path}}/references/extend/oauth2/write-a-custom-oauth-2.0-grant-type).

5. Enter the **Callback Url** as `http://wso2is.local:8080/playground2/oauth2client`.

    !!! tip
        For more information on other advanced configurations refer, [Advanced OpenID Connect]({{base_path}}/guides/login/oidc-parameters-in-auth-request/).

7. Click **Add**. Note that `client key` and `client secret` are generated.

8. Click **Update**.

----

## Try Authorization Code grant 

1.  Enter the following details.

    - **Authorization Grant Type**: Authorization Code 

    - **Client ID**: The OAuth Client Key received when registering the service provider.

    - **Callback URL**: `http://<TOMCAT_HOST>:<TOMCAT_PORT>/playground2/oauth2client`

    - **Authorize Endpoint**: `https://<IS_HOST>:<IS_PORT>/oauth2/authorize`

    - **Scope**: Any scope you wish to obtain the token for. To use the sample application with OpenID Connect, enter the value `openid` as the scope. This field is optional. 

	<img name='auth-code-without-pkce' src='{{base_path}}/assets/img/samples/auth-code-without-pkce.png' class='img-zoomable'/>

2. Fill the following two fields only if you wish to use PKCE. If you are not using PKCE, proceed to step 3.

	- **Use PKCE:** Select **Yes**. 

	- **PKCE Challenge Method:** Select the relevant method. For more information about the PKCE Challenge Methods, see [the specification](https://tools.ietf.org/html/rfc7636#section-4.2)

	<img name='auth-code-with-pkce' src='{{base_path}}/assets/img/samples/auth-code-with-pkce.png' class='img-zoomable'/>

3. Click **Authorize**. 

	The playground application will send an
	[authorization request](https://tools.ietf.org/html/rfc6749#section-4.1.1)
	to the **authorize** endpoint of the WSO2 Identity Server using the
	following format.

	!!! abstract ""
		**Request Format**
		```java
		https://<host>:<port>/oauth2/authorize?response_type=code
		&client_id=<client-ID>
		&redirect_uri=<callback-url>
		&scope=<scope>
		```
		---
		**Sample Request**
		```java
		https://localhost:9443/oauth2/authorize?response_type=code
		&client_id=Cx4LKFNObeuXocx7xgOpz5vfzFoa
		&redirect_uri=http://wso2is.local:8080/playground2/oauth2client
		&scope=openid
		``` 

4. Log in with user credentials (e.g., admin/admin).  

5. Provide the requested consent and enter the following details on the screen that appears. 

    - **Callback URL:** `http://<TOMCAT_HOST>:<TOMCAT_PORT>/playground2/oauth2client`

    - **Access Token Endpoint:** `https://<IS_HOST>:<IS_PORT>/oauth2/token` 

    - **Client Secret:** The client secret received when registering the service provider.

	- **PKCE Verifier:** This will be populated using the value generated in step 1 only if you are using PKCE. 

5. Click **Get Access Token**. At this point, the application receives the access token. 

6. Enter the **Introspection Endpoint** (i.e, `https://<IS_HOST>:<IS_PORT>/oauth2/introspect`) and click **Get TokenInfo** to get the token information. 

7.  Now you should be able to see the access token information as seen
    below, as long as the provided access token is valid.  

	<img name='access-token-info' src='{{base_path}}/assets/img/samples/access-token-info.png' class='img-zoomable'/>
