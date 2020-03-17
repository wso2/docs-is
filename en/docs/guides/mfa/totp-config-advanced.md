# TOTP Configurations

This page lists out all the advanced configurations related to TOTP. 

The following code snippet shows a sample TOTP configuration in the `<IS_HOME>/repository/conf/deployment.toml` file. 

```toml
[authentication.authenticator.totp.parameters]
encodingMethod="Base32"
timeStepSize="30"
windowSize="3"
authenticationMandatory=true
enrolUserInAuthenticationFlow=true
usecase="local"
secondaryUserstore="primary"
TOTPAuthenticationEndpointURL="totpauthenticationendpoint/totp.jsp"
TOTPAuthenticationEndpointErrorPage="totpauthenticationendpoint/totpError.jsp"
TOTPAuthenticationEndpointEnableTOTPPage="totpauthenticationendpoint/enableTOTP.jsp"
Issuer="WSO2"
UseCommonIssuer=true
```

The parameter values given above show the **default** configurations in WSO2 Identity Server. 

If you wish to change a parameter value to something other than the default value, add the configuration to the `deployment.toml` file using the following format.

```toml
[authentication.authenticator.totp.parameters] 
<Property-name> = <Property-value> 
```

----

#### encodingMethod

The encoding method used to generate the TOTP.

----

#### timeStepSize 

The time step size used to validate the TOTP.

----

#### windowSize

The window size used to validate the TOTP.

----

#### authenticationMandatory

If this value is *true*, the TOTP authentication will be enforced as a second step.

----

#### enrolUserInAuthenticationFlow
 
If this value is *true*, it will ask the user to enable the TOTP authenticator in the authentication flow.

----

#### usecase

This field can take one of the following values: local, association, userAttribute, subjectUri. If you do not specify any usecase, the default value is local.

If you have chosen userAttribute as the usecase, add the following parameter to specify the user attribute.

```
userAttribute = "http://wso2.org/foursquare/claims/email"
```

----

#### secondaryUserstore

If you use the secondary user store, enter all the user store values for the particular tenant as comma separated values.

```tab="Example"
[authentication.authenticator.totp.parameters]
secondaryUserstore= "jdbc, abc, xyz"
```

----

#### TOTPAuthenticationEndpointURL

This is the endpoint of the UI which is used to gather the TOTP.

----

#### TOTPAuthenticationEndpointErrorPage

This is the endpoint of the error page.

----

#### TOTPAuthenticationEndpointEnableTOTPPage

This is the endpoint of the TOTPauthenticator enrollment page.

----

#### Issuer

This is the issuer name that will be shown on the mobile application. If this parameter is not configured, the tenant domain will be shown.

----

#### UseCommonIssuer

If set to *true*, the issuer name defined in the `deployment.toml` file will be used as the issuer for all the tenants.

----
