# Advanced OpenID Connect Configurations

This page lists out all the advanced configurations related to OAuth/OpenID Connect authentication. 


--- 

#### OAuth Version 
Selecting OAuth Version as **1.0a** removes all the configurable Allowed Grant Types. This is because this version of OAuth does not support grant types.

---
#### Allowed Grant Types
The following grant types that can be used to generate the access token.

- **Code**: Entering the username and password required at the service provider will result in a code being generated. This code can be used to obtain the access token. For more information on this grant type, see [Authorization Code specification](https://tools.ietf.org/html/rfc6749#section-4.1).

- **Password**: This authenticates the user using the password provided and the access token is provided. For more information on this grant type, see [Resource Owner Password Credentials Grant specification](https://tools.ietf.org/html/rfc6749#section-4.3).

- **Implicit**: This is similar to the code grant type, but instead of generating a code, this directly provides the access token. For more information on this grant type, see [Implicit Grant specification](https://tools.ietf.org/html/rfc6749#section-4.2).

- **Client Credential**: This is the grant type for the client key and client secret. If these two items are provided correctly by the service provider, the access token is sent. For more information on this grant type, see [Client Credentials specification](https://tools.ietf.org/html/rfc6749#section-4.4).

- **Refresh Token**: This will enable the user to obtain an access token by using the refresh token once the originally provided access token is used up. For more information on this grant type, see [Refresh Token specification](https://tools.ietf.org/html/rfc6749#section-1.5).

- **SAML2**: This uses SAML assertion to obtain the access token. For more information on this grant type, see [SAML2 Bearer specification](https://tools.ietf.org/id/draft-ietf-oauth-saml2-bearer-23.txt).

- **IWA-NTLM**: This is similar to the password grant type, but it is specific to Microsoft Windows users.

- **urn:ietf:params:oauth:grant-type:jwt-bearer**: This is a custom grant type. It uses a JWT token to obtain the access token. For more information about this grant type, see [JWT specification](https://tools.ietf.org/html/rfc7523).

---

#### Callback URL
This is the exact location in the service provider's application where an access token would be sent. This is a required field (if the grant type is anything other than 'Code' or 'Implicit') and it is important to configure, as it is imperative that the service provider receives the access token. This is necessary for security purposes to ensure that the token is not compromised.

??? note "Click for information on configuring multiple callback URLs"
     From IS 5.2.0 onwards, regex-based consumer URLs are supported when defining the callback URL. This enables you to configure multiple callback URLs for one application by entering a regex pattern as the value for the callback URL field.

      For example, if you have two service providers that use the same application, you can now define a regex pattern which will work for both callback URLs instead of having to configure two different applications for the two service providers. Assume the two callback URLs for your two service providers are as follows:

---

#### PKCE Configurations

**PKCE Mandatory**: Select this if you are using the <strong>Code</strong> grant type. PKCE is a recommended security measure used to mitigate a code interception attack. 

See [Mitigating Authorization Code Interception Attacks](insertlink) for more information.

**Support PKCE 'Plain' Transform Algorithm**: Select this if you are using PKCE.

---

#### Allow Authentication without the client secret

This enables authenticating the client without the client secret

----

#### Token Expiry Time

Set the validity period (in seconds) for the following access tokens. 

- **User Access Token Expiry Time**
- **Application Access Token Expiry Time**
- **Refresh Token Expiry Time**
- **Id Token Expiry Time**

-----

#### Enable Audience Restriction

Select this to enable audience restrictions for OAuth applications. If necessary, you can add multiple audiences. To add an audience, specify a required **Audience value** and click **Add**. All audience values that you add would be available in the ID token generated for the corresponding application.

----

#### Enable Request Object Signature Validation

This is to define whether to only accept signed request objects in an authorization rqeuest or not. For more information, see [Enforcing Signature Validation for Request Objects](insertlink).

----

#### Enable ID Token Encryption

This is to define whether to ID token encryption should be enabled or not. For a tutorial on this, see [Testing OIDC Encrypted ID Token with IS](insertlink).

----

#### Enable OIDC Back Channel Logout

This is to define whether OIDC back channel logout should be enabled or not. For more information, see [Configuring OpenID Connect Back-Channel Logout](insertlink).

----

#### Scope Validators

This is to define the scope validation mechanisms. For more information on XACML scope validation, see [Validating the Scope of OAuth Access Tokens using XACML Policies](insertlink).

----

#### Token Issuer

Select either JWT or Default as the token issuer for the service provider.

!!! tip
    - If you want to enable default token generation for a service provider, select **Default** as the Token Issuer. This is the default Token Issuer   that is selected when you apply the WUM update.
      When you enable default token generation, the hash value of the token is stored in the `ACCESS_TOKEN_HASH `column, and the plain text token is stored in the `ACCESS_TOKEN` column. 
    - If you want to enable JWT token generation for a service provider, select **JWT** as the Token Issuer.
      When you enable JWT token generation, the hash value of the JWT is stored in the `ACCESS_TOKEN_HASH` column, and the full JWT is stored in the `ACCESS_TOKEN` column.

#### Authorization Code Validity Period

!!! warning
    This is a file configuration and does not appear on the management console.

When using the **Authorization Code** grant type, the recieved authorization code can only be used once to get a valid access token and has a expiry time. The expiry time can be configured by adding the following property to the `<IS_HOME>/repository/conf/deployment.toml` file. The default expiry time is 300 seconds.

``` toml
[oauth.token_validation]
authorization_code_validity= "300"
```

