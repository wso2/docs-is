# Encrypt ID Tokens

This page guides you through configuring [token encryption for ID tokens](insertlink) using the WSO2 IS playground sample application. 

----

If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/login/oidc-token-encryption"   rel="nofollow noopener">I have my own application</a>

----

{!fragments/oauth-playground.md!}

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

{!fragments/encrypt-id-tokens.md!}

----

You have successfully set up token encryption and the sample Playground application. You can now try out one of the grant type flows to receive an encrypted ID token and decrypt it.

- [Authorization grant flow](#try-authorization-grant-flow)
- [Implicit grant flow](#try-implicit-grant-flow)
- [Password grant flow](#try-password-grant-flow)

----

## Try authorization grant flow

1.  Visit the URL, <http://wso2is.local:8080/playground2/oauth2.jsp> to start the application.

2.  Enter the following details and click **Authorize**.

    -   **Authorization Grant Type:** Authorization Code

    -   **Client ID:** (the client ID received when you registered the service provider)

    -   **Scope:** openid

    -   **Callback URL:** <http://wso2is.local:8080/playground2/oauth2client>

    -   **Authorize Endpoint:** <https://localhost:9443/oauth2/authorize>

3.  Sign in with user credentials.

4.  Click **Approve** to consent to this action.

5.  Provide the following details and click **Get Access Token**.  

    -   **Callback URL:**  <http://wso2is.local:8080/playground2/oauth2client>

    -   **Access Token Endpoint:** <https://localhost:9443/oauth2/token>

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

        ![sample-key-string](../../assets/img/guides/sample-key-string.png)

8.  Paste the copied private key in the **Client Private Key** text area.

9.  Click **Decrypt** and the details of the decrypted ID Token will be displayed.

## Try implicit grant flow

1.  Visit the URL, <http://wso2is.local:8080/playground2/oauth2.jsp> to
    start the application.

2.  Enter the following details and click **Authorize**.

    -   **Authorization Grant Type:** Implicit

    -   **Client ID:** (the client ID received when you registered the service provider)

    -   **Scope:** openid 

    -   **Callback URL:** <http://wso2is.local:8080/playground2/oauth2client>

    -   **Authorize Endpoint:** <https://localhost:9443/oauth2/authorize>

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

        ![sample-key-string](../../assets/img/guides/sample-key-string.png)

8.  Paste the copied private key in the **Client Private Key** text area.

9.  Click **Decrypt** and the details of the decrypted ID Token will be displayed.


## Try password grant flow 


1. Visit the URL, <http://wso2is.local:8080/playground2/oauth2.jsp> to start the application.

2. Enter the following details and click **Authorize**.

    -   **Authorization Grant Type:** Resource Owner
    
    -   **Client ID:** (the client ID received when you registered the service provider)

        -   **Client Secret** : (the client secret received when you registered the service provider)

    -   **Resource Owner User Name** : admin (username)

    -   **Resource Owner Password** : admin (password of user)

    -   **Scope:** openid 

    -   **Access Token Endpoint:** <https://localhost:9443/oauth2/token>

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

        ![sample-key-string](../../assets/img/guides/sample-key-string.png)


6.  Paste the copied private key in the **Client Private Key** text area.

7.  Click **Decrypt** and the details of the decrypted ID Token will be displayed.



