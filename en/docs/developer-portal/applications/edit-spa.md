# Edit a Single Page Application

You must provide configuration details to create an application in the WSO2 Identity Server so that the authentication and/or provisioning happens as expected.

## General

Following are some of the general details you need to fill out when you are creating an application.

| Field         | Description                        | Example |
|---            | ---                                |---      |
| Name          | Unique name for the application.   |  Asguardio   |
| Description   | A meaningful description about the application.   | This is a cloud based developer portal.   |
| Application image | An image to represent the application.    |  https://asguardio.io/logo.jpg    |
| Discoverable application  | Enable this field to make an application accessible for the end users.    |  enabled  |
| Access URL    | The URL to reach the login page of the application.    | https://asguardio.io  |

### Certificate Configuration

!!! info "When is this certificate used"
        This certificate is used to validate the signatures of the signed
        requests from the application (service provider) to WSO2 IS.
        Therefore, the certificate is used for the following scenarios:

        -   [Configuring single
            sign-on](../../learn/configuring-single-sign-on-saml#setting-up) -
            the certificate is used to validate the signature of the SAML2
            authentication requests and the SAML2 logout requests that are
            sent by the service provider.
        -   [Passing OIDC authentication request
            parameters](../../learn/passing-oidc-authentication-request-parameters-in-a-request-object) -
            the certificate is used to:
            -   Encrypt the `                id_token               ` sent
                to the service provider in the OIDC Authentication Response.
            -   Validate the signed `                Request               `
                `                Object               ` sent in the
                OAuth2/OIDC Authorization Request.

        **Format of the certificate**

        WSO2 IS expects the certificate to be in PEM format.

        PEM is a Base64 encoded format, therefore contains ASCII character
        and easier to deal with rather than a binary encoded certificate.

        **How to obtain the PEM encoded certificate**

        The PEM content of a certificate in a JKS file, can be obtained by
        following the steps below:

        1\. Export the certificate from the keystore. The exported certificate
        will be in binary format.

        ``` java
        keytool -export -keystore <keystore-path> -alias <alias-of-the-certificate> -file <path-of-the-expected-certificate-file>

        e.g. keytool -export -keystore wso2carbon.jks -alias wso2carbon -file wso2carbon.crt
        ```

        2\. Convert the above binary encoded certificate to a PEM encoded
        certificate

        ``` java
        openssl x509 -inform der -in <path-of-binary-certificate> -out <path-of-expected-pem-content>
    
        e.g. openssl x509 -inform der -in wso2carbon.crt -out wso2carbon.pem
        ```

      

    !!! note
    
        You can provide the JWKS(JSON Web Key Store) URL the public 
        certificate in to the input field or upload a file in **PEM** format. 
        If the **Application Certificate** field is left blank, WSO2 IS 
        is backward compatible and follows the previous implementation 
        to locate the certificates in the keystore.  
        This means that if it is a SAML SSO flow, the certificate alias
        mentioned in SAML inbound authentication configuration is used when
        the certificate is not updated via the management console. If it is
        an OIDC request object signature validation, the certificate will be
        retrieved from default keystore, alias to consumer key of the auth
        application.

## Access

[OpenID Connect](http://openid.net/connect/) is another identity layer
on top of OAuth 2.0. OAuth applications can get authentication event
information over the IDToken and can get the extra claims of the
authenticated user from the OpenID Connect UserInfo endpoint. 

| Field                       | Description                                                                   |
|---                          | ---                                                                           |
| Client ID                   | Client ID of the application you registered in the IDP for Identity server.   |
| Client Secret               | Client Secret of the application you registered in the IDP for Identity server. Click the eye icon to view the value you enter.   |
| Allowed Grant Types         | The following grant types are used to generate the access token:              |
|                             | * **Refresh Token :** This will enable the user to obtain an access token by using the refresh token once the originally provided access token is used up. For more information on this grant type, see this [Refresh Token specification](https://tools.ietf.org/html/rfc6749#section-1.5). |   
|                             | * **SAML2 :** This uses SAML assertion to obtain the access token. For more information on this grant type, see this [SAML2 Bearer specification](https://tools.ietf.org/id/draft-ietf-oauth-saml2-bearer-23.txt).   |
|                             | * **Implicit :** This is similar to the code grant type, but instead of generating a code, this directly provides the access token. For more information on this grant type, see this [Implicit Grant specification](https://tools.ietf.org/html/rfc6749#section-4.2).                | 
|                             | * **Password :** This authenticates the user using the password provided and the access token is provided. For more information on this grant type, see this [Resource Owner Password Credentials Grant specification](https://tools.ietf.org/html/rfc6749#section-4.3).   |  
|                             | * **Client Credential :** This is the grant type for the client key and client secret. If these two items are provided correctly by the service provider, the access token is sent. For more information on this grant type, see this [Client Credentials specification](https://tools.ietf.org/html/rfc6749#section-4.4). |
|                             | * **IWA-NTLM :** This is similar to the password grant type, but it is specific to Microsoft Windows users. |
|                             | * **urn:ietf:params:oauth: grant-type:jwt-bearer :** This is a custom grant type. It uses a JWT token to obtain the access token. For more information about this grant type, see this [JWT specification](https://tools.ietf.org/html/rfc7523). |
|                             | * **Code :** Entering the username and password required at the service provider will result in a code being generated. This code can be used to obtain the access token. For more information on this grant type, see this [Authorization Code specification.](https://tools.ietf.org/html/rfc6749#section-4.1)   |



## Attributes
Common configuration for all application types. Can use fragments.

## Sign-on Method
Common configuration for all application types. Can use fragments.

## Advanced
Common configuration for all application types. Can use fragments.

