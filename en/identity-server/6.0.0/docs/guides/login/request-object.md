# Pass OIDC Authentication Parameters as a Request Object

This page guides you through passing OpenID Connect authentication request parameters in a self contained JWT, instead of passing plain request parameters using a sample application. A JWT that contains a set of request parameters as its claims is known as a request object.

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

## Configure the public certificate

The following steps describe how to configure a service provider public certificate.

1.  Create a new keystore.

    ``` java
    keytool -genkey -alias wso2carbon -keyalg RSA -keysize 2048 -keystore testkeystore.jks -dname "CN=*.test.com,OU=test,O=test,L=MPL,ST=MPL,C=FR" -storepass wso2carbon -keypass wso2carbon -validity 10950
    ```

2.  Create a file and name it as the client ID of the OAuth application service provider. Export the public key of the new keystore to the file you created.

    ``` java
    keytool -export -alias wso2carbon -file <client-id> -keystore testkeystore.jks
    ```

3.  Get the cert in X509 format.

    ``` java
    keytool -printcert -rfc -file <client-id>
    ```

    You will see the public certificate in X509 format in the console.
    
4. Copy the content of the certificate. A sample output is shown below. 

    ``` java
	-----BEGIN CERTIFICATE-----
	MIIDVzCCAj+gAwIBAgIETCZA8zANBgkqhkiG9w0BAQsFADBcMQswCQYDVQQGEwJG
	UjEMMAoGA1UECBMDTVBMMQwwCgYDVQQHEwNNUEwxDTALBgNVBAoTBHRlc3QxDTAL
	BgNVBAsTBHRlc3QxEzARBgNVBAMMCioudGVzdC5jb20wHhcNMTgwMjE0MDYzNjE3
	WhcNNDgwMjA3MDYzNjE3WjBcMQswCQYDVQQGEwJGUjEMMAoGA1UECBMDTVBMMQww
	CgYDVQQHEwNNUEwxDTALBgNVBAoTBHRlc3QxDTALBgNVBAsTBHRlc3QxEzARBgNV
	BAMMCioudGVzdC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCz
	Gc/BcXCiIagLhXs1g90H+PbfZyXLzwFJ+YmsKMikcffhyopDD+fnFjHb1+XXSnUh
	4XzQlFba6m2vIOK8uquMhZKMv/E7Vxkl/ADTuw/BgpZRut4p88Fn8OWZlrJfoi3o
	hvgfxSMratvxLMp1Qe0BzjwoBDB9r+h9pj8kCpHC824eUGIR0FZsW9lnoJP2LegL
	nAcOJuNBoeWC0wwNu0sgIJwjsKp3G3glm8B4GdZvbF8aW1QRAk36sh8+0GXrRnAz
	aGcRAqt7CjeZmt5Dsuy0lfp5i1xf5myPOH7MwKHqQQ56Wu9O479NdDVLkJ0xne2r
	ZTCwMeGhQQH5hI+SYlxjAgMBAAGjITAfMB0GA1UdDgQWBBTzS+bja//25xb+4wcP
	gMN6cJZwoDANBgkqhkiG9w0BAQsFAAOCAQEAdhZ8romzQQKF9c8tJdIhUS4i7iJh
	oSjBzN+Ex9+OJcW6ubcLb8pai/J3hcvMadAybR1A17FkETLFmG9HkuEN9o2jfU7c
	9Yz5d0pqO8qNKXSqHky5c+zA4vzLZGsgKyDZ5a0p9Qpsat3wnA3UGZPRoVGV5153
	Mb0J1n1uubxGobEEzR2BXaKO9YEWAMQwGRdQCGBaIeGUOpqSUJMLYirDXL03je3g
	mYzWclLTEHpIYy+a66tmF9uTGgyys33LPm2pQ+kWd8FikWolKKBqp+IPU5QdUQi1
	DdFHsyNqrnms6EOQAY57Vnf91RyS7lnO1T/lVR6SDk9+/KDBEL1b1cy7Dg==
	-----END CERTIFICATE-----
    ```

