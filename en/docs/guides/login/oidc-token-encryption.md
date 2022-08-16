# Encrypt ID Tokens

This page guides you through configuring token encryption for ID tokens.

## Register a service provider

{!./includes/register-a-service-provider.md!}

----

## Configure the service provider

Make the following changes to the created service provider.

1. Expand **Inbound Authentication Configuration > OAuth/OpenID Connect Configuration** and click **Configure**.

2. Enter the **Callback Url**. 

    !!! note
        The **Callback Url** is the exact location in the service provider's application to which an access token will be sent. This URL should be the URL of the page that the user is redirected to after successful authentication.

3. Click **Enable ID Token Encryption** to enable id\_token encryption.

    Once you enable id\_token encryption, two select boxes will be
    visible to choose your preferred encryption algorithm and encryption
    method.

    -   **Encryption Algorithm:** Asymmetric encryption algorithm that is used to encrypt the Content Encryption Key (CEK), using the
        public key of the service provider.

    -   **Encryption Method:** Symmetric encryption algorithm that is used to encrypt the JWT claims set using the CEK.

    Leave these values as they are if you do not have any specific requirements.
    
4. Click **Add**

!!! tip
     To configure more advanced configurations, see [OAuth/OpenID Connect Configurations]({{base_path}}/guides/login/oauth-app-config-advanced). 

----

{!./includes/encrypt-id-tokens.md!}

----

## Try it

This section guides you through obtaining an encrypted ID token and decrypting it using the WSO2 IS playground sample application. Alternatively, you can use a simple java program to decrypt the token. For instructions, see [Decrypt the ID token]({{base_path}}/guides/login/oidc-token-decryption).

1. See [OAuth Grant Types]({{base_path}}/guides/access-delegation/authorization-code) and try out one of the grant types with the `openid` scope to obtain an access token.

2. You will recieve an access token and an encrypted ID token. 

3. To decrypt the ID token, provide the private key of the client. 

    1. Import JKS into a PKCS12 formatted store.

        ``` java
        keytool -importkeystore -srckeystore testkeystore.jks -destkeystore testkeystore.p12 -srcstoretype JKS -deststoretype PKCS12 -srcstorepass wso2carbon -deststorepass wso2carbon -srcalias wso2carbon -destalias wso2carbon -srckeypass wso2carbon -destkeypass wso2carbon
        ```

    2. Extract the private key into a file named `key.pem`.

        ``` java
        openssl pkcs12 -in testkeystore.p12 -out key.pem -passin pass:wso2carbon -passout pass:wso2carbon -nodes -nocerts
        ```

    3. Open the created `key.pem` file using a text editor and you will see the extracted private key.

    4. Copy only the key string as shown in the sample below.

        ![sample-key-string]({{base_path}}/assets/img/guides/sample-key-string.png)
   
    5. Paste the copied private key in the Client Private Key text area.
   
    6. Click **Decrypt** and the details of the decrypted ID Token will be displayed.

    

!!! info "Related topics"
    - [Concept: ID Token]({{base_path}}/references/concepts/authentication/id-token)
    - [Quick Start: OpenID Connect Token Encryption]({{base_path}}/quick-starts/oidc-token-encryption-sample)
    - [Guide: Enable Login for an OpenID Connect Web Application]({{base_path}}/webapp-oidc)
    - [Guide: Use Advanced Parameters in Authentication Requests]({{base_path}}/oidc-parameters-in-auth-request)

