# What Has Changed
WSO2 Identity Server 6.0.0 brings a range of new features and major improvements. The following aspects have changed in 6.0.0 compared to the previous WSO2 IS versions.

This page provides details about the behavioral changes from WSO2 Identity Server 5.11.0 to 6.0.0.

!!! note "If you are migrating from an older version of Identity Server"
    To find the changes introduced in the previous versions, you can refer to the following documentation:

    - Changes introduced in IS 5.11.0 can be found at [What Has Changed in IS 5.11.0](https://is.docs.wso2.com/en/5.11.0/setup/migrating-what-has-changed/#what-has-changed).
    - Changes introduced in IS 5.10.0 can be found at [What Has Changed in IS 5.10.0](https://is.docs.wso2.com/en/5.10.0/setup/migrating-what-has-changed/#what-has-changed).
    - Changes introduced in IS 5.9.0 can be found at [What Has Changed in IS 5.9.0](https://is.docs.wso2.com/en/latest/setup/migrating-what-has-changed/).
    - Changes introduced in IS 5.8.0 and before can be found at [Migrating Configurations to IS 5.8.0](https://docs.wso2.com/display/IS580/Upgrading+From+an+Older+Version+of+WSO2+IS#UpgradingFromanOlderVersionofWSO2IS-Migratingtheconfigurations).

## Webapp
This section covers the updates related to Console application and the MyAccount application on Identity Server 6.0.0.

### Console App
Identity Server 5.11.0 had two ways of adding the certification for an application. The two methods used are as follows:
- Upload the certificate through the UI
- Add the certificate to the keystore and select the certificate through the UI.

Having two methods for the same process creates redundancy, therefore in 6.0.0., the second option is removed by default. If you need to enable the signature validation certificate alias option in the UI, add the following configuration to the ``deployment.toml`` file.

``` java
[console.applications.ui]
certificate_alias_enabled = true
```

### Common Changes
- The default token binding type of both the Console and MyAccount is changed from ```SSO-based binding``` to ```cookie-based binding```. Read more on [Access Token Binding Type]({{base_path}}/learn/configuring-oauth2-openid-connect-single-sign-on/).

- With IS 6.0.0, the ```Callback URL``` and ```Post-Logout Redirect URL``` of the Console and MyAccount are now tenant qualified by default. Hence, after migrating to IS 6.0.0, the Callback URLs of both the MyAccount and Console applications should be updated as follows:

  - Console
      ``` js
      regexp=(https://<hostname>/console|https://<hostname>/t/(.*)/console)
      ```

  - MyAccount
      ``` js
      regexp=(https://<hostname>/myaccount|https://<hostname>/t/(.*)/myaccount)
      ```
    
  This change will be propagated to the migrated IS 6.0.0 via the migration client according to the following configuration in the migration-config.yaml.
    ```toml
    - name: "SystemAppRedirectURLMigrator"
      order: 15
      parameters:
        consoleRedirectUrl: "regexp=(https://localhost:9443/console|https://localhost:9443/t/(.*)/console)"
        myaccountRedirectUrl: "regexp=(https://localhost:9443/myaccount|https://localhost:9443/t/(.*)/myaccount)"
    ```
  Before running the migration, make sure to update the URLs in the regular expressions with the server domain or hostname, if they are different from the default values.

## User Management
This section contains the changes of the User Management functionalities of IS 6.0.0.

### Admin Forced Password Reset
Identity Server 6.0.0, comes with a new configuration to specify the password reset code validity period for the admin initiated password reset flow.

In earlier versions of the Identity Server, a single configuration was used to govern the code validity period of all password reset flows. The configuration used in the earlier versions of IS was the ```ExpiryTime``` in the ```identity.xml``` file. This property not only affects the admin initiated password reset flow but also some other password reset flows.

Updating the ```ExpiryTime``` of the ```identity.xml``` file does not affect admin initiated password reset flow in IS 6.0.0. This is because usually the code of admin initiated password reset flow is expected to have a longer validity period than the other flows. Therefore  If you need to update the code validity period of this add the following configuration to the ```deployment.toml``` file.

``` js
[identity_mgt.password_reset_by_admin]
code_validity_period = <time>
```

## Authentication
This section contains the updates done to the Authentication features of IS 6.0.0.

### OTP Authenticator
Some significant changes have been made to the below mentioned OTP authenticators. Please follow the instructions given below to incorporate your custom OTP requirements and changes to Identity Server 6.0.0.

#### Email OTP Authenticator
The following changes have been made to the Email OTP authenticator.

- It’s no longer required to add the Email OTP authenticator into the ```dropins``` folder as the authenticator has been moved into the ```plugins``` directory by default in IS 6.0.0.  

- The artifact ID of the authenticator has been updated.

- The ```emailotpauthethentication``` endpoint, which was packed with the product is now an integral part of the authentication portal. Following are the steps to integrate their changes to Identity Server 6.0.0 for users with customized email TOTP pages.

    1. Merge the customizations to the authentication portal app.The pages related to Email OTP available in authentication portal are included in the table below.
    <table>
        <tr>
            <th>Page name in IS 6.0.0</th>
            <th>Page name in earlier version</th>
            <th>Page description</th>
        </tr>
        <tr>
            <td><code>emailAddressCapture.jsp</code></td>
            <td><code>emailAddress.jsp</code></td>
            <td>Email OTP email capture page</td>
        </tr>
        <tr>
            <td><code>emailOtp.jsp</code></td>
            <td><code>emailotp.jsp</code></td>
            <td>Email OTP login page</td>
        </tr>
        <tr>
        <td><code>emailOtpError.jsp</code></td>
            <td><code>emailotpError.jsp</code></td>
            <td>Email OTP error page</td>
        </tr>
    </table>

    2. Deploy the existing customized email OTP web app to the server and add the following configurations to the ```deployment.toml``` file to direct the email OTP flows to the customized pages.
    ``` js
    [authentication.authenticator.email_otp.parameters]
    EMAILOTPAuthenticationEndpointURL = "https://localhost:9443/emailotpauthenticationendpoint/emailotp.jsp"
    EmailOTPAuthenticationEndpointErrorPage = "https://localhost:9443/emailotpauthenticationendpoint/emailotpError.jsp"
    EmailAddressRequestPage = "https://localhost:9443/emailotpauthenticationendpoint/emailAddress.jsp"
    ```

#### TOTP Authenticator
The following changes have been made to the TOTP authenticator.

- It’s no longer required to add the TOTP authenticator into the ```dropins``` folder as the authenticator has been moved into the ```plugins``` directory by default in IS 6.0.0.

- The ```totpauthethentication``` endpoint, which was packed with the product is now an integral part of the authentication portal. Following are the steps to integrate their changes to Identity Server 6.0.0 for users with customized TOTP pages.
    1. Merge the customizations to the authentication portal app.The pages related to TOTP available in authentication portal are:
        
        - enableTOTP.jsp (TOTP enroll page)
        - totp.jsp (TOTP login page)
        - totpError.jsp (TOTP error page)

    2. Deploy the existing customized TOTP web app to the server and add the following configurations to the ```deployment.toml``` file to direct the TOTP flows to the customized pages.

        ``` js
        [authentication.authenticator.totp.parameters]
        TOTPAuthenticationEndpointURL="totpauthenticationendpoint/totp.jsp"
        TOTPAuthenticationEndpointErrorPage="totpauthenticationendpoint/totpError.jsp"
        TOTPAuthenticationEndpointEnableTOTPPage="totpauthenticationendpoint/enableTOTP.jsp"
        ```

    3. Unlike the earlier versions of the Identity server, the TOTP authenticator of IS 6.0.0 does not offer sending the TOTP via email as a default option. Add the following configuration to the ```deployment.toml``` file to enable sending the TOTP through Email.

        ``` js
        [authentication.authenticator.totp.parameters]
        Allow_sending_verification_code_by_email = true
        ```

!!! note

    The i18n keys of both OTP authenticators have been moved to the i18n property file of the authentication portal.

### Adaptive Authentication Function Signature

On WSO2 IS, ```getUniqueUserWithClaimValues```  is an adaptive authentication Javascript utility function that is used to obtain a user definition along with claim values. The utility function will search on the underlying user stores and return a unique user with the claim values.

In earlier versions of the Identity Server, the parameters required by this function were as follows:
<table>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>claimMap</code></td>
        <td>A map contains the claim URI and claim value</td>
    </tr>
    <tr>
        <td><code>tenantDomain</code></td>
        <td>The tenant domain of the user</td>
    </tr>
    <tr>
        <td><code>profile</code></td>
        <td>Profile of the user. (Optional, the default value is 'default')</td>
    </tr>
</table>

The function in earlier versions of IS: ``` getUniqueUserWithClaimValues (claimMap, tenantDomain, profile) ```

With Identity Server 6.0.0, the parameters of this method signature have been changed.The updated parameters used by this function are as follows:

<table>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>claimMap</code></td>
        <td>A map contains the claim URI and claim value</td>
    </tr>
    <tr>
        <td><code>contect</code></td>
        <td><code>JsAuthenticationContext</code> object available in the authentication flow</td>
    </tr>
    <tr>
        <td><code>profile</code></td>
        <td>Profile of the user. (Optional, the default value is 'default')</td>
    </tr>
</table>

The function in IS 6.0.0: ``` getUniqueUserWithClaimValues (claimMap, context, profile) ```

Example usage of the updated function:

``` json
var claimMap = {};
claimMap[MAPPED_FEDERATED_USER_NAME_CLAIM] = federatedUserName;
claimMap[MAPPED_FEDERATED_IDP_NAME_CLAIM] = idpName;
var mappedUsername = getUniqueUserWithClaimValues(claimMap, context);
```

Make sure to update the usages of this function, if any, after the migration process.

## Application management
This section covers the updates related to application configurations on Identity Server 6.0.0.

### Application Roles in Application Management Flows

With WSO2 IS 6.0.0, the following functions have been removed by default:
- The creation of application roles
- The validation of application roles in application management flows.

With these changes,
- Application roles will not be created nor assigned to the application owner during the application creation.
- Application role validation will be skipped for users who initiate application management flows.

The above said changes apply to both new and existing applications of WSO2 IS.

If you require the former functionality, add the following configuration to the ```deployment.toml``` file.

``` js
[application_mgt]
enable_role_validation = true
```

!!! Important Note

    When setting this configuration value to true, make sure that application roles have been created for all the applications and assigned to the relevant application owners. If not, create and assign the roles.

### Application Requested Claims
During federated login flows in IS 6.0.0, if requested claims are not configured for an application, none of the user claims sent from the external IDP will be sent to the application through the ID token.

For the same scenario in IS versions 5.11.0 and below, all the claims sent from the external IDP will be sent to the application regardless of the requested claim configuration. 
If the previous behavior is required in IS 6.0.0, add the following configuration to the ```deployment.toml``` file.
```toml
[authentication]
allow_sp_requested_fed_claims_only =false

[oauth.oidc.claims]
enable_oidc_dialect=false
```

## OIDC Protocol
According to the OIDC specification, the OIDC claim ```locality``` should be used to store the city of an address. In the earlier versions of the Identity Server, the ```locality``` claim was mapped to the local claim ```http://wso2.org/claims/locality```, which is used to store a localization code used mainly in email templates.

To maintain compliance with the OIDC specification, the local claim ```http://wso2.org/claims/locality``` will be used to store the city of an address with Identity Server 6.0.0 and upwards. The localization code information will be stored in the local claim ```http://wso2.org/claims/local```.

To revert to the previous claim usage system, add the following configuration to the deployment.toml file.

``` js
[claims]
use_legacy_localization_claim = true
```

### OIDC Claim Mapping
In Identity Server 6.0.0, the claim dialect of the website claim has been changed from ```http://wso2.org/claims/url``` to ```http://wso2.org/claims/websiteurl```. This claim mapping migration will be done automatically when executing the migration client.

### OIDC Backchannel Logout Token
To maintain compliance with the OIDC specification for Backchannel logout, the logout token attributes have been updated.

In Identity Server 5.11.0, a logout token generated during OIDC Backchannel logout would have looked like this.
``` js
{
   "iss": "https://server.example.com",
   "sub": "248289761001",
   "aud": "s6BhdRkqt3",
   "iat": 1471566154,
   "jti": "bWJq",
   "sid": "08a5019c-17e1-4977-8f42-65a12843ea02",
   "event": {}
 } 
```

In Identity Server 6.0.0, the event attribute has been renamed to events and default value has been added to the events list. Hence, a logout token generated in IS 6.0.0 would be as follows.
``` js
{
   "iss": "https://server.example.com",
   "sub": "248289761001",
   "aud": "s6BhdRkqt3",
   "iat": 1471566154,
   "jti": "bWJq",
   "sid": "08a5019c-17e1-4977-8f42-65a12843ea02",
   "events": {
     "http://schemas.openid.net/event/backchannel-logout": {}
     }
 }
```

Make sure to update all the client applications that use OIDC Backchannel logout to work with the new format of the logout token.

### OpenID Scope
From Identity Server 6.0.0 onwards, using the openid scope in OpenID Connect flows will not return any user claims. This change will only affect new tenants and will not have an impact on the existing tenants. If user claims are required, the recommended approach is to define a custom OIDC scope with required claims and use that scope in the OIDC flows.

### OIDC Consent Updates
Following are the changes made to the behavior of the Consent prompt page in the login flow of IS 6.0.0:

The OIDC scopes requested by a client application was displayed under the permissions section of the user consent page. These requested OIDC scopes are no longer mentioned under the permissions section of the user consent page. Only the relevant claims will be displayed.

Prompting consent for the Subject Claim URI will be done only if it has also been configured as a Requested Claim. This is enabled by default. The previous behavior of the consent page did not prompt for consent for the Subject Claim URI at all, regardless of whether it had been configured as a Requested Claim or not. If the previous behavior is required, add the following configuration to the ```deployment.toml``` file.

``` js
[authentication.consent.subject]
prompt=false
```

## Userstore management
This sections contains the details of the updates related to User Management section in IS 6.0.0.

### Configuring Custom Userstore Managers
In earlier versions of WSO2 IS, custom userstore managers were enabled by adding the following configuration to the ```deployment.toml``` file.

``` js
[user_store_mgt]
allowed_user_stores=[“<existing userstore managers...>”,"<new userstore managers…>"]
```

This configuration requires the developer to enter the names of all existing userstore managers together with the new userstore managers that needed to be enabled.

In Identity Server 6.0.0, a new configuration has been introduced to enable the custom userstore managers but adding the name of the new userstore manager only.

You may use the following configuration on ```deployment.toml``` file to configure new custom userstore managers

``` js
[user_store_mgt]
custom_user_stores=[“<new userstore managers…>”]
```

## Provisioning
This sections contains the details of the updates related to provisioing section in IS 6.0.0.

### Provisioning Unmapped Roles in JIT Provisioning
In Identity Server 5.11.0, provisioning of roles in the JIT provisioning flow took place only for roles which had role mappings configured.

In Identity Server 6.0.0, this behavior has been changed. If there is a local role with a name similar to the Identity Provider role name, such roles will be provisioned during JIT provisioning even if there is no role mapping set in the IDP configuration. This is now the default behavior. If the previous behavior is required, add the following configuration to the ```deployment.toml``` file.

``` js
[idp_role_management]
return_only_mapped_local_roles = true
```

## Scopes
This sections contains the details of the updates related to scopes section in IS 6.0.0.

### System Level Permission Binding for Maintaining Internal Scopes
In earlier versions of the Identity Server, internal system scopes and permissions were managed separately for every tenant. This behavior was not a necessity as these scopes were only used to access the Identity Server’s internal APIs, but it had a negative impact on the tenant creation process.

With Identity Servery 6.0.0, the internal scope’s permission bindings will be managed at the server level as system data. All tenants will now use the bindings available in the ```oauth-scope-bindings.xml``` file for internal scopes.

If the previous behavior is required, add the following configuration to the ```deployment.toml``` file.

``` js
[oauth]
enable_system_level_internal_scope_management = false
```

### Scope Based Claim Filtering in Applications
In the previous versions of the Identity Server, if there are requested claims configured at the service provider, the claims will be sent to the client application regardless of the scope set in the authorization request.

From Identity Server 6.0.0 onwards, this behavior has been changed. The claims configured in the service provider will now be filtered by the scopes set in the authorization requests and only those filtered claims will be sent to the client application.

To revert to the previous behavior, add the following configuration to the deployment.toml file.

``` js
[authentication]
enable_scope_based_claim_filtering = false
```

## Token
This section covers the updates related to Token configurations on Identity Server 6.0.0.
### JWT Access Token Signing Behavior
In the previous versions of the Identity Server, JWT access token signing is done using the tenant of the user accessing  the application. This behavior has been improved to maintain consistency with the ID token which is signed using the application’s tenant by default. This behavioral change will also simplify token validation at the application, especially SaaS applications.

In Identity Server 6.0.0, JWT Access Token signing is done using the tenant in which the application (service provider) has been registered. 

This behavioral change will have an impact on SaaS applications as the user may not always be from the same tenant as that of the application. Token validation may fail at the client application when obtaining new tokens after the migration. The SaaS client applications need to be updated to handle JWT token validation using the application tenant in order to function properly with this behavioral change. If the previous behavior is required, add the following configuration to the ```deployment.toml``` file.

``` js
[oauth.access_token]
generate_with_sp_tenant_domain = false
```

With this configuration in place, the SaaS applications can be used as they were without issues.

This change will not have an impact on existing non-SaaS applications as both the application and the user will be from the same tenant in that context.

### ID Token Signing Behavior
In previous versions of the Identity Server, ID Token encryption happens before signing the token. This behavior has been updated to follow the OIDC specification.

In Identity Server 6.0.0, ID Token encryption will occur after the token has been signed. It is important to note that the result of token decryption now will be a signed JWT, instead of the claims set as in previous versions. Hence, client applications that perform token decryption will have to be updated accordingly to read the claims in the JWT token.

The following is an example written in JAVA portraying the differences between the old and new scenarios.

``` java
// Using packages 
// com.nimbusds.jose.crypto.RSADecrypter
// com.nimbusds.jwt.EncryptedJWT
// com.nimbusds.jwt.JWTClaimsSet

// Decrypt the ID Token
EncryptedJWT jwt = EncryptedJWT.parse(idToken);        
RSADecrypter decrypter = new RSADecrypter(spPrivateKey);
jwt.decrypt(decrypter);

// Obtaining claims set in IS 5.11.0 and prior versions
JWTClaimsSet claims = jwt.getJWTClaimsSet();

// Obtaining claims set in IS 6.0.0
JWTClaimsSet claims = jwt.getPayload().toSignedJWT().getJWTClaimsSet();
```

!!! Important
    This behavior cannot be reversed.

### ID Token Address Claim
In IS 6.0.0, the address claim that is returned with the ID token when the address scope is requested has been updated to comply with the [OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html#AddressClaim). 
```Country```, ```postal_code```, ```locality```, ```region``` and ```street_address``` child claims will now be returned within the address claim as shown in the example below. 
Any client application that is consuming the ID token claims should be updated to properly parse this claim value.
```json
{
   "address": {
     "street_address": "1234 Hollywood Blvd.",
     "locality": "Los Angeles",
     "region": "CA",
     "postal_code": "90210",
     "country": "US"
   }
}
```

## Claims
This section covers the updates related to claims on Identity Server 6.0.0.
### Regex Pattern Validation for User Claim Input Values
In Identity Server 6.0.0, server-side regex pattern validation has been introduced as a mechanism for validating inputs when adding and updating user claim values.
With this feature, the input values for the user claims will be validated against the following patterns by default.

<table>
    <tr>
        <th>Claim</th>
        <th>Regex Pattern</th>
    </tr>
    <tr>
        <td>Mobile number</td>
        <td><code>^\d{4}-\d{2}-\d{2}$</code></td>
    </tr>
    <tr>
        <td>Date of birth</td>
        <td><code>^\s*(?:\+?(\d{1,3}))?[-. (](\d{3})?[-. )](\d{3})?[-. ]*(\d{4,6})(?: x(\d+))?\s$</code></td>
    </tr>
    <tr>
        <td>All other claims</td>
        <td><code>[^<>\`"]+</code></td>
    </tr>
</table>


If the previous behavior is required, the regex pattern validation feature can be disabled adding the following configuration to the ```deployment.toml``` file.

``` js
[identity_mgt]
enable_user_claim_input_regex_validation = false
```

However, if user claim value validation is required with different regex patterns, it can be done by configuring the required regex patterns in the user claim configuration window, which will override the default regex validation pattern for that claim. For this to work, the above configuration should be removed (as it is enabled by default) or the value should be set to true.

### Regex Pattern Validation for SCIM Attribute Names
With Identity Server 6.0.0, server-side regex pattern validation has been added for SCIM attribute names. This means that new SCIM attributes created will be validated against the regex ```<dialect_uri>:[a-z 0-9$\-_]*$```. The regex only allows alphanumeric characters, ```$```, ```-``` and ```_``` in the attribute names.

If you are using a modified claim-config.xml file and you want to incorporate this update to your Identity Server 6.0.0 setup, add the regex patterns manually to your custom claim-config.xml file according to the format given below and replace the default file in ```<IS_HOME>/repository/conf``` directory. Refer the table for the Claim Dialect URIs and their corresponding regex patterns.

#### Dialect XML tag format
``` js
<Dialect dialectURI="[Claim Dialect URI]" claimURIRegex="[Regex Pattern]”>
```

#### New Claim Dialect Validation Regexes
<table>
    <tr>
        <th>Claim Dialect URI</th>
        <th>Regex Pattern</th>
    </tr>
    <tr>
        <td><code>urn:scim:schemas:core:1.0</td></code>
        <td><code>urn:scim:schemas:core:1.0:[a-zA-Z0-9$\-_\.]*$</td></code>
    </tr>
    <tr>
        <td><code>urn:ietf:params:scim:schemas:core:2.0</td></code>
        <td><code>urn:ietf:params:scim:schemas:core:2.0:[a-zA-Z0-9$\-_\.]*$</td></code>
    </tr>
    <tr>
        <td><code>urn:ietf:params:scim:schemas:core:2.0:User</td></code>
        <td><code>urn:ietf:params:scim:schemas:core:2.0:User:[a-zA-Z0-9$\-_\.]*$</td></code>
    </tr>
    <tr>
        <td><code>urn:ietf:params:scim:schemas:extension:enterprise:2.0:User</td></code>
        <td><code>urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:[a-zA-Z0-9$\-_\.]*$</td></code>
    </tr>
</table>

### Conversion of Claims of Assertions to OIDC Dialect
For OAuth/OIDC applications, the default behavior of Identity Server versions till 5.11.0 was to send the original claims sent from IDP directly to the service provider/application as it is without converting the claims to the OIDC dialect.

In Identity Server 6.0.0, this behavior has been changed. The claims sent from IDP are now being converted to the OIDC dialect by default before they are sent to the service provider.

To disable this and revert to the previous behavior, add the following configuration to the ```deployment.toml``` file.

``` js
[oauth.oidc.claims]
enable_oidc_dialect = false
```

### External Dialect Claim Mapping Updates
In Identity Server 6.0.0, the claim mapping of the ```meta.version``` claim of the external claim dialect ```urn:ietf:params:scim:schemas:core:2.0``` has been changed from the local claim ```http://wso2.org/claims/im``` to the newly added local claim ```http://wso2.org/claims/metadata.version```. 
This has been done to address an issue that affected updating the value of the IM attribute which is used for other purposes.

Although this new claim mapping is available in a fresh Identity Server 6.0.0, this change will **not** be propagated from the older versions to a migrated IS 6.0.0 as it would create inconsistencies if ```urn:ietf:params:scim:schemas:core:2.0:meta.version``` values have been utilized following the older mapping. 
If the ```IM``` attribute and ```meta.version``` attribute values are required separately, it is recommended to manually update the claim mapping via the Console once the migration is complete.

## API Endpoints
This section covers the updates related to APIs and API endpoints on Identity Server 6.0.0.

### SCIM2 Endpoint
This section covers the updates related to the SCIM2 endpoint on Identity Server 6.0.0.
#### Intermediate Certificate Validation
In WSO2 Identity Server versions 5.11.0 and older, intermediate certificate validation is skipped for the SCIM2 endpoint.
This has been enabled by default in WSO2 Identity Server 6.0.0. If the previous behavior is required, add the following configuration to the ```deployment.toml``` file.

``` js
[intermediate_cert_validation]
exempt_contexts = [“scim2”]
```
Read more about [Intermediate Certificate Validation](https://is.docs.wso2.com/en/latest/develop/authenticating-and-authorizing-rest-apis/#configure-intermediate-certificate-validation).

#### Removal of Duplicate Entries in the SCIM2 Users Response

In the older versions of the Identity Server, the responses of the SCIM2 Users endpoint did not contain duplicate entries of the same user (it is possible to have to duplicate usernames in separate userstores).

In Identity Server 6.0.0, the SCIM2 User responses will contain duplicate entries of the same user as returned by the list of userstores. This has been done to maintain the consistency of the results returned by the userstores for the search queries.

If this behavior is not required, it can be disabled using the following configuration.

``` js
[scim2]
remove_duplicate_users_in_users_response = true 
```

#### Data type change for boolean attributes from the Schemas endpoint

In previous versions of WSO2 Identity Server, the `scim2/Schemas` endpoint returned the attribute type of boolean attributes as `string`.
```
caseExact: false
description: "Status of the account"
displayName: "Active"
displayOrder: "20"
multiValued: false
mutability: "READ_WRITE"
name: "active"
required: false
returned: "DEFAULT"
type: "STRING"
```
In Identity Server 6.0.0, the attribute type returned for boolean attributes from the `scim2/Schemas` endpoint is `boolean`.
```
caseExact: false
description: "Status of the account"
displayName: "Active"
displayOrder: "20"
multiValued: false
mutability: "READ_WRITE"
name: "active"
required: false
returned: "DEFAULT"
type: "BOOLEAN"
```
### Token Introspection Endpoint
#### Disabling Cross Tenant Token Introspection
The ability to introspect tokens across tenants will be disabled by default in IS 6.0.0. With this change, cross tenant endpoints will not be accessible using a tenanted access token.
For example, using an access token obtained for tenant A to access the user info endpoint of tenant B will result in an "Access token validation failed" error response. 
The tenanted user info endpoint can only be used with an access token that was issued for that particular tenant. 
Hence, the URLs of the introspection (user info) endpoints used in client applications will have to be updated to tenanted endpoints if tenanted access tokens are used. Eg: /userinfo -> /t/tenantdomin/userinfo.

If a user needs to enable cross-tenant token introspection, the following config should be added to the ```deployment.toml``` file.
``` toml
[oauth.introspect]
allow_cross_tenant = true
```
### Certificate Configuration via Application Management REST API
With IS 6.0.0, it is no longer possible to add expired certificates to applications or update existing certificates of applications with expired certificates using the Application Management REST API.

### OAuth DCR Endpoint Response
With WSO2 Identity Server 6.0.0, the response model of an application ```GET/PUT``` response from the OAuth DCR endpoint has been updated.
The data type of the ```client_secret_expires_at``` property of an OAuth2 Application object has been changed from ```string``` to ```long```.

Therefore, any client applications that are using this API must update the response parsing mechanisms to work with a long value for this attribute.

### UserInfo Endpoint Attributes
#### Groups Claim
The representation of the groups claim in the ```UserInfo``` response has been changed. The groups claim is a multi-valued attribute, and it is represented accordingly as a JSON array in the ID token. But in earlier versions of the Identity Server, the value of the groups claim in the UserInfo response is a single string of comma-separated values as shown below.

```"groups": "Internal/everyone,dev"```

With Identity Server 6.0.0, the UserInfo response has been updated to return a JSON array value for the groups claim, similar to that in the ID token.

```"groups": ["Internal/everyone","dev"]```
Hence, any client application that consumes the UserInfo response should be updated to parse this new format of the response properly.

#### Address Claims
The representation of the following claims in the ```UserInfo``` response has been changed. 
- country 
- locality 
- region 
- postal_code

These claims will be listed as sub-claims within a JSON object under the address claim in the ID token. In earlier versions of the Identity Server, these claims were listed separately in the UserInfo response as shown below.

```
"country": "Andorra",
"locality": "Wales"
```

With Identity Server 6.0.0, the UserInfo response will list the above claims inside the address claim as shown below.

```
"address": {
   "country": "Andorra",
   "locality": "Wales"
}   
```
Hence, any client application that consumes the UserInfo response should be updated to parse this new format of the response properly.

### Library Management Permissions
Up until WSO2 Identity Server 5.11.0, manage level permissions were required to access the Function Library Management Admin services and APIs.

With WSO2 Identity Server 6.0.0, more fine-grained permissions are supported for these services and APIs. The following table maps the operation to the required permissions.
<table>
    <tr>
        <th>Service Operation</th>
        <th>API Call</th>
        <th>Permissions Required</th>
    </tr>
    <tr>
        <td><code>createFunctionLibrary</code></td>
        <td><code>POST /api/server/v1/script-libraries(.*)</code></td>
        <td><code> /permission/admin/manage/functionsLibrarymgt/create</code></td>
    </tr>
    <tr>
        <td><code>listFunctionLibraries, getFunctionLibrary</code></td>
        <td><code>GET /api/server/v1/script-libraries(.*)</code></td>
        <td><code>/permission/admin/manage/functionslibrarymgt/view</code></td>
    </tr>
    <tr>
        <td><code>deleteFunctionLibrary</code></td>
        <td><code>DELETE /api/server/v1/script-libraries(.*)</code></td>
        <td><code>/permission/admin/managefunctionslibrarymgt/delete</code></td>
    </tr>
    <tr>
        <td><code>updateFunctionLibrary</code></td>
        <td><code>PUT /api/server/v1/script-libraries(.*)</code></td>
        <td><code>/permission/admin/manage/functionslibrarymgt/update</code></td>
    </tr>
</table>

### CORS Configuration Management API Permissions
Up until WSO2 Identity Server 5.11.0, ```manage``` level permissions were required to access the CORS Configuration Management APIs.
With IS 6.0.0, more fine-grained permissions have been introduced for this API. 
The permission ```/permission/admin/manage/identity/cors/origins/view``` is now sufficient to access the ```/api/server/v1/cors/origins``` API endpoint.

### Remote Server Shutdown/Restart via SOAP API
With Identity Server 6.0.0, the capability of the SOAP APIs to initiate server shutdowns or restarts has been disabled by default. If these features are required, add the following configurations to the ```deployment.toml``` file to enable the features.

``` js
[server]
enable_shutdown_from_api = true
enable_restart_from_api = true
```

### Server Management API Restrictions
From Identity Server 6.0.0 onwards, only client applications configured as Management Applications are able to access Server Management APIs.

Applications can configured as management applications in the following methods:
- Check the **Management Application** option available in the application's edit page.
- Set the ```isManagementApp``` attribute to ```true``` using Application Management REST API for the required applications.

!!! Note
    This will affect only new applications. All applications that existed prior to the migration will still be able to access the Server's Management APIs.

### Resend Code API Restrictions
From Identity Server 6.0.0 onwards, only users with identity management permission are able to invoke the resend-code API.

### Legacy DCR Endpoint Deprecation
With IS 6.0.0, the legacy DCR endpoint which was accessible via ```/identity/register``` has been deprecated. 
The recommended API for DCR should be OAuth2.0 DCR endpoint (```/identity/oauth2/dcr/v1.1```).

If the deprecated legacy DCR endpoint needs to be enabled, use the following config in ```deployment.toml``` file.
```toml
[[legacy_feature]]
id = "identity/register"
enable = true
```

## Database
This section covers the updates related to database configurations on Identity Server 6.0.0.

### H2 Database Version Upgrade
The H2 database engine version has been upgraded from ```1.4.199``` to ```2.1.210``` in Identity Server 6.0.0. As a result of this, Identity Server 6.0.0 will not be able to properly interact with existing H2 databases of the older version.

Therefore, it is mandatory to migrate the existing H2 databases to the newer version before running the product migration tool. This applies mainly to the embedded H2 database in the product, if being used.

!!! note 

    If you are migrating from IS 5.11.0 which is using the embedded H2 database and has been updated to update level 111 or higher, the H2 database migration need not be done as the database has already been migrated with update 111.

To migrate the H2 databases to the newer versions, follow the instructions given below.
1. Download the [migration.sh script](https://github.com/wso2/samples-is/blob/master/h2-migration-tool/migration.sh) and run it using the command ```sh migration.sh``.

    Alternatively, you could run the following command to download and run the script in one go.

    ``` js
    curl -s https://raw.githubusercontent.com/wso2/samples-is/master/h2-migration-tool/migration.sh | bash
    ```

2. Once you run the script, you will be prompted with the following questions on the terminal:
    - **Enter the path to the previous database files:**
        If the database being migrated is the embedded H2 database, the path should be ```<OLD_IS_HOME>/repository/database```.
    - **Enter the path to store the newly created files:**
        Enter the path of the target directory where the new database files should be generated.

3. After successfully executing the migration script, copy the files in the target directory to the ```repository/database``` directory in the new Identity Server 6.0.0 pack for embedded H2 database migration.

## Data providers
This section covers the updates related to data provider configurations on WSO2 Identity Server 6.0.0.

### Introspection Data Providers
Up until WSO2 Identity Server 5.11.0, the following single configuration was used to enable or disable all the registered OAuth introspection data providers.

``` js
[oauth.grant_type.uma_ticket]
retrieve_uma_permission_info_through_introspection = true
```

This configuration is deprecated from Identity Server 6.0.0 onwards. Introspection data providers are now registered as event listeners and can be individually activated using the configurations given below in the ```deployment.toml``` file.

``` js
[event.default_listener.is_introspection_data_provider]
enable = true

[event.default_listener.uma_introspection_data_provider]
enable = true
```

## System configs
This section covers the updates related to system configurations on Identity Server 6.0.0.

### Default CORS Configuration
In previously versions of WSO2 Identity Server, the default HTTP methods allowed for CORS were only ```GET```, ```POST```, ```HEAD``` and ```OPTIONS```.

In Identity Server 6.0.0, this has been changed to allow the following HTTP methods ```GET```, ```POST```, ```PUT```, ```PATCH```, ```DELETE```, ```HEAD``` and ```OPTIONS```.

Learn more on [how to change the CORS configuration](https://is.docs.wso2.com/en/latest/learn/cors).

### Log4j2 logging in Hazelcast
If you have been using WSO2 Identity Server in a [Hazelcast cluster](https://is.docs.wso2.com/en/latest/administer/configuring-hazelcast/), you may have configured the logging type for Hazelcast as log4j ```(Log4j1)```. Log4j1 logging is no longer supported in WSO2 Identity Server.

In WSO2 Identity Server 6.0.0, the Log4j version is upgraded to ```Log4j2```. Therefore the Hazelcast configuration needs to be updated to ```log4j2``` by adding the following configuration to the ```deployment.toml``` file.

``` js
[hazelcast]
hazelcast.logging.type = log4j2
```