{% include "../../../../../../includes/guides/authentication/mfa/add-totp-login.md" %}

## Additional TOTP Configurations

This section lists out all the advanced configurations related to TOTP. 

The following code snippet shows a sample TOTP configuration in the `<IS_HOME>/repository/conf/deployment.toml` file. 

```toml
[authentication.authenticator.totp.parameters]
encodingMethod="Base32"
timeStepSize="30"
windowSize="3"
enrolUserInAuthenticationFlow=true
TOTPAuthenticationEndpointURL="authenticationendpoint/totp.do"
TOTPAuthenticationEndpointErrorPage="authenticationendpoint/totp_error.do"
TOTPAuthenticationEndpointEnableTOTPPage="authenticationendpoint/totp_enroll.do"
Issuer="WSO2"
UseCommonIssuer=true
```

The parameter values given above show the **default** configurations in WSO2 Identity Server. 

If you wish to change a parameter value to something other than the default value, add the configuration to the `deployment.toml` file using the following format.

```toml
[authentication.authenticator.totp.parameters] 
<Property-name> = <Property-value> 
```

<table>
    <tr>
        <th>Property</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>encodingMethod</td>
        <td>The encoding method used to generate the TOTP.</td>
    </tr>
    <tr>
        <td>timeStepSize</td>
        <td>
            The time step size used to validate the TOTP.
        </td>
    </tr>
    <tr>
        <td>windowSize</td>
        <td>The window size used to validate the TOTP.</td>
    </tr>
    <tr>
        <td>enrolUserInAuthenticationFlow</td>
        <td>If this value is *true*, it will ask the user to enable the TOTP authenticator in the authentication flow.</td>
    </tr>
    <tr>
        <td>TOTPAuthenticationEndpointURL</td>
        <td>This is the endpoint of the UI which is used to gather the TOTP.</td>
    </tr>
    <tr>
        <td>TOTPAuthenticationEndpointErrorPage</td>
        <td>This is the endpoint of the error page.</td>
    </tr>
    <tr>
        <td>TOTPAuthenticationEndpointEnableTOTPPage</td>
        <td>This is the endpoint of the TOTPauthenticator enrollment page.</td>
    </tr>
    <tr>
        <td>Issuer</td>
        <td>This is the issuer name that will be shown on the mobile application. If this parameter is not configured, the tenant domain will be shown.</td>
    </tr>
    <tr>
        <td>UseCommonIssuer</td>
        <td>If set to *true*, the issuer name defined in the `deployment.toml` file will be used as the issuer for all the tenants.</td>
    </tr>
</table>