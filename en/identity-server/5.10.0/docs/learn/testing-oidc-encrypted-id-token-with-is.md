# Testing OIDC Encrypted ID Token with IS

This page describes how you can configure and test OIDC Encrypted ID
Token with Identity Server 5.9.0.

## Setup Playground Sample

First, you should [setup the Playground sample
app](../../learn/basic-client-profile-with-playground#setting-up-the-playground-sample).

## Configuring the service provider

The next step is to [configure the service
provider.](../../learn/adding-and-configuring-a-service-provider)

## Configuring Service Provider Public Certificate

The following steps describe how to configure a service provider public
certificate:

1.  Create a new keystore.

    ``` java
    keytool -genkey -alias wso2carbon -keyalg RSA -keysize 2048 -keystore testkeystore.jks -dname "CN=*.test.com,OU=test,O=test,L=MPL,ST=MPL,C=FR" -storepass wso2carbon -keypass wso2carbon -validity 10950
    ```

2.  Export public key of the new keystore to a file with the name of
    client-id of oauth application.

    ``` java
    keytool -export -alias wso2carbon -file <client-id> -keystore testkeystore.jks
    ```

3.  Get the cert in X509 format.

    ``` java
    keytool -printcert -rfc -file <client-id>
    ```

    You will see the public certificate in X509 format in the console.
    Copy the content of the certificate. (Sample output given below)

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

4.  Navigate to service provider.

5.  **Edit** and paste the certificate content copied in the above step
    and Click **Update**.

### Enable ID Token Encryption

Follow the below steps to enable ID Token Encryption:

1.  Navigate to **Service Provider \> Inbound Authentication
    Configuration \> OAuth/OpenID Connect Configuration** and Click
    **Edit**.

2.  Click **Enable ID Token Encryption** to enable id\_token encryption.

    Once you enable id\_token encryption, two select boxes will be
    visible to choose your preferred encryption algorithm and encryption
    method.

    -   Encryption Algorithm: Asymmetric encryption algorithm that is
        used to encrypt the Content Encryption Key (CEK), using the
        public key of the service provider.

    -   Encryption Method: Symmetric encryption algorithm that is used
        to encrypt the JWT claims set using the CEK.

    Leave these values as they are since you do not have special
    requirements.

## Testing the flow - Authorization Code Grant Type

1.  Visit the URL <http://wso2is.local:8080/playground2/oauth2.jsp> to
    start the application.

2.  Enter the following details and click **Authorize**.

    -   **Authorization Grant Type:** Authorization Code
    -   **Client ID:** (the client id received at the application
        registration step in Identity Server)
    -   **Scope:** openid (This scope is a requirement to provide user
        information. Any token without this scope will not be allowed to
        access user information.)
    -   **Callback URL:**
        <http://wso2is.local:8080/playground2/oauth2client>
    -   **Authorize Endpoint:**
        <https://localhost:9443/oauth2/authorize>

3.  Sign in with the user credentials.

4.  Click **Approve** to consent to this action.

      

5.  Provide the following details and click **Get Access Token**.  

    -   **Callback URL:**
        <http://wso2is.local:8080/playground2/oauth2client>
    -   **Access Token Endpoint:** <https://localhost:9443/oauth2/token>
    -   **Client Secret:** (client secret received at the application
        registration)

      

6.  At this point, the application receives the Access Token and
    Encrypted ID Token.

      

7.  In order to decrypt the ID Token, you need to provide the private
    key of the client.

    ??? note "Click here to know how to Obtain the Service Provider Private Key"

		1.  Import JKS into a PKCS12 formatted store.=
			``` java
			keytool -importkeystore -srckeystore testkeystore.jks -destkeystore testkeystore.p12 -srcstoretype JKS -deststoretype PKCS12 -srcstorepass wso2carbon -deststorepass wso2carbon -srcalias wso2carbon -destalias wso2carbon -srckeypass wso2carbon -destkeypass wso2carbon
			```

		2.  Extract the private key into a file named “key.pem”.
			``` java
			openssl pkcs12 -in testkeystore.p12 -out key.pem -passin pass:wso2carbon -passout pass:wso2carbon -nodes -nocerts
			```

		3.  Open the created key.pem file using a text editor and you will
			see the extracted private key.

		4.  Copy only the key string as shown in the below sample.
			![sample-key-string](../assets/img/tutorials/sample-key-string.png)

8.  Paste the copied private key in Client Private Key text area.

9.  Click **Decrypt** and the decrypted ID Token details will be
    displayed.

## Testing the flow - Implicit Grant Type

1.  Follow the steps
    [here](../../learn/deploying-the-sample-app/#deploying-the-playground2-webapp)
    to download,
    [deploy](../../learn/deploying-the-sample-app/#deploy-the-sample-web-app)
    and [register](../../learn/deploying-the-sample-app/#configuring-the-service-provider_1) `playground2` application.

2.  Visit the URL <http://wso2is.local:8080/playground2/oauth2.jsp> to
    start the application.

3.  Enter the following details and click **Authorize**.

    -   **Authorization Grant Type:** Implicit
    -   **Client ID:** (the client id received at the application
        registration step in Identity Server)
    -   **Scope:** openid (This scope is a requirement to provide user
        information. Any token without this scope will not be allowed to
        access user information.)
    -   **Callback URL:**
        <http://wso2is.local:8080/playground2/oauth2client>
    -   **Authorize Endpoint:**
        <https://localhost:9443/oauth2/authorize>

4.  Sign in with the user credentials.  

5.  Click **Approve** to consent to this action.  

6.  At this point, the application receives the Access Token and the
    encrypted ID Token. 
 
7.  In order to decrypt the ID Token, you need to provide the private key of the client.
	
	??? note "Click here to know how to Obtain the Service Provider Private Key"
		1.  JKS into a PKCS12 formatted store.
			``` java
				keytool -importkeystore -srckeystore testkeystore.jks -destkeystore testkeystore.p12 -srcstoretype JKS -deststoretype PKCS12 -srcstorepass wso2carbon -deststorepass wso2carbon -srcalias wso2carbon -destalias wso2carbon -srckeypass wso2carbon -destkeypass wso2carbon
			```
		2.  Extract the private key into a file named “key.pem”.
			``` java
			openssl pkcs12 -in testkeystore.p12 -out key.pem -passin pass:wso2carbon -passout pass:wso2carbon -nodes -nocerts
			```
		3.  Open the created key.pem file using a text editor and you will see the extracted private key.
		4.  Copy only the key string as shown in the below sample.
			![sp-private-key](../assets/img/tutorials/sp-private-key.png)

8.  Paste the copied private key in Client Private Key text area.

9.  Click **Decrypt** and the decrypted ID Token details will be
    displayed.

      
## Testing the flow - Password Grant Type

1.  You must first
    [set up the `playground` sample webapp.](../../learn/deploying-the-sample-app/#deploying-the-playground2-webapp)
    in order to try this scenario.

2.  Visit the URL <http://wso2is.local:8080/playground2/oauth2.jsp> to
    start the application.

3.  Enter the following details and click **Authorize**.

    -   **Authorization Grant Type:** Resource Owner
    -   **Client ID:** (the client id received at the application
        registration step in Identity Server)
    -   **Client Secret** : (the client secret received at the
        application registration)
    -   **Resource Owner User Name** : (username)
    -   **Resource Owner Password** : (password of user)
    -   **Scope:** openid (This scope is a requirement to provide user
        information. Any token without this scope will not be allowed to
        access user information.)
    -   **Access Token Endpoint:**
        [https://localhost:9443/oauth2/](https://localhost:9443/oauth2/authorize)
        [token](https://localhost:9443/oauth2/token)

4.  At this point, the application receives the Access Token and the
    encrypted ID Token.  
5.  In order to decrypt the ID Token, you need to provide the private
    key of the client.

    ??? note "Click here to know how to Obtain the Service Provider Private Key"

		1.  JKS into a PKCS12 formatted store.
			``` java
			keytool -importkeystore -srckeystore testkeystore.jks -destkeystore testkeystore.p12 -srcstoretype JKS -deststoretype PKCS12 -srcstorepass wso2carbon -deststorepass wso2carbon -srcalias wso2carbon -destalias wso2carbon -srckeypass wso2carbon -destkeypass wso2carbon
			```

		2.  Extract the private key into a file named “key.pem”.
			``` java
			openssl pkcs12 -in testkeystore.p12 -out key.pem -passin pass:wso2carbon -passout pass:wso2carbon -nodes -nocerts
			```

		3.  Open the created key.pem file using a text editor and you will
			see the extracted private key.

		4.  Copy only the key string as shown in the below sample.
			![sp-private-key](../assets/img/tutorials/sp-private-key.png)

6.  Paste the copied private key in Client Private Key text area.

7.  Click **Decrypt** and the decrypted ID Token details will be displayed.