4.  Click **Service Providers > List** and **Edit** the service provider you created. 

5. Select **Upload SP Certificate** under  **Select SP Certificate Type**.

6. Paste the certificate content copied in step 4 as the **Application Certificate**.

    ![Upload SP certificate]({{base_path}}/assets/img/guides/upload-sp-cert.png)
    
    !!! note

		Instead of uploading the service provider certificate as shown
		above, you can choose to use the JWKS enpoint as shown below and
		add the relevant JWKS URI.

		![JWKS URI]({{base_path}}/assets/img/guides/jwks-uri.png)

7. Click **Update**.

----

{!./includes/oidc-custom-claims.md!}

-----

## Create request object

1. Create a user called "Tom" with login permission.

    For instructions, see [Add a User]({{base_path}}/guides/identity-lifecycles/admin-creation-workflow/) and [Add a Role]({{base_path}}/guides/identity-lifecycles/add-user-roles/).

2. Edit Tom's user profile and enter values for **email**, **country**, **challenge Question1**, and **challenge Question 2**. 
    For instructions, see [Edit User Profile]({{base_path}}/guides/identity-lifecycles/update-profile/).

3. Create a JWT with the following payload and sign(RSA256) it with the private key of the keystore you created above.

    ```
    {
      "client_id": "<client-id>",
      "sub": "<client-id>",
      "aud": [
        "https://localhost:9443/oauth2/token"
      ],
      "claims": {
        "userinfo": {
          "given_name": {
            "essential": true
          },
          "nickname": null,
          "email": {
            "essential": true
          },
          "customClaim2": {
            "essential": true
          }
        },
        "id_token": {
          "gender": null,
          "birthdate": {
            "essential": true
          },
          "customClaim1": {
            "essential": true
          }
        }
      },
      "iss": "<client-id>",
      "exp": 1516786878,
      "iat": 1516783278,
      "jti": "1003"
    }
    ```

    This creates a signed request object.

----

## Try it out

Try out both of the following flows and observe the responses.

1. First, test the flow without a signed request object:
    
    Use the `authorization_code` grant type for the user, and use the OIDC scope from the playground application to obtain an `id_token`. Then, retrieve user information using the access token.

2. Next, test the flow with a signed request object:

    Use the `authorization_code` grant for the user, and specify the authentication endpoint as `https://localhost:9443/oauth2/authorize?request=<JWT>`. Next, obtain the `id_token` and retrieve user information.

    !!! tip
        The JWT used here is the signed JWT created in the previous section of this guide.

When you analyze the responses of the two tests, you will observe that together with `customClaim2` retrieved in the userinfo response, an additional claim `customClaim1` is retrieved via the `id_token` when you configure the authorization code flow with a signed request object.   

-----

## Configure signature validation for request objects

Now that you understand how to pass OIDC authentication request parameters in a signed request object via WSO2 IS, you can configure a service provider to only accept signed request objects.

Request objects can either be signed or unsigned. Therefore, if you want to only accept signed request objects in an authorization request, you need to enable request object signature validation in the OAuth/OIDC configuration of the service provider.

1. Click **Service Providers > List** and **Edit** the service provider you created for the application.

2. Expand **Inbound Authentication Configuration**, and then expand **OAuth2/OpenID Connect Configuration**.

3. Select **Enable Request Object Signature Validation** to enforce signature validation for request object.

4. To verify that signature validation has been configured successfully, send a plain JWT instead of a signed one in the authorization code grant request.

    If signature validation is successfully enforced, the request should get rejected and you should see an error page.

    ![Signature validation successful]({{base_path}}/assets/img/samples/signature-validation-successful.png)

---- 

!!! info "Related topics"
    - [Use Advanced Parameters in Authentication Requests ]({{base_path}}/guides/login/oidc-parameters-in-auth-request/)