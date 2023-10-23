# Encrypt ID Tokens

This page guides you through configuring token encryption for ID tokens using the WSO2 IS playground sample application.

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

## Enable ID token encryption

1. On the management console, click **Service Providers > List** and **Edit** the "playground" service provider you created. 

2. Expand **Inbound Authentication Configuration** and then **OAuth/OpenID Connect Configuration**. 

3. Click **Edit**.

4. Click **Enable ID Token Encryption** to enable id\_token encryption.

    Once you enable id\_token encryption, two select boxes will be
    visible to choose your preferred encryption algorithm and encryption
    method.

    -   **Encryption Algorithm:** Asymmetric encryption algorithm that is used to encrypt the Content Encryption Key (CEK), using the
        public key of the service provider.

    -   **Encryption Method:** Symmetric encryption algorithm that is used to encrypt the JWT claims set using the CEK.

    Leave these values as they are if you do not have any specific requirements.

-----

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

You have successfully set up token encryption and the sample Playground application. You can now try out one of the grant type flows to receive an encrypted ID token and decrypt it.

- [Authorization grant flow](#try-authorization-grant-flow)
- [Implicit grant flow](#try-implicit-grant-flow)
- [Password grant flow](#try-password-grant-flow)

----

## Try authorization grant flow

1.  Visit the URL, `http://<IS_HOST>:<IS_PORT>/playground2/oauth2.jsp` to start the application.

2.  Enter the following details and click **Authorize**.

    -   **Authorization Grant Type:** Authorization Code

    -   **Client ID:** (the client ID received when you registered the service provider)

    -   **Scope:** openid

    -   **Callback URL:** `http://<IS_HOST>:<IS_PORT>/playground2/oauth2client`

    -   **Authorize Endpoint:** `https://<IS_HOST>:<IS_PORT>/oauth2/authorize`

3.  Sign in with user credentials.

4.  Click **Approve** to consent to this action.

5.  Provide the following details and click **Get Access Token**.  

    -   **Callback URL:**  `http://<IS_HOST>:<IS_PORT>/playground2/oauth2client`

    -   **Access Token Endpoint:** `https://<IS_HOST>:<IS_PORT>/oauth2/token`

    -   **Client Secret:** (the client secret received when you registered the service provider)  

6.  At this point, the application receives the access token and the encrypted ID token.

7.  In order to decrypt the ID Token, you need to provide the private key of the client.

    1.  Import JKS into a PKCS12 formatted store.

        ``` java
        keytool -importkeystore -srckeystore testkeystore.jks -destkeystore testkeystore.p12 -srcstoretype JKS -deststoretype PKCS12 -srcstorepass wso2carbon -deststorepass wso2carbon -srcalias wso2carbon -destalias wso2carbon -srckeypass wso2carbon -destkeypass wso2carbon
        ```

    2.  Extract the private key into a file named `key.pem`.

        ``` java
        openssl pkcs12 -in testkeystore.p12 -out key.pem -passin pass:wso2carbon -passout pass:wso2carbon -nodes -nocerts
        ```

    3.  Open the created `key.pem` file using a text editor and you will see the extracted private key.

    4.  Copy only the key string as shown in the sample below.

        ![Sample key string]({{base_path}}/assets/img/guides/sample-key-string.png)

8.  Paste the copied private key in the **Client Private Key** text area.

9.  Click **Decrypt** and the details of the decrypted ID Token will be displayed.

## Try implicit grant flow

1.  Visit the URL, `http://<IS_HOST>:<IS_PORT>/playground2/oauth2.jsp` to
    start the application.

2.  Enter the following details and click **Authorize**.

    -   **Authorization Grant Type:** Implicit

    -   **Client ID:** (the client ID received when you registered the service provider)

    -   **Scope:** openid 

    -   **Callback URL:** `http://<IS_HOST>:<IS_PORT>/playground2/oauth2client`

    -   **Authorize Endpoint:** `https://<IS_HOST>:<IS_PORT>/oauth2/authorize`

4.  Sign in with the user credentials.  

5.  Click **Approve** to consent to this action.  

6.  At this point, the application receives the access token and the encrypted ID Token. 
 
7.  In order to decrypt the ID Token, you need to provide the private key of the client.

    1.  Import JKS into a PKCS12 formatted store.

        ``` java
        keytool -importkeystore -srckeystore testkeystore.jks -destkeystore testkeystore.p12 -srcstoretype JKS -deststoretype PKCS12 -srcstorepass wso2carbon -deststorepass wso2carbon -srcalias wso2carbon -destalias wso2carbon -srckeypass wso2carbon -destkeypass wso2carbon
        ```

    2.  Extract the private key into a file named `key.pem`.

        ``` java
        openssl pkcs12 -in testkeystore.p12 -out key.pem -passin pass:wso2carbon -passout pass:wso2carbon -nodes -nocerts
        ```

    3.  Open the created `key.pem` file using a text editor and you will see the extracted private key.

    4.  Copy only the key string as shown in the sample below.

        ![Sample key string]({{base_path}}/assets/img/guides/sample-key-string.png)

8.  Paste the copied private key in the **Client Private Key** text area.

9.  Click **Decrypt** and the details of the decrypted ID Token will be displayed.


## Try password grant flow 


1. Visit the URL, `http://<IS_HOST>:<IS_PORT>/playground2/oauth2.jsp` to start the application.

2. Enter the following details and click **Authorize**.

    -   **Authorization Grant Type:** Resource Owner
    
    -   **Client ID:** (the client ID received when you registered the service provider)

        -   **Client Secret** : (the client secret received when you registered the service provider)

    -   **Resource Owner User Name** : admin (username)

    -   **Resource Owner Password** : admin (password of user)

    -   **Scope:** openid 

    -   **Access Token Endpoint:** `https://<IS_HOST>:<IS_PORT>/oauth2/token`

4.  At this point, the application receives the access token and the encrypted ID Token.  

5.  In order to decrypt the ID Token, you need to provide the private key of the client.
    1.  Import JKS into a PKCS12 formatted store.

        ``` java
        keytool -importkeystore -srckeystore testkeystore.jks -destkeystore testkeystore.p12 -srcstoretype JKS -deststoretype PKCS12 -srcstorepass wso2carbon -deststorepass wso2carbon -srcalias wso2carbon -destalias wso2carbon -srckeypass wso2carbon -destkeypass wso2carbon
        ```

    2.  Extract the private key into a file named `key.pem`.

        ``` java
        openssl pkcs12 -in testkeystore.p12 -out key.pem -passin pass:wso2carbon -passout pass:wso2carbon -nodes -nocerts
        ```

    3.  Open the created `key.pem` file using a text editor and you will see the extracted private key.

    4.  Copy only the key string as shown in the sample below.

        ![Sample key string]({{base_path}}/assets/img/guides/sample-key-string.png)


6.  Paste the copied private key in the **Client Private Key** text area.

7.  Click **Decrypt** and the details of the decrypted ID Token will be displayed.



