# Pass OIDC Authentication Request Parameters in a Request Object

This page guides you through passing a set of request parameters as its claims using a JWT in a [request object]({{base_path}}/references/concepts/authentication/request-object). 
If you want to pass any sensitive parameter with the authentication request which needs additional security you can pass it as a request object.

## Register a service provider

{!./includes/register-a-service-provider.md!}

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

## Configure claims

1. Add two new external claims as follows for the `http://wso2.org/oidc/claim` dialect. For detailed instructions on how 
   to add a new claim mapping to a claim dialect, see [Adding Claim Mapping]({{base_path}}/guides/dialects/add-claim-mapping). 
             
    ![external claim 1]({{base_path}}/assets/img/guides/oidc-external-claim-1.png)
   
    ![external claim 2]({{base_path}}/assets/img/guides/oidc-external-claim-2.png)
   
    !!! note
        Here, `customClaim1` and`customClaim2` are selected as claim
        URIs because they are not configured as requested claims in the
        OIDC scope. For the purpose of testing, these claims are mapped
        to the existing `http://wso2.org/claims/challengeQuestion1` and
        `http://wso2.org/claims/challengeQuestion2` local claims. If
        required, you can create two new local claims for this purpose.

2.  While adding claims, if you want the the claims to prompt during user registration, make sure you select **Support by default** 
    registration. Follow the steps below to set **Challenge Question1** and **Challenge Question2** to prompt during user
    registration:
    1.  On the management console, click **List** under **Claims**. This displays the **Claims** screen with the 
    **Available claim dialects**.
    2.  Click `http://wso2.org/claims` under **Available claim dialects**.
    3.  Edit `Challenge Question1`, select **Support by default**. and then click **Update**.
    4.  Edit `Challenge Question2`, select **Support by default**. and then click **Update**.
            
3.  Edit the service provider that you created above, expand **Claim Configuration**, and add the following as **Requested Claims**:
    -   `              http://wso2.org/claims/challengeQuestion1             `
    -   `              http://wso2.org/claims/challengeQuestion2             `
    -   `              http://wso2.org/claims/country             `
    -   `                             http://wso2.org/claims/emailaddress                                         `

    !!! tip
        	If a user has already consented once to the requested
        	claims that are configured on the service provider, any further
        	changes/additions to the requested claims will not apply. If you
        	are facing this issue, do one of the following.
        	<ul>
        	<li>Mark the claims given above as **Mandatory Claims**. This
        		will ensure that the user will be prompted once again to
        		provide consent for the newly added/changed claims.
        		</li>
        	<li>Log in to my account, revoke the consent receipt
        		for the application, and then attempt to log in to the
        		application again. Now you will be prompted to provide
        		consent for all requested claims, including the newly
        		added/changed claims. For more information on
        		revoking/accepting user consent, see [Consent management]({{base_path}}/guides/my-account/manage-consent-my-account).
            </li>
            </ul>
            
4.  Click **Update**.

5.  Create a new user with the name, and enter values for the **Email**, **Country**, **Challenge Question1** as
    , and **Challenge Question 2** in the user profile. 
    
    !!! note
        For detailed instructions on creating a user and customizing a user's profile,
        see [Add Users]({{base_path}}/guides/identity-lifecycles/admin-creation-workflow/) and [Update User Profiles]({{base_path}}/guides/identity-lifecycles/update-profile).

---

## Create a signed request object

Create a JWT with the following payload and sign (RSA256) it with the private key of the keystore created in 
[here](#configure-the-service-provider-public-certificate). (You can use <https://jwt.io/> for this)

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

---

## Try it

-   To test the flow without a signed request object, specify the
    `          authorization_code         ` grant type for the user, and
    use the OIDC scope from the playground application to obtain an
    `          id_token         ` . Then retrieve user information using
    the access token.


-   To test the flow with a signed request object, use the
    `           authorization_code          ` grant for the user, and
    specify the authentication endpoint as
    `           https://localhost:9443/oauth2/authorize?request=<JWT>          `. 
    Next, obtain the `           id_token          ` and retrieve user
    information.

    !!! note
        The JWT used here is the signed JWT created in [Create a signed request object](#create-a-signed-request-object).
    
---

## Analyzing the response

When you analyze the responses of the two tests, you will observe that
together with `         customClaim2        ` retrieved in the userinfo
response, an additional claim `         customClaim1        ` is
retrieved via the `         id_token        ` when you configure the
authorization code flow with a signed request object.  


!!! info "Related topics"
    - [Concept: Request Object]({{base_path}}/references/concepts/authentication/request-object)
    - [Quick Start: OpenID Connect Request Object]({{base_path}}/quick-starts/request-object)
    - [Guide: Use Advanced Parameters in Authentication Requests]({{base_path}}/oidc-parameters-in-auth-request)
