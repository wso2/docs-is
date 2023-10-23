## General 

Now that you have created an application in the Identity Server using a template, you can go ahead with integrating your application or you can edit the following details which are pre configured for you through the template. 

| Field         | Description                        | Example |
|---            | ---                                |---      |
| Name          | Unique name for the application.   |  Asguardio   |
| Description   | A meaningful description about the application.   | This is a cloud based developer portal.   |
| Application image | An image to represent the application.    |  https://asguardio.io/logo.jpg    |
| Discoverable application  | Enable this field to make an application accessible for the end users by making it appear in the applications section of the My Account.    |  enabled  |
| Access URL    | The URL to reach the login page of the application.    | https://asguardio.io  |

### Certificate Configuration

This certificate is used to validate the signatures of the signed requests from the application (service provider) to WSO2 IS. Therefore, the certificate is used for the following scenarios:

- [Configuring single sign-on]({{base_path}}/guides/login/saml-app-config-advanced/#certificate-alias) - the certificate is used to validate the signature of the SAML2 authentication requests and the SAML2 logout requests that are sent by the service provider.
- [Passing OIDC authentication request parameters]({{base_path}}/guides/login/oidc-request-object) - the certificate is used to:
    - Encrypt the `id_token` sent to the service provider in the OIDC Authentication Response.
    - Validate the signed `Request Object` sent in the OAuth2/OIDC Authorization Request.

**Format of the certificate**

WSO2 IS expects the certificate to be in PEM format.

PEM is a Base64 encoded format, therefore contains ASCII character
and easier to deal with rather than a binary encoded certificate.

**How to obtain the PEM encoded certificate**

The PEM content of a certificate in a JKS file, can be obtained by
following the steps below:

1. Export the certificate from the keystore. The exported certificate will be in binary format.

    ``` java
    keytool -export -keystore <keystore-path> -alias <alias-of-the-certificate> -file <path-of-the-expected-certificate-file>

    e.g. keytool -export -keystore wso2carbon.jks -alias wso2carbon -file wso2carbon.crt
    ```

2. Convert the above binary encoded certificate to a PEM encoded certificate

    ``` java
    openssl x509 -inform der -in <path-of-binary-certificate> -out <path-of-expected-pem-content>

    e.g. openssl x509 -inform der -in wso2carbon.crt -out wso2carbon.pem
        ```


```    
    NOTE: You can provide the JWKS(JSON Web Key Store) URL the public 
    certificate in to the input field or upload a file in PEM format. 
    If the Application Certificate field is left blank, WSO2 IS 
    is backward compatible and follows the previous implementation 
    to locate the certificates in the keystore.  
    This means that if it is a SAML SSO flow, the certificate alias
    mentioned in SAML inbound authentication configuration is used when
    the certificate is not updated via the management console. If it is
    an OIDC request object signature validation, the certificate will be
    retrieved from default keystore, alias to consumer key of the auth
    application.
```


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
| Callback URL                | This is the URL to which the browser should be redirected after the authentication is successful. It should be the commonauth endpoint of Identity server.  |
| Public Client               | This enables authenticating the client without the `client secret`. |  
| PKCE Mandatory              | Select this if you are using the Code grant type. PKCE is a recommended security measure used to mitigate a code interception attack. See [Mitigating Authorization Code Interception Attacks for more information](https://is.docs.wso2.com/en/5.11.0/administer/mitigating-authorization-code-interception-attacks/).  |
| Support PKCE 'Plain' Transform Algorithm            | Select this if you are using PKCE. |
| Enable encryption           | This is to define whether to ID token encryption should be enabled or not. For a tutorial on this, see Testing OIDC Encrypted ID Token with IS. |
| Enable Request Object Signature Validation             | This is to define whether to only accept signed request objects in an authorization rqeuest or not. For more information, see [Enforcing Signature Validation for Request Objects](https://is.docs.wso2.com/en/5.11.0/learn/enforcing-signature-validation-for-request-objects/). |
| Scope Validators            | This is to define the scope validation mechanisms. For more information on XACML scope validation, see [Validating the Scope of OAuth Access Tokens using XACML Policies](https://is.docs.wso2.com/en/5.11.0/learn/validating-the-scope-of-oauth-access-tokens-using-xacml-policies/). |


## Attributes

Attribute mapping for a service provider involves mapping attributes that are used by the service provider to the local attributes of the WSO2 Identity Server. 

### Attribute Selection

In your application if you need some information of the user from the Identity Server, the claim mapping is very useful. Once the user is authenticated, the application can use these received attribute details to provide its service.

Follow the steps given below to map select the required attributes.

    1. Click on Add Attribute button.
    2. Select the attributes you need from the identity server.
    3. Click on the Save button.


#### Subject Attribute

Subject attribute defines the authenticated user identifier which will return with the authentication response to the application.

| Field                       | Description                                                                   |
|---                          | ---                                                                           |
| Subject attribute           | An attribute to uniquely identify the user.(Ex: name, email, etc.)            |
| Include user domain         | Enable this option to append the user store name that the user resides in the local subject identifier. |
| Include tenant domain         | Enable this option to append the tenant name that the user belongs in the local subject identifier.   |  
| Include mapped local subject      | Enable this option to use the local subject identifier when asserting the identity.               |


#### Role Attribute

Role attribute defines the role claim for the service provider. This is useful if you use a different claim as the role claim or if you define a custom claim mapping for the service provider.

| Field                       | Description                                                                   |
|---                          | ---                                                                           |
| Role attribute              | An attribute to uniquely identify the user.(Ex: groups, email, etc.)            |
| Include user domain         | Enable this option to append the user store name that the user resides in the local subject identifier. |


## Sign-on Method

### Authentication flow

In this section you can customize authentication flow in your application. You can add multiple authentication steps to your application and add two or layers of protection.

#### Step based configuration

Configure the authentication steps but adding the required authenticators to the step. Following GIF shows how you can drag and drop any authenticator and add it to a step an click **Update** button. The Username & Password authenticator(prompts for user's username and password) will be configured by default.

You can also add a new authentication step and add authenticators as mentioned in the section above.

#### Script based configuration

Script based authentication enables an identity provider to prompt multi-factor authentication steps based on a user's risk profile or user behavior, i.e., the authentication adapts to the situation or the user during the authentication process.

For instance, high-risk logins such as a user attempting to log in from an unusual location causes the adaptive authentication mechanism to prompt an extra authentication in order to increase security.

You can add authentication steps or use a template to configure adaptive authentication depending on your requirement. For example, add Demo HardwareKey Authenticator.

## Advanced
Common configuration for all application types. Can use fragments.
